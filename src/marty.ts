import * as Phaser from 'phaser';
import {GameScene} from './scenes/gameScene';

type Sprite = Phaser.Physics.Arcade.Sprite;
type Gamepad = Phaser.Input.Gamepad.Gamepad;
type Button = Phaser.Input.Gamepad.Button;
type AnimationFrame = Phaser.Types.Animations.AnimationFrame;

const SCALE_X = 0.25;
const SCALE_Y = 0.25;
const SPRITE_NAME = 'marty';
const FRAME_RATE = 15;
const VELOCITY_X = 1000;

export class Marty {
  sprite: Sprite;
  scene: GameScene;

  constructor(scene: GameScene) {
    this.scene = scene;
  }

  public create() : void {
    this.createSprite();
    this.createAnimations();
    this.createAnimationCallbacks();
    this.createInputHandling();
    this.cruise();
  }

  private cruise(): void {
    this.sprite.anims.play('cruise', true);
  }

  private ollie(): void {
    this.sprite.anims.play('ollie', true);
  }

  private thread(): void {
    this.sprite.anims.play('thread', true);
  }

  private createInputHandling() : void {
    this.scene.input.gamepad.on(
      'down',
      (pad: Gamepad, button: Button, value: number) => {
        if (pad.A) {
          this.ollie();
        } else if (pad.B) {
          this.thread();
        }
      }
    );

    this.scene.cursors.space.onDown = (e) => {
      this.ollie();
    }

    this.scene.cursors.up.onDown = (e) => {
      this.thread();
    }
  }

  private createSprite() : void {
    const pos = {x: window.innerWidth / 2.5, y: window.innerHeight}
    this.sprite = this.scene.physics.add.sprite(pos.x, pos.y, SPRITE_NAME);
    this.sprite.setVelocity(VELOCITY_X, 0);
    const cameraOffsetY = window.innerHeight/2-this.sprite.height/2*SCALE_Y
    this.scene.cameras.main.startFollow(
      this.sprite, undefined, undefined, undefined, undefined, cameraOffsetY);
    this.sprite.setScale(SCALE_X, SCALE_Y);
    this.sprite.setCollideWorldBounds(true);
  }

  private createAnimations() : void {
    this.scene.anims.create({
      key: 'cruise',
      frames: this.cruiseFrames(),
      frameRate: FRAME_RATE,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'ollie',
      frames: this.ollieFrames(),
      frameRate: FRAME_RATE,
    });

    this.scene.anims.create({
      key: 'thread',
      frames: this.threadFrames(),
      frameRate: FRAME_RATE,
    });
  }

  private cruiseFrames() : AnimationFrame[] {
    var frames = [];
    for (var i = 0; i < 9; i++) {
      frames.push({key: SPRITE_NAME, frame: i});
    }

    for (var i = 21; i < 53; i++) {
      frames.push({key: SPRITE_NAME, frame: i});
    }

    return frames;
  }

  private ollieFrames() : AnimationFrame[] {
    var frames = [];
    for (var i = 9; i < 26; i++) {
      frames.push({key: SPRITE_NAME, frame: i});
      if (i === 18) {
        frames.push({key: SPRITE_NAME, frame: i});
        frames.push({key: SPRITE_NAME, frame: i});
      }
    }

    return frames;
  }

  private threadFrames() : AnimationFrame[] {
    var frames = [];
    for (var i = 50; i < 61; i++) {
      frames.push({key: SPRITE_NAME, frame: i});
    }

    return frames;
  }

  private createAnimationCallbacks() : void {
    const jumpOffset = -this.sprite.height*2;
    this.sprite.on('animationstart-ollie', () => {
      this.sprite.body.setOffset(0, jumpOffset);
    });
    this.sprite.on('animationcomplete-ollie', () => {
      this.sprite.body.setOffset(0, 0);
      this.cruise();
    });
    this.sprite.on('animationstart-thread', () => {
      this.sprite.body.setOffset(0, jumpOffset);
    });
    this.sprite.on('animationcomplete-thread', () => {
      this.sprite.body.setOffset(0, 0);
      this.cruise();;
    });
  }
};
