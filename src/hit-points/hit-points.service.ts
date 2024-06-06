import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from './schemas/player.schema';
import { Model } from 'mongoose';

@Injectable()
export class HitPointsService {
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<Player>,
  ) {}
}
