import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateRespeustaCuestionarioDto } from './dtos/create-respuesta-cuestionario.dto';
import { RespuestaCuestionario } from './entities/respuesta-cuestionario.entity';
import { RespuestasCuestionariosService } from './respuestas-cuestionarios.service';

@Controller()
export class RespuestasCuestionariosController {
  constructor(
    private readonly respuestasCuestionariosService: RespuestasCuestionariosService,
  ) {}

  @Post()
  create(
    @Body() newRespuestaCuestionario: CreateRespeustaCuestionarioDto,
  ): Promise<RespuestaCuestionario> {
    return this.respuestasCuestionariosService.create(newRespuestaCuestionario);
  }

  @Get()
  getAll(): Promise<RespuestaCuestionario[]> {
    return this.respuestasCuestionariosService.getAll();
  }

  @Get('byId/:id')
  getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RespuestaCuestionario> {
    return this.respuestasCuestionariosService.getById(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.respuestasCuestionariosService.delete(id);
  }

  @Get('cuestionario/:id')
  getAllByCuestionarioId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RespuestaCuestionario[]> {
    return this.respuestasCuestionariosService.getAllByCuestionarioId(id);
  }

  @Get('usuario/:id')
  getAllByUsaurioId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RespuestaCuestionario[]> {
    return this.respuestasCuestionariosService.getAllByUsaurioId(id);
  }
}
