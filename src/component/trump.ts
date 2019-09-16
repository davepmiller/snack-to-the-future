import * as Phaser from 'phaser';
import {GameScene} from '../scene/gameScene';

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

export default class Trump extends Phaser.Physics.Arcade.Sprite {
  gameScene: GameScene;
  offsetJumpY: number;
  offsetX: number;
  offsetY: number;
  doThrow: boolean;

  constructor(gameScene: GameScene) {
    let groundY = gameScene.textures.get(GROUND_KEY).getSourceImage().height;
    let pos = {x: window.innerWidth / 10, y: window.innerHeight - groundY};
    super(gameScene, pos.x, pos.y, SPRITE_KEY);
    this.gameScene = gameScene;
    this.doThrow = false;
    this.name = SPRITE_KEY;
    this.scaleX = SCALE_X;
    this.scaleY = SCALE_Y;
    this.offsetJumpY = -this.height*2;
    this.offsetY = this.height/2;
    this.offsetX = this.width/10;
    this.gameScene.add.existing(this);
    this.gameScene.physics.world.enable(this);
    this.body.setSize(this.width/2, this.offsetY)
      .setOffset(this.offsetX, this.offsetY);
    this.setCollideWorldBounds(true);
    this.createAnimations();
    this.cruise();
  }

  static getSpriteName(): String {
    return SPRITE_KEY;
  }

  update(): void {
    if (this.doThrow) {
      this.throw();
    } else {
      this.cruise();
    }
  }

  private cruise(): void {
    this.anims.play(CRUISE_KEY, true);
  }

  private throw(): void {
    this.anims.play(THROW_KEY, true)
      .on(THROW_COMPLETE, () => {
        this.doThrow = false;
        this.gameScene.hat.doThrow = true;
      });
  }

  private createAnimations() {
    let anims = this.gameScene.anims;
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
