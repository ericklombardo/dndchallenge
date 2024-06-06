import { Injectable } from '@nestjs/common';
import { DefaultPlayerService } from './default-player/default-player.service';

@Injectable()
export class HitPointsService {
  constructor(private readonly defaultPlayerService: DefaultPlayerService) {}

  async dealDamage(damage: number, damageType: string) {
    // Find the player
    const player = await this.defaultPlayerService.getDefaultPlayer();
    // Find the defense for the damage type
    const defense = player.defenses.find(
      (defense) => defense.type === damageType,
    );
    const noDamageDefenses = ['immunity', 'resistance'];
    // No damage if the player has immunity or resistance
    if (defense && noDamageDefenses.includes(defense.defense)) {
      return;
    }
    // Update the player hit points decreasing it with the damage
    await this.defaultPlayerService.updateHitPoints(player.id, -damage);
  }

  async heal(heal: number) {
    const player = await this.defaultPlayerService.getDefaultPlayer();
    await this.defaultPlayerService.updateHitPoints(player.id, heal);
  }

  // addTemporaryHitPoints(temporaryHitPoints: number) {}
}
