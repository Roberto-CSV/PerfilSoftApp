import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticosService } from './diagnosticos.service';
import { Diagnostico } from './entities/diagnostico.entity';
import { DiagnosticosController } from './diagnosticos.controller';
import { RespuestasCuestionariosModule } from '../respuestas_cuestionarios/respuestas-cuestionarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnostico]), RespuestasCuestionariosModule],
  providers: [DiagnosticosService],
  exports: [DiagnosticosService],
  controllers: [DiagnosticosController]
})
export class DiagnosticosModule {}
