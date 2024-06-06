import { Test, TestingModule } from '@nestjs/testing';
import { HitPointsService } from './hit-points.service';
import { DefaultPlayerService } from './default-player/default-player.service';
import * as player from '../briv.json';

describe('HitPointsService', () => {
  let service: HitPointsService;
  let mockDefaultPlayerService: {
    getDefaultPlayer: jest.Mock;
    updateHitPoints: jest.Mock;
  };

  beforeEach(async () => {
    mockDefaultPlayerService = {
      getDefaultPlayer: jest.fn(),
      updateHitPoints: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HitPointsService,
        { provide: DefaultPlayerService, useValue: mockDefaultPlayerService },
      ],
    }).compile();

    service = module.get<HitPointsService>(HitPointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should deal piercing damage and update hit points', async () => {
    const playerDocument = { ...player, id: '1' };
    mockDefaultPlayerService.getDefaultPlayer.mockResolvedValue(playerDocument);
    await service.dealDamage(5, 'piercing');
    expect(mockDefaultPlayerService.getDefaultPlayer).toHaveBeenCalled();
    expect(mockDefaultPlayerService.updateHitPoints).toHaveBeenCalledWith(
      '1',
      -5,
    );
  });

  it("should deal fire damage and doesn't update hit points", async () => {
    const playerDocument = { ...player, id: '1' };
    mockDefaultPlayerService.getDefaultPlayer.mockResolvedValue(playerDocument);
    await service.dealDamage(5, 'fire');
    expect(mockDefaultPlayerService.getDefaultPlayer).toHaveBeenCalled();
    expect(mockDefaultPlayerService.updateHitPoints).not.toHaveBeenCalled();
  });
});
