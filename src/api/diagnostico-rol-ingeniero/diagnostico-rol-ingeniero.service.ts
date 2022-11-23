import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiagnosticoRolIngenieroDto } from './dto/create-diagnostico-rol-ingeniero.dto';
import { UpdateDiagnosticoRolIngenieroDto } from './dto/update-diagnostico-rol-ingeniero.dto';
import { DiagnosticoRolIngeniero } from './entities/diagnostico-rol-ingeniero.entity';

@Injectable()
export class DiagnosticoRolIngenieroService {
  constructor(
    @InjectRepository(DiagnosticoRolIngeniero)
    private readonly diagnosticoRolIngenieroRepository: Repository<DiagnosticoRolIngeniero>,
  ) {}
  create(createDiagnosticoRolIngenieroDto: CreateDiagnosticoRolIngenieroDto) {
    const newSemestre: DiagnosticoRolIngeniero =
      this.diagnosticoRolIngenieroRepository.create(
        createDiagnosticoRolIngenieroDto,
      );
    return this.diagnosticoRolIngenieroRepository.save(newSemestre);
  }

  findAll() {
    return this.diagnosticoRolIngenieroRepository.find();
  }

  findOne(id: number) {
    return this.diagnosticoRolIngenieroRepository.findOne({
      where: {
        id_diagnostico_rol_ingeniero: id,
      },
    });
  }

  update(
    id_diagnostico_rol_ingeniero: number,
    updateDiagnosticoRolIngenieroDto: UpdateDiagnosticoRolIngenieroDto,
  ) {
    return this.diagnosticoRolIngenieroRepository.update(
      { id_diagnostico_rol_ingeniero },
      updateDiagnosticoRolIngenieroDto,
    );
  }

  remove(id_diagnostico_rol_ingeniero: number) {
    return this.diagnosticoRolIngenieroRepository.delete({
      id_diagnostico_rol_ingeniero,
    });
  }
}
