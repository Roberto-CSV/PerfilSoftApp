import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoRolIngenieroService } from './diagnostico-rol-ingeniero.service';

describe('DiagnosticoRolIngenieroService', () => {
  let service: DiagnosticoRolIngenieroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiagnosticoRolIngenieroService],
    }).compile();

    service = module.get<DiagnosticoRolIngenieroService>(DiagnosticoRolIngenieroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
