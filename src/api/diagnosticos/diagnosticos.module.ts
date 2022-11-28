import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticosService } from './diagnosticos.service';
import { Diagnostico } from './entities/diagnostico.entity';
import { DiagnosticosController } from './diagnosticos.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RespuestasCuestionariosModule } from '../respuestas_cuestionarios/respuestas-cuestionarios.module';
import { RespuestaSeccionCuestionarioModule } from '../respuesta-seccion-cuestionario/respuesta-seccion-cuestionario.module';
import { RolIngeniero } from '../rol-ingeniero/entities/rol-ingeniero.entity';
import { RolIngenieroHabilidad } from '../rol-ingeniero-habilidad/entities/rol-ingeniero-habilidad.entity';
import { DiagnosticoRolIngenieroModule } from '../diagnostico-rol-ingeniero/diagnostico-rol-ingeniero.module';
import { SeccionCuestionario } from '../seccion_cuestionario/entities/seccion_cuestionario.entity';
import { RespuestaCuestionario } from '../respuestas_cuestionarios/entities/respuesta-cuestionario.entity';
import { CuestionarioSeccionCuestionario } from '../cuestionario-seccion-cuestionario/entities/cuestionario-seccion-cuestionario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Diagnostico,
      RolIngeniero,
      RolIngenieroHabilidad,
      SeccionCuestionario,
      RespuestaCuestionario,
      CuestionarioSeccionCuestionario,
    ]),
    UsuariosModule,
    RespuestasCuestionariosModule,
    RespuestaSeccionCuestionarioModule,
    DiagnosticoRolIngenieroModule,
  ],
  providers: [DiagnosticosService],
  exports: [DiagnosticosService],
  controllers: [DiagnosticosController],
})
export class DiagnosticosModule {}
