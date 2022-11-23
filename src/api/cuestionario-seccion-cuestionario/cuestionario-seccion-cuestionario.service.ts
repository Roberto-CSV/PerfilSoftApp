import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCuestionarioSeccionCuestionarioDto } from './dto/create-cuestionario-seccion-cuestionario.dto';
import { UpdateCuestionarioSeccionCuestionarioDto } from './dto/update-cuestionario-seccion-cuestionario.dto';
import { CuestionarioSeccionCuestionario } from './entities/cuestionario-seccion-cuestionario.entity';

@Injectable()
export class CuestionarioSeccionCuestionarioService {
  constructor(
    @InjectRepository(CuestionarioSeccionCuestionario)
    private readonly cuestionarioSeccionCuestionarioRepository: Repository<CuestionarioSeccionCuestionario>,
  ) {}

  create(
    createCuestionarioSeccionCuestionarioDto: CreateCuestionarioSeccionCuestionarioDto,
  ) {
    const newSemestre: CuestionarioSeccionCuestionario =
      this.cuestionarioSeccionCuestionarioRepository.create(
        createCuestionarioSeccionCuestionarioDto,
      );
    return this.cuestionarioSeccionCuestionarioRepository.save(newSemestre);
  }

  findAll() {
    return this.cuestionarioSeccionCuestionarioRepository.find();
  }

  findOne(id: number) {
    return this.cuestionarioSeccionCuestionarioRepository.findOne({
      where: {
        id_cuestionario_seccion_cuestionario: id,
      },
    });
  }

  update(
    id_cuestionario_seccion_cuestionario: number,
    updateCuestionarioSeccionCuestionarioDto: UpdateCuestionarioSeccionCuestionarioDto,
  ) {
    return this.cuestionarioSeccionCuestionarioRepository.update(
      { id_cuestionario_seccion_cuestionario },
      updateCuestionarioSeccionCuestionarioDto,
    );
  }

  remove(id_cuestionario_seccion_cuestionario: number) {
    return this.cuestionarioSeccionCuestionarioRepository.delete({
      id_cuestionario_seccion_cuestionario,
    });
  }
}
