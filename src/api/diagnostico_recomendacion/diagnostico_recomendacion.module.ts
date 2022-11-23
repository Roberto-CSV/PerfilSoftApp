import { Module } from '@nestjs/common';
import { DiagnosticoRecomendacionService } from './diagnostico_recomendacion.service';
import { DiagnosticoRecomendacionController } from './diagnostico_recomendacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticoRecomendacion } from './entities/diagnostico_recomendacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosticoRecomendacion])],
  controllers: [DiagnosticoRecomendacionController],
  providers: [DiagnosticoRecomendacionService],
})
export class DiagnosticoRecomendacionModule {}
