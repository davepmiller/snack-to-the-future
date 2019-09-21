import * as Phaser from 'phaser';
import GameData from '../gameData';

export class IntroSceneTwo extends Phaser.Scene {
  gameData: GameData;

  constructor () {
    super({
      key: 'IntroSceneTwo'
    })
    // const pos = {x: window.innerWidth/2, y: window.innerHeight/2}
    // this.add.image(
    //   pos.x,
    //   pos.y,
    //   'introSceneTwo'
    // );
  }

  init(gameData: GameData) {
    this.gameData = gameData;
    const pos = {x: window.innerWidth/2, y: window.innerHeight/2}
    this.add.image(
      pos.x,
      pos.y,
      'introSceneTwo'
    ).setScale(0.5);;
  }

  preload(): void {
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
    this.scene.start('IntroSceneThree', this.gameData);
  }

  private createInputHandling(): void {
    this.input.gamepad.on('down', () => this.nextScene());
    this.input.keyboard.on('keydown', () => this.nextScene());
  }
};
