import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ROL_MAX_LENGTH } from '../rules/columns.rule';

export class CreateRolDto {
  @MaxLength(ROL_MAX_LENGTH)
  @IsString()
  @IsNotEmpty()
  public rol: string;
}
