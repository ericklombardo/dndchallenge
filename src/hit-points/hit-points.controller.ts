import { Controller, Post } from '@nestjs/common';
import { HitPointsService } from './hit-points.service';

@Controller('hit-points')
export class HitPointsController {
  constructor(private readonly hitPointsService: HitPointsService) {}

  @Post()
  createDefaultPlayer() {
    return this.hitPointsService.createDefaultPlayer();
  }
}
