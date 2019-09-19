import * as Phaser from 'phaser';
import {GameScene} from '../scene/gameScene';

type AnimationFrame = Phaser.Types.Animations.AnimationFrame;

const SPRITE_KEY = 'trump';
const FRAME_RATE = 15;
const CRUISE_KEY = 'trumpCruise';
const THROW_ONE_KEY = 'trumpThrowOne';
const THROW_TWO_KEY = 'trumpThrowTwo';
const ANIMATION_COMPLETE = 'animationcomplete-';
const THROW_ONE_COMPLETE = ANIMATION_COMPLETE + THROW_ONE_KEY;
const THROW_TWO_COMPLETE = ANIMATION_COMPLETE + THROW_TWO_KEY;
const GROUND_KEY = 'ground';

export default class Trump extends Phaser.Physics.Arcade.Sprite {
  gameScene: GameScene;
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
    this.offsetY = this.height/2;
    this.offsetX = this.width/10;
    this.gameScene.add.existing(this);
    this.gameScene.physics.world.enable(this);
    this.body.setSize(this.width/2, this.offsetY)
      .setOffset(this.offsetX, this.offsetY);
    this.setCollideWorldBounds(true);
    this.createAnimations();
    this.anims.load(CRUISE_KEY);
    this.anims.load(THROW_ONE_KEY);
    this.anims.load(THROW_TWO_KEY);
    this.cruise();
  }

  update(): void {
    if (this.gameScene.registry.get('trumpDoThrowOne')) {
      this.throwOne();
    } else if (this.gameScene.registry.get('trumpDoThrowTwo')) {
      this.throwTwo();
    } else {
      this.cruise();
    }
  }

  private cruise(): void {
    this.anims.play(CRUISE_KEY, true);
  }

  private throwOne(): void {
    this.anims.play(THROW_ONE_KEY, true);
  }

  private throwTwo(): void {
    this.anims.play(THROW_TWO_KEY, true);
  }

  private throwOneComplete(): void {
    this.gameScene.registry.set('trumpDoThrowOne', false);
    this.gameScene.registry.set('hatOneDoThrow', true);
    this.gameScene.time.delayedCall(
      2000,
      () => this.gameScene.registry.set('trumpDoThrowTwo', true), null, this);
  }

  private throwTwoComplete(): void {
    this.gameScene.registry.set('trumpDoThrowTwo', false);
    this.gameScene.registry.set('hatTwoDoThrow', true);
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
      key: THROW_ONE_KEY,
      frames: this.throwFrames(),
      frameRate: FRAME_RATE * 2,
      repeat: 0
    });

    anims.create({
      key: THROW_TWO_KEY,
      frames: this.throwFrames(),
      frameRate: FRAME_RATE * 2,
      repeat: 0
    });

    this.on(THROW_ONE_COMPLETE, this.throwOneComplete);
    this.on(THROW_TWO_COMPLETE, this.throwTwoComplete);
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
};
