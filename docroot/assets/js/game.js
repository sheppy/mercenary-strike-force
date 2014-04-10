(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BootState, MenuState, PreLoadState, State, StateManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../engine/src/State.coffee");

StateManager = require("../../engine/src/Manager/StateManager.coffee");

PreLoadState = require("./PreLoadState.coffee");

MenuState = require("./MenuState.coffee");

BootState = (function(_super) {
  __extends(BootState, _super);

  function BootState() {
    return BootState.__super__.constructor.apply(this, arguments);
  }

  BootState.prototype.init = function() {
    var menuState, preloadState;
    preloadState = new PreLoadState();
    StateManager.add("preload", preloadState);
    preloadState.init();
    menuState = new MenuState();
    StateManager.add("menu", menuState);
    return menuState.init();
  };

  BootState.prototype.activate = function() {
    return StateManager.activate("preload");
  };

  return BootState;

})(State);

module.exports = BootState;


},{"../../engine/src/Manager/StateManager.coffee":7,"../../engine/src/State.coffee":8,"./MenuState.coffee":2,"./PreLoadState.coffee":3}],2:[function(require,module,exports){
var MenuState, State,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../engine/src/State.coffee");

MenuState = (function(_super) {
  __extends(MenuState, _super);

  function MenuState() {
    return MenuState.__super__.constructor.apply(this, arguments);
  }

  MenuState.prototype.init = function() {};

  return MenuState;

})(State);

module.exports = MenuState;


},{"../../engine/src/State.coffee":8}],3:[function(require,module,exports){
var AssetManager, PreLoadState, State, StateManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../engine/src/State.coffee");

StateManager = require("../../engine/src/Manager/StateManager.coffee");

AssetManager = require("../../engine/src/Manager/AssetManager.coffee");

PreLoadState = (function(_super) {
  __extends(PreLoadState, _super);

  function PreLoadState() {
    return PreLoadState.__super__.constructor.apply(this, arguments);
  }

  PreLoadState.prototype.activate = function() {
    var loadAsset;
    loadAsset = AssetManager.load("assets/assets.json");
    return loadAsset.then(function() {
      return StateManager.activate("menu");
    });
  };

  return PreLoadState;

})(State);

module.exports = PreLoadState;


},{"../../engine/src/Manager/AssetManager.coffee":6,"../../engine/src/Manager/StateManager.coffee":7,"../../engine/src/State.coffee":8}],4:[function(require,module,exports){
var BootState, Engine, game;

Engine = require("../engine/src/Engine.coffee");

BootState = require("./State/BootState.coffee");

game = new Engine;

game.start(new BootState);


},{"../engine/src/Engine.coffee":5,"./State/BootState.coffee":1}],5:[function(require,module,exports){
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


},{"./Manager/StateManager.coffee":7}],6:[function(require,module,exports){
var AssetManager, Util;

Util = require("../Util.coffee");

AssetManager = (function() {
  function AssetManager() {}

  AssetManager.assets = {};

  AssetManager.numAssets = 0;

  AssetManager.assetsLoaded = 0;

  AssetManager.load = function(manifest, cb) {
    var promise;
    promise = new Promise(function(resolve, reject) {
      var loadManifest;
      console.log("AssetManager > load > " + manifest);
      loadManifest = Util.loadJSON(manifest);
      return loadManifest.then(function(json) {
        var asset, group, i, _i, _len, _ref, _ref1, _results;
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
        for (i in _ref1) {
          group = _ref1[i];
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
                  AssetManager.onAssetLoad(asset, data);
                  AssetManager.onProgress();
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

  AssetManager.onAssetLoad = function(asset, data) {};

  AssetManager.onAssetError = function(asset) {};

  AssetManager.onProgress = function() {};

  AssetManager.onLoaded = function() {};

  AssetManager.get = function(asset) {
    return AssetManager.assets[asset];
  };

  return AssetManager;

})();

module.exports = AssetManager;


},{"../Util.coffee":9}],7:[function(require,module,exports){
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
    console.log("StateManager > activate > " + name);
    StateManager.currentState = name;
    StateManager.current().activate();
    return null;
  };

  return StateManager;

})();

module.exports = StateManager;


},{}],8:[function(require,module,exports){
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

  return State;

})();

module.exports = State;


},{}],9:[function(require,module,exports){
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


},{}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcd3d3XFxkdW5nZW9uXFxub2RlX21vZHVsZXNcXGdydW50LWJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiQzpcXHd3d1xcZHVuZ2VvblxcZG9jcm9vdFxcYXNzZXRzXFxjb2ZmZWVcXFN0YXRlXFxCb290U3RhdGUuY29mZmVlIiwiQzpcXHd3d1xcZHVuZ2VvblxcZG9jcm9vdFxcYXNzZXRzXFxjb2ZmZWVcXFN0YXRlXFxNZW51U3RhdGUuY29mZmVlIiwiQzpcXHd3d1xcZHVuZ2VvblxcZG9jcm9vdFxcYXNzZXRzXFxjb2ZmZWVcXFN0YXRlXFxQcmVMb2FkU3RhdGUuY29mZmVlIiwiQzpcXHd3d1xcZHVuZ2VvblxcZG9jcm9vdFxcYXNzZXRzXFxjb2ZmZWVcXGdhbWUuY29mZmVlIiwiQzpcXHd3d1xcZHVuZ2VvblxcZG9jcm9vdFxcYXNzZXRzXFxlbmdpbmVcXHNyY1xcRW5naW5lLmNvZmZlZSIsIkM6XFx3d3dcXGR1bmdlb25cXGRvY3Jvb3RcXGFzc2V0c1xcZW5naW5lXFxzcmNcXE1hbmFnZXJcXEFzc2V0TWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxkdW5nZW9uXFxkb2Nyb290XFxhc3NldHNcXGVuZ2luZVxcc3JjXFxNYW5hZ2VyXFxTdGF0ZU1hbmFnZXIuY29mZmVlIiwiQzpcXHd3d1xcZHVuZ2VvblxcZG9jcm9vdFxcYXNzZXRzXFxlbmdpbmVcXHNyY1xcU3RhdGUuY29mZmVlIiwiQzpcXHd3d1xcZHVuZ2VvblxcZG9jcm9vdFxcYXNzZXRzXFxlbmdpbmVcXHNyY1xcVXRpbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLHVEQUFBO0VBQUE7aVNBQUE7O0FBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSwrQkFBUixDQUFSLENBQUE7O0FBQUEsWUFDQSxHQUFlLE9BQUEsQ0FB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QUFDLEtBQXpCLEVBQVQ7RUFBQSxDQUFYLENBQUE7O0FBQUEsRUFFQSxJQUFDLENBQUEsSUFBRCxHQUFPLFNBQUMsR0FBRCxHQUFBO0FBQ0gsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQWMsSUFBQSxPQUFBLENBQVEsU0FBQyxPQUFELEVBQVUsTUFBVixHQUFBO0FBQ2xCLFVBQUEsR0FBQTtBQUFBLE1BQUEsR0FBQSxHQUFVLElBQUEsY0FBQSxDQUFBLENBQVYsQ0FBQTtBQUFBLE1BRUEsR0FBRyxDQUFDLElBQUosQ0FBUyxLQUFULEVBQWdCLEdBQWhCLEVBQXFCLElBQXJCLENBRkEsQ0FBQTtBQUFBLE1BR0EsR0FBRyxDQUFDLGdCQUFKLENBQXFCLGtCQUFyQixFQUF5QyxTQUFBLEdBQUE7QUFDckMsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFHLEdBQUcsQ0FBQyxVQUFKLEtBQWtCLENBQXJCO0FBQ0ksVUFBQSxZQUFHLEdBQUcsQ0FBQyxPQUFKLEtBQWUsR0FBZixJQUFBLElBQUEsS0FBb0IsR0FBdkI7bUJBQ0ksT0FBQSxDQUFRLEdBQUcsQ0FBQyxZQUFaLEVBREo7V0FBQSxNQUFBO21CQUdJLE1BQUEsQ0FBTyxPQUFQLEVBSEo7V0FESjtTQURxQztNQUFBLENBQXpDLENBSEEsQ0FBQTthQVNBLEdBQUcsQ0FBQyxJQUFKLENBQUEsRUFWa0I7SUFBQSxDQUFSLENBQWQsQ0FBQTtBQVdBLFdBQU8sT0FBUCxDQVpHO0VBQUEsQ0FGUCxDQUFBOztjQUFBOztJQURKLENBQUE7O0FBQUEsTUFpQk0sQ0FBQyxPQUFQLEdBQWlCLElBakJqQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJTdGF0ZSA9IHJlcXVpcmUgXCIuLi8uLi9lbmdpbmUvc3JjL1N0YXRlLmNvZmZlZVwiXG5TdGF0ZU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vZW5naW5lL3NyYy9NYW5hZ2VyL1N0YXRlTWFuYWdlci5jb2ZmZWVcIlxuXG5QcmVMb2FkU3RhdGUgPSByZXF1aXJlIFwiLi9QcmVMb2FkU3RhdGUuY29mZmVlXCJcbk1lbnVTdGF0ZSA9IHJlcXVpcmUgXCIuL01lbnVTdGF0ZS5jb2ZmZWVcIlxuXG5cbmNsYXNzIEJvb3RTdGF0ZSBleHRlbmRzIFN0YXRlXG4gICAgaW5pdDogLT5cblxuICAgICAgICAjIFVzZSBHcmFwaGljc01hbmFnZXIgdG8gY3JlYXRlIG1haW4gY2FudmFzXG4gICAgICAgICMgRWFjaCBTdGF0ZSBjYW4gdGhlbiBoYXZlIGl0cyBvd24gZ3JhcGhpY3Mgc3lzdGVtP1xuIyAgICAgICAgQGdmeCA9IEBhZGRTeXN0ZW0gbmV3IEdyYXBoaWNzU3lzdGVtKClcbiMgICAgICAgIEBnZnguaW5pdCA2NDAsIDQ4MCwgZG9jdW1lbnQuYm9keVxuXG4gICAgICAgIHByZWxvYWRTdGF0ZSA9IG5ldyBQcmVMb2FkU3RhdGUoKVxuICAgICAgICBTdGF0ZU1hbmFnZXIuYWRkIFwicHJlbG9hZFwiLCBwcmVsb2FkU3RhdGVcbiAgICAgICAgcHJlbG9hZFN0YXRlLmluaXQoKVxuXG4gICAgICAgIG1lbnVTdGF0ZSA9IG5ldyBNZW51U3RhdGUoKVxuICAgICAgICBTdGF0ZU1hbmFnZXIuYWRkIFwibWVudVwiLCBtZW51U3RhdGVcbiAgICAgICAgbWVudVN0YXRlLmluaXQoKVxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIFN0YXRlTWFuYWdlci5hY3RpdmF0ZSBcInByZWxvYWRcIlxuXG5cbm1vZHVsZS5leHBvcnRzID0gQm9vdFN0YXRlIiwiU3RhdGUgPSByZXF1aXJlIFwiLi4vLi4vZW5naW5lL3NyYy9TdGF0ZS5jb2ZmZWVcIlxuXG5jbGFzcyBNZW51U3RhdGUgZXh0ZW5kcyBTdGF0ZVxuICAgIGluaXQ6IC0+XG5cbm1vZHVsZS5leHBvcnRzID0gTWVudVN0YXRlIiwiU3RhdGUgPSByZXF1aXJlIFwiLi4vLi4vZW5naW5lL3NyYy9TdGF0ZS5jb2ZmZWVcIlxuU3RhdGVNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uL2VuZ2luZS9zcmMvTWFuYWdlci9TdGF0ZU1hbmFnZXIuY29mZmVlXCJcbkFzc2V0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi9lbmdpbmUvc3JjL01hbmFnZXIvQXNzZXRNYW5hZ2VyLmNvZmZlZVwiXG5cbmNsYXNzIFByZUxvYWRTdGF0ZSBleHRlbmRzIFN0YXRlXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIGxvYWRBc3NldCA9IEFzc2V0TWFuYWdlci5sb2FkIFwiYXNzZXRzL2Fzc2V0cy5qc29uXCJcbiAgICAgICAgbG9hZEFzc2V0LnRoZW4gLT4gU3RhdGVNYW5hZ2VyLmFjdGl2YXRlIFwibWVudVwiXG5cbm1vZHVsZS5leHBvcnRzID0gUHJlTG9hZFN0YXRlIiwiRW5naW5lID0gcmVxdWlyZSBcIi4uL2VuZ2luZS9zcmMvRW5naW5lLmNvZmZlZVwiXG5cbkJvb3RTdGF0ZSA9IHJlcXVpcmUgXCIuL1N0YXRlL0Jvb3RTdGF0ZS5jb2ZmZWVcIlxuXG5cbmdhbWUgPSBuZXcgRW5naW5lXG5nYW1lLnN0YXJ0IG5ldyBCb290U3RhdGUiLCJTdGF0ZU1hbmFnZXIgPSByZXF1aXJlIFwiLi9NYW5hZ2VyL1N0YXRlTWFuYWdlci5jb2ZmZWVcIlxuXG5jbGFzcyBFbmdpbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQGxhc3RHYW1lVGljayA9IERhdGUubm93KClcblxuICAgIHN0YXJ0OiAoc3RhdGUpIC0+XG4gICAgICAgIFN0YXRlTWFuYWdlci5hZGQgXCJib290XCIsIHN0YXRlXG4gICAgICAgIHN0YXRlLmluaXQoKVxuICAgICAgICBTdGF0ZU1hbmFnZXIuYWN0aXZhdGUgXCJib290XCJcbiAgICAgICAgQG1haW5Mb29wKClcblxuICAgIG1haW5Mb29wOiAtPlxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQG1haW5Mb29wLmJpbmQgQFxuXG4gICAgICAgIEBjdXJyZW50R2FtZVRpY2sgPSBEYXRlLm5vdygpXG4gICAgICAgIEBkZWx0YSA9IEBjdXJyZW50R2FtZVRpY2sgLSBAbGFzdEdhbWVUaWNrXG4gICAgICAgIEBsYXN0R2FtZVRpY2sgPSBAY3VycmVudEdhbWVUaWNrXG5cbiAgICAgICAgQHVwZGF0ZSBAZGVsdGFcbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgIHVwZGF0ZTogKGR0KSAtPlxuICAgICAgICBzdGF0ZSA9IFN0YXRlTWFuYWdlci5jdXJyZW50KClcblxuICAgICAgICBmb3Igc3lzdGVtIGluIHN0YXRlLnN5c3RlbXNcbiAgICAgICAgICAgIHN5c3RlbS51cGRhdGUgZHRcbiAgICAgICAgcmV0dXJuIG51bGxcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEVuZ2luZSIsIlV0aWwgPSByZXF1aXJlIFwiLi4vVXRpbC5jb2ZmZWVcIlxuXG5jbGFzcyBBc3NldE1hbmFnZXJcbiAgICBAYXNzZXRzID0ge31cbiAgICBAbnVtQXNzZXRzID0gMFxuICAgIEBhc3NldHNMb2FkZWQgPSAwXG5cbiAgICBAbG9hZDogKG1hbmlmZXN0LCBjYikgLT5cbiAgICAgICAgcHJvbWlzZSA9IG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpIC0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyBcIkFzc2V0TWFuYWdlciA+IGxvYWQgPiAje21hbmlmZXN0fVwiXG4gICAgICAgICAgICBsb2FkTWFuaWZlc3QgPSBVdGlsLmxvYWRKU09OIG1hbmlmZXN0XG4gICAgICAgICAgICBsb2FkTWFuaWZlc3QudGhlbiAoanNvbikgLT5cbiAgICAgICAgICAgICAgICBmb3IgaSxncm91cCBvZiBqc29uLmdyb3Vwc1xuICAgICAgICAgICAgICAgICAgICBmb3IgYXNzZXQgaW4gZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5udW1Bc3NldHMrK1xuXG4gICAgICAgICAgICAgICAgZm9yIGksZ3JvdXAgb2YganNvbi5ncm91cHNcbiAgICAgICAgICAgICAgICAgICAgZm9yIGFzc2V0IGluIGdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBkbyAoYXNzZXQpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkID0gVXRpbC5sb2FkIGpzb24ucm9vdCArIGFzc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkLnRoZW4gKGRhdGEpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5hc3NldHNbYXNzZXRdID0gYXNzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLmFzc2V0c0xvYWRlZCsrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5vbkFzc2V0TG9hZCBhc3NldCwgZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIub25Qcm9ncmVzcygpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgQXNzZXRNYW5hZ2VyLmFzc2V0c0xvYWRlZCBpcyBBc3NldE1hbmFnZXIubnVtQXNzZXRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIub25Mb2FkZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIHJldHVybiBwcm9taXNlXG5cbiAgICBAb25Bc3NldExvYWQ6IChhc3NldCwgZGF0YSkgLT5cbiAgICBAb25Bc3NldEVycm9yOiAoYXNzZXQpIC0+XG4gICAgQG9uUHJvZ3Jlc3M6IC0+XG4gICAgQG9uTG9hZGVkOiAtPlxuXG4gICAgQGdldDogKGFzc2V0KSAtPiBBc3NldE1hbmFnZXIuYXNzZXRzW2Fzc2V0XVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQXNzZXRNYW5hZ2VyIiwiY2xhc3MgU3RhdGVNYW5hZ2VyXG4gICAgQHN0YXRlczoge31cblxuICAgIEBhZGQ6IChuYW1lLCBzdGF0ZSkgLT5cbiAgICAgICAgY29uc29sZS5sb2cgXCJTdGF0ZU1hbmFnZXIgPiBhZGQgPiAje25hbWV9XCJcbiAgICAgICAgU3RhdGVNYW5hZ2VyLnN0YXRlc1tuYW1lXSA9IHN0YXRlXG4gICAgICAgIHJldHVybiBudWxsXG5cbiAgICBAY3VycmVudDogLT4gU3RhdGVNYW5hZ2VyLnN0YXRlc1tTdGF0ZU1hbmFnZXIuY3VycmVudFN0YXRlXVxuXG4gICAgQGFjdGl2YXRlOiAobmFtZSkgLT5cbiAgICAgICAgY29uc29sZS5sb2cgXCJTdGF0ZU1hbmFnZXIgPiBhY3RpdmF0ZSA+ICN7bmFtZX1cIlxuICAgICAgICBTdGF0ZU1hbmFnZXIuY3VycmVudFN0YXRlID0gbmFtZVxuICAgICAgICBTdGF0ZU1hbmFnZXIuY3VycmVudCgpLmFjdGl2YXRlKClcbiAgICAgICAgcmV0dXJuIG51bGxcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRlTWFuYWdlciIsImNsYXNzIFN0YXRlXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBzeXN0ZW1zID0gW11cblxuICAgIGFkZFN5c3RlbTogKHN5c3RlbSkgLT5cbiAgICAgICAgQHN5c3RlbXMucHVzaCBzeXN0ZW1cbiAgICAgICAgcmV0dXJuIHN5c3RlbVxuXG4gICAgaW5pdDogLT5cbiAgICBhY3RpdmF0ZTogLT5cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZSIsImNsYXNzIFV0aWxcbiAgICBAbG9hZEpTT046ICh1cmwpIC0+IFV0aWwubG9hZCh1cmwpLnRoZW4oSlNPTi5wYXJzZSlcblxuICAgIEBsb2FkOiAodXJsKSAtPlxuICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgLT5cbiAgICAgICAgICAgIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgICAgICAjeGhyLnJlc3BvbnNlVHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB4aHIub3BlbiBcIkdFVFwiLCB1cmwsIHRydWVcbiAgICAgICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyIFwicmVhZHlzdGF0ZWNoYW5nZVwiLCAtPlxuICAgICAgICAgICAgICAgIGlmIHhoci5yZWFkeVN0YXRlIGlzIDRcbiAgICAgICAgICAgICAgICAgICAgaWYgeGhyLnN0YXR1cyBpbiBbMjAwLCAzMDRdXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlIHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0IFwiZXJyb3JcIlxuICAgICAgICAgICAgeGhyLnNlbmQoKVxuICAgICAgICByZXR1cm4gcHJvbWlzZVxuXG5tb2R1bGUuZXhwb3J0cyA9IFV0aWwiXX0=
