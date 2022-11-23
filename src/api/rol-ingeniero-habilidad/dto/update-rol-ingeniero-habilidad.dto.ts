import { PartialType } from '@nestjs/swagger';
import { CreateRolIngenieroHabilidadDto } from './create-rol-ingeniero-habilidad.dto';

export class UpdateRolIngenieroHabilidadDto extends PartialType(
  CreateRolIngenieroHabilidadDto,
) {
  id_rol_ingeniero_habilidad: number;
}
