(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BootState, Demo1State, GraphicsManager, InputManager, LoadMapDemoState, MenuState, MoveMapDemoState, MoveMapSmoothDemoState, PreLoadState, State, StateManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../vendor/iki-engine/src/State.coffee");

StateManager = require("../../vendor/iki-engine/src/Manager/StateManager.coffee");

GraphicsManager = require("../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../vendor/iki-engine/src/Manager/InputManager.coffee");

PreLoadState = require("./PreLoadState.coffee");

MenuState = require("./MenuState.coffee");

Demo1State = require("./Demos/Demo1/Demo1State.coffee");

LoadMapDemoState = require("./Demos/LoadMapDemo/LoadMapDemoState.coffee");

MoveMapDemoState = require("./Demos/MoveMapDemo/MoveMapDemoState.coffee");

MoveMapSmoothDemoState = require("./Demos/MoveMapSmoothDemo/MoveMapSmoothDemoState.coffee");

BootState = (function(_super) {
  __extends(BootState, _super);

  function BootState() {
    return BootState.__super__.constructor.apply(this, arguments);
  }

  BootState.prototype.init = function() {
    var demo1State, loadMapDemoState, menuState, moveMapDemoState, moveMapSmoothDemoState, preloadState;
    GraphicsManager.renderer = GraphicsManager.createRenderer(640, 480, document.body);
    InputManager.init();
    preloadState = new PreLoadState();
    StateManager.add("preload", preloadState);
    preloadState.init();
    menuState = new MenuState();
    StateManager.add("menu", menuState);
    menuState.init();
    demo1State = new Demo1State();
    StateManager.add("demo1", demo1State);
    demo1State.init();
    loadMapDemoState = new LoadMapDemoState();
    StateManager.add("LoadMapDemo", loadMapDemoState);
    loadMapDemoState.init();
    moveMapDemoState = new MoveMapDemoState();
    StateManager.add("MoveMapDemo", moveMapDemoState);
    moveMapDemoState.init();
    moveMapSmoothDemoState = new MoveMapSmoothDemoState();
    StateManager.add("MoveMapSmoothDemo", moveMapSmoothDemoState);
    moveMapSmoothDemoState.init();
    return this.debugMenu();
  };

  BootState.prototype.activate = function() {
    return StateManager.activate("preload");
  };

  BootState.prototype.debugMenu = function() {
    var gui, stateControl, statesFolder;
    gui = new dat.GUI();
    StateManager.debugState = StateManager.currentState;
    statesFolder = gui.addFolder("States");
    statesFolder.open();
    stateControl = statesFolder.add(StateManager, "debugState", ["menu", "demo1", "LoadMapDemo", "MoveMapDemo", "MoveMapSmoothDemo"]);
    stateControl.onFinishChange(function(state) {
      return StateManager.activate(state);
    });
    return StateManager.onActivate = function() {
      StateManager.debugState = StateManager.currentState;
      return stateControl.updateDisplay();
    };
  };

  return BootState;

})(State);

module.exports = BootState;


},{"../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":15,"../../vendor/iki-engine/src/Manager/InputManager.coffee":16,"../../vendor/iki-engine/src/Manager/StateManager.coffee":17,"../../vendor/iki-engine/src/State.coffee":19,"./Demos/Demo1/Demo1State.coffee":2,"./Demos/LoadMapDemo/LoadMapDemoState.coffee":4,"./Demos/MoveMapDemo/MoveMapDemoState.coffee":5,"./Demos/MoveMapSmoothDemo/MoveMapSmoothDemoState.coffee":7,"./MenuState.coffee":8,"./PreLoadState.coffee":9}],2:[function(require,module,exports){
var Demo1State, Demo1System, EntityManager, GraphicsManager, State,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EntityManager = require("../../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

GraphicsManager = require("../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

State = require("../../../../vendor/iki-engine/src/State.coffee");

Demo1System = require("./Demo1System.coffee");

Demo1State = (function(_super) {
  __extends(Demo1State, _super);

  function Demo1State() {
    return Demo1State.__super__.constructor.apply(this, arguments);
  }

  Demo1State.prototype.init = function() {
    return this.addSystem(new Demo1System());
  };

  Demo1State.prototype.activate = function() {
    var cursorImage;
    GraphicsManager.renderer.canvas.style.cursor = "none";
    this.cursor = EntityManager.createEntity("cursor");
    cursorImage = new Image();
    cursorImage.src = "/assets/img/cursor/slick_arrow-delta.png";
    EntityManager.addComponent(this.cursor, {
      type: "RenderableImage",
      img: cursorImage
    });
    EntityManager.addComponent(this.cursor, {
      type: "Position",
      x: 0,
      y: 0
    });
    return EntityManager.addComponent(this.cursor, {
      type: "PositionFollowsMouse"
    });
  };

  Demo1State.prototype.deactivate = function() {
    EntityManager.removeEntity(this.cursor);
    return GraphicsManager.renderer.canvas.style.cursor = "default";
  };

  return Demo1State;

})(State);

module.exports = Demo1State;


},{"../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":14,"../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":15,"../../../../vendor/iki-engine/src/State.coffee":19,"./Demo1System.coffee":3}],3:[function(require,module,exports){
var Demo1System, EntityManager, GraphicsManager, InputManager, System,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

System = require("../../../../vendor/iki-engine/src/System.coffee");

EntityManager = require("../../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

GraphicsManager = require("../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../../../vendor/iki-engine/src/Manager/InputManager.coffee");

Demo1System = (function(_super) {
  __extends(Demo1System, _super);

  function Demo1System() {
    return Demo1System.__super__.constructor.apply(this, arguments);
  }

  Demo1System.prototype.THROTTLE_VALUE = 16;

  Demo1System.prototype.onUpdate = function() {
    var entity, followEntities, position, renderable, renderableEntities, _i, _j, _len, _len1;
    GraphicsManager.renderer.ctx.fillStyle = "#fff";
    GraphicsManager.renderer.ctx.fillRect(0, 0, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
    followEntities = EntityManager.getAllEntitiesWithComponentOfTypes(["PositionFollowsMouse", "Position"]);
    for (_i = 0, _len = followEntities.length; _i < _len; _i++) {
      entity = followEntities[_i];
      position = EntityManager.getComponentOfType(entity, "Position");
      position.x = InputManager.mouse.x;
      position.y = InputManager.mouse.y;
    }
    renderableEntities = EntityManager.getAllEntitiesWithComponentOfTypes(["RenderableImage", "Position"]);
    for (_j = 0, _len1 = renderableEntities.length; _j < _len1; _j++) {
      entity = renderableEntities[_j];
      renderable = EntityManager.getComponentOfType(entity, "RenderableImage");
      position = EntityManager.getComponentOfType(entity, "Position");
      GraphicsManager.renderer.ctx.drawImage(renderable.img, position.x, position.y);
    }
    return null;
  };

  return Demo1System;

})(System);

module.exports = Demo1System;


},{"../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":14,"../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":15,"../../../../vendor/iki-engine/src/Manager/InputManager.coffee":16,"../../../../vendor/iki-engine/src/System.coffee":20}],4:[function(require,module,exports){
var AssetManager, GraphicsManager, LoadMapDemoState, Map, State,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AssetManager = require("../../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

GraphicsManager = require("../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

State = require("../../../../vendor/iki-engine/src/State.coffee");

Map = require("../../../../vendor/iki-engine/src/Map.coffee");

LoadMapDemoState = (function(_super) {
  __extends(LoadMapDemoState, _super);

  function LoadMapDemoState() {
    return LoadMapDemoState.__super__.constructor.apply(this, arguments);
  }

  LoadMapDemoState.prototype.activate = function() {
    var loading, map;
    GraphicsManager.renderer.ctx.fillStyle = "#666";
    GraphicsManager.renderer.ctx.fillRect(0, 0, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
    map = new Map();
    loading = map.loadMap("/assets/map/test1.json");
    return loading.then(function() {
      GraphicsManager.renderer.ctx.fillStyle = "#696";
      GraphicsManager.renderer.ctx.fillRect(0, 0, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
      return map.drawMap(GraphicsManager.renderer.ctx);
    });
  };

  return LoadMapDemoState;

})(State);

module.exports = LoadMapDemoState;


},{"../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":13,"../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":15,"../../../../vendor/iki-engine/src/Map.coffee":18,"../../../../vendor/iki-engine/src/State.coffee":19}],5:[function(require,module,exports){
var AssetManager, GraphicsManager, InputManager, Map, MoveMapDemoState, State,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AssetManager = require("../../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

GraphicsManager = require("../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../../../vendor/iki-engine/src/Manager/InputManager.coffee");

State = require("../../../../vendor/iki-engine/src/State.coffee");

Map = require("../../../../vendor/iki-engine/src/Map.coffee");

MoveMapDemoState = (function(_super) {
  __extends(MoveMapDemoState, _super);

  function MoveMapDemoState() {
    return MoveMapDemoState.__super__.constructor.apply(this, arguments);
  }

  MoveMapDemoState.prototype.init = function() {
    this.viewPortX = 0;
    return this.viewPortY = 0;
  };

  MoveMapDemoState.prototype.activate = function() {
    var loading;
    InputManager.onKeyUp = this.onKeyUp.bind(this);
    GraphicsManager.renderer.ctx.fillStyle = "#666";
    GraphicsManager.renderer.ctx.fillRect(0, 0, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
    this.map = new Map();
    loading = this.map.loadMap("/assets/map/test2.json");
    return loading.then((function(_this) {
      return function() {
        GraphicsManager.renderer.ctx.fillStyle = "#696";
        GraphicsManager.renderer.ctx.fillRect(0, 0, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
        return _this.map.drawMap(GraphicsManager.renderer.ctx);
      };
    })(this));
  };

  MoveMapDemoState.prototype.deactivate = function() {
    return InputManager.onKeyUp = null;
  };

  MoveMapDemoState.prototype.onKeyUp = function(e) {
    var moveDistance;
    moveDistance = 16;
    if (e.keyCode === 38) {
      this.viewPortY -= moveDistance;
    }
    if (e.keyCode === 40) {
      this.viewPortY += moveDistance;
    }
    if (e.keyCode === 37) {
      this.viewPortX -= moveDistance;
    }
    if (e.keyCode === 39) {
      this.viewPortX += moveDistance;
    }
    if (this.map) {
      GraphicsManager.renderer.ctx.fillStyle = "#696";
      GraphicsManager.renderer.ctx.fillRect(0, 0, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
      return this.map.drawMapRect(GraphicsManager.renderer.ctx, this.viewPortX, this.viewPortY, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
    }
  };

  return MoveMapDemoState;

})(State);

module.exports = MoveMapDemoState;


},{"../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":13,"../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":15,"../../../../vendor/iki-engine/src/Manager/InputManager.coffee":16,"../../../../vendor/iki-engine/src/Map.coffee":18,"../../../../vendor/iki-engine/src/State.coffee":19}],6:[function(require,module,exports){
var EntityManager, InputManager, MapMoveInputSystem, System,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

System = require("../../../../vendor/iki-engine/src/System.coffee");

InputManager = require("../../../../vendor/iki-engine/src/Manager/InputManager.coffee");

EntityManager = require("../../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

MapMoveInputSystem = (function(_super) {
  __extends(MapMoveInputSystem, _super);

  function MapMoveInputSystem() {
    return MapMoveInputSystem.__super__.constructor.apply(this, arguments);
  }

  MapMoveInputSystem.prototype.onUpdate = function(dt) {
    var entities, entity, moveDistance, position, _i, _len, _results;
    moveDistance = 3 * dt;
    entities = EntityManager.getAllEntitiesWithComponentOfTypes(["Position"]);
    _results = [];
    for (_i = 0, _len = entities.length; _i < _len; _i++) {
      entity = entities[_i];
      position = EntityManager.getComponentOfType(entity, "Position");
      if (InputManager.key.up) {
        position.y -= moveDistance;
      }
      if (InputManager.key.down) {
        position.y += moveDistance;
      }
      if (InputManager.key.left) {
        position.x -= moveDistance;
      }
      if (InputManager.key.right) {
        _results.push(position.x += moveDistance);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return MapMoveInputSystem;

})(System);

module.exports = MapMoveInputSystem;


},{"../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":14,"../../../../vendor/iki-engine/src/Manager/InputManager.coffee":16,"../../../../vendor/iki-engine/src/System.coffee":20}],7:[function(require,module,exports){
var AssetManager, EntityManager, GraphicsManager, GraphicsSystem, Map, MapMoveInputSyste, MoveMapSmoothDemoState, State,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AssetManager = require("../../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

GraphicsManager = require("../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

EntityManager = require("../../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

State = require("../../../../vendor/iki-engine/src/State.coffee");

Map = require("../../../../vendor/iki-engine/src/Map.coffee");

GraphicsSystem = require("../../../../vendor/iki-engine/src/System/GraphicsSystem.coffee");

MapMoveInputSyste = require("./MapMoveInputSystem.coffee");

MoveMapSmoothDemoState = (function(_super) {
  __extends(MoveMapSmoothDemoState, _super);

  function MoveMapSmoothDemoState() {
    return MoveMapSmoothDemoState.__super__.constructor.apply(this, arguments);
  }

  MoveMapSmoothDemoState.prototype.init = function() {
    var gfx;
    this.mapLoaded = false;
    this.addSystem(new MapMoveInputSyste);
    gfx = this.addSystem(new GraphicsSystem);
    gfx.init(GraphicsManager.renderer);
    gfx.onBeforeDraw = this.drawMap.bind(this);
    this.viewport = {
      type: "Position",
      x: 0,
      y: 0
    };
    this.viewportEntity = EntityManager.createEntity("viewport", false);
    return EntityManager.addComponent(this.viewportEntity, this.viewport);
  };

  MoveMapSmoothDemoState.prototype.activate = function() {
    var loading;
    EntityManager.addEntity(this.viewportEntity);
    this.map = new Map();
    loading = this.map.loadMap("/assets/map/test2.json");
    return loading.then((function(_this) {
      return function() {
        return _this.mapLoaded = true;
      };
    })(this));
  };

  MoveMapSmoothDemoState.prototype.deactivate = function() {
    return EntityManager.removeEntity(this.viewportEntity);
  };

  MoveMapSmoothDemoState.prototype.drawMap = function(ctx) {
    if (this.mapLoaded) {
      return this.map.drawMapRect(ctx, this.viewport.x, this.viewport.y, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
    }
  };

  return MoveMapSmoothDemoState;

})(State);

module.exports = MoveMapSmoothDemoState;


},{"../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":13,"../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":14,"../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":15,"../../../../vendor/iki-engine/src/Map.coffee":18,"../../../../vendor/iki-engine/src/State.coffee":19,"../../../../vendor/iki-engine/src/System/GraphicsSystem.coffee":21,"./MapMoveInputSystem.coffee":6}],8:[function(require,module,exports){
var GraphicsManager, InputManager, MenuState, State, StateManager, Util,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../vendor/iki-engine/src/State.coffee");

Util = require("../../vendor/iki-engine/src/Util.coffee");

StateManager = require("../../vendor/iki-engine/src/Manager/StateManager.coffee");

GraphicsManager = require("../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../vendor/iki-engine/src/Manager/InputManager.coffee");

MenuState = (function(_super) {
  __extends(MenuState, _super);

  function MenuState() {
    return MenuState.__super__.constructor.apply(this, arguments);
  }

  MenuState.prototype.init = function() {
    this.menus = {};
    this.ctx = GraphicsManager.renderer.ctx;
    this.clickListener = this.onMouseClick.bind(this);
    this.currentMenu = "main";
    this.loadMenu("/assets/menu/main.json");
    return this.loadMenu("/assets/menu/demos.json");
  };

  MenuState.prototype.loadMenu = function(menuFile) {
    var map;
    map = Util.loadJSON(menuFile);
    return map.then((function(_this) {
      return function(menuData) {
        var element, _i, _len, _ref, _results;
        _this.menus[menuData.id] = {
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
            _results.push(_this.addButton(menuData.id, element.text, element.x, element.y, element.width, element.height, element.actionType, element.action));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
    })(this));
  };

  MenuState.prototype.addButton = function(menu, text, x, y, width, height, actionType, action) {
    var button, onClick;
    if (actionType === "switchMenu") {
      onClick = this.switchMenu.bind(this, action);
    }
    if (actionType === "switchState") {
      onClick = this.switchState.bind(this, action);
    }
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
    InputManager.onMouseClick = this.onMouseClick.bind(this);
    this.currentMenu = "main";
    return this.renderMenu();
  };

  MenuState.prototype.deactivate = function() {
    return InputManager.onMouseClick = null;
  };

  MenuState.prototype.switchMenu = function(newMenu) {
    this.currentMenu = newMenu;
    return this.renderMenu();
  };

  MenuState.prototype.switchState = function(state) {
    return StateManager.activate(state);
  };

  MenuState.prototype.onMouseClick = function(e) {
    var button;
    button = this.getButtonFromPoint(e.x, e.y);
    if (button) {
      return button.click();
    }
  };

  MenuState.prototype.getButtonFromPoint = function(x, y) {
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

  MenuState.prototype.isPointInRect = function(x, y, rx, ry, rw, rh) {
    return x >= rx && x <= ry + rw && y >= ry && y <= ry + rh;
  };

  MenuState.prototype.renderMenu = function() {
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

module.exports = MenuState;


},{"../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":15,"../../vendor/iki-engine/src/Manager/InputManager.coffee":16,"../../vendor/iki-engine/src/Manager/StateManager.coffee":17,"../../vendor/iki-engine/src/State.coffee":19,"../../vendor/iki-engine/src/Util.coffee":22}],9:[function(require,module,exports){
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
    AssetManager.onProgress = this.onProgress.bind(this);
    loadAsset = AssetManager.load("assets/assets.json");
    return loadAsset.then(function() {
      return StateManager.activate("menu");
    });
  };

  PreLoadState.prototype.onProgress = function(asset, group, loaded, total) {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, 640, 480);
    this.renderLoadingText("Loading " + group + "...");
    return this.renderLoadingBar(loaded / total);
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


},{"../../vendor/iki-engine/src/Manager/AssetManager.coffee":13,"../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":15,"../../vendor/iki-engine/src/Manager/StateManager.coffee":17,"../../vendor/iki-engine/src/State.coffee":19}],10:[function(require,module,exports){
var BootState, Engine, game;

Engine = require("../vendor/iki-engine/src/Engine.coffee");

BootState = require("./State/BootState.coffee");

game = new Engine;

game.start(new BootState);


},{"../vendor/iki-engine/src/Engine.coffee":11,"./State/BootState.coffee":1}],11:[function(require,module,exports){
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


},{"./Manager/StateManager.coffee":17}],12:[function(require,module,exports){
var Entity, uuid;

uuid = require("../vendor/node-uuid/uuid.js");

Entity = (function() {
  function Entity() {
    this.id = null;
    this.components = [];
  }

  return Entity;

})();

module.exports = Entity;


},{"../vendor/node-uuid/uuid.js":23}],13:[function(require,module,exports){
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
                  AssetManager.assets[asset] = data;
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


},{"../Util.coffee":22}],14:[function(require,module,exports){
var Entity, EntityManager, uuid;

uuid = require("../../vendor/node-uuid/uuid.js");

Entity = require("../Entity.coffee");

EntityManager = (function() {
  function EntityManager() {}

  EntityManager.entities = [];

  EntityManager.createEntity = function(id, addToList) {
    var entity;
    if (addToList == null) {
      addToList = true;
    }
    if (id == null) {
      id = uuid.v1();
    }
    entity = new Entity;
    entity.id = id;
    if (addToList) {
      this.addEntity(entity);
    }
    return entity;
  };

  EntityManager.addEntity = function(entity) {
    return this.entities.push(entity);
  };

  EntityManager.removeEntity = function(entity) {
    var e, i, index, _i, _len, _ref;
    index = -1;
    _ref = this.entities;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      e = _ref[i];
      if (e === entity) {
        index = i;
      }
    }
    this.entities.splice(index, 1);
    return entity;
  };

  EntityManager.deleteEntity = function(entity) {
    entity.removeAllComponents();
    return this.removeEntity(entity);
  };

  EntityManager.getEntityById = function() {};

  EntityManager.getAllEntitiesWithComponentOfType = function() {};

  EntityManager.getAllEntitiesWithComponentOfTypes = function(componentTypes) {
    var component, componentCount, entities, entity, _i, _j, _len, _len1, _ref, _ref1;
    entities = [];
    _ref = this.entities;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      entity = _ref[_i];
      componentCount = 0;
      _ref1 = entity.components;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        component = _ref1[_j];
        if (componentTypes.indexOf(component.type) > -1) {
          componentCount++;
        }
      }
      if (componentCount === componentTypes.length) {
        entities.push(entity);
      }
    }
    return entities;
  };

  EntityManager.addComponent = function(entity, component) {
    return entity.components.push(component);
  };

  EntityManager.hasComponent = function() {};

  EntityManager.getComponentOfType = function(entity, componentType) {
    var component, _i, _len, _ref;
    _ref = entity.components;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      component = _ref[_i];
      if (component.type === componentType) {
        return component;
      }
    }
    return null;
  };

  EntityManager.removeAllComponents = function(entity) {
    return entity.components.length = 0;
  };

  return EntityManager;

})();

module.exports = EntityManager;


},{"../../vendor/node-uuid/uuid.js":23,"../Entity.coffee":12}],15:[function(require,module,exports){
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


},{}],16:[function(require,module,exports){
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
    if (InputManager.onMouseClick) {
      return InputManager.onMouseClick(e);
    }
  };

  InputManager.mouseMove = function(e) {
    InputManager.mouse.x = e.x;
    InputManager.mouse.y = e.y;
    if (InputManager.onMouseMove) {
      return InputManager.onMouseMove(e);
    }
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
    if (InputManager.onKeyUp) {
      return InputManager.onKeyUp(e);
    }
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
    if (InputManager.onKeyDown) {
      return InputManager.onKeyDown(e);
    }
  };

  InputManager.onMouseClick = function(e) {};

  InputManager.onMouseMove = function(e) {};

  InputManager.onKeyUp = function(e) {};

  InputManager.onKeyDown = function(e) {};

  return InputManager;

})();

module.exports = InputManager;


},{}],17:[function(require,module,exports){
var StateManager;

StateManager = (function() {
  function StateManager() {}

  StateManager.currentState = "boot";

  StateManager.states = {};

  StateManager.add = function(name, state) {
    StateManager.states[name] = state;
    return null;
  };

  StateManager.current = function() {
    return StateManager.states[StateManager.currentState];
  };

  StateManager.activate = function(name) {
    var old;
    old = StateManager.current();
    if (old) {
      old.deactivate();
    }
    StateManager.currentState = name;
    StateManager.onActivate(name);
    StateManager.current().activate();
    return null;
  };

  StateManager.onActivate = function(name) {};

  return StateManager;

})();

module.exports = StateManager;


},{}],18:[function(require,module,exports){
var Map, Util;

Util = require("./Util.coffee");

Map = (function() {
  function Map() {
    this.width = 0;
    this.height = 0;
    this.tileWidth = 0;
    this.tileHeight = 0;
    this.layers = [];
    this.tileSets = [];
  }

  Map.prototype.loadMap = function(mapFile) {
    var map;
    map = Util.loadJSON(mapFile);
    return map.then(this.parseMap.bind(this));
  };

  Map.prototype.parseMap = function(mapData) {
    var layer, loadPromises, promise, tileSet, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    this.width = mapData.width;
    this.height = mapData.height;
    this.tileWidth = mapData.tilewidth;
    this.tileHeight = mapData.tileheight;
    _ref = mapData.layers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      layer = _ref[_i];
      this.parseLayer(layer);
    }
    _ref1 = mapData.tilesets;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      tileSet = _ref1[_j];
      this.parseTileSet(tileSet);
    }
    loadPromises = [];
    _ref2 = this.tileSets;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      tileSet = _ref2[_k];
      promise = new Promise(function(resolve, reject) {
        tileSet.img = new Image();
        tileSet.img.src = "/assets/map/" + tileSet.src;
        tileSet.img.onload = function() {
          return resolve();
        };
        return tileSet.img.onerror = function() {
          return reject();
        };
      });
      loadPromises.push(promise);
    }
    return Promise.all(loadPromises);
  };

  Map.prototype.parseLayer = function(layerData) {
    var layer, x, y, _i, _j, _ref, _ref1;
    if (layerData.type !== "tilelayer") {
      return;
    }
    layer = {
      name: layerData.name,
      data: []
    };
    for (y = _i = 0, _ref = this.height - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      layer.data[y] = [];
      for (x = _j = 0, _ref1 = this.width - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        layer.data[y][x] = layerData.data[(y * this.width) + x];
      }
    }
    return this.layers.push(layer);
  };

  Map.prototype.parseTileSet = function(tileSetData) {
    var tileSet;
    tileSet = {
      imageWidth: tileSetData.imagewidth,
      imageHeight: tileSetData.imageheight,
      tileWidth: tileSetData.tilewidth,
      tileHeight: tileSetData.tileheight,
      firstGid: tileSetData.firstgid,
      src: tileSetData.image
    };
    tileSet.lastGid = tileSet.firstGid + ((tileSet.imageWidth * tileSet.imageHeight) / (tileSet.tileWidth * tileSet.tileHeight));
    tileSet.numXTiles = Math.floor(tileSet.imageWidth / tileSet.tileWidth);
    tileSet.numYTiles = Math.floor(tileSet.imageHeight / tileSet.tileHeight);
    return this.tileSets.push(tileSet);
  };

  Map.prototype.drawTile = function(ctx, x, y, tw, th, tileNumber, tileSet, offsetX, offsetY) {
    var srcX, srcY;
    if (offsetX == null) {
      offsetX = 0;
    }
    if (offsetY == null) {
      offsetY = 0;
    }
    srcX = Math.floor(tileNumber % tileSet.numXTiles) * tileSet.tileWidth;
    srcY = Math.floor(tileNumber / tileSet.numXTiles) * tileSet.tileHeight;
    return ctx.drawImage(tileSet.img, srcX, srcY, tileSet.tileWidth, tileSet.tileHeight, (x * tileSet.tileWidth) + offsetX, (y * tileSet.tileHeight) + offsetY, tileSet.tileWidth, tileSet.tileHeight);
  };

  Map.prototype.drawTileFromNumber = function(ctx, x, y, tw, th, tileNumber, offsetX, offsetY) {
    var tileSet;
    if (offsetX == null) {
      offsetX = 0;
    }
    if (offsetY == null) {
      offsetY = 0;
    }
    tileSet = this.getTileSetOfTile(tileNumber);
    if (tileSet) {
      tileNumber = tileNumber - tileSet.firstGid;
      return this.drawTile(ctx, x, y, this.tileWidth, this.tileHeight, tileNumber, tileSet, offsetX, offsetY);
    }
  };

  Map.prototype.getTileSetOfTile = function(tileNumber) {
    var set, _i, _len, _ref;
    _ref = this.tileSets;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      set = _ref[_i];
      if ((tileNumber >= set.firstGid) && (tileNumber <= set.lastGid)) {
        return set;
      }
    }
    return false;
  };

  Map.prototype.drawMap = function(ctx) {
    var layer, x, y, _i, _ref, _results;
    _results = [];
    for (layer = _i = 0, _ref = this.layers.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; layer = 0 <= _ref ? ++_i : --_i) {
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (y = _j = 0, _ref1 = this.height - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
          _results1.push((function() {
            var _k, _ref2, _results2;
            _results2 = [];
            for (x = _k = 0, _ref2 = this.width - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; x = 0 <= _ref2 ? ++_k : --_k) {
              _results2.push(this.drawTileFromNumber(ctx, x, y, this.tileWidth, this.tileHeight, this.layers[layer].data[y][x]));
            }
            return _results2;
          }).call(this));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  Map.prototype.drawMapRect = function(ctx, x, y, w, h) {
    var bottomTile, layer, leftTile, rightTile, topTile, xOffset, yOffset, _i, _ref, _results;
    leftTile = Math.floor(x / this.tileWidth);
    rightTile = Math.ceil((x + w) / this.tileWidth);
    topTile = Math.floor(y / this.tileHeight);
    bottomTile = Math.ceil((y + h) / this.tileHeight);
    if (leftTile < 0) {
      leftTile = 0;
    }
    if (topTile < 0) {
      topTile = 0;
    }
    if (rightTile >= this.width) {
      rightTile = this.width - 1;
    }
    if (bottomTile >= this.height) {
      bottomTile = this.height - 1;
    }
    xOffset = 0 - x;
    yOffset = 0 - y;
    _results = [];
    for (layer = _i = 0, _ref = this.layers.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; layer = 0 <= _ref ? ++_i : --_i) {
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (y = _j = topTile; topTile <= bottomTile ? _j <= bottomTile : _j >= bottomTile; y = topTile <= bottomTile ? ++_j : --_j) {
          _results1.push((function() {
            var _k, _results2;
            _results2 = [];
            for (x = _k = leftTile; leftTile <= rightTile ? _k <= rightTile : _k >= rightTile; x = leftTile <= rightTile ? ++_k : --_k) {
              _results2.push(this.drawTileFromNumber(ctx, x, y, this.tileWidth, this.tileHeight, this.layers[layer].data[y][x], xOffset, yOffset));
            }
            return _results2;
          }).call(this));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  return Map;

})();

module.exports = Map;


},{"./Util.coffee":22}],19:[function(require,module,exports){
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


},{}],20:[function(require,module,exports){
var System;

System = (function() {
  System.prototype.THROTTLE_VALUE = 0;

  function System() {
    this.timeSinceUpdate = 0;
  }

  System.prototype.init = function() {};

  System.prototype.update = function(dt) {
    this.timeSinceUpdate += dt;
    if (this.timeSinceUpdate >= this.THROTTLE_VALUE) {
      this.onUpdate(this.timeSinceUpdate);
      this.timeSinceUpdate = 0;
    }
    return this.timeSinceUpdate;
  };

  System.prototype.onUpdate = function(dt) {};

  return System;

})();

module.exports = System;


},{}],21:[function(require,module,exports){
var EntityManager, GraphicsManager, GraphicsSystem, System,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

System = require("../System.coffee");

EntityManager = require("../Manager/EntityManager.coffee");

GraphicsManager = require("../Manager/GraphicsManager.coffee");

GraphicsSystem = (function(_super) {
  __extends(GraphicsSystem, _super);

  function GraphicsSystem() {
    return GraphicsSystem.__super__.constructor.apply(this, arguments);
  }

  GraphicsSystem.prototype.THROTTLE_VALUE = 16;

  GraphicsSystem.prototype.init = function(renderer) {
    this.renderer = renderer;
    this.viewportX = 0;
    this.viewportY = 0;
    this.width = this.renderer.canvas.width;
    this.height = this.renderer.canvas.height;
    return this.buffer = GraphicsManager.createRenderer(this.width, this.height);
  };

  GraphicsSystem.prototype.onBeforeDraw = function(ctx, dt) {};

  GraphicsSystem.prototype.onAfterDraw = function(ctx, dt) {};

  GraphicsSystem.prototype.onUpdate = function(dt) {
    this.onBeforeDraw(this.buffer.ctx, dt);
    this.drawRects();
    this.drawImages();
    this.drawTexts();
    this.onAfterDraw(this.buffer.ctx, dt);
    this.renderer.ctx.clearRect(0, 0, this.width, this.height);
    this.renderer.ctx.drawImage(this.buffer.canvas, 0, 0);
    return this.buffer.ctx.clearRect(0, 0, this.width, this.height);
  };

  GraphicsSystem.prototype.drawRects = function() {
    var entity, position, rect, rectEntities, _i, _len, _results;
    rectEntities = EntityManager.getAllEntitiesWithComponentOfTypes(["RenderableRect", "Position"]);
    _results = [];
    for (_i = 0, _len = rectEntities.length; _i < _len; _i++) {
      entity = rectEntities[_i];
      rect = EntityManager.getComponentOfType(entity, "RenderableRect");
      position = EntityManager.getComponentOfType(entity, "Position");
      this.buffer.ctx.fillStyle = rect.colour;
      _results.push(this.buffer.ctx.fillRect(position.x, position.y, rect.width, rect.height));
    }
    return _results;
  };

  GraphicsSystem.prototype.drawImages = function() {
    var entity, image, imageEntities, position, _i, _len, _results;
    imageEntities = EntityManager.getAllEntitiesWithComponentOfTypes(["RenderableImage", "Position"]);
    _results = [];
    for (_i = 0, _len = imageEntities.length; _i < _len; _i++) {
      entity = imageEntities[_i];
      image = EntityManager.getComponentOfType(entity, "RenderableImage");
      position = EntityManager.getComponentOfType(entity, "Position");
      _results.push(this.buffer.ctx.drawImage(image, position.x, position.y));
    }
    return _results;
  };

  GraphicsSystem.prototype.drawTexts = function() {
    var entity, position, text, textEntities, _i, _len, _results;
    textEntities = EntityManager.getAllEntitiesWithComponentOfTypes(["RenderableText", "Position"]);
    _results = [];
    for (_i = 0, _len = textEntities.length; _i < _len; _i++) {
      entity = textEntities[_i];
      text = EntityManager.getComponentOfType(entity, "RenderableText");
      position = EntityManager.getComponentOfType(entity, "Position");
      this.buffer.ctx.fillStyle = text.colour;
      this.buffer.ctx.font = text.font;
      _results.push(this.buffer.ctx.fillText(text.text, position.x, position.y));
    }
    return _results;
  };


  /*
  init: ->
      @meter = new FPSMeter({ graph: 1})
  
  onUpdate: (dt) ->
      @meter.tickStart()
  
      if @entitySystem
          entities = @entitySystem.getAllEntitiesWithComponentOfTypes ["Renderable", "Position"]
  
          _.each entities, (entity) =>
              renderable = @entitySystem.getComponentOfType entity, "Renderable"
              position = @entitySystem.getComponentOfType entity, "Position"
  
              @bufferCtx.fillStyle = renderable.colour
              @bufferCtx.fillRect position.x, position.y, 20, 20
  
      @ctx.clearRect 0, 0, @WIDTH, @HEIGHT
      @ctx.drawImage @bufferCanvas, 0, 0
      @bufferCtx.clearRect 0, 0, @WIDTH, @HEIGHT
  
      @meter.tick()
   */

  return GraphicsSystem;

})(System);

module.exports = GraphicsSystem;


},{"../Manager/EntityManager.coffee":14,"../Manager/GraphicsManager.coffee":15,"../System.coffee":20}],22:[function(require,module,exports){
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


},{}],23:[function(require,module,exports){
(function (Buffer){
//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

(function() {
  var _global = this;

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required
  var _rng;

  // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
  //
  // Moderately fast, high quality
  if (typeof(require) == 'function') {
    try {
      var _rb = require('crypto').randomBytes;
      _rng = _rb && function() {return _rb(16);};
    } catch(e) {}
  }

  if (!_rng && _global.crypto && crypto.getRandomValues) {
    // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
    //
    // Moderately fast, high quality
    var _rnds8 = new Uint8Array(16);
    _rng = function whatwgRNG() {
      crypto.getRandomValues(_rnds8);
      return _rnds8;
    };
  }

  if (!_rng) {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var  _rnds = new Array(16);
    _rng = function() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return _rnds;
    };
  }

  // Buffer class to use
  var BufferClass = typeof(Buffer) == 'function' ? Buffer : Array;

  // Maps for number <-> hex string conversion
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }

  // **`parse()` - Parse a UUID into it's component bytes**
  function parse(s, buf, offset) {
    var i = (buf && offset) || 0, ii = 0;

    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
      if (ii < 16) { // Don't overflow!
        buf[i + ii++] = _hexToByte[oct];
      }
    });

    // Zero out remaining bytes if string was short
    while (ii < 16) {
      buf[i + ii++] = 0;
    }

    return buf;
  }

  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    var i = offset || 0, bth = _byteToHex;
    return  bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // random #'s we need to init node and clockseq
  var _seedBytes = _rng();

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  var _nodeId = [
    _seedBytes[0] | 0x01,
    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
  ];

  // Per 4.2.2, randomize (14 bit) clockseq
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

  // Previous uuid creation time
  var _lastMSecs = 0, _lastNSecs = 0;

  // See https://github.com/broofa/node-uuid for API details
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];

    options = options || {};

    var clockseq = options.clockseq != null ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs != null ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    // `time_mid`
    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;

    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80;

    // `clock_seq_low`
    b[i++] = clockseq & 0xff;

    // `node`
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }

    return buf ? buf : unparse(b);
  }

  // **`v4()` - Generate random UUID**

  // See https://github.com/broofa/node-uuid for API details
  function v4(options, buf, offset) {
    // Deprecated - 'format' argument, as supported in v1.2
    var i = buf && offset || 0;

    if (typeof(options) == 'string') {
      buf = options == 'binary' ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || _rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || unparse(rnds);
  }

  // Export public API
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;

  if (typeof define === 'function' && define.amd) {
    // Publish as AMD module
    define(function() {return uuid;});
  } else if (typeof(module) != 'undefined' && module.exports) {
    // Publish as node.js module
    module.exports = uuid;
  } else {
    // Publish as global (in browsers)
    var _previousRoot = _global.uuid;

    // **`noConflict()` - (browser only) to reset global 'uuid' var**
    uuid.noConflict = function() {
      _global.uuid = _previousRoot;
      return uuid;
    };

    _global.uuid = uuid;
  }
}).call(this);

}).call(this,require("buffer").Buffer)
},{"buffer":24,"crypto":28}],24:[function(require,module,exports){
/**
 * The buffer module from node.js, for the browser.
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install buffer`
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

},{"base64-js":25,"ieee754":26}],25:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var ZERO   = '0'.charCodeAt(0)
	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	module.exports.toByteArray = b64ToByteArray
	module.exports.fromByteArray = uint8ToBase64
}())

},{}],26:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],27:[function(require,module,exports){
var Buffer = require('buffer').Buffer;
var intSize = 4;
var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
var chrsz = 8;

function toArray(buf, bigEndian) {
  if ((buf.length % intSize) !== 0) {
    var len = buf.length + (intSize - (buf.length % intSize));
    buf = Buffer.concat([buf, zeroBuffer], len);
  }

  var arr = [];
  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
  for (var i = 0; i < buf.length; i += intSize) {
    arr.push(fn.call(buf, i));
  }
  return arr;
}

function toBuffer(arr, size, bigEndian) {
  var buf = new Buffer(size);
  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
  for (var i = 0; i < arr.length; i++) {
    fn.call(buf, arr[i], i * 4, true);
  }
  return buf;
}

function hash(buf, fn, hashSize, bigEndian) {
  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
  return toBuffer(arr, hashSize, bigEndian);
}

module.exports = { hash: hash };

},{"buffer":24}],28:[function(require,module,exports){
var Buffer = require('buffer').Buffer
var sha = require('./sha')
var sha256 = require('./sha256')
var rng = require('./rng')
var md5 = require('./md5')

var algorithms = {
  sha1: sha,
  sha256: sha256,
  md5: md5
}

var blocksize = 64
var zeroBuffer = new Buffer(blocksize); zeroBuffer.fill(0)
function hmac(fn, key, data) {
  if(!Buffer.isBuffer(key)) key = new Buffer(key)
  if(!Buffer.isBuffer(data)) data = new Buffer(data)

  if(key.length > blocksize) {
    key = fn(key)
  } else if(key.length < blocksize) {
    key = Buffer.concat([key, zeroBuffer], blocksize)
  }

  var ipad = new Buffer(blocksize), opad = new Buffer(blocksize)
  for(var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  var hash = fn(Buffer.concat([ipad, data]))
  return fn(Buffer.concat([opad, hash]))
}

function hash(alg, key) {
  alg = alg || 'sha1'
  var fn = algorithms[alg]
  var bufs = []
  var length = 0
  if(!fn) error('algorithm:', alg, 'is not yet supported')
  return {
    update: function (data) {
      if(!Buffer.isBuffer(data)) data = new Buffer(data)
        
      bufs.push(data)
      length += data.length
      return this
    },
    digest: function (enc) {
      var buf = Buffer.concat(bufs)
      var r = key ? hmac(fn, key, buf) : fn(buf)
      bufs = null
      return enc ? r.toString(enc) : r
    }
  }
}

function error () {
  var m = [].slice.call(arguments).join(' ')
  throw new Error([
    m,
    'we accept pull requests',
    'http://github.com/dominictarr/crypto-browserify'
    ].join('\n'))
}

exports.createHash = function (alg) { return hash(alg) }
exports.createHmac = function (alg, key) { return hash(alg, key) }
exports.randomBytes = function(size, callback) {
  if (callback && callback.call) {
    try {
      callback.call(this, undefined, new Buffer(rng(size)))
    } catch (err) { callback(err) }
  } else {
    return new Buffer(rng(size))
  }
}

function each(a, f) {
  for(var i in a)
    f(a[i], i)
}

// the least I can do is make error messages for the rest of the node.js/crypto api.
each(['createCredentials'
, 'createCipher'
, 'createCipheriv'
, 'createDecipher'
, 'createDecipheriv'
, 'createSign'
, 'createVerify'
, 'createDiffieHellman'
, 'pbkdf2'], function (name) {
  exports[name] = function () {
    error('sorry,', name, 'is not implemented yet')
  }
})

},{"./md5":29,"./rng":30,"./sha":31,"./sha256":32,"buffer":24}],29:[function(require,module,exports){
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

var helpers = require('./helpers');

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function md5(buf) {
  return helpers.hash(buf, core_md5, 16);
};

},{"./helpers":27}],30:[function(require,module,exports){
// Original code adapted from Robert Kieffer.
// details at https://github.com/broofa/node-uuid
(function() {
  var _global = this;

  var mathRNG, whatwgRNG;

  // NOTE: Math.random() does not guarantee "cryptographic quality"
  mathRNG = function(size) {
    var bytes = new Array(size);
    var r;

    for (var i = 0, r; i < size; i++) {
      if ((i & 0x03) == 0) r = Math.random() * 0x100000000;
      bytes[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return bytes;
  }

  if (_global.crypto && crypto.getRandomValues) {
    whatwgRNG = function(size) {
      var bytes = new Uint8Array(size);
      crypto.getRandomValues(bytes);
      return bytes;
    }
  }

  module.exports = whatwgRNG || mathRNG;

}())

},{}],31:[function(require,module,exports){
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

var helpers = require('./helpers');

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function sha1(buf) {
  return helpers.hash(buf, core_sha1, 20, true);
};

},{"./helpers":27}],32:[function(require,module,exports){

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var helpers = require('./helpers');

var safe_add = function(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
};

var S = function(X, n) {
  return (X >>> n) | (X << (32 - n));
};

var R = function(X, n) {
  return (X >>> n);
};

var Ch = function(x, y, z) {
  return ((x & y) ^ ((~x) & z));
};

var Maj = function(x, y, z) {
  return ((x & y) ^ (x & z) ^ (y & z));
};

var Sigma0256 = function(x) {
  return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
};

var Sigma1256 = function(x) {
  return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
};

var Gamma0256 = function(x) {
  return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
};

var Gamma1256 = function(x) {
  return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
};

var core_sha256 = function(m, l) {
  var K = new Array(0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0xFC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x6CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2);
  var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
  /* append padding */
  m[l >> 5] |= 0x80 << (24 - l % 32);
  m[((l + 64 >> 9) << 4) + 15] = l;
  for (var i = 0; i < m.length; i += 16) {
    a = HASH[0]; b = HASH[1]; c = HASH[2]; d = HASH[3]; e = HASH[4]; f = HASH[5]; g = HASH[6]; h = HASH[7];
    for (var j = 0; j < 64; j++) {
      if (j < 16) {
        W[j] = m[j + i];
      } else {
        W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
      }
      T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
      T2 = safe_add(Sigma0256(a), Maj(a, b, c));
      h = g; g = f; f = e; e = safe_add(d, T1); d = c; c = b; b = a; a = safe_add(T1, T2);
    }
    HASH[0] = safe_add(a, HASH[0]); HASH[1] = safe_add(b, HASH[1]); HASH[2] = safe_add(c, HASH[2]); HASH[3] = safe_add(d, HASH[3]);
    HASH[4] = safe_add(e, HASH[4]); HASH[5] = safe_add(f, HASH[5]); HASH[6] = safe_add(g, HASH[6]); HASH[7] = safe_add(h, HASH[7]);
  }
  return HASH;
};

module.exports = function sha256(buf) {
  return helpers.hash(buf, core_sha256, 32, true);
};

},{"./helpers":27}]},{},[10])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxTdGF0ZVxcQm9vdFN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxTdGF0ZVxcRGVtb3NcXERlbW8xXFxEZW1vMVN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxTdGF0ZVxcRGVtb3NcXERlbW8xXFxEZW1vMVN5c3RlbS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcU3RhdGVcXERlbW9zXFxMb2FkTWFwRGVtb1xcTG9hZE1hcERlbW9TdGF0ZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcU3RhdGVcXERlbW9zXFxNb3ZlTWFwRGVtb1xcTW92ZU1hcERlbW9TdGF0ZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcU3RhdGVcXERlbW9zXFxNb3ZlTWFwU21vb3RoRGVtb1xcTWFwTW92ZUlucHV0U3lzdGVtLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxTdGF0ZVxcRGVtb3NcXE1vdmVNYXBTbW9vdGhEZW1vXFxNb3ZlTWFwU21vb3RoRGVtb1N0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxTdGF0ZVxcTWVudVN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxTdGF0ZVxcUHJlTG9hZFN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxnYW1lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXEVuZ2luZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxFbnRpdHkuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcQXNzZXRNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXEVudGl0eU1hbmFnZXIuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXElucHV0TWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxNYW5hZ2VyXFxTdGF0ZU1hbmFnZXIuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFwLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXFN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXFN5c3RlbS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxTeXN0ZW1cXEdyYXBoaWNzU3lzdGVtLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXFV0aWwuY29mZmVlIiwiQzovd3d3L21lcmNlbmFyeS1zdHJpa2UtZm9yY2UvZG9jcm9vdC9hc3NldHMvdmVuZG9yL2lraS1lbmdpbmUvdmVuZG9yL25vZGUtdXVpZC91dWlkLmpzIiwiQzovd3d3L21lcmNlbmFyeS1zdHJpa2UtZm9yY2Uvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWIvYjY0LmpzIiwiQzovd3d3L21lcmNlbmFyeS1zdHJpa2UtZm9yY2Uvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9oZWxwZXJzLmpzIiwiQzovd3d3L21lcmNlbmFyeS1zdHJpa2UtZm9yY2Uvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L2luZGV4LmpzIiwiQzovd3d3L21lcmNlbmFyeS1zdHJpa2UtZm9yY2Uvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L21kNS5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9ybmcuanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvc2hhLmpzIiwiQzovd3d3L21lcmNlbmFyeS1zdHJpa2UtZm9yY2Uvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3NoYTI1Ni5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUEsOEpBQUE7RUFBQTtpU0FBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLDBDQUFSLENBQVIsQ0FBQTs7QUFBQSxZQUNBLEdBQWUsT0FBQSxDQUFRLHlEQUFSLENBRGYsQ0FBQTs7QUFBQSxlQUVBLEdBQWtCLE9BQUEsQ0FBUSw0REFBUixDQUZsQixDQUFBOztBQUFBLFlBR0EsR0FBZSxPQUFBLENBQVEseURBQVIsQ0FIZixDQUFBOztBQUFBLFlBS0EsR0FBZSxPQUFBLENBQVEsdUJBQVIsQ0FMZixDQUFBOztBQUFBLFNBTUEsR0FBWSxPQUFBLENBQVEsb0JBQVIsQ0FOWixDQUFBOztBQUFBLFVB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LEdBQU8sSUFBQSxHQUFPLEdBQWQsQ0FKQztLQVBMO0FBYUEsV0FBTyxJQUFQLENBZFE7RUFBQSxDQWhCWixDQUFBOztjQUFBOztJQURKLENBQUE7O0FBQUEsTUFpQ00sQ0FBQyxPQUFQLEdBQWlCLElBakNqQixDQUFBOzs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2bENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiU3RhdGUgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1N0YXRlLmNvZmZlZVwiXG5TdGF0ZU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvU3RhdGVNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5JbnB1dE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvSW5wdXRNYW5hZ2VyLmNvZmZlZVwiXG5cblByZUxvYWRTdGF0ZSA9IHJlcXVpcmUgXCIuL1ByZUxvYWRTdGF0ZS5jb2ZmZWVcIlxuTWVudVN0YXRlID0gcmVxdWlyZSBcIi4vTWVudVN0YXRlLmNvZmZlZVwiXG5cbiMgRGVtb3NcbkRlbW8xU3RhdGUgPSByZXF1aXJlIFwiLi9EZW1vcy9EZW1vMS9EZW1vMVN0YXRlLmNvZmZlZVwiXG5Mb2FkTWFwRGVtb1N0YXRlID0gcmVxdWlyZSBcIi4vRGVtb3MvTG9hZE1hcERlbW8vTG9hZE1hcERlbW9TdGF0ZS5jb2ZmZWVcIlxuTW92ZU1hcERlbW9TdGF0ZSA9IHJlcXVpcmUgXCIuL0RlbW9zL01vdmVNYXBEZW1vL01vdmVNYXBEZW1vU3RhdGUuY29mZmVlXCJcbk1vdmVNYXBTbW9vdGhEZW1vU3RhdGUgPSByZXF1aXJlIFwiLi9EZW1vcy9Nb3ZlTWFwU21vb3RoRGVtby9Nb3ZlTWFwU21vb3RoRGVtb1N0YXRlLmNvZmZlZVwiXG5cblxuY2xhc3MgQm9vdFN0YXRlIGV4dGVuZHMgU3RhdGVcbiAgICBpbml0OiAtPlxuICAgICAgICAjIFVzZSBHcmFwaGljc01hbmFnZXIgdG8gY3JlYXRlIG1haW4gY2FudmFzXG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlciA9IEdyYXBoaWNzTWFuYWdlci5jcmVhdGVSZW5kZXJlciA2NDAsIDQ4MCwgZG9jdW1lbnQuYm9keVxuICAgICAgICBJbnB1dE1hbmFnZXIuaW5pdCgpXG5cbiAgICAgICAgcHJlbG9hZFN0YXRlID0gbmV3IFByZUxvYWRTdGF0ZSgpXG4gICAgICAgIFN0YXRlTWFuYWdlci5hZGQgXCJwcmVsb2FkXCIsIHByZWxvYWRTdGF0ZVxuICAgICAgICBwcmVsb2FkU3RhdGUuaW5pdCgpXG5cbiAgICAgICAgbWVudVN0YXRlID0gbmV3IE1lbnVTdGF0ZSgpXG4gICAgICAgIFN0YXRlTWFuYWdlci5hZGQgXCJtZW51XCIsIG1lbnVTdGF0ZVxuICAgICAgICBtZW51U3RhdGUuaW5pdCgpXG5cbiAgICAgICAgZGVtbzFTdGF0ZSA9IG5ldyBEZW1vMVN0YXRlKClcbiAgICAgICAgU3RhdGVNYW5hZ2VyLmFkZCBcImRlbW8xXCIsIGRlbW8xU3RhdGVcbiAgICAgICAgZGVtbzFTdGF0ZS5pbml0KClcblxuICAgICAgICBsb2FkTWFwRGVtb1N0YXRlID0gbmV3IExvYWRNYXBEZW1vU3RhdGUoKVxuICAgICAgICBTdGF0ZU1hbmFnZXIuYWRkIFwiTG9hZE1hcERlbW9cIiwgbG9hZE1hcERlbW9TdGF0ZVxuICAgICAgICBsb2FkTWFwRGVtb1N0YXRlLmluaXQoKVxuXG4gICAgICAgIG1vdmVNYXBEZW1vU3RhdGUgPSBuZXcgTW92ZU1hcERlbW9TdGF0ZSgpXG4gICAgICAgIFN0YXRlTWFuYWdlci5hZGQgXCJNb3ZlTWFwRGVtb1wiLCBtb3ZlTWFwRGVtb1N0YXRlXG4gICAgICAgIG1vdmVNYXBEZW1vU3RhdGUuaW5pdCgpXG5cbiAgICAgICAgbW92ZU1hcFNtb290aERlbW9TdGF0ZSA9IG5ldyBNb3ZlTWFwU21vb3RoRGVtb1N0YXRlKClcbiAgICAgICAgU3RhdGVNYW5hZ2VyLmFkZCBcIk1vdmVNYXBTbW9vdGhEZW1vXCIsIG1vdmVNYXBTbW9vdGhEZW1vU3RhdGVcbiAgICAgICAgbW92ZU1hcFNtb290aERlbW9TdGF0ZS5pbml0KClcblxuICAgICAgICBAZGVidWdNZW51KClcblxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIFN0YXRlTWFuYWdlci5hY3RpdmF0ZSBcInByZWxvYWRcIlxuXG4gICAgZGVidWdNZW51OiAtPlxuICAgICAgICBndWkgPSBuZXcgZGF0LkdVSSgpXG5cbiAgICAgICAgU3RhdGVNYW5hZ2VyLmRlYnVnU3RhdGUgPSBTdGF0ZU1hbmFnZXIuY3VycmVudFN0YXRlXG5cbiAgICAgICAgc3RhdGVzRm9sZGVyID0gZ3VpLmFkZEZvbGRlciBcIlN0YXRlc1wiXG4gICAgICAgIHN0YXRlc0ZvbGRlci5vcGVuKClcbiAgICAgICAgc3RhdGVDb250cm9sID0gc3RhdGVzRm9sZGVyLmFkZCBTdGF0ZU1hbmFnZXIsIFwiZGVidWdTdGF0ZVwiLCBbXG4gICAgICAgICAgICBcIm1lbnVcIiwgXCJkZW1vMVwiLCBcIkxvYWRNYXBEZW1vXCIsIFwiTW92ZU1hcERlbW9cIiwgXCJNb3ZlTWFwU21vb3RoRGVtb1wiXG4gICAgICAgIF1cbiAgICAgICAgc3RhdGVDb250cm9sLm9uRmluaXNoQ2hhbmdlIChzdGF0ZSkgLT4gU3RhdGVNYW5hZ2VyLmFjdGl2YXRlIHN0YXRlXG4gICAgICAgIFN0YXRlTWFuYWdlci5vbkFjdGl2YXRlID0gLT5cbiAgICAgICAgICAgIFN0YXRlTWFuYWdlci5kZWJ1Z1N0YXRlID0gU3RhdGVNYW5hZ2VyLmN1cnJlbnRTdGF0ZVxuICAgICAgICAgICAgc3RhdGVDb250cm9sLnVwZGF0ZURpc3BsYXkoKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQm9vdFN0YXRlIiwiRW50aXR5TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9FbnRpdHlNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5cblN0YXRlID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TdGF0ZS5jb2ZmZWVcIlxuRGVtbzFTeXN0ZW0gPSByZXF1aXJlIFwiLi9EZW1vMVN5c3RlbS5jb2ZmZWVcIlxuXG5jbGFzcyBEZW1vMVN0YXRlIGV4dGVuZHMgU3RhdGVcbiAgICBpbml0OiAtPiBAYWRkU3lzdGVtIG5ldyBEZW1vMVN5c3RlbSgpXG5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5zdHlsZS5jdXJzb3IgPSBcIm5vbmVcIlxuXG4gICAgICAgIEBjdXJzb3IgPSBFbnRpdHlNYW5hZ2VyLmNyZWF0ZUVudGl0eSBcImN1cnNvclwiXG4gICAgICAgIGN1cnNvckltYWdlID0gbmV3IEltYWdlKClcbiAgICAgICAgY3Vyc29ySW1hZ2Uuc3JjID0gXCIvYXNzZXRzL2ltZy9jdXJzb3Ivc2xpY2tfYXJyb3ctZGVsdGEucG5nXCI7XG4gICAgICAgIEVudGl0eU1hbmFnZXIuYWRkQ29tcG9uZW50IEBjdXJzb3IsIHtcbiAgICAgICAgICAgIHR5cGU6IFwiUmVuZGVyYWJsZUltYWdlXCJcbiAgICAgICAgICAgIGltZzogY3Vyc29ySW1hZ2VcbiAgICAgICAgfVxuICAgICAgICBFbnRpdHlNYW5hZ2VyLmFkZENvbXBvbmVudCBAY3Vyc29yLCB7XG4gICAgICAgICAgICB0eXBlOiBcIlBvc2l0aW9uXCJcbiAgICAgICAgICAgIHg6IDBcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfVxuICAgICAgICBFbnRpdHlNYW5hZ2VyLmFkZENvbXBvbmVudCBAY3Vyc29yLCB7XG4gICAgICAgICAgICB0eXBlOiBcIlBvc2l0aW9uRm9sbG93c01vdXNlXCJcbiAgICAgICAgfVxuXG4gICAgZGVhY3RpdmF0ZTogLT5cbiAgICAgICAgRW50aXR5TWFuYWdlci5yZW1vdmVFbnRpdHkgQGN1cnNvclxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiXG5cblxubW9kdWxlLmV4cG9ydHMgPSBEZW1vMVN0YXRlIiwiU3lzdGVtID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TeXN0ZW0uY29mZmVlXCJcbkVudGl0eU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvRW50aXR5TWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuSW5wdXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0lucHV0TWFuYWdlci5jb2ZmZWVcIlxuXG5jbGFzcyBEZW1vMVN5c3RlbSBleHRlbmRzIFN5c3RlbVxuICAgIFRIUk9UVExFX1ZBTFVFOiAxNiAgIyA2Mi41IEZQU1xuXG4gICAgb25VcGRhdGU6IC0+XG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFN0eWxlID0gXCIjZmZmXCJcbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsUmVjdCAwLCAwLFxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aCwgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcblxuICAgICAgICAjIEZvbGxvdyBtb3VzZSAtIG5vcm1hbGx5IHdvdWxkIGJlIGluIGEgZGlmZmVyZW50IHN5c3RlbSBmcm9tIHRoZSByZW5kZXJhYmxlc1xuICAgICAgICBmb2xsb3dFbnRpdGllcyA9IEVudGl0eU1hbmFnZXIuZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJQb3NpdGlvbkZvbGxvd3NNb3VzZVwiLCBcIlBvc2l0aW9uXCJdXG4gICAgICAgIGZvciBlbnRpdHkgaW4gZm9sbG93RW50aXRpZXNcbiAgICAgICAgICAgIHBvc2l0aW9uID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlBvc2l0aW9uXCJcbiAgICAgICAgICAgIHBvc2l0aW9uLnggPSBJbnB1dE1hbmFnZXIubW91c2UueFxuICAgICAgICAgICAgcG9zaXRpb24ueSA9IElucHV0TWFuYWdlci5tb3VzZS55XG5cbiAgICAgICAgIyBEcmF3IHJlbmRlcmFibGVzXG4gICAgICAgIHJlbmRlcmFibGVFbnRpdGllcyA9IEVudGl0eU1hbmFnZXIuZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJSZW5kZXJhYmxlSW1hZ2VcIiwgXCJQb3NpdGlvblwiXVxuICAgICAgICBmb3IgZW50aXR5IGluIHJlbmRlcmFibGVFbnRpdGllc1xuICAgICAgICAgICAgcmVuZGVyYWJsZSA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJSZW5kZXJhYmxlSW1hZ2VcIlxuICAgICAgICAgICAgcG9zaXRpb24gPSBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiUG9zaXRpb25cIlxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5kcmF3SW1hZ2UgcmVuZGVyYWJsZS5pbWcsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnlcblxuICAgICAgICByZXR1cm4gbnVsbFxuXG5cbm1vZHVsZS5leHBvcnRzID0gRGVtbzFTeXN0ZW0iLCJBc3NldE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvQXNzZXRNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5cblN0YXRlID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TdGF0ZS5jb2ZmZWVcIlxuTWFwID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYXAuY29mZmVlXCJcblxuY2xhc3MgTG9hZE1hcERlbW9TdGF0ZSBleHRlbmRzIFN0YXRlXG4gICAgYWN0aXZhdGU6IC0+XG5cbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiM2NjZcIlxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmZpbGxSZWN0IDAsIDAsXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG4gICAgICAgIG1hcCA9IG5ldyBNYXAoKVxuICAgICAgICBsb2FkaW5nID0gbWFwLmxvYWRNYXAgXCIvYXNzZXRzL21hcC90ZXN0MS5qc29uXCJcbiAgICAgICAgbG9hZGluZy50aGVuICgpIC0+XG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiIzY5NlwiXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmZpbGxSZWN0IDAsIDAsXG4gICAgICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aCwgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcblxuICAgICAgICAgICAgbWFwLmRyYXdNYXAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eFxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkTWFwRGVtb1N0YXRlIiwiQXNzZXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0Fzc2V0TWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuSW5wdXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0lucHV0TWFuYWdlci5jb2ZmZWVcIlxuXG5TdGF0ZSA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU3RhdGUuY29mZmVlXCJcbk1hcCA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFwLmNvZmZlZVwiXG5cbmNsYXNzIE1vdmVNYXBEZW1vU3RhdGUgZXh0ZW5kcyBTdGF0ZVxuICAgIGluaXQ6IC0+XG4gICAgICAgIEB2aWV3UG9ydFggPSAwXG4gICAgICAgIEB2aWV3UG9ydFkgPSAwXG5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICAgICAgSW5wdXRNYW5hZ2VyLm9uS2V5VXAgPSBAb25LZXlVcC5iaW5kIEBcblxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiIzY2NlwiXG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFJlY3QgMCwgMCxcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGgsIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0XG5cbiAgICAgICAgQG1hcCA9IG5ldyBNYXAoKVxuICAgICAgICBsb2FkaW5nID0gQG1hcC5sb2FkTWFwIFwiL2Fzc2V0cy9tYXAvdGVzdDIuanNvblwiXG4gICAgICAgIGxvYWRpbmcudGhlbiAoKSA9PlxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiM2OTZcIlxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsUmVjdCAwLCAwLFxuICAgICAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGgsIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0XG5cbiAgICAgICAgICAgIEBtYXAuZHJhd01hcCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4XG5cbiAgICBkZWFjdGl2YXRlOiAtPiBJbnB1dE1hbmFnZXIub25LZXlVcCA9IG51bGxcblxuICAgIG9uS2V5VXA6IChlKSAtPlxuICAgICAgICBtb3ZlRGlzdGFuY2UgPSAxNlxuXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzOCB0aGVuIEB2aWV3UG9ydFkgLT0gbW92ZURpc3RhbmNlICMgdXBcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDQwIHRoZW4gQHZpZXdQb3J0WSArPSBtb3ZlRGlzdGFuY2UgIyBkb3duXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzNyB0aGVuIEB2aWV3UG9ydFggLT0gbW92ZURpc3RhbmNlICMgbGVmdFxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzkgdGhlbiBAdmlld1BvcnRYICs9IG1vdmVEaXN0YW5jZSAjIHJpZ2h0XG5cbiAgICAgICAgaWYgQG1hcFxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiM2OTZcIlxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsUmVjdCAwLCAwLFxuICAgICAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGgsIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0XG5cbiAgICAgICAgICAgIEBtYXAuZHJhd01hcFJlY3QgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eCxcbiAgICAgICAgICAgICAgICBAdmlld1BvcnRYLCBAdmlld1BvcnRZLFxuICAgICAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGgsIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0XG5cbm1vZHVsZS5leHBvcnRzID0gTW92ZU1hcERlbW9TdGF0ZSIsIlN5c3RlbSA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU3lzdGVtLmNvZmZlZVwiXG5JbnB1dE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvSW5wdXRNYW5hZ2VyLmNvZmZlZVwiXG5FbnRpdHlNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0VudGl0eU1hbmFnZXIuY29mZmVlXCJcblxuY2xhc3MgTWFwTW92ZUlucHV0U3lzdGVtIGV4dGVuZHMgU3lzdGVtXG5cbiAgICBvblVwZGF0ZTogKGR0KSAtPlxuICAgICAgICBtb3ZlRGlzdGFuY2UgPSAzICogZHRcblxuICAgICAgICBlbnRpdGllcyA9IEVudGl0eU1hbmFnZXIuZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJQb3NpdGlvblwiXVxuXG4gICAgICAgIGZvciBlbnRpdHkgaW4gZW50aXRpZXNcbiAgICAgICAgICAgIHBvc2l0aW9uID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlBvc2l0aW9uXCJcblxuICAgICAgICAgICAgaWYgSW5wdXRNYW5hZ2VyLmtleS51cCB0aGVuIHBvc2l0aW9uLnkgLT0gbW92ZURpc3RhbmNlXG4gICAgICAgICAgICBpZiBJbnB1dE1hbmFnZXIua2V5LmRvd24gdGhlbiBwb3NpdGlvbi55ICs9IG1vdmVEaXN0YW5jZVxuICAgICAgICAgICAgaWYgSW5wdXRNYW5hZ2VyLmtleS5sZWZ0IHRoZW4gcG9zaXRpb24ueCAtPSBtb3ZlRGlzdGFuY2VcbiAgICAgICAgICAgIGlmIElucHV0TWFuYWdlci5rZXkucmlnaHQgdGhlbiBwb3NpdGlvbi54ICs9IG1vdmVEaXN0YW5jZVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXBNb3ZlSW5wdXRTeXN0ZW0iLCJBc3NldE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvQXNzZXRNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5FbnRpdHlNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0VudGl0eU1hbmFnZXIuY29mZmVlXCJcblxuU3RhdGUgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1N0YXRlLmNvZmZlZVwiXG5NYXAgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hcC5jb2ZmZWVcIlxuR3JhcGhpY3NTeXN0ZW0gPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1N5c3RlbS9HcmFwaGljc1N5c3RlbS5jb2ZmZWVcIlxuTWFwTW92ZUlucHV0U3lzdGUgPSByZXF1aXJlIFwiLi9NYXBNb3ZlSW5wdXRTeXN0ZW0uY29mZmVlXCJcblxuY2xhc3MgTW92ZU1hcFNtb290aERlbW9TdGF0ZSBleHRlbmRzIFN0YXRlXG4gICAgaW5pdDogLT5cbiAgICAgICAgQG1hcExvYWRlZCA9IGZhbHNlXG5cbiAgICAgICAgQGFkZFN5c3RlbSBuZXcgTWFwTW92ZUlucHV0U3lzdGVcblxuICAgICAgICAjIEFkZCBncmFwaGljcyBzeXN0ZW0gdG8gaGFuZGxlIHJlbmRlcmluZ1xuICAgICAgICBnZnggPSBAYWRkU3lzdGVtIG5ldyBHcmFwaGljc1N5c3RlbVxuICAgICAgICBnZnguaW5pdCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXJcbiAgICAgICAgZ2Z4Lm9uQmVmb3JlRHJhdyA9IEBkcmF3TWFwLmJpbmQgQFxuXG4gICAgICAgIEB2aWV3cG9ydCA9IHtcbiAgICAgICAgICAgIHR5cGU6IFwiUG9zaXRpb25cIlxuICAgICAgICAgICAgeDogMFxuICAgICAgICAgICAgeTogMFxuICAgICAgICB9XG5cbiAgICAgICAgQHZpZXdwb3J0RW50aXR5ID0gRW50aXR5TWFuYWdlci5jcmVhdGVFbnRpdHkgXCJ2aWV3cG9ydFwiLCBmYWxzZVxuICAgICAgICBFbnRpdHlNYW5hZ2VyLmFkZENvbXBvbmVudCBAdmlld3BvcnRFbnRpdHksIEB2aWV3cG9ydFxuXG5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICAgICAgRW50aXR5TWFuYWdlci5hZGRFbnRpdHkgQHZpZXdwb3J0RW50aXR5XG5cbiAgICAgICAgIyBMb2FkIHRoZSBtYXBcbiAgICAgICAgQG1hcCA9IG5ldyBNYXAoKVxuICAgICAgICBsb2FkaW5nID0gQG1hcC5sb2FkTWFwIFwiL2Fzc2V0cy9tYXAvdGVzdDIuanNvblwiXG4gICAgICAgIGxvYWRpbmcudGhlbiAoKSA9PiBAbWFwTG9hZGVkID0gdHJ1ZVxuXG5cbiAgICBkZWFjdGl2YXRlOiAtPiBFbnRpdHlNYW5hZ2VyLnJlbW92ZUVudGl0eSBAdmlld3BvcnRFbnRpdHlcblxuXG4gICAgZHJhd01hcDogKGN0eCkgLT5cbiAgICAgICAgaWYgQG1hcExvYWRlZFxuICAgICAgICAgICAgQG1hcC5kcmF3TWFwUmVjdCBjdHgsXG4gICAgICAgICAgICAgICAgQHZpZXdwb3J0LngsIEB2aWV3cG9ydC55LFxuICAgICAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGgsIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNb3ZlTWFwU21vb3RoRGVtb1N0YXRlIiwiU3RhdGUgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1N0YXRlLmNvZmZlZVwiXG5VdGlsID0gcmVxdWlyZSBcIi4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9VdGlsLmNvZmZlZVwiXG5TdGF0ZU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvU3RhdGVNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5JbnB1dE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvSW5wdXRNYW5hZ2VyLmNvZmZlZVwiXG5cbmNsYXNzIE1lbnVTdGF0ZSBleHRlbmRzIFN0YXRlXG4gICAgaW5pdDogLT5cbiAgICAgICAgQG1lbnVzID0ge31cbiAgICAgICAgQGN0eCA9IEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHhcbiAgICAgICAgQGNsaWNrTGlzdGVuZXIgPSBAb25Nb3VzZUNsaWNrLmJpbmQgQFxuXG4gICAgICAgICMgU2V0IHRoZSBjdXJyZW50IG1lbnVcbiAgICAgICAgQGN1cnJlbnRNZW51ID0gXCJtYWluXCJcblxuICAgICAgICAjIExvYWQgdGhlIG1lbnVzXG4gICAgICAgIEBsb2FkTWVudSBcIi9hc3NldHMvbWVudS9tYWluLmpzb25cIlxuICAgICAgICBAbG9hZE1lbnUgXCIvYXNzZXRzL21lbnUvZGVtb3MuanNvblwiXG5cblxuICAgIGxvYWRNZW51OiAobWVudUZpbGUpIC0+XG4gICAgICAgIG1hcCA9IFV0aWwubG9hZEpTT04gbWVudUZpbGVcbiAgICAgICAgbWFwLnRoZW4gKG1lbnVEYXRhKSA9PlxuICAgICAgICAgICAgQG1lbnVzW21lbnVEYXRhLmlkXSA9IHtcbiAgICAgICAgICAgICAgICBpZDogbWVudURhdGEuaWRcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBtZW51RGF0YS5iYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgZWxlbWVudHM6IFtdXG4gICAgICAgICAgICAgICAgYnV0dG9uczogW11cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIGVsZW1lbnQgaW4gbWVudURhdGEuZWxlbWVudHNcblxuICAgICAgICAgICAgICAgIGlmIGVsZW1lbnQudHlwZSA9PSBcImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIEBhZGRCdXR0b24gbWVudURhdGEuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LngsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFjdGlvblR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFjdGlvblxuXG5cbiAgICBhZGRCdXR0b246IChtZW51LCB0ZXh0LCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBhY3Rpb25UeXBlLCBhY3Rpb24pIC0+XG4gICAgICAgIGlmIGFjdGlvblR5cGUgPT0gXCJzd2l0Y2hNZW51XCIgdGhlbiBvbkNsaWNrID0gQHN3aXRjaE1lbnUuYmluZCBALCBhY3Rpb25cbiAgICAgICAgaWYgYWN0aW9uVHlwZSA9PSBcInN3aXRjaFN0YXRlXCIgdGhlbiBvbkNsaWNrID0gQHN3aXRjaFN0YXRlLmJpbmQgQCwgYWN0aW9uXG5cbiAgICAgICAgYnV0dG9uID1cbiAgICAgICAgICAgIHRleHQ6IHRleHRcbiAgICAgICAgICAgIHg6IHhcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgICAgIGNsaWNrOiBvbkNsaWNrXG5cbiAgICAgICAgaWYgbm90IEBtZW51c1ttZW51XSB0aGVuIEBtZW51c1ttZW51XSA9IHt9XG4gICAgICAgIGlmIG5vdCBAbWVudXNbbWVudV0uYnV0dG9ucyB0aGVuIEBtZW51c1ttZW51XS5idXR0b25zID0gW11cbiAgICAgICAgQG1lbnVzW21lbnVdLmJ1dHRvbnMucHVzaCBidXR0b25cblxuICAgIGFjdGl2YXRlOiAtPlxuICAgICAgICBJbnB1dE1hbmFnZXIub25Nb3VzZUNsaWNrID0gQG9uTW91c2VDbGljay5iaW5kIEBcbiAgICAgICAgQGN1cnJlbnRNZW51ID0gXCJtYWluXCJcbiAgICAgICAgQHJlbmRlck1lbnUoKVxuXG4gICAgZGVhY3RpdmF0ZTogLT4gSW5wdXRNYW5hZ2VyLm9uTW91c2VDbGljayA9IG51bGxcblxuICAgIHN3aXRjaE1lbnU6IChuZXdNZW51KSAtPlxuICAgICAgICBAY3VycmVudE1lbnUgPSBuZXdNZW51XG4gICAgICAgIEByZW5kZXJNZW51KClcblxuICAgIHN3aXRjaFN0YXRlOiAoc3RhdGUpIC0+IFN0YXRlTWFuYWdlci5hY3RpdmF0ZSBzdGF0ZVxuXG4gICAgb25Nb3VzZUNsaWNrOiAoZSkgLT5cbiAgICAgICAgYnV0dG9uID0gQGdldEJ1dHRvbkZyb21Qb2ludCBlLngsIGUueVxuICAgICAgICBpZiBidXR0b24gdGhlbiBidXR0b24uY2xpY2soKVxuXG4gICAgZ2V0QnV0dG9uRnJvbVBvaW50OiAoeCwgeSkgLT5cbiAgICAgICAgbWVudSA9IEBtZW51c1tAY3VycmVudE1lbnVdXG4gICAgICAgIGZvciBidXR0b24gaW4gbWVudS5idXR0b25zXG4gICAgICAgICAgICBpZiBAaXNQb2ludEluUmVjdCB4LCB5LCBidXR0b24ueCwgYnV0dG9uLnksIGJ1dHRvbi53aWR0aCwgYnV0dG9uLmhlaWdodFxuICAgICAgICAgICAgICAgIHJldHVybiBidXR0b25cblxuICAgIGlzUG9pbnRJblJlY3Q6ICh4LCB5LCByeCwgcnksIHJ3LCByaCkgLT4gcmV0dXJuIHggPj0gcnggJiYgeCA8PSByeSArIHJ3ICYmIHkgPj0gcnkgJiYgeSA8PSByeSArIHJoXG5cbiAgICByZW5kZXJNZW51OiAtPlxuICAgICAgICBAcmVuZGVyQmFja2dyb3VuZCgpXG4gICAgICAgIG1lbnUgPSBAbWVudXNbQGN1cnJlbnRNZW51XVxuICAgICAgICBmb3IgYnV0dG9uIGluIG1lbnUuYnV0dG9uc1xuICAgICAgICAgICAgQHJlbmRlckJ1dHRvbiBidXR0b25cblxuICAgIHJlbmRlckJhY2tncm91bmQ6IC0+XG4gICAgICAgIEBjdHguZmlsbFN0eWxlID0gXCIjMDAzXCJcbiAgICAgICAgQGN0eC5maWxsUmVjdCAwLCAwLCA2NDAsIDQ4MFxuXG4gICAgcmVuZGVyQnV0dG9uOiAoYnV0dG9uLCBob3ZlciA9IGZhbHNlKSAtPlxuICAgICAgICBAY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZlwiXG4gICAgICAgIEBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIlxuXG4gICAgICAgIGlmIGhvdmVyXG4gICAgICAgICAgICBAY3R4LnNoYWRvd0JsdXIgPSAyMFxuICAgICAgICAgICAgQGN0eC5zaGFkb3dDb2xvciA9IFwieWVsbG93XCJcblxuICAgICAgICBAY3R4LmZpbGxSZWN0IGJ1dHRvbi54LCBidXR0b24ueSwgYnV0dG9uLndpZHRoLCBidXR0b24uaGVpZ2h0XG5cbiAgICAgICAgQGN0eC5zaGFkb3dCbHVyID0gMCBpZiBob3ZlclxuXG4gICAgICAgIEBjdHguc3Ryb2tlUmVjdCBidXR0b24ueCwgYnV0dG9uLnksIGJ1dHRvbi53aWR0aCwgYnV0dG9uLmhlaWdodFxuXG4gICAgICAgIEBjdHguZmlsbFN0eWxlID0gXCIjMDAwXCJcbiAgICAgICAgQGN0eC5mb250ID0gXCIxMnB4IEFyaWFsLCBzYW5zLXNlcmlmXCJcbiAgICAgICAgQGN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiXG4gICAgICAgIHRleHRTaXplID0gQGN0eC5tZWFzdXJlVGV4dCBidXR0b24udGV4dFxuICAgICAgICBAY3R4LmZpbGxUZXh0IGJ1dHRvbi50ZXh0LCBidXR0b24ueCArIDEwMCAtICh0ZXh0U2l6ZS53aWR0aCAvIDIpLCBidXR0b24ueSArIDdcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnVTdGF0ZSIsIlN0YXRlID0gcmVxdWlyZSBcIi4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TdGF0ZS5jb2ZmZWVcIlxuU3RhdGVNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL1N0YXRlTWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuQXNzZXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0Fzc2V0TWFuYWdlci5jb2ZmZWVcIlxuXG5jbGFzcyBQcmVMb2FkU3RhdGUgZXh0ZW5kcyBTdGF0ZVxuICAgIGluaXQ6IC0+XG4gICAgICAgIEBiYXIgPVxuICAgICAgICAgICAgeDogKDY0MCAvIDIpIC0gMTAwXG4gICAgICAgICAgICB5OiAoNDgwIC8gMikgLSAyMFxuICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgaGVpZ2h0OiAyMFxuXG4gICAgICAgIEBiYXIubWlkZGxlID0gQGJhci54ICsgKEBiYXIud2lkdGggLyAyKVxuXG4gICAgICAgIEBjdHggPSBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4XG5cblxuICAgIGFjdGl2YXRlOiAtPlxuICAgICAgICBAY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiXG4gICAgICAgIEBjdHguZmlsbFJlY3QgMCwgMCwgNjQwLCA0ODBcblxuICAgICAgICBAcmVuZGVyTG9hZGluZ0JhciAwXG4gICAgICAgIEByZW5kZXJMb2FkaW5nVGV4dCBcIkxvYWRpbmcuLi5cIlxuXG4gICAgICAgIEFzc2V0TWFuYWdlci5vblByb2dyZXNzID0gQG9uUHJvZ3Jlc3MuYmluZCBAXG5cbiAgICAgICAgbG9hZEFzc2V0ID0gQXNzZXRNYW5hZ2VyLmxvYWQgXCJhc3NldHMvYXNzZXRzLmpzb25cIlxuICAgICAgICBsb2FkQXNzZXQudGhlbiAtPiBTdGF0ZU1hbmFnZXIuYWN0aXZhdGUgXCJtZW51XCJcblxuXG4gICAgb25Qcm9ncmVzczogKGFzc2V0LCBncm91cCwgbG9hZGVkLCB0b3RhbCkgLT5cbiAgICAgICAgQGN0eC5maWxsU3R5bGUgPSBcIiMwMDBcIlxuICAgICAgICBAY3R4LmZpbGxSZWN0IDAsIDAsIDY0MCwgNDgwXG4gICAgICAgIEByZW5kZXJMb2FkaW5nVGV4dCBcIkxvYWRpbmcgI3tncm91cH0uLi5cIlxuICAgICAgICBAcmVuZGVyTG9hZGluZ0JhciBsb2FkZWQgLyB0b3RhbFxuXG5cbiAgICByZW5kZXJMb2FkaW5nVGV4dDogKHRleHQpIC0+XG4gICAgICAgIEBjdHguZmlsbFN0eWxlID0gXCIjZmZmXCJcbiAgICAgICAgQGN0eC5mb250ID0gXCIxMnB4IEFyaWFsLCBzYW5zLXNlcmlmXCJcbiAgICAgICAgQGN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiXG4gICAgICAgIHRleHRTaXplID0gQGN0eC5tZWFzdXJlVGV4dCB0ZXh0XG4gICAgICAgIEBjdHguZmlsbFRleHQgdGV4dCwgQGJhci5taWRkbGUgLSAodGV4dFNpemUud2lkdGggLyAyKSwgQGJhci55ICsgQGJhci5oZWlnaHQgKyAxMFxuXG5cbiAgICByZW5kZXJMb2FkaW5nQmFyOiAocGVyY2VudCkgLT5cbiAgICAgICAgQGN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIlxuICAgICAgICBAY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmXCJcbiAgICAgICAgQGN0eC5zdHJva2VSZWN0IEBiYXIueCwgQGJhci55LCBAYmFyLndpZHRoLCBAYmFyLmhlaWdodFxuICAgICAgICBAY3R4LmZpbGxSZWN0IEBiYXIueCArIDMsIEBiYXIueSArIDMsIChAYmFyLndpZHRoIC0gNikgKiBwZXJjZW50LCBAYmFyLmhlaWdodCAtIDZcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFByZUxvYWRTdGF0ZSIsIkVuZ2luZSA9IHJlcXVpcmUgXCIuLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvRW5naW5lLmNvZmZlZVwiXG5cbkJvb3RTdGF0ZSA9IHJlcXVpcmUgXCIuL1N0YXRlL0Jvb3RTdGF0ZS5jb2ZmZWVcIlxuXG5cbmdhbWUgPSBuZXcgRW5naW5lXG5nYW1lLnN0YXJ0IG5ldyBCb290U3RhdGUiLCJTdGF0ZU1hbmFnZXIgPSByZXF1aXJlIFwiLi9NYW5hZ2VyL1N0YXRlTWFuYWdlci5jb2ZmZWVcIlxuXG5jbGFzcyBFbmdpbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQGxhc3RHYW1lVGljayA9IERhdGUubm93KClcblxuICAgIHN0YXJ0OiAoc3RhdGUpIC0+XG4gICAgICAgIFN0YXRlTWFuYWdlci5hZGQgXCJib290XCIsIHN0YXRlXG4gICAgICAgIHN0YXRlLmluaXQoKVxuICAgICAgICBTdGF0ZU1hbmFnZXIuYWN0aXZhdGUgXCJib290XCJcbiAgICAgICAgQG1haW5Mb29wKClcblxuICAgIG1haW5Mb29wOiAtPlxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQG1haW5Mb29wLmJpbmQgQFxuXG4gICAgICAgIEBjdXJyZW50R2FtZVRpY2sgPSBEYXRlLm5vdygpXG4gICAgICAgIEBkZWx0YSA9IEBjdXJyZW50R2FtZVRpY2sgLSBAbGFzdEdhbWVUaWNrXG4gICAgICAgIEBsYXN0R2FtZVRpY2sgPSBAY3VycmVudEdhbWVUaWNrXG5cbiAgICAgICAgQHVwZGF0ZSBAZGVsdGFcbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgIHVwZGF0ZTogKGR0KSAtPlxuICAgICAgICBzdGF0ZSA9IFN0YXRlTWFuYWdlci5jdXJyZW50KClcblxuICAgICAgICBmb3Igc3lzdGVtIGluIHN0YXRlLnN5c3RlbXNcbiAgICAgICAgICAgIHN5c3RlbS51cGRhdGUgZHRcbiAgICAgICAgcmV0dXJuIG51bGxcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEVuZ2luZSIsInV1aWQgPSByZXF1aXJlIFwiLi4vdmVuZG9yL25vZGUtdXVpZC91dWlkLmpzXCJcblxuY2xhc3MgRW50aXR5XG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBpZCA9IG51bGxcbiAgICAgICAgQGNvbXBvbmVudHMgPSBbXVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0eSIsIlV0aWwgPSByZXF1aXJlIFwiLi4vVXRpbC5jb2ZmZWVcIlxuXG5jbGFzcyBBc3NldE1hbmFnZXJcbiAgICBAYXNzZXRzID0ge31cbiAgICBAbnVtQXNzZXRzID0gMFxuICAgIEBhc3NldHNMb2FkZWQgPSAwXG5cbiAgICBAbG9hZDogKG1hbmlmZXN0KSAtPlxuICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nIFwiQXNzZXRNYW5hZ2VyID4gbG9hZCA+ICN7bWFuaWZlc3R9XCJcbiAgICAgICAgICAgIGxvYWRNYW5pZmVzdCA9IFV0aWwubG9hZEpTT04gbWFuaWZlc3RcbiAgICAgICAgICAgIGxvYWRNYW5pZmVzdC50aGVuIChqc29uKSAtPlxuICAgICAgICAgICAgICAgIGZvciBpLGdyb3VwIG9mIGpzb24uZ3JvdXBzXG4gICAgICAgICAgICAgICAgICAgIGZvciBhc3NldCBpbiBncm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLm51bUFzc2V0cysrXG5cbiAgICAgICAgICAgICAgICBmb3IgZ3JvdXBOYW1lLCBncm91cCBvZiBqc29uLmdyb3Vwc1xuICAgICAgICAgICAgICAgICAgICBmb3IgYXNzZXQgaW4gZ3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvIChhc3NldCkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldExvYWQgPSBVdGlsLmxvYWQganNvbi5yb290ICsgYXNzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldExvYWQudGhlbiAoZGF0YSkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLmFzc2V0c1thc3NldF0gPSBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5hc3NldHNMb2FkZWQrK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjQXNzZXRNYW5hZ2VyLm9uQXNzZXRMb2FkIGFzc2V0LCBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5vblByb2dyZXNzIGFzc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLmFzc2V0c0xvYWRlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5udW1Bc3NldHNcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBBc3NldE1hbmFnZXIuYXNzZXRzTG9hZGVkIGlzIEFzc2V0TWFuYWdlci5udW1Bc3NldHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5vbkxvYWRlZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgcmV0dXJuIHByb21pc2VcblxuICAgICNAb25Bc3NldExvYWQ6IChhc3NldCwgZGF0YSkgLT5cbiAgICAjQG9uQXNzZXRFcnJvcjogKGFzc2V0KSAtPlxuICAgIEBvblByb2dyZXNzOiAoYXNzZXQsIGdyb3VwLCBsb2FkZWQsIHRvdGFsKSAtPlxuICAgIEBvbkxvYWRlZDogLT5cblxuICAgIEBnZXQ6IChhc3NldCkgLT4gQXNzZXRNYW5hZ2VyLmFzc2V0c1thc3NldF1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEFzc2V0TWFuYWdlciIsInV1aWQgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL25vZGUtdXVpZC91dWlkLmpzXCJcbkVudGl0eSA9IHJlcXVpcmUgXCIuLi9FbnRpdHkuY29mZmVlXCJcblxuY2xhc3MgRW50aXR5TWFuYWdlclxuICAgIEBlbnRpdGllcyA9IFtdXG5cbiAgICBAY3JlYXRlRW50aXR5OiAoaWQsIGFkZFRvTGlzdCA9IHRydWUpIC0+XG4gICAgICAgIGlkID89IHV1aWQudjEoKVxuICAgICAgICBlbnRpdHkgPSBuZXcgRW50aXR5XG4gICAgICAgIGVudGl0eS5pZCA9IGlkXG4gICAgICAgIEBhZGRFbnRpdHkgZW50aXR5IGlmIGFkZFRvTGlzdFxuICAgICAgICByZXR1cm4gZW50aXR5XG5cbiAgICBAYWRkRW50aXR5OiAoZW50aXR5KSAtPiBAZW50aXRpZXMucHVzaCBlbnRpdHlcblxuICAgIEByZW1vdmVFbnRpdHk6IChlbnRpdHkpIC0+XG4gICAgICAgICMgRmluZCB0aGUgaW5kZXggb2YgdGhlIGVudGl0eSBpbiB0aGUgbGlzdFxuICAgICAgICBpbmRleCA9IC0xXG4gICAgICAgIGZvciBlLCBpIGluIEBlbnRpdGllc1xuICAgICAgICAgICAgaWYgZSA9PSBlbnRpdHkgdGhlbiBpbmRleCA9IGlcblxuICAgICAgICAjIFJlbW92ZSBmcm9tIGVudGl0eSBsaXN0XG4gICAgICAgIEBlbnRpdGllcy5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgICAgICAgcmV0dXJuIGVudGl0eVxuXG4gICAgQGRlbGV0ZUVudGl0eTogKGVudGl0eSkgLT5cbiAgICAgICAgZW50aXR5LnJlbW92ZUFsbENvbXBvbmVudHMoKVxuICAgICAgICBAcmVtb3ZlRW50aXR5IGVudGl0eVxuXG4gICAgQGdldEVudGl0eUJ5SWQ6IC0+XG4gICAgQGdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZTogLT5cblxuICAgIEBnZXRBbGxFbnRpdGllc1dpdGhDb21wb25lbnRPZlR5cGVzOiAoY29tcG9uZW50VHlwZXMpIC0+XG4gICAgICAgIGVudGl0aWVzID0gW11cbiAgICAgICAgZm9yIGVudGl0eSBpbiBAZW50aXRpZXNcbiAgICAgICAgICAgIGNvbXBvbmVudENvdW50ID0gMFxuICAgICAgICAgICAgZm9yIGNvbXBvbmVudCBpbiBlbnRpdHkuY29tcG9uZW50c1xuICAgICAgICAgICAgICAgIGlmIGNvbXBvbmVudFR5cGVzLmluZGV4T2YoY29tcG9uZW50LnR5cGUpID4gLTEgdGhlbiBjb21wb25lbnRDb3VudCsrXG4gICAgICAgICAgICBpZiBjb21wb25lbnRDb3VudCA9PSBjb21wb25lbnRUeXBlcy5sZW5ndGggdGhlbiBlbnRpdGllcy5wdXNoIGVudGl0eVxuICAgICAgICByZXR1cm4gZW50aXRpZXNcblxuICAgIEBhZGRDb21wb25lbnQ6IChlbnRpdHksIGNvbXBvbmVudCkgLT4gZW50aXR5LmNvbXBvbmVudHMucHVzaCBjb21wb25lbnRcblxuICAgIEBoYXNDb21wb25lbnQ6IC0+XG5cbiAgICBAZ2V0Q29tcG9uZW50T2ZUeXBlOiAoZW50aXR5LCBjb21wb25lbnRUeXBlKSAtPlxuICAgICAgICBmb3IgY29tcG9uZW50IGluIGVudGl0eS5jb21wb25lbnRzXG4gICAgICAgICAgICBpZiBjb21wb25lbnQudHlwZSA9PSBjb21wb25lbnRUeXBlIHRoZW4gcmV0dXJuIGNvbXBvbmVudFxuICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgQHJlbW92ZUFsbENvbXBvbmVudHM6IChlbnRpdHkpIC0+IGVudGl0eS5jb21wb25lbnRzLmxlbmd0aCA9IDBcblxuXG4jICAgIGdldENvbXBvbmVudE9mVHlwZTogKGVudGl0eSwgY29tcG9uZW50VHlwZSkgLT4gXy5maW5kIGVudGl0eS5jb21wb25lbnRzLCAoYykgLT4gYy50eXBlID09IGNvbXBvbmVudFR5cGVcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0eU1hbmFnZXIiLCJjbGFzcyBHcmFwaGljc01hbmFnZXJcblxuICAgIEBjcmVhdGVDYW52YXM6ICh3aWR0aCwgaGVpZ2h0LCBhcHBlbmRUbykgLT5cbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImNhbnZhc1wiXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHRcblxuICAgICAgICBpZiBhcHBlbmRUbyB0aGVuIGFwcGVuZFRvLmFwcGVuZENoaWxkIGNhbnZhc1xuXG4gICAgICAgIHJldHVybiBjYW52YXNcblxuICAgIEBjcmVhdGVSZW5kZXJlcjogKHdpZHRoLCBoZWlnaHQsIGFwcGVuZFRvKSAtPlxuICAgICAgICByZW5kZXJlciA9IHt9XG4gICAgICAgIHJlbmRlcmVyLmNhbnZhcyA9IEdyYXBoaWNzTWFuYWdlci5jcmVhdGVDYW52YXMgd2lkdGgsIGhlaWdodCwgYXBwZW5kVG9cbiAgICAgICAgcmVuZGVyZXIuY3R4ID0gcmVuZGVyZXIuY2FudmFzLmdldENvbnRleHQgXCIyZFwiXG4gICAgICAgIHJldHVybiByZW5kZXJlclxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyYXBoaWNzTWFuYWdlciIsImNsYXNzIElucHV0TWFuYWdlclxuICAgIEBtb3VzZTpcbiAgICAgICAgeDogMFxuICAgICAgICB5OiAwXG5cbiAgICBAa2V5OlxuICAgICAgICB1cDogZmFsc2VcbiAgICAgICAgZG93bjogZmFsc2VcbiAgICAgICAgbGVmdDogZmFsc2VcbiAgICAgICAgcmlnaHQ6IGZhbHNlXG5cbiAgICBAaW5pdDogLT5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIElucHV0TWFuYWdlci5tb3VzZUNsaWNrXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJtb3VzZW1vdmVcIiwgSW5wdXRNYW5hZ2VyLm1vdXNlTW92ZVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyIFwia2V5dXBcIiwgSW5wdXRNYW5hZ2VyLmtleVVwXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJrZXlkb3duXCIsIElucHV0TWFuYWdlci5rZXlEb3duXG5cbiAgICBAbW91c2VDbGljazogKGUpIC0+IGlmIElucHV0TWFuYWdlci5vbk1vdXNlQ2xpY2sgdGhlbiBJbnB1dE1hbmFnZXIub25Nb3VzZUNsaWNrIGVcblxuICAgIEBtb3VzZU1vdmU6IChlKSAtPlxuICAgICAgICBJbnB1dE1hbmFnZXIubW91c2UueCA9IGUueFxuICAgICAgICBJbnB1dE1hbmFnZXIubW91c2UueSA9IGUueVxuICAgICAgICBpZiBJbnB1dE1hbmFnZXIub25Nb3VzZU1vdmUgdGhlbiBJbnB1dE1hbmFnZXIub25Nb3VzZU1vdmUgZVxuXG4gICAgQGtleVVwOiAoZSkgLT5cbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM4IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS51cCA9IGZhbHNlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSA0MCB0aGVuIElucHV0TWFuYWdlci5rZXkuZG93biA9IGZhbHNlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzNyB0aGVuIElucHV0TWFuYWdlci5rZXkubGVmdCA9IGZhbHNlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzOSB0aGVuIElucHV0TWFuYWdlci5rZXkucmlnaHQgPSBmYWxzZVxuXG4gICAgICAgIGlmIElucHV0TWFuYWdlci5vbktleVVwIHRoZW4gSW5wdXRNYW5hZ2VyLm9uS2V5VXAgZVxuXG4gICAgQGtleURvd246IChlKSAtPlxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzggdGhlbiBJbnB1dE1hbmFnZXIua2V5LnVwID0gdHJ1ZVxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gNDAgdGhlbiBJbnB1dE1hbmFnZXIua2V5LmRvd24gPSB0cnVlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzNyB0aGVuIElucHV0TWFuYWdlci5rZXkubGVmdCA9IHRydWVcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM5IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS5yaWdodCA9IHRydWVcblxuICAgICAgICBpZiBJbnB1dE1hbmFnZXIub25LZXlEb3duIHRoZW4gSW5wdXRNYW5hZ2VyLm9uS2V5RG93biBlXG5cbiAgICBAb25Nb3VzZUNsaWNrOiAoZSkgLT5cbiAgICBAb25Nb3VzZU1vdmU6IChlKSAtPlxuICAgIEBvbktleVVwOiAoZSkgLT5cbiAgICBAb25LZXlEb3duOiAoZSkgLT5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0TWFuYWdlciIsImNsYXNzIFN0YXRlTWFuYWdlclxuICAgIEBjdXJyZW50U3RhdGU6IFwiYm9vdFwiXG4gICAgQHN0YXRlczoge31cblxuICAgIEBhZGQ6IChuYW1lLCBzdGF0ZSkgLT5cbiAgICAgICAgU3RhdGVNYW5hZ2VyLnN0YXRlc1tuYW1lXSA9IHN0YXRlXG4gICAgICAgIHJldHVybiBudWxsXG5cbiAgICBAY3VycmVudDogLT4gU3RhdGVNYW5hZ2VyLnN0YXRlc1tTdGF0ZU1hbmFnZXIuY3VycmVudFN0YXRlXVxuXG4gICAgQGFjdGl2YXRlOiAobmFtZSkgLT5cbiAgICAgICAgb2xkID0gU3RhdGVNYW5hZ2VyLmN1cnJlbnQoKVxuICAgICAgICBvbGQuZGVhY3RpdmF0ZSgpIGlmIG9sZFxuICAgICAgICBTdGF0ZU1hbmFnZXIuY3VycmVudFN0YXRlID0gbmFtZVxuICAgICAgICBTdGF0ZU1hbmFnZXIub25BY3RpdmF0ZSBuYW1lXG4gICAgICAgIFN0YXRlTWFuYWdlci5jdXJyZW50KCkuYWN0aXZhdGUoKVxuICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgQG9uQWN0aXZhdGU6IChuYW1lKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuXG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGVNYW5hZ2VyIiwiVXRpbCA9IHJlcXVpcmUgXCIuL1V0aWwuY29mZmVlXCJcblxuY2xhc3MgTWFwXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEB3aWR0aCA9IDBcbiAgICAgICAgQGhlaWdodCA9IDBcbiAgICAgICAgQHRpbGVXaWR0aCA9IDBcbiAgICAgICAgQHRpbGVIZWlnaHQgPSAwXG4gICAgICAgIEBsYXllcnMgPSBbXVxuICAgICAgICBAdGlsZVNldHMgPSBbXVxuXG5cbiAgICBsb2FkTWFwOiAobWFwRmlsZSkgLT5cbiAgICAgICAgbWFwID0gVXRpbC5sb2FkSlNPTiBtYXBGaWxlXG4gICAgICAgIG1hcC50aGVuIEBwYXJzZU1hcC5iaW5kIEBcblxuXG4gICAgcGFyc2VNYXA6IChtYXBEYXRhKSAtPlxuICAgICAgICBAd2lkdGggPSBtYXBEYXRhLndpZHRoXG4gICAgICAgIEBoZWlnaHQgPSBtYXBEYXRhLmhlaWdodFxuICAgICAgICBAdGlsZVdpZHRoID0gbWFwRGF0YS50aWxld2lkdGhcbiAgICAgICAgQHRpbGVIZWlnaHQgPSBtYXBEYXRhLnRpbGVoZWlnaHRcblxuICAgICAgICBAcGFyc2VMYXllciBsYXllciBmb3IgbGF5ZXIgaW4gbWFwRGF0YS5sYXllcnNcbiAgICAgICAgQHBhcnNlVGlsZVNldCB0aWxlU2V0IGZvciB0aWxlU2V0IGluIG1hcERhdGEudGlsZXNldHNcblxuICAgICAgICAjIExvYWQgdGhlIGltYWdlIGFzc2V0c1xuICAgICAgICBsb2FkUHJvbWlzZXMgPSBbXVxuICAgICAgICBmb3IgdGlsZVNldCBpbiBAdGlsZVNldHNcbiAgICAgICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSAtPlxuICAgICAgICAgICAgICAgIHRpbGVTZXQuaW1nID0gbmV3IEltYWdlKClcbiAgICAgICAgICAgICAgICAjIE5vdGUgdGhlIHBhdGggaXMgaGFyZCBjb2RlZCBhbmQgc2hvdWxkIHByb2JhYmx5IGJlIGJhc2VkIG9uIHRoZSBsb2NhdGlvbiBvZiB0aGUgbWFwXG4gICAgICAgICAgICAgICAgdGlsZVNldC5pbWcuc3JjID0gXCIvYXNzZXRzL21hcC9cIiArIHRpbGVTZXQuc3JjXG4gICAgICAgICAgICAgICAgdGlsZVNldC5pbWcub25sb2FkID0gLT4gcmVzb2x2ZSgpXG4gICAgICAgICAgICAgICAgdGlsZVNldC5pbWcub25lcnJvciA9IC0+IHJlamVjdCgpXG4gICAgICAgICAgICBsb2FkUHJvbWlzZXMucHVzaCBwcm9taXNlXG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsIGxvYWRQcm9taXNlc1xuXG5cbiAgICBwYXJzZUxheWVyOiAobGF5ZXJEYXRhKSAtPlxuICAgICAgICAjIEN1cnJlbnRseSBvbmx5IGRlYWwgd2l0aCB0aWxlIGxheWVyc1xuICAgICAgICBpZiBsYXllckRhdGEudHlwZSAhPSBcInRpbGVsYXllclwiIHRoZW4gcmV0dXJuXG5cbiAgICAgICAgbGF5ZXIgPVxuICAgICAgICAgICAgbmFtZTogbGF5ZXJEYXRhLm5hbWVcbiAgICAgICAgICAgIGRhdGE6IFtdXG5cbiAgICAgICAgIyBDb3B5IHRoZSB0aWxlIG51bWJlciB0byB0aGUgbGF5ZXJcbiAgICAgICAgZm9yIHkgaW4gWzAuLkBoZWlnaHQgLSAxXVxuICAgICAgICAgICAgbGF5ZXIuZGF0YVt5XSA9IFtdXG4gICAgICAgICAgICBmb3IgeCBpbiBbMC4uQHdpZHRoIC0gMV1cbiAgICAgICAgICAgICAgICBsYXllci5kYXRhW3ldW3hdID0gbGF5ZXJEYXRhLmRhdGFbKHkgKiBAd2lkdGgpICsgeF1cblxuICAgICAgICBAbGF5ZXJzLnB1c2ggbGF5ZXJcblxuXG4gICAgcGFyc2VUaWxlU2V0OiAodGlsZVNldERhdGEpIC0+XG4gICAgICAgIHRpbGVTZXQgPVxuICAgICAgICAgICAgaW1hZ2VXaWR0aDogdGlsZVNldERhdGEuaW1hZ2V3aWR0aFxuICAgICAgICAgICAgaW1hZ2VIZWlnaHQ6IHRpbGVTZXREYXRhLmltYWdlaGVpZ2h0XG4gICAgICAgICAgICB0aWxlV2lkdGg6IHRpbGVTZXREYXRhLnRpbGV3aWR0aFxuICAgICAgICAgICAgdGlsZUhlaWdodDogdGlsZVNldERhdGEudGlsZWhlaWdodFxuICAgICAgICAgICAgZmlyc3RHaWQ6IHRpbGVTZXREYXRhLmZpcnN0Z2lkXG4gICAgICAgICAgICBzcmM6IHRpbGVTZXREYXRhLmltYWdlXG5cbiAgICAgICAgdGlsZVNldC5sYXN0R2lkID0gdGlsZVNldC5maXJzdEdpZCArXG4gICAgICAgICAgICAoKHRpbGVTZXQuaW1hZ2VXaWR0aCAqIHRpbGVTZXQuaW1hZ2VIZWlnaHQpIC8gKHRpbGVTZXQudGlsZVdpZHRoICogdGlsZVNldC50aWxlSGVpZ2h0KSlcblxuICAgICAgICB0aWxlU2V0Lm51bVhUaWxlcyA9IE1hdGguZmxvb3IgdGlsZVNldC5pbWFnZVdpZHRoIC8gdGlsZVNldC50aWxlV2lkdGhcbiAgICAgICAgdGlsZVNldC5udW1ZVGlsZXMgPSBNYXRoLmZsb29yIHRpbGVTZXQuaW1hZ2VIZWlnaHQgLyB0aWxlU2V0LnRpbGVIZWlnaHRcblxuICAgICAgICBAdGlsZVNldHMucHVzaCB0aWxlU2V0XG5cblxuICAgIGRyYXdUaWxlOiAoY3R4LCB4LCB5LCB0dywgdGgsIHRpbGVOdW1iZXIsIHRpbGVTZXQsIG9mZnNldFggPSAwLCBvZmZzZXRZID0gMCkgLT5cbiAgICAgICAgIyBGaW5kIHRoZSBzcmNYICYgc3JjWSBpbiB0aGUgaW1hZ2UgLSByZXZlcnNlICh4ICogeSkgKyB4ID0gblxuICAgICAgICBzcmNYID0gTWF0aC5mbG9vcih0aWxlTnVtYmVyICUgdGlsZVNldC5udW1YVGlsZXMpICogdGlsZVNldC50aWxlV2lkdGhcbiAgICAgICAgc3JjWSA9IE1hdGguZmxvb3IodGlsZU51bWJlciAvIHRpbGVTZXQubnVtWFRpbGVzKSAqIHRpbGVTZXQudGlsZUhlaWdodFxuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UgdGlsZVNldC5pbWcsXG4gICAgICAgICAgICBzcmNYLCBzcmNZLFxuICAgICAgICAgICAgdGlsZVNldC50aWxlV2lkdGgsIHRpbGVTZXQudGlsZUhlaWdodCxcbiAgICAgICAgICAgICh4ICogdGlsZVNldC50aWxlV2lkdGgpICsgb2Zmc2V0WCwgKHkgKiB0aWxlU2V0LnRpbGVIZWlnaHQpICsgb2Zmc2V0WSxcbiAgICAgICAgICAgIHRpbGVTZXQudGlsZVdpZHRoLCB0aWxlU2V0LnRpbGVIZWlnaHRcblxuXG4gICAgZHJhd1RpbGVGcm9tTnVtYmVyOiAoY3R4LCB4LCB5LCB0dywgdGgsIHRpbGVOdW1iZXIsIG9mZnNldFggPSAwLCBvZmZzZXRZID0gMCkgLT5cbiAgICAgICAgIyBGaW5kIG91dCB3aGF0IHRpbGUgc2V0IHdlIGFyZSBpblxuICAgICAgICB0aWxlU2V0ID0gQGdldFRpbGVTZXRPZlRpbGUgdGlsZU51bWJlclxuXG4gICAgICAgIGlmIHRpbGVTZXRcbiAgICAgICAgICAgIHRpbGVOdW1iZXIgPSB0aWxlTnVtYmVyIC0gdGlsZVNldC5maXJzdEdpZFxuICAgICAgICAgICAgQGRyYXdUaWxlIGN0eCwgeCwgeSwgQHRpbGVXaWR0aCwgQHRpbGVIZWlnaHQsIHRpbGVOdW1iZXIsIHRpbGVTZXQsIG9mZnNldFgsIG9mZnNldFlcblxuXG4gICAgZ2V0VGlsZVNldE9mVGlsZTogKHRpbGVOdW1iZXIpIC0+XG4gICAgICAgIGZvciBzZXQgaW4gQHRpbGVTZXRzXG4gICAgICAgICAgICBpZiAodGlsZU51bWJlciA+PSBzZXQuZmlyc3RHaWQpICYmICh0aWxlTnVtYmVyIDw9IHNldC5sYXN0R2lkKVxuICAgICAgICAgICAgICAgIHJldHVybiBzZXRcbiAgICAgICAgcmV0dXJuIGZhbHNlXG5cblxuICAgIGRyYXdNYXA6IChjdHgpIC0+XG4gICAgICAgIGZvciBsYXllciBpbiBbMC4uQGxheWVycy5sZW5ndGggLSAxXVxuICAgICAgICAgICAgZm9yIHkgaW4gWzAuLkBoZWlnaHQgLSAxXVxuICAgICAgICAgICAgICAgIGZvciB4IGluIFswLi5Ad2lkdGggLSAxXVxuICAgICAgICAgICAgICAgICAgICBAZHJhd1RpbGVGcm9tTnVtYmVyIGN0eCwgeCwgeSwgQHRpbGVXaWR0aCwgQHRpbGVIZWlnaHQsIEBsYXllcnNbbGF5ZXJdLmRhdGFbeV1beF1cblxuXG4gICAgZHJhd01hcFJlY3Q6IChjdHgsIHgsIHksIHcsIGgpIC0+XG4gICAgICAgICMgT25seSBkcmF3cyBhIHJlZ2lvbiBvZiB0aGUgbWFwLCBmcm9tIHBpeGVsIHgseSBvZiBwaXhlbCBzaXplIHcsaFxuICAgICAgICBsZWZ0VGlsZSA9IE1hdGguZmxvb3IgeCAvIEB0aWxlV2lkdGhcbiAgICAgICAgcmlnaHRUaWxlID0gTWF0aC5jZWlsICh4ICsgdykgLyBAdGlsZVdpZHRoXG4gICAgICAgIHRvcFRpbGUgPSBNYXRoLmZsb29yIHkgLyBAdGlsZUhlaWdodFxuICAgICAgICBib3R0b21UaWxlID0gTWF0aC5jZWlsICh5ICsgaCkgLyBAdGlsZUhlaWdodFxuXG4gICAgICAgIGlmIGxlZnRUaWxlIDwgMCB0aGVuIGxlZnRUaWxlID0gMFxuICAgICAgICBpZiB0b3BUaWxlIDwgMCB0aGVuIHRvcFRpbGUgPSAwXG4gICAgICAgIGlmIHJpZ2h0VGlsZSA+PSBAd2lkdGggdGhlbiByaWdodFRpbGUgPSBAd2lkdGggLSAxXG4gICAgICAgIGlmIGJvdHRvbVRpbGUgPj0gQGhlaWdodCB0aGVuIGJvdHRvbVRpbGUgPSBAaGVpZ2h0IC0gMVxuXG4gICAgICAgIHhPZmZzZXQgPSAwIC0geFxuICAgICAgICB5T2Zmc2V0ID0gMCAtIHlcblxuICAgICAgICBmb3IgbGF5ZXIgaW4gWzAuLkBsYXllcnMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgIGZvciB5IGluIFt0b3BUaWxlLi5ib3R0b21UaWxlXVxuICAgICAgICAgICAgICAgIGZvciB4IGluIFtsZWZ0VGlsZS4ucmlnaHRUaWxlXVxuICAgICAgICAgICAgICAgICAgICBAZHJhd1RpbGVGcm9tTnVtYmVyIGN0eCwgeCwgeSwgQHRpbGVXaWR0aCwgQHRpbGVIZWlnaHQsIEBsYXllcnNbbGF5ZXJdLmRhdGFbeV1beF0sIHhPZmZzZXQsIHlPZmZzZXRcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcCIsImNsYXNzIFN0YXRlXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBzeXN0ZW1zID0gW11cblxuICAgIGFkZFN5c3RlbTogKHN5c3RlbSkgLT5cbiAgICAgICAgQHN5c3RlbXMucHVzaCBzeXN0ZW1cbiAgICAgICAgcmV0dXJuIHN5c3RlbVxuXG4gICAgaW5pdDogLT5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICBkZWFjdGl2YXRlOiAtPlxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRlIiwiY2xhc3MgU3lzdGVtXG4gICAgVEhST1RUTEVfVkFMVUU6IDBcblxuICAgIGNvbnN0cnVjdG9yOiAtPiBAdGltZVNpbmNlVXBkYXRlID0gMFxuXG4gICAgaW5pdDogLT5cblxuICAgIHVwZGF0ZTogKGR0KSAtPlxuICAgICAgICBAdGltZVNpbmNlVXBkYXRlICs9IGR0XG5cbiAgICAgICAgaWYgQHRpbWVTaW5jZVVwZGF0ZSA+PSBAVEhST1RUTEVfVkFMVUVcbiAgICAgICAgICAgIEBvblVwZGF0ZSBAdGltZVNpbmNlVXBkYXRlXG4gICAgICAgICAgICBAdGltZVNpbmNlVXBkYXRlID0gMFxuXG4gICAgICAgIHJldHVybiBAdGltZVNpbmNlVXBkYXRlXG5cbiAgICBvblVwZGF0ZTogKGR0KSAtPlxuXG5tb2R1bGUuZXhwb3J0cyA9IFN5c3RlbSIsIlN5c3RlbSA9IHJlcXVpcmUgXCIuLi9TeXN0ZW0uY29mZmVlXCJcbkVudGl0eU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vTWFuYWdlci9FbnRpdHlNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vTWFuYWdlci9HcmFwaGljc01hbmFnZXIuY29mZmVlXCJcblxuY2xhc3MgR3JhcGhpY3NTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW1cbiAgICBUSFJPVFRMRV9WQUxVRTogMTZcblxuICAgIGluaXQ6IChAcmVuZGVyZXIpIC0+XG4gICAgICAgIEB2aWV3cG9ydFggPSAwXG4gICAgICAgIEB2aWV3cG9ydFkgPSAwXG4gICAgICAgIEB3aWR0aCA9IEByZW5kZXJlci5jYW52YXMud2lkdGhcbiAgICAgICAgQGhlaWdodCA9IEByZW5kZXJlci5jYW52YXMuaGVpZ2h0XG5cbiAgICAgICAgQGJ1ZmZlciA9IEdyYXBoaWNzTWFuYWdlci5jcmVhdGVSZW5kZXJlciBAd2lkdGgsIEBoZWlnaHRcblxuICAgIG9uQmVmb3JlRHJhdzogKGN0eCwgZHQpIC0+XG4gICAgb25BZnRlckRyYXc6IChjdHgsIGR0KSAtPlxuXG4gICAgb25VcGRhdGU6IChkdCkgLT5cbiAgICAgICAgQG9uQmVmb3JlRHJhdyBAYnVmZmVyLmN0eCwgZHRcblxuICAgICAgICBAZHJhd1JlY3RzKClcbiAgICAgICAgQGRyYXdJbWFnZXMoKVxuICAgICAgICBAZHJhd1RleHRzKClcblxuICAgICAgICBAb25BZnRlckRyYXcgQGJ1ZmZlci5jdHgsIGR0XG5cbiAgICAgICAgIyBEcmF3IGNvcHkgdGhlIGJ1ZmZlciB0byBtYWluIHJlbmRlcmVyXG4gICAgICAgIEByZW5kZXJlci5jdHguY2xlYXJSZWN0IDAsIDAsIEB3aWR0aCwgQGhlaWdodFxuICAgICAgICBAcmVuZGVyZXIuY3R4LmRyYXdJbWFnZSBAYnVmZmVyLmNhbnZhcywgMCwgMFxuICAgICAgICBAYnVmZmVyLmN0eC5jbGVhclJlY3QgMCwgMCwgQHdpZHRoLCBAaGVpZ2h0XG5cbiAgICBkcmF3UmVjdHM6IC0+XG4gICAgICAgIHJlY3RFbnRpdGllcyA9IEVudGl0eU1hbmFnZXIuZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJSZW5kZXJhYmxlUmVjdFwiLCBcIlBvc2l0aW9uXCJdXG4gICAgICAgIGZvciBlbnRpdHkgaW4gcmVjdEVudGl0aWVzXG4gICAgICAgICAgICByZWN0ID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlJlbmRlcmFibGVSZWN0XCJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlBvc2l0aW9uXCJcbiAgICAgICAgICAgIEBidWZmZXIuY3R4LmZpbGxTdHlsZSA9IHJlY3QuY29sb3VyXG4gICAgICAgICAgICBAYnVmZmVyLmN0eC5maWxsUmVjdCBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCByZWN0LndpZHRoLCByZWN0LmhlaWdodFxuXG4gICAgZHJhd0ltYWdlczogLT5cbiAgICAgICAgaW1hZ2VFbnRpdGllcyA9IEVudGl0eU1hbmFnZXIuZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJSZW5kZXJhYmxlSW1hZ2VcIiwgXCJQb3NpdGlvblwiXVxuICAgICAgICBmb3IgZW50aXR5IGluIGltYWdlRW50aXRpZXNcbiAgICAgICAgICAgIGltYWdlID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlJlbmRlcmFibGVJbWFnZVwiXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJQb3NpdGlvblwiXG4gICAgICAgICAgICAjIFRPRE86IEdldCB0aGUgYWN0dWFsIGltYWdlP1xuICAgICAgICAgICAgQGJ1ZmZlci5jdHguZHJhd0ltYWdlIGltYWdlLCBwb3NpdGlvbi54LCBwb3NpdGlvbi55XG5cbiAgICBkcmF3VGV4dHM6IC0+XG4gICAgICAgIHRleHRFbnRpdGllcyA9IEVudGl0eU1hbmFnZXIuZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJSZW5kZXJhYmxlVGV4dFwiLCBcIlBvc2l0aW9uXCJdXG4gICAgICAgIGZvciBlbnRpdHkgaW4gdGV4dEVudGl0aWVzXG4gICAgICAgICAgICB0ZXh0ID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlJlbmRlcmFibGVUZXh0XCJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlBvc2l0aW9uXCJcbiAgICAgICAgICAgIEBidWZmZXIuY3R4LmZpbGxTdHlsZSA9IHRleHQuY29sb3VyXG4gICAgICAgICAgICBAYnVmZmVyLmN0eC5mb250ID0gdGV4dC5mb250XG4gICAgICAgICAgICBAYnVmZmVyLmN0eC5maWxsVGV4dCB0ZXh0LnRleHQsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnlcblxuICAgICMjI1xuICAgIGluaXQ6IC0+XG4gICAgICAgIEBtZXRlciA9IG5ldyBGUFNNZXRlcih7IGdyYXBoOiAxfSlcblxuICAgIG9uVXBkYXRlOiAoZHQpIC0+XG4gICAgICAgIEBtZXRlci50aWNrU3RhcnQoKVxuXG4gICAgICAgIGlmIEBlbnRpdHlTeXN0ZW1cbiAgICAgICAgICAgIGVudGl0aWVzID0gQGVudGl0eVN5c3RlbS5nZXRBbGxFbnRpdGllc1dpdGhDb21wb25lbnRPZlR5cGVzIFtcIlJlbmRlcmFibGVcIiwgXCJQb3NpdGlvblwiXVxuXG4gICAgICAgICAgICBfLmVhY2ggZW50aXRpZXMsIChlbnRpdHkpID0+XG4gICAgICAgICAgICAgICAgcmVuZGVyYWJsZSA9IEBlbnRpdHlTeXN0ZW0uZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJSZW5kZXJhYmxlXCJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IEBlbnRpdHlTeXN0ZW0uZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJQb3NpdGlvblwiXG5cbiAgICAgICAgICAgICAgICBAYnVmZmVyQ3R4LmZpbGxTdHlsZSA9IHJlbmRlcmFibGUuY29sb3VyXG4gICAgICAgICAgICAgICAgQGJ1ZmZlckN0eC5maWxsUmVjdCBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCAyMCwgMjBcblxuICAgICAgICBAY3R4LmNsZWFyUmVjdCAwLCAwLCBAV0lEVEgsIEBIRUlHSFRcbiAgICAgICAgQGN0eC5kcmF3SW1hZ2UgQGJ1ZmZlckNhbnZhcywgMCwgMFxuICAgICAgICBAYnVmZmVyQ3R4LmNsZWFyUmVjdCAwLCAwLCBAV0lEVEgsIEBIRUlHSFRcblxuICAgICAgICBAbWV0ZXIudGljaygpXG5cbiAgICAjIyNcblxubW9kdWxlLmV4cG9ydHMgPSBHcmFwaGljc1N5c3RlbSIsImNsYXNzIFV0aWxcbiAgICBAbG9hZEpTT046ICh1cmwpIC0+IFV0aWwubG9hZCh1cmwpLnRoZW4oSlNPTi5wYXJzZSlcblxuICAgIEBsb2FkOiAodXJsKSAtPlxuICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgLT5cbiAgICAgICAgICAgIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgICAgICAjeGhyLnJlc3BvbnNlVHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB4aHIub3BlbiBcIkdFVFwiLCB1cmwsIHRydWVcbiAgICAgICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyIFwicmVhZHlzdGF0ZWNoYW5nZVwiLCAtPlxuICAgICAgICAgICAgICAgIGlmIHhoci5yZWFkeVN0YXRlIGlzIDRcbiAgICAgICAgICAgICAgICAgICAgaWYgeGhyLnN0YXR1cyBpbiBbMjAwLCAzMDRdXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlIHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0IFwiZXJyb3JcIlxuICAgICAgICAgICAgeGhyLnNlbmQoKVxuICAgICAgICByZXR1cm4gcHJvbWlzZVxuXG4gICAgQHBsdXJhbGlzZTogKHdvcmQpIC0+XG4gICAgICAgIGxlbiA9IHdvcmQubGVuZ3RoXG5cbiAgICAgICAgbDEgPSB3b3JkLnN1YnN0ciAtMVxuICAgICAgICBsMiA9IHdvcmQuc3Vic3RyIC0yXG5cbiAgICAgICAgaWYgbDEgPT0gXCJ5XCJcbiAgICAgICAgICAgIHdvcmQgPSB3b3JkLnN1YnN0cigwLCBsZW4gLSAxKSArIFwiaWVzXCJcbiAgICAgICAgZWxzZSBpZiBsMSA9PSBcInNcIiB8fCBsMSA9PSBcInhcIiB8fCBsMiA9PSBcImNoXCIgfHwgbDIgPT0gXCJzaFwiIHx8IGwyID09IFwiZXNcIlxuICAgICAgICAgICAgIyBJZiB3b3JkIGVuZHMgaW4gXCJzXCIgXCJ4XCIgb3IgXCJjaFwiIG9yIFwic2hcIiBhZGQgXCJlc1wiXG4gICAgICAgICAgICB3b3JkID0gd29yZCArIFwiZXNcIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3b3JkID0gd29yZCArIFwic1wiXG5cbiAgICAgICAgcmV0dXJuIHdvcmRcblxubW9kdWxlLmV4cG9ydHMgPSBVdGlsIiwiKGZ1bmN0aW9uIChCdWZmZXIpe1xuLy8gICAgIHV1aWQuanNcbi8vXG4vLyAgICAgQ29weXJpZ2h0IChjKSAyMDEwLTIwMTIgUm9iZXJ0IEtpZWZmZXJcbi8vICAgICBNSVQgTGljZW5zZSAtIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblxuKGZ1bmN0aW9uKCkge1xuICB2YXIgX2dsb2JhbCA9IHRoaXM7XG5cbiAgLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIFdlIGZlYXR1cmVcbiAgLy8gZGV0ZWN0IHRvIGRldGVybWluZSB0aGUgYmVzdCBSTkcgc291cmNlLCBub3JtYWxpemluZyB0byBhIGZ1bmN0aW9uIHRoYXRcbiAgLy8gcmV0dXJucyAxMjgtYml0cyBvZiByYW5kb21uZXNzLCBzaW5jZSB0aGF0J3Mgd2hhdCdzIHVzdWFsbHkgcmVxdWlyZWRcbiAgdmFyIF9ybmc7XG5cbiAgLy8gTm9kZS5qcyBjcnlwdG8tYmFzZWQgUk5HIC0gaHR0cDovL25vZGVqcy5vcmcvZG9jcy92MC42LjIvYXBpL2NyeXB0by5odG1sXG4gIC8vXG4gIC8vIE1vZGVyYXRlbHkgZmFzdCwgaGlnaCBxdWFsaXR5XG4gIGlmICh0eXBlb2YocmVxdWlyZSkgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICB2YXIgX3JiID0gcmVxdWlyZSgnY3J5cHRvJykucmFuZG9tQnl0ZXM7XG4gICAgICBfcm5nID0gX3JiICYmIGZ1bmN0aW9uKCkge3JldHVybiBfcmIoMTYpO307XG4gICAgfSBjYXRjaChlKSB7fVxuICB9XG5cbiAgaWYgKCFfcm5nICYmIF9nbG9iYWwuY3J5cHRvICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBXSEFUV0cgY3J5cHRvLWJhc2VkIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgICAvL1xuICAgIC8vIE1vZGVyYXRlbHkgZmFzdCwgaGlnaCBxdWFsaXR5XG4gICAgdmFyIF9ybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgICBfcm5nID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhfcm5kczgpO1xuICAgICAgcmV0dXJuIF9ybmRzODtcbiAgICB9O1xuICB9XG5cbiAgaWYgKCFfcm5nKSB7XG4gICAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAgIC8vXG4gICAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgICAvLyBxdWFsaXR5LlxuICAgIHZhciAgX3JuZHMgPSBuZXcgQXJyYXkoMTYpO1xuICAgIF9ybmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgICAgX3JuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfcm5kcztcbiAgICB9O1xuICB9XG5cbiAgLy8gQnVmZmVyIGNsYXNzIHRvIHVzZVxuICB2YXIgQnVmZmVyQ2xhc3MgPSB0eXBlb2YoQnVmZmVyKSA9PSAnZnVuY3Rpb24nID8gQnVmZmVyIDogQXJyYXk7XG5cbiAgLy8gTWFwcyBmb3IgbnVtYmVyIDwtPiBoZXggc3RyaW5nIGNvbnZlcnNpb25cbiAgdmFyIF9ieXRlVG9IZXggPSBbXTtcbiAgdmFyIF9oZXhUb0J5dGUgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICAgIF9ieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xuICAgIF9oZXhUb0J5dGVbX2J5dGVUb0hleFtpXV0gPSBpO1xuICB9XG5cbiAgLy8gKipgcGFyc2UoKWAgLSBQYXJzZSBhIFVVSUQgaW50byBpdCdzIGNvbXBvbmVudCBieXRlcyoqXG4gIGZ1bmN0aW9uIHBhcnNlKHMsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIGkgPSAoYnVmICYmIG9mZnNldCkgfHwgMCwgaWkgPSAwO1xuXG4gICAgYnVmID0gYnVmIHx8IFtdO1xuICAgIHMudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bMC05YS1mXXsyfS9nLCBmdW5jdGlvbihvY3QpIHtcbiAgICAgIGlmIChpaSA8IDE2KSB7IC8vIERvbid0IG92ZXJmbG93IVxuICAgICAgICBidWZbaSArIGlpKytdID0gX2hleFRvQnl0ZVtvY3RdO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gWmVybyBvdXQgcmVtYWluaW5nIGJ5dGVzIGlmIHN0cmluZyB3YXMgc2hvcnRcbiAgICB3aGlsZSAoaWkgPCAxNikge1xuICAgICAgYnVmW2kgKyBpaSsrXSA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIC8vICoqYHVucGFyc2UoKWAgLSBDb252ZXJ0IFVVSUQgYnl0ZSBhcnJheSAoYWxhIHBhcnNlKCkpIGludG8gYSBzdHJpbmcqKlxuICBmdW5jdGlvbiB1bnBhcnNlKGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIGkgPSBvZmZzZXQgfHwgMCwgYnRoID0gX2J5dGVUb0hleDtcbiAgICByZXR1cm4gIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dO1xuICB9XG5cbiAgLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuICAvL1xuICAvLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuICAvLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG4gIC8vIHJhbmRvbSAjJ3Mgd2UgbmVlZCB0byBpbml0IG5vZGUgYW5kIGNsb2Nrc2VxXG4gIHZhciBfc2VlZEJ5dGVzID0gX3JuZygpO1xuXG4gIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICB2YXIgX25vZGVJZCA9IFtcbiAgICBfc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgICBfc2VlZEJ5dGVzWzFdLCBfc2VlZEJ5dGVzWzJdLCBfc2VlZEJ5dGVzWzNdLCBfc2VlZEJ5dGVzWzRdLCBfc2VlZEJ5dGVzWzVdXG4gIF07XG5cbiAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgdmFyIF9jbG9ja3NlcSA9IChfc2VlZEJ5dGVzWzZdIDw8IDggfCBfc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcblxuICAvLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbiAgdmFyIF9sYXN0TVNlY3MgPSAwLCBfbGFzdE5TZWNzID0gMDtcblxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG4gIGZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gICAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT0gbnVsbCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAgIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gICAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gICAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9IG51bGwgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gICAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9IG51bGwgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gICAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAgIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgICAvLyB0aW1lIGludGVydmFsXG4gICAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09IG51bGwpIHtcbiAgICAgIG5zZWNzID0gMDtcbiAgICB9XG5cbiAgICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gICAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgICB9XG5cbiAgICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gICAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICAgIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gICAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gICAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgICAvLyBgdGltZV9sb3dgXG4gICAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICAgIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gICAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gICAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gICAgLy8gYHRpbWVfbWlkYFxuICAgIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICAgIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICAgIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAgIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICAgIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAgIC8vIGBjbG9ja19zZXFfbG93YFxuICAgIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAgIC8vIGBub2RlYFxuICAgIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gICAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyBuKyspIHtcbiAgICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmID8gYnVmIDogdW5wYXJzZShiKTtcbiAgfVxuXG4gIC8vICoqYHY0KClgIC0gR2VuZXJhdGUgcmFuZG9tIFVVSUQqKlxuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbiAgZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgICAvLyBEZXByZWNhdGVkIC0gJ2Zvcm1hdCcgYXJndW1lbnQsIGFzIHN1cHBvcnRlZCBpbiB2MS4yXG4gICAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEJ1ZmZlckNsYXNzKDE2KSA6IG51bGw7XG4gICAgICBvcHRpb25zID0gbnVsbDtcbiAgICB9XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBfcm5nKSgpO1xuXG4gICAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICAgIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgICBpZiAoYnVmKSB7XG4gICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7IGlpKyspIHtcbiAgICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYnVmIHx8IHVucGFyc2Uocm5kcyk7XG4gIH1cblxuICAvLyBFeHBvcnQgcHVibGljIEFQSVxuICB2YXIgdXVpZCA9IHY0O1xuICB1dWlkLnYxID0gdjE7XG4gIHV1aWQudjQgPSB2NDtcbiAgdXVpZC5wYXJzZSA9IHBhcnNlO1xuICB1dWlkLnVucGFyc2UgPSB1bnBhcnNlO1xuICB1dWlkLkJ1ZmZlckNsYXNzID0gQnVmZmVyQ2xhc3M7XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIFB1Ymxpc2ggYXMgQU1EIG1vZHVsZVxuICAgIGRlZmluZShmdW5jdGlvbigpIHtyZXR1cm4gdXVpZDt9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YobW9kdWxlKSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIC8vIFB1Ymxpc2ggYXMgbm9kZS5qcyBtb2R1bGVcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG4gIH0gZWxzZSB7XG4gICAgLy8gUHVibGlzaCBhcyBnbG9iYWwgKGluIGJyb3dzZXJzKVxuICAgIHZhciBfcHJldmlvdXNSb290ID0gX2dsb2JhbC51dWlkO1xuXG4gICAgLy8gKipgbm9Db25mbGljdCgpYCAtIChicm93c2VyIG9ubHkpIHRvIHJlc2V0IGdsb2JhbCAndXVpZCcgdmFyKipcbiAgICB1dWlkLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIF9nbG9iYWwudXVpZCA9IF9wcmV2aW91c1Jvb3Q7XG4gICAgICByZXR1cm4gdXVpZDtcbiAgICB9O1xuXG4gICAgX2dsb2JhbC51dWlkID0gdXVpZDtcbiAgfVxufSkuY2FsbCh0aGlzKTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyKSIsIi8qKlxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQXV0aG9yOiAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBMaWNlbnNlOiAgTUlUXG4gKlxuICogYG5wbSBpbnN0YWxsIGJ1ZmZlcmBcbiAqL1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuQnVmZmVyLnBvb2xTaXplID0gODE5MlxuXG4vKipcbiAqIElmIGBCdWZmZXIuX3VzZVR5cGVkQXJyYXlzYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKGNvbXBhdGlibGUgZG93biB0byBJRTYpXG4gKi9cbkJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgPSAoZnVuY3Rpb24gKCkge1xuICAvLyBEZXRlY3QgaWYgYnJvd3NlciBzdXBwb3J0cyBUeXBlZCBBcnJheXMuIFN1cHBvcnRlZCBicm93c2VycyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLFxuICAvLyBDaHJvbWUgNyssIFNhZmFyaSA1LjErLCBPcGVyYSAxMS42KywgaU9TIDQuMisuIElmIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nXG4gIC8vIHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcywgdGhlbiB0aGF0J3MgdGhlIHNhbWUgYXMgbm8gYFVpbnQ4QXJyYXlgIHN1cHBvcnRcbiAgLy8gYmVjYXVzZSB3ZSBuZWVkIHRvIGJlIGFibGUgdG8gYWRkIGFsbCB0aGUgbm9kZSBCdWZmZXIgQVBJIG1ldGhvZHMuIFRoaXMgaXMgYW4gaXNzdWVcbiAgLy8gaW4gRmlyZWZveCA0LTI5LiBOb3cgZml4ZWQ6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOFxuICB0cnkge1xuICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMClcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoYnVmKVxuICAgIGFyci5mb28gPSBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9XG4gICAgcmV0dXJuIDQyID09PSBhcnIuZm9vKCkgJiZcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAvLyBDaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59KSgpXG5cbi8qKlxuICogQ2xhc3M6IEJ1ZmZlclxuICogPT09PT09PT09PT09PVxuICpcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgYXJlIGF1Z21lbnRlZFxuICogd2l0aCBmdW5jdGlvbiBwcm9wZXJ0aWVzIGZvciBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgQVBJIGZ1bmN0aW9ucy4gV2UgdXNlXG4gKiBgVWludDhBcnJheWAgc28gdGhhdCBzcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdCByZXR1cm5zXG4gKiBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBCeSBhdWdtZW50aW5nIHRoZSBpbnN0YW5jZXMsIHdlIGNhbiBhdm9pZCBtb2RpZnlpbmcgdGhlIGBVaW50OEFycmF5YFxuICogcHJvdG90eXBlLlxuICovXG5mdW5jdGlvbiBCdWZmZXIgKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpXG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybylcblxuICB2YXIgdHlwZSA9IHR5cGVvZiBzdWJqZWN0XG5cbiAgLy8gV29ya2Fyb3VuZDogbm9kZSdzIGJhc2U2NCBpbXBsZW1lbnRhdGlvbiBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgc3RyaW5nc1xuICAvLyB3aGlsZSBiYXNlNjQtanMgZG9lcyBub3QuXG4gIGlmIChlbmNvZGluZyA9PT0gJ2Jhc2U2NCcgJiYgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBzdWJqZWN0ID0gc3RyaW5ndHJpbShzdWJqZWN0KVxuICAgIHdoaWxlIChzdWJqZWN0Lmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICAgIHN1YmplY3QgPSBzdWJqZWN0ICsgJz0nXG4gICAgfVxuICB9XG5cbiAgLy8gRmluZCB0aGUgbGVuZ3RoXG4gIHZhciBsZW5ndGhcbiAgaWYgKHR5cGUgPT09ICdudW1iZXInKVxuICAgIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0KVxuICBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJylcbiAgICBsZW5ndGggPSBCdWZmZXIuYnl0ZUxlbmd0aChzdWJqZWN0LCBlbmNvZGluZylcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpXG4gICAgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QubGVuZ3RoKSAvLyBhc3N1bWUgdGhhdCBvYmplY3QgaXMgYXJyYXktbGlrZVxuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBuZWVkcyB0byBiZSBhIG51bWJlciwgYXJyYXkgb3Igc3RyaW5nLicpXG5cbiAgdmFyIGJ1ZlxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIC8vIFByZWZlcnJlZDogUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICBidWYgPSBCdWZmZXIuX2F1Z21lbnQobmV3IFVpbnQ4QXJyYXkobGVuZ3RoKSlcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIFRISVMgaW5zdGFuY2Ugb2YgQnVmZmVyIChjcmVhdGVkIGJ5IGBuZXdgKVxuICAgIGJ1ZiA9IHRoaXNcbiAgICBidWYubGVuZ3RoID0gbGVuZ3RoXG4gICAgYnVmLl9pc0J1ZmZlciA9IHRydWVcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmIHR5cGVvZiBzdWJqZWN0LmJ5dGVMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgLy8gU3BlZWQgb3B0aW1pemF0aW9uIC0tIHVzZSBzZXQgaWYgd2UncmUgY29weWluZyBmcm9tIGEgdHlwZWQgYXJyYXlcbiAgICBidWYuX3NldChzdWJqZWN0KVxuICB9IGVsc2UgaWYgKGlzQXJyYXlpc2goc3ViamVjdCkpIHtcbiAgICAvLyBUcmVhdCBhcnJheS1pc2ggb2JqZWN0cyBhcyBhIGJ5dGUgYXJyYXlcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkpXG4gICAgICAgIGJ1ZltpXSA9IHN1YmplY3QucmVhZFVJbnQ4KGkpXG4gICAgICBlbHNlXG4gICAgICAgIGJ1ZltpXSA9IHN1YmplY3RbaV1cbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBidWYud3JpdGUoc3ViamVjdCwgMCwgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgIUJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgIW5vWmVybykge1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYnVmW2ldID0gMFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWZcbn1cblxuLy8gU1RBVElDIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICdyYXcnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiAoYikge1xuICByZXR1cm4gISEoYiAhPT0gbnVsbCAmJiBiICE9PSB1bmRlZmluZWQgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gZnVuY3Rpb24gKHN0ciwgZW5jb2RpbmcpIHtcbiAgdmFyIHJldFxuICBzdHIgPSBzdHIgKyAnJ1xuICBzd2l0Y2ggKGVuY29kaW5nIHx8ICd1dGY4Jykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoIC8gMlxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSB1dGY4VG9CeXRlcyhzdHIpLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdyYXcnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gYmFzZTY0VG9CeXRlcyhzdHIpLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAqIDJcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gKGxpc3QsIHRvdGFsTGVuZ3RoKSB7XG4gIGFzc2VydChpc0FycmF5KGxpc3QpLCAnVXNhZ2U6IEJ1ZmZlci5jb25jYXQobGlzdCwgW3RvdGFsTGVuZ3RoXSlcXG4nICtcbiAgICAgICdsaXN0IHNob3VsZCBiZSBhbiBBcnJheS4nKVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKDApXG4gIH0gZWxzZSBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gbGlzdFswXVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB0b3RhbExlbmd0aCAhPT0gJ251bWJlcicpIHtcbiAgICB0b3RhbExlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdG90YWxMZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmID0gbmV3IEJ1ZmZlcih0b3RhbExlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICBpdGVtLmNvcHkoYnVmLCBwb3MpXG4gICAgcG9zICs9IGl0ZW0ubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG4vLyBCVUZGRVIgSU5TVEFOQ0UgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gX2hleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgYXNzZXJ0KHN0ckxlbiAlIDIgPT09IDAsICdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYnl0ZSA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBhc3NlcnQoIWlzTmFOKGJ5dGUpLCAnSW52YWxpZCBoZXggc3RyaW5nJylcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBieXRlXG4gIH1cbiAgQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBpICogMlxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBfdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX2FzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX2JpbmFyeVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIF9hc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gX2Jhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBTdXBwb3J0IGJvdGggKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKVxuICAvLyBhbmQgdGhlIGxlZ2FjeSAoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpXG4gIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgaWYgKCFpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICB9IGVsc2UgeyAgLy8gbGVnYWN5XG4gICAgdmFyIHN3YXAgPSBlbmNvZGluZ1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgb2Zmc2V0ID0gbGVuZ3RoXG4gICAgbGVuZ3RoID0gc3dhcFxuICB9XG5cbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKClcblxuICB2YXIgcmV0XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgc2VsZiA9IHRoaXNcblxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKClcbiAgc3RhcnQgPSBOdW1iZXIoc3RhcnQpIHx8IDBcbiAgZW5kID0gKGVuZCAhPT0gdW5kZWZpbmVkKVxuICAgID8gTnVtYmVyKGVuZClcbiAgICA6IGVuZCA9IHNlbGYubGVuZ3RoXG5cbiAgLy8gRmFzdHBhdGggZW1wdHkgc3RyaW5nc1xuICBpZiAoZW5kID09PSBzdGFydClcbiAgICByZXR1cm4gJydcblxuICB2YXIgcmV0XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0X3N0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzXG5cbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKCF0YXJnZXRfc3RhcnQpIHRhcmdldF9zdGFydCA9IDBcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVyblxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCBzb3VyY2UubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdzb3VyY2VFbmQgPCBzb3VyY2VTdGFydCcpXG4gIGFzc2VydCh0YXJnZXRfc3RhcnQgPj0gMCAmJiB0YXJnZXRfc3RhcnQgPCB0YXJnZXQubGVuZ3RoLFxuICAgICAgJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSBzb3VyY2UubGVuZ3RoLCAnc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aClcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCA8IGVuZCAtIHN0YXJ0KVxuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgKyBzdGFydFxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuXG4gIGlmIChsZW4gPCAxMDAgfHwgIUJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRfc3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0Ll9zZXQodGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLCB0YXJnZXRfc3RhcnQpXG4gIH1cbn1cblxuZnVuY3Rpb24gX2Jhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiBfdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJlcyA9ICcnXG4gIHZhciB0bXAgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBpZiAoYnVmW2ldIDw9IDB4N0YpIHtcbiAgICAgIHJlcyArPSBkZWNvZGVVdGY4Q2hhcih0bXApICsgU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gICAgICB0bXAgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICB0bXAgKz0gJyUnICsgYnVmW2ldLnRvU3RyaW5nKDE2KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXMgKyBkZWNvZGVVdGY4Q2hhcih0bXApXG59XG5cbmZ1bmN0aW9uIF9hc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKylcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gX2JpbmFyeVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIF9hc2NpaVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZClcbn1cblxuZnVuY3Rpb24gX2hleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSsxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSBjbGFtcChzdGFydCwgbGVuLCAwKVxuICBlbmQgPSBjbGFtcChlbmQsIGxlbiwgbGVuKVxuXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5fYXVnbWVudCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpKVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgdmFyIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyBpKyspIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgICByZXR1cm4gbmV3QnVmXG4gIH1cbn1cblxuLy8gYGdldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLmdldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJylcbiAgcmV0dXJuIHRoaXMucmVhZFVJbnQ4KG9mZnNldClcbn1cblxuLy8gYHNldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHYsIG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLnNldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJylcbiAgcmV0dXJuIHRoaXMud3JpdGVVSW50OCh2LCBvZmZzZXQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbmZ1bmN0aW9uIF9yZWFkVUludDE2IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbFxuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgdmFsID0gYnVmW29mZnNldF1cbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgOFxuICB9IGVsc2Uge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdIDw8IDhcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV1cbiAgfVxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZFVJbnQzMiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWxcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKVxuICAgICAgdmFsID0gYnVmW29mZnNldCArIDJdIDw8IDE2XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDhcbiAgICB2YWwgfD0gYnVmW29mZnNldF1cbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbilcbiAgICAgIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0ICsgM10gPDwgMjQgPj4+IDApXG4gIH0gZWxzZSB7XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgPSBidWZbb2Zmc2V0ICsgMV0gPDwgMTZcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMl0gPDwgOFxuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAzXVxuICAgIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0XSA8PCAyNCA+Pj4gMClcbiAgfVxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsXG4gICAgICAgICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICB2YXIgbmVnID0gdGhpc1tvZmZzZXRdICYgMHg4MFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuZnVuY3Rpb24gX3JlYWRJbnQxNiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWwgPSBfcmVhZFVJbnQxNihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCB0cnVlKVxuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmZmYgLSB2YWwgKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkSW50MzIgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsID0gX3JlYWRVSW50MzIoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSlcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMDAwMDBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmZmZmZmZmYgLSB2YWwgKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkRmxvYXQgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgcmV0dXJuIGllZWU3NTQucmVhZChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWREb3VibGUgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgcmV0dXJuIGllZWU3NTQucmVhZChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuXG5cbiAgdGhpc1tvZmZzZXRdID0gdmFsdWVcbn1cblxuZnVuY3Rpb24gX3dyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZilcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCAyKTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9XG4gICAgICAgICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAgICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZmZmZmYpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgNCk7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPVxuICAgICAgICAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2YsIC0weDgwKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICB0aGlzLndyaXRlVUludDgodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICB0aGlzLndyaXRlVUludDgoMHhmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmLCAtMHg4MDAwKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgX3dyaXRlVUludDE2KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbiAgZWxzZVxuICAgIF93cml0ZVVJbnQxNihidWYsIDB4ZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIF93cml0ZVVJbnQzMihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICBfd3JpdGVVSW50MzIoYnVmLCAweGZmZmZmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCxcbiAgICAgICAgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBmaWxsKHZhbHVlLCBzdGFydD0wLCBlbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uICh2YWx1ZSwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXZhbHVlKSB2YWx1ZSA9IDBcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kKSBlbmQgPSB0aGlzLmxlbmd0aFxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5jaGFyQ29kZUF0KDApXG4gIH1cblxuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpLCAndmFsdWUgaXMgbm90IGEgbnVtYmVyJylcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ2VuZCA8IHN0YXJ0JylcblxuICAvLyBGaWxsIDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVyblxuICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVyblxuXG4gIGFzc2VydChzdGFydCA+PSAwICYmIHN0YXJ0IDwgdGhpcy5sZW5ndGgsICdzdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSB0aGlzLmxlbmd0aCwgJ2VuZCBvdXQgb2YgYm91bmRzJylcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHRoaXNbaV0gPSB2YWx1ZVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG91dCA9IFtdXG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgb3V0W2ldID0gdG9IZXgodGhpc1tpXSlcbiAgICBpZiAoaSA9PT0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUykge1xuICAgICAgb3V0W2kgKyAxXSA9ICcuLi4nXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIG91dC5qb2luKCcgJykgKyAnPidcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGBBcnJheUJ1ZmZlcmAgd2l0aCB0aGUgKmNvcGllZCogbWVtb3J5IG9mIHRoZSBidWZmZXIgaW5zdGFuY2UuXG4gKiBBZGRlZCBpbiBOb2RlIDAuMTIuIE9ubHkgYXZhaWxhYmxlIGluIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBBcnJheUJ1ZmZlci5cbiAqL1xuQnVmZmVyLnByb3RvdHlwZS50b0FycmF5QnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAgIHJldHVybiAobmV3IEJ1ZmZlcih0aGlzKSkuYnVmZmVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBidWYgPSBuZXcgVWludDhBcnJheSh0aGlzLmxlbmd0aClcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBidWYubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpXG4gICAgICAgIGJ1ZltpXSA9IHRoaXNbaV1cbiAgICAgIHJldHVybiBidWYuYnVmZmVyXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQnVmZmVyLnRvQXJyYXlCdWZmZXIgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXInKVxuICB9XG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxudmFyIEJQID0gQnVmZmVyLnByb3RvdHlwZVxuXG4vKipcbiAqIEF1Z21lbnQgYSBVaW50OEFycmF5ICppbnN0YW5jZSogKG5vdCB0aGUgVWludDhBcnJheSBjbGFzcyEpIHdpdGggQnVmZmVyIG1ldGhvZHNcbiAqL1xuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX2lzQnVmZmVyID0gdHJ1ZVxuXG4gIC8vIHNhdmUgcmVmZXJlbmNlIHRvIG9yaWdpbmFsIFVpbnQ4QXJyYXkgZ2V0L3NldCBtZXRob2RzIGJlZm9yZSBvdmVyd3JpdGluZ1xuICBhcnIuX2dldCA9IGFyci5nZXRcbiAgYXJyLl9zZXQgPSBhcnIuc2V0XG5cbiAgLy8gZGVwcmVjYXRlZCwgd2lsbCBiZSByZW1vdmVkIGluIG5vZGUgMC4xMytcbiAgYXJyLmdldCA9IEJQLmdldFxuICBhcnIuc2V0ID0gQlAuc2V0XG5cbiAgYXJyLndyaXRlID0gQlAud3JpdGVcbiAgYXJyLnRvU3RyaW5nID0gQlAudG9TdHJpbmdcbiAgYXJyLnRvTG9jYWxlU3RyaW5nID0gQlAudG9TdHJpbmdcbiAgYXJyLnRvSlNPTiA9IEJQLnRvSlNPTlxuICBhcnIuY29weSA9IEJQLmNvcHlcbiAgYXJyLnNsaWNlID0gQlAuc2xpY2VcbiAgYXJyLnJlYWRVSW50OCA9IEJQLnJlYWRVSW50OFxuICBhcnIucmVhZFVJbnQxNkxFID0gQlAucmVhZFVJbnQxNkxFXG4gIGFyci5yZWFkVUludDE2QkUgPSBCUC5yZWFkVUludDE2QkVcbiAgYXJyLnJlYWRVSW50MzJMRSA9IEJQLnJlYWRVSW50MzJMRVxuICBhcnIucmVhZFVJbnQzMkJFID0gQlAucmVhZFVJbnQzMkJFXG4gIGFyci5yZWFkSW50OCA9IEJQLnJlYWRJbnQ4XG4gIGFyci5yZWFkSW50MTZMRSA9IEJQLnJlYWRJbnQxNkxFXG4gIGFyci5yZWFkSW50MTZCRSA9IEJQLnJlYWRJbnQxNkJFXG4gIGFyci5yZWFkSW50MzJMRSA9IEJQLnJlYWRJbnQzMkxFXG4gIGFyci5yZWFkSW50MzJCRSA9IEJQLnJlYWRJbnQzMkJFXG4gIGFyci5yZWFkRmxvYXRMRSA9IEJQLnJlYWRGbG9hdExFXG4gIGFyci5yZWFkRmxvYXRCRSA9IEJQLnJlYWRGbG9hdEJFXG4gIGFyci5yZWFkRG91YmxlTEUgPSBCUC5yZWFkRG91YmxlTEVcbiAgYXJyLnJlYWREb3VibGVCRSA9IEJQLnJlYWREb3VibGVCRVxuICBhcnIud3JpdGVVSW50OCA9IEJQLndyaXRlVUludDhcbiAgYXJyLndyaXRlVUludDE2TEUgPSBCUC53cml0ZVVJbnQxNkxFXG4gIGFyci53cml0ZVVJbnQxNkJFID0gQlAud3JpdGVVSW50MTZCRVxuICBhcnIud3JpdGVVSW50MzJMRSA9IEJQLndyaXRlVUludDMyTEVcbiAgYXJyLndyaXRlVUludDMyQkUgPSBCUC53cml0ZVVJbnQzMkJFXG4gIGFyci53cml0ZUludDggPSBCUC53cml0ZUludDhcbiAgYXJyLndyaXRlSW50MTZMRSA9IEJQLndyaXRlSW50MTZMRVxuICBhcnIud3JpdGVJbnQxNkJFID0gQlAud3JpdGVJbnQxNkJFXG4gIGFyci53cml0ZUludDMyTEUgPSBCUC53cml0ZUludDMyTEVcbiAgYXJyLndyaXRlSW50MzJCRSA9IEJQLndyaXRlSW50MzJCRVxuICBhcnIud3JpdGVGbG9hdExFID0gQlAud3JpdGVGbG9hdExFXG4gIGFyci53cml0ZUZsb2F0QkUgPSBCUC53cml0ZUZsb2F0QkVcbiAgYXJyLndyaXRlRG91YmxlTEUgPSBCUC53cml0ZURvdWJsZUxFXG4gIGFyci53cml0ZURvdWJsZUJFID0gQlAud3JpdGVEb3VibGVCRVxuICBhcnIuZmlsbCA9IEJQLmZpbGxcbiAgYXJyLmluc3BlY3QgPSBCUC5pbnNwZWN0XG4gIGFyci50b0FycmF5QnVmZmVyID0gQlAudG9BcnJheUJ1ZmZlclxuXG4gIHJldHVybiBhcnJcbn1cblxuLy8gc2xpY2Uoc3RhcnQsIGVuZClcbmZ1bmN0aW9uIGNsYW1wIChpbmRleCwgbGVuLCBkZWZhdWx0VmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHJldHVybiBkZWZhdWx0VmFsdWVcbiAgaW5kZXggPSB+fmluZGV4OyAgLy8gQ29lcmNlIHRvIGludGVnZXIuXG4gIGlmIChpbmRleCA+PSBsZW4pIHJldHVybiBsZW5cbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleFxuICBpbmRleCArPSBsZW5cbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleFxuICByZXR1cm4gMFxufVxuXG5mdW5jdGlvbiBjb2VyY2UgKGxlbmd0aCkge1xuICAvLyBDb2VyY2UgbGVuZ3RoIHRvIGEgbnVtYmVyIChwb3NzaWJseSBOYU4pLCByb3VuZCB1cFxuICAvLyBpbiBjYXNlIGl0J3MgZnJhY3Rpb25hbCAoZS5nLiAxMjMuNDU2KSB0aGVuIGRvIGFcbiAgLy8gZG91YmxlIG5lZ2F0ZSB0byBjb2VyY2UgYSBOYU4gdG8gMC4gRWFzeSwgcmlnaHQ/XG4gIGxlbmd0aCA9IH5+TWF0aC5jZWlsKCtsZW5ndGgpXG4gIHJldHVybiBsZW5ndGggPCAwID8gMCA6IGxlbmd0aFxufVxuXG5mdW5jdGlvbiBpc0FycmF5IChzdWJqZWN0KSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoc3ViamVjdCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ViamVjdCkgPT09ICdbb2JqZWN0IEFycmF5XSdcbiAgfSkoc3ViamVjdClcbn1cblxuZnVuY3Rpb24gaXNBcnJheWlzaCAoc3ViamVjdCkge1xuICByZXR1cm4gaXNBcnJheShzdWJqZWN0KSB8fCBCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkgfHxcbiAgICAgIHN1YmplY3QgJiYgdHlwZW9mIHN1YmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICB0eXBlb2Ygc3ViamVjdC5sZW5ndGggPT09ICdudW1iZXInXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYiA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaWYgKGIgPD0gMHg3RilcbiAgICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHN0YXJ0ID0gaVxuICAgICAgaWYgKGIgPj0gMHhEODAwICYmIGIgPD0gMHhERkZGKSBpKytcbiAgICAgIHZhciBoID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0ci5zbGljZShzdGFydCwgaSsxKSkuc3Vic3RyKDEpLnNwbGl0KCclJylcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaC5sZW5ndGg7IGorKylcbiAgICAgICAgYnl0ZUFycmF5LnB1c2gocGFyc2VJbnQoaFtqXSwgMTYpKVxuICAgIH1cbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShzdHIpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgcG9zXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpXG4gICAgICBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGRlY29kZVV0ZjhDaGFyIChzdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKSAvLyBVVEYgOCBpbnZhbGlkIGNoYXJcbiAgfVxufVxuXG4vKlxuICogV2UgaGF2ZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgdmFsdWUgaXMgYSB2YWxpZCBpbnRlZ2VyLiBUaGlzIG1lYW5zIHRoYXQgaXRcbiAqIGlzIG5vbi1uZWdhdGl2ZS4gSXQgaGFzIG5vIGZyYWN0aW9uYWwgY29tcG9uZW50IGFuZCB0aGF0IGl0IGRvZXMgbm90XG4gKiBleGNlZWQgdGhlIG1heGltdW0gYWxsb3dlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gdmVyaWZ1aW50ICh2YWx1ZSwgbWF4KSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA+PSAwLCAnc3BlY2lmaWVkIGEgbmVnYXRpdmUgdmFsdWUgZm9yIHdyaXRpbmcgYW4gdW5zaWduZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgaXMgbGFyZ2VyIHRoYW4gbWF4aW11bSB2YWx1ZSBmb3IgdHlwZScpXG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpXG59XG5cbmZ1bmN0aW9uIHZlcmlmc2ludCAodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpXG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpXG59XG5cbmZ1bmN0aW9uIHZlcmlmSUVFRTc1NCAodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpXG59XG5cbmZ1bmN0aW9uIGFzc2VydCAodGVzdCwgbWVzc2FnZSkge1xuICBpZiAoIXRlc3QpIHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8ICdGYWlsZWQgYXNzZXJ0aW9uJylcbn1cbiIsInZhciBsb29rdXAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG4gIHZhciBBcnIgPSAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKVxuICAgID8gVWludDhBcnJheVxuICAgIDogQXJyYXlcblxuXHR2YXIgWkVSTyAgID0gJzAnLmNoYXJDb2RlQXQoMClcblx0dmFyIFBMVVMgICA9ICcrJy5jaGFyQ29kZUF0KDApXG5cdHZhciBTTEFTSCAgPSAnLycuY2hhckNvZGVBdCgwKVxuXHR2YXIgTlVNQkVSID0gJzAnLmNoYXJDb2RlQXQoMClcblx0dmFyIExPV0VSICA9ICdhJy5jaGFyQ29kZUF0KDApXG5cdHZhciBVUFBFUiAgPSAnQScuY2hhckNvZGVBdCgwKVxuXG5cdGZ1bmN0aW9uIGRlY29kZSAoZWx0KSB7XG5cdFx0dmFyIGNvZGUgPSBlbHQuY2hhckNvZGVBdCgwKVxuXHRcdGlmIChjb2RlID09PSBQTFVTKVxuXHRcdFx0cmV0dXJuIDYyIC8vICcrJ1xuXHRcdGlmIChjb2RlID09PSBTTEFTSClcblx0XHRcdHJldHVybiA2MyAvLyAnLydcblx0XHRpZiAoY29kZSA8IE5VTUJFUilcblx0XHRcdHJldHVybiAtMSAvL25vIG1hdGNoXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIgKyAxMClcblx0XHRcdHJldHVybiBjb2RlIC0gTlVNQkVSICsgMjYgKyAyNlxuXHRcdGlmIChjb2RlIDwgVVBQRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gVVBQRVJcblx0XHRpZiAoY29kZSA8IExPV0VSICsgMjYpXG5cdFx0XHRyZXR1cm4gY29kZSAtIExPV0VSICsgMjZcblx0fVxuXG5cdGZ1bmN0aW9uIGI2NFRvQnl0ZUFycmF5IChiNjQpIHtcblx0XHR2YXIgaSwgaiwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuXG5cdFx0aWYgKGI2NC5sZW5ndGggJSA0ID4gMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0Jylcblx0XHR9XG5cblx0XHQvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuXHRcdC8vIGlmIHRoZXJlIGFyZSB0d28gcGxhY2Vob2xkZXJzLCB0aGFuIHRoZSB0d28gY2hhcmFjdGVycyBiZWZvcmUgaXRcblx0XHQvLyByZXByZXNlbnQgb25lIGJ5dGVcblx0XHQvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcblx0XHQvLyB0aGlzIGlzIGp1c3QgYSBjaGVhcCBoYWNrIHRvIG5vdCBkbyBpbmRleE9mIHR3aWNlXG5cdFx0dmFyIGxlbiA9IGI2NC5sZW5ndGhcblx0XHRwbGFjZUhvbGRlcnMgPSAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMikgPyAyIDogJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDEpID8gMSA6IDBcblxuXHRcdC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuXHRcdGFyciA9IG5ldyBBcnIoYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuXHRcdGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gYjY0Lmxlbmd0aCAtIDQgOiBiNjQubGVuZ3RoXG5cblx0XHR2YXIgTCA9IDBcblxuXHRcdGZ1bmN0aW9uIHB1c2ggKHYpIHtcblx0XHRcdGFycltMKytdID0gdlxuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGogPSAwOyBpIDwgbDsgaSArPSA0LCBqICs9IDMpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTgpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgMTIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPDwgNikgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMykpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDAwMCkgPj4gMTYpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDApID4+IDgpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fVxuXG5cdFx0aWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAyKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpID4+IDQpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTApIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgNCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA+PiAyKVxuXHRcdFx0cHVzaCgodG1wID4+IDgpICYgMHhGRilcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyXG5cdH1cblxuXHRmdW5jdGlvbiB1aW50OFRvQmFzZTY0ICh1aW50OCkge1xuXHRcdHZhciBpLFxuXHRcdFx0ZXh0cmFCeXRlcyA9IHVpbnQ4Lmxlbmd0aCAlIDMsIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG5cdFx0XHRvdXRwdXQgPSBcIlwiLFxuXHRcdFx0dGVtcCwgbGVuZ3RoXG5cblx0XHRmdW5jdGlvbiBlbmNvZGUgKG51bSkge1xuXHRcdFx0cmV0dXJuIGxvb2t1cC5jaGFyQXQobnVtKVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKG51bSA+PiAxOCAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiAxMiAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiA2ICYgMHgzRikgKyBlbmNvZGUobnVtICYgMHgzRilcblx0XHR9XG5cblx0XHQvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG5cdFx0Zm9yIChpID0gMCwgbGVuZ3RoID0gdWludDgubGVuZ3RoIC0gZXh0cmFCeXRlczsgaSA8IGxlbmd0aDsgaSArPSAzKSB7XG5cdFx0XHR0ZW1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuXHRcdFx0b3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCh0ZW1wKVxuXHRcdH1cblxuXHRcdC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcblx0XHRzd2l0Y2ggKGV4dHJhQnl0ZXMpIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0dGVtcCA9IHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAyKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9PSdcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0dGVtcCA9ICh1aW50OFt1aW50OC5sZW5ndGggLSAyXSA8PCA4KSArICh1aW50OFt1aW50OC5sZW5ndGggLSAxXSlcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDEwKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wID4+IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA8PCAyKSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSAnPSdcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cy50b0J5dGVBcnJheSA9IGI2NFRvQnl0ZUFycmF5XG5cdG1vZHVsZS5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSB1aW50OFRvQmFzZTY0XG59KCkpXG4iLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbihidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLFxuICAgICAgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMSxcbiAgICAgIGVNYXggPSAoMSA8PCBlTGVuKSAtIDEsXG4gICAgICBlQmlhcyA9IGVNYXggPj4gMSxcbiAgICAgIG5CaXRzID0gLTcsXG4gICAgICBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDAsXG4gICAgICBkID0gaXNMRSA/IC0xIDogMSxcbiAgICAgIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV07XG5cbiAgaSArPSBkO1xuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpO1xuICBzID4+PSAoLW5CaXRzKTtcbiAgbkJpdHMgKz0gZUxlbjtcbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCk7XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSk7XG4gIGUgPj49ICgtbkJpdHMpO1xuICBuQml0cyArPSBtTGVuO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KTtcblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXM7XG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KTtcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pO1xuICAgIGUgPSBlIC0gZUJpYXM7XG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbik7XG59O1xuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24oYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGMsXG4gICAgICBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxLFxuICAgICAgZU1heCA9ICgxIDw8IGVMZW4pIC0gMSxcbiAgICAgIGVCaWFzID0gZU1heCA+PiAxLFxuICAgICAgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApLFxuICAgICAgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpLFxuICAgICAgZCA9IGlzTEUgPyAxIDogLTEsXG4gICAgICBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwO1xuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpO1xuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwO1xuICAgIGUgPSBlTWF4O1xuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKTtcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS07XG4gICAgICBjICo9IDI7XG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcyk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrO1xuICAgICAgYyAvPSAyO1xuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDA7XG4gICAgICBlID0gZU1heDtcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbik7XG4gICAgICBlID0gZSArIGVCaWFzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbik7XG4gICAgICBlID0gMDtcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KTtcblxuICBlID0gKGUgPDwgbUxlbikgfCBtO1xuICBlTGVuICs9IG1MZW47XG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCk7XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4O1xufTtcbiIsInZhciBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXI7XG52YXIgaW50U2l6ZSA9IDQ7XG52YXIgemVyb0J1ZmZlciA9IG5ldyBCdWZmZXIoaW50U2l6ZSk7IHplcm9CdWZmZXIuZmlsbCgwKTtcbnZhciBjaHJzeiA9IDg7XG5cbmZ1bmN0aW9uIHRvQXJyYXkoYnVmLCBiaWdFbmRpYW4pIHtcbiAgaWYgKChidWYubGVuZ3RoICUgaW50U2l6ZSkgIT09IDApIHtcbiAgICB2YXIgbGVuID0gYnVmLmxlbmd0aCArIChpbnRTaXplIC0gKGJ1Zi5sZW5ndGggJSBpbnRTaXplKSk7XG4gICAgYnVmID0gQnVmZmVyLmNvbmNhdChbYnVmLCB6ZXJvQnVmZmVyXSwgbGVuKTtcbiAgfVxuXG4gIHZhciBhcnIgPSBbXTtcbiAgdmFyIGZuID0gYmlnRW5kaWFuID8gYnVmLnJlYWRJbnQzMkJFIDogYnVmLnJlYWRJbnQzMkxFO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1Zi5sZW5ndGg7IGkgKz0gaW50U2l6ZSkge1xuICAgIGFyci5wdXNoKGZuLmNhbGwoYnVmLCBpKSk7XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gdG9CdWZmZXIoYXJyLCBzaXplLCBiaWdFbmRpYW4pIHtcbiAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIoc2l6ZSk7XG4gIHZhciBmbiA9IGJpZ0VuZGlhbiA/IGJ1Zi53cml0ZUludDMyQkUgOiBidWYud3JpdGVJbnQzMkxFO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGZuLmNhbGwoYnVmLCBhcnJbaV0sIGkgKiA0LCB0cnVlKTtcbiAgfVxuICByZXR1cm4gYnVmO1xufVxuXG5mdW5jdGlvbiBoYXNoKGJ1ZiwgZm4sIGhhc2hTaXplLCBiaWdFbmRpYW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgYnVmID0gbmV3IEJ1ZmZlcihidWYpO1xuICB2YXIgYXJyID0gZm4odG9BcnJheShidWYsIGJpZ0VuZGlhbiksIGJ1Zi5sZW5ndGggKiBjaHJzeik7XG4gIHJldHVybiB0b0J1ZmZlcihhcnIsIGhhc2hTaXplLCBiaWdFbmRpYW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgaGFzaDogaGFzaCB9O1xuIiwidmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlclxudmFyIHNoYSA9IHJlcXVpcmUoJy4vc2hhJylcbnZhciBzaGEyNTYgPSByZXF1aXJlKCcuL3NoYTI1NicpXG52YXIgcm5nID0gcmVxdWlyZSgnLi9ybmcnKVxudmFyIG1kNSA9IHJlcXVpcmUoJy4vbWQ1JylcblxudmFyIGFsZ29yaXRobXMgPSB7XG4gIHNoYTE6IHNoYSxcbiAgc2hhMjU2OiBzaGEyNTYsXG4gIG1kNTogbWQ1XG59XG5cbnZhciBibG9ja3NpemUgPSA2NFxudmFyIHplcm9CdWZmZXIgPSBuZXcgQnVmZmVyKGJsb2Nrc2l6ZSk7IHplcm9CdWZmZXIuZmlsbCgwKVxuZnVuY3Rpb24gaG1hYyhmbiwga2V5LCBkYXRhKSB7XG4gIGlmKCFCdWZmZXIuaXNCdWZmZXIoa2V5KSkga2V5ID0gbmV3IEJ1ZmZlcihrZXkpXG4gIGlmKCFCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIGRhdGEgPSBuZXcgQnVmZmVyKGRhdGEpXG5cbiAgaWYoa2V5Lmxlbmd0aCA+IGJsb2Nrc2l6ZSkge1xuICAgIGtleSA9IGZuKGtleSlcbiAgfSBlbHNlIGlmKGtleS5sZW5ndGggPCBibG9ja3NpemUpIHtcbiAgICBrZXkgPSBCdWZmZXIuY29uY2F0KFtrZXksIHplcm9CdWZmZXJdLCBibG9ja3NpemUpXG4gIH1cblxuICB2YXIgaXBhZCA9IG5ldyBCdWZmZXIoYmxvY2tzaXplKSwgb3BhZCA9IG5ldyBCdWZmZXIoYmxvY2tzaXplKVxuICBmb3IodmFyIGkgPSAwOyBpIDwgYmxvY2tzaXplOyBpKyspIHtcbiAgICBpcGFkW2ldID0ga2V5W2ldIF4gMHgzNlxuICAgIG9wYWRbaV0gPSBrZXlbaV0gXiAweDVDXG4gIH1cblxuICB2YXIgaGFzaCA9IGZuKEJ1ZmZlci5jb25jYXQoW2lwYWQsIGRhdGFdKSlcbiAgcmV0dXJuIGZuKEJ1ZmZlci5jb25jYXQoW29wYWQsIGhhc2hdKSlcbn1cblxuZnVuY3Rpb24gaGFzaChhbGcsIGtleSkge1xuICBhbGcgPSBhbGcgfHwgJ3NoYTEnXG4gIHZhciBmbiA9IGFsZ29yaXRobXNbYWxnXVxuICB2YXIgYnVmcyA9IFtdXG4gIHZhciBsZW5ndGggPSAwXG4gIGlmKCFmbikgZXJyb3IoJ2FsZ29yaXRobTonLCBhbGcsICdpcyBub3QgeWV0IHN1cHBvcnRlZCcpXG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgaWYoIUJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkgZGF0YSA9IG5ldyBCdWZmZXIoZGF0YSlcbiAgICAgICAgXG4gICAgICBidWZzLnB1c2goZGF0YSlcbiAgICAgIGxlbmd0aCArPSBkYXRhLmxlbmd0aFxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuICAgIGRpZ2VzdDogZnVuY3Rpb24gKGVuYykge1xuICAgICAgdmFyIGJ1ZiA9IEJ1ZmZlci5jb25jYXQoYnVmcylcbiAgICAgIHZhciByID0ga2V5ID8gaG1hYyhmbiwga2V5LCBidWYpIDogZm4oYnVmKVxuICAgICAgYnVmcyA9IG51bGxcbiAgICAgIHJldHVybiBlbmMgPyByLnRvU3RyaW5nKGVuYykgOiByXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGVycm9yICgpIHtcbiAgdmFyIG0gPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykuam9pbignICcpXG4gIHRocm93IG5ldyBFcnJvcihbXG4gICAgbSxcbiAgICAnd2UgYWNjZXB0IHB1bGwgcmVxdWVzdHMnLFxuICAgICdodHRwOi8vZ2l0aHViLmNvbS9kb21pbmljdGFyci9jcnlwdG8tYnJvd3NlcmlmeSdcbiAgICBdLmpvaW4oJ1xcbicpKVxufVxuXG5leHBvcnRzLmNyZWF0ZUhhc2ggPSBmdW5jdGlvbiAoYWxnKSB7IHJldHVybiBoYXNoKGFsZykgfVxuZXhwb3J0cy5jcmVhdGVIbWFjID0gZnVuY3Rpb24gKGFsZywga2V5KSB7IHJldHVybiBoYXNoKGFsZywga2V5KSB9XG5leHBvcnRzLnJhbmRvbUJ5dGVzID0gZnVuY3Rpb24oc2l6ZSwgY2FsbGJhY2spIHtcbiAgaWYgKGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwpIHtcbiAgICB0cnkge1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCB1bmRlZmluZWQsIG5ldyBCdWZmZXIocm5nKHNpemUpKSlcbiAgICB9IGNhdGNoIChlcnIpIHsgY2FsbGJhY2soZXJyKSB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIocm5nKHNpemUpKVxuICB9XG59XG5cbmZ1bmN0aW9uIGVhY2goYSwgZikge1xuICBmb3IodmFyIGkgaW4gYSlcbiAgICBmKGFbaV0sIGkpXG59XG5cbi8vIHRoZSBsZWFzdCBJIGNhbiBkbyBpcyBtYWtlIGVycm9yIG1lc3NhZ2VzIGZvciB0aGUgcmVzdCBvZiB0aGUgbm9kZS5qcy9jcnlwdG8gYXBpLlxuZWFjaChbJ2NyZWF0ZUNyZWRlbnRpYWxzJ1xuLCAnY3JlYXRlQ2lwaGVyJ1xuLCAnY3JlYXRlQ2lwaGVyaXYnXG4sICdjcmVhdGVEZWNpcGhlcidcbiwgJ2NyZWF0ZURlY2lwaGVyaXYnXG4sICdjcmVhdGVTaWduJ1xuLCAnY3JlYXRlVmVyaWZ5J1xuLCAnY3JlYXRlRGlmZmllSGVsbG1hbidcbiwgJ3Bia2RmMiddLCBmdW5jdGlvbiAobmFtZSkge1xuICBleHBvcnRzW25hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgIGVycm9yKCdzb3JyeSwnLCBuYW1lLCAnaXMgbm90IGltcGxlbWVudGVkIHlldCcpXG4gIH1cbn0pXG4iLCIvKlxyXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFJTQSBEYXRhIFNlY3VyaXR5LCBJbmMuIE1ENSBNZXNzYWdlXHJcbiAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuXHJcbiAqIFZlcnNpb24gMi4xIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwMi5cclxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxyXG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcclxuICogU2VlIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDUgZm9yIG1vcmUgaW5mby5cclxuICovXHJcblxyXG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xyXG5cclxuLypcclxuICogUGVyZm9ybSBhIHNpbXBsZSBzZWxmLXRlc3QgdG8gc2VlIGlmIHRoZSBWTSBpcyB3b3JraW5nXHJcbiAqL1xyXG5mdW5jdGlvbiBtZDVfdm1fdGVzdCgpXHJcbntcclxuICByZXR1cm4gaGV4X21kNShcImFiY1wiKSA9PSBcIjkwMDE1MDk4M2NkMjRmYjBkNjk2M2Y3ZDI4ZTE3ZjcyXCI7XHJcbn1cclxuXHJcbi8qXHJcbiAqIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGhcclxuICovXHJcbmZ1bmN0aW9uIGNvcmVfbWQ1KHgsIGxlbilcclxue1xyXG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXHJcbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCAoKGxlbikgJSAzMik7XHJcbiAgeFsoKChsZW4gKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gbGVuO1xyXG5cclxuICB2YXIgYSA9ICAxNzMyNTg0MTkzO1xyXG4gIHZhciBiID0gLTI3MTczMzg3OTtcclxuICB2YXIgYyA9IC0xNzMyNTg0MTk0O1xyXG4gIHZhciBkID0gIDI3MTczMzg3ODtcclxuXHJcbiAgZm9yKHZhciBpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KVxyXG4gIHtcclxuICAgIHZhciBvbGRhID0gYTtcclxuICAgIHZhciBvbGRiID0gYjtcclxuICAgIHZhciBvbGRjID0gYztcclxuICAgIHZhciBvbGRkID0gZDtcclxuXHJcbiAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSsgMF0sIDcgLCAtNjgwODc2OTM2KTtcclxuICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xyXG4gICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2krIDJdLCAxNywgIDYwNjEwNTgxOSk7XHJcbiAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSsgM10sIDIyLCAtMTA0NDUyNTMzMCk7XHJcbiAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSsgNF0sIDcgLCAtMTc2NDE4ODk3KTtcclxuICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpKyA1XSwgMTIsICAxMjAwMDgwNDI2KTtcclxuICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpKyA2XSwgMTcsIC0xNDczMjMxMzQxKTtcclxuICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpKyA3XSwgMjIsIC00NTcwNTk4Myk7XHJcbiAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSsgOF0sIDcgLCAgMTc3MDAzNTQxNik7XHJcbiAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSsgOV0sIDEyLCAtMTk1ODQxNDQxNyk7XHJcbiAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSsxMF0sIDE3LCAtNDIwNjMpO1xyXG4gICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2krMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xyXG4gICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2krMTJdLCA3ICwgIDE4MDQ2MDM2ODIpO1xyXG4gICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2krMTNdLCAxMiwgLTQwMzQxMTAxKTtcclxuICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpKzE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcclxuICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpKzE1XSwgMjIsICAxMjM2NTM1MzI5KTtcclxuXHJcbiAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSsgMV0sIDUgLCAtMTY1Nzk2NTEwKTtcclxuICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpKyA2XSwgOSAsIC0xMDY5NTAxNjMyKTtcclxuICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpKzExXSwgMTQsICA2NDM3MTc3MTMpO1xyXG4gICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2krIDBdLCAyMCwgLTM3Mzg5NzMwMik7XHJcbiAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSsgNV0sIDUgLCAtNzAxNTU4NjkxKTtcclxuICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpKzEwXSwgOSAsICAzODAxNjA4Myk7XHJcbiAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSsxNV0sIDE0LCAtNjYwNDc4MzM1KTtcclxuICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpKyA0XSwgMjAsIC00MDU1Mzc4NDgpO1xyXG4gICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2krIDldLCA1ICwgIDU2ODQ0NjQzOCk7XHJcbiAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSsxNF0sIDkgLCAtMTAxOTgwMzY5MCk7XHJcbiAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSsgM10sIDE0LCAtMTg3MzYzOTYxKTtcclxuICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpKyA4XSwgMjAsICAxMTYzNTMxNTAxKTtcclxuICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpKzEzXSwgNSAsIC0xNDQ0NjgxNDY3KTtcclxuICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpKyAyXSwgOSAsIC01MTQwMzc4NCk7XHJcbiAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSsgN10sIDE0LCAgMTczNTMyODQ3Myk7XHJcbiAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSsxMl0sIDIwLCAtMTkyNjYwNzczNCk7XHJcblxyXG4gICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2krIDVdLCA0ICwgLTM3ODU1OCk7XHJcbiAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSsgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XHJcbiAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSsxMV0sIDE2LCAgMTgzOTAzMDU2Mik7XHJcbiAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSsxNF0sIDIzLCAtMzUzMDk1NTYpO1xyXG4gICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2krIDFdLCA0ICwgLTE1MzA5OTIwNjApO1xyXG4gICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2krIDRdLCAxMSwgIDEyNzI4OTMzNTMpO1xyXG4gICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2krIDddLCAxNiwgLTE1NTQ5NzYzMik7XHJcbiAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSsxMF0sIDIzLCAtMTA5NDczMDY0MCk7XHJcbiAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSsxM10sIDQgLCAgNjgxMjc5MTc0KTtcclxuICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpKyAwXSwgMTEsIC0zNTg1MzcyMjIpO1xyXG4gICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2krIDNdLCAxNiwgLTcyMjUyMTk3OSk7XHJcbiAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSsgNl0sIDIzLCAgNzYwMjkxODkpO1xyXG4gICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2krIDldLCA0ICwgLTY0MDM2NDQ4Nyk7XHJcbiAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSsxMl0sIDExLCAtNDIxODE1ODM1KTtcclxuICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpKzE1XSwgMTYsICA1MzA3NDI1MjApO1xyXG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krIDJdLCAyMywgLTk5NTMzODY1MSk7XHJcblxyXG4gICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2krIDBdLCA2ICwgLTE5ODYzMDg0NCk7XHJcbiAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSsgN10sIDEwLCAgMTEyNjg5MTQxNSk7XHJcbiAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSsxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XHJcbiAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSsgNV0sIDIxLCAtNTc0MzQwNTUpO1xyXG4gICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2krMTJdLCA2ICwgIDE3MDA0ODU1NzEpO1xyXG4gICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2krIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xyXG4gICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2krMTBdLCAxNSwgLTEwNTE1MjMpO1xyXG4gICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2krIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xyXG4gICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2krIDhdLCA2ICwgIDE4NzMzMTMzNTkpO1xyXG4gICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2krMTVdLCAxMCwgLTMwNjExNzQ0KTtcclxuICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcclxuICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpKzEzXSwgMjEsICAxMzA5MTUxNjQ5KTtcclxuICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpKyA0XSwgNiAsIC0xNDU1MjMwNzApO1xyXG4gICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2krMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xyXG4gICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2krIDJdLCAxNSwgIDcxODc4NzI1OSk7XHJcbiAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSsgOV0sIDIxLCAtMzQzNDg1NTUxKTtcclxuXHJcbiAgICBhID0gc2FmZV9hZGQoYSwgb2xkYSk7XHJcbiAgICBiID0gc2FmZV9hZGQoYiwgb2xkYik7XHJcbiAgICBjID0gc2FmZV9hZGQoYywgb2xkYyk7XHJcbiAgICBkID0gc2FmZV9hZGQoZCwgb2xkZCk7XHJcbiAgfVxyXG4gIHJldHVybiBBcnJheShhLCBiLCBjLCBkKTtcclxuXHJcbn1cclxuXHJcbi8qXHJcbiAqIFRoZXNlIGZ1bmN0aW9ucyBpbXBsZW1lbnQgdGhlIGZvdXIgYmFzaWMgb3BlcmF0aW9ucyB0aGUgYWxnb3JpdGhtIHVzZXMuXHJcbiAqL1xyXG5mdW5jdGlvbiBtZDVfY21uKHEsIGEsIGIsIHgsIHMsIHQpXHJcbntcclxuICByZXR1cm4gc2FmZV9hZGQoYml0X3JvbChzYWZlX2FkZChzYWZlX2FkZChhLCBxKSwgc2FmZV9hZGQoeCwgdCkpLCBzKSxiKTtcclxufVxyXG5mdW5jdGlvbiBtZDVfZmYoYSwgYiwgYywgZCwgeCwgcywgdClcclxue1xyXG4gIHJldHVybiBtZDVfY21uKChiICYgYykgfCAoKH5iKSAmIGQpLCBhLCBiLCB4LCBzLCB0KTtcclxufVxyXG5mdW5jdGlvbiBtZDVfZ2coYSwgYiwgYywgZCwgeCwgcywgdClcclxue1xyXG4gIHJldHVybiBtZDVfY21uKChiICYgZCkgfCAoYyAmICh+ZCkpLCBhLCBiLCB4LCBzLCB0KTtcclxufVxyXG5mdW5jdGlvbiBtZDVfaGgoYSwgYiwgYywgZCwgeCwgcywgdClcclxue1xyXG4gIHJldHVybiBtZDVfY21uKGIgXiBjIF4gZCwgYSwgYiwgeCwgcywgdCk7XHJcbn1cclxuZnVuY3Rpb24gbWQ1X2lpKGEsIGIsIGMsIGQsIHgsIHMsIHQpXHJcbntcclxuICByZXR1cm4gbWQ1X2NtbihjIF4gKGIgfCAofmQpKSwgYSwgYiwgeCwgcywgdCk7XHJcbn1cclxuXHJcbi8qXHJcbiAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcclxuICogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cclxuICovXHJcbmZ1bmN0aW9uIHNhZmVfYWRkKHgsIHkpXHJcbntcclxuICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpO1xyXG4gIHZhciBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcclxuICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhGRkZGKTtcclxufVxyXG5cclxuLypcclxuICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxyXG4gKi9cclxuZnVuY3Rpb24gYml0X3JvbChudW0sIGNudClcclxue1xyXG4gIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZDUoYnVmKSB7XHJcbiAgcmV0dXJuIGhlbHBlcnMuaGFzaChidWYsIGNvcmVfbWQ1LCAxNik7XHJcbn07XHJcbiIsIi8vIE9yaWdpbmFsIGNvZGUgYWRhcHRlZCBmcm9tIFJvYmVydCBLaWVmZmVyLlxuLy8gZGV0YWlscyBhdCBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZFxuKGZ1bmN0aW9uKCkge1xuICB2YXIgX2dsb2JhbCA9IHRoaXM7XG5cbiAgdmFyIG1hdGhSTkcsIHdoYXR3Z1JORztcblxuICAvLyBOT1RFOiBNYXRoLnJhbmRvbSgpIGRvZXMgbm90IGd1YXJhbnRlZSBcImNyeXB0b2dyYXBoaWMgcXVhbGl0eVwiXG4gIG1hdGhSTkcgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IEFycmF5KHNpemUpO1xuICAgIHZhciByO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBieXRlc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gYnl0ZXM7XG4gIH1cblxuICBpZiAoX2dsb2JhbC5jcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgIHdoYXR3Z1JORyA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xuICAgICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhieXRlcyk7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfVxuICB9XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSB3aGF0d2dSTkcgfHwgbWF0aFJORztcblxufSgpKVxuIiwiLypcbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgU2VjdXJlIEhhc2ggQWxnb3JpdGhtLCBTSEEtMSwgYXMgZGVmaW5lZFxuICogaW4gRklQUyBQVUIgMTgwLTFcbiAqIFZlcnNpb24gMi4xYSBDb3B5cmlnaHQgUGF1bCBKb2huc3RvbiAyMDAwIC0gMjAwMi5cbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxuICogU2VlIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDUgZm9yIGRldGFpbHMuXG4gKi9cblxudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxuLypcbiAqIENhbGN1bGF0ZSB0aGUgU0hBLTEgb2YgYW4gYXJyYXkgb2YgYmlnLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aFxuICovXG5mdW5jdGlvbiBjb3JlX3NoYTEoeCwgbGVuKVxue1xuICAvKiBhcHBlbmQgcGFkZGluZyAqL1xuICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8ICgyNCAtIGxlbiAlIDMyKTtcbiAgeFsoKGxlbiArIDY0ID4+IDkpIDw8IDQpICsgMTVdID0gbGVuO1xuXG4gIHZhciB3ID0gQXJyYXkoODApO1xuICB2YXIgYSA9ICAxNzMyNTg0MTkzO1xuICB2YXIgYiA9IC0yNzE3MzM4Nzk7XG4gIHZhciBjID0gLTE3MzI1ODQxOTQ7XG4gIHZhciBkID0gIDI3MTczMzg3ODtcbiAgdmFyIGUgPSAtMTAwOTU4OTc3NjtcblxuICBmb3IodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpXG4gIHtcbiAgICB2YXIgb2xkYSA9IGE7XG4gICAgdmFyIG9sZGIgPSBiO1xuICAgIHZhciBvbGRjID0gYztcbiAgICB2YXIgb2xkZCA9IGQ7XG4gICAgdmFyIG9sZGUgPSBlO1xuXG4gICAgZm9yKHZhciBqID0gMDsgaiA8IDgwOyBqKyspXG4gICAge1xuICAgICAgaWYoaiA8IDE2KSB3W2pdID0geFtpICsgal07XG4gICAgICBlbHNlIHdbal0gPSByb2wod1tqLTNdIF4gd1tqLThdIF4gd1tqLTE0XSBeIHdbai0xNl0sIDEpO1xuICAgICAgdmFyIHQgPSBzYWZlX2FkZChzYWZlX2FkZChyb2woYSwgNSksIHNoYTFfZnQoaiwgYiwgYywgZCkpLFxuICAgICAgICAgICAgICAgICAgICAgICBzYWZlX2FkZChzYWZlX2FkZChlLCB3W2pdKSwgc2hhMV9rdChqKSkpO1xuICAgICAgZSA9IGQ7XG4gICAgICBkID0gYztcbiAgICAgIGMgPSByb2woYiwgMzApO1xuICAgICAgYiA9IGE7XG4gICAgICBhID0gdDtcbiAgICB9XG5cbiAgICBhID0gc2FmZV9hZGQoYSwgb2xkYSk7XG4gICAgYiA9IHNhZmVfYWRkKGIsIG9sZGIpO1xuICAgIGMgPSBzYWZlX2FkZChjLCBvbGRjKTtcbiAgICBkID0gc2FmZV9hZGQoZCwgb2xkZCk7XG4gICAgZSA9IHNhZmVfYWRkKGUsIG9sZGUpO1xuICB9XG4gIHJldHVybiBBcnJheShhLCBiLCBjLCBkLCBlKTtcblxufVxuXG4vKlxuICogUGVyZm9ybSB0aGUgYXBwcm9wcmlhdGUgdHJpcGxldCBjb21iaW5hdGlvbiBmdW5jdGlvbiBmb3IgdGhlIGN1cnJlbnRcbiAqIGl0ZXJhdGlvblxuICovXG5mdW5jdGlvbiBzaGExX2Z0KHQsIGIsIGMsIGQpXG57XG4gIGlmKHQgPCAyMCkgcmV0dXJuIChiICYgYykgfCAoKH5iKSAmIGQpO1xuICBpZih0IDwgNDApIHJldHVybiBiIF4gYyBeIGQ7XG4gIGlmKHQgPCA2MCkgcmV0dXJuIChiICYgYykgfCAoYiAmIGQpIHwgKGMgJiBkKTtcbiAgcmV0dXJuIGIgXiBjIF4gZDtcbn1cblxuLypcbiAqIERldGVybWluZSB0aGUgYXBwcm9wcmlhdGUgYWRkaXRpdmUgY29uc3RhbnQgZm9yIHRoZSBjdXJyZW50IGl0ZXJhdGlvblxuICovXG5mdW5jdGlvbiBzaGExX2t0KHQpXG57XG4gIHJldHVybiAodCA8IDIwKSA/ICAxNTE4NTAwMjQ5IDogKHQgPCA0MCkgPyAgMTg1OTc3NTM5MyA6XG4gICAgICAgICAodCA8IDYwKSA/IC0xODk0MDA3NTg4IDogLTg5OTQ5NzUxNDtcbn1cblxuLypcbiAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gKi9cbmZ1bmN0aW9uIHNhZmVfYWRkKHgsIHkpXG57XG4gIHZhciBsc3cgPSAoeCAmIDB4RkZGRikgKyAoeSAmIDB4RkZGRik7XG4gIHZhciBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgcmV0dXJuIChtc3cgPDwgMTYpIHwgKGxzdyAmIDB4RkZGRik7XG59XG5cbi8qXG4gKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXG4gKi9cbmZ1bmN0aW9uIHJvbChudW0sIGNudClcbntcbiAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNoYTEoYnVmKSB7XG4gIHJldHVybiBoZWxwZXJzLmhhc2goYnVmLCBjb3JlX3NoYTEsIDIwLCB0cnVlKTtcbn07XG4iLCJcbi8qKlxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBTZWN1cmUgSGFzaCBBbGdvcml0aG0sIFNIQS0yNTYsIGFzIGRlZmluZWRcbiAqIGluIEZJUFMgMTgwLTJcbiAqIFZlcnNpb24gMi4yLWJldGEgQ29weXJpZ2h0IEFuZ2VsIE1hcmluLCBQYXVsIEpvaG5zdG9uIDIwMDAgLSAyMDA5LlxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICpcbiAqL1xuXG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG52YXIgc2FmZV9hZGQgPSBmdW5jdGlvbih4LCB5KSB7XG4gIHZhciBsc3cgPSAoeCAmIDB4RkZGRikgKyAoeSAmIDB4RkZGRik7XG4gIHZhciBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgcmV0dXJuIChtc3cgPDwgMTYpIHwgKGxzdyAmIDB4RkZGRik7XG59O1xuXG52YXIgUyA9IGZ1bmN0aW9uKFgsIG4pIHtcbiAgcmV0dXJuIChYID4+PiBuKSB8IChYIDw8ICgzMiAtIG4pKTtcbn07XG5cbnZhciBSID0gZnVuY3Rpb24oWCwgbikge1xuICByZXR1cm4gKFggPj4+IG4pO1xufTtcblxudmFyIENoID0gZnVuY3Rpb24oeCwgeSwgeikge1xuICByZXR1cm4gKCh4ICYgeSkgXiAoKH54KSAmIHopKTtcbn07XG5cbnZhciBNYWogPSBmdW5jdGlvbih4LCB5LCB6KSB7XG4gIHJldHVybiAoKHggJiB5KSBeICh4ICYgeikgXiAoeSAmIHopKTtcbn07XG5cbnZhciBTaWdtYTAyNTYgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAoUyh4LCAyKSBeIFMoeCwgMTMpIF4gUyh4LCAyMikpO1xufTtcblxudmFyIFNpZ21hMTI1NiA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIChTKHgsIDYpIF4gUyh4LCAxMSkgXiBTKHgsIDI1KSk7XG59O1xuXG52YXIgR2FtbWEwMjU2ID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gKFMoeCwgNykgXiBTKHgsIDE4KSBeIFIoeCwgMykpO1xufTtcblxudmFyIEdhbW1hMTI1NiA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIChTKHgsIDE3KSBeIFMoeCwgMTkpIF4gUih4LCAxMCkpO1xufTtcblxudmFyIGNvcmVfc2hhMjU2ID0gZnVuY3Rpb24obSwgbCkge1xuICB2YXIgSyA9IG5ldyBBcnJheSgweDQyOEEyRjk4LDB4NzEzNzQ0OTEsMHhCNUMwRkJDRiwweEU5QjVEQkE1LDB4Mzk1NkMyNUIsMHg1OUYxMTFGMSwweDkyM0Y4MkE0LDB4QUIxQzVFRDUsMHhEODA3QUE5OCwweDEyODM1QjAxLDB4MjQzMTg1QkUsMHg1NTBDN0RDMywweDcyQkU1RDc0LDB4ODBERUIxRkUsMHg5QkRDMDZBNywweEMxOUJGMTc0LDB4RTQ5QjY5QzEsMHhFRkJFNDc4NiwweEZDMTlEQzYsMHgyNDBDQTFDQywweDJERTkyQzZGLDB4NEE3NDg0QUEsMHg1Q0IwQTlEQywweDc2Rjk4OERBLDB4OTgzRTUxNTIsMHhBODMxQzY2RCwweEIwMDMyN0M4LDB4QkY1OTdGQzcsMHhDNkUwMEJGMywweEQ1QTc5MTQ3LDB4NkNBNjM1MSwweDE0MjkyOTY3LDB4MjdCNzBBODUsMHgyRTFCMjEzOCwweDREMkM2REZDLDB4NTMzODBEMTMsMHg2NTBBNzM1NCwweDc2NkEwQUJCLDB4ODFDMkM5MkUsMHg5MjcyMkM4NSwweEEyQkZFOEExLDB4QTgxQTY2NEIsMHhDMjRCOEI3MCwweEM3NkM1MUEzLDB4RDE5MkU4MTksMHhENjk5MDYyNCwweEY0MEUzNTg1LDB4MTA2QUEwNzAsMHgxOUE0QzExNiwweDFFMzc2QzA4LDB4Mjc0ODc3NEMsMHgzNEIwQkNCNSwweDM5MUMwQ0IzLDB4NEVEOEFBNEEsMHg1QjlDQ0E0RiwweDY4MkU2RkYzLDB4NzQ4RjgyRUUsMHg3OEE1NjM2RiwweDg0Qzg3ODE0LDB4OENDNzAyMDgsMHg5MEJFRkZGQSwweEE0NTA2Q0VCLDB4QkVGOUEzRjcsMHhDNjcxNzhGMik7XG4gIHZhciBIQVNIID0gbmV3IEFycmF5KDB4NkEwOUU2NjcsIDB4QkI2N0FFODUsIDB4M0M2RUYzNzIsIDB4QTU0RkY1M0EsIDB4NTEwRTUyN0YsIDB4OUIwNTY4OEMsIDB4MUY4M0Q5QUIsIDB4NUJFMENEMTkpO1xuICAgIHZhciBXID0gbmV3IEFycmF5KDY0KTtcbiAgICB2YXIgYSwgYiwgYywgZCwgZSwgZiwgZywgaCwgaSwgajtcbiAgICB2YXIgVDEsIFQyO1xuICAvKiBhcHBlbmQgcGFkZGluZyAqL1xuICBtW2wgPj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBsICUgMzIpO1xuICBtWygobCArIDY0ID4+IDkpIDw8IDQpICsgMTVdID0gbDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSArPSAxNikge1xuICAgIGEgPSBIQVNIWzBdOyBiID0gSEFTSFsxXTsgYyA9IEhBU0hbMl07IGQgPSBIQVNIWzNdOyBlID0gSEFTSFs0XTsgZiA9IEhBU0hbNV07IGcgPSBIQVNIWzZdOyBoID0gSEFTSFs3XTtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IDY0OyBqKyspIHtcbiAgICAgIGlmIChqIDwgMTYpIHtcbiAgICAgICAgV1tqXSA9IG1baiArIGldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgV1tqXSA9IHNhZmVfYWRkKHNhZmVfYWRkKHNhZmVfYWRkKEdhbW1hMTI1NihXW2ogLSAyXSksIFdbaiAtIDddKSwgR2FtbWEwMjU2KFdbaiAtIDE1XSkpLCBXW2ogLSAxNl0pO1xuICAgICAgfVxuICAgICAgVDEgPSBzYWZlX2FkZChzYWZlX2FkZChzYWZlX2FkZChzYWZlX2FkZChoLCBTaWdtYTEyNTYoZSkpLCBDaChlLCBmLCBnKSksIEtbal0pLCBXW2pdKTtcbiAgICAgIFQyID0gc2FmZV9hZGQoU2lnbWEwMjU2KGEpLCBNYWooYSwgYiwgYykpO1xuICAgICAgaCA9IGc7IGcgPSBmOyBmID0gZTsgZSA9IHNhZmVfYWRkKGQsIFQxKTsgZCA9IGM7IGMgPSBiOyBiID0gYTsgYSA9IHNhZmVfYWRkKFQxLCBUMik7XG4gICAgfVxuICAgIEhBU0hbMF0gPSBzYWZlX2FkZChhLCBIQVNIWzBdKTsgSEFTSFsxXSA9IHNhZmVfYWRkKGIsIEhBU0hbMV0pOyBIQVNIWzJdID0gc2FmZV9hZGQoYywgSEFTSFsyXSk7IEhBU0hbM10gPSBzYWZlX2FkZChkLCBIQVNIWzNdKTtcbiAgICBIQVNIWzRdID0gc2FmZV9hZGQoZSwgSEFTSFs0XSk7IEhBU0hbNV0gPSBzYWZlX2FkZChmLCBIQVNIWzVdKTsgSEFTSFs2XSA9IHNhZmVfYWRkKGcsIEhBU0hbNl0pOyBIQVNIWzddID0gc2FmZV9hZGQoaCwgSEFTSFs3XSk7XG4gIH1cbiAgcmV0dXJuIEhBU0g7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNoYTI1NihidWYpIHtcbiAgcmV0dXJuIGhlbHBlcnMuaGFzaChidWYsIGNvcmVfc2hhMjU2LCAzMiwgdHJ1ZSk7XG59O1xuIl19
