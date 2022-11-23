import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('diagnostico_recomendacion')
export class DiagnosticoRecomendacion {
  @PrimaryGeneratedColumn()
  id_diagnostico_recomendacion: number;
  @Column()
  fk_diagnostico: number;
  @Column()
  fk_recomendacion: number;
}
