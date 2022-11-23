import { Test, TestingModule } from '@nestjs/testing';
import { RecomendacionService } from './recomendacion.service';

describe('RecomendacionService', () => {
  let service: RecomendacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecomendacionService],
    }).compile();

    service = module.get<RecomendacionService>(RecomendacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
