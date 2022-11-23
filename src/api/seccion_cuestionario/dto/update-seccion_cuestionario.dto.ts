import { PartialType } from '@nestjs/swagger';
import { CreateSeccionCuestionarioDto } from './create-seccion_cuestionario.dto';

export class UpdateSeccionCuestionarioDto extends PartialType(
  CreateSeccionCuestionarioDto,
) {
  id_seccion_cuestionario: number;
}
