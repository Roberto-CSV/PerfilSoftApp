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
import { CreateRespuestaSeccionCuestionarioDto } from './dtos/create-respuesta-seccion-cuestionario.dto';
import { RespuestaSeccionCuestionario } from './entities/respuesta-seccion-cuestionario.entity';
import { RespuestaSeccionCuestionarioService } from './respuesta-seccion-cuestionario.service';

@Controller()
export class RespuestaSeccionCuestionarioController {
  constructor(
    private readonly respuestasSeccionCuestionarioService: RespuestaSeccionCuestionarioService,
  ) {}

  @Post()
  create(
    @Body()
    newRespuestaSeccionCuestionario: CreateRespuestaSeccionCuestionarioDto,
  ): Promise<RespuestaSeccionCuestionario> {
    return this.respuestasSeccionCuestionarioService.create(
      newRespuestaSeccionCuestionario,
    );
  }

  @Get()
  getAll(): Promise<RespuestaSeccionCuestionario[]> {
    return this.respuestasSeccionCuestionarioService.findAll();
  }

  @Get('byId/:id')
  getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RespuestaSeccionCuestionario> {
    return this.respuestasSeccionCuestionarioService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.respuestasSeccionCuestionarioService.remove(id);
  }

  @Get('respuesta-cuestionario/:id')
  findByRespuestaCuestionarioId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RespuestaSeccionCuestionario[]> {
    return this.respuestasSeccionCuestionarioService.findByRespuestaCuestionarioId(
      id,
    );
  }

  @Get('seccion-cuestionario/:id')
  findBySeccionCuestionarioId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RespuestaSeccionCuestionario[]> {
    return this.respuestasSeccionCuestionarioService.findBySeccionCuestionarioId(
      id,
    );
  }
}
