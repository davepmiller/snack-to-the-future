import {GameScene} from '../scene/gameScene';

const SPRITE_KEY = 'hat';
const HAT_VELOCITY = 600;
const FRAME_RATE = 15;

export default class Hat extends Phaser.Physics.Arcade.Sprite {
  gameScene: GameScene;
  hasHit: boolean;
  offsetX: number;
  offsetY: number;

  constructor(gameScene: GameScene, hatName: string) {
    let pos = gameScene.trump.getRightCenter();
    super(gameScene, pos.x, pos.y - 50, SPRITE_KEY);
    this.gameScene = gameScene;
    this.hasHit = false;
    this.name = hatName;
    this.visible = false;
    this.offsetY = this.height/2;
    this.offsetX = this.width/10;
    this.gameScene.physics.world.enable(this);
    this.gameScene.add.existing(this);
    this.body.setSize(this.width/2, this.offsetY)
      .setOffset(this.offsetX, this.offsetY);
    this.createAnimation();
    this.anims.load(SPRITE_KEY);
  }

  update(): void {
    if (this.x >= this.gameScene.physics.world.bounds.right) {
      this.reset();
    } else if (this.gameScene.registry.get(this.name + 'DoThrow') === true) {
      this.launchHat();
      this.gameScene.registry.set(this.name + 'DoThrow', false);
    }

    this.anims.play(SPRITE_KEY, true);
  }

  reset(): void {
    this.hasHit = false;
    this.visible = false;
    this.setVelocityX(0);
    this.x = this.gameScene.trump.getRightCenter().x;
  }

  private createAnimation(): void {
    this.gameScene.anims.create({
      key: SPRITE_KEY,
      frames: this.gameScene.anims.generateFrameNumbers(
        SPRITE_KEY, {start: 0, end: 7}),
      frameRate: FRAME_RATE,
      repeat: -1,
    });
  }

  private launchHat(): void {
    this.visible = true;
    this.setVelocityX(HAT_VELOCITY);
  }
};
