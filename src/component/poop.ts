import * as Phaser from 'phaser';
import {GameScene} from '../scene/gameScene';

const SPRITE_KEY = 'poop';
const VELOCITY_X = 450 * -1;

interface Pos {
  x: number,
  y: number
}

export default class Poop extends Phaser.Physics.Arcade.Sprite {
  gameScene: GameScene;
  fresh: boolean;

  constructor(scene: GameScene) {
    let groundY = scene.textures.get('ground').getSourceImage().height;
    let pos = {x: window.innerWidth - 100, y: window.innerHeight - groundY};
    super(scene, pos.x, pos.y, SPRITE_KEY);
    this.gameScene = scene;
    this.fresh = true;
    this.gameScene.physics.world.enable(this);
    // adjust physics body for collisions
    this.body.setSize(this.width/2, this.height/2)
      .setOffset(this.width/2, this.height/2);
    this.gameScene.add.existing(this);
    this.setCollideWorldBounds(true);
    this.createAnimations();
    this.playAnimation();
  }

  public update(): void {
    if (this.active) {
      this.setVelocityX(VELOCITY_X);
    }
  }

  public replaceSprite(): void {
    this.playAnimation();
    let pos = Poop.getStartingPosition(this.gameScene);
    this.enableBody(true, pos.x, pos.y, true, true);
    this.fresh = true;
  }

  public handleCollision(): void {
    this.disableBody(true, true);
  }

  private static getStartingPosition(scene: GameScene): Pos {
    let groundY = scene.textures.get('ground').getSourceImage().height;
    return {x: window.innerWidth - 100, y: window.innerHeight - groundY};
  }

  private playAnimation(): void {
    this.anims.play('chillin', true);
  }
 
  private createAnimations(): void {
    this.gameScene.anims.create({
      key: 'chillin',
      frames: this.gameScene.anims.generateFrameNumbers(SPRITE_KEY, {start: 0, end: 40}),
      frameRate: 15,
      repeat: -1,
    });
    this.gameScene.anims.create({
      key: 'splat',
      frames: this.gameScene.anims.generateFrameNumbers(SPRITE_KEY, {start: 41, end: 45}),
      frameRate: 15,
      hideOnComplete: true
    })
  }
};
