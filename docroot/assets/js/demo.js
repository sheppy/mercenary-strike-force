(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BootScene, Demo1Scene, GraphicsManager, InputManager, LoadMapDemoScene, MapLightingDemoScene, MenuScene, MoveMapDemoScene, MoveMapSmoothDemoScene, PreLoadScene, Scene, SceneManager,
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

MapLightingDemoScene = require("./Demos/MapLightingDemo/MapLightingDemoScene.coffee");

BootScene = (function(_super) {
  __extends(BootScene, _super);

  function BootScene() {
    return BootScene.__super__.constructor.apply(this, arguments);
  }

  BootScene.prototype.init = function() {
    var demo1Scene, loadMapDemoScene, mapLightingDemoScene, menuScene, moveMapDemoScene, moveMapSmoothDemoScene, preloadScene;
    this.width = 1280;
    this.height = 720;
    GraphicsManager.renderer = GraphicsManager.createRenderer(this.width, this.height, document.body);
    this.sizeCanvas();
    InputManager.init(GraphicsManager.renderer.canvas);
    window.addEventListener("resize", this.sizeCanvas.bind(this));
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
    mapLightingDemoScene = new MapLightingDemoScene();
    SceneManager.add("MapLightingDemo", mapLightingDemoScene);
    mapLightingDemoScene.init();
    this.debugMenu();
    return window.addEventListener("resize", function() {
      GraphicsManager.renderer.canvas.width = window.innerWidth;
      return GraphicsManager.renderer.canvas.height = window.innerHeight;
    });
  };

  BootScene.prototype.activate = function() {
    var defaultScene, sceneShortcut;
    defaultScene = "menu";
    sceneShortcut = window.location.search.match(/\?scene=(.+)/);
    if (sceneShortcut && sceneShortcut[1]) {
      defaultScene = sceneShortcut[1];
    }
    return SceneManager.activate("preload", defaultScene);
  };

  BootScene.prototype.debugMenu = function() {
    var sceneSelector, scenesFolder;
    dat.GUI.prototype.removeFolder = function(name) {
      var folder;
      folder = this.__folders[name];
      if (!folder) {
        return;
      }
      folder.close();
      this.__ul.removeChild(folder.domElement.parentNode);
      delete this.__folders[name];
      return this.onResize();
    };
    window.gui = new dat.GUI();
    SceneManager.debugScene = SceneManager.currentScene;
    scenesFolder = window.gui.addFolder("Scenes");
    scenesFolder.open();
    sceneSelector = scenesFolder.add(SceneManager, "debugScene", ["menu", "demo1", "LoadMapDemo", "MoveMapDemo", "MoveMapSmoothDemo", "MapLightingDemo"]);
    sceneSelector.onFinishChange(function(scene) {
      return SceneManager.activate(scene);
    });
    return SceneManager.onActivate = function() {
      SceneManager.debugScene = SceneManager.currentScene;
      return sceneSelector.updateDisplay();
    };
  };

  BootScene.prototype.sizeCanvas = function() {
    var currentScreenRatio, gameHeight, gameWidth, optimalRatio, scaleToFitX, scaleToFitY;
    gameWidth = window.innerWidth;
    gameHeight = window.innerHeight;
    scaleToFitX = gameWidth / this.width;
    scaleToFitY = gameHeight / this.height;
    currentScreenRatio = gameWidth / gameHeight;
    optimalRatio = Math.min(scaleToFitX, scaleToFitY);
    if (currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79) {
      GraphicsManager.renderer.canvas.style.width = gameWidth + "px";
      GraphicsManager.renderer.canvas.style.height = gameHeight + "px";
    } else {
      GraphicsManager.renderer.canvas.style.width = this.width * optimalRatio + "px";
      GraphicsManager.renderer.canvas.style.height = this.height * optimalRatio + "px";
    }
    InputManager.MOUSE_TRANSFORM_RECT = GraphicsManager.renderer.canvas.getBoundingClientRect();
    InputManager.MOUSE_TRANSFORM_WIDTH = GraphicsManager.renderer.canvas.width;
    InputManager.MOUSE_TRANSFORM_HEIGHT = GraphicsManager.renderer.canvas.height;
    InputManager.MOUSE_OFFSET_X = GraphicsManager.renderer.canvas.offsetLeft;
    return InputManager.MOUSE_OFFSET_Y = GraphicsManager.renderer.canvas.offsetTop;
  };

  return BootScene;

})(Scene);

module.exports = BootScene;


},{"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":18,"../../../vendor/iki-engine/src/Manager/InputManager.coffee":19,"../../../vendor/iki-engine/src/Manager/SceneManager.coffee":20,"../../../vendor/iki-engine/src/Scene.coffee":22,"./Demos/Demo1/Demo1Scene.coffee":2,"./Demos/LoadMapDemo/LoadMapDemoScene.coffee":4,"./Demos/MapLightingDemo/MapLightingDemoScene.coffee":5,"./Demos/MoveMapDemo/MoveMapDemoScene.coffee":7,"./Demos/MoveMapSmoothDemo/MoveMapSmoothDemoScene.coffee":9,"./MenuScene.coffee":10,"./PreLoadScene.coffee":11}],2:[function(require,module,exports){
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


},{"../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":15,"../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":17,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":18,"../../../../../vendor/iki-engine/src/Scene.coffee":22,"./Demo1System.coffee":3}],3:[function(require,module,exports){
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


},{"../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":17,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":18,"../../../../../vendor/iki-engine/src/Manager/InputManager.coffee":19,"../../../../../vendor/iki-engine/src/System.coffee":23}],4:[function(require,module,exports){
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
    map = new Map();
    loading = map.loadMap("assets/map/ice.json");
    return loading.then(function() {
      GraphicsManager.renderer.ctx.fillStyle = "#000";
      GraphicsManager.renderer.ctx.fillRect(0, 0, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
      return map.drawMap(GraphicsManager.renderer.ctx);
    });
  };

  return LoadMapDemoScene;

})(Scene);

