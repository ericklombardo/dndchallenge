import { Controller, Get, Post } from '@nestjs/common';
import { DefaultPlayerService } from './default-player.service';

@Controller('default-player')
export class DefaultPlayerController {
  constructor(private readonly defaultPlayerService: DefaultPlayerService) {}

  @Post()
  create() {
    return this.defaultPlayerService.createDefaultPlayer();
  }

  @Get()
  get() {
    return this.defaultPlayerService.getDefaultPlayer();
  }
}
