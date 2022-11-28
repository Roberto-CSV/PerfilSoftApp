import { Module } from '@nestjs/common';
import { DiagnosticoRolIngenieroService } from './diagnostico-rol-ingeniero.service';
import { DiagnosticoRolIngenieroController } from './diagnostico-rol-ingeniero.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticoRolIngeniero } from './entities/diagnostico-rol-ingeniero.entity';
import { RolIngeniero } from '../rol-ingeniero/entities/rol-ingeniero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosticoRolIngeniero, RolIngeniero])],
  controllers: [DiagnosticoRolIngenieroController],
  providers: [DiagnosticoRolIngenieroService],
  exports: [DiagnosticoRolIngenieroService],
})
export class DiagnosticoRolIngenieroModule {}
