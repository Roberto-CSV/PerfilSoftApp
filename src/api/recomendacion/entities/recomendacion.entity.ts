import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recomendacion')
export class Recomendacion {
  @PrimaryGeneratedColumn()
  id_recomendacion: number;
  @Column()
  fk_opcion_respuesta: number;
  @Column()
  recomendacion: string;
}
