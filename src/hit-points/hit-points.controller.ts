import { Body, Controller, Post } from '@nestjs/common';
import { HitPointsService } from './hit-points.service';
import { DealDamageDto } from './dtos/deal-damage.dto';
import { HealDto } from './dtos/heal.dto';
import { TemporaryHitPointsDto } from './dtos/temporary-hit-points.dto';

@Controller('hit-points')
export class HitPointsController {
  constructor(private readonly hitPointsService: HitPointsService) {}

  @Post('deal-damage')
  dealDamage(@Body() payload: DealDamageDto) {
    const { damage, damageType } = payload;
    return this.hitPointsService.dealDamage(damage, damageType);
  }

  @Post('heal')
  heal(@Body() payload: HealDto) {
    return this.hitPointsService.heal(payload.heal);
  }

  @Post('add-temporary')
  addTemporaryHitPoints(@Body() payload: TemporaryHitPointsDto) {
    return this.hitPointsService.addTemporaryHitPoints(payload.hitPoints);
  }
}
