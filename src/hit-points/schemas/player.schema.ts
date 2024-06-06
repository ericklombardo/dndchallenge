import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PlayerClass, PlayerClassSchema } from './player-class.schema';
import { PlayerStat, PlayerStatSchema } from './player-stat.schema';
import { PlayerItem, PlayerItemSchema } from './player-item.schema';
import { PlayerDefense, PlayerDefenseSchema } from './player-defense.schema';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Player {
  @Prop({
    required: true,
  })
  _id: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    default: 1,
  })
  level: number;

  @Prop({
    required: true,
    default: 0,
  })
  hitPoints: number;

  @Prop({
    type: [PlayerClassSchema],
    default: [],
  })
  classes: PlayerClass[];

  @Prop({
    type: PlayerStatSchema,
  })
  stats: PlayerStat;

  @Prop({
    type: [PlayerItemSchema],
    default: [],
  })
  items: PlayerItem[];

  @Prop({
    type: [PlayerDefenseSchema],
    default: [],
  })
  defenses: PlayerDefense[];

  @Prop({
    default: 0,
  })
  temporaryHitPoints: number;
}

export type PlayerDocument = HydratedDocument<Player>;

export const PlayerSchema = SchemaFactory.createForClass(Player);
