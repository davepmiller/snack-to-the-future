import * as Phaser from 'phaser';
import {GameScene} from '../scene/gameScene';

type Sprite = Phaser.Physics.Arcade.Sprite;

const SCALE_X = 0.25;
const SCALE_Y = 0.25;
const SPRITE_KEY = 'poop';
const VELOCITY_X = 400;

interface Pos {
  x: number;
  y: number;
}

export class Poop {
  sprite: Sprite;
  scene: GameScene;
  sprites: Phaser.Physics.Arcade.Group;

  constructor(scene: GameScene) {
    this.scene = scene;
  }

  public create(): void {
    this.createSprite();
    this.createAnimations();
    this.playAnimation();
  }

  public update(): void {
    if (this.sprite) {
      this.sprite.setVelocityX(VELOCITY_X * -1);
    }
  }

  public replaceSprite(): void {
    let pos = this.getStartingPosition();
    // this.sprite.setPosition(pos.x, pos.y);
    this.playAnimation();
    this.sprite.enableBody(true, pos.x, pos.y, true, true);
    this.sprite.setActive(true);
  }

  private getStartingPosition(): Pos {
    let groundY = this.scene.textures.get('ground').getSourceImage().height;
    return {x: window.innerWidth - 100, y: window.innerHeight - groundY};
  }

  private playAnimation(): void {
    this.sprite.anims.play('chillin', true);
  }
 
  private createSprite(): void {
    let pos = this.getStartingPosition();
    this.sprite = this.scene.physics.add.sprite(pos.x, pos.y, SPRITE_KEY);
    this.sprite.setScale(SCALE_X, SCALE_Y);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.on('animationcomplete-splat', () => {
      this.sprite.disableBody(true, true);
      this.scene.physics.resume();
    });

    // adjust physics body for collisions
    this.sprite.body.setSize(this.sprite.width/2, this.sprite.height/2);
    this.sprite.body.setOffset(this.sprite.width/2, this.sprite.height/2);
    this.sprite.setVelocityX(VELOCITY_X * -1);
  }

  private createAnimations(): void {
    this.scene.anims.create({
      key: 'chillin',
      frames: this.scene.anims.generateFrameNumbers(SPRITE_KEY, {start: 0, end: 40}),
      frameRate: 15,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'splat',
      frames: this.scene.anims.generateFrameNumbers(SPRITE_KEY, {start: 41, end: 45}),
      frameRate: 15,
      hideOnComplete: true
    })
  }
};
