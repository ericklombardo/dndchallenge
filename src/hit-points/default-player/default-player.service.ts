import { Injectable } from '@nestjs/common';
import { Player } from '../schemas/player.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as player from '../../briv.json';

@Injectable()
export class DefaultPlayerService {
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<Player>,
  ) {}

  async createDefaultPlayer(): Promise<string> {
    const createdPlayer = new this.playerModel(player);
    await createdPlayer.save();
    return createdPlayer.id;
  }

  async getDefaultPlayer(): Promise<Player> {
    return this.playerModel.findOne().exec();
  }
}
