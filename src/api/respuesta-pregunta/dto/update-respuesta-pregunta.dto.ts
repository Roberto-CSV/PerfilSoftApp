import { PartialType } from '@nestjs/swagger';
import { CreateRespuestaPreguntaDto } from './create-respuesta-pregunta.dto';

export class UpdateRespuestaPreguntaDto extends PartialType(
  CreateRespuestaPreguntaDto,
) {
  id_respuesta_pregunta: number;
}
