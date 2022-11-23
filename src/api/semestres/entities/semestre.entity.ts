import { Cuestionario } from 'src/api/cuestionario/entities/cuestionario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SEMESTRES' })
export class Semestre {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer', unique: true })
  semestre: number;
}
