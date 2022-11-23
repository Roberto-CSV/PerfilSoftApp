import { IsDate, IsDateString, IsNumber } from 'class-validator';

export class CreateRespeustaCuestionarioDto {
  @IsNumber()
  fk_cuestionario: number;

  @IsDate()
  fecha_desarrollo?: Date;

  @IsNumber()
  fk_usuario: number;
}
