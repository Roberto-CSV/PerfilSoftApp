import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipoHabilidadService } from './tipo_habilidad.service';
import { CreateTipoHabilidadDto } from './dto/create-tipo_habilidad.dto';
import { UpdateTipoHabilidadDto } from './dto/update-tipo_habilidad.dto';

@Controller()
export class TipoHabilidadController {
  constructor(private readonly tipoHabilidadService: TipoHabilidadService) {}

  @Post()
  create(@Body() createTipoHabilidadDto: CreateTipoHabilidadDto) {
    return this.tipoHabilidadService.create(createTipoHabilidadDto);
  }

  @Get()
  findAll() {
    return this.tipoHabilidadService.findAll();
  }

  @Get('byId/:id')
  findOne(@Param('id') id: number) {
    return this.tipoHabilidadService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTipoHabilidadDto: UpdateTipoHabilidadDto,
  ) {
    return this.tipoHabilidadService.update(+id, updateTipoHabilidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tipoHabilidadService.remove(+id);
  }
}
