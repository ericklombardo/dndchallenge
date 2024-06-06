import { Injectable } from '@nestjs/common';
import { Player, PlayerDocument } from '../schemas/player.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as player from '../../briv.json';

export const PLAYER_ID = 'briv';

@Injectable()
export class DefaultPlayerService {
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<Player>,
  ) {}

  async createDefaultPlayer(): Promise<string> {
    const createdPlayer = new this.playerModel({ ...player, _id: PLAYER_ID });
    await createdPlayer.save();
    return createdPlayer.id;
  }

  getDefaultPlayer(): Promise<PlayerDocument> {
    return this.playerModel.findOne({ _id: PLAYER_ID }).exec();
  }

  async updateHitPoints(id: string, hitPoints: number): Promise<void> {
    await this.playerModel
      .updateOne({ _id: new Types.ObjectId(id) }, { $inc: { hitPoints } })
      .exec();
  }

  async addTemporaryHitPoints(id: string, hitPoints: number): Promise<void> {
    await this.playerModel
      .updateOne(
        { _id: id },
        { $push: { temporaryHitPoints: { $each: [hitPoints], $sort: -1 } } },
      )
      .exec();
  }

  async removeFirstTemporaryHitPoint(id: string): Promise<void> {
    await this.playerModel
      .updateOne({ _id: id }, { $pop: { temporaryHitPoints: -1 } })
      .exec();
  }
}
