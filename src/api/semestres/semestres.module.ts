import { Module } from '@nestjs/common';
import { SemestresService } from './semestres.service';
import { SemestresController } from './semestres.controller';
import { Semestre } from './entities/semestre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Semestre])],
  providers: [SemestresService],
  controllers: [SemestresController],
  exports: [SemestresService]
})
export class SemestresModule {}
