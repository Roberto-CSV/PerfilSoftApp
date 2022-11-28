import { Module } from '@nestjs/common';
import { RespuestaSeccionCuestionarioService } from './respuesta-seccion-cuestionario.service';
import { RespuestaSeccionCuestionarioController } from './respuesta-seccion-cuestionario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestaSeccionCuestionario } from './entities/respuesta-seccion-cuestionario.entity';
import { RespuestaPregunta } from '../respuesta-pregunta/entities/respuesta-pregunta.entity';
import { SeccionCuestionario } from '../seccion_cuestionario/entities/seccion_cuestionario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RespuestaSeccionCuestionario,
      RespuestaPregunta,
      SeccionCuestionario,
    ]),
  ],
  providers: [RespuestaSeccionCuestionarioService],
  controllers: [RespuestaSeccionCuestionarioController],
  exports: [RespuestaSeccionCuestionarioService],
})
export class RespuestaSeccionCuestionarioModule {}
