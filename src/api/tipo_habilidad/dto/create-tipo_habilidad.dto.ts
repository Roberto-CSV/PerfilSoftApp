import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { MAX_LENGTH_TIPO } from '../rules/columns.rule';

export class CreateTipoHabilidadDto {
  @MaxLength(MAX_LENGTH_TIPO)
  @IsNotEmpty()
  @IsString()
  tipo: string;
}
