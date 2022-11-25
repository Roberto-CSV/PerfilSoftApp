export class CuestionariosDto {
  id_cuestionario: number;
  semestre: number;
  puntuacion: number;

  seccion_cuestionario: SeccionCuestionario[];
}

export class SeccionCuestionario {
  id_seccion: number;
  seccion: string;
  habilidad: string;
  puntuacion_seccion: number;
  id_habilidad: number;
  pregunta: Preguntas[];
}
export class SeccionCuestionariodto {
  id_seccion: number;
  seccion: string;
  habilidad: string;
  puntuacion_seccion: number;
}

export class Preguntas {
  id_pregunta: number;
  enunciado: string;
  respuestas: Respuestas[];
}

export class Respuestas {
  id_respuesta: number;
  respuesta: string;
  puntiacion_respuesta: number;
}
