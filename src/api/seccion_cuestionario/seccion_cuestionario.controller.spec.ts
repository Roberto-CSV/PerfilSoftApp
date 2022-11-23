import { Test, TestingModule } from '@nestjs/testing';
import { SeccionCuestionarioController } from './seccion_cuestionario.controller';
import { SeccionCuestionarioService } from './seccion_cuestionario.service';

describe('SeccionCuestionarioController', () => {
  let controller: SeccionCuestionarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeccionCuestionarioController],
      providers: [SeccionCuestionarioService],
    }).compile();

    controller = module.get<SeccionCuestionarioController>(SeccionCuestionarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
