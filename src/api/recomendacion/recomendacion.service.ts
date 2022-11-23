import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecomendacionDto } from './dto/create-recomendacion.dto';
import { UpdateRecomendacionDto } from './dto/update-recomendacion.dto';
import { Recomendacion } from './entities/recomendacion.entity';

@Injectable()
export class RecomendacionService {
  constructor(
    @InjectRepository(Recomendacion)
    private readonly repoRecomendacion: Repository<Recomendacion>,
  ) {}
  create(createRecomendacionDto: CreateRecomendacionDto) {
    let recomendacion = null;
    try {
      recomendacion = this.repoRecomendacion.create(createRecomendacionDto);
      this.repoRecomendacion.save(recomendacion);
    } catch (error) {
      console.log(error);
    }
    return recomendacion == null ? false : true;
  }

  findAll() {
    return this.repoRecomendacion.find();
  }

  findOne(id: number) {
    return this.repoRecomendacion.findOne({ where: { id_recomendacion: id } });
  }

  update(id: number, updateRecomendacionDto: UpdateRecomendacionDto) {
    let recomendacion = null;
    try {
      recomendacion = this.repoRecomendacion.update(
        { id_recomendacion: id },
        updateRecomendacionDto,
      );
      this.repoRecomendacion.save(recomendacion);
    } catch (error) {
      console.log(error);
    }
    return recomendacion == null ? false : true;
  }

  remove(id: number) {
    return `This action removes a #${id} recomendacion`;
  }
}
