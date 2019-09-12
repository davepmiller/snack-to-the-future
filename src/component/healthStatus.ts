import {GameScene} from '../scene/gameScene';

type Graphics = Phaser.GameObjects.Graphics;

const BANANA = 0xFFE135;
const RED = 0xFF6347;
const EMPTY = 0x565656;

const CIRCLE_RADIUS = 20;
const HEALTH_X = 40;
const HEALTH_Y = 40;
const HEALTH_PAD = 5;

export default class HealthStatus {
  scene: GameScene;
  martyHealth: Graphics;

  constructor(scene: GameScene) {
    this.scene = scene;
    this.createHealthBars();
    scene.events.addListener('MARTY_HIT', this.martyHit, this);
  }

  public martyHit(): void {
    let health = this.scene.registry.get('health').marty;
    console.log(health);
    this.martyHealth.destroy();
    this.martyHealth = this.scene.add.graphics();
    if (health === 2) {
     this.martyHealth.fillStyle(BANANA, 1);
     this.drawHealthCircles(2);
     this.martyHealth.fillStyle(EMPTY, 1);
     this.martyHealth.fillCircle(HEALTH_X * 3 + HEALTH_PAD * 2, HEALTH_Y, CIRCLE_RADIUS);
    } else if (health === 1) {
      this.martyHealth.fillStyle(BANANA, 1);
      this.drawHealthCircles(1);
      this.martyHealth.fillStyle(EMPTY, 1);
      this.martyHealth.fillCircle(HEALTH_X * 2 + HEALTH_PAD * 1, HEALTH_Y, CIRCLE_RADIUS);
      this.martyHealth.fillCircle(HEALTH_X * 3 + HEALTH_PAD * 2, HEALTH_Y, CIRCLE_RADIUS);
    } else {
      this.martyHealth.fillStyle(EMPTY, 1);
      this.drawHealthCircles(3);
    }
  }

  private createHealthBars(): void {
    this.martyHealth = this.scene.add.graphics();
    this.martyHealth.fillStyle(BANANA, 1);
    this.drawHealthCircles(3);
  }

  private drawHealthCircles(count: number) {
    for (let i = 0; i < count; i++) {
      this.martyHealth.fillCircle(
        HEALTH_X * (i+1) + HEALTH_PAD * i, HEALTH_Y, CIRCLE_RADIUS);
    }
  }
}
