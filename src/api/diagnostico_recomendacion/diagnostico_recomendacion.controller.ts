import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosticoRecomendacionService } from './diagnostico_recomendacion.service';
import { CreateDiagnosticoRecomendacionDto } from './dto/create-diagnostico_recomendacion.dto';
import { UpdateDiagnosticoRecomendacionDto } from './dto/update-diagnostico_recomendacion.dto';

@Controller('diagnostico-recomendacion')
export class DiagnosticoRecomendacionController {
  constructor(private readonly diagnosticoRecomendacionService: DiagnosticoRecomendacionService) {}

  @Post()
  create(@Body() createDiagnosticoRecomendacionDto: CreateDiagnosticoRecomendacionDto) {
    return this.diagnosticoRecomendacionService.create(createDiagnosticoRecomendacionDto);
  }

  @Get()
  findAll() {
    return this.diagnosticoRecomendacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diagnosticoRecomendacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiagnosticoRecomendacionDto: UpdateDiagnosticoRecomendacionDto) {
    return this.diagnosticoRecomendacionService.update(+id, updateDiagnosticoRecomendacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosticoRecomendacionService.remove(+id);
  }
}
