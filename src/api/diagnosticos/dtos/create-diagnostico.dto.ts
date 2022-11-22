import { IsNumber } from "class-validator";

export class CreateDiagnosticoDto {
  @IsNumber()
  fk_usuario: number;

  @IsNumber()
  fk_respuesta_cuestionario: number;
}
