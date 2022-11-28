import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { DiagnosticosService } from './diagnosticos.service';
import { CreateDiagnosticoDto } from './dtos/create-diagnostico.dto';
import { UpdateDiagnosticoDto } from './dtos/update-diagnostico.dto';
import { Diagnostico } from './entities/diagnostico.entity';

@Controller()
export class DiagnosticosController {
  constructor(private readonly diagnosticosService: DiagnosticosService) {}

  @Post()
  create(@Body() newDiagnostico: CreateDiagnosticoDto): Promise<Diagnostico> {
    return this.diagnosticosService.create(newDiagnostico);
  }

  @Get('all')
  createDiagnosticoRolesIngeniero() {
    return this.diagnosticosService.createDiagnosticoRolesIngeniero({
      id_diagnostico: 36,
      fk_respuesta_cuestionario: 194,
    });
  }

  @Get()
  getAll(): Promise<Diagnostico[]> {
    return this.diagnosticosService.getAll();
  }

  @Get('byId/:id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Diagnostico> {
    return this.diagnosticosService.getById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() diagnostico: UpdateDiagnosticoDto,
  ): Promise<UpdateResult> {
    return this.diagnosticosService.update(id, diagnostico);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.diagnosticosService.delete(id);
  }

  @Get('respuesta-cuestonario/:id')
  getByRespuestaCuestionarioId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Diagnostico> {
    return this.diagnosticosService.getByRespuestaCuestionarioId(id);
  }
}
