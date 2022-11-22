import { IsNumber } from 'class-validator';

export class UpdateCuestionarioDto {
  @IsNumber()
  fk_semestre: number;

  @IsNumber()
  puntuacion_estandar: number;
}
