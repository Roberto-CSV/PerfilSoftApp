import { Rol } from 'src/api/roles/entities/rol.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
  APELLIDO_MAX_LENGTH,
  CLAVE_MAX_LENGTH,
  CORREO_MAX_LENGTH,
  NOMBRE_MAX_LENGTH,
} from '../rules/columns.rule';

@Entity({ name: 'USUARIOS' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: NOMBRE_MAX_LENGTH })
  nombre: string;

  @Column({ type: 'varchar', length: APELLIDO_MAX_LENGTH })
  apellido: string;

  @Column({ type: 'varchar', length: CORREO_MAX_LENGTH })
  correo: string;

  @Column({ type: 'varchar', length: CLAVE_MAX_LENGTH })
  clave: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'number'})
  rolId: number;

  @ManyToOne(() => Rol, rol => rol.usuarios)
  rol: Rol
}
