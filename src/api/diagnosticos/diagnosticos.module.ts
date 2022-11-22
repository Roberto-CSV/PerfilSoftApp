import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticosService } from './diagnosticos.service';
import { Diagnostico } from './entities/diagnostico.entity';
import { DiagnosticosController } from './diagnosticos.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnostico]), UsuariosModule],
  providers: [DiagnosticosService],
  exports: [DiagnosticosService],
  controllers: [DiagnosticosController]
})
export class DiagnosticosModule {}
