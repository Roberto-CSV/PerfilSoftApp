import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHabilidadeDto } from './dto/create-habilidade.dto';
import { UpdateHabilidadeDto } from './dto/update-habilidade.dto';
import { Habilidad } from './entities/habilidad.entity';

@Injectable()
export class HabilidadesService {
  constructor(
    @InjectRepository(Habilidad)
    private readonly repoHabilidad: Repository<Habilidad>,
  ) {}
  create(createHabilidadeDto: CreateHabilidadeDto) {
    let habilidad = null;
    try {
      habilidad = this.repoHabilidad.create(createHabilidadeDto);
      this.repoHabilidad.save(habilidad);
    } catch (error) {
      console.log(error);
    }
    return habilidad == null ? false : true;
  }

  findAll() {
    return this.repoHabilidad.find();
  }

  findOneName(name: string) {
    return this.repoHabilidad.find({
      where: {
        habilidad: name,
      },
    });
  }

  findOne(id: number) {
    let habilidadById = null;
    try {
      habilidadById = this.repoHabilidad.findOne({
        where: {
          id_habilidad: id,
        },
      });
    } catch (error) {
      console.error(error);
    }
    return habilidadById;
  }

  update(id: number, updateHabilidadeDto: UpdateHabilidadeDto) {
    let updateHabilidad = null;
    try {
      updateHabilidad = this.repoHabilidad.update(
        { id_habilidad: id },
        updateHabilidadeDto,
      );
    } catch (error) {
      console.log(error);
    }
    return updateHabilidad === null ? false : true;
  }

  remove(id: number) {
    return `This action removes a #${id} habilidade`;
  }
}
