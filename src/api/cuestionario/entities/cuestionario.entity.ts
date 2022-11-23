import { Semestre } from 'src/api/semestres/entities/semestre.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cuestionario')
export class Cuestionario {
  @PrimaryGeneratedColumn()
  id_cuestionario: number;
  @Column()
  fk_semestre: number;
  @Column()
  estandar_puntuacion: number;
}
