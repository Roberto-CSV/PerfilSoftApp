import { PartialType } from '@nestjs/swagger';
import { CreateOpcionRespuestaDto } from './create-opcion_respuesta.dto';

export class UpdateOpcionRespuestaDto extends PartialType(
  CreateOpcionRespuestaDto,
) {
  id_opcion_respuesta: number;
}
