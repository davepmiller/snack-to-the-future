import {GameScene} from '../scene/gameScene';

const SPRITE_KEY = 'coin';
const FRAME_RATE = 15;
const VELOCITY_X = 450 * -1;

export default class Coin extends Phaser.Physics.Arcade.Sprite {
  private collecting: boolean;;
  gameScene: GameScene;

  constructor(gameScene: GameScene) {
    let groundY = gameScene.textures.get('ground').getSourceImage().height;
    let pos = {x: window.innerWidth - 300, y: window.innerHeight - groundY - 25};
    super(gameScene, pos.x, pos.y, SPRITE_KEY);
    this.gameScene = gameScene;
    this.collecting = false;
    this.gameScene.add.existing(this);
    this.gameScene.physics.add.existing(this);
    this.setVelocityX(VELOCITY_X);
    this.gameScene.anims.create({
      key: SPRITE_KEY,
      frames: this.gameScene.anims.generateFrameNumbers(
        SPRITE_KEY,{start: 0, end: 11}),
      frameRate: FRAME_RATE,
      repeat: -1
    });
    this.play(SPRITE_KEY);
  }

  collect(): void {
    if (this.collecting) {
      return;
    }

    this.collecting = true;
    this.gameScene.tweens.add({
      targets: this,
      alpha: 0,
      y: this.y - 100,
      duration: 500,
      ease: 'Power0',
      onComplete: this.destroy.bind(this)
    })
  }
}