import { IsNumber } from "class-validator";

export class CreateCuestionarioDto {
  @IsNumber()
  fk_semestre: number;

  @IsNumber()
  puntuacion_estandar: number;

}