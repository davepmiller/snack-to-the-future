import * as Phaser from 'phaser';

type BaseSound = Phaser.Sound.BaseSound;

export default class Audio {
  private scene: Phaser.Scene;
  private theme: BaseSound;
  
  constructor (scene: Phaser.Scene) {
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

  public destroyTheme(): void {
    this.theme.destroy();
  }

  public themeIsPlaying(): boolean {
    return this.theme.isPlaying;
  }

  public themeIsCreated(): boolean {
    return this.theme !== null && this.theme !== undefined;
  }
};
