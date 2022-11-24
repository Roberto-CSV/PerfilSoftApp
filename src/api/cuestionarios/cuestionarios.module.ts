import { Module } from '@nestjs/common';
import { CuestionariosService } from './cuestionarios.service';
import { CuestionariosController } from './cuestionarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuestionario } from './entities/cuestionario.entity';
import { SemestresModule } from '../semestres/semestres.module';
import { CuestionarioRepository } from './cuestionario.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cuestionario]), SemestresModule],
  providers: [CuestionariosService, CuestionarioRepository],
  controllers: [CuestionariosController],
  exports: [CuestionariosService],
})
export class CuestionariosModule {}
