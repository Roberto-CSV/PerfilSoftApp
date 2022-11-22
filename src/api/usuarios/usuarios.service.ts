import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/shared/interfaces/IService.interface';
import { notFoundException } from 'src/shared/utilities/http-exceptions';
import { Repository } from 'typeorm';
import { RolesUsuarioService } from '../roles/roles_usuario.service';
import { SemestresService } from '../semestres/semestres.service';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService implements IService {
  private readonly ENTITY_NAME = 'Usuario';

  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly rolesService: RolesUsuarioService,
    private readonly semestresService: SemestresService,
  ) {}

  async create(usuario: CreateUsuarioDto) {
    await this.rolesService.getById(usuario.fk_rol_usuario);
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
        id_usuario: id,
      },
    });
  }

  async update(id: number, usuario: UpdateUsuarioDto) {
    await this.rolesService.getById(usuario.fk_rol_usuario);
    const existsUsuario: boolean = await this.existsById(id);
    if (!existsUsuario) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.usuariosRepository.update({ id_usuario: id }, usuario);
  }

  async delete(id: number) {
    const existsUsuario: boolean = await this.existsById(id);
    if (!existsUsuario) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.usuariosRepository.delete({ id_usuario: id });
  }

  async existsById(id: number) {
    const usuarioFound: Usuario = await this.usuariosRepository.findOne({
      where: {
        id_usuario: id,
      },
    });
    return usuarioFound === null ? false : true;
  }

  async getAllByRolId(rolId: number) {
    await this.rolesService.existsById(rolId);
    return this.usuariosRepository.findBy({ fk_rol_usuario: rolId });
  }

  async getAllBySemestreId(semestreId: number) {
    await this.semestresService.existsById(semestreId);
    return this.usuariosRepository.findBy({ fk_semestre: semestreId });
  }
}
