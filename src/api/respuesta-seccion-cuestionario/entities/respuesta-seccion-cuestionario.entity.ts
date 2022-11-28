import { ENTITIES } from 'src/shared/utilities/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: ENTITIES.RespuestaSeccionCuestionario })
export class RespuestaSeccionCuestionario {
  @PrimaryGeneratedColumn()
  id_respuesta_seccion_cuestionario!: number;

  @Column({ type: 'integer' })
  fk_seccion_cuestionario: number;

  @Column({ type: 'integer' })
  puntaje: number;

  @Column({ type: 'integer' })
  fk_respuesta_cuestionario: number;
}
