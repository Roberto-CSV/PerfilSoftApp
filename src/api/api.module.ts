import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { SemestresController } from './semestres/semestres.controller';
import { SemestresModule } from './semestres/semestres.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [RolesModule, SemestresModule, UsuariosModule],
  controllers: [SemestresController],
})
export class ApiModule {}
