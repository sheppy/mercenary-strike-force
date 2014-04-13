(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BootState, GraphicsManager, MenuState, PreLoadState, State, StateManager, TestState,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../vendor/iki-engine/src/State.coffee");

StateManager = require("../../vendor/iki-engine/src/Manager/StateManager.coffee");

GraphicsManager = require("../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

PreLoadState = require("./PreLoadState.coffee");

MenuState = require("./MenuState.coffee");

TestState = require("./Test/TestState.coffee");

BootState = (function(_super) {
  __extends(BootState, _super);

  function BootState() {
    return BootState.__super__.constructor.apply(this, arguments);
  }

  BootState.prototype.init = function() {
    var menuState, preloadState, testState;
    GraphicsManager.renderer = GraphicsManager.createRenderer(640, 480, document.body);
    preloadState = new PreLoadState();
    StateManager.add("preload", preloadState);
    preloadState.init();
    menuState = new MenuState();
    StateManager.add("menu", menuState);
    menuState.init();
    testState = new TestState();
    StateManager.add("test", testState);
    return testState.init();
  };

  BootState.prototype.activate = function() {
    return StateManager.activate("preload");
  };

  return BootState;

})(State);

module.exports = BootState;


},{"../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":8,"../../vendor/iki-engine/src/Manager/StateManager.coffee":9,"../../vendor/iki-engine/src/State.coffee":10,"./MenuState.coffee":2,"./PreLoadState.coffee":3,"./Test/TestState.coffee":4}],2:[function(require,module,exports){
var GraphicsManager, MenuState, State, StateManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../vendor/iki-engine/src/State.coffee");

StateManager = require("../../vendor/iki-engine/src/Manager/StateManager.coffee");

GraphicsManager = require("../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

MenuState = (function(_super) {
  __extends(MenuState, _super);

  function MenuState() {
    return MenuState.__super__.constructor.apply(this, arguments);
  }

  MenuState.prototype.init = function() {
    this.currentMenu = "main";
    this.menus = {};
    this.addButton("main", "Tests", 20, 20, 200, 30, this.clickMainTest.bind(this));
    this.addButton("test", "Load map", 20, 20, 200, 30, this.clickTestLoadMap.bind(this));
    this.addButton("test", "Back", 20, 60, 200, 30, this.clickTestBack.bind(this));
    this.ctx = GraphicsManager.renderer.ctx;
    return this.clickListener = this.onMouseClick.bind(this);
  };

  MenuState.prototype.clickMainTest = function() {
    return this.switchMenu("test");
  };

  MenuState.prototype.clickTestBack = function() {
    return this.switchMenu("main");
  };

  MenuState.prototype.clickTestLoadMap = function() {
    return StateManager.activate("test");
  };

  MenuState.prototype.addButton = function(menu, text, x, y, width, height, onClick) {
    var button;
    button = {
      text: text,
      x: x,
      y: y,
      width: width,
      height: height,
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

  MenuState.prototype.activate = function() {
    GraphicsManager.renderer.canvas.addEventListener("click", this.clickListener);
    return this.renderMenu();
  };

  MenuState.prototype.deactivate = function() {
    return GraphicsManager.renderer.canvas.removeEventListener("click", this.clickListener);
  };

  MenuState.prototype.switchMenu = function(newMenu) {
    this.currentMenu = newMenu;
    return this.renderMenu();
  };

  MenuState.prototype.onMouseClick = function(e) {
    var button;
    button = this.getButtonFromPoint(e.x, e.y);
    if (button) {
      return button.click();
    }
  };

  MenuState.prototype.getButtonFromPoint = function(x, y) {
    var button, menu, name, _ref;
    menu = this.menus[this.currentMenu];
    _ref = menu.buttons;
    for (name in _ref) {
      button = _ref[name];
      if (x >= button.x && x <= button.y + button.width && y >= button.y && y <= button.y + button.height) {
        return button;
      }
    }
  };

  MenuState.prototype.renderMenu = function() {
    var button, menu, name, _ref, _results;
    this.renderBackground();
    menu = this.menus[this.currentMenu];
    _ref = menu.buttons;
    _results = [];
    for (name in _ref) {
      button = _ref[name];
      _results.push(this.renderButton(button));
    }
    return _results;
  };

  MenuState.prototype.renderBackground = function() {
    this.ctx.fillStyle = "#003";
    return this.ctx.fillRect(0, 0, 640, 480);
  };

  MenuState.prototype.renderButton = function(button, hover) {
    var textSize;
    if (hover == null) {
      hover = false;
    }
    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#000";
    if (hover) {
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = "yellow";
    }
    this.ctx.fillRect(button.x, button.y, button.width, button.height);
    if (hover) {
      this.ctx.shadowBlur = 0;
    }
    this.ctx.strokeRect(button.x, button.y, button.width, button.height);
    this.ctx.fillStyle = "#000";
    this.ctx.font = "12px Arial, sans-serif";
    this.ctx.textBaseline = "top";
    textSize = this.ctx.measureText(button.text);
    return this.ctx.fillText(button.text, button.x + 100 - (textSize.width / 2), button.y + 7);
  };

  return MenuState;

})(State);


/*
    add click events for menu
    add hover events for menu?
 */

module.exports = MenuState;


},{"../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":8,"../../vendor/iki-engine/src/Manager/StateManager.coffee":9,"../../vendor/iki-engine/src/State.coffee":10}],3:[function(require,module,exports){
var AssetManager, GraphicsManager, PreLoadState, State, StateManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../vendor/iki-engine/src/State.coffee");

StateManager = require("../../vendor/iki-engine/src/Manager/StateManager.coffee");

GraphicsManager = require("../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

AssetManager = require("../../vendor/iki-engine/src/Manager/AssetManager.coffee");

PreLoadState = (function(_super) {
  __extends(PreLoadState, _super);

  function PreLoadState() {
    return PreLoadState.__super__.constructor.apply(this, arguments);
  }

  PreLoadState.prototype.init = function() {
    this.bar = {
      x: (640 / 2) - 100,
      y: (480 / 2) - 20,
      width: 200,
      height: 20
    };
    this.bar.middle = this.bar.x + (this.bar.width / 2);
    return this.ctx = GraphicsManager.renderer.ctx;
  };

  PreLoadState.prototype.activate = function() {
    var loadAsset;
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, 640, 480);
    this.renderLoadingBar(0);
    this.renderLoadingText("Loading...");
    AssetManager.onProgress = (function(_this) {
      return function(asset, group, loaded, total) {
        _this.ctx.fillStyle = "#000";
        _this.ctx.fillRect(0, 0, 640, 480);
        _this.renderLoadingText("Loading " + group + "...");
        return _this.renderLoadingBar(loaded / total);
      };
    })(this);
    loadAsset = AssetManager.load("assets/assets.json");
    return loadAsset.then(function() {
      return StateManager.activate("menu");
    });
  };

  PreLoadState.prototype.renderLoadingText = function(text) {
    var textSize;
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "12px Arial, sans-serif";
    this.ctx.textBaseline = "top";
    textSize = this.ctx.measureText(text);
    return this.ctx.fillText(text, this.bar.middle - (textSize.width / 2), this.bar.y + this.bar.height + 10);
  };

  PreLoadState.prototype.renderLoadingBar = function(percent) {
    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#fff";
    this.ctx.strokeRect(this.bar.x, this.bar.y, this.bar.width, this.bar.height);
    return this.ctx.fillRect(this.bar.x + 3, this.bar.y + 3, (this.bar.width - 6) * percent, this.bar.height - 6);
  };

  return PreLoadState;

})(State);

module.exports = PreLoadState;


},{"../../vendor/iki-engine/src/Manager/AssetManager.coffee":7,"../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":8,"../../vendor/iki-engine/src/Manager/StateManager.coffee":9,"../../vendor/iki-engine/src/State.coffee":10}],4:[function(require,module,exports){
var State, TestState,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../../vendor/iki-engine/src/State.coffee");

TestState = (function(_super) {
  __extends(TestState, _super);

  function TestState() {
    return TestState.__super__.constructor.apply(this, arguments);
  }

  return TestState;

})(State);

module.exports = TestState;


},{"../../../vendor/iki-engine/src/State.coffee":10}],5:[function(require,module,exports){
var BootState, Engine, game;

Engine = require("../vendor/iki-engine/src/Engine.coffee");

BootState = require("./State/BootState.coffee");

game = new Engine;

game.start(new BootState);


},{"../vendor/iki-engine/src/Engine.coffee":6,"./State/BootState.coffee":1}],6:[function(require,module,exports){
var Engine, StateManager;

StateManager = require("./Manager/StateManager.coffee");

Engine = (function() {
  function Engine() {
    this.lastGameTick = Date.now();
  }

  Engine.prototype.start = function(state) {
    StateManager.add("boot", state);
    state.init();
    StateManager.activate("boot");
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
    var state, system, _i, _len, _ref;
    state = StateManager.current();
    _ref = state.systems;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      system = _ref[_i];
      system.update(dt);
    }
    return null;
  };

  return Engine;

})();

module.exports = Engine;


},{"./Manager/StateManager.coffee":9}],7:[function(require,module,exports){
var AssetManager, Util;

Util = require("../Util.coffee");

AssetManager = (function() {
  function AssetManager() {}

  AssetManager.assets = {};

  AssetManager.numAssets = 0;

  AssetManager.assetsLoaded = 0;

  AssetManager.load = function(manifest) {
    var promise;
    promise = new Promise(function(resolve, reject) {
      var loadManifest;
      console.log("AssetManager > load > " + manifest);
      loadManifest = Util.loadJSON(manifest);
      return loadManifest.then(function(json) {
        var asset, group, groupName, i, _i, _len, _ref, _ref1, _results;
        _ref = json.groups;
        for (i in _ref) {
          group = _ref[i];
          for (_i = 0, _len = group.length; _i < _len; _i++) {
            asset = group[_i];
            AssetManager.numAssets++;
          }
        }
        _ref1 = json.groups;
        _results = [];
        for (groupName in _ref1) {
          group = _ref1[groupName];
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = group.length; _j < _len1; _j++) {
              asset = group[_j];
              _results1.push((function(asset) {
                var assetLoad;
                assetLoad = Util.load(json.root + asset);
                return assetLoad.then(function(data) {
                  AssetManager.assets[asset] = asset;
                  AssetManager.assetsLoaded++;
                  AssetManager.onProgress(asset, groupName, AssetManager.assetsLoaded, AssetManager.numAssets);
                  if (AssetManager.assetsLoaded === AssetManager.numAssets) {
                    AssetManager.onLoaded();
                    return resolve();
                  }
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

  AssetManager.onProgress = function(asset, group, loaded, total) {};

  AssetManager.onLoaded = function() {};

  AssetManager.get = function(asset) {
    return AssetManager.assets[asset];
  };

  return AssetManager;

})();

module.exports = AssetManager;


},{"../Util.coffee":11}],8:[function(require,module,exports){
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

  return GraphicsManager;

})();

module.exports = GraphicsManager;


},{}],9:[function(require,module,exports){
var StateManager;

StateManager = (function() {
  function StateManager() {}

  StateManager.states = {};

  StateManager.add = function(name, state) {
    console.log("StateManager > add > " + name);
    StateManager.states[name] = state;
    return null;
  };

  StateManager.current = function() {
    return StateManager.states[StateManager.currentState];
  };

  StateManager.activate = function(name) {
    var old;
    console.log("StateManager > activate > " + name);
    old = StateManager.current();
    if (old) {
      old.deactivate();
    }
    StateManager.currentState = name;
    StateManager.current().activate();
    return null;
  };

  return StateManager;

})();

module.exports = StateManager;


},{}],10:[function(require,module,exports){
var State;

State = (function() {
  function State() {
    this.systems = [];
  }

  State.prototype.addSystem = function(system) {
    this.systems.push(system);
    return system;
  };

  State.prototype.init = function() {};

  State.prototype.activate = function() {};

  State.prototype.deactivate = function() {};

  return State;

})();

module.exports = State;


},{}],11:[function(require,module,exports){
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

  return Util;

})();

module.exports = Util;


},{}]},{},[5])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxTdGF0ZVxcQm9vdFN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxTdGF0ZVxcTWVudVN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxTdGF0ZVxcUHJlTG9hZFN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxTdGF0ZVxcVGVzdFxcVGVzdFN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxnYW1lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXEVuZ2luZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxNYW5hZ2VyXFxBc3NldE1hbmFnZXIuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXFN0YXRlTWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxTdGF0ZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxVdGlsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUEsbUZBQUE7RUFBQTtpU0FBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLDBDQUFSLENBQVIsQ0FBQTs7QUFBQSxZQUNBLEdBQWUsT0FBQSxDQUFRLHlEQUFSLENBRGYsQ0FBQTs7QUFBQSxlQUVBLEdBQWtCLE9BQUEsQ0FBUSw0REFBUixDQUZsQixDQUFBOztBQUFBLFlBSUEsR0FBZSxPQUFBLENBQVEsdUJBQVIsQ0FKZixDQUFBOztBQUFBLFNBS0EsR0FBWSxPQUFBLENBQVEsb0JBQVIsQ0FMWixDQUFBOztBQUFBLFNBTUEsR0FBWSxPQUFBLENBQVEseUJBQVIsQ0FOWixDQUFBOztBQUFBO0FBVUksOEJBQUEsQ0FBQTs7OztHQUFBOztBQUFBLHNCQUFBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFFRixRQUFBLGtDQUFBO0FBQUEsSUFBQSxlQUFlLENBQUMsUUFBaEIsR0FBMkIsZUFBZSxDQUFDLGNBQWhCLENBQStCLEdBQS9CLEVBQW9DLEdBQXBDLEVBQXlDLFFBQVEsQ0FBQyxJQUFsRCxDQUEzQixDQUFBO0FBQUEsSUFHQSxZQUFBLEdBQW1CLElBQUEsWUFBQSxDQUFBLENBSG5CLENBQUE7QUFBQSxJQUlBLFlBQVksQ0FBQyxHQUFiLENBQWlCLFNBQWpCLEVBQTRCLFlBQTVCLENBSkEsQ0FBQTtBQUFBLElBS0EsWUFBWSxDQUFDLElBQWIsQ0FBQSxDQUxBLENBQUE7QUFBQSxJ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OztBQUFBLEVBRUEsSUFBQyxDQUFBLElBQUQsR0FBTyxTQUFDLEdBQUQsR0FBQTtBQUNILFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFjLElBQUEsT0FBQSxDQUFRLFNBQUMsT0FBRCxFQUFVLE1BQVYsR0FBQTtBQUNsQixVQUFBLEdBQUE7QUFBQSxNQUFBLEdBQUEsR0FBVSxJQUFBLGNBQUEsQ0FBQSxDQUFWLENBQUE7QUFBQSxNQUVBLEdBQUcsQ0FBQyxJQUFKLENBQVMsS0FBVCxFQUFnQixHQUFoQixFQUFxQixJQUFyQixDQUZBLENBQUE7QUFBQSxNQUdBLEdBQUcsQ0FBQyxnQkFBSixDQUFxQixrQkFBckIsRUFBeUMsU0FBQSxHQUFBO0FBQ3JDLFlBQUEsSUFBQTtBQUFBLFFBQUEsSUFBRyxHQUFHLENBQUMsVUFBSixLQUFrQixDQUFyQjtBQUNJLFVBQUEsWUFBRyxHQUFHLENBQUMsT0FBSixLQUFlLEdBQWYsSUFBQSxJQUFBLEtBQW9CLEdBQXZCO21CQUNJLE9BQUEsQ0FBUSxHQUFHLENBQUMsWUFBWixFQURKO1dBQUEsTUFBQTttQkFHSSxNQUFBLENBQU8sT0FBUCxFQUhKO1dBREo7U0FEcUM7TUFBQSxDQUF6QyxDQUhBLENBQUE7YUFTQSxHQUFHLENBQUMsSUFBSixDQUFBLEVBVmtCO0lBQUEsQ0FBUixDQUFkLENBQUE7QUFXQSxXQUFPLE9BQVAsQ0FaRztFQUFBLENBRlAsQ0FBQTs7Y0FBQTs7SUFESixDQUFBOztBQUFBLE1BaUJNLENBQUMsT0FBUCxHQUFpQixJQWpCakIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiU3RhdGUgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1N0YXRlLmNvZmZlZVwiXG5TdGF0ZU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvU3RhdGVNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5cblByZUxvYWRTdGF0ZSA9IHJlcXVpcmUgXCIuL1ByZUxvYWRTdGF0ZS5jb2ZmZWVcIlxuTWVudVN0YXRlID0gcmVxdWlyZSBcIi4vTWVudVN0YXRlLmNvZmZlZVwiXG5UZXN0U3RhdGUgPSByZXF1aXJlIFwiLi9UZXN0L1Rlc3RTdGF0ZS5jb2ZmZWVcIlxuXG5cbmNsYXNzIEJvb3RTdGF0ZSBleHRlbmRzIFN0YXRlXG4gICAgaW5pdDogLT5cbiAgICAgICAgIyBVc2UgR3JhcGhpY3NNYW5hZ2VyIHRvIGNyZWF0ZSBtYWluIGNhbnZhc1xuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIgPSBHcmFwaGljc01hbmFnZXIuY3JlYXRlUmVuZGVyZXIgNjQwLCA0ODAsIGRvY3VtZW50LmJvZHlcblxuXG4gICAgICAgIHByZWxvYWRTdGF0ZSA9IG5ldyBQcmVMb2FkU3RhdGUoKVxuICAgICAgICBTdGF0ZU1hbmFnZXIuYWRkIFwicHJlbG9hZFwiLCBwcmVsb2FkU3RhdGVcbiAgICAgICAgcHJlbG9hZFN0YXRlLmluaXQoKVxuXG4gICAgICAgIG1lbnVTdGF0ZSA9IG5ldyBNZW51U3RhdGUoKVxuICAgICAgICBTdGF0ZU1hbmFnZXIuYWRkIFwibWVudVwiLCBtZW51U3RhdGVcbiAgICAgICAgbWVudVN0YXRlLmluaXQoKVxuXG4gICAgICAgIHRlc3RTdGF0ZSA9IG5ldyBUZXN0U3RhdGUoKVxuICAgICAgICBTdGF0ZU1hbmFnZXIuYWRkIFwidGVzdFwiLCB0ZXN0U3RhdGVcbiAgICAgICAgdGVzdFN0YXRlLmluaXQoKVxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIFN0YXRlTWFuYWdlci5hY3RpdmF0ZSBcInByZWxvYWRcIlxuXG5cbm1vZHVsZS5leHBvcnRzID0gQm9vdFN0YXRlIiwiU3RhdGUgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1N0YXRlLmNvZmZlZVwiXG5TdGF0ZU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvU3RhdGVNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5cbmNsYXNzIE1lbnVTdGF0ZSBleHRlbmRzIFN0YXRlXG4gICAgaW5pdDogLT5cbiAgICAgICAgQGN1cnJlbnRNZW51ID0gXCJtYWluXCJcbiAgICAgICAgQG1lbnVzID0ge31cblxuICAgICAgICBAYWRkQnV0dG9uIFwibWFpblwiLCBcIlRlc3RzXCIsIDIwLCAyMCwgMjAwLCAzMCwgQGNsaWNrTWFpblRlc3QuYmluZCBAXG4gICAgICAgIEBhZGRCdXR0b24gXCJ0ZXN0XCIsIFwiTG9hZCBtYXBcIiwgMjAsIDIwLCAyMDAsIDMwLCBAY2xpY2tUZXN0TG9hZE1hcC5iaW5kIEBcbiAgICAgICAgQGFkZEJ1dHRvbiBcInRlc3RcIiwgXCJCYWNrXCIsIDIwLCA2MCwgMjAwLCAzMCwgQGNsaWNrVGVzdEJhY2suYmluZCBAXG5cbiAgICAgICAgQGN0eCA9IEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHhcbiAgICAgICAgQGNsaWNrTGlzdGVuZXIgPSBAb25Nb3VzZUNsaWNrLmJpbmQgQFxuXG4gICAgY2xpY2tNYWluVGVzdDogLT4gQHN3aXRjaE1lbnUgXCJ0ZXN0XCJcblxuICAgIGNsaWNrVGVzdEJhY2s6IC0+IEBzd2l0Y2hNZW51IFwibWFpblwiXG4gICAgY2xpY2tUZXN0TG9hZE1hcDogLT4gU3RhdGVNYW5hZ2VyLmFjdGl2YXRlIFwidGVzdFwiXG5cblxuICAgIGFkZEJ1dHRvbjogKG1lbnUsIHRleHQsIHgsIHksIHdpZHRoLCBoZWlnaHQsIG9uQ2xpY2spIC0+XG4gICAgICAgIGJ1dHRvbiA9XG4gICAgICAgICAgICB0ZXh0OiB0ZXh0XG4gICAgICAgICAgICB4OiB4XG4gICAgICAgICAgICB5OiB5XG4gICAgICAgICAgICB3aWR0aDogd2lkdGhcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgICAgICBjbGljazogb25DbGlja1xuICAgICAgICBpZiBub3QgQG1lbnVzW21lbnVdIHRoZW4gQG1lbnVzW21lbnVdID0ge31cbiAgICAgICAgaWYgbm90IEBtZW51c1ttZW51XS5idXR0b25zIHRoZW4gQG1lbnVzW21lbnVdLmJ1dHRvbnMgPSBbXVxuICAgICAgICBAbWVudXNbbWVudV0uYnV0dG9ucy5wdXNoIGJ1dHRvblxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIEBjbGlja0xpc3RlbmVyXG4gICAgICAgIEByZW5kZXJNZW51KClcblxuICAgIGRlYWN0aXZhdGU6IC0+XG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIEBjbGlja0xpc3RlbmVyXG5cbiAgICBzd2l0Y2hNZW51OiAobmV3TWVudSkgLT5cbiAgICAgICAgQGN1cnJlbnRNZW51ID0gbmV3TWVudVxuICAgICAgICBAcmVuZGVyTWVudSgpXG5cbiAgICBvbk1vdXNlQ2xpY2s6IChlKSAtPlxuICAgICAgICBidXR0b24gPSBAZ2V0QnV0dG9uRnJvbVBvaW50IGUueCwgZS55XG4gICAgICAgIGlmIGJ1dHRvblxuICAgICAgICAgICAgYnV0dG9uLmNsaWNrKClcblxuICAgIGdldEJ1dHRvbkZyb21Qb2ludDogKHgsIHkpIC0+XG4gICAgICAgIG1lbnUgPSBAbWVudXNbQGN1cnJlbnRNZW51XVxuICAgICAgICBmb3IgbmFtZSwgYnV0dG9uIG9mIG1lbnUuYnV0dG9uc1xuICAgICAgICAgICAgaWYgeCA+PSBidXR0b24ueCAmJiB4IDw9IGJ1dHRvbi55ICsgYnV0dG9uLndpZHRoICYmIHkgPj0gYnV0dG9uLnkgJiYgeSA8PSBidXR0b24ueSArIGJ1dHRvbi5oZWlnaHRcbiAgICAgICAgICAgICAgICByZXR1cm4gYnV0dG9uXG5cbiAgICByZW5kZXJNZW51OiAtPlxuICAgICAgICBAcmVuZGVyQmFja2dyb3VuZCgpXG4gICAgICAgIG1lbnUgPSBAbWVudXNbQGN1cnJlbnRNZW51XVxuICAgICAgICBmb3IgbmFtZSwgYnV0dG9uIG9mIG1lbnUuYnV0dG9uc1xuICAgICAgICAgICAgQHJlbmRlckJ1dHRvbiBidXR0b25cblxuICAgIHJlbmRlckJhY2tncm91bmQ6IC0+XG4gICAgICAgIEBjdHguZmlsbFN0eWxlID0gXCIjMDAzXCJcbiAgICAgICAgQGN0eC5maWxsUmVjdCAwLCAwLCA2NDAsIDQ4MFxuXG4gICAgcmVuZGVyQnV0dG9uOiAoYnV0dG9uLCBob3ZlciA9IGZhbHNlKSAtPlxuICAgICAgICBAY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZlwiXG4gICAgICAgIEBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIlxuXG4gICAgICAgIGlmIGhvdmVyXG4gICAgICAgICAgICBAY3R4LnNoYWRvd0JsdXIgPSAyMFxuICAgICAgICAgICAgQGN0eC5zaGFkb3dDb2xvciA9IFwieWVsbG93XCJcblxuICAgICAgICBAY3R4LmZpbGxSZWN0IGJ1dHRvbi54LCBidXR0b24ueSwgYnV0dG9uLndpZHRoLCBidXR0b24uaGVpZ2h0XG5cbiAgICAgICAgQGN0eC5zaGFkb3dCbHVyID0gMCBpZiBob3ZlclxuXG4gICAgICAgIEBjdHguc3Ryb2tlUmVjdCBidXR0b24ueCwgYnV0dG9uLnksIGJ1dHRvbi53aWR0aCwgYnV0dG9uLmhlaWdodFxuXG4gICAgICAgIEBjdHguZmlsbFN0eWxlID0gXCIjMDAwXCJcbiAgICAgICAgQGN0eC5mb250ID0gXCIxMnB4IEFyaWFsLCBzYW5zLXNlcmlmXCJcbiAgICAgICAgQGN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiXG4gICAgICAgIHRleHRTaXplID0gQGN0eC5tZWFzdXJlVGV4dCBidXR0b24udGV4dFxuICAgICAgICBAY3R4LmZpbGxUZXh0IGJ1dHRvbi50ZXh0LCBidXR0b24ueCArIDEwMCAtICh0ZXh0U2l6ZS53aWR0aCAvIDIpLCBidXR0b24ueSArIDdcblxuXG5cbiMjI1xuICAgIGFkZCBjbGljayBldmVudHMgZm9yIG1lbnVcbiAgICBhZGQgaG92ZXIgZXZlbnRzIGZvciBtZW51P1xuIyMjXG5cbm1vZHVsZS5leHBvcnRzID0gTWVudVN0YXRlIiwiU3RhdGUgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1N0YXRlLmNvZmZlZVwiXG5TdGF0ZU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvU3RhdGVNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5Bc3NldE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvQXNzZXRNYW5hZ2VyLmNvZmZlZVwiXG5cbmNsYXNzIFByZUxvYWRTdGF0ZSBleHRlbmRzIFN0YXRlXG4gICAgaW5pdDogLT5cbiAgICAgICAgQGJhciA9XG4gICAgICAgICAgICB4OiAoNjQwIC8gMikgLSAxMDBcbiAgICAgICAgICAgIHk6ICg0ODAgLyAyKSAtIDIwXG4gICAgICAgICAgICB3aWR0aDogMjAwXG4gICAgICAgICAgICBoZWlnaHQ6IDIwXG5cbiAgICAgICAgQGJhci5taWRkbGUgPSBAYmFyLnggKyAoQGJhci53aWR0aCAvIDIpXG5cbiAgICAgICAgQGN0eCA9IEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHhcblxuICAgIGFjdGl2YXRlOiAtPlxuICAgICAgICBAY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiXG4gICAgICAgIEBjdHguZmlsbFJlY3QgMCwgMCwgNjQwLCA0ODBcblxuICAgICAgICBAcmVuZGVyTG9hZGluZ0JhciAwXG4gICAgICAgIEByZW5kZXJMb2FkaW5nVGV4dCBcIkxvYWRpbmcuLi5cIlxuXG4gICAgICAgIEFzc2V0TWFuYWdlci5vblByb2dyZXNzID0gKGFzc2V0LCBncm91cCwgbG9hZGVkLCB0b3RhbCkgPT5cbiAgICAgICAgICAgIEBjdHguZmlsbFN0eWxlID0gXCIjMDAwXCJcbiAgICAgICAgICAgIEBjdHguZmlsbFJlY3QgMCwgMCwgNjQwLCA0ODBcbiAgICAgICAgICAgIEByZW5kZXJMb2FkaW5nVGV4dCBcIkxvYWRpbmcgI3tncm91cH0uLi5cIlxuICAgICAgICAgICAgQHJlbmRlckxvYWRpbmdCYXIgbG9hZGVkIC8gdG90YWxcblxuICAgICAgICBsb2FkQXNzZXQgPSBBc3NldE1hbmFnZXIubG9hZCBcImFzc2V0cy9hc3NldHMuanNvblwiXG4gICAgICAgIGxvYWRBc3NldC50aGVuIC0+IFN0YXRlTWFuYWdlci5hY3RpdmF0ZSBcIm1lbnVcIlxuXG5cbiAgICByZW5kZXJMb2FkaW5nVGV4dDogKHRleHQpIC0+XG4gICAgICAgIEBjdHguZmlsbFN0eWxlID0gXCIjZmZmXCJcbiAgICAgICAgQGN0eC5mb250ID0gXCIxMnB4IEFyaWFsLCBzYW5zLXNlcmlmXCJcbiAgICAgICAgQGN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiXG4gICAgICAgIHRleHRTaXplID0gQGN0eC5tZWFzdXJlVGV4dCB0ZXh0XG4gICAgICAgIEBjdHguZmlsbFRleHQgdGV4dCwgQGJhci5taWRkbGUgLSAodGV4dFNpemUud2lkdGggLyAyKSwgQGJhci55ICsgQGJhci5oZWlnaHQgKyAxMFxuXG5cbiAgICByZW5kZXJMb2FkaW5nQmFyOiAocGVyY2VudCkgLT5cbiAgICAgICAgQGN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIlxuICAgICAgICBAY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmXCJcbiAgICAgICAgQGN0eC5zdHJva2VSZWN0IEBiYXIueCwgQGJhci55LCBAYmFyLndpZHRoLCBAYmFyLmhlaWdodFxuICAgICAgICBAY3R4LmZpbGxSZWN0IEBiYXIueCArIDMsIEBiYXIueSArIDMsIChAYmFyLndpZHRoIC0gNikgKiBwZXJjZW50LCBAYmFyLmhlaWdodCAtIDZcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFByZUxvYWRTdGF0ZSIsIlN0YXRlID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TdGF0ZS5jb2ZmZWVcIlxuXG5jbGFzcyBUZXN0U3RhdGUgZXh0ZW5kcyBTdGF0ZVxuXG5cbm1vZHVsZS5leHBvcnRzID0gVGVzdFN0YXRlIiwiRW5naW5lID0gcmVxdWlyZSBcIi4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9FbmdpbmUuY29mZmVlXCJcblxuQm9vdFN0YXRlID0gcmVxdWlyZSBcIi4vU3RhdGUvQm9vdFN0YXRlLmNvZmZlZVwiXG5cblxuZ2FtZSA9IG5ldyBFbmdpbmVcbmdhbWUuc3RhcnQgbmV3IEJvb3RTdGF0ZSIsIlN0YXRlTWFuYWdlciA9IHJlcXVpcmUgXCIuL01hbmFnZXIvU3RhdGVNYW5hZ2VyLmNvZmZlZVwiXG5cbmNsYXNzIEVuZ2luZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAbGFzdEdhbWVUaWNrID0gRGF0ZS5ub3coKVxuXG4gICAgc3RhcnQ6IChzdGF0ZSkgLT5cbiAgICAgICAgU3RhdGVNYW5hZ2VyLmFkZCBcImJvb3RcIiwgc3RhdGVcbiAgICAgICAgc3RhdGUuaW5pdCgpXG4gICAgICAgIFN0YXRlTWFuYWdlci5hY3RpdmF0ZSBcImJvb3RcIlxuICAgICAgICBAbWFpbkxvb3AoKVxuXG4gICAgbWFpbkxvb3A6IC0+XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBAbWFpbkxvb3AuYmluZCBAXG5cbiAgICAgICAgQGN1cnJlbnRHYW1lVGljayA9IERhdGUubm93KClcbiAgICAgICAgQGRlbHRhID0gQGN1cnJlbnRHYW1lVGljayAtIEBsYXN0R2FtZVRpY2tcbiAgICAgICAgQGxhc3RHYW1lVGljayA9IEBjdXJyZW50R2FtZVRpY2tcblxuICAgICAgICBAdXBkYXRlIEBkZWx0YVxuICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgdXBkYXRlOiAoZHQpIC0+XG4gICAgICAgIHN0YXRlID0gU3RhdGVNYW5hZ2VyLmN1cnJlbnQoKVxuXG4gICAgICAgIGZvciBzeXN0ZW0gaW4gc3RhdGUuc3lzdGVtc1xuICAgICAgICAgICAgc3lzdGVtLnVwZGF0ZSBkdFxuICAgICAgICByZXR1cm4gbnVsbFxuXG5cbm1vZHVsZS5leHBvcnRzID0gRW5naW5lIiwiVXRpbCA9IHJlcXVpcmUgXCIuLi9VdGlsLmNvZmZlZVwiXG5cbmNsYXNzIEFzc2V0TWFuYWdlclxuICAgIEBhc3NldHMgPSB7fVxuICAgIEBudW1Bc3NldHMgPSAwXG4gICAgQGFzc2V0c0xvYWRlZCA9IDBcblxuICAgIEBsb2FkOiAobWFuaWZlc3QpIC0+XG4gICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSAtPlxuICAgICAgICAgICAgY29uc29sZS5sb2cgXCJBc3NldE1hbmFnZXIgPiBsb2FkID4gI3ttYW5pZmVzdH1cIlxuICAgICAgICAgICAgbG9hZE1hbmlmZXN0ID0gVXRpbC5sb2FkSlNPTiBtYW5pZmVzdFxuICAgICAgICAgICAgbG9hZE1hbmlmZXN0LnRoZW4gKGpzb24pIC0+XG4gICAgICAgICAgICAgICAgZm9yIGksZ3JvdXAgb2YganNvbi5ncm91cHNcbiAgICAgICAgICAgICAgICAgICAgZm9yIGFzc2V0IGluIGdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIubnVtQXNzZXRzKytcblxuICAgICAgICAgICAgICAgIGZvciBncm91cE5hbWUsIGdyb3VwIG9mIGpzb24uZ3JvdXBzXG4gICAgICAgICAgICAgICAgICAgIGZvciBhc3NldCBpbiBncm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgZG8gKGFzc2V0KSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZCA9IFV0aWwubG9hZCBqc29uLnJvb3QgKyBhc3NldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZC50aGVuIChkYXRhKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIuYXNzZXRzW2Fzc2V0XSA9IGFzc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5hc3NldHNMb2FkZWQrK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjQXNzZXRNYW5hZ2VyLm9uQXNzZXRMb2FkIGFzc2V0LCBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5vblByb2dyZXNzIGFzc2V0LCBncm91cE5hbWUsIEFzc2V0TWFuYWdlci5hc3NldHNMb2FkZWQsIEFzc2V0TWFuYWdlci5udW1Bc3NldHNcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBBc3NldE1hbmFnZXIuYXNzZXRzTG9hZGVkIGlzIEFzc2V0TWFuYWdlci5udW1Bc3NldHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5vbkxvYWRlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgcmV0dXJuIHByb21pc2VcblxuICAgICNAb25Bc3NldExvYWQ6IChhc3NldCwgZGF0YSkgLT5cbiAgICAjQG9uQXNzZXRFcnJvcjogKGFzc2V0KSAtPlxuICAgIEBvblByb2dyZXNzOiAoYXNzZXQsIGdyb3VwLCBsb2FkZWQsIHRvdGFsKSAtPlxuICAgIEBvbkxvYWRlZDogLT5cblxuICAgIEBnZXQ6IChhc3NldCkgLT4gQXNzZXRNYW5hZ2VyLmFzc2V0c1thc3NldF1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEFzc2V0TWFuYWdlciIsImNsYXNzIEdyYXBoaWNzTWFuYWdlclxuXG4gICAgQGNyZWF0ZUNhbnZhczogKHdpZHRoLCBoZWlnaHQsIGFwcGVuZFRvKSAtPlxuICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiY2FudmFzXCJcbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGhcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodFxuXG4gICAgICAgIGlmIGFwcGVuZFRvIHRoZW4gYXBwZW5kVG8uYXBwZW5kQ2hpbGQgY2FudmFzXG5cbiAgICAgICAgcmV0dXJuIGNhbnZhc1xuXG4gICAgQGNyZWF0ZVJlbmRlcmVyOiAod2lkdGgsIGhlaWdodCwgYXBwZW5kVG8pIC0+XG4gICAgICAgIHJlbmRlcmVyID0ge31cbiAgICAgICAgcmVuZGVyZXIuY2FudmFzID0gR3JhcGhpY3NNYW5hZ2VyLmNyZWF0ZUNhbnZhcyB3aWR0aCwgaGVpZ2h0LCBhcHBlbmRUb1xuICAgICAgICByZW5kZXJlci5jdHggPSByZW5kZXJlci5jYW52YXMuZ2V0Q29udGV4dCBcIjJkXCJcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyXG5cbm1vZHVsZS5leHBvcnRzID0gR3JhcGhpY3NNYW5hZ2VyIiwiY2xhc3MgU3RhdGVNYW5hZ2VyXG4gICAgQHN0YXRlczoge31cblxuICAgIEBhZGQ6IChuYW1lLCBzdGF0ZSkgLT5cbiAgICAgICAgY29uc29sZS5sb2cgXCJTdGF0ZU1hbmFnZXIgPiBhZGQgPiAje25hbWV9XCJcbiAgICAgICAgU3RhdGVNYW5hZ2VyLnN0YXRlc1tuYW1lXSA9IHN0YXRlXG4gICAgICAgIHJldHVybiBudWxsXG5cbiAgICBAY3VycmVudDogLT4gU3RhdGVNYW5hZ2VyLnN0YXRlc1tTdGF0ZU1hbmFnZXIuY3VycmVudFN0YXRlXVxuXG4gICAgQGFjdGl2YXRlOiAobmFtZSkgLT5cbiAgICAgICAgY29uc29sZS5sb2cgXCJTdGF0ZU1hbmFnZXIgPiBhY3RpdmF0ZSA+ICN7bmFtZX1cIlxuICAgICAgICBvbGQgPSBTdGF0ZU1hbmFnZXIuY3VycmVudCgpXG4gICAgICAgIG9sZC5kZWFjdGl2YXRlKCkgaWYgb2xkXG4gICAgICAgIFN0YXRlTWFuYWdlci5jdXJyZW50U3RhdGUgPSBuYW1lXG4gICAgICAgIFN0YXRlTWFuYWdlci5jdXJyZW50KCkuYWN0aXZhdGUoKVxuICAgICAgICByZXR1cm4gbnVsbFxuXG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGVNYW5hZ2VyIiwiY2xhc3MgU3RhdGVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQHN5c3RlbXMgPSBbXVxuXG4gICAgYWRkU3lzdGVtOiAoc3lzdGVtKSAtPlxuICAgICAgICBAc3lzdGVtcy5wdXNoIHN5c3RlbVxuICAgICAgICByZXR1cm4gc3lzdGVtXG5cbiAgICBpbml0OiAtPlxuICAgIGFjdGl2YXRlOiAtPlxuICAgIGRlYWN0aXZhdGU6IC0+XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGUiLCJjbGFzcyBVdGlsXG4gICAgQGxvYWRKU09OOiAodXJsKSAtPiBVdGlsLmxvYWQodXJsKS50aGVuKEpTT04ucGFyc2UpXG5cbiAgICBAbG9hZDogKHVybCkgLT5cbiAgICAgICAgcHJvbWlzZSA9IG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpIC0+XG4gICAgICAgICAgICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICAgICAgI3hoci5yZXNwb25zZVR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgeGhyLm9wZW4gXCJHRVRcIiwgdXJsLCB0cnVlXG4gICAgICAgICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lciBcInJlYWR5c3RhdGVjaGFuZ2VcIiwgLT5cbiAgICAgICAgICAgICAgICBpZiB4aHIucmVhZHlTdGF0ZSBpcyA0XG4gICAgICAgICAgICAgICAgICAgIGlmIHhoci5zdGF0dXMgaW4gWzIwMCwgMzA0XVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCBcImVycm9yXCJcbiAgICAgICAgICAgIHhoci5zZW5kKClcbiAgICAgICAgcmV0dXJuIHByb21pc2VcblxubW9kdWxlLmV4cG9ydHMgPSBVdGlsIl19
