import * as Phaser from 'phaser';
import {GameScene} from './scene/gameScene';

type BaseSoundManager = Phaser.Sound.BaseSoundManager;

export default class Audio {
  theme: Phaser.Sound.BaseSound;
  
  constructor (scene: GameScene) {
    scene.load.audio(
      'power_of_love', [
        'assets/audio/power_of_love.mp3',
        'assets/audio/power_of_love.ogg'
      ]
    )
  }

  public create(soundManager: BaseSoundManager): void {
    this.theme = soundManager.add('power_of_love', {loop: true});
  }

  public playTheme(): void {
    this.theme.play();
  }

  public stopTheme(): void {
    this.theme.stop();
  }
};
