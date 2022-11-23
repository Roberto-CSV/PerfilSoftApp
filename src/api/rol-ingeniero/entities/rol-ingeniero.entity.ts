import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rol_ingeniero' })
export class RolIngeniero {
  @PrimaryGeneratedColumn()
  public id_rol_ingeniero: number;

  @Column({ type: 'varchar' })
  public nombre: string;

  @Column({ type: 'varchar' })
  public descripcion: string;
}
