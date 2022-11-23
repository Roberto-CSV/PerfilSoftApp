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
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('Roles')
@Controller('roles')
export class RolesUsuarioController {
  constructor(private readonly rolesService: RolesUsuarioService) {}

  @Post()
  create(@Body() newRol: CreateRolUsuarioDto): Promise<RolUsuario> {
    return this.rolesService.create(newRol);
  }

  @Get()
  getAll(): Promise<RolUsuario[]> {
    return this.rolesService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<RolUsuario> {
    return this.rolesService.getById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() rol: UpdateRolUsuarioDto,
  ): Promise<UpdateResult> {
    return this.rolesService.update(id, rol);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.rolesService.delete(id);
  }

  @Get('/activos/todos')
  getAllActive(): Promise<RolUsuario[]> {
    return this.rolesService.getAllActive();
  }

  @Get('/desactivados/todos')
  getAllDisabled(): Promise<RolUsuario[]> {
    return this.rolesService.getAllDisabled();
  }
}
