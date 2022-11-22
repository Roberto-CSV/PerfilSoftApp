import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  APELLIDO_MAX_LENGTH,
  CLAVE_MAX_LENGTH,
  CORREO_MAX_LENGTH,
  NOMBRE_MAX_LENGTH,
} from '../rules/columns.rule';

export class UpdateUsuarioDto {
  @MaxLength(NOMBRE_MAX_LENGTH)
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @MaxLength(APELLIDO_MAX_LENGTH)
  @IsString()
  @IsNotEmpty()
  apellido?: string;

  @MaxLength(CORREO_MAX_LENGTH)
  @IsEmail()
  correo?: string;

  @MaxLength(CLAVE_MAX_LENGTH)
  @IsString()
  @IsNotEmpty()
  clave?: string;

  @IsNumber()
  fk_rol_usuario?: number;

  @IsNumber()
  fk_semestre?: number;
}
