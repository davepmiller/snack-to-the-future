import * as Phaser from 'phaser';
import {Marty} from '../marty';
import {Trump} from '../trump';
import {Poop} from '../poop';
import {Audio} from '../audio';
import Midground from '../component/midground';
import Background from '../component/background';
import Skyline from '../component/skyline';
// import Ground from '../component/ground';

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
type Sprite = Phaser.Physics.Arcade.Sprite;
type Ground = Phaser.Physics.Arcade.StaticGroup;

export class GameScene extends Phaser.Scene {
  audio: Audio;
  cursors: CursorKeys;
  marty: Marty;
  trump: Trump;
  poop: Poop;
  ground: Ground;
  background: Background;
  skyline: Skyline;
  midground: Midground;

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
    // this.ground = new Ground(this);
  }
  
  create(): void {
    this.cameras.main.roundPixels = true;
    this.background = new Background(this);
    this.skyline = new Skyline(this);
    this.midground = new Midground(this);
    let y = window.innerHeight - this.textures.get('ground').getSourceImage().height/2;
    // super(scene, window.innerWidth / 2, y, 0, 0, 'ground');
    this.ground = this.physics.add.staticGroup();//(window.innerWidth / 2, y, 'ground').setImmovable(true);//.refreshBody();
    this.ground.create(window.innerWidth / 2, y, 'ground').refreshBody();
    // this.ground = new Ground(this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.marty.create();
    this.trump.create();
    this.poop.create();
    this.physics.add.collider(this.marty.sprite, this.ground);
    this.physics.add.collider(this.trump.sprite, this.ground);
    this.physics.add.collider(this.poop.sprite, this.ground);
    this.physics.add.overlap(this.marty.sprite, this.poop.sprite, this.poopCollision, null, this);
    this.physics.add.overlap(this.trump.sprite, this.poop.sprite, this.poopCollision, null, this);
    this.audio.create(this.sound);
    this.audio.play();
  }

  update(): void {
    this.skyline.parallax();
    this.midground.parallax();
    this.marty.update();
    this.poop.update();
  }

  poopCollision(char: Sprite, poop: Sprite): void {
    this.physics.pause();
    poop.anims.play('splat');
  }
}
