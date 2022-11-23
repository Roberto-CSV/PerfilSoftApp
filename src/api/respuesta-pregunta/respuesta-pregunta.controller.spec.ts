import { Test, TestingModule } from '@nestjs/testing';
import { RespuestaPreguntaController } from './respuesta-pregunta.controller';
import { RespuestaPreguntaService } from './respuesta-pregunta.service';

describe('RespuestaPreguntaController', () => {
  let controller: RespuestaPreguntaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RespuestaPreguntaController],
      providers: [RespuestaPreguntaService],
    }).compile();

    controller = module.get<RespuestaPreguntaController>(RespuestaPreguntaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
