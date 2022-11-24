import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import {
  CuestionariosDto,
  Preguntas,
  SeccionCuestionario,
  SeccionCuestionariodto,
} from './dtos/cuestionarios.dto';
import { Cuestionario } from './entities/cuestionario.entity';

@Injectable()
export class CuestionarioRepository extends Repository<Cuestionario> {
  constructor(private dataSource: DataSource) {
    super(Cuestionario, dataSource.createEntityManager());
  }

  async findAllCuestionario() /*: Promise<CuestionariosDto[]> */ {
    const cuestionariosDtos: CuestionariosDto[] = [];
    const seccionCuestionarios: SeccionCuestionario[] = [];
    const preguntasDTOS: Preguntas[] = [];
    const cuestionario: Cuestionario[] = await this.find();
    let auxInformation: any[];
    let auxInformationDos: any[];

    let sqlSeccionToCuestionario = `select sc.id_seccion_cuestionario  , sc.seccion, h.habilidad, sc.estandar_puntuacion from cuestionario_seccion_cuestionario csc 
        left join seccion_cuestionario sc on sc.id_seccion_cuestionario  = csc.fk_seccion_cuestionario  
        left join habilidad h on h.id_habilidad = sc.fk_habilidad where csc.fk_cuestionario = 1`;
    auxInformation = await this.query(sqlSeccionToCuestionario);

    await Promise.all(
      auxInformation.map(async (b) => {
        const seccionCuestionario: SeccionCuestionario =
          new SeccionCuestionario();
        seccionCuestionario.id_seccion = b.id_seccion_cuestionario;
        seccionCuestionario.habilidad = b.habilidad;
        seccionCuestionario.seccion = b.seccion;
        seccionCuestionario.puntuacion_seccion = b.estandar_puntuacion;
        let sqlPreguntaforSeccion = `select p.id_pregunta, p.enunciado  from pregunta p where p.fk_seccion_cuestionario = ${b.id_seccion_cuestionario}`;
        auxInformationDos = await this.query(sqlPreguntaforSeccion);
        await Promise.all(
          auxInformationDos.map(async (c) => {
            const preguntaSeccion: Preguntas = new Preguntas();
            preguntaSeccion.id_pregunta = c.id_pregunta;
            preguntaSeccion.enunciado = c.enunciado;
            let sqlRespuesta = `select opr.id_opcion_respuesta, opr.opcion_respuesta, opr.porcentaje_exactitud  from opcion_respuesta opr where opr.fk_pregunta = ${c.id_pregunta};`;
            preguntaSeccion.respuestas = await this.query(sqlRespuesta);

            preguntasDTOS.push(preguntaSeccion);
          }),
        );
        seccionCuestionario.pregunta = preguntasDTOS;

        seccionCuestionarios.push(seccionCuestionario);
      }),
    );

    return seccionCuestionarios;
  }
}
