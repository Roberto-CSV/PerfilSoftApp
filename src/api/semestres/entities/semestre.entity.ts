import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'SEMESTRES'})
export class Semestre {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer', unique: true })
  semestre: number;

}
