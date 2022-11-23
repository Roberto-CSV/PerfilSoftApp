import { IsNumber } from 'class-validator';

export class UpdateDiagnosticoDto {
  @IsNumber()
  fk_respuesta_cuestionario?: number;
}
