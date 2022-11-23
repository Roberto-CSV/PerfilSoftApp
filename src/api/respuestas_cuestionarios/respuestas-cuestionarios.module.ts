import { Module } from '@nestjs/common';
import { RespuestasCuestionariosService } from './respuestas-cuestionarios.service';
import { RespuestasCuestionariosController } from './respuestas-cuestionarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespeustaCuestionario } from './entities/respuesta-cuestionario.entity';
import { CuestionariosModule } from '../cuestionarios/cuestionarios.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([RespeustaCuestionario]), CuestionariosModule, UsuariosModule],
  providers: [RespuestasCuestionariosService],
  controllers: [RespuestasCuestionariosController],
  exports: [RespuestasCuestionariosService],
})
export class RespuestasCuestionariosModule {}
