import { PartialType } from '@nestjs/swagger';
import { CreateRolIngenieroDto } from './create-rol-ingeniero.dto';

export class UpdateRolIngenieroDto extends PartialType(CreateRolIngenieroDto) {
  id_rol_ingeniero: number;
}
