import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeccionCuestionarioService } from './seccion_cuestionario.service';
import { CreateSeccionCuestionarioDto } from './dto/create-seccion_cuestionario.dto';
import { UpdateSeccionCuestionarioDto } from './dto/update-seccion_cuestionario.dto';

@Controller('seccion-cuestionario')
export class SeccionCuestionarioController {
  constructor(private readonly seccionCuestionarioService: SeccionCuestionarioService) {}

  @Post()
  create(@Body() createSeccionCuestionarioDto: CreateSeccionCuestionarioDto) {
    return this.seccionCuestionarioService.create(createSeccionCuestionarioDto);
  }

  @Get()
  findAll() {
    return this.seccionCuestionarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seccionCuestionarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeccionCuestionarioDto: UpdateSeccionCuestionarioDto) {
    return this.seccionCuestionarioService.update(+id, updateSeccionCuestionarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seccionCuestionarioService.remove(+id);
  }
}
