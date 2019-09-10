export default class Skyline extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    let image = scene.textures.get('skyline').getSourceImage()
    let y = window.innerHeight - image.height / 2;
    let x = window.innerWidth - image.width / 2;
    super(scene, x, y, 0, 0, 'skyline');
    scene.add.existing(this);
  }

  parallax() {
    this.tilePositionX += 1;
  }
}
