import * as Phaser from 'phaser';
import {GameScene} from './scene/gameScene';

type BaseSoundManager = Phaser.Sound.BaseSoundManager;

export class Audio {
  music: Phaser.Sound.BaseSound;
  
  constructor (scene: GameScene) {
    scene.load.audio(
      'power_of_love', [
        'assets/audio/power_of_love.mp3',
        'assets/audio/power_of_love.ogg'
      ]
    )
  }

  public create(soundManager: BaseSoundManager) : void {
    this.music = soundManager.add('power_of_love', {loop: true});
  }

  public play() : void {
    this.music.play();
  }

  public stop() : void {
    this.music.stop();
  }
}
