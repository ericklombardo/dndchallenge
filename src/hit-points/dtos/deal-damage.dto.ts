import { IsPositive, IsString } from 'class-validator';

export class DealDamageDto {
  @IsPositive()
  readonly damage: number;

  @IsString()
  readonly damageType: string;
}
