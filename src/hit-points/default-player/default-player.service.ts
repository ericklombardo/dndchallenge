import { Injectable } from '@nestjs/common';
import { Player, PlayerDocument } from '../schemas/player.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  getDefaultPlayer(): Promise<PlayerDocument> {
    return this.playerModel.findOne().exec();
  }

  async updateHitPoints(id: string, hitPoints: number): Promise<void> {
    await this.playerModel
      .updateOne({ _id: new Types.ObjectId(id) }, { $inc: { hitPoints } })
      .exec();
  }
}
