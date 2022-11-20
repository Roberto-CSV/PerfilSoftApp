import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UsuariosService } from './usuarios.service';
import { ApiTags } from "@nestjs/swagger";


@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() newUsuario: CreateUsuarioDto): Promise<Usuario> {
    return this.usuariosService.create(newUsuario);
  }

  @Get()
  getAll(): Promise<Usuario[]> {
    return this.usuariosService.getAll();
  }

  @Get(':id')
  getByid(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.getById(id);
  }

  @Get('roles/:id')
  getAllByRolId(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.getAllByRolId(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuario: UpdateUsuarioDto,
  ) {
    return this.usuariosService.update(id, usuario);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.delete(id);
  }
}
