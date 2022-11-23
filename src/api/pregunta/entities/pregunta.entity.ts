import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pregunta')
export class Pregunta {
  @PrimaryGeneratedColumn()
  id_pregunta: number;
  @Column()
  fk_habilidad: number;
  @Column()
  fk_seccion_cuestionario: number;
  @Column()
  enunciado: string;
  @Column()
  activo: boolean;
  @Column()
  puntos: number;
}
