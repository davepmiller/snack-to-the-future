import * as Phaser from 'phaser';
import {GameScene} from './main';
type Sprite = Phaser.Physics.Arcade.Sprite;
type AnimationFrame = Phaser.Types.Animations.AnimationFrame;
type AnimationManager = Phaser.Animations.AnimationManager;

const SCALE_X = 0.25;
const SCALE_Y = 0.25;
const BOUNCE = 0.2;
const SPRITE_NAME = 'trump';
const ASSET_PATH = 'assets/sprites/trump.png';
const FRAME_SIZE = {frameWidth: 1000, frameHeight: 1000};

export class Trump {
  scene: GameScene;
  sprite: Sprite;

  constructor(gameScene: GameScene) {
    this.scene = gameScene;
    this.scene.load.spritesheet(SPRITE_NAME, ASSET_PATH, FRAME_SIZE);
  }

  public create() : void {
    const pos = {x: window.innerWidth / 10, y: window.innerHeight}
    this.sprite = this.scene.physics.add.sprite(pos.x, pos.y, SPRITE_NAME);
    this.sprite.setScale(SCALE_X, SCALE_Y);
    this.sprite.setBounce(BOUNCE);
    this.sprite.setCollideWorldBounds(true);
    this.createAnimations(this.scene.anims)
  }

  public update() : void {
    this.sprite.anims.play('trumpCruise', true);
  }

  private createAnimations(anims: AnimationManager) {
    anims.create({
      key: 'trumpCruise',
      frames: this.cruiseFrames(),
      frameRate: 12
    });

    anims.create({
      key: 'throw',
      frames: this.throwFrames(),
      frameRate: 15
    });
  }

  private cruiseFrames() : AnimationFrame[] {
    var frames = [];
    for (var i = 0; i < 31; i++) {
      frames.push({key: SPRITE_NAME, frame: i});
    }

    return frames;
  }

  private throwFrames() : AnimationFrame[] {
    var frames = [];
    for (var i = 9; i < 26; i++) {
      frames.push({key: SPRITE_NAME, frame: i});
    }

    return frames;
  }
}
