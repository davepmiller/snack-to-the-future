import {GameScene} from '../scene/gameScene';
import GameData from '../gameData';

type Image = Phaser.GameObjects.Image;
type Text = Phaser.GameObjects.Text;

const EMPTY = 0x565656;
const HEALTH_X = 40;
const HEALTH_Y = 40;
const HEALTH_PAD = 5;
const TRUMP_HEALTH = 7;

export default class GameStatus {
  private gameScene: GameScene;
  private gameData: GameData;
  private martyHealthBar: Image[];
  private trumpHealthBar: Image[];
  private trumpHitPoints: number;
  private scoreText: Text;
  private highScoreText: Text;
  private updateCounter: number = 0;

  constructor(gameScene: GameScene) {
    this.gameScene = gameScene;
    this.gameData = gameScene.gameData;
    this.trumpHitPoints = TRUMP_HEALTH;
    this.drawInitialMartyHealth();
    this.updateMartyHealth();
    this.drawTrumpHealth(this.trumpHitPoints);
    this.drawScore();
  }

  public update(): void {
    if (this.updateCounter++ >= 50) {
      this.updateCounter = 0;
      this.scoreText.setText(this.getScoreText());
    }
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

  public trumpHealth(): number {
    return this.trumpHitPoints;
  }

  private drawInitialMartyHealth(): void {
    this.martyHealthBar = []
    for (let i = 0; i < this.gameData.maxHealth; i++) {
      this.martyHealthBar.push(
        this.gameScene.add.image(
          HEALTH_X * (i+1) + HEALTH_PAD * i,
          HEALTH_Y,
          'martyHealth')
        );
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
        )
      );
    }
  }

  private drawScore() {
    let pos = {x: HEALTH_X, y: HEALTH_Y * 3 + HEALTH_PAD};
    let sprite = this.gameScene.add.sprite(pos.x, pos.y, 'coin').setFrame(8);
    this.scoreText = this.gameScene.add.text(
      pos.x + sprite.width / 2,
      pos.y + HEALTH_PAD - sprite.height / 4,
      this.getScoreText(),
      {fontSize: '16px'}
    );
  }

  private getScoreText(): string {
    return this.getCurrentText() + ' ' + this.getHighScoreText();
  }

  private getHighScoreText(): string {
    return 'HIGH SCORE: ' + this.gameData.highScore;
  }

  private getCurrentText(): string {
    return ': ' + this.gameData.score;
  }
};
