import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoRolIngenieroController } from './diagnostico-rol-ingeniero.controller';
import { DiagnosticoRolIngenieroService } from './diagnostico-rol-ingeniero.service';

describe('DiagnosticoRolIngenieroController', () => {
  let controller: DiagnosticoRolIngenieroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosticoRolIngenieroController],
      providers: [DiagnosticoRolIngenieroService],
    }).compile();

    controller = module.get<DiagnosticoRolIngenieroController>(DiagnosticoRolIngenieroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
