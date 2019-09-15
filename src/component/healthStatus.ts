import {GameScene} from '../scene/gameScene';

type Image = Phaser.GameObjects.Image;

const EMPTY = 0x565656;
const HEALTH_X = 40;
const HEALTH_Y = 40;
const HEALTH_PAD = 5;
const MARTY_HEALTH = 3;
const TRUMP_HEALTH = 5;

export default class HealthStatus {
  scene: GameScene;
  private martyHealthBar: Image[];
  private trumpHealthBar: Image[];
  private martyHitPoints: number;
  private trumpHitPoints: number;

  constructor(scene: GameScene) {
    this.scene = scene;
    this.martyHitPoints = MARTY_HEALTH;
    this.trumpHitPoints = TRUMP_HEALTH;
    this.drawMartyHealth(this.martyHitPoints);
    this.drawTrumpHealth(this.trumpHitPoints);
  }

  public martyHit(): void {
    this.martyHitPoints--;
    console.log('marty health: ' + this.martyHitPoints);
    this.martyHealthBar[this.martyHitPoints].setTint(EMPTY);
  }

  public martyDead(): boolean {
    return this.martyHitPoints <= 0;
  }

  public trumpHit(): void {
    this.trumpHitPoints--;
    console.log('trump health: ' + this.trumpHitPoints);
    this.trumpHealthBar[this.trumpHitPoints].setTint(EMPTY);
  }

  public trumpDead(): boolean {
    return this.trumpHitPoints <= 0;
  }

  private drawMartyHealth(count: number) {
    this.martyHealthBar = []
    for (let i = 0; i < count; i++) {
      this.martyHealthBar.push(
        this.scene.add.image(
          HEALTH_X * (i+1) + HEALTH_PAD * i,
          HEALTH_Y,
          'martyHealth').setScale(0.05, 0.05));
    }
  }

  private drawTrumpHealth(count: number) {
    this.trumpHealthBar = [];
    for (let i = 0; i < count; i++){
      this.trumpHealthBar.push(
        this.scene.add.image(
          HEALTH_X * (i+1) + HEALTH_PAD * i,
          HEALTH_Y * 2 + HEALTH_PAD,
          'trumpHealth'
        ).setScale(0.05, 0.05)
      );
    }
  }
}
