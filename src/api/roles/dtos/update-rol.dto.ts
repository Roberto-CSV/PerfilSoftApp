import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ROL_MAX_LENGTH } from '../rules/columns.rule';

export class UpdateRolDto {
  @MaxLength(ROL_MAX_LENGTH)
  @IsString()
  @IsNotEmpty()
  public rol?: string;
}
