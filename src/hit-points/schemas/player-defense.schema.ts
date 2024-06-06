import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DamageType } from '../dtos/deal-damage.dto';

@Schema()
export class PlayerDefense {
  @Prop({
    type: String,
  })
  type: DamageType;

  @Prop()
  defense: string;
}

export const PlayerDefenseSchema = SchemaFactory.createForClass(PlayerDefense);
