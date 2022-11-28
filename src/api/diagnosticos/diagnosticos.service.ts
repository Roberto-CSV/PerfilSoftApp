import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/shared/interfaces/IService.interface';
import { ENTITIES } from 'src/shared/utilities/entities';
import { notFoundException } from 'src/shared/utilities/http-exceptions';
import { Repository, UpdateResult } from 'typeorm';
import { DiagnosticoRolIngenieroService } from '../diagnostico-rol-ingeniero/diagnostico-rol-ingeniero.service';
import { RespuestaSeccionCuestionarioService } from '../respuesta-seccion-cuestionario/respuesta-seccion-cuestionario.service';
import { RespuestasCuestionariosService } from '../respuestas_cuestionarios/respuestas-cuestionarios.service';
import { RolIngenieroHabilidad } from '../rol-ingeniero-habilidad/entities/rol-ingeniero-habilidad.entity';
import { RolIngeniero } from '../rol-ingeniero/entities/rol-ingeniero.entity';
import { CreateDiagnosticoDto } from './dtos/create-diagnostico.dto';
import { UpdateDiagnosticoDto } from './dtos/update-diagnostico.dto';
import { Diagnostico } from './entities/diagnostico.entity';
import { CreateDiagnosticoRolIngenieroDto } from '../diagnostico-rol-ingeniero/dto/create-diagnostico-rol-ingeniero.dto';
import { SeccionCuestionario } from '../seccion_cuestionario/entities/seccion_cuestionario.entity';
import { RespuestaCuestionario } from '../respuestas_cuestionarios/entities/respuesta-cuestionario.entity';
import { CuestionarioSeccionCuestionario } from '../cuestionario-seccion-cuestionario/entities/cuestionario-seccion-cuestionario.entity';
import { DiagnosticoRolIngeniero } from '../diagnostico-rol-ingeniero/entities/diagnostico-rol-ingeniero.entity';

@Injectable()
export class DiagnosticosService implements IService {
  private readonly ENTITY_NAME = ENTITIES.Diagnostico;

  constructor(
    @InjectRepository(Diagnostico)
    private readonly diagnosticosRepository: Repository<Diagnostico>,
    private readonly respuestasCuestionariosService: RespuestasCuestionariosService,
    private readonly respuestasSeccionesCuestionarioService: RespuestaSeccionCuestionarioService,
    @InjectRepository(RolIngeniero)
    private readonly rolIngenieroRepository: Repository<RolIngeniero>,
    @InjectRepository(RolIngenieroHabilidad)
    private readonly rolIngenieroHabilidadRepository: Repository<RolIngenieroHabilidad>,
    private readonly diagnosticoRolIngenenieroService: DiagnosticoRolIngenieroService,
    @InjectRepository(SeccionCuestionario)
    private readonly seccionCuestionarioRespository: Repository<SeccionCuestionario>,
    @InjectRepository(RespuestaCuestionario)
    private readonly respuestaCuestionarioRepository: Repository<RespuestaCuestionario>,
    @InjectRepository(CuestionarioSeccionCuestionario)
    private readonly cuestionarioSeccionCuestionarioRepository: Repository<CuestionarioSeccionCuestionario>,
  ) {}

  async create(newDiagnostico: CreateDiagnosticoDto): Promise<Diagnostico> {
    const diagnostico: Diagnostico =
      this.diagnosticosRepository.create(newDiagnostico);
    const diagnosticoSave: Diagnostico = await this.diagnosticosRepository.save(
      diagnostico,
    );
    await this.createDiagnosticoRolesIngeniero(diagnosticoSave);
    return diagnosticoSave;
  }

  async createDiagnosticoRolesIngeniero(diagnostico: Diagnostico) {
    const rolesIngeniero: any[] = await this.getAllRolesIngeniero();
    const respuestaCuestionario: RespuestaCuestionario =
      await this.respuestaCuestionarioRepository.findOne({
        where: {
          id_respuesta_cuestionario: diagnostico.fk_respuesta_cuestionario,
        },
      });
    const respuestasSeccionesCuestionario: any[] =
      await this.respuestasSeccionesCuestionarioService.findByRespuestaCuestionarioId(
        diagnostico.fk_respuesta_cuestionario,
      );
    const seccionesCuestionarioId: CuestionarioSeccionCuestionario[] =
      await this.cuestionarioSeccionCuestionarioRepository.findBy({
        fk_cuestionario: respuestaCuestionario.fk_cuestionario,
      });
    const seccionesCuestionario: SeccionCuestionario[] = [];
    for (let seccionCuestionarioId of seccionesCuestionarioId) {
      const seccionCuestionario: SeccionCuestionario =
        await this.seccionCuestionarioRespository.findOne({
          where: {
            id_seccion_cuestionario:
              seccionCuestionarioId.fk_seccion_cuestionario,
          },
        });
      seccionesCuestionario.push(seccionCuestionario);
    }
    let porcentajeSimilitud: number = 0;
    for (let rolIngeniero of rolesIngeniero) {
      for (let habilidad of rolIngeniero.habilidades) {
        const seccionCuestionario: SeccionCuestionario[] =
          seccionesCuestionario.filter((sc) => {
            if (sc.fk_habilidad == habilidad.id_habilidad) return sc;
          });
        if (seccionCuestionario.length > 0) {
          const respuestaSeccion = respuestasSeccionesCuestionario.filter(
            (rs) => {
              if (
                rs.respuestaSeccionCuestionario.fk_seccion_cuestionario ==
                seccionCuestionario[0].id_seccion_cuestionario
              )
                return rs;
            },
          );
          const puntaje: number = parseInt(
            (
              seccionCuestionario[0].estandar_puntuacion /
              respuestaSeccion[0].puntaje
            ).toString(),
          );
          porcentajeSimilitud += puntaje >= 1 ? 100 : puntaje * 100;
        }
      }
      porcentajeSimilitud /= rolIngeniero.habilidades.length;
      const diagnosticoRolIngeniero: DiagnosticoRolIngeniero = <
        DiagnosticoRolIngeniero
      >{
        fk_diagnostico: diagnostico.id_diagnostico,
        fk_rol_ingeniero: rolIngeniero.rolIngeniero.id_rol_ingeniero,
        porcentaje_similitud: porcentajeSimilitud,
      };
      this.diagnosticoRolIngenenieroService.create(diagnosticoRolIngeniero);
      porcentajeSimilitud = 0;
    }
  }

  async getAllRolesIngeniero() {
    const response: any[] = [];
    const rolesIngeniero: RolIngeniero[] =
      await this.rolIngenieroRepository.find();
    for (let rolIngeniero of rolesIngeniero) {
      const habilidades: RolIngenieroHabilidad[] =
        await this.rolIngenieroHabilidadRepository.findBy({
          fk_rol_ingeniero: rolIngeniero.id_rol_ingeniero,
        });
      response.push({
        rolIngeniero: rolIngeniero,
        habilidades: habilidades,
      });
    }
    return response;
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
