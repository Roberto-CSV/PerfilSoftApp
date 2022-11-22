import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'diagnostico'})
export class Diagnostico {
  @PrimaryGeneratedColumn()
  id_diagnostico!: number;

  @Column({type: "integer"})
  fk_usuario: number;

  @Column({type: "integer"})
  fk_respuesta_cuestionario: number;

}