import * as Phaser from 'phaser';

const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;
const VIDEO_PATH = 'assets/video/endScene.mp4';
const FrameCenter = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT / 2
}

export default class EndScene extends Phaser.Scene {
  private movieFrame: Phaser.GameObjects.Image
  private movieTexture: Phaser.Textures.CanvasTexture
  private video: HTMLVideoElement

  constructor() {
    super({
      key: 'EndScene' })
  }

  create(): void {
    this.movieTexture = this.textures.createCanvas(
      'movie', GAME_WIDTH, GAME_HEIGHT);
    this.movieFrame = this.add.image(
      FrameCenter.x, FrameCenter.y, 'movie').setInteractive();
    this.video = document.createElement('video');
    this.video.src = VIDEO_PATH;
    const game = this;
    this.video.addEventListener('loadeddata', function() {
      this.play();
      const fps = 30;
      const loop = () => {
        if (!this.paused && !this.ended) {
          game.movieTexture.context.drawImage(
            this, 0, 0, GAME_WIDTH, GAME_HEIGHT);
          game.movieTexture.refresh();
          setTimeout(loop, 1000/fps);
        }
      }
      loop();
    });

    this.video.addEventListener('ended', () => game.goNextScene());
    this.video.addEventListener('pause', () => game.goNextScene());
    this.movieFrame.on('pointerdown', () => game.video.pause());
    this.input.gamepad.on('down', () => game.video.pause());
    this.input.keyboard.on('keydown-Q', () => game.video.pause());
  }

  goNextScene(): void {
    this.video.pause();
    this.video.remove();
    this.movieTexture.destroy();
    this.scene.start('TitleScene');
  }
}