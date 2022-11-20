import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/shared/interfaces/IService.interface';
import {
  existsException,
  notFoundException,
} from 'src/shared/utilities/http-exceptions';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dtos/create-rol.dto';
import { UpdateRolDto } from './dtos/update-rol.dto';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolesService implements IService {
  private readonly ENTITY_NAME = 'Rol';

  constructor(
    @InjectRepository(Rol) private readonly rolesRepository: Repository<Rol>,
  ) {}

  async create(rol: CreateRolDto) {
    const existsRol: boolean = await this.existsByRol(rol.rol);
    if (existsRol) {
      throw existsException(this.ENTITY_NAME);
    }
    const newRol: Rol = this.rolesRepository.create(rol);
    return this.rolesRepository.save(newRol);
  }

  getAll() {
    return this.rolesRepository.find();
  }

  async getById(id: number) {
    const existsRol: boolean = await this.existsById(id);
    if (!existsRol) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.rolesRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, rol: UpdateRolDto) {
    const existsRol: boolean = await this.existsById(id);
    if (!existsRol) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.rolesRepository.update({ id }, rol);
  }

  async delete(id: number) {
    const existsRol: boolean = await this.existsById(id);
    if (!existsRol) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.rolesRepository.delete({ id });
  }

  async existsById(id: number): Promise<boolean> {
    const rolFound: Rol = await this.rolesRepository.findOne({
      where: {
        id: id,
      },
    });
    return rolFound === null ? false : true;
  }

  async existsByRol(rol: string): Promise<boolean> {
    const rolFound: Rol = await this.rolesRepository.findOne({
      where: {
        rol: rol,
      },
    });
    return rolFound === null ? false : true;
  }
}
