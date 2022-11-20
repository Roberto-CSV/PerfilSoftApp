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
import { CreateRolDto } from './dtos/create-rol.dto';
import { UpdateRolDto } from './dtos/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { RolesService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() newRol: CreateRolDto) {
    return this.rolesService.create(newRol);
  }

  @Get()
  getAll(): Promise<Rol[]> {
    return this.rolesService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.getById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() rol: UpdateRolDto) {
    return this.rolesService.update(id, rol);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.delete(id);
  }
}
