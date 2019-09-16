export default class Midground extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    let midGround = scene.textures.get('midground');
    let halfHeight = midGround.getSourceImage().height/2;
    let y = window.innerHeight - halfHeight;
    super(scene, 0, y, 0, 0, 'midground');
    scene.add.existing(this);
  }

  update() {
    this.tilePositionX += 5;
  }
}
