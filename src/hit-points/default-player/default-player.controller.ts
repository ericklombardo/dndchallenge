import { Body, Controller, Get, Post } from '@nestjs/common';
import { DefaultPlayerService, PLAYER_ID } from './default-player.service';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateHitPointsDto } from './dtos/update-hit-points.dto';
import { AddTemporaryHitPointsDto } from './dtos/add-temporary-hit-points.dto';

@Controller('default-player')
export class DefaultPlayerController {
  constructor(private readonly defaultPlayerService: DefaultPlayerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a default player' })
  create() {
    return this.defaultPlayerService.createDefaultPlayer();
  }

  @Get()
  @ApiOperation({ summary: 'Get the default player' })
  get() {
    return this.defaultPlayerService.getDefaultPlayer();
  }

  @Post('update-hit-points')
  @ApiOperation({ summary: 'Update the hit points of the default player' })
  updateHitPoints(@Body() payload: UpdateHitPointsDto) {
    const { id, hitPoints } = payload;
    return this.defaultPlayerService.updateHitPoints(id, hitPoints);
  }

  @Post('add-temporary-hit-points')
  @ApiOperation({ summary: 'Add temporary hit points to the default player' })
  addTemporaryHitPoints(@Body() payload: AddTemporaryHitPointsDto) {
    const { id, hitPoints } = payload;
    return this.defaultPlayerService.addTemporaryHitPoints(id, hitPoints);
  }

  @Post('remove-first-temporary-hit-point')
  @ApiOperation({
    summary: 'Remove the first temporary hit point from the default player',
  })
  removeFirstTemporaryHitPoint() {
    return this.defaultPlayerService.removeFirstTemporaryHitPoint(PLAYER_ID);
  }
}
