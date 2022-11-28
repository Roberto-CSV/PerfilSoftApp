import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RespuestaPregunta } from '../respuesta-pregunta/entities/respuesta-pregunta.entity';
import { SeccionCuestionario } from '../seccion_cuestionario/entities/seccion_cuestionario.entity';
import { CreateRespuestaSeccionCuestionarioDto } from './dtos/create-respuesta-seccion-cuestionario.dto';
import { UpdateRespuestaSeccionCuestionarioDto } from './dtos/update-respuesta-seccion-cuestionario.dto';
import { RespuestaSeccionCuestionario } from './entities/respuesta-seccion-cuestionario.entity';

@Injectable()
export class RespuestaSeccionCuestionarioService {
  constructor(
    @InjectRepository(RespuestaSeccionCuestionario)
    private readonly respuestaSeccionCuestionarioRepository: Repository<RespuestaSeccionCuestionario>,
    @InjectRepository(RespuestaPregunta)
    private readonly respuestaPreguntaRepository: Repository<RespuestaPregunta>,
    @InjectRepository(SeccionCuestionario)
    private readonly seccionCuestionarioRepository: Repository<SeccionCuestionario>,
  ) {}
  async create(
    createRespuestaPreguntaDto: CreateRespuestaSeccionCuestionarioDto,
  ) {
    const newRespuestaSeccionCuestionario: RespuestaSeccionCuestionario =
      this.respuestaSeccionCuestionarioRepository.create(
        createRespuestaPreguntaDto,
      );
    newRespuestaSeccionCuestionario.puntaje = 0;
    return this.respuestaSeccionCuestionarioRepository.save(
      newRespuestaSeccionCuestionario,
    );
  }

  async findAll() {
    const respuestasSeccionesCuestionario: RespuestaSeccionCuestionario[] =
      await this.respuestaSeccionCuestionarioRepository.find();
    const response: any[] = [];
    for (let respuestaSeccionCuestionario of respuestasSeccionesCuestionario) {
      const respuestasPreguntas = await this.respuestaPreguntaRepository.findBy(
        {
          fk_respuesta_seccion_cuestionario:
            respuestaSeccionCuestionario.id_respuesta_seccion_cuestionario,
        },
      );
      response.push({
        respuestaSeccionCuestionario: respuestaSeccionCuestionario,
        respuestasPreguntas: respuestasPreguntas,
      });
    }
    return response;
  }

  async findByRespuestaCuestionarioId(id: number) {
    const respuestasSeccionesCuestionario: RespuestaSeccionCuestionario[] =
      await this.respuestaSeccionCuestionarioRepository.findBy({
        fk_respuesta_cuestionario: id,
      });
    const response: any[] = [];
    for (let respuestaSeccionCuestionario of respuestasSeccionesCuestionario) {
      const respuestasPreguntas = await this.respuestaPreguntaRepository.findBy(
        {
          fk_respuesta_seccion_cuestionario:
            respuestaSeccionCuestionario.id_respuesta_seccion_cuestionario,
        },
      );
      response.push({
        respuestaSeccionCuestionario: respuestaSeccionCuestionario,
        nombreSeccion: await this.seccionCuestionarioRepository.findOne({
          where: {
            id_seccion_cuestionario:
              respuestaSeccionCuestionario.fk_seccion_cuestionario,
          },
        }),
        respuestasPreguntas: respuestasPreguntas,
      });
    }
    return response;
  }

  findBySeccionCuestionarioId(id: number) {
    return this.respuestaSeccionCuestionarioRepository.findBy({
      fk_seccion_cuestionario: id,
    });
  }

  findOne(id: number) {
    return this.respuestaSeccionCuestionarioRepository.findOne({
      where: {
        id_respuesta_seccion_cuestionario: id,
      },
    });
  }

  update(
    id_respuesta_seccion_cuestionario: number,
    updateRespuestaPreguntaDto: UpdateRespuestaSeccionCuestionarioDto,
  ) {
    return this.respuestaSeccionCuestionarioRepository.update(
      { id_respuesta_seccion_cuestionario },
      updateRespuestaPreguntaDto,
    );
  }

  remove(id_respuesta_seccion_cuestionario: number) {
    return this.respuestaSeccionCuestionarioRepository.delete({
      id_respuesta_seccion_cuestionario,
    });
  }
}
