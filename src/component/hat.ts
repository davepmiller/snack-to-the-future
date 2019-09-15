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
  doThrow: boolean;

  constructor(gameScene: GameScene) {
    this.scene = gameScene;
    this.doThrow = false;
  }

  create(): void {
    this.createSprite();
    this.createAnimation();
    this.launchHat(false);
  }

  update(): void {
    if (this.sprite.x >= this.scene.physics.world.bounds.right) {
      this.sprite.visible = false;
      this.sprite.setVelocityX(0);
      this.sprite.x = this.scene.trump.sprite.getRightCenter().x;
    } else if (this.doThrow) {
      this.launchHat();
      this.doThrow = false;
    }

    this.sprite.anims.play(HAT_KEY, true);
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
    this.sprite = this.scene.physics.add.sprite(pos.x, pos.y - 50, HAT_KEY)
      .setScale(SCALE_X, SCALE_Y)
      .setName(HAT_KEY)
      .setVisible(false);
  }

  private launchHat(visible: boolean = true): void {
    this.sprite.setVisible(visible).setVelocityX(HAT_VELOCITY);
  }
};
