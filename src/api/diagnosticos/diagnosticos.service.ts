import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/shared/interfaces/IService.interface';
import { ENTITIES } from 'src/shared/utilities/entities';
import { notFoundException } from 'src/shared/utilities/http-exceptions';
import { Repository, UpdateResult } from 'typeorm';
import { RespuestasCuestionariosService } from '../respuestas_cuestionarios/respuestas-cuestionarios.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateDiagnosticoDto } from './dtos/create-diagnostico.dto';
import { UpdateDiagnosticoDto } from './dtos/update-diagnostico.dto';
import { Diagnostico } from './entities/diagnostico.entity';

@Injectable()
export class DiagnosticosService implements IService {
  private readonly ENTITY_NAME = ENTITIES.Diagnostico;

  constructor(
    @InjectRepository(Diagnostico)
    private readonly diagnosticosRepository: Repository<Diagnostico>,
    private readonly respuestasCuestionariosService: RespuestasCuestionariosService,
  ) {}

  create(newDiagnostico: CreateDiagnosticoDto): Promise<Diagnostico> {
    const diagnostico: Diagnostico =
      this.diagnosticosRepository.create(newDiagnostico);
    return this.diagnosticosRepository.save(diagnostico);
  }

  getAll(): Promise<Diagnostico[]> {
    return this.diagnosticosRepository.find();
  }

  async getById(id: number): Promise<Diagnostico> {
    const existsDiagnostico: boolean = await this.existsById(id);
    if (!existsDiagnostico) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.diagnosticosRepository.findOne({
      where: {
        id_diagnostico: id,
      },
    });
  }

  async update(
    id: number,
    diagnostico: UpdateDiagnosticoDto,
  ): Promise<UpdateResult> {
    const existsDiagnostico = await this.existsById(id);
    if (!existsDiagnostico) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.diagnosticosRepository.update(
      { id_diagnostico: id },
      diagnostico,
    );
  }

  async delete(id: number) {
    const existsDiagnostico = await this.existsById(id);
    if (!existsDiagnostico) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.diagnosticosRepository.delete({ id_diagnostico: id });
  }

  async existsById(id: number) {
    const foundDiagnostico: Diagnostico =
      await this.diagnosticosRepository.findOne({
        where: {
          id_diagnostico: id,
        },
      });

    return foundDiagnostico === null ? false : true;
  }

  async getByRespuestaCuestionarioId(id: number): Promise<Diagnostico> {
    const existsRespuestaCuestionario: boolean =
      await this.respuestasCuestionariosService.existsById(id);
    if (!existsRespuestaCuestionario) {
      throw notFoundException(id, ENTITIES.RespeustaCuestionario);
    }
    return this.diagnosticosRepository.findOne({
      where: { fk_respuesta_cuestionario: id },
    });
  }
}