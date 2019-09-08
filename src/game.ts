import 'phaser';
import {BootScene} from './bootScene';
import {TitleScene} from './titleScene';
import {GameScene} from './gameScene';

type GameConfig = Phaser.Types.Core.GameConfig;

export const config: GameConfig = {
  title: 'Snack To The Future',
  url: '',
  version: "1.0",
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        // y: 475
      },
      debug: true
    },
  },
  input: {
    gamepad: true
  },
  backgroundColor: '#000000',
  scene: [BootScene, TitleScene, GameScene]
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  var game = new Game(config);
});
