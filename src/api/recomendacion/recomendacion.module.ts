import { Module } from '@nestjs/common';
import { RecomendacionService } from './recomendacion.service';
import { RecomendacionController } from './recomendacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recomendacion } from './entities/recomendacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recomendacion])],
  controllers: [RecomendacionController],
  providers: [RecomendacionService],
})
export class RecomendacionModule {}
