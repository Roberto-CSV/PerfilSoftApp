import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'respuesta_pregunta' })
export class RespuestaPregunta {
  @PrimaryGeneratedColumn()
  public id_respuesta_pregunta: number;

  @Column({ type: 'integer' })
  public fk_respuesta_seccion_cuestionario: number;

  @Column({ type: 'integer' })
  public fk_opcion_respuesta: number;

  @Column({ type: 'integer' })
  public puntaje: number;
}
