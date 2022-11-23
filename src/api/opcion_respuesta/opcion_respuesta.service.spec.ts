import { Test, TestingModule } from '@nestjs/testing';
import { OpcionRespuestaService } from './opcion_respuesta.service';

describe('OpcionRespuestaService', () => {
  let service: OpcionRespuestaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpcionRespuestaService],
    }).compile();

    service = module.get<OpcionRespuestaService>(OpcionRespuestaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
