import 'phaser';
import {BootScene} from './scene/bootScene';
import {TitleScene} from './scene/titleScene';
import {GameScene} from './scene/gameScene';
import {GameOverScene} from './scene/gameOverScene';
import EndScene from './scene/endScene';

type GameConfig = Phaser.Types.Core.GameConfig;

export const config: GameConfig = {
  title: 'Snack To The Future',
  url: 'https://www.pettysnacks.com/',
  version: "1.0",
  type: Phaser.WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true
    },
  },
  input: {
    gamepad: true
  },
  backgroundColor: '#000000',
  scene: [BootScene, TitleScene, GameScene, GameOverScene, EndScene],
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  var game = new Game(config);
});
