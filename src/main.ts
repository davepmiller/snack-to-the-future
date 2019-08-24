import * as Phaser from 'phaser';
import {Marty} from './marty';
import {Audio} from './audio';
import {gameConfig, sceneConfig} from './config'

export class GameScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  marty: Marty;
  music: Phaser.Types.Sound.SoundMarker;
  spaceBar: Phaser.Input.Keyboard.Key;
  audio: Audio;

  constructor() {
    super(sceneConfig);
  }
 
  public preload() : void {
    this.audio = new Audio(this.load);
    this.marty = new Marty(this);
  }

  public create() : void {
    this.marty.create();
    this.audio.create(this.sound);
    this.audio.play();
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  public update() : void {
    this.marty.update();
  }
}

export const game = new Phaser.Game(gameConfig(GameScene));
