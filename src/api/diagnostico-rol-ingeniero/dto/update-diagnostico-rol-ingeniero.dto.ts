import { PartialType } from '@nestjs/swagger';
import { CreateDiagnosticoRolIngenieroDto } from './create-diagnostico-rol-ingeniero.dto';

export class UpdateDiagnosticoRolIngenieroDto extends PartialType(
  CreateDiagnosticoRolIngenieroDto,
) {
  id_diagnostico_rol_ingeniero: number;
}
