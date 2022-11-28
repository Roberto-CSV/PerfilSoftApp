import { IsNumber } from 'class-validator';

export class UpdateRespuestaSeccionCuestionarioDto {
  @IsNumber()
  fk_seccion_cuestionario: number;

  @IsNumber()
  fk_respuesta_cuestionario: number;

  @IsNumber()
  puntaje: number;
}
