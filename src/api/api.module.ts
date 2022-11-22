import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles_usuario.module';
import { SemestresController } from './semestres/semestres.controller';
import { SemestresModule } from './semestres/semestres.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DiagnosticosModule } from './diagnosticos/diagnosticos.module';
import { CuestionariosModule } from './cuestionarios/cuestionarios.module';

@Module({
  imports: [RolesModule, SemestresModule, UsuariosModule, DiagnosticosModule, CuestionariosModule],
  controllers: [SemestresController],
})
export class ApiModule {}
