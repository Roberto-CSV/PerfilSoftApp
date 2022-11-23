import { Test, TestingModule } from '@nestjs/testing';
import { TipoHabilidadController } from './tipo_habilidad.controller';
import { TipoHabilidadService } from './tipo_habilidad.service';

describe('TipoHabilidadController', () => {
  let controller: TipoHabilidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoHabilidadController],
      providers: [TipoHabilidadService],
    }).compile();

    controller = module.get<TipoHabilidadController>(TipoHabilidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
