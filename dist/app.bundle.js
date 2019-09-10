/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/game.ts","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/audio.ts":
/*!**********************!*\
  !*** ./src/audio.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Audio = /** @class */ (function () {
    function Audio(scene) {
        scene.load.audio('power_of_love', [
            'assets/audio/power_of_love.mp3',
            'assets/audio/power_of_love.ogg'
        ]);
    }
    Audio.prototype.create = function (soundManager) {
        this.music = soundManager.add('power_of_love', { loop: true });
    };
    Audio.prototype.play = function () {
        this.music.play();
    };
    return Audio;
}());
exports.Audio = Audio;


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! phaser */ "./node_modules/phaser/src/phaser.js");
var bootScene_1 = __webpack_require__(/*! ./scene/bootScene */ "./src/scene/bootScene.ts");
var titleScene_1 = __webpack_require__(/*! ./scene/titleScene */ "./src/scene/titleScene.ts");
var gameScene_1 = __webpack_require__(/*! ./scene/gameScene */ "./src/scene/gameScene.ts");
var gameOverScene_1 = __webpack_require__(/*! ./scene/gameOverScene */ "./src/scene/gameOverScene.ts");
exports.config = {
    title: 'Snack To The Future',
    url: '',
    version: "1.0",
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
            // y: 800
            },
            debug: true
        },
    },
    input: {
        gamepad: true
    },
    backgroundColor: '#000000',
    scene: [bootScene_1.BootScene, titleScene_1.TitleScene, gameScene_1.GameScene, gameOverScene_1.GameOverScene]
};
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(config) {
        return _super.call(this, config) || this;
    }
    return Game;
}(Phaser.Game));
exports.Game = Game;
window.addEventListener('load', function () {
    var game = new Game(exports.config);
});


/***/ }),

/***/ "./src/marty.ts":
/*!**********************!*\
  !*** ./src/marty.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SCALE_X = 0.25;
var SCALE_Y = 0.25;
var SPRITE_NAME = 'marty';
var FRAME_RATE = 15;
var Marty = /** @class */ (function () {
    function Marty(scene) {
        this.scene = scene;
    }
    Marty.prototype.create = function () {
        this.createSprite();
        this.createAnimations();
        this.createAnimationCallbacks();
        this.createInputHandling();
        this.cruise();
    };
    Marty.prototype.update = function () {
        if (this.sprite.body.touching.down) {
            this.cruise();
        }
    };
    Marty.prototype.cruise = function () {
        this.sprite.anims.play('cruise', true);
    };
    Marty.prototype.ollie = function () {
        this.sprite.anims.play('ollie', true);
    };
    Marty.prototype.thread = function () {
        this.sprite.anims.play('thread', true);
    };
    Marty.prototype.createInputHandling = function () {
        var _this = this;
        this.scene.input.gamepad.on('down', function (pad, button, value) {
            if (pad.A) {
                _this.ollie();
            }
            else if (pad.B) {
                _this.thread();
            }
        });
        this.scene.cursors.space.onDown = function (e) {
            _this.ollie();
        };
        this.scene.cursors.up.onDown = function (e) {
            _this.thread();
        };
    };
    Marty.prototype.createSprite = function () {
        var pos = { x: window.innerWidth / 2.5, y: window.innerHeight };
        this.sprite = this.scene.physics.add.sprite(pos.x, pos.y, SPRITE_NAME);
        this.sprite.setScale(SCALE_X, SCALE_Y);
        this.sprite.setCollideWorldBounds(true);
        this.offsetJumpY = -this.sprite.height * 2;
        this.offsetY = this.sprite.height / 2;
        this.offsetX = this.sprite.width / 10;
        this.sprite.body.setSize(this.sprite.width / 2, this.offsetY);
        this.sprite.body.setOffset(this.offsetX, this.offsetY);
    };
    Marty.prototype.createAnimations = function () {
        this.scene.anims.create({
            key: 'cruise',
            frames: this.cruiseFrames(),
            frameRate: FRAME_RATE,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'ollie',
            frames: this.ollieFrames(),
            frameRate: FRAME_RATE,
        });
        this.scene.anims.create({
            key: 'thread',
            frames: this.threadFrames(),
            frameRate: FRAME_RATE,
        });
    };
    Marty.prototype.cruiseFrames = function () {
        var frames = [];
        for (var i = 0; i < 9; i++) {
            frames.push({ key: SPRITE_NAME, frame: i });
        }
        for (var i = 21; i < 53; i++) {
            frames.push({ key: SPRITE_NAME, frame: i });
        }
        return frames;
    };
    Marty.prototype.ollieFrames = function () {
        var frames = [];
        for (var i = 9; i < 26; i++) {
            frames.push({ key: SPRITE_NAME, frame: i });
            if (i === 18) {
                frames.push({ key: SPRITE_NAME, frame: i });
                frames.push({ key: SPRITE_NAME, frame: i });
            }
        }
        return frames;
    };
    Marty.prototype.threadFrames = function () {
        var frames = [];
        for (var i = 50; i < 61; i++) {
            frames.push({ key: SPRITE_NAME, frame: i });
            if (i === 57) {
                frames.push({ key: SPRITE_NAME, frame: i });
                frames.push({ key: SPRITE_NAME, frame: i });
            }
        }
        return frames;
    };
    Marty.prototype.createAnimationCallbacks = function () {
        var _this = this;
        this.sprite.on('animationstart-ollie', function () {
            _this.sprite.body.setOffset(_this.offsetX, _this.offsetJumpY);
        });
        this.sprite.on('animationcomplete-ollie', function () {
            _this.sprite.body.setOffset(_this.offsetX, _this.offsetY);
            _this.cruise();
        });
        this.sprite.on('animationstart-thread', function () {
            _this.sprite.body.setOffset(_this.offsetX, _this.offsetJumpY);
        });
        this.sprite.on('animationcomplete-thread', function () {
            _this.sprite.body.setOffset(_this.offsetX, _this.offsetY);
            _this.cruise();
            ;
        });
    };
    return Marty;
}());
exports.Marty = Marty;
;


/***/ }),

