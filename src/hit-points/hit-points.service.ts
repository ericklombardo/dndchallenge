import { Injectable } from '@nestjs/common';
import {
  DefaultPlayerService,
  PLAYER_ID,
} from './default-player/default-player.service';
import { DamageType } from './dtos/deal-damage.dto';
import { HitPointsResponse } from './dtos/hit-points.response';

@Injectable()
export class HitPointsService {
  constructor(private readonly defaultPlayerService: DefaultPlayerService) {}

  async dealDamage(
    damage: number,
    damageType: DamageType,
  ): Promise<HitPointsResponse> {
    // Find the player
    let player = await this.defaultPlayerService.getDefaultPlayer();

    // Find the defense for the damage type
    const defense = player.defenses.find(
      (defense) => defense.type === damageType,
    );
    // No damage if the player has immunity
    if (defense && defense.defense === 'immunity') {
      return {
        message: 'No damage (immunity)',
      };
    }

    let newDamage = damage;

    // Half-damage if the player has resistance
    if (defense && defense.defense === 'resistance') {
      newDamage = Math.ceil(damage / 2);
    }

    const remainingDamage = newDamage - player.temporaryHitPoints;

    // if some temporary hit points remains then remove them
    if (remainingDamage < 0) {
      await this.defaultPlayerService.increaseTemporaryHitPoints(
        player.id,
        remainingDamage,
      );
      player = await this.defaultPlayerService.getDefaultPlayer();
      return {
        message: `Temporary hit points absorbed all ${remainingDamage} damage, ${player.temporaryHitPoints} remaining`,
        hitPoints: player.hitPoints,
        temporaryHitPoints: player.temporaryHitPoints,
      };
    }

    // if the player has less hit points than the remaining damage, then remove all hit points
    if (player.hitPoints <= remainingDamage) {
      await this.defaultPlayerService.removeHitPoints(player.id);
    } else {
      // otherwise, remove the remaining damage
      await this.defaultPlayerService.increaseHitPoints(
        player.id,
        -remainingDamage,
      );
    }

    // Remove temporary hit points if any
    if (player.temporaryHitPoints > 0) {
      await this.defaultPlayerService.removeTemporaryHitPoints(player.id);
    }

    player = await this.defaultPlayerService.getDefaultPlayer();
    return {
      message: `Deal manage ${remainingDamage} ${damageType} damage`,
      hitPoints: player.hitPoints,
      temporaryHitPoints: player.temporaryHitPoints,
    };
  }

  async heal(heal: number): Promise<HitPointsResponse> {
    let player = await this.defaultPlayerService.getDefaultPlayer();
    await this.defaultPlayerService.increaseHitPoints(player.id, heal);
    player = await this.defaultPlayerService.getDefaultPlayer();
    return {
      message: `Heal ${heal} hit points`,
      hitPoints: player.hitPoints,
      temporaryHitPoints: player.temporaryHitPoints,
    };
  }

  async addTemporaryHitPoints(hitPoints: number): Promise<HitPointsResponse> {
    await this.defaultPlayerService.updateTemporaryHitPoints(
      PLAYER_ID,
      hitPoints,
    );
    const player = await this.defaultPlayerService.getDefaultPlayer();
    return {
      message: `Add ${hitPoints} temporary hit points`,
      hitPoints: player.hitPoints,
      temporaryHitPoints: player.temporaryHitPoints,
    };
  }
}
