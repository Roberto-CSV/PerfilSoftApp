import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoHabilidadDto } from './dto/create-tipo_habilidad.dto';
import { UpdateTipoHabilidadDto } from './dto/update-tipo_habilidad.dto';
import { TipoHabilidad } from './entities/tipo_habilidad.entity';

@Injectable()
export class TipoHabilidadService {
  constructor(
    @InjectRepository(TipoHabilidad)
    private readonly repoTipoHabilidad: Repository<TipoHabilidad>,
  ) {}
  create(createTipoHabilidadDto: CreateTipoHabilidadDto) {
    let estado = true;
    try {
      const tipoH = this.repoTipoHabilidad.create(createTipoHabilidadDto);
      this.repoTipoHabilidad.save(tipoH);
    } catch (error) {
      console.log(error);
      estado = false;
    }
    return estado;
  }

  findAll() {
    return this.repoTipoHabilidad.find();
  }

  findOne(id: number) {
    let tipo = null;
    try {
      tipo = this.repoTipoHabilidad.findOne({
        where: {
          id_tipo_habilidad: id,
        },
      });
    } catch (error) {
      console.log(error);
      tipo = 'No existe un rol con ese id';
    }
    return tipo;
  }

  update(id: number, updateTipoHabilidadDto: UpdateTipoHabilidadDto) {
    let updateTipo = null;
    try {
      updateTipo = this.repoTipoHabilidad.update(
        { id_tipo_habilidad: id },
        updateTipoHabilidadDto,
      );
    } catch (error) {
      console.log(error);
    }
    return updateTipo === null ? false : true;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoHabilidad`;
  }
}
