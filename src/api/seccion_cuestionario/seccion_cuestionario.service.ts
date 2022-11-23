import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSeccionCuestionarioDto } from './dto/create-seccion_cuestionario.dto';
import { UpdateSeccionCuestionarioDto } from './dto/update-seccion_cuestionario.dto';
import { SeccionCuestionario } from './entities/seccion_cuestionario.entity';

@Injectable()
export class SeccionCuestionarioService {
  constructor(
    @InjectRepository(SeccionCuestionario)
    private readonly repoSeccionCuestionario: Repository<SeccionCuestionario>,
  ) {}
  create(createSeccionCuestionarioDto: CreateSeccionCuestionarioDto) {
    let seccion = null;
    try {
      seccion = this.repoSeccionCuestionario.create(
        createSeccionCuestionarioDto,
      );
      this.repoSeccionCuestionario.save(seccion);
    } catch (error) {
      console.log(error);
    }
    return seccion == null ? false : true;
  }

  findAll() {
    return this.repoSeccionCuestionario.find();
  }

  findOne(id: number) {
    return this.repoSeccionCuestionario.findOne({
      where: { id_seccion_cuestionario: id },
    });
  }

  update(
    id: number,
    updateSeccionCuestionarioDto: UpdateSeccionCuestionarioDto,
  ) {
    let seccion = null;
    try {
      seccion = this.repoSeccionCuestionario.update(
        { id_seccion_cuestionario: id },
        updateSeccionCuestionarioDto,
      );
      console.log(seccion);

      this.repoSeccionCuestionario.save(seccion);
    } catch (error) {
      console.log(error);
    }
    return seccion == null ? false : true;
  }

  remove(id: number) {
    return `This action removes a #${id} seccionCuestionario`;
  }
}
