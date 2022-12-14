import { ENTITIES } from 'src/shared/utilities/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROL_MAX_LENGTH } from '../rules/columns.rule';

@Entity({ name: ENTITIES.RolUsuario })
export class RolUsuario {
  @PrimaryGeneratedColumn()
  public id_rol_usuario!: number;

  @Column({ type: 'varchar', length: ROL_MAX_LENGTH, unique: true })
  public rol: string;

  @Column({ type: 'boolean', default: true })
  public activo: boolean;

}
