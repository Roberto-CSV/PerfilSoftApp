import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cuestionario_seccion_cuestionario' })
export class CuestionarioSeccionCuestionario {
  @PrimaryGeneratedColumn()
  public id_cuestionario_seccion_cuestionario: number;

  @Column({ type: 'integer' })
  public fk_cuestionario: number;

  @Column({ type: 'integer' })
  public fk_seccion_cuestionario: number;
}
