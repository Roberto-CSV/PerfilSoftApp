import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolIngenieroService } from './rol-ingeniero.service';
import { CreateRolIngenieroDto } from './dto/create-rol-ingeniero.dto';
import { UpdateRolIngenieroDto } from './dto/update-rol-ingeniero.dto';

@Controller('rol-ingeniero')
export class RolIngenieroController {
  constructor(private readonly rolIngenieroService: RolIngenieroService) {}

  @Post()
  create(@Body() createRolIngenieroDto: CreateRolIngenieroDto) {
    return this.rolIngenieroService.create(createRolIngenieroDto);
  }

  @Get()
  findAll() {
    return this.rolIngenieroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolIngenieroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolIngenieroDto: UpdateRolIngenieroDto) {
    return this.rolIngenieroService.update(+id, updateRolIngenieroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolIngenieroService.remove(+id);
  }
}
