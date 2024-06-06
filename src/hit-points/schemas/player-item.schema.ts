import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PlayerItem {
  @Prop()
  name: string;

  @Prop(raw({
    affectedObject: {
      type: String,
    },
    affectedValue: {
      type: String,
    },
    value: {
      type: Number,
    }
  }))
  modifier: {
    affectedObject: string,
    affectedValue: string,
    value: number
  };
}

export const PlayerItemSchema = SchemaFactory.createForClass(PlayerItem);
