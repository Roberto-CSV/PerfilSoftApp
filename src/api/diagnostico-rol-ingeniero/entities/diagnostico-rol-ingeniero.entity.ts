import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'diagnostico_rol_ingeniero' })
export class DiagnosticoRolIngeniero {
  @PrimaryGeneratedColumn()
  id_diagnostico_rol_ingeniero: number;

  @Column({ type: 'integer' })
  fk_diagnostico: number;
  @Column({ type: 'integer' })
  fk_rol_ingeniero: number;
  @Column({ type: 'integer' })
  porcentaje_similitud: number;
}
