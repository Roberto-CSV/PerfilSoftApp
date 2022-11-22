import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ROL_MAX_LENGTH } from '../rules/columns.rule';

export class UpdateRolUsuarioDto {
  @MaxLength(ROL_MAX_LENGTH)
  @IsString()
  @IsNotEmpty()
  rol?: string;

  @IsBoolean()
  activo?: boolean;
}
