import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticosService } from './diagnosticos.service';
import { Diagnostico } from './entities/diagnostico.entity';
import { DiagnosticosController } from './diagnosticos.controller';
import { RespuestasCuestionariosModule } from '../respuestas_cuestionarios/respuestas-cuestionarios.module';
import { RespuestaCuestionario } from '../respuestas_cuestionarios/entities/respuesta-cuestionario.entity';
import { RolIngeniero } from '../rol-ingeniero/entities/rol-ingeniero.entity';
import { DiagnosticoRolIngeniero } from '../diagnostico-rol-ingeniero/entities/diagnostico-rol-ingeniero.entity';
import { CuestionarioSeccionCuestionario } from '../cuestionario-seccion-cuestionario/entities/cuestionario-seccion-cuestionario.entity';
import { SeccionCuestionario } from '../seccion_cuestionario/entities/seccion_cuestionario.entity';
import { RespuestaPregunta } from '../respuesta-pregunta/entities/respuesta-pregunta.entity';
import { OpcionRespuesta } from '../opcion_respuesta/entities/opcion_respuesta.entity';
import { Pregunta } from '../pregunta/entities/pregunta.entity';
import { RolIngenieroHabilidad } from '../rol-ingeniero-habilidad/entities/rol-ingeniero-habilidad.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { Habilidad } from '../habilidades/entities/habilidad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Diagnostico,
      RespuestaCuestionario,
      RolIngeniero,
      DiagnosticoRolIngeniero,
      CuestionarioSeccionCuestionario,
      SeccionCuestionario,
      RespuestaPregunta,
      OpcionRespuesta,
      Pregunta,
      RolIngenieroHabilidad,
      Habilidad,
    ]),
    RespuestasCuestionariosModule,
    UsuariosModule,
  ],
  providers: [DiagnosticosService],
  exports: [DiagnosticosService],
  controllers: [DiagnosticosController],
})
export class DiagnosticosModule {}
