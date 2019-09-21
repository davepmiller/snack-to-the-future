import * as Phaser from 'phaser';
import GameData from '../gameData';

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
type Image = Phaser.GameObjects.Image;

const PRESS_FLASH_FREQ = 30;

export class TitleScene extends Phaser.Scene {
  mainImage: Image;
  pressButtonImage: Image;
  cursors: CursorKeys;
  start: boolean;
  visCnt: number;
  gameData: GameData;

  constructor () {
    super({
      key: 'TitleScene'
    });
  }

  init(gameData: GameData) {
    if (gameData.maxHealth == null) {
      this.gameData = {
        maxHealth: 3,
        initialScore: 69420,
        health: 3,
        score: 69420,
        highScore: 69420
      };
    } else {
      this.gameData = gameData;
    }
  }

  preload(): void {
    this.game.sound.stopAll();
  }

  create(): void {
    this.visCnt = 0;
    this.createImages();
    this.createInput();
    this.sound.play('powerOfLove', {loop: true});
  }

  update(): void {
    if (this.start === true) {
      this.scene.start('IntroSceneOne', this.gameData);
    }

    this.toggleVisibility();
  }

  private createImages(): void {
    this.mainImage = this.add.image(0, 0, 'startScreen');
    this.mainImage.setOrigin(0, 0);
    this.mainImage.setDisplaySize(window.innerWidth, window.innerHeight);
    this.pressButtonImage = this.add.image(0, 0, 'pressToBegin');
    let pbiX = this.pressButtonImage.width / 6;
    let pbiY = window.innerHeight / 2 + 210;
    this.pressButtonImage.setPosition(pbiX, pbiY);
    this.pressButtonImage.setOrigin(0, 0);
  }

  private createInput(): void {
    this.start = false;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.gamepad.on(
      'down',
      () => this.start = true
    );
    this.cursors.down.onDown = (e) => {
      this.start = true;
    };
  }

  private toggleVisibility(): void {
    if (this.visCnt++ >= PRESS_FLASH_FREQ) {
      this.visCnt = 0;
      this.pressButtonImage.visible = !this.pressButtonImage.visible;
    }
  }
};
