import { Usuario } from 'src/api/usuarios/entities/usuario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ROL_MAX_LENGTH } from '../rules/columns.rule';

@Entity({ name: 'ROLES' })
export class Rol {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: ROL_MAX_LENGTH, unique: true })
  public rol: string;

  @Column({ type: 'boolean', default: true })
  public activo: boolean;

  @OneToMany(() => Usuario, usuario => usuario.rol)
  usuarios: Usuario[]
}
