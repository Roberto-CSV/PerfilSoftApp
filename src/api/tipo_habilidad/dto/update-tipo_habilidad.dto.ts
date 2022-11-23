import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { MAX_LENGTH_TIPO } from '../rules/columns.rule';
import { CreateTipoHabilidadDto } from './create-tipo_habilidad.dto';

export class UpdateTipoHabilidadDto extends PartialType(
  CreateTipoHabilidadDto,
) {
  @MaxLength(MAX_LENGTH_TIPO)
  @IsNotEmpty()
  @IsString()
  tipo?: string;
}
