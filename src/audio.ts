import * as Phaser from 'phaser';

export class Audio {
  music: Phaser.Sound.BaseSound;
  
  constructor (pluginLoader: Phaser.Loader.LoaderPlugin) {
    pluginLoader.audio(
      'power_of_love', [
        'assets/audio/power_of_love.mp3',
        'assets/audio/power_of_love.ogg'
      ]
    )
  }

  public create(soundManager: Phaser.Sound.BaseSoundManager) : void {
    this.music = soundManager.add('power_of_love', {loop: true});
  }

  public play() : void {
    this.music.play;
  }
}
