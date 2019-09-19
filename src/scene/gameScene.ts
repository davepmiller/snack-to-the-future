import * as Phaser from 'phaser';
import Marty from '../component/marty';
import Trump from '../component/trump';
import Poop from '../component/poop';
import Hat from '../component/hat';
import Midground from '../component/midground';
import Background from '../component/background';
import Skyline from '../component/skyline';
import HealthStatus from '../component/healthStatus';
import Coin from '../component/coin';
import GameData from '../gameData';

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
type Sprite = Phaser.Physics.Arcade.Sprite;
type Ground = Phaser.Physics.Arcade.StaticGroup;
// type Group = Phaser.GameObjects.Group;

export class GameScene extends Phaser.Scene {
  cursors: CursorKeys;
  marty: Marty;
  trump: Trump;
  poop: Poop;
  hatOne: Hat;
  hatTwo: Hat;
  ground: Ground;
  background: Background;
  skyline: Skyline;
  midground: Midground;
  healthStatus: HealthStatus;
  gameData: GameData;
  // coins: Group;
  coin: Coin;

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
    this.registry.set('hatOneDoThrow', false);
    this.registry.set('hatTwoDoThrow', false);
    this.registry.set('trumpDoThrowOne', false);
    this.registry.set('trumpDoThrowTwo', false);
    // this.coins = this.add.group({
    //   classType: Coin,
    //   maxSize: 10,
    //   runChildUpdate: true
    // });
    this.coin = new Coin(this);
    this.physics.add.overlap(
      this.marty,
      this.coin,
      (marty: Marty, coin: Coin) => {
        this.coin.collect();
        console.log("HERE");
      },
      null,
      this
    );
    // let groundY = this.textures.get('ground').getSourceImage().height;
    // let pos = {x: window.innerWidth / 2.5, y: window.innerHeight - groundY};
    // this.coins.create(pos.x, pos.y, null, null, true, true);
  }

  update(): void {
    if (this.healthStatus.martyDead()) {
      this.scene.start('GameOverScene');
    } else if (this.healthStatus.trumpDead()) {
      this.scene.start('EndScene');
    }

    this.skyline.update();
    this.midground.update();
    this.poop.update();
    this.trump.update();
    this.hatOne.update();
    this.hatTwo.update();
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
        if (this.healthStatus.trumpHealth() % 2 === 1) {
          this.registry.set('trumpDoThrowOne', true);
        }
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
    this.checkHat(this.hatOne, char);
    this.checkHat(this.hatTwo, char);

    return false;
  }

  private checkHat(hat: Hat, char: Sprite): void {
    if (hat.hasHit === false) {
      if (char.name === 'marty') {
        if (hat.x >= char.x) {
          hat.reset();
          hat.hasHit = true;
          this.gameData.health--;
          if (this.gameData.health > 0) {
            this.scene.start('GameScene', this.gameData);
          }
        }
      }
    }
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
    this.physics.add.overlap(this.trump, this.hatOne, null, this.hatCollision, this);
    this.physics.add.overlap(this.trump, this.hatTwo, null, this.hatCollision, this);
    this.physics.add.overlap(this.marty, this.hatOne, null, this.hatCollision, this)
    this.physics.add.overlap(this.marty, this.hatTwo, null, this.hatCollision, this);

  }

  private createGround(): void {
    let texture = this.textures.get('ground').getSourceImage();
    let groundHeight = texture.height/2;
    let y = window.innerHeight - groundHeight;
    this.physics.world.setBounds(0,0,window.innerWidth,y,true,true,false,true);
    this.ground = this.physics.add.staticGroup();
    this.ground.create(0, y, 'ground').refreshBody();
    this.ground.create(0 - texture.width, y, 'ground');
    this.ground.create(texture.width, y, 'ground');
    this.ground.create(texture.width * 2, y, 'ground');
  }

  private createComponents(): void {
    this.trump = new Trump(this);
    this.hatOne = new Hat(this, 'hatOne');
    this.hatTwo = new Hat(this, 'hatTwo');
    this.marty = new Marty(this);
    this.poop = new Poop(this);
  }

  private createInputHandling(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.shift.onDown = () => this.scene.pause();
  }
};
