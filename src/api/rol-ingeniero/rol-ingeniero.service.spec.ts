import { Test, TestingModule } from '@nestjs/testing';
import { RolIngenieroService } from './rol-ingeniero.service';

describe('RolIngenieroService', () => {
  let service: RolIngenieroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolIngenieroService],
    }).compile();

    service = module.get<RolIngenieroService>(RolIngenieroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
