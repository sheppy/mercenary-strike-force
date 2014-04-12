(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BootState, MenuState, PreLoadState, State, StateManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../vendor/iki-engine/src/State.coffee");

StateManager = require("../../vendor/iki-engine/src/Manager/StateManager.coffee");

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


},{"../../vendor/iki-engine/src/Manager/StateManager.coffee":7,"../../vendor/iki-engine/src/State.coffee":8,"./MenuState.coffee":2,"./PreLoadState.coffee":3}],2:[function(require,module,exports){
var MenuState, State,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../vendor/iki-engine/src/State.coffee");

MenuState = (function(_super) {
  __extends(MenuState, _super);

  function MenuState() {
    return MenuState.__super__.constructor.apply(this, arguments);
  }

  MenuState.prototype.init = function() {};

  return MenuState;

})(State);

module.exports = MenuState;


},{"../../vendor/iki-engine/src/State.coffee":8}],3:[function(require,module,exports){
var AssetManager, PreLoadState, State, StateManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../vendor/iki-engine/src/State.coffee");

StateManager = require("../../vendor/iki-engine/src/Manager/StateManager.coffee");

AssetManager = require("../../vendor/iki-engine/src/Manager/AssetManager.coffee");

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


},{"../../vendor/iki-engine/src/Manager/AssetManager.coffee":6,"../../vendor/iki-engine/src/Manager/StateManager.coffee":7,"../../vendor/iki-engine/src/State.coffee":8}],4:[function(require,module,exports){
var BootState, Engine, game;

Engine = require("../vendor/iki-engine/src/Engine.coffee");

BootState = require("./State/BootState.coffee");

game = new Engine;

game.start(new BootState);


},{"../vendor/iki-engine/src/Engine.coffee":5,"./State/BootState.coffee":1}],5:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxTdGF0ZVxcQm9vdFN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxTdGF0ZVxcTWVudVN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxTdGF0ZVxcUHJlTG9hZFN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxnYW1lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXEVuZ2luZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxNYW5hZ2VyXFxBc3NldE1hbmFnZXIuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcU3RhdGVNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXFN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXFV0aWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSx1REFBQTtFQUFBO2lTQUFBOztBQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsMENBQVIsQ0FBUixDQUFBOztBQUFBLFlBQ0EsR0FBZSxPQUFBLENBQVEseURBQVIsQ0FEZixDQUFBOztBQUFBLFlBR0EsR0FBZSxPQUFBLENBQVEsdUJBQVIsQ0FIZixDQUFBOztBQUFBLFNBSUEsR0FBWSxPQUFBLENBQVEsb0JBQVIsQ0FKWixDQUFBOztBQUFBO0FBUUksOEJBQUEsQ0FBQTs7OztHQUFBOztBQUFBLHNCQUFBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFPRixRQUFBLHVCQUFBO0FBQUEsSUFBQSxZQUFBLEdBQW1CLElBQUEsWUFBQSxDQUFBLENBQW5CLENBQUE7QUFBQSxJQUNBLFlBQVksQ0FBQyxHQUFiLENBQWlCLFNBQWpCLEVBQTRCLFlBQTVCLENBREEsQ0FBQTtBQUFBLElBRUEsWUFBWSxDQUFDLElBQWIsQ0FBQSxDQUZBLENBQUE7QUFBQSxJQUlBLFNBQUEsR0FBZ0IsSUFBQSxTQUFBLENBQUEsQ0FKaEIsQ0FBQTtBQUFBLElBS0EsWUFBWSxDQUFDLEdBQWIsQ0FBaUIsTUFBakIsRUFBeUIsU0FBekIsQ0FMQSxDQUFBO1dBTUEsU0FBUyxDQUFDLElBQVYsQ0FBQSxFQWJFO0VBQUEsQ0FBTixDQUFBOztBQUFBLHNCQWVBLFFBQUEsR0FBVSxTQUFBLEdBQUE7V0FDTixZQUFZLENBQUMsUUFBYixDQUFzQixTQUF0QixFQURNO0VBQUEsQ0FmVixDQUFBOzttQkFBQTs7R0FEb0IsTUFQeEIsQ0FBQTs7QUFBQSxNQTJCTSxDQUFDLE9BQVAsR0FBaUIsU0EzQmpCLENBQUE7Ozs7QUNBQSxJQUFBLGdCQUFBO0VBQUE7aVNBQUE7O0FBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSwwQ0FBUixDQUFSLENBQUE7O0FBQUE7QUFHSSw4QkFBQSxDQUFBOzs7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IihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiU3RhdGUgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1N0YXRlLmNvZmZlZVwiXG5TdGF0ZU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvU3RhdGVNYW5hZ2VyLmNvZmZlZVwiXG5cblByZUxvYWRTdGF0ZSA9IHJlcXVpcmUgXCIuL1ByZUxvYWRTdGF0ZS5jb2ZmZWVcIlxuTWVudVN0YXRlID0gcmVxdWlyZSBcIi4vTWVudVN0YXRlLmNvZmZlZVwiXG5cblxuY2xhc3MgQm9vdFN0YXRlIGV4dGVuZHMgU3RhdGVcbiAgICBpbml0OiAtPlxuXG4gICAgICAgICMgVXNlIEdyYXBoaWNzTWFuYWdlciB0byBjcmVhdGUgbWFpbiBjYW52YXNcbiAgICAgICAgIyBFYWNoIFN0YXRlIGNhbiB0aGVuIGhhdmUgaXRzIG93biBncmFwaGljcyBzeXN0ZW0/XG4jICAgICAgICBAZ2Z4ID0gQGFkZFN5c3RlbSBuZXcgR3JhcGhpY3NTeXN0ZW0oKVxuIyAgICAgICAgQGdmeC5pbml0IDY0MCwgNDgwLCBkb2N1bWVudC5ib2R5XG5cbiAgICAgICAgcHJlbG9hZFN0YXRlID0gbmV3IFByZUxvYWRTdGF0ZSgpXG4gICAgICAgIFN0YXRlTWFuYWdlci5hZGQgXCJwcmVsb2FkXCIsIHByZWxvYWRTdGF0ZVxuICAgICAgICBwcmVsb2FkU3RhdGUuaW5pdCgpXG5cbiAgICAgICAgbWVudVN0YXRlID0gbmV3IE1lbnVTdGF0ZSgpXG4gICAgICAgIFN0YXRlTWFuYWdlci5hZGQgXCJtZW51XCIsIG1lbnVTdGF0ZVxuICAgICAgICBtZW51U3RhdGUuaW5pdCgpXG5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICAgICAgU3RhdGVNYW5hZ2VyLmFjdGl2YXRlIFwicHJlbG9hZFwiXG5cblxubW9kdWxlLmV4cG9ydHMgPSBCb290U3RhdGUiLCJTdGF0ZSA9IHJlcXVpcmUgXCIuLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU3RhdGUuY29mZmVlXCJcblxuY2xhc3MgTWVudVN0YXRlIGV4dGVuZHMgU3RhdGVcbiAgICBpbml0OiAtPlxuXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnVTdGF0ZSIsIlN0YXRlID0gcmVxdWlyZSBcIi4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TdGF0ZS5jb2ZmZWVcIlxuU3RhdGVNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL1N0YXRlTWFuYWdlci5jb2ZmZWVcIlxuQXNzZXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0Fzc2V0TWFuYWdlci5jb2ZmZWVcIlxuXG5jbGFzcyBQcmVMb2FkU3RhdGUgZXh0ZW5kcyBTdGF0ZVxuICAgIGFjdGl2YXRlOiAtPlxuICAgICAgICBsb2FkQXNzZXQgPSBBc3NldE1hbmFnZXIubG9hZCBcImFzc2V0cy9hc3NldHMuanNvblwiXG4gICAgICAgIGxvYWRBc3NldC50aGVuIC0+IFN0YXRlTWFuYWdlci5hY3RpdmF0ZSBcIm1lbnVcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IFByZUxvYWRTdGF0ZSIsIkVuZ2luZSA9IHJlcXVpcmUgXCIuLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvRW5naW5lLmNvZmZlZVwiXG5cbkJvb3RTdGF0ZSA9IHJlcXVpcmUgXCIuL1N0YXRlL0Jvb3RTdGF0ZS5jb2ZmZWVcIlxuXG5cbmdhbWUgPSBuZXcgRW5naW5lXG5nYW1lLnN0YXJ0IG5ldyBCb290U3RhdGUiLCJTdGF0ZU1hbmFnZXIgPSByZXF1aXJlIFwiLi9NYW5hZ2VyL1N0YXRlTWFuYWdlci5jb2ZmZWVcIlxuXG5jbGFzcyBFbmdpbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQGxhc3RHYW1lVGljayA9IERhdGUubm93KClcblxuICAgIHN0YXJ0OiAoc3RhdGUpIC0+XG4gICAgICAgIFN0YXRlTWFuYWdlci5hZGQgXCJib290XCIsIHN0YXRlXG4gICAgICAgIHN0YXRlLmluaXQoKVxuICAgICAgICBTdGF0ZU1hbmFnZXIuYWN0aXZhdGUgXCJib290XCJcbiAgICAgICAgQG1haW5Mb29wKClcblxuICAgIG1haW5Mb29wOiAtPlxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQG1haW5Mb29wLmJpbmQgQFxuXG4gICAgICAgIEBjdXJyZW50R2FtZVRpY2sgPSBEYXRlLm5vdygpXG4gICAgICAgIEBkZWx0YSA9IEBjdXJyZW50R2FtZVRpY2sgLSBAbGFzdEdhbWVUaWNrXG4gICAgICAgIEBsYXN0R2FtZVRpY2sgPSBAY3VycmVudEdhbWVUaWNrXG5cbiAgICAgICAgQHVwZGF0ZSBAZGVsdGFcbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgIHVwZGF0ZTogKGR0KSAtPlxuICAgICAgICBzdGF0ZSA9IFN0YXRlTWFuYWdlci5jdXJyZW50KClcblxuICAgICAgICBmb3Igc3lzdGVtIGluIHN0YXRlLnN5c3RlbXNcbiAgICAgICAgICAgIHN5c3RlbS51cGRhdGUgZHRcbiAgICAgICAgcmV0dXJuIG51bGxcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEVuZ2luZSIsIlV0aWwgPSByZXF1aXJlIFwiLi4vVXRpbC5jb2ZmZWVcIlxuXG5jbGFzcyBBc3NldE1hbmFnZXJcbiAgICBAYXNzZXRzID0ge31cbiAgICBAbnVtQXNzZXRzID0gMFxuICAgIEBhc3NldHNMb2FkZWQgPSAwXG5cbiAgICBAbG9hZDogKG1hbmlmZXN0LCBjYikgLT5cbiAgICAgICAgcHJvbWlzZSA9IG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpIC0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyBcIkFzc2V0TWFuYWdlciA+IGxvYWQgPiAje21hbmlmZXN0fVwiXG4gICAgICAgICAgICBsb2FkTWFuaWZlc3QgPSBVdGlsLmxvYWRKU09OIG1hbmlmZXN0XG4gICAgICAgICAgICBsb2FkTWFuaWZlc3QudGhlbiAoanNvbikgLT5cbiAgICAgICAgICAgICAgICBmb3IgaSxncm91cCBvZiBqc29uLmdyb3Vwc1xuICAgICAgICAgICAgICAgICAgICBmb3IgYXNzZXQgaW4gZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5udW1Bc3NldHMrK1xuXG4gICAgICAgICAgICAgICAgZm9yIGksZ3JvdXAgb2YganNvbi5ncm91cHNcbiAgICAgICAgICAgICAgICAgICAgZm9yIGFzc2V0IGluIGdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBkbyAoYXNzZXQpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkID0gVXRpbC5sb2FkIGpzb24ucm9vdCArIGFzc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkLnRoZW4gKGRhdGEpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5hc3NldHNbYXNzZXRdID0gYXNzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLmFzc2V0c0xvYWRlZCsrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5vbkFzc2V0TG9hZCBhc3NldCwgZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIub25Qcm9ncmVzcygpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgQXNzZXRNYW5hZ2VyLmFzc2V0c0xvYWRlZCBpcyBBc3NldE1hbmFnZXIubnVtQXNzZXRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIub25Mb2FkZWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIHJldHVybiBwcm9taXNlXG5cbiAgICBAb25Bc3NldExvYWQ6IChhc3NldCwgZGF0YSkgLT5cbiAgICBAb25Bc3NldEVycm9yOiAoYXNzZXQpIC0+XG4gICAgQG9uUHJvZ3Jlc3M6IC0+XG4gICAgQG9uTG9hZGVkOiAtPlxuXG4gICAgQGdldDogKGFzc2V0KSAtPiBBc3NldE1hbmFnZXIuYXNzZXRzW2Fzc2V0XVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQXNzZXRNYW5hZ2VyIiwiY2xhc3MgU3RhdGVNYW5hZ2VyXG4gICAgQHN0YXRlczoge31cblxuICAgIEBhZGQ6IChuYW1lLCBzdGF0ZSkgLT5cbiAgICAgICAgY29uc29sZS5sb2cgXCJTdGF0ZU1hbmFnZXIgPiBhZGQgPiAje25hbWV9XCJcbiAgICAgICAgU3RhdGVNYW5hZ2VyLnN0YXRlc1tuYW1lXSA9IHN0YXRlXG4gICAgICAgIHJldHVybiBudWxsXG5cbiAgICBAY3VycmVudDogLT4gU3RhdGVNYW5hZ2VyLnN0YXRlc1tTdGF0ZU1hbmFnZXIuY3VycmVudFN0YXRlXVxuXG4gICAgQGFjdGl2YXRlOiAobmFtZSkgLT5cbiAgICAgICAgY29uc29sZS5sb2cgXCJTdGF0ZU1hbmFnZXIgPiBhY3RpdmF0ZSA+ICN7bmFtZX1cIlxuICAgICAgICBTdGF0ZU1hbmFnZXIuY3VycmVudFN0YXRlID0gbmFtZVxuICAgICAgICBTdGF0ZU1hbmFnZXIuY3VycmVudCgpLmFjdGl2YXRlKClcbiAgICAgICAgcmV0dXJuIG51bGxcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRlTWFuYWdlciIsImNsYXNzIFN0YXRlXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBzeXN0ZW1zID0gW11cblxuICAgIGFkZFN5c3RlbTogKHN5c3RlbSkgLT5cbiAgICAgICAgQHN5c3RlbXMucHVzaCBzeXN0ZW1cbiAgICAgICAgcmV0dXJuIHN5c3RlbVxuXG4gICAgaW5pdDogLT5cbiAgICBhY3RpdmF0ZTogLT5cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZSIsImNsYXNzIFV0aWxcbiAgICBAbG9hZEpTT046ICh1cmwpIC0+IFV0aWwubG9hZCh1cmwpLnRoZW4oSlNPTi5wYXJzZSlcblxuICAgIEBsb2FkOiAodXJsKSAtPlxuICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgLT5cbiAgICAgICAgICAgIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgICAgICAjeGhyLnJlc3BvbnNlVHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB4aHIub3BlbiBcIkdFVFwiLCB1cmwsIHRydWVcbiAgICAgICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyIFwicmVhZHlzdGF0ZWNoYW5nZVwiLCAtPlxuICAgICAgICAgICAgICAgIGlmIHhoci5yZWFkeVN0YXRlIGlzIDRcbiAgICAgICAgICAgICAgICAgICAgaWYgeGhyLnN0YXR1cyBpbiBbMjAwLCAzMDRdXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlIHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0IFwiZXJyb3JcIlxuICAgICAgICAgICAgeGhyLnNlbmQoKVxuICAgICAgICByZXR1cm4gcHJvbWlzZVxuXG5tb2R1bGUuZXhwb3J0cyA9IFV0aWwiXX0=
