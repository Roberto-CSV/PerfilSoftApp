import { Test, TestingModule } from '@nestjs/testing';
import { OpcionRespuestaController } from './opcion_respuesta.controller';
import { OpcionRespuestaService } from './opcion_respuesta.service';

describe('OpcionRespuestaController', () => {
  let controller: OpcionRespuestaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpcionRespuestaController],
      providers: [OpcionRespuestaService],
    }).compile();

    controller = module.get<OpcionRespuestaController>(OpcionRespuestaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
