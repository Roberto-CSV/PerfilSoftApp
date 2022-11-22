import { Usuario } from 'src/api/usuarios/entities/usuario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'semestre' })
export class Semestre {
  @PrimaryGeneratedColumn()
  id_semestre!: number;

  @Column({ type: 'integer', unique: true })
  semestre: number;

}
