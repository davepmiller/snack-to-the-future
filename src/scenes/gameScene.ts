import * as Phaser from 'phaser';
import {Marty} from '../marty';
import {Trump} from '../trump';
import {Poop} from '../poop';
import {Audio} from '../audio';

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

  preload(): void {
    this.audio = new Audio(this);
    this.marty = new Marty(this);
    this.trump = new Trump(this);
    this.poop = new Poop(this);
  }

  create(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.marty.create();
    this.trump.create();
    this.poop.create();
    this.physics.add.overlap(this.marty.sprite, this.poop.sprite, this.poopCollision, null, this);
    this.physics.add.overlap(this.trump.sprite, this.poop.sprite, this.poopCollision, null, this);
    var ground = this.physics.add.sprite(0, window.innerHeight, 'ground');
    ground.setCollideWorldBounds(true);
    this.physics.add.collider(ground, this.trump.sprite);
    this.physics.add.collider(ground, this.marty.sprite);
    this.physics.add.collider(ground, this.poop.sprite);
    this.audio.create(this.sound);
    this.audio.play();
  }

  update(): void {
    this.marty.update();
    this.poop.update();
  }

  poopCollision(char: Sprite, poop: Sprite): void {
    this.physics.pause();
    poop.anims.play('splat');
  }
}
