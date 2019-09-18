import {GameScene} from '../scene/gameScene';
import GameData from '../gameData';

type Image = Phaser.GameObjects.Image;

const EMPTY = 0x565656;
const HEALTH_X = 40;
const HEALTH_Y = 40;
const HEALTH_PAD = 5;
const TRUMP_HEALTH = 5;

export default class HealthStatus {
  private gameScene: GameScene;
  private gameData: GameData;
  private martyHealthBar: Image[];
  private trumpHealthBar: Image[];
  private trumpHitPoints: number;

  constructor(gameScene: GameScene) {
    this.gameScene = gameScene;
    this.gameData = gameScene.gameData;
    this.trumpHitPoints = TRUMP_HEALTH;
    this.drawInitialMartyHealth();
    this.updateMartyHealth();
    this.drawTrumpHealth(this.trumpHitPoints);
  }

  public martyDead(): boolean {
    return this.gameData.health <= 0;
  }

  public trumpHit(): void {
    this.trumpHitPoints--;
    if (this.trumpHitPoints >= 0) {
      this.trumpHealthBar[this.trumpHitPoints].setTint(EMPTY);
    }
  }

  public trumpDead(): boolean {
    return this.trumpHitPoints <= 0;
  }

  private drawInitialMartyHealth(): void {
    this.martyHealthBar = []
    for (let i = 0; i < this.gameData.maxHealth; i++) {
      this.martyHealthBar.push(
        this.gameScene.add.image(
          HEALTH_X * (i+1) + HEALTH_PAD * i,
          HEALTH_Y,
          'martyHealth').setScale(0.05, 0.05));
    }
  }

  private updateMartyHealth(): void {
    let health = this.gameData.health;
    if (health === 2) {
      this.martyHealthBar[2].setTint(EMPTY);
    } else if (health === 1) {
      this.martyHealthBar[2].setTint(EMPTY);
      this.martyHealthBar[1].setTint(EMPTY);
    }
  }

  private drawTrumpHealth(count: number) {
    this.trumpHealthBar = [];
    for (let i = 0; i < count; i++){
      this.trumpHealthBar.push(
        this.gameScene.add.image(
          HEALTH_X * (i+1) + HEALTH_PAD * i,
          HEALTH_Y * 2 + HEALTH_PAD,
          'trumpHealth'
        ).setScale(0.05, 0.05)
      );
    }
  }
};
