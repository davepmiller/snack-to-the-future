export default class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    super(scene, window.innerWidth/2, window.innerHeight/2, 0, 0, 'background');
    scene.add.existing(this);
    this.setDepth(-1);;
  }
};
