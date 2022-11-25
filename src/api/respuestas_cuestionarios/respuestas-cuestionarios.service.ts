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
import { RespeustaCuestionario } from './entities/respuesta-cuestionario.entity';

@Injectable()
export class RespuestasCuestionariosService implements IService {
  private readonly ENTITY_NAME = ENTITIES.RespeustaCuestionario;

  constructor(
    @InjectRepository(RespeustaCuestionario)
    private readonly respuestasCuestionariosRepository: Repository<RespeustaCuestionario>,
    private readonly cuestionariosService: CuestionariosService,
    private readonly usuariosService: UsuariosService,
    @InjectRepository(Diagnostico)
    private readonly diagnosticosRepository: Repository<Diagnostico>,
  ) {}

  async create(
    newRespeustaCuestionario: CreateRespeustaCuestionarioDto,
  ): Promise<RespeustaCuestionario> {
    const existsCuestionario: boolean =
      await this.cuestionariosService.existsById(
        newRespeustaCuestionario.fk_cuestionario,
      );
    const existsUsuario: boolean = await this.usuariosService.existsById(
      newRespeustaCuestionario.fk_usuario,
    );
    if (!existsCuestionario) {
      throw notFoundException(
        newRespeustaCuestionario.fk_cuestionario,
        ENTITIES.Cuestionario,
      );
    }
    if (!existsUsuario) {
      throw notFoundException(
        newRespeustaCuestionario.fk_usuario,
        ENTITIES.Usuario,
      );
    }
    newRespeustaCuestionario.fecha_desarrollo = new Date(Date.now());
    const respuestaCuestionario: RespeustaCuestionario =
      this.respuestasCuestionariosRepository.create(newRespeustaCuestionario);
    const respuestaCuestionarioSave: RespeustaCuestionario =
      await this.respuestasCuestionariosRepository.save(respuestaCuestionario);
    const newDiagnostico: Diagnostico = this.diagnosticosRepository.create(<CreateDiagnosticoDto>{
      fk_respuesta_cuestionario:
        respuestaCuestionarioSave.id_respuesta_cuestionario,
    });
    this.diagnosticosRepository.save(newDiagnostico);
    return respuestaCuestionarioSave;
  }

  getAll(): Promise<RespeustaCuestionario[]> {
    return this.respuestasCuestionariosRepository.find();
  }

  async getById(id: number): Promise<RespeustaCuestionario> {
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
    const foundRespuestaCuestionario: RespeustaCuestionario =
      await this.respuestasCuestionariosRepository.findOne({
        where: {
          id_respuesta_cuestionario: id,
        },
      });

    return foundRespuestaCuestionario === null ? false : true;
  }

  async getAllByCuestionarioId(id: number): Promise<RespeustaCuestionario[]> {
    const existsCuestionario: boolean =
      await this.cuestionariosService.existsById(id);
    if (!existsCuestionario) {
      throw notFoundException(id, ENTITIES.Cuestionario);
    }
    return this.respuestasCuestionariosRepository.findBy({
      fk_cuestionario: id,
    });
  }

  async getAllByUsaurioId(id: number): Promise<RespeustaCuestionario[]> {
    const existsUsuario: boolean = await this.usuariosService.existsById(id);
    if (!existsUsuario) {
      throw notFoundException(id, ENTITIES.Cuestionario);
    }
    return this.respuestasCuestionariosRepository.findBy({
      fk_usuario: id,
    });
  }
}
