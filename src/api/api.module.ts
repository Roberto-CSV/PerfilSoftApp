import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { SemestresController } from './semestres/semestres.controller';
import { SemestresModule } from './semestres/semestres.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RolIngenieroModule } from './rol-ingeniero/rol-ingeniero.module';
import { DiagnosticoRolIngenieroModule } from './diagnostico-rol-ingeniero/diagnostico-rol-ingeniero.module';
import { RolIngenieroHabilidadModule } from './rol-ingeniero-habilidad/rol-ingeniero-habilidad.module';
import { RespuestaPreguntaModule } from './respuesta-pregunta/respuesta-pregunta.module';
import { CuestionarioSeccionCuestionarioModule } from './cuestionario-seccion-cuestionario/cuestionario-seccion-cuestionario.module';

@Module({
  imports: [RolesModule, SemestresModule, UsuariosModule, RolIngenieroModule, DiagnosticoRolIngenieroModule, RolIngenieroHabilidadModule, RespuestaPreguntaModule, CuestionarioSeccionCuestionarioModule],
  controllers: [SemestresController],
})
export class ApiModule {}
