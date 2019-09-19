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
import GameData from '../gameData';

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
type Sprite = Phaser.Physics.Arcade.Sprite;
type Ground = Phaser.Physics.Arcade.StaticGroup;

export class GameScene extends Phaser.Scene {
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
  gameData: GameData;

  constructor() {
    super({
      key: 'GameScene',
      active: false,
      visible: false
    });
  }
  
  init(gameData: GameData): void {
    this.gameData = gameData;
  }

  preload(): void {
    this.createBackground();
    this.createInputHandling();
    this.createComponents();
    this.createColliders();
  }
  
  create(): void {
    this.registry.set('hatDoThrow', false);
    this.registry.set('trumpDoThrow', false);
  }

  update(): void {
    if (this.healthStatus.martyDead()) {
      this.scene.start('GameOverScene');
    } else if (this.healthStatus.trumpDead()) {
      // this.audio.stopTheme();
      this.scene.start('EndScene');
    }

    this.skyline.update();
    this.midground.update();
    this.poop.update();
    this.trump.update();
    this.hat.update();
    if (!this.poop.active) {
      this.poop.replaceSprite();
    }
  }

  render(): void {
    console.log('render');
  }

  poopCollision(char: Sprite, poop: Sprite): boolean {
    if (this.poop.fresh) {
      this.poop.fresh = false;
      if (char.name === 'trump') {
        this.healthStatus.trumpHit();
        this.registry.set('trumpDoThrow', true);
      } else if (char.name === 'marty') {
        this.gameData.health--;
        if (this.gameData.health > 0) {
          this.scene.start('GameScene', this.gameData);
        }
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
          this.gameData.health--;
          if (this.gameData.health > 0) {
            this.scene.start('GameScene', this.gameData);
          }
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
    this.createGround();
  }

  private createColliders(): void {
    this.physics.add.overlap(this.marty, this.poop, null, this.poopCollision, this);
    this.physics.add.overlap(this.trump, this.poop, null, this.poopCollision, this);
    this.physics.add.overlap(this.trump, this.hat, null, this.hatCollision, this);
    this.physics.add.overlap(this.marty, this.hat, null, this.hatCollision, this)
    this.physics.add.overlap(this.marty, this.hat, null, this.hatCollision, this);
  }

  private createGround(): void {
    let groundHeight = this.textures.get('ground').getSourceImage().height/2;
    let y = window.innerHeight - groundHeight;
    this.physics.world.setBounds(0,0,window.innerWidth,y,true,true,false,true);
    this.ground = this.physics.add.staticGroup();
    this.ground.create(window.innerWidth / 2, y, 'ground').refreshBody();
  }

  private createComponents(): void {
    this.trump = new Trump(this);
    this.hat = new Hat(this);
    this.marty = new Marty(this);
    this.poop = new Poop(this);
  }

  private createInputHandling(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.shift.onDown = () => this.scene.pause();
  }
};
