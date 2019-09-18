import * as Phaser from 'phaser';
import {GameScene} from './scene/gameScene';

type BaseSoundManager = Phaser.Sound.BaseSoundManager;
type BaseSound = Phaser.Sound.BaseSound;

export default class Audio {
  private scene: GameScene;
  private theme: BaseSound;
  
  constructor (scene: GameScene) {
    this.scene = scene;
    this.scene.load.audio(
      'power_of_love', [
        'assets/audio/power_of_love.mp3',
        'assets/audio/power_of_love.ogg'
      ]
    )
  }

  public create(): void {
    this.theme = this.scene.sound.add('power_of_love', {loop: true});
  }

  public playTheme(): void {
    this.theme.play();
  }

  public stopTheme(): void {
    this.theme.stop();
  }

  public themeIsPlaying(): boolean {
    return this.theme.isPlaying;
  }

  public themeIsCreated(): boolean {
    return this.theme !== null && this.theme !== undefined;
  }
};
