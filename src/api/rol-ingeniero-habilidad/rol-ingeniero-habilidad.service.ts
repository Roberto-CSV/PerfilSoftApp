import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolIngenieroHabilidadDto } from './dto/create-rol-ingeniero-habilidad.dto';
import { UpdateRolIngenieroHabilidadDto } from './dto/update-rol-ingeniero-habilidad.dto';
import { RolIngenieroHabilidad } from './entities/rol-ingeniero-habilidad.entity';

@Injectable()
export class RolIngenieroHabilidadService {
  constructor(
    @InjectRepository(RolIngenieroHabilidad)
    private readonly rolIngenieroHabilidadRepository: Repository<RolIngenieroHabilidad>,
  ) {}

  create(createRolIngenieroHabilidadDto: CreateRolIngenieroHabilidadDto) {
    const newSemestre: RolIngenieroHabilidad =
      this.rolIngenieroHabilidadRepository.create(
        createRolIngenieroHabilidadDto,
      );
    return this.rolIngenieroHabilidadRepository.save(newSemestre);
  }

  findAll() {
    return this.rolIngenieroHabilidadRepository.find();
  }

  findOne(id: number) {
    return this.rolIngenieroHabilidadRepository.findOne({
      where: {
        id_rol_ingeniero_habilidad: id,
      },
    });
  }

  update(
    id_rol_ingeniero_habilidad: number,
    updateRolIngenieroHabilidadDto: UpdateRolIngenieroHabilidadDto,
  ) {
    return this.rolIngenieroHabilidadRepository.update(
      { id_rol_ingeniero_habilidad },
      updateRolIngenieroHabilidadDto,
    );
  }

  remove(id_rol_ingeniero_habilidad: number) {
    return this.rolIngenieroHabilidadRepository.delete({
      id_rol_ingeniero_habilidad,
    });
  }
}
