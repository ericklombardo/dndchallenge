import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from './schemas/player.schema';
import { Model } from 'mongoose';
import * as player from '../briv.json';

@Injectable()
export class HitPointsService {
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<Player>,
  ) {}

  async createDefaultPlayer(): Promise<string> {
    const createdPlayer = new this.playerModel(player);
    await createdPlayer.save();
    return createdPlayer.id;
  }
}
