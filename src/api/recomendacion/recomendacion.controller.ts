import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecomendacionService } from './recomendacion.service';
import { CreateRecomendacionDto } from './dto/create-recomendacion.dto';
import { UpdateRecomendacionDto } from './dto/update-recomendacion.dto';

@Controller()
export class RecomendacionController {
  constructor(private readonly recomendacionService: RecomendacionService) {}

  @Post()
  create(@Body() createRecomendacionDto: CreateRecomendacionDto) {
    return this.recomendacionService.create(createRecomendacionDto);
  }

  @Get()
  findAll() {
    return this.recomendacionService.findAll();
  }

  @Get('byId/:id')
  findOne(@Param('id') id: string) {
    return this.recomendacionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecomendacionDto: UpdateRecomendacionDto,
  ) {
    return this.recomendacionService.update(+id, updateRecomendacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recomendacionService.remove(+id);
  }
}
