import * as Phaser from 'phaser';
import {GameScene} from '../scene/gameScene';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

type Sprite = Phaser.Physics.Arcade.Sprite;
type Gamepad = Phaser.Input.Gamepad.Gamepad;
type AnimationFrame = Phaser.Types.Animations.AnimationFrame;

const SCALE_X = 0.25;
const SCALE_Y = 0.25;
const SPRITE_KEY = 'marty';
const FRAME_RATE = 15;

export default class Marty extends Phaser.Physics.Arcade.Sprite {
  // sprite: Sprite;
  gameScene: GameScene;
  offsetJumpY: number;
  offsetX: number;
  offsetY: number;

  constructor(gameScene: GameScene) {
    let groundY = gameScene.textures.get('ground').getSourceImage().height;
    let pos = {x: window.innerWidth / 2.5, y: window.innerHeight - groundY};
    super(gameScene, pos.x, pos.y, SPRITE_KEY);
    this.gameScene = gameScene;
    this.name = SPRITE_KEY;
    this.scaleX = SCALE_X;
    this.scaleY = SCALE_Y;
    this.offsetJumpY = -this.height*2;
    this.offsetY = this.height/2;
    this.offsetX = this.width/10;
    this.gameScene.physics.world.enable(this);
    this.body.setSize(this.width/2, this.offsetY)
      .setOffset(this.offsetX, this.offsetY)
      .customSeparateY = true;
    this.gameScene.add.existing(this);
    this.createAnimations();
    this.createAnimationCallbacks();
    this.createInputHandling();
    this.cruise();
  }

  create(): void {
    this.createAnimations();
    this.createAnimationCallbacks();
    this.createInputHandling();
    this.cruise();
  }

  static getSpriteName(): String {
    return SPRITE_KEY;
  }

  private cruise(): void {
    this.anims.play('cruise', true);
  }

  private ollie(): void {
    this.anims.play('ollie', true);
  }

  private thread(): void {
    this.anims.play('thread', true);
  }

  private createInputHandling(): void {
    this.gameScene.input.gamepad.on(
      'down',
      (pad: Gamepad) => {
        if (pad.A) {
          this.ollie();
        } else if (pad.B) {
          this.thread();
        }
      }
    );

    this.gameScene.cursors.space.onDown = (e) => {
      this.ollie();
    }

    this.gameScene.cursors.up.onDown = (e) => {
      this.thread();
    }
  }

  private createAnimations(): void {
    this.gameScene.anims.create({
      key: 'cruise',
      frames: this.cruiseFrames(),
      frameRate: FRAME_RATE,
      repeat: -1,
    });

    this.gameScene.anims.create({
      key: 'ollie',
      frames: this.ollieFrames(),
      frameRate: FRAME_RATE,
    });

    this.gameScene.anims.create({
      key: 'thread',
      frames: this.threadFrames(),
      frameRate: FRAME_RATE,
    });
  }

  private cruiseFrames(): AnimationFrame[] {
    var frames = [];
    for (let i = 0; i < 9; i++) {
      frames.push({key: SPRITE_KEY, frame: i});
      frames.push({key: SPRITE_KEY, frame: i});
    }

    for (let i = 34; i < 53; i++) {
      frames.push({key: SPRITE_KEY, frame: i});
    }

    return frames;
  }

  private ollieFrames(): AnimationFrame[] {
    var frames = [];
    for (var i = 9; i < 26; i++) {
      frames.push({key: SPRITE_KEY, frame: i});
      if (i === 18) {
        frames.push({key: SPRITE_KEY, frame: i});
        frames.push({key: SPRITE_KEY, frame: i});
      }
    }

    return frames;
  }

  private threadFrames(): AnimationFrame[] {
    var frames = [];
    for (var i = 50; i < 61; i++) {
      frames.push({key: SPRITE_KEY, frame: i});
      if (i === 57) {
        frames.push({key: SPRITE_KEY, frame: i});
        frames.push({key: SPRITE_KEY, frame: i});
      }
    }

    return frames;
  }

  private createAnimationCallbacks(): void {
    this.on('animationstart-ollie', () => {
      this.body.setOffset(this.offsetX, this.offsetJumpY);
    });
    this.on('animationcomplete-ollie', () => {
      this.body.setOffset(this.offsetX, this.offsetY);
      this.cruise();
    });
    this.on('animationstart-thread', () => {
      this.body.setOffset(this.offsetX, this.offsetJumpY);
    });
    this.on('animationcomplete-thread', () => {
      this.body.setOffset(this.offsetX, this.offsetY);
      this.cruise();;
    });
  }
};
