import { Test, TestingModule } from '@nestjs/testing';
import { TipoHabilidadService } from './tipo_habilidad.service';

describe('TipoHabilidadService', () => {
  let service: TipoHabilidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoHabilidadService],
    }).compile();

    service = module.get<TipoHabilidadService>(TipoHabilidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
