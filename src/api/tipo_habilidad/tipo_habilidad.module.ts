import { Module } from '@nestjs/common';
import { TipoHabilidadService } from './tipo_habilidad.service';
import { TipoHabilidadController } from './tipo_habilidad.controller';
import { TipoHabilidad } from './entities/tipo_habilidad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TipoHabilidad])],
  controllers: [TipoHabilidadController],
  providers: [TipoHabilidadService],
})
export class TipoHabilidadModule {}
