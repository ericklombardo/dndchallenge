import { Test, TestingModule } from '@nestjs/testing';
import { DefaultPlayerService } from './default-player.service';

describe('DefaultPlayerService', () => {
  let service: DefaultPlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultPlayerService],
    }).compile();

    service = module.get<DefaultPlayerService>(DefaultPlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
