import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoRecomendacionService } from './diagnostico_recomendacion.service';

describe('DiagnosticoRecomendacionService', () => {
  let service: DiagnosticoRecomendacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiagnosticoRecomendacionService],
    }).compile();

    service = module.get<DiagnosticoRecomendacionService>(DiagnosticoRecomendacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
