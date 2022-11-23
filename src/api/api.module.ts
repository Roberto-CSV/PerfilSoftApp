import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { SemestresController } from './semestres/semestres.controller';
import { SemestresModule } from './semestres/semestres.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TipoHabilidadModule } from './tipo_habilidad/tipo_habilidad.module';
import { HabilidadesModule } from './habilidades/habilidades.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { SeccionCuestionarioModule } from './seccion_cuestionario/seccion_cuestionario.module';
import { OpcionRespuestaModule } from './opcion_respuesta/opcion_respuesta.module';
import { RecomendacionModule } from './recomendacion/recomendacion.module';
import { CuestionarioModule } from './cuestionario/cuestionario.module';
import { DiagnosticoModule } from './diagnostico/diagnostico.module';
import { DiagnosticoRecomendacionModule } from './diagnostico_recomendacion/diagnostico_recomendacion.module';

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
    CuestionarioModule,
    DiagnosticoModule,
    DiagnosticoRecomendacionModule,
  ],
  controllers: [SemestresController],
})
export class ApiModule {}
