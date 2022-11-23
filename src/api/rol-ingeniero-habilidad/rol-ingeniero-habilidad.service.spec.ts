import { Test, TestingModule } from '@nestjs/testing';
import { RolIngenieroHabilidadService } from './rol-ingeniero-habilidad.service';

describe('RolIngenieroHabilidadService', () => {
  let service: RolIngenieroHabilidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolIngenieroHabilidadService],
    }).compile();

    service = module.get<RolIngenieroHabilidadService>(RolIngenieroHabilidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
