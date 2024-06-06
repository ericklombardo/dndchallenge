import { Controller, Get, Post } from '@nestjs/common';
import { DefaultPlayerService } from './default-player.service';
import { ApiOperation } from '@nestjs/swagger';

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
}
