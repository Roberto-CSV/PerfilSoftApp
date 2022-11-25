import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';
import { Pregunta } from './entities/pregunta.entity';

@Injectable()
export class PreguntaService {
  constructor(
    @InjectRepository(Pregunta)
    private readonly repoPregunta: Repository<Pregunta>,
  ) {}
  create(createPreguntaDto: CreatePreguntaDto) {
    let pregunta = null;
    try {
      pregunta = this.repoPregunta.create(createPreguntaDto);
      this.repoPregunta.save(pregunta);
    } catch (error) {
      console.log(error);
    }
    return pregunta == null ? false : true;
  }

  findAll() {
    return this.repoPregunta.find();
  }

  findOne(id: number) {
    let pregunta = null;
    try {
      pregunta = this.repoPregunta.findOne({
        where: {
          id_pregunta: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
    return pregunta;
  }

  findBySeccionId(id: number) {
    return this.repoPregunta.findBy({fk_seccion_cuestionario: id})
  }

  update(id: number, updatePreguntaDto: UpdatePreguntaDto) {
    let pregunta = null;
    try {
      pregunta = this.repoPregunta.update(
        { id_pregunta: id },
        updatePreguntaDto,
      );
      this.repoPregunta.save(pregunta);
    } catch (error) {
      console.log(error);
    }
    return pregunta == null ? false : true;
  }

  remove(id: number) {
    return `This action removes a #${id} pregunta`;
  }
}
