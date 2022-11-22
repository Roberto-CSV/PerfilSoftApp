import { ENTITIES } from 'src/shared/utilities/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: ENTITIES.Semestre })
export class Semestre {
  @PrimaryGeneratedColumn()
  id_semestre!: number;

  @Column({ type: 'integer', unique: true })
  semestre: number;

}
