import { Habilidad } from 'src/api/habilidades/entities/habilidad.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MAX_LENGTH_TIPO } from '../rules/columns.rule';

@Entity({ name: 'tipo_habilidad' })
export class TipoHabilidad {
  @PrimaryGeneratedColumn()
  id_tipo_habilidad!: number;
  @Column({ type: 'varchar', length: MAX_LENGTH_TIPO })
  tipo: string;
  @OneToMany(() => Habilidad, (habilidades) => habilidades.fk_tipo_habilidad)
  habilidades: Habilidad[];
}
