import * as Phaser from 'phaser';
import Marty from '../component/marty';
import Trump from '../component/trump';
import Poop from '../component/poop';
import Audio from '../audio';
import Hat from '../component/hat';
import Midground from '../component/midground';
import Background from '../component/background';
import Skyline from '../component/skyline';
import HealthStatus from '../component/healthStatus';

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
type Sprite = Phaser.Physics.Arcade.Sprite;
type Ground = Phaser.Physics.Arcade.StaticGroup;

export class GameScene extends Phaser.Scene {
  audio: Audio;
  cursors: CursorKeys;
  marty: Marty;
  trump: Trump;
  poop: Poop;
  hat: Hat;
  ground: Ground;
  background: Background;
  skyline: Skyline;
  midground: Midground;
  healthStatus: HealthStatus;

  constructor() {
    super({
      key: 'GameScene',
      active: false,
      visible: false
    });
  }
  
  preload(): void {
    this.audio = new Audio(this);
    this.createBackground();
    let groundHeight = this.textures.get('ground').getSourceImage().height/2;
    let y = window.innerHeight - groundHeight;
    this.physics.world.setBounds(0,0,window.innerWidth,y,true,true,false,true);
    this.ground = this.physics.add.staticGroup();
    this.ground.create(window.innerWidth / 2, y, 'ground').refreshBody();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.trump = new Trump(this);
    this.hat = new Hat(this);
    this.marty = new Marty(this);
    this.poop = new Poop(this);
    this.createColliders();
  }

  create(): void {
    this.registry.set('hatDoThrow', false);
    this.registry.set('trumpDoThrow', false);
    this.createAudio();
  }

  update(): void {
    this.skyline.update();
    this.midground.update();
    this.poop.update();
    this.trump.update();
    this.hat.update();
    if (!this.poop.active) {
      this.poop.replaceSprite();
    }

    if (this.healthStatus.martyDead()) {
      this.audio.stopTheme();
      this.scene.stop('GameScene');
      this.scene.start('GameOverScene');
    } else if (this.healthStatus.trumpDead()) {
      // end scene
    }
  }

  poopCollision(char: Sprite, poop: Sprite): boolean {
    if (this.poop.fresh) {
      this.poop.fresh = false;
      if (char.name === 'trump') {
        this.healthStatus.trumpHit();
        // this.trump.doThrow = true;
        this.registry.set('trumpDoThrow', true);
      } else if (char.name === 'marty') {
        this.healthStatus.martyHit();
      }
    }

    poop.anims.play('splat', true)
      .on('animationcomplete-splat', () => this.poop.handleCollision());

    return false;
  }

  hatCollision(char: Sprite, hat: Sprite): boolean {
    if (this.hat.hasHit === false) {
      if (char.name === 'marty') {
        if (hat.x >= char.x) {
          this.hat.reset();
          this.hat.hasHit = true;
          this.healthStatus.martyHit();
        }
      }
    }

    return false;
  }

  private createBackground(): void {
    this.cameras.main.roundPixels = true;
    this.background = new Background(this);
    this.skyline = new Skyline(this);
    this.midground = new Midground(this);
    this.healthStatus = new HealthStatus(this);
  }

  private createColliders(): void {
    this.physics.add.overlap(this.marty, this.poop, null, this.poopCollision, this);
    this.physics.add.overlap(this.trump, this.poop, null, this.poopCollision, this);
    this.physics.add.overlap(this.trump, this.hat, null, this.hatCollision, this);
    this.physics.add.overlap(this.marty, this.hat, null, this.hatCollision, this)
    this.physics.add.overlap(this.marty, this.hat, null, this.hatCollision, this);
  }

  private createAudio(): void {
    this.audio.create(this.sound);
    this.audio.playTheme();
  }
}
