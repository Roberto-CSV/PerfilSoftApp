import { Module } from '@nestjs/common';
import { SeccionCuestionarioService } from './seccion_cuestionario.service';
import { SeccionCuestionarioController } from './seccion_cuestionario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeccionCuestionario } from './entities/seccion_cuestionario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeccionCuestionario])],
  controllers: [SeccionCuestionarioController],
  providers: [SeccionCuestionarioService],
})
export class SeccionCuestionarioModule {}
