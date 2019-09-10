import * as Phaser from 'phaser';

type Sprite = Phaser.Physics.Arcade.Sprite;
type AnimationFrame = Phaser.Types.Animations.AnimationFrame;

const SPRITE_NAME = 'gameOver';

export class GameOverScene extends Phaser.Scene {
  sprite: Sprite;

  constructor() {
    super({
      key: 'GameOverScene'
    })
  }

  create(): void {
    const pos = {x: window.innerWidth/2, y: window.innerHeight/2}
    this.sprite = this.physics.add.sprite(pos.x, pos.y, SPRITE_NAME);
    this.anims.create({
      key: SPRITE_NAME,
      frames: this.frames(),
      frameRate: 10,
      repeat: 0
    });
    this.sprite.anims.play(SPRITE_NAME, true).on('animationcomplete-gameOver', () => {
      this.scene.start('TitleScene');
    });
  }

  private frames(): AnimationFrame[] {
    var frames = [];
    for (let i = 0; i < 13; i++) {
      frames.push({key: SPRITE_NAME, frame: i});
      if (i === 12) {
        // repeat the last frame for effect
        for (let j = 0; j < 10; j++) {
          frames.push({key: SPRITE_NAME, frame: i});
        }
      }
    }

    return frames;
  }
}