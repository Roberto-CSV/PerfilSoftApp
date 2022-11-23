import { Module } from '@nestjs/common';
import { DiagnosticoService } from './diagnostico.service';
import { DiagnosticoController } from './diagnostico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnostico } from './entities/diagnostico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnostico])],
  controllers: [DiagnosticoController],
  providers: [DiagnosticoService],
})
export class DiagnosticoModule {}
