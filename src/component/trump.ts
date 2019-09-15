import * as Phaser from 'phaser';
import {GameScene} from '../scene/gameScene';
type Sprite = Phaser.Physics.Arcade.Sprite;
type AnimationFrame = Phaser.Types.Animations.AnimationFrame;

const SCALE_X = 0.25;
const SCALE_Y = 0.25;
const SPRITE_KEY = 'trump';
const FRAME_RATE = 15;
const CRUISE_KEY = 'trumpCruise';
const THROW_KEY = 'trumpThrow';
const ANIMATION_COMPLETE = 'animationcomplete-';
const THROW_COMPLETE = ANIMATION_COMPLETE + THROW_KEY;
const GROUND_KEY = 'ground';

export default class Trump {
  scene: GameScene;
  sprite: Sprite;
  hat: Sprite;
  offsetJumpY: number;
  offsetX: number;
  offsetY: number;
  doThrow: boolean;

  constructor(gameScene: GameScene) {
    this.scene = gameScene;
    this.doThrow = false;
  }

  static getSpriteName(): String {
    return SPRITE_KEY;
  }

  create(): void {
    this.createSprite();
    this.createAnimations();
    this.cruise();
  }

  update(): void {
    if (this.doThrow) {
      this.throw();
    } else {
      this.cruise();
    }
  }

  private cruise(): void {
    this.sprite.anims.play(CRUISE_KEY, true);
  }

  private throw(): void {
    this.sprite.anims.play(THROW_KEY, true)
      .on(THROW_COMPLETE, () => {
        this.doThrow = false;
        this.scene.hat.doThrow = true;
      });
  }

  private createSprite(): void {
    let groundY = this.scene.textures.get(GROUND_KEY).getSourceImage().height;
    let pos = {x: window.innerWidth / 10, y: window.innerHeight - groundY};
    this.sprite = this.scene.physics.add.sprite(pos.x, pos.y, SPRITE_KEY)
      .setName(SPRITE_KEY)
      .setScale(SCALE_X, SCALE_Y)
      .setCollideWorldBounds(true);
    this.offsetJumpY = -this.sprite.height*2;
    this.offsetY = this.sprite.height/2;
    this.offsetX = this.sprite.width/10;
    this.sprite.body.setSize(this.sprite.width/2, this.offsetY);
    this.sprite.body.setOffset(this.offsetX, this.offsetY);
  }

  private createAnimations() {
    let anims = this.scene.anims;
    anims.create({
      key: CRUISE_KEY,
      frames: this.cruiseFrames(),
      frameRate: FRAME_RATE,
      repeat: -1
    });

    anims.create({
      key: THROW_KEY,
      frames: this.throwFrames(),
      frameRate: FRAME_RATE,
      repeat: 0
    });
  }

  private cruiseFrames(): AnimationFrame[] {
    var frames = [];
    for (let i = 0; i < 9; i++) {
      frames.push({key: SPRITE_KEY, frame: i});
    }

    for (let i = 23; i < 30; i++) {
      frames.push({key: SPRITE_KEY, frame: i});
    }

    return frames;
  }

  private throwFrames(): AnimationFrame[] {
    var frames = [];
    for (let i = 9; i < 23; i++) {
      frames.push({key: SPRITE_KEY, frame: i});
    }

    return frames;
  }
}
