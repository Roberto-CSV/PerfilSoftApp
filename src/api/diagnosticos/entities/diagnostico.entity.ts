import { ENTITIES } from "src/shared/utilities/entities";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:ENTITIES.Diagnostico})
export class Diagnostico {
  @PrimaryGeneratedColumn()
  id_diagnostico!: number;

  @Column({type: "integer"})
  fk_respuesta_cuestionario: number;

}