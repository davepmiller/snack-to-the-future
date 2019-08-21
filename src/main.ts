import * as Phaser from 'phaser';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  marty: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super(sceneConfig);
  }
 
  public preload() : void {
    this.load.spritesheet(
        'marty',
        'assets/sprites/MartyPushCycle.png',
        {frameWidth: 710, frameHeight: 820}
    )
  }

  public create() : void {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.marty = this.physics.add.sprite(window.innerWidth/2, window.innerHeight-100, 'marty', 0);
    this.marty.scaleX = 0.25;
    this.marty.scaleY = 0.25;
    this.marty.setBounce(0.2);
    this.marty.setCollideWorldBounds(true);
    this.anims.create({
        key: 'coast',
        frames: this.anims.generateFrameNumbers('marty', {start: 0, end: 0}),
        frameRate: 30
    });
    this.anims.create({
      key: 'push',
      // frames: this.anims.generateFrameNumbers('marty', { start: 0, end: 21 }),
      frames: [
        // {key: 'marty', frame: 0},
        // {key: 'marty', frame: 1},
        // {key: 'marty', frame: 2},
        // {key: 'marty', frame: 3},
        // {key: 'marty', frame: 4},
        // {key: 'marty', frame: 5},
        {key: 'marty', frame: 6},
        {key: 'marty', frame: 7},
        {key: 'marty', frame: 8},
        // {key: 'marty', frame: 9},
        {key: 'marty', frame: 10},
        {key: 'marty', frame: 11},
        {key: 'marty', frame: 12},
        {key: 'marty', frame: 13},
        // {key: 'marty', frame: 14},
        // {key: 'marty', frame: 15},
        // {key: 'marty', frame: 16},
        // {key: 'marty', frame: 17},
        // {key: 'marty', frame: 18},
        {key: 'marty', frame: 19},
        // {key: 'marty', frame: 20},
        // {key: 'marty', frame: 21},
      ],
      frameRate: 15
    });
  }
 
  public update() : void {
    if (this.cursors.right.isDown) {
      this.marty.setVelocity(240, 0);
      this.marty.anims.play('push', true);
    } else if (this.cursors.left.isDown) {
        this.marty.setVelocity(-240, 0);
    } else {
        this.marty.setVelocity(0, 0);
        this.marty.anims.play('coast', true);
    }
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Snack To The Future',
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0
      }
    },
  },
  parent: 'game',
  backgroundColor: '#000000',
  scene: GameScene,
};
 
export const game = new Phaser.Game(gameConfig);
