import { Test, TestingModule } from '@nestjs/testing';
import { RolIngenieroController } from './rol-ingeniero.controller';
import { RolIngenieroService } from './rol-ingeniero.service';

describe('RolIngenieroController', () => {
  let controller: RolIngenieroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolIngenieroController],
      providers: [RolIngenieroService],
    }).compile();

    controller = module.get<RolIngenieroController>(RolIngenieroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
