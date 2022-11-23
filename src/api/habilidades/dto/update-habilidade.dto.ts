import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { TipoHabilidad } from 'src/api/tipo_habilidad/entities/tipo_habilidad.entity';
import { MAX_LENGTH_HABILIDAD } from '../rules/columns.rule';
import { CreateHabilidadeDto } from './create-habilidade.dto';

export class UpdateHabilidadeDto extends PartialType(CreateHabilidadeDto) {
  @IsNotEmpty()
  @IsNumber()
  id_habilidad?: number;
}
