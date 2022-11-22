import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/shared/interfaces/IService.interface';
import {
  existsException,
  notFoundException,
} from 'src/shared/utilities/http-exceptions';
import { Repository } from 'typeorm';
import { CreateRolUsuarioDto } from './dtos/create_rol.dto';
import { UpdateRolUsuarioDto } from './dtos/update_rol.dto';
import { RolUsuario } from './entities/rol_usuario.entity';

@Injectable()
export class RolesUsuarioService implements IService {
  private readonly ENTITY_NAME = 'rol_usuario';

  constructor(
    @InjectRepository(RolUsuario)
    private readonly rolesRepository: Repository<RolUsuario>,
  ) {}

  async create(rol: CreateRolUsuarioDto) {
    const existsRol: boolean = await this.existsByRol(rol.rol);
    if (existsRol) {
      throw existsException(this.ENTITY_NAME);
    }
    const newRol: RolUsuario = this.rolesRepository.create(rol);
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
        id_rol_usuario: id,
      },
    });
  }

  async update(id: number, rol: UpdateRolUsuarioDto) {
    const existsRol: boolean = await this.existsById(id);
    if (!existsRol) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.rolesRepository.update({ id_rol_usuario: id }, rol);
  }

  async delete(id: number) {
    const existsRol: boolean = await this.existsById(id);
    if (!existsRol) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.rolesRepository.delete({ id_rol_usuario: id });
  }

  async existsById(id: number): Promise<boolean> {
    const rolFound: RolUsuario = await this.rolesRepository.findOne({
      where: {
        id_rol_usuario: id,
      },
    });
    return rolFound === null ? false : true;
  }

  async existsByRol(rol: string): Promise<boolean> {
    const rolFound: RolUsuario = await this.rolesRepository.findOne({
      where: {
        rol: rol,
      },
    });
    return rolFound === null ? false : true;
  }
}
