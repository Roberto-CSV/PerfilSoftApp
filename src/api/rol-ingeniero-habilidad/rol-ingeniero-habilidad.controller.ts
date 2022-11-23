import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolIngenieroHabilidadService } from './rol-ingeniero-habilidad.service';
import { CreateRolIngenieroHabilidadDto } from './dto/create-rol-ingeniero-habilidad.dto';
import { UpdateRolIngenieroHabilidadDto } from './dto/update-rol-ingeniero-habilidad.dto';

@Controller('rol-ingeniero-habilidad')
export class RolIngenieroHabilidadController {
  constructor(private readonly rolIngenieroHabilidadService: RolIngenieroHabilidadService) {}

  @Post()
  create(@Body() createRolIngenieroHabilidadDto: CreateRolIngenieroHabilidadDto) {
    return this.rolIngenieroHabilidadService.create(createRolIngenieroHabilidadDto);
  }

  @Get()
  findAll() {
    return this.rolIngenieroHabilidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolIngenieroHabilidadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolIngenieroHabilidadDto: UpdateRolIngenieroHabilidadDto) {
    return this.rolIngenieroHabilidadService.update(+id, updateRolIngenieroHabilidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolIngenieroHabilidadService.remove(+id);
  }
}
