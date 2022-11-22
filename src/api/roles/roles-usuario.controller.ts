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
import { CreateRolUsuarioDto } from './dtos/create_rol.dto';
import { UpdateRolUsuarioDto } from './dtos/update_rol.dto';
import { RolUsuario } from './entities/rol_usuario.entity';
import { RolesUsuarioService as RolesUsuarioService } from './roles_usuario.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesUsuarioController {
  constructor(private readonly rolesService: RolesUsuarioService) {}

  @Post()
  create(@Body() newRol: CreateRolUsuarioDto) {
    return this.rolesService.create(newRol);
  }

  @Get()
  getAll(): Promise<RolUsuario[]> {
    return this.rolesService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.getById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() rol: UpdateRolUsuarioDto,
  ) {
    return this.rolesService.update(id, rol);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.delete(id);
  }
}
