(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BootScene, Demo1Scene, GraphicsManager, InputManager, LoadMapDemoScene, MenuScene, MoveMapDemoScene, MoveMapSmoothDemoScene, PreLoadScene, Scene, SceneManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require("../../../vendor/iki-engine/src/Scene.coffee");

SceneManager = require("../../../vendor/iki-engine/src/Manager/SceneManager.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../../vendor/iki-engine/src/Manager/InputManager.coffee");

PreLoadScene = require("./PreLoadScene.coffee");

MenuScene = require("./MenuScene.coffee");

Demo1Scene = require("./Demos/Demo1/Demo1Scene.coffee");

LoadMapDemoScene = require("./Demos/LoadMapDemo/LoadMapDemoScene.coffee");

MoveMapDemoScene = require("./Demos/MoveMapDemo/MoveMapDemoScene.coffee");

MoveMapSmoothDemoScene = require("./Demos/MoveMapSmoothDemo/MoveMapSmoothDemoScene.coffee");

BootScene = (function(_super) {
  __extends(BootScene, _super);

  function BootScene() {
    return BootScene.__super__.constructor.apply(this, arguments);
  }

  BootScene.prototype.init = function() {
    var demo1Scene, loadMapDemoScene, menuScene, moveMapDemoScene, moveMapSmoothDemoScene, preloadScene;
    GraphicsManager.renderer = GraphicsManager.createRenderer(640, 480, document.body);
    GraphicsManager.renderer.canvas.width = window.innerWidth;
    GraphicsManager.renderer.canvas.height = window.innerHeight;
    InputManager.init();
    preloadScene = new PreLoadScene();
    SceneManager.add("preload", preloadScene);
    preloadScene.init();
    menuScene = new MenuScene();
    SceneManager.add("menu", menuScene);
    menuScene.init();
    demo1Scene = new Demo1Scene();
    SceneManager.add("demo1", demo1Scene);
    demo1Scene.init();
    loadMapDemoScene = new LoadMapDemoScene();
    SceneManager.add("LoadMapDemo", loadMapDemoScene);
    loadMapDemoScene.init();
    moveMapDemoScene = new MoveMapDemoScene();
    SceneManager.add("MoveMapDemo", moveMapDemoScene);
    moveMapDemoScene.init();
    moveMapSmoothDemoScene = new MoveMapSmoothDemoScene();
    SceneManager.add("MoveMapSmoothDemo", moveMapSmoothDemoScene);
    moveMapSmoothDemoScene.init();
    this.debugMenu();
    return window.addEventListener("resize", function() {
      GraphicsManager.renderer.canvas.width = window.innerWidth;
      return GraphicsManager.renderer.canvas.height = window.innerHeight;
    });
  };

  BootScene.prototype.activate = function() {
    return SceneManager.activate("preload");
  };

  BootScene.prototype.debugMenu = function() {
    var gui, sceneSelector, scenesFolder;
    gui = new dat.GUI();
    SceneManager.debugScene = SceneManager.currentScene;
    scenesFolder = gui.addFolder("Scenes");
    scenesFolder.open();
    sceneSelector = scenesFolder.add(SceneManager, "debugScene", ["menu", "demo1", "LoadMapDemo", "MoveMapDemo", "MoveMapSmoothDemo"]);
    sceneSelector.onFinishChange(function(scene) {
      return SceneManager.activate(scene);
    });
    return SceneManager.onActivate = function() {
      SceneManager.debugScene = SceneManager.currentScene;
      return sceneSelector.updateDisplay();
    };
  };

  return BootScene;

})(Scene);

module.exports = BootScene;


},{"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../vendor/iki-engine/src/Manager/InputManager.coffee":17,"../../../vendor/iki-engine/src/Manager/SceneManager.coffee":18,"../../../vendor/iki-engine/src/Scene.coffee":20,"./Demos/Demo1/Demo1Scene.coffee":2,"./Demos/LoadMapDemo/LoadMapDemoScene.coffee":4,"./Demos/MoveMapDemo/MoveMapDemoScene.coffee":5,"./Demos/MoveMapSmoothDemo/MoveMapSmoothDemoScene.coffee":7,"./MenuScene.coffee":8,"./PreLoadScene.coffee":9}],2:[function(require,module,exports){
var AssetManager, Demo1Scene, Demo1System, EntityManager, GraphicsManager, Scene,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EntityManager = require("../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

GraphicsManager = require("../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

AssetManager = require("../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

Scene = require("../../../../../vendor/iki-engine/src/Scene.coffee");

Demo1System = require("./Demo1System.coffee");

Demo1Scene = (function(_super) {
  __extends(Demo1Scene, _super);

  function Demo1Scene() {
    return Demo1Scene.__super__.constructor.apply(this, arguments);
  }

  Demo1Scene.prototype.init = function() {
    return this.addSystem(new Demo1System());
  };

  Demo1Scene.prototype.activate = function() {
    var cursorImage;
    GraphicsManager.renderer.canvas.style.cursor = "none";
    this.cursor = EntityManager.createEntity("cursor");
    cursorImage = AssetManager.get("img/cursor/slick_arrow-delta.png");
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

  Demo1Scene.prototype.deactivate = function() {
    EntityManager.removeEntity(this.cursor);
    return GraphicsManager.renderer.canvas.style.cursor = "default";
  };

  return Demo1Scene;

})(Scene);

module.exports = Demo1Scene;


},{"../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":13,"../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":15,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../../../vendor/iki-engine/src/Scene.coffee":20,"./Demo1System.coffee":3}],3:[function(require,module,exports){
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
var AssetManager, GraphicsManager, LoadMapDemoScene, Map, Scene,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AssetManager = require("../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

GraphicsManager = require("../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

Scene = require("../../../../../vendor/iki-engine/src/Scene.coffee");

Map = require("../../../../../vendor/iki-engine/src/Map.coffee");

LoadMapDemoScene = (function(_super) {
  __extends(LoadMapDemoScene, _super);

  function LoadMapDemoScene() {
    return LoadMapDemoScene.__super__.constructor.apply(this, arguments);
  }

  LoadMapDemoScene.prototype.activate = function() {
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

  return LoadMapDemoScene;

})(Scene);

module.exports = LoadMapDemoScene;


},{"../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":13,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../../../vendor/iki-engine/src/Map.coffee":19,"../../../../../vendor/iki-engine/src/Scene.coffee":20}],5:[function(require,module,exports){
var AssetManager, GraphicsManager, InputManager, Map, MoveMapDemoScene, Scene,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AssetManager = require("../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

GraphicsManager = require("../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../../../../vendor/iki-engine/src/Manager/InputManager.coffee");

Scene = require("../../../../../vendor/iki-engine/src/Scene.coffee");

Map = require("../../../../../vendor/iki-engine/src/Map.coffee");

MoveMapDemoScene = (function(_super) {
  __extends(MoveMapDemoScene, _super);

  function MoveMapDemoScene() {
    return MoveMapDemoScene.__super__.constructor.apply(this, arguments);
  }

  MoveMapDemoScene.prototype.init = function() {
    this.viewPortX = 0;
    return this.viewPortY = 0;
  };

  MoveMapDemoScene.prototype.activate = function() {
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

  MoveMapDemoScene.prototype.deactivate = function() {
    return InputManager.onKeyUp = null;
  };

  MoveMapDemoScene.prototype.onKeyUp = function(e) {
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

  return MoveMapDemoScene;

})(Scene);

module.exports = MoveMapDemoScene;


},{"../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":13,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../../../vendor/iki-engine/src/Manager/InputManager.coffee":17,"../../../../../vendor/iki-engine/src/Map.coffee":19,"../../../../../vendor/iki-engine/src/Scene.coffee":20}],6:[function(require,module,exports){
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
var AssetManager, EntityManager, GraphicsManager, GraphicsSystem, Map, MapMoveInputSyste, MoveMapSmoothDemoScene, Scene,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AssetManager = require("../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

GraphicsManager = require("../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

EntityManager = require("../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

Scene = require("../../../../../vendor/iki-engine/src/Scene.coffee");

Map = require("../../../../../vendor/iki-engine/src/Map.coffee");

GraphicsSystem = require("../../../../../vendor/iki-engine/src/System/GraphicsSystem.coffee");

MapMoveInputSyste = require("./MapMoveInputSystem.coffee");

MoveMapSmoothDemoScene = (function(_super) {
  __extends(MoveMapSmoothDemoScene, _super);

  function MoveMapSmoothDemoScene() {
    return MoveMapSmoothDemoScene.__super__.constructor.apply(this, arguments);
  }

  MoveMapSmoothDemoScene.prototype.init = function() {
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

  MoveMapSmoothDemoScene.prototype.activate = function() {
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

  MoveMapSmoothDemoScene.prototype.deactivate = function() {
    return EntityManager.removeEntity(this.viewportEntity);
  };

  MoveMapSmoothDemoScene.prototype.drawMap = function(ctx) {
    if (this.mapLoaded) {
      return this.map.drawMapRect(ctx, this.viewport.x, this.viewport.y, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
    }
  };

  return MoveMapSmoothDemoScene;

})(Scene);

module.exports = MoveMapSmoothDemoScene;


},{"../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":13,"../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":15,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../../../vendor/iki-engine/src/Map.coffee":19,"../../../../../vendor/iki-engine/src/Scene.coffee":20,"../../../../../vendor/iki-engine/src/System/GraphicsSystem.coffee":22,"./MapMoveInputSystem.coffee":6}],8:[function(require,module,exports){
var AssetManager, AudioManager, GraphicsManager, InputManager, MenuScene, Scene, SceneManager, Util,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require("../../../vendor/iki-engine/src/Scene.coffee");

Util = require("../../../vendor/iki-engine/src/Util.coffee");

SceneManager = require("../../../vendor/iki-engine/src/Manager/SceneManager.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../../vendor/iki-engine/src/Manager/InputManager.coffee");

AudioManager = require("../../../vendor/iki-engine/src/Manager/AudioManager.coffee");

AssetManager = require("../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

MenuScene = (function(_super) {
  __extends(MenuScene, _super);

  function MenuScene() {
    return MenuScene.__super__.constructor.apply(this, arguments);
  }

  MenuScene.prototype.init = function() {
    this.menus = {};
    this.ctx = GraphicsManager.renderer.ctx;
    this.clickListener = this.onMouseClick.bind(this);
    this.currentMenu = "main";
    AudioManager.load("menu-select", "/assets/sound/UI pack 1/MENU B_Select.wav");
    AudioManager.load("menu-back", "/assets/sound/UI pack 1/MENU B_Back.wav");
    this.loadMenu("/assets/menu/main.json");
    return this.loadMenu("/assets/menu/demos.json");
  };

  MenuScene.prototype.loadMenu = function(menuFile) {
    var map;
    map = Util.loadJSON(menuFile);
    return map.then(this.parseMenu.bind(this));
  };

  MenuScene.prototype.parseMenu = function(menuData) {
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
        _results.push(this.addButton(menuData.id, element.text, element.x, element.y, element.width, element.height, element.actionType, element.action));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  MenuScene.prototype.addButton = function(menu, text, x, y, width, height, actionType, action) {
    var button, onClick;
    if (actionType === "switchMenu") {
      onClick = this.switchMenu.bind(this, action);
    }
    if (actionType === "switchScene") {
      onClick = this.switchScene.bind(this, action);
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

  MenuScene.prototype.activate = function() {
    this.background = AssetManager.get("img/background/image6_0.jpg");
    InputManager.onMouseClick = this.onMouseClick.bind(this);
    this.currentMenu = "main";
    return this.renderMenu();
  };

  MenuScene.prototype.deactivate = function() {
    return InputManager.onMouseClick = null;
  };

  MenuScene.prototype.switchMenu = function(newMenu) {
    if (newMenu === "main") {
      AudioManager.play("menu-back");
    } else {
      AudioManager.play("menu-select");
    }
    this.currentMenu = newMenu;
    return this.renderMenu();
  };

  MenuScene.prototype.switchScene = function(scene) {
    AudioManager.play("menu-select");
    return SceneManager.activate(scene);
  };

  MenuScene.prototype.onMouseClick = function(e) {
    var button;
    button = this.getButtonFromPoint(e.x, e.y);
    if (button) {
      return button.click();
    }
  };

  MenuScene.prototype.getButtonFromPoint = function(x, y) {
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

  MenuScene.prototype.isPointInRect = function(x, y, rx, ry, rw, rh) {
    return x >= rx && x <= ry + rw && y >= ry && y <= ry + rh;
  };

  MenuScene.prototype.renderMenu = function() {
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

  MenuScene.prototype.renderBackground = function() {
    return GraphicsManager.fillImage(this.ctx, this.background, this.background.width, this.background.height, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
  };

  MenuScene.prototype.renderButton = function(button, hover) {
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

  return MenuScene;

})(Scene);

module.exports = MenuScene;


},{"../../../vendor/iki-engine/src/Manager/AssetManager.coffee":13,"../../../vendor/iki-engine/src/Manager/AudioManager.coffee":14,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../vendor/iki-engine/src/Manager/InputManager.coffee":17,"../../../vendor/iki-engine/src/Manager/SceneManager.coffee":18,"../../../vendor/iki-engine/src/Scene.coffee":20,"../../../vendor/iki-engine/src/Util.coffee":23}],9:[function(require,module,exports){
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
    this.bar = {
      x: (GraphicsManager.renderer.canvas.width / 2) - 100,
      y: (GraphicsManager.renderer.canvas.height / 2) - 20,
      width: 200,
      height: 20
    };
    this.bar.middle = this.bar.x + (this.bar.width / 2);
    return this.ctx = GraphicsManager.renderer.ctx;
  };

  PreLoadScene.prototype.activate = function() {
    var loadAsset;
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
    this.renderLoadingBar(0);
    this.renderLoadingText("Loading...");
    AssetManager.onProgress = this.onProgress.bind(this);
    loadAsset = AssetManager.load("assets/demo-assets.json");
    return loadAsset.then(function() {
      return SceneManager.activate("menu");
    });
  };

  PreLoadScene.prototype.onProgress = function(asset, group, loaded, total) {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
    this.renderLoadingText("Loading " + group + "...");
    return this.renderLoadingBar(loaded / total);
  };

  PreLoadScene.prototype.renderLoadingText = function(text) {
    var textSize;
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "12px Arial, sans-serif";
    this.ctx.textBaseline = "top";
    textSize = this.ctx.measureText(text);
    return this.ctx.fillText(text, this.bar.middle - (textSize.width / 2), this.bar.y + this.bar.height + 10);
  };

  PreLoadScene.prototype.renderLoadingBar = function(percent) {
    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#fff";
    this.ctx.strokeRect(this.bar.x, this.bar.y, this.bar.width, this.bar.height);
    return this.ctx.fillRect(this.bar.x + 3, this.bar.y + 3, (this.bar.width - 6) * percent, this.bar.height - 6);
  };

  return PreLoadScene;

})(Scene);

module.exports = PreLoadScene;


},{"../../../vendor/iki-engine/src/Manager/AssetManager.coffee":13,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":16,"../../../vendor/iki-engine/src/Manager/SceneManager.coffee":18,"../../../vendor/iki-engine/src/Scene.coffee":20}],10:[function(require,module,exports){
var BootScene, Engine, game;

Engine = require("../../vendor/iki-engine/src/Engine.coffee");

BootScene = require("./State/BootScene.coffee");

game = new Engine;

game.start(new BootScene);


},{"../../vendor/iki-engine/src/Engine.coffee":11,"./State/BootScene.coffee":1}],11:[function(require,module,exports){
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


},{"./Manager/SceneManager.coffee":18}],12:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcQm9vdFNjZW5lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcRGVtb3NcXERlbW8xXFxEZW1vMVNjZW5lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcRGVtb3NcXERlbW8xXFxEZW1vMVN5c3RlbS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZGVtb1xcU3RhdGVcXERlbW9zXFxMb2FkTWFwRGVtb1xcTG9hZE1hcERlbW9TY2VuZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZGVtb1xcU3RhdGVcXERlbW9zXFxNb3ZlTWFwRGVtb1xcTW92ZU1hcERlbW9TY2VuZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZGVtb1xcU3RhdGVcXERlbW9zXFxNb3ZlTWFwU21vb3RoRGVtb1xcTWFwTW92ZUlucHV0U3lzdGVtLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcRGVtb3NcXE1vdmVNYXBTbW9vdGhEZW1vXFxNb3ZlTWFwU21vb3RoRGVtb1NjZW5lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcTWVudVNjZW5lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcUHJlTG9hZFNjZW5lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxkZW1vLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXEVuZ2luZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxFbnRpdHkuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcQXNzZXRNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXEF1ZGlvTWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxNYW5hZ2VyXFxFbnRpdHlNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXEdyYXBoaWNzTWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxNYW5hZ2VyXFxJbnB1dE1hbmFnZXIuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcU2NlbmVNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hcC5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxTY2VuZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxTeXN0ZW0uY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcU3lzdGVtXFxHcmFwaGljc1N5c3RlbS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxVdGlsLmNvZmZlZSIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL2RvY3Jvb3QvYXNzZXRzL3ZlbmRvci9pa2ktZW5naW5lL3ZlbmRvci9ub2RlLXV1aWQvdXVpZC5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvaGVscGVycy5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9pbmRleC5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9tZDUuanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvcm5nLmpzIiwiQzovd3d3L21lcmNlbmFyeS1zdHJpa2UtZm9yY2Uvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3NoYS5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEyNTYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLDhKQUFBO0VBQUE7aVNBQUE7O0FBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSw2Q0FBUixDQUFSLENBQUE7O0FBQUEsWUFDQSxHQUFlLE9BQUEsQ0FBUSw0REFBUixDQURmLENBQUE7O0FBQUEsZUFFQSxH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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJTY2VuZSA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU2NlbmUuY29mZmVlXCJcblNjZW5lTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9TY2VuZU1hbmFnZXIuY29mZmVlXCJcbkdyYXBoaWNzTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9HcmFwaGljc01hbmFnZXIuY29mZmVlXCJcbklucHV0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9JbnB1dE1hbmFnZXIuY29mZmVlXCJcblxuUHJlTG9hZFNjZW5lID0gcmVxdWlyZSBcIi4vUHJlTG9hZFNjZW5lLmNvZmZlZVwiXG5NZW51U2NlbmUgPSByZXF1aXJlIFwiLi9NZW51U2NlbmUuY29mZmVlXCJcblxuIyBEZW1vc1xuRGVtbzFTY2VuZSA9IHJlcXVpcmUgXCIuL0RlbW9zL0RlbW8xL0RlbW8xU2NlbmUuY29mZmVlXCJcbkxvYWRNYXBEZW1vU2NlbmUgPSByZXF1aXJlIFwiLi9EZW1vcy9Mb2FkTWFwRGVtby9Mb2FkTWFwRGVtb1NjZW5lLmNvZmZlZVwiXG5Nb3ZlTWFwRGVtb1NjZW5lID0gcmVxdWlyZSBcIi4vRGVtb3MvTW92ZU1hcERlbW8vTW92ZU1hcERlbW9TY2VuZS5jb2ZmZWVcIlxuTW92ZU1hcFNtb290aERlbW9TY2VuZSA9IHJlcXVpcmUgXCIuL0RlbW9zL01vdmVNYXBTbW9vdGhEZW1vL01vdmVNYXBTbW9vdGhEZW1vU2NlbmUuY29mZmVlXCJcblxuXG5jbGFzcyBCb290U2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGluaXQ6IC0+XG4gICAgICAgICMgVXNlIEdyYXBoaWNzTWFuYWdlciB0byBjcmVhdGUgbWFpbiBjYW52YXNcbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyID0gR3JhcGhpY3NNYW5hZ2VyLmNyZWF0ZVJlbmRlcmVyIDY0MCwgNDgwLCBkb2N1bWVudC5ib2R5XG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuXG4gICAgICAgIElucHV0TWFuYWdlci5pbml0KClcblxuICAgICAgICBwcmVsb2FkU2NlbmUgPSBuZXcgUHJlTG9hZFNjZW5lKClcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFkZCBcInByZWxvYWRcIiwgcHJlbG9hZFNjZW5lXG4gICAgICAgIHByZWxvYWRTY2VuZS5pbml0KClcblxuICAgICAgICBtZW51U2NlbmUgPSBuZXcgTWVudVNjZW5lKClcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFkZCBcIm1lbnVcIiwgbWVudVNjZW5lXG4gICAgICAgIG1lbnVTY2VuZS5pbml0KClcblxuICAgICAgICBkZW1vMVNjZW5lID0gbmV3IERlbW8xU2NlbmUoKVxuICAgICAgICBTY2VuZU1hbmFnZXIuYWRkIFwiZGVtbzFcIiwgZGVtbzFTY2VuZVxuICAgICAgICBkZW1vMVNjZW5lLmluaXQoKVxuXG4gICAgICAgIGxvYWRNYXBEZW1vU2NlbmUgPSBuZXcgTG9hZE1hcERlbW9TY2VuZSgpXG4gICAgICAgIFNjZW5lTWFuYWdlci5hZGQgXCJMb2FkTWFwRGVtb1wiLCBsb2FkTWFwRGVtb1NjZW5lXG4gICAgICAgIGxvYWRNYXBEZW1vU2NlbmUuaW5pdCgpXG5cbiAgICAgICAgbW92ZU1hcERlbW9TY2VuZSA9IG5ldyBNb3ZlTWFwRGVtb1NjZW5lKClcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFkZCBcIk1vdmVNYXBEZW1vXCIsIG1vdmVNYXBEZW1vU2NlbmVcbiAgICAgICAgbW92ZU1hcERlbW9TY2VuZS5pbml0KClcblxuICAgICAgICBtb3ZlTWFwU21vb3RoRGVtb1NjZW5lID0gbmV3IE1vdmVNYXBTbW9vdGhEZW1vU2NlbmUoKVxuICAgICAgICBTY2VuZU1hbmFnZXIuYWRkIFwiTW92ZU1hcFNtb290aERlbW9cIiwgbW92ZU1hcFNtb290aERlbW9TY2VuZVxuICAgICAgICBtb3ZlTWFwU21vb3RoRGVtb1NjZW5lLmluaXQoKVxuXG4gICAgICAgIEBkZWJ1Z01lbnUoKVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwicmVzaXplXCIsIC0+XG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cblxuICAgIGFjdGl2YXRlOiAtPlxuICAgICAgICBTY2VuZU1hbmFnZXIuYWN0aXZhdGUgXCJwcmVsb2FkXCJcblxuICAgIGRlYnVnTWVudTogLT5cbiAgICAgICAgZ3VpID0gbmV3IGRhdC5HVUkoKVxuXG4gICAgICAgIFNjZW5lTWFuYWdlci5kZWJ1Z1NjZW5lID0gU2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZVxuXG4gICAgICAgIHNjZW5lc0ZvbGRlciA9IGd1aS5hZGRGb2xkZXIgXCJTY2VuZXNcIlxuICAgICAgICBzY2VuZXNGb2xkZXIub3BlbigpXG4gICAgICAgIHNjZW5lU2VsZWN0b3IgPSBzY2VuZXNGb2xkZXIuYWRkIFNjZW5lTWFuYWdlciwgXCJkZWJ1Z1NjZW5lXCIsIFtcbiAgICAgICAgICAgIFwibWVudVwiLCBcImRlbW8xXCIsIFwiTG9hZE1hcERlbW9cIiwgXCJNb3ZlTWFwRGVtb1wiLCBcIk1vdmVNYXBTbW9vdGhEZW1vXCJcbiAgICAgICAgXVxuICAgICAgICBzY2VuZVNlbGVjdG9yLm9uRmluaXNoQ2hhbmdlIChzY2VuZSkgLT4gU2NlbmVNYW5hZ2VyLmFjdGl2YXRlIHNjZW5lXG4gICAgICAgIFNjZW5lTWFuYWdlci5vbkFjdGl2YXRlID0gLT5cbiAgICAgICAgICAgIFNjZW5lTWFuYWdlci5kZWJ1Z1NjZW5lID0gU2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZVxuICAgICAgICAgICAgc2NlbmVTZWxlY3Rvci51cGRhdGVEaXNwbGF5KClcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvb3RTY2VuZSIsIkVudGl0eU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvRW50aXR5TWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuQXNzZXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0Fzc2V0TWFuYWdlci5jb2ZmZWVcIlxuXG5TY2VuZSA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU2NlbmUuY29mZmVlXCJcbkRlbW8xU3lzdGVtID0gcmVxdWlyZSBcIi4vRGVtbzFTeXN0ZW0uY29mZmVlXCJcblxuY2xhc3MgRGVtbzFTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgaW5pdDogLT4gQGFkZFN5c3RlbSBuZXcgRGVtbzFTeXN0ZW0oKVxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuc3R5bGUuY3Vyc29yID0gXCJub25lXCJcblxuICAgICAgICBAY3Vyc29yID0gRW50aXR5TWFuYWdlci5jcmVhdGVFbnRpdHkgXCJjdXJzb3JcIlxuICAgICAgICBjdXJzb3JJbWFnZSA9IEFzc2V0TWFuYWdlci5nZXQgXCJpbWcvY3Vyc29yL3NsaWNrX2Fycm93LWRlbHRhLnBuZ1wiXG4gICAgICAgIEVudGl0eU1hbmFnZXIuYWRkQ29tcG9uZW50IEBjdXJzb3IsIHtcbiAgICAgICAgICAgIHR5cGU6IFwiUmVuZGVyYWJsZUltYWdlXCJcbiAgICAgICAgICAgIGltZzogY3Vyc29ySW1hZ2VcbiAgICAgICAgfVxuICAgICAgICBFbnRpdHlNYW5hZ2VyLmFkZENvbXBvbmVudCBAY3Vyc29yLCB7XG4gICAgICAgICAgICB0eXBlOiBcIlBvc2l0aW9uXCJcbiAgICAgICAgICAgIHg6IDBcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfVxuICAgICAgICBFbnRpdHlNYW5hZ2VyLmFkZENvbXBvbmVudCBAY3Vyc29yLCB7XG4gICAgICAgICAgICB0eXBlOiBcIlBvc2l0aW9uRm9sbG93c01vdXNlXCJcbiAgICAgICAgfVxuXG4gICAgZGVhY3RpdmF0ZTogLT5cbiAgICAgICAgRW50aXR5TWFuYWdlci5yZW1vdmVFbnRpdHkgQGN1cnNvclxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiXG5cblxubW9kdWxlLmV4cG9ydHMgPSBEZW1vMVNjZW5lIiwiU3lzdGVtID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TeXN0ZW0uY29mZmVlXCJcbkVudGl0eU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvRW50aXR5TWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuSW5wdXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0lucHV0TWFuYWdlci5jb2ZmZWVcIlxuXG5jbGFzcyBEZW1vMVN5c3RlbSBleHRlbmRzIFN5c3RlbVxuICAgIFRIUk9UVExFX1ZBTFVFOiAxNiAgIyA2Mi41IEZQU1xuXG4gICAgb25VcGRhdGU6IC0+XG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFN0eWxlID0gXCIjZmZmXCJcbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsUmVjdCAwLCAwLFxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aCwgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcblxuICAgICAgICAjIEZvbGxvdyBtb3VzZSAtIG5vcm1hbGx5IHdvdWxkIGJlIGluIGEgZGlmZmVyZW50IHN5c3RlbSBmcm9tIHRoZSByZW5kZXJhYmxlc1xuICAgICAgICBmb2xsb3dFbnRpdGllcyA9IEVudGl0eU1hbmFnZXIuZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJQb3NpdGlvbkZvbGxvd3NNb3VzZVwiLCBcIlBvc2l0aW9uXCJdXG4gICAgICAgIGZvciBlbnRpdHkgaW4gZm9sbG93RW50aXRpZXNcbiAgICAgICAgICAgIHBvc2l0aW9uID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlBvc2l0aW9uXCJcbiAgICAgICAgICAgIHBvc2l0aW9uLnggPSBJbnB1dE1hbmFnZXIubW91c2UueFxuICAgICAgICAgICAgcG9zaXRpb24ueSA9IElucHV0TWFuYWdlci5tb3VzZS55XG5cbiAgICAgICAgIyBEcmF3IHJlbmRlcmFibGVzXG4gICAgICAgIHJlbmRlcmFibGVFbnRpdGllcyA9IEVudGl0eU1hbmFnZXIuZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJSZW5kZXJhYmxlSW1hZ2VcIiwgXCJQb3NpdGlvblwiXVxuICAgICAgICBmb3IgZW50aXR5IGluIHJlbmRlcmFibGVFbnRpdGllc1xuICAgICAgICAgICAgcmVuZGVyYWJsZSA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJSZW5kZXJhYmxlSW1hZ2VcIlxuICAgICAgICAgICAgcG9zaXRpb24gPSBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiUG9zaXRpb25cIlxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5kcmF3SW1hZ2UgcmVuZGVyYWJsZS5pbWcsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnlcblxuICAgICAgICByZXR1cm4gbnVsbFxuXG5cbm1vZHVsZS5leHBvcnRzID0gRGVtbzFTeXN0ZW0iLCJBc3NldE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvQXNzZXRNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5cblNjZW5lID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TY2VuZS5jb2ZmZWVcIlxuTWFwID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYXAuY29mZmVlXCJcblxuY2xhc3MgTG9hZE1hcERlbW9TY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgYWN0aXZhdGU6IC0+XG5cbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiM2NjZcIlxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmZpbGxSZWN0IDAsIDAsXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG4gICAgICAgIG1hcCA9IG5ldyBNYXAoKVxuICAgICAgICBsb2FkaW5nID0gbWFwLmxvYWRNYXAgXCIvYXNzZXRzL21hcC90ZXN0MS5qc29uXCJcbiAgICAgICAgbG9hZGluZy50aGVuICgpIC0+XG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiIzY5NlwiXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmZpbGxSZWN0IDAsIDAsXG4gICAgICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aCwgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcblxuICAgICAgICAgICAgbWFwLmRyYXdNYXAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eFxuXG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZE1hcERlbW9TY2VuZSIsIkFzc2V0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9Bc3NldE1hbmFnZXIuY29mZmVlXCJcbkdyYXBoaWNzTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9HcmFwaGljc01hbmFnZXIuY29mZmVlXCJcbklucHV0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9JbnB1dE1hbmFnZXIuY29mZmVlXCJcblxuU2NlbmUgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1NjZW5lLmNvZmZlZVwiXG5NYXAgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hcC5jb2ZmZWVcIlxuXG5jbGFzcyBNb3ZlTWFwRGVtb1NjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBpbml0OiAtPlxuICAgICAgICBAdmlld1BvcnRYID0gMFxuICAgICAgICBAdmlld1BvcnRZID0gMFxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIElucHV0TWFuYWdlci5vbktleVVwID0gQG9uS2V5VXAuYmluZCBAXG5cbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiM2NjZcIlxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmZpbGxSZWN0IDAsIDAsXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG4gICAgICAgIEBtYXAgPSBuZXcgTWFwKClcbiAgICAgICAgbG9hZGluZyA9IEBtYXAubG9hZE1hcCBcIi9hc3NldHMvbWFwL3Rlc3QyLmpzb25cIlxuICAgICAgICBsb2FkaW5nLnRoZW4gKCkgPT5cbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFN0eWxlID0gXCIjNjk2XCJcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFJlY3QgMCwgMCxcbiAgICAgICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG4gICAgICAgICAgICBAbWFwLmRyYXdNYXAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eFxuXG4gICAgZGVhY3RpdmF0ZTogLT4gSW5wdXRNYW5hZ2VyLm9uS2V5VXAgPSBudWxsXG5cbiAgICBvbktleVVwOiAoZSkgLT5cbiAgICAgICAgbW92ZURpc3RhbmNlID0gMTZcblxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzggdGhlbiBAdmlld1BvcnRZIC09IG1vdmVEaXN0YW5jZSAjIHVwXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSA0MCB0aGVuIEB2aWV3UG9ydFkgKz0gbW92ZURpc3RhbmNlICMgZG93blxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzcgdGhlbiBAdmlld1BvcnRYIC09IG1vdmVEaXN0YW5jZSAjIGxlZnRcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM5IHRoZW4gQHZpZXdQb3J0WCArPSBtb3ZlRGlzdGFuY2UgIyByaWdodFxuXG4gICAgICAgIGlmIEBtYXBcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFN0eWxlID0gXCIjNjk2XCJcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFJlY3QgMCwgMCxcbiAgICAgICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG4gICAgICAgICAgICBAbWFwLmRyYXdNYXBSZWN0IEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHgsXG4gICAgICAgICAgICAgICAgQHZpZXdQb3J0WCwgQHZpZXdQb3J0WSxcbiAgICAgICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vdmVNYXBEZW1vU2NlbmUiLCJTeXN0ZW0gPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1N5c3RlbS5jb2ZmZWVcIlxuSW5wdXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0lucHV0TWFuYWdlci5jb2ZmZWVcIlxuRW50aXR5TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9FbnRpdHlNYW5hZ2VyLmNvZmZlZVwiXG5cbmNsYXNzIE1hcE1vdmVJbnB1dFN5c3RlbSBleHRlbmRzIFN5c3RlbVxuXG4gICAgb25VcGRhdGU6IChkdCkgLT5cbiAgICAgICAgbW92ZURpc3RhbmNlID0gMyAqIGR0XG5cbiAgICAgICAgZW50aXRpZXMgPSBFbnRpdHlNYW5hZ2VyLmdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZXMgW1wiUG9zaXRpb25cIl1cblxuICAgICAgICBmb3IgZW50aXR5IGluIGVudGl0aWVzXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJQb3NpdGlvblwiXG5cbiAgICAgICAgICAgIGlmIElucHV0TWFuYWdlci5rZXkudXAgdGhlbiBwb3NpdGlvbi55IC09IG1vdmVEaXN0YW5jZVxuICAgICAgICAgICAgaWYgSW5wdXRNYW5hZ2VyLmtleS5kb3duIHRoZW4gcG9zaXRpb24ueSArPSBtb3ZlRGlzdGFuY2VcbiAgICAgICAgICAgIGlmIElucHV0TWFuYWdlci5rZXkubGVmdCB0aGVuIHBvc2l0aW9uLnggLT0gbW92ZURpc3RhbmNlXG4gICAgICAgICAgICBpZiBJbnB1dE1hbmFnZXIua2V5LnJpZ2h0IHRoZW4gcG9zaXRpb24ueCArPSBtb3ZlRGlzdGFuY2VcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gTWFwTW92ZUlucHV0U3lzdGVtIiwiQXNzZXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0Fzc2V0TWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuRW50aXR5TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9FbnRpdHlNYW5hZ2VyLmNvZmZlZVwiXG5cblNjZW5lID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TY2VuZS5jb2ZmZWVcIlxuTWFwID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYXAuY29mZmVlXCJcbkdyYXBoaWNzU3lzdGVtID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TeXN0ZW0vR3JhcGhpY3NTeXN0ZW0uY29mZmVlXCJcbk1hcE1vdmVJbnB1dFN5c3RlID0gcmVxdWlyZSBcIi4vTWFwTW92ZUlucHV0U3lzdGVtLmNvZmZlZVwiXG5cbmNsYXNzIE1vdmVNYXBTbW9vdGhEZW1vU2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGluaXQ6IC0+XG4gICAgICAgIEBtYXBMb2FkZWQgPSBmYWxzZVxuXG4gICAgICAgIEBhZGRTeXN0ZW0gbmV3IE1hcE1vdmVJbnB1dFN5c3RlXG5cbiAgICAgICAgIyBBZGQgZ3JhcGhpY3Mgc3lzdGVtIHRvIGhhbmRsZSByZW5kZXJpbmdcbiAgICAgICAgZ2Z4ID0gQGFkZFN5c3RlbSBuZXcgR3JhcGhpY3NTeXN0ZW1cbiAgICAgICAgZ2Z4LmluaXQgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyXG4gICAgICAgIGdmeC5vbkJlZm9yZURyYXcgPSBAZHJhd01hcC5iaW5kIEBcblxuICAgICAgICBAdmlld3BvcnQgPSB7XG4gICAgICAgICAgICB0eXBlOiBcIlBvc2l0aW9uXCJcbiAgICAgICAgICAgIHg6IDBcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfVxuXG4gICAgICAgIEB2aWV3cG9ydEVudGl0eSA9IEVudGl0eU1hbmFnZXIuY3JlYXRlRW50aXR5IFwidmlld3BvcnRcIiwgZmFsc2VcbiAgICAgICAgRW50aXR5TWFuYWdlci5hZGRDb21wb25lbnQgQHZpZXdwb3J0RW50aXR5LCBAdmlld3BvcnRcblxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIEVudGl0eU1hbmFnZXIuYWRkRW50aXR5IEB2aWV3cG9ydEVudGl0eVxuXG4gICAgICAgICMgTG9hZCB0aGUgbWFwXG4gICAgICAgIEBtYXAgPSBuZXcgTWFwKClcbiAgICAgICAgbG9hZGluZyA9IEBtYXAubG9hZE1hcCBcIi9hc3NldHMvbWFwL3Rlc3QyLmpzb25cIlxuICAgICAgICBsb2FkaW5nLnRoZW4gKCkgPT4gQG1hcExvYWRlZCA9IHRydWVcblxuXG4gICAgZGVhY3RpdmF0ZTogLT4gRW50aXR5TWFuYWdlci5yZW1vdmVFbnRpdHkgQHZpZXdwb3J0RW50aXR5XG5cblxuICAgIGRyYXdNYXA6IChjdHgpIC0+XG4gICAgICAgIGlmIEBtYXBMb2FkZWRcbiAgICAgICAgICAgIEBtYXAuZHJhd01hcFJlY3QgY3R4LFxuICAgICAgICAgICAgICAgIEB2aWV3cG9ydC54LCBAdmlld3BvcnQueSxcbiAgICAgICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG5cbm1vZHVsZS5leHBvcnRzID0gTW92ZU1hcFNtb290aERlbW9TY2VuZSIsIlNjZW5lID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TY2VuZS5jb2ZmZWVcIlxuVXRpbCA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvVXRpbC5jb2ZmZWVcIlxuU2NlbmVNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL1NjZW5lTWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuSW5wdXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0lucHV0TWFuYWdlci5jb2ZmZWVcIlxuQXVkaW9NYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0F1ZGlvTWFuYWdlci5jb2ZmZWVcIlxuQXNzZXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0Fzc2V0TWFuYWdlci5jb2ZmZWVcIlxuXG5jbGFzcyBNZW51U2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGluaXQ6IC0+XG4gICAgICAgIEBtZW51cyA9IHt9XG4gICAgICAgIEBjdHggPSBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4XG4gICAgICAgIEBjbGlja0xpc3RlbmVyID0gQG9uTW91c2VDbGljay5iaW5kIEBcblxuICAgICAgICAjIFNldCB0aGUgY3VycmVudCBtZW51XG4gICAgICAgIEBjdXJyZW50TWVudSA9IFwibWFpblwiXG5cbiAgICAgICAgQXVkaW9NYW5hZ2VyLmxvYWQgXCJtZW51LXNlbGVjdFwiLCBcIi9hc3NldHMvc291bmQvVUkgcGFjayAxL01FTlUgQl9TZWxlY3Qud2F2XCJcbiAgICAgICAgQXVkaW9NYW5hZ2VyLmxvYWQgXCJtZW51LWJhY2tcIiwgXCIvYXNzZXRzL3NvdW5kL1VJIHBhY2sgMS9NRU5VIEJfQmFjay53YXZcIlxuXG4gICAgICAgICMgTG9hZCB0aGUgbWVudXNcbiAgICAgICAgQGxvYWRNZW51IFwiL2Fzc2V0cy9tZW51L21haW4uanNvblwiXG4gICAgICAgIEBsb2FkTWVudSBcIi9hc3NldHMvbWVudS9kZW1vcy5qc29uXCJcblxuXG4gICAgbG9hZE1lbnU6IChtZW51RmlsZSkgLT5cbiAgICAgICAgbWFwID0gVXRpbC5sb2FkSlNPTiBtZW51RmlsZVxuICAgICAgICBtYXAudGhlbiBAcGFyc2VNZW51LmJpbmQgQFxuXG5cbiAgICBwYXJzZU1lbnU6IChtZW51RGF0YSkgLT5cbiAgICAgICAgQG1lbnVzW21lbnVEYXRhLmlkXSA9IHtcbiAgICAgICAgICAgIGlkOiBtZW51RGF0YS5pZFxuICAgICAgICAgICAgYmFja2dyb3VuZDogbWVudURhdGEuYmFja2dyb3VuZFxuICAgICAgICAgICAgZWxlbWVudHM6IFtdXG4gICAgICAgICAgICBidXR0b25zOiBbXVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIGVsZW1lbnQgaW4gbWVudURhdGEuZWxlbWVudHNcblxuICAgICAgICAgICAgaWYgZWxlbWVudC50eXBlID09IFwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBAYWRkQnV0dG9uIG1lbnVEYXRhLmlkLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnRleHQsXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQueCxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC55LFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hY3Rpb25UeXBlLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFjdGlvblxuXG5cbiAgICBhZGRCdXR0b246IChtZW51LCB0ZXh0LCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBhY3Rpb25UeXBlLCBhY3Rpb24pIC0+XG4gICAgICAgIGlmIGFjdGlvblR5cGUgPT0gXCJzd2l0Y2hNZW51XCIgdGhlbiBvbkNsaWNrID0gQHN3aXRjaE1lbnUuYmluZCBALCBhY3Rpb25cbiAgICAgICAgaWYgYWN0aW9uVHlwZSA9PSBcInN3aXRjaFNjZW5lXCIgdGhlbiBvbkNsaWNrID0gQHN3aXRjaFNjZW5lLmJpbmQgQCwgYWN0aW9uXG5cbiAgICAgICAgYnV0dG9uID1cbiAgICAgICAgICAgIHRleHQ6IHRleHRcbiAgICAgICAgICAgIHg6IHhcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgICAgIGNsaWNrOiBvbkNsaWNrXG5cbiAgICAgICAgaWYgbm90IEBtZW51c1ttZW51XSB0aGVuIEBtZW51c1ttZW51XSA9IHt9XG4gICAgICAgIGlmIG5vdCBAbWVudXNbbWVudV0uYnV0dG9ucyB0aGVuIEBtZW51c1ttZW51XS5idXR0b25zID0gW11cbiAgICAgICAgQG1lbnVzW21lbnVdLmJ1dHRvbnMucHVzaCBidXR0b25cblxuICAgIGFjdGl2YXRlOiAtPlxuICAgICAgICBAYmFja2dyb3VuZCA9IEFzc2V0TWFuYWdlci5nZXQgXCJpbWcvYmFja2dyb3VuZC9pbWFnZTZfMC5qcGdcIlxuICAgICAgICBJbnB1dE1hbmFnZXIub25Nb3VzZUNsaWNrID0gQG9uTW91c2VDbGljay5iaW5kIEBcbiAgICAgICAgQGN1cnJlbnRNZW51ID0gXCJtYWluXCJcbiAgICAgICAgQHJlbmRlck1lbnUoKVxuXG4gICAgZGVhY3RpdmF0ZTogLT4gSW5wdXRNYW5hZ2VyLm9uTW91c2VDbGljayA9IG51bGxcblxuICAgIHN3aXRjaE1lbnU6IChuZXdNZW51KSAtPlxuICAgICAgICBpZiBuZXdNZW51ID09IFwibWFpblwiXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIucGxheSBcIm1lbnUtYmFja1wiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5IFwibWVudS1zZWxlY3RcIlxuXG4gICAgICAgIEBjdXJyZW50TWVudSA9IG5ld01lbnVcbiAgICAgICAgQHJlbmRlck1lbnUoKVxuXG4gICAgc3dpdGNoU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXkgXCJtZW51LXNlbGVjdFwiXG4gICAgICAgIFNjZW5lTWFuYWdlci5hY3RpdmF0ZSBzY2VuZVxuXG4gICAgb25Nb3VzZUNsaWNrOiAoZSkgLT5cbiAgICAgICAgYnV0dG9uID0gQGdldEJ1dHRvbkZyb21Qb2ludCBlLngsIGUueVxuICAgICAgICBpZiBidXR0b24gdGhlbiBidXR0b24uY2xpY2soKVxuXG4gICAgZ2V0QnV0dG9uRnJvbVBvaW50OiAoeCwgeSkgLT5cbiAgICAgICAgbWVudSA9IEBtZW51c1tAY3VycmVudE1lbnVdXG4gICAgICAgIGZvciBidXR0b24gaW4gbWVudS5idXR0b25zXG4gICAgICAgICAgICBpZiBAaXNQb2ludEluUmVjdCB4LCB5LCBidXR0b24ueCwgYnV0dG9uLnksIGJ1dHRvbi53aWR0aCwgYnV0dG9uLmhlaWdodFxuICAgICAgICAgICAgICAgIHJldHVybiBidXR0b25cblxuICAgIGlzUG9pbnRJblJlY3Q6ICh4LCB5LCByeCwgcnksIHJ3LCByaCkgLT4gcmV0dXJuIHggPj0gcnggJiYgeCA8PSByeSArIHJ3ICYmIHkgPj0gcnkgJiYgeSA8PSByeSArIHJoXG5cbiAgICByZW5kZXJNZW51OiAtPlxuICAgICAgICBAcmVuZGVyQmFja2dyb3VuZCgpXG4gICAgICAgIG1lbnUgPSBAbWVudXNbQGN1cnJlbnRNZW51XVxuICAgICAgICBmb3IgYnV0dG9uIGluIG1lbnUuYnV0dG9uc1xuICAgICAgICAgICAgQHJlbmRlckJ1dHRvbiBidXR0b25cblxuICAgIHJlbmRlckJhY2tncm91bmQ6IC0+XG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5maWxsSW1hZ2UgQGN0eCwgQGJhY2tncm91bmQsXG4gICAgICAgICAgICBAYmFja2dyb3VuZC53aWR0aCwgQGJhY2tncm91bmQuaGVpZ2h0LFxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aCwgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcblxuICAgIHJlbmRlckJ1dHRvbjogKGJ1dHRvbiwgaG92ZXIgPSBmYWxzZSkgLT5cbiAgICAgICAgQGN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIlxuICAgICAgICBAY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCJcblxuICAgICAgICBpZiBob3ZlclxuICAgICAgICAgICAgQGN0eC5zaGFkb3dCbHVyID0gMjBcbiAgICAgICAgICAgIEBjdHguc2hhZG93Q29sb3IgPSBcInllbGxvd1wiXG5cbiAgICAgICAgQGN0eC5maWxsUmVjdCBidXR0b24ueCwgYnV0dG9uLnksIGJ1dHRvbi53aWR0aCwgYnV0dG9uLmhlaWdodFxuXG4gICAgICAgIEBjdHguc2hhZG93Qmx1ciA9IDAgaWYgaG92ZXJcblxuICAgICAgICBAY3R4LnN0cm9rZVJlY3QgYnV0dG9uLngsIGJ1dHRvbi55LCBidXR0b24ud2lkdGgsIGJ1dHRvbi5oZWlnaHRcblxuICAgICAgICBAY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiXG4gICAgICAgIEBjdHguZm9udCA9IFwiMTJweCBBcmlhbCwgc2Fucy1zZXJpZlwiXG4gICAgICAgIEBjdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIlxuICAgICAgICB0ZXh0U2l6ZSA9IEBjdHgubWVhc3VyZVRleHQgYnV0dG9uLnRleHRcbiAgICAgICAgQGN0eC5maWxsVGV4dCBidXR0b24udGV4dCwgYnV0dG9uLnggKyAxMDAgLSAodGV4dFNpemUud2lkdGggLyAyKSwgYnV0dG9uLnkgKyA3XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNZW51U2NlbmUiLCJTY2VuZSA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU2NlbmUuY29mZmVlXCJcblNjZW5lTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9TY2VuZU1hbmFnZXIuY29mZmVlXCJcbkdyYXBoaWNzTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9HcmFwaGljc01hbmFnZXIuY29mZmVlXCJcbkFzc2V0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9Bc3NldE1hbmFnZXIuY29mZmVlXCJcblxuY2xhc3MgUHJlTG9hZFNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBpbml0OiAtPlxuICAgICAgICBAYmFyID1cbiAgICAgICAgICAgIHg6IChHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoIC8gMikgLSAxMDBcbiAgICAgICAgICAgIHk6IChHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodCAvIDIpIC0gMjBcbiAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgIGhlaWdodDogMjBcblxuICAgICAgICBAYmFyLm1pZGRsZSA9IEBiYXIueCArIChAYmFyLndpZHRoIC8gMilcblxuICAgICAgICBAY3R4ID0gR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eFxuXG5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICAgICAgQGN0eC5maWxsU3R5bGUgPSBcIiMwMDBcIlxuICAgICAgICBAY3R4LmZpbGxSZWN0IDAsIDAsIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGgsIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0XG5cbiAgICAgICAgQHJlbmRlckxvYWRpbmdCYXIgMFxuICAgICAgICBAcmVuZGVyTG9hZGluZ1RleHQgXCJMb2FkaW5nLi4uXCJcblxuICAgICAgICBBc3NldE1hbmFnZXIub25Qcm9ncmVzcyA9IEBvblByb2dyZXNzLmJpbmQgQFxuXG4gICAgICAgIGxvYWRBc3NldCA9IEFzc2V0TWFuYWdlci5sb2FkIFwiYXNzZXRzL2RlbW8tYXNzZXRzLmpzb25cIlxuICAgICAgICBsb2FkQXNzZXQudGhlbiAtPiBTY2VuZU1hbmFnZXIuYWN0aXZhdGUgXCJtZW51XCJcblxuXG4gICAgb25Qcm9ncmVzczogKGFzc2V0LCBncm91cCwgbG9hZGVkLCB0b3RhbCkgLT5cbiAgICAgICAgQGN0eC5maWxsU3R5bGUgPSBcIiMwMDBcIlxuICAgICAgICBAY3R4LmZpbGxSZWN0IDAsIDAsIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGgsIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0XG4gICAgICAgIEByZW5kZXJMb2FkaW5nVGV4dCBcIkxvYWRpbmcgI3tncm91cH0uLi5cIlxuICAgICAgICBAcmVuZGVyTG9hZGluZ0JhciBsb2FkZWQgLyB0b3RhbFxuXG5cbiAgICByZW5kZXJMb2FkaW5nVGV4dDogKHRleHQpIC0+XG4gICAgICAgIEBjdHguZmlsbFN0eWxlID0gXCIjZmZmXCJcbiAgICAgICAgQGN0eC5mb250ID0gXCIxMnB4IEFyaWFsLCBzYW5zLXNlcmlmXCJcbiAgICAgICAgQGN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiXG4gICAgICAgIHRleHRTaXplID0gQGN0eC5tZWFzdXJlVGV4dCB0ZXh0XG4gICAgICAgIEBjdHguZmlsbFRleHQgdGV4dCwgQGJhci5taWRkbGUgLSAodGV4dFNpemUud2lkdGggLyAyKSwgQGJhci55ICsgQGJhci5oZWlnaHQgKyAxMFxuXG5cbiAgICByZW5kZXJMb2FkaW5nQmFyOiAocGVyY2VudCkgLT5cbiAgICAgICAgQGN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIlxuICAgICAgICBAY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmXCJcbiAgICAgICAgQGN0eC5zdHJva2VSZWN0IEBiYXIueCwgQGJhci55LCBAYmFyLndpZHRoLCBAYmFyLmhlaWdodFxuICAgICAgICBAY3R4LmZpbGxSZWN0IEBiYXIueCArIDMsIEBiYXIueSArIDMsIChAYmFyLndpZHRoIC0gNikgKiBwZXJjZW50LCBAYmFyLmhlaWdodCAtIDZcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFByZUxvYWRTY2VuZSIsIkVuZ2luZSA9IHJlcXVpcmUgXCIuLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvRW5naW5lLmNvZmZlZVwiXG5cbkJvb3RTY2VuZSA9IHJlcXVpcmUgXCIuL1N0YXRlL0Jvb3RTY2VuZS5jb2ZmZWVcIlxuXG5cbmdhbWUgPSBuZXcgRW5naW5lXG5nYW1lLnN0YXJ0IG5ldyBCb290U2NlbmUiLCJTY2VuZU1hbmFnZXIgPSByZXF1aXJlIFwiLi9NYW5hZ2VyL1NjZW5lTWFuYWdlci5jb2ZmZWVcIlxuXG5jbGFzcyBFbmdpbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQGxhc3RHYW1lVGljayA9IERhdGUubm93KClcblxuICAgIHN0YXJ0OiAoc2NlbmUpIC0+XG4gICAgICAgIFNjZW5lTWFuYWdlci5hZGQgXCJib290XCIsIHNjZW5lXG4gICAgICAgIHNjZW5lLmluaXQoKVxuICAgICAgICBTY2VuZU1hbmFnZXIuYWN0aXZhdGUgXCJib290XCJcbiAgICAgICAgQG1haW5Mb29wKClcblxuICAgIG1haW5Mb29wOiAtPlxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQG1haW5Mb29wLmJpbmQgQFxuXG4gICAgICAgIEBjdXJyZW50R2FtZVRpY2sgPSBEYXRlLm5vdygpXG4gICAgICAgIEBkZWx0YSA9IEBjdXJyZW50R2FtZVRpY2sgLSBAbGFzdEdhbWVUaWNrXG4gICAgICAgIEBsYXN0R2FtZVRpY2sgPSBAY3VycmVudEdhbWVUaWNrXG5cbiAgICAgICAgQHVwZGF0ZSBAZGVsdGFcbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgIHVwZGF0ZTogKGR0KSAtPlxuICAgICAgICBzY2VuZSA9IFNjZW5lTWFuYWdlci5jdXJyZW50KClcblxuICAgICAgICBmb3Igc3lzdGVtIGluIHNjZW5lLnN5c3RlbXNcbiAgICAgICAgICAgIHN5c3RlbS51cGRhdGUgZHRcbiAgICAgICAgcmV0dXJuIG51bGxcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEVuZ2luZSIsInV1aWQgPSByZXF1aXJlIFwiLi4vdmVuZG9yL25vZGUtdXVpZC91dWlkLmpzXCJcblxuY2xhc3MgRW50aXR5XG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBpZCA9IG51bGxcbiAgICAgICAgQGNvbXBvbmVudHMgPSBbXVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0eSIsIlV0aWwgPSByZXF1aXJlIFwiLi4vVXRpbC5jb2ZmZWVcIlxuXG5jbGFzcyBBc3NldE1hbmFnZXJcbiAgICBAYXNzZXRzID0ge31cbiAgICBAbnVtQXNzZXRzID0gMFxuICAgIEBhc3NldHNMb2FkZWQgPSAwXG5cbiAgICBAbG9hZDogKG1hbmlmZXN0KSAtPlxuICAgICAgICBAbnVtQXNzZXRzID0gMFxuICAgICAgICBAYXNzZXRzTG9hZGVkID0gMFxuXG4gICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSAocmVzb2x2ZSkgLT5cbiAgICAgICAgICAgIGxvYWRNYW5pZmVzdCA9IFV0aWwubG9hZEpTT04gbWFuaWZlc3RcbiAgICAgICAgICAgIGxvYWRNYW5pZmVzdC50aGVuIChqc29uKSAtPlxuICAgICAgICAgICAgICAgIGZvciBpLCBhc3NldEdyb3VwIG9mIGpzb24uYXNzZXRzXG4gICAgICAgICAgICAgICAgICAgIGZvciBhIGluIGFzc2V0R3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5udW1Bc3NldHMrK1xuXG4gICAgICAgICAgICAgICAgZm9yIGdyb3VwTmFtZSwgYXNzZXRHcm91cCBvZiBqc29uLmFzc2V0c1xuICAgICAgICAgICAgICAgICAgICBmb3IgYXNzZXQgaW4gYXNzZXRHcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLm9uQmVmb3JlTG9hZD8gYXNzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5hc3NldHNMb2FkZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLm51bUFzc2V0c1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkbyAoYXNzZXQpIC0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBMb2FkIGJhc2VkIG9uIGZpbGUgdHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIGFzc2V0LnR5cGUgPT0gXCJpbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZCA9IFV0aWwubG9hZEltYWdlIGpzb24ucm9vdCArIGFzc2V0LmZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkLnRoZW4gKGltZykgLT4gQXNzZXRNYW5hZ2VyLmFzc2V0TG9hZGVkIGFzc2V0LCBncm91cE5hbWUsIHJlc29sdmUsIGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgYXNzZXQudHlwZSA9PSBcImpzb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldExvYWQgPSBVdGlsLmxvYWRKU09OIGpzb24ucm9vdCArIGFzc2V0LmZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkLnRoZW4gKGpzb24pIC0+IEFzc2V0TWFuYWdlci5hc3NldExvYWRlZCBhc3NldCwgZ3JvdXBOYW1lLCByZXNvbHZlLCBqc29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldExvYWQgPSBVdGlsLmxvYWQganNvbi5yb290ICsgYXNzZXQuZmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldExvYWQudGhlbiAtPiBBc3NldE1hbmFnZXIuYXNzZXRMb2FkZWQgYXNzZXQsIGdyb3VwTmFtZSwgcmVzb2x2ZVxuICNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldExvYWQuY2F0Y2ggLT4gQXNzZXRNYW5hZ2VyLm9uRXJyb3IgYXNzZXQsIGdyb3VwTmFtZVxuXG4gICAgICAgIHJldHVybiBwcm9taXNlXG5cbiAgICBAYXNzZXRMb2FkZWQ6IChhc3NldCwgZ3JvdXBOYW1lLCByZXNvbHZlLCBkYXRhKSAtPlxuICAgICAgICBpZiBkYXRhIHRoZW4gQXNzZXRNYW5hZ2VyLmFzc2V0c1thc3NldC5maWxlXSA9IGRhdGFcbiAgICAgICAgQXNzZXRNYW5hZ2VyLmFzc2V0c0xvYWRlZCsrXG4gICAgICAgIEFzc2V0TWFuYWdlci5vblByb2dyZXNzPyBhc3NldCxcbiAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgIEFzc2V0TWFuYWdlci5hc3NldHNMb2FkZWQsXG4gICAgICAgICAgICBBc3NldE1hbmFnZXIubnVtQXNzZXRzXG5cbiAgICAgICAgaWYgQXNzZXRNYW5hZ2VyLmFzc2V0c0xvYWRlZCBpcyBBc3NldE1hbmFnZXIubnVtQXNzZXRzXG4gICAgICAgICAgICBBc3NldE1hbmFnZXIub25Mb2FkZWQ/KClcbiAgICAgICAgICAgIHJlc29sdmUoKVxuXG4gICAgQG9uQmVmb3JlTG9hZDogKGFzc2V0LCBncm91cCwgbG9hZGVkLCB0b3RhbCkgLT4gIyBVc2VyIGxldmVsIGhvb2tcbiAgICBAb25Qcm9ncmVzczogKGFzc2V0LCBncm91cCwgbG9hZGVkLCB0b3RhbCkgLT4gIyBVc2VyIGxldmVsIGhvb2tcbiAgICBAb25FcnJvcjogKGFzc2V0LCBncm91cCkgLT4gIyBVc2VyIGxldmVsIGhvb2tcbiAgICBAb25Mb2FkZWQ6IC0+ICMgVXNlciBsZXZlbCBob29rXG5cbiAgICBAZ2V0OiAoYXNzZXQpIC0+IEFzc2V0TWFuYWdlci5hc3NldHNbYXNzZXRdXG5cblxubW9kdWxlLmV4cG9ydHMgPSBBc3NldE1hbmFnZXIiLCJjbGFzcyBBdWRpb01hbmFnZXJcbiAgICBAc291bmRzOiB7fVxuXG4gICAgQGxvYWQ6IChpZCwgYXVkaW9GaWxlKSAtPlxuICAgICAgICBzb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJhdWRpb1wiXG4gICAgICAgIHNvdW5kLnNyYyA9IGF1ZGlvRmlsZVxuICAgICAgICBBdWRpb01hbmFnZXIuc291bmRzW2lkXSA9IHNvdW5kXG5cbiAgICBAcGxheTogKGlkKSAtPlxuICAgICAgICBzb3VuZCA9IEF1ZGlvTWFuYWdlci5zb3VuZHNbaWRdXG4gICAgICAgIGlmIHNvdW5kXG4gICAgICAgICAgICBzb3VuZC5wYXVzZSgpXG4gICAgICAgICAgICBzb3VuZC5jdXJyZW50VGltZSA9IDBcbiAgICAgICAgICAgIHNvdW5kLnBsYXkoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvTWFuYWdlciIsInV1aWQgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL25vZGUtdXVpZC91dWlkLmpzXCJcbkVudGl0eSA9IHJlcXVpcmUgXCIuLi9FbnRpdHkuY29mZmVlXCJcblxuY2xhc3MgRW50aXR5TWFuYWdlclxuICAgIEBlbnRpdGllcyA9IFtdXG5cbiAgICBAY3JlYXRlRW50aXR5OiAoaWQsIGFkZFRvTGlzdCA9IHRydWUpIC0+XG4gICAgICAgIGlkID89IHV1aWQudjEoKVxuICAgICAgICBlbnRpdHkgPSBuZXcgRW50aXR5XG4gICAgICAgIGVudGl0eS5pZCA9IGlkXG4gICAgICAgIEBhZGRFbnRpdHkgZW50aXR5IGlmIGFkZFRvTGlzdFxuICAgICAgICByZXR1cm4gZW50aXR5XG5cbiAgICBAYWRkRW50aXR5OiAoZW50aXR5KSAtPiBAZW50aXRpZXMucHVzaCBlbnRpdHlcblxuICAgIEByZW1vdmVFbnRpdHk6IChlbnRpdHkpIC0+XG4gICAgICAgICMgRmluZCB0aGUgaW5kZXggb2YgdGhlIGVudGl0eSBpbiB0aGUgbGlzdFxuICAgICAgICBpbmRleCA9IC0xXG4gICAgICAgIGZvciBlLCBpIGluIEBlbnRpdGllc1xuICAgICAgICAgICAgaWYgZSA9PSBlbnRpdHkgdGhlbiBpbmRleCA9IGlcblxuICAgICAgICAjIFJlbW92ZSBmcm9tIGVudGl0eSBsaXN0XG4gICAgICAgIEBlbnRpdGllcy5zcGxpY2UoaW5kZXgsIDEpXG5cbiAgICAgICAgcmV0dXJuIGVudGl0eVxuXG4gICAgQGRlbGV0ZUVudGl0eTogKGVudGl0eSkgLT5cbiAgICAgICAgZW50aXR5LnJlbW92ZUFsbENvbXBvbmVudHMoKVxuICAgICAgICBAcmVtb3ZlRW50aXR5IGVudGl0eVxuXG4gICAgQGdldEVudGl0eUJ5SWQ6IC0+XG4gICAgQGdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZTogLT5cblxuICAgIEBnZXRBbGxFbnRpdGllc1dpdGhDb21wb25lbnRPZlR5cGVzOiAoY29tcG9uZW50VHlwZXMpIC0+XG4gICAgICAgIGVudGl0aWVzID0gW11cbiAgICAgICAgZm9yIGVudGl0eSBpbiBAZW50aXRpZXNcbiAgICAgICAgICAgIGNvbXBvbmVudENvdW50ID0gMFxuICAgICAgICAgICAgZm9yIGNvbXBvbmVudCBpbiBlbnRpdHkuY29tcG9uZW50c1xuICAgICAgICAgICAgICAgIGlmIGNvbXBvbmVudFR5cGVzLmluZGV4T2YoY29tcG9uZW50LnR5cGUpID4gLTEgdGhlbiBjb21wb25lbnRDb3VudCsrXG4gICAgICAgICAgICBpZiBjb21wb25lbnRDb3VudCA9PSBjb21wb25lbnRUeXBlcy5sZW5ndGggdGhlbiBlbnRpdGllcy5wdXNoIGVudGl0eVxuICAgICAgICByZXR1cm4gZW50aXRpZXNcblxuICAgIEBhZGRDb21wb25lbnQ6IChlbnRpdHksIGNvbXBvbmVudCkgLT4gZW50aXR5LmNvbXBvbmVudHMucHVzaCBjb21wb25lbnRcblxuICAgIEBoYXNDb21wb25lbnQ6IC0+XG5cbiAgICBAZ2V0Q29tcG9uZW50T2ZUeXBlOiAoZW50aXR5LCBjb21wb25lbnRUeXBlKSAtPlxuICAgICAgICBmb3IgY29tcG9uZW50IGluIGVudGl0eS5jb21wb25lbnRzXG4gICAgICAgICAgICBpZiBjb21wb25lbnQudHlwZSA9PSBjb21wb25lbnRUeXBlIHRoZW4gcmV0dXJuIGNvbXBvbmVudFxuICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgQHJlbW92ZUFsbENvbXBvbmVudHM6IChlbnRpdHkpIC0+IGVudGl0eS5jb21wb25lbnRzLmxlbmd0aCA9IDBcblxuXG4jICAgIGdldENvbXBvbmVudE9mVHlwZTogKGVudGl0eSwgY29tcG9uZW50VHlwZSkgLT4gXy5maW5kIGVudGl0eS5jb21wb25lbnRzLCAoYykgLT4gYy50eXBlID09IGNvbXBvbmVudFR5cGVcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0eU1hbmFnZXIiLCJjbGFzcyBHcmFwaGljc01hbmFnZXJcblxuICAgIEBjcmVhdGVDYW52YXM6ICh3aWR0aCwgaGVpZ2h0LCBhcHBlbmRUbykgLT5cbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImNhbnZhc1wiXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHRcblxuICAgICAgICBpZiBhcHBlbmRUbyB0aGVuIGFwcGVuZFRvLmFwcGVuZENoaWxkIGNhbnZhc1xuXG4gICAgICAgIHJldHVybiBjYW52YXNcblxuXG4gICAgQGNyZWF0ZVJlbmRlcmVyOiAod2lkdGgsIGhlaWdodCwgYXBwZW5kVG8pIC0+XG4gICAgICAgIHJlbmRlcmVyID0ge31cbiAgICAgICAgcmVuZGVyZXIuY2FudmFzID0gR3JhcGhpY3NNYW5hZ2VyLmNyZWF0ZUNhbnZhcyB3aWR0aCwgaGVpZ2h0LCBhcHBlbmRUb1xuICAgICAgICByZW5kZXJlci5jdHggPSByZW5kZXJlci5jYW52YXMuZ2V0Q29udGV4dCBcIjJkXCJcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyXG5cblxuICAgIEBmaWxsSW1hZ2U6IChjdHgsIGltYWdlLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgZGVzdGluYXRpb25XaWR0aCwgZGVzdGluYXRpb25IZWlnaHQpIC0+XG4gICAgICAgIHJhdGlvSW1hZ2UgPSBpbWFnZVdpZHRoIC8gaW1hZ2VIZWlnaHRcbiAgICAgICAgcmF0aW9EZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uV2lkdGggLyBkZXN0aW5hdGlvbkhlaWdodFxuXG4gICAgICAgIHdpZHRoID0gZGVzdGluYXRpb25XaWR0aFxuICAgICAgICBoZWlnaHQgPSBkZXN0aW5hdGlvbkhlaWdodFxuXG4gICAgICAgIGlmIHJhdGlvRGVzdGluYXRpb24gPiByYXRpb0ltYWdlXG4gICAgICAgICAgICBoZWlnaHQgPSBkZXN0aW5hdGlvbldpZHRoIC8gcmF0aW9JbWFnZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3aWR0aCA9IGRlc3RpbmF0aW9uSGVpZ2h0ICogcmF0aW9JbWFnZVxuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UgaW1hZ2UsIDAsIDAsIGltYWdlV2lkdGgsIGltYWdlSGVpZ2h0LCAwLCAwLCB3aWR0aCwgaGVpZ2h0XG5cblxuICAgIEBmaXRJbWFnZTogKGN0eCwgaW1hZ2UsIGltYWdlV2lkdGgsIGltYWdlSGVpZ2h0LCBkZXN0aW5hdGlvbldpZHRoLCBkZXN0aW5hdGlvbkhlaWdodCkgLT5cbiAgICAgICAgcmF0aW9JbWFnZSA9IGltYWdlV2lkdGggLyBpbWFnZUhlaWdodFxuICAgICAgICByYXRpb0Rlc3RpbmF0aW9uID0gZGVzdGluYXRpb25XaWR0aCAvIGRlc3RpbmF0aW9uSGVpZ2h0XG5cbiAgICAgICAgd2lkdGggPSBkZXN0aW5hdGlvbldpZHRoXG4gICAgICAgIGhlaWdodCA9IGRlc3RpbmF0aW9uSGVpZ2h0XG5cbiAgICAgICAgaWYgcmF0aW9EZXN0aW5hdGlvbiA+IHJhdGlvSW1hZ2VcbiAgICAgICAgICAgIHdpZHRoID0gaW1hZ2VXaWR0aCAqIGRlc3RpbmF0aW9uSGVpZ2h0IC8gaW1hZ2VIZWlnaHRcbiAgICAgICAgICAgIGhlaWdodCA9IGRlc3RpbmF0aW9uSGVpZ2h0XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHdpZHRoID0gZGVzdGluYXRpb25XaWR0aFxuICAgICAgICAgICAgaGVpZ2h0ID0gaW1hZ2VIZWlnaHQgKiBkZXN0aW5hdGlvbldpZHRoIC8gaW1hZ2VXaWR0aFxuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UgaW1hZ2UsIDAsIDAsIGltYWdlV2lkdGgsIGltYWdlSGVpZ2h0LCAwLCAwLCB3aWR0aCwgaGVpZ2h0XG5cblxubW9kdWxlLmV4cG9ydHMgPSBHcmFwaGljc01hbmFnZXIiLCJjbGFzcyBJbnB1dE1hbmFnZXJcbiAgICBAbW91c2U6XG4gICAgICAgIHg6IDBcbiAgICAgICAgeTogMFxuXG4gICAgQGtleTpcbiAgICAgICAgdXA6IGZhbHNlXG4gICAgICAgIGRvd246IGZhbHNlXG4gICAgICAgIGxlZnQ6IGZhbHNlXG4gICAgICAgIHJpZ2h0OiBmYWxzZVxuXG4gICAgQGluaXQ6IC0+XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCBJbnB1dE1hbmFnZXIubW91c2VDbGlja1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyIFwibW91c2Vtb3ZlXCIsIElucHV0TWFuYWdlci5tb3VzZU1vdmVcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleXVwXCIsIElucHV0TWFuYWdlci5rZXlVcFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyIFwia2V5ZG93blwiLCBJbnB1dE1hbmFnZXIua2V5RG93blxuXG4gICAgQG1vdXNlQ2xpY2s6IChlKSAtPiBJbnB1dE1hbmFnZXIub25Nb3VzZUNsaWNrPyBlXG5cbiAgICBAbW91c2VNb3ZlOiAoZSkgLT5cbiAgICAgICAgSW5wdXRNYW5hZ2VyLm1vdXNlLnggPSBlLnhcbiAgICAgICAgSW5wdXRNYW5hZ2VyLm1vdXNlLnkgPSBlLnlcbiAgICAgICAgSW5wdXRNYW5hZ2VyLm9uTW91c2VNb3ZlPyBlXG5cbiAgICBAa2V5VXA6IChlKSAtPlxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzggdGhlbiBJbnB1dE1hbmFnZXIua2V5LnVwID0gZmFsc2VcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDQwIHRoZW4gSW5wdXRNYW5hZ2VyLmtleS5kb3duID0gZmFsc2VcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM3IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS5sZWZ0ID0gZmFsc2VcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM5IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS5yaWdodCA9IGZhbHNlXG5cbiAgICAgICAgSW5wdXRNYW5hZ2VyLm9uS2V5VXA/IGVcblxuICAgIEBrZXlEb3duOiAoZSkgLT5cbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM4IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS51cCA9IHRydWVcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDQwIHRoZW4gSW5wdXRNYW5hZ2VyLmtleS5kb3duID0gdHJ1ZVxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzcgdGhlbiBJbnB1dE1hbmFnZXIua2V5LmxlZnQgPSB0cnVlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzOSB0aGVuIElucHV0TWFuYWdlci5rZXkucmlnaHQgPSB0cnVlXG5cbiAgICAgICAgSW5wdXRNYW5hZ2VyLm9uS2V5RG93bj8gZVxuXG4gICAgQG9uTW91c2VDbGljazogKGUpIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uTW91c2VNb3ZlOiAoZSkgLT4gIyBVc2VyIGxldmVsIGhvb2tcbiAgICBAb25LZXlVcDogKGUpIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uS2V5RG93bjogKGUpIC0+ICMgVXNlciBsZXZlbCBob29rXG5cblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dE1hbmFnZXJcbiIsImNsYXNzIFNjZW5lTWFuYWdlclxuICAgIEBjdXJyZW50U2NlbmU6IFwiYm9vdFwiXG4gICAgQHNjZW5lczoge31cblxuICAgIEBhZGQ6IChuYW1lLCBzY2VuZSkgLT5cbiAgICAgICAgU2NlbmVNYW5hZ2VyLnNjZW5lc1tuYW1lXSA9IHNjZW5lXG4gICAgICAgIHJldHVybiBudWxsXG5cbiAgICBAY3VycmVudDogLT4gU2NlbmVNYW5hZ2VyLnNjZW5lc1tTY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lXVxuXG4gICAgQGFjdGl2YXRlOiAobmFtZSkgLT5cbiAgICAgICAgb2xkID0gU2NlbmVNYW5hZ2VyLmN1cnJlbnQoKVxuICAgICAgICBvbGQuZGVhY3RpdmF0ZSgpIGlmIG9sZFxuICAgICAgICBTY2VuZU1hbmFnZXIuY3VycmVudFNjZW5lID0gbmFtZVxuICAgICAgICBTY2VuZU1hbmFnZXIub25BY3RpdmF0ZSBuYW1lXG4gICAgICAgIFNjZW5lTWFuYWdlci5jdXJyZW50KCk/LmFjdGl2YXRlKClcbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgIEBvbkFjdGl2YXRlOiAobmFtZSkgLT4gIyBVc2VyIGxldmVsIGhvb2tcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lTWFuYWdlciIsIlV0aWwgPSByZXF1aXJlIFwiLi9VdGlsLmNvZmZlZVwiXG5cbmNsYXNzIE1hcFxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAd2lkdGggPSAwXG4gICAgICAgIEBoZWlnaHQgPSAwXG4gICAgICAgIEB0aWxlV2lkdGggPSAwXG4gICAgICAgIEB0aWxlSGVpZ2h0ID0gMFxuICAgICAgICBAbGF5ZXJzID0gW11cbiAgICAgICAgQHRpbGVTZXRzID0gW11cblxuXG4gICAgbG9hZE1hcDogKG1hcEZpbGUpIC0+XG4gICAgICAgIG1hcCA9IFV0aWwubG9hZEpTT04gbWFwRmlsZVxuICAgICAgICBtYXAudGhlbiBAcGFyc2VNYXAuYmluZCBAXG5cblxuICAgIHBhcnNlTWFwOiAobWFwRGF0YSkgLT5cbiAgICAgICAgQHdpZHRoID0gbWFwRGF0YS53aWR0aFxuICAgICAgICBAaGVpZ2h0ID0gbWFwRGF0YS5oZWlnaHRcbiAgICAgICAgQHRpbGVXaWR0aCA9IG1hcERhdGEudGlsZXdpZHRoXG4gICAgICAgIEB0aWxlSGVpZ2h0ID0gbWFwRGF0YS50aWxlaGVpZ2h0XG5cbiAgICAgICAgQHBhcnNlTGF5ZXIgbGF5ZXIgZm9yIGxheWVyIGluIG1hcERhdGEubGF5ZXJzXG4gICAgICAgIEBwYXJzZVRpbGVTZXQgdGlsZVNldCBmb3IgdGlsZVNldCBpbiBtYXBEYXRhLnRpbGVzZXRzXG5cbiAgICAgICAgIyBMb2FkIHRoZSBpbWFnZSBhc3NldHNcbiAgICAgICAgbG9hZFByb21pc2VzID0gW11cbiAgICAgICAgZm9yIHRpbGVTZXQgaW4gQHRpbGVTZXRzXG4gICAgICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgLT5cbiAgICAgICAgICAgICAgICB0aWxlU2V0LmltZyA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICAgICAgIyBOb3RlIHRoZSBwYXRoIGlzIGhhcmQgY29kZWQgYW5kIHNob3VsZCBwcm9iYWJseSBiZSBiYXNlZCBvbiB0aGUgbG9jYXRpb24gb2YgdGhlIG1hcFxuICAgICAgICAgICAgICAgIHRpbGVTZXQuaW1nLnNyYyA9IFwiL2Fzc2V0cy9tYXAvXCIgKyB0aWxlU2V0LnNyY1xuICAgICAgICAgICAgICAgIHRpbGVTZXQuaW1nLm9ubG9hZCA9IC0+IHJlc29sdmUoKVxuICAgICAgICAgICAgICAgIHRpbGVTZXQuaW1nLm9uZXJyb3IgPSAtPiByZWplY3QoKVxuICAgICAgICAgICAgbG9hZFByb21pc2VzLnB1c2ggcHJvbWlzZVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbCBsb2FkUHJvbWlzZXNcblxuXG4gICAgcGFyc2VMYXllcjogKGxheWVyRGF0YSkgLT5cbiAgICAgICAgIyBDdXJyZW50bHkgb25seSBkZWFsIHdpdGggdGlsZSBsYXllcnNcbiAgICAgICAgaWYgbGF5ZXJEYXRhLnR5cGUgIT0gXCJ0aWxlbGF5ZXJcIiB0aGVuIHJldHVyblxuXG4gICAgICAgIGxheWVyID1cbiAgICAgICAgICAgIG5hbWU6IGxheWVyRGF0YS5uYW1lXG4gICAgICAgICAgICBkYXRhOiBbXVxuXG4gICAgICAgICMgQ29weSB0aGUgdGlsZSBudW1iZXIgdG8gdGhlIGxheWVyXG4gICAgICAgIGZvciB5IGluIFswLi5AaGVpZ2h0IC0gMV1cbiAgICAgICAgICAgIGxheWVyLmRhdGFbeV0gPSBbXVxuICAgICAgICAgICAgZm9yIHggaW4gWzAuLkB3aWR0aCAtIDFdXG4gICAgICAgICAgICAgICAgbGF5ZXIuZGF0YVt5XVt4XSA9IGxheWVyRGF0YS5kYXRhWyh5ICogQHdpZHRoKSArIHhdXG5cbiAgICAgICAgQGxheWVycy5wdXNoIGxheWVyXG5cblxuICAgIHBhcnNlVGlsZVNldDogKHRpbGVTZXREYXRhKSAtPlxuICAgICAgICB0aWxlU2V0ID1cbiAgICAgICAgICAgIGltYWdlV2lkdGg6IHRpbGVTZXREYXRhLmltYWdld2lkdGhcbiAgICAgICAgICAgIGltYWdlSGVpZ2h0OiB0aWxlU2V0RGF0YS5pbWFnZWhlaWdodFxuICAgICAgICAgICAgdGlsZVdpZHRoOiB0aWxlU2V0RGF0YS50aWxld2lkdGhcbiAgICAgICAgICAgIHRpbGVIZWlnaHQ6IHRpbGVTZXREYXRhLnRpbGVoZWlnaHRcbiAgICAgICAgICAgIGZpcnN0R2lkOiB0aWxlU2V0RGF0YS5maXJzdGdpZFxuICAgICAgICAgICAgc3JjOiB0aWxlU2V0RGF0YS5pbWFnZVxuXG4gICAgICAgIHRpbGVTZXQubGFzdEdpZCA9IHRpbGVTZXQuZmlyc3RHaWQgK1xuICAgICAgICAgICAgKCh0aWxlU2V0LmltYWdlV2lkdGggKiB0aWxlU2V0LmltYWdlSGVpZ2h0KSAvICh0aWxlU2V0LnRpbGVXaWR0aCAqIHRpbGVTZXQudGlsZUhlaWdodCkpXG5cbiAgICAgICAgdGlsZVNldC5udW1YVGlsZXMgPSBNYXRoLmZsb29yIHRpbGVTZXQuaW1hZ2VXaWR0aCAvIHRpbGVTZXQudGlsZVdpZHRoXG4gICAgICAgIHRpbGVTZXQubnVtWVRpbGVzID0gTWF0aC5mbG9vciB0aWxlU2V0LmltYWdlSGVpZ2h0IC8gdGlsZVNldC50aWxlSGVpZ2h0XG5cbiAgICAgICAgQHRpbGVTZXRzLnB1c2ggdGlsZVNldFxuXG5cbiAgICBkcmF3VGlsZTogKGN0eCwgeCwgeSwgdHcsIHRoLCB0aWxlTnVtYmVyLCB0aWxlU2V0LCBvZmZzZXRYID0gMCwgb2Zmc2V0WSA9IDApIC0+XG4gICAgICAgICMgRmluZCB0aGUgc3JjWCAmIHNyY1kgaW4gdGhlIGltYWdlIC0gcmV2ZXJzZSAoeCAqIHkpICsgeCA9IG5cbiAgICAgICAgc3JjWCA9IE1hdGguZmxvb3IodGlsZU51bWJlciAlIHRpbGVTZXQubnVtWFRpbGVzKSAqIHRpbGVTZXQudGlsZVdpZHRoXG4gICAgICAgIHNyY1kgPSBNYXRoLmZsb29yKHRpbGVOdW1iZXIgLyB0aWxlU2V0Lm51bVhUaWxlcykgKiB0aWxlU2V0LnRpbGVIZWlnaHRcblxuICAgICAgICBjdHguZHJhd0ltYWdlIHRpbGVTZXQuaW1nLFxuICAgICAgICAgICAgc3JjWCwgc3JjWSxcbiAgICAgICAgICAgIHRpbGVTZXQudGlsZVdpZHRoLCB0aWxlU2V0LnRpbGVIZWlnaHQsXG4gICAgICAgICAgICAoeCAqIHRpbGVTZXQudGlsZVdpZHRoKSArIG9mZnNldFgsICh5ICogdGlsZVNldC50aWxlSGVpZ2h0KSArIG9mZnNldFksXG4gICAgICAgICAgICB0aWxlU2V0LnRpbGVXaWR0aCwgdGlsZVNldC50aWxlSGVpZ2h0XG5cblxuICAgIGRyYXdUaWxlRnJvbU51bWJlcjogKGN0eCwgeCwgeSwgdHcsIHRoLCB0aWxlTnVtYmVyLCBvZmZzZXRYID0gMCwgb2Zmc2V0WSA9IDApIC0+XG4gICAgICAgICMgRmluZCBvdXQgd2hhdCB0aWxlIHNldCB3ZSBhcmUgaW5cbiAgICAgICAgdGlsZVNldCA9IEBnZXRUaWxlU2V0T2ZUaWxlIHRpbGVOdW1iZXJcblxuICAgICAgICBpZiB0aWxlU2V0XG4gICAgICAgICAgICB0aWxlTnVtYmVyID0gdGlsZU51bWJlciAtIHRpbGVTZXQuZmlyc3RHaWRcbiAgICAgICAgICAgIEBkcmF3VGlsZSBjdHgsIHgsIHksIEB0aWxlV2lkdGgsIEB0aWxlSGVpZ2h0LCB0aWxlTnVtYmVyLCB0aWxlU2V0LCBvZmZzZXRYLCBvZmZzZXRZXG5cblxuICAgIGdldFRpbGVTZXRPZlRpbGU6ICh0aWxlTnVtYmVyKSAtPlxuICAgICAgICBmb3Igc2V0IGluIEB0aWxlU2V0c1xuICAgICAgICAgICAgaWYgKHRpbGVOdW1iZXIgPj0gc2V0LmZpcnN0R2lkKSAmJiAodGlsZU51bWJlciA8PSBzZXQubGFzdEdpZClcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0XG4gICAgICAgIHJldHVybiBmYWxzZVxuXG5cbiAgICBkcmF3TWFwOiAoY3R4KSAtPlxuICAgICAgICBmb3IgbGF5ZXIgaW4gWzAuLkBsYXllcnMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgIGZvciB5IGluIFswLi5AaGVpZ2h0IC0gMV1cbiAgICAgICAgICAgICAgICBmb3IgeCBpbiBbMC4uQHdpZHRoIC0gMV1cbiAgICAgICAgICAgICAgICAgICAgQGRyYXdUaWxlRnJvbU51bWJlciBjdHgsIHgsIHksIEB0aWxlV2lkdGgsIEB0aWxlSGVpZ2h0LCBAbGF5ZXJzW2xheWVyXS5kYXRhW3ldW3hdXG5cblxuICAgIGRyYXdNYXBSZWN0OiAoY3R4LCB4LCB5LCB3LCBoKSAtPlxuICAgICAgICAjIE9ubHkgZHJhd3MgYSByZWdpb24gb2YgdGhlIG1hcCwgZnJvbSBwaXhlbCB4LHkgb2YgcGl4ZWwgc2l6ZSB3LGhcbiAgICAgICAgbGVmdFRpbGUgPSBNYXRoLmZsb29yIHggLyBAdGlsZVdpZHRoXG4gICAgICAgIHJpZ2h0VGlsZSA9IE1hdGguY2VpbCAoeCArIHcpIC8gQHRpbGVXaWR0aFxuICAgICAgICB0b3BUaWxlID0gTWF0aC5mbG9vciB5IC8gQHRpbGVIZWlnaHRcbiAgICAgICAgYm90dG9tVGlsZSA9IE1hdGguY2VpbCAoeSArIGgpIC8gQHRpbGVIZWlnaHRcblxuICAgICAgICBpZiBsZWZ0VGlsZSA8IDAgdGhlbiBsZWZ0VGlsZSA9IDBcbiAgICAgICAgaWYgdG9wVGlsZSA8IDAgdGhlbiB0b3BUaWxlID0gMFxuICAgICAgICBpZiByaWdodFRpbGUgPj0gQHdpZHRoIHRoZW4gcmlnaHRUaWxlID0gQHdpZHRoIC0gMVxuICAgICAgICBpZiBib3R0b21UaWxlID49IEBoZWlnaHQgdGhlbiBib3R0b21UaWxlID0gQGhlaWdodCAtIDFcblxuICAgICAgICB4T2Zmc2V0ID0gMCAtIHhcbiAgICAgICAgeU9mZnNldCA9IDAgLSB5XG5cbiAgICAgICAgZm9yIGxheWVyIGluIFswLi5AbGF5ZXJzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICBmb3IgeSBpbiBbdG9wVGlsZS4uYm90dG9tVGlsZV1cbiAgICAgICAgICAgICAgICBmb3IgeCBpbiBbbGVmdFRpbGUuLnJpZ2h0VGlsZV1cbiAgICAgICAgICAgICAgICAgICAgQGRyYXdUaWxlRnJvbU51bWJlciBjdHgsIHgsIHksIEB0aWxlV2lkdGgsIEB0aWxlSGVpZ2h0LCBAbGF5ZXJzW2xheWVyXS5kYXRhW3ldW3hdLCB4T2Zmc2V0LCB5T2Zmc2V0XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXAiLCJjbGFzcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAc3lzdGVtcyA9IFtdXG5cbiAgICBhZGRTeXN0ZW06IChzeXN0ZW0pIC0+XG4gICAgICAgIEBzeXN0ZW1zLnB1c2ggc3lzdGVtXG4gICAgICAgIHJldHVybiBzeXN0ZW1cblxuICAgIGluaXQ6IC0+XG4gICAgYWN0aXZhdGU6IC0+XG4gICAgZGVhY3RpdmF0ZTogLT5cblxubW9kdWxlLmV4cG9ydHMgPSBTY2VuZSIsImNsYXNzIFN5c3RlbVxuICAgIFRIUk9UVExFX1ZBTFVFOiAwXG5cbiAgICBjb25zdHJ1Y3RvcjogLT4gQHRpbWVTaW5jZVVwZGF0ZSA9IDBcblxuICAgIGluaXQ6IC0+XG5cbiAgICB1cGRhdGU6IChkdCkgLT5cbiAgICAgICAgQHRpbWVTaW5jZVVwZGF0ZSArPSBkdFxuXG4gICAgICAgIGlmIEB0aW1lU2luY2VVcGRhdGUgPj0gQFRIUk9UVExFX1ZBTFVFXG4gICAgICAgICAgICBAb25VcGRhdGUgQHRpbWVTaW5jZVVwZGF0ZVxuICAgICAgICAgICAgQHRpbWVTaW5jZVVwZGF0ZSA9IDBcblxuICAgICAgICByZXR1cm4gQHRpbWVTaW5jZVVwZGF0ZVxuXG4gICAgb25VcGRhdGU6IChkdCkgLT5cblxubW9kdWxlLmV4cG9ydHMgPSBTeXN0ZW0iLCJTeXN0ZW0gPSByZXF1aXJlIFwiLi4vU3lzdGVtLmNvZmZlZVwiXG5FbnRpdHlNYW5hZ2VyID0gcmVxdWlyZSBcIi4uL01hbmFnZXIvRW50aXR5TWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5cbmNsYXNzIEdyYXBoaWNzU3lzdGVtIGV4dGVuZHMgU3lzdGVtXG4gICAgVEhST1RUTEVfVkFMVUU6IDE2XG5cbiAgICBpbml0OiAoQHJlbmRlcmVyKSAtPlxuICAgICAgICBAdmlld3BvcnRYID0gMFxuICAgICAgICBAdmlld3BvcnRZID0gMFxuXG4jICAgICAgICBAYnVmZmVyID0gR3JhcGhpY3NNYW5hZ2VyLmNyZWF0ZVJlbmRlcmVyIEB3aWR0aCwgQGhlaWdodFxuXG4gICAgb25CZWZvcmVEcmF3OiAoY3R4LCBkdCkgLT5cbiAgICBvbkFmdGVyRHJhdzogKGN0eCwgZHQpIC0+XG5cbiAgICBvblVwZGF0ZTogKGR0KSAtPlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmNsZWFyUmVjdCAwLCAwLCBAcmVuZGVyZXIuY2FudmFzLndpZHRoLCBAcmVuZGVyZXIuY2FudmFzLmhlaWdodFxuICAgICAgICBAb25CZWZvcmVEcmF3IEByZW5kZXJlci5jdHgsIGR0XG4jICAgICAgICBAb25CZWZvcmVEcmF3IEBidWZmZXIuY3R4LCBkdFxuXG4gICAgICAgIEBkcmF3UmVjdHMoKVxuICAgICAgICBAZHJhd0ltYWdlcygpXG4gICAgICAgIEBkcmF3VGV4dHMoKVxuXG4gICAgICAgIEBvbkFmdGVyRHJhdyBAcmVuZGVyZXIuY3R4LCBkdFxuIyAgICAgICAgQG9uQWZ0ZXJEcmF3IEBidWZmZXIuY3R4LCBkdFxuXG4gICAgICAgICMgRHJhdyBjb3B5IHRoZSBidWZmZXIgdG8gbWFpbiByZW5kZXJlclxuIyAgICAgICAgQHJlbmRlcmVyLmN0eC5jbGVhclJlY3QgMCwgMCwgQHdpZHRoLCBAaGVpZ2h0XG4jICAgICAgICBAcmVuZGVyZXIuY3R4LmRyYXdJbWFnZSBAYnVmZmVyLmNhbnZhcywgMCwgMFxuIyAgICAgICAgQGJ1ZmZlci5jdHguY2xlYXJSZWN0IDAsIDAsIEB3aWR0aCwgQGhlaWdodFxuXG4gICAgZHJhd1JlY3RzOiAtPlxuICAgICAgICByZWN0RW50aXRpZXMgPSBFbnRpdHlNYW5hZ2VyLmdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZXMgW1wiUmVuZGVyYWJsZVJlY3RcIiwgXCJQb3NpdGlvblwiXVxuICAgICAgICBmb3IgZW50aXR5IGluIHJlY3RFbnRpdGllc1xuICAgICAgICAgICAgcmVjdCA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJSZW5kZXJhYmxlUmVjdFwiXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJQb3NpdGlvblwiXG4gICAgICAgICAgICBAYnVmZmVyLmN0eC5maWxsU3R5bGUgPSByZWN0LmNvbG91clxuICAgICAgICAgICAgQGJ1ZmZlci5jdHguZmlsbFJlY3QgcG9zaXRpb24ueCwgcG9zaXRpb24ueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHRcblxuICAgIGRyYXdJbWFnZXM6IC0+XG4gICAgICAgIGltYWdlRW50aXRpZXMgPSBFbnRpdHlNYW5hZ2VyLmdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZXMgW1wiUmVuZGVyYWJsZUltYWdlXCIsIFwiUG9zaXRpb25cIl1cbiAgICAgICAgZm9yIGVudGl0eSBpbiBpbWFnZUVudGl0aWVzXG4gICAgICAgICAgICBpbWFnZSA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJSZW5kZXJhYmxlSW1hZ2VcIlxuICAgICAgICAgICAgcG9zaXRpb24gPSBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiUG9zaXRpb25cIlxuICAgICAgICAgICAgIyBUT0RPOiBHZXQgdGhlIGFjdHVhbCBpbWFnZT9cbiAgICAgICAgICAgIEBidWZmZXIuY3R4LmRyYXdJbWFnZSBpbWFnZSwgcG9zaXRpb24ueCwgcG9zaXRpb24ueVxuXG4gICAgZHJhd1RleHRzOiAtPlxuICAgICAgICB0ZXh0RW50aXRpZXMgPSBFbnRpdHlNYW5hZ2VyLmdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZXMgW1wiUmVuZGVyYWJsZVRleHRcIiwgXCJQb3NpdGlvblwiXVxuICAgICAgICBmb3IgZW50aXR5IGluIHRleHRFbnRpdGllc1xuICAgICAgICAgICAgdGV4dCA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJSZW5kZXJhYmxlVGV4dFwiXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJQb3NpdGlvblwiXG4gICAgICAgICAgICBAYnVmZmVyLmN0eC5maWxsU3R5bGUgPSB0ZXh0LmNvbG91clxuICAgICAgICAgICAgQGJ1ZmZlci5jdHguZm9udCA9IHRleHQuZm9udFxuICAgICAgICAgICAgQGJ1ZmZlci5jdHguZmlsbFRleHQgdGV4dC50ZXh0LCBwb3NpdGlvbi54LCBwb3NpdGlvbi55XG5cbiAgICAjIyNcbiAgICBpbml0OiAtPlxuICAgICAgICBAbWV0ZXIgPSBuZXcgRlBTTWV0ZXIoeyBncmFwaDogMX0pXG5cbiAgICBvblVwZGF0ZTogKGR0KSAtPlxuICAgICAgICBAbWV0ZXIudGlja1N0YXJ0KClcblxuICAgICAgICBpZiBAZW50aXR5U3lzdGVtXG4gICAgICAgICAgICBlbnRpdGllcyA9IEBlbnRpdHlTeXN0ZW0uZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJSZW5kZXJhYmxlXCIsIFwiUG9zaXRpb25cIl1cblxuICAgICAgICAgICAgXy5lYWNoIGVudGl0aWVzLCAoZW50aXR5KSA9PlxuICAgICAgICAgICAgICAgIHJlbmRlcmFibGUgPSBAZW50aXR5U3lzdGVtLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiUmVuZGVyYWJsZVwiXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBAZW50aXR5U3lzdGVtLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiUG9zaXRpb25cIlxuXG4gICAgICAgICAgICAgICAgQGJ1ZmZlckN0eC5maWxsU3R5bGUgPSByZW5kZXJhYmxlLmNvbG91clxuICAgICAgICAgICAgICAgIEBidWZmZXJDdHguZmlsbFJlY3QgcG9zaXRpb24ueCwgcG9zaXRpb24ueSwgMjAsIDIwXG5cbiAgICAgICAgQGN0eC5jbGVhclJlY3QgMCwgMCwgQFdJRFRILCBASEVJR0hUXG4gICAgICAgIEBjdHguZHJhd0ltYWdlIEBidWZmZXJDYW52YXMsIDAsIDBcbiAgICAgICAgQGJ1ZmZlckN0eC5jbGVhclJlY3QgMCwgMCwgQFdJRFRILCBASEVJR0hUXG5cbiAgICAgICAgQG1ldGVyLnRpY2soKVxuXG4gICAgIyMjXG5cbm1vZHVsZS5leHBvcnRzID0gR3JhcGhpY3NTeXN0ZW0iLCJjbGFzcyBVdGlsXG4gICAgQGxvYWRKU09OOiAodXJsKSAtPiBVdGlsLmxvYWQodXJsKS50aGVuKEpTT04ucGFyc2UpXG5cbiAgICBAbG9hZDogKHVybCkgLT5cbiAgICAgICAgcHJvbWlzZSA9IG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpIC0+XG4gICAgICAgICAgICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICAgICAgI3hoci5yZXNwb25zZVR5cGUgPSBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgeGhyLm9wZW4gXCJHRVRcIiwgdXJsLCB0cnVlXG4gICAgICAgICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lciBcInJlYWR5c3RhdGVjaGFuZ2VcIiwgLT5cbiAgICAgICAgICAgICAgICBpZiB4aHIucmVhZHlTdGF0ZSBpcyA0XG4gICAgICAgICAgICAgICAgICAgIGlmIHhoci5zdGF0dXMgaW4gWzIwMCwgMzA0XVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCBcImVycm9yXCJcbiAgICAgICAgICAgIHhoci5zZW5kKClcbiAgICAgICAgcmV0dXJuIHByb21pc2VcblxuXG4gICAgQGxvYWRJbWFnZTogKHNyYykgLT5cbiAgICAgICAgcHJvbWlzZSA9IG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpIC0+XG4gICAgICAgICAgICBpbWFnZSA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyIFwibG9hZFwiLCAtPiByZXNvbHZlIEBcbiAgICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIgXCJlcnJvclwiLCAtPiByZWplY3QgXCJlcnJvclwiXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSBzcmNcbiAgICAgICAgICAgIGlmIGltYWdlLmNvbXBsZXRlIHRoZW4gcmVzb2x2ZSBpbWFnZVxuICAgICAgICByZXR1cm4gcHJvbWlzZVxuXG5cbiAgICBAcGx1cmFsaXNlOiAod29yZCkgLT5cbiAgICAgICAgbGVuID0gd29yZC5sZW5ndGhcblxuICAgICAgICBsMSA9IHdvcmQuc3Vic3RyIC0xXG4gICAgICAgIGwyID0gd29yZC5zdWJzdHIgLTJcblxuICAgICAgICBpZiBsMSA9PSBcInlcIlxuICAgICAgICAgICAgd29yZCA9IHdvcmQuc3Vic3RyKDAsIGxlbiAtIDEpICsgXCJpZXNcIlxuICAgICAgICBlbHNlIGlmIGwxID09IFwic1wiIHx8IGwxID09IFwieFwiIHx8IGwyID09IFwiY2hcIiB8fCBsMiA9PSBcInNoXCIgfHwgbDIgPT0gXCJlc1wiXG4gICAgICAgICAgICAjIElmIHdvcmQgZW5kcyBpbiBcInNcIiBcInhcIiBvciBcImNoXCIgb3IgXCJzaFwiIGFkZCBcImVzXCJcbiAgICAgICAgICAgIHdvcmQgPSB3b3JkICsgXCJlc1wiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHdvcmQgPSB3b3JkICsgXCJzXCJcblxuICAgICAgICByZXR1cm4gd29yZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFV0aWwiLCIoZnVuY3Rpb24gKEJ1ZmZlcil7XG4vLyAgICAgdXVpZC5qc1xuLy9cbi8vICAgICBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxMiBSb2JlcnQgS2llZmZlclxuLy8gICAgIE1JVCBMaWNlbnNlIC0gaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBfZ2xvYmFsID0gdGhpcztcblxuICAvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgV2UgZmVhdHVyZVxuICAvLyBkZXRlY3QgdG8gZGV0ZXJtaW5lIHRoZSBiZXN0IFJORyBzb3VyY2UsIG5vcm1hbGl6aW5nIHRvIGEgZnVuY3Rpb24gdGhhdFxuICAvLyByZXR1cm5zIDEyOC1iaXRzIG9mIHJhbmRvbW5lc3MsIHNpbmNlIHRoYXQncyB3aGF0J3MgdXN1YWxseSByZXF1aXJlZFxuICB2YXIgX3JuZztcblxuICAvLyBOb2RlLmpzIGNyeXB0by1iYXNlZCBSTkcgLSBodHRwOi8vbm9kZWpzLm9yZy9kb2NzL3YwLjYuMi9hcGkvY3J5cHRvLmh0bWxcbiAgLy9cbiAgLy8gTW9kZXJhdGVseSBmYXN0LCBoaWdoIHF1YWxpdHlcbiAgaWYgKHR5cGVvZihyZXF1aXJlKSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBfcmIgPSByZXF1aXJlKCdjcnlwdG8nKS5yYW5kb21CeXRlcztcbiAgICAgIF9ybmcgPSBfcmIgJiYgZnVuY3Rpb24oKSB7cmV0dXJuIF9yYigxNik7fTtcbiAgICB9IGNhdGNoKGUpIHt9XG4gIH1cblxuICBpZiAoIV9ybmcgJiYgX2dsb2JhbC5jcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIFdIQVRXRyBjcnlwdG8tYmFzZWQgUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICAgIC8vXG4gICAgLy8gTW9kZXJhdGVseSBmYXN0LCBoaWdoIHF1YWxpdHlcbiAgICB2YXIgX3JuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICAgIF9ybmcgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKF9ybmRzOCk7XG4gICAgICByZXR1cm4gX3JuZHM4O1xuICAgIH07XG4gIH1cblxuICBpZiAoIV9ybmcpIHtcbiAgICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gICAgLy9cbiAgICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAgIC8vIHF1YWxpdHkuXG4gICAgdmFyICBfcm5kcyA9IG5ldyBBcnJheSgxNik7XG4gICAgX3JuZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgICBfcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9ybmRzO1xuICAgIH07XG4gIH1cblxuICAvLyBCdWZmZXIgY2xhc3MgdG8gdXNlXG4gIHZhciBCdWZmZXJDbGFzcyA9IHR5cGVvZihCdWZmZXIpID09ICdmdW5jdGlvbicgPyBCdWZmZXIgOiBBcnJheTtcblxuICAvLyBNYXBzIGZvciBudW1iZXIgPC0+IGhleCBzdHJpbmcgY29udmVyc2lvblxuICB2YXIgX2J5dGVUb0hleCA9IFtdO1xuICB2YXIgX2hleFRvQnl0ZSA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgX2J5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG4gICAgX2hleFRvQnl0ZVtfYnl0ZVRvSGV4W2ldXSA9IGk7XG4gIH1cblxuICAvLyAqKmBwYXJzZSgpYCAtIFBhcnNlIGEgVVVJRCBpbnRvIGl0J3MgY29tcG9uZW50IGJ5dGVzKipcbiAgZnVuY3Rpb24gcGFyc2UocywgYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgaSA9IChidWYgJiYgb2Zmc2V0KSB8fCAwLCBpaSA9IDA7XG5cbiAgICBidWYgPSBidWYgfHwgW107XG4gICAgcy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1swLTlhLWZdezJ9L2csIGZ1bmN0aW9uKG9jdCkge1xuICAgICAgaWYgKGlpIDwgMTYpIHsgLy8gRG9uJ3Qgb3ZlcmZsb3chXG4gICAgICAgIGJ1ZltpICsgaWkrK10gPSBfaGV4VG9CeXRlW29jdF07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBaZXJvIG91dCByZW1haW5pbmcgYnl0ZXMgaWYgc3RyaW5nIHdhcyBzaG9ydFxuICAgIHdoaWxlIChpaSA8IDE2KSB7XG4gICAgICBidWZbaSArIGlpKytdID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgLy8gKipgdW5wYXJzZSgpYCAtIENvbnZlcnQgVVVJRCBieXRlIGFycmF5IChhbGEgcGFyc2UoKSkgaW50byBhIHN0cmluZyoqXG4gIGZ1bmN0aW9uIHVucGFyc2UoYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgaSA9IG9mZnNldCB8fCAwLCBidGggPSBfYnl0ZVRvSGV4O1xuICAgIHJldHVybiAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XG4gIH1cblxuICAvLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4gIC8vXG4gIC8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4gIC8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbiAgLy8gcmFuZG9tICMncyB3ZSBuZWVkIHRvIGluaXQgbm9kZSBhbmQgY2xvY2tzZXFcbiAgdmFyIF9zZWVkQnl0ZXMgPSBfcm5nKCk7XG5cbiAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gIHZhciBfbm9kZUlkID0gW1xuICAgIF9zZWVkQnl0ZXNbMF0gfCAweDAxLFxuICAgIF9zZWVkQnl0ZXNbMV0sIF9zZWVkQnl0ZXNbMl0sIF9zZWVkQnl0ZXNbM10sIF9zZWVkQnl0ZXNbNF0sIF9zZWVkQnl0ZXNbNV1cbiAgXTtcblxuICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICB2YXIgX2Nsb2Nrc2VxID0gKF9zZWVkQnl0ZXNbNl0gPDwgOCB8IF9zZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuXG4gIC8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxuICB2YXIgX2xhc3RNU2VjcyA9IDAsIF9sYXN0TlNlY3MgPSAwO1xuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbiAgZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPSBudWxsID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAgIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gICAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICAgIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT0gbnVsbCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICAgIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT0gbnVsbCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAgIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gICAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICAgIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgICB9XG5cbiAgICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAgIC8vIHRpbWUgaW50ZXJ2YWxcbiAgICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT0gbnVsbCkge1xuICAgICAgbnNlY3MgPSAwO1xuICAgIH1cblxuICAgIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICAgIH1cblxuICAgIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gICAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAgIC8vIGB0aW1lX2xvd2BcbiAgICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gICAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICAgIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgICAvLyBgdGltZV9taWRgXG4gICAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICAgIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gICAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAgIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gICAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICAgIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gICAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gICAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gICAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gICAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gICAgLy8gYG5vZGVgXG4gICAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgICBmb3IgKHZhciBuID0gMDsgbiA8IDY7IG4rKykge1xuICAgICAgYltpICsgbl0gPSBub2RlW25dO1xuICAgIH1cblxuICAgIHJldHVybiBidWYgPyBidWYgOiB1bnBhcnNlKGIpO1xuICB9XG5cbiAgLy8gKipgdjQoKWAgLSBHZW5lcmF0ZSByYW5kb20gVVVJRCoqXG5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuICBmdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAgIC8vIERlcHJlY2F0ZWQgLSAnZm9ybWF0JyBhcmd1bWVudCwgYXMgc3VwcG9ydGVkIGluIHYxLjJcbiAgICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICAgIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICAgIGJ1ZiA9IG9wdGlvbnMgPT0gJ2JpbmFyeScgPyBuZXcgQnVmZmVyQ2xhc3MoMTYpIDogbnVsbDtcbiAgICAgIG9wdGlvbnMgPSBudWxsO1xuICAgIH1cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IF9ybmcpKCk7XG5cbiAgICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gICAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICAgIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAgIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICAgIGlmIChidWYpIHtcbiAgICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgaWkrKykge1xuICAgICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBidWYgfHwgdW5wYXJzZShybmRzKTtcbiAgfVxuXG4gIC8vIEV4cG9ydCBwdWJsaWMgQVBJXG4gIHZhciB1dWlkID0gdjQ7XG4gIHV1aWQudjEgPSB2MTtcbiAgdXVpZC52NCA9IHY0O1xuICB1dWlkLnBhcnNlID0gcGFyc2U7XG4gIHV1aWQudW5wYXJzZSA9IHVucGFyc2U7XG4gIHV1aWQuQnVmZmVyQ2xhc3MgPSBCdWZmZXJDbGFzcztcblxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gUHVibGlzaCBhcyBBTUQgbW9kdWxlXG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge3JldHVybiB1dWlkO30pO1xuICB9IGVsc2UgaWYgKHR5cGVvZihtb2R1bGUpICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgLy8gUHVibGlzaCBhcyBub2RlLmpzIG1vZHVsZVxuICAgIG1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiAgfSBlbHNlIHtcbiAgICAvLyBQdWJsaXNoIGFzIGdsb2JhbCAoaW4gYnJvd3NlcnMpXG4gICAgdmFyIF9wcmV2aW91c1Jvb3QgPSBfZ2xvYmFsLnV1aWQ7XG5cbiAgICAvLyAqKmBub0NvbmZsaWN0KClgIC0gKGJyb3dzZXIgb25seSkgdG8gcmVzZXQgZ2xvYmFsICd1dWlkJyB2YXIqKlxuICAgIHV1aWQubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgX2dsb2JhbC51dWlkID0gX3ByZXZpb3VzUm9vdDtcbiAgICAgIHJldHVybiB1dWlkO1xuICAgIH07XG5cbiAgICBfZ2xvYmFsLnV1aWQgPSB1dWlkO1xuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIpIiwiLyoqXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBBdXRob3I6ICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIExpY2Vuc2U6ICBNSVRcbiAqXG4gKiBgbnBtIGluc3RhbGwgYnVmZmVyYFxuICovXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5fdXNlVHlwZWRBcnJheXNgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAoY29tcGF0aWJsZSBkb3duIHRvIElFNilcbiAqL1xuQnVmZmVyLl91c2VUeXBlZEFycmF5cyA9IChmdW5jdGlvbiAoKSB7XG4gIC8vIERldGVjdCBpZiBicm93c2VyIHN1cHBvcnRzIFR5cGVkIEFycmF5cy4gU3VwcG9ydGVkIGJyb3dzZXJzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssXG4gIC8vIENocm9tZSA3KywgU2FmYXJpIDUuMSssIE9wZXJhIDExLjYrLCBpT1MgNC4yKy4gSWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmdcbiAgLy8gcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLCB0aGVuIHRoYXQncyB0aGUgc2FtZSBhcyBubyBgVWludDhBcnJheWAgc3VwcG9ydFxuICAvLyBiZWNhdXNlIHdlIG5lZWQgdG8gYmUgYWJsZSB0byBhZGQgYWxsIHRoZSBub2RlIEJ1ZmZlciBBUEkgbWV0aG9kcy4gVGhpcyBpcyBhbiBpc3N1ZVxuICAvLyBpbiBGaXJlZm94IDQtMjkuIE5vdyBmaXhlZDogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4XG4gIHRyeSB7XG4gICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigwKVxuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheShidWYpXG4gICAgYXJyLmZvbyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH1cbiAgICByZXR1cm4gNDIgPT09IGFyci5mb28oKSAmJlxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nIC8vIENocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn0pKClcblxuLyoqXG4gKiBDbGFzczogQnVmZmVyXG4gKiA9PT09PT09PT09PT09XG4gKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBhcmUgYXVnbWVudGVkXG4gKiB3aXRoIGZ1bmN0aW9uIHByb3BlcnRpZXMgZm9yIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBBUEkgZnVuY3Rpb25zLiBXZSB1c2VcbiAqIGBVaW50OEFycmF5YCBzbyB0aGF0IHNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0IHJldHVybnNcbiAqIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIEJ5IGF1Z21lbnRpbmcgdGhlIGluc3RhbmNlcywgd2UgY2FuIGF2b2lkIG1vZGlmeWluZyB0aGUgYFVpbnQ4QXJyYXlgXG4gKiBwcm90b3R5cGUuXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlciAoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSlcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKVxuXG4gIHZhciB0eXBlID0gdHlwZW9mIHN1YmplY3RcblxuICAvLyBXb3JrYXJvdW5kOiBub2RlJ3MgYmFzZTY0IGltcGxlbWVudGF0aW9uIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBzdHJpbmdzXG4gIC8vIHdoaWxlIGJhc2U2NC1qcyBkb2VzIG5vdC5cbiAgaWYgKGVuY29kaW5nID09PSAnYmFzZTY0JyAmJiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHN1YmplY3QgPSBzdHJpbmd0cmltKHN1YmplY3QpXG4gICAgd2hpbGUgKHN1YmplY3QubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgICAgc3ViamVjdCA9IHN1YmplY3QgKyAnPSdcbiAgICB9XG4gIH1cblxuICAvLyBGaW5kIHRoZSBsZW5ndGhcbiAgdmFyIGxlbmd0aFxuICBpZiAodHlwZSA9PT0gJ251bWJlcicpXG4gICAgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QpXG4gIGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKVxuICAgIGxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKHN1YmplY3QsIGVuY29kaW5nKVxuICBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0JylcbiAgICBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdC5sZW5ndGgpIC8vIGFzc3VtZSB0aGF0IG9iamVjdCBpcyBhcnJheS1saWtlXG4gIGVsc2VcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG5lZWRzIHRvIGJlIGEgbnVtYmVyLCBhcnJheSBvciBzdHJpbmcuJylcblxuICB2YXIgYnVmXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgLy8gUHJlZmVycmVkOiBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIGJ1ZiA9IEJ1ZmZlci5fYXVnbWVudChuZXcgVWludDhBcnJheShsZW5ndGgpKVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gVEhJUyBpbnN0YW5jZSBvZiBCdWZmZXIgKGNyZWF0ZWQgYnkgYG5ld2ApXG4gICAgYnVmID0gdGhpc1xuICAgIGJ1Zi5sZW5ndGggPSBsZW5ndGhcbiAgICBidWYuX2lzQnVmZmVyID0gdHJ1ZVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgdHlwZW9mIHN1YmplY3QuYnl0ZUxlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAvLyBTcGVlZCBvcHRpbWl6YXRpb24gLS0gdXNlIHNldCBpZiB3ZSdyZSBjb3B5aW5nIGZyb20gYSB0eXBlZCBhcnJheVxuICAgIGJ1Zi5fc2V0KHN1YmplY3QpXG4gIH0gZWxzZSBpZiAoaXNBcnJheWlzaChzdWJqZWN0KSkge1xuICAgIC8vIFRyZWF0IGFycmF5LWlzaCBvYmplY3RzIGFzIGEgYnl0ZSBhcnJheVxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSlcbiAgICAgICAgYnVmW2ldID0gc3ViamVjdC5yZWFkVUludDgoaSlcbiAgICAgIGVsc2VcbiAgICAgICAgYnVmW2ldID0gc3ViamVjdFtpXVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgIGJ1Zi53cml0ZShzdWJqZWN0LCAwLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiAhQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiAhbm9aZXJvKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBidWZbaV0gPSAwXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG4vLyBTVEFUSUMgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIChiKSB7XG4gIHJldHVybiAhIShiICE9PSBudWxsICYmIGIgIT09IHVuZGVmaW5lZCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmJ5dGVMZW5ndGggPSBmdW5jdGlvbiAoc3RyLCBlbmNvZGluZykge1xuICB2YXIgcmV0XG4gIHN0ciA9IHN0ciArICcnXG4gIHN3aXRjaCAoZW5jb2RpbmcgfHwgJ3V0ZjgnKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggLyAyXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IHV0ZjhUb0J5dGVzKHN0cikubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBiYXNlNjRUb0J5dGVzKHN0cikubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoICogMlxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiAobGlzdCwgdG90YWxMZW5ndGgpIHtcbiAgYXNzZXJ0KGlzQXJyYXkobGlzdCksICdVc2FnZTogQnVmZmVyLmNvbmNhdChsaXN0LCBbdG90YWxMZW5ndGhdKVxcbicgK1xuICAgICAgJ2xpc3Qgc2hvdWxkIGJlIGFuIEFycmF5LicpXG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoMClcbiAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBsaXN0WzBdXG4gIH1cblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHRvdGFsTGVuZ3RoICE9PSAnbnVtYmVyJykge1xuICAgIHRvdGFsTGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0b3RhbExlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWYgPSBuZXcgQnVmZmVyKHRvdGFsTGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIGl0ZW0uY29weShidWYsIHBvcylcbiAgICBwb3MgKz0gaXRlbS5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cbi8vIEJVRkZFUiBJTlNUQU5DRSBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBfaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBhc3NlcnQoc3RyTGVuICUgMiA9PT0gMCwgJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhciBieXRlID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGFzc2VydCghaXNOYU4oYnl0ZSksICdJbnZhbGlkIGhleCBzdHJpbmcnKVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IGJ5dGVcbiAgfVxuICBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGkgKiAyXG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIF91dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfYmluYXJ5V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gX2FzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBfYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIFN1cHBvcnQgYm90aCAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpXG4gIC8vIGFuZCB0aGUgbGVnYWN5IChzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBpZiAoIWlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIH0gZWxzZSB7ICAvLyBsZWdhY3lcbiAgICB2YXIgc3dhcCA9IGVuY29kaW5nXG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBvZmZzZXQgPSBsZW5ndGhcbiAgICBsZW5ndGggPSBzd2FwXG4gIH1cblxuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKVxuXG4gIHZhciByZXRcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuXG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKVxuICBzdGFydCA9IE51bWJlcihzdGFydCkgfHwgMFxuICBlbmQgPSAoZW5kICE9PSB1bmRlZmluZWQpXG4gICAgPyBOdW1iZXIoZW5kKVxuICAgIDogZW5kID0gc2VsZi5sZW5ndGhcblxuICAvLyBGYXN0cGF0aCBlbXB0eSBzdHJpbmdzXG4gIGlmIChlbmQgPT09IHN0YXJ0KVxuICAgIHJldHVybiAnJ1xuXG4gIHZhciByZXRcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRfc3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXNcblxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAoIXRhcmdldF9zdGFydCkgdGFyZ2V0X3N0YXJ0ID0gMFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHNvdXJjZS5sZW5ndGggPT09IDApIHJldHVyblxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ3NvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0JylcbiAgYXNzZXJ0KHRhcmdldF9zdGFydCA+PSAwICYmIHRhcmdldF9zdGFydCA8IHRhcmdldC5sZW5ndGgsXG4gICAgICAndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChzdGFydCA+PSAwICYmIHN0YXJ0IDwgc291cmNlLmxlbmd0aCwgJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKVxuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0IDwgZW5kIC0gc3RhcnQpXG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCArIHN0YXJ0XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG5cbiAgaWYgKGxlbiA8IDEwMCB8fCAhQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICB0YXJnZXRbaSArIHRhcmdldF9zdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuX3NldCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksIHRhcmdldF9zdGFydClcbiAgfVxufVxuXG5mdW5jdGlvbiBfYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIF91dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmVzID0gJydcbiAgdmFyIHRtcCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIGlmIChidWZbaV0gPD0gMHg3Rikge1xuICAgICAgcmVzICs9IGRlY29kZVV0ZjhDaGFyKHRtcCkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgICAgIHRtcCA9ICcnXG4gICAgfSBlbHNlIHtcbiAgICAgIHRtcCArPSAnJScgKyBidWZbaV0udG9TdHJpbmcoMTYpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcyArIGRlY29kZVV0ZjhDaGFyKHRtcClcbn1cblxuZnVuY3Rpb24gX2FzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKVxuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBfYmluYXJ5U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICByZXR1cm4gX2FzY2lpU2xpY2UoYnVmLCBzdGFydCwgZW5kKVxufVxuXG5mdW5jdGlvbiBfaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpKzFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IGNsYW1wKHN0YXJ0LCBsZW4sIDApXG4gIGVuZCA9IGNsYW1wKGVuZCwgbGVuLCBsZW4pXG5cbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICByZXR1cm4gQnVmZmVyLl9hdWdtZW50KHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCkpXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICB2YXIgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkLCB0cnVlKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47IGkrKykge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICAgIHJldHVybiBuZXdCdWZcbiAgfVxufVxuXG4vLyBgZ2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuZ2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKVxuICByZXR1cm4gdGhpcy5yZWFkVUludDgob2Zmc2V0KVxufVxuXG4vLyBgc2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodiwgb2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuc2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKVxuICByZXR1cm4gdGhpcy53cml0ZVVJbnQ4KHYsIG9mZnNldClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuZnVuY3Rpb24gX3JlYWRVSW50MTYgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsXG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XVxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4XG4gIH0gZWxzZSB7XG4gICAgdmFsID0gYnVmW29mZnNldF0gPDwgOFxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXVxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkVUludDMyIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbFxuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pXG4gICAgICB2YWwgPSBidWZbb2Zmc2V0ICsgMl0gPDwgMTZcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgOFxuICAgIHZhbCB8PSBidWZbb2Zmc2V0XVxuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKVxuICAgICAgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXQgKyAzXSA8PCAyNCA+Pj4gMClcbiAgfSBlbHNlIHtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCA9IGJ1ZltvZmZzZXQgKyAxXSA8PCAxNlxuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAyXSA8PCA4XG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDNdXG4gICAgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXRdIDw8IDI0ID4+PiAwKVxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCxcbiAgICAgICAgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIHZhciBuZWcgPSB0aGlzW29mZnNldF0gJiAweDgwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5mdW5jdGlvbiBfcmVhZEludDE2IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDE2KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpXG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmZmZiAtIHZhbCArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRJbnQzMiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWwgPSBfcmVhZFVJbnQzMihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCB0cnVlKVxuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwMDAwMFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZmZmZmZmZiAtIHZhbCArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRGbG9hdCAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZERvdWJsZSAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmYpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm5cblxuICB0aGlzW29mZnNldF0gPSB2YWx1ZVxufVxuXG5mdW5jdGlvbiBfd3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDIpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID1cbiAgICAgICAgKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgICAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmZmZmZilcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCA0KTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9XG4gICAgICAgICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZiwgLTB4ODApXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIHRoaXMud3JpdGVVSW50OCh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydClcbiAgZWxzZVxuICAgIHRoaXMud3JpdGVVSW50OCgweGZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmYsIC0weDgwMDApXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICBfd3JpdGVVSW50MTYoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgX3dyaXRlVUludDE2KGJ1ZiwgMHhmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgX3dyaXRlVUludDMyKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbiAgZWxzZVxuICAgIF93cml0ZVVJbnQzMihidWYsIDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLFxuICAgICAgICAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGZpbGwodmFsdWUsIHN0YXJ0PTAsIGVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gKHZhbHVlLCBzdGFydCwgZW5kKSB7XG4gIGlmICghdmFsdWUpIHZhbHVlID0gMFxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQpIGVuZCA9IHRoaXMubGVuZ3RoXG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLmNoYXJDb2RlQXQoMClcbiAgfVxuXG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmICFpc05hTih2YWx1ZSksICd2YWx1ZSBpcyBub3QgYSBudW1iZXInKVxuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnZW5kIDwgc3RhcnQnKVxuXG4gIC8vIEZpbGwgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuXG4gIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCB0aGlzLmxlbmd0aCwgJ3N0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHRoaXMubGVuZ3RoLCAnZW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgdGhpc1tpXSA9IHZhbHVlXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgb3V0ID0gW11cbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBvdXRbaV0gPSB0b0hleCh0aGlzW2ldKVxuICAgIGlmIChpID09PSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTKSB7XG4gICAgICBvdXRbaSArIDFdID0gJy4uLidcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgb3V0LmpvaW4oJyAnKSArICc+J1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYEFycmF5QnVmZmVyYCB3aXRoIHRoZSAqY29waWVkKiBtZW1vcnkgb2YgdGhlIGJ1ZmZlciBpbnN0YW5jZS5cbiAqIEFkZGVkIGluIE5vZGUgMC4xMi4gT25seSBhdmFpbGFibGUgaW4gYnJvd3NlcnMgdGhhdCBzdXBwb3J0IEFycmF5QnVmZmVyLlxuICovXG5CdWZmZXIucHJvdG90eXBlLnRvQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgICAgcmV0dXJuIChuZXcgQnVmZmVyKHRoaXMpKS5idWZmZXJcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGJ1Zi5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSlcbiAgICAgICAgYnVmW2ldID0gdGhpc1tpXVxuICAgICAgcmV0dXJuIGJ1Zi5idWZmZXJcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCdWZmZXIudG9BcnJheUJ1ZmZlciBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpXG4gIH1cbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG52YXIgQlAgPSBCdWZmZXIucHJvdG90eXBlXG5cbi8qKlxuICogQXVnbWVudCBhIFVpbnQ4QXJyYXkgKmluc3RhbmNlKiAobm90IHRoZSBVaW50OEFycmF5IGNsYXNzISkgd2l0aCBCdWZmZXIgbWV0aG9kc1xuICovXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5faXNCdWZmZXIgPSB0cnVlXG5cbiAgLy8gc2F2ZSByZWZlcmVuY2UgdG8gb3JpZ2luYWwgVWludDhBcnJheSBnZXQvc2V0IG1ldGhvZHMgYmVmb3JlIG92ZXJ3cml0aW5nXG4gIGFyci5fZ2V0ID0gYXJyLmdldFxuICBhcnIuX3NldCA9IGFyci5zZXRcblxuICAvLyBkZXByZWNhdGVkLCB3aWxsIGJlIHJlbW92ZWQgaW4gbm9kZSAwLjEzK1xuICBhcnIuZ2V0ID0gQlAuZ2V0XG4gIGFyci5zZXQgPSBCUC5zZXRcblxuICBhcnIud3JpdGUgPSBCUC53cml0ZVxuICBhcnIudG9TdHJpbmcgPSBCUC50b1N0cmluZ1xuICBhcnIudG9Mb2NhbGVTdHJpbmcgPSBCUC50b1N0cmluZ1xuICBhcnIudG9KU09OID0gQlAudG9KU09OXG4gIGFyci5jb3B5ID0gQlAuY29weVxuICBhcnIuc2xpY2UgPSBCUC5zbGljZVxuICBhcnIucmVhZFVJbnQ4ID0gQlAucmVhZFVJbnQ4XG4gIGFyci5yZWFkVUludDE2TEUgPSBCUC5yZWFkVUludDE2TEVcbiAgYXJyLnJlYWRVSW50MTZCRSA9IEJQLnJlYWRVSW50MTZCRVxuICBhcnIucmVhZFVJbnQzMkxFID0gQlAucmVhZFVJbnQzMkxFXG4gIGFyci5yZWFkVUludDMyQkUgPSBCUC5yZWFkVUludDMyQkVcbiAgYXJyLnJlYWRJbnQ4ID0gQlAucmVhZEludDhcbiAgYXJyLnJlYWRJbnQxNkxFID0gQlAucmVhZEludDE2TEVcbiAgYXJyLnJlYWRJbnQxNkJFID0gQlAucmVhZEludDE2QkVcbiAgYXJyLnJlYWRJbnQzMkxFID0gQlAucmVhZEludDMyTEVcbiAgYXJyLnJlYWRJbnQzMkJFID0gQlAucmVhZEludDMyQkVcbiAgYXJyLnJlYWRGbG9hdExFID0gQlAucmVhZEZsb2F0TEVcbiAgYXJyLnJlYWRGbG9hdEJFID0gQlAucmVhZEZsb2F0QkVcbiAgYXJyLnJlYWREb3VibGVMRSA9IEJQLnJlYWREb3VibGVMRVxuICBhcnIucmVhZERvdWJsZUJFID0gQlAucmVhZERvdWJsZUJFXG4gIGFyci53cml0ZVVJbnQ4ID0gQlAud3JpdGVVSW50OFxuICBhcnIud3JpdGVVSW50MTZMRSA9IEJQLndyaXRlVUludDE2TEVcbiAgYXJyLndyaXRlVUludDE2QkUgPSBCUC53cml0ZVVJbnQxNkJFXG4gIGFyci53cml0ZVVJbnQzMkxFID0gQlAud3JpdGVVSW50MzJMRVxuICBhcnIud3JpdGVVSW50MzJCRSA9IEJQLndyaXRlVUludDMyQkVcbiAgYXJyLndyaXRlSW50OCA9IEJQLndyaXRlSW50OFxuICBhcnIud3JpdGVJbnQxNkxFID0gQlAud3JpdGVJbnQxNkxFXG4gIGFyci53cml0ZUludDE2QkUgPSBCUC53cml0ZUludDE2QkVcbiAgYXJyLndyaXRlSW50MzJMRSA9IEJQLndyaXRlSW50MzJMRVxuICBhcnIud3JpdGVJbnQzMkJFID0gQlAud3JpdGVJbnQzMkJFXG4gIGFyci53cml0ZUZsb2F0TEUgPSBCUC53cml0ZUZsb2F0TEVcbiAgYXJyLndyaXRlRmxvYXRCRSA9IEJQLndyaXRlRmxvYXRCRVxuICBhcnIud3JpdGVEb3VibGVMRSA9IEJQLndyaXRlRG91YmxlTEVcbiAgYXJyLndyaXRlRG91YmxlQkUgPSBCUC53cml0ZURvdWJsZUJFXG4gIGFyci5maWxsID0gQlAuZmlsbFxuICBhcnIuaW5zcGVjdCA9IEJQLmluc3BlY3RcbiAgYXJyLnRvQXJyYXlCdWZmZXIgPSBCUC50b0FycmF5QnVmZmVyXG5cbiAgcmV0dXJuIGFyclxufVxuXG4vLyBzbGljZShzdGFydCwgZW5kKVxuZnVuY3Rpb24gY2xhbXAgKGluZGV4LCBsZW4sIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICBpbmRleCA9IH5+aW5kZXg7ICAvLyBDb2VyY2UgdG8gaW50ZWdlci5cbiAgaWYgKGluZGV4ID49IGxlbikgcmV0dXJuIGxlblxuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4XG4gIGluZGV4ICs9IGxlblxuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4XG4gIHJldHVybiAwXG59XG5cbmZ1bmN0aW9uIGNvZXJjZSAobGVuZ3RoKSB7XG4gIC8vIENvZXJjZSBsZW5ndGggdG8gYSBudW1iZXIgKHBvc3NpYmx5IE5hTiksIHJvdW5kIHVwXG4gIC8vIGluIGNhc2UgaXQncyBmcmFjdGlvbmFsIChlLmcuIDEyMy40NTYpIHRoZW4gZG8gYVxuICAvLyBkb3VibGUgbmVnYXRlIHRvIGNvZXJjZSBhIE5hTiB0byAwLiBFYXN5LCByaWdodD9cbiAgbGVuZ3RoID0gfn5NYXRoLmNlaWwoK2xlbmd0aClcbiAgcmV0dXJuIGxlbmd0aCA8IDAgPyAwIDogbGVuZ3RoXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkgKHN1YmplY3QpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChzdWJqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzdWJqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuICB9KShzdWJqZWN0KVxufVxuXG5mdW5jdGlvbiBpc0FycmF5aXNoIChzdWJqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5KHN1YmplY3QpIHx8IEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSB8fFxuICAgICAgc3ViamVjdCAmJiB0eXBlb2Ygc3ViamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIHR5cGVvZiBzdWJqZWN0Lmxlbmd0aCA9PT0gJ251bWJlcidcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIHZhciBiID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBpZiAoYiA8PSAweDdGKVxuICAgICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpXG4gICAgZWxzZSB7XG4gICAgICB2YXIgc3RhcnQgPSBpXG4gICAgICBpZiAoYiA+PSAweEQ4MDAgJiYgYiA8PSAweERGRkYpIGkrK1xuICAgICAgdmFyIGggPSBlbmNvZGVVUklDb21wb25lbnQoc3RyLnNsaWNlKHN0YXJ0LCBpKzEpKS5zdWJzdHIoMSkuc3BsaXQoJyUnKVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBoLmxlbmd0aDsgaisrKVxuICAgICAgICBieXRlQXJyYXkucHVzaChwYXJzZUludChoW2pdLCAxNikpXG4gICAgfVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KHN0cilcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBwb3NcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSlcbiAgICAgIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gZGVjb2RlVXRmOENoYXIgKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpIC8vIFVURiA4IGludmFsaWQgY2hhclxuICB9XG59XG5cbi8qXG4gKiBXZSBoYXZlIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGludGVnZXIuIFRoaXMgbWVhbnMgdGhhdCBpdFxuICogaXMgbm9uLW5lZ2F0aXZlLiBJdCBoYXMgbm8gZnJhY3Rpb25hbCBjb21wb25lbnQgYW5kIHRoYXQgaXQgZG9lcyBub3RcbiAqIGV4Y2VlZCB0aGUgbWF4aW11bSBhbGxvd2VkIHZhbHVlLlxuICovXG5mdW5jdGlvbiB2ZXJpZnVpbnQgKHZhbHVlLCBtYXgpIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJylcbiAgYXNzZXJ0KHZhbHVlID49IDAsICdzcGVjaWZpZWQgYSBuZWdhdGl2ZSB2YWx1ZSBmb3Igd3JpdGluZyBhbiB1bnNpZ25lZCB2YWx1ZScpXG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBpcyBsYXJnZXIgdGhhbiBtYXhpbXVtIHZhbHVlIGZvciB0eXBlJylcbiAgYXNzZXJ0KE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSwgJ3ZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50Jylcbn1cblxuZnVuY3Rpb24gdmVyaWZzaW50ICh2YWx1ZSwgbWF4LCBtaW4pIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZScpXG4gIGFzc2VydCh2YWx1ZSA+PSBtaW4sICd2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSwgJ3ZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50Jylcbn1cblxuZnVuY3Rpb24gdmVyaWZJRUVFNzU0ICh2YWx1ZSwgbWF4LCBtaW4pIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZScpXG4gIGFzc2VydCh2YWx1ZSA+PSBtaW4sICd2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlJylcbn1cblxuZnVuY3Rpb24gYXNzZXJ0ICh0ZXN0LCBtZXNzYWdlKSB7XG4gIGlmICghdGVzdCkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgJ0ZhaWxlZCBhc3NlcnRpb24nKVxufVxuIiwidmFyIGxvb2t1cCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblxuOyhmdW5jdGlvbiAoZXhwb3J0cykge1xuXHQndXNlIHN0cmljdCc7XG5cbiAgdmFyIEFyciA9ICh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgPyBVaW50OEFycmF5XG4gICAgOiBBcnJheVxuXG5cdHZhciBaRVJPICAgPSAnMCcuY2hhckNvZGVBdCgwKVxuXHR2YXIgUExVUyAgID0gJysnLmNoYXJDb2RlQXQoMClcblx0dmFyIFNMQVNIICA9ICcvJy5jaGFyQ29kZUF0KDApXG5cdHZhciBOVU1CRVIgPSAnMCcuY2hhckNvZGVBdCgwKVxuXHR2YXIgTE9XRVIgID0gJ2EnLmNoYXJDb2RlQXQoMClcblx0dmFyIFVQUEVSICA9ICdBJy5jaGFyQ29kZUF0KDApXG5cblx0ZnVuY3Rpb24gZGVjb2RlIChlbHQpIHtcblx0XHR2YXIgY29kZSA9IGVsdC5jaGFyQ29kZUF0KDApXG5cdFx0aWYgKGNvZGUgPT09IFBMVVMpXG5cdFx0XHRyZXR1cm4gNjIgLy8gJysnXG5cdFx0aWYgKGNvZGUgPT09IFNMQVNIKVxuXHRcdFx0cmV0dXJuIDYzIC8vICcvJ1xuXHRcdGlmIChjb2RlIDwgTlVNQkVSKVxuXHRcdFx0cmV0dXJuIC0xIC8vbm8gbWF0Y2hcblx0XHRpZiAoY29kZSA8IE5VTUJFUiArIDEwKVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBOVU1CRVIgKyAyNiArIDI2XG5cdFx0aWYgKGNvZGUgPCBVUFBFUiArIDI2KVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBVUFBFUlxuXHRcdGlmIChjb2RlIDwgTE9XRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gTE9XRVIgKyAyNlxuXHR9XG5cblx0ZnVuY3Rpb24gYjY0VG9CeXRlQXJyYXkgKGI2NCkge1xuXHRcdHZhciBpLCBqLCBsLCB0bXAsIHBsYWNlSG9sZGVycywgYXJyXG5cblx0XHRpZiAoYjY0Lmxlbmd0aCAlIDQgPiAwKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuXHRcdH1cblxuXHRcdC8vIHRoZSBudW1iZXIgb2YgZXF1YWwgc2lnbnMgKHBsYWNlIGhvbGRlcnMpXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuXHRcdC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuXHRcdC8vIGlmIHRoZXJlIGlzIG9ubHkgb25lLCB0aGVuIHRoZSB0aHJlZSBjaGFyYWN0ZXJzIGJlZm9yZSBpdCByZXByZXNlbnQgMiBieXRlc1xuXHRcdC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2Vcblx0XHR2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXHRcdHBsYWNlSG9sZGVycyA9ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAyKSA/IDIgOiAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMSkgPyAxIDogMFxuXG5cdFx0Ly8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5cdFx0YXJyID0gbmV3IEFycihiNjQubGVuZ3RoICogMyAvIDQgLSBwbGFjZUhvbGRlcnMpXG5cblx0XHQvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG5cdFx0bCA9IHBsYWNlSG9sZGVycyA+IDAgPyBiNjQubGVuZ3RoIC0gNCA6IGI2NC5sZW5ndGhcblxuXHRcdHZhciBMID0gMFxuXG5cdFx0ZnVuY3Rpb24gcHVzaCAodikge1xuXHRcdFx0YXJyW0wrK10gPSB2XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMCwgaiA9IDA7IGkgPCBsOyBpICs9IDQsIGogKz0gMykge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxOCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCAxMikgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA8PCA2KSB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAzKSlcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMDAwKSA+PiAxNilcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMCkgPj4gOClcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRpZiAocGxhY2VIb2xkZXJzID09PSAyKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPj4gNClcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxMCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCA0KSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpID4+IDIpXG5cdFx0XHRwdXNoKCh0bXAgPj4gOCkgJiAweEZGKVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH1cblxuXHRcdHJldHVybiBhcnJcblx0fVxuXG5cdGZ1bmN0aW9uIHVpbnQ4VG9CYXNlNjQgKHVpbnQ4KSB7XG5cdFx0dmFyIGksXG5cdFx0XHRleHRyYUJ5dGVzID0gdWludDgubGVuZ3RoICUgMywgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcblx0XHRcdG91dHB1dCA9IFwiXCIsXG5cdFx0XHR0ZW1wLCBsZW5ndGhcblxuXHRcdGZ1bmN0aW9uIGVuY29kZSAobnVtKSB7XG5cdFx0XHRyZXR1cm4gbG9va3VwLmNoYXJBdChudW0pXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcblx0XHRcdHJldHVybiBlbmNvZGUobnVtID4+IDE4ICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDEyICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDYgJiAweDNGKSArIGVuY29kZShudW0gJiAweDNGKVxuXHRcdH1cblxuXHRcdC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcblx0XHRmb3IgKGkgPSAwLCBsZW5ndGggPSB1aW50OC5sZW5ndGggLSBleHRyYUJ5dGVzOyBpIDwgbGVuZ3RoOyBpICs9IDMpIHtcblx0XHRcdHRlbXAgPSAodWludDhbaV0gPDwgMTYpICsgKHVpbnQ4W2kgKyAxXSA8PCA4KSArICh1aW50OFtpICsgMl0pXG5cdFx0XHRvdXRwdXQgKz0gdHJpcGxldFRvQmFzZTY0KHRlbXApXG5cdFx0fVxuXG5cdFx0Ly8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuXHRcdHN3aXRjaCAoZXh0cmFCeXRlcykge1xuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHR0ZW1wID0gdWludDhbdWludDgubGVuZ3RoIC0gMV1cblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDIpXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPDwgNCkgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gJz09J1xuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHR0ZW1wID0gKHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDJdIDw8IDgpICsgKHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMTApXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPj4gNCkgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDIpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9J1xuXHRcdFx0XHRicmVha1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXRcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzLnRvQnl0ZUFycmF5ID0gYjY0VG9CeXRlQXJyYXlcblx0bW9kdWxlLmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IHVpbnQ4VG9CYXNlNjRcbn0oKSlcbiIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sXG4gICAgICBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxLFxuICAgICAgZU1heCA9ICgxIDw8IGVMZW4pIC0gMSxcbiAgICAgIGVCaWFzID0gZU1heCA+PiAxLFxuICAgICAgbkJpdHMgPSAtNyxcbiAgICAgIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMCxcbiAgICAgIGQgPSBpc0xFID8gLTEgOiAxLFxuICAgICAgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXTtcblxuICBpICs9IGQ7XG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSk7XG4gIHMgPj49ICgtbkJpdHMpO1xuICBuQml0cyArPSBlTGVuO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KTtcblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKTtcbiAgZSA+Pj0gKC1uQml0cyk7XG4gIG5CaXRzICs9IG1MZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpO1xuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhcztcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpO1xuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbik7XG4gICAgZSA9IGUgLSBlQmlhcztcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKTtcbn07XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbihidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgYyxcbiAgICAgIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDEsXG4gICAgICBlTWF4ID0gKDEgPDwgZUxlbikgLSAxLFxuICAgICAgZUJpYXMgPSBlTWF4ID4+IDEsXG4gICAgICBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMCksXG4gICAgICBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSksXG4gICAgICBkID0gaXNMRSA/IDEgOiAtMSxcbiAgICAgIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDA7XG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSk7XG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDA7XG4gICAgZSA9IGVNYXg7XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpO1xuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLTtcbiAgICAgIGMgKj0gMjtcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKys7XG4gICAgICBjIC89IDI7XG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMDtcbiAgICAgIGUgPSBlTWF4O1xuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSBlICsgZUJpYXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpO1xuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG07XG4gIGVMZW4gKz0gbUxlbjtcbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KTtcblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjg7XG59O1xuIiwidmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlcjtcbnZhciBpbnRTaXplID0gNDtcbnZhciB6ZXJvQnVmZmVyID0gbmV3IEJ1ZmZlcihpbnRTaXplKTsgemVyb0J1ZmZlci5maWxsKDApO1xudmFyIGNocnN6ID0gODtcblxuZnVuY3Rpb24gdG9BcnJheShidWYsIGJpZ0VuZGlhbikge1xuICBpZiAoKGJ1Zi5sZW5ndGggJSBpbnRTaXplKSAhPT0gMCkge1xuICAgIHZhciBsZW4gPSBidWYubGVuZ3RoICsgKGludFNpemUgLSAoYnVmLmxlbmd0aCAlIGludFNpemUpKTtcbiAgICBidWYgPSBCdWZmZXIuY29uY2F0KFtidWYsIHplcm9CdWZmZXJdLCBsZW4pO1xuICB9XG5cbiAgdmFyIGFyciA9IFtdO1xuICB2YXIgZm4gPSBiaWdFbmRpYW4gPyBidWYucmVhZEludDMyQkUgOiBidWYucmVhZEludDMyTEU7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnVmLmxlbmd0aDsgaSArPSBpbnRTaXplKSB7XG4gICAgYXJyLnB1c2goZm4uY2FsbChidWYsIGkpKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiB0b0J1ZmZlcihhcnIsIHNpemUsIGJpZ0VuZGlhbikge1xuICB2YXIgYnVmID0gbmV3IEJ1ZmZlcihzaXplKTtcbiAgdmFyIGZuID0gYmlnRW5kaWFuID8gYnVmLndyaXRlSW50MzJCRSA6IGJ1Zi53cml0ZUludDMyTEU7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgZm4uY2FsbChidWYsIGFycltpXSwgaSAqIDQsIHRydWUpO1xuICB9XG4gIHJldHVybiBidWY7XG59XG5cbmZ1bmN0aW9uIGhhc2goYnVmLCBmbiwgaGFzaFNpemUsIGJpZ0VuZGlhbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSBidWYgPSBuZXcgQnVmZmVyKGJ1Zik7XG4gIHZhciBhcnIgPSBmbih0b0FycmF5KGJ1ZiwgYmlnRW5kaWFuKSwgYnVmLmxlbmd0aCAqIGNocnN6KTtcbiAgcmV0dXJuIHRvQnVmZmVyKGFyciwgaGFzaFNpemUsIGJpZ0VuZGlhbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBoYXNoOiBoYXNoIH07XG4iLCJ2YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyXG52YXIgc2hhID0gcmVxdWlyZSgnLi9zaGEnKVxudmFyIHNoYTI1NiA9IHJlcXVpcmUoJy4vc2hhMjU2JylcbnZhciBybmcgPSByZXF1aXJlKCcuL3JuZycpXG52YXIgbWQ1ID0gcmVxdWlyZSgnLi9tZDUnKVxuXG52YXIgYWxnb3JpdGhtcyA9IHtcbiAgc2hhMTogc2hhLFxuICBzaGEyNTY6IHNoYTI1NixcbiAgbWQ1OiBtZDVcbn1cblxudmFyIGJsb2Nrc2l6ZSA9IDY0XG52YXIgemVyb0J1ZmZlciA9IG5ldyBCdWZmZXIoYmxvY2tzaXplKTsgemVyb0J1ZmZlci5maWxsKDApXG5mdW5jdGlvbiBobWFjKGZuLCBrZXksIGRhdGEpIHtcbiAgaWYoIUJ1ZmZlci5pc0J1ZmZlcihrZXkpKSBrZXkgPSBuZXcgQnVmZmVyKGtleSlcbiAgaWYoIUJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkgZGF0YSA9IG5ldyBCdWZmZXIoZGF0YSlcblxuICBpZihrZXkubGVuZ3RoID4gYmxvY2tzaXplKSB7XG4gICAga2V5ID0gZm4oa2V5KVxuICB9IGVsc2UgaWYoa2V5Lmxlbmd0aCA8IGJsb2Nrc2l6ZSkge1xuICAgIGtleSA9IEJ1ZmZlci5jb25jYXQoW2tleSwgemVyb0J1ZmZlcl0sIGJsb2Nrc2l6ZSlcbiAgfVxuXG4gIHZhciBpcGFkID0gbmV3IEJ1ZmZlcihibG9ja3NpemUpLCBvcGFkID0gbmV3IEJ1ZmZlcihibG9ja3NpemUpXG4gIGZvcih2YXIgaSA9IDA7IGkgPCBibG9ja3NpemU7IGkrKykge1xuICAgIGlwYWRbaV0gPSBrZXlbaV0gXiAweDM2XG4gICAgb3BhZFtpXSA9IGtleVtpXSBeIDB4NUNcbiAgfVxuXG4gIHZhciBoYXNoID0gZm4oQnVmZmVyLmNvbmNhdChbaXBhZCwgZGF0YV0pKVxuICByZXR1cm4gZm4oQnVmZmVyLmNvbmNhdChbb3BhZCwgaGFzaF0pKVxufVxuXG5mdW5jdGlvbiBoYXNoKGFsZywga2V5KSB7XG4gIGFsZyA9IGFsZyB8fCAnc2hhMSdcbiAgdmFyIGZuID0gYWxnb3JpdGhtc1thbGddXG4gIHZhciBidWZzID0gW11cbiAgdmFyIGxlbmd0aCA9IDBcbiAgaWYoIWZuKSBlcnJvcignYWxnb3JpdGhtOicsIGFsZywgJ2lzIG5vdCB5ZXQgc3VwcG9ydGVkJylcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBpZighQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSBkYXRhID0gbmV3IEJ1ZmZlcihkYXRhKVxuICAgICAgICBcbiAgICAgIGJ1ZnMucHVzaChkYXRhKVxuICAgICAgbGVuZ3RoICs9IGRhdGEubGVuZ3RoXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgZGlnZXN0OiBmdW5jdGlvbiAoZW5jKSB7XG4gICAgICB2YXIgYnVmID0gQnVmZmVyLmNvbmNhdChidWZzKVxuICAgICAgdmFyIHIgPSBrZXkgPyBobWFjKGZuLCBrZXksIGJ1ZikgOiBmbihidWYpXG4gICAgICBidWZzID0gbnVsbFxuICAgICAgcmV0dXJuIGVuYyA/IHIudG9TdHJpbmcoZW5jKSA6IHJcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZXJyb3IgKCkge1xuICB2YXIgbSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKCcgJylcbiAgdGhyb3cgbmV3IEVycm9yKFtcbiAgICBtLFxuICAgICd3ZSBhY2NlcHQgcHVsbCByZXF1ZXN0cycsXG4gICAgJ2h0dHA6Ly9naXRodWIuY29tL2RvbWluaWN0YXJyL2NyeXB0by1icm93c2VyaWZ5J1xuICAgIF0uam9pbignXFxuJykpXG59XG5cbmV4cG9ydHMuY3JlYXRlSGFzaCA9IGZ1bmN0aW9uIChhbGcpIHsgcmV0dXJuIGhhc2goYWxnKSB9XG5leHBvcnRzLmNyZWF0ZUhtYWMgPSBmdW5jdGlvbiAoYWxnLCBrZXkpIHsgcmV0dXJuIGhhc2goYWxnLCBrZXkpIH1cbmV4cG9ydHMucmFuZG9tQnl0ZXMgPSBmdW5jdGlvbihzaXplLCBjYWxsYmFjaykge1xuICBpZiAoY2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbCkge1xuICAgIHRyeSB7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIHVuZGVmaW5lZCwgbmV3IEJ1ZmZlcihybmcoc2l6ZSkpKVxuICAgIH0gY2F0Y2ggKGVycikgeyBjYWxsYmFjayhlcnIpIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihybmcoc2l6ZSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gZWFjaChhLCBmKSB7XG4gIGZvcih2YXIgaSBpbiBhKVxuICAgIGYoYVtpXSwgaSlcbn1cblxuLy8gdGhlIGxlYXN0IEkgY2FuIGRvIGlzIG1ha2UgZXJyb3IgbWVzc2FnZXMgZm9yIHRoZSByZXN0IG9mIHRoZSBub2RlLmpzL2NyeXB0byBhcGkuXG5lYWNoKFsnY3JlYXRlQ3JlZGVudGlhbHMnXG4sICdjcmVhdGVDaXBoZXInXG4sICdjcmVhdGVDaXBoZXJpdidcbiwgJ2NyZWF0ZURlY2lwaGVyJ1xuLCAnY3JlYXRlRGVjaXBoZXJpdidcbiwgJ2NyZWF0ZVNpZ24nXG4sICdjcmVhdGVWZXJpZnknXG4sICdjcmVhdGVEaWZmaWVIZWxsbWFuJ1xuLCAncGJrZGYyJ10sIGZ1bmN0aW9uIChuYW1lKSB7XG4gIGV4cG9ydHNbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgZXJyb3IoJ3NvcnJ5LCcsIG5hbWUsICdpcyBub3QgaW1wbGVtZW50ZWQgeWV0JylcbiAgfVxufSlcbiIsIi8qXHJcbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcclxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cclxuICogVmVyc2lvbiAyLjEgQ29weXJpZ2h0IChDKSBQYXVsIEpvaG5zdG9uIDE5OTkgLSAyMDAyLlxyXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XHJcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxyXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxyXG4gKi9cclxuXHJcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XHJcblxyXG4vKlxyXG4gKiBQZXJmb3JtIGEgc2ltcGxlIHNlbGYtdGVzdCB0byBzZWUgaWYgdGhlIFZNIGlzIHdvcmtpbmdcclxuICovXHJcbmZ1bmN0aW9uIG1kNV92bV90ZXN0KClcclxue1xyXG4gIHJldHVybiBoZXhfbWQ1KFwiYWJjXCIpID09IFwiOTAwMTUwOTgzY2QyNGZiMGQ2OTYzZjdkMjhlMTdmNzJcIjtcclxufVxyXG5cclxuLypcclxuICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aFxyXG4gKi9cclxuZnVuY3Rpb24gY29yZV9tZDUoeCwgbGVuKVxyXG57XHJcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cclxuICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8ICgobGVuKSAlIDMyKTtcclxuICB4WygoKGxlbiArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBsZW47XHJcblxyXG4gIHZhciBhID0gIDE3MzI1ODQxOTM7XHJcbiAgdmFyIGIgPSAtMjcxNzMzODc5O1xyXG4gIHZhciBjID0gLTE3MzI1ODQxOTQ7XHJcbiAgdmFyIGQgPSAgMjcxNzMzODc4O1xyXG5cclxuICBmb3IodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpXHJcbiAge1xyXG4gICAgdmFyIG9sZGEgPSBhO1xyXG4gICAgdmFyIG9sZGIgPSBiO1xyXG4gICAgdmFyIG9sZGMgPSBjO1xyXG4gICAgdmFyIG9sZGQgPSBkO1xyXG5cclxuICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpKyAwXSwgNyAsIC02ODA4NzY5MzYpO1xyXG4gICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2krIDFdLCAxMiwgLTM4OTU2NDU4Nik7XHJcbiAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSsgMl0sIDE3LCAgNjA2MTA1ODE5KTtcclxuICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcclxuICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpKyA0XSwgNyAsIC0xNzY0MTg4OTcpO1xyXG4gICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2krIDVdLCAxMiwgIDEyMDAwODA0MjYpO1xyXG4gICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2krIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xyXG4gICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2krIDddLCAyMiwgLTQ1NzA1OTgzKTtcclxuICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpKyA4XSwgNyAsICAxNzcwMDM1NDE2KTtcclxuICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcclxuICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpKzEwXSwgMTcsIC00MjA2Myk7XHJcbiAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSsxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XHJcbiAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSsxMl0sIDcgLCAgMTgwNDYwMzY4Mik7XHJcbiAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSsxM10sIDEyLCAtNDAzNDExMDEpO1xyXG4gICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2krMTRdLCAxNywgLTE1MDIwMDIyOTApO1xyXG4gICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2krMTVdLCAyMiwgIDEyMzY1MzUzMjkpO1xyXG5cclxuICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpKyAxXSwgNSAsIC0xNjU3OTY1MTApO1xyXG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krIDZdLCA5ICwgLTEwNjk1MDE2MzIpO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krMTFdLCAxNCwgIDY0MzcxNzcxMyk7XHJcbiAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSsgMF0sIDIwLCAtMzczODk3MzAyKTtcclxuICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpKyA1XSwgNSAsIC03MDE1NTg2OTEpO1xyXG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krMTBdLCA5ICwgIDM4MDE2MDgzKTtcclxuICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpKzE1XSwgMTQsIC02NjA0NzgzMzUpO1xyXG4gICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2krIDRdLCAyMCwgLTQwNTUzNzg0OCk7XHJcbiAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSsgOV0sIDUgLCAgNTY4NDQ2NDM4KTtcclxuICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpKzE0XSwgOSAsIC0xMDE5ODAzNjkwKTtcclxuICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpKyAzXSwgMTQsIC0xODczNjM5NjEpO1xyXG4gICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2krIDhdLCAyMCwgIDExNjM1MzE1MDEpO1xyXG4gICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2krMTNdLCA1ICwgLTE0NDQ2ODE0NjcpO1xyXG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krIDJdLCA5ICwgLTUxNDAzNzg0KTtcclxuICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpKyA3XSwgMTQsICAxNzM1MzI4NDczKTtcclxuICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpKzEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcclxuXHJcbiAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSsgNV0sIDQgLCAtMzc4NTU4KTtcclxuICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcclxuICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpKzExXSwgMTYsICAxODM5MDMwNTYyKTtcclxuICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpKzE0XSwgMjMsIC0zNTMwOTU1Nik7XHJcbiAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSsgMV0sIDQgLCAtMTUzMDk5MjA2MCk7XHJcbiAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSsgNF0sIDExLCAgMTI3Mjg5MzM1Myk7XHJcbiAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSsgN10sIDE2LCAtMTU1NDk3NjMyKTtcclxuICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpKzEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKzEzXSwgNCAsICA2ODEyNzkxNzQpO1xyXG4gICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2krIDBdLCAxMSwgLTM1ODUzNzIyMik7XHJcbiAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSsgM10sIDE2LCAtNzIyNTIxOTc5KTtcclxuICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpKyA2XSwgMjMsICA3NjAyOTE4OSk7XHJcbiAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSsgOV0sIDQgLCAtNjQwMzY0NDg3KTtcclxuICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpKzEyXSwgMTEsIC00MjE4MTU4MzUpO1xyXG4gICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2krMTVdLCAxNiwgIDUzMDc0MjUyMCk7XHJcbiAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSsgMl0sIDIzLCAtOTk1MzM4NjUxKTtcclxuXHJcbiAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSsgMF0sIDYgLCAtMTk4NjMwODQ0KTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKyA3XSwgMTAsICAxMTI2ODkxNDE1KTtcclxuICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpKzE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcclxuICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpKyA1XSwgMjEsIC01NzQzNDA1NSk7XHJcbiAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSsxMl0sIDYgLCAgMTcwMDQ4NTU3MSk7XHJcbiAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSsgM10sIDEwLCAtMTg5NDk4NjYwNik7XHJcbiAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSsxMF0sIDE1LCAtMTA1MTUyMyk7XHJcbiAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XHJcbiAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSsgOF0sIDYgLCAgMTg3MzMxMzM1OSk7XHJcbiAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSsxNV0sIDEwLCAtMzA2MTE3NDQpO1xyXG4gICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2krIDZdLCAxNSwgLTE1NjAxOTgzODApO1xyXG4gICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2krMTNdLCAyMSwgIDEzMDkxNTE2NDkpO1xyXG4gICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2krIDRdLCA2ICwgLTE0NTUyMzA3MCk7XHJcbiAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSsxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XHJcbiAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSsgMl0sIDE1LCAgNzE4Nzg3MjU5KTtcclxuICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xyXG5cclxuICAgIGEgPSBzYWZlX2FkZChhLCBvbGRhKTtcclxuICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcclxuICAgIGMgPSBzYWZlX2FkZChjLCBvbGRjKTtcclxuICAgIGQgPSBzYWZlX2FkZChkLCBvbGRkKTtcclxuICB9XHJcbiAgcmV0dXJuIEFycmF5KGEsIGIsIGMsIGQpO1xyXG5cclxufVxyXG5cclxuLypcclxuICogVGhlc2UgZnVuY3Rpb25zIGltcGxlbWVudCB0aGUgZm91ciBiYXNpYyBvcGVyYXRpb25zIHRoZSBhbGdvcml0aG0gdXNlcy5cclxuICovXHJcbmZ1bmN0aW9uIG1kNV9jbW4ocSwgYSwgYiwgeCwgcywgdClcclxue1xyXG4gIHJldHVybiBzYWZlX2FkZChiaXRfcm9sKHNhZmVfYWRkKHNhZmVfYWRkKGEsIHEpLCBzYWZlX2FkZCh4LCB0KSksIHMpLGIpO1xyXG59XHJcbmZ1bmN0aW9uIG1kNV9mZihhLCBiLCBjLCBkLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIG1kNV9jbW4oKGIgJiBjKSB8ICgofmIpICYgZCksIGEsIGIsIHgsIHMsIHQpO1xyXG59XHJcbmZ1bmN0aW9uIG1kNV9nZyhhLCBiLCBjLCBkLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIG1kNV9jbW4oKGIgJiBkKSB8IChjICYgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xyXG59XHJcbmZ1bmN0aW9uIG1kNV9oaChhLCBiLCBjLCBkLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIG1kNV9jbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KTtcclxufVxyXG5mdW5jdGlvbiBtZDVfaWkoYSwgYiwgYywgZCwgeCwgcywgdClcclxue1xyXG4gIHJldHVybiBtZDVfY21uKGMgXiAoYiB8ICh+ZCkpLCBhLCBiLCB4LCBzLCB0KTtcclxufVxyXG5cclxuLypcclxuICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxyXG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxyXG4gKi9cclxuZnVuY3Rpb24gc2FmZV9hZGQoeCwgeSlcclxue1xyXG4gIHZhciBsc3cgPSAoeCAmIDB4RkZGRikgKyAoeSAmIDB4RkZGRik7XHJcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xyXG4gIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xyXG59XHJcblxyXG4vKlxyXG4gKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBiaXRfcm9sKG51bSwgY250KVxyXG57XHJcbiAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1kNShidWYpIHtcclxuICByZXR1cm4gaGVscGVycy5oYXNoKGJ1ZiwgY29yZV9tZDUsIDE2KTtcclxufTtcclxuIiwiLy8gT3JpZ2luYWwgY29kZSBhZGFwdGVkIGZyb20gUm9iZXJ0IEtpZWZmZXIuXG4vLyBkZXRhaWxzIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBfZ2xvYmFsID0gdGhpcztcblxuICB2YXIgbWF0aFJORywgd2hhdHdnUk5HO1xuXG4gIC8vIE5PVEU6IE1hdGgucmFuZG9tKCkgZG9lcyBub3QgZ3VhcmFudGVlIFwiY3J5cHRvZ3JhcGhpYyBxdWFsaXR5XCJcbiAgbWF0aFJORyA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICB2YXIgYnl0ZXMgPSBuZXcgQXJyYXkoc2l6ZSk7XG4gICAgdmFyIHI7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IHNpemU7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIGJ5dGVzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBieXRlcztcbiAgfVxuXG4gIGlmIChfZ2xvYmFsLmNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgd2hhdHdnUk5HID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG4gICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGJ5dGVzKTtcbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9XG4gIH1cblxuICBtb2R1bGUuZXhwb3J0cyA9IHdoYXR3Z1JORyB8fCBtYXRoUk5HO1xuXG59KCkpXG4iLCIvKlxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBTZWN1cmUgSGFzaCBBbGdvcml0aG0sIFNIQS0xLCBhcyBkZWZpbmVkXG4gKiBpbiBGSVBTIFBVQiAxODAtMVxuICogVmVyc2lvbiAyLjFhIENvcHlyaWdodCBQYXVsIEpvaG5zdG9uIDIwMDAgLSAyMDAyLlxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgZGV0YWlscy5cbiAqL1xuXG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG4vKlxuICogQ2FsY3VsYXRlIHRoZSBTSEEtMSBvZiBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoXG4gKi9cbmZ1bmN0aW9uIGNvcmVfc2hhMSh4LCBsZW4pXG57XG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbGVuICUgMzIpO1xuICB4WygobGVuICsgNjQgPj4gOSkgPDwgNCkgKyAxNV0gPSBsZW47XG5cbiAgdmFyIHcgPSBBcnJheSg4MCk7XG4gIHZhciBhID0gIDE3MzI1ODQxOTM7XG4gIHZhciBiID0gLTI3MTczMzg3OTtcbiAgdmFyIGMgPSAtMTczMjU4NDE5NDtcbiAgdmFyIGQgPSAgMjcxNzMzODc4O1xuICB2YXIgZSA9IC0xMDA5NTg5Nzc2O1xuXG4gIGZvcih2YXIgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNilcbiAge1xuICAgIHZhciBvbGRhID0gYTtcbiAgICB2YXIgb2xkYiA9IGI7XG4gICAgdmFyIG9sZGMgPSBjO1xuICAgIHZhciBvbGRkID0gZDtcbiAgICB2YXIgb2xkZSA9IGU7XG5cbiAgICBmb3IodmFyIGogPSAwOyBqIDwgODA7IGorKylcbiAgICB7XG4gICAgICBpZihqIDwgMTYpIHdbal0gPSB4W2kgKyBqXTtcbiAgICAgIGVsc2Ugd1tqXSA9IHJvbCh3W2otM10gXiB3W2otOF0gXiB3W2otMTRdIF4gd1tqLTE2XSwgMSk7XG4gICAgICB2YXIgdCA9IHNhZmVfYWRkKHNhZmVfYWRkKHJvbChhLCA1KSwgc2hhMV9mdChqLCBiLCBjLCBkKSksXG4gICAgICAgICAgICAgICAgICAgICAgIHNhZmVfYWRkKHNhZmVfYWRkKGUsIHdbal0pLCBzaGExX2t0KGopKSk7XG4gICAgICBlID0gZDtcbiAgICAgIGQgPSBjO1xuICAgICAgYyA9IHJvbChiLCAzMCk7XG4gICAgICBiID0gYTtcbiAgICAgIGEgPSB0O1xuICAgIH1cblxuICAgIGEgPSBzYWZlX2FkZChhLCBvbGRhKTtcbiAgICBiID0gc2FmZV9hZGQoYiwgb2xkYik7XG4gICAgYyA9IHNhZmVfYWRkKGMsIG9sZGMpO1xuICAgIGQgPSBzYWZlX2FkZChkLCBvbGRkKTtcbiAgICBlID0gc2FmZV9hZGQoZSwgb2xkZSk7XG4gIH1cbiAgcmV0dXJuIEFycmF5KGEsIGIsIGMsIGQsIGUpO1xuXG59XG5cbi8qXG4gKiBQZXJmb3JtIHRoZSBhcHByb3ByaWF0ZSB0cmlwbGV0IGNvbWJpbmF0aW9uIGZ1bmN0aW9uIGZvciB0aGUgY3VycmVudFxuICogaXRlcmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHNoYTFfZnQodCwgYiwgYywgZClcbntcbiAgaWYodCA8IDIwKSByZXR1cm4gKGIgJiBjKSB8ICgofmIpICYgZCk7XG4gIGlmKHQgPCA0MCkgcmV0dXJuIGIgXiBjIF4gZDtcbiAgaWYodCA8IDYwKSByZXR1cm4gKGIgJiBjKSB8IChiICYgZCkgfCAoYyAmIGQpO1xuICByZXR1cm4gYiBeIGMgXiBkO1xufVxuXG4vKlxuICogRGV0ZXJtaW5lIHRoZSBhcHByb3ByaWF0ZSBhZGRpdGl2ZSBjb25zdGFudCBmb3IgdGhlIGN1cnJlbnQgaXRlcmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHNoYTFfa3QodClcbntcbiAgcmV0dXJuICh0IDwgMjApID8gIDE1MTg1MDAyNDkgOiAodCA8IDQwKSA/ICAxODU5Nzc1MzkzIDpcbiAgICAgICAgICh0IDwgNjApID8gLTE4OTQwMDc1ODggOiAtODk5NDk3NTE0O1xufVxuXG4vKlxuICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cbiAqL1xuZnVuY3Rpb24gc2FmZV9hZGQoeCwgeSlcbntcbiAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKTtcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhGRkZGKTtcbn1cblxuLypcbiAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAqL1xuZnVuY3Rpb24gcm9sKG51bSwgY250KVxue1xuICByZXR1cm4gKG51bSA8PCBjbnQpIHwgKG51bSA+Pj4gKDMyIC0gY250KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hhMShidWYpIHtcbiAgcmV0dXJuIGhlbHBlcnMuaGFzaChidWYsIGNvcmVfc2hhMSwgMjAsIHRydWUpO1xufTtcbiIsIlxuLyoqXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNlY3VyZSBIYXNoIEFsZ29yaXRobSwgU0hBLTI1NiwgYXMgZGVmaW5lZFxuICogaW4gRklQUyAxODAtMlxuICogVmVyc2lvbiAyLjItYmV0YSBDb3B5cmlnaHQgQW5nZWwgTWFyaW4sIFBhdWwgSm9obnN0b24gMjAwMCAtIDIwMDkuXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKlxuICovXG5cbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbnZhciBzYWZlX2FkZCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKTtcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhGRkZGKTtcbn07XG5cbnZhciBTID0gZnVuY3Rpb24oWCwgbikge1xuICByZXR1cm4gKFggPj4+IG4pIHwgKFggPDwgKDMyIC0gbikpO1xufTtcblxudmFyIFIgPSBmdW5jdGlvbihYLCBuKSB7XG4gIHJldHVybiAoWCA+Pj4gbik7XG59O1xuXG52YXIgQ2ggPSBmdW5jdGlvbih4LCB5LCB6KSB7XG4gIHJldHVybiAoKHggJiB5KSBeICgofngpICYgeikpO1xufTtcblxudmFyIE1haiA9IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgcmV0dXJuICgoeCAmIHkpIF4gKHggJiB6KSBeICh5ICYgeikpO1xufTtcblxudmFyIFNpZ21hMDI1NiA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIChTKHgsIDIpIF4gUyh4LCAxMykgXiBTKHgsIDIyKSk7XG59O1xuXG52YXIgU2lnbWExMjU2ID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gKFMoeCwgNikgXiBTKHgsIDExKSBeIFMoeCwgMjUpKTtcbn07XG5cbnZhciBHYW1tYTAyNTYgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAoUyh4LCA3KSBeIFMoeCwgMTgpIF4gUih4LCAzKSk7XG59O1xuXG52YXIgR2FtbWExMjU2ID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gKFMoeCwgMTcpIF4gUyh4LCAxOSkgXiBSKHgsIDEwKSk7XG59O1xuXG52YXIgY29yZV9zaGEyNTYgPSBmdW5jdGlvbihtLCBsKSB7XG4gIHZhciBLID0gbmV3IEFycmF5KDB4NDI4QTJGOTgsMHg3MTM3NDQ5MSwweEI1QzBGQkNGLDB4RTlCNURCQTUsMHgzOTU2QzI1QiwweDU5RjExMUYxLDB4OTIzRjgyQTQsMHhBQjFDNUVENSwweEQ4MDdBQTk4LDB4MTI4MzVCMDEsMHgyNDMxODVCRSwweDU1MEM3REMzLDB4NzJCRTVENzQsMHg4MERFQjFGRSwweDlCREMwNkE3LDB4QzE5QkYxNzQsMHhFNDlCNjlDMSwweEVGQkU0Nzg2LDB4RkMxOURDNiwweDI0MENBMUNDLDB4MkRFOTJDNkYsMHg0QTc0ODRBQSwweDVDQjBBOURDLDB4NzZGOTg4REEsMHg5ODNFNTE1MiwweEE4MzFDNjZELDB4QjAwMzI3QzgsMHhCRjU5N0ZDNywweEM2RTAwQkYzLDB4RDVBNzkxNDcsMHg2Q0E2MzUxLDB4MTQyOTI5NjcsMHgyN0I3MEE4NSwweDJFMUIyMTM4LDB4NEQyQzZERkMsMHg1MzM4MEQxMywweDY1MEE3MzU0LDB4NzY2QTBBQkIsMHg4MUMyQzkyRSwweDkyNzIyQzg1LDB4QTJCRkU4QTEsMHhBODFBNjY0QiwweEMyNEI4QjcwLDB4Qzc2QzUxQTMsMHhEMTkyRTgxOSwweEQ2OTkwNjI0LDB4RjQwRTM1ODUsMHgxMDZBQTA3MCwweDE5QTRDMTE2LDB4MUUzNzZDMDgsMHgyNzQ4Nzc0QywweDM0QjBCQ0I1LDB4MzkxQzBDQjMsMHg0RUQ4QUE0QSwweDVCOUNDQTRGLDB4NjgyRTZGRjMsMHg3NDhGODJFRSwweDc4QTU2MzZGLDB4ODRDODc4MTQsMHg4Q0M3MDIwOCwweDkwQkVGRkZBLDB4QTQ1MDZDRUIsMHhCRUY5QTNGNywweEM2NzE3OEYyKTtcbiAgdmFyIEhBU0ggPSBuZXcgQXJyYXkoMHg2QTA5RTY2NywgMHhCQjY3QUU4NSwgMHgzQzZFRjM3MiwgMHhBNTRGRjUzQSwgMHg1MTBFNTI3RiwgMHg5QjA1Njg4QywgMHgxRjgzRDlBQiwgMHg1QkUwQ0QxOSk7XG4gICAgdmFyIFcgPSBuZXcgQXJyYXkoNjQpO1xuICAgIHZhciBhLCBiLCBjLCBkLCBlLCBmLCBnLCBoLCBpLCBqO1xuICAgIHZhciBUMSwgVDI7XG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gIG1bbCA+PiA1XSB8PSAweDgwIDw8ICgyNCAtIGwgJSAzMik7XG4gIG1bKChsICsgNjQgPj4gOSkgPDwgNCkgKyAxNV0gPSBsO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgYSA9IEhBU0hbMF07IGIgPSBIQVNIWzFdOyBjID0gSEFTSFsyXTsgZCA9IEhBU0hbM107IGUgPSBIQVNIWzRdOyBmID0gSEFTSFs1XTsgZyA9IEhBU0hbNl07IGggPSBIQVNIWzddO1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgNjQ7IGorKykge1xuICAgICAgaWYgKGogPCAxNikge1xuICAgICAgICBXW2pdID0gbVtqICsgaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBXW2pdID0gc2FmZV9hZGQoc2FmZV9hZGQoc2FmZV9hZGQoR2FtbWExMjU2KFdbaiAtIDJdKSwgV1tqIC0gN10pLCBHYW1tYTAyNTYoV1tqIC0gMTVdKSksIFdbaiAtIDE2XSk7XG4gICAgICB9XG4gICAgICBUMSA9IHNhZmVfYWRkKHNhZmVfYWRkKHNhZmVfYWRkKHNhZmVfYWRkKGgsIFNpZ21hMTI1NihlKSksIENoKGUsIGYsIGcpKSwgS1tqXSksIFdbal0pO1xuICAgICAgVDIgPSBzYWZlX2FkZChTaWdtYTAyNTYoYSksIE1haihhLCBiLCBjKSk7XG4gICAgICBoID0gZzsgZyA9IGY7IGYgPSBlOyBlID0gc2FmZV9hZGQoZCwgVDEpOyBkID0gYzsgYyA9IGI7IGIgPSBhOyBhID0gc2FmZV9hZGQoVDEsIFQyKTtcbiAgICB9XG4gICAgSEFTSFswXSA9IHNhZmVfYWRkKGEsIEhBU0hbMF0pOyBIQVNIWzFdID0gc2FmZV9hZGQoYiwgSEFTSFsxXSk7IEhBU0hbMl0gPSBzYWZlX2FkZChjLCBIQVNIWzJdKTsgSEFTSFszXSA9IHNhZmVfYWRkKGQsIEhBU0hbM10pO1xuICAgIEhBU0hbNF0gPSBzYWZlX2FkZChlLCBIQVNIWzRdKTsgSEFTSFs1XSA9IHNhZmVfYWRkKGYsIEhBU0hbNV0pOyBIQVNIWzZdID0gc2FmZV9hZGQoZywgSEFTSFs2XSk7IEhBU0hbN10gPSBzYWZlX2FkZChoLCBIQVNIWzddKTtcbiAgfVxuICByZXR1cm4gSEFTSDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hhMjU2KGJ1Zikge1xuICByZXR1cm4gaGVscGVycy5oYXNoKGJ1ZiwgY29yZV9zaGEyNTYsIDMyLCB0cnVlKTtcbn07XG4iXX0=
