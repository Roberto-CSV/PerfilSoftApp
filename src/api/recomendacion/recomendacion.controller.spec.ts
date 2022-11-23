import { Test, TestingModule } from '@nestjs/testing';
import { RecomendacionController } from './recomendacion.controller';
import { RecomendacionService } from './recomendacion.service';

describe('RecomendacionController', () => {
  let controller: RecomendacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecomendacionController],
      providers: [RecomendacionService],
    }).compile();

    controller = module.get<RecomendacionController>(RecomendacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
