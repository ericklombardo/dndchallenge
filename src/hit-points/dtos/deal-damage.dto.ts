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
] as const;

export type DamageType = (typeof DAMAGE_TYPES)[number];

export class DealDamageDto {
  @IsPositive()
  readonly damage: number;

  @IsIn(DAMAGE_TYPES)
  readonly damageType: DamageType;
}
