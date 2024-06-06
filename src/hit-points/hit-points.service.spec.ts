import { Test, TestingModule } from '@nestjs/testing';
import { HitPointsService } from './hit-points.service';
import {
  DefaultPlayerService,
  PLAYER_ID,
} from './default-player/default-player.service';
import * as player from '../briv.json';

describe('HitPointsService', () => {
  let service: HitPointsService;
  let mockDefaultPlayerService: {
    getDefaultPlayer: jest.Mock;
    increaseHitPoints: jest.Mock;
  };

  beforeEach(async () => {
    mockDefaultPlayerService = {
      getDefaultPlayer: jest.fn(),
      increaseHitPoints: jest.fn(),
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
    const playerDocument = { ...player, id: PLAYER_ID, temporaryHitPoints: 0 };
    mockDefaultPlayerService.getDefaultPlayer.mockResolvedValue(playerDocument);
    await service.dealDamage(5, 'piercing');
    expect(mockDefaultPlayerService.getDefaultPlayer).toHaveBeenCalled();
    expect(mockDefaultPlayerService.increaseHitPoints).toHaveBeenCalledWith(
      PLAYER_ID,
      -5,
    );
  });

  it("should deal fire damage and doesn't update hit points because of immunity", async () => {
    const playerDocument = { ...player, id: PLAYER_ID, temporaryHitPoints: 0 };
    mockDefaultPlayerService.getDefaultPlayer.mockResolvedValue(playerDocument);
    await service.dealDamage(5, 'fire');
    expect(mockDefaultPlayerService.getDefaultPlayer).toHaveBeenCalled();
    expect(mockDefaultPlayerService.increaseHitPoints).not.toHaveBeenCalled();
  });

  it('should deal slashing damage and update hit points to a half because of resistance', async () => {
    const playerDocument = { ...player, id: PLAYER_ID, temporaryHitPoints: 0 };
    mockDefaultPlayerService.getDefaultPlayer.mockResolvedValue(playerDocument);
    await service.dealDamage(5, 'slashing');
    expect(mockDefaultPlayerService.getDefaultPlayer).toHaveBeenCalled();
    expect(mockDefaultPlayerService.increaseHitPoints).toHaveBeenCalledWith(
      PLAYER_ID,
      -3,
    );
  });
});
