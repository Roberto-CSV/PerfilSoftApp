import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SeccionCuestionario {
  @PrimaryGeneratedColumn()
  id_seccion_cuestionario: number;
  @Column()
  @IsNotEmpty()
  fk_habilidad: number;
  @Column()
  seccion: string;
  @Column()
  estandar_puntuacion: number;
}
