import { ENTITIES } from 'src/shared/utilities/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: ENTITIES.Cuestionario })
export class Cuestionario {
  @PrimaryGeneratedColumn()
  id_cuestionario!: number;

  @Column({ type: 'integer' })
  fk_semestre: number;

  @Column({ type: 'integer' })
  estandar_puntuacion: number;

  @Column({ type: 'text' })
  nombre: string;
}
