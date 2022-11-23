import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { TipoHabilidad } from 'src/api/tipo_habilidad/entities/tipo_habilidad.entity';
import { MAX_LENGTH_HABILIDAD } from '../rules/columns.rule';

export class CreateHabilidadeDto {
  @MaxLength(MAX_LENGTH_HABILIDAD)
  @IsNotEmpty()
  @IsString()
  habilidad: string;
  @IsNotEmpty()
  @IsNumber()
  fk_tipo_habilidad: number;
}
