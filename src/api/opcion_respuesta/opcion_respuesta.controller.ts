import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpcionRespuestaService } from './opcion_respuesta.service';
import { CreateOpcionRespuestaDto } from './dto/create-opcion_respuesta.dto';
import { UpdateOpcionRespuestaDto } from './dto/update-opcion_respuesta.dto';

@Controller('opcion-respuesta')
export class OpcionRespuestaController {
  constructor(private readonly opcionRespuestaService: OpcionRespuestaService) {}

  @Post()
  create(@Body() createOpcionRespuestaDto: CreateOpcionRespuestaDto) {
    return this.opcionRespuestaService.create(createOpcionRespuestaDto);
  }

  @Get()
  findAll() {
    return this.opcionRespuestaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opcionRespuestaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpcionRespuestaDto: UpdateOpcionRespuestaDto) {
    return this.opcionRespuestaService.update(+id, updateOpcionRespuestaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opcionRespuestaService.remove(+id);
  }
}