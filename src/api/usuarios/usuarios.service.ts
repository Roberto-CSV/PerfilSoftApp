import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/shared/interfaces/IService.interface';
import { ENTITIES } from 'src/shared/utilities/entities';
import { notFoundException } from 'src/shared/utilities/http-exceptions';
import { Repository } from 'typeorm';
import { RolesUsuarioService } from '../roles/roles_usuario.service';
import { SemestresService } from '../semestres/semestres.service';
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
    private readonly rolesService: RolesUsuarioService,
    private readonly semestresService: SemestresService,
  ) {}

  async create(newUsuario: CreateUsuarioDto) {
    const existsRol: boolean = await this.rolesService.existsById(
      newUsuario.fk_rol_usuario,
    );
    const existsSemestre: boolean = await this.semestresService.existsById(
      newUsuario.fk_semestre,
    );
    if (!existsRol) {
      throw notFoundException(newUsuario.fk_rol_usuario, ENTITIES.RolUsuario);
    }
    if (!existsSemestre) {
      throw notFoundException(newUsuario.fk_semestre, ENTITIES.Semestre);
    }
    const usuario: Usuario = this.usuariosRepository.create(newUsuario);
    return this.usuariosRepository.save(usuario);
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

  async getAllByRolId(id: number): Promise<Usuario[]> {
    const existsRol: boolean = await this.rolesService.existsById(id);
    if (!existsRol) {
      throw notFoundException(id, ENTITIES.RolUsuario);
    }
    return this.usuariosRepository.findBy({ fk_rol_usuario: id });
  }

  async getAllBySemestreId(id: number): Promise<Usuario[]> {
    const existsSemestre: boolean = await this.semestresService.existsById(id);
    if (!existsSemestre) {
      throw notFoundException(id, ENTITIES.Semestre);
    }
    return this.usuariosRepository.findBy({ fk_semestre: id });
  }

  getAllActive(): Promise<Usuario[]> {
    return this.usuariosRepository.findBy({ activo: true });
  }

  getAllDisabled(): Promise<Usuario[]> {
    return this.usuariosRepository.findBy({ activo: false });
  }
}
