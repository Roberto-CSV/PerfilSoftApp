import { Module } from '@nestjs/common';
import { RolIngenieroService } from './rol-ingeniero.service';
import { RolIngenieroController } from './rol-ingeniero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolIngeniero } from './entities/rol-ingeniero.entity';
import { RolIngenieroHabilidad } from '../rol-ingeniero-habilidad/entities/rol-ingeniero-habilidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolIngeniero, RolIngenieroHabilidad])],
  controllers: [RolIngenieroController],
  providers: [RolIngenieroService],
})
export class RolIngenieroModule {}