module.exports = LoadMapDemoScene;


},{"../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":15,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":18,"../../../../../vendor/iki-engine/src/Map.coffee":21,"../../../../../vendor/iki-engine/src/Scene.coffee":22}],5:[function(require,module,exports){
var AssetManager, EntityManager, GraphicsManager, GraphicsSystem, InputManager, Map, MapLightingInputSystem, MapLightingScene, Scene,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AssetManager = require("../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

GraphicsManager = require("../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

EntityManager = require("../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

InputManager = require("../../../../../vendor/iki-engine/src/Manager/InputManager.coffee");

Scene = require("../../../../../vendor/iki-engine/src/Scene.coffee");

Map = require("../../../../../vendor/iki-engine/src/Map.coffee");

GraphicsSystem = require("../../../../../vendor/iki-engine/src/System/GraphicsSystem.coffee");

MapLightingInputSystem = require("./MapLightingInputSystem.coffee");

MapLightingScene = (function(_super) {
  __extends(MapLightingScene, _super);

  function MapLightingScene() {
    return MapLightingScene.__super__.constructor.apply(this, arguments);
  }

  MapLightingScene.prototype.init = function() {
    var gfx, grd, grd2, grd3;
    this.GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    this.meter = new FPSMeter({
      graph: 1
    });
    this.mapLoaded = false;
    this.addSystem(new MapLightingInputSystem);
    gfx = this.addSystem(new GraphicsSystem);
    gfx.init(GraphicsManager.renderer);
    gfx.onBeforeDraw = this.onBeforeDraw.bind(this);
    gfx.onAfterDraw = this.onAfterDraw.bind(this);
    this.debug = {
      lightBoxFlag: false,
      lightRayFlag: false,
      light1: true,
      light2: true,
      mouseLight: true,
      colouredLights: true,
      lightSize: 300,
      ambient: 0.3,
      ambientColour: [0, 0, 11],
      softShadows: false,
      softShadowCount: 2,
      lightIntensity: 0.5
    };
    this.calculateSoftShadowPositions();
    this.rendererShadows = GraphicsManager.cloneRenderer(GraphicsManager.renderer);
    this.rendererLights = GraphicsManager.cloneRenderer(GraphicsManager.renderer);
    this.rendererAmbient = GraphicsManager.cloneRenderer(GraphicsManager.renderer);
    this.lightCircle = GraphicsManager.createRenderer(250, 250);
    this.lightCircleRed = GraphicsManager.createRenderer(250, 250);
    this.lightCircleGreen = GraphicsManager.createRenderer(250, 250);
    grd = this.lightCircle.ctx.createRadialGradient(125, 125, 0, 125, 125, 125);
    grd.addColorStop(0, "rgba(255,255,255,0.6)");
    grd.addColorStop(0.4, "rgba(255,255,255,0.5)");
    grd.addColorStop(1, "rgba(255,255,150,0)");
    this.lightCircle.ctx.fillStyle = grd;
    this.lightCircle.ctx.fillRect(0, 0, this.lightCircle.canvas.width, this.lightCircle.canvas.height);
    grd2 = this.lightCircleRed.ctx.createRadialGradient(125, 125, 0, 125, 125, 125);
    grd2.addColorStop(0, "rgba(255,0,0,0.6)");
    grd2.addColorStop(0.4, "rgba(255,0,0,0.5)");
    grd2.addColorStop(1, "rgba(255,0,0,0)");
    this.lightCircleRed.ctx.fillStyle = grd2;
    this.lightCircleRed.ctx.fillRect(0, 0, this.lightCircleRed.canvas.width, this.lightCircleRed.canvas.height);
    grd3 = this.lightCircleGreen.ctx.createRadialGradient(125, 125, 0, 125, 125, 125);
    grd3.addColorStop(0, "rgba(0,255,0,0.6)");
    grd3.addColorStop(0.4, "rgba(0,255,0,0.5)");
    grd3.addColorStop(1, "rgba(0,255,0,0)");
    this.lightCircleGreen.ctx.fillStyle = grd3;
    this.lightCircleGreen.ctx.fillRect(0, 0, this.lightCircleGreen.canvas.width, this.lightCircleGreen.canvas.height);
    this.lights = [];
    this.lights.push({
      x: 550,
      y: 200,
      canvas: this.lightCircle.canvas
    });
    this.lights.push({
      x: 650,
      y: 440,
      canvas: this.lightCircleRed.canvas
    });
    this.viewport = {
      type: "Position",
      x: 32,
      y: 32
    };
    this.viewportEntity = EntityManager.createEntity("viewport", false);
    return EntityManager.addComponent(this.viewportEntity, this.viewport);
  };

  MapLightingScene.prototype.calculateSoftShadowPositions = function() {
    var a, r, radius, s, samples, _i, _ref, _results;
    this.shadowChanges = [];
    samples = this.debug.softShadowCount;
    radius = 16;
    _results = [];
    for (s = _i = 0, _ref = samples - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; s = 0 <= _ref ? ++_i : --_i) {
      a = s * this.GOLDEN_ANGLE;
      r = Math.sqrt(s / samples) * radius;
      _results.push(this.shadowChanges.push({
        x: Math.cos(a) * r,
        y: Math.sin(a) * r
      }));
    }
    return _results;
  };

  MapLightingScene.prototype.activate = function() {
    var loading, softShadowCountSelector;
    EntityManager.addEntity(this.viewportEntity);
    this.map = new Map();
    loading = this.map.loadMap("assets/map/test4.json");
    loading.then((function(_this) {
      return function() {
        var height, width;
        _this.corners = _this.findCorners(_this.map);
        width = _this.map.width * _this.map.tileWidth;
        height = _this.map.height * _this.map.tileHeight;
        _this.rendererShadows.canvas.width = width;
        _this.rendererShadows.canvas.height = height;
        _this.rendererLights.canvas.width = width;
        _this.rendererLights.canvas.height = height;
        _this.rendererAmbient.canvas.width = width;
        _this.rendererAmbient.canvas.height = height;
        return _this.mapLoaded = true;
      };
    })(this));
    this.debug.lightFolder = window.gui.addFolder("Light Debug");
    this.debug.lightFolder.open();
    this.debug.lightFolder.add(this.debug, "lightBoxFlag");
    this.debug.lightFolder.add(this.debug, "lightRayFlag");
    this.debug.lightFolder.add(this.debug, "light1");
    this.debug.lightFolder.add(this.debug, "light2");
    this.debug.lightFolder.add(this.debug, "mouseLight");
    this.debug.lightFolder.add(this.debug, "colouredLights");
    this.debug.lightFolder.add(this.debug, "lightSize", 50, 1000);
    this.debug.lightFolder.add(this.debug, "softShadows");
    softShadowCountSelector = this.debug.lightFolder.add(this.debug, "softShadowCount", 1, 50).step(1);
    this.debug.lightFolder.add(this.debug, "lightIntensity", 0, 1).step(0.05);
    this.debug.lightFolder.add(this.debug, "ambient", 0, 1).step(0.05);
    this.debug.lightFolder.addColor(this.debug, "ambientColour");
    return softShadowCountSelector.onFinishChange((function(_this) {
      return function() {
        return _this.calculateSoftShadowPositions();
      };
    })(this));
  };

  MapLightingScene.prototype.deactivate = function() {
    EntityManager.removeEntity(this.viewportEntity);
    return window.gui.removeFolder("Light Debug");
  };

  MapLightingScene.prototype.onBeforeDraw = function(ctx) {
    this.meter.tickStart();
    return this.drawMap(ctx);
  };

  MapLightingScene.prototype.onAfterDraw = function() {
    return this.meter.tick();
  };

  MapLightingScene.prototype.drawMap = function(ctx) {
    if (this.mapLoaded) {
      this.map.drawMapRect(ctx, this.viewport.x, this.viewport.y, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
      return this.drawLighting(ctx);
    }
  };

  MapLightingScene.prototype.drawLighting = function(ctx) {
    var b, g, r;
    r = parseInt(this.debug.ambientColour[0], 10);
    g = parseInt(this.debug.ambientColour[1], 10);
    b = parseInt(this.debug.ambientColour[2], 10);
    this.rendererAmbient.ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (1 - this.debug.ambient) + ")";
    this.rendererAmbient.ctx.clearRect(0, 0, this.rendererLights.canvas.width, this.rendererLights.canvas.height);
    this.rendererAmbient.ctx.fillRect(0, 0, this.rendererLights.canvas.width, this.rendererLights.canvas.height);
    this.rendererShadows.ctx.fillStyle = "#000";
    this.rendererShadows.ctx.fillRect(0, 0, this.rendererShadows.canvas.width, this.rendererShadows.canvas.height);
    this.rendererLights.ctx.clearRect(0, 0, this.rendererLights.canvas.width, this.rendererLights.canvas.height);
    if (this.debug.light1) {
      this.lightTest(this.lights[0]);
    }
    if (this.debug.light2) {
      this.lightTest(this.lights[1]);
    }
    if (this.debug.mouseLight) {
      this.lightTest({
        x: InputManager.mouse.x + this.viewport.x,
        y: InputManager.mouse.y + this.viewport.y,
        canvas: this.lightCircleGreen.canvas
      }, ctx);
    }
    return ctx.drawImage(this.rendererAmbient.canvas, 0 - this.viewport.x, 0 - this.viewport.y);
  };

  MapLightingScene.prototype.lightTest = function(light) {
    var change, intensity, _i, _len, _ref;
    this.rendererShadows.ctx.fillStyle = "#000";
    this.rendererShadows.ctx.fillRect(0, 0, this.rendererShadows.canvas.width, this.rendererShadows.canvas.height);
    this.rendererLights.ctx.clearRect(0, 0, this.rendererLights.canvas.width, this.rendererLights.canvas.height);
    intensity = this.debug.lightIntensity;
    if (this.debug.softShadows) {
      intensity = this.debug.lightIntensity / this.debug.softShadowCount;
    }
    this.rendererShadows.ctx.globalCompositeOperation = "destination-out";
    this.rendererShadows.ctx.fillStyle = "rgba(255,255,255," + intensity + ")";
    if (this.debug.softShadows) {
      _ref = this.shadowChanges;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        change = _ref[_i];
        this.renderRay(light.x + change.x, light.y + change.y, this.rendererShadows.ctx);
      }
    } else {
      this.renderRay(light.x, light.y, this.rendererShadows.ctx);
    }
    this.rendererShadows.ctx.globalCompositeOperation = "source-over";
    this.renderLight(light, this.rendererLights.ctx);
    this.rendererLights.ctx.globalCompositeOperation = "destination-out";
    this.rendererLights.ctx.drawImage(this.rendererShadows.canvas, 0, 0);
    this.rendererLights.ctx.globalCompositeOperation = "source-over";
    this.rendererAmbient.ctx.globalCompositeOperation = "destination-out";
    this.rendererAmbient.ctx.drawImage(this.rendererLights.canvas, 0, 0);
    this.rendererAmbient.ctx.globalCompositeOperation = "source-over";
    if (this.debug.colouredLights) {
      this.rendererAmbient.ctx.globalAlpha = "0.4";
      this.rendererAmbient.ctx.drawImage(this.rendererLights.canvas, 0, 0);
      return this.rendererAmbient.ctx.globalAlpha = "1";
    }
  };

  MapLightingScene.prototype.renderLight = function(light, ctx) {
    var halfLightSize;
    halfLightSize = this.debug.lightSize / 2;
    ctx.drawImage(light.canvas, 0, 0, 250, 250, light.x - halfLightSize, light.y - halfLightSize, this.debug.lightSize, this.debug.lightSize);
    if (this.debug.lightBoxFlag) {
      this.renderCorner(light, "#ff0");
      GraphicsManager.renderer.ctx.strokeStyle = "#ff0";
      return GraphicsManager.renderer.ctx.strokeRect(light.x - halfLightSize - this.viewport.x, light.y - halfLightSize - this.viewport.y, this.debug.lightSize, this.debug.lightSize);
    }
  };

  MapLightingScene.prototype.renderCorner = function(corner, color) {
    if (color == null) {
      color = "#0f0";
    }
    GraphicsManager.renderer.ctx.fillStyle = color;
    GraphicsManager.renderer.ctx.beginPath();
    GraphicsManager.renderer.ctx.arc(corner.x - this.viewport.x, corner.y - this.viewport.y, 3, 0, Math.PI * 2);
    return GraphicsManager.renderer.ctx.fill();
  };

  MapLightingScene.prototype.renderRay = function(vX, vY, ctx) {
    var angle, corner, dX, dY, i, intersection, intersections, m, _i, _j, _k, _len, _len1, _len2, _ref;
    intersections = [];
    _ref = this.corners;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      corner = _ref[_i];
      angle = 0.02;
      this.rayTraceByAngle(vX, vY, corner.x, corner.y, 0 - angle, this.map, intersections);
      this.rayTrace(vX, vY, corner.x, corner.y, this.map, intersections);
      this.rayTraceByAngle(vX, vY, corner.x, corner.y, angle, this.map, intersections);
    }
    for (_j = 0, _len1 = intersections.length; _j < _len1; _j++) {
      intersection = intersections[_j];
      dX = vX - intersection.x;
      dY = vY - intersection.y;
      intersection.angle = Math.atan2(dX, dY);
      if (this.debug.lightRayFlag) {
        this.renderCorner(intersection, "#ff0");
        GraphicsManager.renderer.ctx.strokeStyle = "#fff";
        GraphicsManager.renderer.ctx.beginPath();
        GraphicsManager.renderer.ctx.moveTo(vX - this.viewport.x, vY - this.viewport.y);
        GraphicsManager.renderer.ctx.lineTo(intersection.x - this.viewport.x, intersection.y - this.viewport.y);
        GraphicsManager.renderer.ctx.stroke();
      }
    }
    intersections.sort(function(a, b) {
      return a.angle - b.angle;
    });
    ctx.beginPath();
    ctx.moveTo(intersections[0].x, intersections[0].y);
    m = intersections.length;
    for (i = _k = 0, _len2 = intersections.length; _k < _len2; i = ++_k) {
      intersection = intersections[i];
      if (i === 0) {
        ctx.lineTo(intersections[m - 1].x, intersections[m - 1].y);
      } else {
        ctx.lineTo(intersections[i - 1].x, intersections[i - 1].y);
      }
    }
    return ctx.fill();
  };

  MapLightingScene.prototype.findCorners = function(map) {
    var corners, layer, layerIndex, x, y, _i, _j, _ref, _ref1;
    corners = [];
    corners.push({
      x: 0,
      y: 0
    });
    corners.push({
      x: 0,
      y: map.height * map.tileHeight
    });
    corners.push({
      x: map.width * map.tileWidth,
      y: 0
    });
    corners.push({
      x: map.width * map.tileWidth,
      y: map.height * map.tileHeight
    });
    layerIndex = map.getLayerIndexWithProperty("blocks-light", "true");
    layer = map.layers[layerIndex].data;
    if (!layer) {
      return corners;
    }
    for (y = _i = 0, _ref = map.height - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      for (x = _j = 0, _ref1 = map.width - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        if (!(y === 0 || x === 0 || y === map.height - 1 || x === map.width - 1)) {
          if ((layer[y][x] && !layer[y][x - 1] && !layer[y - 1][x] && !layer[y - 1][x - 1]) || (!layer[y][x] && layer[y - 1][x] && layer[y][x - 1] && layer[y - 1][x - 1])) {
            corners.push({
              x: x * map.tileWidth,
              y: y * map.tileHeight
            });
          }
          if ((layer[y][x] && !layer[y][x + 1] && !layer[y - 1][x] && !layer[y - 1][x + 1]) || (!layer[y][x] && layer[y - 1][x] && layer[y][x + 1] && layer[y - 1][x + 1])) {
            corners.push({
              x: (x + 1) * map.tileWidth,
              y: y * map.tileHeight
            });
          }
          if ((layer[y][x] && !layer[y][x - 1] && !layer[y + 1][x] && !layer[y + 1][x - 1]) || (!layer[y][x] && layer[y + 1][x] && layer[y][x - 1] && layer[y + 1][x - 1])) {
            corners.push({
              x: x * map.tileWidth,
              y: (y + 1) * map.tileHeight
            });
          }
          if ((layer[y][x] && !layer[y][x + 1] && !layer[y + 1][x] && !layer[y + 1][x + 1]) || (!layer[y][x] && layer[y + 1][x] && layer[y][x + 1] && layer[y + 1][x + 1])) {
            corners.push({
              x: (x + 1) * map.tileWidth,
              y: (y + 1) * map.tileHeight
            });
          }
        }
      }
    }
    return corners;
  };

  MapLightingScene.prototype.rayTraceByAngle = function(x0, y0, x1, y1, angle, map, intersections) {
    var px, py;
    px = Math.cos(angle) * (x1 - x0) - Math.sin(angle) * (y1 - y0) + x0;
    py = Math.sin(angle) * (x1 - x0) + Math.cos(angle) * (y1 - y0) + y0;
    return this.rayTrace(x0, y0, px, py, map, intersections);
  };

  MapLightingScene.prototype.rayTrace = function(x0, y0, x1, y1, map, intersections) {
    var dx, dy, error, layer, layerIndex, mX, mY, n, x, xInc, y, yInc;
    dx = Math.abs(x1 - x0);
    dy = Math.abs(y1 - y0);
    x = x0;
    y = y0;
    n = 1200;
    xInc = x1 > x0 ? 1 : -1;
    yInc = y1 > y0 ? 1 : -1;
    error = dx - dy;
    dx = dx * 2;
    dy = dy * 2;
    layerIndex = map.getLayerIndexWithProperty("blocks-light", "true");
    layer = map.layers[layerIndex].data;
    if (!layer) {
      return null;
    }
    while (n > 0) {
      mX = Math.floor(x / map.tileWidth);
      mY = Math.floor(y / map.tileHeight);
      if (layer[mY] && layer[mY][mX]) {
        break;
      }
      if (error > 0) {
        x += xInc;
        error -= dy;
      } else {
        y += yInc;
        error += dx;
      }
      --n;
    }
    intersections.push({
      x: x,
      y: y
    });
    return null;
  };

  return MapLightingScene;

})(Scene);

module.exports = MapLightingScene;


},{"../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":15,"../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":17,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":18,"../../../../../vendor/iki-engine/src/Manager/InputManager.coffee":19,"../../../../../vendor/iki-engine/src/Map.coffee":21,"../../../../../vendor/iki-engine/src/Scene.coffee":22,"../../../../../vendor/iki-engine/src/System/GraphicsSystem.coffee":24,"./MapLightingInputSystem.coffee":6}],6:[function(require,module,exports){
var EntityManager, InputManager, MapLighingInputSystem, System,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

System = require("../../../../../vendor/iki-engine/src/System.coffee");

InputManager = require("../../../../../vendor/iki-engine/src/Manager/InputManager.coffee");

EntityManager = require("../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

MapLighingInputSystem = (function(_super) {
  __extends(MapLighingInputSystem, _super);

  function MapLighingInputSystem() {
    return MapLighingInputSystem.__super__.constructor.apply(this, arguments);
  }

  MapLighingInputSystem.prototype.onUpdate = function(dt) {
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

  return MapLighingInputSystem;

})(System);

module.exports = MapLighingInputSystem;


},{"../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":17,"../../../../../vendor/iki-engine/src/Manager/InputManager.coffee":19,"../../../../../vendor/iki-engine/src/System.coffee":23}],7:[function(require,module,exports){
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
    loading = this.map.loadMap("assets/map/test2.json");
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


},{"../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":15,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":18,"../../../../../vendor/iki-engine/src/Manager/InputManager.coffee":19,"../../../../../vendor/iki-engine/src/Map.coffee":21,"../../../../../vendor/iki-engine/src/Scene.coffee":22}],8:[function(require,module,exports){
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


},{"../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":17,"../../../../../vendor/iki-engine/src/Manager/InputManager.coffee":19,"../../../../../vendor/iki-engine/src/System.coffee":23}],9:[function(require,module,exports){
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
    loading = this.map.loadMap("assets/map/test3.json");
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


},{"../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee":15,"../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee":17,"../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":18,"../../../../../vendor/iki-engine/src/Map.coffee":21,"../../../../../vendor/iki-engine/src/Scene.coffee":22,"../../../../../vendor/iki-engine/src/System/GraphicsSystem.coffee":24,"./MapMoveInputSystem.coffee":8}],10:[function(require,module,exports){
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
    AudioManager.load("menu-select", "assets/sound/UI pack 1/MENU B_Select.wav");
    AudioManager.load("menu-back", "assets/sound/UI pack 1/MENU B_Back.wav");
    this.loadMenu("assets/menu/main.json");
    return this.loadMenu("assets/menu/demos.json");
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


},{"../../../vendor/iki-engine/src/Manager/AssetManager.coffee":15,"../../../vendor/iki-engine/src/Manager/AudioManager.coffee":16,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":18,"../../../vendor/iki-engine/src/Manager/InputManager.coffee":19,"../../../vendor/iki-engine/src/Manager/SceneManager.coffee":20,"../../../vendor/iki-engine/src/Scene.coffee":22,"../../../vendor/iki-engine/src/Util.coffee":25}],11:[function(require,module,exports){
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

  PreLoadScene.prototype.activate = function(scene) {
    var loadAsset;
    if (scene == null) {
      scene = "menu";
    }
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height);
    this.renderLoadingBar(0);
    this.renderLoadingText("Loading...");
    AssetManager.onProgress = this.onProgress.bind(this);
    loadAsset = AssetManager.load("assets/demo-assets.json");
    return loadAsset.then(function() {
      return SceneManager.activate(scene);
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


},{"../../../vendor/iki-engine/src/Manager/AssetManager.coffee":15,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":18,"../../../vendor/iki-engine/src/Manager/SceneManager.coffee":20,"../../../vendor/iki-engine/src/Scene.coffee":22}],12:[function(require,module,exports){
var BootScene, Engine, game;

Engine = require("../../vendor/iki-engine/src/Engine.coffee");

BootScene = require("./State/BootScene.coffee");

game = new Engine;

game.start(new BootScene);


},{"../../vendor/iki-engine/src/Engine.coffee":13,"./State/BootScene.coffee":1}],13:[function(require,module,exports){
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


},{"./Manager/SceneManager.coffee":20}],14:[function(require,module,exports){
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


},{"../vendor/node-uuid/uuid.js":26}],15:[function(require,module,exports){
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


},{"../Util.coffee":25}],16:[function(require,module,exports){
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


},{}],17:[function(require,module,exports){
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
    EntityManager.removeAllComponents(entity);
    return this.removeEntity(entity);
  };

  EntityManager.deleteAllEntities = function() {
    var entity, _i, _len, _ref;
    _ref = this.entities;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      entity = _ref[_i];
      EntityManager.removeAllComponents(entity);
    }
    return this.entities.length = 0;
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


},{"../../vendor/node-uuid/uuid.js":26,"../Entity.coffee":14}],18:[function(require,module,exports){
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
    renderer.width = width;
    renderer.height = height;
    return renderer;
  };

  GraphicsManager.cloneRenderer = function(oldRenderer, appendTo) {
    return GraphicsManager.createRenderer(oldRenderer.canvas.width, oldRenderer.canvas.height, appendTo);
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

  GraphicsManager.roundedRectStroke = function(ctx, x, y, w, h, radius) {
    var b, r;
    r = x + w;
    b = y + h;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(r - radius, y);
    ctx.quadraticCurveTo(r, y, r, y + radius);
    ctx.lineTo(r, y + h - radius);
    ctx.quadraticCurveTo(r, b, r - radius, b);
    ctx.lineTo(x + radius, b);
    ctx.quadraticCurveTo(x, b, x, b - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    return ctx.stroke();
  };

  GraphicsManager.roundedRectFill = function(ctx, x, y, w, h, radius) {
    var b, r;
    r = x + w;
    b = y + h;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(r - radius, y);
    ctx.quadraticCurveTo(r, y, r, y + radius);
    ctx.lineTo(r, y + h - radius);
    ctx.quadraticCurveTo(r, b, r - radius, b);
    ctx.lineTo(x + radius, b);
    ctx.quadraticCurveTo(x, b, x, b - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    return ctx.fill();
  };

  return GraphicsManager;

})();

module.exports = GraphicsManager;


},{}],19:[function(require,module,exports){
var InputManager;

InputManager = (function() {
  function InputManager() {}

  InputManager.CLICK_MOVE_THRESHOLD = 3;

  InputManager.MOUSE_TRANSFORM_RECT = false;

  InputManager.MOUSE_TRANSFORM_WIDTH = false;

  InputManager.MOUSE_TRANSFORM_HEIGHT = false;

  InputManager.MOUSE_OFFSET_X = false;

  InputManager.MOUSE_OFFSET_Y = false;

  InputManager.mouse = {
    x: 0,
    y: 0,
    down: false,
    downX: 0,
    downY: 0
  };

  InputManager.key = {
    up: false,
    down: false,
    left: false,
    right: false
  };

  InputManager.init = function(element) {
    if (element == null) {
      element = document;
    }
    element.addEventListener("click", InputManager.mouseClick);
    element.addEventListener("mousedown", InputManager.mouseDown);
    element.addEventListener("touchstart", InputManager.mouseDown);
    element.addEventListener("mouseup", InputManager.mouseUp);
    element.addEventListener("touchend", InputManager.mouseUp);
    element.addEventListener("mousemove", InputManager.mouseMove);
    element.addEventListener("touchmove", InputManager.mouseMove);
    document.addEventListener("keyup", InputManager.keyUp);
    return document.addEventListener("keydown", InputManager.keyDown);
  };

  InputManager.mouseClick = function(e) {
    var moveX, moveY, x, y;
    x = InputManager.transformMouseX(e.x);
    y = InputManager.transformMouseY(e.y);
    moveX = Math.abs(InputManager.mouse.downX - x);
    moveY = Math.abs(InputManager.mouse.downY - y);
    if (moveX < InputManager.CLICK_MOVE_THRESHOLD && moveY < InputManager.CLICK_MOVE_THRESHOLD) {
      return typeof InputManager.onMouseClick === "function" ? InputManager.onMouseClick({
        x: x,
        y: y
      }) : void 0;
    }
  };

  InputManager.mouseDown = function(e) {
    var x, y;
    if (e.changedTouches) {
      x = e.changedTouches[0].pageX;
      y = e.changedTouches[0].pageY;
    } else {
      x = e.x;
      y = e.y;
    }
    InputManager.mouse.x = InputManager.mouse.downX = InputManager.transformMouseX(x);
    InputManager.mouse.y = InputManager.mouse.downY = InputManager.transformMouseY(y);
    return InputManager.mouse.down = true;
  };

  InputManager.mouseUp = function(e) {
    var x, y;
    if (e.changedTouches) {
      x = e.changedTouches[0].pageX;
      y = e.changedTouches[0].pageY;
    } else {
      x = e.x;
      y = e.y;
    }
    InputManager.mouse.x = InputManager.transformMouseX(x);
    InputManager.mouse.y = InputManager.transformMouseY(y);
    return InputManager.mouse.down = false;
  };

  InputManager.mouseMove = function(e) {
    var x, y;
    if (e.changedTouches) {
      x = e.changedTouches[0].pageX;
      y = e.changedTouches[0].pageY;
    } else {
      x = e.x;
      y = e.y;
    }
    InputManager.mouse.x = x = InputManager.transformMouseX(x);
    InputManager.mouse.y = y = InputManager.transformMouseY(y);
    if (typeof InputManager.onMouseMove === "function") {
      InputManager.onMouseMove({
        x: x,
        y: y
      });
    }
    return e.preventDefault();
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

  InputManager.transformMouseX = function(x) {
    if (InputManager.MOUSE_TRANSFORM_RECT && InputManager.MOUSE_TRANSFORM_WIDTH) {
      x = (x / InputManager.MOUSE_TRANSFORM_RECT.right) * InputManager.MOUSE_TRANSFORM_WIDTH;
    }
    if (InputManager.MOUSE_OFFSET_X) {
      x -= InputManager.MOUSE_OFFSET_X;
    }
    return x;
  };

  InputManager.transformMouseY = function(y) {
    if (this.MOUSE_TRANSFORM_RECT && this.MOUSE_TRANSFORM_HEIGHT) {
      y = (y / this.MOUSE_TRANSFORM_RECT.bottom) * this.MOUSE_TRANSFORM_HEIGHT;
    }
    if (InputManager.MOUSE_OFFSET_Y) {
      y -= InputManager.MOUSE_OFFSET_Y;
    }
    return y;
  };

  return InputManager;

})();

module.exports = InputManager;


},{}],20:[function(require,module,exports){
var SceneManager,
  __slice = [].slice;

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

  SceneManager.activate = function() {
    var args, name, old, _ref;
    name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    old = SceneManager.current();
    if (old) {
      old.deactivate();
    }
    SceneManager.currentScene = name;
    SceneManager.onActivate(name);
    if ((_ref = SceneManager.current()) != null) {
      _ref.activate.apply(SceneManager.current(), args);
    }
    return null;
  };

  SceneManager.onActivate = function(name) {};

  return SceneManager;

})();

module.exports = SceneManager;


},{}],21:[function(require,module,exports){
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
        tileSet.img.src = "assets/map/" + tileSet.src;
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
    var layer, x, y, _i, _j, _ref, _ref1, _ref2;
    if (layerData.type !== "tilelayer") {
      return;
    }
    layer = {
      name: layerData.name,
      data: [],
      visible: layerData.visible,
      properties: (_ref = layerData.properties) != null ? _ref : {}
    };
    for (y = _i = 0, _ref1 = this.height - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; y = 0 <= _ref1 ? ++_i : --_i) {
      layer.data[y] = [];
      for (x = _j = 0, _ref2 = this.width - 1; 0 <= _ref2 ? _j <= _ref2 : _j >= _ref2; x = 0 <= _ref2 ? ++_j : --_j) {
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

  Map.prototype.getRenderRect = function(x, y, w, h) {
    var rect;
    rect = {
      left: Math.floor(x / this.tileWidth),
      right: Math.ceil((x + w) / this.tileWidth),
      top: Math.floor(y / this.tileHeight),
      bottom: Math.ceil((y + h) / this.tileHeight)
    };
    if (rect.left < 0) {
      rect.left = 0;
    }
    if (rect.top < 0) {
      rect.top = 0;
    }
    if (rect.right >= this.width) {
      rect.right = this.width - 1;
    }
    if (rect.bottom >= this.height) {
      rect.bottom = this.height - 1;
    }
    return rect;
  };

  Map.prototype.drawMapRect = function(ctx, x, y, w, h) {
    var layer, rect, xOffset, yOffset, _i, _ref, _results;
    rect = this.getRenderRect(x, y, w, h);
    xOffset = 0 - x;
    yOffset = 0 - y;
    _results = [];
    for (layer = _i = 0, _ref = this.layers.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; layer = 0 <= _ref ? ++_i : --_i) {
      if (this.layers[layer].visible) {
        _results.push((function() {
          var _j, _ref1, _ref2, _results1;
          _results1 = [];
          for (y = _j = _ref1 = rect.top, _ref2 = rect.bottom; _ref1 <= _ref2 ? _j <= _ref2 : _j >= _ref2; y = _ref1 <= _ref2 ? ++_j : --_j) {
            _results1.push((function() {
              var _k, _ref3, _ref4, _results2;
              _results2 = [];
              for (x = _k = _ref3 = rect.left, _ref4 = rect.right; _ref3 <= _ref4 ? _k <= _ref4 : _k >= _ref4; x = _ref3 <= _ref4 ? ++_k : --_k) {
                _results2.push(this.drawTileFromNumber(ctx, x, y, this.tileWidth, this.tileHeight, this.layers[layer].data[y][x], xOffset, yOffset));
              }
              return _results2;
            }).call(this));
          }
          return _results1;
        }).call(this));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Map.prototype.drawLayerRect = function(ctx, x, y, w, h, layerIndex) {
    var layer, rect, xOffset, yOffset, _i, _ref, _ref1, _results;
    rect = this.getRenderRect(x, y, w, h);
    xOffset = 0 - x;
    yOffset = 0 - y;
    layer = this.layers[layerIndex];
    _results = [];
    for (y = _i = _ref = rect.top, _ref1 = rect.bottom; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; y = _ref <= _ref1 ? ++_i : --_i) {
      _results.push((function() {
        var _j, _ref2, _ref3, _results1;
        _results1 = [];
        for (x = _j = _ref2 = rect.left, _ref3 = rect.right; _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; x = _ref2 <= _ref3 ? ++_j : --_j) {
          _results1.push(this.drawTileFromNumber(ctx, x, y, this.tileWidth, this.tileHeight, this.layers[layer].data[y][x], xOffset, yOffset));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  Map.prototype.getLayerIndexByName = function(name) {
    var layer, _i, _ref;
    for (layer = _i = 0, _ref = this.layers.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; layer = 0 <= _ref ? ++_i : --_i) {
      if (this.layers[layer].name === name) {
        return layer;
      }
    }
  };

  Map.prototype.getLayerIndexWithProperty = function(name, value) {
    var layer, _i, _ref;
    for (layer = _i = 0, _ref = this.layers.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; layer = 0 <= _ref ? ++_i : --_i) {
      if (this.layers[layer].properties[name] && this.layers[layer].properties[name] === value) {
        return layer;
      }
    }
  };

  return Map;

})();

module.exports = Map;


},{"./Util.coffee":25}],22:[function(require,module,exports){
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


},{}],23:[function(require,module,exports){
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


},{}],24:[function(require,module,exports){
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


},{"../Manager/EntityManager.coffee":17,"../Manager/GraphicsManager.coffee":18,"../System.coffee":23}],25:[function(require,module,exports){
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

  Util.isPointInRect = function(x, y, rx, ry, rw, rh) {
    return x >= rx && x <= rx + rw && y >= ry && y <= ry + rh;
  };

  return Util;

})();

module.exports = Util;


},{}],26:[function(require,module,exports){
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
},{"buffer":27,"crypto":31}],27:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
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

},{"base64-js":28,"ieee754":29}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{"buffer":27}],31:[function(require,module,exports){
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

},{"./md5":32,"./rng":33,"./sha":34,"./sha256":35,"buffer":27}],32:[function(require,module,exports){
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

},{"./helpers":30}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{"./helpers":30}],35:[function(require,module,exports){

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

},{"./helpers":30}]},{},[12])