(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AssetManager, BootScene, GraphicsManager, InputManager, MainMenuScene, PreLoadScene, Scene, SceneManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require("../../../vendor/iki-engine/src/Scene.coffee");

SceneManager = require("../../../vendor/iki-engine/src/Manager/SceneManager.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../../vendor/iki-engine/src/Manager/InputManager.coffee");

AssetManager = require("../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

PreLoadScene = require("./PreLoad.coffee");

MainMenuScene = require("./MainMenu.coffee");

BootScene = (function(_super) {
  __extends(BootScene, _super);

  function BootScene() {
    return BootScene.__super__.constructor.apply(this, arguments);
  }

  BootScene.prototype.init = function() {
    var mainMenuScene, preLoadScene;
    GraphicsManager.renderer = GraphicsManager.createRenderer(640, 480, document.body);
    GraphicsManager.renderer.canvas.width = window.innerWidth;
    GraphicsManager.renderer.canvas.height = window.innerHeight;
    InputManager.init();
    window.addEventListener("resize", function() {
      GraphicsManager.renderer.canvas.width = window.innerWidth;
      return GraphicsManager.renderer.canvas.height = window.innerHeight;
    });
    preLoadScene = new PreLoadScene();
    SceneManager.add("preload", preLoadScene);
    preLoadScene.init();
    mainMenuScene = new MainMenuScene();
    SceneManager.add("main-menu", mainMenuScene);
    return mainMenuScene.init();
  };

  BootScene.prototype.activate = function() {
    var loadAsset;
    loadAsset = AssetManager.load("assets/assets-boot.json");
    return loadAsset.then(function() {
      return SceneManager.activate("preload");
    });
  };

  return BootScene;

})(Scene);

module.exports = BootScene;


},{"../../../vendor/iki-engine/src/Manager/AssetManager.coffee":6,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":8,"../../../vendor/iki-engine/src/Manager/InputManager.coffee":9,"../../../vendor/iki-engine/src/Manager/SceneManager.coffee":10,"../../../vendor/iki-engine/src/Scene.coffee":11,"./MainMenu.coffee":2,"./PreLoad.coffee":3}],2:[function(require,module,exports){
var AssetManager, AudioManager, GraphicsManager, InputManager, MainMenuScene, Scene, SceneManager, Util,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require("../../../vendor/iki-engine/src/Scene.coffee");

Util = require("../../../vendor/iki-engine/src/Util.coffee");

SceneManager = require("../../../vendor/iki-engine/src/Manager/SceneManager.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../../vendor/iki-engine/src/Manager/InputManager.coffee");

AudioManager = require("../../../vendor/iki-engine/src/Manager/AudioManager.coffee");

AssetManager = require("../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

MainMenuScene = (function(_super) {
  __extends(MainMenuScene, _super);

  function MainMenuScene() {
    return MainMenuScene.__super__.constructor.apply(this, arguments);
  }

  MainMenuScene.prototype.init = function() {
    this.menus = {};
    this.renderer = GraphicsManager.renderer;
    this.clickListener = this.onMouseClick.bind(this);
    this.currentMenu = "main-menu";
    AudioManager.load("menu-select", "/assets/sound/UI pack 1/MENU B_Select.wav");
    AudioManager.load("menu-back", "/assets/sound/UI pack 1/MENU B_Back.wav");
    this.loadMenu("/assets/menu/main-menu.json");
    return this.loadMenu("/assets/menu/new-game-menu.json");
  };

  MainMenuScene.prototype.loadMenu = function(menuFile) {
    var map;
    map = Util.loadJSON(menuFile);
    return map.then(this.parseMenu.bind(this));
  };

  MainMenuScene.prototype.parseMenu = function(menuData) {
    var element, _i, _len, _ref, _results;
    this.menus[menuData.id] = {
      id: menuData.id,
      background: menuData.background,
      elements: [],
      buttons: []
    };
    _ref = menuData.elements;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      if (element.type === "button") {
        _results.push(this.addButton(menuData.id, element));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  MainMenuScene.prototype.addButton = function(menu, btn) {
    var button, onClick;
    onClick = null;
    if (btn.actionType === "switchMenu") {
      onClick = this.switchMenu.bind(this, btn.action, btn.isBack);
    }
    if (btn.actionType === "switchScene") {
      onClick = this.switchScene.bind(this, btn.action, btn.isBack);
    }
    button = {
      text: btn.text,
      x: btn.x,
      y: btn.y,
      width: btn.width,
      height: btn.height,
      disabled: btn.disabled,
      click: onClick
    };
    if (!this.menus[menu]) {
      this.menus[menu] = {};
    }
    if (!this.menus[menu].buttons) {
      this.menus[menu].buttons = [];
    }
    return this.menus[menu].buttons.push(button);
  };

  MainMenuScene.prototype.activate = function() {
    this.background = AssetManager.get("img/background/image6_0.jpg");
    InputManager.onMouseClick = this.onMouseClick.bind(this);
    this.currentMenu = "main-menu";
    return this.renderMenu();
  };

  MainMenuScene.prototype.deactivate = function() {
    return InputManager.onMouseClick = null;
  };

  MainMenuScene.prototype.switchMenu = function(newMenu, isBack) {
    if (isBack == null) {
      isBack = false;
    }
    if (isBack) {
      AudioManager.play("menu-back");
    } else {
      AudioManager.play("menu-select");
    }
    this.currentMenu = newMenu;
    return this.renderMenu();
  };

  MainMenuScene.prototype.switchScene = function(scene) {
    AudioManager.play("menu-select");
    return SceneManager.activate(scene);
  };

  MainMenuScene.prototype.onMouseClick = function(e) {
    var button;
    button = this.getButtonFromPoint(e.x, e.y);
    if (button) {
      return typeof button.click === "function" ? button.click() : void 0;
    }
  };

  MainMenuScene.prototype.getButtonFromPoint = function(x, y) {
    var button, menu, _i, _len, _ref;
    menu = this.menus[this.currentMenu];
    _ref = menu.buttons;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      button = _ref[_i];
      if (this.isPointInRect(x, y, button.x, button.y, button.width, button.height)) {
        return button;
      }
    }
  };

  MainMenuScene.prototype.isPointInRect = function(x, y, rx, ry, rw, rh) {
    return x >= rx && x <= ry + rw && y >= ry && y <= ry + rh;
  };

  MainMenuScene.prototype.renderMenu = function() {
    var button, menu, _i, _len, _ref, _results;
    this.renderBackground();
    menu = this.menus[this.currentMenu];
    _ref = menu.buttons;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      button = _ref[_i];
      _results.push(this.renderButton(button));
    }
    return _results;
  };

  MainMenuScene.prototype.renderBackground = function() {
    return GraphicsManager.fillImage(this.renderer.ctx, this.background, this.background.width, this.background.height, this.renderer.canvas.width, this.renderer.canvas.height);
  };

  MainMenuScene.prototype.renderButton = function(button, hover) {
    var textSize;
    if (hover == null) {
      hover = false;
    }
    this.renderer.ctx.fillStyle = !button.disabled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)";
    this.renderer.ctx.strokeStyle = "#000";
    if (hover) {
      this.renderer.ctx.shadowBlur = 20;
      this.renderer.ctx.shadowColor = "yellow";
    }
    this.renderer.ctx.fillRect(button.x, button.y, button.width, button.height);
    if (hover) {
      this.renderer.ctx.shadowBlur = 0;
    }
    this.renderer.ctx.strokeRect(button.x, button.y, button.width, button.height);
    this.renderer.ctx.fillStyle = "#000";
    this.renderer.ctx.font = "12px Arial, sans-serif";
    this.renderer.ctx.textBaseline = "top";
    textSize = this.renderer.ctx.measureText(button.text);
    return this.renderer.ctx.fillText(button.text, button.x + 100 - (textSize.width / 2), button.y + 7);
  };

  return MainMenuScene;

})(Scene);

module.exports = MainMenuScene;


},{"../../../vendor/iki-engine/src/Manager/AssetManager.coffee":6,"../../../vendor/iki-engine/src/Manager/AudioManager.coffee":7,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":8,"../../../vendor/iki-engine/src/Manager/InputManager.coffee":9,"../../../vendor/iki-engine/src/Manager/SceneManager.coffee":10,"../../../vendor/iki-engine/src/Scene.coffee":11,"../../../vendor/iki-engine/src/Util.coffee":12}],3:[function(require,module,exports){
var AssetManager, GraphicsManager, PreLoadScene, Scene, SceneManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require("../../../vendor/iki-engine/src/Scene.coffee");

SceneManager = require("../../../vendor/iki-engine/src/Manager/SceneManager.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

AssetManager = require("../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

PreLoadScene = (function(_super) {
  __extends(PreLoadScene, _super);

  function PreLoadScene() {
    return PreLoadScene.__super__.constructor.apply(this, arguments);
  }

  PreLoadScene.prototype.init = function() {
    return this.renderer = GraphicsManager.renderer;
  };

  PreLoadScene.prototype.activate = function() {
    var loadAsset;
    this.bar = {
      background: AssetManager.get("img/ui/loading-bar-bg.png"),
      fill: AssetManager.get("img/ui/loading-bar-fill.png"),
      x: (GraphicsManager.renderer.canvas.width / 2) - 94,
      y: (GraphicsManager.renderer.canvas.height / 2) - 22,
      width: 188,
      height: 22
    };
    this.bar.middle = this.bar.x + (this.bar.width / 2);
    this.renderer.ctx.fillStyle = "#000";
    this.renderer.ctx.fillRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);
    this.renderLoadingBar(0);
    this.renderLoadingText("Loading...");
    AssetManager.onBeforeLoad = this.onProgress.bind(this);
    AssetManager.onProgress = this.onProgress.bind(this);
    AssetManager.onError = this.onError.bind(this);
    loadAsset = AssetManager.load("assets/assets-game.json");
    return loadAsset.then(function() {
      return SceneManager.activate("main-menu");
    });
  };

  PreLoadScene.prototype.onError = function(asset) {
    var text, textSize;
    text = "Error loading " + asset.file;
    this.renderer.ctx.fillStyle = "#000";
    this.renderer.ctx.fillRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);
    this.renderer.ctx.fillStyle = "#ff4444";
    this.renderer.ctx.font = "14px Arial, sans-serif";
    this.renderer.ctx.textBaseline = "top";
    textSize = this.renderer.ctx.measureText(text);
    return this.renderer.ctx.fillText(text, this.bar.middle - (textSize.width / 2), this.bar.y + this.bar.height + 10);
  };

  PreLoadScene.prototype.onProgress = function(asset, group, loaded, total) {
    this.renderer.ctx.fillStyle = "#000";
    this.renderer.ctx.fillRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);
    this.renderLoadingText("Loading " + group);
    return this.renderLoadingBar(loaded / total);
  };

  PreLoadScene.prototype.renderLoadingText = function(text) {
    var textSize;
    this.renderer.ctx.fillStyle = "#33B5E5";
    this.renderer.ctx.font = "14px Arial, sans-serif";
    this.renderer.ctx.textBaseline = "top";
    textSize = this.renderer.ctx.measureText(text);
    return this.renderer.ctx.fillText(text, this.bar.middle - (textSize.width / 2), this.bar.y + this.bar.height + 10);
  };

  PreLoadScene.prototype.renderLoadingBar = function(percent) {
    this.renderer.ctx.drawImage(this.bar.background, this.bar.x, this.bar.y);
    return this.renderer.ctx.drawImage(this.bar.fill, this.bar.x + 6, this.bar.y, (this.bar.width - 12) * percent, this.bar.height);
  };

  return PreLoadScene;

})(Scene);

module.exports = PreLoadScene;


},{"../../../vendor/iki-engine/src/Manager/AssetManager.coffee":6,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":8,"../../../vendor/iki-engine/src/Manager/SceneManager.coffee":10,"../../../vendor/iki-engine/src/Scene.coffee":11}],4:[function(require,module,exports){
var BootScene, Engine, game;

Engine = require("../../vendor/iki-engine/src/Engine.coffee");

BootScene = require("./Scene/Boot.coffee");

game = new Engine;

game.start(new BootScene);


},{"../../vendor/iki-engine/src/Engine.coffee":5,"./Scene/Boot.coffee":1}],5:[function(require,module,exports){
var Engine, SceneManager;

SceneManager = require("./Manager/SceneManager.coffee");

Engine = (function() {
  function Engine() {
    this.lastGameTick = Date.now();
  }

  Engine.prototype.start = function(scene) {
    SceneManager.add("boot", scene);
    scene.init();
    SceneManager.activate("boot");
    return this.mainLoop();
  };

  Engine.prototype.mainLoop = function() {
    requestAnimationFrame(this.mainLoop.bind(this));
    this.currentGameTick = Date.now();
    this.delta = this.currentGameTick - this.lastGameTick;
    this.lastGameTick = this.currentGameTick;
    this.update(this.delta);
    return null;
  };

  Engine.prototype.update = function(dt) {
    var scene, system, _i, _len, _ref;
    scene = SceneManager.current();
    _ref = scene.systems;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      system = _ref[_i];
      system.update(dt);
    }
    return null;
  };

  return Engine;

})();

module.exports = Engine;


},{"./Manager/SceneManager.coffee":10}],6:[function(require,module,exports){
var AssetManager, Util;

Util = require("../Util.coffee");

AssetManager = (function() {
  function AssetManager() {}

  AssetManager.assets = {};

  AssetManager.numAssets = 0;

  AssetManager.assetsLoaded = 0;

  AssetManager.load = function(manifest) {
    var promise;
    this.numAssets = 0;
    this.assetsLoaded = 0;
    promise = new Promise(function(resolve) {
      var loadManifest;
      loadManifest = Util.loadJSON(manifest);
      return loadManifest.then(function(json) {
        var a, asset, assetGroup, groupName, i, _i, _len, _ref, _ref1, _results;
        _ref = json.assets;
        for (i in _ref) {
          assetGroup = _ref[i];
          for (_i = 0, _len = assetGroup.length; _i < _len; _i++) {
            a = assetGroup[_i];
            AssetManager.numAssets++;
          }
        }
        _ref1 = json.assets;
        _results = [];
        for (groupName in _ref1) {
          assetGroup = _ref1[groupName];
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = assetGroup.length; _j < _len1; _j++) {
              asset = assetGroup[_j];
              if (typeof AssetManager.onBeforeLoad === "function") {
                AssetManager.onBeforeLoad(asset, groupName, AssetManager.assetsLoaded, AssetManager.numAssets);
              }
              _results1.push((function(asset) {
                var assetLoad;
                if (asset.type === "image") {
                  assetLoad = Util.loadImage(json.root + asset.file);
                  assetLoad.then(function(img) {
                    return AssetManager.assetLoaded(asset, groupName, resolve, img);
                  });
                } else if (asset.type === "json") {
                  assetLoad = Util.loadJSON(json.root + asset.file);
                  assetLoad.then(function(json) {
                    return AssetManager.assetLoaded(asset, groupName, resolve, json);
                  });
                } else {
                  assetLoad = Util.load(json.root + asset.file);
                  assetLoad.then(function() {
                    return AssetManager.assetLoaded(asset, groupName, resolve);
                  });
                }
                return assetLoad["catch"](function() {
                  return AssetManager.onError(asset, groupName);
                });
              })(asset));
            }
            return _results1;
          })());
        }
        return _results;
      });
    });
    return promise;
  };

  AssetManager.assetLoaded = function(asset, groupName, resolve, data) {
    if (data) {
      AssetManager.assets[asset.file] = data;
    }
    AssetManager.assetsLoaded++;
    if (typeof AssetManager.onProgress === "function") {
      AssetManager.onProgress(asset, groupName, AssetManager.assetsLoaded, AssetManager.numAssets);
    }
    if (AssetManager.assetsLoaded === AssetManager.numAssets) {
      if (typeof AssetManager.onLoaded === "function") {
        AssetManager.onLoaded();
      }
      return resolve();
    }
  };

  AssetManager.onBeforeLoad = function(asset, group, loaded, total) {};

  AssetManager.onProgress = function(asset, group, loaded, total) {};

  AssetManager.onError = function(asset, group) {};

  AssetManager.onLoaded = function() {};

  AssetManager.get = function(asset) {
    return AssetManager.assets[asset];
  };

  return AssetManager;

})();

