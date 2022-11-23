import { PartialType } from '@nestjs/swagger';
import { CreateCuestionarioSeccionCuestionarioDto } from './create-cuestionario-seccion-cuestionario.dto';

export class UpdateCuestionarioSeccionCuestionarioDto extends PartialType(
  CreateCuestionarioSeccionCuestionarioDto,
) {
  id_cuestionario_seccion_cuestionario: number;
}
