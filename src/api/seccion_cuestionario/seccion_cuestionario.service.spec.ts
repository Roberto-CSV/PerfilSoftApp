import { Test, TestingModule } from '@nestjs/testing';
import { SeccionCuestionarioService } from './seccion_cuestionario.service';

describe('SeccionCuestionarioService', () => {
  let service: SeccionCuestionarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeccionCuestionarioService],
    }).compile();

    service = module.get<SeccionCuestionarioService>(SeccionCuestionarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
