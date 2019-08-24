import * as Phaser from 'phaser';

export const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export const gameConfig = (sceneType) => {
  return {
    title: 'Snack To The Future',
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: {
          y: 0
        }
      },
    },
    input: {
      gamepad: true
    },
    parent: 'game',
    backgroundColor: '#000000',
    scene: sceneType
  };
};
