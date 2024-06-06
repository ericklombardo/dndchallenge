import { Test, TestingModule } from '@nestjs/testing';
import { HitPointsController } from './hit-points.controller';

describe('HitPointsController', () => {
  let controller: HitPointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HitPointsController],
    }).compile();

    controller = module.get<HitPointsController>(HitPointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
