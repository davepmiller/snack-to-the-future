import {GameScene} from '../scene/gameScene';

const SCALE_X = 0.25;
const SCALE_Y = 0.25;
const HAT_KEY = 'hat';
const HAT_VELOCITY = 500;
const FRAME_RATE = 15;

export default class Hat extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;
  doThrow: boolean;

  constructor(gameScene: GameScene) {
    let pos = gameScene.trump.sprite.getRightCenter();
    super(gameScene, pos.x, pos.y - 50, HAT_KEY);
    this.scene = gameScene;
    this.doThrow = false;
    this.scaleX = SCALE_X;
    this.scaleY = SCALE_Y;
    this.name = HAT_KEY;
    this.visible = false;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.createAnimation();
    this.launchHat(false);
  }

  update(): void {
    if (this.x >= this.scene.physics.world.bounds.right) {
      this.visible = false;
      this.setVelocityX(0);
      this.x = this.scene.trump.sprite.getRightCenter().x;
    } else if (this.doThrow) {
      this.launchHat();
      this.doThrow = false;
    }

    this.anims.play(HAT_KEY, true);
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

  private launchHat(visible: boolean = true): void {
    this.visible = visible;
    this.setVelocityX(HAT_VELOCITY);
  }
};
