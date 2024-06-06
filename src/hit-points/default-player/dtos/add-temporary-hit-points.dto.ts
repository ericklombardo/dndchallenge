import { IsPositive, IsString } from 'class-validator';

export class AddTemporaryHitPointsDto {
  @IsString()
  readonly id: string;

  @IsPositive()
  readonly hitPoints: number;
}
