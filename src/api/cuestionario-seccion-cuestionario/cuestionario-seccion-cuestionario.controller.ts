import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CuestionarioSeccionCuestionarioService } from './cuestionario-seccion-cuestionario.service';
import { CreateCuestionarioSeccionCuestionarioDto } from './dto/create-cuestionario-seccion-cuestionario.dto';
import { UpdateCuestionarioSeccionCuestionarioDto } from './dto/update-cuestionario-seccion-cuestionario.dto';

@Controller()
export class CuestionarioSeccionCuestionarioController {
  constructor(
    private readonly cuestionarioSeccionCuestionarioService: CuestionarioSeccionCuestionarioService,
  ) {}

  @Post()
  create(
    @Body()
    createCuestionarioSeccionCuestionarioDto: CreateCuestionarioSeccionCuestionarioDto,
  ) {
    return this.cuestionarioSeccionCuestionarioService.create(
      createCuestionarioSeccionCuestionarioDto,
    );
  }

  @Get()
  findAll() {
    return this.cuestionarioSeccionCuestionarioService.findAll();
  }

  @Get('byId/:id')
  findOne(@Param('id') id: string) {
    return this.cuestionarioSeccionCuestionarioService.findOne(+id);
  }

  @Get('byCuestionarioId/:id')
  findByCuestionarioId(@Param('id') id: string) {
    return this.cuestionarioSeccionCuestionarioService.findByCuestionarioId(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateCuestionarioSeccionCuestionarioDto: UpdateCuestionarioSeccionCuestionarioDto,
  ) {
    return this.cuestionarioSeccionCuestionarioService.update(
      +id,
      updateCuestionarioSeccionCuestionarioDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuestionarioSeccionCuestionarioService.remove(+id);
  }
}
