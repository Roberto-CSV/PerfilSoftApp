import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolIngeniero } from '../rol-ingeniero/entities/rol-ingeniero.entity';
import { CreateDiagnosticoRolIngenieroDto } from './dto/create-diagnostico-rol-ingeniero.dto';
import { UpdateDiagnosticoRolIngenieroDto } from './dto/update-diagnostico-rol-ingeniero.dto';
import { DiagnosticoRolIngeniero } from './entities/diagnostico-rol-ingeniero.entity';

@Injectable()
export class DiagnosticoRolIngenieroService {
  constructor(
    @InjectRepository(DiagnosticoRolIngeniero)
    private readonly diagnosticoRolIngenieroRepository: Repository<DiagnosticoRolIngeniero>,
    @InjectRepository(RolIngeniero)
    private readonly rolIngenieroRepository: Repository<RolIngeniero>,
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

  async getAllByDiagnosticoId(id: number) {
    const diagnosticosRolIngeniero =
      await this.diagnosticoRolIngenieroRepository.findBy({
        fk_diagnostico: id,
      });
    let response: {
      diagnosticoRolIngeniero: DiagnosticoRolIngeniero;
      rolIngeniero: RolIngeniero;
    }[] = [];
    for (let diagnosticoRolIngeniero of diagnosticosRolIngeniero) {
      response.push({
        diagnosticoRolIngeniero: diagnosticoRolIngeniero,
        rolIngeniero: await this.rolIngenieroRepository.findOne({
          where: {
            id_rol_ingeniero: diagnosticoRolIngeniero.fk_rol_ingeniero,
          },
        }),
      });
    }

    return response;
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
