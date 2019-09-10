export default class Ground extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    let y = window.innerHeight - scene.textures.get('ground').getSourceImage().height/2;
    super(scene, window.innerWidth / 2, y, 0, 0, 'ground');
    scene.add.existing(this);
    scene.physics.add.existing(this, true);
    this.setDepth(1);
  }
}
