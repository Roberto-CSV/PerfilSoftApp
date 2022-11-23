import { PartialType } from '@nestjs/swagger';
import { CreateDiagnosticoRecomendacionDto } from './create-diagnostico_recomendacion.dto';

export class UpdateDiagnosticoRecomendacionDto extends PartialType(
  CreateDiagnosticoRecomendacionDto,
) {
  id_diagnostico_recomendacion: number;
}
