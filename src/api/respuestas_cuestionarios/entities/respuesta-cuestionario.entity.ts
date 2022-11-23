import { ENTITIES } from 'src/shared/utilities/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: ENTITIES.RespeustaCuestionario })
export class RespeustaCuestionario {
  @PrimaryGeneratedColumn()
  id_respuesta_cuestionario!: number;

  @Column({ type: 'integer' })
  fk_cuestionario: number;

  @Column({ type: 'date'})
  fecha_desarrollo: Date;

  @Column({ type: 'integer' })
  fk_usuario: number;
}
