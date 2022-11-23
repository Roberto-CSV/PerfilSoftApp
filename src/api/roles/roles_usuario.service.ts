import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/shared/interfaces/IService.interface';
import { ENTITIES } from 'src/shared/utilities/entities';
import {
  existsException,
  notFoundException,
} from 'src/shared/utilities/http-exceptions';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRolUsuarioDto } from './dtos/create_rol.dto';
import { UpdateRolUsuarioDto } from './dtos/update_rol.dto';
import { RolUsuario } from './entities/rol_usuario.entity';

@Injectable()
export class RolesUsuarioService implements IService {
  private readonly ENTITY_NAME = ENTITIES.RolUsuario;

  constructor(
    @InjectRepository(RolUsuario)
    private readonly rolesRepository: Repository<RolUsuario>,
  ) {}

  async create(rol: CreateRolUsuarioDto): Promise<RolUsuario> {
    const existsRol: boolean = await this.existsByRol(rol.rol);
    if (existsRol) {
      throw existsException(this.ENTITY_NAME);
    }
    const newRol: RolUsuario = this.rolesRepository.create(rol);
    return this.rolesRepository.save(newRol);
  }

  getAll(): Promise<RolUsuario[]> {
    return this.rolesRepository.find();
  }

  async getById(id: number): Promise<RolUsuario> {
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

  async update(id: number, rol: UpdateRolUsuarioDto): Promise<UpdateResult> {
    const existsRol: boolean = await this.existsById(id);
    if (!existsRol) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.rolesRepository.update({ id_rol_usuario: id }, rol);
  }

  async delete(id: number): Promise<DeleteResult> {
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

  getAllActive() {
    return this.rolesRepository.findBy({ activo: true });
  }

  getAllDisabled() {
    return this.rolesRepository.findBy({ activo: false });
  }
}
