import { Test, TestingModule } from '@nestjs/testing';
import { CuestionarioSeccionCuestionarioController } from './cuestionario-seccion-cuestionario.controller';
import { CuestionarioSeccionCuestionarioService } from './cuestionario-seccion-cuestionario.service';

describe('CuestionarioSeccionCuestionarioController', () => {
  let controller: CuestionarioSeccionCuestionarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuestionarioSeccionCuestionarioController],
      providers: [CuestionarioSeccionCuestionarioService],
    }).compile();

    controller = module.get<CuestionarioSeccionCuestionarioController>(CuestionarioSeccionCuestionarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
