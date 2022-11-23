import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('diagnostico')
export class Diagnostico {
  @PrimaryGeneratedColumn()
  id_diagnostico: number;
  @Column()
  fk_respuesta_cuestionario: number;
}
