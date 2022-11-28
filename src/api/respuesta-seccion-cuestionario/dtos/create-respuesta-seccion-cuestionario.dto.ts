import { IsNumber } from 'class-validator';

export class CreateRespuestaSeccionCuestionarioDto {
  @IsNumber()
  fk_seccion_cuestionario: number;

  @IsNumber()
  fk_respuesta_cuestionario: number;

}
