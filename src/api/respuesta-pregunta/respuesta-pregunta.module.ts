import { Module } from '@nestjs/common';
import { RespuestaPreguntaService } from './respuesta-pregunta.service';
import { RespuestaPreguntaController } from './respuesta-pregunta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestaPregunta } from './entities/respuesta-pregunta.entity';
import { OpcionRespuesta } from '../opcion_respuesta/entities/opcion_respuesta.entity';
import { Pregunta } from '../pregunta/entities/pregunta.entity';
import { RespuestaSeccionCuestionario } from '../respuesta-seccion-cuestionario/entities/respuesta-seccion-cuestionario.entity';
import { RespuestaSeccionCuestionarioModule } from '../respuesta-seccion-cuestionario/respuesta-seccion-cuestionario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RespuestaPregunta,
      OpcionRespuesta,
      Pregunta,
      RespuestaSeccionCuestionario,
    ]),
    RespuestaSeccionCuestionarioModule
  ],
  controllers: [RespuestaPreguntaController],
  providers: [RespuestaPreguntaService],
})
export class RespuestaPreguntaModule {}
