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
type GameObject = Phaser.GameObjects.GameObject;

const MARTY_HEALTH = 3;
const TRUMP_HEALTH = 5;

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
    this.marty = new Marty(this);
    this.trump = new Trump(this);
    this.poop = new Poop(this);
    // this.hat = new Hat(this);
  }
  
  create(): void {
    this.registry.set('health', {trump: TRUMP_HEALTH, marty: MARTY_HEALTH});
    this.createBackground();
    this.createGameObjects();
    this.createColliders();
    this.audio.create(this.sound);
    this.audio.playTheme();
  }

  update(): void {
    this.skyline.parallax();
    this.midground.parallax();
    this.marty.update();
    this.poop.update();
    this.trump.update();
    // this.hat.update();
    if (!this.poop.sprite.active) {
      this.poop.replaceSprite();
    }

    let health = this.registry.get('health');
    if (health.marty <= 0) {
      this.audio.stopTheme();
      this.scene.start('GameOverScene');
    } else if (health.trump <= 0) {
      this.audio.stopTheme();
      this.scene.start('GameOverScene');
    }
  }

  poopCollision(char: Sprite, poop: Sprite): void {
    let health = this.registry.get('health');
    if (char.name === Trump.getSpriteName()) {
      health.trump--;
      this.events.emit('TRUMP_HIT');
    } else if (char.name === Marty.getSpriteName()) {
      health.marty--;
      this.events.emit('MARTY_HIT');
    }
    this.registry.set('health', health);
    this.physics.pause();
    poop.anims.play('splat');
  }

  hatCollision(char: Sprite, hat: Sprite): void {
    // hat.disableBody();
    console.log('HAT COLLISION');
    this.physics.pause();
  }

  groundCollision(char: GameObject, ground: GameObject): void {
    let mBody = char.body as Phaser.Physics.Arcade.Body;
    let gBody = ground.body as Phaser.Physics.Arcade.Body;
    if (mBody.bottom > gBody.top) {
      mBody.y -= (mBody.bottom - gBody.top);
    }
  }

  private createBackground(): void {
    this.cameras.main.roundPixels = true;
    this.background = new Background(this);
    this.healthStatus = new HealthStatus(this);
    this.skyline = new Skyline(this);
    this.midground = new Midground(this);
    
  }

  private createGameObjects(): void {
    let groundHeight = this.textures.get('ground').getSourceImage().height/2;
    let y = window.innerHeight - groundHeight;
    this.ground = this.physics.add.staticGroup();
    this.ground.create(window.innerWidth / 2, y, 'ground').refreshBody();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.marty.create();
    this.trump.create();
    this.poop.create();
    // this.hat.create();
  }

  private createColliders(): void {
    this.physics.add.collider(this.marty.sprite, this.ground, this.groundCollision);
    this.physics.add.collider(this.trump.sprite, this.ground, this.groundCollision);
    this.physics.add.collider(this.poop.sprite, this.ground, this.groundCollision);
    this.physics.add.overlap(this.marty.sprite, this.poop.sprite, this.poopCollision, null, this);
    this.physics.add.overlap(this.trump.sprite, this.poop.sprite, this.poopCollision, null, this);
    // this.physics.add.overlap(this.trump.sprite, this.hat.sprite, this.hatCollision, null, this);
    this.physics.add.overlap(this.marty.sprite, this.trump.hat, this.hatCollision, null, this);
  }
}