module.exports = AssetManager;


},{"../Util.coffee":12}],7:[function(require,module,exports){
var AudioManager;

AudioManager = (function() {
  function AudioManager() {}

  AudioManager.sounds = {};

  AudioManager.load = function(id, audioFile) {
    var sound;
    sound = document.createElement("audio");
    sound.src = audioFile;
    return AudioManager.sounds[id] = sound;
  };

  AudioManager.play = function(id) {
    var sound;
    sound = AudioManager.sounds[id];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      return sound.play();
    }
  };

  return AudioManager;

})();

module.exports = AudioManager;


},{}],8:[function(require,module,exports){
var GraphicsManager;

GraphicsManager = (function() {
  function GraphicsManager() {}

  GraphicsManager.createCanvas = function(width, height, appendTo) {
    var canvas;
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    if (appendTo) {
      appendTo.appendChild(canvas);
    }
    return canvas;
  };

  GraphicsManager.createRenderer = function(width, height, appendTo) {
    var renderer;
    renderer = {};
    renderer.canvas = GraphicsManager.createCanvas(width, height, appendTo);
    renderer.ctx = renderer.canvas.getContext("2d");
    return renderer;
  };

  GraphicsManager.fillImage = function(ctx, image, imageWidth, imageHeight, destinationWidth, destinationHeight) {
    var height, ratioDestination, ratioImage, width;
    ratioImage = imageWidth / imageHeight;
    ratioDestination = destinationWidth / destinationHeight;
    width = destinationWidth;
    height = destinationHeight;
    if (ratioDestination > ratioImage) {
      height = destinationWidth / ratioImage;
    } else {
      width = destinationHeight * ratioImage;
    }
    return ctx.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, width, height);
  };

  GraphicsManager.fitImage = function(ctx, image, imageWidth, imageHeight, destinationWidth, destinationHeight) {
    var height, ratioDestination, ratioImage, width;
    ratioImage = imageWidth / imageHeight;
    ratioDestination = destinationWidth / destinationHeight;
    width = destinationWidth;
    height = destinationHeight;
    if (ratioDestination > ratioImage) {
      width = imageWidth * destinationHeight / imageHeight;
      height = destinationHeight;
    } else {
      width = destinationWidth;
      height = imageHeight * destinationWidth / imageWidth;
    }
    return ctx.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, width, height);
  };

  return GraphicsManager;

})();

