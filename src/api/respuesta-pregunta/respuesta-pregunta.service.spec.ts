import { Test, TestingModule } from '@nestjs/testing';
import { RespuestaPreguntaService } from './respuesta-pregunta.service';

describe('RespuestaPreguntaService', () => {
  let service: RespuestaPreguntaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RespuestaPreguntaService],
    }).compile();

    service = module.get<RespuestaPreguntaService>(RespuestaPreguntaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
