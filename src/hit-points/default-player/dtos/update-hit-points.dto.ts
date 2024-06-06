import { IsInt, IsString } from 'class-validator';

export class UpdateHitPointsDto {
  @IsString()
  readonly id: string;

  @IsInt()
  readonly hitPoints: number;
}
