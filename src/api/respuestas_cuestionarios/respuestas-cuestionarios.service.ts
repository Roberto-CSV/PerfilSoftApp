import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/shared/interfaces/IService.interface';
import { ENTITIES } from 'src/shared/utilities/entities';
import { notFoundException } from 'src/shared/utilities/http-exceptions';
import { Repository } from 'typeorm';
import { CuestionariosService } from '../cuestionarios/cuestionarios.service';
import { CreateDiagnosticoDto } from '../diagnosticos/dtos/create-diagnostico.dto';
import { Diagnostico } from '../diagnosticos/entities/diagnostico.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateRespeustaCuestionarioDto } from './dtos/create-respuesta-cuestionario.dto';
import { RespuestaCuestionario } from './entities/respuesta-cuestionario.entity';

@Injectable()
export class RespuestasCuestionariosService implements IService {
  private readonly ENTITY_NAME = ENTITIES.RespeustaCuestionario;

  constructor(
    @InjectRepository(RespuestaCuestionario)
    private readonly respuestasCuestionariosRepository: Repository<RespuestaCuestionario>,
    private readonly cuestionariosService: CuestionariosService,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(
    newRespuestaCuestionario: CreateRespeustaCuestionarioDto,
  ): Promise<RespuestaCuestionario> {
    const existsCuestionario: boolean =
      await this.cuestionariosService.existsById(
        newRespuestaCuestionario.fk_cuestionario,
      );
    const existsUsuario: boolean = await this.usuariosService.existsById(
      newRespuestaCuestionario.fk_usuario,
    );
    if (!existsCuestionario) {
      throw notFoundException(
        newRespuestaCuestionario.fk_cuestionario,
        ENTITIES.Cuestionario,
      );
    }
    if (!existsUsuario) {
      throw notFoundException(
        newRespuestaCuestionario.fk_usuario,
        ENTITIES.Usuario,
      );
    }
    newRespuestaCuestionario.fecha_desarrollo = new Date(Date.now());
    const respuestaCuestionario: RespuestaCuestionario =
      this.respuestasCuestionariosRepository.create(newRespuestaCuestionario);
    const respuestaCuestionarioSave: RespuestaCuestionario =
      await this.respuestasCuestionariosRepository.save(respuestaCuestionario);
    return respuestaCuestionarioSave;
  }

  getAll(): Promise<RespuestaCuestionario[]> {
    return this.respuestasCuestionariosRepository.find();
  }

  async getById(id: number): Promise<RespuestaCuestionario> {
    const existsRespuestaCuestionario: boolean = await this.existsById(id);
    if (!existsRespuestaCuestionario) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.respuestasCuestionariosRepository.findOne({
      where: {
        id_respuesta_cuestionario: id,
      },
    });
  }

  update(id: number, dto: any) {
    throw new Error('Method not implemented.');
  }

  async delete(id: number) {
    const existsRespuestaCuestionario = await this.existsById(id);
    if (!existsRespuestaCuestionario) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.respuestasCuestionariosRepository.delete({
      id_respuesta_cuestionario: id,
    });
  }

  async existsById(id: number): Promise<boolean> {
    const foundRespuestaCuestionario: RespuestaCuestionario =
      await this.respuestasCuestionariosRepository.findOne({
        where: {
          id_respuesta_cuestionario: id,
        },
      });

    return foundRespuestaCuestionario === null ? false : true;
  }

  async getAllByCuestionarioId(id: number): Promise<RespuestaCuestionario[]> {
    const existsCuestionario: boolean =
      await this.cuestionariosService.existsById(id);
    if (!existsCuestionario) {
      throw notFoundException(id, ENTITIES.Cuestionario);
    }
    return this.respuestasCuestionariosRepository.findBy({
      fk_cuestionario: id,
    });
  }

  async getAllByUsaurioId(id: number): Promise<RespuestaCuestionario[]> {
    const existsUsuario: boolean = await this.usuariosService.existsById(id);
    if (!existsUsuario) {
      throw notFoundException(id, ENTITIES.Cuestionario);
    }
    return this.respuestasCuestionariosRepository.findBy({
      fk_usuario: id,
    });
  }
}
