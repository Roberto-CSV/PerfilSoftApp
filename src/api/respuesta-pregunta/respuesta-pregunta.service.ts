import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRespuestaPreguntaDto } from './dto/create-respuesta-pregunta.dto';
import { UpdateRespuestaPreguntaDto } from './dto/update-respuesta-pregunta.dto';
import { RespuestaPregunta } from './entities/respuesta-pregunta.entity';

@Injectable()
export class RespuestaPreguntaService {
  constructor(
    @InjectRepository(RespuestaPregunta)
    private readonly respuestaPreguntaRepository: Repository<RespuestaPregunta>,
  ) {}
  create(createRespuestaPreguntaDto: CreateRespuestaPreguntaDto) {
    const newSemestre: RespuestaPregunta =
      this.respuestaPreguntaRepository.create(createRespuestaPreguntaDto);
    return this.respuestaPreguntaRepository.save(newSemestre);
  }

  findAll() {
    return this.respuestaPreguntaRepository.find();
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
