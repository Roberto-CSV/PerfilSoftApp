import { PartialType } from '@nestjs/swagger';
import { CreateRecomendacionDto } from './create-recomendacion.dto';

export class UpdateRecomendacionDto extends PartialType(
  CreateRecomendacionDto,
) {
  id_recomendacion: number;
}
