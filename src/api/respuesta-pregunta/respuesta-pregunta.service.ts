import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpcionRespuesta } from '../opcion_respuesta/entities/opcion_respuesta.entity';
import { Pregunta } from '../pregunta/entities/pregunta.entity';
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
  ) {}
  async create(createRespuestaPreguntaDto: CreateRespuestaPreguntaDto) {
    const newRespuestaPregunta: RespuestaPregunta =
      this.respuestaPreguntaRepository.create(createRespuestaPreguntaDto);
    newRespuestaPregunta.puntaje = await this.calcularPuntaje(newRespuestaPregunta.fk_opcion_respuesta);
    return this.respuestaPreguntaRepository.save(newRespuestaPregunta);
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
    return parseInt((pregunta.puntos * (parseInt(opcionRespuesta.porcentaje_exactitud)/100)).toString());
  }

  findAll() {
    return this.respuestaPreguntaRepository.find();
  }

  findByRespuestaCuestionarioId(id: number) {
    return this.respuestaPreguntaRepository.findBy({fk_respuesta_cuestionario: id})
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
