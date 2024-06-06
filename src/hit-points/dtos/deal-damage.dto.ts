import { IsIn, IsPositive } from 'class-validator';

export const DAMAGE_TYPES = [
  'fire',
  'bludgeoning',
  'piercing',
  'slashing',
  'cold',
  'acid',
  'thunder',
  'lightning',
  'poison',
  'radiant',
  'necrotic',
  'psychic',
  'force',
];

export class DealDamageDto {
  @IsPositive()
  readonly damage: number;

  @IsIn(DAMAGE_TYPES)
  readonly damageType: string;
}
