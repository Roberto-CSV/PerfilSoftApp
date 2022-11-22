import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolUsuario } from './entities/rol_usuario.entity';
import { RolesUsuarioController } from './roles-usuario.controller';
import { RolesUsuarioService } from './roles_usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([RolUsuario])],
  controllers: [RolesUsuarioController],
  providers: [RolesUsuarioService],
  exports: [RolesUsuarioService],
})
export class RolesModule {}
