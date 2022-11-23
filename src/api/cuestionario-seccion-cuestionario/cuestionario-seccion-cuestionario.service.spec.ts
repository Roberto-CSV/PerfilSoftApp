import { Test, TestingModule } from '@nestjs/testing';
import { CuestionarioSeccionCuestionarioService } from './cuestionario-seccion-cuestionario.service';

describe('CuestionarioSeccionCuestionarioService', () => {
  let service: CuestionarioSeccionCuestionarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuestionarioSeccionCuestionarioService],
    }).compile();

    service = module.get<CuestionarioSeccionCuestionarioService>(CuestionarioSeccionCuestionarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
