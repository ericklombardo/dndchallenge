import { IsPositive } from 'class-validator';

export class TemporaryHitPointsDto {
  @IsPositive()
  readonly hitPoints: number;
}
