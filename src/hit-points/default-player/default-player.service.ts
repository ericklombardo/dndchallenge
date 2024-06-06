import { Injectable } from '@nestjs/common';
import { Player, PlayerDocument } from '../schemas/player.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async deleteDefaultPlayer(): Promise<void> {
    await this.playerModel.deleteOne({ _id: PLAYER_ID }).exec();
  }

  getDefaultPlayer(): Promise<PlayerDocument> {
    return this.playerModel.findOne({ _id: PLAYER_ID }).exec();
  }

  async increaseHitPoints(id: string, hitPoints: number): Promise<void> {
    await this.playerModel
      .updateOne({ _id: id }, { $inc: { hitPoints } })
      .exec();
  }

  async removeHitPoints(id: string): Promise<void> {
    await this.playerModel
      .updateOne({ _id: id }, { $set: { hitPoints: 0 } })
      .exec();
  }

  async removeTemporaryHitPoints(id: string): Promise<void> {
    await this.playerModel
      .updateOne({ _id: id }, { $set: { temporaryHitPoints: 0 } })
      .exec();
  }

  async increaseTemporaryHitPoints(
    id: string,
    hitPoints: number,
  ): Promise<void> {
    await this.playerModel
      .updateOne({ _id: id }, { $inc: { hitPoints } })
      .exec();
  }

  async updateTemporaryHitPoints(id: string, hitPoints: number): Promise<void> {
    await this.playerModel
      .updateOne(
        { _id: id, temporaryHitPoints: { $lt: hitPoints } },
        { $set: { temporaryHitPoints: hitPoints } },
      )
      .exec();
  }
}
