import {GameScene} from '../scene/gameScene';

type Sprite = Phaser.Physics.Arcade.Sprite;

const SCALE_X = 0.25;
const SCALE_Y = 0.25;
const HAT_KEY = 'hat';
const HAT_VELOCITY = 500;
const FRAME_RATE = 15;

export default class Hat {
  scene: GameScene;
  sprite: Sprite;

  constructor(gameScene: GameScene) {
    this.scene = gameScene;
  }

  create(): void {
    this.createSprite();
    this.createAnimation();
  }

  update(): void {
    this.launchHat();
  }

  private createAnimation(): void {
    this.scene.anims.create({
      key: HAT_KEY,
      frames: this.scene.anims.generateFrameNumbers(
        HAT_KEY, {start: 0, end: 7}),
      frameRate: FRAME_RATE,
      repeat: -1,
    });
  }

  private createSprite(): void {
    let pos = this.scene.trump.sprite.getRightCenter();
    this.sprite = this.scene.physics.add.sprite(pos.x + 100, pos.y - 150, HAT_KEY)
      .setScale(SCALE_X, SCALE_Y)
      .disableBody(true, true)
      .setName(HAT_KEY);
  }

  private launchHat(): void {
    let pos = this.scene.trump.sprite.getRightCenter();
    this.sprite.setVelocityX(HAT_VELOCITY)
      .enableBody(true, pos.x + 200, pos.y + this.sprite.height - 150, true, true)
      .anims.play(HAT_KEY, true);
  }
};
