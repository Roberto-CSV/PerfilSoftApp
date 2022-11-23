import { Module } from '@nestjs/common';
import { CuestionarioSeccionCuestionarioService } from './cuestionario-seccion-cuestionario.service';
import { CuestionarioSeccionCuestionarioController } from './cuestionario-seccion-cuestionario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuestionarioSeccionCuestionario } from './entities/cuestionario-seccion-cuestionario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CuestionarioSeccionCuestionario])],
  controllers: [CuestionarioSeccionCuestionarioController],
  providers: [CuestionarioSeccionCuestionarioService],
})
export class CuestionarioSeccionCuestionarioModule {}
