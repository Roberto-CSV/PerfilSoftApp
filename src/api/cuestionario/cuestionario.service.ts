import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCuestionarioDto } from './dto/create-cuestionario.dto';
import { UpdateCuestionarioDto } from './dto/update-cuestionario.dto';
import { Cuestionario } from './entities/cuestionario.entity';

@Injectable()
export class CuestionarioService {
  constructor(
    @InjectRepository(Cuestionario)
    private readonly repoCuestionario: Repository<Cuestionario>,
  ) {}
  create(createCuestionarioDto: CreateCuestionarioDto) {
    let cuestionario = null;
    try {
      cuestionario = this.repoCuestionario.create(createCuestionarioDto);
      this.repoCuestionario.save(cuestionario);
    } catch (error) {
      console.log(error);
    }
    return cuestionario == null ? false : true;
  }

  findAll() {
    return this.repoCuestionario.find();
  }

  findOne(id: number) {
    return this.repoCuestionario.findOne({ where: { id_cuestionario: id } });
  }

  update(id: number, updateCuestionarioDto: UpdateCuestionarioDto) {
    let cuestionario = null;
    try {
      cuestionario = this.repoCuestionario.update(
        { id_cuestionario: id },
        updateCuestionarioDto,
      );
      this.repoCuestionario.save(cuestionario);
    } catch (error) {
      console.log(error);
    }
    return cuestionario == null ? false : true;
  }

  remove(id: number) {
    return `This action removes a #${id} cuestionario`;
  }
}
