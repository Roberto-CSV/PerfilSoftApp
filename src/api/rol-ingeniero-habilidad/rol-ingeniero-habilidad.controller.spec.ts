import { Test, TestingModule } from '@nestjs/testing';
import { RolIngenieroHabilidadController } from './rol-ingeniero-habilidad.controller';
import { RolIngenieroHabilidadService } from './rol-ingeniero-habilidad.service';

describe('RolIngenieroHabilidadController', () => {
  let controller: RolIngenieroHabilidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolIngenieroHabilidadController],
      providers: [RolIngenieroHabilidadService],
    }).compile();

    controller = module.get<RolIngenieroHabilidadController>(RolIngenieroHabilidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
