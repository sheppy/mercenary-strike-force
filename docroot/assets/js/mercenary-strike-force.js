(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AssetManager, BootScene, GraphicsManager, InputManager, PreLoadScene, Scene, SceneManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require("../../../vendor/iki-engine/src/Scene.coffee");

SceneManager = require("../../../vendor/iki-engine/src/Manager/SceneManager.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../../vendor/iki-engine/src/Manager/InputManager.coffee");

AssetManager = require("../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

PreLoadScene = require("./PreLoad.coffee");

BootScene = (function(_super) {
  __extends(BootScene, _super);

  function BootScene() {
    return BootScene.__super__.constructor.apply(this, arguments);
  }

  BootScene.prototype.init = function() {
    var preLoadScene;
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
    return preLoadScene.init();
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


},{"../../../vendor/iki-engine/src/Manager/AssetManager.coffee":5,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":6,"../../../vendor/iki-engine/src/Manager/InputManager.coffee":7,"../../../vendor/iki-engine/src/Manager/SceneManager.coffee":8,"../../../vendor/iki-engine/src/Scene.coffee":9,"./PreLoad.coffee":2}],2:[function(require,module,exports){
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
    return loadAsset = AssetManager.load("assets/assets-game.json");
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


},{"../../../vendor/iki-engine/src/Manager/AssetManager.coffee":5,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":6,"../../../vendor/iki-engine/src/Manager/SceneManager.coffee":8,"../../../vendor/iki-engine/src/Scene.coffee":9}],3:[function(require,module,exports){
var BootScene, Engine, game;

Engine = require("../../vendor/iki-engine/src/Engine.coffee");

BootScene = require("./Scene/Boot.coffee");

game = new Engine;

game.start(new BootScene);


},{"../../vendor/iki-engine/src/Engine.coffee":4,"./Scene/Boot.coffee":1}],4:[function(require,module,exports){
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


},{"./Manager/SceneManager.coffee":8}],5:[function(require,module,exports){
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


},{"../Util.coffee":10}],6:[function(require,module,exports){
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


},{}],7:[function(require,module,exports){
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


},{}],8:[function(require,module,exports){
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
    var old;
    old = SceneManager.current();
    if (old) {
      old.deactivate();
    }
    SceneManager.currentScene = name;
    SceneManager.onActivate(name);
    SceneManager.current().activate();
    return null;
  };

  SceneManager.onActivate = function(name) {};

  return SceneManager;

})();

module.exports = SceneManager;


},{}],9:[function(require,module,exports){
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


},{}],10:[function(require,module,exports){
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


},{}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxnYW1lXFxTY2VuZVxcQm9vdC5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZ2FtZVxcU2NlbmVcXFByZUxvYWQuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFxjb2ZmZWVcXGdhbWVcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2UuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcRW5naW5lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXEFzc2V0TWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxNYW5hZ2VyXFxHcmFwaGljc01hbmFnZXIuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcSW5wdXRNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXFNjZW5lTWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxTY2VuZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxVdGlsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUEseUZBQUE7RUFBQTtpU0FBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLDZDQUFSLENBQVIsQ0FBQTs7QUFBQSxZQUNBLEdBQWUsT0FBQSxDQUFRLDREQUFSLENBRGYsQ0FBQTs7QUFBQSxlQUVBLEdBQWtCLE9BQUEsQ0FBUSwrREFBUixDQUZsQixDQUFBOztBQUFBLFlBR0EsR0FBZSxPQUFBLENBQVEsNERBQVIsQ0FIZixDQUFBOztBQUFBLFlBSUEsR0FBZSxPQUFBLENBQVEsNERBQVIsQ0FKZixDQUFBOztBQUFBLFlBUUEsR0FBZSxPQUFBLENBQVEsa0JBQVIsQ0FSZixDQUFBOztBQUFBO0FBWUksOEJBQUEsQ0FBQTs7OztHQUFBOztBQUFBLHNCQUFBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFFRixRQUFBLFlBQUE7QUFBQSxJQUFBLGVBQWUsQ0FBQyxRQUFoQixHQUEyQixlQUFlLENBQUMsY0FBaEIsQ0FBK0IsR0FBL0IsRUFBb0MsR0FBcEMsRUFBeUMsUUFBUSxDQUFDLElBQWxELENBQTNCLENBQUE7QUFBQSxJQUNBLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQWhDLEdBQXdDLE1BQU0sQ0FBQyxVQUQvQyxDQUFBO0FBQUEsSUFFQSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFoQyxHQUF5QyxNQUFNLENBQUMsV0FGaEQsQ0FBQTtBQUFBLElBSUEsWUFBWSxDQUFDLElBQWIsQ0FBQSxDQUpBLENBQUE7QUFBQSxJQU1BLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxTQUFBLEdBQUE7QUFDOUIsTUFBQSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFoQyxHQUF3QyxNQUFNLENBQUMsVUFBL0MsQ0FBQTthQUNBLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQWhDLEdBQXlDLE1BQU0sQ0FBQyxZQUZsQjtJQUFBLENBQWxDLENBTkEsQ0FBQTtBQUFBLElBVUEsWUFBQSxHQUFtQixJQUFBLFlBQUEsQ0FBQSxDQVZuQixDQUFBO0FBQUEsSUFXQSxZQUFZLENBQUMsR0FBYixDQUFpQixTQUFqQixFQUE0QixZQUE1QixDQVhBLENBQUE7V0FZQSxZQUFZLENBQUMsSUFBYixDQUFBLEVBZEU7RUFBQSxDQUFOLENBQUE7O0FBQUEsc0JBaUJBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDTixRQUFBLFNBQUE7QUFBQSxJQUFBLFNBQUEsR0FBWSxZQUFZLENBQUMsSUFBYixDQUFrQix5QkFBbEIsQ0FBWixDQUFBO1dBQ0EsU0FBUyxDQUFDLElBQVYsQ0FBZSxTQUFBLEdBQUE7YUFBRyxZQUFZLENBQUMsUUFBYixDQUFzQixTQUF0QixFQUFIO0lBQUEsQ0FBZixFQUZNO0VBQUEsQ0FqQlYsQ0FBQTs7bUJBQUE7O0dBRG9CLE1BWHhCLENBQUE7O0FBQUEsTUFrQ00sQ0FBQyxPQUFQLEdBQWlCLFNBbENqQixDQUFBOzs7O0FDQUEsSUFBQSxnRUFBQTtFQUFBO2lTQUFBOztBQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsNkNBQVIsQ0FBUixDQUFBOztBQUFBLFlBQ0EsR0FBZSxPQUFBLENBQVEsNERBQVIsQ0FEZixDQUFBOztBQUFBLGVBRUEsR0FBa0IsT0FBQSxDQUFRLCtEQUFSLENBRmxCLENBQUE7O0FBQUEsWUFHQSxHQUFlLE9BQUEsQ0FBUSw0REFBUixDQUhmLENBQUE7O0FBQUE7QUFPSSxpQ0FBQSxDQUFBOzs7O0dBQUE7O0FBQUEseUJBQUEsSUFBQSxHQUFNLFNBQUEsR0FBQTtXQUNGLElBQUMsQ0FBQSxRQUFELEdBQVksZUFBZSxDQUFDLFNBRDFCO0VBQUEsQ0FBTixDQUFBOztBQUFBLHlCQUlBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDTixRQUFBLFNBQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxHQUFELEdBQ0k7QUFBQSxNQUFBLFVBQUEsRUFBWSxZQUFZLENBQUMsR0FBYixDQUFpQiwyQkFBakIsQ0FBWjtBQUFBLE1BQ0EsSUFBQSxFQUFNLFlBQVksQ0FBQyxHQUFiLENBQWlCLDZCQUFqQixDQUROO0FBQUEsTUFFQSxDQUFBLEVBQUcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFoQyxHQUF3QyxDQUF6QyxDQUFBLEdBQThDLEVBRmpEO0FBQUEsTUFHQSxDQUFBLEVBQUcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFoQyxHQUF5QyxDQUExQyxDQUFBLEdBQStDLEVBSGxEO0FBQUEsTUFJQSxLQUFBLEVBQU8sR0FKUDtBQUFBLE1BS0EsTUFBQSxFQUFRLEVBTFI7S0FESixDQUFBO0FBQUEsSUFRQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsR0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLENBQUwsR0FBUyxDQUFDLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxHQUFhLENBQWQsQ0FSdkIsQ0FBQTtBQUFBLElBVUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBZCxHQUEwQixNQVYxQixDQUFBO0FBQUEsSUFXQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFkLENBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQTlDLEVBQXFELElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQXRFLENBWEEsQ0FBQTtBQUFBLElBYUEsSUFBQyxDQUFBLGdCQUFELENBQWtCLENBQWxCLENBYkEsQ0FBQTtBQUFBLElBY0EsSUFBQyxDQUFBLGlCQUFELENBQW1CLFlBQW5CLENBZEEsQ0FBQTtBQUFBLElBZ0JBLFlBQVksQ0FBQyxZQUFiLEdBQTRCLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFpQixJQUFqQixDQWhCNUIsQ0FBQTtBQUFBLElBaUJBLFlBQVksQ0FBQyxVQUFiLEdBQTBCLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFpQixJQUFqQixDQWpCMUIsQ0FBQTtBQUFBLElBa0JBLFlBQVksQ0FBQyxPQUFiLEdBQXVCLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLElBQWQsQ0FsQnZCLENBQUE7V0FvQkEsU0FBQSxHQUFZLFlBQVksQ0FBQyxJQUFiLENBQWtCLHlCQUFsQixFQXJCTjtFQUFBLENBSlYsQ0FBQTs7QUFBQSx5QkE2QkEsT0FBQSxHQUFTLFNBQUMsS0FBRCxHQUFBO0FBQ0wsUUFBQSxjQUFBO0FBQUEsSUFBQSxJQUFBLEdBQVEsZ0JBQUEsR0FBZSxLQUFLLENBQUMsSUFBN0IsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBZCxHQUEwQixNQUQxQixDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFkLENBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQTlDLEVBQXFELElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQXRFLENBRkEsQ0FBQTtBQUFBLElBR0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBZCxHQUEwQixTQUgxQixDQUFBO0FBQUEsSUFJQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFkLEdBQXFCLHdCQUpyQixDQUFBO0FBQUEsSUFLQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFkLEdBQTZCLEtBTDdCLENBQUE7QUFBQSxJQU1BLFFBQUEsR0FBVyxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFkLENBQTBCLElBQTFCLENBTlgsQ0FBQTtXQU9BLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQWQsQ0FBdUIsSUFBdkIsRUFBNkIsSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLEdBQWMsQ0FBQyxRQUFRLENBQUMsS0FBVCxHQUFpQixDQUFsQixDQUEzQyxFQUFpRSxJQUFDLENBQUEsR0FBRyxDQUFDLENBQUwsR0FBUyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQWQsR0FBdUIsRUFBeEYsRUFSSztFQUFBLENBN0JULENBQUE7O0FBQUEseUJBd0NBLFVBQUEsR0FBWSxTQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixLQUF2QixHQUFBO0FBQ1IsSUFBQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFkLEdBQTBCLE1BQTFCLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQWQsQ0FBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBOUMsRUFBcUQsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBdEUsQ0FEQSxDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsaUJBQUQsQ0FBb0IsVUFBQSxHQUFTLEtBQTdCLENBRkEsQ0FBQTtXQUdBLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixNQUFBLEdBQVMsS0FBM0IsRUFKUTtFQUFBLENBeENaLENBQUE7O0FBQUEseUJBK0NBLGlCQUFBLEdBQW1CLFNBQUMsSUFBRCxHQUFBO0FBQ2YsUUFBQSxRQUFBO0FBQUEsSUFBQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFkLEdBQTBCLFNBQTFCLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLElBQWQsR0FBcUIsd0JBRHJCLENBQUE7QUFBQSxJQUVBLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQWQsR0FBNkIsS0FGN0IsQ0FBQTtBQUFBLElBR0EsUUFBQSxHQUFXLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQWQsQ0FBMEIsSUFBMUIsQ0FIWCxDQUFBO1dBSUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBZCxDQUF1QixJQUF2QixFQUE2QixJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsR0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFULEdBQWlCLENBQWxCLENBQTNDLEVBQWlFLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBTCxHQUFTLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBZCxHQUF1QixFQUF4RixFQUxlO0VBQUEsQ0EvQ25CLENBQUE7O0FBQUEseUJBd0RBLGdCQUFBLEdBQWtCLFNBQUMsT0FBRCxHQUFBO0FBRWQsSUFBQSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFkLENBQXdCLElBQUMsQ0FBQSxHQUFHLENBQUMsVUFBN0IsRUFBeUMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxDQUE5QyxFQUFpRCxJQUFDLENBQUEsR0FBRyxDQUFDLENBQXRELENBQUEsQ0FBQTtXQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQWQsQ0FBd0IsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUE3QixFQUNRLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBTCxHQUFTLENBRGpCLEVBQ29CLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FEekIsRUFFUSxDQUFDLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxHQUFhLEVBQWQsQ0FBQSxHQUFvQixPQUY1QixFQUVxQyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BRjFDLEVBSGM7RUFBQSxDQXhEbEIsQ0FBQTs7c0JBQUE7O0dBRHVCLE1BTjNCLENBQUE7O0FBQUEsTUF1RU0sQ0FBQyxPQUFQLEdBQWlCLFlBdkVqQixDQUFBOzs7O0FDQUEsSUFBQSx1QkFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLDJDQUFSLENBQVQsQ0FBQTs7QUFBQSxTQUVBLEdBQVksT0FBQSxDQUFRLHFCQUFSLENBRlosQ0FBQTs7QUFBQSxJQUlBLEdBQU8sR0FBQSxDQUFBLE1BSlAsQ0FBQTs7QUFBQSxJQUtJLENBQUMsS0FBTCxDQUFXLEdBQUEsQ0FBQSxTQUFYLENBTEEsQ0FBQTs7OztBQ0FBLElBQUEsb0JBQUE7O0FBQUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSwrQkFBUixDQUFmLENBQUE7O0FBQUE7QUFHaUIsRUFBQSxnQkFBQSxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsWUFBRCxHQUFnQixJQUFJLENBQUMsR0FBTCxDQUFBLENBQWhCLENBRFM7RUFBQSxDQUFiOztBQUFBLG1CQUdBLEtBQUEsR0FBTyxTQUFDLEtBQUQsR0FBQTtBQUNILElBQUEsWUFBWSxDQUFDLEdBQWIsQ0FBaUIsTUFBakIsRUFBeUIsS0FBekIsQ0FBQSxDQUFBO0FBQUEsSUFDQSxLQUFLLENBQUMsSUFBTixDQUFBLENBREEsQ0FBQTtBQUFBLElBRUEsWUFBWSxDQUFDLFFBQWIsQ0FBc0IsTUFBdEIsQ0FGQSxDQUFBO1dBR0EsSUFBQyxDQUFBLFFBQUQsQ0FBQSxFQUpHO0VBQUEsQ0FIUCxDQUFBOztBQUFBLG1CQVNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDTixJQUFBLHFCQUFBLENBQXNCLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLElBQWYsQ0FBdEIsQ0FBQSxDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsZUFBRCxHQUFtQixJQUFJLENBQUMsR0FBTCxDQUFBLENBRm5CLENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLGVBQUQsR0FBbUIsSUFBQyxDQUFBLFlBSDdCLENBQUE7QUFBQSxJQUlBLElBQUMsQ0FBQSxZQUFELEdBQWdCLElBQUMsQ0FBQSxlQUpqQixDQUFBO0FBQUEsSUFNQSxJQUFDLENBQUEsTUFBRCxDQUFRLElBQUMsQ0FBQSxLQUFULENBTkEsQ0FBQTtBQU9BLFdBQU8sSUFBUCxDQVJNO0VBQUEsQ0FUVixDQUFBOztBQUFBLG1CQW1CQSxNQUFBLEdBQVEsU0FBQyxFQUFELEdBQUE7QUFDSixRQUFBLDZCQUFBO0FBQUEsSUFBQSxLQUFBLEdBQVEsWUFBWSxDQUFDLE9BQWIsQ0FBQSxDQUFSLENBQUE7QUFFQTtBQUFBLFNBQUEsMkNBQUE7d0JBQUE7QUFDSSxNQUFBLE1BQU0sQ0FBQyxNQUFQLENBQWMsRUFBZCxDQUFBLENBREo7QUFBQSxLQUZBO0FBSUEsV0FBTyxJQUFQLENBTEk7RUFBQSxDQW5CUixDQUFBOztnQkFBQTs7SUFISixDQUFBOztBQUFBLE1BOEJNLENBQUMsT0FBUCxHQUFpQixNQTlCakIsQ0FBQTs7OztBQ0FBLElBQUEsa0JBQUE7O0FBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxnQkFBUixDQUFQLENBQUE7O0FBQUE7NEJBR0k7O0FBQUEsRUFBQSxZQUFDLENBQUEsTUFBRCxHQUFVLEVBQVYsQ0FBQTs7QUFBQSxFQUNBLFlBQUMsQ0FBQSxTQUFELEdBQWEsQ0FEYixDQUFBOztBQUFBLEVBRUEsWUFBQyxDQUFBLFlBQUQsR0FBZ0IsQ0FGaEIsQ0FBQTs7QUFBQSxFQUlBLFlBQUMsQ0FBQSxJQUFELEdBQU8sU0FBQyxRQUFELEdBQUE7QUFDSCxRQUFBLE9BQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxTQUFELEdBQWEsQ0FBYixDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsWUFBRCxHQUFnQixDQURoQixDQUFBO0FBQUEsSUFHQSxPQUFBLEdBQWMsSUFBQSxPQUFBLENBQVEsU0FBQyxPQUFELEdBQUE7QUFDbEIsVUFBQSxZQUFBO0FBQUEsTUFBQSxZQUFBLEdBQWUsSUFBSSxDQUFDLFFBQUwsQ0FBYyxRQUFkLENBQWYsQ0FBQTthQUNBLFlBQVksQ0FBQyxJQUFiLENBQWtCLFNBQUMsSUFBRCxHQUFBO0FBQ2QsWUFBQSxtRUFBQTtBQUFBO0FBQUEsYUFBQSxTQUFBOytCQUFBO0FBQ0ksZUFBQSxpREFBQTsrQkFBQTtBQUNJLFlBQUEsWUFBWSxDQUFDLFNBQWIsRUFBQSxDQURKO0FBQUEsV0FESjtBQUFBLFNBQUE7QUFJQTtBQUFBO2FBQUEsa0JBQUE7d0NBQUE7QUFDSTs7QUFBQTtpQkFBQSxtREFBQTtxQ0FBQTs7Z0JBQ0ksWUFBWSxDQUFDLGFBQWMsT0FDdkIsV0FDQSxZQUFZLENBQUMsY0FDYixZQUFZLENBQUM7ZUFIakI7QUFBQSw2QkFLRyxDQUFBLFNBQUMsS0FBRCxHQUFBO0FBRUMsb0JBQUEsU0FBQTtBQUFBLGdCQUFBLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBYyxPQUFqQjtBQUNJLGtCQUFBLFNBQUEsR0FBWSxJQUFJLENBQUMsU0FBTCxDQUFlLElBQUksQ0FBQyxJQUFMLEdBQVksS0FBSyxDQUFDLElBQWpDLENBQVosQ0FBQTtBQUFBLGtCQUNBLFNBQVMsQ0FBQyxJQUFWLENBQWUsU0FBQyxHQUFELEdBQUE7MkJBQVMsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsS0FBekIsRUFBZ0MsU0FBaEMsRUFBMkMsT0FBM0MsRUFBb0QsR0FBcEQsRUFBVDtrQkFBQSxDQUFmLENBREEsQ0FESjtpQkFBQSxNQUdLLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBYyxNQUFqQjtBQUNELGtCQUFBLFNBQUEsR0FBWSxJQUFJLENBQUMsUUFBTCxDQUFjLElBQUksQ0FBQyxJQUFMLEdBQVksS0FBSyxDQUFDLElBQWhDLENBQVosQ0FBQTtBQUFBLGtCQUNBLFNBQVMsQ0FBQyxJQUFWLENBQWUsU0FBQyxJQUFELEdBQUE7MkJBQVUsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsS0FBekIsRUFBZ0MsU0FBaEMsRUFBMkMsT0FBM0MsRUFBb0QsSUFBcEQsRUFBVjtrQkFBQSxDQUFmLENBREEsQ0FEQztpQkFBQSxNQUFBO0FBSUQsa0JBQUEsU0FBQSxHQUFZLElBQUksQ0FBQyxJQUFMLENBQVUsSUFBSSxDQUFDLElBQUwsR0FBWSxLQUFLLENBQUMsSUFBNUIsQ0FBWixDQUFBO0FBQUEsa0JBQ0EsU0FBUyxDQUFDLElBQVYsQ0FBZSxTQUFBLEdBQUE7MkJBQUcsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsS0FBekIsRUFBZ0MsU0FBaEMsRUFBMkMsT0FBM0MsRUFBSDtrQkFBQSxDQUFmLENBREEsQ0FKQztpQkFITDt1QkFVQSxTQUFTLENBQUMsT0FBRCxDQUFULENBQWdCLFNBQUEsR0FBQTt5QkFBRyxZQUFZLENBQUMsT0FBYixDQUFxQixLQUFyQixFQUE0QixTQUE1QixFQUFIO2dCQUFBLENBQWhCLEVBWkQ7Y0FBQSxDQUFBLENBQUgsQ0FBSSxLQUFKLEVBTEEsQ0FESjtBQUFBOztlQUFBLENBREo7QUFBQTt3QkFMYztNQUFBLENBQWxCLEVBRmtCO0lBQUEsQ0FBUixDQUhkLENBQUE7QUErQkEsV0FBTyxPQUFQLENBaENHO0VBQUEsQ0FKUCxDQUFBOztBQUFBLEVBc0NBLFlBQUMsQ0FBQSxXQUFELEdBQWMsU0FBQyxLQUFELEVBQVEsU0FBUixFQUFtQixPQUFuQixFQUE0QixJQUE1QixHQUFBO0FBQ1YsSUFBQSxJQUFHLElBQUg7QUFBYSxNQUFBLFlBQVksQ0FBQyxNQUFPLENBQUEsS0FBSyxDQUFDLElBQU4sQ0FBcEIsR0FBa0MsSUFBbEMsQ0FBYjtLQUFBO0FBQUEsSUFDQSxZQUFZLENBQUMsWUFBYixFQURBLENBQUE7O01BRUEsWUFBWSxDQUFDLFdBQVksT0FDckIsV0FDQSxZQUFZLENBQUMsY0FDYixZQUFZLENBQUM7S0FMakI7QUFPQSxJQUFBLElBQUcsWUFBWSxDQUFDLFlBQWIsS0FBNkIsWUFBWSxDQUFDLFNBQTdDOztRQUNJLFlBQVksQ0FBQztPQUFiO2FBQ0EsT0FBQSxDQUFBLEVBRko7S0FSVTtFQUFBLENBdENkLENBQUE7O0FBQUEsRUFrREEsWUFBQyxDQUFBLFlBQUQsR0FBZSxTQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixLQUF2QixHQUFBLENBbERmLENBQUE7O0FBQUEsRUFtREEsWUFBQyxDQUFBLFVBQUQsR0FBYSxTQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixLQUF2QixHQUFBLENBbkRiLENBQUE7O0FBQUEsRUFvREEsWUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLEtBQUQsRUFBUSxLQUFSLEdBQUEsQ0FwRFYsQ0FBQTs7QUFBQSxFQXFEQSxZQUFDLENBQUEsUUFBRCxHQUFXLFNBQUEsR0FBQSxDQXJEWCxDQUFBOztBQUFBLEVBdURBLFlBQUMsQ0FBQSxHQUFELEdBQU0sU0FBQyxLQUFELEdBQUE7V0FBVyxZQUFZLENBQUMsTUFBTyxDQUFBLEtBQUEsRUFBL0I7RUFBQSxDQXZETixDQUFBOztzQkFBQTs7SUFISixDQUFBOztBQUFBLE1BNkRNLENBQUMsT0FBUCxHQUFpQixZQTdEakIsQ0FBQTs7OztBQ0FBLElBQUEsZUFBQTs7QUFBQTsrQkFFSTs7QUFBQSxFQUFBLGVBQUMsQ0FBQSxZQUFELEdBQWUsU0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixRQUFoQixHQUFBO0FBQ1gsUUFBQSxNQUFBO0FBQUEsSUFBQSxNQUFBLEdBQVMsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBVCxDQUFBO0FBQUEsSUFDQSxNQUFNLENBQUMsS0FBUCxHQUFlLEtBRGYsQ0FBQTtBQUFBLElBRUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsTUFGaEIsQ0FBQTtBQUlBLElBQUEsSUFBRyxRQUFIO0FBQWlCLE1BQUEsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsTUFBckIsQ0FBQSxDQUFqQjtLQUpBO0FBTUEsV0FBTyxNQUFQLENBUFc7RUFBQSxDQUFmLENBQUE7O0FBQUEsRUFVQSxlQUFDLENBQUEsY0FBRCxHQUFpQixTQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLFFBQWhCLEdBQUE7QUFDYixRQUFBLFFBQUE7QUFBQSxJQUFBLFFBQUEsR0FBVyxFQUFYLENBQUE7QUFBQSxJQUNBLFFBQVEsQ0FBQyxNQUFULEdBQWtCLGVBQWUsQ0FBQyxZQUFoQixDQUE2QixLQUE3QixFQUFvQyxNQUFwQyxFQUE0QyxRQUE1QyxDQURsQixDQUFBO0FBQUEsSUFFQSxRQUFRLENBQUMsR0FBVCxHQUFlLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBaEIsQ0FBMkIsSUFBM0IsQ0FGZixDQUFBO0FBR0EsV0FBTyxRQUFQLENBSmE7RUFBQSxDQVZqQixDQUFBOztBQUFBLEVBaUJBLGVBQUMsQ0FBQSxTQUFELEdBQVksU0FBQyxHQUFELEVBQU0sS0FBTixFQUFhLFVBQWIsRUFBeUIsV0FBekIsRUFBc0MsZ0JBQXRDLEVBQXdELGlCQUF4RCxHQUFBO0FBQ1IsUUFBQSwyQ0FBQTtBQUFBLElBQUEsVUFBQSxHQUFhLFVBQUEsR0FBYSxXQUExQixDQUFBO0FBQUEsSUFDQSxnQkFBQSxHQUFtQixnQkFBQSxHQUFtQixpQkFEdEMsQ0FBQTtBQUFBLElBR0EsS0FBQSxHQUFRLGdCQUhSLENBQUE7QUFBQSxJQUlBLE1BQUEsR0FBUyxpQkFKVCxDQUFBO0FBTUEsSUFBQSxJQUFHLGdCQUFBLEdBQW1CLFVBQXRCO0FBQ0ksTUFBQSxNQUFBLEdBQVMsZ0JBQUEsR0FBbUIsVUFBNUIsQ0FESjtLQUFBLE1BQUE7QUFHSSxNQUFBLEtBQUEsR0FBUSxpQkFBQSxHQUFvQixVQUE1QixDQUhKO0tBTkE7V0FXQSxHQUFHLENBQUMsU0FBSixDQUFjLEtBQWQsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsVUFBM0IsRUFBdUMsV0FBdkMsRUFBb0QsQ0FBcEQsRUFBdUQsQ0FBdkQsRUFBMEQsS0FBMUQsRUFBaUUsTUFBakUsRUFaUTtFQUFBLENBakJaLENBQUE7O0FBQUEsRUFnQ0EsZUFBQyxDQUFBLFFBQUQsR0FBVyxTQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWEsVUFBYixFQUF5QixXQUF6QixFQUFzQyxnQkFBdEMsRUFBd0QsaUJBQXhELEdBQUE7QUFDUCxRQUFBLDJDQUFBO0FBQUEsSUFBQSxVQUFBLEdBQWEsVUFBQSxHQUFhLFdBQTFCLENBQUE7QUFBQSxJQUNBLGdCQUFBLEdBQW1CLGdCQUFBLEdBQW1CLGlCQUR0QyxDQUFBO0FBQUEsSUFHQSxLQUFBLEdBQVEsZ0JBSFIsQ0FBQTtBQUFBLElBSUEsTUFBQSxHQUFTLGlCQUpULENBQUE7QUFNQSxJQUFBLElBQUcsZ0JBQUEsR0FBbUIsVUFBdEI7QUFDSSxNQUFBLEtBQUEsR0FBUSxVQUFBLEdBQWEsaUJBQWIsR0FBaUMsV0FBekMsQ0FBQTtBQUFBLE1BQ0EsTUFBQSxHQUFTLGlCQURULENBREo7S0FBQSxNQUFBO0FBSUksTUFBQSxLQUFBLEdBQVEsZ0JBQVIsQ0FBQTtBQUFBLE1BQ0EsTUFBQSxHQUFTLFdBQUEsR0FBYyxnQkFBZCxHQUFpQyxVQUQxQyxDQUpKO0tBTkE7V0FhQSxHQUFHLENBQUMsU0FBSixDQUFjLEtBQWQsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsVUFBM0IsRUFBdUMsV0FBdkMsRUFBb0QsQ0FBcEQsRUFBdUQsQ0FBdkQsRUFBMEQsS0FBMUQsRUFBaUUsTUFBakUsRUFkTztFQUFBLENBaENYLENBQUE7O3lCQUFBOztJQUZKLENBQUE7O0FBQUEsTUFtRE0sQ0FBQyxPQUFQLEdBQWlCLGVBbkRqQixDQUFBOzs7O0FDQUEsSUFBQSxZQUFBOztBQUFBOzRCQUNJOztBQUFBLEVBQUEsWUFBQyxDQUFBLEtBQUQsR0FDSTtBQUFBLElBQUEsQ0FBQSxFQUFHLENBQUg7QUFBQSxJQUNBLENBQUEsRUFBRyxDQURIO0dBREosQ0FBQTs7QUFBQSxFQUlBLFlBQUMsQ0FBQSxHQUFELEdBQ0k7QUFBQSxJQUFBLEVBQUEsRUFBSSxLQUFKO0FBQUEsSUFDQSxJQUFBLEVBQU0sS0FETjtBQUFBLElBRUEsSUFBQSxFQUFNLEtBRk47QUFBQSxJQUdBLEtBQUEsRUFBTyxLQUhQO0dBTEosQ0FBQTs7QUFBQSxFQVVBLFlBQUMsQ0FBQSxJQUFELEdBQU8sU0FBQSxHQUFBO0FBQ0gsSUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBWSxDQUFDLFVBQWhELENBQUEsQ0FBQTtBQUFBLElBQ0EsUUFBUSxDQUFDLGdCQUFULENBQTBCLFdBQTFCLEVBQXVDLFlBQVksQ0FBQyxTQUFwRCxDQURBLENBQUE7QUFBQSxJQUVBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxZQUFZLENBQUMsS0FBaEQsQ0FGQSxDQUFBO1dBR0EsUUFBUSxDQUFDLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDLFlBQVksQ0FBQyxPQUFsRCxFQUpHO0VBQUEsQ0FWUCxDQUFBOztBQUFBLEVBZ0JBLFlBQUMsQ0FBQSxVQUFELEdBQWEsU0FBQyxDQUFELEdBQUE7NkRBQU8sWUFBWSxDQUFDLGFBQWMsWUFBbEM7RUFBQSxDQWhCYixDQUFBOztBQUFBLEVBa0JBLFlBQUMsQ0FBQSxTQUFELEdBQVksU0FBQyxDQUFELEdBQUE7QUFDUixJQUFBLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBbkIsR0FBdUIsQ0FBQyxDQUFDLENBQXpCLENBQUE7QUFBQSxJQUNBLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBbkIsR0FBdUIsQ0FBQyxDQUFDLENBRHpCLENBQUE7NERBRUEsWUFBWSxDQUFDLFlBQWEsWUFIbEI7RUFBQSxDQWxCWixDQUFBOztBQUFBLEVBdUJBLFlBQUMsQ0FBQSxLQUFELEdBQVEsU0FBQyxDQUFELEdBQUE7QUFDSixJQUFBLElBQUcsQ0FBQyxDQUFDLE9BQUYsS0FBYSxFQUFoQjtBQUF3QixNQUFBLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBakIsR0FBc0IsS0FBdEIsQ0FBeEI7S0FBQTtBQUNBLElBQUEsSUFBRyxDQUFDLENBQUMsT0FBRixLQUFhLEVBQWhCO0FBQXdCLE1BQUEsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFqQixHQUF3QixLQUF4QixDQUF4QjtLQURBO0FBRUEsSUFBQSxJQUFHLENBQUMsQ0FBQyxPQUFGLEtBQWEsRUFBaEI7QUFBd0IsTUFBQSxZQUFZLENBQUMsR0FBRyxDQUFDLElBQWpCLEdBQXdCLEtBQXhCLENBQXhCO0tBRkE7QUFHQSxJQUFBLElBQUcsQ0FBQyxDQUFDLE9BQUYsS0FBYSxFQUFoQjtBQUF3QixNQUFBLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBakIsR0FBeUIsS0FBekIsQ0FBeEI7S0FIQTt3REFLQSxZQUFZLENBQUMsUUFBUyxZQU5sQjtFQUFBLENBdkJSLENBQUE7O0FBQUEsRUErQkEsWUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLENBQUQsR0FBQTtBQUNOLElBQUEsSUFBRyxDQUFDLENBQUMsT0FBRixLQUFhLEVBQWhCO0FBQXdCLE1BQUEsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFqQixHQUFzQixJQUF0QixDQUF4QjtLQUFBO0FBQ0EsSUFBQSxJQUFHLENBQUMsQ0FBQyxPQUFGLEtBQWEsRUFBaEI7QUFBd0IsTUFBQSxZQUFZLENBQUMsR0FBRyxDQUFDLElBQWpCLEdBQXdCLElBQXhCLENBQXhCO0tBREE7QUFFQSxJQUFBLElBQUcsQ0FBQyxDQUFDLE9BQUYsS0FBYSxFQUFoQjtBQUF3QixNQUFBLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBakIsR0FBd0IsSUFBeEIsQ0FBeEI7S0FGQTtBQUdBLElBQUEsSUFBRyxDQUFDLENBQUMsT0FBRixLQUFhLEVBQWhCO0FBQXdCLE1BQUEsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFqQixHQUF5QixJQUF6QixDQUF4QjtLQUhBOzBEQUtBLFlBQVksQ0FBQyxVQUFXLFlBTmxCO0VBQUEsQ0EvQlYsQ0FBQTs7QUFBQSxFQXVDQSxZQUFDLENBQUEsWUFBRCxHQUFlLFNBQUMsQ0FBRCxHQUFBLENBdkNmLENBQUE7O0FBQUEsRUF3Q0EsWUFBQyxDQUFBLFdBQUQsR0FBYyxTQUFDLENBQUQsR0FBQSxDQXhDZCxDQUFBOztBQUFBLEVBeUNBLFlBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxDQUFELEdBQUEsQ0F6Q1YsQ0FBQTs7QUFBQSxFQTBDQSxZQUFDLENBQUEsU0FBRCxHQUFZLFNBQUMsQ0FBRCxHQUFBLENBMUNaLENBQUE7O3NCQUFBOztJQURKLENBQUE7O0FBQUEsTUE4Q00sQ0FBQyxPQUFQLEdBQWlCLFlBOUNqQixDQUFBOzs7O0FDQUEsSUFBQSxZQUFBOztBQUFBOzRCQUNJOztBQUFBLEVBQUEsWUFBQyxDQUFBLFlBQUQsR0FBZSxNQUFmLENBQUE7O0FBQUEsRUFDQSxZQUFDLENBQUEsTUFBRCxHQUFTLEVBRFQsQ0FBQTs7QUFBQSxFQUdBLFlBQUMsQ0FBQSxHQUFELEdBQU0sU0FBQyxJQUFELEVBQU8sS0FBUCxHQUFBO0FBQ0YsSUFBQSxZQUFZLENBQUMsTUFBTyxDQUFBLElBQUEsQ0FBcEIsR0FBNEIsS0FBNUIsQ0FBQTtBQUNBLFdBQU8sSUFBUCxDQUZFO0VBQUEsQ0FITixDQUFBOztBQUFBLEVBT0EsWUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7V0FBRyxZQUFZLENBQUMsTUFBTyxDQUFBLFlBQVksQ0FBQyxZQUFiLEVBQXZCO0VBQUEsQ0FQVixDQUFBOztBQUFBLEVBU0EsWUFBQyxDQUFBLFFBQUQsR0FBVyxTQUFDLElBQUQsR0FBQTtBQUNQLFFBQUEsR0FBQTtBQUFBLElBQUEsR0FBQSxHQUFNLFlBQVksQ0FBQyxPQUFiLENBQUEsQ0FBTixDQUFBO0FBQ0EsSUFBQSxJQUFvQixHQUFwQjtBQUFBLE1BQUEsR0FBRyxDQUFDLFVBQUosQ0FBQSxDQUFBLENBQUE7S0FEQTtBQUFBLElBRUEsWUFBWSxDQUFDLFlBQWIsR0FBNEIsSUFGNUIsQ0FBQTtBQUFBLElBR0EsWUFBWSxDQUFDLFVBQWIsQ0FBd0IsSUFBeEIsQ0FIQSxDQUFBO0FBQUEsSUFJQSxZQUFZLENBQUMsT0FBYixDQUFBLENBQXNCLENBQUMsUUFBdkIsQ0FBQSxDQUpBLENBQUE7QUFLQSxXQUFPLElBQVAsQ0FOTztFQUFBLENBVFgsQ0FBQTs7QUFBQSxFQWlCQSxZQUFDLENBQUEsVUFBRCxHQUFhLFNBQUMsSUFBRCxHQUFBLENBakJiLENBQUE7O3NCQUFBOztJQURKLENBQUE7O0FBQUEsTUFxQk0sQ0FBQyxPQUFQLEdBQWlCLFlBckJqQixDQUFBOzs7O0FDQUEsSUFBQSxLQUFBOztBQUFBO0FBQ2lCLEVBQUEsZUFBQSxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLEVBQVgsQ0FEUztFQUFBLENBQWI7O0FBQUEsa0JBR0EsU0FBQSxHQUFXLFNBQUMsTUFBRCxHQUFBO0FBQ1AsSUFBQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxNQUFkLENBQUEsQ0FBQTtBQUNBLFdBQU8sTUFBUCxDQUZPO0VBQUEsQ0FIWCxDQUFBOztBQUFBLGtCQU9BLElBQUEsR0FBTSxTQUFBLEdBQUEsQ0FQTixDQUFBOztBQUFBLGtCQVFBLFFBQUEsR0FBVSxTQUFBLEdBQUEsQ0FSVixDQUFBOztBQUFBLGtCQVNBLFVBQUEsR0FBWSxTQUFBLEdBQUEsQ0FUWixDQUFBOztlQUFBOztJQURKLENBQUE7O0FBQUEsTUFZTSxDQUFDLE9BQVAsR0FBaUIsS0FaakIsQ0FBQTs7OztBQ0FBLElBQUEsSUFBQTs7QUFBQTtvQkFDSTs7QUFBQSxFQUFBLElBQUMsQ0FBQSxRQUFELEdBQVcsU0FBQyxHQUFELEdBQUE7V0FBUyxJQUFJLENBQUMsSUFBTCxDQUFVLEdBQVYsQ0FBYyxDQUFDLElBQWYsQ0FBb0IsSUFBSSxDQUFDLEtBQXpCLEVBQVQ7RUFBQSxDQUFYLENBQUE7O0FBQUEsRUFFQSxJQUFDLENBQUEsSUFBRCxHQUFPLFNBQUMsR0FBRCxHQUFBO0FBQ0gsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQWMsSUFBQSxPQUFBLENBQVEsU0FBQyxPQUFELEVBQVUsTUFBVixHQUFBO0FBQ2xCLFVBQUEsR0FBQTtBQUFBLE1BQUEsR0FBQSxHQUFVLElBQUEsY0FBQSxDQUFBLENBQVYsQ0FBQTtBQUFBLE1BRUEsR0FBRyxDQUFDLElBQUosQ0FBUyxLQUFULEVBQWdCLEdBQWhCLEVBQXFCLElBQXJCLENBRkEsQ0FBQTtBQUFBLE1BR0EsR0FBRyxDQUFDLGdCQUFKLENBQXFCLGtCQUFyQixFQUF5QyxTQUFBLEdBQUE7QUFDckMsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFHLEdBQUcsQ0FBQyxVQUFKLEtBQWtCLENBQXJCO0FBQ0ksVUFBQSxZQUFHLEdBQUcsQ0FBQyxPQUFKLEtBQWUsR0FBZixJQUFBLElBQUEsS0FBb0IsR0FBdkI7bUJBQ0ksT0FBQSxDQUFRLEdBQUcsQ0FBQyxZQUFaLEVBREo7V0FBQSxNQUFBO21CQUdJLE1BQUEsQ0FBTyxPQUFQLEVBSEo7V0FESjtTQURxQztNQUFBLENBQXpDLENBSEEsQ0FBQTthQVNBLEdBQUcsQ0FBQyxJQUFKLENBQUEsRUFWa0I7SUFBQSxDQUFSLENBQWQsQ0FBQTtBQVdBLFdBQU8sT0FBUCxDQVpHO0VBQUEsQ0FGUCxDQUFBOztBQUFBLEVBaUJBLElBQUMsQ0FBQSxTQUFELEdBQVksU0FBQyxHQUFELEdBQUE7QUFDUixRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBYyxJQUFBLE9BQUEsQ0FBUSxTQUFDLE9BQUQsRUFBVSxNQUFWLEdBQUE7QUFDbEIsVUFBQSxLQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVksSUFBQSxLQUFBLENBQUEsQ0FBWixDQUFBO0FBQUEsTUFDQSxLQUFLLENBQUMsZ0JBQU4sQ0FBdUIsTUFBdkIsRUFBK0IsU0FBQSxHQUFBO2VBQUcsT0FBQSxDQUFRLElBQVIsRUFBSDtNQUFBLENBQS9CLENBREEsQ0FBQTtBQUFBLE1BRUEsS0FBSyxDQUFDLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFNBQUEsR0FBQTtlQUFHLE1BQUEsQ0FBTyxPQUFQLEVBQUg7TUFBQSxDQUFoQyxDQUZBLENBQUE7QUFBQSxNQUdBLEtBQUssQ0FBQyxHQUFOLEdBQVksR0FIWixDQUFBO0FBSUEsTUFBQSxJQUFHLEtBQUssQ0FBQyxRQUFUO2VBQXVCLE9BQUEsQ0FBUSxLQUFSLEVBQXZCO09BTGtCO0lBQUEsQ0FBUixDQUFkLENBQUE7QUFNQSxXQUFPLE9BQVAsQ0FQUTtFQUFBLENBakJaLENBQUE7O0FBQUEsRUEyQkEsSUFBQyxDQUFBLFNBQUQsR0FBWSxTQUFDLElBQUQsR0FBQTtBQUNSLFFBQUEsV0FBQTtBQUFBLElBQUEsR0FBQSxHQUFNLElBQUksQ0FBQyxNQUFYLENBQUE7QUFBQSxJQUVBLEVBQUEsR0FBSyxJQUFJLENBQUMsTUFBTCxDQUFZLENBQUEsQ0FBWixDQUZMLENBQUE7QUFBQSxJQUdBLEVBQUEsR0FBSyxJQUFJLENBQUMsTUFBTCxDQUFZLENBQUEsQ0FBWixDQUhMLENBQUE7QUFLQSxJQUFBLElBQUcsRUFBQSxLQUFNLEdBQVQ7QUFDSSxNQUFBLElBQUEsR0FBTyxJQUFJLENBQUMsTUFBTCxDQUFZLENBQVosRUFBZSxHQUFBLEdBQU0sQ0FBckIsQ0FBQSxHQUEwQixLQUFqQyxDQURKO0tBQUEsTUFFSyxJQUFHLEVBQUEsS0FBTSxHQUFOLElBQWEsRUFBQSxLQUFNLEdBQW5CLElBQTBCLEVBQUEsS0FBTSxJQUFoQyxJQUF3QyxFQUFBLEtBQU0sSUFBOUMsSUFBc0QsRUFBQSxLQUFNLElBQS9EO0FBRUQsTUFBQSxJQUFBLEdBQU8sSUFBQSxHQUFPLElBQWQsQ0FGQztLQUFBLE1BQUE7QUFJRCxNQUFBLElBQUEsR0FBTyxJQUFBLEdBQU8sR0FBZCxDQUpDO0tBUEw7QUFhQSxXQUFPLElBQVAsQ0FkUTtFQUFBLENBM0JaLENBQUE7O2NBQUE7O0lBREosQ0FBQTs7QUFBQSxNQTRDTSxDQUFDLE9BQVAsR0FBaUIsSUE1Q2pCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlNjZW5lID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TY2VuZS5jb2ZmZWVcIlxuU2NlbmVNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL1NjZW5lTWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuSW5wdXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0lucHV0TWFuYWdlci5jb2ZmZWVcIlxuQXNzZXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0Fzc2V0TWFuYWdlci5jb2ZmZWVcIlxuXG5cbiMgU2NlbmVzXG5QcmVMb2FkU2NlbmUgPSByZXF1aXJlIFwiLi9QcmVMb2FkLmNvZmZlZVwiXG5cblxuY2xhc3MgQm9vdFNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBpbml0OiAtPlxuICAgICAgICAjIFVzZSBHcmFwaGljc01hbmFnZXIgdG8gY3JlYXRlIG1haW4gY2FudmFzXG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlciA9IEdyYXBoaWNzTWFuYWdlci5jcmVhdGVSZW5kZXJlciA2NDAsIDQ4MCwgZG9jdW1lbnQuYm9keVxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcblxuICAgICAgICBJbnB1dE1hbmFnZXIuaW5pdCgpXG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgXCJyZXNpemVcIiwgLT5cbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcblxuICAgICAgICBwcmVMb2FkU2NlbmUgPSBuZXcgUHJlTG9hZFNjZW5lKClcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFkZCBcInByZWxvYWRcIiwgcHJlTG9hZFNjZW5lXG4gICAgICAgIHByZUxvYWRTY2VuZS5pbml0KClcblxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIGxvYWRBc3NldCA9IEFzc2V0TWFuYWdlci5sb2FkIFwiYXNzZXRzL2Fzc2V0cy1ib290Lmpzb25cIlxuICAgICAgICBsb2FkQXNzZXQudGhlbiAtPiBTY2VuZU1hbmFnZXIuYWN0aXZhdGUgXCJwcmVsb2FkXCJcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvb3RTY2VuZSIsIlNjZW5lID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TY2VuZS5jb2ZmZWVcIlxuU2NlbmVNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL1NjZW5lTWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuQXNzZXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0Fzc2V0TWFuYWdlci5jb2ZmZWVcIlxuXG5cbmNsYXNzIFByZUxvYWRTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgaW5pdDogLT5cbiAgICAgICAgQHJlbmRlcmVyID0gR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyXG5cblxuICAgIGFjdGl2YXRlOiAtPlxuICAgICAgICBAYmFyID1cbiAgICAgICAgICAgIGJhY2tncm91bmQ6IEFzc2V0TWFuYWdlci5nZXQgXCJpbWcvdWkvbG9hZGluZy1iYXItYmcucG5nXCJcbiAgICAgICAgICAgIGZpbGw6IEFzc2V0TWFuYWdlci5nZXQgXCJpbWcvdWkvbG9hZGluZy1iYXItZmlsbC5wbmdcIlxuICAgICAgICAgICAgeDogKEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGggLyAyKSAtIDk0XG4gICAgICAgICAgICB5OiAoR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHQgLyAyKSAtIDIyXG4gICAgICAgICAgICB3aWR0aDogMTg4XG4gICAgICAgICAgICBoZWlnaHQ6IDIyXG5cbiAgICAgICAgQGJhci5taWRkbGUgPSBAYmFyLnggKyAoQGJhci53aWR0aCAvIDIpXG5cbiAgICAgICAgQHJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiMwMDBcIlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxSZWN0IDAsIDAsIEByZW5kZXJlci5jYW52YXMud2lkdGgsIEByZW5kZXJlci5jYW52YXMuaGVpZ2h0XG5cbiAgICAgICAgQHJlbmRlckxvYWRpbmdCYXIgMFxuICAgICAgICBAcmVuZGVyTG9hZGluZ1RleHQgXCJMb2FkaW5nLi4uXCJcblxuICAgICAgICBBc3NldE1hbmFnZXIub25CZWZvcmVMb2FkID0gQG9uUHJvZ3Jlc3MuYmluZCBAXG4gICAgICAgIEFzc2V0TWFuYWdlci5vblByb2dyZXNzID0gQG9uUHJvZ3Jlc3MuYmluZCBAXG4gICAgICAgIEFzc2V0TWFuYWdlci5vbkVycm9yID0gQG9uRXJyb3IuYmluZCBAXG5cbiAgICAgICAgbG9hZEFzc2V0ID0gQXNzZXRNYW5hZ2VyLmxvYWQgXCJhc3NldHMvYXNzZXRzLWdhbWUuanNvblwiXG4jICAgICAgICBsb2FkQXNzZXQudGhlbiAtPiBTY2VuZU1hbmFnZXIuYWN0aXZhdGUgXCJtZW51XCJcblxuXG4gICAgb25FcnJvcjogKGFzc2V0KSAtPlxuICAgICAgICB0ZXh0ID0gXCJFcnJvciBsb2FkaW5nICN7YXNzZXQuZmlsZX1cIlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiXG4gICAgICAgIEByZW5kZXJlci5jdHguZmlsbFJlY3QgMCwgMCwgQHJlbmRlcmVyLmNhbnZhcy53aWR0aCwgQHJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcbiAgICAgICAgQHJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiNmZjQ0NDRcIlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZvbnQgPSBcIjE0cHggQXJpYWwsIHNhbnMtc2VyaWZcIlxuICAgICAgICBAcmVuZGVyZXIuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCJcbiAgICAgICAgdGV4dFNpemUgPSBAcmVuZGVyZXIuY3R4Lm1lYXN1cmVUZXh0IHRleHRcbiAgICAgICAgQHJlbmRlcmVyLmN0eC5maWxsVGV4dCB0ZXh0LCBAYmFyLm1pZGRsZSAtICh0ZXh0U2l6ZS53aWR0aCAvIDIpLCBAYmFyLnkgKyBAYmFyLmhlaWdodCArIDEwXG5cblxuICAgIG9uUHJvZ3Jlc3M6IChhc3NldCwgZ3JvdXAsIGxvYWRlZCwgdG90YWwpIC0+XG4gICAgICAgIEByZW5kZXJlci5jdHguZmlsbFN0eWxlID0gXCIjMDAwXCJcbiAgICAgICAgQHJlbmRlcmVyLmN0eC5maWxsUmVjdCAwLCAwLCBAcmVuZGVyZXIuY2FudmFzLndpZHRoLCBAcmVuZGVyZXIuY2FudmFzLmhlaWdodFxuICAgICAgICBAcmVuZGVyTG9hZGluZ1RleHQgXCJMb2FkaW5nICN7Z3JvdXB9XCJcbiAgICAgICAgQHJlbmRlckxvYWRpbmdCYXIgbG9hZGVkIC8gdG90YWxcblxuXG4gICAgcmVuZGVyTG9hZGluZ1RleHQ6ICh0ZXh0KSAtPlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiIzMzQjVFNVwiXG4gICAgICAgIEByZW5kZXJlci5jdHguZm9udCA9IFwiMTRweCBBcmlhbCwgc2Fucy1zZXJpZlwiXG4gICAgICAgIEByZW5kZXJlci5jdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIlxuICAgICAgICB0ZXh0U2l6ZSA9IEByZW5kZXJlci5jdHgubWVhc3VyZVRleHQgdGV4dFxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxUZXh0IHRleHQsIEBiYXIubWlkZGxlIC0gKHRleHRTaXplLndpZHRoIC8gMiksIEBiYXIueSArIEBiYXIuaGVpZ2h0ICsgMTBcblxuXG4gICAgIyBUT0RPOiBHbG93IG9uIGJhciBhcHBlYXJzIHRvbyBicmlnaHRcbiAgICByZW5kZXJMb2FkaW5nQmFyOiAocGVyY2VudCkgLT5cbiAgICAgICAgIyBSZW5kZXIgYmFja2dyb3VuZFxuICAgICAgICBAcmVuZGVyZXIuY3R4LmRyYXdJbWFnZSBAYmFyLmJhY2tncm91bmQsIEBiYXIueCwgQGJhci55XG4gICAgICAgIEByZW5kZXJlci5jdHguZHJhd0ltYWdlIEBiYXIuZmlsbCxcbiAgICAgICAgICAgICAgICBAYmFyLnggKyA2LCBAYmFyLnksXG4gICAgICAgICAgICAgICAgKEBiYXIud2lkdGggLSAxMikgKiBwZXJjZW50LCBAYmFyLmhlaWdodFxuXG5cbm1vZHVsZS5leHBvcnRzID0gUHJlTG9hZFNjZW5lIiwiRW5naW5lID0gcmVxdWlyZSBcIi4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9FbmdpbmUuY29mZmVlXCJcblxuQm9vdFNjZW5lID0gcmVxdWlyZSBcIi4vU2NlbmUvQm9vdC5jb2ZmZWVcIlxuXG5nYW1lID0gbmV3IEVuZ2luZVxuZ2FtZS5zdGFydCBuZXcgQm9vdFNjZW5lIiwiU2NlbmVNYW5hZ2VyID0gcmVxdWlyZSBcIi4vTWFuYWdlci9TY2VuZU1hbmFnZXIuY29mZmVlXCJcblxuY2xhc3MgRW5naW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBsYXN0R2FtZVRpY2sgPSBEYXRlLm5vdygpXG5cbiAgICBzdGFydDogKHNjZW5lKSAtPlxuICAgICAgICBTY2VuZU1hbmFnZXIuYWRkIFwiYm9vdFwiLCBzY2VuZVxuICAgICAgICBzY2VuZS5pbml0KClcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFjdGl2YXRlIFwiYm9vdFwiXG4gICAgICAgIEBtYWluTG9vcCgpXG5cbiAgICBtYWluTG9vcDogLT5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBtYWluTG9vcC5iaW5kIEBcblxuICAgICAgICBAY3VycmVudEdhbWVUaWNrID0gRGF0ZS5ub3coKVxuICAgICAgICBAZGVsdGEgPSBAY3VycmVudEdhbWVUaWNrIC0gQGxhc3RHYW1lVGlja1xuICAgICAgICBAbGFzdEdhbWVUaWNrID0gQGN1cnJlbnRHYW1lVGlja1xuXG4gICAgICAgIEB1cGRhdGUgQGRlbHRhXG4gICAgICAgIHJldHVybiBudWxsXG5cbiAgICB1cGRhdGU6IChkdCkgLT5cbiAgICAgICAgc2NlbmUgPSBTY2VuZU1hbmFnZXIuY3VycmVudCgpXG5cbiAgICAgICAgZm9yIHN5c3RlbSBpbiBzY2VuZS5zeXN0ZW1zXG4gICAgICAgICAgICBzeXN0ZW0udXBkYXRlIGR0XG4gICAgICAgIHJldHVybiBudWxsXG5cblxubW9kdWxlLmV4cG9ydHMgPSBFbmdpbmUiLCJVdGlsID0gcmVxdWlyZSBcIi4uL1V0aWwuY29mZmVlXCJcblxuY2xhc3MgQXNzZXRNYW5hZ2VyXG4gICAgQGFzc2V0cyA9IHt9XG4gICAgQG51bUFzc2V0cyA9IDBcbiAgICBAYXNzZXRzTG9hZGVkID0gMFxuXG4gICAgQGxvYWQ6IChtYW5pZmVzdCkgLT5cbiAgICAgICAgQG51bUFzc2V0cyA9IDBcbiAgICAgICAgQGFzc2V0c0xvYWRlZCA9IDBcblxuICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UgKHJlc29sdmUpIC0+XG4gICAgICAgICAgICBsb2FkTWFuaWZlc3QgPSBVdGlsLmxvYWRKU09OIG1hbmlmZXN0XG4gICAgICAgICAgICBsb2FkTWFuaWZlc3QudGhlbiAoanNvbikgLT5cbiAgICAgICAgICAgICAgICBmb3IgaSwgYXNzZXRHcm91cCBvZiBqc29uLmFzc2V0c1xuICAgICAgICAgICAgICAgICAgICBmb3IgYSBpbiBhc3NldEdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIubnVtQXNzZXRzKytcblxuICAgICAgICAgICAgICAgIGZvciBncm91cE5hbWUsIGFzc2V0R3JvdXAgb2YganNvbi5hc3NldHNcbiAgICAgICAgICAgICAgICAgICAgZm9yIGFzc2V0IGluIGFzc2V0R3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5vbkJlZm9yZUxvYWQ/IGFzc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIuYXNzZXRzTG9hZGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5udW1Bc3NldHNcblxuICAgICAgICAgICAgICAgICAgICAgICAgZG8gKGFzc2V0KSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgTG9hZCBiYXNlZCBvbiBmaWxlIHR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBhc3NldC50eXBlID09IFwiaW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldExvYWQgPSBVdGlsLmxvYWRJbWFnZSBqc29uLnJvb3QgKyBhc3NldC5maWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZC50aGVuIChpbWcpIC0+IEFzc2V0TWFuYWdlci5hc3NldExvYWRlZCBhc3NldCwgZ3JvdXBOYW1lLCByZXNvbHZlLCBpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIGFzc2V0LnR5cGUgPT0gXCJqc29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkID0gVXRpbC5sb2FkSlNPTiBqc29uLnJvb3QgKyBhc3NldC5maWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZC50aGVuIChqc29uKSAtPiBBc3NldE1hbmFnZXIuYXNzZXRMb2FkZWQgYXNzZXQsIGdyb3VwTmFtZSwgcmVzb2x2ZSwganNvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkID0gVXRpbC5sb2FkIGpzb24ucm9vdCArIGFzc2V0LmZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkLnRoZW4gLT4gQXNzZXRNYW5hZ2VyLmFzc2V0TG9hZGVkIGFzc2V0LCBncm91cE5hbWUsIHJlc29sdmVcbiAjXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkLmNhdGNoIC0+IEFzc2V0TWFuYWdlci5vbkVycm9yIGFzc2V0LCBncm91cE5hbWVcblxuICAgICAgICByZXR1cm4gcHJvbWlzZVxuXG4gICAgQGFzc2V0TG9hZGVkOiAoYXNzZXQsIGdyb3VwTmFtZSwgcmVzb2x2ZSwgZGF0YSkgLT5cbiAgICAgICAgaWYgZGF0YSB0aGVuIEFzc2V0TWFuYWdlci5hc3NldHNbYXNzZXQuZmlsZV0gPSBkYXRhXG4gICAgICAgIEFzc2V0TWFuYWdlci5hc3NldHNMb2FkZWQrK1xuICAgICAgICBBc3NldE1hbmFnZXIub25Qcm9ncmVzcz8gYXNzZXQsXG4gICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICBBc3NldE1hbmFnZXIuYXNzZXRzTG9hZGVkLFxuICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLm51bUFzc2V0c1xuXG4gICAgICAgIGlmIEFzc2V0TWFuYWdlci5hc3NldHNMb2FkZWQgaXMgQXNzZXRNYW5hZ2VyLm51bUFzc2V0c1xuICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLm9uTG9hZGVkPygpXG4gICAgICAgICAgICByZXNvbHZlKClcblxuICAgIEBvbkJlZm9yZUxvYWQ6IChhc3NldCwgZ3JvdXAsIGxvYWRlZCwgdG90YWwpIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uUHJvZ3Jlc3M6IChhc3NldCwgZ3JvdXAsIGxvYWRlZCwgdG90YWwpIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uRXJyb3I6IChhc3NldCwgZ3JvdXApIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uTG9hZGVkOiAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuXG4gICAgQGdldDogKGFzc2V0KSAtPiBBc3NldE1hbmFnZXIuYXNzZXRzW2Fzc2V0XVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQXNzZXRNYW5hZ2VyIiwiY2xhc3MgR3JhcGhpY3NNYW5hZ2VyXG5cbiAgICBAY3JlYXRlQ2FudmFzOiAod2lkdGgsIGhlaWdodCwgYXBwZW5kVG8pIC0+XG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJjYW52YXNcIlxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aFxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0XG5cbiAgICAgICAgaWYgYXBwZW5kVG8gdGhlbiBhcHBlbmRUby5hcHBlbmRDaGlsZCBjYW52YXNcblxuICAgICAgICByZXR1cm4gY2FudmFzXG5cblxuICAgIEBjcmVhdGVSZW5kZXJlcjogKHdpZHRoLCBoZWlnaHQsIGFwcGVuZFRvKSAtPlxuICAgICAgICByZW5kZXJlciA9IHt9XG4gICAgICAgIHJlbmRlcmVyLmNhbnZhcyA9IEdyYXBoaWNzTWFuYWdlci5jcmVhdGVDYW52YXMgd2lkdGgsIGhlaWdodCwgYXBwZW5kVG9cbiAgICAgICAgcmVuZGVyZXIuY3R4ID0gcmVuZGVyZXIuY2FudmFzLmdldENvbnRleHQgXCIyZFwiXG4gICAgICAgIHJldHVybiByZW5kZXJlclxuXG5cbiAgICBAZmlsbEltYWdlOiAoY3R4LCBpbWFnZSwgaW1hZ2VXaWR0aCwgaW1hZ2VIZWlnaHQsIGRlc3RpbmF0aW9uV2lkdGgsIGRlc3RpbmF0aW9uSGVpZ2h0KSAtPlxuICAgICAgICByYXRpb0ltYWdlID0gaW1hZ2VXaWR0aCAvIGltYWdlSGVpZ2h0XG4gICAgICAgIHJhdGlvRGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbldpZHRoIC8gZGVzdGluYXRpb25IZWlnaHRcblxuICAgICAgICB3aWR0aCA9IGRlc3RpbmF0aW9uV2lkdGhcbiAgICAgICAgaGVpZ2h0ID0gZGVzdGluYXRpb25IZWlnaHRcblxuICAgICAgICBpZiByYXRpb0Rlc3RpbmF0aW9uID4gcmF0aW9JbWFnZVxuICAgICAgICAgICAgaGVpZ2h0ID0gZGVzdGluYXRpb25XaWR0aCAvIHJhdGlvSW1hZ2VcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgd2lkdGggPSBkZXN0aW5hdGlvbkhlaWdodCAqIHJhdGlvSW1hZ2VcblxuICAgICAgICBjdHguZHJhd0ltYWdlIGltYWdlLCAwLCAwLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgMCwgMCwgd2lkdGgsIGhlaWdodFxuXG5cbiAgICBAZml0SW1hZ2U6IChjdHgsIGltYWdlLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgZGVzdGluYXRpb25XaWR0aCwgZGVzdGluYXRpb25IZWlnaHQpIC0+XG4gICAgICAgIHJhdGlvSW1hZ2UgPSBpbWFnZVdpZHRoIC8gaW1hZ2VIZWlnaHRcbiAgICAgICAgcmF0aW9EZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uV2lkdGggLyBkZXN0aW5hdGlvbkhlaWdodFxuXG4gICAgICAgIHdpZHRoID0gZGVzdGluYXRpb25XaWR0aFxuICAgICAgICBoZWlnaHQgPSBkZXN0aW5hdGlvbkhlaWdodFxuXG4gICAgICAgIGlmIHJhdGlvRGVzdGluYXRpb24gPiByYXRpb0ltYWdlXG4gICAgICAgICAgICB3aWR0aCA9IGltYWdlV2lkdGggKiBkZXN0aW5hdGlvbkhlaWdodCAvIGltYWdlSGVpZ2h0XG4gICAgICAgICAgICBoZWlnaHQgPSBkZXN0aW5hdGlvbkhlaWdodFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3aWR0aCA9IGRlc3RpbmF0aW9uV2lkdGhcbiAgICAgICAgICAgIGhlaWdodCA9IGltYWdlSGVpZ2h0ICogZGVzdGluYXRpb25XaWR0aCAvIGltYWdlV2lkdGhcblxuICAgICAgICBjdHguZHJhd0ltYWdlIGltYWdlLCAwLCAwLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgMCwgMCwgd2lkdGgsIGhlaWdodFxuXG5cbm1vZHVsZS5leHBvcnRzID0gR3JhcGhpY3NNYW5hZ2VyIiwiY2xhc3MgSW5wdXRNYW5hZ2VyXG4gICAgQG1vdXNlOlxuICAgICAgICB4OiAwXG4gICAgICAgIHk6IDBcblxuICAgIEBrZXk6XG4gICAgICAgIHVwOiBmYWxzZVxuICAgICAgICBkb3duOiBmYWxzZVxuICAgICAgICBsZWZ0OiBmYWxzZVxuICAgICAgICByaWdodDogZmFsc2VcblxuICAgIEBpbml0OiAtPlxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgSW5wdXRNYW5hZ2VyLm1vdXNlQ2xpY2tcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcIm1vdXNlbW92ZVwiLCBJbnB1dE1hbmFnZXIubW91c2VNb3ZlXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJrZXl1cFwiLCBJbnB1dE1hbmFnZXIua2V5VXBcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleWRvd25cIiwgSW5wdXRNYW5hZ2VyLmtleURvd25cblxuICAgIEBtb3VzZUNsaWNrOiAoZSkgLT4gSW5wdXRNYW5hZ2VyLm9uTW91c2VDbGljaz8gZVxuXG4gICAgQG1vdXNlTW92ZTogKGUpIC0+XG4gICAgICAgIElucHV0TWFuYWdlci5tb3VzZS54ID0gZS54XG4gICAgICAgIElucHV0TWFuYWdlci5tb3VzZS55ID0gZS55XG4gICAgICAgIElucHV0TWFuYWdlci5vbk1vdXNlTW92ZT8gZVxuXG4gICAgQGtleVVwOiAoZSkgLT5cbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM4IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS51cCA9IGZhbHNlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSA0MCB0aGVuIElucHV0TWFuYWdlci5rZXkuZG93biA9IGZhbHNlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzNyB0aGVuIElucHV0TWFuYWdlci5rZXkubGVmdCA9IGZhbHNlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzOSB0aGVuIElucHV0TWFuYWdlci5rZXkucmlnaHQgPSBmYWxzZVxuXG4gICAgICAgIElucHV0TWFuYWdlci5vbktleVVwPyBlXG5cbiAgICBAa2V5RG93bjogKGUpIC0+XG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzOCB0aGVuIElucHV0TWFuYWdlci5rZXkudXAgPSB0cnVlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSA0MCB0aGVuIElucHV0TWFuYWdlci5rZXkuZG93biA9IHRydWVcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM3IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS5sZWZ0ID0gdHJ1ZVxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzkgdGhlbiBJbnB1dE1hbmFnZXIua2V5LnJpZ2h0ID0gdHJ1ZVxuXG4gICAgICAgIElucHV0TWFuYWdlci5vbktleURvd24/IGVcblxuICAgIEBvbk1vdXNlQ2xpY2s6IChlKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuICAgIEBvbk1vdXNlTW92ZTogKGUpIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uS2V5VXA6IChlKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuICAgIEBvbktleURvd246IChlKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuXG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRNYW5hZ2VyXG4iLCJjbGFzcyBTY2VuZU1hbmFnZXJcbiAgICBAY3VycmVudFNjZW5lOiBcImJvb3RcIlxuICAgIEBzY2VuZXM6IHt9XG5cbiAgICBAYWRkOiAobmFtZSwgc2NlbmUpIC0+XG4gICAgICAgIFNjZW5lTWFuYWdlci5zY2VuZXNbbmFtZV0gPSBzY2VuZVxuICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgQGN1cnJlbnQ6IC0+IFNjZW5lTWFuYWdlci5zY2VuZXNbU2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV1cblxuICAgIEBhY3RpdmF0ZTogKG5hbWUpIC0+XG4gICAgICAgIG9sZCA9IFNjZW5lTWFuYWdlci5jdXJyZW50KClcbiAgICAgICAgb2xkLmRlYWN0aXZhdGUoKSBpZiBvbGRcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZSA9IG5hbWVcbiAgICAgICAgU2NlbmVNYW5hZ2VyLm9uQWN0aXZhdGUgbmFtZVxuICAgICAgICBTY2VuZU1hbmFnZXIuY3VycmVudCgpLmFjdGl2YXRlKClcbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgIEBvbkFjdGl2YXRlOiAobmFtZSkgLT4gIyBVc2VyIGxldmVsIGhvb2tcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lTWFuYWdlciIsImNsYXNzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBzeXN0ZW1zID0gW11cblxuICAgIGFkZFN5c3RlbTogKHN5c3RlbSkgLT5cbiAgICAgICAgQHN5c3RlbXMucHVzaCBzeXN0ZW1cbiAgICAgICAgcmV0dXJuIHN5c3RlbVxuXG4gICAgaW5pdDogLT5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICBkZWFjdGl2YXRlOiAtPlxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lIiwiY2xhc3MgVXRpbFxuICAgIEBsb2FkSlNPTjogKHVybCkgLT4gVXRpbC5sb2FkKHVybCkudGhlbihKU09OLnBhcnNlKVxuXG4gICAgQGxvYWQ6ICh1cmwpIC0+XG4gICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSAtPlxuICAgICAgICAgICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgICAgICN4aHIucmVzcG9uc2VUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIHhoci5vcGVuIFwiR0VUXCIsIHVybCwgdHJ1ZVxuICAgICAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIgXCJyZWFkeXN0YXRlY2hhbmdlXCIsIC0+XG4gICAgICAgICAgICAgICAgaWYgeGhyLnJlYWR5U3RhdGUgaXMgNFxuICAgICAgICAgICAgICAgICAgICBpZiB4aHIuc3RhdHVzIGluIFsyMDAsIDMwNF1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUgeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QgXCJlcnJvclwiXG4gICAgICAgICAgICB4aHIuc2VuZCgpXG4gICAgICAgIHJldHVybiBwcm9taXNlXG5cblxuICAgIEBsb2FkSW1hZ2U6IChzcmMpIC0+XG4gICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSAtPlxuICAgICAgICAgICAgaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuICAgICAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lciBcImxvYWRcIiwgLT4gcmVzb2x2ZSBAXG4gICAgICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyIFwiZXJyb3JcIiwgLT4gcmVqZWN0IFwiZXJyb3JcIlxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gc3JjXG4gICAgICAgICAgICBpZiBpbWFnZS5jb21wbGV0ZSB0aGVuIHJlc29sdmUgaW1hZ2VcbiAgICAgICAgcmV0dXJuIHByb21pc2VcblxuXG4gICAgQHBsdXJhbGlzZTogKHdvcmQpIC0+XG4gICAgICAgIGxlbiA9IHdvcmQubGVuZ3RoXG5cbiAgICAgICAgbDEgPSB3b3JkLnN1YnN0ciAtMVxuICAgICAgICBsMiA9IHdvcmQuc3Vic3RyIC0yXG5cbiAgICAgICAgaWYgbDEgPT0gXCJ5XCJcbiAgICAgICAgICAgIHdvcmQgPSB3b3JkLnN1YnN0cigwLCBsZW4gLSAxKSArIFwiaWVzXCJcbiAgICAgICAgZWxzZSBpZiBsMSA9PSBcInNcIiB8fCBsMSA9PSBcInhcIiB8fCBsMiA9PSBcImNoXCIgfHwgbDIgPT0gXCJzaFwiIHx8IGwyID09IFwiZXNcIlxuICAgICAgICAgICAgIyBJZiB3b3JkIGVuZHMgaW4gXCJzXCIgXCJ4XCIgb3IgXCJjaFwiIG9yIFwic2hcIiBhZGQgXCJlc1wiXG4gICAgICAgICAgICB3b3JkID0gd29yZCArIFwiZXNcIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3b3JkID0gd29yZCArIFwic1wiXG5cbiAgICAgICAgcmV0dXJuIHdvcmRcblxubW9kdWxlLmV4cG9ydHMgPSBVdGlsIl19
