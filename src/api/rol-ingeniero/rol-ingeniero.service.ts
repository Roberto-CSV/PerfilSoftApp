import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolIngenieroDto } from './dto/create-rol-ingeniero.dto';
import { UpdateRolIngenieroDto } from './dto/update-rol-ingeniero.dto';
import { RolIngeniero } from './entities/rol-ingeniero.entity';

@Injectable()
export class RolIngenieroService {
  constructor(
    @InjectRepository(RolIngeniero)
    private readonly rolIngenieroRepository: Repository<RolIngeniero>,
  ) {}
  create(createRolIngenieroDto: CreateRolIngenieroDto) {
    const newSemestre: RolIngeniero = this.rolIngenieroRepository.create(
      createRolIngenieroDto,
    );
    return this.rolIngenieroRepository.save(newSemestre);
  }

  findAll() {
    return this.rolIngenieroRepository.find();
  }

  findOne(id: number) {
    return this.rolIngenieroRepository.findOne({
      where: {
        id_rol_ingeniero: id,
      },
    });
  }

  update(
    id_rol_ingeniero: number,
    updateRolIngenieroDto: UpdateRolIngenieroDto,
  ) {
    return this.rolIngenieroRepository.update(
      { id_rol_ingeniero },
      updateRolIngenieroDto,
    );
  }

  remove(id_rol_ingeniero: number) {
    return this.rolIngenieroRepository.delete({
      id_rol_ingeniero,
    });
  }
}
