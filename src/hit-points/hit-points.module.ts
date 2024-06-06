import { Module } from '@nestjs/common';
import { HitPointsController } from './hit-points.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './schemas/player.schema';
import { HitPointsService } from './hit-points.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  controllers: [HitPointsController],
  providers: [HitPointsService],
})
export class HitPointsModule {}