/***/ "./src/poop.ts":
/*!*********************!*\
  !*** ./src/poop.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SCALE_X = 0.25;
var SCALE_Y = 0.25;
var SPRITE_NAME = 'poop';
var VELOCITY_X = 500;
var Poop = /** @class */ (function () {
    function Poop(scene) {
        this.scene = scene;
    }
    Poop.prototype.create = function () {
        this.createSprite();
        this.createAnimations();
        this.playAnimation();
    };
    Poop.prototype.update = function () {
        if (this.sprite) {
            this.sprite.setVelocityX(VELOCITY_X * -1);
        }
    };
    Poop.prototype.playAnimation = function () {
        this.sprite.anims.play('chillin', true);
    };
    Poop.prototype.createSprite = function () {
        var _this = this;
        var pos = { x: window.innerWidth - 100, y: window.innerHeight };
        this.sprite = this.scene.physics.add.sprite(pos.x, pos.y, SPRITE_NAME);
        this.sprite.setScale(SCALE_X, SCALE_Y);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.on('animationcomplete-splat', function () {
            _this.sprite.disableBody(true, true);
            _this.sprite.destroy();
            _this.sprite = null;
            _this.scene.physics.resume();
            _this.scene.scene.start('GameOverScene');
        });
        // adjust physics body for collisions
        this.sprite.body.setSize(this.sprite.width / 2, this.sprite.height / 2);
        this.sprite.body.setOffset(this.sprite.width / 2, this.sprite.height / 2);
        this.sprite.setVelocityX(VELOCITY_X * -1);
    };
    Poop.prototype.createAnimations = function () {
        this.scene.anims.create({
            key: 'chillin',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_NAME, { start: 0, end: 40 }),
            frameRate: 15,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'splat',
            frames: this.scene.anims.generateFrameNumbers(SPRITE_NAME, { start: 41, end: 45 }),
            frameRate: 30,
            hideOnComplete: true
        });
    };
    return Poop;
}());
exports.Poop = Poop;
;


/***/ }),

/***/ "./src/scene/bootScene.ts":
/*!********************************!*\
  !*** ./src/scene/bootScene.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Phaser = __webpack_require__(/*! phaser */ "./node_modules/phaser/src/phaser.js");
var BootScene = /** @class */ (function (_super) {
    __extends(BootScene, _super);
    function BootScene() {
        return _super.call(this, {
            key: 'BootScene'
        }) || this;
    }
    BootScene.prototype.preload = function () {
        var _this = this;
        this.cameras.main.setBackgroundColor(0x000000);
        this.createLoadingGraphics();
        this.load.on("progress", function (value) {
            _this.progressBar.clear();
            _this.progressBar.fillStyle(0xd3d3d3, 1);
            _this.progressBar.fillRect(_this.cameras.main.width / 4, _this.cameras.main.height / 2 - 16, (_this.cameras.main.width / 2) * value, 16);
        }, this);
        this.load.on("complete", function () {
            console.log('Done loading assets');
            _this.progressBar.destroy();
            _this.loadingBar.destroy();
        }, this);
        this.load.pack("preload", "./../assets/pack.json", "preload");
    };
    BootScene.prototype.update = function () {
        this.scene.start('TitleScene');
    };
    BootScene.prototype.createLoadingGraphics = function () {
        this.loadingBar = this.add.graphics();
        this.loadingBar.fillStyle(0xffffff, 1);
        this.loadingBar.fillRect(this.cameras.main.width / 4 - 2, this.cameras.main.height / 2 - 18, this.cameras.main.width / 2 + 4, 20);
        this.progressBar = this.add.graphics();
    };
    return BootScene;
}(Phaser.Scene));
exports.BootScene = BootScene;


/***/ }),

/***/ "./src/scene/gameOverScene.ts":
/*!************************************!*\
  !*** ./src/scene/gameOverScene.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Phaser = __webpack_require__(/*! phaser */ "./node_modules/phaser/src/phaser.js");
var SPRITE_NAME = 'gameOver';
var GameOverScene = /** @class */ (function (_super) {
    __extends(GameOverScene, _super);
    function GameOverScene() {
        return _super.call(this, {
            key: 'GameOverScene'
        }) || this;
    }
    GameOverScene.prototype.create = function () {
        var _this = this;
        var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.sprite = this.physics.add.sprite(pos.x, pos.y, SPRITE_NAME);
        this.anims.create({
            key: SPRITE_NAME,
            frames: this.frames(),
            frameRate: 10,
            repeat: 0
        });
        this.sprite.anims.play(SPRITE_NAME, true).on('animationcomplete-gameOver', function () {
            _this.scene.start('TitleScene');
        });
    };
    GameOverScene.prototype.frames = function () {
        var frames = [];
        for (var i = 0; i < 13; i++) {
            frames.push({ key: SPRITE_NAME, frame: i });
            if (i === 12) {
                // repeat the last frame for effect
                for (var j = 0; j < 10; j++) {
                    frames.push({ key: SPRITE_NAME, frame: i });
                }
            }
        }
        return frames;
    };
    return GameOverScene;
}(Phaser.Scene));
exports.GameOverScene = GameOverScene;


/***/ }),

/***/ "./src/scene/gameScene.ts":
/*!********************************!*\
  !*** ./src/scene/gameScene.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Phaser = __webpack_require__(/*! phaser */ "./node_modules/phaser/src/phaser.js");
var marty_1 = __webpack_require__(/*! ../marty */ "./src/marty.ts");
var trump_1 = __webpack_require__(/*! ../trump */ "./src/trump.ts");
var poop_1 = __webpack_require__(/*! ../poop */ "./src/poop.ts");
var audio_1 = __webpack_require__(/*! ../audio */ "./src/audio.ts");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this, {
            key: 'GameScene',
            active: false,
            visible: false
        }) || this;
    }
    GameScene.prototype.preload = function () {
        this.audio = new audio_1.Audio(this);
        this.marty = new marty_1.Marty(this);
        this.trump = new trump_1.Trump(this);
        this.poop = new poop_1.Poop(this);
    };
    GameScene.prototype.create = function () {
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
    };
    GameScene.prototype.update = function () {
        this.marty.update();
        this.poop.update();
    };
    GameScene.prototype.poopCollision = function (char, poop) {
        this.physics.pause();
        poop.anims.play('splat');
    };
    return GameScene;
}(Phaser.Scene));
exports.GameScene = GameScene;


/***/ }),

/***/ "./src/scene/titleScene.ts":
/*!*********************************!*\
  !*** ./src/scene/titleScene.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Phaser = __webpack_require__(/*! phaser */ "./node_modules/phaser/src/phaser.js");
var TitleScene = /** @class */ (function (_super) {
    __extends(TitleScene, _super);
    function TitleScene() {
        return _super.call(this, {
            key: "TitleScene"
        }) || this;
    }
    TitleScene.prototype.create = function () {
        var _this = this;
        this.start = false;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.image = this.add.image(0, 0, "startScreen");
        this.image.setOrigin(0, 0);
        this.image.setDisplaySize(window.innerWidth, window.innerHeight);
        this.input.gamepad.on('down', function (pad, button, value) {
            if (pad.A) {
                _this.start = true;
            }
        });
        this.cursors.down.onDown = function (e) {
            _this.start = true;
        };
    };
    TitleScene.prototype.update = function () {
        if (this.start === true) {
            this.scene.start('GameScene');
        }
    };
    return TitleScene;
}(Phaser.Scene));
exports.TitleScene = TitleScene;


