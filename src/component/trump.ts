import * as Phaser from 'phaser';
import {GameScene} from '../scene/gameScene';
type Sprite = Phaser.Physics.Arcade.Sprite;
type AnimationFrame = Phaser.Types.Animations.AnimationFrame;

const SCALE_X = 0.25;
const SCALE_Y = 0.25;
const SPRITE_KEY = 'trump';
const FRAME_RATE = 15;
const HAT_KEY = 'hat';
const HAT_VELOCITY = 500;
const CRUISE_KEY = 'CRUISE_KEY';
const THROW_KEY = 'THROW_KEY';
const ANIMATION_COMPLETE = 'animationcomplete-';
const THROW_COMPLETE = ANIMATION_COMPLETE + THROW_KEY;
const CRUISE_COMPLETE = ANIMATION_COMPLETE + CRUISE_KEY;
const GROUND_KEY = 'ground';

export class Trump {
  scene: GameScene;
  sprite: Sprite;
  hat: Sprite;
  offsetJumpY: number;
  offsetX: number;
  offsetY: number;

  constructor(gameScene: GameScene) {
    this.scene = gameScene;
  }

  static getSpriteName(): String {
    return SPRITE_KEY;
  }

  create(): void {
    this.createSprite();
    this.createHat();
    this.createAnimations();
    this.createAnimationHandlers();
    this.cruise();
  }

  update(): void {}

  private createAnimations() {
    let anims = this.scene.anims;
    anims.create({
      key: CRUISE_KEY,
      frames: this.cruiseFrames(),
      frameRate: FRAME_RATE,
      repeat: 2
    });

    anims.create({
      key: THROW_KEY,
      frames: this.throwFrames(),
      frameRate: FRAME_RATE,
      repeat: 0
    });

    anims.create({
      key: HAT_KEY,
      frames: this.scene.anims.generateFrameNumbers(
        HAT_KEY, {start: 0, end: 7}),
      frameRate: FRAME_RATE,
      repeat: -1,
    })
  }

  private cruise(): void {
    this.sprite.anims.play(CRUISE_KEY, true);
  }

  private throw(): void {
    this.sprite.anims.play(THROW_KEY, true);
  }

  private launchHat(): void {
    let pos = this.sprite.getRightCenter();
    this.hat.enableBody(true, pos.x, pos.y, true, true);
    this.hat.setVelocityX(HAT_VELOCITY);
    this.hat.anims.play(HAT_KEY, true);
  }

  private createSprite(): void {
    let groundY = this.scene.textures.get(GROUND_KEY).getSourceImage().height;
    let pos = {x: window.innerWidth / 10, y: window.innerHeight - groundY};
    this.sprite = this.scene.physics.add.sprite(pos.x, pos.y, SPRITE_KEY);
    this.sprite.setName(SPRITE_KEY); 
    this.sprite.setScale(SCALE_X, SCALE_Y);
    this.sprite.setCollideWorldBounds(true);
    this.offsetJumpY = -this.sprite.height*2;
    this.offsetY = this.sprite.height/2;
    this.offsetX = this.sprite.width/10;
    this.sprite.body.setSize(this.sprite.width/2, this.offsetY);
    this.sprite.body.setOffset(this.offsetX, this.offsetY);
  }

  private createHat(): void {
    let pos = this.sprite.getRightCenter();
    this.hat = this.scene.physics.add.sprite(pos.x, pos.y, HAT_KEY);
    this.hat.disableBody(true, true);
    this.hat.setName(HAT_KEY);
    this.hat.setScale(SCALE_X, SCALE_Y);
    this.hat.setOrigin(0, 0);
  }

  private createAnimationHandlers(): void {
    this.sprite.on(CRUISE_COMPLETE, () => {
      this.throw();
    });
    this.sprite.on(THROW_COMPLETE, () => {
      this.launchHat();
      // this.cruise();
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
