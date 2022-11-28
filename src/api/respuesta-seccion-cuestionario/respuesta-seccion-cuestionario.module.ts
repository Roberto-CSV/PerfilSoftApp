import { Module } from '@nestjs/common';
import { RespuestaSeccionCuestionarioService } from './respuesta-seccion-cuestionario.service';
import { RespuestaSeccionCuestionarioController } from './respuesta-seccion-cuestionario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestaSeccionCuestionario } from './entities/respuesta-seccion-cuestionario.entity';
import { RespuestaPregunta } from '../respuesta-pregunta/entities/respuesta-pregunta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RespuestaSeccionCuestionario, RespuestaPregunta])],
  providers: [RespuestaSeccionCuestionarioService],
  controllers: [RespuestaSeccionCuestionarioController],
  exports: [RespuestaSeccionCuestionarioService]
})
export class RespuestaSeccionCuestionarioModule {}
