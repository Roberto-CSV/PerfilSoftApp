import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/shared/interfaces/IService.interface';
import { notFoundException } from 'src/shared/utilities/http-exceptions';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService implements IService {
  //esta es el nombre de la entidad
  private readonly ENTITY_NAME = 'Usuario';

  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly rolesService: RolesService,
  ) {}

  async create(usuario: CreateUsuarioDto) {
    await this.rolesService.getById(usuario.rolId);
    const newUsuario: Usuario = this.usuariosRepository.create(usuario);
    return this.usuariosRepository.save(newUsuario);
  }

  getAll() {
    return this.usuariosRepository.find();
  }

  async getById(id: number) {
    const existsUsuario: boolean = await this.existsById(id);
    if (!existsUsuario) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.usuariosRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, usuario: UpdateUsuarioDto) {
    await this.rolesService.getById(usuario.rolId);
    const existsUsuario: boolean = await this.existsById(id);
    if (!existsUsuario) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.usuariosRepository.update({ id }, usuario);
  }

  async delete(id: number) {
    const existsUsuario: boolean = await this.existsById(id);
    if (!existsUsuario) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.usuariosRepository.delete({ id });
  }

  async existsById(id: number) {
    const usuarioFound: Usuario = await this.usuariosRepository.findOne({
      where: {
        id: id,
      },
    });
    return usuarioFound === null ? false : true;
  }

  async getAllByRolId(id: number) {
    await this.rolesService.existsById(id);
    return this.usuariosRepository.findBy({ rolId: id });
  }
}
