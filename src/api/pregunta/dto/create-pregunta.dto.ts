export class CreatePreguntaDto {
  fk_habilidad: number;
  fk_seccion_cuestionario: number;
  enunciado: string;
  activo: boolean;
  puntos: number;
}
