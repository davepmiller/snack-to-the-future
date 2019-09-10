import * as Phaser from 'phaser';

const PROGRESS_BAR_COLOR = 0x565656;

export class BootScene extends Phaser.Scene {
  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;

  constructor () {
    super({
      key: 'BootScene'
    })
  }

  preload(): void {
    this.cameras.main.setBackgroundColor(0x000000);
    this.createLoadingGraphics();
    this.load.on(
      "progress",
      (value) => {
        this.progressBar.clear();
        this.progressBar.fillStyle(PROGRESS_BAR_COLOR, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value / 2,
          16
        );
      },
      this
    );

    this.load.on(
      "complete",
      () => {
        console.log('Done loading assets');
        this.progressBar.destroy();
        this.loadingBar.destroy();
      },
      this
    );

    this.load.pack(
      "preload",
      "./../assets/pack.json",
      "preload"
    );
  }

  update(): void {
    this.scene.start('TitleScene');
  }

  private createLoadingGraphics(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0xffffff, 1);
    this.loadingBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
}