import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('opcion_respuesta')
export class OpcionRespuesta {
  @PrimaryGeneratedColumn()
  id_opcion_respuesta: number;
  @Column()
  fk_pregunta: string;
  @Column()
  opcion_respuesta: string;
  @Column()
  porcentaje_exactitud: string;
}
