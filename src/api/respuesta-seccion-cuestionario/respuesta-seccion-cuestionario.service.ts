import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRespuestaSeccionCuestionarioDto } from './dtos/create-respuesta-seccion-cuestionario.dto';
import { UpdateRespuestaSeccionCuestionarioDto } from './dtos/update-respuesta-seccion-cuestionario.dto';
import { RespuestaSeccionCuestionario } from './entities/respuesta-seccion-cuestionario.entity';

@Injectable()
export class RespuestaSeccionCuestionarioService {
  constructor(
    @InjectRepository(RespuestaSeccionCuestionario)
    private readonly respuestaSeccionCuestionarioRepository: Repository<RespuestaSeccionCuestionario>,
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

  findAll() {
    return this.respuestaSeccionCuestionarioRepository.find();
  }

  findByRespuestaCuestionarioId(id: number) {
    return this.respuestaSeccionCuestionarioRepository.findBy({
      fk_respuesta_cuestionario: id,
    });
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
