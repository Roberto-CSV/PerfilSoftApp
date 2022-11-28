import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolIngenieroHabilidad } from '../rol-ingeniero-habilidad/entities/rol-ingeniero-habilidad.entity';
import { CreateRolIngenieroDto } from './dto/create-rol-ingeniero.dto';
import { UpdateRolIngenieroDto } from './dto/update-rol-ingeniero.dto';
import { RolIngeniero } from './entities/rol-ingeniero.entity';

@Injectable()
export class RolIngenieroService {
  constructor(
    @InjectRepository(RolIngeniero)
    private readonly rolIngenieroRepository: Repository<RolIngeniero>,
    @InjectRepository(RolIngenieroHabilidad)
    private readonly rolIngenieroHabilidadRepository: Repository<RolIngenieroHabilidad>,
  ) {}
  create(createRolIngenieroDto: CreateRolIngenieroDto) {
    const newSemestre: RolIngeniero = this.rolIngenieroRepository.create(
      createRolIngenieroDto,
    );
    return this.rolIngenieroRepository.save(newSemestre);
  }

  async findAll() {
    const response: any[] = [];
    const rolesIngeniero: RolIngeniero[] =
      await this.rolIngenieroRepository.find();
    for (let rolIngeniero of rolesIngeniero) {
      const habilidades: RolIngenieroHabilidad[] =
        await this.rolIngenieroHabilidadRepository.findBy({
          fk_rol_ingeniero: rolIngeniero.id_rol_ingeniero,
        });
      response.push({
        rolIngeniero: rolIngeniero,
        habilidades: habilidades,
      });
    }
    return response;
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
