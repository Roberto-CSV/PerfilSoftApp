import { Module } from '@nestjs/common';
import { RespuestaPreguntaService } from './respuesta-pregunta.service';
import { RespuestaPreguntaController } from './respuesta-pregunta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestaPregunta } from './entities/respuesta-pregunta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RespuestaPregunta])],
  controllers: [RespuestaPreguntaController],
  providers: [RespuestaPreguntaService],
})
export class RespuestaPreguntaModule {}
