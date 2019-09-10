export default class Midground extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    let y = window.innerHeight - scene.textures.get('midground').getSourceImage().height/2;
    super(scene, 0, y, 0, 0, 'midground');
    scene.add.existing(this);
  }

  parallax() {
    this.tilePositionX += 5;
  }
}
