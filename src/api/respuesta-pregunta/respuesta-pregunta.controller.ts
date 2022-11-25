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

  @Get('byRespuestaCuestionarioId/:id')
  findByRespuestaCuestionarioId(@Param('id') id: string) {
    return this.respuestaPreguntaService.findByRespuestaCuestionarioId(+id);
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
