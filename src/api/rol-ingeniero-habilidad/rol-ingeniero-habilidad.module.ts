import { Module } from '@nestjs/common';
import { RolIngenieroHabilidadService } from './rol-ingeniero-habilidad.service';
import { RolIngenieroHabilidadController } from './rol-ingeniero-habilidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolIngenieroHabilidad } from './entities/rol-ingeniero-habilidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolIngenieroHabilidad])],
  controllers: [RolIngenieroHabilidadController],
  providers: [RolIngenieroHabilidadService],
})
export class RolIngenieroHabilidadModule {}
