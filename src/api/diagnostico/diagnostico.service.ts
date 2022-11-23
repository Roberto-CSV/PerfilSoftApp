import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiagnosticoDto } from './dto/create-diagnostico.dto';
import { UpdateDiagnosticoDto } from './dto/update-diagnostico.dto';
import { Diagnostico } from './entities/diagnostico.entity';

@Injectable()
export class DiagnosticoService {
  constructor(
    @InjectRepository(Diagnostico)
    private readonly repoDiagnostico: Repository<Diagnostico>,
  ) {}
  create(createDiagnosticoDto: CreateDiagnosticoDto) {
    let diagnostico = null;
    try {
      diagnostico = this.repoDiagnostico.create(createDiagnosticoDto);
      this.repoDiagnostico.save(diagnostico);
    } catch (error) {
      console.log(error);
    }
    return diagnostico == null ? false : true;
  }

  findAll() {
    return this.repoDiagnostico.find();
  }

  findOne(id: number) {
    return this.repoDiagnostico.findOne({
      where: {
        id_diagnostico: id,
      },
    });
  }

  update(id: number, updateDiagnosticoDto: UpdateDiagnosticoDto) {
    let diagnostico = null;
    try {
      diagnostico = this.repoDiagnostico.update(
        { id_diagnostico: id },
        updateDiagnosticoDto,
      );
      this.repoDiagnostico.save(diagnostico);
    } catch (error) {
      console.log(error);
    }
    return diagnostico == null ? false : true;
  }

  remove(id: number) {
    return `This action removes a #${id} diagnostico`;
  }
}
