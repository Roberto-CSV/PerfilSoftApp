import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/shared/interfaces/IService.interface';
import {
  existsException,
  notFoundException,
} from 'src/shared/utilities/http-exceptions';
import { Repository } from 'typeorm';
import { CreateSemestreDto } from './dtos/create-semestre.dto';
import { UpdateSemestreDto } from './dtos/update-semestre.dto';
import { Semestre } from './entities/semestre.entity';

@Injectable()
export class SemestresService implements IService {
  private readonly ENTITY_NAME = 'Semestre';

  constructor(
    @InjectRepository(Semestre)
    private readonly semestresRepository: Repository<Semestre>,
  ) {}

  async create(semestre: CreateSemestreDto) {
    const existsSemestre: boolean = await this.existsBySemestre(
      semestre.semestre,
    );
    if (existsSemestre) {
      throw existsException(this.ENTITY_NAME);
    }
    const newSemestre: Semestre = this.semestresRepository.create(semestre);
    return this.semestresRepository.save(newSemestre);
  }

  getAll(): Promise<Semestre[]> {
    return this.semestresRepository.find();
  }

  async getById(id: number) {
    const existsSemestre: boolean = await this.existsById(id);
    if (!existsSemestre) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.semestresRepository.findOne({
      where: {
        id_semestre: id,
      },
    });
  }

  async update(id: number, semestre: UpdateSemestreDto) {
    const existsSemestre: boolean = await this.existsById(id);
    if (!existsSemestre) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.semestresRepository.update({ id_semestre: id }, semestre);
  }

  async delete(id: number) {
    const existsSemestre: boolean = await this.existsById(id);
    if (!existsSemestre) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.semestresRepository.delete({ id_semestre: id });
  }

  async existsById(id: number): Promise<boolean> {
    const semestreFound = await this.semestresRepository.findOne({
      where: {
        id_semestre: id,
      },
    });
    return semestreFound === null ? false : true;
  }

  async existsBySemestre(semestre: number): Promise<boolean> {
    const semestreFound = await this.semestresRepository.findOne({
      where: {
        semestre: semestre,
      },
    });
    return semestreFound === null ? false : true;
  }
}
