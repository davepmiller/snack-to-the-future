export default class Skyline extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    let image = scene.textures.get('skyline').getSourceImage()
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pos = {x: width / 2, y: height / 2};
    super(scene, pos.x, pos.y + image.height/4, width, height, 'skyline');
    scene.add.existing(this);
  }

  update() {
    this.tilePositionX += 1;
  }
};
