import { Injectable } from '@nestjs/common';
import {
  DefaultPlayerService,
  PLAYER_ID,
} from './default-player/default-player.service';
import { DamageType } from './dtos/deal-damage.dto';

@Injectable()
export class HitPointsService {
  constructor(private readonly defaultPlayerService: DefaultPlayerService) {}

  async dealDamage(damage: number, damageType: DamageType) {
    if (damage <= 0) {
      return;
    }

    // Find the player
    const player = await this.defaultPlayerService.getDefaultPlayer();
    // Find the defense for the damage type
    const defense = player.defenses.find(
      (defense) => defense.type === damageType,
    );
    // No damage if the player has immunity
    if (defense && defense.defense === 'immunity') {
      return;
    }
    // Half-damage if the player has resistance
    if (defense && defense.defense === 'resistance') {
      damage = Math.ceil(damage / 2);
    }

    const remainingDamage = damage - player.temporaryHitPoints;

    // if some temporary hit points remains then remove them
    if (remainingDamage < 0) {
      await this.defaultPlayerService.increaseTemporaryHitPoints(
        player.id,
        remainingDamage,
      );
      return;
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
  }

  async heal(heal: number) {
    const player = await this.defaultPlayerService.getDefaultPlayer();
    await this.defaultPlayerService.increaseHitPoints(player.id, heal);
  }

  async addTemporaryHitPoints(hitPoints: number) {
    await this.defaultPlayerService.updateTemporaryHitPoints(
      PLAYER_ID,
      hitPoints,
    );
  }
}
