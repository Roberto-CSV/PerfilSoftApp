import { TipoHabilidad } from 'src/api/tipo_habilidad/entities/tipo_habilidad.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MAX_LENGTH_HABILIDAD } from '../rules/columns.rule';

@Entity({ name: 'habilidad' })
export class Habilidad {
  @PrimaryGeneratedColumn()
  id_habilidad!: number;
  @Column({ type: 'varchar', length: MAX_LENGTH_HABILIDAD })
  habilidad: string;
  @Column({ type: 'integer' })
  fk_tipo_habilidad: number;
}
