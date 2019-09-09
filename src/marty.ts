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

export class Marty {
  sprite: Sprite;
  scene: GameScene;
  offsetJumpY: number;
  offsetX: number;
  offsetY: number;

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

  public update(): void {
    if (this.sprite.body.touching.down) {
      this.cruise();
    }
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
    this.sprite.setScale(SCALE_X, SCALE_Y);
    this.sprite.setCollideWorldBounds(true);
    this.offsetJumpY = -this.sprite.height*2;
    this.offsetY = this.sprite.height/2;
    this.offsetX = this.sprite.width/10;
    this.sprite.body.setSize(this.sprite.width/2, this.offsetY);
    this.sprite.body.setOffset(this.offsetX, this.offsetY);
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
      if (i === 57) {
        frames.push({key: SPRITE_NAME, frame: i});
        frames.push({key: SPRITE_NAME, frame: i});
      }
    }

    return frames;
  }

  private createAnimationCallbacks() : void {
    this.sprite.on('animationstart-ollie', () => {
      this.sprite.body.setOffset(this.offsetX, this.offsetJumpY);
    });
    this.sprite.on('animationcomplete-ollie', () => {
      this.sprite.body.setOffset(this.offsetX, this.offsetY);
      this.cruise();
    });
    this.sprite.on('animationstart-thread', () => {
      this.sprite.body.setOffset(this.offsetX, this.offsetJumpY);
    });
    this.sprite.on('animationcomplete-thread', () => {
      this.sprite.body.setOffset(this.offsetX, this.offsetY);
      this.cruise();;
    });
  }
};
