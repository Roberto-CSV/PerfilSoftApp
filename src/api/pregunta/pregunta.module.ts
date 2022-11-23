import { Module } from '@nestjs/common';
import { PreguntaService } from './pregunta.service';
import { PreguntaController } from './pregunta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from './entities/pregunta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pregunta])],
  controllers: [PreguntaController],
  providers: [PreguntaService],
})
export class PreguntaModule {}
