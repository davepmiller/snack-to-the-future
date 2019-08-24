import * as Phaser from 'phaser';
import {GameScene} from './main';

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
    const pos = {x: window.innerWidth / 2, y: window.innerHeight}
    this.sprite = this.scene.physics.add.sprite(pos.x, pos.y, SPRITE_NAME);
    this.sprite.setScale(SCALE_X, SCALE_Y);
    this.sprite.setBounce(BOUNCE);
    this.sprite.setCollideWorldBounds(true);
    this.createAnimations(this.scene.anims)
  }

  public update() {
    var ollie = this.scene.cursors.space.isDown;
    var thread = this.scene.cursors.up.isDown;
    if (this.scene.input.gamepad.gamepads.length !== 0) {
      const pad = this.scene.input.gamepad.gamepads[0];
      ollie = pad.A;
      thread = pad.B;
    }
    
    if (ollie) {
      this.ollie();
    } else if (thread) {
      this.thread();
    } else {
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

  private createAnimations(anims: Phaser.Animations.AnimationManager) {
    anims.create({
      key: 'cruise',
      frames: this.cruiseFrames(),
      frameRate: 15
    });

    anims.create({
      key: 'ollie',
      frames: this.ollieFrames(),
      frameRate: 15
    });

    anims.create({
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
