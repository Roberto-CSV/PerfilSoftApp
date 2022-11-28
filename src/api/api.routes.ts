import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesModule } from './roles/roles_usuario.module';
import { SemestresModule } from './semestres/semestres.module';
import { RolIngenieroHabilidadModule } from './rol-ingeniero-habilidad/rol-ingeniero-habilidad.module';
import { RolIngenieroModule } from './rol-ingeniero/rol-ingeniero.module';
import { RespuestasCuestionariosModule } from './respuestas_cuestionarios/respuestas-cuestionarios.module';
import { RespuestaPreguntaModule } from './respuesta-pregunta/respuesta-pregunta.module';
import { DiagnosticosModule } from './diagnosticos/diagnosticos.module';
import { DiagnosticoRolIngenieroModule } from './diagnostico-rol-ingeniero/diagnostico-rol-ingeniero.module';
import { CuestionariosModule } from './cuestionarios/cuestionarios.module';
import { CuestionarioSeccionCuestionarioModule } from './cuestionario-seccion-cuestionario/cuestionario-seccion-cuestionario.module';
import { DiagnosticoRecomendacionModule } from './diagnostico_recomendacion/diagnostico_recomendacion.module';
import { SeccionCuestionarioModule } from './seccion_cuestionario/seccion_cuestionario.module';
import { RecomendacionModule } from './recomendacion/recomendacion.module';
import { TipoHabilidadModule } from './tipo_habilidad/tipo_habilidad.module';
import { HabilidadesModule } from './habilidades/habilidades.module';
import { OpcionRespuestaModule } from './opcion_respuesta/opcion_respuesta.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { RespuestaSeccionCuestionarioModule } from './respuesta-seccion-cuestionario/respuesta-seccion-cuestionario.module';
export const apiRoutes = [
  {
    path: 'usuario',
    module: UsuariosModule,
  },
  {
    path: 'respuesta-seccion-cuestionario',
    module: RespuestaSeccionCuestionarioModule,
  },
  {
    path: 'rol',
    module: RolesModule,
  },
  {
    path: 'semestre',
    module: SemestresModule,
  },
  {
    path: 'rol-ingeniero-habilidad',
    module: RolIngenieroHabilidadModule,
  },
  {
    path: 'rol-ingeniero',
    module: RolIngenieroModule,
  },
  {
    path: 'respuesta-cuestionario',
    module: RespuestasCuestionariosModule,
  },
  {
    path: 'respuesta-pregunta',
    module: RespuestaPreguntaModule,
  },
  {
    path: 'diagnostico',
    module: DiagnosticosModule,
  },
  {
    path: 'diagnostico-rol-ingeniero',
    module: DiagnosticoRolIngenieroModule,
  },
  {
    path: 'cuestionario',
    module: CuestionariosModule,
  },
  {
    path: 'cuestionario-seccion-cuestionario',
    module: CuestionarioSeccionCuestionarioModule,
  },
  {
    path: 'diagnostico-recomendacion',
    module: DiagnosticoRecomendacionModule,
  },

  {
    path: 'seccion-cuestionario',
    module: SeccionCuestionarioModule,
  },
  {
    path: 'recomendacion',
    module: RecomendacionModule,
  },
  {
    path: 'tipo-habilidad',
    module: TipoHabilidadModule,
  },
  {
    path: 'habilidad',
    module: HabilidadesModule,
  },
  {
    path: 'opcion-respuesta',
    module: OpcionRespuestaModule,
  },
  {
    path: 'pregunta',
    module: PreguntaModule,
  },
];
