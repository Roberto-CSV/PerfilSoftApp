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
import { CuestionariosService } from './cuestionarios.service';
import { CreateCuestionarioDto } from './dtos/create_cuestionario.dto';
import { UpdateCuestionarioDto } from './dtos/update_cuestionario.dto';
import { Cuestionario } from './entities/cuestionario.entity';

@Controller()
export class CuestionariosController {
  constructor(private readonly cuestionariosService: CuestionariosService) {}

  @Post()
  create(
    @Body() newCuestionario: CreateCuestionarioDto,
  ): Promise<Cuestionario> {
    return this.cuestionariosService.create(newCuestionario);
  }

  @Get()
  getAll(): Promise<Cuestionario[]> {
    return this.cuestionariosService.getAll();
  }

  @Get('all/:id')
  getAllRepo(@Param('id', ParseIntPipe) id: number) {
    return this.cuestionariosService.getAllRepo(id);
  }

  @Get('byId/:id')
  getByid(@Param('id', ParseIntPipe) id: number) {
    return this.cuestionariosService.getById(id);
  }

  @Get('semestre/:id')
  getAllBySemestreId(@Param('id', ParseIntPipe) id: number) {
    return this.cuestionariosService.getAllBySemestreId(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuario: UpdateCuestionarioDto,
  ) {
    return this.cuestionariosService.update(id, usuario);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.cuestionariosService.delete(id);
  }
}
