import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiagnosticoRolIngenieroService } from './diagnostico-rol-ingeniero.service';
import { CreateDiagnosticoRolIngenieroDto } from './dto/create-diagnostico-rol-ingeniero.dto';
import { UpdateDiagnosticoRolIngenieroDto } from './dto/update-diagnostico-rol-ingeniero.dto';

@Controller()
export class DiagnosticoRolIngenieroController {
  constructor(
    private readonly diagnosticoRolIngenieroService: DiagnosticoRolIngenieroService,
  ) {}

  @Post()
  create(
    @Body() createDiagnosticoRolIngenieroDto: CreateDiagnosticoRolIngenieroDto,
  ) {
    return this.diagnosticoRolIngenieroService.create(
      createDiagnosticoRolIngenieroDto,
    );
  }

  @Get()
  findAll() {
    return this.diagnosticoRolIngenieroService.findAll();
  }

  @Get('byId/:id')
  findOne(@Param('id') id: string) {
    return this.diagnosticoRolIngenieroService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiagnosticoRolIngenieroDto: UpdateDiagnosticoRolIngenieroDto,
  ) {
    return this.diagnosticoRolIngenieroService.update(
      +id,
      updateDiagnosticoRolIngenieroDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosticoRolIngenieroService.remove(+id);
  }
}
