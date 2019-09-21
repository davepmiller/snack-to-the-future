import * as Phaser from 'phaser';
import GameData from '../gameData';

export class IntroSceneThree extends Phaser.Scene {
  gameData: GameData;

  constructor () {
    super({
      key: 'IntroSceneThree'
    })
  }

  init(gameData: GameData) {
    this.gameData = gameData;
    const pos = {x: window.innerWidth/2, y: window.innerHeight/2}
    this.add.image(
      pos.x,
      pos.y,
      'introSceneThree'
    ).setScale(0.5);;
  }

  create(): void {
    this.time.delayedCall(
      5000,
      this.nextScene,
      null,
      this
    );
    this.createInputHandling();
  }

  private nextScene(): void {
    this.scene.start('GameScene', this.gameData);
  }

  private createInputHandling(): void {
    this.input.gamepad.on('down', () => this.nextScene());
    this.input.keyboard.on('keydown', () => this.nextScene());
  }
};
