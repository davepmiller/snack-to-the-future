import * as Phaser from 'phaser';
import {Marty} from './marty';
import {Trump} from './trump';
import {Poop} from './poop';
import {Audio} from './audio';

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
type Sprite = Phaser.Physics.Arcade.Sprite;

export class GameScene extends Phaser.Scene {
  audio: Audio;
  cursors: CursorKeys;
  marty: Marty;
  trump: Trump;
  poop: Poop;

  constructor() {
    super({
      key: 'GameScene',
      active: false,
      visible: false
    });
  }

  preload() : void {
    this.audio = new Audio(this);
    this.marty = new Marty(this);
    this.trump = new Trump(this);
    this.poop = new Poop(this);
  }

  create() : void {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.marty.create();
    this.trump.create();
    this.poop.create();
    // var collider = this.physics.add.collider(this.marty.sprite, this.poop.sprite);
    // collider.active = false;
    // this.physics.add.collider(this.marty.sprite, this.poop.sprite, this.playerPoopCollision, null, this);
    this.physics.add.overlap(this.marty.sprite, this.poop.sprite, this.playerPoopCollision, null, this);
    this.audio.create(this.sound);
    this.audio.play();
  }

  update() : void {
    this.marty.sprite.setVelocityX(1000);
  }

  playerPoopCollision(marty: Sprite, poop: Sprite) {
    this.physics.pause();
    poop.anims.play('splat');
  }
}
