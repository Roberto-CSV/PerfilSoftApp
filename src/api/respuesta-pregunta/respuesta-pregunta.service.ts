import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpcionRespuesta } from '../opcion_respuesta/entities/opcion_respuesta.entity';
import { Pregunta } from '../pregunta/entities/pregunta.entity';
import { UpdateRespuestaSeccionCuestionarioDto } from '../respuesta-seccion-cuestionario/dtos/update-respuesta-seccion-cuestionario.dto';
import { RespuestaSeccionCuestionario } from '../respuesta-seccion-cuestionario/entities/respuesta-seccion-cuestionario.entity';
import { RespuestaSeccionCuestionarioService } from '../respuesta-seccion-cuestionario/respuesta-seccion-cuestionario.service';
import { CreateRespuestaPreguntaDto } from './dto/create-respuesta-pregunta.dto';
import { UpdateRespuestaPreguntaDto } from './dto/update-respuesta-pregunta.dto';
import { RespuestaPregunta } from './entities/respuesta-pregunta.entity';

@Injectable()
export class RespuestaPreguntaService {
  constructor(
    @InjectRepository(RespuestaPregunta)
    private readonly respuestaPreguntaRepository: Repository<RespuestaPregunta>,
    @InjectRepository(OpcionRespuesta)
    private readonly opcionRespuestaRepository: Repository<OpcionRespuesta>,
    @InjectRepository(Pregunta)
    private readonly preguntaRepository: Repository<Pregunta>,
    @InjectRepository(RespuestaSeccionCuestionario)
    private readonly respuestaSeccionCuestionarioService: RespuestaSeccionCuestionarioService,
  ) {}

  async create(createRespuestaPreguntaDto: CreateRespuestaPreguntaDto) {
    const newRespuestaPregunta: RespuestaPregunta =
      this.respuestaPreguntaRepository.create(createRespuestaPreguntaDto);
    newRespuestaPregunta.puntaje = await this.calcularPuntaje(
      newRespuestaPregunta.fk_opcion_respuesta,
    );
    const respuestaPreguntaSave = await this.respuestaPreguntaRepository.save(
      newRespuestaPregunta,
    );
    await this.calcularPuntajeSeccion(
      respuestaPreguntaSave.fk_respuesta_seccion_cuestionario,
    );
    return respuestaPreguntaSave;
  }

  async calcularPuntajeSeccion(fk_respuesta_seccion_cuestionario: number) {
    const respuestasPreguntas: RespuestaPregunta[] =
      await this.respuestaPreguntaRepository.findBy({
        fk_respuesta_seccion_cuestionario: fk_respuesta_seccion_cuestionario,
      });
    const respuestaSeccionCuestionario: RespuestaSeccionCuestionario =
      await this.respuestaSeccionCuestionarioService.findOne(
        fk_respuesta_seccion_cuestionario,
      );
    let updateRespeustaSeccionCuestionario: UpdateRespuestaSeccionCuestionarioDto;
    let puntajeSeccion = 0;
    for (let respuestaPregunta of respuestasPreguntas) {
      puntajeSeccion += respuestaPregunta.puntaje;
    }
    puntajeSeccion /= respuestasPreguntas.length;
    updateRespeustaSeccionCuestionario = <
      UpdateRespuestaSeccionCuestionarioDto
    >{
      fk_seccion_cuestionario:
        respuestaSeccionCuestionario.fk_seccion_cuestionario,
      fk_respuesta_cuestionario:
        respuestaSeccionCuestionario.fk_respuesta_cuestionario,
      puntaje: puntajeSeccion,
    };
    this.respuestaSeccionCuestionarioService.update(
      respuestaSeccionCuestionario.id_respuesta_seccion_cuestionario,
      updateRespeustaSeccionCuestionario,
    );
  }

  async calcularPuntaje(fk_opcion_respuesta: number) {
    const opcionRespuesta = await this.opcionRespuestaRepository.findOne({
      where: {
        id_opcion_respuesta: fk_opcion_respuesta,
      },
    });
    const pregunta = await this.preguntaRepository.findOne({
      where: {
        id_pregunta: parseInt(opcionRespuesta.fk_pregunta),
      },
    });
    return parseInt(
      (
        pregunta.puntos *
        (parseInt(opcionRespuesta.porcentaje_exactitud) / 100)
      ).toString(),
    );
  }

  findAll() {
    return this.respuestaPreguntaRepository.find();
  }

  findByRespuestaSeccionCuestionarioId(id: number) {
    return this.respuestaPreguntaRepository.findBy({
      fk_respuesta_seccion_cuestionario: id,
    });
  }

  findOne(id: number) {
    return this.respuestaPreguntaRepository.findOne({
      where: {
        id_respuesta_pregunta: id,
      },
    });
  }

  update(
    id_respuesta_pregunta: number,
    updateRespuestaPreguntaDto: UpdateRespuestaPreguntaDto,
  ) {
    return this.respuestaPreguntaRepository.update(
      { id_respuesta_pregunta },
      updateRespuestaPreguntaDto,
    );
  }

  remove(id_respuesta_pregunta: number) {
    return this.respuestaPreguntaRepository.delete({
      id_respuesta_pregunta,
    });
  }
}