module.exports = GraphicsManager;


},{}],9:[function(require,module,exports){
var InputManager;

InputManager = (function() {
  function InputManager() {}

  InputManager.mouse = {
    x: 0,
    y: 0
  };

  InputManager.key = {
    up: false,
    down: false,
    left: false,
    right: false
  };

  InputManager.init = function() {
    document.addEventListener("click", InputManager.mouseClick);
    document.addEventListener("mousemove", InputManager.mouseMove);
    document.addEventListener("keyup", InputManager.keyUp);
    return document.addEventListener("keydown", InputManager.keyDown);
  };

  InputManager.mouseClick = function(e) {
    return typeof InputManager.onMouseClick === "function" ? InputManager.onMouseClick(e) : void 0;
  };

  InputManager.mouseMove = function(e) {
    InputManager.mouse.x = e.x;
    InputManager.mouse.y = e.y;
    return typeof InputManager.onMouseMove === "function" ? InputManager.onMouseMove(e) : void 0;
  };

  InputManager.keyUp = function(e) {
    if (e.keyCode === 38) {
      InputManager.key.up = false;
    }
    if (e.keyCode === 40) {
      InputManager.key.down = false;
    }
    if (e.keyCode === 37) {
      InputManager.key.left = false;
    }
    if (e.keyCode === 39) {
      InputManager.key.right = false;
    }
    return typeof InputManager.onKeyUp === "function" ? InputManager.onKeyUp(e) : void 0;
  };

  InputManager.keyDown = function(e) {
    if (e.keyCode === 38) {
      InputManager.key.up = true;
    }
    if (e.keyCode === 40) {
      InputManager.key.down = true;
    }
    if (e.keyCode === 37) {
      InputManager.key.left = true;
    }
    if (e.keyCode === 39) {
      InputManager.key.right = true;
    }
    return typeof InputManager.onKeyDown === "function" ? InputManager.onKeyDown(e) : void 0;
  };

  InputManager.onMouseClick = function(e) {};

  InputManager.onMouseMove = function(e) {};

  InputManager.onKeyUp = function(e) {};

  InputManager.onKeyDown = function(e) {};

  return InputManager;

})();

module.exports = InputManager;


},{}],10:[function(require,module,exports){
var SceneManager;

SceneManager = (function() {
  function SceneManager() {}

  SceneManager.currentScene = "boot";

  SceneManager.scenes = {};

  SceneManager.add = function(name, scene) {
    SceneManager.scenes[name] = scene;
    return null;
  };

  SceneManager.current = function() {
    return SceneManager.scenes[SceneManager.currentScene];
  };

  SceneManager.activate = function(name) {
    var old, _ref;
    old = SceneManager.current();
    if (old) {
      old.deactivate();
    }
    SceneManager.currentScene = name;
    SceneManager.onActivate(name);
    if ((_ref = SceneManager.current()) != null) {
      _ref.activate();
    }
    return null;
  };

  SceneManager.onActivate = function(name) {};

  return SceneManager;

})();

module.exports = SceneManager;


},{}],11:[function(require,module,exports){
var Scene;

Scene = (function() {
  function Scene() {
    this.systems = [];
  }

  Scene.prototype.addSystem = function(system) {
    this.systems.push(system);
    return system;
  };

  Scene.prototype.init = function() {};

  Scene.prototype.activate = function() {};

  Scene.prototype.deactivate = function() {};

  return Scene;

})();

module.exports = Scene;


},{}],12:[function(require,module,exports){
var Util;

Util = (function() {
  function Util() {}

  Util.loadJSON = function(url) {
    return Util.load(url).then(JSON.parse);
  };

  Util.load = function(url) {
    var promise;
    promise = new Promise(function(resolve, reject) {
      var xhr;
      xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.addEventListener("readystatechange", function() {
        var _ref;
        if (xhr.readyState === 4) {
          if ((_ref = xhr.status) === 200 || _ref === 304) {
            return resolve(xhr.responseText);
          } else {
            return reject("error");
          }
        }
      });
      return xhr.send();
    });
    return promise;
  };

  Util.loadImage = function(src) {
    var promise;
    promise = new Promise(function(resolve, reject) {
      var image;
      image = new Image();
      image.addEventListener("load", function() {
        return resolve(this);
      });
      image.addEventListener("error", function() {
        return reject("error");
      });
      image.src = src;
      if (image.complete) {
        return resolve(image);
      }
    });
    return promise;
  };

  Util.pluralise = function(word) {
    var l1, l2, len;
    len = word.length;
    l1 = word.substr(-1);
    l2 = word.substr(-2);
    if (l1 === "y") {
      word = word.substr(0, len - 1) + "ies";
    } else if (l1 === "s" || l1 === "x" || l2 === "ch" || l2 === "sh" || l2 === "es") {
      word = word + "es";
    } else {
      word = word + "s";
    }
    return word;
  };

  return Util;

})();

module.exports = Util;


},{}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxnYW1lXFxTY2VuZVxcQm9vdC5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZ2FtZVxcU2NlbmVcXE1haW5NZW51LmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxnYW1lXFxTY2VuZVxcUHJlTG9hZC5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZ2FtZVxcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxFbmdpbmUuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcQXNzZXRNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXEF1ZGlvTWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxNYW5hZ2VyXFxHcmFwaGljc01hbmFnZXIuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcSW5wdXRNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXFNjZW5lTWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxTY2VuZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxVdGlsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUEsd0dBQUE7RUFBQTtpU0FBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLDZDQUFSLENBQVIsQ0FBQTs7QUFBQSxZQUNBLEdBQWUsT0FBQSxDQUFRLDREQUFSLENBRGYsQ0FBQTs7QUFBQSxlQUVBLEdBQWtCLE9BQUEsQ0FBUSwrREFBUixDQUZsQixDQUFBOztBQUFBLFlBR0EsR0FBZSxPQUFBLENBQVEsNERBQVIsQ0FIZixDQUFBOztBQUFBLFlBSUEsR0FBZSxPQUFBLENBQVEsNERBQVIsQ0FKZixDQUFBOztBQUFBLFlBUUEsR0FBZSxPQUFBLENBQVEsa0JBQVIsQ0FSZixDQUFBOztBQUFBLGFBU0EsR0FBZ0IsT0FBQSxDQUFRLG1CQUFSLENBVGhCLENBQUE7O0FBQUE7QUFhSSw4QkFBQSxDQUFBOzs7O0dBQUE7O0FBQUEsc0JBQUEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUVGLFFBQUEsMkJBQUE7QUFBQSxJQUFBLGVBQWUsQ0FBQyxRQUFoQixHQUEyQixlQUFlLENBQUMsY0FBaEIsQ0FBK0IsR0FBL0IsRUFBb0MsR0FBcEMsRUFBeUMsUUFBUSxDQUFDLElBQWxELENBQTNCLENBQUE7QUFBQSxJQUNBLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQWhDLEdBQXdDLE1BQU0sQ0FBQyxVQUQvQyxDQUFBO0FBQUEsSUFFQSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFoQyxHQUF5QyxNQUFNLENBQUMsV0FGaEQsQ0FBQTtBQUFBLElBSUEsWUFBWSxDQUFDLElBQWIsQ0FBQSxDQUpBLENBQUE7QUFBQSxJQU1BLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxTQUFBLEdBQUE7QUFDOUIsTUFBQSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFoQyxHQUF3QyxNQUFNLENBQUMsVUFBL0MsQ0FBQTthQUNBLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQWhDLEdBQXlDLE1BQU0sQ0FBQyxZQUZsQjtJQUFBLENBQWxDLENBTkEsQ0FBQTtBQUFBLElBV0EsWUFBQSxHQUFtQixJQUFBLFlBQUEsQ0FBQSxDQVhuQixDQUFBO0FBQUEsSUFZQSxZQUFZLENBQUMsR0FBYixDQUFpQixTQUFqQixFQUE0QixZQUE1QixDQVpBLENBQUE7QUFBQSxJQWFBLFlBQVksQ0FBQyxJQUFiLENBQUEsQ0FiQSxDQUFBO0FBQUEsSUFlQSxhQUFBLEdBQW9CLElBQUEsYUFBQSxDQUFBLENBZnBCLENBQUE7QUFBQSxJQWdCQSxZQUFZLENBQUMsR0FBYixDQUFpQixXQUFqQixFQUE4QixhQUE5QixDQWhCQSxDQUFBO1dBaUJBLGFBQWEsQ0FBQyxJQUFkLENBQUEsRUFuQkU7RUFBQSxDQUFOLENBQUE7O0FBQUEsc0JBc0JBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDTixRQUFBLFNBQUE7QUFBQSxJQUFBLFNBQUEsR0FBWSxZQUFZLENBQUMsSUFBYixDQUFrQix5QkFBbEIsQ0FBWixDQUFBO1dBQ0EsU0FBUyxDQUFDLElBQVYsQ0FBZSxTQUFBLEdBQUE7YUFBRyxZQUFZLENBQUMsUUFBYixDQUFzQixTQUF0QixFQUFIO0lBQUEsQ0FBZixFQUZNO0VBQUEsQ0F0QlYsQ0FBQTs7bUJBQUE7O0dBRG9CLE1BWnhCLENBQUE7O0FBQUEsTUF3Q00sQ0FBQyxPQUFQLEdBQWlCLFNBeENqQixDQUFBOzs7O0FDQUEsSUFBQSxtR0FBQTtFQUFBO2lTQUFBOztBQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsNkNBQVIsQ0FBUixDQUFBOztBQUFBLElBQ0EsR0FBTyxPQUFBLENBQVEsNENBQVIsQ0FEUCxDQUFBOztBQUFBLFlBRUEsR0FBZSxPQUFBLENBQVEsNERBQVIsQ0FGZixDQUFBOztBQUFBLGVBR0EsR0FBa0IsT0FBQSxDQUFRLCtEQUFSLENBSGxCLENBQUE7O0FBQUEsWUFJQSxHQUFlLE9BQUEsQ0FBUSw0REFBUixDQUpmLENBQUE7O0FBQUEsWUFLQSxHQUFlLE9BQUEsQ0FBUSw0REFBUixDQUxmLENBQUE7O0FBQUEsWUFNQSxHQUFlLE9BQUEsQ0FBUSw0REFBUixDQU5mLENBQUE7O0FBQUE7QUFTSSxrQ0FBQSxDQUFBOzs7O0dBQUE7O0FBQUEsMEJBQUEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUNGLElBQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxFQUFULENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxRQUFELEdBQVksZUFBZSxDQUFDLFFBRDVCLENBQUE7QUFBQSxJQUVBLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUMsQ0FBQSxZQUFZLENBQUMsSUFBZCxDQUFtQixJQUFuQixDQUZqQixDQUFBO0FBQUEsSUFLQSxJQUFDLENBQUEsV0FBRCxHQUFlLFdBTGYsQ0FBQTtBQUFBLElBT0EsWUFBWSxDQUFDLElBQWIsQ0FBa0IsYUFBbEIsRUFBaUMsMkNBQWpDLENBUEEsQ0FBQTtBQUFBLElBUUEsWUFBWSxDQUFDLElBQWIsQ0FBa0IsV0FBbEIsRUFBK0IseUNBQS9CLENBUkEsQ0FBQTtBQUFBLElBV0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSw2QkFBVixDQVhBLENBQUE7V0FZQSxJQUFDLENBQUEsUUFBRCxDQUFVLGlDQUFWLEVBYkU7RUFBQSxDQUFOLENBQUE7O0FBQUEsMEJBZ0JBLFFBQUEsR0FBVSxTQUFDLFFBQUQsR0FBQTtBQUNOLFFBQUEsR0FBQTtBQUFBLElBQUEsR0FBQSxHQUFNLElBQUksQ0FBQyxRQUFMLENBQWMsUUFBZCxDQUFOLENBQUE7V0FDQSxHQUFHLENBQUMsSUFBSixDQUFTLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxDQUFnQixJQUFoQixDQUFULEVBRk07RUFBQSxDQWhCVixDQUFBOztBQUFBLDBCQXFCQSxTQUFBLEdBQVcsU0FBQyxRQUFELEdBQUE7QUFDUCxRQUFBLGlDQUFBO0FBQUEsSUFBQSxJQUFDLENBQUEsS0FBTSxDQUFBLFFBQVEsQ0FBQyxFQUFULENBQVAsR0FBc0I7QUFBQSxNQUNsQixFQUFBLEVBQUksUUFBUSxDQUFDLEVBREs7QUFBQSxNQUVsQixVQUFBLEVBQVksUUFBUSxDQUFDLFVBRkg7QUFBQSxNQUdsQixRQUFBLEVBQVUsRUFIUTtBQUFBLE1BSWxCLE9BQUEsRUFBUyxFQUpTO0tBQXRCLENBQUE7QUFPQTtBQUFBO1NBQUEsMkNBQUE7eUJBQUE7QUFFSSxNQUFBLElBQUcsT0FBTyxDQUFDLElBQVIsS0FBZ0IsUUFBbkI7c0JBQ0ksSUFBQyxDQUFBLFNBQUQsQ0FBVyxRQUFRLENBQUMsRUFBcEIsRUFBd0IsT0FBeEIsR0FESjtPQUFBLE1BQUE7OEJBQUE7T0FGSjtBQUFBO29CQVJPO0VBQUEsQ0FyQlgsQ0FBQTs7QUFBQSwwQkFtQ0EsU0FBQSxHQUFXLFNBQUMsSUFBRCxFQUFPLEdBQVAsR0FBQTtBQUNQLFFBQUEsZUFBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQVYsQ0FBQTtBQUVBLElBQUEsSUFBRyxHQUFHLENBQUMsVUFBSixLQUFrQixZQUFyQjtBQUF1QyxNQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsVUFBVSxDQUFDLElBQVosQ0FBaUIsSUFBakIsRUFBb0IsR0FBRyxDQUFDLE1BQXhCLEVBQWdDLEdBQUcsQ0FBQyxNQUFwQyxDQUFWLENBQXZDO0tBRkE7QUFHQSxJQUFBLElBQUcsR0FBRyxDQUFDLFVBQUosS0FBa0IsYUFBckI7QUFBd0MsTUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLFdBQVcsQ0FBQyxJQUFiLENBQWtCLElBQWxCLEVBQXFCLEdBQUcsQ0FBQyxNQUF6QixFQUFpQyxHQUFHLENBQUMsTUFBckMsQ0FBVixDQUF4QztLQUhBO0FBQUEsSUFLQSxNQUFBLEdBQ0k7QUFBQSxNQUFBLElBQUEsRUFBTSxHQUFHLENBQUMsSUFBVjtBQUFBLE1BQ0EsQ0FBQSxFQUFHLEdBQUcsQ0FBQyxDQURQO0FBQUEsTUFFQSxDQUFBLEVBQUcsR0FBRyxDQUFDLENBRlA7QUFBQSxNQUdBLEtBQUEsRUFBTyxHQUFHLENBQUMsS0FIWDtBQUFBLE1BSUEsTUFBQSxFQUFRLEdBQUcsQ0FBQyxNQUpaO0FBQUEsTUFLQSxRQUFBLEVBQVUsR0FBRyxDQUFDLFFBTGQ7QUFBQSxNQU1BLEtBQUEsRUFBTyxPQU5QO0tBTkosQ0FBQTtBQWNBLElBQUEsSUFBRyxDQUFBLElBQUssQ0FBQSxLQUFNLENBQUEsSUFBQSxDQUFkO0FBQXlCLE1BQUEsSUFBQyxDQUFBLEtBQU0sQ0FBQSxJQUFBLENBQVAsR0FBZSxFQUFmLENBQXpCO0tBZEE7QUFlQSxJQUFBLElBQUcsQ0FBQSxJQUFLLENBQUEsS0FBTSxDQUFBLElBQUEsQ0FBSyxDQUFDLE9BQXBCO0FBQWlDLE1BQUEsSUFBQyxDQUFBLEtBQU0sQ0FBQSxJQUFBLENBQUssQ0FBQyxPQUFiLEdBQXVCLEVBQXZCLENBQWpDO0tBZkE7V0FnQkEsSUFBQyxDQUFBLEtBQU0sQ0FBQSxJQUFBLENBQUssQ0FBQyxPQUFPLENBQUMsSUFBckIsQ0FBMEIsTUFBMUIsRUFqQk87RUFBQSxDQW5DWCxDQUFBOztBQUFBLDBCQXVEQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ04sSUFBQSxJQUFDLENBQUEsVUFBRCxHQUFjLFlBQVksQ0FBQyxHQUFiLENBQWlCLDZCQUFqQixDQUFkLENBQUE7QUFBQSxJQUNBLFlBQVksQ0FBQyxZQUFiLEdBQTRCLElBQUMsQ0FBQSxZQUFZLENBQUMsSUFBZCxDQUFtQixJQUFuQixDQUQ1QixDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsV0FBRCxHQUFlLFdBRmYsQ0FBQTtXQUdBLElBQUMsQ0FBQSxVQUFELENBQUEsRUFKTTtFQUFBLENBdkRWLENBQUE7O0FBQUEsMEJBNkRBLFVBQUEsR0FBWSxTQUFBLEdBQUE7V0FBRyxZQUFZLENBQUMsWUFBYixHQUE0QixLQUEvQjtFQUFBLENBN0RaLENBQUE7O0FBQUEsMEJBK0RBLFVBQUEsR0FBWSxTQUFDLE9BQUQsRUFBVSxNQUFWLEdBQUE7O01BQVUsU0FBUztLQUMzQjtBQUFBLElBQUEsSUFBRyxNQUFIO0FBQ0ksTUFBQSxZQUFZLENBQUMsSUFBYixDQUFrQixXQUFsQixDQUFBLENBREo7S0FBQSxNQUFBO0FBR0ksTUFBQSxZQUFZLENBQUMsSUFBYixDQUFrQixhQUFsQixDQUFBLENBSEo7S0FBQTtBQUFBLElBS0EsSUFBQyxDQUFBLFdBQUQsR0FBZSxPQUxmLENBQUE7V0FNQSxJQUFDLENBQUEsVUFBRCxDQUFBLEVBUFE7RUFBQSxDQS9EWixDQUFBOztBQUFBLDBCQXdFQSxXQUFBLEdBQWEsU0FBQyxLQUFELEdBQUE7QUFDVCxJQUFBLFlBQVksQ0FBQyxJQUFiLENBQWtCLGFBQWxCLENBQUEsQ0FBQTtXQUNBLFlBQVksQ0FBQyxRQUFiLENBQXNCLEtBQXRCLEVBRlM7RUFBQSxDQXhFYixDQUFBOztBQUFBLDBCQTRFQSxZQUFBLEdBQWMsU0FBQyxDQUFELEdBQUE7QUFDVixRQUFBLE1BQUE7QUFBQSxJQUFBLE1BQUEsR0FBUyxJQUFDLENBQUEsa0JBQUQsQ0FBb0IsQ0FBQyxDQUFDLENBQXRCLEVBQXlCLENBQUMsQ0FBQyxDQUEzQixDQUFULENBQUE7QUFDQSxJQUFBLElBQUcsTUFBSDtrREFBZSxNQUFNLENBQUMsaUJBQXRCO0tBRlU7RUFBQSxDQTVFZCxDQUFBOztBQUFBLDBCQWdGQSxrQkFBQSxHQUFvQixTQUFDLENBQUQsRUFBSSxDQUFKLEdBQUE7QUFDaEIsUUFBQSw0QkFBQTtBQUFBLElBQUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxLQUFNLENBQUEsSUFBQyxDQUFBLFdBQUQsQ0FBZCxDQUFBO0FBQ0E7QUFBQSxTQUFBLDJDQUFBO3dCQUFBO0FBQ0ksTUFBQSxJQUFHLElBQUMsQ0FBQSxhQUFELENBQWUsQ0FBZixFQUFrQixDQUFsQixFQUFxQixNQUFNLENBQUMsQ0FBNUIsRUFBK0IsTUFBTSxDQUFDLENBQXRDLEVBQXlDLE1BQU0sQ0FBQyxLQUFoRCxFQUF1RCxNQUFNLENBQUMsTUFBOUQsQ0FBSDtBQUNJLGVBQU8sTUFBUCxDQURKO09BREo7QUFBQSxLQUZnQjtFQUFBLENBaEZwQixDQUFBOztBQUFBLDBCQXNGQSxhQUFBLEdBQWUsU0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLEVBQVAsRUFBVyxFQUFYLEVBQWUsRUFBZixFQUFtQixFQUFuQixHQUFBO0FBQTBCLFdBQU8sQ0FBQSxJQUFLLEVBQUwsSUFBVyxDQUFBLElBQUssRUFBQSxHQUFLLEVBQXJCLElBQTJCLENBQUEsSUFBSyxFQUFoQyxJQUFzQyxDQUFBLElBQUssRUFBQSxHQUFLLEVBQXZELENBQTFCO0VBQUEsQ0F0RmYsQ0FBQTs7QUFBQSwwQkF3RkEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNSLFFBQUEsc0NBQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxnQkFBRCxDQUFBLENBQUEsQ0FBQTtBQUFBLElBQ0EsSUFBQSxHQUFPLElBQUMsQ0FBQSxLQUFNLENBQUEsSUFBQyxDQUFBLFdBQUQsQ0FEZCxDQUFBO0FBRUE7QUFBQTtTQUFBLDJDQUFBO3dCQUFBO0FBQ0ksb0JBQUEsSUFBQyxDQUFBLFlBQUQsQ0FBYyxNQUFkLEVBQUEsQ0FESjtBQUFBO29CQUhRO0VBQUEsQ0F4RlosQ0FBQTs7QUFBQSwwQkE4RkEsZ0JBQUEsR0FBa0IsU0FBQSxHQUFBO1dBQ2QsZUFBZSxDQUFDLFNBQWhCLENBQTBCLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBcEMsRUFBeUMsSUFBQyxDQUFBLFVBQTFDLEVBQ0ksSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQURoQixFQUN1QixJQUFDLENBQUEsVUFBVSxDQUFDLE1BRG5DLEVBRUksSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FGckIsRUFFNEIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFGN0MsRUFEYztFQUFBLENBOUZsQixDQUFBOztBQUFBLDBCQW1HQSxZQUFBLEdBQWMsU0FBQyxNQUFELEVBQVMsS0FBVCxHQUFBO0FBQ1YsUUFBQSxRQUFBOztNQURtQixRQUFRO0tBQzNCO0FBQUEsSUFBQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFkLEdBQTBCLENBQUEsTUFBYSxDQUFDLFFBQWQsR0FBNEIsdUJBQTVCLEdBQXlELHVCQUFuRixDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFkLEdBQTRCLE1BRDVCLENBQUE7QUFHQSxJQUFBLElBQUcsS0FBSDtBQUNJLE1BQUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBZCxHQUEyQixFQUEzQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFkLEdBQTRCLFFBRDVCLENBREo7S0FIQTtBQUFBLElBT0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBZCxDQUF1QixNQUFNLENBQUMsQ0FBOUIsRUFBaUMsTUFBTSxDQUFDLENBQXhDLEVBQTJDLE1BQU0sQ0FBQyxLQUFsRCxFQUF5RCxNQUFNLENBQUMsTUFBaEUsQ0FQQSxDQUFBO0FBU0EsSUFBQSxJQUFnQyxLQUFoQztBQUFBLE1BQUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBZCxHQUEyQixDQUEzQixDQUFBO0tBVEE7QUFBQSxJQVdBLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQWQsQ0FBeUIsTUFBTSxDQUFDLENBQWhDLEVBQW1DLE1BQU0sQ0FBQyxDQUExQyxFQUE2QyxNQUFNLENBQUMsS0FBcEQsRUFBMkQsTUFBTSxDQUFDLE1BQWxFLENBWEEsQ0FBQTtBQUFBLElBYUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBZCxHQUEwQixNQWIxQixDQUFBO0FBQUEsSUFjQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFkLEdBQXFCLHdCQWRyQixDQUFBO0FBQUEsSUFlQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFkLEdBQTZCLEtBZjdCLENBQUE7QUFBQSxJQWdCQSxRQUFBLEdBQVcsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBZCxDQUEwQixNQUFNLENBQUMsSUFBakMsQ0FoQlgsQ0FBQTtXQWlCQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFkLENBQXVCLE1BQU0sQ0FBQyxJQUE5QixFQUFvQyxNQUFNLENBQUMsQ0FBUCxHQUFXLEdBQVgsR0FBaUIsQ0FBQyxRQUFRLENBQUMsS0FBVCxHQUFpQixDQUFsQixDQUFyRCxFQUEyRSxNQUFNLENBQUMsQ0FBUCxHQUFXLENBQXRGLEVBbEJVO0VBQUEsQ0FuR2QsQ0FBQTs7dUJBQUE7O0dBRHdCLE1BUjVCLENBQUE7O0FBQUEsTUFpSU0sQ0FBQyxPQUFQLEdBQWlCLGFBaklqQixDQUFBOzs7O0FDQUEsSUFBQSxnRUFBQTtFQUFBO2lTQUFBOztBQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsNkNBQVIsQ0FBUixDQUFBOztBQUFBLFlBQ0EsR0FBZSxPQUFBLENBQVEsNERBQVIsQ0FEZixDQUFBOztBQUFBLGVBRUEsR0FBa0IsT0FBQSxDQUFRLCtEQUFSLENBRmxCLENBQUE7O0FBQUEsWUFHQSxHQUFlLE9BQUEsQ0FBUSw0REFBUixDQUhmLENBQUE7O0FBQUE7QUFPSSxpQ0FBQSxDQUFBOzs7O0dBQUE7O0FBQUEseUJBQUEsSUFBQSxHQUFNLFNBQUEsR0FBQTtXQUNGLElBQUMsQ0FBQSxRQUFELEdBQVksZUFBZSxDQUFDLFNBRDFCO0VBQUEsQ0FBTixDQUFBOztBQUFBLHlCQUlBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDTixRQUFBLFNBQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxHQUFELEdBQ0k7QUFBQSxNQUFBLFVBQUEsRUFBWSxZQUFZLENBQUMsR0FBYixDQUFpQiwyQkFBakIsQ0FBWjtBQUFBLE1BQ0EsSUFBQSxFQUFNLFlBQVksQ0FBQyxHQUFiLENBQWlCLDZCQUFqQixDQUROO0FBQUEsTUFFQSxDQUFBLEVBQUcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFoQyxHQUF3QyxDQUF6QyxDQUFBLEdBQThDLEVBRmpEO0FBQUEsTUFHQSxDQUFBLEVBQUcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFoQyxHQUF5QyxDQUExQyxDQUFBLEdBQStDLEVBSGxEO0FBQUEsTUFJQSxLQUFBLEVBQU8sR0FKUDtBQUFBLE1BS0EsTUFBQSxFQUFRLEVBTFI7S0FESixDQUFBO0FBQUEsSUFRQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsR0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLENBQUwsR0FBUyxDQUFDLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxHQUFhLENBQWQsQ0FSdkIsQ0FBQTtBQUFBLElBVUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBZCxHQUEwQixNQVYxQixDQUFBO0FBQUEsSUFXQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFkLENBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQTlDLEVBQXFELElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQXRFLENBWEEsQ0FBQTtBQUFBLElBYUEsSUFBQyxDQUFBLGdCQUFELENBQWtCLENBQWxCLENBYkEsQ0FBQTtBQUFBLElBY0EsSUFBQyxDQUFBLGlCQUFELENBQW1CLFlBQW5CLENBZEEsQ0FBQTtBQUFBLElBZ0JBLFlBQVksQ0FBQyxZQUFiLEdBQTRCLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFpQixJQUFqQixDQWhCNUIsQ0FBQTtBQUFBLElBaUJBLFlBQVksQ0FBQyxVQUFiLEdBQTBCLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFpQixJQUFqQixDQWpCMUIsQ0FBQTtBQUFBLElBa0JBLFlBQVksQ0FBQyxPQUFiLEdBQXVCLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLElBQWQsQ0FsQnZCLENBQUE7QUFBQSxJQW9CQSxTQUFBLEdBQVksWUFBWSxDQUFDLElBQWIsQ0FBa0IseUJBQWxCLENBcEJaLENBQUE7V0FxQkEsU0FBUyxDQUFDLElBQVYsQ0FBZSxTQUFBLEdBQUE7YUFBRyxZQUFZLENBQUMsUUFBYixDQUFzQixXQUF0QixFQUFIO0lBQUEsQ0FBZixFQXRCTTtFQUFBLENBSlYsQ0FBQTs7QUFBQSx5QkE2QkEsT0FBQSxHQUFTLFNBQUMsS0FBRCxHQUFBO0FBQ0wsUUFBQSxjQUFBO0FBQUEsSUFBQSxJQUFBLEdBQVEsZ0JBQUEsR0FBZSxLQUFLLENBQUMsSUFBN0IsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBZCxHQUEwQixNQUQxQixDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFkLENBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQTlDLEVBQXFELElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQXRFLENBRkEsQ0FBQTtBQUFBLElBR0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBZCxHQUEwQixTQUgxQixDQUFBO0FBQUEsSUFJQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFkLEdBQXFCLHdCQUpyQixDQUFBO0FBQUEsSUFLQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFkLEdBQTZCLEtBTDdCLENBQUE7QUFBQSxJQU1BLFFBQUEsR0FBVyxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFkLENBQTBCLElBQTFCLENBTlgsQ0FBQTtXQU9BLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQWQsQ0FBdUIsSUFBdkIsRUFBNkIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEdBQWMsQ0FBQyxRQUFRLENBQUMsS0FBVCxHQUFpQixDQUFsQixDQUEzQyxFQUFpRSxJQUFDLENBQUEsR0FBRyxDQUFDLENBQUwsR0FBUyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQWQsR0FBdUIsRUFBeEYsRUFSSztFQUFBLENBN0JULENBQUE7O0FBQUEseUJBd0NBLFVBQUEsR0FBWSxTQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixLQUF2QixHQUFBO0FBQ1IsSUFBQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFkLEdBQTBCLE1BQTFCLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQWQsQ0FBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBOUMsRUFBcUQsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBdEUsQ0FEQSxDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsaUJBQUQsQ0FBb0IsVUFBQSxHQUFTLEtBQTdCLENBRkEsQ0FBQTtXQUdBLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixNQUFBLEdBQVMsS0FBM0IsRUFKUTtFQUFBLENBeENaLENBQUE7O0FBQUEseUJBK0NBLGlCQUFBLEdBQW1CLFNBQUMsSUFBRCxHQUFBO0FBQ2YsUUFBQSxRQUFBO0FBQUEsSUFBQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFkLEdBQTBCLFNBQTFCLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLElBQWQsR0FBcUIsd0JBRHJCLENBQUE7QUFBQSxJQUVBLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQWQsR0FBNkIsS0FGN0IsQ0FBQTtBQUFBLElBR0EsUUFBQSxHQUFXLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQWQsQ0FBMEIsSUFBMUIsQ0FIWCxDQUFBO1dBSUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBZCxDQUF1QixJQUF2QixFQUE2QixJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsR0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFULEdBQWlCLENBQWxCLENBQTNDLEVBQWlFLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBTCxHQUFTLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBZCxHQUF1QixFQUF4RixFQUxlO0VBQUEsQ0EvQ25CLENBQUE7O0FBQUEseUJBd0RBLGdCQUFBLEdBQWtCLFNBQUMsT0FBRCxHQUFBO0FBRWQsSUFBQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFkLENBQXdCLElBQUMsQ0FBQSxHQUFHLENBQUMsVUFBN0IsRUFBeUMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxDQUE5QyxFQUFpRCxJQUFDLENBQUEsR0FBRyxDQUFDLENBQXRELENBQUEsQ0FBQTtXQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQWQsQ0FBd0IsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUE3QixFQUNRLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBTCxHQUFTLENBRGpCLEVBQ29CLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FEekIsRUFFUSxDQUFDLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxHQUFhLEVBQWQsQ0FBQSxHQUFvQixPQUY1QixFQUVxQyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BRjFDLEVBSGM7RUFBQSxDQXhEbEIsQ0FBQTs7c0JBQUE7O0dBRHVCLE1BTjNCLENBQUE7O0FBQUEsTUF1RU0sQ0FBQyxPQUFQLEdBQWlCLFlBdkVqQixDQUFBOzs7O0FDQUEsSUFBQSx1QkFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLDJDQUFSLENBQVQsQ0FBQTs7QUFBQSxTQUVBLEdBQVksT0FBQSxDQUFRLHFCQUFSLENBRlosQ0FBQTs7QUFBQSxJQUlBLEdBQU8sR0FBQSxDQUFBLE1BSlAsQ0FBQTs7QUFBQSxJQUtJLENBQUMsS0FBTCxDQUFXLEdBQUEsQ0FBQSxTQUFYLENBTEEsQ0FBQTs7OztBQ0FBLElBQUEsb0JBQUE7O0FBQUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSwrQkFBUixDQUFmLENBQUE7O0FBQUE7QUFHaUIsRUFBQSxnQkFBQSxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsWUFBRCxHQUFnQixJQUFJLENBQUMsR0FBTCxDQUFBLENBQWhCLENBRFM7RUFBQSxDQUFiOztBQUFBLG1CQUdBLEtBQUEsR0FBTyxTQUFDLEtBQUQsR0FBQTtBQUNILElBQUEsWUFBWSxDQUFDLEdBQWIsQ0FBaUIsTUFBakIsRUFBeUIsS0FBekIsQ0FBQSxDQUFBO0FBQUEsSUFDQSxLQUFLLENBQUMsSUFBTixDQUFBLENBREEsQ0FBQTtBQUFBLElBRUEsWUFBWSxDQUFDLFFBQWIsQ0FBc0IsTUFBdEIsQ0FGQSxDQUFBO1dBR0EsSUFBQyxDQUFBLFFBQUQsQ0FBQSxFQUpHO0VBQUEsQ0FIUCxDQUFBOztBQUFBLG1CQVNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDTixJQUFBLHFCQUFBLENBQXNCLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLElBQWYsQ0FBdEIsQ0FBQSxDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsZUFBRCxHQUFtQixJQUFJLENBQUMsR0FBTCxDQUFBLENBRm5CLENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLGVBQUQsR0FBbUIsSUFBQyxDQUFBLFlBSDdCLENBQUE7QUFBQSxJQUlBLElBQUMsQ0FBQSxZQUFELEdBQWdCLElBQUMsQ0FBQSxlQUpqQixDQUFBO0FBQUEsSUFNQSxJQUFDLENBQUEsTUFBRCxDQUFRLElBQUMsQ0FBQSxLQUFULENBTkEsQ0FBQTtBQU9BLFdBQU8sSUFBUCxDQVJNO0VBQUEsQ0FUVixDQUFBOztBQUFBLG1CQW1CQSxNQUFBLEdBQVEsU0FBQyxFQUFELEdBQUE7QUFDSixRQUFBLDZCQUFBO0FBQUEsSUFBQSxLQUFBLEdBQVEsWUFBWSxDQUFDLE9BQWIsQ0FBQSxDQUFSLENBQUE7QUFFQTtBQUFBLFNBQUEsMkNBQUE7d0JBQUE7QUFDSSxNQUFBLE1BQU0sQ0FBQyxNQUFQLENBQWMsRUFBZCxDQUFBLENBREo7QUFBQSxLQUZBO0FBSUEsV0FBTyxJQUFQLENBTEk7RUFBQSxDQW5CUixDQUFBOztnQkFBQTs7SUFISixDQUFBOztBQUFBLE1BOEJNLENBQUMsT0FBUCxHQUFpQixNQTlCakIsQ0FBQTs7OztBQ0FBLElBQUEsa0JBQUE7O0FBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxnQkFBUixDQUFQLENBQUE7O0FBQUE7NEJBR0k7O0FBQUEsRUFBQSxZQUFDLENBQUEsTUFBRCxHQUFVLEVBQVYsQ0FBQTs7QUFBQSxFQUNBLFlBQUMsQ0FBQSxTQUFELEdBQWEsQ0FEYixDQUFBOztBQUFBLEVBRUEsWUFBQyxDQUFBLFlBQUQsR0FBZ0IsQ0FGaEIsQ0FBQTs7QUFBQSxFQUlBLFlBQUMsQ0FBQSxJQUFELEdBQU8sU0FBQyxRQUFELEdBQUE7QUFDSCxRQUFBLE9BQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxTQUFELEdBQWEsQ0FBYixDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsWUFBRCxHQUFnQixDQURoQixDQUFBO0FBQUEsSUFHQSxPQUFBLEdBQWMsSUFBQSxPQUFBLENBQVEsU0FBQyxPQUFELEdBQUE7QUFDbEIsVUFBQSxZQUFBO0FBQUEsTUFBQSxZQUFBLEdBQWUsSUFBSSxDQUFDLFFBQUwsQ0FBYyxRQUFkLENBQWYsQ0FBQTthQUNBLFlBQVksQ0FBQyxJQUFiLENBQWtCLFNBQUMsSUFBRCxHQUFBO0FBQ2QsWUFBQSxtRUFBQTtBQUFBO0FBQUEsYUFBQSxTQUFBOytCQUFBO0FBQ0ksZUFBQSxpREFBQTsrQkFBQTtBQUNJLFlBQUEsWUFBWSxDQUFDLFNBQWIsRUFBQSxDQURKO0FBQUEsV0FESjtBQUFBLFNBQUE7QUFJQTtBQUFBO2FBQUEsa0JBQUE7d0NBQUE7QUFDSTs7QUFBQTtpQkFBQSxtREFBQTtxQ0FBQTs7Z0JBQ0ksWUFBWSxDQUFDLGFBQWMsT0FDdkIsV0FDQSxZQUFZLENBQUMsY0FDYixZQUFZLENBQUM7ZUFIakI7QUFBQSw2QkFLRyxDQUFBLFNBQUMsS0FBRCxHQUFBO0FBRUMsb0JBQUEsU0FBQTtBQUFBLGdCQUFBLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBYyxPQUFqQjtBQUNJLGtCQUFBLFNBQUEsR0FBWSxJQUFJLENBQUMsU0FBTCxDQUFlLElBQUksQ0FBQyxJQUFMLEdBQVksS0FBSyxDQUFDLElBQWpDLENBQVosQ0FBQTtBQUFBLGtCQUNBLFNBQVMsQ0FBQyxJQUFWLENBQWUsU0FBQyxHQUFELEdBQUE7MkJBQVMsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsS0FBekIsRUFBZ0MsU0FBaEMsRUFBMkMsT0FBM0MsRUFBb0QsR0FBcEQsRUFBVDtrQkFBQSxDQUFmLENBREEsQ0FESjtpQkFBQSxNQUdLLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBYyxNQUFqQjtBQUNELGtCQUFBLFNBQUEsR0FBWSxJQUFJLENBQUMsUUFBTCxDQUFjLElBQUksQ0FBQyxJQUFMLEdBQVksS0FBSyxDQUFDLElBQWhDLENBQVosQ0FBQTtBQUFBLGtCQUNBLFNBQVMsQ0FBQyxJQUFWLENBQWUsU0FBQyxJQUFELEdBQUE7MkJBQVUsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsS0FBekIsRUFBZ0MsU0FBaEMsRUFBMkMsT0FBM0MsRUFBb0QsSUFBcEQsRUFBVjtrQkFBQSxDQUFmLENBREEsQ0FEQztpQkFBQSxNQUFBO0FBSUQsa0JBQUEsU0FBQSxHQUFZLElBQUksQ0FBQyxJQUFMLENBQVUsSUFBSSxDQUFDLElBQUwsR0FBWSxLQUFLLENBQUMsSUFBNUIsQ0FBWixDQUFBO0FBQUEsa0JBQ0EsU0FBUyxDQUFDLElBQVYsQ0FBZSxTQUFBLEdBQUE7MkJBQUcsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsS0FBekIsRUFBZ0MsU0FBaEMsRUFBMkMsT0FBM0MsRUFBSDtrQkFBQSxDQUFmLENBREEsQ0FKQztpQkFITDt1QkFVQSxTQUFTLENBQUMsT0FBRCxDQUFULENBQWdCLFNBQUEsR0FBQTt5QkFBRyxZQUFZLENBQUMsT0FBYixDQUFxQixLQUFyQixFQUE0QixTQUE1QixFQUFIO2dCQUFBLENBQWhCLEVBWkQ7Y0FBQSxDQUFBLENBQUgsQ0FBSSxLQUFKLEVBTEEsQ0FESjtBQUFBOztlQUFBLENBREo7QUFBQTt3QkFMYztNQUFBLENBQWxCLEVBRmtCO0lBQUEsQ0FBUixDQUhkLENBQUE7QUErQkEsV0FBTyxPQUFQLENBaENHO0VBQUEsQ0FKUCxDQUFBOztBQUFBLEVBc0NBLFlBQUMsQ0FBQSxXQUFELEdBQWMsU0FBQyxLQUFELEVBQVEsU0FBUixFQUFtQixPQUFuQixFQUE0QixJQUE1QixHQUFBO0FBQ1YsSUFBQSxJQUFHLElBQUg7QUFBYSxNQUFBLFlBQVksQ0FBQyxNQUFPLENBQUEsS0FBSyxDQUFDLElBQU4sQ0FBcEIsR0FBa0MsSUFBbEMsQ0FBYjtLQUFBO0FBQUEsSUFDQSxZQUFZLENBQUMsWUFBYixFQURBLENBQUE7O01BRUEsWUFBWSxDQUFDLFdBQVksT0FDckIsV0FDQSxZQUFZLENBQUMsY0FDYixZQUFZLENBQUM7S0FMakI7QUFPQSxJQUFBLElBQUcsWUFBWSxDQUFDLFlBQWIsS0FBNkIsWUFBWSxDQUFDLFNBQTdDOztRQUNJLFlBQVksQ0FBQztPQUFiO2FBQ0EsT0FBQSxDQUFBLEVBRko7S0FSVTtFQUFBLENBdENkLENBQUE7O0FBQUEsRUFrREEsWUFBQyxDQUFBLFlBQUQsR0FBZSxTQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixLQUF2QixHQUFBLENBbERmLENBQUE7O0FBQUEsRUFtREEsWUFBQyxDQUFBLFVBQUQsR0FBYSxTQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixLQUF2QixHQUFBLENBbkRiLENBQUE7O0FBQUEsRUFvREEsWUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLEtBQUQsRUFBUSxLQUFSLEdBQUEsQ0FwRFYsQ0FBQTs7QUFBQSxFQXFEQSxZQUFDLENBQUEsUUFBRCxHQUFXLFNBQUEsR0FBQSxDQXJEWCxDQUFBOztBQUFBLEVBdURBLFlBQUMsQ0FBQSxHQUFELEdBQU0sU0FBQyxLQUFELEdBQUE7V0FBVyxZQUFZLENBQUMsTUFBTyxDQUFBLEtBQUEsRUFBL0I7RUFBQSxDQXZETixDQUFBOztzQkFBQTs7SUFISixDQUFBOztBQUFBLE1BNkRNLENBQUMsT0FBUCxHQUFpQixZQTdEakIsQ0FBQTs7OztBQ0FBLElBQUEsWUFBQTs7QUFBQTs0QkFDSTs7QUFBQSxFQUFBLFlBQUMsQ0FBQSxNQUFELEdBQVMsRUFBVCxDQUFBOztBQUFBLEVBRUEsWUFBQyxDQUFBLElBQUQsR0FBTyxTQUFDLEVBQUQsRUFBSyxTQUFMLEdBQUE7QUFDSCxRQUFBLEtBQUE7QUFBQSxJQUFBLEtBQUEsR0FBUSxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixDQUFSLENBQUE7QUFBQSxJQUNBLEtBQUssQ0FBQyxHQUFOLEdBQVksU0FEWixDQUFBO1dBRUEsWUFBWSxDQUFDLE1BQU8sQ0FBQSxFQUFBLENBQXBCLEdBQTBCLE1BSHZCO0VBQUEsQ0FGUCxDQUFBOztBQUFBLEVBT0EsWUFBQyxDQUFBLElBQUQsR0FBTyxTQUFDLEVBQUQsR0FBQTtBQUNILFFBQUEsS0FBQTtBQUFBLElBQUEsS0FBQSxHQUFRLFlBQVksQ0FBQyxNQUFPLENBQUEsRUFBQSxDQUE1QixDQUFBO0FBQ0EsSUFBQSxJQUFHLEtBQUg7QUFDSSxNQUFBLEtBQUssQ0FBQyxLQUFOLENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxLQUFLLENBQUMsV0FBTixHQUFvQixDQURwQixDQUFBO2FBRUEsS0FBSyxDQUFDLElBQU4sQ0FBQSxFQUhKO0tBRkc7RUFBQSxDQVBQLENBQUE7O3NCQUFBOztJQURKLENBQUE7O0FBQUEsTUFlTSxDQUFDLE9BQVAsR0FBaUIsWUFmakIsQ0FBQTs7OztBQ0FBLElBQUEsZUFBQTs7QUFBQTsrQkFFSTs7QUFBQSxFQUFBLGVBQUMsQ0FBQSxZQUFELEdBQWUsU0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixRQUFoQixHQUFBO0FBQ1gsUUFBQSxNQUFBO0FBQUEsSUFBQSxNQUFBLEdBQVMsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBVCxDQUFBO0FBQUEsSUFDQSxNQUFNLENBQUMsS0FBUCxHQUFlLEtBRGYsQ0FBQTtBQUFBLElBRUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsTUFGaEIsQ0FBQTtBQUlBLElBQUEsSUFBRyxRQUFIO0FBQWlCLE1BQUEsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsTUFBckIsQ0FBQSxDQUFqQjtLQUpBO0FBTUEsV0FBTyxNQUFQLENBUFc7RUFBQSxDQUFmLENBQUE7O0FBQUEsRUFVQSxlQUFDLENBQUEsY0FBRCxHQUFpQixTQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLFFBQWhCLEdBQUE7QUFDYixRQUFBLFFBQUE7QUFBQSxJQUFBLFFBQUEsR0FBVyxFQUFYLENBQUE7QUFBQSxJQUNBLFFBQVEsQ0FBQyxNQUFULEdBQWtCLGVBQWUsQ0FBQyxZQUFoQixDQUE2QixLQUE3QixFQUFvQyxNQUFwQyxFQUE0QyxRQUE1QyxDQURsQixDQUFBO0FBQUEsSUFFQSxRQUFRLENBQUMsR0FBVCxHQUFlLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBaEIsQ0FBMkIsSUFBM0IsQ0FGZixDQUFBO0FBR0EsV0FBTyxRQUFQLENBSmE7RUFBQSxDQVZqQixDQUFBOztBQUFBLEVBaUJBLGVBQUMsQ0FBQSxTQUFELEdBQVksU0FBQyxHQUFELEVBQU0sS0FBTixFQUFhLFVBQWIsRUFBeUIsV0FBekIsRUFBc0MsZ0JBQXRDLEVBQXdELGlCQUF4RCxHQUFBO0FBQ1IsUUFBQSwyQ0FBQTtBQUFBLElBQUEsVUFBQSxHQUFhLFVBQUEsR0FBYSxXQUExQixDQUFBO0FBQUEsSUFDQSxnQkFBQSxHQUFtQixnQkFBQSxHQUFtQixpQkFEdEMsQ0FBQTtBQUFBLElBR0EsS0FBQSxHQUFRLGdCQUhSLENBQUE7QUFBQSxJQUlBLE1BQUEsR0FBUyxpQkFKVCxDQUFBO0FBTUEsSUFBQSxJQUFHLGdCQUFBLEdBQW1CLFVBQXRCO0FBQ0ksTUFBQSxNQUFBLEdBQVMsZ0JBQUEsR0FBbUIsVUFBNUIsQ0FESjtLQUFBLE1BQUE7QUFHSSxNQUFBLEtBQUEsR0FBUSxpQkFBQSxHQUFvQixVQUE1QixDQUhKO0tBTkE7V0FXQSxHQUFHLENBQUMsU0FBSixDQUFjLEtBQWQsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsVUFBM0IsRUFBdUMsV0FBdkMsRUFBb0QsQ0FBcEQsRUFBdUQsQ0FBdkQsRUFBMEQsS0FBMUQsRUFBaUUsTUFBakUsRUFaUTtFQUFBLENBakJaLENBQUE7O0FBQUEsRUFnQ0EsZUFBQyxDQUFBLFFBQUQsR0FBVyxTQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWEsVUFBYixFQUF5QixXQUF6QixFQUFzQyxnQkFBdEMsRUFBd0QsaUJBQXhELEdBQUE7QUFDUCxRQUFBLDJDQUFBO0FBQUEsSUFBQSxVQUFBLEdBQWEsVUFBQSxHQUFhLFdBQTFCLENBQUE7QUFBQSxJQUNBLGdCQUFBLEdBQW1CLGdCQUFBLEdBQW1CLGlCQUR0QyxDQUFBO0FBQUEsSUFHQSxLQUFBLEdBQVEsZ0JBSFIsQ0FBQTtBQUFBLElBSUEsTUFBQSxHQUFTLGlCQUpULENBQUE7QUFNQSxJQUFBLElBQUcsZ0JBQUEsR0FBbUIsVUFBdEI7QUFDSSxNQUFBLEtBQUEsR0FBUSxVQUFBLEdBQWEsaUJBQWIsR0FBaUMsV0FBekMsQ0FBQTtBQUFBLE1BQ0EsTUFBQSxHQUFTLGlCQURULENBREo7S0FBQSxNQUFBO0FBSUksTUFBQSxLQUFBLEdBQVEsZ0JBQVIsQ0FBQTtBQUFBLE1BQ0EsTUFBQSxHQUFTLFdBQUEsR0FBYyxnQkFBZCxHQUFpQyxVQUQxQyxDQUpKO0tBTkE7V0FhQSxHQUFHLENBQUMsU0FBSixDQUFjLEtBQWQsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsVUFBM0IsRUFBdUMsV0FBdkMsRUFBb0QsQ0FBcEQsRUFBdUQsQ0FBdkQsRUFBMEQsS0FBMUQsRUFBaUUsTUFBakUsRUFkTztFQUFBLENBaENYLENBQUE7O3lCQUFBOztJQUZKLENBQUE7O0FBQUEsTUFtRE0sQ0FBQyxPQUFQLEdBQWlCLGVBbkRqQixDQUFBOzs7O0FDQUEsSUFBQSxZQUFBOztBQUFBOzRCQUNJOztBQUFBLEVBQUEsWUFBQyxDQUFBLEtBQUQsR0FDSTtBQUFBLElBQUEsQ0FBQSxFQUFHLENBQUg7QUFBQSxJQUNBLENBQUEsRUFBRyxDQURIO0dBREosQ0FBQTs7QUFBQSxFQUlBLFlBQUMsQ0FBQSxHQUFELEdBQ0k7QUFBQSxJQUFBLEVBQUEsRUFBSSxLQUFKO0FBQUEsSUFDQSxJQUFBLEVBQU0sS0FETjtBQUFBLElBRUEsSUFBQSxFQUFNLEtBRk47QUFBQSxJQUdBLEtBQUEsRUFBTyxLQUhQO0dBTEosQ0FBQTs7QUFBQSxFQVVBLFlBQUMsQ0FBQSxJQUFELEdBQU8sU0FBQSxHQUFBO0FBQ0gsSUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBWSxDQUFDLFVBQWhELENBQUEsQ0FBQTtBQUFBLElBQ0EsUUFBUSxDQUFDLGdCQUFULENBQTBCLFdBQTFCLEVBQXVDLFlBQVksQ0FBQyxTQUFwRCxDQURBLENBQUE7QUFBQSxJQUVBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxZQUFZLENBQUMsS0FBaEQsQ0FGQSxDQUFBO1dBR0EsUUFBUSxDQUFDLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDLFlBQVksQ0FBQyxPQUFsRCxFQUpHO0VBQUEsQ0FWUCxDQUFBOztBQUFBLEVBZ0JBLFlBQUMsQ0FBQSxVQUFELEdBQWEsU0FBQyxDQUFELEdBQUE7NkRBQU8sWUFBWSxDQUFDLGFBQWMsWUFBbEM7RUFBQSxDQWhCYixDQUFBOztBQUFBLEVBa0JBLFlBQUMsQ0FBQSxTQUFELEdBQVksU0FBQyxDQUFELEdBQUE7QUFDUixJQUFBLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBbkIsR0FBdUIsQ0FBQyxDQUFDLENBQXpCLENBQUE7QUFBQSxJQUNBLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBbkIsR0FBdUIsQ0FBQyxDQUFDLENBRHpCLENBQUE7NERBRUEsWUFBWSxDQUFDLFlBQWEsWUFIbEI7RUFBQSxDQWxCWixDQUFBOztBQUFBLEVBdUJBLFlBQUMsQ0FBQSxLQUFELEdBQVEsU0FBQyxDQUFELEdBQUE7QUFDSixJQUFBLElBQUcsQ0FBQyxDQUFDLE9BQUYsS0FBYSxFQUFoQjtBQUF3QixNQUFBLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBakIsR0FBc0IsS0FBdEIsQ0FBeEI7S0FBQTtBQUNBLElBQUEsSUFBRyxDQUFDLENBQUMsT0FBRixLQUFhLEVBQWhCO0FBQXdCLE1BQUEsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFqQixHQUF3QixLQUF4QixDQUF4QjtLQURBO0FBRUEsSUFBQSxJQUFHLENBQUMsQ0FBQyxPQUFGLEtBQWEsRUFBaEI7QUFBd0IsTUFBQSxZQUFZLENBQUMsR0FBRyxDQUFDLElBQWpCLEdBQXdCLEtBQXhCLENBQXhCO0tBRkE7QUFHQSxJQUFBLElBQUcsQ0FBQyxDQUFDLE9BQUYsS0FBYSxFQUFoQjtBQUF3QixNQUFBLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBakIsR0FBeUIsS0FBekIsQ0FBeEI7S0FIQTt3REFLQSxZQUFZLENBQUMsUUFBUyxZQU5sQjtFQUFBLENBdkJSLENBQUE7O0FBQUEsRUErQkEsWUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLENBQUQsR0FBQTtBQUNOLElBQUEsSUFBRyxDQUFDLENBQUMsT0FBRixLQUFhLEVBQWhCO0FBQXdCLE1BQUEsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFqQixHQUFzQixJQUF0QixDQUF4QjtLQUFBO0FBQ0EsSUFBQSxJQUFHLENBQUMsQ0FBQyxPQUFGLEtBQWEsRUFBaEI7QUFBd0IsTUFBQSxZQUFZLENBQUMsR0FBRyxDQUFDLElBQWpCLEdBQXdCLElBQXhCLENBQXhCO0tBREE7QUFFQSxJQUFBLElBQUcsQ0FBQyxDQUFDLE9BQUYsS0FBYSxFQUFoQjtBQUF3QixNQUFBLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBakIsR0FBd0IsSUFBeEIsQ0FBeEI7S0FGQTtBQUdBLElBQUEsSUFBRyxDQUFDLENBQUMsT0FBRixLQUFhLEVBQWhCO0FBQXdCLE1BQUEsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFqQixHQUF5QixJQUF6QixDQUF4QjtLQUhBOzBEQUtBLFlBQVksQ0FBQyxVQUFXLFlBTmxCO0VBQUEsQ0EvQlYsQ0FBQTs7QUFBQSxFQXVDQSxZQUFDLENBQUEsWUFBRCxHQUFlLFNBQUMsQ0FBRCxHQUFBLENBdkNmLENBQUE7O0FBQUEsRUF3Q0EsWUFBQyxDQUFBLFdBQUQsR0FBYyxTQUFDLENBQUQsR0FBQSxDQXhDZCxDQUFBOztBQUFBLEVBeUNBLFlBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxDQUFELEdBQUEsQ0F6Q1YsQ0FBQTs7QUFBQSxFQTBDQSxZQUFDLENBQUEsU0FBRCxHQUFZLFNBQUMsQ0FBRCxHQUFBLENBMUNaLENBQUE7O3NCQUFBOztJQURKLENBQUE7O0FBQUEsTUE4Q00sQ0FBQyxPQUFQLEdBQWlCLFlBOUNqQixDQUFBOzs7O0FDQUEsSUFBQSxZQUFBOztBQUFBOzRCQUNJOztBQUFBLEVBQUEsWUFBQyxDQUFBLFlBQUQsR0FBZSxNQUFmLENBQUE7O0FBQUEsRUFDQSxZQUFDLENBQUEsTUFBRCxHQUFTLEVBRFQsQ0FBQTs7QUFBQSxFQUdBLFlBQUMsQ0FBQSxHQUFELEdBQU0sU0FBQyxJQUFELEVBQU8sS0FBUCxHQUFBO0FBQ0YsSUFBQSxZQUFZLENBQUMsTUFBTyxDQUFBLElBQUEsQ0FBcEIsR0FBNEIsS0FBNUIsQ0FBQTtBQUNBLFdBQU8sSUFBUCxDQUZFO0VBQUEsQ0FITixDQUFBOztBQUFBLEVBT0EsWUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7V0FBRyxZQUFZLENBQUMsTUFBTyxDQUFBLFlBQVksQ0FBQyxZQUFiLEVBQXZCO0VBQUEsQ0FQVixDQUFBOztBQUFBLEVBU0EsWUFBQyxDQUFBLFFBQUQsR0FBVyxTQUFDLElBQUQsR0FBQTtBQUNQLFFBQUEsU0FBQTtBQUFBLElBQUEsR0FBQSxHQUFNLFlBQVksQ0FBQyxPQUFiLENBQUEsQ0FBTixDQUFBO0FBQ0EsSUFBQSxJQUFvQixHQUFwQjtBQUFBLE1BQUEsR0FBRyxDQUFDLFVBQUosQ0FBQSxDQUFBLENBQUE7S0FEQTtBQUFBLElBRUEsWUFBWSxDQUFDLFlBQWIsR0FBNEIsSUFGNUIsQ0FBQTtBQUFBLElBR0EsWUFBWSxDQUFDLFVBQWIsQ0FBd0IsSUFBeEIsQ0FIQSxDQUFBOztVQUlzQixDQUFFLFFBQXhCLENBQUE7S0FKQTtBQUtBLFdBQU8sSUFBUCxDQU5PO0VBQUEsQ0FUWCxDQUFBOztBQUFBLEVBaUJBLFlBQUMsQ0FBQSxVQUFELEdBQWEsU0FBQyxJQUFELEdBQUEsQ0FqQmIsQ0FBQTs7c0JBQUE7O0lBREosQ0FBQTs7QUFBQSxNQXFCTSxDQUFDLE9BQVAsR0FBaUIsWUFyQmpCLENBQUE7Ozs7QUNBQSxJQUFBLEtBQUE7O0FBQUE7QUFDaUIsRUFBQSxlQUFBLEdBQUE7QUFDVCxJQUFBLElBQUMsQ0FBQSxPQUFELEdBQVcsRUFBWCxDQURTO0VBQUEsQ0FBYjs7QUFBQSxrQkFHQSxTQUFBLEdBQVcsU0FBQyxNQUFELEdBQUE7QUFDUCxJQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLE1BQWQsQ0FBQSxDQUFBO0FBQ0EsV0FBTyxNQUFQLENBRk87RUFBQSxDQUhYLENBQUE7O0FBQUEsa0JBT0EsSUFBQSxHQUFNLFNBQUEsR0FBQSxDQVBOLENBQUE7O0FBQUEsa0JBUUEsUUFBQSxHQUFVLFNBQUEsR0FBQSxDQVJWLENBQUE7O0FBQUEsa0JBU0EsVUFBQSxHQUFZLFNBQUEsR0FBQSxDQVRaLENBQUE7O2VBQUE7O0lBREosQ0FBQTs7QUFBQSxNQVlNLENBQUMsT0FBUCxHQUFpQixLQVpqQixDQUFBOzs7O0FDQUEsSUFBQSxJQUFBOztBQUFBO29CQUNJOztBQUFBLEVBQUEsSUFBQyxDQUFBLFFBQUQsR0FBVyxTQUFDLEdBQUQsR0FBQTtXQUFTLElBQUksQ0FBQyxJQUFMLENBQVUsR0FBVixDQUFjLENBQUMsSUFBZixDQUFvQixJQUFJLENBQUMsS0FBekIsRUFBVDtFQUFBLENBQVgsQ0FBQTs7QUFBQSxFQUVBLElBQUMsQ0FBQSxJQUFELEdBQU8sU0FBQyxHQUFELEdBQUE7QUFDSCxRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBYyxJQUFBLE9BQUEsQ0FBUSxTQUFDLE9BQUQsRUFBVSxNQUFWLEdBQUE7QUFDbEIsVUFBQSxHQUFBO0FBQUEsTUFBQSxHQUFBLEdBQVUsSUFBQSxjQUFBLENBQUEsQ0FBVixDQUFBO0FBQUEsTUFFQSxHQUFHLENBQUMsSUFBSixDQUFTLEtBQVQsRUFBZ0IsR0FBaEIsRUFBcUIsSUFBckIsQ0FGQSxDQUFBO0FBQUEsTUFHQSxHQUFHLENBQUMsZ0JBQUosQ0FBcUIsa0JBQXJCLEVBQXlDLFNBQUEsR0FBQTtBQUNyQyxZQUFBLElBQUE7QUFBQSxRQUFBLElBQUcsR0FBRyxDQUFDLFVBQUosS0FBa0IsQ0FBckI7QUFDSSxVQUFBLFlBQUcsR0FBRyxDQUFDLE9BQUosS0FBZSxHQUFmLElBQUEsSUFBQSxLQUFvQixHQUF2QjttQkFDSSxPQUFBLENBQVEsR0FBRyxDQUFDLFlBQVosRUFESjtXQUFBLE1BQUE7bUJBR0ksTUFBQSxDQUFPLE9BQVAsRUFISjtXQURKO1NBRHFDO01BQUEsQ0FBekMsQ0FIQSxDQUFBO2FBU0EsR0FBRyxDQUFDLElBQUosQ0FBQSxFQVZrQjtJQUFBLENBQVIsQ0FBZCxDQUFBO0FBV0EsV0FBTyxPQUFQLENBWkc7RUFBQSxDQUZQLENBQUE7O0FBQUEsRUFpQkEsSUFBQyxDQUFBLFNBQUQsR0FBWSxTQUFDLEdBQUQsR0FBQTtBQUNSLFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFjLElBQUEsT0FBQSxDQUFRLFNBQUMsT0FBRCxFQUFVLE1BQVYsR0FBQTtBQUNsQixVQUFBLEtBQUE7QUFBQSxNQUFBLEtBQUEsR0FBWSxJQUFBLEtBQUEsQ0FBQSxDQUFaLENBQUE7QUFBQSxNQUNBLEtBQUssQ0FBQyxnQkFBTixDQUF1QixNQUF2QixFQUErQixTQUFBLEdBQUE7ZUFBRyxPQUFBLENBQVEsSUFBUixFQUFIO01BQUEsQ0FBL0IsQ0FEQSxDQUFBO0FBQUEsTUFFQSxLQUFLLENBQUMsZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsU0FBQSxHQUFBO2VBQUcsTUFBQSxDQUFPLE9BQVAsRUFBSDtNQUFBLENBQWhDLENBRkEsQ0FBQTtBQUFBLE1BR0EsS0FBSyxDQUFDLEdBQU4sR0FBWSxHQUhaLENBQUE7QUFJQSxNQUFBLElBQUcsS0FBSyxDQUFDLFFBQVQ7ZUFBdUIsT0FBQSxDQUFRLEtBQVIsRUFBdkI7T0FMa0I7SUFBQSxDQUFSLENBQWQsQ0FBQTtBQU1BLFdBQU8sT0FBUCxDQVBRO0VBQUEsQ0FqQlosQ0FBQTs7QUFBQSxFQTJCQSxJQUFDLENBQUEsU0FBRCxHQUFZLFNBQUMsSUFBRCxHQUFBO0FBQ1IsUUFBQSxXQUFBO0FBQUEsSUFBQSxHQUFBLEdBQU0sSUFBSSxDQUFDLE1BQVgsQ0FBQTtBQUFBLElBRUEsRUFBQSxHQUFLLElBQUksQ0FBQyxNQUFMLENBQVksQ0FBQSxDQUFaLENBRkwsQ0FBQTtBQUFBLElBR0EsRUFBQSxHQUFLLElBQUksQ0FBQyxNQUFMLENBQVksQ0FBQSxDQUFaLENBSEwsQ0FBQTtBQUtBLElBQUEsSUFBRyxFQUFBLEtBQU0sR0FBVDtBQUNJLE1BQUEsSUFBQSxHQUFPLElBQUksQ0FBQyxNQUFMLENBQVksQ0FBWixFQUFlLEdBQUEsR0FBTSxDQUFyQixDQUFBLEdBQTBCLEtBQWpDLENBREo7S0FBQSxNQUVLLElBQUcsRUFBQSxLQUFNLEdBQU4sSUFBYSxFQUFBLEtBQU0sR0FBbkIsSUFBMEIsRUFBQSxLQUFNLElBQWhDLElBQXdDLEVBQUEsS0FBTSxJQUE5QyxJQUFzRCxFQUFBLEtBQU0sSUFBL0Q7QUFFRCxNQUFBLElBQUEsR0FBTyxJQUFBLEdBQU8sSUFBZCxDQUZDO0tBQUEsTUFBQTtBQUlELE1BQUEsSUFBQSxHQUFPLElBQUEsR0FBTyxHQUFkLENBSkM7S0FQTDtBQWFBLFdBQU8sSUFBUCxDQWRRO0VBQUEsQ0EzQlosQ0FBQTs7Y0FBQTs7SUFESixDQUFBOztBQUFBLE1BNENNLENBQUMsT0FBUCxHQUFpQixJQTVDakIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiU2NlbmUgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1NjZW5lLmNvZmZlZVwiXG5TY2VuZU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvU2NlbmVNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5JbnB1dE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvSW5wdXRNYW5hZ2VyLmNvZmZlZVwiXG5Bc3NldE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvQXNzZXRNYW5hZ2VyLmNvZmZlZVwiXG5cblxuIyBTY2VuZXNcblByZUxvYWRTY2VuZSA9IHJlcXVpcmUgXCIuL1ByZUxvYWQuY29mZmVlXCJcbk1haW5NZW51U2NlbmUgPSByZXF1aXJlIFwiLi9NYWluTWVudS5jb2ZmZWVcIlxuXG5cbmNsYXNzIEJvb3RTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgaW5pdDogLT5cbiAgICAgICAgIyBVc2UgR3JhcGhpY3NNYW5hZ2VyIHRvIGNyZWF0ZSBtYWluIGNhbnZhc1xuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIgPSBHcmFwaGljc01hbmFnZXIuY3JlYXRlUmVuZGVyZXIgNjQwLCA0ODAsIGRvY3VtZW50LmJvZHlcbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICAgICAgSW5wdXRNYW5hZ2VyLmluaXQoKVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwicmVzaXplXCIsIC0+XG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICAgICAgIyBTZXQgdXAgdGhlIHNjZW5lc1xuICAgICAgICBwcmVMb2FkU2NlbmUgPSBuZXcgUHJlTG9hZFNjZW5lKClcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFkZCBcInByZWxvYWRcIiwgcHJlTG9hZFNjZW5lXG4gICAgICAgIHByZUxvYWRTY2VuZS5pbml0KClcblxuICAgICAgICBtYWluTWVudVNjZW5lID0gbmV3IE1haW5NZW51U2NlbmUoKVxuICAgICAgICBTY2VuZU1hbmFnZXIuYWRkIFwibWFpbi1tZW51XCIsIG1haW5NZW51U2NlbmVcbiAgICAgICAgbWFpbk1lbnVTY2VuZS5pbml0KClcblxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIGxvYWRBc3NldCA9IEFzc2V0TWFuYWdlci5sb2FkIFwiYXNzZXRzL2Fzc2V0cy1ib290Lmpzb25cIlxuICAgICAgICBsb2FkQXNzZXQudGhlbiAtPiBTY2VuZU1hbmFnZXIuYWN0aXZhdGUgXCJwcmVsb2FkXCJcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvb3RTY2VuZSIsIlNjZW5lID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TY2VuZS5jb2ZmZWVcIlxuVXRpbCA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvVXRpbC5jb2ZmZWVcIlxuU2NlbmVNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL1NjZW5lTWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuSW5wdXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0lucHV0TWFuYWdlci5jb2ZmZWVcIlxuQXVkaW9NYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0F1ZGlvTWFuYWdlci5jb2ZmZWVcIlxuQXNzZXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0Fzc2V0TWFuYWdlci5jb2ZmZWVcIlxuXG5jbGFzcyBNYWluTWVudVNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBpbml0OiAtPlxuICAgICAgICBAbWVudXMgPSB7fVxuICAgICAgICBAcmVuZGVyZXIgPSBHcmFwaGljc01hbmFnZXIucmVuZGVyZXJcbiAgICAgICAgQGNsaWNrTGlzdGVuZXIgPSBAb25Nb3VzZUNsaWNrLmJpbmQgQFxuXG4gICAgICAgICMgU2V0IHRoZSBjdXJyZW50IG1lbnVcbiAgICAgICAgQGN1cnJlbnRNZW51ID0gXCJtYWluLW1lbnVcIlxuXG4gICAgICAgIEF1ZGlvTWFuYWdlci5sb2FkIFwibWVudS1zZWxlY3RcIiwgXCIvYXNzZXRzL3NvdW5kL1VJIHBhY2sgMS9NRU5VIEJfU2VsZWN0LndhdlwiXG4gICAgICAgIEF1ZGlvTWFuYWdlci5sb2FkIFwibWVudS1iYWNrXCIsIFwiL2Fzc2V0cy9zb3VuZC9VSSBwYWNrIDEvTUVOVSBCX0JhY2sud2F2XCJcblxuICAgICAgICAjIExvYWQgdGhlIG1lbnVzXG4gICAgICAgIEBsb2FkTWVudSBcIi9hc3NldHMvbWVudS9tYWluLW1lbnUuanNvblwiXG4gICAgICAgIEBsb2FkTWVudSBcIi9hc3NldHMvbWVudS9uZXctZ2FtZS1tZW51Lmpzb25cIlxuXG5cbiAgICBsb2FkTWVudTogKG1lbnVGaWxlKSAtPlxuICAgICAgICBtYXAgPSBVdGlsLmxvYWRKU09OIG1lbnVGaWxlXG4gICAgICAgIG1hcC50aGVuIEBwYXJzZU1lbnUuYmluZCBAXG5cblxuICAgIHBhcnNlTWVudTogKG1lbnVEYXRhKSAtPlxuICAgICAgICBAbWVudXNbbWVudURhdGEuaWRdID0ge1xuICAgICAgICAgICAgaWQ6IG1lbnVEYXRhLmlkXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBtZW51RGF0YS5iYWNrZ3JvdW5kXG4gICAgICAgICAgICBlbGVtZW50czogW11cbiAgICAgICAgICAgIGJ1dHRvbnM6IFtdXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgZWxlbWVudCBpbiBtZW51RGF0YS5lbGVtZW50c1xuXG4gICAgICAgICAgICBpZiBlbGVtZW50LnR5cGUgPT0gXCJidXR0b25cIlxuICAgICAgICAgICAgICAgIEBhZGRCdXR0b24gbWVudURhdGEuaWQsIGVsZW1lbnRcblxuXG4gICAgYWRkQnV0dG9uOiAobWVudSwgYnRuKSAtPlxuICAgICAgICBvbkNsaWNrID0gbnVsbFxuXG4gICAgICAgIGlmIGJ0bi5hY3Rpb25UeXBlID09IFwic3dpdGNoTWVudVwiIHRoZW4gb25DbGljayA9IEBzd2l0Y2hNZW51LmJpbmQgQCwgYnRuLmFjdGlvbiwgYnRuLmlzQmFja1xuICAgICAgICBpZiBidG4uYWN0aW9uVHlwZSA9PSBcInN3aXRjaFNjZW5lXCIgdGhlbiBvbkNsaWNrID0gQHN3aXRjaFNjZW5lLmJpbmQgQCwgYnRuLmFjdGlvbiwgYnRuLmlzQmFja1xuXG4gICAgICAgIGJ1dHRvbiA9XG4gICAgICAgICAgICB0ZXh0OiBidG4udGV4dFxuICAgICAgICAgICAgeDogYnRuLnhcbiAgICAgICAgICAgIHk6IGJ0bi55XG4gICAgICAgICAgICB3aWR0aDogYnRuLndpZHRoXG4gICAgICAgICAgICBoZWlnaHQ6IGJ0bi5oZWlnaHRcbiAgICAgICAgICAgIGRpc2FibGVkOiBidG4uZGlzYWJsZWRcbiAgICAgICAgICAgIGNsaWNrOiBvbkNsaWNrXG5cbiAgICAgICAgaWYgbm90IEBtZW51c1ttZW51XSB0aGVuIEBtZW51c1ttZW51XSA9IHt9XG4gICAgICAgIGlmIG5vdCBAbWVudXNbbWVudV0uYnV0dG9ucyB0aGVuIEBtZW51c1ttZW51XS5idXR0b25zID0gW11cbiAgICAgICAgQG1lbnVzW21lbnVdLmJ1dHRvbnMucHVzaCBidXR0b25cblxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIEBiYWNrZ3JvdW5kID0gQXNzZXRNYW5hZ2VyLmdldCBcImltZy9iYWNrZ3JvdW5kL2ltYWdlNl8wLmpwZ1wiXG4gICAgICAgIElucHV0TWFuYWdlci5vbk1vdXNlQ2xpY2sgPSBAb25Nb3VzZUNsaWNrLmJpbmQgQFxuICAgICAgICBAY3VycmVudE1lbnUgPSBcIm1haW4tbWVudVwiXG4gICAgICAgIEByZW5kZXJNZW51KClcblxuICAgIGRlYWN0aXZhdGU6IC0+IElucHV0TWFuYWdlci5vbk1vdXNlQ2xpY2sgPSBudWxsXG5cbiAgICBzd2l0Y2hNZW51OiAobmV3TWVudSwgaXNCYWNrID0gZmFsc2UpIC0+XG4gICAgICAgIGlmIGlzQmFja1xuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXkgXCJtZW51LWJhY2tcIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIucGxheSBcIm1lbnUtc2VsZWN0XCJcblxuICAgICAgICBAY3VycmVudE1lbnUgPSBuZXdNZW51XG4gICAgICAgIEByZW5kZXJNZW51KClcblxuICAgIHN3aXRjaFNjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5IFwibWVudS1zZWxlY3RcIlxuICAgICAgICBTY2VuZU1hbmFnZXIuYWN0aXZhdGUgc2NlbmVcblxuICAgIG9uTW91c2VDbGljazogKGUpIC0+XG4gICAgICAgIGJ1dHRvbiA9IEBnZXRCdXR0b25Gcm9tUG9pbnQgZS54LCBlLnlcbiAgICAgICAgaWYgYnV0dG9uIHRoZW4gYnV0dG9uLmNsaWNrPygpXG5cbiAgICBnZXRCdXR0b25Gcm9tUG9pbnQ6ICh4LCB5KSAtPlxuICAgICAgICBtZW51ID0gQG1lbnVzW0BjdXJyZW50TWVudV1cbiAgICAgICAgZm9yIGJ1dHRvbiBpbiBtZW51LmJ1dHRvbnNcbiAgICAgICAgICAgIGlmIEBpc1BvaW50SW5SZWN0IHgsIHksIGJ1dHRvbi54LCBidXR0b24ueSwgYnV0dG9uLndpZHRoLCBidXR0b24uaGVpZ2h0XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1dHRvblxuXG4gICAgaXNQb2ludEluUmVjdDogKHgsIHksIHJ4LCByeSwgcncsIHJoKSAtPiByZXR1cm4geCA+PSByeCAmJiB4IDw9IHJ5ICsgcncgJiYgeSA+PSByeSAmJiB5IDw9IHJ5ICsgcmhcblxuICAgIHJlbmRlck1lbnU6IC0+XG4gICAgICAgIEByZW5kZXJCYWNrZ3JvdW5kKClcbiAgICAgICAgbWVudSA9IEBtZW51c1tAY3VycmVudE1lbnVdXG4gICAgICAgIGZvciBidXR0b24gaW4gbWVudS5idXR0b25zXG4gICAgICAgICAgICBAcmVuZGVyQnV0dG9uIGJ1dHRvblxuXG4gICAgcmVuZGVyQmFja2dyb3VuZDogLT5cbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLmZpbGxJbWFnZSBAcmVuZGVyZXIuY3R4LCBAYmFja2dyb3VuZCxcbiAgICAgICAgICAgIEBiYWNrZ3JvdW5kLndpZHRoLCBAYmFja2dyb3VuZC5oZWlnaHQsXG4gICAgICAgICAgICBAcmVuZGVyZXIuY2FudmFzLndpZHRoLCBAcmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG4gICAgcmVuZGVyQnV0dG9uOiAoYnV0dG9uLCBob3ZlciA9IGZhbHNlKSAtPlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IHVubGVzcyBidXR0b24uZGlzYWJsZWQgdGhlbiBcInJnYmEoMjU1LDI1NSwyNTUsMC45KVwiIGVsc2UgXCJyZ2JhKDI1NSwyNTUsMjU1LDAuNClcIlxuICAgICAgICBAcmVuZGVyZXIuY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCJcblxuICAgICAgICBpZiBob3ZlclxuICAgICAgICAgICAgQHJlbmRlcmVyLmN0eC5zaGFkb3dCbHVyID0gMjBcbiAgICAgICAgICAgIEByZW5kZXJlci5jdHguc2hhZG93Q29sb3IgPSBcInllbGxvd1wiXG5cbiAgICAgICAgQHJlbmRlcmVyLmN0eC5maWxsUmVjdCBidXR0b24ueCwgYnV0dG9uLnksIGJ1dHRvbi53aWR0aCwgYnV0dG9uLmhlaWdodFxuXG4gICAgICAgIEByZW5kZXJlci5jdHguc2hhZG93Qmx1ciA9IDAgaWYgaG92ZXJcblxuICAgICAgICBAcmVuZGVyZXIuY3R4LnN0cm9rZVJlY3QgYnV0dG9uLngsIGJ1dHRvbi55LCBidXR0b24ud2lkdGgsIGJ1dHRvbi5oZWlnaHRcblxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiXG4gICAgICAgIEByZW5kZXJlci5jdHguZm9udCA9IFwiMTJweCBBcmlhbCwgc2Fucy1zZXJpZlwiXG4gICAgICAgIEByZW5kZXJlci5jdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIlxuICAgICAgICB0ZXh0U2l6ZSA9IEByZW5kZXJlci5jdHgubWVhc3VyZVRleHQgYnV0dG9uLnRleHRcbiAgICAgICAgQHJlbmRlcmVyLmN0eC5maWxsVGV4dCBidXR0b24udGV4dCwgYnV0dG9uLnggKyAxMDAgLSAodGV4dFNpemUud2lkdGggLyAyKSwgYnV0dG9uLnkgKyA3XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYWluTWVudVNjZW5lIiwiU2NlbmUgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1NjZW5lLmNvZmZlZVwiXG5TY2VuZU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvU2NlbmVNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5Bc3NldE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvQXNzZXRNYW5hZ2VyLmNvZmZlZVwiXG5cblxuY2xhc3MgUHJlTG9hZFNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBpbml0OiAtPlxuICAgICAgICBAcmVuZGVyZXIgPSBHcmFwaGljc01hbmFnZXIucmVuZGVyZXJcblxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIEBiYXIgPVxuICAgICAgICAgICAgYmFja2dyb3VuZDogQXNzZXRNYW5hZ2VyLmdldCBcImltZy91aS9sb2FkaW5nLWJhci1iZy5wbmdcIlxuICAgICAgICAgICAgZmlsbDogQXNzZXRNYW5hZ2VyLmdldCBcImltZy91aS9sb2FkaW5nLWJhci1maWxsLnBuZ1wiXG4gICAgICAgICAgICB4OiAoR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aCAvIDIpIC0gOTRcbiAgICAgICAgICAgIHk6IChHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodCAvIDIpIC0gMjJcbiAgICAgICAgICAgIHdpZHRoOiAxODhcbiAgICAgICAgICAgIGhlaWdodDogMjJcblxuICAgICAgICBAYmFyLm1pZGRsZSA9IEBiYXIueCArIChAYmFyLndpZHRoIC8gMilcblxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiXG4gICAgICAgIEByZW5kZXJlci5jdHguZmlsbFJlY3QgMCwgMCwgQHJlbmRlcmVyLmNhbnZhcy53aWR0aCwgQHJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcblxuICAgICAgICBAcmVuZGVyTG9hZGluZ0JhciAwXG4gICAgICAgIEByZW5kZXJMb2FkaW5nVGV4dCBcIkxvYWRpbmcuLi5cIlxuXG4gICAgICAgIEFzc2V0TWFuYWdlci5vbkJlZm9yZUxvYWQgPSBAb25Qcm9ncmVzcy5iaW5kIEBcbiAgICAgICAgQXNzZXRNYW5hZ2VyLm9uUHJvZ3Jlc3MgPSBAb25Qcm9ncmVzcy5iaW5kIEBcbiAgICAgICAgQXNzZXRNYW5hZ2VyLm9uRXJyb3IgPSBAb25FcnJvci5iaW5kIEBcblxuICAgICAgICBsb2FkQXNzZXQgPSBBc3NldE1hbmFnZXIubG9hZCBcImFzc2V0cy9hc3NldHMtZ2FtZS5qc29uXCJcbiAgICAgICAgbG9hZEFzc2V0LnRoZW4gLT4gU2NlbmVNYW5hZ2VyLmFjdGl2YXRlIFwibWFpbi1tZW51XCJcblxuXG4gICAgb25FcnJvcjogKGFzc2V0KSAtPlxuICAgICAgICB0ZXh0ID0gXCJFcnJvciBsb2FkaW5nICN7YXNzZXQuZmlsZX1cIlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiXG4gICAgICAgIEByZW5kZXJlci5jdHguZmlsbFJlY3QgMCwgMCwgQHJlbmRlcmVyLmNhbnZhcy53aWR0aCwgQHJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcbiAgICAgICAgQHJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiNmZjQ0NDRcIlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZvbnQgPSBcIjE0cHggQXJpYWwsIHNhbnMtc2VyaWZcIlxuICAgICAgICBAcmVuZGVyZXIuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCJcbiAgICAgICAgdGV4dFNpemUgPSBAcmVuZGVyZXIuY3R4Lm1lYXN1cmVUZXh0IHRleHRcbiAgICAgICAgQHJlbmRlcmVyLmN0eC5maWxsVGV4dCB0ZXh0LCBAYmFyLm1pZGRsZSAtICh0ZXh0U2l6ZS53aWR0aCAvIDIpLCBAYmFyLnkgKyBAYmFyLmhlaWdodCArIDEwXG5cblxuICAgIG9uUHJvZ3Jlc3M6IChhc3NldCwgZ3JvdXAsIGxvYWRlZCwgdG90YWwpIC0+XG4gICAgICAgIEByZW5kZXJlci5jdHguZmlsbFN0eWxlID0gXCIjMDAwXCJcbiAgICAgICAgQHJlbmRlcmVyLmN0eC5maWxsUmVjdCAwLCAwLCBAcmVuZGVyZXIuY2FudmFzLndpZHRoLCBAcmVuZGVyZXIuY2FudmFzLmhlaWdodFxuICAgICAgICBAcmVuZGVyTG9hZGluZ1RleHQgXCJMb2FkaW5nICN7Z3JvdXB9XCJcbiAgICAgICAgQHJlbmRlckxvYWRpbmdCYXIgbG9hZGVkIC8gdG90YWxcblxuXG4gICAgcmVuZGVyTG9hZGluZ1RleHQ6ICh0ZXh0KSAtPlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiIzMzQjVFNVwiXG4gICAgICAgIEByZW5kZXJlci5jdHguZm9udCA9IFwiMTRweCBBcmlhbCwgc2Fucy1zZXJpZlwiXG4gICAgICAgIEByZW5kZXJlci5jdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIlxuICAgICAgICB0ZXh0U2l6ZSA9IEByZW5kZXJlci5jdHgubWVhc3VyZVRleHQgdGV4dFxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxUZXh0IHRleHQsIEBiYXIubWlkZGxlIC0gKHRleHRTaXplLndpZHRoIC8gMiksIEBiYXIueSArIEBiYXIuaGVpZ2h0ICsgMTBcblxuXG4gICAgIyBUT0RPOiBHbG93IG9uIGJhciBhcHBlYXJzIHRvbyBicmlnaHRcbiAgICByZW5kZXJMb2FkaW5nQmFyOiAocGVyY2VudCkgLT5cbiAgICAgICAgIyBSZW5kZXIgYmFja2dyb3VuZFxuICAgICAgICBAcmVuZGVyZXIuY3R4LmRyYXdJbWFnZSBAYmFyLmJhY2tncm91bmQsIEBiYXIueCwgQGJhci55XG4gICAgICAgIEByZW5kZXJlci5jdHguZHJhd0ltYWdlIEBiYXIuZmlsbCxcbiAgICAgICAgICAgICAgICBAYmFyLnggKyA2LCBAYmFyLnksXG4gICAgICAgICAgICAgICAgKEBiYXIud2lkdGggLSAxMikgKiBwZXJjZW50LCBAYmFyLmhlaWdodFxuXG5cbm1vZHVsZS5leHBvcnRzID0gUHJlTG9hZFNjZW5lIiwiRW5naW5lID0gcmVxdWlyZSBcIi4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9FbmdpbmUuY29mZmVlXCJcblxuQm9vdFNjZW5lID0gcmVxdWlyZSBcIi4vU2NlbmUvQm9vdC5jb2ZmZWVcIlxuXG5nYW1lID0gbmV3IEVuZ2luZVxuZ2FtZS5zdGFydCBuZXcgQm9vdFNjZW5lIiwiU2NlbmVNYW5hZ2VyID0gcmVxdWlyZSBcIi4vTWFuYWdlci9TY2VuZU1hbmFnZXIuY29mZmVlXCJcblxuY2xhc3MgRW5naW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBsYXN0R2FtZVRpY2sgPSBEYXRlLm5vdygpXG5cbiAgICBzdGFydDogKHNjZW5lKSAtPlxuICAgICAgICBTY2VuZU1hbmFnZXIuYWRkIFwiYm9vdFwiLCBzY2VuZVxuICAgICAgICBzY2VuZS5pbml0KClcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFjdGl2YXRlIFwiYm9vdFwiXG4gICAgICAgIEBtYWluTG9vcCgpXG5cbiAgICBtYWluTG9vcDogLT5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBtYWluTG9vcC5iaW5kIEBcblxuICAgICAgICBAY3VycmVudEdhbWVUaWNrID0gRGF0ZS5ub3coKVxuICAgICAgICBAZGVsdGEgPSBAY3VycmVudEdhbWVUaWNrIC0gQGxhc3RHYW1lVGlja1xuICAgICAgICBAbGFzdEdhbWVUaWNrID0gQGN1cnJlbnRHYW1lVGlja1xuXG4gICAgICAgIEB1cGRhdGUgQGRlbHRhXG4gICAgICAgIHJldHVybiBudWxsXG5cbiAgICB1cGRhdGU6IChkdCkgLT5cbiAgICAgICAgc2NlbmUgPSBTY2VuZU1hbmFnZXIuY3VycmVudCgpXG5cbiAgICAgICAgZm9yIHN5c3RlbSBpbiBzY2VuZS5zeXN0ZW1zXG4gICAgICAgICAgICBzeXN0ZW0udXBkYXRlIGR0XG4gICAgICAgIHJldHVybiBudWxsXG5cblxubW9kdWxlLmV4cG9ydHMgPSBFbmdpbmUiLCJVdGlsID0gcmVxdWlyZSBcIi4uL1V0aWwuY29mZmVlXCJcblxuY2xhc3MgQXNzZXRNYW5hZ2VyXG4gICAgQGFzc2V0cyA9IHt9XG4gICAgQG51bUFzc2V0cyA9IDBcbiAgICBAYXNzZXRzTG9hZGVkID0gMFxuXG4gICAgQGxvYWQ6IChtYW5pZmVzdCkgLT5cbiAgICAgICAgQG51bUFzc2V0cyA9IDBcbiAgICAgICAgQGFzc2V0c0xvYWRlZCA9IDBcblxuICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UgKHJlc29sdmUpIC0+XG4gICAgICAgICAgICBsb2FkTWFuaWZlc3QgPSBVdGlsLmxvYWRKU09OIG1hbmlmZXN0XG4gICAgICAgICAgICBsb2FkTWFuaWZlc3QudGhlbiAoanNvbikgLT5cbiAgICAgICAgICAgICAgICBmb3IgaSwgYXNzZXRHcm91cCBvZiBqc29uLmFzc2V0c1xuICAgICAgICAgICAgICAgICAgICBmb3IgYSBpbiBhc3NldEdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIubnVtQXNzZXRzKytcblxuICAgICAgICAgICAgICAgIGZvciBncm91cE5hbWUsIGFzc2V0R3JvdXAgb2YganNvbi5hc3NldHNcbiAgICAgICAgICAgICAgICAgICAgZm9yIGFzc2V0IGluIGFzc2V0R3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5vbkJlZm9yZUxvYWQ/IGFzc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIuYXNzZXRzTG9hZGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5udW1Bc3NldHNcblxuICAgICAgICAgICAgICAgICAgICAgICAgZG8gKGFzc2V0KSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgTG9hZCBiYXNlZCBvbiBmaWxlIHR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBhc3NldC50eXBlID09IFwiaW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldExvYWQgPSBVdGlsLmxvYWRJbWFnZSBqc29uLnJvb3QgKyBhc3NldC5maWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZC50aGVuIChpbWcpIC0+IEFzc2V0TWFuYWdlci5hc3NldExvYWRlZCBhc3NldCwgZ3JvdXBOYW1lLCByZXNvbHZlLCBpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIGFzc2V0LnR5cGUgPT0gXCJqc29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkID0gVXRpbC5sb2FkSlNPTiBqc29uLnJvb3QgKyBhc3NldC5maWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZC50aGVuIChqc29uKSAtPiBBc3NldE1hbmFnZXIuYXNzZXRMb2FkZWQgYXNzZXQsIGdyb3VwTmFtZSwgcmVzb2x2ZSwganNvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkID0gVXRpbC5sb2FkIGpzb24ucm9vdCArIGFzc2V0LmZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkLnRoZW4gLT4gQXNzZXRNYW5hZ2VyLmFzc2V0TG9hZGVkIGFzc2V0LCBncm91cE5hbWUsIHJlc29sdmVcbiAjXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkLmNhdGNoIC0+IEFzc2V0TWFuYWdlci5vbkVycm9yIGFzc2V0LCBncm91cE5hbWVcblxuICAgICAgICByZXR1cm4gcHJvbWlzZVxuXG4gICAgQGFzc2V0TG9hZGVkOiAoYXNzZXQsIGdyb3VwTmFtZSwgcmVzb2x2ZSwgZGF0YSkgLT5cbiAgICAgICAgaWYgZGF0YSB0aGVuIEFzc2V0TWFuYWdlci5hc3NldHNbYXNzZXQuZmlsZV0gPSBkYXRhXG4gICAgICAgIEFzc2V0TWFuYWdlci5hc3NldHNMb2FkZWQrK1xuICAgICAgICBBc3NldE1hbmFnZXIub25Qcm9ncmVzcz8gYXNzZXQsXG4gICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICBBc3NldE1hbmFnZXIuYXNzZXRzTG9hZGVkLFxuICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLm51bUFzc2V0c1xuXG4gICAgICAgIGlmIEFzc2V0TWFuYWdlci5hc3NldHNMb2FkZWQgaXMgQXNzZXRNYW5hZ2VyLm51bUFzc2V0c1xuICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLm9uTG9hZGVkPygpXG4gICAgICAgICAgICByZXNvbHZlKClcblxuICAgIEBvbkJlZm9yZUxvYWQ6IChhc3NldCwgZ3JvdXAsIGxvYWRlZCwgdG90YWwpIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uUHJvZ3Jlc3M6IChhc3NldCwgZ3JvdXAsIGxvYWRlZCwgdG90YWwpIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uRXJyb3I6IChhc3NldCwgZ3JvdXApIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uTG9hZGVkOiAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuXG4gICAgQGdldDogKGFzc2V0KSAtPiBBc3NldE1hbmFnZXIuYXNzZXRzW2Fzc2V0XVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQXNzZXRNYW5hZ2VyIiwiY2xhc3MgQXVkaW9NYW5hZ2VyXG4gICAgQHNvdW5kczoge31cblxuICAgIEBsb2FkOiAoaWQsIGF1ZGlvRmlsZSkgLT5cbiAgICAgICAgc291bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiYXVkaW9cIlxuICAgICAgICBzb3VuZC5zcmMgPSBhdWRpb0ZpbGVcbiAgICAgICAgQXVkaW9NYW5hZ2VyLnNvdW5kc1tpZF0gPSBzb3VuZFxuXG4gICAgQHBsYXk6IChpZCkgLT5cbiAgICAgICAgc291bmQgPSBBdWRpb01hbmFnZXIuc291bmRzW2lkXVxuICAgICAgICBpZiBzb3VuZFxuICAgICAgICAgICAgc291bmQucGF1c2UoKVxuICAgICAgICAgICAgc291bmQuY3VycmVudFRpbWUgPSAwXG4gICAgICAgICAgICBzb3VuZC5wbGF5KClcblxubW9kdWxlLmV4cG9ydHMgPSBBdWRpb01hbmFnZXIiLCJjbGFzcyBHcmFwaGljc01hbmFnZXJcblxuICAgIEBjcmVhdGVDYW52YXM6ICh3aWR0aCwgaGVpZ2h0LCBhcHBlbmRUbykgLT5cbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImNhbnZhc1wiXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHRcblxuICAgICAgICBpZiBhcHBlbmRUbyB0aGVuIGFwcGVuZFRvLmFwcGVuZENoaWxkIGNhbnZhc1xuXG4gICAgICAgIHJldHVybiBjYW52YXNcblxuXG4gICAgQGNyZWF0ZVJlbmRlcmVyOiAod2lkdGgsIGhlaWdodCwgYXBwZW5kVG8pIC0+XG4gICAgICAgIHJlbmRlcmVyID0ge31cbiAgICAgICAgcmVuZGVyZXIuY2FudmFzID0gR3JhcGhpY3NNYW5hZ2VyLmNyZWF0ZUNhbnZhcyB3aWR0aCwgaGVpZ2h0LCBhcHBlbmRUb1xuICAgICAgICByZW5kZXJlci5jdHggPSByZW5kZXJlci5jYW52YXMuZ2V0Q29udGV4dCBcIjJkXCJcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyXG5cblxuICAgIEBmaWxsSW1hZ2U6IChjdHgsIGltYWdlLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgZGVzdGluYXRpb25XaWR0aCwgZGVzdGluYXRpb25IZWlnaHQpIC0+XG4gICAgICAgIHJhdGlvSW1hZ2UgPSBpbWFnZVdpZHRoIC8gaW1hZ2VIZWlnaHRcbiAgICAgICAgcmF0aW9EZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uV2lkdGggLyBkZXN0aW5hdGlvbkhlaWdodFxuXG4gICAgICAgIHdpZHRoID0gZGVzdGluYXRpb25XaWR0aFxuICAgICAgICBoZWlnaHQgPSBkZXN0aW5hdGlvbkhlaWdodFxuXG4gICAgICAgIGlmIHJhdGlvRGVzdGluYXRpb24gPiByYXRpb0ltYWdlXG4gICAgICAgICAgICBoZWlnaHQgPSBkZXN0aW5hdGlvbldpZHRoIC8gcmF0aW9JbWFnZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3aWR0aCA9IGRlc3RpbmF0aW9uSGVpZ2h0ICogcmF0aW9JbWFnZVxuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UgaW1hZ2UsIDAsIDAsIGltYWdlV2lkdGgsIGltYWdlSGVpZ2h0LCAwLCAwLCB3aWR0aCwgaGVpZ2h0XG5cblxuICAgIEBmaXRJbWFnZTogKGN0eCwgaW1hZ2UsIGltYWdlV2lkdGgsIGltYWdlSGVpZ2h0LCBkZXN0aW5hdGlvbldpZHRoLCBkZXN0aW5hdGlvbkhlaWdodCkgLT5cbiAgICAgICAgcmF0aW9JbWFnZSA9IGltYWdlV2lkdGggLyBpbWFnZUhlaWdodFxuICAgICAgICByYXRpb0Rlc3RpbmF0aW9uID0gZGVzdGluYXRpb25XaWR0aCAvIGRlc3RpbmF0aW9uSGVpZ2h0XG5cbiAgICAgICAgd2lkdGggPSBkZXN0aW5hdGlvbldpZHRoXG4gICAgICAgIGhlaWdodCA9IGRlc3RpbmF0aW9uSGVpZ2h0XG5cbiAgICAgICAgaWYgcmF0aW9EZXN0aW5hdGlvbiA+IHJhdGlvSW1hZ2VcbiAgICAgICAgICAgIHdpZHRoID0gaW1hZ2VXaWR0aCAqIGRlc3RpbmF0aW9uSGVpZ2h0IC8gaW1hZ2VIZWlnaHRcbiAgICAgICAgICAgIGhlaWdodCA9IGRlc3RpbmF0aW9uSGVpZ2h0XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHdpZHRoID0gZGVzdGluYXRpb25XaWR0aFxuICAgICAgICAgICAgaGVpZ2h0ID0gaW1hZ2VIZWlnaHQgKiBkZXN0aW5hdGlvbldpZHRoIC8gaW1hZ2VXaWR0aFxuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UgaW1hZ2UsIDAsIDAsIGltYWdlV2lkdGgsIGltYWdlSGVpZ2h0LCAwLCAwLCB3aWR0aCwgaGVpZ2h0XG5cblxubW9kdWxlLmV4cG9ydHMgPSBHcmFwaGljc01hbmFnZXIiLCJjbGFzcyBJbnB1dE1hbmFnZXJcbiAgICBAbW91c2U6XG4gICAgICAgIHg6IDBcbiAgICAgICAgeTogMFxuXG4gICAgQGtleTpcbiAgICAgICAgdXA6IGZhbHNlXG4gICAgICAgIGRvd246IGZhbHNlXG4gICAgICAgIGxlZnQ6IGZhbHNlXG4gICAgICAgIHJpZ2h0OiBmYWxzZVxuXG4gICAgQGluaXQ6IC0+XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCBJbnB1dE1hbmFnZXIubW91c2VDbGlja1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyIFwibW91c2Vtb3ZlXCIsIElucHV0TWFuYWdlci5tb3VzZU1vdmVcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleXVwXCIsIElucHV0TWFuYWdlci5rZXlVcFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyIFwia2V5ZG93blwiLCBJbnB1dE1hbmFnZXIua2V5RG93blxuXG4gICAgQG1vdXNlQ2xpY2s6IChlKSAtPiBJbnB1dE1hbmFnZXIub25Nb3VzZUNsaWNrPyBlXG5cbiAgICBAbW91c2VNb3ZlOiAoZSkgLT5cbiAgICAgICAgSW5wdXRNYW5hZ2VyLm1vdXNlLnggPSBlLnhcbiAgICAgICAgSW5wdXRNYW5hZ2VyLm1vdXNlLnkgPSBlLnlcbiAgICAgICAgSW5wdXRNYW5hZ2VyLm9uTW91c2VNb3ZlPyBlXG5cbiAgICBAa2V5VXA6IChlKSAtPlxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzggdGhlbiBJbnB1dE1hbmFnZXIua2V5LnVwID0gZmFsc2VcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDQwIHRoZW4gSW5wdXRNYW5hZ2VyLmtleS5kb3duID0gZmFsc2VcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM3IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS5sZWZ0ID0gZmFsc2VcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM5IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS5yaWdodCA9IGZhbHNlXG5cbiAgICAgICAgSW5wdXRNYW5hZ2VyLm9uS2V5VXA/IGVcblxuICAgIEBrZXlEb3duOiAoZSkgLT5cbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM4IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS51cCA9IHRydWVcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDQwIHRoZW4gSW5wdXRNYW5hZ2VyLmtleS5kb3duID0gdHJ1ZVxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzcgdGhlbiBJbnB1dE1hbmFnZXIua2V5LmxlZnQgPSB0cnVlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzOSB0aGVuIElucHV0TWFuYWdlci5rZXkucmlnaHQgPSB0cnVlXG5cbiAgICAgICAgSW5wdXRNYW5hZ2VyLm9uS2V5RG93bj8gZVxuXG4gICAgQG9uTW91c2VDbGljazogKGUpIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uTW91c2VNb3ZlOiAoZSkgLT4gIyBVc2VyIGxldmVsIGhvb2tcbiAgICBAb25LZXlVcDogKGUpIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uS2V5RG93bjogKGUpIC0+ICMgVXNlciBsZXZlbCBob29rXG5cblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dE1hbmFnZXJcbiIsImNsYXNzIFNjZW5lTWFuYWdlclxuICAgIEBjdXJyZW50U2NlbmU6IFwiYm9vdFwiXG4gICAgQHNjZW5lczoge31cblxuICAgIEBhZGQ6IChuYW1lLCBzY2VuZSkgLT5cbiAgICAgICAgU2NlbmVNYW5hZ2VyLnNjZW5lc1tuYW1lXSA9IHNjZW5lXG4gICAgICAgIHJldHVybiBudWxsXG5cbiAgICBAY3VycmVudDogLT4gU2NlbmVNYW5hZ2VyLnNjZW5lc1tTY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXVxuXG4gICAgQGFjdGl2YXRlOiAobmFtZSkgLT5cbiAgICAgICAgb2xkID0gU2NlbmVNYW5hZ2VyLmN1cnJlbnQoKVxuICAgICAgICBvbGQuZGVhY3RpdmF0ZSgpIGlmIG9sZFxuICAgICAgICBTY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lID0gbmFtZVxuICAgICAgICBTY2VuZU1hbmFnZXIub25BY3RpdmF0ZSBuYW1lXG4gICAgICAgIFNjZW5lTWFuYWdlci5jdXJyZW50KCk/LmFjdGl2YXRlKClcbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgIEBvbkFjdGl2YXRlOiAobmFtZSkgLT4gIyBVc2VyIGxldmVsIGhvb2tcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lTWFuYWdlciIsImNsYXNzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBzeXN0ZW1zID0gW11cblxuICAgIGFkZFN5c3RlbTogKHN5c3RlbSkgLT5cbiAgICAgICAgQHN5c3RlbXMucHVzaCBzeXN0ZW1cbiAgICAgICAgcmV0dXJuIHN5c3RlbVxuXG4gICAgaW5pdDogLT5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICBkZWFjdGl2YXRlOiAtPlxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lIiwiY2xhc3MgVXRpbFxuICAgIEBsb2FkSlNPTjogKHVybCkgLT4gVXRpbC5sb2FkKHVybCkudGhlbihKU09OLnBhcnNlKVxuXG4gICAgQGxvYWQ6ICh1cmwpIC0+XG4gICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSAtPlxuICAgICAgICAgICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgICAgICN4aHIucmVzcG9uc2VUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIHhoci5vcGVuIFwiR0VUXCIsIHVybCwgdHJ1ZVxuICAgICAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIgXCJyZWFkeXN0YXRlY2hhbmdlXCIsIC0+XG4gICAgICAgICAgICAgICAgaWYgeGhyLnJlYWR5U3RhdGUgaXMgNFxuICAgICAgICAgICAgICAgICAgICBpZiB4aHIuc3RhdHVzIGluIFsyMDAsIDMwNF1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUgeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QgXCJlcnJvclwiXG4gICAgICAgICAgICB4aHIuc2VuZCgpXG4gICAgICAgIHJldHVybiBwcm9taXNlXG5cblxuICAgIEBsb2FkSW1hZ2U6IChzcmMpIC0+XG4gICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSAtPlxuICAgICAgICAgICAgaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuICAgICAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lciBcImxvYWRcIiwgLT4gcmVzb2x2ZSBAXG4gICAgICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyIFwiZXJyb3JcIiwgLT4gcmVqZWN0IFwiZXJyb3JcIlxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gc3JjXG4gICAgICAgICAgICBpZiBpbWFnZS5jb21wbGV0ZSB0aGVuIHJlc29sdmUgaW1hZ2VcbiAgICAgICAgcmV0dXJuIHByb21pc2VcblxuXG4gICAgQHBsdXJhbGlzZTogKHdvcmQpIC0+XG4gICAgICAgIGxlbiA9IHdvcmQubGVuZ3RoXG5cbiAgICAgICAgbDEgPSB3b3JkLnN1YnN0ciAtMVxuICAgICAgICBsMiA9IHdvcmQuc3Vic3RyIC0yXG5cbiAgICAgICAgaWYgbDEgPT0gXCJ5XCJcbiAgICAgICAgICAgIHdvcmQgPSB3b3JkLnN1YnN0cigwLCBsZW4gLSAxKSArIFwiaWVzXCJcbiAgICAgICAgZWxzZSBpZiBsMSA9PSBcInNcIiB8fCBsMSA9PSBcInhcIiB8fCBsMiA9PSBcImNoXCIgfHwgbDIgPT0gXCJzaFwiIHx8IGwyID09IFwiZXNcIlxuICAgICAgICAgICAgIyBJZiB3b3JkIGVuZHMgaW4gXCJzXCIgXCJ4XCIgb3IgXCJjaFwiIG9yIFwic2hcIiBhZGQgXCJlc1wiXG4gICAgICAgICAgICB3b3JkID0gd29yZCArIFwiZXNcIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3b3JkID0gd29yZCArIFwic1wiXG5cbiAgICAgICAgcmV0dXJuIHdvcmRcblxubW9kdWxlLmV4cG9ydHMgPSBVdGlsIl19
