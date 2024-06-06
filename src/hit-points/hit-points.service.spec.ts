import { Test, TestingModule } from '@nestjs/testing';
import { HitPointsService } from './hit-points.service';

describe('HitPointsService', () => {
  let service: HitPointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HitPointsService],
    }).compile();

    service = module.get<HitPointsService>(HitPointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
