import * as Phaser from 'phaser';
import GameData from '../gameData';

export class IntroSceneOne extends Phaser.Scene {
  gameData: GameData;

  constructor () {
    super({
      key: 'IntroSceneOne'
    })
    // const pos = {x: window.innerWidth/2, y: window.innerHeight/2}
    // this.add.image(
    //   pos.x,
    //   pos.y,
    //   'introSceneOne'
    // );
  }

  init(gameData: GameData) {
    this.gameData = gameData;
    const pos = {x: window.innerWidth/2, y: window.innerHeight/2}
    this.add.image(
      pos.x,
      pos.y,
      'introSceneOne',
    ).setScale(0.5);
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

  nextScene(): void {
    this.scene.start('IntroSceneTwo', this.gameData);
  }

  private createInputHandling(): void {
    this.input.gamepad.on('down', () => this.nextScene());
    this.input.keyboard.on('keydown', () => this.nextScene());
  }
};
