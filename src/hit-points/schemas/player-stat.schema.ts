import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PlayerStat {
  @Prop()
  strength: number;

  @Prop()
  dexterity: number;

  @Prop()
  constitution: number;

  @Prop()
  intelligence: number;

  @Prop()
  wisdom: number;

  @Prop()
  charisma: number;
}

export const PlayerStatSchema = SchemaFactory.createForClass(PlayerStat);
