import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PlayerClass {
  @Prop()
  name: string;

  @Prop()
  hitDiceValue: number;

  @Prop()
  classLevel: number;
}

export const PlayerClassSchema = SchemaFactory.createForClass(PlayerClass);
