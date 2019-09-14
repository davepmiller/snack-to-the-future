import {GameScene} from '../scene/gameScene';

type Image = Phaser.GameObjects.Image;

const EMPTY = 0x565656;
const HEALTH_X = 40;
const HEALTH_Y = 40;
const HEALTH_PAD = 5;

export default class HealthStatus {
  scene: GameScene;
  martyHealth: Image[];
  trumpHealth: Image[];

  constructor(scene: GameScene) {
    this.scene = scene;
    let health = this.scene.registry.get('health');
    this.drawMartyHealth(health.marty);
    this.drawTrumpHealth(health.trump);
    scene.events.addListener('MARTY_HIT', this.martyHit, this);
    scene.events.addListener('TRUMP_HIT', this.trumpHit, this);
  }

  public martyHit(): void {
    let health = this.scene.registry.get('health').marty;
    this.martyHealth[health].setTint(EMPTY);
  }

  public trumpHit(): void {
    let health = this.scene.registry.get('health').trump;
    this.trumpHealth[health].setTint(EMPTY);
  }

  private drawMartyHealth(count: number) {
    this.martyHealth = []
    for (let i = 0; i < count; i++) {
      this.martyHealth.push(
        this.scene.add.image(
          HEALTH_X * (i+1) + HEALTH_PAD * i,
          HEALTH_Y,
          'martyHealth').setScale(0.05, 0.05));
    }
  }

  private drawTrumpHealth(count: number) {
    this.trumpHealth = [];
    for (let i = 0; i < count; i++){
      this.trumpHealth.push(
        this.scene.add.image(
          HEALTH_X * (i+1) + HEALTH_PAD * i,
          HEALTH_Y * 2 + HEALTH_PAD,
          'trumpHealth'
        ).setScale(0.05, 0.05)
      );
    }
  }
}