/***/ }),

/***/ "./src/trump.ts":
/*!**********************!*\
  !*** ./src/trump.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SCALE_X = 0.25;
var SCALE_Y = 0.25;
var SPRITE_NAME = 'trump';
var Trump = /** @class */ (function () {
    function Trump(gameScene) {
        this.scene = gameScene;
    }
    Trump.prototype.create = function () {
        this.createSprite();
        this.createAnimations(this.scene.anims);
        this.cruise();
    };
    Trump.prototype.createAnimations = function (anims) {
        anims.create({
            key: 'trumpCruise',
            frames: this.cruiseFrames(),
            frameRate: 15,
            repeat: -1
        });
    };
    Trump.prototype.cruise = function () {
        this.sprite.anims.play('trumpCruise', true);
    };
    Trump.prototype.createSprite = function () {
        var pos = { x: window.innerWidth / 10, y: window.innerHeight };
        this.sprite = this.scene.physics.add.sprite(pos.x, pos.y, SPRITE_NAME);
        this.sprite.setScale(SCALE_X, SCALE_Y);
        this.sprite.setCollideWorldBounds(true);
        // this.sprite.body.checkCollision.none = true;
        this.offsetJumpY = -this.sprite.height * 2;
        this.offsetY = this.sprite.height / 2;
        this.offsetX = this.sprite.width / 10;
        this.sprite.body.setSize(this.sprite.width / 2, this.offsetY);
        this.sprite.body.setOffset(this.offsetX, this.offsetY);
    };
    Trump.prototype.cruiseFrames = function () {
        var frames = [];
        for (var i = 0; i < 30; i++) {
            frames.push({ key: SPRITE_NAME, frame: i });
        }
        return frames;
    };
    return Trump;
}());
exports.Trump = Trump;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1ZGlvLnRzIiwid2VicGFjazovLy8uL3NyYy9nYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9tYXJ0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9vcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NlbmUvYm9vdFNjZW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2VuZS9nYW1lT3ZlclNjZW5lLnRzIiwid2VicGFjazovLy8uL3NyYy9zY2VuZS9nYW1lU2NlbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjZW5lL3RpdGxlU2NlbmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RydW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7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QUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztTQUMzQztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDSCxZQUFDO0FBQUQsQ0FBQztBQW5EWSxzQkFBSyIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImFwcFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL2dhbWUudHNcIixcInZlbmRvcnNcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQgKiBhcyBQaGFzZXIgZnJvbSAncGhhc2VyJztcbmltcG9ydCB7R2FtZVNjZW5lfSBmcm9tICcuL3NjZW5lL2dhbWVTY2VuZSc7XG5cbnR5cGUgTG9hZGVyUGx1Z2luID0gUGhhc2VyLkxvYWRlci5Mb2FkZXJQbHVnaW47XG50eXBlIEJhc2VTb3VuZE1hbmFnZXIgPSBQaGFzZXIuU291bmQuQmFzZVNvdW5kTWFuYWdlcjtcblxuZXhwb3J0IGNsYXNzIEF1ZGlvIHtcbiAgbXVzaWM6IFBoYXNlci5Tb3VuZC5CYXNlU291bmQ7XG4gIFxuICBjb25zdHJ1Y3RvciAoc2NlbmU6IEdhbWVTY2VuZSkge1xuICAgIHNjZW5lLmxvYWQuYXVkaW8oXG4gICAgICAncG93ZXJfb2ZfbG92ZScsIFtcbiAgICAgICAgJ2Fzc2V0cy9hdWRpby9wb3dlcl9vZl9sb3ZlLm1wMycsXG4gICAgICAgICdhc3NldHMvYXVkaW8vcG93ZXJfb2ZfbG92ZS5vZ2cnXG4gICAgICBdXG4gICAgKVxuICB9XG5cbiAgcHVibGljIGNyZWF0ZShzb3VuZE1hbmFnZXI6IEJhc2VTb3VuZE1hbmFnZXIpIDogdm9pZCB7XG4gICAgdGhpcy5tdXNpYyA9IHNvdW5kTWFuYWdlci5hZGQoJ3Bvd2VyX29mX2xvdmUnLCB7bG9vcDogdHJ1ZX0pO1xuICB9XG5cbiAgcHVibGljIHBsYXkoKSA6IHZvaWQge1xuICAgIHRoaXMubXVzaWMucGxheSgpO1xuICB9XG59XG4iLCJpbXBvcnQgJ3BoYXNlcic7XG5pbXBvcnQge0Jvb3RTY2VuZX0gZnJvbSAnLi9zY2VuZS9ib290U2NlbmUnO1xuaW1wb3J0IHtUaXRsZVNjZW5lfSBmcm9tICcuL3NjZW5lL3RpdGxlU2NlbmUnO1xuaW1wb3J0IHtHYW1lU2NlbmV9IGZyb20gJy4vc2NlbmUvZ2FtZVNjZW5lJztcbmltcG9ydCB7R2FtZU92ZXJTY2VuZX0gZnJvbSAnLi9zY2VuZS9nYW1lT3ZlclNjZW5lJztcblxudHlwZSBHYW1lQ29uZmlnID0gUGhhc2VyLlR5cGVzLkNvcmUuR2FtZUNvbmZpZztcblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogR2FtZUNvbmZpZyA9IHtcbiAgdGl0bGU6ICdTbmFjayBUbyBUaGUgRnV0dXJlJyxcbiAgdXJsOiAnJyxcbiAgdmVyc2lvbjogXCIxLjBcIixcbiAgdHlwZTogUGhhc2VyLkFVVE8sXG4gIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gIHBhcmVudDogJ2dhbWUnLFxuICBwaHlzaWNzOiB7XG4gICAgZGVmYXVsdDogJ2FyY2FkZScsXG4gICAgYXJjYWRlOiB7XG4gICAgICBncmF2aXR5OiB7XG4gICAgICAgIC8vIHk6IDgwMFxuICAgICAgfSxcbiAgICAgIGRlYnVnOiB0cnVlXG4gICAgfSxcbiAgfSxcbiAgaW5wdXQ6IHtcbiAgICBnYW1lcGFkOiB0cnVlXG4gIH0sXG4gIGJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnLFxuICBzY2VuZTogW0Jvb3RTY2VuZSwgVGl0bGVTY2VuZSwgR2FtZVNjZW5lLCBHYW1lT3ZlclNjZW5lXVxufTtcblxuZXhwb3J0IGNsYXNzIEdhbWUgZXh0ZW5kcyBQaGFzZXIuR2FtZSB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogR2FtZUNvbmZpZykge1xuICAgIHN1cGVyKGNvbmZpZyk7XG4gIH1cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIHZhciBnYW1lID0gbmV3IEdhbWUoY29uZmlnKTtcbn0pO1xuIiwiaW1wb3J0ICogYXMgUGhhc2VyIGZyb20gJ3BoYXNlcic7XG5pbXBvcnQge0dhbWVTY2VuZX0gZnJvbSAnLi9zY2VuZS9nYW1lU2NlbmUnO1xuXG50eXBlIFNwcml0ZSA9IFBoYXNlci5QaHlzaWNzLkFyY2FkZS5TcHJpdGU7XG50eXBlIEdhbWVwYWQgPSBQaGFzZXIuSW5wdXQuR2FtZXBhZC5HYW1lcGFkO1xudHlwZSBCdXR0b24gPSBQaGFzZXIuSW5wdXQuR2FtZXBhZC5CdXR0b247XG50eXBlIEFuaW1hdGlvbkZyYW1lID0gUGhhc2VyLlR5cGVzLkFuaW1hdGlvbnMuQW5pbWF0aW9uRnJhbWU7XG5cbmNvbnN0IFNDQUxFX1ggPSAwLjI1O1xuY29uc3QgU0NBTEVfWSA9IDAuMjU7XG5jb25zdCBTUFJJVEVfTkFNRSA9ICdtYXJ0eSc7XG5jb25zdCBGUkFNRV9SQVRFID0gMTU7XG5cbmV4cG9ydCBjbGFzcyBNYXJ0eSB7XG4gIHNwcml0ZTogU3ByaXRlO1xuICBzY2VuZTogR2FtZVNjZW5lO1xuICBvZmZzZXRKdW1wWTogbnVtYmVyO1xuICBvZmZzZXRYOiBudW1iZXI7XG4gIG9mZnNldFk6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihzY2VuZTogR2FtZVNjZW5lKSB7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZSgpIDogdm9pZCB7XG4gICAgdGhpcy5jcmVhdGVTcHJpdGUoKTtcbiAgICB0aGlzLmNyZWF0ZUFuaW1hdGlvbnMoKTtcbiAgICB0aGlzLmNyZWF0ZUFuaW1hdGlvbkNhbGxiYWNrcygpO1xuICAgIHRoaXMuY3JlYXRlSW5wdXRIYW5kbGluZygpO1xuICAgIHRoaXMuY3J1aXNlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNwcml0ZS5ib2R5LnRvdWNoaW5nLmRvd24pIHtcbiAgICAgIHRoaXMuY3J1aXNlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcnVpc2UoKTogdm9pZCB7XG4gICAgdGhpcy5zcHJpdGUuYW5pbXMucGxheSgnY3J1aXNlJywgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIG9sbGllKCk6IHZvaWQge1xuICAgIHRoaXMuc3ByaXRlLmFuaW1zLnBsYXkoJ29sbGllJywgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIHRocmVhZCgpOiB2b2lkIHtcbiAgICB0aGlzLnNwcml0ZS5hbmltcy5wbGF5KCd0aHJlYWQnLCB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSW5wdXRIYW5kbGluZygpIDogdm9pZCB7XG4gICAgdGhpcy5zY2VuZS5pbnB1dC5nYW1lcGFkLm9uKFxuICAgICAgJ2Rvd24nLFxuICAgICAgKHBhZDogR2FtZXBhZCwgYnV0dG9uOiBCdXR0b24sIHZhbHVlOiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKHBhZC5BKSB7XG4gICAgICAgICAgdGhpcy5vbGxpZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKHBhZC5CKSB7XG4gICAgICAgICAgdGhpcy50aHJlYWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLnNjZW5lLmN1cnNvcnMuc3BhY2Uub25Eb3duID0gKGUpID0+IHtcbiAgICAgIHRoaXMub2xsaWUoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjZW5lLmN1cnNvcnMudXAub25Eb3duID0gKGUpID0+IHtcbiAgICAgIHRoaXMudGhyZWFkKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTcHJpdGUoKSA6IHZvaWQge1xuICAgIGNvbnN0IHBvcyA9IHt4OiB3aW5kb3cuaW5uZXJXaWR0aCAvIDIuNSwgeTogd2luZG93LmlubmVySGVpZ2h0fVxuICAgIHRoaXMuc3ByaXRlID0gdGhpcy5zY2VuZS5waHlzaWNzLmFkZC5zcHJpdGUocG9zLngsIHBvcy55LCBTUFJJVEVfTkFNRSk7XG4gICAgdGhpcy5zcHJpdGUuc2V0U2NhbGUoU0NBTEVfWCwgU0NBTEVfWSk7XG4gICAgdGhpcy5zcHJpdGUuc2V0Q29sbGlkZVdvcmxkQm91bmRzKHRydWUpO1xuICAgIHRoaXMub2Zmc2V0SnVtcFkgPSAtdGhpcy5zcHJpdGUuaGVpZ2h0KjI7XG4gICAgdGhpcy5vZmZzZXRZID0gdGhpcy5zcHJpdGUuaGVpZ2h0LzI7XG4gICAgdGhpcy5vZmZzZXRYID0gdGhpcy5zcHJpdGUud2lkdGgvMTA7XG4gICAgdGhpcy5zcHJpdGUuYm9keS5zZXRTaXplKHRoaXMuc3ByaXRlLndpZHRoLzIsIHRoaXMub2Zmc2V0WSk7XG4gICAgdGhpcy5zcHJpdGUuYm9keS5zZXRPZmZzZXQodGhpcy5vZmZzZXRYLCB0aGlzLm9mZnNldFkpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVBbmltYXRpb25zKCkgOiB2b2lkIHtcbiAgICB0aGlzLnNjZW5lLmFuaW1zLmNyZWF0ZSh7XG4gICAgICBrZXk6ICdjcnVpc2UnLFxuICAgICAgZnJhbWVzOiB0aGlzLmNydWlzZUZyYW1lcygpLFxuICAgICAgZnJhbWVSYXRlOiBGUkFNRV9SQVRFLFxuICAgICAgcmVwZWF0OiAtMSxcbiAgICB9KTtcblxuICAgIHRoaXMuc2NlbmUuYW5pbXMuY3JlYXRlKHtcbiAgICAgIGtleTogJ29sbGllJyxcbiAgICAgIGZyYW1lczogdGhpcy5vbGxpZUZyYW1lcygpLFxuICAgICAgZnJhbWVSYXRlOiBGUkFNRV9SQVRFLFxuICAgIH0pO1xuXG4gICAgdGhpcy5zY2VuZS5hbmltcy5jcmVhdGUoe1xuICAgICAga2V5OiAndGhyZWFkJyxcbiAgICAgIGZyYW1lczogdGhpcy50aHJlYWRGcmFtZXMoKSxcbiAgICAgIGZyYW1lUmF0ZTogRlJBTUVfUkFURSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3J1aXNlRnJhbWVzKCkgOiBBbmltYXRpb25GcmFtZVtdIHtcbiAgICB2YXIgZnJhbWVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgIGZyYW1lcy5wdXNoKHtrZXk6IFNQUklURV9OQU1FLCBmcmFtZTogaX0pO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAyMTsgaSA8IDUzOyBpKyspIHtcbiAgICAgIGZyYW1lcy5wdXNoKHtrZXk6IFNQUklURV9OQU1FLCBmcmFtZTogaX0pO1xuICAgIH1cblxuICAgIHJldHVybiBmcmFtZXM7XG4gIH1cblxuICBwcml2YXRlIG9sbGllRnJhbWVzKCkgOiBBbmltYXRpb25GcmFtZVtdIHtcbiAgICB2YXIgZnJhbWVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDk7IGkgPCAyNjsgaSsrKSB7XG4gICAgICBmcmFtZXMucHVzaCh7a2V5OiBTUFJJVEVfTkFNRSwgZnJhbWU6IGl9KTtcbiAgICAgIGlmIChpID09PSAxOCkge1xuICAgICAgICBmcmFtZXMucHVzaCh7a2V5OiBTUFJJVEVfTkFNRSwgZnJhbWU6IGl9KTtcbiAgICAgICAgZnJhbWVzLnB1c2goe2tleTogU1BSSVRFX05BTUUsIGZyYW1lOiBpfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZyYW1lcztcbiAgfVxuXG4gIHByaXZhdGUgdGhyZWFkRnJhbWVzKCkgOiBBbmltYXRpb25GcmFtZVtdIHtcbiAgICB2YXIgZnJhbWVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDUwOyBpIDwgNjE7IGkrKykge1xuICAgICAgZnJhbWVzLnB1c2goe2tleTogU1BSSVRFX05BTUUsIGZyYW1lOiBpfSk7XG4gICAgICBpZiAoaSA9PT0gNTcpIHtcbiAgICAgICAgZnJhbWVzLnB1c2goe2tleTogU1BSSVRFX05BTUUsIGZyYW1lOiBpfSk7XG4gICAgICAgIGZyYW1lcy5wdXNoKHtrZXk6IFNQUklURV9OQU1FLCBmcmFtZTogaX0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmcmFtZXM7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUFuaW1hdGlvbkNhbGxiYWNrcygpIDogdm9pZCB7XG4gICAgdGhpcy5zcHJpdGUub24oJ2FuaW1hdGlvbnN0YXJ0LW9sbGllJywgKCkgPT4ge1xuICAgICAgdGhpcy5zcHJpdGUuYm9keS5zZXRPZmZzZXQodGhpcy5vZmZzZXRYLCB0aGlzLm9mZnNldEp1bXBZKTtcbiAgICB9KTtcbiAgICB0aGlzLnNwcml0ZS5vbignYW5pbWF0aW9uY29tcGxldGUtb2xsaWUnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNwcml0ZS5ib2R5LnNldE9mZnNldCh0aGlzLm9mZnNldFgsIHRoaXMub2Zmc2V0WSk7XG4gICAgICB0aGlzLmNydWlzZSgpO1xuICAgIH0pO1xuICAgIHRoaXMuc3ByaXRlLm9uKCdhbmltYXRpb25zdGFydC10aHJlYWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNwcml0ZS5ib2R5LnNldE9mZnNldCh0aGlzLm9mZnNldFgsIHRoaXMub2Zmc2V0SnVtcFkpO1xuICAgIH0pO1xuICAgIHRoaXMuc3ByaXRlLm9uKCdhbmltYXRpb25jb21wbGV0ZS10aHJlYWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNwcml0ZS5ib2R5LnNldE9mZnNldCh0aGlzLm9mZnNldFgsIHRoaXMub2Zmc2V0WSk7XG4gICAgICB0aGlzLmNydWlzZSgpOztcbiAgICB9KTtcbiAgfVxufTtcbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tICdwaGFzZXInO1xuaW1wb3J0IHtHYW1lU2NlbmV9IGZyb20gJy4vc2NlbmUvZ2FtZVNjZW5lJztcblxudHlwZSBTcHJpdGUgPSBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuU3ByaXRlO1xuXG5jb25zdCBTQ0FMRV9YID0gMC4yNTtcbmNvbnN0IFNDQUxFX1kgPSAwLjI1O1xuY29uc3QgU1BSSVRFX05BTUUgPSAncG9vcCc7XG5jb25zdCBWRUxPQ0lUWV9YID0gNTAwO1xuXG5leHBvcnQgY2xhc3MgUG9vcCB7XG4gIHNwcml0ZTogU3ByaXRlO1xuICBzY2VuZTogR2FtZVNjZW5lO1xuICBzcHJpdGVzOiBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuR3JvdXA7XG5cbiAgY29uc3RydWN0b3Ioc2NlbmU6IEdhbWVTY2VuZSkge1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGUoKSA6IHZvaWQge1xuICAgIHRoaXMuY3JlYXRlU3ByaXRlKCk7XG4gICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKCk7XG4gICAgdGhpcy5wbGF5QW5pbWF0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNwcml0ZSkge1xuICAgICAgdGhpcy5zcHJpdGUuc2V0VmVsb2NpdHlYKFZFTE9DSVRZX1ggKiAtMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwbGF5QW5pbWF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuc3ByaXRlLmFuaW1zLnBsYXkoJ2NoaWxsaW4nLCB0cnVlKTtcbiAgfVxuIFxuICBwcml2YXRlIGNyZWF0ZVNwcml0ZSgpIDogdm9pZCB7XG4gICAgY29uc3QgcG9zID0ge3g6IHdpbmRvdy5pbm5lcldpZHRoIC0gMTAwLCB5OiB3aW5kb3cuaW5uZXJIZWlnaHR9XG4gICAgdGhpcy5zcHJpdGUgPSB0aGlzLnNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShwb3MueCwgcG9zLnksIFNQUklURV9OQU1FKTtcbiAgICB0aGlzLnNwcml0ZS5zZXRTY2FsZShTQ0FMRV9YLCBTQ0FMRV9ZKTtcbiAgICB0aGlzLnNwcml0ZS5zZXRDb2xsaWRlV29ybGRCb3VuZHModHJ1ZSk7XG4gICAgdGhpcy5zcHJpdGUub24oJ2FuaW1hdGlvbmNvbXBsZXRlLXNwbGF0JywgKCkgPT4ge1xuICAgICAgdGhpcy5zcHJpdGUuZGlzYWJsZUJvZHkodHJ1ZSwgdHJ1ZSk7XG4gICAgICB0aGlzLnNwcml0ZS5kZXN0cm95KCk7XG4gICAgICB0aGlzLnNwcml0ZSA9IG51bGw7XG4gICAgICB0aGlzLnNjZW5lLnBoeXNpY3MucmVzdW1lKCk7XG4gICAgICB0aGlzLnNjZW5lLnNjZW5lLnN0YXJ0KCdHYW1lT3ZlclNjZW5lJyk7XG4gICAgfSk7XG4gICAgLy8gYWRqdXN0IHBoeXNpY3MgYm9keSBmb3IgY29sbGlzaW9uc1xuICAgIHRoaXMuc3ByaXRlLmJvZHkuc2V0U2l6ZSh0aGlzLnNwcml0ZS53aWR0aC8yLCB0aGlzLnNwcml0ZS5oZWlnaHQvMik7XG4gICAgdGhpcy5zcHJpdGUuYm9keS5zZXRPZmZzZXQodGhpcy5zcHJpdGUud2lkdGgvMiwgdGhpcy5zcHJpdGUuaGVpZ2h0LzIpO1xuICAgIHRoaXMuc3ByaXRlLnNldFZlbG9jaXR5WChWRUxPQ0lUWV9YICogLTEpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVBbmltYXRpb25zKCkgOiB2b2lkIHtcbiAgICB0aGlzLnNjZW5lLmFuaW1zLmNyZWF0ZSh7XG4gICAgICBrZXk6ICdjaGlsbGluJyxcbiAgICAgIGZyYW1lczogdGhpcy5zY2VuZS5hbmltcy5nZW5lcmF0ZUZyYW1lTnVtYmVycyhTUFJJVEVfTkFNRSwge3N0YXJ0OiAwLCBlbmQ6IDQwfSksXG4gICAgICBmcmFtZVJhdGU6IDE1LFxuICAgICAgcmVwZWF0OiAtMSxcbiAgICB9KTtcbiAgICB0aGlzLnNjZW5lLmFuaW1zLmNyZWF0ZSh7XG4gICAgICBrZXk6ICdzcGxhdCcsXG4gICAgICBmcmFtZXM6IHRoaXMuc2NlbmUuYW5pbXMuZ2VuZXJhdGVGcmFtZU51bWJlcnMoU1BSSVRFX05BTUUsIHtzdGFydDogNDEsIGVuZDogNDV9KSxcbiAgICAgIGZyYW1lUmF0ZTogMzAsXG4gICAgICBoaWRlT25Db21wbGV0ZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn07XG4iLCJpbXBvcnQgKiBhcyBQaGFzZXIgZnJvbSAncGhhc2VyJztcblxuZXhwb3J0IGNsYXNzIEJvb3RTY2VuZSBleHRlbmRzIFBoYXNlci5TY2VuZSB7XG4gIHByaXZhdGUgbG9hZGluZ0JhcjogUGhhc2VyLkdhbWVPYmplY3RzLkdyYXBoaWNzO1xuICBwcml2YXRlIHByb2dyZXNzQmFyOiBQaGFzZXIuR2FtZU9iamVjdHMuR3JhcGhpY3M7XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGtleTogJ0Jvb3RTY2VuZSdcbiAgICB9KVxuICB9XG5cbiAgcHJlbG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLmNhbWVyYXMubWFpbi5zZXRCYWNrZ3JvdW5kQ29sb3IoMHgwMDAwMDApO1xuICAgIHRoaXMuY3JlYXRlTG9hZGluZ0dyYXBoaWNzKCk7XG4gICAgdGhpcy5sb2FkLm9uKFxuICAgICAgXCJwcm9ncmVzc1wiLFxuICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5maWxsU3R5bGUoMHhkM2QzZDMsIDEpO1xuICAgICAgICB0aGlzLnByb2dyZXNzQmFyLmZpbGxSZWN0KFxuICAgICAgICAgIHRoaXMuY2FtZXJhcy5tYWluLndpZHRoIC8gNCxcbiAgICAgICAgICB0aGlzLmNhbWVyYXMubWFpbi5oZWlnaHQgLyAyIC0gMTYsXG4gICAgICAgICAgKHRoaXMuY2FtZXJhcy5tYWluLndpZHRoIC8gMikgKiB2YWx1ZSxcbiAgICAgICAgICAxNlxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIHRoaXNcbiAgICApO1xuXG4gICAgdGhpcy5sb2FkLm9uKFxuICAgICAgXCJjb21wbGV0ZVwiLFxuICAgICAgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnRG9uZSBsb2FkaW5nIGFzc2V0cycpO1xuICAgICAgICB0aGlzLnByb2dyZXNzQmFyLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nQmFyLmRlc3Ryb3koKTtcbiAgICAgIH0sXG4gICAgICB0aGlzXG4gICAgKTtcblxuICAgIHRoaXMubG9hZC5wYWNrKFxuICAgICAgXCJwcmVsb2FkXCIsXG4gICAgICBcIi4vLi4vYXNzZXRzL3BhY2suanNvblwiLFxuICAgICAgXCJwcmVsb2FkXCJcbiAgICApO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuc2NlbmUuc3RhcnQoJ1RpdGxlU2NlbmUnKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTG9hZGluZ0dyYXBoaWNzKCk6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZ0JhciA9IHRoaXMuYWRkLmdyYXBoaWNzKCk7XG4gICAgdGhpcy5sb2FkaW5nQmFyLmZpbGxTdHlsZSgweGZmZmZmZiwgMSk7XG4gICAgdGhpcy5sb2FkaW5nQmFyLmZpbGxSZWN0KFxuICAgICAgdGhpcy5jYW1lcmFzLm1haW4ud2lkdGggLyA0IC0gMixcbiAgICAgIHRoaXMuY2FtZXJhcy5tYWluLmhlaWdodCAvIDIgLSAxOCxcbiAgICAgIHRoaXMuY2FtZXJhcy5tYWluLndpZHRoIC8gMiArIDQsXG4gICAgICAyMFxuICAgICk7XG4gICAgdGhpcy5wcm9ncmVzc0JhciA9IHRoaXMuYWRkLmdyYXBoaWNzKCk7XG4gIH1cbn0iLCJpbXBvcnQgKiBhcyBQaGFzZXIgZnJvbSAncGhhc2VyJztcblxudHlwZSBTcHJpdGUgPSBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuU3ByaXRlO1xudHlwZSBBbmltYXRpb25GcmFtZSA9IFBoYXNlci5UeXBlcy5BbmltYXRpb25zLkFuaW1hdGlvbkZyYW1lO1xuXG5jb25zdCBTUFJJVEVfTkFNRSA9ICdnYW1lT3Zlcic7XG5cbmV4cG9ydCBjbGFzcyBHYW1lT3ZlclNjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lIHtcbiAgc3ByaXRlOiBTcHJpdGU7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAga2V5OiAnR2FtZU92ZXJTY2VuZSdcbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IHBvcyA9IHt4OiB3aW5kb3cuaW5uZXJXaWR0aC8yLCB5OiB3aW5kb3cuaW5uZXJIZWlnaHQvMn1cbiAgICB0aGlzLnNwcml0ZSA9IHRoaXMucGh5c2ljcy5hZGQuc3ByaXRlKHBvcy54LCBwb3MueSwgU1BSSVRFX05BTUUpO1xuICAgIHRoaXMuYW5pbXMuY3JlYXRlKHtcbiAgICAgIGtleTogU1BSSVRFX05BTUUsXG4gICAgICBmcmFtZXM6IHRoaXMuZnJhbWVzKCksXG4gICAgICBmcmFtZVJhdGU6IDEwLFxuICAgICAgcmVwZWF0OiAwXG4gICAgfSk7XG4gICAgdGhpcy5zcHJpdGUuYW5pbXMucGxheShTUFJJVEVfTkFNRSwgdHJ1ZSkub24oJ2FuaW1hdGlvbmNvbXBsZXRlLWdhbWVPdmVyJywgKCkgPT4ge1xuICAgICAgdGhpcy5zY2VuZS5zdGFydCgnVGl0bGVTY2VuZScpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmcmFtZXMoKTogQW5pbWF0aW9uRnJhbWVbXSB7XG4gICAgdmFyIGZyYW1lcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTM7IGkrKykge1xuICAgICAgZnJhbWVzLnB1c2goe2tleTogU1BSSVRFX05BTUUsIGZyYW1lOiBpfSk7XG4gICAgICBpZiAoaSA9PT0gMTIpIHtcbiAgICAgICAgLy8gcmVwZWF0IHRoZSBsYXN0IGZyYW1lIGZvciBlZmZlY3RcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgICAgZnJhbWVzLnB1c2goe2tleTogU1BSSVRFX05BTUUsIGZyYW1lOiBpfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZnJhbWVzO1xuICB9XG59IiwiaW1wb3J0ICogYXMgUGhhc2VyIGZyb20gJ3BoYXNlcic7XG5pbXBvcnQge01hcnR5fSBmcm9tICcuLi9tYXJ0eSc7XG5pbXBvcnQge1RydW1wfSBmcm9tICcuLi90cnVtcCc7XG5pbXBvcnQge1Bvb3B9IGZyb20gJy4uL3Bvb3AnO1xuaW1wb3J0IHtBdWRpb30gZnJvbSAnLi4vYXVkaW8nO1xuXG50eXBlIEN1cnNvcktleXMgPSBQaGFzZXIuVHlwZXMuSW5wdXQuS2V5Ym9hcmQuQ3Vyc29yS2V5cztcbnR5cGUgU3ByaXRlID0gUGhhc2VyLlBoeXNpY3MuQXJjYWRlLlNwcml0ZTtcblxuZXhwb3J0IGNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIFBoYXNlci5TY2VuZSB7XG4gIGF1ZGlvOiBBdWRpbztcbiAgY3Vyc29yczogQ3Vyc29yS2V5cztcbiAgbWFydHk6IE1hcnR5O1xuICB0cnVtcDogVHJ1bXA7XG4gIHBvb3A6IFBvb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAga2V5OiAnR2FtZVNjZW5lJyxcbiAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICB2aXNpYmxlOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgcHJlbG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLmF1ZGlvID0gbmV3IEF1ZGlvKHRoaXMpO1xuICAgIHRoaXMubWFydHkgPSBuZXcgTWFydHkodGhpcyk7XG4gICAgdGhpcy50cnVtcCA9IG5ldyBUcnVtcCh0aGlzKTtcbiAgICB0aGlzLnBvb3AgPSBuZXcgUG9vcCh0aGlzKTtcbiAgfVxuXG4gIGNyZWF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnNvcnMgPSB0aGlzLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcbiAgICB0aGlzLm1hcnR5LmNyZWF0ZSgpO1xuICAgIHRoaXMudHJ1bXAuY3JlYXRlKCk7XG4gICAgdGhpcy5wb29wLmNyZWF0ZSgpO1xuICAgIHRoaXMucGh5c2ljcy5hZGQub3ZlcmxhcCh0aGlzLm1hcnR5LnNwcml0ZSwgdGhpcy5wb29wLnNwcml0ZSwgdGhpcy5wb29wQ29sbGlzaW9uLCBudWxsLCB0aGlzKTtcbiAgICB0aGlzLnBoeXNpY3MuYWRkLm92ZXJsYXAodGhpcy50cnVtcC5zcHJpdGUsIHRoaXMucG9vcC5zcHJpdGUsIHRoaXMucG9vcENvbGxpc2lvbiwgbnVsbCwgdGhpcyk7XG4gICAgdmFyIGdyb3VuZCA9IHRoaXMucGh5c2ljcy5hZGQuc3ByaXRlKDAsIHdpbmRvdy5pbm5lckhlaWdodCwgJ2dyb3VuZCcpO1xuICAgIGdyb3VuZC5zZXRDb2xsaWRlV29ybGRCb3VuZHModHJ1ZSk7XG4gICAgdGhpcy5waHlzaWNzLmFkZC5jb2xsaWRlcihncm91bmQsIHRoaXMudHJ1bXAuc3ByaXRlKTtcbiAgICB0aGlzLnBoeXNpY3MuYWRkLmNvbGxpZGVyKGdyb3VuZCwgdGhpcy5tYXJ0eS5zcHJpdGUpO1xuICAgIHRoaXMucGh5c2ljcy5hZGQuY29sbGlkZXIoZ3JvdW5kLCB0aGlzLnBvb3Auc3ByaXRlKTtcbiAgICB0aGlzLmF1ZGlvLmNyZWF0ZSh0aGlzLnNvdW5kKTtcbiAgICB0aGlzLmF1ZGlvLnBsYXkoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLm1hcnR5LnVwZGF0ZSgpO1xuICAgIHRoaXMucG9vcC51cGRhdGUoKTtcbiAgfVxuXG4gIHBvb3BDb2xsaXNpb24oY2hhcjogU3ByaXRlLCBwb29wOiBTcHJpdGUpOiB2b2lkIHtcbiAgICB0aGlzLnBoeXNpY3MucGF1c2UoKTtcbiAgICBwb29wLmFuaW1zLnBsYXkoJ3NwbGF0Jyk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIFBoYXNlciBmcm9tICdwaGFzZXInO1xuXG50eXBlIEN1cnNvcktleXMgPSBQaGFzZXIuVHlwZXMuSW5wdXQuS2V5Ym9hcmQuQ3Vyc29yS2V5cztcbnR5cGUgR2FtZXBhZCA9IFBoYXNlci5JbnB1dC5HYW1lcGFkLkdhbWVwYWQ7XG50eXBlIEJ1dHRvbiA9IFBoYXNlci5JbnB1dC5HYW1lcGFkLkJ1dHRvbjtcblxuZXhwb3J0IGNsYXNzIFRpdGxlU2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xuICBpbWFnZTogUGhhc2VyLkdhbWVPYmplY3RzLkltYWdlO1xuICBjdXJzb3JzOiBDdXJzb3JLZXlzO1xuICBzdGFydDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoe1xuICAgICAga2V5OiBcIlRpdGxlU2NlbmVcIlxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnQgPSBmYWxzZTtcbiAgICB0aGlzLmN1cnNvcnMgPSB0aGlzLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcbiAgICB0aGlzLmltYWdlID0gdGhpcy5hZGQuaW1hZ2UoMCwgMCwgXCJzdGFydFNjcmVlblwiKTtcbiAgICB0aGlzLmltYWdlLnNldE9yaWdpbigwLCAwKTtcbiAgICB0aGlzLmltYWdlLnNldERpc3BsYXlTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgIHRoaXMuaW5wdXQuZ2FtZXBhZC5vbihcbiAgICAgICdkb3duJyxcbiAgICAgIChwYWQ6IEdhbWVwYWQsIGJ1dHRvbjogQnV0dG9uLCB2YWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmIChwYWQuQSkge1xuICAgICAgICAgIHRoaXMuc3RhcnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgICB0aGlzLmN1cnNvcnMuZG93bi5vbkRvd24gPSAoZSkgPT4ge1xuICAgICAgdGhpcy5zdGFydCA9IHRydWU7XG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdGFydCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5zY2VuZS5zdGFydCgnR2FtZVNjZW5lJyk7XG4gICAgfVxuICB9XG59IiwiaW1wb3J0ICogYXMgUGhhc2VyIGZyb20gJ3BoYXNlcic7XG5pbXBvcnQge0dhbWVTY2VuZX0gZnJvbSAnLi9zY2VuZS9nYW1lU2NlbmUnO1xudHlwZSBTcHJpdGUgPSBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuU3ByaXRlO1xudHlwZSBBbmltYXRpb25GcmFtZSA9IFBoYXNlci5UeXBlcy5BbmltYXRpb25zLkFuaW1hdGlvbkZyYW1lO1xudHlwZSBBbmltYXRpb25NYW5hZ2VyID0gUGhhc2VyLkFuaW1hdGlvbnMuQW5pbWF0aW9uTWFuYWdlcjtcblxuY29uc3QgU0NBTEVfWCA9IDAuMjU7XG5jb25zdCBTQ0FMRV9ZID0gMC4yNTtcbmNvbnN0IFNQUklURV9OQU1FID0gJ3RydW1wJztcblxuZXhwb3J0IGNsYXNzIFRydW1wIHtcbiAgc2NlbmU6IEdhbWVTY2VuZTtcbiAgc3ByaXRlOiBTcHJpdGU7XG4gIG9mZnNldEp1bXBZOiBudW1iZXI7XG4gIG9mZnNldFg6IG51bWJlcjtcbiAgb2Zmc2V0WTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGdhbWVTY2VuZTogR2FtZVNjZW5lKSB7XG4gICAgdGhpcy5zY2VuZSA9IGdhbWVTY2VuZTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGUoKSA6IHZvaWQge1xuICAgIHRoaXMuY3JlYXRlU3ByaXRlKCk7XG4gICAgdGhpcy5jcmVhdGVBbmltYXRpb25zKHRoaXMuc2NlbmUuYW5pbXMpO1xuICAgIHRoaXMuY3J1aXNlKCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUFuaW1hdGlvbnMoYW5pbXM6IEFuaW1hdGlvbk1hbmFnZXIpIHtcbiAgICBhbmltcy5jcmVhdGUoe1xuICAgICAga2V5OiAndHJ1bXBDcnVpc2UnLFxuICAgICAgZnJhbWVzOiB0aGlzLmNydWlzZUZyYW1lcygpLFxuICAgICAgZnJhbWVSYXRlOiAxNSxcbiAgICAgIHJlcGVhdDogLTFcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3J1aXNlKCkgOiB2b2lkIHtcbiAgICB0aGlzLnNwcml0ZS5hbmltcy5wbGF5KCd0cnVtcENydWlzZScsIHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTcHJpdGUoKSA6IHZvaWQge1xuICAgIGNvbnN0IHBvcyA9IHt4OiB3aW5kb3cuaW5uZXJXaWR0aCAvIDEwLCB5OiB3aW5kb3cuaW5uZXJIZWlnaHR9XG4gICAgdGhpcy5zcHJpdGUgPSB0aGlzLnNjZW5lLnBoeXNpY3MuYWRkLnNwcml0ZShwb3MueCwgcG9zLnksIFNQUklURV9OQU1FKTtcbiAgICB0aGlzLnNwcml0ZS5zZXRTY2FsZShTQ0FMRV9YLCBTQ0FMRV9ZKTtcbiAgICB0aGlzLnNwcml0ZS5zZXRDb2xsaWRlV29ybGRCb3VuZHModHJ1ZSk7XG4gICAgLy8gdGhpcy5zcHJpdGUuYm9keS5jaGVja0NvbGxpc2lvbi5ub25lID0gdHJ1ZTtcbiAgICB0aGlzLm9mZnNldEp1bXBZID0gLXRoaXMuc3ByaXRlLmhlaWdodCoyO1xuICAgIHRoaXMub2Zmc2V0WSA9IHRoaXMuc3ByaXRlLmhlaWdodC8yO1xuICAgIHRoaXMub2Zmc2V0WCA9IHRoaXMuc3ByaXRlLndpZHRoLzEwO1xuICAgIHRoaXMuc3ByaXRlLmJvZHkuc2V0U2l6ZSh0aGlzLnNwcml0ZS53aWR0aC8yLCB0aGlzLm9mZnNldFkpO1xuICAgIHRoaXMuc3ByaXRlLmJvZHkuc2V0T2Zmc2V0KHRoaXMub2Zmc2V0WCwgdGhpcy5vZmZzZXRZKTtcbiAgfVxuXG4gIHByaXZhdGUgY3J1aXNlRnJhbWVzKCkgOiBBbmltYXRpb25GcmFtZVtdIHtcbiAgICB2YXIgZnJhbWVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMDsgaSsrKSB7XG4gICAgICBmcmFtZXMucHVzaCh7a2V5OiBTUFJJVEVfTkFNRSwgZnJhbWU6IGl9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnJhbWVzO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9