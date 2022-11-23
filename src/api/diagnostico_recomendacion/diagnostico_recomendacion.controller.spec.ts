import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoRecomendacionController } from './diagnostico_recomendacion.controller';
import { DiagnosticoRecomendacionService } from './diagnostico_recomendacion.service';

describe('DiagnosticoRecomendacionController', () => {
  let controller: DiagnosticoRecomendacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosticoRecomendacionController],
      providers: [DiagnosticoRecomendacionService],
    }).compile();

    controller = module.get<DiagnosticoRecomendacionController>(DiagnosticoRecomendacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
