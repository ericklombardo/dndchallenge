import { IsPositive } from 'class-validator';

export class HealDto {
  @IsPositive()
  readonly heal: number;
}
