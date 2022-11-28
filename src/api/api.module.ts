import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles_usuario.module';
import { SemestresController } from './semestres/semestres.controller';
import { SemestresModule } from './semestres/semestres.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TipoHabilidadModule } from './tipo_habilidad/tipo_habilidad.module';
import { HabilidadesModule } from './habilidades/habilidades.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { SeccionCuestionarioModule } from './seccion_cuestionario/seccion_cuestionario.module';
import { OpcionRespuestaModule } from './opcion_respuesta/opcion_respuesta.module';
import { RecomendacionModule } from './recomendacion/recomendacion.module';
import { DiagnosticoRecomendacionModule } from './diagnostico_recomendacion/diagnostico_recomendacion.module';
import { DiagnosticosModule } from './diagnosticos/diagnosticos.module';
import { CuestionariosModule } from './cuestionarios/cuestionarios.module';
import { RespuestasCuestionariosModule } from './respuestas_cuestionarios/respuestas-cuestionarios.module';
import { RolIngenieroModule } from './rol-ingeniero/rol-ingeniero.module';
import { DiagnosticoRolIngenieroModule } from './diagnostico-rol-ingeniero/diagnostico-rol-ingeniero.module';
import { RolIngenieroHabilidadModule } from './rol-ingeniero-habilidad/rol-ingeniero-habilidad.module';
import { RespuestaPreguntaModule } from './respuesta-pregunta/respuesta-pregunta.module';
import { CuestionarioSeccionCuestionarioModule } from './cuestionario-seccion-cuestionario/cuestionario-seccion-cuestionario.module';
import { RespuestaSeccionCuestionarioModule } from './respuesta-seccion-cuestionario/respuesta-seccion-cuestionario.module';

@Module({
  imports: [
    RolesModule,
    SemestresModule,
    UsuariosModule,
    HabilidadesModule,
    TipoHabilidadModule,
    PreguntaModule,
    SeccionCuestionarioModule,
    OpcionRespuestaModule,
    RecomendacionModule,
    DiagnosticoRecomendacionModule,
    RolIngenieroModule,
    DiagnosticoRolIngenieroModule,
    RolIngenieroHabilidadModule,
    RespuestaPreguntaModule,
    CuestionarioSeccionCuestionarioModule,
    DiagnosticosModule,
    CuestionariosModule,
    RespuestasCuestionariosModule,
    RespuestaSeccionCuestionarioModule,
  ],
  controllers: [SemestresController],
})
export class ApiModule {}
