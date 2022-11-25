import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticosService } from './diagnosticos.service';
import { Diagnostico } from './entities/diagnostico.entity';
import { DiagnosticosController } from './diagnosticos.controller';
import { RespuestasCuestionariosModule } from '../respuestas_cuestionarios/respuestas-cuestionarios.module';
import { RespeustaCuestionario } from '../respuestas_cuestionarios/entities/respuesta-cuestionario.entity';
import { RolIngeniero } from '../rol-ingeniero/entities/rol-ingeniero.entity';
import { DiagnosticoRolIngeniero } from '../diagnostico-rol-ingeniero/entities/diagnostico-rol-ingeniero.entity';
import { CuestionarioSeccionCuestionario } from '../cuestionario-seccion-cuestionario/entities/cuestionario-seccion-cuestionario.entity';
import { SeccionCuestionario } from '../seccion_cuestionario/entities/seccion_cuestionario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Diagnostico,
      RespeustaCuestionario,
      RolIngeniero,
      DiagnosticoRolIngeniero,
      CuestionarioSeccionCuestionario,
      SeccionCuestionario,
    ]),
    RespuestasCuestionariosModule,
  ],
  providers: [DiagnosticosService],
  exports: [DiagnosticosService],
  controllers: [DiagnosticosController],
})
export class DiagnosticosModule {}
