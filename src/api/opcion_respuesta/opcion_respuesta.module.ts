import { Module } from '@nestjs/common';
import { OpcionRespuestaService } from './opcion_respuesta.service';
import { OpcionRespuestaController } from './opcion_respuesta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpcionRespuesta } from './entities/opcion_respuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OpcionRespuesta])],
  controllers: [OpcionRespuestaController],
  providers: [OpcionRespuestaService],
})
export class OpcionRespuestaModule {}
