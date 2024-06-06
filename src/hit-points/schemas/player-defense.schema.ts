import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PlayerDefense {
  @Prop()
  type: string;

  @Prop()
  defense: string;
}

export const PlayerDefenseSchema = SchemaFactory.createForClass(PlayerDefense);
