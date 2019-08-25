import * as Phaser from 'phaser';
import {Marty} from './marty';
import {Trump} from './trump';
import {Audio} from './audio';
import {gameConfig, sceneConfig} from './config'

export class GameScene extends Phaser.Scene {
  audio: Audio;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  marty: Marty;
  trump: Trump;

  constructor() {
    super(sceneConfig);
  }

  public preload() : void {
    this.audio = new Audio(this.load);
    this.marty = new Marty(this);
    this.trump = new Trump(this);
  }

  public create() : void {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.marty.create();
    this.trump.create();
    this.audio.create(this.sound);
    this.audio.play();
  }

  public update() : void {
    this.marty.update();
    this.trump.update();
  }
}

export const game = new Phaser.Game(gameConfig(GameScene));
