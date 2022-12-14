import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RespuestaPreguntaService } from './respuesta-pregunta.service';
import { CreateRespuestaPreguntaDto } from './dto/create-respuesta-pregunta.dto';
import { UpdateRespuestaPreguntaDto } from './dto/update-respuesta-pregunta.dto';

@Controller()
export class RespuestaPreguntaController {
  constructor(
    private readonly respuestaPreguntaService: RespuestaPreguntaService,
  ) {}

  @Post()
  create(@Body() createRespuestaPreguntaDto: CreateRespuestaPreguntaDto) {
    return this.respuestaPreguntaService.create(createRespuestaPreguntaDto);
  }

  @Get()
  findAll() {
    return this.respuestaPreguntaService.findAll();
  }

  @Get('byId/:id')
  findOne(@Param('id') id: string) {
    return this.respuestaPreguntaService.findOne(+id);
  }

  @Get('byRespuestaSeccionCuestionarioId/:id')
  findByRespuestaSeccionCuestionarioId(@Param('id') id: string) {
    return this.respuestaPreguntaService.findByRespuestaSeccionCuestionarioId(
      +id,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRespuestaPreguntaDto: UpdateRespuestaPreguntaDto,
  ) {
    return this.respuestaPreguntaService.update(
      +id,
      updateRespuestaPreguntaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.respuestaPreguntaService.remove(+id);
  }
}
