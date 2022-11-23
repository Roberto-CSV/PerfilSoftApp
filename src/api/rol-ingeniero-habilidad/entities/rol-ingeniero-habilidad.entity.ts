import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rol_ingeniero_habilidad' })
export class RolIngenieroHabilidad {
  @PrimaryGeneratedColumn()
  public id_rol_ingeniero_habilidad: number;

  @Column({ type: 'integer' })
  public fk_rol_ingeniero: number;

  @Column({ type: 'integer' })
  public fk_habilidad: number;
}
