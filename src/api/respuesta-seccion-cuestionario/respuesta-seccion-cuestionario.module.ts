import { Module } from '@nestjs/common';
import { RespuestaSeccionCuestionarioService } from './respuesta-seccion-cuestionario.service';
import { RespuestaSeccionCuestionarioController } from './respuesta-seccion-cuestionario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestaSeccionCuestionario } from './entities/respuesta-seccion-cuestionario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RespuestaSeccionCuestionario])],
  providers: [RespuestaSeccionCuestionarioService],
  controllers: [RespuestaSeccionCuestionarioController],
  exports: [RespuestaSeccionCuestionarioService]
})
export class RespuestaSeccionCuestionarioModule {}
