import { Module } from '@nestjs/common';
import { HitPointsController } from './hit-points.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './schemas/player.schema';
import { HitPointsService } from './hit-points.service';
import { DefaultPlayerService } from './default-player/default-player.service';
import { DefaultPlayerController } from './default-player/default-player.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  controllers: [HitPointsController, DefaultPlayerController],
  providers: [HitPointsService, DefaultPlayerService],
})
export class HitPointsModule {}
