import {GameScene} from '../scene/gameScene';

const SCALE_X = 0.25;
const SCALE_Y = 0.25;
const HAT_KEY = 'hat';
const HAT_VELOCITY = 500;
const FRAME_RATE = 15;

export default class Hat extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;
  doThrow: boolean;
  hasHit: boolean;
  offsetX: number;
  offsetY: number;

  constructor(gameScene: GameScene) {
    let pos = gameScene.trump.getRightCenter();
    super(gameScene, pos.x, pos.y - 50, HAT_KEY);
    this.scene = gameScene;
    this.doThrow = false;
    this.hasHit = false;
    this.scaleX = SCALE_X;
    this.scaleY = SCALE_Y;
    this.name = HAT_KEY;
    this.visible = false;
    this.offsetY = this.height/2;
    this.offsetX = this.width/10;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setSize(this.width/2, this.offsetY)
      .setOffset(this.offsetX, this.offsetY);
    this.createAnimation();
  }

  update(): void {
    if (this.x >= this.scene.physics.world.bounds.right) {
      this.reset();
    } else if (this.doThrow) {
      this.launchHat();
      this.doThrow = false;
    }

    this.anims.play(HAT_KEY, true);
  }

  reset(): void {
    this.hasHit = false;
    this.visible = false;
    this.setVelocityX(0);
    this.x = this.scene.trump.getRightCenter().x;
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

  private launchHat(): void {
    this.visible = true;
    this.setVelocityX(HAT_VELOCITY);
  }
};
