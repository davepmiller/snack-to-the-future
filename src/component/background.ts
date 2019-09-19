export default class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pos = {x: width / 2, y: height / 2};
    let key = 'background';
    super(scene, pos.x, pos.y, width, height, key);
    scene.add.existing(this);
    this.setDepth(-1);;
  }
};
