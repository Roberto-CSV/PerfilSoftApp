import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiagnosticoRecomendacionDto } from './dto/create-diagnostico_recomendacion.dto';
import { UpdateDiagnosticoRecomendacionDto } from './dto/update-diagnostico_recomendacion.dto';
import { DiagnosticoRecomendacion } from './entities/diagnostico_recomendacion.entity';

@Injectable()
export class DiagnosticoRecomendacionService {
  constructor(
    @InjectRepository(DiagnosticoRecomendacion)
    private readonly repoDiagnosticoRecomendacion: Repository<DiagnosticoRecomendacion>,
  ) {}
  create(createDiagnosticoRecomendacionDto: CreateDiagnosticoRecomendacionDto) {
    let diagnosticoRecomendacion = null;
    try {
      diagnosticoRecomendacion = this.repoDiagnosticoRecomendacion.create(
        createDiagnosticoRecomendacionDto,
      );
      this.repoDiagnosticoRecomendacion.save(diagnosticoRecomendacion);
    } catch (error) {}
    return diagnosticoRecomendacion == null ? false : true;
  }

  findAll() {
    return this.repoDiagnosticoRecomendacion.find();
  }

  findOne(id: number) {
    return this.repoDiagnosticoRecomendacion.findOne({
      where: { id_diagnostico_recomendacion: id },
    });
  }

  update(
    id: number,
    updateDiagnosticoRecomendacionDto: UpdateDiagnosticoRecomendacionDto,
  ) {
    let diagnosticoRecomendacion = null;
    try {
      diagnosticoRecomendacion = this.repoDiagnosticoRecomendacion.update(
        { id_diagnostico_recomendacion: id },
        updateDiagnosticoRecomendacionDto,
      );
      this.repoDiagnosticoRecomendacion.save(diagnosticoRecomendacion);
    } catch (error) {}
    return diagnosticoRecomendacion == null ? false : true;
  }

  remove(id: number) {
    return `This action removes a #${id} diagnosticoRecomendacion`;
  }
}
