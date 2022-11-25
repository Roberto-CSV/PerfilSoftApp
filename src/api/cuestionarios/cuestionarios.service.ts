import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/shared/interfaces/IService.interface';
import { ENTITIES } from 'src/shared/utilities/entities';
import { notFoundException } from 'src/shared/utilities/http-exceptions';
import { Repository, UpdateResult } from 'typeorm';
import { SemestresService } from '../semestres/semestres.service';
import { CreateCuestionarioDto } from './dtos/create_cuestionario.dto';
import { UpdateCuestionarioDto } from './dtos/update_cuestionario.dto';
import { Cuestionario } from './entities/cuestionario.entity';
import { CuestionarioRepository } from './cuestionario.repository';

@Injectable()
export class CuestionariosService implements IService {
  private readonly ENTITY_NAME = ENTITIES.Cuestionario;

  constructor(
    @InjectRepository(Cuestionario)
    private readonly cuestionariosRepository: Repository<Cuestionario>,
    private readonly semestresService: SemestresService,
    private cuestRepo: CuestionarioRepository,
  ) {}

  create(newCuestionario: CreateCuestionarioDto): Promise<Cuestionario> {
    const cuestionario: Cuestionario =
      this.cuestionariosRepository.create(newCuestionario);
    return this.cuestionariosRepository.save(cuestionario);
  }

  getAll(): Promise<Cuestionario[]> {
    return this.cuestionariosRepository.find();
  }

  async getById(id: number): Promise<Cuestionario> {
    const existsCuestionario: boolean = await this.existsById(id);
    if (!existsCuestionario) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.cuestionariosRepository.findOne({
      where: {
        id_cuestionario: id,
      },
    });
  }

  async update(
    id: number,
    cuestionario: UpdateCuestionarioDto,
  ): Promise<UpdateResult> {
    const existsCuestionario: boolean = await this.existsById(id);
    if (!existsCuestionario) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.cuestionariosRepository.update(
      { id_cuestionario: id },
      cuestionario,
    );
  }

  async delete(id: number) {
    const existsCuestionario: boolean = await this.existsById(id);
    if (!existsCuestionario) {
      throw notFoundException(id, this.ENTITY_NAME);
    }
    return this.cuestionariosRepository.delete({ id_cuestionario: id });
  }

  async existsById(id: number) {
    const foundCuestionario: Cuestionario =
      await this.cuestionariosRepository.findOne({
        where: {
          id_cuestionario: id,
        },
      });
    return foundCuestionario === null ? false : true;
  }

  async getAllBySemestreId(id: number) {
    const existsSemestre: boolean = await this.semestresService.existsById(id);
    if (!existsSemestre) {
      throw notFoundException(id, ENTITIES.Semestre);
    }
    return this.cuestionariosRepository.findBy({ fk_semestre: id });
  }

  getAllRepo(id: number) {
    return this.cuestRepo.findAllCuestionario(id);
  }
}
