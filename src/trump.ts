import * as Phaser from 'phaser';
import {GameScene} from './scene/gameScene';
type Sprite = Phaser.Physics.Arcade.Sprite;
type AnimationFrame = Phaser.Types.Animations.AnimationFrame;
type AnimationManager = Phaser.Animations.AnimationManager;

const SCALE_X = 0.25;
const SCALE_Y = 0.25;
const SPRITE_NAME = 'trump';

export class Trump {
  scene: GameScene;
  sprite: Sprite;
  offsetJumpY: number;
  offsetX: number;
  offsetY: number;

  constructor(gameScene: GameScene) {
    this.scene = gameScene;
  }

  public create() : void {
    this.createSprite();
    this.createAnimations(this.scene.anims);
    this.cruise();
  }

  private createAnimations(anims: AnimationManager) {
    anims.create({
      key: 'trumpCruise',
      frames: this.cruiseFrames(),
      frameRate: 15,
      repeat: -1
    });
  }

  private cruise() : void {
    this.sprite.anims.play('trumpCruise', true);
  }

  private createSprite() : void {
    let groundY = this.scene.textures.get('ground').getSourceImage().height;
    let pos = {x: window.innerWidth / 10, y: window.innerHeight - groundY};
    this.sprite = this.scene.physics.add.sprite(pos.x, pos.y, SPRITE_NAME);
    this.sprite.setScale(SCALE_X, SCALE_Y);
    this.sprite.setCollideWorldBounds(true);
    this.offsetJumpY = -this.sprite.height*2;
    this.offsetY = this.sprite.height/2;
    this.offsetX = this.sprite.width/10;
    this.sprite.body.setSize(this.sprite.width/2, this.offsetY);
    this.sprite.body.setOffset(this.offsetX, this.offsetY);
  }

  private cruiseFrames() : AnimationFrame[] {
    var frames = [];
    for (var i = 0; i < 30; i++) {
      frames.push({key: SPRITE_NAME, frame: i});
    }

    return frames;
  }
}
