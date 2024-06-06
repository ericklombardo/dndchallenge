import { Test, TestingModule } from '@nestjs/testing';
import { DefaultPlayerController } from './default-player.controller';

describe('DefaultPlayerController', () => {
  let controller: DefaultPlayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefaultPlayerController],
    }).compile();

    controller = module.get<DefaultPlayerController>(DefaultPlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
