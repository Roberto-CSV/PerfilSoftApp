import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOpcionRespuestaDto } from './dto/create-opcion_respuesta.dto';
import { UpdateOpcionRespuestaDto } from './dto/update-opcion_respuesta.dto';
import { OpcionRespuesta } from './entities/opcion_respuesta.entity';

@Injectable()
export class OpcionRespuestaService {
  constructor(
    @InjectRepository(OpcionRespuesta)
    private readonly repoOpcionRespuesta: Repository<OpcionRespuesta>,
  ) {}
  create(createOpcionRespuestaDto: CreateOpcionRespuestaDto) {
    let opcion = null;
    try {
      opcion = this.repoOpcionRespuesta.create(createOpcionRespuestaDto);
      this.repoOpcionRespuesta.save(opcion);
    } catch (error) {
      console.log(error);
    }
    return opcion == null ? false : true;
  }

  findAll() {
    return this.repoOpcionRespuesta.find();
  }

  findOne(id: number) {
    return this.repoOpcionRespuesta.findOne({
      where: { id_opcion_respuesta: id },
    });
  }

  update(id: number, updateOpcionRespuestaDto: UpdateOpcionRespuestaDto) {
    let opcion = null;
    try {
      opcion = this.repoOpcionRespuesta.update(
        { id_opcion_respuesta: id },
        updateOpcionRespuestaDto,
      );
      this.repoOpcionRespuesta.save(opcion);
    } catch (error) {
      console.log(error);
    }
    return opcion == null ? false : true;
  }

  remove(id: number) {
    return `This action removes a #${id} opcionRespuesta`;
  }
}
