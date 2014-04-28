(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BootState, Demo1State, GraphicsManager, InputManager, LoadMapDemoState, MenuState, MoveMapDemoState, MoveMapSmoothDemoState, PreLoadState, State, StateManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../../vendor/iki-engine/src/State.coffee");

StateManager = require("../../../vendor/iki-engine/src/Manager/StateManager.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../../vendor/iki-engine/src/Manager/InputManager.coffee");

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
    GraphicsManager.renderer.canvas.width = window.innerWidth;
    GraphicsManager.renderer.canvas.height = window.innerHeight;
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
    this.debugMenu();
    return window.addEventListener("resize", function() {
      GraphicsManager.renderer.canvas.width = window.innerWidth;
      return GraphicsManager.renderer.canvas.height = window.innerHeight;
    });
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


},{"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../vendor/iki-engine/src/Manager/InputManager.coffee":17,"../../../vendor/iki-engine/src/Manager/StateManager.coffee":18,"../../../vendor/iki-engine/src/State.coffee":20,"./Demos/Demo1/Demo1State.coffee":2,"./Demos/LoadMapDemo/LoadMapDemoState.coffee":4,"./Demos/MoveMapDemo/MoveMapDemoState.coffee":5,"./Demos/MoveMapSmoothDemo/MoveMapSmoothDemoState.coffee":7,"./MenuState.coffee":8,"./PreLoadState.coffee":9}],2:[function(require,module,exports){
var Demo1State, Demo1System, EntityManager, GraphicsManager, State,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EntityManager = require("../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

GraphicsManager = require("../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

State = require("../../../../../vendor/iki-engine/src/State.coffee");

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


},{"../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":15,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../../../vendor/iki-engine/src/State.coffee":20,"./Demo1System.coffee":3}],3:[function(require,module,exports){
var Demo1System, EntityManager, GraphicsManager, InputManager, System,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

System = require("../../../../../vendor/iki-engine/src/System.coffee");

EntityManager = require("../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

GraphicsManager = require("../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../../../../vendor/iki-engine/src/Manager/InputManager.coffee");

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


},{"../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":15,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../../../vendor/iki-engine/src/Manager/InputManager.coffee":17,"../../../../../vendor/iki-engine/src/System.coffee":21}],4:[function(require,module,exports){
var AssetManager, GraphicsManager, LoadMapDemoState, Map, State,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AssetManager = require("../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

GraphicsManager = require("../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

State = require("../../../../../vendor/iki-engine/src/State.coffee");

Map = require("../../../../../vendor/iki-engine/src/Map.coffee");

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


},{"../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":13,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../../../vendor/iki-engine/src/Map.coffee":19,"../../../../../vendor/iki-engine/src/State.coffee":20}],5:[function(require,module,exports){
var AssetManager, GraphicsManager, InputManager, Map, MoveMapDemoState, State,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AssetManager = require("../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

GraphicsManager = require("../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../../../../vendor/iki-engine/src/Manager/InputManager.coffee");

State = require("../../../../../vendor/iki-engine/src/State.coffee");

Map = require("../../../../../vendor/iki-engine/src/Map.coffee");

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


},{"../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":13,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../../../vendor/iki-engine/src/Manager/InputManager.coffee":17,"../../../../../vendor/iki-engine/src/Map.coffee":19,"../../../../../vendor/iki-engine/src/State.coffee":20}],6:[function(require,module,exports){
var EntityManager, InputManager, MapMoveInputSystem, System,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

System = require("../../../../../vendor/iki-engine/src/System.coffee");

InputManager = require("../../../../../vendor/iki-engine/src/Manager/InputManager.coffee");

EntityManager = require("../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

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


},{"../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":15,"../../../../../vendor/iki-engine/src/Manager/InputManager.coffee":17,"../../../../../vendor/iki-engine/src/System.coffee":21}],7:[function(require,module,exports){
var AssetManager, EntityManager, GraphicsManager, GraphicsSystem, Map, MapMoveInputSyste, MoveMapSmoothDemoState, State,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AssetManager = require("../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

GraphicsManager = require("../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

EntityManager = require("../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

State = require("../../../../../vendor/iki-engine/src/State.coffee");

Map = require("../../../../../vendor/iki-engine/src/Map.coffee");

GraphicsSystem = require("../../../../../vendor/iki-engine/src/System/GraphicsSystem.coffee");

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


},{"../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":13,"../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":15,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../../../vendor/iki-engine/src/Map.coffee":19,"../../../../../vendor/iki-engine/src/State.coffee":20,"../../../../../vendor/iki-engine/src/System/GraphicsSystem.coffee":22,"./MapMoveInputSystem.coffee":6}],8:[function(require,module,exports){
var AudioManager, GraphicsManager, InputManager, MenuState, State, StateManager, Util,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../../vendor/iki-engine/src/State.coffee");

Util = require("../../../vendor/iki-engine/src/Util.coffee");

StateManager = require("../../../vendor/iki-engine/src/Manager/StateManager.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../../vendor/iki-engine/src/Manager/InputManager.coffee");

AudioManager = require("../../../vendor/iki-engine/src/Manager/AudioManager.coffee");

MenuState = (function(_super) {
  __extends(MenuState, _super);

  function MenuState() {
    return MenuState.__super__.constructor.apply(this, arguments);
  }

  MenuState.prototype.init = function() {
    this.menus = {};
    this.ctx = GraphicsManager.renderer.ctx;
    this.clickListener = this.onMouseClick.bind(this);
    this.background = new Image();
    this.background.src = "/assets/img/background/image6_0.jpg";
    this.currentMenu = "main";
    AudioManager.load("menu-select", "/assets/sound/UI pack 1/MENU B_Select.wav");
    AudioManager.load("menu-back", "/assets/sound/UI pack 1/MENU B_Back.wav");
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
    if (newMenu === "main") {
      AudioManager.play("menu-back");
    } else {
      AudioManager.play("menu-select");
    }
    this.currentMenu = newMenu;
    return this.renderMenu();
  };

  MenuState.prototype.switchState = function(state) {
    AudioManager.play("menu-select");
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
    return GraphicsManager.fillImage(this.ctx, this.background, this.background.width, this.background.height, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
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


},{"../../../vendor/iki-engine/src/Manager/AudioManager.coffee":14,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../vendor/iki-engine/src/Manager/InputManager.coffee":17,"../../../vendor/iki-engine/src/Manager/StateManager.coffee":18,"../../../vendor/iki-engine/src/State.coffee":20,"../../../vendor/iki-engine/src/Util.coffee":23}],9:[function(require,module,exports){
var AssetManager, GraphicsManager, PreLoadState, State, StateManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

State = require("../../../vendor/iki-engine/src/State.coffee");

StateManager = require("../../../vendor/iki-engine/src/Manager/StateManager.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

AssetManager = require("../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

PreLoadState = (function(_super) {
  __extends(PreLoadState, _super);

  function PreLoadState() {
    return PreLoadState.__super__.constructor.apply(this, arguments);
  }

  PreLoadState.prototype.init = function() {
    this.bar = {
      x: (GraphicsManager.renderer.canvas.width / 2) - 100,
      y: (GraphicsManager.renderer.canvas.height / 2) - 20,
      width: 200,
      height: 20
    };
    this.bar.middle = this.bar.x + (this.bar.width / 2);
    return this.ctx = GraphicsManager.renderer.ctx;
  };

  PreLoadState.prototype.activate = function() {
    var loadAsset;
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
    this.renderLoadingBar(0);
    this.renderLoadingText("Loading...");
    AssetManager.onProgress = this.onProgress.bind(this);
    loadAsset = AssetManager.load("assets/demo-assets.json");
    return loadAsset.then(function() {
      return StateManager.activate("menu");
    });
  };

  PreLoadState.prototype.onProgress = function(asset, group, loaded, total) {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
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


},{"../../../vendor/iki-engine/src/Manager/AssetManager.coffee":13,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../vendor/iki-engine/src/Manager/StateManager.coffee":18,"../../../vendor/iki-engine/src/State.coffee":20}],10:[function(require,module,exports){
var BootState, Engine, game;

Engine = require("../../vendor/iki-engine/src/Engine.coffee");

BootState = require("./State/BootState.coffee");

game = new Engine;

game.start(new BootState);


},{"../../vendor/iki-engine/src/Engine.coffee":11,"./State/BootState.coffee":1}],11:[function(require,module,exports){
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


},{"./Manager/StateManager.coffee":18}],12:[function(require,module,exports){
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


},{"../vendor/node-uuid/uuid.js":24}],13:[function(require,module,exports){
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


},{"../Util.coffee":23}],14:[function(require,module,exports){
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


},{}],15:[function(require,module,exports){
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


},{"../../vendor/node-uuid/uuid.js":24,"../Entity.coffee":12}],16:[function(require,module,exports){
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


},{}],17:[function(require,module,exports){
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


},{}],18:[function(require,module,exports){
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


},{}],19:[function(require,module,exports){
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


},{"./Util.coffee":23}],20:[function(require,module,exports){
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


},{}],21:[function(require,module,exports){
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


},{}],22:[function(require,module,exports){
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
    return this.viewportY = 0;
  };

  GraphicsSystem.prototype.onBeforeDraw = function(ctx, dt) {};

  GraphicsSystem.prototype.onAfterDraw = function(ctx, dt) {};

  GraphicsSystem.prototype.onUpdate = function(dt) {
    this.renderer.ctx.clearRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);
    this.onBeforeDraw(this.renderer.ctx, dt);
    this.drawRects();
    this.drawImages();
    this.drawTexts();
    return this.onAfterDraw(this.renderer.ctx, dt);
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


},{"../Manager/EntityManager.coffee":15,"../Manager/GraphicsManager.coffee":16,"../System.coffee":21}],23:[function(require,module,exports){
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


},{}],24:[function(require,module,exports){
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
},{"buffer":25,"crypto":29}],25:[function(require,module,exports){
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

},{"base64-js":26,"ieee754":27}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{"buffer":25}],29:[function(require,module,exports){
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

},{"./md5":30,"./rng":31,"./sha":32,"./sha256":33,"buffer":25}],30:[function(require,module,exports){
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

},{"./helpers":28}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{"./helpers":28}],33:[function(require,module,exports){

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

},{"./helpers":28}]},{},[10])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcQm9vdFN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcRGVtb3NcXERlbW8xXFxEZW1vMVN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcRGVtb3NcXERlbW8xXFxEZW1vMVN5c3RlbS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZGVtb1xcU3RhdGVcXERlbW9zXFxMb2FkTWFwRGVtb1xcTG9hZE1hcERlbW9TdGF0ZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZGVtb1xcU3RhdGVcXERlbW9zXFxNb3ZlTWFwRGVtb1xcTW92ZU1hcERlbW9TdGF0ZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZGVtb1xcU3RhdGVcXERlbW9zXFxNb3ZlTWFwU21vb3RoRGVtb1xcTWFwTW92ZUlucHV0U3lzdGVtLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcRGVtb3NcXE1vdmVNYXBTbW9vdGhEZW1vXFxNb3ZlTWFwU21vb3RoRGVtb1N0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcTWVudVN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcUHJlTG9hZFN0YXRlLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxkZW1vLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXEVuZ2luZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxFbnRpdHkuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcQXNzZXRNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXEF1ZGlvTWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxNYW5hZ2VyXFxFbnRpdHlNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXEdyYXBoaWNzTWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxNYW5hZ2VyXFxJbnB1dE1hbmFnZXIuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcU3RhdGVNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hcC5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxTdGF0ZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxTeXN0ZW0uY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcU3lzdGVtXFxHcmFwaGljc1N5c3RlbS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxVdGlsLmNvZmZlZSIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL2RvY3Jvb3QvYXNzZXRzL3ZlbmRvci9pa2ktZW5naW5lL3ZlbmRvci9ub2RlLXV1aWQvdXVpZC5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvaGVscGVycy5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9pbmRleC5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9tZDUuanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvcm5nLmpzIiwiQzovd3d3L21lcmNlbmFyeS1zdHJpa2UtZm9yY2Uvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3NoYS5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEyNTYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLDhKQUFBO0VBQUE7aVNBQUE7O0FBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSw2Q0FBUixDQUFSLENBQUE7O0FBQUEsWUFDQSxHQUFlLE9BQUEsQ0FBUSw0REFBUixDQURmLENBQUE7O0FBQUEsZUFFQSxHQUFrQixPQUFBLENBQVEsK0RBQVIsQ0FGbEIsQ0FBQTs7QUFBQSxZQUdBLEdBQWUsT0FBQSxDQUFRLDREQUFSLENBSGYsQ0FBQTs7QUFBQSxZQUtBLEdBQWUsT0FBQSxDQUFRLHVCQUFSLENBTGYsQ0FBQTs7QUFBQSxTQU1BLEdBQVksT0FBQSxDQUFRLG9CQUFSLENBTlosQ0FBQTs7QUFBQSxVQVNBLEdBQWEsT0FBQSxDQUFRLGlDQUFSLENBVGIsQ0FBQTs7QUFBQSxnQkFVQSxHQUFtQixPQUFBLENBQVEsNkNBQVIsQ0FWbkIsQ0FBQTs7QUFBQSxnQkFXQSxHQUFtQixPQUFBLENBQVEsNkNBQVIsQ0FYbkIsQ0FBQTs7QUFBQSxzQkFZQSxHQUF5QixPQUFBLENBQVEseURBQVIsQ0FaekIsQ0FBQTs7QUFBQTtBQWdCSSw4QkFBQSxDQUFBOzs7O0dBQUE7O0FBQUEsc0JBQUEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUVGLFFBQUEsK0ZBQUE7QUFBQSxJQUFBLGVBQWUsQ0FBQyxRQUFoQixHQUEyQixlQUFlLENBQUMsY0FBaEIsQ0FBK0IsR0FBL0IsRUFBb0MsR0FBcEMsRUFBeUMsUUFBUSxDQUFDLElBQWxELENBQTNCLENBQUE7QUFBQSxJQUNBLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQWhDLEdBQXdDLE1BQU0sQ0FBQyxVQUQvQyxDQUFBO0FBQUEsSUFFQSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFoQyxHQUF5QyxNQUFNLENBQUMsV0FGaEQsQ0FBQTtBQUFBLElBSUEsWUFBWSxDQUFDLElBQWIsQ0FBQSxDQUpBLENBQUE7QUFBQSxJQU1BLFlBQUEsR0FBbUIsSUFBQSxZQUFBLENBQUEsQ0FObkIsQ0FBQTtBQUFBLElBT0EsWUFBWSxDQUFDLEdBQWIsQ0FBaUIsU0FBakIsRUFBNEIsWUFBNUIsQ0FQQSxDQUFBO0FBQUEsSUFRQSxZQUFZLENBQUMsSUFBYixDQUFBLENBUkEsQ0FBQTtBQUFBLElBVUEsU0FBQSxHQUFnQixJQUFBLFNBQUEsQ0FBQSxDQVZoQixDQUFBO0FBQUEsSUFXQSxZQUFZLENBQUMsR0FBYixDQUFpQixNQUFqQixFQUF5QixTQUF6QixDQVhBLENBQUE7QUFBQSxJQVlBLFNBQVMsQ0FBQyxJQUFWLENBQUEsQ0FaQSxDQUFBO0FBQUEsSUFjQSxVQUFBLEdBQWlCLElBQUEsVUFBQSxDQUFBLENBZGpCLENBQUE7QUFBQSxJQWVBLFlBQVksQ0FBQyxHQUFiLENBQWlCLE9BQWpCLEVBQTBCLFVBQTFCLENBZkEsQ0FBQTtBQUFBLElBZ0JBLFVBQVUsQ0FBQyxJQUFYLENBQUEsQ0FoQkEsQ0FBQTtBQUFBLElBa0JBLGdCQUFBLEdBQXVCLElBQUEsZ0JBQUEsQ0FBQSxDQWxCdkIsQ0FBQTtBQUFBLElBbUJBLFlBQVksQ0FBQyxHQUFiLENBQWlCLGFBQWpCLEVBQWdDLGdCQUFoQyxDQW5CQSxDQUFBO0FBQUEsSUFvQkEsZ0JBQWdCLENBQUMsSUFBakIsQ0FBQSxDQXBCQSxDQUFBO0FBQUEsSUFzQkEsZ0JBQUEsR0FBdUIsSUFBQSxnQkFBQSxDQUFBLENBdEJ2QixDQUFBO0FBQUEsSUF1QkEsWUFBWSxDQUFDLEdBQWIsQ0FBaUIsYUFBakIsRUFBZ0MsZ0JBQWhDLENBdkJBLENBQUE7QUFBQSxJQXdCQSxnQkFBZ0IsQ0FBQyxJQUFqQixDQUFBLENBeEJBLENBQUE7QUFBQSxJQTBCQSxzQkFBQSxHQUE2QixJQUFBLHNCQUFBLENBQUEsQ0ExQjdCLENBQUE7QUFBQSxJQTJCQSxZQUFZLENBQUMsR0FBYixDQUFpQixtQkFBakIsRUFBc0Msc0JBQXRDLENBM0JBLENBQUE7QUFBQSxJQTRCQSxzQkFBc0IsQ0FBQyxJQUF2QixDQUFBLENBNUJBLENBQUE7QUFBQSxJQThCQSxJQUFDLENBQUEsU0FBRCxDQUFBLENBOUJBLENBQUE7V0FnQ0EsTUFBTSxDQUFDLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFNBQUEsR0FBQTtBQUM5QixNQUFBLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQWhDLEdBQXdDLE1BQU0sQ0FBQyxVQUEvQyxDQUFBO2FBQ0EsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBaEMsR0FBeUMsTUFBTSxDQUFDLFlBRmxCO0lBQUEsQ0FBbEMsRUFsQ0U7RUFBQSxDQUFOLENBQUE7O0FBQUEsc0JBdUNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7V0FDTixZQUFZLENBQUMsUUFBYixDQUFzQixTQUF0QixFQURNO0VBQUEsQ0F2Q1YsQ0FBQTs7QUFBQSxzQkEwQ0EsU0FBQSxHQUFXLFNBQUEsR0FBQTtBQUNQLFFBQUEsK0JBQUE7QUFBQSxJQUFBLEdBQUEsR0FBVSxJQUFBLEdBQUcsQ0FBQyxHQUFKLENBQUEsQ0FBVixDQUFBO0FBQUEsSUFFQSxZQUFZLENBQUMsVUFBYixHQUEwQixZQUFZLENBQUMsWUFGdkMsQ0FBQTtBQUFBLElBSUEsWUFBQSxHQUFlLEdBQUcsQ0FBQyxTQUFKLENBQWMsUUFBZCxDQUpmLENBQUE7QUFBQSxJQUtBLFlBQVksQ0FBQyxJQUFiLENBQUEsQ0FMQSxDQUFBO0FBQUEsSUFNQSxZQUFBLEdBQWUsWUFBWSxDQUFDLEdBQWIsQ0FBaUIsWUFBakIsRUFBK0IsWUFBL0IsRUFBNkMsQ0FDeEQsTUFEd0QsRUFDaEQsT0FEZ0QsRUFDdkMsYUFEdUMsRUFDeEIsYUFEd0IsRUFDVCxtQkFEUyxDQUE3QyxDQU5mLENBQUE7QUFBQSxJQVNBLFlBQVksQ0FBQyxjQUFiLENBQTRCLFNBQUMsS0FBRCxHQUFBO2FBQVcsWUFBWSxDQUFDLFFBQWIsQ0FBc0IsS0FBdEIsRUFBWDtJQUFBLENBQTVCLENBVEEsQ0FBQTtXQVVBLFlBQVksQ0FBQyxVQUFiLEdBQTBCLFNBQUEsR0FBQTtBQUN0QixNQUFBLFlBQVksQ0FBQyxVQUFiLEdBQTBCLFlBQVksQ0FBQyxZQUF2QyxDQUFBO2FBQ0EsWUFBWSxDQUFDLGFBQWIsQ0FBQSxFQUZzQjtJQUFBLEVBWG5CO0VBQUEsQ0ExQ1gsQ0FBQTs7bUJBQUE7O0dBRG9CLE1BZnhCLENBQUE7O0FBQUEsTUEwRU0sQ0FBQyxPQUFQLEdBQWlCLFNBMUVqQixDQUFBOzs7O0FDQUEsSUFBQSw4REFBQTtFQUFBO2lTQUFBOztBQUFBLGFBQUEsR0FBZ0IsT0FBQSxDQUFRLG1FQUFSLENBQWhCLENBQUE7O0FBQUEsZUFDQSxHQUFrQixPQUFBLENBQVEscUVBQVIsQ0FEbEIsQ0FBQTs7QUFBQSxLQUdBLEdBQVEsT0FBQSxDQUFRLG1EQUFSLENBSFIsQ0FBQTs7QUFBQSxXQUlBLEdBQWMsT0FBQSxDQUFRLHNCQUFSLENBSmQsQ0FBQTs7QUFBQTtBQU9JLCtCQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSx1QkFBQSxJQUFBLEdBQU0sU0FBQSxHQUFBO1dBQUcsSUFBQyxDQUFBLFNBQUQsQ0FBZSxJQUFBLFdBQUEsQ0FBQSxDQUFmLEVBQUg7RUFBQSxDQUFOLENBQUE7O0FBQUEsdUJBRUEsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUNOLFFBQUEsV0FBQTtBQUFBLElBQUEsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQXRDLEdBQStDLE1BQS9DLENBQUE7QUFBQSxJQUVBLElBQUMsQ0FBQSxNQUFELEdBQVUsYUFBYSxDQUFDLFlBQWQsQ0FBMkIsUUFBM0IsQ0FGVixDQUFBO0FBQUEsSUFHQSxXQUFBLEdBQWtCLElBQUEsS0FBQSxDQUFBLENBSGxCLENBQUE7QUFBQSxJQUlBLFdBQVcsQ0FBQyxHQUFaLEdBQWtCLDBDQUpsQixDQUFBO0FBQUEsSUFLQSxhQUFhLENBQUMsWUFBZCxDQUEyQixJQUFDLENBQUEsTUFBNUIsRUFBb0M7QUFBQSxNQUNoQyxJQUFBLEVBQU0saUJBRDBCO0FBQUEsTUFFaEMsR0FBQSxFQUFLLFdBRjJCO0tBQXBDLENBTEEsQ0FBQTtBQUFBLElBU0EsYUFBYSxDQUFDLFlBQWQsQ0FBMkIsSUFBQyxDQUFBLE1BQTVCLEVBQW9DO0FBQUEsTUFDaEMsSUFBQSxFQUFNLFVBRDBCO0FBQUEsTUFFaEMsQ0FBQSxFQUFHLENBRjZCO0FBQUEsTUFHaEMsQ0FBQSxFQUFHLENBSDZCO0tBQXBDLENBVEEsQ0FBQTtXQWNBLGFBQWEsQ0FBQyxZQUFkLENBQTJCLElBQUMsQ0FBQSxNQUE1QixFQUFvQztBQUFBLE1BQ2hDLElBQUEsRUFBTSxzQkFEMEI7S0FBcEMsRUFmTTtFQUFBLENBRlYsQ0FBQTs7QUFBQSx1QkFxQkEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNSLElBQUEsYUFBYSxDQUFDLFlBQWQsQ0FBMkIsSUFBQyxDQUFBLE1BQTVCLENBQUEsQ0FBQTtXQUNBLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUF0QyxHQUErQyxVQUZ2QztFQUFBLENBckJaLENBQUE7O29CQUFBOztHQURxQixNQU56QixDQUFBOztBQUFBLE1BaUNNLENBQUMsT0FBUCxHQUFpQixVQWpDakIsQ0FBQTs7OztBQ0FBLElBQUEsaUVBQUE7RUFBQTtpU0FBQTs7QUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLG9EQUFSLENBQVQsQ0FBQTs7QUFBQSxhQUNBLEdBQWdCLE9BQUEsQ0FBUSxtRUFBUixDQURoQixDQUFBOztBQUFBLGVBRUEsR0FBa0IsT0FBQSxDQUFRLHFFQUFSLENBRmxCLENBQUE7O0FBQUEsWUFHQSxHQUFlLE9BQUEsQ0FBUSxrRUFBUixDQUhmLENBQUE7O0FBQUE7QUFNSSxnQ0FBQSxDQUFBOzs7O0dBQUE7O0FBQUEsd0JBQUEsY0FBQSxHQUFnQixFQUFoQixDQUFBOztBQUFBLHdCQUVBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDTixRQUFBLHFGQUFBO0FBQUEsSUFBQSxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUE3QixHQUF5QyxNQUF6QyxDQUFBO0FBQUEsSUFDQSxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUE3QixDQUFzQyxDQUF0QyxFQUF5QyxDQUF6QyxFQUNJLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBRHBDLEVBQzJDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BRDNFLENBREEsQ0FBQTtBQUFBLElBS0EsY0FBQSxHQUFpQixhQUFhLENBQUMsa0NBQWQsQ0FBaUQsQ0FBQyxzQkFBRCxFQUF5QixVQUF6QixDQUFqRCxDQUxqQixDQUFBO0FBTUEsU0FBQSxxREFBQTtrQ0FBQTtBQUNJLE1BQUEsUUFBQSxHQUFXLGFBQWEsQ0FBQyxrQkFBZCxDQUFpQyxNQUFqQyxFQUF5QyxVQUF6QyxDQUFYLENBQUE7QUFBQSxNQUNBLFFBQVEsQ0FBQyxDQUFULEdBQWEsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQURoQyxDQUFBO0FBQUEsTUFFQSxRQUFRLENBQUMsQ0FBVCxHQUFhLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FGaEMsQ0FESjtBQUFBLEtBTkE7QUFBQSxJQVlBLGtCQUFBLEdBQXFCLGFBQWEsQ0FBQyxrQ0FBZCxDQUFpRCxDQUFDLGlCQUFELEVBQW9CLFVBQXBCLENBQWpELENBWnJCLENBQUE7QUFhQSxTQUFBLDJEQUFBO3NDQUFBO0FBQ0ksTUFBQSxVQUFBLEdBQWEsYUFBYSxDQUFDLGtCQUFkLENBQWlDLE1BQWpDLEVBQXlDLGlCQUF6QyxDQUFiLENBQUE7QUFBQSxNQUNBLFFBQUEsR0FBVyxhQUFhLENBQUMsa0JBQWQsQ0FBaUMsTUFBakMsRUFBeUMsVUFBekMsQ0FEWCxDQUFBO0FBQUEsTUFFQSxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUE3QixDQUF1QyxVQUFVLENBQUMsR0FBbEQsRUFBdUQsUUFBUSxDQUFDLENBQWhFLEVBQW1FLFFBQVEsQ0FBQyxDQUE1RSxDQUZBLENBREo7QUFBQSxLQWJBO0FBa0JBLFdBQU8sSUFBUCxDQW5CTTtFQUFBLENBRlYsQ0FBQTs7cUJBQUE7O0dBRHNCLE9BTDFCLENBQUE7O0FBQUEsTUE4Qk0sQ0FBQyxPQUFQLEdBQWlCLFdBOUJqQixDQUFBOzs7O0FDQUEsSUFBQSwyREFBQTtFQUFBO2lTQUFBOztBQUFBLFlBQUEsR0FBZSxPQUFBLENBQVEsa0VBQVIsQ0FBZixDQUFBOztBQUFBLGVBQ0EsR0FBa0IsT0FBQSxDQUFRLHFFQUFSLENBRGxCLENBQUE7O0FBQUEsS0FHQSxHQUFRLE9BQUEsQ0FBUSxtREFBUixDQUhSLENBQUE7O0FBQUEsR0FJQSxHQUFNLE9BQUEsQ0FBUSxpREFBUixDQUpOLENBQUE7O0FBQUE7QUFPSSxxQ0FBQSxDQUFBOzs7O0dBQUE7O0FBQUEsNkJBQUEsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUVOLFFBQUEsWUFBQTtBQUFBLElBQUEsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBN0IsR0FBeUMsTUFBekMsQ0FBQTtBQUFBLElBQ0EsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBN0IsQ0FBc0MsQ0FBdEMsRUFBeUMsQ0FBekMsRUFDSSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQURwQyxFQUMyQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUQzRSxDQURBLENBQUE7QUFBQSxJQUlBLEdBQUEsR0FBVSxJQUFBLEdBQUEsQ0FBQSxDQUpWLENBQUE7QUFBQSxJQUtBLE9BQUEsR0FBVSxHQUFHLENBQUMsT0FBSixDQUFZLHdCQUFaLENBTFYsQ0FBQTtXQU1BLE9BQU8sQ0FBQyxJQUFSLENBQWEsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUE3QixHQUF5QyxNQUF6QyxDQUFBO0FBQUEsTUFDQSxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUE3QixDQUFzQyxDQUF0QyxFQUF5QyxDQUF6QyxFQUNJLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBRHBDLEVBQzJDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BRDNFLENBREEsQ0FBQTthQUlBLEdBQUcsQ0FBQyxPQUFKLENBQVksZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFyQyxFQUxTO0lBQUEsQ0FBYixFQVJNO0VBQUEsQ0FBVixDQUFBOzswQkFBQTs7R0FEMkIsTUFOL0IsQ0FBQTs7QUFBQSxNQXdCTSxDQUFDLE9BQVAsR0FBaUIsZ0JBeEJqQixDQUFBOzs7O0FDQUEsSUFBQSx5RUFBQTtFQUFBO2lTQUFBOztBQUFBLFlBQUEsR0FBZSxPQUFBLENBQVEsa0VBQVIsQ0FBZixDQUFBOztBQUFBLGVBQ0EsR0FBa0IsT0FBQSxDQUFRLHFFQUFSLENBRGxCLENBQUE7O0FBQUEsWUFFQSxHQUFlLE9BQUEsQ0FBUSxrRUFBUixDQUZmLENBQUE7O0FBQUEsS0FJQSxHQUFRLE9BQUEsQ0FBUSxtREFBUixDQUpSLENBQUE7O0FBQUEsR0FLQSxHQUFNLE9BQUEsQ0FBUSxpREFBUixDQUxOLENBQUE7O0FBQUE7QUFRSSxxQ0FBQSxDQUFBOzs7O0dBQUE7O0FBQUEsNkJBQUEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUNGLElBQUEsSUFBQyxDQUFBLFNBQUQsR0FBYSxDQUFiLENBQUE7V0FDQSxJQUFDLENBQUEsU0FBRCxHQUFhLEVBRlg7RUFBQSxDQUFOLENBQUE7O0FBQUEsNkJBSUEsUUFBQSxHQUFVLFNBQUEsR0FBQTtBQUNOLFFBQUEsT0FBQTtBQUFBLElBQUEsWUFBWSxDQUFDLE9BQWIsR0FBdUIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsSUFBZCxDQUF2QixDQUFBO0FBQUEsSUFFQSxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUE3QixHQUF5QyxNQUZ6QyxDQUFBO0FBQUEsSUFHQSxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUE3QixDQUFzQyxDQUF0QyxFQUF5QyxDQUF6QyxFQUNJLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBRHBDLEVBQzJDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BRDNFLENBSEEsQ0FBQTtBQUFBLElBTUEsSUFBQyxDQUFBLEdBQUQsR0FBVyxJQUFBLEdBQUEsQ0FBQSxDQU5YLENBQUE7QUFBQSxJQU9BLE9BQUEsR0FBVSxJQUFDLENBQUEsR0FBRyxDQUFDLE9BQUwsQ0FBYSx3QkFBYixDQVBWLENBQUE7V0FRQSxPQUFPLENBQUMsSUFBUixDQUFhLENBQUEsU0FBQSxLQUFBLEdBQUE7YUFBQSxTQUFBLEdBQUE7QUFDVCxRQUFBLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQTdCLEdBQXlDLE1BQXpDLENBQUE7QUFBQSxRQUNBLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQTdCLENBQXNDLENBQXRDLEVBQXlDLENBQXpDLEVBQ0ksZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FEcEMsRUFDMkMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFEM0UsQ0FEQSxDQUFBO2VBSUEsS0FBQyxDQUFBLEdBQUcsQ0FBQyxPQUFMLENBQWEsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUF0QyxFQUxTO01BQUEsRUFBQTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBYixFQVRNO0VBQUEsQ0FKVixDQUFBOztBQUFBLDZCQW9CQSxVQUFBLEdBQVksU0FBQSxHQUFBO1dBQUcsWUFBWSxDQUFDLE9BQWIsR0FBdUIsS0FBMUI7RUFBQSxDQXBCWixDQUFBOztBQUFBLDZCQXNCQSxPQUFBLEdBQVMsU0FBQyxDQUFELEdBQUE7QUFDTCxRQUFBLFlBQUE7QUFBQSxJQUFBLFlBQUEsR0FBZSxFQUFmLENBQUE7QUFFQSxJQUFBLElBQUcsQ0FBQyxDQUFDLE9BQUYsS0FBYSxFQUFoQjtBQUF3QixNQUFBLElBQUMsQ0FBQSxTQUFELElBQWMsWUFBZCxDQUF4QjtLQUZBO0FBR0EsSUFBQSxJQUFHLENBQUMsQ0FBQyxPQUFGLEtBQWEsRUFBaEI7QUFBd0IsTUFBQSxJQUFDLENBQUEsU0FBRCxJQUFjLFlBQWQsQ0FBeEI7S0FIQTtBQUlBLElBQUEsSUFBRyxDQUFDLENBQUMsT0FBRixLQUFhLEVBQWhCO0FBQXdCLE1BQUEsSUFBQyxDQUFBLFNBQUQsSUFBYyxZQUFkLENBQXhCO0tBSkE7QUFLQSxJQUFBLElBQUcsQ0FBQyxDQUFDLE9BQUYsS0FBYSxFQUFoQjtBQUF3QixNQUFBLElBQUMsQ0FBQSxTQUFELElBQWMsWUFBZCxDQUF4QjtLQUxBO0FBT0EsSUFBQSxJQUFHLElBQUMsQ0FBQSxHQUFKO0FBQ0ksTUFBQSxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUE3QixHQUF5QyxNQUF6QyxDQUFBO0FBQUEsTUFDQSxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUE3QixDQUFzQyxDQUF0QyxFQUF5QyxDQUF6QyxFQUNJLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBRHBDLEVBQzJDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BRDNFLENBREEsQ0FBQTthQUlBLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixlQUFlLENBQUMsUUFBUSxDQUFDLEdBQTFDLEVBQ0ksSUFBQyxDQUFBLFNBREwsRUFDZ0IsSUFBQyxDQUFBLFNBRGpCLEVBRUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FGcEMsRUFFMkMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFGM0UsRUFMSjtLQVJLO0VBQUEsQ0F0QlQsQ0FBQTs7MEJBQUE7O0dBRDJCLE1BUC9CLENBQUE7O0FBQUEsTUErQ00sQ0FBQyxPQUFQLEdBQWlCLGdCQS9DakIsQ0FBQTs7OztBQ0FBLElBQUEsdURBQUE7RUFBQTtpU0FBQTs7QUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLG9EQUFSLENBQVQsQ0FBQTs7QUFBQSxZQUNBLEdBQWUsT0FBQSxDQUFRLGtFQUFSLENBRGYsQ0FBQTs7QUFBQSxhQUVBLEdBQWdCLE9BQUEsQ0FBUSxtRUFBUixDQUZoQixDQUFBOztBQUFBO0FBTUksdUNBQUEsQ0FBQTs7OztHQUFBOztBQUFBLCtCQUFBLFFBQUEsR0FBVSxTQUFDLEVBQUQsR0FBQTtBQUNOLFFBQUEsNERBQUE7QUFBQSxJQUFBLFlBQUEsR0FBZSxDQUFBLEdBQUksRUFBbkIsQ0FBQTtBQUFBLElBRUEsUUFBQSxHQUFXLGFBQWEsQ0FBQyxrQ0FBZCxDQUFpRCxDQUFDLFVBQUQsQ0FBakQsQ0FGWCxDQUFBO0FBSUE7U0FBQSwrQ0FBQTs0QkFBQTtBQUNJLE1BQUEsUUFBQSxHQUFXLGFBQWEsQ0FBQyxrQkFBZCxDQUFpQyxNQUFqQyxFQUF5QyxVQUF6QyxDQUFYLENBQUE7QUFFQSxNQUFBLElBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFwQjtBQUE0QixRQUFBLFFBQVEsQ0FBQyxDQUFULElBQWMsWUFBZCxDQUE1QjtPQUZBO0FBR0EsTUFBQSxJQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBcEI7QUFBOEIsUUFBQSxRQUFRLENBQUMsQ0FBVCxJQUFjLFlBQWQsQ0FBOUI7T0FIQTtBQUlBLE1BQUEsSUFBRyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQXBCO0FBQThCLFFBQUEsUUFBUSxDQUFDLENBQVQsSUFBYyxZQUFkLENBQTlCO09BSkE7QUFLQSxNQUFBLElBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFwQjtzQkFBK0IsUUFBUSxDQUFDLENBQVQsSUFBYyxjQUE3QztPQUFBLE1BQUE7OEJBQUE7T0FOSjtBQUFBO29CQUxNO0VBQUEsQ0FBVixDQUFBOzs0QkFBQTs7R0FGNkIsT0FKakMsQ0FBQTs7QUFBQSxNQXFCTSxDQUFDLE9BQVAsR0FBaUIsa0JBckJqQixDQUFBOzs7O0FDQUEsSUFBQSxtSEFBQTtFQUFBO2lTQUFBOztBQUFBLFlBQUEsR0FBZSxPQUFBLENBQVEsa0VBQVIsQ0FBZixDQUFBOztBQUFBLGVBQ0EsR0FBa0IsT0FBQSxDQUFRLHFFQUFSLENBRGxCLENBQUE7O0FBQUEsYUFFQSxHQUFnQixPQUFBLENBQVEsbUVBQVIsQ0FGaEIsQ0FBQTs7QUFBQSxLQUlBLEdBQVEsT0FBQSxDQUFRLG1EQUFSLENBSlIsQ0FBQTs7QUFBQSxHQUtBLEdBQU0sT0FBQSxDQUFRLGlEQUFSLENBTE4sQ0FBQTs7QUFBQSxjQU1BLEdBQWlCLE9BQUEsQ0FBUSxtRUFBUixDQU5qQixDQUFBOztBQUFBLGlCQU9BLEdBQW9CLE9BQUEsQ0FBUSw2QkFBUixDQVBwQixDQUFBOztBQUFBO0FBVUksMkNBQUEsQ0FBQTs7OztHQUFBOztBQUFBLG1DQUFBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFDRixRQUFBLEdBQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxTQUFELEdBQWEsS0FBYixDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsU0FBRCxDQUFXLEdBQUEsQ0FBQSxpQkFBWCxDQUZBLENBQUE7QUFBQSxJQUtBLEdBQUEsR0FBTSxJQUFDLENBQUEsU0FBRCxDQUFXLEdBQUEsQ0FBQSxjQUFYLENBTE4sQ0FBQTtBQUFBLElBTUEsR0FBRyxDQUFDLElBQUosQ0FBUyxlQUFlLENBQUMsUUFBekIsQ0FOQSxDQUFBO0FBQUEsSUFPQSxHQUFHLENBQUMsWUFBSixHQUFtQixJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxJQUFkLENBUG5CLENBQUE7QUFBQSxJQVNBLElBQUMsQ0FBQSxRQUFELEdBQVk7QUFBQSxNQUNSLElBQUEsRUFBTSxVQURFO0FBQUEsTUFFUixDQUFBLEVBQUcsQ0FGSztBQUFBLE1BR1IsQ0FBQSxFQUFHLENBSEs7S0FUWixDQUFBO0FBQUEsSUFlQSxJQUFDLENBQUEsY0FBRCxHQUFrQixhQUFhLENBQUMsWUFBZCxDQUEyQixVQUEzQixFQUF1QyxLQUF2QyxDQWZsQixDQUFBO1dBZ0JBLGFBQWEsQ0FBQyxZQUFkLENBQTJCLElBQUMsQ0FBQSxjQUE1QixFQUE0QyxJQUFDLENBQUEsUUFBN0MsRUFqQkU7RUFBQSxDQUFOLENBQUE7O0FBQUEsbUNBb0JBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDTixRQUFBLE9BQUE7QUFBQSxJQUFBLGFBQWEsQ0FBQyxTQUFkLENBQXdCLElBQUMsQ0FBQSxjQUF6QixDQUFBLENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxHQUFELEdBQVcsSUFBQSxHQUFBLENBQUEsQ0FIWCxDQUFBO0FBQUEsSUFJQSxPQUFBLEdBQVUsSUFBQyxDQUFBLEdBQUcsQ0FBQyxPQUFMLENBQWEsd0JBQWIsQ0FKVixDQUFBO1dBS0EsT0FBTyxDQUFDLElBQVIsQ0FBYSxDQUFBLFNBQUEsS0FBQSxHQUFBO2FBQUEsU0FBQSxHQUFBO2VBQU0sS0FBQyxDQUFBLFNBQUQsR0FBYSxLQUFuQjtNQUFBLEVBQUE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWIsRUFOTTtFQUFBLENBcEJWLENBQUE7O0FBQUEsbUNBNkJBLFVBQUEsR0FBWSxTQUFBLEdBQUE7V0FBRyxhQUFhLENBQUMsWUFBZCxDQUEyQixJQUFDLENBQUEsY0FBNUIsRUFBSDtFQUFBLENBN0JaLENBQUE7O0FBQUEsbUNBZ0NBLE9BQUEsR0FBUyxTQUFDLEdBQUQsR0FBQTtBQUNMLElBQUEsSUFBRyxJQUFDLENBQUEsU0FBSjthQUNJLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixHQUFqQixFQUNJLElBQUMsQ0FBQSxRQUFRLENBQUMsQ0FEZCxFQUNpQixJQUFDLENBQUEsUUFBUSxDQUFDLENBRDNCLEVBRUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FGcEMsRUFFMkMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFGM0UsRUFESjtLQURLO0VBQUEsQ0FoQ1QsQ0FBQTs7Z0NBQUE7O0dBRGlDLE1BVHJDLENBQUE7O0FBQUEsTUFpRE0sQ0FBQyxPQUFQLEdBQWlCLHNCQWpEakIsQ0FBQTs7OztBQ0FBLElBQUEsaUZBQUE7RUFBQTtpU0FBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLDZDQUFSLENBQVIsQ0FBQTs7QUFBQSxJQUNBLEdBQU8sT0FBQSxDQUFRLDRDQUFSLENBRFAsQ0FBQTs7QUFBQSxZQUVBLEdBQWUsT0FBQSxDQUFRLDREQUFSLENBRmYsQ0FBQTs7QUFBQSxlQUdBLEdBQWtCLE9BQUEsQ0FBUSwrREFBUixDQUhsQixDQUFBOztBQUFBLFlBSUEsR0FBZSxPQUFBLENBQVEsNERBQVIsQ0FKZixDQUFBOztBQUFBLFlBS0EsR0FBZSxPQUFBLENBQVEsNERBQVIsQ0FMZixDQUFBOztBQUFBO0FBUUksOEJBQUEsQ0FBQTs7OztHQUFBOztBQUFBLHNCQUFBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFDRixJQUFBLElBQUMsQ0FBQSxLQUFELEdBQVMsRUFBVCxDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsR0FBRCxHQUFPLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FEaEMsQ0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsSUFBQyxDQUFBLFlBQVksQ0FBQyxJQUFkLENBQW1CLElBQW5CLENBRmpCLENBQUE7QUFBQSxJQUlBLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsS0FBQSxDQUFBLENBSmxCLENBQUE7QUFBQSxJQUtBLElBQUMsQ0FBQSxVQUFVLENBQUMsR0FBWixHQUFrQixxQ0FMbEIsQ0FBQTtBQUFBLElBUUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxNQVJmLENBQUE7QUFBQSxJQVVBLFlBQVksQ0FBQyxJQUFiLENBQWtCLGFBQWxCLEVBQWlDLDJDQUFqQyxDQVZBLENBQUE7QUFBQSxJQVdBLFlBQVksQ0FBQyxJQUFiLENBQWtCLFdBQWxCLEVBQStCLHlDQUEvQixDQVhBLENBQUE7QUFBQSxJQWNBLElBQUMsQ0FBQSxRQUFELENBQVUsd0JBQVYsQ0FkQSxDQUFBO1dBZUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSx5QkFBVixFQWhCRTtFQUFBLENBQU4sQ0FBQTs7QUFBQSxzQkFtQkEsUUFBQSxHQUFVLFNBQUMsUUFBRCxHQUFBO0FBQ04sUUFBQSxHQUFBO0FBQUEsSUFBQSxHQUFBLEdBQU0sSUFBSSxDQUFDLFFBQUwsQ0FBYyxRQUFkLENBQU4sQ0FBQTtXQUNBLEdBQUcsQ0FBQyxJQUFKLENBQVMsQ0FBQSxTQUFBLEtBQUEsR0FBQTthQUFBLFNBQUMsUUFBRCxHQUFBO0FBQ0wsWUFBQSxpQ0FBQTtBQUFBLFFBQUEsS0FBQyxDQUFBLEtBQU0sQ0FBQSxRQUFRLENBQUMsRUFBVCxDQUFQLEdBQXNCO0FBQUEsVUFDbEIsRUFBQSxFQUFJLFFBQVEsQ0FBQyxFQURLO0FBQUEsVUFFbEIsVUFBQSxFQUFZLFFBQVEsQ0FBQyxVQUZIO0FBQUEsVUFHbEIsUUFBQSxFQUFVLEVBSFE7QUFBQSxVQUlsQixPQUFBLEVBQVMsRUFKUztTQUF0QixDQUFBO0FBT0E7QUFBQTthQUFBLDJDQUFBOzZCQUFBO0FBRUksVUFBQSxJQUFHLE9BQU8sQ0FBQyxJQUFSLEtBQWdCLFFBQW5COzBCQUNJLEtBQUMsQ0FBQSxTQUFELENBQVcsUUFBUSxDQUFDLEVBQXBCLEVBQ0ksT0FBTyxDQUFDLElBRFosRUFFSSxPQUFPLENBQUMsQ0FGWixFQUdJLE9BQU8sQ0FBQyxDQUhaLEVBSUksT0FBTyxDQUFDLEtBSlosRUFLSSxPQUFPLENBQUMsTUFMWixFQU1JLE9BQU8sQ0FBQyxVQU5aLEVBT0ksT0FBTyxDQUFDLE1BUFosR0FESjtXQUFBLE1BQUE7a0NBQUE7V0FGSjtBQUFBO3dCQVJLO01BQUEsRUFBQTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBVCxFQUZNO0VBQUEsQ0FuQlYsQ0FBQTs7QUFBQSxzQkEwQ0EsU0FBQSxHQUFXLFNBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLEtBQW5CLEVBQTBCLE1BQTFCLEVBQWtDLFVBQWxDLEVBQThDLE1BQTlDLEdBQUE7QUFDUCxRQUFBLGVBQUE7QUFBQSxJQUFBLElBQUcsVUFBQSxLQUFjLFlBQWpCO0FBQW1DLE1BQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFpQixJQUFqQixFQUFvQixNQUFwQixDQUFWLENBQW5DO0tBQUE7QUFDQSxJQUFBLElBQUcsVUFBQSxLQUFjLGFBQWpCO0FBQW9DLE1BQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxXQUFXLENBQUMsSUFBYixDQUFrQixJQUFsQixFQUFxQixNQUFyQixDQUFWLENBQXBDO0tBREE7QUFBQSxJQUdBLE1BQUEsR0FDSTtBQUFBLE1BQUEsSUFBQSxFQUFNLElBQU47QUFBQSxNQUNBLENBQUEsRUFBRyxDQURIO0FBQUEsTUFFQSxDQUFBLEVBQUcsQ0FGSDtBQUFBLE1BR0EsS0FBQSxFQUFPLEtBSFA7QUFBQSxNQUlBLE1BQUEsRUFBUSxNQUpSO0FBQUEsTUFLQSxLQUFBLEVBQU8sT0FMUDtLQUpKLENBQUE7QUFXQSxJQUFBLElBQUcsQ0FBQSxJQUFLLENBQUEsS0FBTSxDQUFBLElBQUEsQ0FBZDtBQUF5QixNQUFBLElBQUMsQ0FBQSxLQUFNLENBQUEsSUFBQSxDQUFQLEdBQWUsRUFBZixDQUF6QjtLQVhBO0FBWUEsSUFBQSxJQUFHLENBQUEsSUFBSyxDQUFBLEtBQU0sQ0FBQSxJQUFBLENBQUssQ0FBQyxPQUFwQjtBQUFpQyxNQUFBLElBQUMsQ0FBQSxLQUFNLENBQUEsSUFBQSxDQUFLLENBQUMsT0FBYixHQUF1QixFQUF2QixDQUFqQztLQVpBO1dBYUEsSUFBQyxDQUFBLEtBQU0sQ0FBQSxJQUFBLENBQUssQ0FBQyxPQUFPLENBQUMsSUFBckIsQ0FBMEIsTUFBMUIsRUFkTztFQUFBLENBMUNYLENBQUE7O0FBQUEsc0JBMERBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDTixJQUFBLFlBQVksQ0FBQyxZQUFiLEdBQTRCLElBQUMsQ0FBQSxZQUFZLENBQUMsSUFBZCxDQUFtQixJQUFuQixDQUE1QixDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsV0FBRCxHQUFlLE1BRGYsQ0FBQTtXQUVBLElBQUMsQ0FBQSxVQUFELENBQUEsRUFITTtFQUFBLENBMURWLENBQUE7O0FBQUEsc0JBK0RBLFVBQUEsR0FBWSxTQUFBLEdBQUE7V0FBRyxZQUFZLENBQUMsWUFBYixHQUE0QixLQUEvQjtFQUFBLENBL0RaLENBQUE7O0FBQUEsc0JBaUVBLFVBQUEsR0FBWSxTQUFDLE9BQUQsR0FBQTtBQUNSLElBQUEsSUFBRyxPQUFBLEtBQVcsTUFBZDtBQUNJLE1BQUEsWUFBWSxDQUFDLElBQWIsQ0FBa0IsV0FBbEIsQ0FBQSxDQURKO0tBQUEsTUFBQTtBQUdJLE1BQUEsWUFBWSxDQUFDLElBQWIsQ0FBa0IsYUFBbEIsQ0FBQSxDQUhKO0tBQUE7QUFBQSxJQUtBLElBQUMsQ0FBQSxXQUFELEdBQWUsT0FMZixDQUFBO1dBTUEsSUFBQyxDQUFBLFVBQUQsQ0FBQSxFQVBRO0VBQUEsQ0FqRVosQ0FBQTs7QUFBQSxzQkEwRUEsV0FBQSxHQUFhLFNBQUMsS0FBRCxHQUFBO0FBQ1QsSUFBQSxZQUFZLENBQUMsSUFBYixDQUFrQixhQUFsQixDQUFBLENBQUE7V0FDQSxZQUFZLENBQUMsUUFBYixDQUFzQixLQUF0QixFQUZTO0VBQUEsQ0ExRWIsQ0FBQTs7QUFBQSxzQkE4RUEsWUFBQSxHQUFjLFNBQUMsQ0FBRCxHQUFBO0FBQ1YsUUFBQSxNQUFBO0FBQUEsSUFBQSxNQUFBLEdBQVMsSUFBQyxDQUFBLGtCQUFELENBQW9CLENBQUMsQ0FBQyxDQUF0QixFQUF5QixDQUFDLENBQUMsQ0FBM0IsQ0FBVCxDQUFBO0FBQ0EsSUFBQSxJQUFHLE1BQUg7YUFBZSxNQUFNLENBQUMsS0FBUCxDQUFBLEVBQWY7S0FGVTtFQUFBLENBOUVkLENBQUE7O0FBQUEsc0JBa0ZBLGtCQUFBLEdBQW9CLFNBQUMsQ0FBRCxFQUFJLENBQUosR0FBQTtBQUNoQixRQUFBLDRCQUFBO0FBQUEsSUFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBLEtBQU0sQ0FBQSxJQUFDLENBQUEsV0FBRCxDQUFkLENBQUE7QUFDQTtBQUFBLFNBQUEsMkNBQUE7d0JBQUE7QUFDSSxNQUFBLElBQUcsSUFBQyxDQUFBLGFBQUQsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLEVBQXFCLE1BQU0sQ0FBQyxDQUE1QixFQUErQixNQUFNLENBQUMsQ0FBdEMsRUFBeUMsTUFBTSxDQUFDLEtBQWhELEVBQXVELE1BQU0sQ0FBQyxNQUE5RCxDQUFIO0FBQ0ksZUFBTyxNQUFQLENBREo7T0FESjtBQUFBLEtBRmdCO0VBQUEsQ0FsRnBCLENBQUE7O0FBQUEsc0JBd0ZBLGFBQUEsR0FBZSxTQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sRUFBUCxFQUFXLEVBQVgsRUFBZSxFQUFmLEVBQW1CLEVBQW5CLEdBQUE7QUFBMEIsV0FBTyxDQUFBLElBQUssRUFBTCxJQUFXLENBQUEsSUFBSyxFQUFBLEdBQUssRUFBckIsSUFBMkIsQ0FBQSxJQUFLLEVBQWhDLElBQXNDLENBQUEsSUFBSyxFQUFBLEdBQUssRUFBdkQsQ0FBMUI7RUFBQSxDQXhGZixDQUFBOztBQUFBLHNCQTBGQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1IsUUFBQSxzQ0FBQTtBQUFBLElBQUEsSUFBQyxDQUFBLGdCQUFELENBQUEsQ0FBQSxDQUFBO0FBQUEsSUFDQSxJQUFBLEdBQU8sSUFBQyxDQUFBLEtBQU0sQ0FBQSxJQUFDLENBQUEsV0FBRCxDQURkLENBQUE7QUFFQTtBQUFBO1NBQUEsMkNBQUE7d0JBQUE7QUFDSSxvQkFBQSxJQUFDLENBQUEsWUFBRCxDQUFjLE1BQWQsRUFBQSxDQURKO0FBQUE7b0JBSFE7RUFBQSxDQTFGWixDQUFBOztBQUFBLHNCQWdHQSxnQkFBQSxHQUFrQixTQUFBLEdBQUE7V0FDZCxlQUFlLENBQUMsU0FBaEIsQ0FBMEIsSUFBQyxDQUFBLEdBQTNCLEVBQWdDLElBQUMsQ0FBQSxVQUFqQyxFQUNJLElBQUMsQ0FBQSxVQUFVLENBQUMsS0FEaEIsRUFDdUIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQURuQyxFQUVJLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBRnBDLEVBRTJDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BRjNFLEVBRGM7RUFBQSxDQWhHbEIsQ0FBQTs7QUFBQSxzQkFxR0EsWUFBQSxHQUFjLFNBQUMsTUFBRCxFQUFTLEtBQVQsR0FBQTtBQUNWLFFBQUEsUUFBQTs7TUFEbUIsUUFBUTtLQUMzQjtBQUFBLElBQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxTQUFMLEdBQWlCLE1BQWpCLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxHQUFtQixNQURuQixDQUFBO0FBR0EsSUFBQSxJQUFHLEtBQUg7QUFDSSxNQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsVUFBTCxHQUFrQixFQUFsQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLFdBQUwsR0FBbUIsUUFEbkIsQ0FESjtLQUhBO0FBQUEsSUFPQSxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsQ0FBYyxNQUFNLENBQUMsQ0FBckIsRUFBd0IsTUFBTSxDQUFDLENBQS9CLEVBQWtDLE1BQU0sQ0FBQyxLQUF6QyxFQUFnRCxNQUFNLENBQUMsTUFBdkQsQ0FQQSxDQUFBO0FBU0EsSUFBQSxJQUF1QixLQUF2QjtBQUFBLE1BQUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxVQUFMLEdBQWtCLENBQWxCLENBQUE7S0FUQTtBQUFBLElBV0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxVQUFMLENBQWdCLE1BQU0sQ0FBQyxDQUF2QixFQUEwQixNQUFNLENBQUMsQ0FBakMsRUFBb0MsTUFBTSxDQUFDLEtBQTNDLEVBQWtELE1BQU0sQ0FBQyxNQUF6RCxDQVhBLENBQUE7QUFBQSxJQWFBLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBTCxHQUFpQixNQWJqQixDQUFBO0FBQUEsSUFjQSxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsR0FBWSx3QkFkWixDQUFBO0FBQUEsSUFlQSxJQUFDLENBQUEsR0FBRyxDQUFDLFlBQUwsR0FBb0IsS0FmcEIsQ0FBQTtBQUFBLElBZ0JBLFFBQUEsR0FBVyxJQUFDLENBQUEsR0FBRyxDQUFDLFdBQUwsQ0FBaUIsTUFBTSxDQUFDLElBQXhCLENBaEJYLENBQUE7V0FpQkEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxRQUFMLENBQWMsTUFBTSxDQUFDLElBQXJCLEVBQTJCLE1BQU0sQ0FBQyxDQUFQLEdBQVcsR0FBWCxHQUFpQixDQUFDLFFBQVEsQ0FBQyxLQUFULEdBQWlCLENBQWxCLENBQTVDLEVBQWtFLE1BQU0sQ0FBQyxDQUFQLEdBQVcsQ0FBN0UsRUFsQlU7RUFBQSxDQXJHZCxDQUFBOzttQkFBQTs7R0FEb0IsTUFQeEIsQ0FBQTs7QUFBQSxNQWtJTSxDQUFDLE9BQVAsR0FBaUIsU0FsSWpCLENBQUE7Ozs7QUNBQSxJQUFBLGdFQUFBO0VBQUE7aVNBQUE7O0FBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSw2Q0FBUixDQUFSLENBQUE7O0FBQUEsWUFDQSxHQUFlLE9BQUEsQ0FBUSw0REFBUixDQURmLENBQUE7O0FBQUEsZUFFQSxHQUFrQixPQUFBLENBQVEsK0RBQVIsQ0FGbEIsQ0FBQTs7QUFBQSxZQUdBLEdBQWUsT0FBQSxDQUFRLDREQUFSLENBSGYsQ0FBQTs7QUFBQTtBQU1JLGlDQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSx5QkFBQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBQ0YsSUFBQSxJQUFDLENBQUEsR0FBRCxHQUNJO0FBQUEsTUFBQSxDQUFBLEVBQUcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFoQyxHQUF3QyxDQUF6QyxDQUFBLEdBQThDLEdBQWpEO0FBQUEsTUFDQSxDQUFBLEVBQUcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFoQyxHQUF5QyxDQUExQyxDQUFBLEdBQStDLEVBRGxEO0FBQUEsTUFFQSxLQUFBLEVBQU8sR0FGUDtBQUFBLE1BR0EsTUFBQSxFQUFRLEVBSFI7S0FESixDQUFBO0FBQUEsSUFNQSxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsR0FBYyxJQUFDLENBQUEsR0FBRyxDQUFDLENBQUwsR0FBUyxDQUFDLElBQUMsQ0FBQSxHQUFHLENBQUMsS0FBTCxHQUFhLENBQWQsQ0FOdkIsQ0FBQTtXQVFBLElBQUMsQ0FBQSxHQUFELEdBQU8sZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQVQ5QjtFQUFBLENBQU4sQ0FBQTs7QUFBQSx5QkFZQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ04sUUFBQSxTQUFBO0FBQUEsSUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLFNBQUwsR0FBaUIsTUFBakIsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxRQUFMLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFwRCxFQUEyRCxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUEzRixDQURBLENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixDQUFsQixDQUhBLENBQUE7QUFBQSxJQUlBLElBQUMsQ0FBQSxpQkFBRCxDQUFtQixZQUFuQixDQUpBLENBQUE7QUFBQSxJQU1BLFlBQVksQ0FBQyxVQUFiLEdBQTBCLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixDQUFpQixJQUFqQixDQU4xQixDQUFBO0FBQUEsSUFRQSxTQUFBLEdBQVksWUFBWSxDQUFDLElBQWIsQ0FBa0IseUJBQWxCLENBUlosQ0FBQTtXQVNBLFNBQVMsQ0FBQyxJQUFWLENBQWUsU0FBQSxHQUFBO2FBQUcsWUFBWSxDQUFDLFFBQWIsQ0FBc0IsTUFBdEIsRUFBSDtJQUFBLENBQWYsRUFWTTtFQUFBLENBWlYsQ0FBQTs7QUFBQSx5QkF5QkEsVUFBQSxHQUFZLFNBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxNQUFmLEVBQXVCLEtBQXZCLEdBQUE7QUFDUixJQUFBLElBQUMsQ0FBQSxHQUFHLENBQUMsU0FBTCxHQUFpQixNQUFqQixDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsR0FBRyxDQUFDLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQXBELEVBQTJELGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQTNGLENBREEsQ0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLGlCQUFELENBQW9CLFVBQUEsR0FBUyxLQUFULEdBQWdCLEtBQXBDLENBRkEsQ0FBQTtXQUdBLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixNQUFBLEdBQVMsS0FBM0IsRUFKUTtFQUFBLENBekJaLENBQUE7O0FBQUEseUJBZ0NBLGlCQUFBLEdBQW1CLFNBQUMsSUFBRCxHQUFBO0FBQ2YsUUFBQSxRQUFBO0FBQUEsSUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLFNBQUwsR0FBaUIsTUFBakIsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLEdBQVksd0JBRFosQ0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxZQUFMLEdBQW9CLEtBRnBCLENBQUE7QUFBQSxJQUdBLFFBQUEsR0FBVyxJQUFDLENBQUEsR0FBRyxDQUFDLFdBQUwsQ0FBaUIsSUFBakIsQ0FIWCxDQUFBO1dBSUEsSUFBQyxDQUFBLEdBQUcsQ0FBQyxRQUFMLENBQWMsSUFBZCxFQUFvQixJQUFDLENBQUEsR0FBRyxDQUFDLE1BQUwsR0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFULEdBQWlCLENBQWxCLENBQWxDLEVBQXdELElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBTCxHQUFTLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBZCxHQUF1QixFQUEvRSxFQUxlO0VBQUEsQ0FoQ25CLENBQUE7O0FBQUEseUJBd0NBLGdCQUFBLEdBQWtCLFNBQUMsT0FBRCxHQUFBO0FBQ2QsSUFBQSxJQUFDLENBQUEsR0FBRyxDQUFDLFNBQUwsR0FBaUIsTUFBakIsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxXQUFMLEdBQW1CLE1BRG5CLENBQUE7QUFBQSxJQUVBLElBQUMsQ0FBQSxHQUFHLENBQUMsVUFBTCxDQUFnQixJQUFDLENBQUEsR0FBRyxDQUFDLENBQXJCLEVBQXdCLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBN0IsRUFBZ0MsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFyQyxFQUE0QyxJQUFDLENBQUEsR0FBRyxDQUFDLE1BQWpELENBRkEsQ0FBQTtXQUdBLElBQUMsQ0FBQSxHQUFHLENBQUMsUUFBTCxDQUFjLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBTCxHQUFTLENBQXZCLEVBQTBCLElBQUMsQ0FBQSxHQUFHLENBQUMsQ0FBTCxHQUFTLENBQW5DLEVBQXNDLENBQUMsSUFBQyxDQUFBLEdBQUcsQ0FBQyxLQUFMLEdBQWEsQ0FBZCxDQUFBLEdBQW1CLE9BQXpELEVBQWtFLElBQUMsQ0FBQSxHQUFHLENBQUMsTUFBTCxHQUFjLENBQWhGLEVBSmM7RUFBQSxDQXhDbEIsQ0FBQTs7c0JBQUE7O0dBRHVCLE1BTDNCLENBQUE7O0FBQUEsTUFxRE0sQ0FBQyxPQUFQLEdBQWlCLFlBckRqQixDQUFBOzs7O0FDQUEsSUFBQSx1QkFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLDJDQUFSLENBQVQsQ0FBQTs7QUFBQSxTQUVBLEdBQVksT0FBQSxDQUFRLDBCQUFSLENBRlosQ0FBQTs7QUFBQSxJQUtBLEdBQU8sR0FBQSxDQUFBLE1BTFAsQ0FBQTs7QUFBQSxJQU1JLENBQUMsS0FBTCxDQUFXLEdBQUEsQ0FBQSxTQUFYLENBTkEsQ0FBQTs7OztBQ0FBLElBQUEsb0JBQUE7O0FBQUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSwrQkFBUixDQUFmLENBQUE7O0FBQUE7QUFHaUIsRUFBQSxnQkFBQSxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsWUFBRCxHQUFnQixJQUFJLENBQUMsR0FBTCxDQUFBLENBQWhCLENBRFM7RUFBQSxDQUFiOztBQUFBLG1CQUdBLEtBQUEsR0FBTyxTQUFDLEtBQUQsR0FBQTtBQUNILElBQUEsWUFBWSxDQUFDLEdBQWIsQ0FBaUIsTUFBakIsRUFBeUIsS0FBekIsQ0FBQSxDQUFBO0FBQUEsSUFDQSxLQUFLLENBQUMsSUFBTixDQUFBLENBREEsQ0FBQTtBQUFBLElBRUEsWUFBWSxDQUFDLFFBQWIsQ0FBc0IsTUFBdEIsQ0FGQSxDQUFBO1dBR0EsSUFBQyxDQUFBLFFBQUQsQ0FBQSxFQUpHO0VBQUEsQ0FIUCxDQUFBOztBQUFBLG1CQVNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDTixJQUFBLHFCQUFBLENBQXNCLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLElBQWYsQ0FBdEIsQ0FBQSxDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsZUFBRCxHQUFtQixJQUFJLENBQUMsR0FBTCxDQUFBLENBRm5CLENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLGVBQUQsR0FBbUIsSUFBQyxDQUFBLFlBSDdCLENBQUE7QUFBQSxJQUlBLElBQUMsQ0FBQSxZQUFELEdBQWdCLElBQUMsQ0FBQSxlQUpqQixDQUFBO0FBQUEsSUFNQSxJQUFDLENBQUEsTUFBRCxDQUFRLElBQUMsQ0FBQSxLQUFULENBTkEsQ0FBQTtBQU9BLFdBQU8sSUFBUCxDQVJNO0VBQUEsQ0FUVixDQUFBOztBQUFBLG1CQW1CQSxNQUFBLEdBQVEsU0FBQyxFQUFELEdBQUE7QUFDSixRQUFBLDZCQUFBO0FBQUEsSUFBQSxLQUFBLEdBQVEsWUFBWSxDQUFDLE9BQWIsQ0FBQSxDQUFSLENBQUE7QUFFQTtBQUFBLFNBQUEsMkNBQUE7d0JBQUE7QUFDSSxNQUFBLE1BQU0sQ0FBQyxNQUFQLENBQWMsRUFBZCxDQUFBLENBREo7QUFBQSxLQUZBO0FBSUEsV0FBTyxJQUFQLENBTEk7RUFBQSxDQW5CUixDQUFBOztnQkFBQTs7SUFISixDQUFBOztBQUFBLE1BOEJNLENBQUMsT0FBUCxHQUFpQixNQTlCakIsQ0FBQTs7OztBQ0FBLElBQUEsWUFBQTs7QUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLDZCQUFSLENBQVAsQ0FBQTs7QUFBQTtBQUdpQixFQUFBLGdCQUFBLEdBQUE7QUFDVCxJQUFBLElBQUMsQ0FBQSxFQUFELEdBQU0sSUFBTixDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsVUFBRCxHQUFjLEVBRGQsQ0FEUztFQUFBLENBQWI7O2dCQUFBOztJQUhKLENBQUE7O0FBQUEsTUFPTSxDQUFDLE9BQVAsR0FBaUIsTUFQakIsQ0FBQTs7OztBQ0FBLElBQUEsa0JBQUE7O0FBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxnQkFBUixDQUFQLENBQUE7O0FBQUE7NEJBR0k7O0FBQUEsRUFBQSxZQUFDLENBQUEsTUFBRCxHQUFVLEVBQVYsQ0FBQTs7QUFBQSxFQUNBLFlBQUMsQ0FBQSxTQUFELEdBQWEsQ0FEYixDQUFBOztBQUFBLEVBRUEsWUFBQyxDQUFBLFlBQUQsR0FBZ0IsQ0FGaEIsQ0FBQTs7QUFBQSxFQUlBLFlBQUMsQ0FBQSxJQUFELEdBQU8sU0FBQyxRQUFELEdBQUE7QUFDSCxRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBYyxJQUFBLE9BQUEsQ0FBUSxTQUFDLE9BQUQsRUFBVSxNQUFWLEdBQUE7QUFDbEIsVUFBQSxZQUFBO0FBQUEsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFhLHdCQUFBLEdBQXVCLFFBQXBDLENBQUEsQ0FBQTtBQUFBLE1BQ0EsWUFBQSxHQUFlLElBQUksQ0FBQyxRQUFMLENBQWMsUUFBZCxDQURmLENBQUE7YUFFQSxZQUFZLENBQUMsSUFBYixDQUFrQixTQUFDLElBQUQsR0FBQTtBQUNkLFlBQUEsMkRBQUE7QUFBQTtBQUFBLGFBQUEsU0FBQTswQkFBQTtBQUNJLGVBQUEsNENBQUE7OEJBQUE7QUFDSSxZQUFBLFlBQVksQ0FBQyxTQUFiLEVBQUEsQ0FESjtBQUFBLFdBREo7QUFBQSxTQUFBO0FBSUE7QUFBQTthQUFBLGtCQUFBO21DQUFBO0FBQ0k7O0FBQUE7aUJBQUEsOENBQUE7Z0NBQUE7QUFDSSw2QkFBRyxDQUFBLFNBQUMsS0FBRCxHQUFBO0FBQ0Msb0JBQUEsU0FBQTtBQUFBLGdCQUFBLFNBQUEsR0FBWSxJQUFJLENBQUMsSUFBTCxDQUFVLElBQUksQ0FBQyxJQUFMLEdBQVksS0FBdEIsQ0FBWixDQUFBO3VCQUNBLFNBQVMsQ0FBQyxJQUFWLENBQWUsU0FBQyxJQUFELEdBQUE7QUFDWCxrQkFBQSxZQUFZLENBQUMsTUFBTyxDQUFBLEtBQUEsQ0FBcEIsR0FBNkIsSUFBN0IsQ0FBQTtBQUFBLGtCQUNBLFlBQVksQ0FBQyxZQUFiLEVBREEsQ0FBQTtBQUFBLGtCQUdBLFlBQVksQ0FBQyxVQUFiLENBQXdCLEtBQXhCLEVBQ0ksU0FESixFQUVJLFlBQVksQ0FBQyxZQUZqQixFQUdJLFlBQVksQ0FBQyxTQUhqQixDQUhBLENBQUE7QUFRQSxrQkFBQSxJQUFHLFlBQVksQ0FBQyxZQUFiLEtBQTZCLFlBQVksQ0FBQyxTQUE3QztBQUNJLG9CQUFBLFlBQVksQ0FBQyxRQUFiLENBQUEsQ0FBQSxDQUFBOzJCQUNBLE9BQUEsQ0FBQSxFQUZKO21CQVRXO2dCQUFBLENBQWYsRUFGRDtjQUFBLENBQUEsQ0FBSCxDQUFJLEtBQUosRUFBQSxDQURKO0FBQUE7O2VBQUEsQ0FESjtBQUFBO3dCQUxjO01BQUEsQ0FBbEIsRUFIa0I7SUFBQSxDQUFSLENBQWQsQ0FBQTtBQXdCQSxXQUFPLE9BQVAsQ0F6Qkc7RUFBQSxDQUpQLENBQUE7O0FBQUEsRUFpQ0EsWUFBQyxDQUFBLFVBQUQsR0FBYSxTQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixLQUF2QixHQUFBLENBakNiLENBQUE7O0FBQUEsRUFrQ0EsWUFBQyxDQUFBLFFBQUQsR0FBVyxTQUFBLEdBQUEsQ0FsQ1gsQ0FBQTs7QUFBQSxFQW9DQSxZQUFDLENBQUEsR0FBRCxHQUFNLFNBQUMsS0FBRCxHQUFBO1dBQVcsWUFBWSxDQUFDLE1BQU8sQ0FBQSxLQUFBLEVBQS9CO0VBQUEsQ0FwQ04sQ0FBQTs7c0JBQUE7O0lBSEosQ0FBQTs7QUFBQSxNQTBDTSxDQUFDLE9BQVAsR0FBaUIsWUExQ2pCLENBQUE7Ozs7QUNBQSxJQUFBLFlBQUE7O0FBQUE7NEJBQ0k7O0FBQUEsRUFBQSxZQUFDLENBQUEsTUFBRCxHQUFTLEVBQVQsQ0FBQTs7QUFBQSxFQUVBLFlBQUMsQ0FBQSxJQUFELEdBQU8sU0FBQyxFQUFELEVBQUssU0FBTCxHQUFBO0FBQ0gsUUFBQSxLQUFBO0FBQUEsSUFBQSxLQUFBLEdBQVEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUixDQUFBO0FBQUEsSUFDQSxLQUFLLENBQUMsR0FBTixHQUFZLFNBRFosQ0FBQTtXQUVBLFlBQVksQ0FBQyxNQUFPLENBQUEsRUFBQSxDQUFwQixHQUEwQixNQUh2QjtFQUFBLENBRlAsQ0FBQTs7QUFBQSxFQU9BLFlBQUMsQ0FBQSxJQUFELEdBQU8sU0FBQyxFQUFELEdBQUE7QUFDSCxRQUFBLEtBQUE7QUFBQSxJQUFBLEtBQUEsR0FBUSxZQUFZLENBQUMsTUFBTyxDQUFBLEVBQUEsQ0FBNUIsQ0FBQTtBQUNBLElBQUEsSUFBRyxLQUFIO0FBQ0ksTUFBQSxLQUFLLENBQUMsS0FBTixDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsS0FBSyxDQUFDLFdBQU4sR0FBb0IsQ0FEcEIsQ0FBQTthQUVBLEtBQUssQ0FBQyxJQUFOLENBQUEsRUFISjtLQUZHO0VBQUEsQ0FQUCxDQUFBOztzQkFBQTs7SUFESixDQUFBOztBQUFBLE1BZU0sQ0FBQyxPQUFQLEdBQWlCLFlBZmpCLENBQUE7Ozs7QUNBQSxJQUFBLDJCQUFBOztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsZ0NBQVIsQ0FBUCxDQUFBOztBQUFBLE1BQ0EsR0FBUyxPQUFBLENBQVEsa0JBQVIsQ0FEVCxDQUFBOztBQUFBOzZCQUlJOztBQUFBLEVBQUEsYUFBQyxDQUFBLFFBQUQsR0FBWSxFQUFaLENBQUE7O0FBQUEsRUFFQSxhQUFDLENBQUEsWUFBRCxHQUFlLFNBQUMsRUFBRCxFQUFLLFNBQUwsR0FBQTtBQUNYLFFBQUEsTUFBQTs7TUFEZ0IsWUFBWTtLQUM1Qjs7TUFBQSxLQUFNLElBQUksQ0FBQyxFQUFMLENBQUE7S0FBTjtBQUFBLElBQ0EsTUFBQSxHQUFTLEdBQUEsQ0FBQSxNQURULENBQUE7QUFBQSxJQUVBLE1BQU0sQ0FBQyxFQUFQLEdBQVksRUFGWixDQUFBO0FBR0EsSUFBQSxJQUFxQixTQUFyQjtBQUFBLE1BQUEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxNQUFYLENBQUEsQ0FBQTtLQUhBO0FBSUEsV0FBTyxNQUFQLENBTFc7RUFBQSxDQUZmLENBQUE7O0FBQUEsRUFTQSxhQUFDLENBQUEsU0FBRCxHQUFZLFNBQUMsTUFBRCxHQUFBO1dBQVksSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLENBQWUsTUFBZixFQUFaO0VBQUEsQ0FUWixDQUFBOztBQUFBLEVBV0EsYUFBQyxDQUFBLFlBQUQsR0FBZSxTQUFDLE1BQUQsR0FBQTtBQUVYLFFBQUEsMkJBQUE7QUFBQSxJQUFBLEtBQUEsR0FBUSxDQUFBLENBQVIsQ0FBQTtBQUNBO0FBQUEsU0FBQSxtREFBQTtrQkFBQTtBQUNJLE1BQUEsSUFBRyxDQUFBLEtBQUssTUFBUjtBQUFvQixRQUFBLEtBQUEsR0FBUSxDQUFSLENBQXBCO09BREo7QUFBQSxLQURBO0FBQUEsSUFLQSxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsQ0FBaUIsS0FBakIsRUFBd0IsQ0FBeEIsQ0FMQSxDQUFBO0FBT0EsV0FBTyxNQUFQLENBVFc7RUFBQSxDQVhmLENBQUE7O0FBQUEsRUFzQkEsYUFBQyxDQUFBLFlBQUQsR0FBZSxTQUFDLE1BQUQsR0FBQTtBQUNYLElBQUEsTUFBTSxDQUFDLG1CQUFQLENBQUEsQ0FBQSxDQUFBO1dBQ0EsSUFBQyxDQUFBLFlBQUQsQ0FBYyxNQUFkLEVBRlc7RUFBQSxDQXRCZixDQUFBOztBQUFBLEVBMEJBLGFBQUMsQ0FBQSxhQUFELEdBQWdCLFNBQUEsR0FBQSxDQTFCaEIsQ0FBQTs7QUFBQSxFQTJCQSxhQUFDLENBQUEsaUNBQUQsR0FBb0MsU0FBQSxHQUFBLENBM0JwQyxDQUFBOztBQUFBLEVBNkJBLGFBQUMsQ0FBQSxrQ0FBRCxHQUFxQyxTQUFDLGNBQUQsR0FBQTtBQUNqQyxRQUFBLDZFQUFBO0FBQUEsSUFBQSxRQUFBLEdBQVcsRUFBWCxDQUFBO0FBQ0E7QUFBQSxTQUFBLDJDQUFBO3dCQUFBO0FBQ0ksTUFBQSxjQUFBLEdBQWlCLENBQWpCLENBQUE7QUFDQTtBQUFBLFdBQUEsOENBQUE7OEJBQUE7QUFDSSxRQUFBLElBQUcsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsU0FBUyxDQUFDLElBQWpDLENBQUEsR0FBeUMsQ0FBQSxDQUE1QztBQUFvRCxVQUFBLGNBQUEsRUFBQSxDQUFwRDtTQURKO0FBQUEsT0FEQTtBQUdBLE1BQUEsSUFBRyxjQUFBLEtBQWtCLGNBQWMsQ0FBQyxNQUFwQztBQUFnRCxRQUFBLFFBQVEsQ0FBQyxJQUFULENBQWMsTUFBZCxDQUFBLENBQWhEO09BSko7QUFBQSxLQURBO0FBTUEsV0FBTyxRQUFQLENBUGlDO0VBQUEsQ0E3QnJDLENBQUE7O0FBQUEsRUFzQ0EsYUFBQyxDQUFBLFlBQUQsR0FBZSxTQUFDLE1BQUQsRUFBUyxTQUFULEdBQUE7V0FBdUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFsQixDQUF1QixTQUF2QixFQUF2QjtFQUFBLENBdENmLENBQUE7O0FBQUEsRUF3Q0EsYUFBQyxDQUFBLFlBQUQsR0FBZSxTQUFBLEdBQUEsQ0F4Q2YsQ0FBQTs7QUFBQSxFQTBDQSxhQUFDLENBQUEsa0JBQUQsR0FBcUIsU0FBQyxNQUFELEVBQVMsYUFBVCxHQUFBO0FBQ2pCLFFBQUEseUJBQUE7QUFBQTtBQUFBLFNBQUEsMkNBQUE7MkJBQUE7QUFDSSxNQUFBLElBQUcsU0FBUyxDQUFDLElBQVYsS0FBa0IsYUFBckI7QUFBd0MsZUFBTyxTQUFQLENBQXhDO09BREo7QUFBQSxLQUFBO0FBRUEsV0FBTyxJQUFQLENBSGlCO0VBQUEsQ0ExQ3JCLENBQUE7O0FBQUEsRUErQ0EsYUFBQyxDQUFBLG1CQUFELEdBQXNCLFNBQUMsTUFBRCxHQUFBO1dBQVksTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFsQixHQUEyQixFQUF2QztFQUFBLENBL0N0QixDQUFBOzt1QkFBQTs7SUFKSixDQUFBOztBQUFBLE1BeURNLENBQUMsT0FBUCxHQUFpQixhQXpEakIsQ0FBQTs7OztBQ0FBLElBQUEsZUFBQTs7QUFBQTsrQkFFSTs7QUFBQSxFQUFBLGVBQUMsQ0FBQSxZQUFELEdBQWUsU0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixRQUFoQixHQUFBO0FBQ1gsUUFBQSxNQUFBO0FBQUEsSUFBQSxNQUFBLEdBQVMsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBVCxDQUFBO0FBQUEsSUFDQSxNQUFNLENBQUMsS0FBUCxHQUFlLEtBRGYsQ0FBQTtBQUFBLElBRUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsTUFGaEIsQ0FBQTtBQUlBLElBQUEsSUFBRyxRQUFIO0FBQWlCLE1BQUEsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsTUFBckIsQ0FBQSxDQUFqQjtLQUpBO0FBTUEsV0FBTyxNQUFQLENBUFc7RUFBQSxDQUFmLENBQUE7O0FBQUEsRUFVQSxlQUFDLENBQUEsY0FBRCxHQUFpQixTQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLFFBQWhCLEdBQUE7QUFDYixRQUFBLFFBQUE7QUFBQSxJQUFBLFFBQUEsR0FBVyxFQUFYLENBQUE7QUFBQSxJQUNBLFFBQVEsQ0FBQyxNQUFULEdBQWtCLGVBQWUsQ0FBQyxZQUFoQixDQUE2QixLQUE3QixFQUFvQyxNQUFwQyxFQUE0QyxRQUE1QyxDQURsQixDQUFBO0FBQUEsSUFFQSxRQUFRLENBQUMsR0FBVCxHQUFlLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBaEIsQ0FBMkIsSUFBM0IsQ0FGZixDQUFBO0FBR0EsV0FBTyxRQUFQLENBSmE7RUFBQSxDQVZqQixDQUFBOztBQUFBLEVBaUJBLGVBQUMsQ0FBQSxTQUFELEdBQVksU0FBQyxHQUFELEVBQU0sS0FBTixFQUFhLFVBQWIsRUFBeUIsV0FBekIsRUFBc0MsZ0JBQXRDLEVBQXdELGlCQUF4RCxHQUFBO0FBQ1IsUUFBQSwyQ0FBQTtBQUFBLElBQUEsVUFBQSxHQUFhLFVBQUEsR0FBYSxXQUExQixDQUFBO0FBQUEsSUFDQSxnQkFBQSxHQUFtQixnQkFBQSxHQUFtQixpQkFEdEMsQ0FBQTtBQUFBLElBR0EsS0FBQSxHQUFRLGdCQUhSLENBQUE7QUFBQSxJQUlBLE1BQUEsR0FBUyxpQkFKVCxDQUFBO0FBTUEsSUFBQSxJQUFHLGdCQUFBLEdBQW1CLFVBQXRCO0FBQ0ksTUFBQSxNQUFBLEdBQVMsZ0JBQUEsR0FBbUIsVUFBNUIsQ0FESjtLQUFBLE1BQUE7QUFHSSxNQUFBLEtBQUEsR0FBUSxpQkFBQSxHQUFvQixVQUE1QixDQUhKO0tBTkE7V0FXQSxHQUFHLENBQUMsU0FBSixDQUFjLEtBQWQsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsVUFBM0IsRUFBdUMsV0FBdkMsRUFBb0QsQ0FBcEQsRUFBdUQsQ0FBdkQsRUFBMEQsS0FBMUQsRUFBaUUsTUFBakUsRUFaUTtFQUFBLENBakJaLENBQUE7O0FBQUEsRUFnQ0EsZUFBQyxDQUFBLFFBQUQsR0FBVyxTQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWEsVUFBYixFQUF5QixXQUF6QixFQUFzQyxnQkFBdEMsRUFBd0QsaUJBQXhELEdBQUE7QUFDUCxRQUFBLDJDQUFBO0FBQUEsSUFBQSxVQUFBLEdBQWEsVUFBQSxHQUFhLFdBQTFCLENBQUE7QUFBQSxJQUNBLGdCQUFBLEdBQW1CLGdCQUFBLEdBQW1CLGlCQUR0QyxDQUFBO0FBQUEsSUFHQSxLQUFBLEdBQVEsZ0JBSFIsQ0FBQTtBQUFBLElBSUEsTUFBQSxHQUFTLGlCQUpULENBQUE7QUFNQSxJQUFBLElBQUcsZ0JBQUEsR0FBbUIsVUFBdEI7QUFDSSxNQUFBLEtBQUEsR0FBUSxVQUFBLEdBQWEsaUJBQWIsR0FBaUMsV0FBekMsQ0FBQTtBQUFBLE1BQ0EsTUFBQSxHQUFTLGlCQURULENBREo7S0FBQSxNQUFBO0FBSUksTUFBQSxLQUFBLEdBQVEsZ0JBQVIsQ0FBQTtBQUFBLE1BQ0EsTUFBQSxHQUFTLFdBQUEsR0FBYyxnQkFBZCxHQUFpQyxVQUQxQyxDQUpKO0tBTkE7V0FhQSxHQUFHLENBQUMsU0FBSixDQUFjLEtBQWQsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsVUFBM0IsRUFBdUMsV0FBdkMsRUFBb0QsQ0FBcEQsRUFBdUQsQ0FBdkQsRUFBMEQsS0FBMUQsRUFBaUUsTUFBakUsRUFkTztFQUFBLENBaENYLENBQUE7O3lCQUFBOztJQUZKLENBQUE7O0FBQUEsTUFtRE0sQ0FBQyxPQUFQLEdBQWlCLGVBbkRqQixDQUFBOzs7O0FDQUEsSUFBQSxZQUFBOztBQUFBOzRCQUNJOztBQUFBLEVBQUEsWUFBQyxDQUFBLEtBQUQsR0FDSTtBQUFBLElBQUEsQ0FBQSxFQUFHLENBQUg7QUFBQSxJQUNBLENBQUEsRUFBRyxDQURIO0dBREosQ0FBQTs7QUFBQSxFQUlBLFlBQUMsQ0FBQSxHQUFELEdBQ0k7QUFBQSxJQUFBLEVBQUEsRUFBSSxLQUFKO0FBQUEsSUFDQSxJQUFBLEVBQU0sS0FETjtBQUFBLElBRUEsSUFBQSxFQUFNLEtBRk47QUFBQSxJQUdBLEtBQUEsRUFBTyxLQUhQO0dBTEosQ0FBQTs7QUFBQSxFQVVBLFlBQUMsQ0FBQSxJQUFELEdBQU8sU0FBQSxHQUFBO0FBQ0gsSUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBWSxDQUFDLFVBQWhELENBQUEsQ0FBQTtBQUFBLElBQ0EsUUFBUSxDQUFDLGdCQUFULENBQTBCLFdBQTFCLEVBQXVDLFlBQVksQ0FBQyxTQUFwRCxDQURBLENBQUE7QUFBQSxJQUVBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxZQUFZLENBQUMsS0FBaEQsQ0FGQSxDQUFBO1dBR0EsUUFBUSxDQUFDLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDLFlBQVksQ0FBQyxPQUFsRCxFQUpHO0VBQUEsQ0FWUCxDQUFBOztBQUFBLEVBZ0JBLFlBQUMsQ0FBQSxVQUFELEdBQWEsU0FBQyxDQUFELEdBQUE7NkRBQU8sWUFBWSxDQUFDLGFBQWMsWUFBbEM7RUFBQSxDQWhCYixDQUFBOztBQUFBLEVBa0JBLFlBQUMsQ0FBQSxTQUFELEdBQVksU0FBQyxDQUFELEdBQUE7QUFDUixJQUFBLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBbkIsR0FBdUIsQ0FBQyxDQUFDLENBQXpCLENBQUE7QUFBQSxJQUNBLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBbkIsR0FBdUIsQ0FBQyxDQUFDLENBRHpCLENBQUE7NERBRUEsWUFBWSxDQUFDLFlBQWEsWUFIbEI7RUFBQSxDQWxCWixDQUFBOztBQUFBLEVBdUJBLFlBQUMsQ0FBQSxLQUFELEdBQVEsU0FBQyxDQUFELEdBQUE7QUFDSixJQUFBLElBQUcsQ0FBQyxDQUFDLE9BQUYsS0FBYSxFQUFoQjtBQUF3QixNQUFBLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBakIsR0FBc0IsS0FBdEIsQ0FBeEI7S0FBQTtBQUNBLElBQUEsSUFBRyxDQUFDLENBQUMsT0FBRixLQUFhLEVBQWhCO0FBQXdCLE1BQUEsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFqQixHQUF3QixLQUF4QixDQUF4QjtLQURBO0FBRUEsSUFBQSxJQUFHLENBQUMsQ0FBQyxPQUFGLEtBQWEsRUFBaEI7QUFBd0IsTUFBQSxZQUFZLENBQUMsR0FBRyxDQUFDLElBQWpCLEdBQXdCLEtBQXhCLENBQXhCO0tBRkE7QUFHQSxJQUFBLElBQUcsQ0FBQyxDQUFDLE9BQUYsS0FBYSxFQUFoQjtBQUF3QixNQUFBLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBakIsR0FBeUIsS0FBekIsQ0FBeEI7S0FIQTt3REFLQSxZQUFZLENBQUMsUUFBUyxZQU5sQjtFQUFBLENBdkJSLENBQUE7O0FBQUEsRUErQkEsWUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLENBQUQsR0FBQTtBQUNOLElBQUEsSUFBRyxDQUFDLENBQUMsT0FBRixLQUFhLEVBQWhCO0FBQXdCLE1BQUEsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFqQixHQUFzQixJQUF0QixDQUF4QjtLQUFBO0FBQ0EsSUFBQSxJQUFHLENBQUMsQ0FBQyxPQUFGLEtBQWEsRUFBaEI7QUFBd0IsTUFBQSxZQUFZLENBQUMsR0FBRyxDQUFDLElBQWpCLEdBQXdCLElBQXhCLENBQXhCO0tBREE7QUFFQSxJQUFBLElBQUcsQ0FBQyxDQUFDLE9BQUYsS0FBYSxFQUFoQjtBQUF3QixNQUFBLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBakIsR0FBd0IsSUFBeEIsQ0FBeEI7S0FGQTtBQUdBLElBQUEsSUFBRyxDQUFDLENBQUMsT0FBRixLQUFhLEVBQWhCO0FBQXdCLE1BQUEsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFqQixHQUF5QixJQUF6QixDQUF4QjtLQUhBOzBEQUtBLFlBQVksQ0FBQyxVQUFXLFlBTmxCO0VBQUEsQ0EvQlYsQ0FBQTs7QUFBQSxFQXVDQSxZQUFDLENBQUEsWUFBRCxHQUFlLFNBQUMsQ0FBRCxHQUFBLENBdkNmLENBQUE7O0FBQUEsRUF3Q0EsWUFBQyxDQUFBLFdBQUQsR0FBYyxTQUFDLENBQUQsR0FBQSxDQXhDZCxDQUFBOztBQUFBLEVBeUNBLFlBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxDQUFELEdBQUEsQ0F6Q1YsQ0FBQTs7QUFBQSxFQTBDQSxZQUFDLENBQUEsU0FBRCxHQUFZLFNBQUMsQ0FBRCxHQUFBLENBMUNaLENBQUE7O3NCQUFBOztJQURKLENBQUE7O0FBQUEsTUE4Q00sQ0FBQyxPQUFQLEdBQWlCLFlBOUNqQixDQUFBOzs7O0FDQUEsSUFBQSxZQUFBOztBQUFBOzRCQUNJOztBQUFBLEVBQUEsWUFBQyxDQUFBLFlBQUQsR0FBZSxNQUFmLENBQUE7O0FBQUEsRUFDQSxZQUFDLENBQUEsTUFBRCxHQUFTLEVBRFQsQ0FBQTs7QUFBQSxFQUdBLFlBQUMsQ0FBQSxHQUFELEdBQU0sU0FBQyxJQUFELEVBQU8sS0FBUCxHQUFBO0FBQ0YsSUFBQSxZQUFZLENBQUMsTUFBTyxDQUFBLElBQUEsQ0FBcEIsR0FBNEIsS0FBNUIsQ0FBQTtBQUNBLFdBQU8sSUFBUCxDQUZFO0VBQUEsQ0FITixDQUFBOztBQUFBLEVBT0EsWUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7V0FBRyxZQUFZLENBQUMsTUFBTyxDQUFBLFlBQVksQ0FBQyxZQUFiLEVBQXZCO0VBQUEsQ0FQVixDQUFBOztBQUFBLEVBU0EsWUFBQyxDQUFBLFFBQUQsR0FBVyxTQUFDLElBQUQsR0FBQTtBQUNQLFFBQUEsR0FBQTtBQUFBLElBQUEsR0FBQSxHQUFNLFlBQVksQ0FBQyxPQUFiLENBQUEsQ0FBTixDQUFBO0FBQ0EsSUFBQSxJQUFvQixHQUFwQjtBQUFBLE1BQUEsR0FBRyxDQUFDLFVBQUosQ0FBQSxDQUFBLENBQUE7S0FEQTtBQUFBLElBRUEsWUFBWSxDQUFDLFlBQWIsR0FBNEIsSUFGNUIsQ0FBQTtBQUFBLElBR0EsWUFBWSxDQUFDLFVBQWIsQ0FBd0IsSUFBeEIsQ0FIQSxDQUFBO0FBQUEsSUFJQSxZQUFZLENBQUMsT0FBYixDQUFBLENBQXNCLENBQUMsUUFBdkIsQ0FBQSxDQUpBLENBQUE7QUFLQSxXQUFPLElBQVAsQ0FOTztFQUFBLENBVFgsQ0FBQTs7QUFBQSxFQWlCQSxZQUFDLENBQUEsVUFBRCxHQUFhLFNBQUMsSUFBRCxHQUFBLENBakJiLENBQUE7O3NCQUFBOztJQURKLENBQUE7O0FBQUEsTUFxQk0sQ0FBQyxPQUFQLEdBQWlCLFlBckJqQixDQUFBOzs7O0FDQUEsSUFBQSxTQUFBOztBQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsZUFBUixDQUFQLENBQUE7O0FBQUE7QUFHaUIsRUFBQSxhQUFBLEdBQUE7QUFDVCxJQUFBLElBQUMsQ0FBQSxLQUFELEdBQVMsQ0FBVCxDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsTUFBRCxHQUFVLENBRFYsQ0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLFNBQUQsR0FBYSxDQUZiLENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxVQUFELEdBQWMsQ0FIZCxDQUFBO0FBQUEsSUFJQSxJQUFDLENBQUEsTUFBRCxHQUFVLEVBSlYsQ0FBQTtBQUFBLElBS0EsSUFBQyxDQUFBLFFBQUQsR0FBWSxFQUxaLENBRFM7RUFBQSxDQUFiOztBQUFBLGdCQVNBLE9BQUEsR0FBUyxTQUFDLE9BQUQsR0FBQTtBQUNMLFFBQUEsR0FBQTtBQUFBLElBQUEsR0FBQSxHQUFNLElBQUksQ0FBQyxRQUFMLENBQWMsT0FBZCxDQUFOLENBQUE7V0FDQSxHQUFHLENBQUMsSUFBSixDQUFTLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLElBQWYsQ0FBVCxFQUZLO0VBQUEsQ0FUVCxDQUFBOztBQUFBLGdCQWNBLFFBQUEsR0FBVSxTQUFDLE9BQUQsR0FBQTtBQUNOLFFBQUEseUZBQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxLQUFELEdBQVMsT0FBTyxDQUFDLEtBQWpCLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsT0FBTyxDQUFDLE1BRGxCLENBQUE7QUFBQSxJQUVBLElBQUMsQ0FBQSxTQUFELEdBQWEsT0FBTyxDQUFDLFNBRnJCLENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxVQUFELEdBQWMsT0FBTyxDQUFDLFVBSHRCLENBQUE7QUFLQTtBQUFBLFNBQUEsMkNBQUE7dUJBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxVQUFELENBQVksS0FBWixDQUFBLENBQUE7QUFBQSxLQUxBO0FBTUE7QUFBQSxTQUFBLDhDQUFBOzBCQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsWUFBRCxDQUFjLE9BQWQsQ0FBQSxDQUFBO0FBQUEsS0FOQTtBQUFBLElBU0EsWUFBQSxHQUFlLEVBVGYsQ0FBQTtBQVVBO0FBQUEsU0FBQSw4Q0FBQTswQkFBQTtBQUNJLE1BQUEsT0FBQSxHQUFjLElBQUEsT0FBQSxDQUFRLFNBQUMsT0FBRCxFQUFVLE1BQVYsR0FBQTtBQUNsQixRQUFBLE9BQU8sQ0FBQyxHQUFSLEdBQWtCLElBQUEsS0FBQSxDQUFBLENBQWxCLENBQUE7QUFBQSxRQUVBLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBWixHQUFrQixjQUFBLEdBQWlCLE9BQU8sQ0FBQyxHQUYzQyxDQUFBO0FBQUEsUUFHQSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQVosR0FBcUIsU0FBQSxHQUFBO2lCQUFHLE9BQUEsQ0FBQSxFQUFIO1FBQUEsQ0FIckIsQ0FBQTtlQUlBLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBWixHQUFzQixTQUFBLEdBQUE7aUJBQUcsTUFBQSxDQUFBLEVBQUg7UUFBQSxFQUxKO01BQUEsQ0FBUixDQUFkLENBQUE7QUFBQSxNQU1BLFlBQVksQ0FBQyxJQUFiLENBQWtCLE9BQWxCLENBTkEsQ0FESjtBQUFBLEtBVkE7QUFtQkEsV0FBTyxPQUFPLENBQUMsR0FBUixDQUFZLFlBQVosQ0FBUCxDQXBCTTtFQUFBLENBZFYsQ0FBQTs7QUFBQSxnQkFxQ0EsVUFBQSxHQUFZLFNBQUMsU0FBRCxHQUFBO0FBRVIsUUFBQSxnQ0FBQTtBQUFBLElBQUEsSUFBRyxTQUFTLENBQUMsSUFBVixLQUFrQixXQUFyQjtBQUFzQyxZQUFBLENBQXRDO0tBQUE7QUFBQSxJQUVBLEtBQUEsR0FDSTtBQUFBLE1BQUEsSUFBQSxFQUFNLFNBQVMsQ0FBQyxJQUFoQjtBQUFBLE1BQ0EsSUFBQSxFQUFNLEVBRE47S0FISixDQUFBO0FBT0EsU0FBUyxvR0FBVCxHQUFBO0FBQ0ksTUFBQSxLQUFLLENBQUMsSUFBSyxDQUFBLENBQUEsQ0FBWCxHQUFnQixFQUFoQixDQUFBO0FBQ0EsV0FBUyx3R0FBVCxHQUFBO0FBQ0ksUUFBQSxLQUFLLENBQUMsSUFBSyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBZCxHQUFtQixTQUFTLENBQUMsSUFBSyxDQUFBLENBQUMsQ0FBQSxHQUFJLElBQUMsQ0FBQSxLQUFOLENBQUEsR0FBZSxDQUFmLENBQWxDLENBREo7QUFBQSxPQUZKO0FBQUEsS0FQQTtXQVlBLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLEtBQWIsRUFkUTtFQUFBLENBckNaLENBQUE7O0FBQUEsZ0JBc0RBLFlBQUEsR0FBYyxTQUFDLFdBQUQsR0FBQTtBQUNWLFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUNJO0FBQUEsTUFBQSxVQUFBLEVBQVksV0FBVyxDQUFDLFVBQXhCO0FBQUEsTUFDQSxXQUFBLEVBQWEsV0FBVyxDQUFDLFdBRHpCO0FBQUEsTUFFQSxTQUFBLEVBQVcsV0FBVyxDQUFDLFNBRnZCO0FBQUEsTUFHQSxVQUFBLEVBQVksV0FBVyxDQUFDLFVBSHhCO0FBQUEsTUFJQSxRQUFBLEVBQVUsV0FBVyxDQUFDLFFBSnRCO0FBQUEsTUFLQSxHQUFBLEVBQUssV0FBVyxDQUFDLEtBTGpCO0tBREosQ0FBQTtBQUFBLElBUUEsT0FBTyxDQUFDLE9BQVIsR0FBa0IsT0FBTyxDQUFDLFFBQVIsR0FDZCxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVIsR0FBcUIsT0FBTyxDQUFDLFdBQTlCLENBQUEsR0FBNkMsQ0FBQyxPQUFPLENBQUMsU0FBUixHQUFvQixPQUFPLENBQUMsVUFBN0IsQ0FBOUMsQ0FUSixDQUFBO0FBQUEsSUFXQSxPQUFPLENBQUMsU0FBUixHQUFvQixJQUFJLENBQUMsS0FBTCxDQUFXLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLE9BQU8sQ0FBQyxTQUF4QyxDQVhwQixDQUFBO0FBQUEsSUFZQSxPQUFPLENBQUMsU0FBUixHQUFvQixJQUFJLENBQUMsS0FBTCxDQUFXLE9BQU8sQ0FBQyxXQUFSLEdBQXNCLE9BQU8sQ0FBQyxVQUF6QyxDQVpwQixDQUFBO1dBY0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLENBQWUsT0FBZixFQWZVO0VBQUEsQ0F0RGQsQ0FBQTs7QUFBQSxnQkF3RUEsUUFBQSxHQUFVLFNBQUMsR0FBRCxFQUFNLENBQU4sRUFBUyxDQUFULEVBQVksRUFBWixFQUFnQixFQUFoQixFQUFvQixVQUFwQixFQUFnQyxPQUFoQyxFQUF5QyxPQUF6QyxFQUFzRCxPQUF0RCxHQUFBO0FBRU4sUUFBQSxVQUFBOztNQUYrQyxVQUFVO0tBRXpEOztNQUY0RCxVQUFVO0tBRXRFO0FBQUEsSUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxVQUFBLEdBQWEsT0FBTyxDQUFDLFNBQWhDLENBQUEsR0FBNkMsT0FBTyxDQUFDLFNBQTVELENBQUE7QUFBQSxJQUNBLElBQUEsR0FBTyxJQUFJLENBQUMsS0FBTCxDQUFXLFVBQUEsR0FBYSxPQUFPLENBQUMsU0FBaEMsQ0FBQSxHQUE2QyxPQUFPLENBQUMsVUFENUQsQ0FBQTtXQUdBLEdBQUcsQ0FBQyxTQUFKLENBQWMsT0FBTyxDQUFDLEdBQXRCLEVBQ0ksSUFESixFQUNVLElBRFYsRUFFSSxPQUFPLENBQUMsU0FGWixFQUV1QixPQUFPLENBQUMsVUFGL0IsRUFHSSxDQUFDLENBQUEsR0FBSSxPQUFPLENBQUMsU0FBYixDQUFBLEdBQTBCLE9BSDlCLEVBR3VDLENBQUMsQ0FBQSxHQUFJLE9BQU8sQ0FBQyxVQUFiLENBQUEsR0FBMkIsT0FIbEUsRUFJSSxPQUFPLENBQUMsU0FKWixFQUl1QixPQUFPLENBQUMsVUFKL0IsRUFMTTtFQUFBLENBeEVWLENBQUE7O0FBQUEsZ0JBb0ZBLGtCQUFBLEdBQW9CLFNBQUMsR0FBRCxFQUFNLENBQU4sRUFBUyxDQUFULEVBQVksRUFBWixFQUFnQixFQUFoQixFQUFvQixVQUFwQixFQUFnQyxPQUFoQyxFQUE2QyxPQUE3QyxHQUFBO0FBRWhCLFFBQUEsT0FBQTs7TUFGZ0QsVUFBVTtLQUUxRDs7TUFGNkQsVUFBVTtLQUV2RTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixVQUFsQixDQUFWLENBQUE7QUFFQSxJQUFBLElBQUcsT0FBSDtBQUNJLE1BQUEsVUFBQSxHQUFhLFVBQUEsR0FBYSxPQUFPLENBQUMsUUFBbEMsQ0FBQTthQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLENBQWYsRUFBa0IsQ0FBbEIsRUFBcUIsSUFBQyxDQUFBLFNBQXRCLEVBQWlDLElBQUMsQ0FBQSxVQUFsQyxFQUE4QyxVQUE5QyxFQUEwRCxPQUExRCxFQUFtRSxPQUFuRSxFQUE0RSxPQUE1RSxFQUZKO0tBSmdCO0VBQUEsQ0FwRnBCLENBQUE7O0FBQUEsZ0JBNkZBLGdCQUFBLEdBQWtCLFNBQUMsVUFBRCxHQUFBO0FBQ2QsUUFBQSxtQkFBQTtBQUFBO0FBQUEsU0FBQSwyQ0FBQTtxQkFBQTtBQUNJLE1BQUEsSUFBRyxDQUFDLFVBQUEsSUFBYyxHQUFHLENBQUMsUUFBbkIsQ0FBQSxJQUFnQyxDQUFDLFVBQUEsSUFBYyxHQUFHLENBQUMsT0FBbkIsQ0FBbkM7QUFDSSxlQUFPLEdBQVAsQ0FESjtPQURKO0FBQUEsS0FBQTtBQUdBLFdBQU8sS0FBUCxDQUpjO0VBQUEsQ0E3RmxCLENBQUE7O0FBQUEsZ0JBb0dBLE9BQUEsR0FBUyxTQUFDLEdBQUQsR0FBQTtBQUNMLFFBQUEsK0JBQUE7QUFBQTtTQUFhLG1IQUFiLEdBQUE7QUFDSTs7QUFBQTthQUFTLHlHQUFULEdBQUE7QUFDSTs7QUFBQTtpQkFBUyx3R0FBVCxHQUFBO0FBQ0ksNkJBQUEsSUFBQyxDQUFBLGtCQUFELENBQW9CLEdBQXBCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLElBQUMsQ0FBQSxTQUFoQyxFQUEyQyxJQUFDLENBQUEsVUFBNUMsRUFBd0QsSUFBQyxDQUFBLE1BQU8sQ0FBQSxLQUFBLENBQU0sQ0FBQyxJQUFLLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUEvRSxFQUFBLENBREo7QUFBQTs7d0JBQUEsQ0FESjtBQUFBOztvQkFBQSxDQURKO0FBQUE7b0JBREs7RUFBQSxDQXBHVCxDQUFBOztBQUFBLGdCQTJHQSxXQUFBLEdBQWEsU0FBQyxHQUFELEVBQU0sQ0FBTixFQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixHQUFBO0FBRVQsUUFBQSxxRkFBQTtBQUFBLElBQUEsUUFBQSxHQUFXLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBQSxHQUFJLElBQUMsQ0FBQSxTQUFoQixDQUFYLENBQUE7QUFBQSxJQUNBLFNBQUEsR0FBWSxJQUFJLENBQUMsSUFBTCxDQUFVLENBQUMsQ0FBQSxHQUFJLENBQUwsQ0FBQSxHQUFVLElBQUMsQ0FBQSxTQUFyQixDQURaLENBQUE7QUFBQSxJQUVBLE9BQUEsR0FBVSxJQUFJLENBQUMsS0FBTCxDQUFXLENBQUEsR0FBSSxJQUFDLENBQUEsVUFBaEIsQ0FGVixDQUFBO0FBQUEsSUFHQSxVQUFBLEdBQWEsSUFBSSxDQUFDLElBQUwsQ0FBVSxDQUFDLENBQUEsR0FBSSxDQUFMLENBQUEsR0FBVSxJQUFDLENBQUEsVUFBckIsQ0FIYixDQUFBO0FBS0EsSUFBQSxJQUFHLFFBQUEsR0FBVyxDQUFkO0FBQXFCLE1BQUEsUUFBQSxHQUFXLENBQVgsQ0FBckI7S0FMQTtBQU1BLElBQUEsSUFBRyxPQUFBLEdBQVUsQ0FBYjtBQUFvQixNQUFBLE9BQUEsR0FBVSxDQUFWLENBQXBCO0tBTkE7QUFPQSxJQUFBLElBQUcsU0FBQSxJQUFhLElBQUMsQ0FBQSxLQUFqQjtBQUE0QixNQUFBLFNBQUEsR0FBWSxJQUFDLENBQUEsS0FBRCxHQUFTLENBQXJCLENBQTVCO0tBUEE7QUFRQSxJQUFBLElBQUcsVUFBQSxJQUFjLElBQUMsQ0FBQSxNQUFsQjtBQUE4QixNQUFBLFVBQUEsR0FBYSxJQUFDLENBQUEsTUFBRCxHQUFVLENBQXZCLENBQTlCO0tBUkE7QUFBQSxJQVVBLE9BQUEsR0FBVSxDQUFBLEdBQUksQ0FWZCxDQUFBO0FBQUEsSUFXQSxPQUFBLEdBQVUsQ0FBQSxHQUFJLENBWGQsQ0FBQTtBQWFBO1NBQWEsbUhBQWIsR0FBQTtBQUNJOztBQUFBO2FBQVMsc0hBQVQsR0FBQTtBQUNJOztBQUFBO2lCQUFTLHFIQUFULEdBQUE7QUFDSSw2QkFBQSxJQUFDLENBQUEsa0JBQUQsQ0FBb0IsR0FBcEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsSUFBQyxDQUFBLFNBQWhDLEVBQTJDLElBQUMsQ0FBQSxVQUE1QyxFQUF3RCxJQUFDLENBQUEsTUFBTyxDQUFBLEtBQUEsQ0FBTSxDQUFDLElBQUssQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQS9FLEVBQW1GLE9BQW5GLEVBQTRGLE9BQTVGLEVBQUEsQ0FESjtBQUFBOzt3QkFBQSxDQURKO0FBQUE7O29CQUFBLENBREo7QUFBQTtvQkFmUztFQUFBLENBM0diLENBQUE7O2FBQUE7O0lBSEosQ0FBQTs7QUFBQSxNQW1JTSxDQUFDLE9BQVAsR0FBaUIsR0FuSWpCLENBQUE7Ozs7QUNBQSxJQUFBLEtBQUE7O0FBQUE7QUFDaUIsRUFBQSxlQUFBLEdBQUE7QUFDVCxJQUFBLElBQUMsQ0FBQSxPQUFELEdBQVcsRUFBWCxDQURTO0VBQUEsQ0FBYjs7QUFBQSxrQkFHQSxTQUFBLEdBQVcsU0FBQyxNQUFELEdBQUE7QUFDUCxJQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLE1BQWQsQ0FBQSxDQUFBO0FBQ0EsV0FBTyxNQUFQLENBRk87RUFBQSxDQUhYLENBQUE7O0FBQUEsa0JBT0EsSUFBQSxHQUFNLFNBQUEsR0FBQSxDQVBOLENBQUE7O0FBQUEsa0JBUUEsUUFBQSxHQUFVLFNBQUEsR0FBQSxDQVJWLENBQUE7O0FBQUEsa0JBU0EsVUFBQSxHQUFZLFNBQUEsR0FBQSxDQVRaLENBQUE7O2VBQUE7O0lBREosQ0FBQTs7QUFBQSxNQVlNLENBQUMsT0FBUCxHQUFpQixLQVpqQixDQUFBOzs7O0FDQUEsSUFBQSxNQUFBOztBQUFBO0FBQ0ksbUJBQUEsY0FBQSxHQUFnQixDQUFoQixDQUFBOztBQUVhLEVBQUEsZ0JBQUEsR0FBQTtBQUFHLElBQUEsSUFBQyxDQUFBLGVBQUQsR0FBbUIsQ0FBbkIsQ0FBSDtFQUFBLENBRmI7O0FBQUEsbUJBSUEsSUFBQSxHQUFNLFNBQUEsR0FBQSxDQUpOLENBQUE7O0FBQUEsbUJBTUEsTUFBQSxHQUFRLFNBQUMsRUFBRCxHQUFBO0FBQ0osSUFBQSxJQUFDLENBQUEsZUFBRCxJQUFvQixFQUFwQixDQUFBO0FBRUEsSUFBQSxJQUFHLElBQUMsQ0FBQSxlQUFELElBQW9CLElBQUMsQ0FBQSxjQUF4QjtBQUNJLE1BQUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsZUFBWCxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxlQUFELEdBQW1CLENBRG5CLENBREo7S0FGQTtBQU1BLFdBQU8sSUFBQyxDQUFBLGVBQVIsQ0FQSTtFQUFBLENBTlIsQ0FBQTs7QUFBQSxtQkFlQSxRQUFBLEdBQVUsU0FBQyxFQUFELEdBQUEsQ0FmVixDQUFBOztnQkFBQTs7SUFESixDQUFBOztBQUFBLE1Ba0JNLENBQUMsT0FBUCxHQUFpQixNQWxCakIsQ0FBQTs7OztBQ0FBLElBQUEsc0RBQUE7RUFBQTtpU0FBQTs7QUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLGtCQUFSLENBQVQsQ0FBQTs7QUFBQSxhQUNBLEdBQWdCLE9BQUEsQ0FBUSxpQ0FBUixDQURoQixDQUFBOztBQUFBLGVBRUEsR0FBa0IsT0FBQSxDQUFRLG1DQUFSLENBRmxCLENBQUE7O0FBQUE7QUFLSSxtQ0FBQSxDQUFBOzs7O0dBQUE7O0FBQUEsMkJBQUEsY0FBQSxHQUFnQixFQUFoQixDQUFBOztBQUFBLDJCQUVBLElBQUEsR0FBTSxTQUFFLFFBQUYsR0FBQTtBQUNGLElBREcsSUFBQyxDQUFBLFdBQUEsUUFDSixDQUFBO0FBQUEsSUFBQSxJQUFDLENBQUEsU0FBRCxHQUFhLENBQWIsQ0FBQTtXQUNBLElBQUMsQ0FBQSxTQUFELEdBQWEsRUFGWDtFQUFBLENBRk4sQ0FBQTs7QUFBQSwyQkFRQSxZQUFBLEdBQWMsU0FBQyxHQUFELEVBQU0sRUFBTixHQUFBLENBUmQsQ0FBQTs7QUFBQSwyQkFTQSxXQUFBLEdBQWEsU0FBQyxHQUFELEVBQU0sRUFBTixHQUFBLENBVGIsQ0FBQTs7QUFBQSwyQkFXQSxRQUFBLEdBQVUsU0FBQyxFQUFELEdBQUE7QUFDTixJQUFBLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQWQsQ0FBd0IsQ0FBeEIsRUFBMkIsQ0FBM0IsRUFBOEIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBL0MsRUFBc0QsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBdkUsQ0FBQSxDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsWUFBRCxDQUFjLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBeEIsRUFBNkIsRUFBN0IsQ0FEQSxDQUFBO0FBQUEsSUFJQSxJQUFDLENBQUEsU0FBRCxDQUFBLENBSkEsQ0FBQTtBQUFBLElBS0EsSUFBQyxDQUFBLFVBQUQsQ0FBQSxDQUxBLENBQUE7QUFBQSxJQU1BLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FOQSxDQUFBO1dBUUEsSUFBQyxDQUFBLFdBQUQsQ0FBYSxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQXZCLEVBQTRCLEVBQTVCLEVBVE07RUFBQSxDQVhWLENBQUE7O0FBQUEsMkJBNEJBLFNBQUEsR0FBVyxTQUFBLEdBQUE7QUFDUCxRQUFBLHdEQUFBO0FBQUEsSUFBQSxZQUFBLEdBQWUsYUFBYSxDQUFDLGtDQUFkLENBQWlELENBQUMsZ0JBQUQsRUFBbUIsVUFBbkIsQ0FBakQsQ0FBZixDQUFBO0FBQ0E7U0FBQSxtREFBQTtnQ0FBQTtBQUNJLE1BQUEsSUFBQSxHQUFPLGFBQWEsQ0FBQyxrQkFBZCxDQUFpQyxNQUFqQyxFQUF5QyxnQkFBekMsQ0FBUCxDQUFBO0FBQUEsTUFDQSxRQUFBLEdBQVcsYUFBYSxDQUFDLGtCQUFkLENBQWlDLE1BQWpDLEVBQXlDLFVBQXpDLENBRFgsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBWixHQUF3QixJQUFJLENBQUMsTUFGN0IsQ0FBQTtBQUFBLG9CQUdBLElBQUMsQ0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVosQ0FBcUIsUUFBUSxDQUFDLENBQTlCLEVBQWlDLFFBQVEsQ0FBQyxDQUExQyxFQUE2QyxJQUFJLENBQUMsS0FBbEQsRUFBeUQsSUFBSSxDQUFDLE1BQTlELEVBSEEsQ0FESjtBQUFBO29CQUZPO0VBQUEsQ0E1QlgsQ0FBQTs7QUFBQSwyQkFvQ0EsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNSLFFBQUEsMERBQUE7QUFBQSxJQUFBLGFBQUEsR0FBZ0IsYUFBYSxDQUFDLGtDQUFkLENBQWlELENBQUMsaUJBQUQsRUFBb0IsVUFBcEIsQ0FBakQsQ0FBaEIsQ0FBQTtBQUNBO1NBQUEsb0RBQUE7aUNBQUE7QUFDSSxNQUFBLEtBQUEsR0FBUSxhQUFhLENBQUMsa0JBQWQsQ0FBaUMsTUFBakMsRUFBeUMsaUJBQXpDLENBQVIsQ0FBQTtBQUFBLE1BQ0EsUUFBQSxHQUFXLGFBQWEsQ0FBQyxrQkFBZCxDQUFpQyxNQUFqQyxFQUF5QyxVQUF6QyxDQURYLENBQUE7QUFBQSxvQkFHQSxJQUFDLENBQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFaLENBQXNCLEtBQXRCLEVBQTZCLFFBQVEsQ0FBQyxDQUF0QyxFQUF5QyxRQUFRLENBQUMsQ0FBbEQsRUFIQSxDQURKO0FBQUE7b0JBRlE7RUFBQSxDQXBDWixDQUFBOztBQUFBLDJCQTRDQSxTQUFBLEdBQVcsU0FBQSxHQUFBO0FBQ1AsUUFBQSx3REFBQTtBQUFBLElBQUEsWUFBQSxHQUFlLGFBQWEsQ0FBQyxrQ0FBZCxDQUFpRCxDQUFDLGdCQUFELEVBQW1CLFVBQW5CLENBQWpELENBQWYsQ0FBQTtBQUNBO1NBQUEsbURBQUE7Z0NBQUE7QUFDSSxNQUFBLElBQUEsR0FBTyxhQUFhLENBQUMsa0JBQWQsQ0FBaUMsTUFBakMsRUFBeUMsZ0JBQXpDLENBQVAsQ0FBQTtBQUFBLE1BQ0EsUUFBQSxHQUFXLGFBQWEsQ0FBQyxrQkFBZCxDQUFpQyxNQUFqQyxFQUF5QyxVQUF6QyxDQURYLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVosR0FBd0IsSUFBSSxDQUFDLE1BRjdCLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQVosR0FBbUIsSUFBSSxDQUFDLElBSHhCLENBQUE7QUFBQSxvQkFJQSxJQUFDLENBQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFaLENBQXFCLElBQUksQ0FBQyxJQUExQixFQUFnQyxRQUFRLENBQUMsQ0FBekMsRUFBNEMsUUFBUSxDQUFDLENBQXJELEVBSkEsQ0FESjtBQUFBO29CQUZPO0VBQUEsQ0E1Q1gsQ0FBQTs7QUFxREE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXJEQTs7d0JBQUE7O0dBRHlCLE9BSjdCLENBQUE7O0FBQUEsTUFtRk0sQ0FBQyxPQUFQLEdBQWlCLGNBbkZqQixDQUFBOzs7O0FDQUEsSUFBQSxJQUFBOztBQUFBO29CQUNJOztBQUFBLEVBQUEsSUFBQyxDQUFBLFFBQUQsR0FBVyxTQUFDLEdBQUQsR0FBQTtXQUFTLElBQUksQ0FBQyxJQUFMLENBQVUsR0FBVixDQUFjLENBQUMsSUFBZixDQUFvQixJQUFJLENBQUMsS0FBekIsRUFBVDtFQUFBLENBQVgsQ0FBQTs7QUFBQSxFQUVBLElBQUMsQ0FBQSxJQUFELEdBQU8sU0FBQyxHQUFELEdBQUE7QUFDSCxRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBYyxJQUFBLE9BQUEsQ0FBUSxTQUFDLE9BQUQsRUFBVSxNQUFWLEdBQUE7QUFDbEIsVUFBQSxHQUFBO0FBQUEsTUFBQSxHQUFBLEdBQVUsSUFBQSxjQUFBLENBQUEsQ0FBVixDQUFBO0FBQUEsTUFFQSxHQUFHLENBQUMsSUFBSixDQUFTLEtBQVQsRUFBZ0IsR0FBaEIsRUFBcUIsSUFBckIsQ0FGQSxDQUFBO0FBQUEsTUFHQSxHQUFHLENBQUMsZ0JBQUosQ0FBcUIsa0JBQXJCLEVBQXlDLFNBQUEsR0FBQTtBQUNyQyxZQUFBLElBQUE7QUFBQSxRQUFBLElBQUcsR0FBRyxDQUFDLFVBQUosS0FBa0IsQ0FBckI7QUFDSSxVQUFBLFlBQUcsR0FBRyxDQUFDLE9BQUosS0FBZSxHQUFmLElBQUEsSUFBQSxLQUFvQixHQUF2QjttQkFDSSxPQUFBLENBQVEsR0FBRyxDQUFDLFlBQVosRUFESjtXQUFBLE1BQUE7bUJBR0ksTUFBQSxDQUFPLE9BQVAsRUFISjtXQURKO1NBRHFDO01BQUEsQ0FBekMsQ0FIQSxDQUFBO2FBU0EsR0FBRyxDQUFDLElBQUosQ0FBQSxFQVZrQjtJQUFBLENBQVIsQ0FBZCxDQUFBO0FBV0EsV0FBTyxPQUFQLENBWkc7RUFBQSxDQUZQLENBQUE7O0FBQUEsRUFnQkEsSUFBQyxDQUFBLFNBQUQsR0FBWSxTQUFDLElBQUQsR0FBQTtBQUNSLFFBQUEsV0FBQTtBQUFBLElBQUEsR0FBQSxHQUFNLElBQUksQ0FBQyxNQUFYLENBQUE7QUFBQSxJQUVBLEVBQUEsR0FBSyxJQUFJLENBQUMsTUFBTCxDQUFZLENBQUEsQ0FBWixDQUZMLENBQUE7QUFBQSxJQUdBLEVBQUEsR0FBSyxJQUFJLENBQUMsTUFBTCxDQUFZLENBQUEsQ0FBWixDQUhMLENBQUE7QUFLQSxJQUFBLElBQUcsRUFBQSxLQUFNLEdBQVQ7QUFDSSxNQUFBLElBQUEsR0FBTyxJQUFJLENBQUMsTUFBTCxDQUFZLENBQVosRUFBZSxHQUFBLEdBQU0sQ0FBckIsQ0FBQSxHQUEwQixLQUFqQyxDQURKO0tBQUEsTUFFSyxJQUFHLEVBQUEsS0FBTSxHQUFOLElBQWEsRUFBQSxLQUFNLEdBQW5CLElBQTBCLEVBQUEsS0FBTSxJQUFoQyxJQUF3QyxFQUFBLEtBQU0sSUFBOUMsSUFBc0QsRUFBQSxLQUFNLElBQS9EO0FBRUQsTUFBQSxJQUFBLEdBQU8sSUFBQSxHQUFPLElBQWQsQ0FGQztLQUFBLE1BQUE7QUFJRCxNQUFBLElBQUEsR0FBTyxJQUFBLEdBQU8sR0FBZCxDQUpDO0tBUEw7QUFhQSxXQUFPLElBQVAsQ0FkUTtFQUFBLENBaEJaLENBQUE7O2NBQUE7O0lBREosQ0FBQTs7QUFBQSxNQWlDTSxDQUFDLE9BQVAsR0FBaUIsSUFqQ2pCLENBQUE7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJTdGF0ZSA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU3RhdGUuY29mZmVlXCJcblN0YXRlTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9TdGF0ZU1hbmFnZXIuY29mZmVlXCJcbkdyYXBoaWNzTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9HcmFwaGljc01hbmFnZXIuY29mZmVlXCJcbklucHV0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9JbnB1dE1hbmFnZXIuY29mZmVlXCJcblxuUHJlTG9hZFN0YXRlID0gcmVxdWlyZSBcIi4vUHJlTG9hZFN0YXRlLmNvZmZlZVwiXG5NZW51U3RhdGUgPSByZXF1aXJlIFwiLi9NZW51U3RhdGUuY29mZmVlXCJcblxuIyBEZW1vc1xuRGVtbzFTdGF0ZSA9IHJlcXVpcmUgXCIuL0RlbW9zL0RlbW8xL0RlbW8xU3RhdGUuY29mZmVlXCJcbkxvYWRNYXBEZW1vU3RhdGUgPSByZXF1aXJlIFwiLi9EZW1vcy9Mb2FkTWFwRGVtby9Mb2FkTWFwRGVtb1N0YXRlLmNvZmZlZVwiXG5Nb3ZlTWFwRGVtb1N0YXRlID0gcmVxdWlyZSBcIi4vRGVtb3MvTW92ZU1hcERlbW8vTW92ZU1hcERlbW9TdGF0ZS5jb2ZmZWVcIlxuTW92ZU1hcFNtb290aERlbW9TdGF0ZSA9IHJlcXVpcmUgXCIuL0RlbW9zL01vdmVNYXBTbW9vdGhEZW1vL01vdmVNYXBTbW9vdGhEZW1vU3RhdGUuY29mZmVlXCJcblxuXG5jbGFzcyBCb290U3RhdGUgZXh0ZW5kcyBTdGF0ZVxuICAgIGluaXQ6IC0+XG4gICAgICAgICMgVXNlIEdyYXBoaWNzTWFuYWdlciB0byBjcmVhdGUgbWFpbiBjYW52YXNcbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyID0gR3JhcGhpY3NNYW5hZ2VyLmNyZWF0ZVJlbmRlcmVyIDY0MCwgNDgwLCBkb2N1bWVudC5ib2R5XG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuXG4gICAgICAgIElucHV0TWFuYWdlci5pbml0KClcblxuICAgICAgICBwcmVsb2FkU3RhdGUgPSBuZXcgUHJlTG9hZFN0YXRlKClcbiAgICAgICAgU3RhdGVNYW5hZ2VyLmFkZCBcInByZWxvYWRcIiwgcHJlbG9hZFN0YXRlXG4gICAgICAgIHByZWxvYWRTdGF0ZS5pbml0KClcblxuICAgICAgICBtZW51U3RhdGUgPSBuZXcgTWVudVN0YXRlKClcbiAgICAgICAgU3RhdGVNYW5hZ2VyLmFkZCBcIm1lbnVcIiwgbWVudVN0YXRlXG4gICAgICAgIG1lbnVTdGF0ZS5pbml0KClcblxuICAgICAgICBkZW1vMVN0YXRlID0gbmV3IERlbW8xU3RhdGUoKVxuICAgICAgICBTdGF0ZU1hbmFnZXIuYWRkIFwiZGVtbzFcIiwgZGVtbzFTdGF0ZVxuICAgICAgICBkZW1vMVN0YXRlLmluaXQoKVxuXG4gICAgICAgIGxvYWRNYXBEZW1vU3RhdGUgPSBuZXcgTG9hZE1hcERlbW9TdGF0ZSgpXG4gICAgICAgIFN0YXRlTWFuYWdlci5hZGQgXCJMb2FkTWFwRGVtb1wiLCBsb2FkTWFwRGVtb1N0YXRlXG4gICAgICAgIGxvYWRNYXBEZW1vU3RhdGUuaW5pdCgpXG5cbiAgICAgICAgbW92ZU1hcERlbW9TdGF0ZSA9IG5ldyBNb3ZlTWFwRGVtb1N0YXRlKClcbiAgICAgICAgU3RhdGVNYW5hZ2VyLmFkZCBcIk1vdmVNYXBEZW1vXCIsIG1vdmVNYXBEZW1vU3RhdGVcbiAgICAgICAgbW92ZU1hcERlbW9TdGF0ZS5pbml0KClcblxuICAgICAgICBtb3ZlTWFwU21vb3RoRGVtb1N0YXRlID0gbmV3IE1vdmVNYXBTbW9vdGhEZW1vU3RhdGUoKVxuICAgICAgICBTdGF0ZU1hbmFnZXIuYWRkIFwiTW92ZU1hcFNtb290aERlbW9cIiwgbW92ZU1hcFNtb290aERlbW9TdGF0ZVxuICAgICAgICBtb3ZlTWFwU21vb3RoRGVtb1N0YXRlLmluaXQoKVxuXG4gICAgICAgIEBkZWJ1Z01lbnUoKVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwicmVzaXplXCIsIC0+XG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cblxuICAgIGFjdGl2YXRlOiAtPlxuICAgICAgICBTdGF0ZU1hbmFnZXIuYWN0aXZhdGUgXCJwcmVsb2FkXCJcblxuICAgIGRlYnVnTWVudTogLT5cbiAgICAgICAgZ3VpID0gbmV3IGRhdC5HVUkoKVxuXG4gICAgICAgIFN0YXRlTWFuYWdlci5kZWJ1Z1N0YXRlID0gU3RhdGVNYW5hZ2VyLmN1cnJlbnRTdGF0ZVxuXG4gICAgICAgIHN0YXRlc0ZvbGRlciA9IGd1aS5hZGRGb2xkZXIgXCJTdGF0ZXNcIlxuICAgICAgICBzdGF0ZXNGb2xkZXIub3BlbigpXG4gICAgICAgIHN0YXRlQ29udHJvbCA9IHN0YXRlc0ZvbGRlci5hZGQgU3RhdGVNYW5hZ2VyLCBcImRlYnVnU3RhdGVcIiwgW1xuICAgICAgICAgICAgXCJtZW51XCIsIFwiZGVtbzFcIiwgXCJMb2FkTWFwRGVtb1wiLCBcIk1vdmVNYXBEZW1vXCIsIFwiTW92ZU1hcFNtb290aERlbW9cIlxuICAgICAgICBdXG4gICAgICAgIHN0YXRlQ29udHJvbC5vbkZpbmlzaENoYW5nZSAoc3RhdGUpIC0+IFN0YXRlTWFuYWdlci5hY3RpdmF0ZSBzdGF0ZVxuICAgICAgICBTdGF0ZU1hbmFnZXIub25BY3RpdmF0ZSA9IC0+XG4gICAgICAgICAgICBTdGF0ZU1hbmFnZXIuZGVidWdTdGF0ZSA9IFN0YXRlTWFuYWdlci5jdXJyZW50U3RhdGVcbiAgICAgICAgICAgIHN0YXRlQ29udHJvbC51cGRhdGVEaXNwbGF5KClcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvb3RTdGF0ZSIsIkVudGl0eU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvRW50aXR5TWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuXG5TdGF0ZSA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU3RhdGUuY29mZmVlXCJcbkRlbW8xU3lzdGVtID0gcmVxdWlyZSBcIi4vRGVtbzFTeXN0ZW0uY29mZmVlXCJcblxuY2xhc3MgRGVtbzFTdGF0ZSBleHRlbmRzIFN0YXRlXG4gICAgaW5pdDogLT4gQGFkZFN5c3RlbSBuZXcgRGVtbzFTeXN0ZW0oKVxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuc3R5bGUuY3Vyc29yID0gXCJub25lXCJcblxuICAgICAgICBAY3Vyc29yID0gRW50aXR5TWFuYWdlci5jcmVhdGVFbnRpdHkgXCJjdXJzb3JcIlxuICAgICAgICBjdXJzb3JJbWFnZSA9IG5ldyBJbWFnZSgpXG4gICAgICAgIGN1cnNvckltYWdlLnNyYyA9IFwiL2Fzc2V0cy9pbWcvY3Vyc29yL3NsaWNrX2Fycm93LWRlbHRhLnBuZ1wiO1xuICAgICAgICBFbnRpdHlNYW5hZ2VyLmFkZENvbXBvbmVudCBAY3Vyc29yLCB7XG4gICAgICAgICAgICB0eXBlOiBcIlJlbmRlcmFibGVJbWFnZVwiXG4gICAgICAgICAgICBpbWc6IGN1cnNvckltYWdlXG4gICAgICAgIH1cbiAgICAgICAgRW50aXR5TWFuYWdlci5hZGRDb21wb25lbnQgQGN1cnNvciwge1xuICAgICAgICAgICAgdHlwZTogXCJQb3NpdGlvblwiXG4gICAgICAgICAgICB4OiAwXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH1cbiAgICAgICAgRW50aXR5TWFuYWdlci5hZGRDb21wb25lbnQgQGN1cnNvciwge1xuICAgICAgICAgICAgdHlwZTogXCJQb3NpdGlvbkZvbGxvd3NNb3VzZVwiXG4gICAgICAgIH1cblxuICAgIGRlYWN0aXZhdGU6IC0+XG4gICAgICAgIEVudGl0eU1hbmFnZXIucmVtb3ZlRW50aXR5IEBjdXJzb3JcbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIlxuXG5cbm1vZHVsZS5leHBvcnRzID0gRGVtbzFTdGF0ZSIsIlN5c3RlbSA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU3lzdGVtLmNvZmZlZVwiXG5FbnRpdHlNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0VudGl0eU1hbmFnZXIuY29mZmVlXCJcbkdyYXBoaWNzTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9HcmFwaGljc01hbmFnZXIuY29mZmVlXCJcbklucHV0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9JbnB1dE1hbmFnZXIuY29mZmVlXCJcblxuY2xhc3MgRGVtbzFTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW1cbiAgICBUSFJPVFRMRV9WQUxVRTogMTYgICMgNjIuNSBGUFNcblxuICAgIG9uVXBkYXRlOiAtPlxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZlwiXG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFJlY3QgMCwgMCxcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGgsIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0XG5cbiAgICAgICAgIyBGb2xsb3cgbW91c2UgLSBub3JtYWxseSB3b3VsZCBiZSBpbiBhIGRpZmZlcmVudCBzeXN0ZW0gZnJvbSB0aGUgcmVuZGVyYWJsZXNcbiAgICAgICAgZm9sbG93RW50aXRpZXMgPSBFbnRpdHlNYW5hZ2VyLmdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZXMgW1wiUG9zaXRpb25Gb2xsb3dzTW91c2VcIiwgXCJQb3NpdGlvblwiXVxuICAgICAgICBmb3IgZW50aXR5IGluIGZvbGxvd0VudGl0aWVzXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJQb3NpdGlvblwiXG4gICAgICAgICAgICBwb3NpdGlvbi54ID0gSW5wdXRNYW5hZ2VyLm1vdXNlLnhcbiAgICAgICAgICAgIHBvc2l0aW9uLnkgPSBJbnB1dE1hbmFnZXIubW91c2UueVxuXG4gICAgICAgICMgRHJhdyByZW5kZXJhYmxlc1xuICAgICAgICByZW5kZXJhYmxlRW50aXRpZXMgPSBFbnRpdHlNYW5hZ2VyLmdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZXMgW1wiUmVuZGVyYWJsZUltYWdlXCIsIFwiUG9zaXRpb25cIl1cbiAgICAgICAgZm9yIGVudGl0eSBpbiByZW5kZXJhYmxlRW50aXRpZXNcbiAgICAgICAgICAgIHJlbmRlcmFibGUgPSBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiUmVuZGVyYWJsZUltYWdlXCJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlBvc2l0aW9uXCJcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZHJhd0ltYWdlIHJlbmRlcmFibGUuaW1nLCBwb3NpdGlvbi54LCBwb3NpdGlvbi55XG5cbiAgICAgICAgcmV0dXJuIG51bGxcblxuXG5tb2R1bGUuZXhwb3J0cyA9IERlbW8xU3lzdGVtIiwiQXNzZXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0Fzc2V0TWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuXG5TdGF0ZSA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU3RhdGUuY29mZmVlXCJcbk1hcCA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFwLmNvZmZlZVwiXG5cbmNsYXNzIExvYWRNYXBEZW1vU3RhdGUgZXh0ZW5kcyBTdGF0ZVxuICAgIGFjdGl2YXRlOiAtPlxuXG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFN0eWxlID0gXCIjNjY2XCJcbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsUmVjdCAwLCAwLFxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aCwgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcblxuICAgICAgICBtYXAgPSBuZXcgTWFwKClcbiAgICAgICAgbG9hZGluZyA9IG1hcC5sb2FkTWFwIFwiL2Fzc2V0cy9tYXAvdGVzdDEuanNvblwiXG4gICAgICAgIGxvYWRpbmcudGhlbiAoKSAtPlxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiM2OTZcIlxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsUmVjdCAwLCAwLFxuICAgICAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGgsIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0XG5cbiAgICAgICAgICAgIG1hcC5kcmF3TWFwIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHhcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZE1hcERlbW9TdGF0ZSIsIkFzc2V0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9Bc3NldE1hbmFnZXIuY29mZmVlXCJcbkdyYXBoaWNzTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9HcmFwaGljc01hbmFnZXIuY29mZmVlXCJcbklucHV0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9JbnB1dE1hbmFnZXIuY29mZmVlXCJcblxuU3RhdGUgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1N0YXRlLmNvZmZlZVwiXG5NYXAgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hcC5jb2ZmZWVcIlxuXG5jbGFzcyBNb3ZlTWFwRGVtb1N0YXRlIGV4dGVuZHMgU3RhdGVcbiAgICBpbml0OiAtPlxuICAgICAgICBAdmlld1BvcnRYID0gMFxuICAgICAgICBAdmlld1BvcnRZID0gMFxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIElucHV0TWFuYWdlci5vbktleVVwID0gQG9uS2V5VXAuYmluZCBAXG5cbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiM2NjZcIlxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmZpbGxSZWN0IDAsIDAsXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG4gICAgICAgIEBtYXAgPSBuZXcgTWFwKClcbiAgICAgICAgbG9hZGluZyA9IEBtYXAubG9hZE1hcCBcIi9hc3NldHMvbWFwL3Rlc3QyLmpzb25cIlxuICAgICAgICBsb2FkaW5nLnRoZW4gKCkgPT5cbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFN0eWxlID0gXCIjNjk2XCJcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFJlY3QgMCwgMCxcbiAgICAgICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG4gICAgICAgICAgICBAbWFwLmRyYXdNYXAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eFxuXG4gICAgZGVhY3RpdmF0ZTogLT4gSW5wdXRNYW5hZ2VyLm9uS2V5VXAgPSBudWxsXG5cbiAgICBvbktleVVwOiAoZSkgLT5cbiAgICAgICAgbW92ZURpc3RhbmNlID0gMTZcblxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzggdGhlbiBAdmlld1BvcnRZIC09IG1vdmVEaXN0YW5jZSAjIHVwXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSA0MCB0aGVuIEB2aWV3UG9ydFkgKz0gbW92ZURpc3RhbmNlICMgZG93blxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzcgdGhlbiBAdmlld1BvcnRYIC09IG1vdmVEaXN0YW5jZSAjIGxlZnRcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM5IHRoZW4gQHZpZXdQb3J0WCArPSBtb3ZlRGlzdGFuY2UgIyByaWdodFxuXG4gICAgICAgIGlmIEBtYXBcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFN0eWxlID0gXCIjNjk2XCJcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFJlY3QgMCwgMCxcbiAgICAgICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG4gICAgICAgICAgICBAbWFwLmRyYXdNYXBSZWN0IEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHgsXG4gICAgICAgICAgICAgICAgQHZpZXdQb3J0WCwgQHZpZXdQb3J0WSxcbiAgICAgICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vdmVNYXBEZW1vU3RhdGUiLCJTeXN0ZW0gPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1N5c3RlbS5jb2ZmZWVcIlxuSW5wdXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0lucHV0TWFuYWdlci5jb2ZmZWVcIlxuRW50aXR5TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9FbnRpdHlNYW5hZ2VyLmNvZmZlZVwiXG5cbmNsYXNzIE1hcE1vdmVJbnB1dFN5c3RlbSBleHRlbmRzIFN5c3RlbVxuXG4gICAgb25VcGRhdGU6IChkdCkgLT5cbiAgICAgICAgbW92ZURpc3RhbmNlID0gMyAqIGR0XG5cbiAgICAgICAgZW50aXRpZXMgPSBFbnRpdHlNYW5hZ2VyLmdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZXMgW1wiUG9zaXRpb25cIl1cblxuICAgICAgICBmb3IgZW50aXR5IGluIGVudGl0aWVzXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJQb3NpdGlvblwiXG5cbiAgICAgICAgICAgIGlmIElucHV0TWFuYWdlci5rZXkudXAgdGhlbiBwb3NpdGlvbi55IC09IG1vdmVEaXN0YW5jZVxuICAgICAgICAgICAgaWYgSW5wdXRNYW5hZ2VyLmtleS5kb3duIHRoZW4gcG9zaXRpb24ueSArPSBtb3ZlRGlzdGFuY2VcbiAgICAgICAgICAgIGlmIElucHV0TWFuYWdlci5rZXkubGVmdCB0aGVuIHBvc2l0aW9uLnggLT0gbW92ZURpc3RhbmNlXG4gICAgICAgICAgICBpZiBJbnB1dE1hbmFnZXIua2V5LnJpZ2h0IHRoZW4gcG9zaXRpb24ueCArPSBtb3ZlRGlzdGFuY2VcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gTWFwTW92ZUlucHV0U3lzdGVtIiwiQXNzZXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0Fzc2V0TWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuRW50aXR5TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9FbnRpdHlNYW5hZ2VyLmNvZmZlZVwiXG5cblN0YXRlID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TdGF0ZS5jb2ZmZWVcIlxuTWFwID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYXAuY29mZmVlXCJcbkdyYXBoaWNzU3lzdGVtID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TeXN0ZW0vR3JhcGhpY3NTeXN0ZW0uY29mZmVlXCJcbk1hcE1vdmVJbnB1dFN5c3RlID0gcmVxdWlyZSBcIi4vTWFwTW92ZUlucHV0U3lzdGVtLmNvZmZlZVwiXG5cbmNsYXNzIE1vdmVNYXBTbW9vdGhEZW1vU3RhdGUgZXh0ZW5kcyBTdGF0ZVxuICAgIGluaXQ6IC0+XG4gICAgICAgIEBtYXBMb2FkZWQgPSBmYWxzZVxuXG4gICAgICAgIEBhZGRTeXN0ZW0gbmV3IE1hcE1vdmVJbnB1dFN5c3RlXG5cbiAgICAgICAgIyBBZGQgZ3JhcGhpY3Mgc3lzdGVtIHRvIGhhbmRsZSByZW5kZXJpbmdcbiAgICAgICAgZ2Z4ID0gQGFkZFN5c3RlbSBuZXcgR3JhcGhpY3NTeXN0ZW1cbiAgICAgICAgZ2Z4LmluaXQgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyXG4gICAgICAgIGdmeC5vbkJlZm9yZURyYXcgPSBAZHJhd01hcC5iaW5kIEBcblxuICAgICAgICBAdmlld3BvcnQgPSB7XG4gICAgICAgICAgICB0eXBlOiBcIlBvc2l0aW9uXCJcbiAgICAgICAgICAgIHg6IDBcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfVxuXG4gICAgICAgIEB2aWV3cG9ydEVudGl0eSA9IEVudGl0eU1hbmFnZXIuY3JlYXRlRW50aXR5IFwidmlld3BvcnRcIiwgZmFsc2VcbiAgICAgICAgRW50aXR5TWFuYWdlci5hZGRDb21wb25lbnQgQHZpZXdwb3J0RW50aXR5LCBAdmlld3BvcnRcblxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIEVudGl0eU1hbmFnZXIuYWRkRW50aXR5IEB2aWV3cG9ydEVudGl0eVxuXG4gICAgICAgICMgTG9hZCB0aGUgbWFwXG4gICAgICAgIEBtYXAgPSBuZXcgTWFwKClcbiAgICAgICAgbG9hZGluZyA9IEBtYXAubG9hZE1hcCBcIi9hc3NldHMvbWFwL3Rlc3QyLmpzb25cIlxuICAgICAgICBsb2FkaW5nLnRoZW4gKCkgPT4gQG1hcExvYWRlZCA9IHRydWVcblxuXG4gICAgZGVhY3RpdmF0ZTogLT4gRW50aXR5TWFuYWdlci5yZW1vdmVFbnRpdHkgQHZpZXdwb3J0RW50aXR5XG5cblxuICAgIGRyYXdNYXA6IChjdHgpIC0+XG4gICAgICAgIGlmIEBtYXBMb2FkZWRcbiAgICAgICAgICAgIEBtYXAuZHJhd01hcFJlY3QgY3R4LFxuICAgICAgICAgICAgICAgIEB2aWV3cG9ydC54LCBAdmlld3BvcnQueSxcbiAgICAgICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG5cbm1vZHVsZS5leHBvcnRzID0gTW92ZU1hcFNtb290aERlbW9TdGF0ZSIsIlN0YXRlID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TdGF0ZS5jb2ZmZWVcIlxuVXRpbCA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvVXRpbC5jb2ZmZWVcIlxuU3RhdGVNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL1N0YXRlTWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuSW5wdXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0lucHV0TWFuYWdlci5jb2ZmZWVcIlxuQXVkaW9NYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0F1ZGlvTWFuYWdlci5jb2ZmZWVcIlxuXG5jbGFzcyBNZW51U3RhdGUgZXh0ZW5kcyBTdGF0ZVxuICAgIGluaXQ6IC0+XG4gICAgICAgIEBtZW51cyA9IHt9XG4gICAgICAgIEBjdHggPSBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4XG4gICAgICAgIEBjbGlja0xpc3RlbmVyID0gQG9uTW91c2VDbGljay5iaW5kIEBcblxuICAgICAgICBAYmFja2dyb3VuZCA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBAYmFja2dyb3VuZC5zcmMgPSBcIi9hc3NldHMvaW1nL2JhY2tncm91bmQvaW1hZ2U2XzAuanBnXCJcblxuICAgICAgICAjIFNldCB0aGUgY3VycmVudCBtZW51XG4gICAgICAgIEBjdXJyZW50TWVudSA9IFwibWFpblwiXG5cbiAgICAgICAgQXVkaW9NYW5hZ2VyLmxvYWQgXCJtZW51LXNlbGVjdFwiLCBcIi9hc3NldHMvc291bmQvVUkgcGFjayAxL01FTlUgQl9TZWxlY3Qud2F2XCJcbiAgICAgICAgQXVkaW9NYW5hZ2VyLmxvYWQgXCJtZW51LWJhY2tcIiwgXCIvYXNzZXRzL3NvdW5kL1VJIHBhY2sgMS9NRU5VIEJfQmFjay53YXZcIlxuXG4gICAgICAgICMgTG9hZCB0aGUgbWVudXNcbiAgICAgICAgQGxvYWRNZW51IFwiL2Fzc2V0cy9tZW51L21haW4uanNvblwiXG4gICAgICAgIEBsb2FkTWVudSBcIi9hc3NldHMvbWVudS9kZW1vcy5qc29uXCJcblxuXG4gICAgbG9hZE1lbnU6IChtZW51RmlsZSkgLT5cbiAgICAgICAgbWFwID0gVXRpbC5sb2FkSlNPTiBtZW51RmlsZVxuICAgICAgICBtYXAudGhlbiAobWVudURhdGEpID0+XG4gICAgICAgICAgICBAbWVudXNbbWVudURhdGEuaWRdID0ge1xuICAgICAgICAgICAgICAgIGlkOiBtZW51RGF0YS5pZFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IG1lbnVEYXRhLmJhY2tncm91bmRcbiAgICAgICAgICAgICAgICBlbGVtZW50czogW11cbiAgICAgICAgICAgICAgICBidXR0b25zOiBbXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgZWxlbWVudCBpbiBtZW51RGF0YS5lbGVtZW50c1xuXG4gICAgICAgICAgICAgICAgaWYgZWxlbWVudC50eXBlID09IFwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgQGFkZEJ1dHRvbiBtZW51RGF0YS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWN0aW9uVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWN0aW9uXG5cblxuICAgIGFkZEJ1dHRvbjogKG1lbnUsIHRleHQsIHgsIHksIHdpZHRoLCBoZWlnaHQsIGFjdGlvblR5cGUsIGFjdGlvbikgLT5cbiAgICAgICAgaWYgYWN0aW9uVHlwZSA9PSBcInN3aXRjaE1lbnVcIiB0aGVuIG9uQ2xpY2sgPSBAc3dpdGNoTWVudS5iaW5kIEAsIGFjdGlvblxuICAgICAgICBpZiBhY3Rpb25UeXBlID09IFwic3dpdGNoU3RhdGVcIiB0aGVuIG9uQ2xpY2sgPSBAc3dpdGNoU3RhdGUuYmluZCBALCBhY3Rpb25cblxuICAgICAgICBidXR0b24gPVxuICAgICAgICAgICAgdGV4dDogdGV4dFxuICAgICAgICAgICAgeDogeFxuICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICAgICAgY2xpY2s6IG9uQ2xpY2tcblxuICAgICAgICBpZiBub3QgQG1lbnVzW21lbnVdIHRoZW4gQG1lbnVzW21lbnVdID0ge31cbiAgICAgICAgaWYgbm90IEBtZW51c1ttZW51XS5idXR0b25zIHRoZW4gQG1lbnVzW21lbnVdLmJ1dHRvbnMgPSBbXVxuICAgICAgICBAbWVudXNbbWVudV0uYnV0dG9ucy5wdXNoIGJ1dHRvblxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIElucHV0TWFuYWdlci5vbk1vdXNlQ2xpY2sgPSBAb25Nb3VzZUNsaWNrLmJpbmQgQFxuICAgICAgICBAY3VycmVudE1lbnUgPSBcIm1haW5cIlxuICAgICAgICBAcmVuZGVyTWVudSgpXG5cbiAgICBkZWFjdGl2YXRlOiAtPiBJbnB1dE1hbmFnZXIub25Nb3VzZUNsaWNrID0gbnVsbFxuXG4gICAgc3dpdGNoTWVudTogKG5ld01lbnUpIC0+XG4gICAgICAgIGlmIG5ld01lbnUgPT0gXCJtYWluXCJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5IFwibWVudS1iYWNrXCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXkgXCJtZW51LXNlbGVjdFwiXG5cbiAgICAgICAgQGN1cnJlbnRNZW51ID0gbmV3TWVudVxuICAgICAgICBAcmVuZGVyTWVudSgpXG5cbiAgICBzd2l0Y2hTdGF0ZTogKHN0YXRlKSAtPlxuICAgICAgICBBdWRpb01hbmFnZXIucGxheSBcIm1lbnUtc2VsZWN0XCJcbiAgICAgICAgU3RhdGVNYW5hZ2VyLmFjdGl2YXRlIHN0YXRlXG5cbiAgICBvbk1vdXNlQ2xpY2s6IChlKSAtPlxuICAgICAgICBidXR0b24gPSBAZ2V0QnV0dG9uRnJvbVBvaW50IGUueCwgZS55XG4gICAgICAgIGlmIGJ1dHRvbiB0aGVuIGJ1dHRvbi5jbGljaygpXG5cbiAgICBnZXRCdXR0b25Gcm9tUG9pbnQ6ICh4LCB5KSAtPlxuICAgICAgICBtZW51ID0gQG1lbnVzW0BjdXJyZW50TWVudV1cbiAgICAgICAgZm9yIGJ1dHRvbiBpbiBtZW51LmJ1dHRvbnNcbiAgICAgICAgICAgIGlmIEBpc1BvaW50SW5SZWN0IHgsIHksIGJ1dHRvbi54LCBidXR0b24ueSwgYnV0dG9uLndpZHRoLCBidXR0b24uaGVpZ2h0XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1dHRvblxuXG4gICAgaXNQb2ludEluUmVjdDogKHgsIHksIHJ4LCByeSwgcncsIHJoKSAtPiByZXR1cm4geCA+PSByeCAmJiB4IDw9IHJ5ICsgcncgJiYgeSA+PSByeSAmJiB5IDw9IHJ5ICsgcmhcblxuICAgIHJlbmRlck1lbnU6IC0+XG4gICAgICAgIEByZW5kZXJCYWNrZ3JvdW5kKClcbiAgICAgICAgbWVudSA9IEBtZW51c1tAY3VycmVudE1lbnVdXG4gICAgICAgIGZvciBidXR0b24gaW4gbWVudS5idXR0b25zXG4gICAgICAgICAgICBAcmVuZGVyQnV0dG9uIGJ1dHRvblxuXG4gICAgcmVuZGVyQmFja2dyb3VuZDogLT5cbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLmZpbGxJbWFnZSBAY3R4LCBAYmFja2dyb3VuZCxcbiAgICAgICAgICAgIEBiYWNrZ3JvdW5kLndpZHRoLCBAYmFja2dyb3VuZC5oZWlnaHQsXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG4gICAgcmVuZGVyQnV0dG9uOiAoYnV0dG9uLCBob3ZlciA9IGZhbHNlKSAtPlxuICAgICAgICBAY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZlwiXG4gICAgICAgIEBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIlxuXG4gICAgICAgIGlmIGhvdmVyXG4gICAgICAgICAgICBAY3R4LnNoYWRvd0JsdXIgPSAyMFxuICAgICAgICAgICAgQGN0eC5zaGFkb3dDb2xvciA9IFwieWVsbG93XCJcblxuICAgICAgICBAY3R4LmZpbGxSZWN0IGJ1dHRvbi54LCBidXR0b24ueSwgYnV0dG9uLndpZHRoLCBidXR0b24uaGVpZ2h0XG5cbiAgICAgICAgQGN0eC5zaGFkb3dCbHVyID0gMCBpZiBob3ZlclxuXG4gICAgICAgIEBjdHguc3Ryb2tlUmVjdCBidXR0b24ueCwgYnV0dG9uLnksIGJ1dHRvbi53aWR0aCwgYnV0dG9uLmhlaWdodFxuXG4gICAgICAgIEBjdHguZmlsbFN0eWxlID0gXCIjMDAwXCJcbiAgICAgICAgQGN0eC5mb250ID0gXCIxMnB4IEFyaWFsLCBzYW5zLXNlcmlmXCJcbiAgICAgICAgQGN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiXG4gICAgICAgIHRleHRTaXplID0gQGN0eC5tZWFzdXJlVGV4dCBidXR0b24udGV4dFxuICAgICAgICBAY3R4LmZpbGxUZXh0IGJ1dHRvbi50ZXh0LCBidXR0b24ueCArIDEwMCAtICh0ZXh0U2l6ZS53aWR0aCAvIDIpLCBidXR0b24ueSArIDdcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnVTdGF0ZSIsIlN0YXRlID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TdGF0ZS5jb2ZmZWVcIlxuU3RhdGVNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL1N0YXRlTWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuQXNzZXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0Fzc2V0TWFuYWdlci5jb2ZmZWVcIlxuXG5jbGFzcyBQcmVMb2FkU3RhdGUgZXh0ZW5kcyBTdGF0ZVxuICAgIGluaXQ6IC0+XG4gICAgICAgIEBiYXIgPVxuICAgICAgICAgICAgeDogKEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGggLyAyKSAtIDEwMFxuICAgICAgICAgICAgeTogKEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0IC8gMikgLSAyMFxuICAgICAgICAgICAgd2lkdGg6IDIwMFxuICAgICAgICAgICAgaGVpZ2h0OiAyMFxuXG4gICAgICAgIEBiYXIubWlkZGxlID0gQGJhci54ICsgKEBiYXIud2lkdGggLyAyKVxuXG4gICAgICAgIEBjdHggPSBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4XG5cblxuICAgIGFjdGl2YXRlOiAtPlxuICAgICAgICBAY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiXG4gICAgICAgIEBjdHguZmlsbFJlY3QgMCwgMCwgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aCwgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcblxuICAgICAgICBAcmVuZGVyTG9hZGluZ0JhciAwXG4gICAgICAgIEByZW5kZXJMb2FkaW5nVGV4dCBcIkxvYWRpbmcuLi5cIlxuXG4gICAgICAgIEFzc2V0TWFuYWdlci5vblByb2dyZXNzID0gQG9uUHJvZ3Jlc3MuYmluZCBAXG5cbiAgICAgICAgbG9hZEFzc2V0ID0gQXNzZXRNYW5hZ2VyLmxvYWQgXCJhc3NldHMvZGVtby1hc3NldHMuanNvblwiXG4gICAgICAgIGxvYWRBc3NldC50aGVuIC0+IFN0YXRlTWFuYWdlci5hY3RpdmF0ZSBcIm1lbnVcIlxuXG5cbiAgICBvblByb2dyZXNzOiAoYXNzZXQsIGdyb3VwLCBsb2FkZWQsIHRvdGFsKSAtPlxuICAgICAgICBAY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiXG4gICAgICAgIEBjdHguZmlsbFJlY3QgMCwgMCwgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aCwgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcbiAgICAgICAgQHJlbmRlckxvYWRpbmdUZXh0IFwiTG9hZGluZyAje2dyb3VwfS4uLlwiXG4gICAgICAgIEByZW5kZXJMb2FkaW5nQmFyIGxvYWRlZCAvIHRvdGFsXG5cblxuICAgIHJlbmRlckxvYWRpbmdUZXh0OiAodGV4dCkgLT5cbiAgICAgICAgQGN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIlxuICAgICAgICBAY3R4LmZvbnQgPSBcIjEycHggQXJpYWwsIHNhbnMtc2VyaWZcIlxuICAgICAgICBAY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCJcbiAgICAgICAgdGV4dFNpemUgPSBAY3R4Lm1lYXN1cmVUZXh0IHRleHRcbiAgICAgICAgQGN0eC5maWxsVGV4dCB0ZXh0LCBAYmFyLm1pZGRsZSAtICh0ZXh0U2l6ZS53aWR0aCAvIDIpLCBAYmFyLnkgKyBAYmFyLmhlaWdodCArIDEwXG5cblxuICAgIHJlbmRlckxvYWRpbmdCYXI6IChwZXJjZW50KSAtPlxuICAgICAgICBAY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZlwiXG4gICAgICAgIEBjdHguc3Ryb2tlU3R5bGUgPSBcIiNmZmZcIlxuICAgICAgICBAY3R4LnN0cm9rZVJlY3QgQGJhci54LCBAYmFyLnksIEBiYXIud2lkdGgsIEBiYXIuaGVpZ2h0XG4gICAgICAgIEBjdHguZmlsbFJlY3QgQGJhci54ICsgMywgQGJhci55ICsgMywgKEBiYXIud2lkdGggLSA2KSAqIHBlcmNlbnQsIEBiYXIuaGVpZ2h0IC0gNlxuXG5cbm1vZHVsZS5leHBvcnRzID0gUHJlTG9hZFN0YXRlIiwiRW5naW5lID0gcmVxdWlyZSBcIi4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9FbmdpbmUuY29mZmVlXCJcblxuQm9vdFN0YXRlID0gcmVxdWlyZSBcIi4vU3RhdGUvQm9vdFN0YXRlLmNvZmZlZVwiXG5cblxuZ2FtZSA9IG5ldyBFbmdpbmVcbmdhbWUuc3RhcnQgbmV3IEJvb3RTdGF0ZSIsIlN0YXRlTWFuYWdlciA9IHJlcXVpcmUgXCIuL01hbmFnZXIvU3RhdGVNYW5hZ2VyLmNvZmZlZVwiXG5cbmNsYXNzIEVuZ2luZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAbGFzdEdhbWVUaWNrID0gRGF0ZS5ub3coKVxuXG4gICAgc3RhcnQ6IChzdGF0ZSkgLT5cbiAgICAgICAgU3RhdGVNYW5hZ2VyLmFkZCBcImJvb3RcIiwgc3RhdGVcbiAgICAgICAgc3RhdGUuaW5pdCgpXG4gICAgICAgIFN0YXRlTWFuYWdlci5hY3RpdmF0ZSBcImJvb3RcIlxuICAgICAgICBAbWFpbkxvb3AoKVxuXG4gICAgbWFpbkxvb3A6IC0+XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBAbWFpbkxvb3AuYmluZCBAXG5cbiAgICAgICAgQGN1cnJlbnRHYW1lVGljayA9IERhdGUubm93KClcbiAgICAgICAgQGRlbHRhID0gQGN1cnJlbnRHYW1lVGljayAtIEBsYXN0R2FtZVRpY2tcbiAgICAgICAgQGxhc3RHYW1lVGljayA9IEBjdXJyZW50R2FtZVRpY2tcblxuICAgICAgICBAdXBkYXRlIEBkZWx0YVxuICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgdXBkYXRlOiAoZHQpIC0+XG4gICAgICAgIHN0YXRlID0gU3RhdGVNYW5hZ2VyLmN1cnJlbnQoKVxuXG4gICAgICAgIGZvciBzeXN0ZW0gaW4gc3RhdGUuc3lzdGVtc1xuICAgICAgICAgICAgc3lzdGVtLnVwZGF0ZSBkdFxuICAgICAgICByZXR1cm4gbnVsbFxuXG5cbm1vZHVsZS5leHBvcnRzID0gRW5naW5lIiwidXVpZCA9IHJlcXVpcmUgXCIuLi92ZW5kb3Ivbm9kZS11dWlkL3V1aWQuanNcIlxuXG5jbGFzcyBFbnRpdHlcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQGlkID0gbnVsbFxuICAgICAgICBAY29tcG9uZW50cyA9IFtdXG5cbm1vZHVsZS5leHBvcnRzID0gRW50aXR5IiwiVXRpbCA9IHJlcXVpcmUgXCIuLi9VdGlsLmNvZmZlZVwiXG5cbmNsYXNzIEFzc2V0TWFuYWdlclxuICAgIEBhc3NldHMgPSB7fVxuICAgIEBudW1Bc3NldHMgPSAwXG4gICAgQGFzc2V0c0xvYWRlZCA9IDBcblxuICAgIEBsb2FkOiAobWFuaWZlc3QpIC0+XG4gICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSAtPlxuICAgICAgICAgICAgY29uc29sZS5sb2cgXCJBc3NldE1hbmFnZXIgPiBsb2FkID4gI3ttYW5pZmVzdH1cIlxuICAgICAgICAgICAgbG9hZE1hbmlmZXN0ID0gVXRpbC5sb2FkSlNPTiBtYW5pZmVzdFxuICAgICAgICAgICAgbG9hZE1hbmlmZXN0LnRoZW4gKGpzb24pIC0+XG4gICAgICAgICAgICAgICAgZm9yIGksZ3JvdXAgb2YganNvbi5ncm91cHNcbiAgICAgICAgICAgICAgICAgICAgZm9yIGFzc2V0IGluIGdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIubnVtQXNzZXRzKytcblxuICAgICAgICAgICAgICAgIGZvciBncm91cE5hbWUsIGdyb3VwIG9mIGpzb24uZ3JvdXBzXG4gICAgICAgICAgICAgICAgICAgIGZvciBhc3NldCBpbiBncm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgZG8gKGFzc2V0KSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZCA9IFV0aWwubG9hZCBqc29uLnJvb3QgKyBhc3NldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZC50aGVuIChkYXRhKSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIuYXNzZXRzW2Fzc2V0XSA9IGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLmFzc2V0c0xvYWRlZCsrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNBc3NldE1hbmFnZXIub25Bc3NldExvYWQgYXNzZXQsIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLm9uUHJvZ3Jlc3MgYXNzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIuYXNzZXRzTG9hZGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLm51bUFzc2V0c1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIEFzc2V0TWFuYWdlci5hc3NldHNMb2FkZWQgaXMgQXNzZXRNYW5hZ2VyLm51bUFzc2V0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLm9uTG9hZGVkKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICByZXR1cm4gcHJvbWlzZVxuXG4gICAgI0BvbkFzc2V0TG9hZDogKGFzc2V0LCBkYXRhKSAtPlxuICAgICNAb25Bc3NldEVycm9yOiAoYXNzZXQpIC0+XG4gICAgQG9uUHJvZ3Jlc3M6IChhc3NldCwgZ3JvdXAsIGxvYWRlZCwgdG90YWwpIC0+XG4gICAgQG9uTG9hZGVkOiAtPlxuXG4gICAgQGdldDogKGFzc2V0KSAtPiBBc3NldE1hbmFnZXIuYXNzZXRzW2Fzc2V0XVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQXNzZXRNYW5hZ2VyIiwiY2xhc3MgQXVkaW9NYW5hZ2VyXG4gICAgQHNvdW5kczoge31cblxuICAgIEBsb2FkOiAoaWQsIGF1ZGlvRmlsZSkgLT5cbiAgICAgICAgc291bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiYXVkaW9cIlxuICAgICAgICBzb3VuZC5zcmMgPSBhdWRpb0ZpbGVcbiAgICAgICAgQXVkaW9NYW5hZ2VyLnNvdW5kc1tpZF0gPSBzb3VuZFxuXG4gICAgQHBsYXk6IChpZCkgLT5cbiAgICAgICAgc291bmQgPSBBdWRpb01hbmFnZXIuc291bmRzW2lkXVxuICAgICAgICBpZiBzb3VuZFxuICAgICAgICAgICAgc291bmQucGF1c2UoKVxuICAgICAgICAgICAgc291bmQuY3VycmVudFRpbWUgPSAwXG4gICAgICAgICAgICBzb3VuZC5wbGF5KClcblxubW9kdWxlLmV4cG9ydHMgPSBBdWRpb01hbmFnZXIiLCJ1dWlkID0gcmVxdWlyZSBcIi4uLy4uL3ZlbmRvci9ub2RlLXV1aWQvdXVpZC5qc1wiXG5FbnRpdHkgPSByZXF1aXJlIFwiLi4vRW50aXR5LmNvZmZlZVwiXG5cbmNsYXNzIEVudGl0eU1hbmFnZXJcbiAgICBAZW50aXRpZXMgPSBbXVxuXG4gICAgQGNyZWF0ZUVudGl0eTogKGlkLCBhZGRUb0xpc3QgPSB0cnVlKSAtPlxuICAgICAgICBpZCA/PSB1dWlkLnYxKClcbiAgICAgICAgZW50aXR5ID0gbmV3IEVudGl0eVxuICAgICAgICBlbnRpdHkuaWQgPSBpZFxuICAgICAgICBAYWRkRW50aXR5IGVudGl0eSBpZiBhZGRUb0xpc3RcbiAgICAgICAgcmV0dXJuIGVudGl0eVxuXG4gICAgQGFkZEVudGl0eTogKGVudGl0eSkgLT4gQGVudGl0aWVzLnB1c2ggZW50aXR5XG5cbiAgICBAcmVtb3ZlRW50aXR5OiAoZW50aXR5KSAtPlxuICAgICAgICAjIEZpbmQgdGhlIGluZGV4IG9mIHRoZSBlbnRpdHkgaW4gdGhlIGxpc3RcbiAgICAgICAgaW5kZXggPSAtMVxuICAgICAgICBmb3IgZSwgaSBpbiBAZW50aXRpZXNcbiAgICAgICAgICAgIGlmIGUgPT0gZW50aXR5IHRoZW4gaW5kZXggPSBpXG5cbiAgICAgICAgIyBSZW1vdmUgZnJvbSBlbnRpdHkgbGlzdFxuICAgICAgICBAZW50aXRpZXMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgICAgIHJldHVybiBlbnRpdHlcblxuICAgIEBkZWxldGVFbnRpdHk6IChlbnRpdHkpIC0+XG4gICAgICAgIGVudGl0eS5yZW1vdmVBbGxDb21wb25lbnRzKClcbiAgICAgICAgQHJlbW92ZUVudGl0eSBlbnRpdHlcblxuICAgIEBnZXRFbnRpdHlCeUlkOiAtPlxuICAgIEBnZXRBbGxFbnRpdGllc1dpdGhDb21wb25lbnRPZlR5cGU6IC0+XG5cbiAgICBAZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlczogKGNvbXBvbmVudFR5cGVzKSAtPlxuICAgICAgICBlbnRpdGllcyA9IFtdXG4gICAgICAgIGZvciBlbnRpdHkgaW4gQGVudGl0aWVzXG4gICAgICAgICAgICBjb21wb25lbnRDb3VudCA9IDBcbiAgICAgICAgICAgIGZvciBjb21wb25lbnQgaW4gZW50aXR5LmNvbXBvbmVudHNcbiAgICAgICAgICAgICAgICBpZiBjb21wb25lbnRUeXBlcy5pbmRleE9mKGNvbXBvbmVudC50eXBlKSA+IC0xIHRoZW4gY29tcG9uZW50Q291bnQrK1xuICAgICAgICAgICAgaWYgY29tcG9uZW50Q291bnQgPT0gY29tcG9uZW50VHlwZXMubGVuZ3RoIHRoZW4gZW50aXRpZXMucHVzaCBlbnRpdHlcbiAgICAgICAgcmV0dXJuIGVudGl0aWVzXG5cbiAgICBAYWRkQ29tcG9uZW50OiAoZW50aXR5LCBjb21wb25lbnQpIC0+IGVudGl0eS5jb21wb25lbnRzLnB1c2ggY29tcG9uZW50XG5cbiAgICBAaGFzQ29tcG9uZW50OiAtPlxuXG4gICAgQGdldENvbXBvbmVudE9mVHlwZTogKGVudGl0eSwgY29tcG9uZW50VHlwZSkgLT5cbiAgICAgICAgZm9yIGNvbXBvbmVudCBpbiBlbnRpdHkuY29tcG9uZW50c1xuICAgICAgICAgICAgaWYgY29tcG9uZW50LnR5cGUgPT0gY29tcG9uZW50VHlwZSB0aGVuIHJldHVybiBjb21wb25lbnRcbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgIEByZW1vdmVBbGxDb21wb25lbnRzOiAoZW50aXR5KSAtPiBlbnRpdHkuY29tcG9uZW50cy5sZW5ndGggPSAwXG5cblxuIyAgICBnZXRDb21wb25lbnRPZlR5cGU6IChlbnRpdHksIGNvbXBvbmVudFR5cGUpIC0+IF8uZmluZCBlbnRpdHkuY29tcG9uZW50cywgKGMpIC0+IGMudHlwZSA9PSBjb21wb25lbnRUeXBlXG5cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRpdHlNYW5hZ2VyIiwiY2xhc3MgR3JhcGhpY3NNYW5hZ2VyXG5cbiAgICBAY3JlYXRlQ2FudmFzOiAod2lkdGgsIGhlaWdodCwgYXBwZW5kVG8pIC0+XG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJjYW52YXNcIlxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aFxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0XG5cbiAgICAgICAgaWYgYXBwZW5kVG8gdGhlbiBhcHBlbmRUby5hcHBlbmRDaGlsZCBjYW52YXNcblxuICAgICAgICByZXR1cm4gY2FudmFzXG5cblxuICAgIEBjcmVhdGVSZW5kZXJlcjogKHdpZHRoLCBoZWlnaHQsIGFwcGVuZFRvKSAtPlxuICAgICAgICByZW5kZXJlciA9IHt9XG4gICAgICAgIHJlbmRlcmVyLmNhbnZhcyA9IEdyYXBoaWNzTWFuYWdlci5jcmVhdGVDYW52YXMgd2lkdGgsIGhlaWdodCwgYXBwZW5kVG9cbiAgICAgICAgcmVuZGVyZXIuY3R4ID0gcmVuZGVyZXIuY2FudmFzLmdldENvbnRleHQgXCIyZFwiXG4gICAgICAgIHJldHVybiByZW5kZXJlclxuXG5cbiAgICBAZmlsbEltYWdlOiAoY3R4LCBpbWFnZSwgaW1hZ2VXaWR0aCwgaW1hZ2VIZWlnaHQsIGRlc3RpbmF0aW9uV2lkdGgsIGRlc3RpbmF0aW9uSGVpZ2h0KSAtPlxuICAgICAgICByYXRpb0ltYWdlID0gaW1hZ2VXaWR0aCAvIGltYWdlSGVpZ2h0XG4gICAgICAgIHJhdGlvRGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbldpZHRoIC8gZGVzdGluYXRpb25IZWlnaHRcblxuICAgICAgICB3aWR0aCA9IGRlc3RpbmF0aW9uV2lkdGhcbiAgICAgICAgaGVpZ2h0ID0gZGVzdGluYXRpb25IZWlnaHRcblxuICAgICAgICBpZiByYXRpb0Rlc3RpbmF0aW9uID4gcmF0aW9JbWFnZVxuICAgICAgICAgICAgaGVpZ2h0ID0gZGVzdGluYXRpb25XaWR0aCAvIHJhdGlvSW1hZ2VcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgd2lkdGggPSBkZXN0aW5hdGlvbkhlaWdodCAqIHJhdGlvSW1hZ2VcblxuICAgICAgICBjdHguZHJhd0ltYWdlIGltYWdlLCAwLCAwLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgMCwgMCwgd2lkdGgsIGhlaWdodFxuXG5cbiAgICBAZml0SW1hZ2U6IChjdHgsIGltYWdlLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgZGVzdGluYXRpb25XaWR0aCwgZGVzdGluYXRpb25IZWlnaHQpIC0+XG4gICAgICAgIHJhdGlvSW1hZ2UgPSBpbWFnZVdpZHRoIC8gaW1hZ2VIZWlnaHRcbiAgICAgICAgcmF0aW9EZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uV2lkdGggLyBkZXN0aW5hdGlvbkhlaWdodFxuXG4gICAgICAgIHdpZHRoID0gZGVzdGluYXRpb25XaWR0aFxuICAgICAgICBoZWlnaHQgPSBkZXN0aW5hdGlvbkhlaWdodFxuXG4gICAgICAgIGlmIHJhdGlvRGVzdGluYXRpb24gPiByYXRpb0ltYWdlXG4gICAgICAgICAgICB3aWR0aCA9IGltYWdlV2lkdGggKiBkZXN0aW5hdGlvbkhlaWdodCAvIGltYWdlSGVpZ2h0XG4gICAgICAgICAgICBoZWlnaHQgPSBkZXN0aW5hdGlvbkhlaWdodFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3aWR0aCA9IGRlc3RpbmF0aW9uV2lkdGhcbiAgICAgICAgICAgIGhlaWdodCA9IGltYWdlSGVpZ2h0ICogZGVzdGluYXRpb25XaWR0aCAvIGltYWdlV2lkdGhcblxuICAgICAgICBjdHguZHJhd0ltYWdlIGltYWdlLCAwLCAwLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgMCwgMCwgd2lkdGgsIGhlaWdodFxuXG5cbm1vZHVsZS5leHBvcnRzID0gR3JhcGhpY3NNYW5hZ2VyIiwiY2xhc3MgSW5wdXRNYW5hZ2VyXG4gICAgQG1vdXNlOlxuICAgICAgICB4OiAwXG4gICAgICAgIHk6IDBcblxuICAgIEBrZXk6XG4gICAgICAgIHVwOiBmYWxzZVxuICAgICAgICBkb3duOiBmYWxzZVxuICAgICAgICBsZWZ0OiBmYWxzZVxuICAgICAgICByaWdodDogZmFsc2VcblxuICAgIEBpbml0OiAtPlxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgSW5wdXRNYW5hZ2VyLm1vdXNlQ2xpY2tcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcIm1vdXNlbW92ZVwiLCBJbnB1dE1hbmFnZXIubW91c2VNb3ZlXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJrZXl1cFwiLCBJbnB1dE1hbmFnZXIua2V5VXBcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleWRvd25cIiwgSW5wdXRNYW5hZ2VyLmtleURvd25cblxuICAgIEBtb3VzZUNsaWNrOiAoZSkgLT4gSW5wdXRNYW5hZ2VyLm9uTW91c2VDbGljaz8gZVxuXG4gICAgQG1vdXNlTW92ZTogKGUpIC0+XG4gICAgICAgIElucHV0TWFuYWdlci5tb3VzZS54ID0gZS54XG4gICAgICAgIElucHV0TWFuYWdlci5tb3VzZS55ID0gZS55XG4gICAgICAgIElucHV0TWFuYWdlci5vbk1vdXNlTW92ZT8gZVxuXG4gICAgQGtleVVwOiAoZSkgLT5cbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM4IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS51cCA9IGZhbHNlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSA0MCB0aGVuIElucHV0TWFuYWdlci5rZXkuZG93biA9IGZhbHNlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzNyB0aGVuIElucHV0TWFuYWdlci5rZXkubGVmdCA9IGZhbHNlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzOSB0aGVuIElucHV0TWFuYWdlci5rZXkucmlnaHQgPSBmYWxzZVxuXG4gICAgICAgIElucHV0TWFuYWdlci5vbktleVVwPyBlXG5cbiAgICBAa2V5RG93bjogKGUpIC0+XG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzOCB0aGVuIElucHV0TWFuYWdlci5rZXkudXAgPSB0cnVlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSA0MCB0aGVuIElucHV0TWFuYWdlci5rZXkuZG93biA9IHRydWVcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM3IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS5sZWZ0ID0gdHJ1ZVxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzkgdGhlbiBJbnB1dE1hbmFnZXIua2V5LnJpZ2h0ID0gdHJ1ZVxuXG4gICAgICAgIElucHV0TWFuYWdlci5vbktleURvd24/IGVcblxuICAgIEBvbk1vdXNlQ2xpY2s6IChlKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuICAgIEBvbk1vdXNlTW92ZTogKGUpIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uS2V5VXA6IChlKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuICAgIEBvbktleURvd246IChlKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuXG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRNYW5hZ2VyXG4iLCJjbGFzcyBTdGF0ZU1hbmFnZXJcbiAgICBAY3VycmVudFN0YXRlOiBcImJvb3RcIlxuICAgIEBzdGF0ZXM6IHt9XG5cbiAgICBAYWRkOiAobmFtZSwgc3RhdGUpIC0+XG4gICAgICAgIFN0YXRlTWFuYWdlci5zdGF0ZXNbbmFtZV0gPSBzdGF0ZVxuICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgQGN1cnJlbnQ6IC0+IFN0YXRlTWFuYWdlci5zdGF0ZXNbU3RhdGVNYW5hZ2VyLmN1cnJlbnRTdGF0ZV1cblxuICAgIEBhY3RpdmF0ZTogKG5hbWUpIC0+XG4gICAgICAgIG9sZCA9IFN0YXRlTWFuYWdlci5jdXJyZW50KClcbiAgICAgICAgb2xkLmRlYWN0aXZhdGUoKSBpZiBvbGRcbiAgICAgICAgU3RhdGVNYW5hZ2VyLmN1cnJlbnRTdGF0ZSA9IG5hbWVcbiAgICAgICAgU3RhdGVNYW5hZ2VyLm9uQWN0aXZhdGUgbmFtZVxuICAgICAgICBTdGF0ZU1hbmFnZXIuY3VycmVudCgpLmFjdGl2YXRlKClcbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgIEBvbkFjdGl2YXRlOiAobmFtZSkgLT4gIyBVc2VyIGxldmVsIGhvb2tcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRlTWFuYWdlciIsIlV0aWwgPSByZXF1aXJlIFwiLi9VdGlsLmNvZmZlZVwiXG5cbmNsYXNzIE1hcFxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAd2lkdGggPSAwXG4gICAgICAgIEBoZWlnaHQgPSAwXG4gICAgICAgIEB0aWxlV2lkdGggPSAwXG4gICAgICAgIEB0aWxlSGVpZ2h0ID0gMFxuICAgICAgICBAbGF5ZXJzID0gW11cbiAgICAgICAgQHRpbGVTZXRzID0gW11cblxuXG4gICAgbG9hZE1hcDogKG1hcEZpbGUpIC0+XG4gICAgICAgIG1hcCA9IFV0aWwubG9hZEpTT04gbWFwRmlsZVxuICAgICAgICBtYXAudGhlbiBAcGFyc2VNYXAuYmluZCBAXG5cblxuICAgIHBhcnNlTWFwOiAobWFwRGF0YSkgLT5cbiAgICAgICAgQHdpZHRoID0gbWFwRGF0YS53aWR0aFxuICAgICAgICBAaGVpZ2h0ID0gbWFwRGF0YS5oZWlnaHRcbiAgICAgICAgQHRpbGVXaWR0aCA9IG1hcERhdGEudGlsZXdpZHRoXG4gICAgICAgIEB0aWxlSGVpZ2h0ID0gbWFwRGF0YS50aWxlaGVpZ2h0XG5cbiAgICAgICAgQHBhcnNlTGF5ZXIgbGF5ZXIgZm9yIGxheWVyIGluIG1hcERhdGEubGF5ZXJzXG4gICAgICAgIEBwYXJzZVRpbGVTZXQgdGlsZVNldCBmb3IgdGlsZVNldCBpbiBtYXBEYXRhLnRpbGVzZXRzXG5cbiAgICAgICAgIyBMb2FkIHRoZSBpbWFnZSBhc3NldHNcbiAgICAgICAgbG9hZFByb21pc2VzID0gW11cbiAgICAgICAgZm9yIHRpbGVTZXQgaW4gQHRpbGVTZXRzXG4gICAgICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgLT5cbiAgICAgICAgICAgICAgICB0aWxlU2V0LmltZyA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICAgICAgIyBOb3RlIHRoZSBwYXRoIGlzIGhhcmQgY29kZWQgYW5kIHNob3VsZCBwcm9iYWJseSBiZSBiYXNlZCBvbiB0aGUgbG9jYXRpb24gb2YgdGhlIG1hcFxuICAgICAgICAgICAgICAgIHRpbGVTZXQuaW1nLnNyYyA9IFwiL2Fzc2V0cy9tYXAvXCIgKyB0aWxlU2V0LnNyY1xuICAgICAgICAgICAgICAgIHRpbGVTZXQuaW1nLm9ubG9hZCA9IC0+IHJlc29sdmUoKVxuICAgICAgICAgICAgICAgIHRpbGVTZXQuaW1nLm9uZXJyb3IgPSAtPiByZWplY3QoKVxuICAgICAgICAgICAgbG9hZFByb21pc2VzLnB1c2ggcHJvbWlzZVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbCBsb2FkUHJvbWlzZXNcblxuXG4gICAgcGFyc2VMYXllcjogKGxheWVyRGF0YSkgLT5cbiAgICAgICAgIyBDdXJyZW50bHkgb25seSBkZWFsIHdpdGggdGlsZSBsYXllcnNcbiAgICAgICAgaWYgbGF5ZXJEYXRhLnR5cGUgIT0gXCJ0aWxlbGF5ZXJcIiB0aGVuIHJldHVyblxuXG4gICAgICAgIGxheWVyID1cbiAgICAgICAgICAgIG5hbWU6IGxheWVyRGF0YS5uYW1lXG4gICAgICAgICAgICBkYXRhOiBbXVxuXG4gICAgICAgICMgQ29weSB0aGUgdGlsZSBudW1iZXIgdG8gdGhlIGxheWVyXG4gICAgICAgIGZvciB5IGluIFswLi5AaGVpZ2h0IC0gMV1cbiAgICAgICAgICAgIGxheWVyLmRhdGFbeV0gPSBbXVxuICAgICAgICAgICAgZm9yIHggaW4gWzAuLkB3aWR0aCAtIDFdXG4gICAgICAgICAgICAgICAgbGF5ZXIuZGF0YVt5XVt4XSA9IGxheWVyRGF0YS5kYXRhWyh5ICogQHdpZHRoKSArIHhdXG5cbiAgICAgICAgQGxheWVycy5wdXNoIGxheWVyXG5cblxuICAgIHBhcnNlVGlsZVNldDogKHRpbGVTZXREYXRhKSAtPlxuICAgICAgICB0aWxlU2V0ID1cbiAgICAgICAgICAgIGltYWdlV2lkdGg6IHRpbGVTZXREYXRhLmltYWdld2lkdGhcbiAgICAgICAgICAgIGltYWdlSGVpZ2h0OiB0aWxlU2V0RGF0YS5pbWFnZWhlaWdodFxuICAgICAgICAgICAgdGlsZVdpZHRoOiB0aWxlU2V0RGF0YS50aWxld2lkdGhcbiAgICAgICAgICAgIHRpbGVIZWlnaHQ6IHRpbGVTZXREYXRhLnRpbGVoZWlnaHRcbiAgICAgICAgICAgIGZpcnN0R2lkOiB0aWxlU2V0RGF0YS5maXJzdGdpZFxuICAgICAgICAgICAgc3JjOiB0aWxlU2V0RGF0YS5pbWFnZVxuXG4gICAgICAgIHRpbGVTZXQubGFzdEdpZCA9IHRpbGVTZXQuZmlyc3RHaWQgK1xuICAgICAgICAgICAgKCh0aWxlU2V0LmltYWdlV2lkdGggKiB0aWxlU2V0LmltYWdlSGVpZ2h0KSAvICh0aWxlU2V0LnRpbGVXaWR0aCAqIHRpbGVTZXQudGlsZUhlaWdodCkpXG5cbiAgICAgICAgdGlsZVNldC5udW1YVGlsZXMgPSBNYXRoLmZsb29yIHRpbGVTZXQuaW1hZ2VXaWR0aCAvIHRpbGVTZXQudGlsZVdpZHRoXG4gICAgICAgIHRpbGVTZXQubnVtWVRpbGVzID0gTWF0aC5mbG9vciB0aWxlU2V0LmltYWdlSGVpZ2h0IC8gdGlsZVNldC50aWxlSGVpZ2h0XG5cbiAgICAgICAgQHRpbGVTZXRzLnB1c2ggdGlsZVNldFxuXG5cbiAgICBkcmF3VGlsZTogKGN0eCwgeCwgeSwgdHcsIHRoLCB0aWxlTnVtYmVyLCB0aWxlU2V0LCBvZmZzZXRYID0gMCwgb2Zmc2V0WSA9IDApIC0+XG4gICAgICAgICMgRmluZCB0aGUgc3JjWCAmIHNyY1kgaW4gdGhlIGltYWdlIC0gcmV2ZXJzZSAoeCAqIHkpICsgeCA9IG5cbiAgICAgICAgc3JjWCA9IE1hdGguZmxvb3IodGlsZU51bWJlciAlIHRpbGVTZXQubnVtWFRpbGVzKSAqIHRpbGVTZXQudGlsZVdpZHRoXG4gICAgICAgIHNyY1kgPSBNYXRoLmZsb29yKHRpbGVOdW1iZXIgLyB0aWxlU2V0Lm51bVhUaWxlcykgKiB0aWxlU2V0LnRpbGVIZWlnaHRcblxuICAgICAgICBjdHguZHJhd0ltYWdlIHRpbGVTZXQuaW1nLFxuICAgICAgICAgICAgc3JjWCwgc3JjWSxcbiAgICAgICAgICAgIHRpbGVTZXQudGlsZVdpZHRoLCB0aWxlU2V0LnRpbGVIZWlnaHQsXG4gICAgICAgICAgICAoeCAqIHRpbGVTZXQudGlsZVdpZHRoKSArIG9mZnNldFgsICh5ICogdGlsZVNldC50aWxlSGVpZ2h0KSArIG9mZnNldFksXG4gICAgICAgICAgICB0aWxlU2V0LnRpbGVXaWR0aCwgdGlsZVNldC50aWxlSGVpZ2h0XG5cblxuICAgIGRyYXdUaWxlRnJvbU51bWJlcjogKGN0eCwgeCwgeSwgdHcsIHRoLCB0aWxlTnVtYmVyLCBvZmZzZXRYID0gMCwgb2Zmc2V0WSA9IDApIC0+XG4gICAgICAgICMgRmluZCBvdXQgd2hhdCB0aWxlIHNldCB3ZSBhcmUgaW5cbiAgICAgICAgdGlsZVNldCA9IEBnZXRUaWxlU2V0T2ZUaWxlIHRpbGVOdW1iZXJcblxuICAgICAgICBpZiB0aWxlU2V0XG4gICAgICAgICAgICB0aWxlTnVtYmVyID0gdGlsZU51bWJlciAtIHRpbGVTZXQuZmlyc3RHaWRcbiAgICAgICAgICAgIEBkcmF3VGlsZSBjdHgsIHgsIHksIEB0aWxlV2lkdGgsIEB0aWxlSGVpZ2h0LCB0aWxlTnVtYmVyLCB0aWxlU2V0LCBvZmZzZXRYLCBvZmZzZXRZXG5cblxuICAgIGdldFRpbGVTZXRPZlRpbGU6ICh0aWxlTnVtYmVyKSAtPlxuICAgICAgICBmb3Igc2V0IGluIEB0aWxlU2V0c1xuICAgICAgICAgICAgaWYgKHRpbGVOdW1iZXIgPj0gc2V0LmZpcnN0R2lkKSAmJiAodGlsZU51bWJlciA8PSBzZXQubGFzdEdpZClcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0XG4gICAgICAgIHJldHVybiBmYWxzZVxuXG5cbiAgICBkcmF3TWFwOiAoY3R4KSAtPlxuICAgICAgICBmb3IgbGF5ZXIgaW4gWzAuLkBsYXllcnMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgIGZvciB5IGluIFswLi5AaGVpZ2h0IC0gMV1cbiAgICAgICAgICAgICAgICBmb3IgeCBpbiBbMC4uQHdpZHRoIC0gMV1cbiAgICAgICAgICAgICAgICAgICAgQGRyYXdUaWxlRnJvbU51bWJlciBjdHgsIHgsIHksIEB0aWxlV2lkdGgsIEB0aWxlSGVpZ2h0LCBAbGF5ZXJzW2xheWVyXS5kYXRhW3ldW3hdXG5cblxuICAgIGRyYXdNYXBSZWN0OiAoY3R4LCB4LCB5LCB3LCBoKSAtPlxuICAgICAgICAjIE9ubHkgZHJhd3MgYSByZWdpb24gb2YgdGhlIG1hcCwgZnJvbSBwaXhlbCB4LHkgb2YgcGl4ZWwgc2l6ZSB3LGhcbiAgICAgICAgbGVmdFRpbGUgPSBNYXRoLmZsb29yIHggLyBAdGlsZVdpZHRoXG4gICAgICAgIHJpZ2h0VGlsZSA9IE1hdGguY2VpbCAoeCArIHcpIC8gQHRpbGVXaWR0aFxuICAgICAgICB0b3BUaWxlID0gTWF0aC5mbG9vciB5IC8gQHRpbGVIZWlnaHRcbiAgICAgICAgYm90dG9tVGlsZSA9IE1hdGguY2VpbCAoeSArIGgpIC8gQHRpbGVIZWlnaHRcblxuICAgICAgICBpZiBsZWZ0VGlsZSA8IDAgdGhlbiBsZWZ0VGlsZSA9IDBcbiAgICAgICAgaWYgdG9wVGlsZSA8IDAgdGhlbiB0b3BUaWxlID0gMFxuICAgICAgICBpZiByaWdodFRpbGUgPj0gQHdpZHRoIHRoZW4gcmlnaHRUaWxlID0gQHdpZHRoIC0gMVxuICAgICAgICBpZiBib3R0b21UaWxlID49IEBoZWlnaHQgdGhlbiBib3R0b21UaWxlID0gQGhlaWdodCAtIDFcblxuICAgICAgICB4T2Zmc2V0ID0gMCAtIHhcbiAgICAgICAgeU9mZnNldCA9IDAgLSB5XG5cbiAgICAgICAgZm9yIGxheWVyIGluIFswLi5AbGF5ZXJzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICBmb3IgeSBpbiBbdG9wVGlsZS4uYm90dG9tVGlsZV1cbiAgICAgICAgICAgICAgICBmb3IgeCBpbiBbbGVmdFRpbGUuLnJpZ2h0VGlsZV1cbiAgICAgICAgICAgICAgICAgICAgQGRyYXdUaWxlRnJvbU51bWJlciBjdHgsIHgsIHksIEB0aWxlV2lkdGgsIEB0aWxlSGVpZ2h0LCBAbGF5ZXJzW2xheWVyXS5kYXRhW3ldW3hdLCB4T2Zmc2V0LCB5T2Zmc2V0XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXAiLCJjbGFzcyBTdGF0ZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAc3lzdGVtcyA9IFtdXG5cbiAgICBhZGRTeXN0ZW06IChzeXN0ZW0pIC0+XG4gICAgICAgIEBzeXN0ZW1zLnB1c2ggc3lzdGVtXG4gICAgICAgIHJldHVybiBzeXN0ZW1cblxuICAgIGluaXQ6IC0+XG4gICAgYWN0aXZhdGU6IC0+XG4gICAgZGVhY3RpdmF0ZTogLT5cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZSIsImNsYXNzIFN5c3RlbVxuICAgIFRIUk9UVExFX1ZBTFVFOiAwXG5cbiAgICBjb25zdHJ1Y3RvcjogLT4gQHRpbWVTaW5jZVVwZGF0ZSA9IDBcblxuICAgIGluaXQ6IC0+XG5cbiAgICB1cGRhdGU6IChkdCkgLT5cbiAgICAgICAgQHRpbWVTaW5jZVVwZGF0ZSArPSBkdFxuXG4gICAgICAgIGlmIEB0aW1lU2luY2VVcGRhdGUgPj0gQFRIUk9UVExFX1ZBTFVFXG4gICAgICAgICAgICBAb25VcGRhdGUgQHRpbWVTaW5jZVVwZGF0ZVxuICAgICAgICAgICAgQHRpbWVTaW5jZVVwZGF0ZSA9IDBcblxuICAgICAgICByZXR1cm4gQHRpbWVTaW5jZVVwZGF0ZVxuXG4gICAgb25VcGRhdGU6IChkdCkgLT5cblxubW9kdWxlLmV4cG9ydHMgPSBTeXN0ZW0iLCJTeXN0ZW0gPSByZXF1aXJlIFwiLi4vU3lzdGVtLmNvZmZlZVwiXG5FbnRpdHlNYW5hZ2VyID0gcmVxdWlyZSBcIi4uL01hbmFnZXIvRW50aXR5TWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5cbmNsYXNzIEdyYXBoaWNzU3lzdGVtIGV4dGVuZHMgU3lzdGVtXG4gICAgVEhST1RUTEVfVkFMVUU6IDE2XG5cbiAgICBpbml0OiAoQHJlbmRlcmVyKSAtPlxuICAgICAgICBAdmlld3BvcnRYID0gMFxuICAgICAgICBAdmlld3BvcnRZID0gMFxuXG4jICAgICAgICBAYnVmZmVyID0gR3JhcGhpY3NNYW5hZ2VyLmNyZWF0ZVJlbmRlcmVyIEB3aWR0aCwgQGhlaWdodFxuXG4gICAgb25CZWZvcmVEcmF3OiAoY3R4LCBkdCkgLT5cbiAgICBvbkFmdGVyRHJhdzogKGN0eCwgZHQpIC0+XG5cbiAgICBvblVwZGF0ZTogKGR0KSAtPlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmNsZWFyUmVjdCAwLCAwLCBAcmVuZGVyZXIuY2FudmFzLndpZHRoLCBAcmVuZGVyZXIuY2FudmFzLmhlaWdodFxuICAgICAgICBAb25CZWZvcmVEcmF3IEByZW5kZXJlci5jdHgsIGR0XG4jICAgICAgICBAb25CZWZvcmVEcmF3IEBidWZmZXIuY3R4LCBkdFxuXG4gICAgICAgIEBkcmF3UmVjdHMoKVxuICAgICAgICBAZHJhd0ltYWdlcygpXG4gICAgICAgIEBkcmF3VGV4dHMoKVxuXG4gICAgICAgIEBvbkFmdGVyRHJhdyBAcmVuZGVyZXIuY3R4LCBkdFxuIyAgICAgICAgQG9uQWZ0ZXJEcmF3IEBidWZmZXIuY3R4LCBkdFxuXG4gICAgICAgICMgRHJhdyBjb3B5IHRoZSBidWZmZXIgdG8gbWFpbiByZW5kZXJlclxuIyAgICAgICAgQHJlbmRlcmVyLmN0eC5jbGVhclJlY3QgMCwgMCwgQHdpZHRoLCBAaGVpZ2h0XG4jICAgICAgICBAcmVuZGVyZXIuY3R4LmRyYXdJbWFnZSBAYnVmZmVyLmNhbnZhcywgMCwgMFxuIyAgICAgICAgQGJ1ZmZlci5jdHguY2xlYXJSZWN0IDAsIDAsIEB3aWR0aCwgQGhlaWdodFxuXG4gICAgZHJhd1JlY3RzOiAtPlxuICAgICAgICByZWN0RW50aXRpZXMgPSBFbnRpdHlNYW5hZ2VyLmdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZXMgW1wiUmVuZGVyYWJsZVJlY3RcIiwgXCJQb3NpdGlvblwiXVxuICAgICAgICBmb3IgZW50aXR5IGluIHJlY3RFbnRpdGllc1xuICAgICAgICAgICAgcmVjdCA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJSZW5kZXJhYmxlUmVjdFwiXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJQb3NpdGlvblwiXG4gICAgICAgICAgICBAYnVmZmVyLmN0eC5maWxsU3R5bGUgPSByZWN0LmNvbG91clxuICAgICAgICAgICAgQGJ1ZmZlci5jdHguZmlsbFJlY3QgcG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHRcblxuICAgIGRyYXdJbWFnZXM6IC0+XG4gICAgICAgIGltYWdlRW50aXRpZXMgPSBFbnRpdHlNYW5hZ2VyLmdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZXMgW1wiUmVuZGVyYWJsZUltYWdlXCIsIFwiUG9zaXRpb25cIl1cbiAgICAgICAgZm9yIGVudGl0eSBpbiBpbWFnZUVudGl0aWVzXG4gICAgICAgICAgICBpbWFnZSA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJSZW5kZXJhYmxlSW1hZ2VcIlxuICAgICAgICAgICAgcG9zaXRpb24gPSBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiUG9zaXRpb25cIlxuICAgICAgICAgICAgIyBUT0RPOiBHZXQgdGhlIGFjdHVhbCBpbWFnZT9cbiAgICAgICAgICAgIEBidWZmZXIuY3R4LmRyYXdJbWFnZSBpbWFnZSwgcG9zaXRpb24ueCwgcG9zaXRpb24ueVxuXG4gICAgZHJhd1RleHRzOiAtPlxuICAgICAgICB0ZXh0RW50aXRpZXMgPSBFbnRpdHlNYW5hZ2VyLmdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZXMgW1wiUmVuZGVyYWJsZVRleHRcIiwgXCJQb3NpdGlvblwiXVxuICAgICAgICBmb3IgZW50aXR5IGluIHRleHRFbnRpdGllc1xuICAgICAgICAgICAgdGV4dCA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJSZW5kZXJhYmxlVGV4dFwiXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJQb3NpdGlvblwiXG4gICAgICAgICAgICBAYnVmZmVyLmN0eC5maWxsU3R5bGUgPSB0ZXh0LmNvbG91clxuICAgICAgICAgICAgQGJ1ZmZlci5jdHguZm9udCA9IHRleHQuZm9udFxuICAgICAgICAgICAgQGJ1ZmZlci5jdHguZmlsbFRleHQgdGV4dC50ZXh0LCBwb3NpdGlvbi54LCBwb3NpdGlvbi55XG5cbiAgICAjIyNcbiAgICBpbml0OiAtPlxuICAgICAgICBAbWV0ZXIgPSBuZXcgRlBTTWV0ZXIoeyBncmFwaDogMX0pXG5cbiAgICBvblVwZGF0ZTogKGR0KSAtPlxuICAgICAgICBAbWV0ZXIudGlja1N0YXJ0KClcblxuICAgICAgICBpZiBAZW50aXR5U3lzdGVtXG4gICAgICAgICAgICBlbnRpdGllcyA9IEBlbnRpdHlTeXN0ZW0uZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJSZW5kZXJhYmxlXCIsIFwiUG9zaXRpb25cIl1cblxuICAgICAgICAgICAgXy5lYWNoIGVudGl0aWVzLCAoZW50aXR5KSA9PlxuICAgICAgICAgICAgICAgIHJlbmRlcmFibGUgPSBAZW50aXR5U3lzdGVtLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiUmVuZGVyYWJsZVwiXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBAZW50aXR5U3lzdGVtLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiUG9zaXRpb25cIlxuXG4gICAgICAgICAgICAgICAgQGJ1ZmZlckN0eC5maWxsU3R5bGUgPSByZW5kZXJhYmxlLmNvbG91clxuICAgICAgICAgICAgICAgIEBidWZmZXJDdHguZmlsbFJlY3QgcG9zaXRpb24ueCwgcG9zaXRpb24ueSwgMjAsIDIwXG5cbiAgICAgICAgQGN0eC5jbGVhclJlY3QgMCwgMCwgQFdJRFRILCBASEVJR0hUXG4gICAgICAgIEBjdHguZHJhd0ltYWdlIEBidWZmZXJDYW52YXMsIDAsIDBcbiAgICAgICAgQGJ1ZmZlckN0eC5jbGVhclJlY3QgMCwgMCwgQFdJRFRILCBASEVJR0hUXG5cbiAgICAgICAgQG1ldGVyLnRpY2soKVxuXG4gICAgIyMjXG5cbm1vZHVsZS5leHBvcnRzID0gR3JhcGhpY3NTeXN0ZW0iLCJjbGFzcyBVdGlsXG4gICAgQGxvYWRKU09OOiAodXJsKSAtPiBVdGlsLmxvYWQodXJsKS50aGVuKEpTT04ucGFyc2UpXG5cbiAgICBAbG9hZDogKHVybCkgLT5cbiAgICAgICAgcHJvbWlzZSA9IG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpIC0+XG4gICAgICAgICAgICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICAgICAgI3hoci5yZXNwb25zZVR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgeGhyLm9wZW4gXCJHRVRcIiwgdXJsLCB0cnVlXG4gICAgICAgICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lciBcInJlYWR5c3RhdGVjaGFuZ2VcIiwgLT5cbiAgICAgICAgICAgICAgICBpZiB4aHIucmVhZHlTdGF0ZSBpcyA0XG4gICAgICAgICAgICAgICAgICAgIGlmIHhoci5zdGF0dXMgaW4gWzIwMCwgMzA0XVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCBcImVycm9yXCJcbiAgICAgICAgICAgIHhoci5zZW5kKClcbiAgICAgICAgcmV0dXJuIHByb21pc2VcblxuICAgIEBwbHVyYWxpc2U6ICh3b3JkKSAtPlxuICAgICAgICBsZW4gPSB3b3JkLmxlbmd0aFxuXG4gICAgICAgIGwxID0gd29yZC5zdWJzdHIgLTFcbiAgICAgICAgbDIgPSB3b3JkLnN1YnN0ciAtMlxuXG4gICAgICAgIGlmIGwxID09IFwieVwiXG4gICAgICAgICAgICB3b3JkID0gd29yZC5zdWJzdHIoMCwgbGVuIC0gMSkgKyBcImllc1wiXG4gICAgICAgIGVsc2UgaWYgbDEgPT0gXCJzXCIgfHwgbDEgPT0gXCJ4XCIgfHwgbDIgPT0gXCJjaFwiIHx8IGwyID09IFwic2hcIiB8fCBsMiA9PSBcImVzXCJcbiAgICAgICAgICAgICMgSWYgd29yZCBlbmRzIGluIFwic1wiIFwieFwiIG9yIFwiY2hcIiBvciBcInNoXCIgYWRkIFwiZXNcIlxuICAgICAgICAgICAgd29yZCA9IHdvcmQgKyBcImVzXCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgd29yZCA9IHdvcmQgKyBcInNcIlxuXG4gICAgICAgIHJldHVybiB3b3JkXG5cbm1vZHVsZS5leHBvcnRzID0gVXRpbCIsIihmdW5jdGlvbiAoQnVmZmVyKXtcbi8vICAgICB1dWlkLmpzXG4vL1xuLy8gICAgIENvcHlyaWdodCAoYykgMjAxMC0yMDEyIFJvYmVydCBLaWVmZmVyXG4vLyAgICAgTUlUIExpY2Vuc2UgLSBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cbihmdW5jdGlvbigpIHtcbiAgdmFyIF9nbG9iYWwgPSB0aGlzO1xuXG4gIC8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBXZSBmZWF0dXJlXG4gIC8vIGRldGVjdCB0byBkZXRlcm1pbmUgdGhlIGJlc3QgUk5HIHNvdXJjZSwgbm9ybWFsaXppbmcgdG8gYSBmdW5jdGlvbiB0aGF0XG4gIC8vIHJldHVybnMgMTI4LWJpdHMgb2YgcmFuZG9tbmVzcywgc2luY2UgdGhhdCdzIHdoYXQncyB1c3VhbGx5IHJlcXVpcmVkXG4gIHZhciBfcm5nO1xuXG4gIC8vIE5vZGUuanMgY3J5cHRvLWJhc2VkIFJORyAtIGh0dHA6Ly9ub2RlanMub3JnL2RvY3MvdjAuNi4yL2FwaS9jcnlwdG8uaHRtbFxuICAvL1xuICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICBpZiAodHlwZW9mKHJlcXVpcmUpID09ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIF9yYiA9IHJlcXVpcmUoJ2NyeXB0bycpLnJhbmRvbUJ5dGVzO1xuICAgICAgX3JuZyA9IF9yYiAmJiBmdW5jdGlvbigpIHtyZXR1cm4gX3JiKDE2KTt9O1xuICAgIH0gY2F0Y2goZSkge31cbiAgfVxuXG4gIGlmICghX3JuZyAmJiBfZ2xvYmFsLmNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gV0hBVFdHIGNyeXB0by1iYXNlZCBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gICAgLy9cbiAgICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICAgIHZhciBfcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG4gICAgX3JuZyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoX3JuZHM4KTtcbiAgICAgIHJldHVybiBfcm5kczg7XG4gICAgfTtcbiAgfVxuXG4gIGlmICghX3JuZykge1xuICAgIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgICAvL1xuICAgIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gICAgLy8gcXVhbGl0eS5cbiAgICB2YXIgIF9ybmRzID0gbmV3IEFycmF5KDE2KTtcbiAgICBfcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICAgIF9ybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JuZHM7XG4gICAgfTtcbiAgfVxuXG4gIC8vIEJ1ZmZlciBjbGFzcyB0byB1c2VcbiAgdmFyIEJ1ZmZlckNsYXNzID0gdHlwZW9mKEJ1ZmZlcikgPT0gJ2Z1bmN0aW9uJyA/IEJ1ZmZlciA6IEFycmF5O1xuXG4gIC8vIE1hcHMgZm9yIG51bWJlciA8LT4gaGV4IHN0cmluZyBjb252ZXJzaW9uXG4gIHZhciBfYnl0ZVRvSGV4ID0gW107XG4gIHZhciBfaGV4VG9CeXRlID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICBfYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbiAgICBfaGV4VG9CeXRlW19ieXRlVG9IZXhbaV1dID0gaTtcbiAgfVxuXG4gIC8vICoqYHBhcnNlKClgIC0gUGFyc2UgYSBVVUlEIGludG8gaXQncyBjb21wb25lbnQgYnl0ZXMqKlxuICBmdW5jdGlvbiBwYXJzZShzLCBidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gKGJ1ZiAmJiBvZmZzZXQpIHx8IDAsIGlpID0gMDtcblxuICAgIGJ1ZiA9IGJ1ZiB8fCBbXTtcbiAgICBzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWzAtOWEtZl17Mn0vZywgZnVuY3Rpb24ob2N0KSB7XG4gICAgICBpZiAoaWkgPCAxNikgeyAvLyBEb24ndCBvdmVyZmxvdyFcbiAgICAgICAgYnVmW2kgKyBpaSsrXSA9IF9oZXhUb0J5dGVbb2N0XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFplcm8gb3V0IHJlbWFpbmluZyBieXRlcyBpZiBzdHJpbmcgd2FzIHNob3J0XG4gICAgd2hpbGUgKGlpIDwgMTYpIHtcbiAgICAgIGJ1ZltpICsgaWkrK10gPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICAvLyAqKmB1bnBhcnNlKClgIC0gQ29udmVydCBVVUlEIGJ5dGUgYXJyYXkgKGFsYSBwYXJzZSgpKSBpbnRvIGEgc3RyaW5nKipcbiAgZnVuY3Rpb24gdW5wYXJzZShidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gb2Zmc2V0IHx8IDAsIGJ0aCA9IF9ieXRlVG9IZXg7XG4gICAgcmV0dXJuICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcbiAgfVxuXG4gIC8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbiAgLy9cbiAgLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbiAgLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxuICAvLyByYW5kb20gIydzIHdlIG5lZWQgdG8gaW5pdCBub2RlIGFuZCBjbG9ja3NlcVxuICB2YXIgX3NlZWRCeXRlcyA9IF9ybmcoKTtcblxuICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgdmFyIF9ub2RlSWQgPSBbXG4gICAgX3NlZWRCeXRlc1swXSB8IDB4MDEsXG4gICAgX3NlZWRCeXRlc1sxXSwgX3NlZWRCeXRlc1syXSwgX3NlZWRCeXRlc1szXSwgX3NlZWRCeXRlc1s0XSwgX3NlZWRCeXRlc1s1XVxuICBdO1xuXG4gIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gIHZhciBfY2xvY2tzZXEgPSAoX3NlZWRCeXRlc1s2XSA8PCA4IHwgX3NlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG5cbiAgLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG4gIHZhciBfbGFzdE1TZWNzID0gMCwgX2xhc3ROU2VjcyA9IDA7XG5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuICBmdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICAgIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9IG51bGwgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gICAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAgIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAgIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gICAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPSBudWxsID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAgIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gICAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPSBudWxsID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gICAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICAgIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gICAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICAgIH1cblxuICAgIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gICAgLy8gdGltZSBpbnRlcnZhbFxuICAgIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PSBudWxsKSB7XG4gICAgICBuc2VjcyA9IDA7XG4gICAgfVxuXG4gICAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICAgIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gICAgfVxuXG4gICAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICAgIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAgIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICAgIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gICAgLy8gYHRpbWVfbG93YFxuICAgIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICAgIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gICAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICAgIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAgIC8vIGB0aW1lX21pZGBcbiAgICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gICAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gICAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gICAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgICAvLyBgbm9kZWBcbiAgICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICAgIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgbisrKSB7XG4gICAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IHVucGFyc2UoYik7XG4gIH1cblxuICAvLyAqKmB2NCgpYCAtIEdlbmVyYXRlIHJhbmRvbSBVVUlEKipcblxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG4gIGZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgLy8gRGVwcmVjYXRlZCAtICdmb3JtYXQnIGFyZ3VtZW50LCBhcyBzdXBwb3J0ZWQgaW4gdjEuMlxuICAgIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gICAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgICAgYnVmID0gb3B0aW9ucyA9PSAnYmluYXJ5JyA/IG5ldyBCdWZmZXJDbGFzcygxNikgOiBudWxsO1xuICAgICAgb3B0aW9ucyA9IG51bGw7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZykoKTtcblxuICAgIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gICAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gICAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gICAgaWYgKGJ1Zikge1xuICAgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyBpaSsrKSB7XG4gICAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZiB8fCB1bnBhcnNlKHJuZHMpO1xuICB9XG5cbiAgLy8gRXhwb3J0IHB1YmxpYyBBUElcbiAgdmFyIHV1aWQgPSB2NDtcbiAgdXVpZC52MSA9IHYxO1xuICB1dWlkLnY0ID0gdjQ7XG4gIHV1aWQucGFyc2UgPSBwYXJzZTtcbiAgdXVpZC51bnBhcnNlID0gdW5wYXJzZTtcbiAgdXVpZC5CdWZmZXJDbGFzcyA9IEJ1ZmZlckNsYXNzO1xuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBQdWJsaXNoIGFzIEFNRCBtb2R1bGVcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7cmV0dXJuIHV1aWQ7fSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mKG1vZHVsZSkgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAvLyBQdWJsaXNoIGFzIG5vZGUuanMgbW9kdWxlXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuICB9IGVsc2Uge1xuICAgIC8vIFB1Ymxpc2ggYXMgZ2xvYmFsIChpbiBicm93c2VycylcbiAgICB2YXIgX3ByZXZpb3VzUm9vdCA9IF9nbG9iYWwudXVpZDtcblxuICAgIC8vICoqYG5vQ29uZmxpY3QoKWAgLSAoYnJvd3NlciBvbmx5KSB0byByZXNldCBnbG9iYWwgJ3V1aWQnIHZhcioqXG4gICAgdXVpZC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBfZ2xvYmFsLnV1aWQgPSBfcHJldmlvdXNSb290O1xuICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgfTtcblxuICAgIF9nbG9iYWwudXVpZCA9IHV1aWQ7XG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcikiLCIvKipcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEF1dGhvcjogICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogTGljZW5zZTogIE1JVFxuICpcbiAqIGBucG0gaW5zdGFsbCBidWZmZXJgXG4gKi9cblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTJcblxuLyoqXG4gKiBJZiBgQnVmZmVyLl91c2VUeXBlZEFycmF5c2A6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChjb21wYXRpYmxlIGRvd24gdG8gSUU2KVxuICovXG5CdWZmZXIuX3VzZVR5cGVkQXJyYXlzID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gRGV0ZWN0IGlmIGJyb3dzZXIgc3VwcG9ydHMgVHlwZWQgQXJyYXlzLiBTdXBwb3J0ZWQgYnJvd3NlcnMgYXJlIElFIDEwKywgRmlyZWZveCA0KyxcbiAgLy8gQ2hyb21lIDcrLCBTYWZhcmkgNS4xKywgT3BlcmEgMTEuNissIGlPUyA0LjIrLiBJZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZ1xuICAvLyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsIHRoZW4gdGhhdCdzIHRoZSBzYW1lIGFzIG5vIGBVaW50OEFycmF5YCBzdXBwb3J0XG4gIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIGFkZCBhbGwgdGhlIG5vZGUgQnVmZmVyIEFQSSBtZXRob2RzLiBUaGlzIGlzIGFuIGlzc3VlXG4gIC8vIGluIEZpcmVmb3ggNC0yOS4gTm93IGZpeGVkOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzhcbiAgdHJ5IHtcbiAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKDApXG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICBhcnIuZm9vID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfVxuICAgIHJldHVybiA0MiA9PT0gYXJyLmZvbygpICYmXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgLy8gQ2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufSkoKVxuXG4vKipcbiAqIENsYXNzOiBCdWZmZXJcbiAqID09PT09PT09PT09PT1cbiAqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGFyZSBhdWdtZW50ZWRcbiAqIHdpdGggZnVuY3Rpb24gcHJvcGVydGllcyBmb3IgYWxsIHRoZSBub2RlIGBCdWZmZXJgIEFQSSBmdW5jdGlvbnMuIFdlIHVzZVxuICogYFVpbnQ4QXJyYXlgIHNvIHRoYXQgc3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXQgcmV0dXJuc1xuICogYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogQnkgYXVnbWVudGluZyB0aGUgaW5zdGFuY2VzLCB3ZSBjYW4gYXZvaWQgbW9kaWZ5aW5nIHRoZSBgVWludDhBcnJheWBcbiAqIHByb3RvdHlwZS5cbiAqL1xuZnVuY3Rpb24gQnVmZmVyIChzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKVxuICAgIHJldHVybiBuZXcgQnVmZmVyKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pXG5cbiAgdmFyIHR5cGUgPSB0eXBlb2Ygc3ViamVjdFxuXG4gIC8vIFdvcmthcm91bmQ6IG5vZGUncyBiYXNlNjQgaW1wbGVtZW50YXRpb24gYWxsb3dzIGZvciBub24tcGFkZGVkIHN0cmluZ3NcbiAgLy8gd2hpbGUgYmFzZTY0LWpzIGRvZXMgbm90LlxuICBpZiAoZW5jb2RpbmcgPT09ICdiYXNlNjQnICYmIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgc3ViamVjdCA9IHN0cmluZ3RyaW0oc3ViamVjdClcbiAgICB3aGlsZSAoc3ViamVjdC5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgICBzdWJqZWN0ID0gc3ViamVjdCArICc9J1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpbmQgdGhlIGxlbmd0aFxuICB2YXIgbGVuZ3RoXG4gIGlmICh0eXBlID09PSAnbnVtYmVyJylcbiAgICBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdClcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpXG4gICAgbGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoc3ViamVjdCwgZW5jb2RpbmcpXG4gIGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKVxuICAgIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0Lmxlbmd0aCkgLy8gYXNzdW1lIHRoYXQgb2JqZWN0IGlzIGFycmF5LWxpa2VcbiAgZWxzZVxuICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgbmVlZHMgdG8gYmUgYSBudW1iZXIsIGFycmF5IG9yIHN0cmluZy4nKVxuXG4gIHZhciBidWZcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAvLyBQcmVmZXJyZWQ6IFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgYnVmID0gQnVmZmVyLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KGxlbmd0aCkpXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBUSElTIGluc3RhbmNlIG9mIEJ1ZmZlciAoY3JlYXRlZCBieSBgbmV3YClcbiAgICBidWYgPSB0aGlzXG4gICAgYnVmLmxlbmd0aCA9IGxlbmd0aFxuICAgIGJ1Zi5faXNCdWZmZXIgPSB0cnVlXG4gIH1cblxuICB2YXIgaVxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiB0eXBlb2Ygc3ViamVjdC5ieXRlTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgIC8vIFNwZWVkIG9wdGltaXphdGlvbiAtLSB1c2Ugc2V0IGlmIHdlJ3JlIGNvcHlpbmcgZnJvbSBhIHR5cGVkIGFycmF5XG4gICAgYnVmLl9zZXQoc3ViamVjdClcbiAgfSBlbHNlIGlmIChpc0FycmF5aXNoKHN1YmplY3QpKSB7XG4gICAgLy8gVHJlYXQgYXJyYXktaXNoIG9iamVjdHMgYXMgYSBieXRlIGFycmF5XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpKVxuICAgICAgICBidWZbaV0gPSBzdWJqZWN0LnJlYWRVSW50OChpKVxuICAgICAgZWxzZVxuICAgICAgICBidWZbaV0gPSBzdWJqZWN0W2ldXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgYnVmLndyaXRlKHN1YmplY3QsIDAsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmICFub1plcm8pIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ1ZltpXSA9IDBcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmXG59XG5cbi8vIFNUQVRJQyBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAncmF3JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gKGIpIHtcbiAgcmV0dXJuICEhKGIgIT09IG51bGwgJiYgYiAhPT0gdW5kZWZpbmVkICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGZ1bmN0aW9uIChzdHIsIGVuY29kaW5nKSB7XG4gIHZhciByZXRcbiAgc3RyID0gc3RyICsgJydcbiAgc3dpdGNoIChlbmNvZGluZyB8fCAndXRmOCcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAvIDJcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gdXRmOFRvQnl0ZXMoc3RyKS5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAncmF3JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IGJhc2U2NFRvQnl0ZXMoc3RyKS5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggKiAyXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIChsaXN0LCB0b3RhbExlbmd0aCkge1xuICBhc3NlcnQoaXNBcnJheShsaXN0KSwgJ1VzYWdlOiBCdWZmZXIuY29uY2F0KGxpc3QsIFt0b3RhbExlbmd0aF0pXFxuJyArXG4gICAgICAnbGlzdCBzaG91bGQgYmUgYW4gQXJyYXkuJylcblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcigwKVxuICB9IGVsc2UgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGxpc3RbMF1cbiAgfVxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdG90YWxMZW5ndGggIT09ICdudW1iZXInKSB7XG4gICAgdG90YWxMZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvdGFsTGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIodG90YWxMZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgaXRlbS5jb3B5KGJ1ZiwgcG9zKVxuICAgIHBvcyArPSBpdGVtLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZcbn1cblxuLy8gQlVGRkVSIElOU1RBTkNFIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIF9oZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGFzc2VydChzdHJMZW4gJSAyID09PSAwLCAnSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGJ5dGUgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgYXNzZXJ0KCFpc05hTihieXRlKSwgJ0ludmFsaWQgaGV4IHN0cmluZycpXG4gICAgYnVmW29mZnNldCArIGldID0gYnl0ZVxuICB9XG4gIEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gaSAqIDJcbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gX3V0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF9hc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBfYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIF9iYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gU3VwcG9ydCBib3RoIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZylcbiAgLy8gYW5kIHRoZSBsZWdhY3kgKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIGlmICghaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHsgIC8vIGxlZ2FjeVxuICAgIHZhciBzd2FwID0gZW5jb2RpbmdcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIG9mZnNldCA9IGxlbmd0aFxuICAgIGxlbmd0aCA9IHN3YXBcbiAgfVxuXG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpXG5cbiAgdmFyIHJldFxuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG5cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpXG4gIHN0YXJ0ID0gTnVtYmVyKHN0YXJ0KSB8fCAwXG4gIGVuZCA9IChlbmQgIT09IHVuZGVmaW5lZClcbiAgICA/IE51bWJlcihlbmQpXG4gICAgOiBlbmQgPSBzZWxmLmxlbmd0aFxuXG4gIC8vIEZhc3RwYXRoIGVtcHR5IHN0cmluZ3NcbiAgaWYgKGVuZCA9PT0gc3RhcnQpXG4gICAgcmV0dXJuICcnXG5cbiAgdmFyIHJldFxuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldF9zdGFydCwgc3RhcnQsIGVuZCkge1xuICB2YXIgc291cmNlID0gdGhpc1xuXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICghdGFyZ2V0X3N0YXJ0KSB0YXJnZXRfc3RhcnQgPSAwXG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgc291cmNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnc291cmNlRW5kIDwgc291cmNlU3RhcnQnKVxuICBhc3NlcnQodGFyZ2V0X3N0YXJ0ID49IDAgJiYgdGFyZ2V0X3N0YXJ0IDwgdGFyZ2V0Lmxlbmd0aCxcbiAgICAgICd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCBzb3VyY2UubGVuZ3RoLCAnc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gc291cmNlLmxlbmd0aCwgJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpXG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgPCBlbmQgLSBzdGFydClcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0ICsgc3RhcnRcblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAobGVuIDwgMTAwIHx8ICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0X3N0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICB9IGVsc2Uge1xuICAgIHRhcmdldC5fc2V0KHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSwgdGFyZ2V0X3N0YXJ0KVxuICB9XG59XG5cbmZ1bmN0aW9uIF9iYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gX3V0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXMgPSAnJ1xuICB2YXIgdG1wID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgaWYgKGJ1ZltpXSA8PSAweDdGKSB7XG4gICAgICByZXMgKz0gZGVjb2RlVXRmOENoYXIodG1wKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICAgICAgdG1wID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgdG1wICs9ICclJyArIGJ1ZltpXS50b1N0cmluZygxNilcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzICsgZGVjb2RlVXRmOENoYXIodG1wKVxufVxuXG5mdW5jdGlvbiBfYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspXG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiBfYXNjaWlTbGljZShidWYsIHN0YXJ0LCBlbmQpXG59XG5cbmZ1bmN0aW9uIF9oZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2krMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gY2xhbXAoc3RhcnQsIGxlbiwgMClcbiAgZW5kID0gY2xhbXAoZW5kLCBsZW4sIGxlbilcblxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIHJldHVybiBCdWZmZXIuX2F1Z21lbnQodGhpcy5zdWJhcnJheShzdGFydCwgZW5kKSlcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIHZhciBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQsIHRydWUpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgaSsrKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gICAgcmV0dXJuIG5ld0J1ZlxuICB9XG59XG5cbi8vIGBnZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5nZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLnJlYWRVSW50OChvZmZzZXQpXG59XG5cbi8vIGBzZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2LCBvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLndyaXRlVUludDgodiwgb2Zmc2V0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5mdW5jdGlvbiBfcmVhZFVJbnQxNiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWxcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdXG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDhcbiAgfSBlbHNlIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XSA8PCA4XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRVSW50MzIgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsXG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbilcbiAgICAgIHZhbCA9IGJ1ZltvZmZzZXQgKyAyXSA8PCAxNlxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4XG4gICAgdmFsIHw9IGJ1ZltvZmZzZXRdXG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pXG4gICAgICB2YWwgPSB2YWwgKyAoYnVmW29mZnNldCArIDNdIDw8IDI0ID4+PiAwKVxuICB9IGVsc2Uge1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsID0gYnVmW29mZnNldCArIDFdIDw8IDE2XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDJdIDw8IDhcbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgM11cbiAgICB2YWwgPSB2YWwgKyAoYnVmW29mZnNldF0gPDwgMjQgPj4+IDApXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLFxuICAgICAgICAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgdmFyIG5lZyA9IHRoaXNbb2Zmc2V0XSAmIDB4ODBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbmZ1bmN0aW9uIF9yZWFkSW50MTYgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsID0gX3JlYWRVSW50MTYoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSlcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZmZmIC0gdmFsICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZEludDMyIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpXG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDAwMDAwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmZmZmZmZmIC0gdmFsICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZEZsb2F0IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkRG91YmxlIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZilcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVyblxuXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlXG59XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmYpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgMik7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPVxuICAgICAgICAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmZmZmZmKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDQpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID1cbiAgICAgICAgKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmLCAtMHg4MClcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgdGhpcy53cml0ZVVJbnQ4KHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgdGhpcy53cml0ZVVJbnQ4KDB4ZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZiwgLTB4ODAwMClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIF93cml0ZVVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICBfd3JpdGVVSW50MTYoYnVmLCAweGZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICBfd3JpdGVVSW50MzIoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgX3dyaXRlVUludDMyKGJ1ZiwgMHhmZmZmZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsXG4gICAgICAgICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gZmlsbCh2YWx1ZSwgc3RhcnQ9MCwgZW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAodmFsdWUsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCF2YWx1ZSkgdmFsdWUgPSAwXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCkgZW5kID0gdGhpcy5sZW5ndGhcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gdmFsdWUuY2hhckNvZGVBdCgwKVxuICB9XG5cbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbHVlKSwgJ3ZhbHVlIGlzIG5vdCBhIG51bWJlcicpXG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdlbmQgPCBzdGFydCcpXG5cbiAgLy8gRmlsbCAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHRoaXMubGVuZ3RoLCAnc3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gdGhpcy5sZW5ndGgsICdlbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICB0aGlzW2ldID0gdmFsdWVcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvdXQgPSBbXVxuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIG91dFtpXSA9IHRvSGV4KHRoaXNbaV0pXG4gICAgaWYgKGkgPT09IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMpIHtcbiAgICAgIG91dFtpICsgMV0gPSAnLi4uJ1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBvdXQuam9pbignICcpICsgJz4nXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBgQXJyYXlCdWZmZXJgIHdpdGggdGhlICpjb3BpZWQqIG1lbW9yeSBvZiB0aGUgYnVmZmVyIGluc3RhbmNlLlxuICogQWRkZWQgaW4gTm9kZSAwLjEyLiBPbmx5IGF2YWlsYWJsZSBpbiBicm93c2VycyB0aGF0IHN1cHBvcnQgQXJyYXlCdWZmZXIuXG4gKi9cbkJ1ZmZlci5wcm90b3R5cGUudG9BcnJheUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgICByZXR1cm4gKG5ldyBCdWZmZXIodGhpcykpLmJ1ZmZlclxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5sZW5ndGgpXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYnVmLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKVxuICAgICAgICBidWZbaV0gPSB0aGlzW2ldXG4gICAgICByZXR1cm4gYnVmLmJ1ZmZlclxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0J1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJylcbiAgfVxufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbnZhciBCUCA9IEJ1ZmZlci5wcm90b3R5cGVcblxuLyoqXG4gKiBBdWdtZW50IGEgVWludDhBcnJheSAqaW5zdGFuY2UqIChub3QgdGhlIFVpbnQ4QXJyYXkgY2xhc3MhKSB3aXRoIEJ1ZmZlciBtZXRob2RzXG4gKi9cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9pc0J1ZmZlciA9IHRydWVcblxuICAvLyBzYXZlIHJlZmVyZW5jZSB0byBvcmlnaW5hbCBVaW50OEFycmF5IGdldC9zZXQgbWV0aG9kcyBiZWZvcmUgb3ZlcndyaXRpbmdcbiAgYXJyLl9nZXQgPSBhcnIuZ2V0XG4gIGFyci5fc2V0ID0gYXJyLnNldFxuXG4gIC8vIGRlcHJlY2F0ZWQsIHdpbGwgYmUgcmVtb3ZlZCBpbiBub2RlIDAuMTMrXG4gIGFyci5nZXQgPSBCUC5nZXRcbiAgYXJyLnNldCA9IEJQLnNldFxuXG4gIGFyci53cml0ZSA9IEJQLndyaXRlXG4gIGFyci50b1N0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0xvY2FsZVN0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0pTT04gPSBCUC50b0pTT05cbiAgYXJyLmNvcHkgPSBCUC5jb3B5XG4gIGFyci5zbGljZSA9IEJQLnNsaWNlXG4gIGFyci5yZWFkVUludDggPSBCUC5yZWFkVUludDhcbiAgYXJyLnJlYWRVSW50MTZMRSA9IEJQLnJlYWRVSW50MTZMRVxuICBhcnIucmVhZFVJbnQxNkJFID0gQlAucmVhZFVJbnQxNkJFXG4gIGFyci5yZWFkVUludDMyTEUgPSBCUC5yZWFkVUludDMyTEVcbiAgYXJyLnJlYWRVSW50MzJCRSA9IEJQLnJlYWRVSW50MzJCRVxuICBhcnIucmVhZEludDggPSBCUC5yZWFkSW50OFxuICBhcnIucmVhZEludDE2TEUgPSBCUC5yZWFkSW50MTZMRVxuICBhcnIucmVhZEludDE2QkUgPSBCUC5yZWFkSW50MTZCRVxuICBhcnIucmVhZEludDMyTEUgPSBCUC5yZWFkSW50MzJMRVxuICBhcnIucmVhZEludDMyQkUgPSBCUC5yZWFkSW50MzJCRVxuICBhcnIucmVhZEZsb2F0TEUgPSBCUC5yZWFkRmxvYXRMRVxuICBhcnIucmVhZEZsb2F0QkUgPSBCUC5yZWFkRmxvYXRCRVxuICBhcnIucmVhZERvdWJsZUxFID0gQlAucmVhZERvdWJsZUxFXG4gIGFyci5yZWFkRG91YmxlQkUgPSBCUC5yZWFkRG91YmxlQkVcbiAgYXJyLndyaXRlVUludDggPSBCUC53cml0ZVVJbnQ4XG4gIGFyci53cml0ZVVJbnQxNkxFID0gQlAud3JpdGVVSW50MTZMRVxuICBhcnIud3JpdGVVSW50MTZCRSA9IEJQLndyaXRlVUludDE2QkVcbiAgYXJyLndyaXRlVUludDMyTEUgPSBCUC53cml0ZVVJbnQzMkxFXG4gIGFyci53cml0ZVVJbnQzMkJFID0gQlAud3JpdGVVSW50MzJCRVxuICBhcnIud3JpdGVJbnQ4ID0gQlAud3JpdGVJbnQ4XG4gIGFyci53cml0ZUludDE2TEUgPSBCUC53cml0ZUludDE2TEVcbiAgYXJyLndyaXRlSW50MTZCRSA9IEJQLndyaXRlSW50MTZCRVxuICBhcnIud3JpdGVJbnQzMkxFID0gQlAud3JpdGVJbnQzMkxFXG4gIGFyci53cml0ZUludDMyQkUgPSBCUC53cml0ZUludDMyQkVcbiAgYXJyLndyaXRlRmxvYXRMRSA9IEJQLndyaXRlRmxvYXRMRVxuICBhcnIud3JpdGVGbG9hdEJFID0gQlAud3JpdGVGbG9hdEJFXG4gIGFyci53cml0ZURvdWJsZUxFID0gQlAud3JpdGVEb3VibGVMRVxuICBhcnIud3JpdGVEb3VibGVCRSA9IEJQLndyaXRlRG91YmxlQkVcbiAgYXJyLmZpbGwgPSBCUC5maWxsXG4gIGFyci5pbnNwZWN0ID0gQlAuaW5zcGVjdFxuICBhcnIudG9BcnJheUJ1ZmZlciA9IEJQLnRvQXJyYXlCdWZmZXJcblxuICByZXR1cm4gYXJyXG59XG5cbi8vIHNsaWNlKHN0YXJ0LCBlbmQpXG5mdW5jdGlvbiBjbGFtcCAoaW5kZXgsIGxlbiwgZGVmYXVsdFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSByZXR1cm4gZGVmYXVsdFZhbHVlXG4gIGluZGV4ID0gfn5pbmRleDsgIC8vIENvZXJjZSB0byBpbnRlZ2VyLlxuICBpZiAoaW5kZXggPj0gbGVuKSByZXR1cm4gbGVuXG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXhcbiAgaW5kZXggKz0gbGVuXG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXhcbiAgcmV0dXJuIDBcbn1cblxuZnVuY3Rpb24gY29lcmNlIChsZW5ndGgpIHtcbiAgLy8gQ29lcmNlIGxlbmd0aCB0byBhIG51bWJlciAocG9zc2libHkgTmFOKSwgcm91bmQgdXBcbiAgLy8gaW4gY2FzZSBpdCdzIGZyYWN0aW9uYWwgKGUuZy4gMTIzLjQ1NikgdGhlbiBkbyBhXG4gIC8vIGRvdWJsZSBuZWdhdGUgdG8gY29lcmNlIGEgTmFOIHRvIDAuIEVhc3ksIHJpZ2h0P1xuICBsZW5ndGggPSB+fk1hdGguY2VpbCgrbGVuZ3RoKVxuICByZXR1cm4gbGVuZ3RoIDwgMCA/IDAgOiBsZW5ndGhcbn1cblxuZnVuY3Rpb24gaXNBcnJheSAoc3ViamVjdCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHN1YmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN1YmplY3QpID09PSAnW29iamVjdCBBcnJheV0nXG4gIH0pKHN1YmplY3QpXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXlpc2ggKHN1YmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXkoc3ViamVjdCkgfHwgQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpIHx8XG4gICAgICBzdWJqZWN0ICYmIHR5cGVvZiBzdWJqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgdHlwZW9mIHN1YmplY3QubGVuZ3RoID09PSAnbnVtYmVyJ1xufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGIgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGlmIChiIDw9IDB4N0YpXG4gICAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSlcbiAgICBlbHNlIHtcbiAgICAgIHZhciBzdGFydCA9IGlcbiAgICAgIGlmIChiID49IDB4RDgwMCAmJiBiIDw9IDB4REZGRikgaSsrXG4gICAgICB2YXIgaCA9IGVuY29kZVVSSUNvbXBvbmVudChzdHIuc2xpY2Uoc3RhcnQsIGkrMSkpLnN1YnN0cigxKS5zcGxpdCgnJScpXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGgubGVuZ3RoOyBqKyspXG4gICAgICAgIGJ5dGVBcnJheS5wdXNoKHBhcnNlSW50KGhbal0sIDE2KSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoc3RyKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIHBvc1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKVxuICAgICAgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBkZWNvZGVVdGY4Q2hhciAoc3RyKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkZGRCkgLy8gVVRGIDggaW52YWxpZCBjaGFyXG4gIH1cbn1cblxuLypcbiAqIFdlIGhhdmUgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHZhbHVlIGlzIGEgdmFsaWQgaW50ZWdlci4gVGhpcyBtZWFucyB0aGF0IGl0XG4gKiBpcyBub24tbmVnYXRpdmUuIEl0IGhhcyBubyBmcmFjdGlvbmFsIGNvbXBvbmVudCBhbmQgdGhhdCBpdCBkb2VzIG5vdFxuICogZXhjZWVkIHRoZSBtYXhpbXVtIGFsbG93ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHZlcmlmdWludCAodmFsdWUsIG1heCkge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPj0gMCwgJ3NwZWNpZmllZCBhIG5lZ2F0aXZlIHZhbHVlIGZvciB3cml0aW5nIGFuIHVuc2lnbmVkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGlzIGxhcmdlciB0aGFuIG1heGltdW0gdmFsdWUgZm9yIHR5cGUnKVxuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKVxufVxuXG5mdW5jdGlvbiB2ZXJpZnNpbnQgKHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKVxufVxuXG5mdW5jdGlvbiB2ZXJpZklFRUU3NTQgKHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKVxufVxuXG5mdW5jdGlvbiBhc3NlcnQgKHRlc3QsIG1lc3NhZ2UpIHtcbiAgaWYgKCF0ZXN0KSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCAnRmFpbGVkIGFzc2VydGlvbicpXG59XG4iLCJ2YXIgbG9va3VwID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXG47KGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuICB2YXIgQXJyID0gKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJylcbiAgICA/IFVpbnQ4QXJyYXlcbiAgICA6IEFycmF5XG5cblx0dmFyIFpFUk8gICA9ICcwJy5jaGFyQ29kZUF0KDApXG5cdHZhciBQTFVTICAgPSAnKycuY2hhckNvZGVBdCgwKVxuXHR2YXIgU0xBU0ggID0gJy8nLmNoYXJDb2RlQXQoMClcblx0dmFyIE5VTUJFUiA9ICcwJy5jaGFyQ29kZUF0KDApXG5cdHZhciBMT1dFUiAgPSAnYScuY2hhckNvZGVBdCgwKVxuXHR2YXIgVVBQRVIgID0gJ0EnLmNoYXJDb2RlQXQoMClcblxuXHRmdW5jdGlvbiBkZWNvZGUgKGVsdCkge1xuXHRcdHZhciBjb2RlID0gZWx0LmNoYXJDb2RlQXQoMClcblx0XHRpZiAoY29kZSA9PT0gUExVUylcblx0XHRcdHJldHVybiA2MiAvLyAnKydcblx0XHRpZiAoY29kZSA9PT0gU0xBU0gpXG5cdFx0XHRyZXR1cm4gNjMgLy8gJy8nXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIpXG5cdFx0XHRyZXR1cm4gLTEgLy9ubyBtYXRjaFxuXHRcdGlmIChjb2RlIDwgTlVNQkVSICsgMTApXG5cdFx0XHRyZXR1cm4gY29kZSAtIE5VTUJFUiArIDI2ICsgMjZcblx0XHRpZiAoY29kZSA8IFVQUEVSICsgMjYpXG5cdFx0XHRyZXR1cm4gY29kZSAtIFVQUEVSXG5cdFx0aWYgKGNvZGUgPCBMT1dFUiArIDI2KVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBMT1dFUiArIDI2XG5cdH1cblxuXHRmdW5jdGlvbiBiNjRUb0J5dGVBcnJheSAoYjY0KSB7XG5cdFx0dmFyIGksIGosIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcblxuXHRcdGlmIChiNjQubGVuZ3RoICUgNCA+IDApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG5cdFx0fVxuXG5cdFx0Ly8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcblx0XHQvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG5cdFx0Ly8gcmVwcmVzZW50IG9uZSBieXRlXG5cdFx0Ly8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG5cdFx0Ly8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuXHRcdHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cdFx0cGxhY2VIb2xkZXJzID0gJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDIpID8gMiA6ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAxKSA/IDEgOiAwXG5cblx0XHQvLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcblx0XHRhcnIgPSBuZXcgQXJyKGI2NC5sZW5ndGggKiAzIC8gNCAtIHBsYWNlSG9sZGVycylcblxuXHRcdC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcblx0XHRsID0gcGxhY2VIb2xkZXJzID4gMCA/IGI2NC5sZW5ndGggLSA0IDogYjY0Lmxlbmd0aFxuXG5cdFx0dmFyIEwgPSAwXG5cblx0XHRmdW5jdGlvbiBwdXNoICh2KSB7XG5cdFx0XHRhcnJbTCsrXSA9IHZcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwLCBqID0gMDsgaSA8IGw7IGkgKz0gNCwgaiArPSAzKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDE4KSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDEyKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpIDw8IDYpIHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDMpKVxuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwMDApID4+IDE2KVxuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwKSA+PiA4KVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH1cblxuXHRcdGlmIChwbGFjZUhvbGRlcnMgPT09IDIpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMikgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA+PiA0KVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDEwKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDQpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPj4gMilcblx0XHRcdHB1c2goKHRtcCA+PiA4KSAmIDB4RkYpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFyclxuXHR9XG5cblx0ZnVuY3Rpb24gdWludDhUb0Jhc2U2NCAodWludDgpIHtcblx0XHR2YXIgaSxcblx0XHRcdGV4dHJhQnl0ZXMgPSB1aW50OC5sZW5ndGggJSAzLCAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuXHRcdFx0b3V0cHV0ID0gXCJcIixcblx0XHRcdHRlbXAsIGxlbmd0aFxuXG5cdFx0ZnVuY3Rpb24gZW5jb2RlIChudW0pIHtcblx0XHRcdHJldHVybiBsb29rdXAuY2hhckF0KG51bSlcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuXHRcdFx0cmV0dXJuIGVuY29kZShudW0gPj4gMTggJiAweDNGKSArIGVuY29kZShudW0gPj4gMTIgJiAweDNGKSArIGVuY29kZShudW0gPj4gNiAmIDB4M0YpICsgZW5jb2RlKG51bSAmIDB4M0YpXG5cdFx0fVxuXG5cdFx0Ly8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuXHRcdGZvciAoaSA9IDAsIGxlbmd0aCA9IHVpbnQ4Lmxlbmd0aCAtIGV4dHJhQnl0ZXM7IGkgPCBsZW5ndGg7IGkgKz0gMykge1xuXHRcdFx0dGVtcCA9ICh1aW50OFtpXSA8PCAxNikgKyAodWludDhbaSArIDFdIDw8IDgpICsgKHVpbnQ4W2kgKyAyXSlcblx0XHRcdG91dHB1dCArPSB0cmlwbGV0VG9CYXNlNjQodGVtcClcblx0XHR9XG5cblx0XHQvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG5cdFx0c3dpdGNoIChleHRyYUJ5dGVzKSB7XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHRlbXAgPSB1aW50OFt1aW50OC5sZW5ndGggLSAxXVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMilcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA8PCA0KSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSAnPT0nXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHRlbXAgPSAodWludDhbdWludDgubGVuZ3RoIC0gMl0gPDwgOCkgKyAodWludDhbdWludDgubGVuZ3RoIC0gMV0pXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAxMClcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA+PiA0KSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPDwgMikgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gJz0nXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dFxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMudG9CeXRlQXJyYXkgPSBiNjRUb0J5dGVBcnJheVxuXHRtb2R1bGUuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gdWludDhUb0Jhc2U2NFxufSgpKVxuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24oYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSxcbiAgICAgIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDEsXG4gICAgICBlTWF4ID0gKDEgPDwgZUxlbikgLSAxLFxuICAgICAgZUJpYXMgPSBlTWF4ID4+IDEsXG4gICAgICBuQml0cyA9IC03LFxuICAgICAgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwLFxuICAgICAgZCA9IGlzTEUgPyAtMSA6IDEsXG4gICAgICBzID0gYnVmZmVyW29mZnNldCArIGldO1xuXG4gIGkgKz0gZDtcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKTtcbiAgcyA+Pj0gKC1uQml0cyk7XG4gIG5CaXRzICs9IGVMZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpO1xuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpO1xuICBlID4+PSAoLW5CaXRzKTtcbiAgbkJpdHMgKz0gbUxlbjtcbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCk7XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzO1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSk7XG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICBlID0gZSAtIGVCaWFzO1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pO1xufTtcblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjLFxuICAgICAgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMSxcbiAgICAgIGVNYXggPSAoMSA8PCBlTGVuKSAtIDEsXG4gICAgICBlQmlhcyA9IGVNYXggPj4gMSxcbiAgICAgIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKSxcbiAgICAgIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKSxcbiAgICAgIGQgPSBpc0xFID8gMSA6IC0xLFxuICAgICAgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMDtcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKTtcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMDtcbiAgICBlID0gZU1heDtcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMik7XG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tO1xuICAgICAgYyAqPSAyO1xuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gYztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrKztcbiAgICAgIGMgLz0gMjtcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwO1xuICAgICAgZSA9IGVNYXg7XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xuICAgICAgZSA9IGUgKyBlQmlhcztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xuICAgICAgZSA9IDA7XG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCk7XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbTtcbiAgZUxlbiArPSBtTGVuO1xuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpO1xuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyODtcbn07XG4iLCJ2YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyO1xudmFyIGludFNpemUgPSA0O1xudmFyIHplcm9CdWZmZXIgPSBuZXcgQnVmZmVyKGludFNpemUpOyB6ZXJvQnVmZmVyLmZpbGwoMCk7XG52YXIgY2hyc3ogPSA4O1xuXG5mdW5jdGlvbiB0b0FycmF5KGJ1ZiwgYmlnRW5kaWFuKSB7XG4gIGlmICgoYnVmLmxlbmd0aCAlIGludFNpemUpICE9PSAwKSB7XG4gICAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGggKyAoaW50U2l6ZSAtIChidWYubGVuZ3RoICUgaW50U2l6ZSkpO1xuICAgIGJ1ZiA9IEJ1ZmZlci5jb25jYXQoW2J1ZiwgemVyb0J1ZmZlcl0sIGxlbik7XG4gIH1cblxuICB2YXIgYXJyID0gW107XG4gIHZhciBmbiA9IGJpZ0VuZGlhbiA/IGJ1Zi5yZWFkSW50MzJCRSA6IGJ1Zi5yZWFkSW50MzJMRTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWYubGVuZ3RoOyBpICs9IGludFNpemUpIHtcbiAgICBhcnIucHVzaChmbi5jYWxsKGJ1ZiwgaSkpO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIHRvQnVmZmVyKGFyciwgc2l6ZSwgYmlnRW5kaWFuKSB7XG4gIHZhciBidWYgPSBuZXcgQnVmZmVyKHNpemUpO1xuICB2YXIgZm4gPSBiaWdFbmRpYW4gPyBidWYud3JpdGVJbnQzMkJFIDogYnVmLndyaXRlSW50MzJMRTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBmbi5jYWxsKGJ1ZiwgYXJyW2ldLCBpICogNCwgdHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIGJ1Zjtcbn1cblxuZnVuY3Rpb24gaGFzaChidWYsIGZuLCBoYXNoU2l6ZSwgYmlnRW5kaWFuKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIGJ1ZiA9IG5ldyBCdWZmZXIoYnVmKTtcbiAgdmFyIGFyciA9IGZuKHRvQXJyYXkoYnVmLCBiaWdFbmRpYW4pLCBidWYubGVuZ3RoICogY2hyc3opO1xuICByZXR1cm4gdG9CdWZmZXIoYXJyLCBoYXNoU2l6ZSwgYmlnRW5kaWFuKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGhhc2g6IGhhc2ggfTtcbiIsInZhciBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXJcbnZhciBzaGEgPSByZXF1aXJlKCcuL3NoYScpXG52YXIgc2hhMjU2ID0gcmVxdWlyZSgnLi9zaGEyNTYnKVxudmFyIHJuZyA9IHJlcXVpcmUoJy4vcm5nJylcbnZhciBtZDUgPSByZXF1aXJlKCcuL21kNScpXG5cbnZhciBhbGdvcml0aG1zID0ge1xuICBzaGExOiBzaGEsXG4gIHNoYTI1Njogc2hhMjU2LFxuICBtZDU6IG1kNVxufVxuXG52YXIgYmxvY2tzaXplID0gNjRcbnZhciB6ZXJvQnVmZmVyID0gbmV3IEJ1ZmZlcihibG9ja3NpemUpOyB6ZXJvQnVmZmVyLmZpbGwoMClcbmZ1bmN0aW9uIGhtYWMoZm4sIGtleSwgZGF0YSkge1xuICBpZighQnVmZmVyLmlzQnVmZmVyKGtleSkpIGtleSA9IG5ldyBCdWZmZXIoa2V5KVxuICBpZighQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSBkYXRhID0gbmV3IEJ1ZmZlcihkYXRhKVxuXG4gIGlmKGtleS5sZW5ndGggPiBibG9ja3NpemUpIHtcbiAgICBrZXkgPSBmbihrZXkpXG4gIH0gZWxzZSBpZihrZXkubGVuZ3RoIDwgYmxvY2tzaXplKSB7XG4gICAga2V5ID0gQnVmZmVyLmNvbmNhdChba2V5LCB6ZXJvQnVmZmVyXSwgYmxvY2tzaXplKVxuICB9XG5cbiAgdmFyIGlwYWQgPSBuZXcgQnVmZmVyKGJsb2Nrc2l6ZSksIG9wYWQgPSBuZXcgQnVmZmVyKGJsb2Nrc2l6ZSlcbiAgZm9yKHZhciBpID0gMDsgaSA8IGJsb2Nrc2l6ZTsgaSsrKSB7XG4gICAgaXBhZFtpXSA9IGtleVtpXSBeIDB4MzZcbiAgICBvcGFkW2ldID0ga2V5W2ldIF4gMHg1Q1xuICB9XG5cbiAgdmFyIGhhc2ggPSBmbihCdWZmZXIuY29uY2F0KFtpcGFkLCBkYXRhXSkpXG4gIHJldHVybiBmbihCdWZmZXIuY29uY2F0KFtvcGFkLCBoYXNoXSkpXG59XG5cbmZ1bmN0aW9uIGhhc2goYWxnLCBrZXkpIHtcbiAgYWxnID0gYWxnIHx8ICdzaGExJ1xuICB2YXIgZm4gPSBhbGdvcml0aG1zW2FsZ11cbiAgdmFyIGJ1ZnMgPSBbXVxuICB2YXIgbGVuZ3RoID0gMFxuICBpZighZm4pIGVycm9yKCdhbGdvcml0aG06JywgYWxnLCAnaXMgbm90IHlldCBzdXBwb3J0ZWQnKVxuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIGlmKCFCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIGRhdGEgPSBuZXcgQnVmZmVyKGRhdGEpXG4gICAgICAgIFxuICAgICAgYnVmcy5wdXNoKGRhdGEpXG4gICAgICBsZW5ndGggKz0gZGF0YS5sZW5ndGhcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICBkaWdlc3Q6IGZ1bmN0aW9uIChlbmMpIHtcbiAgICAgIHZhciBidWYgPSBCdWZmZXIuY29uY2F0KGJ1ZnMpXG4gICAgICB2YXIgciA9IGtleSA/IGhtYWMoZm4sIGtleSwgYnVmKSA6IGZuKGJ1ZilcbiAgICAgIGJ1ZnMgPSBudWxsXG4gICAgICByZXR1cm4gZW5jID8gci50b1N0cmluZyhlbmMpIDogclxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBlcnJvciAoKSB7XG4gIHZhciBtID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpLmpvaW4oJyAnKVxuICB0aHJvdyBuZXcgRXJyb3IoW1xuICAgIG0sXG4gICAgJ3dlIGFjY2VwdCBwdWxsIHJlcXVlc3RzJyxcbiAgICAnaHR0cDovL2dpdGh1Yi5jb20vZG9taW5pY3RhcnIvY3J5cHRvLWJyb3dzZXJpZnknXG4gICAgXS5qb2luKCdcXG4nKSlcbn1cblxuZXhwb3J0cy5jcmVhdGVIYXNoID0gZnVuY3Rpb24gKGFsZykgeyByZXR1cm4gaGFzaChhbGcpIH1cbmV4cG9ydHMuY3JlYXRlSG1hYyA9IGZ1bmN0aW9uIChhbGcsIGtleSkgeyByZXR1cm4gaGFzaChhbGcsIGtleSkgfVxuZXhwb3J0cy5yYW5kb21CeXRlcyA9IGZ1bmN0aW9uKHNpemUsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgdW5kZWZpbmVkLCBuZXcgQnVmZmVyKHJuZyhzaXplKSkpXG4gICAgfSBjYXRjaCAoZXJyKSB7IGNhbGxiYWNrKGVycikgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKHJuZyhzaXplKSlcbiAgfVxufVxuXG5mdW5jdGlvbiBlYWNoKGEsIGYpIHtcbiAgZm9yKHZhciBpIGluIGEpXG4gICAgZihhW2ldLCBpKVxufVxuXG4vLyB0aGUgbGVhc3QgSSBjYW4gZG8gaXMgbWFrZSBlcnJvciBtZXNzYWdlcyBmb3IgdGhlIHJlc3Qgb2YgdGhlIG5vZGUuanMvY3J5cHRvIGFwaS5cbmVhY2goWydjcmVhdGVDcmVkZW50aWFscydcbiwgJ2NyZWF0ZUNpcGhlcidcbiwgJ2NyZWF0ZUNpcGhlcml2J1xuLCAnY3JlYXRlRGVjaXBoZXInXG4sICdjcmVhdGVEZWNpcGhlcml2J1xuLCAnY3JlYXRlU2lnbidcbiwgJ2NyZWF0ZVZlcmlmeSdcbiwgJ2NyZWF0ZURpZmZpZUhlbGxtYW4nXG4sICdwYmtkZjInXSwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgZXhwb3J0c1tuYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICBlcnJvcignc29ycnksJywgbmFtZSwgJ2lzIG5vdCBpbXBsZW1lbnRlZCB5ZXQnKVxuICB9XG59KVxuIiwiLypcclxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxyXG4gKiBEaWdlc3QgQWxnb3JpdGhtLCBhcyBkZWZpbmVkIGluIFJGQyAxMzIxLlxyXG4gKiBWZXJzaW9uIDIuMSBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDIuXHJcbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcclxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXHJcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBtb3JlIGluZm8uXHJcbiAqL1xyXG5cclxudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcclxuXHJcbi8qXHJcbiAqIFBlcmZvcm0gYSBzaW1wbGUgc2VsZi10ZXN0IHRvIHNlZSBpZiB0aGUgVk0gaXMgd29ya2luZ1xyXG4gKi9cclxuZnVuY3Rpb24gbWQ1X3ZtX3Rlc3QoKVxyXG57XHJcbiAgcmV0dXJuIGhleF9tZDUoXCJhYmNcIikgPT0gXCI5MDAxNTA5ODNjZDI0ZmIwZDY5NjNmN2QyOGUxN2Y3MlwiO1xyXG59XHJcblxyXG4vKlxyXG4gKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoXHJcbiAqL1xyXG5mdW5jdGlvbiBjb3JlX21kNSh4LCBsZW4pXHJcbntcclxuICAvKiBhcHBlbmQgcGFkZGluZyAqL1xyXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKChsZW4pICUgMzIpO1xyXG4gIHhbKCgobGVuICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IGxlbjtcclxuXHJcbiAgdmFyIGEgPSAgMTczMjU4NDE5MztcclxuICB2YXIgYiA9IC0yNzE3MzM4Nzk7XHJcbiAgdmFyIGMgPSAtMTczMjU4NDE5NDtcclxuICB2YXIgZCA9ICAyNzE3MzM4Nzg7XHJcblxyXG4gIGZvcih2YXIgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNilcclxuICB7XHJcbiAgICB2YXIgb2xkYSA9IGE7XHJcbiAgICB2YXIgb2xkYiA9IGI7XHJcbiAgICB2YXIgb2xkYyA9IGM7XHJcbiAgICB2YXIgb2xkZCA9IGQ7XHJcblxyXG4gICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2krIDBdLCA3ICwgLTY4MDg3NjkzNik7XHJcbiAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSsgMV0sIDEyLCAtMzg5NTY0NTg2KTtcclxuICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpKyAyXSwgMTcsICA2MDYxMDU4MTkpO1xyXG4gICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2krIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xyXG4gICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2krIDRdLCA3ICwgLTE3NjQxODg5Nyk7XHJcbiAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSsgNV0sIDEyLCAgMTIwMDA4MDQyNik7XHJcbiAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XHJcbiAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSsgN10sIDIyLCAtNDU3MDU5ODMpO1xyXG4gICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2krIDhdLCA3ICwgIDE3NzAwMzU0MTYpO1xyXG4gICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2krIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xyXG4gICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2krMTBdLCAxNywgLTQyMDYzKTtcclxuICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpKzExXSwgMjIsIC0xOTkwNDA0MTYyKTtcclxuICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpKzEyXSwgNyAsICAxODA0NjAzNjgyKTtcclxuICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpKzEzXSwgMTIsIC00MDM0MTEwMSk7XHJcbiAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSsxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XHJcbiAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSsxNV0sIDIyLCAgMTIzNjUzNTMyOSk7XHJcblxyXG4gICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2krIDFdLCA1ICwgLTE2NTc5NjUxMCk7XHJcbiAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSsgNl0sIDkgLCAtMTA2OTUwMTYzMik7XHJcbiAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSsxMV0sIDE0LCAgNjQzNzE3NzEzKTtcclxuICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpKyAwXSwgMjAsIC0zNzM4OTczMDIpO1xyXG4gICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2krIDVdLCA1ICwgLTcwMTU1ODY5MSk7XHJcbiAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSsxMF0sIDkgLCAgMzgwMTYwODMpO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XHJcbiAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcclxuICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpKyA5XSwgNSAsICA1Njg0NDY0MzgpO1xyXG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krMTRdLCA5ICwgLTEwMTk4MDM2OTApO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XHJcbiAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSsgOF0sIDIwLCAgMTE2MzUzMTUwMSk7XHJcbiAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSsxM10sIDUgLCAtMTQ0NDY4MTQ2Nyk7XHJcbiAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSsgMl0sIDkgLCAtNTE0MDM3ODQpO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krIDddLCAxNCwgIDE3MzUzMjg0NzMpO1xyXG4gICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2krMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xyXG5cclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKyA1XSwgNCAsIC0zNzg1NTgpO1xyXG4gICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2krIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xyXG4gICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2krMTFdLCAxNiwgIDE4MzkwMzA1NjIpO1xyXG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krMTRdLCAyMywgLTM1MzA5NTU2KTtcclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKyAxXSwgNCAsIC0xNTMwOTkyMDYwKTtcclxuICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpKyA0XSwgMTEsICAxMjcyODkzMzUzKTtcclxuICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xyXG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xyXG4gICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2krMTNdLCA0ICwgIDY4MTI3OTE3NCk7XHJcbiAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSsgMF0sIDExLCAtMzU4NTM3MjIyKTtcclxuICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xyXG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krIDZdLCAyMywgIDc2MDI5MTg5KTtcclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKyA5XSwgNCAsIC02NDAzNjQ0ODcpO1xyXG4gICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2krMTJdLCAxMSwgLTQyMTgxNTgzNSk7XHJcbiAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSsxNV0sIDE2LCAgNTMwNzQyNTIwKTtcclxuICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xyXG5cclxuICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpKyAwXSwgNiAsIC0xOTg2MzA4NDQpO1xyXG4gICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2krIDddLCAxMCwgIDExMjY4OTE0MTUpO1xyXG4gICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2krMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xyXG4gICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2krIDVdLCAyMSwgLTU3NDM0MDU1KTtcclxuICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpKzEyXSwgNiAsICAxNzAwNDg1NTcxKTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcclxuICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpKzEwXSwgMTUsIC0xMDUxNTIzKTtcclxuICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpKyAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcclxuICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpKyA4XSwgNiAsICAxODczMzEzMzU5KTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKzE1XSwgMTAsIC0zMDYxMTc0NCk7XHJcbiAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XHJcbiAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSsxM10sIDIxLCAgMTMwOTE1MTY0OSk7XHJcbiAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSsgNF0sIDYgLCAtMTQ1NTIzMDcwKTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKzExXSwgMTAsIC0xMTIwMjEwMzc5KTtcclxuICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpKyAyXSwgMTUsICA3MTg3ODcyNTkpO1xyXG4gICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2krIDldLCAyMSwgLTM0MzQ4NTU1MSk7XHJcblxyXG4gICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xyXG4gICAgYiA9IHNhZmVfYWRkKGIsIG9sZGIpO1xyXG4gICAgYyA9IHNhZmVfYWRkKGMsIG9sZGMpO1xyXG4gICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xyXG4gIH1cclxuICByZXR1cm4gQXJyYXkoYSwgYiwgYywgZCk7XHJcblxyXG59XHJcblxyXG4vKlxyXG4gKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxyXG4gKi9cclxuZnVuY3Rpb24gbWQ1X2NtbihxLCBhLCBiLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIHNhZmVfYWRkKGJpdF9yb2woc2FmZV9hZGQoc2FmZV9hZGQoYSwgcSksIHNhZmVfYWRkKHgsIHQpKSwgcyksYik7XHJcbn1cclxuZnVuY3Rpb24gbWQ1X2ZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpXHJcbntcclxuICByZXR1cm4gbWQ1X2NtbigoYiAmIGMpIHwgKCh+YikgJiBkKSwgYSwgYiwgeCwgcywgdCk7XHJcbn1cclxuZnVuY3Rpb24gbWQ1X2dnKGEsIGIsIGMsIGQsIHgsIHMsIHQpXHJcbntcclxuICByZXR1cm4gbWQ1X2NtbigoYiAmIGQpIHwgKGMgJiAofmQpKSwgYSwgYiwgeCwgcywgdCk7XHJcbn1cclxuZnVuY3Rpb24gbWQ1X2hoKGEsIGIsIGMsIGQsIHgsIHMsIHQpXHJcbntcclxuICByZXR1cm4gbWQ1X2NtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xyXG59XHJcbmZ1bmN0aW9uIG1kNV9paShhLCBiLCBjLCBkLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIG1kNV9jbW4oYyBeIChiIHwgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xyXG59XHJcblxyXG4vKlxyXG4gKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XHJcbiAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXHJcbiAqL1xyXG5mdW5jdGlvbiBzYWZlX2FkZCh4LCB5KVxyXG57XHJcbiAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKTtcclxuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XHJcbiAgcmV0dXJuIChtc3cgPDwgMTYpIHwgKGxzdyAmIDB4RkZGRik7XHJcbn1cclxuXHJcbi8qXHJcbiAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cclxuICovXHJcbmZ1bmN0aW9uIGJpdF9yb2wobnVtLCBjbnQpXHJcbntcclxuICByZXR1cm4gKG51bSA8PCBjbnQpIHwgKG51bSA+Pj4gKDMyIC0gY250KSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWQ1KGJ1Zikge1xyXG4gIHJldHVybiBoZWxwZXJzLmhhc2goYnVmLCBjb3JlX21kNSwgMTYpO1xyXG59O1xyXG4iLCIvLyBPcmlnaW5hbCBjb2RlIGFkYXB0ZWQgZnJvbSBSb2JlcnQgS2llZmZlci5cbi8vIGRldGFpbHMgYXQgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWRcbihmdW5jdGlvbigpIHtcbiAgdmFyIF9nbG9iYWwgPSB0aGlzO1xuXG4gIHZhciBtYXRoUk5HLCB3aGF0d2dSTkc7XG5cbiAgLy8gTk9URTogTWF0aC5yYW5kb20oKSBkb2VzIG5vdCBndWFyYW50ZWUgXCJjcnlwdG9ncmFwaGljIHF1YWxpdHlcIlxuICBtYXRoUk5HID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgIHZhciBieXRlcyA9IG5ldyBBcnJheShzaXplKTtcbiAgICB2YXIgcjtcblxuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgYnl0ZXNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ5dGVzO1xuICB9XG5cbiAgaWYgKF9nbG9iYWwuY3J5cHRvICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICB3aGF0d2dSTkcgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgICB2YXIgYnl0ZXMgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYnl0ZXMpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH1cbiAgfVxuXG4gIG1vZHVsZS5leHBvcnRzID0gd2hhdHdnUk5HIHx8IG1hdGhSTkc7XG5cbn0oKSlcbiIsIi8qXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNlY3VyZSBIYXNoIEFsZ29yaXRobSwgU0hBLTEsIGFzIGRlZmluZWRcbiAqIGluIEZJUFMgUFVCIDE4MC0xXG4gKiBWZXJzaW9uIDIuMWEgQ29weXJpZ2h0IFBhdWwgSm9obnN0b24gMjAwMCAtIDIwMDIuXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBkZXRhaWxzLlxuICovXG5cbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbi8qXG4gKiBDYWxjdWxhdGUgdGhlIFNIQS0xIG9mIGFuIGFycmF5IG9mIGJpZy1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGhcbiAqL1xuZnVuY3Rpb24gY29yZV9zaGExKHgsIGxlbilcbntcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBsZW4gJSAzMik7XG4gIHhbKChsZW4gKyA2NCA+PiA5KSA8PCA0KSArIDE1XSA9IGxlbjtcblxuICB2YXIgdyA9IEFycmF5KDgwKTtcbiAgdmFyIGEgPSAgMTczMjU4NDE5MztcbiAgdmFyIGIgPSAtMjcxNzMzODc5O1xuICB2YXIgYyA9IC0xNzMyNTg0MTk0O1xuICB2YXIgZCA9ICAyNzE3MzM4Nzg7XG4gIHZhciBlID0gLTEwMDk1ODk3NzY7XG5cbiAgZm9yKHZhciBpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KVxuICB7XG4gICAgdmFyIG9sZGEgPSBhO1xuICAgIHZhciBvbGRiID0gYjtcbiAgICB2YXIgb2xkYyA9IGM7XG4gICAgdmFyIG9sZGQgPSBkO1xuICAgIHZhciBvbGRlID0gZTtcblxuICAgIGZvcih2YXIgaiA9IDA7IGogPCA4MDsgaisrKVxuICAgIHtcbiAgICAgIGlmKGogPCAxNikgd1tqXSA9IHhbaSArIGpdO1xuICAgICAgZWxzZSB3W2pdID0gcm9sKHdbai0zXSBeIHdbai04XSBeIHdbai0xNF0gXiB3W2otMTZdLCAxKTtcbiAgICAgIHZhciB0ID0gc2FmZV9hZGQoc2FmZV9hZGQocm9sKGEsIDUpLCBzaGExX2Z0KGosIGIsIGMsIGQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgc2FmZV9hZGQoc2FmZV9hZGQoZSwgd1tqXSksIHNoYTFfa3QoaikpKTtcbiAgICAgIGUgPSBkO1xuICAgICAgZCA9IGM7XG4gICAgICBjID0gcm9sKGIsIDMwKTtcbiAgICAgIGIgPSBhO1xuICAgICAgYSA9IHQ7XG4gICAgfVxuXG4gICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xuICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcbiAgICBjID0gc2FmZV9hZGQoYywgb2xkYyk7XG4gICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xuICAgIGUgPSBzYWZlX2FkZChlLCBvbGRlKTtcbiAgfVxuICByZXR1cm4gQXJyYXkoYSwgYiwgYywgZCwgZSk7XG5cbn1cblxuLypcbiAqIFBlcmZvcm0gdGhlIGFwcHJvcHJpYXRlIHRyaXBsZXQgY29tYmluYXRpb24gZnVuY3Rpb24gZm9yIHRoZSBjdXJyZW50XG4gKiBpdGVyYXRpb25cbiAqL1xuZnVuY3Rpb24gc2hhMV9mdCh0LCBiLCBjLCBkKVxue1xuICBpZih0IDwgMjApIHJldHVybiAoYiAmIGMpIHwgKCh+YikgJiBkKTtcbiAgaWYodCA8IDQwKSByZXR1cm4gYiBeIGMgXiBkO1xuICBpZih0IDwgNjApIHJldHVybiAoYiAmIGMpIHwgKGIgJiBkKSB8IChjICYgZCk7XG4gIHJldHVybiBiIF4gYyBeIGQ7XG59XG5cbi8qXG4gKiBEZXRlcm1pbmUgdGhlIGFwcHJvcHJpYXRlIGFkZGl0aXZlIGNvbnN0YW50IGZvciB0aGUgY3VycmVudCBpdGVyYXRpb25cbiAqL1xuZnVuY3Rpb24gc2hhMV9rdCh0KVxue1xuICByZXR1cm4gKHQgPCAyMCkgPyAgMTUxODUwMDI0OSA6ICh0IDwgNDApID8gIDE4NTk3NzUzOTMgOlxuICAgICAgICAgKHQgPCA2MCkgPyAtMTg5NDAwNzU4OCA6IC04OTk0OTc1MTQ7XG59XG5cbi8qXG4gKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICovXG5mdW5jdGlvbiBzYWZlX2FkZCh4LCB5KVxue1xuICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpO1xuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xufVxuXG4vKlxuICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICovXG5mdW5jdGlvbiByb2wobnVtLCBjbnQpXG57XG4gIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGExKGJ1Zikge1xuICByZXR1cm4gaGVscGVycy5oYXNoKGJ1ZiwgY29yZV9zaGExLCAyMCwgdHJ1ZSk7XG59O1xuIiwiXG4vKipcbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgU2VjdXJlIEhhc2ggQWxnb3JpdGhtLCBTSEEtMjU2LCBhcyBkZWZpbmVkXG4gKiBpbiBGSVBTIDE4MC0yXG4gKiBWZXJzaW9uIDIuMi1iZXRhIENvcHlyaWdodCBBbmdlbCBNYXJpbiwgUGF1bCBKb2huc3RvbiAyMDAwIC0gMjAwOS5cbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqXG4gKi9cblxudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxudmFyIHNhZmVfYWRkID0gZnVuY3Rpb24oeCwgeSkge1xuICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpO1xuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xufTtcblxudmFyIFMgPSBmdW5jdGlvbihYLCBuKSB7XG4gIHJldHVybiAoWCA+Pj4gbikgfCAoWCA8PCAoMzIgLSBuKSk7XG59O1xuXG52YXIgUiA9IGZ1bmN0aW9uKFgsIG4pIHtcbiAgcmV0dXJuIChYID4+PiBuKTtcbn07XG5cbnZhciBDaCA9IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgcmV0dXJuICgoeCAmIHkpIF4gKCh+eCkgJiB6KSk7XG59O1xuXG52YXIgTWFqID0gZnVuY3Rpb24oeCwgeSwgeikge1xuICByZXR1cm4gKCh4ICYgeSkgXiAoeCAmIHopIF4gKHkgJiB6KSk7XG59O1xuXG52YXIgU2lnbWEwMjU2ID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gKFMoeCwgMikgXiBTKHgsIDEzKSBeIFMoeCwgMjIpKTtcbn07XG5cbnZhciBTaWdtYTEyNTYgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAoUyh4LCA2KSBeIFMoeCwgMTEpIF4gUyh4LCAyNSkpO1xufTtcblxudmFyIEdhbW1hMDI1NiA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIChTKHgsIDcpIF4gUyh4LCAxOCkgXiBSKHgsIDMpKTtcbn07XG5cbnZhciBHYW1tYTEyNTYgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAoUyh4LCAxNykgXiBTKHgsIDE5KSBeIFIoeCwgMTApKTtcbn07XG5cbnZhciBjb3JlX3NoYTI1NiA9IGZ1bmN0aW9uKG0sIGwpIHtcbiAgdmFyIEsgPSBuZXcgQXJyYXkoMHg0MjhBMkY5OCwweDcxMzc0NDkxLDB4QjVDMEZCQ0YsMHhFOUI1REJBNSwweDM5NTZDMjVCLDB4NTlGMTExRjEsMHg5MjNGODJBNCwweEFCMUM1RUQ1LDB4RDgwN0FBOTgsMHgxMjgzNUIwMSwweDI0MzE4NUJFLDB4NTUwQzdEQzMsMHg3MkJFNUQ3NCwweDgwREVCMUZFLDB4OUJEQzA2QTcsMHhDMTlCRjE3NCwweEU0OUI2OUMxLDB4RUZCRTQ3ODYsMHhGQzE5REM2LDB4MjQwQ0ExQ0MsMHgyREU5MkM2RiwweDRBNzQ4NEFBLDB4NUNCMEE5REMsMHg3NkY5ODhEQSwweDk4M0U1MTUyLDB4QTgzMUM2NkQsMHhCMDAzMjdDOCwweEJGNTk3RkM3LDB4QzZFMDBCRjMsMHhENUE3OTE0NywweDZDQTYzNTEsMHgxNDI5Mjk2NywweDI3QjcwQTg1LDB4MkUxQjIxMzgsMHg0RDJDNkRGQywweDUzMzgwRDEzLDB4NjUwQTczNTQsMHg3NjZBMEFCQiwweDgxQzJDOTJFLDB4OTI3MjJDODUsMHhBMkJGRThBMSwweEE4MUE2NjRCLDB4QzI0QjhCNzAsMHhDNzZDNTFBMywweEQxOTJFODE5LDB4RDY5OTA2MjQsMHhGNDBFMzU4NSwweDEwNkFBMDcwLDB4MTlBNEMxMTYsMHgxRTM3NkMwOCwweDI3NDg3NzRDLDB4MzRCMEJDQjUsMHgzOTFDMENCMywweDRFRDhBQTRBLDB4NUI5Q0NBNEYsMHg2ODJFNkZGMywweDc0OEY4MkVFLDB4NzhBNTYzNkYsMHg4NEM4NzgxNCwweDhDQzcwMjA4LDB4OTBCRUZGRkEsMHhBNDUwNkNFQiwweEJFRjlBM0Y3LDB4QzY3MTc4RjIpO1xuICB2YXIgSEFTSCA9IG5ldyBBcnJheSgweDZBMDlFNjY3LCAweEJCNjdBRTg1LCAweDNDNkVGMzcyLCAweEE1NEZGNTNBLCAweDUxMEU1MjdGLCAweDlCMDU2ODhDLCAweDFGODNEOUFCLCAweDVCRTBDRDE5KTtcbiAgICB2YXIgVyA9IG5ldyBBcnJheSg2NCk7XG4gICAgdmFyIGEsIGIsIGMsIGQsIGUsIGYsIGcsIGgsIGksIGo7XG4gICAgdmFyIFQxLCBUMjtcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgbVtsID4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbCAlIDMyKTtcbiAgbVsoKGwgKyA2NCA+PiA5KSA8PCA0KSArIDE1XSA9IGw7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICBhID0gSEFTSFswXTsgYiA9IEhBU0hbMV07IGMgPSBIQVNIWzJdOyBkID0gSEFTSFszXTsgZSA9IEhBU0hbNF07IGYgPSBIQVNIWzVdOyBnID0gSEFTSFs2XTsgaCA9IEhBU0hbN107XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCA2NDsgaisrKSB7XG4gICAgICBpZiAoaiA8IDE2KSB7XG4gICAgICAgIFdbal0gPSBtW2ogKyBpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFdbal0gPSBzYWZlX2FkZChzYWZlX2FkZChzYWZlX2FkZChHYW1tYTEyNTYoV1tqIC0gMl0pLCBXW2ogLSA3XSksIEdhbW1hMDI1NihXW2ogLSAxNV0pKSwgV1tqIC0gMTZdKTtcbiAgICAgIH1cbiAgICAgIFQxID0gc2FmZV9hZGQoc2FmZV9hZGQoc2FmZV9hZGQoc2FmZV9hZGQoaCwgU2lnbWExMjU2KGUpKSwgQ2goZSwgZiwgZykpLCBLW2pdKSwgV1tqXSk7XG4gICAgICBUMiA9IHNhZmVfYWRkKFNpZ21hMDI1NihhKSwgTWFqKGEsIGIsIGMpKTtcbiAgICAgIGggPSBnOyBnID0gZjsgZiA9IGU7IGUgPSBzYWZlX2FkZChkLCBUMSk7IGQgPSBjOyBjID0gYjsgYiA9IGE7IGEgPSBzYWZlX2FkZChUMSwgVDIpO1xuICAgIH1cbiAgICBIQVNIWzBdID0gc2FmZV9hZGQoYSwgSEFTSFswXSk7IEhBU0hbMV0gPSBzYWZlX2FkZChiLCBIQVNIWzFdKTsgSEFTSFsyXSA9IHNhZmVfYWRkKGMsIEhBU0hbMl0pOyBIQVNIWzNdID0gc2FmZV9hZGQoZCwgSEFTSFszXSk7XG4gICAgSEFTSFs0XSA9IHNhZmVfYWRkKGUsIEhBU0hbNF0pOyBIQVNIWzVdID0gc2FmZV9hZGQoZiwgSEFTSFs1XSk7IEhBU0hbNl0gPSBzYWZlX2FkZChnLCBIQVNIWzZdKTsgSEFTSFs3XSA9IHNhZmVfYWRkKGgsIEhBU0hbN10pO1xuICB9XG4gIHJldHVybiBIQVNIO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGEyNTYoYnVmKSB7XG4gIHJldHVybiBoZWxwZXJzLmhhc2goYnVmLCBjb3JlX3NoYTI1NiwgMzIsIHRydWUpO1xufTtcbiJdfQ==
