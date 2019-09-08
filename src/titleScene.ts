import * as Phaser from 'phaser';

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
type Gamepad = Phaser.Input.Gamepad.Gamepad;
type Button = Phaser.Input.Gamepad.Button;

export class TitleScene extends Phaser.Scene {
  image: Phaser.GameObjects.Image;
  cursors: CursorKeys;
  start: boolean;

  constructor () {
    super({
      key: "TitleScene"
    });
  }

  create(): void {
    this.start = false;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.image = this.add.image(0, 0, "startScreen");
    this.image.setOrigin(0, 0);
    this.image.setDisplaySize(window.innerWidth, window.innerHeight);
    this.input.gamepad.on(
      'down',
      (pad: Gamepad, button: Button, value: number) => {
        if (pad.A) {
          this.start = true;
        }
      }
    );
  }

  update(): void {
    if (this.start) {
      this.scene.start('GameScene');
    }
  }
}