import * as Phaser from 'phaser';
import {GameScene} from './scenes/gameScene';

type Sprite = Phaser.Physics.Arcade.Sprite;

const SCALE_X = 0.25;
const SCALE_Y = 0.25;
const SPRITE_NAME = 'poop';

export class Poop {
  sprite: Sprite;
  scene: GameScene;
  sprites: Phaser.Physics.Arcade.Group;

  constructor(scene: GameScene) {
    this.scene = scene;
  }

  public create() : void {
    this.createSprite();
    this.createAnimations();
    this.playAnimation();
  }

  private playAnimation(): void {
    this.sprite.anims.play('chillin', true);
  }
 
  private createSprite() : void {
    const pos = {x: window.innerWidth - 100, y: window.innerHeight}
    this.sprite = this.scene.physics.add.sprite(pos.x, pos.y, SPRITE_NAME);
    // adjust physics body for collisions
    this.sprite.body.setOffset(this.sprite.width/2, 0);
    this.sprite.setScale(SCALE_X, SCALE_Y);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.on('animationcomplete-splat', () => {
      this.sprite.disableBody(true, true);
      this.sprite.destroy();
      this.scene.physics.resume();
    });
  }

  private createAnimations() : void {
    this.scene.anims.create({
      key: 'chillin',
      frames: this.scene.anims.generateFrameNumbers(SPRITE_NAME, {start: 0, end: 40}),
      frameRate: 15,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'splat',
      frames: this.scene.anims.generateFrameNumbers(SPRITE_NAME, {start: 41, end: 45}),
      frameRate: 30,
      hideOnComplete: true
    })
  }
};
