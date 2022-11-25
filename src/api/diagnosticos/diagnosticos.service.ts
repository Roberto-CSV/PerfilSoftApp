import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/shared/interfaces/IService.interface';
import { ENTITIES } from 'src/shared/utilities/entities';
import { notFoundException } from 'src/shared/utilities/http-exceptions';
import { Repository, UpdateResult } from 'typeorm';
import { CuestionarioSeccionCuestionario } from '../cuestionario-seccion-cuestionario/entities/cuestionario-seccion-cuestionario.entity';
import { Cuestionario } from '../cuestionarios/entities/cuestionario.entity';
import { DiagnosticoRolIngeniero } from '../diagnostico-rol-ingeniero/entities/diagnostico-rol-ingeniero.entity';
import { OpcionRespuesta } from '../opcion_respuesta/entities/opcion_respuesta.entity';
import { Pregunta } from '../pregunta/entities/pregunta.entity';
import { RespuestaPregunta } from '../respuesta-pregunta/entities/respuesta-pregunta.entity';
import { RespeustaCuestionario } from '../respuestas_cuestionarios/entities/respuesta-cuestionario.entity';
import { RespuestasCuestionariosService } from '../respuestas_cuestionarios/respuestas-cuestionarios.service';
import { RolIngenieroHabilidad } from '../rol-ingeniero-habilidad/entities/rol-ingeniero-habilidad.entity';
import { RolIngeniero } from '../rol-ingeniero/entities/rol-ingeniero.entity';
import { SeccionCuestionario } from '../seccion_cuestionario/entities/seccion_cuestionario.entity';
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
    @InjectRepository(CuestionarioSeccionCuestionario)
    private readonly cuestionariosSeccionesCuestionarios: Repository<CuestionarioSeccionCuestionario>,
    @InjectRepository(SeccionCuestionario)
    private readonly seccionesCuestionariosRepository: Repository<SeccionCuestionario>,
    @InjectRepository(RolIngeniero)
    private readonly rolesIngenierosRepository: Repository<RolIngeniero>,
    @InjectRepository(DiagnosticoRolIngeniero)
    private readonly diagnosticosRolIngenierosRepository: Repository<DiagnosticoRolIngeniero>,
    @InjectRepository(RespuestaPregunta)
    private readonly respuestasPreguntasRepository: Repository<RespuestaPregunta>,
    @InjectRepository(OpcionRespuesta)
    private readonly opcionesRespuestaPreguntasRepository: Repository<OpcionRespuesta>,
    @InjectRepository(Pregunta)
    private readonly preguntasRepository: Repository<Pregunta>,
    @InjectRepository(RolIngenieroHabilidad)
    private readonly rolesIngenierosHabilidadesRepository: Repository<RolIngenieroHabilidad>,
  ) {}

  async create(newDiagnostico: CreateDiagnosticoDto): Promise<Diagnostico> {
    const diagnostico: Diagnostico =
      this.diagnosticosRepository.create(newDiagnostico);
    const diagnosticoSave: Diagnostico = await this.diagnosticosRepository.save(
      diagnostico,
    );
    await this.createDiagnosticosRolIngeniero(diagnosticoSave.fk_respuesta_cuestionario, diagnosticoSave.id_diagnostico);
    return diagnosticoSave;
  }

  async createDiagnosticosRolIngeniero(
    id_respuesta_cuestionario: number,
    id_diagnostico: number,
  ) {
    const respuestaCuestionario: RespeustaCuestionario =
      await this.respuestasCuestionariosService.getById(
        id_respuesta_cuestionario,
      );
    const cuestionarioSeccionesCuestionario: CuestionarioSeccionCuestionario[] =
      await this.cuestionariosSeccionesCuestionarios.findBy({
        fk_cuestionario: respuestaCuestionario.fk_cuestionario,
      });

    let seccionesCuestionario: any[] = [];
    for (let cuestionarioSeccionCuestionario of cuestionarioSeccionesCuestionario) {
      const seccionCuestionario =
        await this.seccionesCuestionariosRepository.findOne({
          where: {
            id_seccion_cuestionario:
              cuestionarioSeccionCuestionario.fk_seccion_cuestionario,
          },
        });
      seccionesCuestionario.push(seccionCuestionario);
    }
    let puntajesCuestionarios: {
      seccionCuestionario: SeccionCuestionario;
      puntaje: number;
    }[] = [];
    for (let seccionCuestionario of seccionesCuestionario) {
      puntajesCuestionarios.push(
        await this.calcularPuntajeSeccion(
          id_respuesta_cuestionario,
          seccionCuestionario,
        ),
      );
    }
    let puntajesRolesIngenieros = await this.calcularRolesIngenieros(
      puntajesCuestionarios,
    );
    //let diagnosticosRolesIngenieros: DiagnosticoRolIngeniero[] = [];
    for (let diagnosticoRolIngeniero of puntajesRolesIngenieros) {
      const diagnosticoRolIngenieroEntity: DiagnosticoRolIngeniero =
        this.diagnosticosRolIngenierosRepository.create({
          fk_diagnostico: id_diagnostico,
          fk_rol_ingeniero:
            diagnosticoRolIngeniero.rolIngeniero.id_rol_ingeniero,
          porcentaje_similitud: diagnosticoRolIngeniero.porcentajeSimilitud,
        });
      this.diagnosticosRolIngenierosRepository.save(diagnosticoRolIngenieroEntity);
      //diagnosticosRolesIngenieros.push(diagnosticoRolIngenieroEntity);
    }
    //console.log('DIAGNOSTICOS_ROLES_INGENIEROS: ', diagnosticosRolesIngenieros);
    return seccionesCuestionario;
  }

  async calcularRolesIngenieros(
    puntajesSecciones: {
      seccionCuestionario: SeccionCuestionario;
      puntaje: number;
    }[],
  ) {
    const rolesIngenieros: RolIngeniero[] =
      await this.rolesIngenierosRepository.find();
    let diagnosticosRolesIngenieros: {
      rolIngeniero: RolIngeniero;
      porcentajeSimilitud: number;
    }[] = [];

    for (let rolIngeniero of rolesIngenieros) {
      const habilidadesRolIngeniero: RolIngenieroHabilidad[] =
        await this.rolesIngenierosHabilidadesRepository.findBy({
          fk_rol_ingeniero: rolIngeniero.id_rol_ingeniero,
        });
      let porcentajeSimilitud: number = 0;
      for (let habilidadRolIngeniero of habilidadesRolIngeniero) {
        for (let puntajeSeccion of puntajesSecciones) {
          if (
            habilidadRolIngeniero.fk_habilidad ==
            puntajeSeccion.seccionCuestionario.fk_habilidad
          ) {
            const puntajeEstandarSeccion: number =
              puntajeSeccion.seccionCuestionario.estandar_puntuacion;
            if (puntajeSeccion.puntaje >= puntajeEstandarSeccion) {
              porcentajeSimilitud += 100 / habilidadesRolIngeniero.length;
            } else {
              porcentajeSimilitud +=
                (100 / habilidadesRolIngeniero.length) *
                (puntajeSeccion.puntaje / puntajeEstandarSeccion >= 1
                  ? 1
                  : puntajeSeccion.puntaje / puntajeEstandarSeccion);
            }
          }
        }
      }
      diagnosticosRolesIngenieros.push({
        rolIngeniero: rolIngeniero,
        porcentajeSimilitud: parseInt(porcentajeSimilitud.toString()),
      });
    }
    return diagnosticosRolesIngenieros;
  }

  async calcularPuntajeSeccion(
    id_respuesta_cuestionario: number,
    seccionCuestioanrio: SeccionCuestionario,
  ) {
    let puntajeSeccion: {
      seccionCuestionario: SeccionCuestionario;
      puntaje: number;
    } = {
      seccionCuestionario: seccionCuestioanrio,
      puntaje: 0,
    };
    const preguntasCuestionarioSeccion = await this.getPreguntasSeccion(
      id_respuesta_cuestionario,
      seccionCuestioanrio.id_seccion_cuestionario,
    );
    for (let preguntaCuestionarioSeccion of preguntasCuestionarioSeccion) {
      if (
        preguntaCuestionarioSeccion.respuesta !== undefined &&
        preguntaCuestionarioSeccion.respuesta !== null
      ) {
        puntajeSeccion.puntaje += preguntaCuestionarioSeccion.respuesta.puntaje;
      }
    }
    puntajeSeccion.puntaje /= preguntasCuestionarioSeccion.length;
    return puntajeSeccion;
  }

  async getPreguntasSeccion(
    id_respeusta_cuestionario: number,
    id_cuestionario_seccion: number,
  ) {
    const preguntasCuestionarioSeccion: Pregunta[] =
      await this.preguntasRepository.findBy({
        fk_seccion_cuestionario: id_cuestionario_seccion,
      });
    let respuestaPregunta: any[] = [];
    for (let preguntaCuestionarioSeccion of preguntasCuestionarioSeccion) {
      let opcionesRespuesta: OpcionRespuesta[] =
        await this.opcionesRespuestaPreguntasRepository.findBy({
          fk_pregunta: preguntaCuestionarioSeccion.id_pregunta.toString(),
        });
      respuestaPregunta.push({
        pregunta: preguntaCuestionarioSeccion,
        respuesta: await this.getRespuestaPregunta(
          id_respeusta_cuestionario,
          opcionesRespuesta,
        ),
      });
    }
    return respuestaPregunta;
  }

  async getRespuestaPregunta(
    id_respeusta_cuestionario: number,
    opcionesRespuesta: OpcionRespuesta[],
  ) {
    for (let opcionRespuesta of opcionesRespuesta) {
      const respuestaPregunta: RespuestaPregunta =
        await this.respuestasPreguntasRepository.findOne({
          where: {
            fk_respuesta_cuestionario: id_respeusta_cuestionario,
            fk_opcion_respuesta: opcionRespuesta.id_opcion_respuesta,
          },
        });
      if (respuestaPregunta !== undefined && respuestaPregunta !== null) {
        return respuestaPregunta;
      }
    }
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
