import * as Phaser from 'phaser';
import {GameScene} from './main';
type Sprite = Phaser.Physics.Arcade.Sprite;
type Gamepad = Phaser.Input.Gamepad.Gamepad;
type Button = Phaser.Input.Gamepad.Button;

const SCALE_X = 0.25;
const SCALE_Y = 0.25;
const BOUNCE = 0.2;
const SPRITE_NAME = 'marty';
const ASSET_PATH = 'assets/sprites/marty.png';
const FRAME_SIZE = {frameWidth: 1000, frameHeight: 1000};

export class Marty {
  sprite: Phaser.Physics.Arcade.Sprite;
  scene: GameScene;

  constructor(scene: GameScene) {
    this.scene = scene;
    this.scene.load.spritesheet(SPRITE_NAME, ASSET_PATH, FRAME_SIZE);
  }

  public create() {
    this.createSprite();
    this.createAnimations();
    this.createInputHandling();
    this.cruise();
  }

  public update() {}

  private cruise(): void {
    this.sprite.anims.play('cruise', true);
  }

  private ollie(): void {
    this.sprite.anims.play('ollie', true)
      .on('animationcomplete', () => {
        this.cruise();
      });
  }

  private thread(): void {
    this.sprite.anims.play('thread', true)
      .on('animationcomplete', () => {
        this.cruise();
      });
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
    this.sprite.setBounce(BOUNCE);
    this.sprite.setCollideWorldBounds(true);
  }

  private createAnimations() : void {
    this.scene.anims.create({
      key: 'cruise',
      frames: this.cruiseFrames(),
      frameRate: 15,
    });

    this.scene.anims.create({
      key: 'ollie',
      frames: this.ollieFrames(),
      frameRate: 15
    });

    this.scene.anims.create({
      key: 'thread',
      frames: this.threadFrames(),
      frameRate: 15
    });
  }

  private cruiseFrames() : Phaser.Types.Animations.AnimationFrame[] {
    var frames = [];
    for (var i = 0; i < 9; i++) {
      frames.push({key: SPRITE_NAME, frame: i});
    }

    for (var i = 21; i < 53; i++) {
      frames.push({key: SPRITE_NAME, frame: i});
    }

    return frames;
  }

  private ollieFrames() : Phaser.Types.Animations.AnimationFrame[] {
    var frames = [];
    for (var i = 9; i < 26; i++) {
      frames.push({key: SPRITE_NAME, frame: i});
    }

    return frames;
  }

  private threadFrames() : Phaser.Types.Animations.AnimationFrame[] {
    var frames = [];
    for (var i = 50; i < 61; i++) {
      frames.push({key: SPRITE_NAME, frame: i});
    }

    return frames;
  }
};
