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
    var gui, sceneSelector, scenesFolder;
    gui = new dat.GUI();
    SceneManager.debugScene = SceneManager.currentScene;
    scenesFolder = gui.addFolder("Scenes");
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
    var gfx, grd, grd2;
    this.meter = new FPSMeter({
      graph: 1
    });
    this.mapLoaded = false;
    this.addSystem(new MapLightingInputSystem);
    gfx = this.addSystem(new GraphicsSystem);
    gfx.init(GraphicsManager.renderer);
    gfx.onBeforeDraw = this.onBeforeDraw.bind(this);
    gfx.onAfterDraw = this.onAfterDraw.bind(this);
    this.darkness = GraphicsManager.cloneRenderer(GraphicsManager.renderer);
    this.lightRenderer = GraphicsManager.cloneRenderer(GraphicsManager.renderer);
    this.lightCircle = GraphicsManager.createRenderer(250, 250);
    this.lightCircle2 = GraphicsManager.createRenderer(250, 250);
    grd = this.lightCircle.ctx.createRadialGradient(125, 125, 0, 125, 125, 125);
    grd.addColorStop(0, 'rgba(255, 255, 215, 1)');
    grd.addColorStop(1, 'rgba(255, 255, 215, 0)');
    this.lightCircle.ctx.fillStyle = grd;
    this.lightCircle.ctx.fillRect(0, 0, this.lightCircle.canvas.width, this.lightCircle.canvas.height);
    grd2 = this.lightCircle2.ctx.createRadialGradient(125, 125, 0, 125, 125, 125);
    grd2.addColorStop(0, 'rgba(255, 0, 0, 0.6)');
    grd2.addColorStop(1, 'rgba(255, 0, 0, 0)');
    this.lightCircle2.ctx.fillStyle = grd2;
    this.lightCircle2.ctx.fillRect(0, 0, this.lightCircle2.canvas.width, this.lightCircle2.canvas.height);
    this.viewport = {
      type: "Position",
      x: 0,
      y: 0
    };
    this.viewportEntity = EntityManager.createEntity("viewport", false);
    return EntityManager.addComponent(this.viewportEntity, this.viewport);
  };

  MapLightingScene.prototype.activate = function() {
    var loading;
    EntityManager.addEntity(this.viewportEntity);
    this.map = new Map();
    loading = this.map.loadMap("assets/map/test3.json");
    return loading.then((function(_this) {
      return function() {
        _this.corners = _this.findCorners(_this.map);
        return _this.mapLoaded = true;
      };
    })(this));
  };

  MapLightingScene.prototype.deactivate = function() {
    return EntityManager.removeEntity(this.viewportEntity);
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
      this.darkness.ctx.fillStyle = "rgba(0,0,11,0.7)";
      this.darkness.ctx.clearRect(0, 0, this.darkness.canvas.width, this.darkness.canvas.height);
      this.darkness.ctx.fillRect(0, 0, this.darkness.canvas.width, this.darkness.canvas.height);
      this.darkness.ctx.globalCompositeOperation = "destination-out";
      this.darkness.ctx.drawImage(this.lightCircle.canvas, 0, 0, 250, 250, 300 - 50, 300 - 50, 300, 300);
      this.darkness.ctx.drawImage(this.lightCircle.canvas, 0, 0, 250, 250, InputManager.mouse.x - 100, InputManager.mouse.y - 150, 300, 300);
      this.darkness.ctx.globalCompositeOperation = "source-over";
      this.darkness.ctx.drawImage(this.lightCircle2.canvas, 0, 0, 250, 250, 300 - 50, 300 - 50, 300, 300);
      this.lightRenderer.ctx.fillStyle = "#000";
      this.lightRenderer.ctx.fillRect(0, 0, this.lightRenderer.canvas.width, this.lightRenderer.canvas.height);
      this.renderRay(400, 400, this.lightRenderer.ctx);
      this.renderRay(InputManager.mouse.x, InputManager.mouse.y, this.lightRenderer.ctx);
      this.darkness.ctx.globalCompositeOperation = "destination-out";
      this.darkness.ctx.drawImage(this.lightRenderer.canvas, 0, 0);
      this.darkness.ctx.globalCompositeOperation = "source-over";
      this.lightRenderer.ctx.globalCompositeOperation = "source-in";
      this.lightRenderer.ctx.fillStyle = "rgba(0,0,11,0.7)";
      this.lightRenderer.ctx.fillRect(0, 0, this.lightRenderer.canvas.width, this.lightRenderer.canvas.height);
      this.lightRenderer.ctx.globalCompositeOperation = "source-over";
      GraphicsManager.renderer.ctx.drawImage(this.darkness.canvas, 0, 0);
      return GraphicsManager.renderer.ctx.drawImage(this.lightRenderer.canvas, 0, 0);
    }
  };

  MapLightingScene.prototype.renderCorner = function(corner, color) {
    if (color == null) {
      color = "#0f0";
    }
    GraphicsManager.renderer.ctx.fillStyle = color;
    GraphicsManager.renderer.ctx.beginPath();
    GraphicsManager.renderer.ctx.arc(corner.x, corner.y, 3, 0, Math.PI * 2);
    return GraphicsManager.renderer.ctx.fill();
  };

  MapLightingScene.prototype.renderRay = function(vX, vY, ctx) {
    var angle, corner, dX, dY, i, intersection, intersections, m, _i, _j, _k, _len, _len1, _len2, _ref;
    intersections = [];
    _ref = this.corners;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      corner = _ref[_i];
      angle = 0.1;
      this.renderCorner(corner, "#0f0");
      this.rayTraceByAngle(vX, vY, corner.x, corner.y, 0 - angle, this.map, intersections);
      this.rayTrace(vX, vY, corner.x, corner.y, this.map, intersections);
      this.rayTraceByAngle(vX, vY, corner.x, corner.y, angle, this.map, intersections);
    }
    for (_j = 0, _len1 = intersections.length; _j < _len1; _j++) {
      intersection = intersections[_j];
      dX = vX - intersection.x;
      dY = vY - intersection.y;
      intersection.angle = Math.atan2(dX, dY);
    }
    intersections.sort(function(a, b) {
      return a.angle - b.angle;
    });
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "#fff";
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
    ctx.fill();
    return ctx.globalCompositeOperation = "source-over";
  };


  /*
  
  for (var i = 0, m = intersections.length; i < m; i++) {
      if (i === 0) {
          lightMapCtx.lineTo(intersections[m-1].x, intersections[m-1].y);
      } else {
          lightMapCtx.lineTo(intersections[i-1].x, intersections[i-1].y);
      }
  }
  
  lightMapCtx.fill();
  //shadowMapCtx.globalCompositeOperation = "source-over";
   */

  MapLightingScene.prototype.isTileBlockLight = function(tile) {
    if (tile) {
      return true;
    }
    return false;
  };

  MapLightingScene.prototype.findCorners = function(map) {
    var corners, layer, x, y, _i, _j, _ref, _ref1;
    corners = [];
    corners.push({
      x: 0,
      y: 0
    });
    corners.push({
      x: 0,
      y: GraphicsManager.renderer.height - 1
    });
    corners.push({
      x: GraphicsManager.renderer.width - 1,
      y: 0
    });
    corners.push({
      x: GraphicsManager.renderer.width - 1,
      y: GraphicsManager.renderer.height - 1
    });
    layer = map.layers[1].data;
    for (y = _i = 0, _ref = map.height - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      for (x = _j = 0, _ref1 = map.width - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        if (!(y === 0 || x === 0 || y === map.height - 1 || x === map.width - 1)) {
          if ((this.isTileBlockLight(layer[y][x]) && !this.isTileBlockLight(layer[y][x - 1]) && !this.isTileBlockLight(layer[y - 1][x]) && !this.isTileBlockLight(layer[y - 1][x - 1])) || (!this.isTileBlockLight(layer[y][x]) && this.isTileBlockLight(layer[y - 1][x]) && this.isTileBlockLight(layer[y][x - 1]) && this.isTileBlockLight(layer[y - 1][x - 1]))) {
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
    var dx, dy, error, layer, mX, mY, n, x, xInc, y, yInc;
    dx = Math.abs(x1 - x0);
    dy = Math.abs(y1 - y0);
    x = x0;
    y = y0;
    n = 300;
    xInc = x1 > x0 ? 1 : -1;
    yInc = y1 > y0 ? 1 : -1;
    error = dx - dy;
    dx = dx * 2;
    dy = dy * 2;
    while (n > 0) {
      mX = Math.floor(x / map.tileWidth);
      mY = Math.floor(y / map.tileHeight);
      layer = map.layers[1].data;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcQm9vdFNjZW5lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcRGVtb3NcXERlbW8xXFxEZW1vMVNjZW5lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcRGVtb3NcXERlbW8xXFxEZW1vMVN5c3RlbS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZGVtb1xcU3RhdGVcXERlbW9zXFxMb2FkTWFwRGVtb1xcTG9hZE1hcERlbW9TY2VuZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZGVtb1xcU3RhdGVcXERlbW9zXFxNYXBMaWdodGluZ0RlbW9cXE1hcExpZ2h0aW5nRGVtb1NjZW5lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcRGVtb3NcXE1hcExpZ2h0aW5nRGVtb1xcTWFwTGlnaHRpbmdJbnB1dFN5c3RlbS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZGVtb1xcU3RhdGVcXERlbW9zXFxNb3ZlTWFwRGVtb1xcTW92ZU1hcERlbW9TY2VuZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZGVtb1xcU3RhdGVcXERlbW9zXFxNb3ZlTWFwU21vb3RoRGVtb1xcTWFwTW92ZUlucHV0U3lzdGVtLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcRGVtb3NcXE1vdmVNYXBTbW9vdGhEZW1vXFxNb3ZlTWFwU21vb3RoRGVtb1NjZW5lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcTWVudVNjZW5lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxTdGF0ZVxcUHJlTG9hZFNjZW5lLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxkZW1vXFxkZW1vLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXEVuZ2luZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxFbnRpdHkuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcQXNzZXRNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXEF1ZGlvTWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxNYW5hZ2VyXFxFbnRpdHlNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXEdyYXBoaWNzTWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxNYW5hZ2VyXFxJbnB1dE1hbmFnZXIuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcU2NlbmVNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hcC5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxTY2VuZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxTeXN0ZW0uY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcU3lzdGVtXFxHcmFwaGljc1N5c3RlbS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxVdGlsLmNvZmZlZSIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL2RvY3Jvb3QvYXNzZXRzL3ZlbmRvci9pa2ktZW5naW5lL3ZlbmRvci9ub2RlLXV1aWQvdXVpZC5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvaGVscGVycy5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9pbmRleC5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9tZDUuanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvcm5nLmpzIiwiQzovd3d3L21lcmNlbmFyeS1zdHJpa2UtZm9yY2Uvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3NoYS5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEyNTYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLG9MQUFBO0VBQUE7aVNBQUE7O0FBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSw2Q0FBUixDQUFSLENBQUE7O0FBQUEsWUFDQSxHQUFlLE9BQUEsQ0FBUSw0REFBUixDQURmLENBQUE7O0FBQUEsZUFFQSxHQUFrQixPQUFBLENBQVEsK0RBQVIsQ0FGbEIsQ0FBQTs7QUFBQSxZQUdBLEdBQWUsT0FBQSxDQUFRLDREQUFSLENBSGYsQ0FBQTs7QUFBQSxZQUtBLEdBQWUsT0FBQSxDQUFRLHVCQUFSLENBTGYsQ0FBQTs7QUFBQSxTQU1BLEdBQVksT0FBQSxDQUFRLG9CQUFSLENBTlosQ0FBQTs7QUFBQSxVQVNBLEdBQWEsT0FBQSxDQUFRLGlDQUFSLENBVGIsQ0FBQTs7QUFBQSxnQkFVQSxHQUFtQixPQUFBLENBQVEsNkNBQVIsQ0FWbkIsQ0FBQTs7QUFBQSxnQkFXQSxHQUFtQixPQUFBLENBQVEsNkNBQVIsQ0FYbkIsQ0FBQTs7QUFBQSxzQkFZQSxHQUF5QixPQUFBLENBQVEseURBQVIsQ0FaekIsQ0FBQTs7QUFBQSxvQkFhQSxHQUF1QixPQUFBLENBQVEscURBQVIsQ0FidkIsQ0FBQTs7QUFBQTtBQWlCSSw4QkFBQSxDQUFBOzs7O0dBQUE7O0FBQUEsc0JBQUEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUVGLFFBQUEscUhBQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBVCxDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsTUFBRCxHQUFVLEdBRFYsQ0FBQTtBQUFBLElBRUEsZUFBZSxDQUFDLFFBQWhCLEdBQTJCLGVBQWUsQ0FBQyxjQUFoQixDQUErQixJQUFDLENBQUEsS0FBaEMsRUFBdUMsSUFBQyxDQUFBLE1BQXhDLEVBQWdELFFBQVEsQ0FBQyxJ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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmxDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlNjZW5lID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TY2VuZS5jb2ZmZWVcIlxuU2NlbmVNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL1NjZW5lTWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuSW5wdXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0lucHV0TWFuYWdlci5jb2ZmZWVcIlxuXG5QcmVMb2FkU2NlbmUgPSByZXF1aXJlIFwiLi9QcmVMb2FkU2NlbmUuY29mZmVlXCJcbk1lbnVTY2VuZSA9IHJlcXVpcmUgXCIuL01lbnVTY2VuZS5jb2ZmZWVcIlxuXG4jIERlbW9zXG5EZW1vMVNjZW5lID0gcmVxdWlyZSBcIi4vRGVtb3MvRGVtbzEvRGVtbzFTY2VuZS5jb2ZmZWVcIlxuTG9hZE1hcERlbW9TY2VuZSA9IHJlcXVpcmUgXCIuL0RlbW9zL0xvYWRNYXBEZW1vL0xvYWRNYXBEZW1vU2NlbmUuY29mZmVlXCJcbk1vdmVNYXBEZW1vU2NlbmUgPSByZXF1aXJlIFwiLi9EZW1vcy9Nb3ZlTWFwRGVtby9Nb3ZlTWFwRGVtb1NjZW5lLmNvZmZlZVwiXG5Nb3ZlTWFwU21vb3RoRGVtb1NjZW5lID0gcmVxdWlyZSBcIi4vRGVtb3MvTW92ZU1hcFNtb290aERlbW8vTW92ZU1hcFNtb290aERlbW9TY2VuZS5jb2ZmZWVcIlxuTWFwTGlnaHRpbmdEZW1vU2NlbmUgPSByZXF1aXJlIFwiLi9EZW1vcy9NYXBMaWdodGluZ0RlbW8vTWFwTGlnaHRpbmdEZW1vU2NlbmUuY29mZmVlXCJcblxuXG5jbGFzcyBCb290U2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGluaXQ6IC0+XG4gICAgICAgICMgVXNlIEdyYXBoaWNzTWFuYWdlciB0byBjcmVhdGUgbWFpbiBjYW52YXNcbiAgICAgICAgQHdpZHRoID0gMTI4MFxuICAgICAgICBAaGVpZ2h0ID0gNzIwXG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlciA9IEdyYXBoaWNzTWFuYWdlci5jcmVhdGVSZW5kZXJlciBAd2lkdGgsIEBoZWlnaHQsIGRvY3VtZW50LmJvZHlcbiAgICAgICAgQHNpemVDYW52YXMoKVxuXG4gICAgICAgIElucHV0TWFuYWdlci5pbml0IEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXNcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciBcInJlc2l6ZVwiLCBAc2l6ZUNhbnZhcy5iaW5kIEBcblxuICAgICAgICBwcmVsb2FkU2NlbmUgPSBuZXcgUHJlTG9hZFNjZW5lKClcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFkZCBcInByZWxvYWRcIiwgcHJlbG9hZFNjZW5lXG4gICAgICAgIHByZWxvYWRTY2VuZS5pbml0KClcblxuICAgICAgICBtZW51U2NlbmUgPSBuZXcgTWVudVNjZW5lKClcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFkZCBcIm1lbnVcIiwgbWVudVNjZW5lXG4gICAgICAgIG1lbnVTY2VuZS5pbml0KClcblxuICAgICAgICBkZW1vMVNjZW5lID0gbmV3IERlbW8xU2NlbmUoKVxuICAgICAgICBTY2VuZU1hbmFnZXIuYWRkIFwiZGVtbzFcIiwgZGVtbzFTY2VuZVxuICAgICAgICBkZW1vMVNjZW5lLmluaXQoKVxuXG4gICAgICAgIGxvYWRNYXBEZW1vU2NlbmUgPSBuZXcgTG9hZE1hcERlbW9TY2VuZSgpXG4gICAgICAgIFNjZW5lTWFuYWdlci5hZGQgXCJMb2FkTWFwRGVtb1wiLCBsb2FkTWFwRGVtb1NjZW5lXG4gICAgICAgIGxvYWRNYXBEZW1vU2NlbmUuaW5pdCgpXG5cbiAgICAgICAgbW92ZU1hcERlbW9TY2VuZSA9IG5ldyBNb3ZlTWFwRGVtb1NjZW5lKClcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFkZCBcIk1vdmVNYXBEZW1vXCIsIG1vdmVNYXBEZW1vU2NlbmVcbiAgICAgICAgbW92ZU1hcERlbW9TY2VuZS5pbml0KClcblxuICAgICAgICBtb3ZlTWFwU21vb3RoRGVtb1NjZW5lID0gbmV3IE1vdmVNYXBTbW9vdGhEZW1vU2NlbmUoKVxuICAgICAgICBTY2VuZU1hbmFnZXIuYWRkIFwiTW92ZU1hcFNtb290aERlbW9cIiwgbW92ZU1hcFNtb290aERlbW9TY2VuZVxuICAgICAgICBtb3ZlTWFwU21vb3RoRGVtb1NjZW5lLmluaXQoKVxuXG4gICAgICAgIG1hcExpZ2h0aW5nRGVtb1NjZW5lID0gbmV3IE1hcExpZ2h0aW5nRGVtb1NjZW5lKClcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFkZCBcIk1hcExpZ2h0aW5nRGVtb1wiLCBtYXBMaWdodGluZ0RlbW9TY2VuZVxuICAgICAgICBtYXBMaWdodGluZ0RlbW9TY2VuZS5pbml0KClcblxuICAgICAgICBAZGVidWdNZW51KClcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciBcInJlc2l6ZVwiLCAtPlxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuXG5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICAgICAgZGVmYXVsdFNjZW5lID0gXCJtZW51XCJcbiAgICAgICAgc2NlbmVTaG9ydGN1dCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gubWF0Y2ggL1xcP3NjZW5lPSguKykvXG4gICAgICAgIGlmIHNjZW5lU2hvcnRjdXQgJiYgc2NlbmVTaG9ydGN1dFsxXSB0aGVuIGRlZmF1bHRTY2VuZSA9IHNjZW5lU2hvcnRjdXRbMV1cbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFjdGl2YXRlIFwicHJlbG9hZFwiLCBkZWZhdWx0U2NlbmVcblxuICAgIGRlYnVnTWVudTogLT5cbiAgICAgICAgZ3VpID0gbmV3IGRhdC5HVUkoKVxuXG4gICAgICAgIFNjZW5lTWFuYWdlci5kZWJ1Z1NjZW5lID0gU2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZVxuXG4gICAgICAgIHNjZW5lc0ZvbGRlciA9IGd1aS5hZGRGb2xkZXIgXCJTY2VuZXNcIlxuICAgICAgICBzY2VuZXNGb2xkZXIub3BlbigpXG4gICAgICAgIHNjZW5lU2VsZWN0b3IgPSBzY2VuZXNGb2xkZXIuYWRkIFNjZW5lTWFuYWdlciwgXCJkZWJ1Z1NjZW5lXCIsIFtcbiAgICAgICAgICAgIFwibWVudVwiLCBcImRlbW8xXCIsIFwiTG9hZE1hcERlbW9cIiwgXCJNb3ZlTWFwRGVtb1wiLCBcIk1vdmVNYXBTbW9vdGhEZW1vXCIsIFwiTWFwTGlnaHRpbmdEZW1vXCJcbiAgICAgICAgXVxuICAgICAgICBzY2VuZVNlbGVjdG9yLm9uRmluaXNoQ2hhbmdlIChzY2VuZSkgLT4gU2NlbmVNYW5hZ2VyLmFjdGl2YXRlIHNjZW5lXG4gICAgICAgIFNjZW5lTWFuYWdlci5vbkFjdGl2YXRlID0gLT5cbiAgICAgICAgICAgIFNjZW5lTWFuYWdlci5kZWJ1Z1NjZW5lID0gU2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZVxuICAgICAgICAgICAgc2NlbmVTZWxlY3Rvci51cGRhdGVEaXNwbGF5KClcblxuICAgIHNpemVDYW52YXM6IC0+XG4gICAgICAgIGdhbWVXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIGdhbWVIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgc2NhbGVUb0ZpdFggPSBnYW1lV2lkdGggLyBAd2lkdGhcbiAgICAgICAgc2NhbGVUb0ZpdFkgPSBnYW1lSGVpZ2h0IC8gQGhlaWdodFxuXG4gICAgICAgIGN1cnJlbnRTY3JlZW5SYXRpbyA9IGdhbWVXaWR0aCAvIGdhbWVIZWlnaHRcbiAgICAgICAgb3B0aW1hbFJhdGlvID0gTWF0aC5taW4gc2NhbGVUb0ZpdFgsIHNjYWxlVG9GaXRZXG5cbiAgICAgICAgaWYgY3VycmVudFNjcmVlblJhdGlvID49IDEuNzcgJiYgY3VycmVudFNjcmVlblJhdGlvIDw9IDEuNzlcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuc3R5bGUud2lkdGggPSBnYW1lV2lkdGggKyBcInB4XCJcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gZ2FtZUhlaWdodCArIFwicHhcIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLnN0eWxlLndpZHRoID0gQHdpZHRoICogb3B0aW1hbFJhdGlvICsgXCJweFwiXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLnN0eWxlLmhlaWdodCA9IEBoZWlnaHQgKiBvcHRpbWFsUmF0aW8gKyBcInB4XCJcblxuICAgICAgICBJbnB1dE1hbmFnZXIuTU9VU0VfVFJBTlNGT1JNX1JFQ1QgPSBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIElucHV0TWFuYWdlci5NT1VTRV9UUkFOU0ZPUk1fV0lEVEggPSBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoXG4gICAgICAgIElucHV0TWFuYWdlci5NT1VTRV9UUkFOU0ZPUk1fSEVJR0hUID0gR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcbiAgICAgICAgSW5wdXRNYW5hZ2VyLk1PVVNFX09GRlNFVF9YID0gR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5vZmZzZXRMZWZ0XG4gICAgICAgIElucHV0TWFuYWdlci5NT1VTRV9PRkZTRVRfWSA9IEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMub2Zmc2V0VG9wXG5cbm1vZHVsZS5leHBvcnRzID0gQm9vdFNjZW5lIiwiRW50aXR5TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9FbnRpdHlNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5Bc3NldE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvQXNzZXRNYW5hZ2VyLmNvZmZlZVwiXG5cblNjZW5lID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TY2VuZS5jb2ZmZWVcIlxuRGVtbzFTeXN0ZW0gPSByZXF1aXJlIFwiLi9EZW1vMVN5c3RlbS5jb2ZmZWVcIlxuXG5jbGFzcyBEZW1vMVNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBpbml0OiAtPiBAYWRkU3lzdGVtIG5ldyBEZW1vMVN5c3RlbSgpXG5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5zdHlsZS5jdXJzb3IgPSBcIm5vbmVcIlxuXG4gICAgICAgIEBjdXJzb3IgPSBFbnRpdHlNYW5hZ2VyLmNyZWF0ZUVudGl0eSBcImN1cnNvclwiXG4gICAgICAgIGN1cnNvckltYWdlID0gQXNzZXRNYW5hZ2VyLmdldCBcImltZy9jdXJzb3Ivc2xpY2tfYXJyb3ctZGVsdGEucG5nXCJcbiAgICAgICAgRW50aXR5TWFuYWdlci5hZGRDb21wb25lbnQgQGN1cnNvciwge1xuICAgICAgICAgICAgdHlwZTogXCJSZW5kZXJhYmxlSW1hZ2VcIlxuICAgICAgICAgICAgaW1nOiBjdXJzb3JJbWFnZVxuICAgICAgICB9XG4gICAgICAgIEVudGl0eU1hbmFnZXIuYWRkQ29tcG9uZW50IEBjdXJzb3IsIHtcbiAgICAgICAgICAgIHR5cGU6IFwiUG9zaXRpb25cIlxuICAgICAgICAgICAgeDogMFxuICAgICAgICAgICAgeTogMFxuICAgICAgICB9XG4gICAgICAgIEVudGl0eU1hbmFnZXIuYWRkQ29tcG9uZW50IEBjdXJzb3IsIHtcbiAgICAgICAgICAgIHR5cGU6IFwiUG9zaXRpb25Gb2xsb3dzTW91c2VcIlxuICAgICAgICB9XG5cbiAgICBkZWFjdGl2YXRlOiAtPlxuICAgICAgICBFbnRpdHlNYW5hZ2VyLnJlbW92ZUVudGl0eSBAY3Vyc29yXG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuc3R5bGUuY3Vyc29yID0gXCJkZWZhdWx0XCJcblxuXG5tb2R1bGUuZXhwb3J0cyA9IERlbW8xU2NlbmUiLCJTeXN0ZW0gPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1N5c3RlbS5jb2ZmZWVcIlxuRW50aXR5TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9FbnRpdHlNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5JbnB1dE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvSW5wdXRNYW5hZ2VyLmNvZmZlZVwiXG5cbmNsYXNzIERlbW8xU3lzdGVtIGV4dGVuZHMgU3lzdGVtXG4gICAgVEhST1RUTEVfVkFMVUU6IDE2ICAjIDYyLjUgRlBTXG5cbiAgICBvblVwZGF0ZTogLT5cbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIlxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmZpbGxSZWN0IDAsIDAsXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG4gICAgICAgICMgRm9sbG93IG1vdXNlIC0gbm9ybWFsbHkgd291bGQgYmUgaW4gYSBkaWZmZXJlbnQgc3lzdGVtIGZyb20gdGhlIHJlbmRlcmFibGVzXG4gICAgICAgIGZvbGxvd0VudGl0aWVzID0gRW50aXR5TWFuYWdlci5nZXRBbGxFbnRpdGllc1dpdGhDb21wb25lbnRPZlR5cGVzIFtcIlBvc2l0aW9uRm9sbG93c01vdXNlXCIsIFwiUG9zaXRpb25cIl1cbiAgICAgICAgZm9yIGVudGl0eSBpbiBmb2xsb3dFbnRpdGllc1xuICAgICAgICAgICAgcG9zaXRpb24gPSBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiUG9zaXRpb25cIlxuICAgICAgICAgICAgcG9zaXRpb24ueCA9IElucHV0TWFuYWdlci5tb3VzZS54XG4gICAgICAgICAgICBwb3NpdGlvbi55ID0gSW5wdXRNYW5hZ2VyLm1vdXNlLnlcblxuICAgICAgICAjIERyYXcgcmVuZGVyYWJsZXNcbiAgICAgICAgcmVuZGVyYWJsZUVudGl0aWVzID0gRW50aXR5TWFuYWdlci5nZXRBbGxFbnRpdGllc1dpdGhDb21wb25lbnRPZlR5cGVzIFtcIlJlbmRlcmFibGVJbWFnZVwiLCBcIlBvc2l0aW9uXCJdXG4gICAgICAgIGZvciBlbnRpdHkgaW4gcmVuZGVyYWJsZUVudGl0aWVzXG4gICAgICAgICAgICByZW5kZXJhYmxlID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlJlbmRlcmFibGVJbWFnZVwiXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJQb3NpdGlvblwiXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmRyYXdJbWFnZSByZW5kZXJhYmxlLmltZywgcG9zaXRpb24ueCwgcG9zaXRpb24ueVxuXG4gICAgICAgIHJldHVybiBudWxsXG5cblxubW9kdWxlLmV4cG9ydHMgPSBEZW1vMVN5c3RlbSIsIkFzc2V0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9Bc3NldE1hbmFnZXIuY29mZmVlXCJcbkdyYXBoaWNzTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9HcmFwaGljc01hbmFnZXIuY29mZmVlXCJcblxuU2NlbmUgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1NjZW5lLmNvZmZlZVwiXG5NYXAgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hcC5jb2ZmZWVcIlxuXG5jbGFzcyBMb2FkTWFwRGVtb1NjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBhY3RpdmF0ZTogLT5cbiAgICAgICAgbWFwID0gbmV3IE1hcCgpXG4gICAgICAgIGxvYWRpbmcgPSBtYXAubG9hZE1hcCBcImFzc2V0cy9tYXAvaWNlLmpzb25cIlxuICAgICAgICBsb2FkaW5nLnRoZW4gKCkgLT5cbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFN0eWxlID0gXCIjMDAwXCJcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguZmlsbFJlY3QgMCwgMCxcbiAgICAgICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG4gICAgICAgICAgICBtYXAuZHJhd01hcCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4XG5cblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkTWFwRGVtb1NjZW5lIiwiQXNzZXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0Fzc2V0TWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuRW50aXR5TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9FbnRpdHlNYW5hZ2VyLmNvZmZlZVwiXG5JbnB1dE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvSW5wdXRNYW5hZ2VyLmNvZmZlZVwiXG5cblNjZW5lID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TY2VuZS5jb2ZmZWVcIlxuTWFwID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYXAuY29mZmVlXCJcbkdyYXBoaWNzU3lzdGVtID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TeXN0ZW0vR3JhcGhpY3NTeXN0ZW0uY29mZmVlXCJcbk1hcExpZ2h0aW5nSW5wdXRTeXN0ZW0gPSByZXF1aXJlIFwiLi9NYXBMaWdodGluZ0lucHV0U3lzdGVtLmNvZmZlZVwiXG5cblxuY2xhc3MgTWFwTGlnaHRpbmdTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgaW5pdDogLT5cbiAgICAgICAgQG1ldGVyID0gbmV3IEZQU01ldGVyIGdyYXBoOiAxXG4gICAgICAgIEBtYXBMb2FkZWQgPSBmYWxzZVxuXG4gICAgICAgIEBhZGRTeXN0ZW0gbmV3IE1hcExpZ2h0aW5nSW5wdXRTeXN0ZW1cblxuICAgICAgICAjIEFkZCBncmFwaGljcyBzeXN0ZW0gdG8gaGFuZGxlIHJlbmRlcmluZ1xuICAgICAgICBnZnggPSBAYWRkU3lzdGVtIG5ldyBHcmFwaGljc1N5c3RlbVxuICAgICAgICBnZnguaW5pdCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXJcbiAgICAgICAgZ2Z4Lm9uQmVmb3JlRHJhdyA9IEBvbkJlZm9yZURyYXcuYmluZCBAXG4gICAgICAgIGdmeC5vbkFmdGVyRHJhdyA9IEBvbkFmdGVyRHJhdy5iaW5kIEBcblxuICAgICAgICBAZGFya25lc3MgPSBHcmFwaGljc01hbmFnZXIuY2xvbmVSZW5kZXJlciBHcmFwaGljc01hbmFnZXIucmVuZGVyZXJcbiAgICAgICAgQGxpZ2h0UmVuZGVyZXIgPSBHcmFwaGljc01hbmFnZXIuY2xvbmVSZW5kZXJlciBHcmFwaGljc01hbmFnZXIucmVuZGVyZXJcbiAgICAgICAgQGxpZ2h0Q2lyY2xlID0gR3JhcGhpY3NNYW5hZ2VyLmNyZWF0ZVJlbmRlcmVyIDI1MCwgMjUwXG4gICAgICAgIEBsaWdodENpcmNsZTIgPSBHcmFwaGljc01hbmFnZXIuY3JlYXRlUmVuZGVyZXIgMjUwLCAyNTBcblxuICAgICAgICAjIENyZWF0ZSBncmFkaWVudFxuICAgICAgICBncmQgPSBAbGlnaHRDaXJjbGUuY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50IDEyNSwgMTI1LCAwLCAxMjUsIDEyNSwgMTI1XG4gICAgICAgIGdyZC5hZGRDb2xvclN0b3AgMCwgJ3JnYmEoMjU1LCAyNTUsIDIxNSwgMSknXG4gICAgICAgIGdyZC5hZGRDb2xvclN0b3AgMSwgJ3JnYmEoMjU1LCAyNTUsIDIxNSwgMCknXG4gICAgICAgIEBsaWdodENpcmNsZS5jdHguZmlsbFN0eWxlID0gZ3JkXG4gICAgICAgIEBsaWdodENpcmNsZS5jdHguZmlsbFJlY3QgMCwgMCwgQGxpZ2h0Q2lyY2xlLmNhbnZhcy53aWR0aCwgQGxpZ2h0Q2lyY2xlLmNhbnZhcy5oZWlnaHRcblxuICAgICAgICBncmQyID0gQGxpZ2h0Q2lyY2xlMi5jdHguY3JlYXRlUmFkaWFsR3JhZGllbnQgMTI1LCAxMjUsIDAsIDEyNSwgMTI1LCAxMjVcbiAgICAgICAgZ3JkMi5hZGRDb2xvclN0b3AgMCwgJ3JnYmEoMjU1LCAwLCAwLCAwLjYpJ1xuICAgICAgICBncmQyLmFkZENvbG9yU3RvcCAxLCAncmdiYSgyNTUsIDAsIDAsIDApJ1xuICAgICAgICBAbGlnaHRDaXJjbGUyLmN0eC5maWxsU3R5bGUgPSBncmQyXG4gICAgICAgIEBsaWdodENpcmNsZTIuY3R4LmZpbGxSZWN0IDAsIDAsIEBsaWdodENpcmNsZTIuY2FudmFzLndpZHRoLCBAbGlnaHRDaXJjbGUyLmNhbnZhcy5oZWlnaHRcblxuICAgICAgICBAdmlld3BvcnQgPSB7XG4gICAgICAgICAgICB0eXBlOiBcIlBvc2l0aW9uXCJcbiAgICAgICAgICAgIHg6IDBcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfVxuXG4gICAgICAgIEB2aWV3cG9ydEVudGl0eSA9IEVudGl0eU1hbmFnZXIuY3JlYXRlRW50aXR5IFwidmlld3BvcnRcIiwgZmFsc2VcbiAgICAgICAgRW50aXR5TWFuYWdlci5hZGRDb21wb25lbnQgQHZpZXdwb3J0RW50aXR5LCBAdmlld3BvcnRcblxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIEVudGl0eU1hbmFnZXIuYWRkRW50aXR5IEB2aWV3cG9ydEVudGl0eVxuXG4gICAgICAgICMgTG9hZCB0aGUgbWFwXG4gICAgICAgIEBtYXAgPSBuZXcgTWFwKClcbiAgICAgICAgbG9hZGluZyA9IEBtYXAubG9hZE1hcCBcImFzc2V0cy9tYXAvdGVzdDMuanNvblwiXG4gICAgICAgIGxvYWRpbmcudGhlbiAoKSA9PlxuICAgICAgICAgICAgQGNvcm5lcnMgPSBAZmluZENvcm5lcnMgQG1hcFxuICAgICAgICAgICAgQG1hcExvYWRlZCA9IHRydWVcblxuXG4gICAgZGVhY3RpdmF0ZTogLT4gRW50aXR5TWFuYWdlci5yZW1vdmVFbnRpdHkgQHZpZXdwb3J0RW50aXR5XG5cbiAgICBvbkJlZm9yZURyYXc6IChjdHgpIC0+XG4gICAgICAgIEBtZXRlci50aWNrU3RhcnQoKVxuICAgICAgICBAZHJhd01hcCBjdHhcblxuICAgIG9uQWZ0ZXJEcmF3OiAtPlxuICAgICAgICBAbWV0ZXIudGljaygpXG5cbiAgICBkcmF3TWFwOiAoY3R4KSAtPlxuICAgICAgICBpZiBAbWFwTG9hZGVkXG4gICAgICAgICAgICBAbWFwLmRyYXdNYXBSZWN0IGN0eCxcbiAgICAgICAgICAgICAgICBAdmlld3BvcnQueCwgQHZpZXdwb3J0LnksXG4gICAgICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aCwgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcblxuICAgICAgICAgICAgIyBBbWJpZW50IGRhcmsgbGlnaHRcbiAgICAgICAgICAgIEBkYXJrbmVzcy5jdHguZmlsbFN0eWxlID0gXCJyZ2JhKDAsMCwxMSwwLjcpXCJcbiAgICAgICAgICAgIEBkYXJrbmVzcy5jdHguY2xlYXJSZWN0IDAsIDAsIEBkYXJrbmVzcy5jYW52YXMud2lkdGgsIEBkYXJrbmVzcy5jYW52YXMuaGVpZ2h0XG4gICAgICAgICAgICBAZGFya25lc3MuY3R4LmZpbGxSZWN0IDAsIDAsIEBkYXJrbmVzcy5jYW52YXMud2lkdGgsIEBkYXJrbmVzcy5jYW52YXMuaGVpZ2h0XG5cbiAgICAgICAgICAgICMgUmVtb3ZlIGFtYmllbnQgZGFya25lc3Mgd2hlcmUgYSBsaWdodHMgc2hvdWxkIGJlXG4gICAgICAgICAgICBAZGFya25lc3MuY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tb3V0XCJcblxuICAgICAgICAgICAgQGRhcmtuZXNzLmN0eC5kcmF3SW1hZ2UgQGxpZ2h0Q2lyY2xlLmNhbnZhcyxcbiAgICAgICAgICAgICAgICAwLCAwLFxuICAgICAgICAgICAgICAgIDI1MCwgMjUwLFxuICAgICAgICAgICAgICAgIDMwMCAtIDUwLCAzMDAgLSA1MCxcbiAgICAgICAgICAgICAgICAzMDAsIDMwMFxuXG4gICAgICAgICAgICBAZGFya25lc3MuY3R4LmRyYXdJbWFnZSBAbGlnaHRDaXJjbGUuY2FudmFzLFxuICAgICAgICAgICAgICAgIDAsIDAsXG4gICAgICAgICAgICAgICAgMjUwLCAyNTAsXG4gICAgICAgICAgICAgICAgSW5wdXRNYW5hZ2VyLm1vdXNlLnggLSAxMDAsIElucHV0TWFuYWdlci5tb3VzZS55IC0gMTUwLFxuICAgICAgICAgICAgICAgIDMwMCwgMzAwXG5cbiAgICAgICAgICAgICMgQWRkIGxpZ2h0IGNvbG91cnNcbiAgICAgICAgICAgIEBkYXJrbmVzcy5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiXG4gICAgICAgICAgICBAZGFya25lc3MuY3R4LmRyYXdJbWFnZSBAbGlnaHRDaXJjbGUyLmNhbnZhcyxcbiAgICAgICAgICAgICAgICAwLCAwLFxuICAgICAgICAgICAgICAgIDI1MCwgMjUwLFxuICAgICAgICAgICAgICAgIDMwMCAtIDUwLCAzMDAgLSA1MCxcbiAgICAgICAgICAgICAgICAzMDAsIDMwMFxuXG4gICAgICAgICAgICAjIFRPRE86IEFkZCBvYnN0YWNsZXMgLSBuZWVkcyByYXkgY2FzdGluZz9cbiAgICAgICAgICAgIEBsaWdodFJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiMwMDBcIlxuICAgICAgICAgICAgQGxpZ2h0UmVuZGVyZXIuY3R4LmZpbGxSZWN0IDAsIDAsIEBsaWdodFJlbmRlcmVyLmNhbnZhcy53aWR0aCwgQGxpZ2h0UmVuZGVyZXIuY2FudmFzLmhlaWdodFxuICAgICAgICAgICAgQHJlbmRlclJheSA0MDAsIDQwMCwgQGxpZ2h0UmVuZGVyZXIuY3R4XG4gICAgICAgICAgICBAcmVuZGVyUmF5IElucHV0TWFuYWdlci5tb3VzZS54LCBJbnB1dE1hbmFnZXIubW91c2UueSwgQGxpZ2h0UmVuZGVyZXIuY3R4XG5cbiAgICAgICAgICAgICMgRHJhdyBsaWdodGluZ1xuICAgICAgICAgICAgQGRhcmtuZXNzLmN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLW91dFwiXG4gICAgICAgICAgICBAZGFya25lc3MuY3R4LmRyYXdJbWFnZSBAbGlnaHRSZW5kZXJlci5jYW52YXMsIDAsIDBcbiAgICAgICAgICAgIEBkYXJrbmVzcy5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiXG5cblxuICAgICAgICAgICAgQGxpZ2h0UmVuZGVyZXIuY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLWluXCJcbiAgICAgICAgICAgIEBsaWdodFJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcInJnYmEoMCwwLDExLDAuNylcIlxuICAgICAgICAgICAgQGxpZ2h0UmVuZGVyZXIuY3R4LmZpbGxSZWN0IDAsIDAsIEBsaWdodFJlbmRlcmVyLmNhbnZhcy53aWR0aCwgQGxpZ2h0UmVuZGVyZXIuY2FudmFzLmhlaWdodFxuICAgICAgICAgICAgQGxpZ2h0UmVuZGVyZXIuY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIlxuXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmRyYXdJbWFnZSBAZGFya25lc3MuY2FudmFzLCAwLCAwXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmRyYXdJbWFnZSBAbGlnaHRSZW5kZXJlci5jYW52YXMsIDAsIDBcbiMgICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmRyYXdJbWFnZSBAbGlnaHRSZW5kZXJlci5jYW52YXMsIDAsIDBcblxuXG4gICAgcmVuZGVyQ29ybmVyOiAoY29ybmVyLCBjb2xvciA9IFwiIzBmMFwiKSAtPlxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IGNvbG9yXG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jdHguYmVnaW5QYXRoKClcbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5hcmMgY29ybmVyLngsIGNvcm5lci55LCAzLCAwLCBNYXRoLlBJICogMlxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmZpbGwoKVxuXG5cbiAgICByZW5kZXJSYXk6ICh2WCwgdlksIGN0eCkgLT5cbiAgICAgICAgaW50ZXJzZWN0aW9ucyA9IFtdXG5cbiAgICAgICAgZm9yIGNvcm5lciBpbiBAY29ybmVyc1xuICAgICAgICAgICAgYW5nbGUgPSAwLjFcbiAgICAgICAgICAgIEByZW5kZXJDb3JuZXIgY29ybmVyLCBcIiMwZjBcIlxuICAgICAgICAgICAgQHJheVRyYWNlQnlBbmdsZSB2WCwgdlksIGNvcm5lci54LCBjb3JuZXIueSwgMCAtIGFuZ2xlLCBAbWFwLCBpbnRlcnNlY3Rpb25zXG4gICAgICAgICAgICBAcmF5VHJhY2UgdlgsIHZZLCBjb3JuZXIueCwgY29ybmVyLnksIEBtYXAsIGludGVyc2VjdGlvbnNcbiAgICAgICAgICAgIEByYXlUcmFjZUJ5QW5nbGUgdlgsIHZZLCBjb3JuZXIueCwgY29ybmVyLnksIGFuZ2xlLCBAbWFwLCBpbnRlcnNlY3Rpb25zXG5cbiAgICAgICAgIyBDYWxjdWxhdGUgYW5nbGVzXG4gICAgICAgIGZvciBpbnRlcnNlY3Rpb24gaW4gaW50ZXJzZWN0aW9uc1xuICAgICAgICAgICAgZFggPSB2WCAtIGludGVyc2VjdGlvbi54XG4gICAgICAgICAgICBkWSA9IHZZIC0gaW50ZXJzZWN0aW9uLnlcbiAgICAgICAgICAgIGludGVyc2VjdGlvbi5hbmdsZSA9IE1hdGguYXRhbjIgZFgsIGRZXG5cbiMgICAgICAgICAgICBAcmVuZGVyQ29ybmVyIGludGVyc2VjdGlvbiwgXCIjZmYwXCJcbiMgICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmXCJcbiMgICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmJlZ2luUGF0aCgpXG4jICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5tb3ZlVG8gdlgsIHZZXG4jICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5saW5lVG8gaW50ZXJzZWN0aW9uLngsIGludGVyc2VjdGlvbi55XG4jICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5zdHJva2UoKVxuXG4gICAgICAgICMgU29ydCBieSBhbmdsZVxuICAgICAgICBpbnRlcnNlY3Rpb25zLnNvcnQgKGEsIGIpIC0+IGEuYW5nbGUgLSBiLmFuZ2xlXG5cbiAgICAgICAgIyBEcmF3IHRyaWFuZ2xlc1xuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1vdXRcIlxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjZmZmXCJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgIGN0eC5tb3ZlVG8gaW50ZXJzZWN0aW9uc1swXS54LCBpbnRlcnNlY3Rpb25zWzBdLnlcblxuICAgICAgICBtID0gaW50ZXJzZWN0aW9ucy5sZW5ndGhcbiAgICAgICAgZm9yIGludGVyc2VjdGlvbiwgaSBpbiBpbnRlcnNlY3Rpb25zXG4gICAgICAgICAgICBpZiBpID09IDBcbiAgICAgICAgICAgICAgICBjdHgubGluZVRvKGludGVyc2VjdGlvbnNbbSAtIDFdLngsIGludGVyc2VjdGlvbnNbbSAtIDFdLnkpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVUbyhpbnRlcnNlY3Rpb25zW2kgLSAxXS54LCBpbnRlcnNlY3Rpb25zW2kgLSAxXS55KVxuICAgICAgICBjdHguZmlsbCgpXG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1vdmVyXCJcbiAgICAjIyNcblxuICAgIGZvciAodmFyIGkgPSAwLCBtID0gaW50ZXJzZWN0aW9ucy5sZW5ndGg7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgIGxpZ2h0TWFwQ3R4LmxpbmVUbyhpbnRlcnNlY3Rpb25zW20tMV0ueCwgaW50ZXJzZWN0aW9uc1ttLTFdLnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGlnaHRNYXBDdHgubGluZVRvKGludGVyc2VjdGlvbnNbaS0xXS54LCBpbnRlcnNlY3Rpb25zW2ktMV0ueSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsaWdodE1hcEN0eC5maWxsKCk7XG4gICAgLy9zaGFkb3dNYXBDdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuXG4gICAgIyMjXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuICAgIGlzVGlsZUJsb2NrTGlnaHQ6ICh0aWxlKSAtPlxuICAgICAgICBpZiB0aWxlIHRoZW4gcmV0dXJuIHRydWVcbiAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICBmaW5kQ29ybmVyczogKG1hcCkgLT5cbiAgICAgICAgY29ybmVycyA9IFtdXG5cbiAgICAgICAgY29ybmVycy5wdXNoXG4gICAgICAgICAgICB4OiAwXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIGNvcm5lcnMucHVzaFxuICAgICAgICAgICAgeDogMFxuICAgICAgICAgICAgeTogR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmhlaWdodCAtIDFcbiAgICAgICAgY29ybmVycy5wdXNoXG4gICAgICAgICAgICB4OiBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIud2lkdGggLSAxXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIGNvcm5lcnMucHVzaFxuICAgICAgICAgICAgeDogR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLndpZHRoIC0gMVxuICAgICAgICAgICAgeTogR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmhlaWdodCAtIDFcblxuIyAgICAgICAgcmV0dXJuIGNvcm5lcnNcblxuICAgICAgICAjIFRPRE86IEFsbCBsYXllcnM/XG4gICAgICAgIGxheWVyID0gbWFwLmxheWVyc1sxXS5kYXRhXG5cbiAgICAgICAgZm9yIHkgaW4gWzAuLm1hcC5oZWlnaHQtMV1cbiAgICAgICAgICAgIGZvciB4IGluIFswLi5tYXAud2lkdGgtMV1cbiAgICAgICAgICAgICAgICAjIFNraXAgZWRnZXM/XG4gICAgICAgICAgICAgICAgdW5sZXNzIHkgPT0gMCB8fCB4ID09IDAgfHwgeSA9PSBtYXAuaGVpZ2h0IC0gMSB8fCB4ID09IG1hcC53aWR0aCAtIDFcblxuICAgICAgICAgICAgICAgICAgICAjIENoZWNrIHRvcCBsZWZ0XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoQGlzVGlsZUJsb2NrTGlnaHQobGF5ZXJbeV1beF0pICYmICFAaXNUaWxlQmxvY2tMaWdodChsYXllclt5XVt4IC0gMV0pICYmICFAaXNUaWxlQmxvY2tMaWdodChsYXllclt5IC0gMV1beF0pICYmICFAaXNUaWxlQmxvY2tMaWdodChsYXllclt5IC0gMV1beCAtIDFdKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIUBpc1RpbGVCbG9ja0xpZ2h0KGxheWVyW3ldW3hdKSAmJiBAaXNUaWxlQmxvY2tMaWdodChsYXllclt5IC0gMV1beF0pICYmIEBpc1RpbGVCbG9ja0xpZ2h0KGxheWVyW3ldW3ggLSAxXSkgJiYgQGlzVGlsZUJsb2NrTGlnaHQobGF5ZXJbeSAtIDFdW3ggLSAxXSkpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lcnMucHVzaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHggKiBtYXAudGlsZVdpZHRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogeSAqIG1hcC50aWxlSGVpZ2h0XG5cbiAgICAgICAgICAgICAgICAgICAgIyBDaGVjayB0b3AgcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsYXllclt5XVt4XSAmJiAhbGF5ZXJbeV1beCsxXSAmJiAhbGF5ZXJbeS0xXVt4XSAmJiAhbGF5ZXJbeS0xXVt4KzFdKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICghbGF5ZXJbeV1beF0gJiYgbGF5ZXJbeS0xXVt4XSAmJiBsYXllclt5XVt4KzFdICYmIGxheWVyW3ktMV1beCsxXSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVycy5wdXNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogKHgrMSkgKiBtYXAudGlsZVdpZHRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogeSAqIG1hcC50aWxlSGVpZ2h0XG5cbiAgICAgICAgICAgICAgICAgICAgIyBDaGVjayBib3R0b20gbGVmdFxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxheWVyW3ldW3hdICYmICFsYXllclt5XVt4LTFdICYmICFsYXllclt5KzFdW3hdICYmICFsYXllclt5KzFdW3gtMV0pIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCFsYXllclt5XVt4XSAmJiBsYXllclt5KzFdW3hdICYmIGxheWVyW3ldW3gtMV0gJiYgbGF5ZXJbeSsxXVt4LTFdKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJzLnB1c2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB4ICogbWFwLnRpbGVXaWR0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6ICh5KzEpICogbWFwLnRpbGVIZWlnaHRcblxuICAgICAgICAgICAgICAgICAgICAjIENoZWNrIGJvdHRvbSByaWdodFxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxheWVyW3ldW3hdICYmICFsYXllclt5XVt4KzFdICYmICFsYXllclt5KzFdW3hdICYmICFsYXllclt5KzFdW3grMV0pIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCFsYXllclt5XVt4XSAmJiBsYXllclt5KzFdW3hdICYmIGxheWVyW3ldW3grMV0gJiYgbGF5ZXJbeSsxXVt4KzFdKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJzLnB1c2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAoeCsxKSAqIG1hcC50aWxlV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiAoeSsxKSAqIG1hcC50aWxlSGVpZ2h0XG5cbiAgICAgICAgcmV0dXJuIGNvcm5lcnNcblxuXG4gICAgcmF5VHJhY2VCeUFuZ2xlOiAoeDAsIHkwLCB4MSwgeTEsIGFuZ2xlLCBtYXAsIGludGVyc2VjdGlvbnMpIC0+XG4gICAgICAgIHB4ID0gTWF0aC5jb3MoYW5nbGUpICogKHgxIC0geDApIC0gTWF0aC5zaW4oYW5nbGUpICogKHkxIC0geTApICsgeDBcbiAgICAgICAgcHkgPSBNYXRoLnNpbihhbmdsZSkgKiAoeDEgLSB4MCkgKyBNYXRoLmNvcyhhbmdsZSkgKiAoeTEgLSB5MCkgKyB5MFxuICAgICAgICBAcmF5VHJhY2UgeDAsIHkwLCBweCwgcHksIG1hcCwgaW50ZXJzZWN0aW9uc1xuXG5cbiAgICByYXlUcmFjZTogKHgwLCB5MCwgeDEsIHkxLCBtYXAsIGludGVyc2VjdGlvbnMpIC0+XG4gICAgICAgIGR4ID0gTWF0aC5hYnMgeDEgLSB4MFxuICAgICAgICBkeSA9IE1hdGguYWJzIHkxIC0geTBcbiAgICAgICAgeCA9IHgwXG4gICAgICAgIHkgPSB5MFxuIyAgICAgICAgbiA9IDEgKyBkeCArIGR5O1xuICAgICAgICBuID0gMzAwICAgICMgbWF4IGRyYXcgZGlzdGFuY2VcbiAgICAgICAgeEluYyA9IGlmIHgxID4geDAgdGhlbiAxIGVsc2UgLTFcbiAgICAgICAgeUluYyA9IGlmIHkxID4geTAgdGhlbiAxIGVsc2UgLTFcbiAgICAgICAgZXJyb3IgPSBkeCAtIGR5XG4gICAgICAgIGR4ID0gZHggKiAyXG4gICAgICAgIGR5ID0gZHkgKiAyXG5cbiAgICAgICAgd2hpbGUgbiA+IDBcbiAgICAgICAgICAgIG1YID0gTWF0aC5mbG9vcih4IC8gbWFwLnRpbGVXaWR0aClcbiAgICAgICAgICAgIG1ZID0gTWF0aC5mbG9vcih5IC8gbWFwLnRpbGVIZWlnaHQpXG5cbiAgICAgICAgICAgICMgVE9ETzogVXNlIGFsbCBsYXllcnMgLSBvciBhIGxpZ2h0IHNwZWNpZmljIG9uZVxuICAgICAgICAgICAgbGF5ZXIgPSBtYXAubGF5ZXJzWzFdLmRhdGFcblxuICAgICAgICAgICAgaWYgbGF5ZXJbbVldICYmIGxheWVyW21ZXVttWF1cbiMgICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9ucy5wdXNoXG4jICAgICAgICAgICAgICAgICAgICB4OiB4XG4jICAgICAgICAgICAgICAgICAgICB5OiB5XG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgaWYgZXJyb3IgPiAwXG4gICAgICAgICAgICAgICAgeCArPSB4SW5jXG4gICAgICAgICAgICAgICAgZXJyb3IgLT0gZHlcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB5ICs9IHlJbmNcbiAgICAgICAgICAgICAgICBlcnJvciArPSBkeFxuXG4gICAgICAgICAgICAtLW5cblxuICAgICAgICBpbnRlcnNlY3Rpb25zLnB1c2hcbiAgICAgICAgICAgIHg6IHhcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgcmV0dXJuIG51bGxcblxubW9kdWxlLmV4cG9ydHMgPSBNYXBMaWdodGluZ1NjZW5lIiwiU3lzdGVtID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TeXN0ZW0uY29mZmVlXCJcbklucHV0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9JbnB1dE1hbmFnZXIuY29mZmVlXCJcbkVudGl0eU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvRW50aXR5TWFuYWdlci5jb2ZmZWVcIlxuXG5jbGFzcyBNYXBMaWdoaW5nSW5wdXRTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW1cblxuICAgIG9uVXBkYXRlOiAoZHQpIC0+XG4gICAgICAgIG1vdmVEaXN0YW5jZSA9IDMgKiBkdFxuXG4gICAgICAgIGVudGl0aWVzID0gRW50aXR5TWFuYWdlci5nZXRBbGxFbnRpdGllc1dpdGhDb21wb25lbnRPZlR5cGVzIFtcIlBvc2l0aW9uXCJdXG5cbiAgICAgICAgZm9yIGVudGl0eSBpbiBlbnRpdGllc1xuICAgICAgICAgICAgcG9zaXRpb24gPSBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiUG9zaXRpb25cIlxuXG4gICAgICAgICAgICBpZiBJbnB1dE1hbmFnZXIua2V5LnVwIHRoZW4gcG9zaXRpb24ueSAtPSBtb3ZlRGlzdGFuY2VcbiAgICAgICAgICAgIGlmIElucHV0TWFuYWdlci5rZXkuZG93biB0aGVuIHBvc2l0aW9uLnkgKz0gbW92ZURpc3RhbmNlXG4gICAgICAgICAgICBpZiBJbnB1dE1hbmFnZXIua2V5LmxlZnQgdGhlbiBwb3NpdGlvbi54IC09IG1vdmVEaXN0YW5jZVxuICAgICAgICAgICAgaWYgSW5wdXRNYW5hZ2VyLmtleS5yaWdodCB0aGVuIHBvc2l0aW9uLnggKz0gbW92ZURpc3RhbmNlXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcExpZ2hpbmdJbnB1dFN5c3RlbSIsIkFzc2V0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9Bc3NldE1hbmFnZXIuY29mZmVlXCJcbkdyYXBoaWNzTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9HcmFwaGljc01hbmFnZXIuY29mZmVlXCJcbklucHV0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9JbnB1dE1hbmFnZXIuY29mZmVlXCJcblxuU2NlbmUgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1NjZW5lLmNvZmZlZVwiXG5NYXAgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hcC5jb2ZmZWVcIlxuXG5jbGFzcyBNb3ZlTWFwRGVtb1NjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBpbml0OiAtPlxuICAgICAgICBAdmlld1BvcnRYID0gMFxuICAgICAgICBAdmlld1BvcnRZID0gMFxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIElucHV0TWFuYWdlci5vbktleVVwID0gQG9uS2V5VXAuYmluZCBAXG5cbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiM2NjZcIlxuICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4LmZpbGxSZWN0IDAsIDAsXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG4gICAgICAgIEBtYXAgPSBuZXcgTWFwKClcbiAgICAgICAgbG9hZGluZyA9IEBtYXAubG9hZE1hcCBcImFzc2V0cy9tYXAvdGVzdDIuanNvblwiXG4gICAgICAgIGxvYWRpbmcudGhlbiAoKSA9PlxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiM2OTZcIlxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsUmVjdCAwLCAwLFxuICAgICAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGgsIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0XG5cbiAgICAgICAgICAgIEBtYXAuZHJhd01hcCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY3R4XG5cbiAgICBkZWFjdGl2YXRlOiAtPiBJbnB1dE1hbmFnZXIub25LZXlVcCA9IG51bGxcblxuICAgIG9uS2V5VXA6IChlKSAtPlxuICAgICAgICBtb3ZlRGlzdGFuY2UgPSAxNlxuXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzOCB0aGVuIEB2aWV3UG9ydFkgLT0gbW92ZURpc3RhbmNlICMgdXBcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDQwIHRoZW4gQHZpZXdQb3J0WSArPSBtb3ZlRGlzdGFuY2UgIyBkb3duXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzNyB0aGVuIEB2aWV3UG9ydFggLT0gbW92ZURpc3RhbmNlICMgbGVmdFxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzkgdGhlbiBAdmlld1BvcnRYICs9IG1vdmVEaXN0YW5jZSAjIHJpZ2h0XG5cbiAgICAgICAgaWYgQG1hcFxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiM2OTZcIlxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eC5maWxsUmVjdCAwLCAwLFxuICAgICAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGgsIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0XG5cbiAgICAgICAgICAgIEBtYXAuZHJhd01hcFJlY3QgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eCxcbiAgICAgICAgICAgICAgICBAdmlld1BvcnRYLCBAdmlld1BvcnRZLFxuICAgICAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMud2lkdGgsIEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0XG5cbm1vZHVsZS5leHBvcnRzID0gTW92ZU1hcERlbW9TY2VuZSIsIlN5c3RlbSA9IHJlcXVpcmUgXCIuLi8uLi8uLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU3lzdGVtLmNvZmZlZVwiXG5JbnB1dE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvSW5wdXRNYW5hZ2VyLmNvZmZlZVwiXG5FbnRpdHlNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0VudGl0eU1hbmFnZXIuY29mZmVlXCJcblxuY2xhc3MgTWFwTW92ZUlucHV0U3lzdGVtIGV4dGVuZHMgU3lzdGVtXG5cbiAgICBvblVwZGF0ZTogKGR0KSAtPlxuICAgICAgICBtb3ZlRGlzdGFuY2UgPSAzICogZHRcblxuICAgICAgICBlbnRpdGllcyA9IEVudGl0eU1hbmFnZXIuZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJQb3NpdGlvblwiXVxuXG4gICAgICAgIGZvciBlbnRpdHkgaW4gZW50aXRpZXNcbiAgICAgICAgICAgIHBvc2l0aW9uID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlBvc2l0aW9uXCJcblxuICAgICAgICAgICAgaWYgSW5wdXRNYW5hZ2VyLmtleS51cCB0aGVuIHBvc2l0aW9uLnkgLT0gbW92ZURpc3RhbmNlXG4gICAgICAgICAgICBpZiBJbnB1dE1hbmFnZXIua2V5LmRvd24gdGhlbiBwb3NpdGlvbi55ICs9IG1vdmVEaXN0YW5jZVxuICAgICAgICAgICAgaWYgSW5wdXRNYW5hZ2VyLmtleS5sZWZ0IHRoZW4gcG9zaXRpb24ueCAtPSBtb3ZlRGlzdGFuY2VcbiAgICAgICAgICAgIGlmIElucHV0TWFuYWdlci5rZXkucmlnaHQgdGhlbiBwb3NpdGlvbi54ICs9IG1vdmVEaXN0YW5jZVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXBNb3ZlSW5wdXRTeXN0ZW0iLCJBc3NldE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvQXNzZXRNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5FbnRpdHlNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0VudGl0eU1hbmFnZXIuY29mZmVlXCJcblxuU2NlbmUgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1NjZW5lLmNvZmZlZVwiXG5NYXAgPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hcC5jb2ZmZWVcIlxuR3JhcGhpY3NTeXN0ZW0gPSByZXF1aXJlIFwiLi4vLi4vLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1N5c3RlbS9HcmFwaGljc1N5c3RlbS5jb2ZmZWVcIlxuTWFwTW92ZUlucHV0U3lzdGUgPSByZXF1aXJlIFwiLi9NYXBNb3ZlSW5wdXRTeXN0ZW0uY29mZmVlXCJcblxuY2xhc3MgTW92ZU1hcFNtb290aERlbW9TY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgaW5pdDogLT5cbiAgICAgICAgQG1hcExvYWRlZCA9IGZhbHNlXG5cbiAgICAgICAgQGFkZFN5c3RlbSBuZXcgTWFwTW92ZUlucHV0U3lzdGVcblxuICAgICAgICAjIEFkZCBncmFwaGljcyBzeXN0ZW0gdG8gaGFuZGxlIHJlbmRlcmluZ1xuICAgICAgICBnZnggPSBAYWRkU3lzdGVtIG5ldyBHcmFwaGljc1N5c3RlbVxuICAgICAgICBnZnguaW5pdCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXJcbiAgICAgICAgZ2Z4Lm9uQmVmb3JlRHJhdyA9IEBkcmF3TWFwLmJpbmQgQFxuXG4gICAgICAgIEB2aWV3cG9ydCA9IHtcbiAgICAgICAgICAgIHR5cGU6IFwiUG9zaXRpb25cIlxuICAgICAgICAgICAgeDogMFxuICAgICAgICAgICAgeTogMFxuICAgICAgICB9XG5cbiAgICAgICAgQHZpZXdwb3J0RW50aXR5ID0gRW50aXR5TWFuYWdlci5jcmVhdGVFbnRpdHkgXCJ2aWV3cG9ydFwiLCBmYWxzZVxuICAgICAgICBFbnRpdHlNYW5hZ2VyLmFkZENvbXBvbmVudCBAdmlld3BvcnRFbnRpdHksIEB2aWV3cG9ydFxuXG5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICAgICAgRW50aXR5TWFuYWdlci5hZGRFbnRpdHkgQHZpZXdwb3J0RW50aXR5XG5cbiAgICAgICAgIyBMb2FkIHRoZSBtYXBcbiAgICAgICAgQG1hcCA9IG5ldyBNYXAoKVxuICAgICAgICBsb2FkaW5nID0gQG1hcC5sb2FkTWFwIFwiYXNzZXRzL21hcC90ZXN0My5qc29uXCJcbiAgICAgICAgbG9hZGluZy50aGVuICgpID0+IEBtYXBMb2FkZWQgPSB0cnVlXG5cblxuICAgIGRlYWN0aXZhdGU6IC0+IEVudGl0eU1hbmFnZXIucmVtb3ZlRW50aXR5IEB2aWV3cG9ydEVudGl0eVxuXG5cbiAgICBkcmF3TWFwOiAoY3R4KSAtPlxuICAgICAgICBpZiBAbWFwTG9hZGVkXG4gICAgICAgICAgICBAbWFwLmRyYXdNYXBSZWN0IGN0eCxcbiAgICAgICAgICAgICAgICBAdmlld3BvcnQueCwgQHZpZXdwb3J0LnksXG4gICAgICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aCwgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vdmVNYXBTbW9vdGhEZW1vU2NlbmUiLCJTY2VuZSA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU2NlbmUuY29mZmVlXCJcblV0aWwgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1V0aWwuY29mZmVlXCJcblNjZW5lTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9TY2VuZU1hbmFnZXIuY29mZmVlXCJcbkdyYXBoaWNzTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9HcmFwaGljc01hbmFnZXIuY29mZmVlXCJcbklucHV0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9JbnB1dE1hbmFnZXIuY29mZmVlXCJcbkF1ZGlvTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9BdWRpb01hbmFnZXIuY29mZmVlXCJcbkFzc2V0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9Bc3NldE1hbmFnZXIuY29mZmVlXCJcblxuY2xhc3MgTWVudVNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBpbml0OiAtPlxuICAgICAgICBAbWVudXMgPSB7fVxuICAgICAgICBAY3R4ID0gR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eFxuICAgICAgICBAY2xpY2tMaXN0ZW5lciA9IEBvbk1vdXNlQ2xpY2suYmluZCBAXG5cbiAgICAgICAgIyBTZXQgdGhlIGN1cnJlbnQgbWVudVxuICAgICAgICBAY3VycmVudE1lbnUgPSBcIm1haW5cIlxuXG4gICAgICAgIEF1ZGlvTWFuYWdlci5sb2FkIFwibWVudS1zZWxlY3RcIiwgXCJhc3NldHMvc291bmQvVUkgcGFjayAxL01FTlUgQl9TZWxlY3Qud2F2XCJcbiAgICAgICAgQXVkaW9NYW5hZ2VyLmxvYWQgXCJtZW51LWJhY2tcIiwgXCJhc3NldHMvc291bmQvVUkgcGFjayAxL01FTlUgQl9CYWNrLndhdlwiXG5cbiAgICAgICAgIyBMb2FkIHRoZSBtZW51c1xuICAgICAgICBAbG9hZE1lbnUgXCJhc3NldHMvbWVudS9tYWluLmpzb25cIlxuICAgICAgICBAbG9hZE1lbnUgXCJhc3NldHMvbWVudS9kZW1vcy5qc29uXCJcblxuXG4gICAgbG9hZE1lbnU6IChtZW51RmlsZSkgLT5cbiAgICAgICAgbWFwID0gVXRpbC5sb2FkSlNPTiBtZW51RmlsZVxuICAgICAgICBtYXAudGhlbiBAcGFyc2VNZW51LmJpbmQgQFxuXG5cbiAgICBwYXJzZU1lbnU6IChtZW51RGF0YSkgLT5cbiAgICAgICAgQG1lbnVzW21lbnVEYXRhLmlkXSA9IHtcbiAgICAgICAgICAgIGlkOiBtZW51RGF0YS5pZFxuICAgICAgICAgICAgYmFja2dyb3VuZDogbWVudURhdGEuYmFja2dyb3VuZFxuICAgICAgICAgICAgZWxlbWVudHM6IFtdXG4gICAgICAgICAgICBidXR0b25zOiBbXVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIGVsZW1lbnQgaW4gbWVudURhdGEuZWxlbWVudHNcblxuICAgICAgICAgICAgaWYgZWxlbWVudC50eXBlID09IFwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBAYWRkQnV0dG9uIG1lbnVEYXRhLmlkLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnRleHQsXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQueCxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC55LFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hY3Rpb25UeXBlLFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFjdGlvblxuXG5cbiAgICBhZGRCdXR0b246IChtZW51LCB0ZXh0LCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBhY3Rpb25UeXBlLCBhY3Rpb24pIC0+XG4gICAgICAgIGlmIGFjdGlvblR5cGUgPT0gXCJzd2l0Y2hNZW51XCIgdGhlbiBvbkNsaWNrID0gQHN3aXRjaE1lbnUuYmluZCBALCBhY3Rpb25cbiAgICAgICAgaWYgYWN0aW9uVHlwZSA9PSBcInN3aXRjaFNjZW5lXCIgdGhlbiBvbkNsaWNrID0gQHN3aXRjaFNjZW5lLmJpbmQgQCwgYWN0aW9uXG5cbiAgICAgICAgYnV0dG9uID1cbiAgICAgICAgICAgIHRleHQ6IHRleHRcbiAgICAgICAgICAgIHg6IHhcbiAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgICAgIGNsaWNrOiBvbkNsaWNrXG5cbiAgICAgICAgaWYgbm90IEBtZW51c1ttZW51XSB0aGVuIEBtZW51c1ttZW51XSA9IHt9XG4gICAgICAgIGlmIG5vdCBAbWVudXNbbWVudV0uYnV0dG9ucyB0aGVuIEBtZW51c1ttZW51XS5idXR0b25zID0gW11cbiAgICAgICAgQG1lbnVzW21lbnVdLmJ1dHRvbnMucHVzaCBidXR0b25cblxuICAgIGFjdGl2YXRlOiAtPlxuICAgICAgICBAYmFja2dyb3VuZCA9IEFzc2V0TWFuYWdlci5nZXQgXCJpbWcvYmFja2dyb3VuZC9pbWFnZTZfMC5qcGdcIlxuICAgICAgICBJbnB1dE1hbmFnZXIub25Nb3VzZUNsaWNrID0gQG9uTW91c2VDbGljay5iaW5kIEBcbiAgICAgICAgQGN1cnJlbnRNZW51ID0gXCJtYWluXCJcbiAgICAgICAgQHJlbmRlck1lbnUoKVxuXG4gICAgZGVhY3RpdmF0ZTogLT4gSW5wdXRNYW5hZ2VyLm9uTW91c2VDbGljayA9IG51bGxcblxuICAgIHN3aXRjaE1lbnU6IChuZXdNZW51KSAtPlxuICAgICAgICBpZiBuZXdNZW51ID09IFwibWFpblwiXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIucGxheSBcIm1lbnUtYmFja1wiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5IFwibWVudS1zZWxlY3RcIlxuXG4gICAgICAgIEBjdXJyZW50TWVudSA9IG5ld01lbnVcbiAgICAgICAgQHJlbmRlck1lbnUoKVxuXG4gICAgc3dpdGNoU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXkgXCJtZW51LXNlbGVjdFwiXG4gICAgICAgIFNjZW5lTWFuYWdlci5hY3RpdmF0ZSBzY2VuZVxuXG4gICAgb25Nb3VzZUNsaWNrOiAoZSkgLT5cbiAgICAgICAgYnV0dG9uID0gQGdldEJ1dHRvbkZyb21Qb2ludCBlLngsIGUueVxuICAgICAgICBpZiBidXR0b24gdGhlbiBidXR0b24uY2xpY2soKVxuXG4gICAgZ2V0QnV0dG9uRnJvbVBvaW50OiAoeCwgeSkgLT5cbiAgICAgICAgbWVudSA9IEBtZW51c1tAY3VycmVudE1lbnVdXG4gICAgICAgIGZvciBidXR0b24gaW4gbWVudS5idXR0b25zXG4gICAgICAgICAgICBpZiBAaXNQb2ludEluUmVjdCB4LCB5LCBidXR0b24ueCwgYnV0dG9uLnksIGJ1dHRvbi53aWR0aCwgYnV0dG9uLmhlaWdodFxuICAgICAgICAgICAgICAgIHJldHVybiBidXR0b25cblxuICAgIGlzUG9pbnRJblJlY3Q6ICh4LCB5LCByeCwgcnksIHJ3LCByaCkgLT4gcmV0dXJuIHggPj0gcnggJiYgeCA8PSByeSArIHJ3ICYmIHkgPj0gcnkgJiYgeSA8PSByeSArIHJoXG5cbiAgICByZW5kZXJNZW51OiAtPlxuICAgICAgICBAcmVuZGVyQmFja2dyb3VuZCgpXG4gICAgICAgIG1lbnUgPSBAbWVudXNbQGN1cnJlbnRNZW51XVxuICAgICAgICBmb3IgYnV0dG9uIGluIG1lbnUuYnV0dG9uc1xuICAgICAgICAgICAgQHJlbmRlckJ1dHRvbiBidXR0b25cblxuICAgIHJlbmRlckJhY2tncm91bmQ6IC0+XG4gICAgICAgIEdyYXBoaWNzTWFuYWdlci5maWxsSW1hZ2UgQGN0eCwgQGJhY2tncm91bmQsXG4gICAgICAgICAgICBAYmFja2dyb3VuZC53aWR0aCwgQGJhY2tncm91bmQuaGVpZ2h0LFxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aCwgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHRcblxuICAgIHJlbmRlckJ1dHRvbjogKGJ1dHRvbiwgaG92ZXIgPSBmYWxzZSkgLT5cbiAgICAgICAgQGN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIlxuICAgICAgICBAY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCJcblxuICAgICAgICBpZiBob3ZlclxuICAgICAgICAgICAgQGN0eC5zaGFkb3dCbHVyID0gMjBcbiAgICAgICAgICAgIEBjdHguc2hhZG93Q29sb3IgPSBcInllbGxvd1wiXG5cbiAgICAgICAgQGN0eC5maWxsUmVjdCBidXR0b24ueCwgYnV0dG9uLnksIGJ1dHRvbi53aWR0aCwgYnV0dG9uLmhlaWdodFxuXG4gICAgICAgIEBjdHguc2hhZG93Qmx1ciA9IDAgaWYgaG92ZXJcblxuICAgICAgICBAY3R4LnN0cm9rZVJlY3QgYnV0dG9uLngsIGJ1dHRvbi55LCBidXR0b24ud2lkdGgsIGJ1dHRvbi5oZWlnaHRcblxuICAgICAgICBAY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiXG4gICAgICAgIEBjdHguZm9udCA9IFwiMTJweCBBcmlhbCwgc2Fucy1zZXJpZlwiXG4gICAgICAgIEBjdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIlxuICAgICAgICB0ZXh0U2l6ZSA9IEBjdHgubWVhc3VyZVRleHQgYnV0dG9uLnRleHRcbiAgICAgICAgQGN0eC5maWxsVGV4dCBidXR0b24udGV4dCwgYnV0dG9uLnggKyAxMDAgLSAodGV4dFNpemUud2lkdGggLyAyKSwgYnV0dG9uLnkgKyA3XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNZW51U2NlbmUiLCJTY2VuZSA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU2NlbmUuY29mZmVlXCJcblNjZW5lTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9TY2VuZU1hbmFnZXIuY29mZmVlXCJcbkdyYXBoaWNzTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9HcmFwaGljc01hbmFnZXIuY29mZmVlXCJcbkFzc2V0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9Bc3NldE1hbmFnZXIuY29mZmVlXCJcblxuY2xhc3MgUHJlTG9hZFNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBpbml0OiAtPlxuICAgICAgICBAYmFyID1cbiAgICAgICAgICAgIHg6IChHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoIC8gMikgLSAxMDBcbiAgICAgICAgICAgIHk6IChHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodCAvIDIpIC0gMjBcbiAgICAgICAgICAgIHdpZHRoOiAyMDBcbiAgICAgICAgICAgIGhlaWdodDogMjBcblxuICAgICAgICBAYmFyLm1pZGRsZSA9IEBiYXIueCArIChAYmFyLndpZHRoIC8gMilcblxuICAgICAgICBAY3R4ID0gR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmN0eFxuXG5cbiAgICBhY3RpdmF0ZTogKHNjZW5lID0gXCJtZW51XCIpIC0+XG4gICAgICAgIEBjdHguZmlsbFN0eWxlID0gXCIjMDAwXCJcbiAgICAgICAgQGN0eC5maWxsUmVjdCAwLCAwLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuXG4gICAgICAgIEByZW5kZXJMb2FkaW5nQmFyIDBcbiAgICAgICAgQHJlbmRlckxvYWRpbmdUZXh0IFwiTG9hZGluZy4uLlwiXG5cbiAgICAgICAgQXNzZXRNYW5hZ2VyLm9uUHJvZ3Jlc3MgPSBAb25Qcm9ncmVzcy5iaW5kIEBcblxuICAgICAgICBsb2FkQXNzZXQgPSBBc3NldE1hbmFnZXIubG9hZCBcImFzc2V0cy9kZW1vLWFzc2V0cy5qc29uXCJcbiAgICAgICAgbG9hZEFzc2V0LnRoZW4gLT4gU2NlbmVNYW5hZ2VyLmFjdGl2YXRlIHNjZW5lXG5cblxuICAgIG9uUHJvZ3Jlc3M6IChhc3NldCwgZ3JvdXAsIGxvYWRlZCwgdG90YWwpIC0+XG4gICAgICAgIEBjdHguZmlsbFN0eWxlID0gXCIjMDAwXCJcbiAgICAgICAgQGN0eC5maWxsUmVjdCAwLCAwLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLndpZHRoLCBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLmhlaWdodFxuICAgICAgICBAcmVuZGVyTG9hZGluZ1RleHQgXCJMb2FkaW5nICN7Z3JvdXB9Li4uXCJcbiAgICAgICAgQHJlbmRlckxvYWRpbmdCYXIgbG9hZGVkIC8gdG90YWxcblxuXG4gICAgcmVuZGVyTG9hZGluZ1RleHQ6ICh0ZXh0KSAtPlxuICAgICAgICBAY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZlwiXG4gICAgICAgIEBjdHguZm9udCA9IFwiMTJweCBBcmlhbCwgc2Fucy1zZXJpZlwiXG4gICAgICAgIEBjdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIlxuICAgICAgICB0ZXh0U2l6ZSA9IEBjdHgubWVhc3VyZVRleHQgdGV4dFxuICAgICAgICBAY3R4LmZpbGxUZXh0IHRleHQsIEBiYXIubWlkZGxlIC0gKHRleHRTaXplLndpZHRoIC8gMiksIEBiYXIueSArIEBiYXIuaGVpZ2h0ICsgMTBcblxuXG4gICAgcmVuZGVyTG9hZGluZ0JhcjogKHBlcmNlbnQpIC0+XG4gICAgICAgIEBjdHguZmlsbFN0eWxlID0gXCIjZmZmXCJcbiAgICAgICAgQGN0eC5zdHJva2VTdHlsZSA9IFwiI2ZmZlwiXG4gICAgICAgIEBjdHguc3Ryb2tlUmVjdCBAYmFyLngsIEBiYXIueSwgQGJhci53aWR0aCwgQGJhci5oZWlnaHRcbiAgICAgICAgQGN0eC5maWxsUmVjdCBAYmFyLnggKyAzLCBAYmFyLnkgKyAzLCAoQGJhci53aWR0aCAtIDYpICogcGVyY2VudCwgQGJhci5oZWlnaHQgLSA2XG5cblxubW9kdWxlLmV4cG9ydHMgPSBQcmVMb2FkU2NlbmUiLCJFbmdpbmUgPSByZXF1aXJlIFwiLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL0VuZ2luZS5jb2ZmZWVcIlxuXG5Cb290U2NlbmUgPSByZXF1aXJlIFwiLi9TdGF0ZS9Cb290U2NlbmUuY29mZmVlXCJcblxuXG5nYW1lID0gbmV3IEVuZ2luZVxuZ2FtZS5zdGFydCBuZXcgQm9vdFNjZW5lIiwiU2NlbmVNYW5hZ2VyID0gcmVxdWlyZSBcIi4vTWFuYWdlci9TY2VuZU1hbmFnZXIuY29mZmVlXCJcblxuY2xhc3MgRW5naW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEBsYXN0R2FtZVRpY2sgPSBEYXRlLm5vdygpXG5cbiAgICBzdGFydDogKHNjZW5lKSAtPlxuICAgICAgICBTY2VuZU1hbmFnZXIuYWRkIFwiYm9vdFwiLCBzY2VuZVxuICAgICAgICBzY2VuZS5pbml0KClcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFjdGl2YXRlIFwiYm9vdFwiXG4gICAgICAgIEBtYWluTG9vcCgpXG5cbiAgICBtYWluTG9vcDogLT5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBtYWluTG9vcC5iaW5kIEBcblxuICAgICAgICBAY3VycmVudEdhbWVUaWNrID0gRGF0ZS5ub3coKVxuICAgICAgICBAZGVsdGEgPSBAY3VycmVudEdhbWVUaWNrIC0gQGxhc3RHYW1lVGlja1xuICAgICAgICBAbGFzdEdhbWVUaWNrID0gQGN1cnJlbnRHYW1lVGlja1xuXG4gICAgICAgIEB1cGRhdGUgQGRlbHRhXG4gICAgICAgIHJldHVybiBudWxsXG5cbiAgICB1cGRhdGU6IChkdCkgLT5cbiAgICAgICAgc2NlbmUgPSBTY2VuZU1hbmFnZXIuY3VycmVudCgpXG5cbiAgICAgICAgZm9yIHN5c3RlbSBpbiBzY2VuZS5zeXN0ZW1zXG4gICAgICAgICAgICBzeXN0ZW0udXBkYXRlIGR0XG4gICAgICAgIHJldHVybiBudWxsXG5cblxubW9kdWxlLmV4cG9ydHMgPSBFbmdpbmUiLCJ1dWlkID0gcmVxdWlyZSBcIi4uL3ZlbmRvci9ub2RlLXV1aWQvdXVpZC5qc1wiXG5cbmNsYXNzIEVudGl0eVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAaWQgPSBudWxsXG4gICAgICAgIEBjb21wb25lbnRzID0gW11cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRpdHkiLCJVdGlsID0gcmVxdWlyZSBcIi4uL1V0aWwuY29mZmVlXCJcblxuY2xhc3MgQXNzZXRNYW5hZ2VyXG4gICAgQGFzc2V0cyA9IHt9XG4gICAgQG51bUFzc2V0cyA9IDBcbiAgICBAYXNzZXRzTG9hZGVkID0gMFxuXG4gICAgQGxvYWQ6IChtYW5pZmVzdCkgLT5cbiAgICAgICAgQG51bUFzc2V0cyA9IDBcbiAgICAgICAgQGFzc2V0c0xvYWRlZCA9IDBcblxuICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UgKHJlc29sdmUpIC0+XG4gICAgICAgICAgICBsb2FkTWFuaWZlc3QgPSBVdGlsLmxvYWRKU09OIG1hbmlmZXN0XG4gICAgICAgICAgICBsb2FkTWFuaWZlc3QudGhlbiAoanNvbikgLT5cbiAgICAgICAgICAgICAgICBmb3IgaSwgYXNzZXRHcm91cCBvZiBqc29uLmFzc2V0c1xuICAgICAgICAgICAgICAgICAgICBmb3IgYSBpbiBhc3NldEdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIubnVtQXNzZXRzKytcblxuICAgICAgICAgICAgICAgIGZvciBncm91cE5hbWUsIGFzc2V0R3JvdXAgb2YganNvbi5hc3NldHNcbiAgICAgICAgICAgICAgICAgICAgZm9yIGFzc2V0IGluIGFzc2V0R3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5vbkJlZm9yZUxvYWQ/IGFzc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIuYXNzZXRzTG9hZGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0TWFuYWdlci5udW1Bc3NldHNcblxuICAgICAgICAgICAgICAgICAgICAgICAgZG8gKGFzc2V0KSAtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgTG9hZCBiYXNlZCBvbiBmaWxlIHR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBhc3NldC50eXBlID09IFwiaW1hZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldExvYWQgPSBVdGlsLmxvYWRJbWFnZSBqc29uLnJvb3QgKyBhc3NldC5maWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZC50aGVuIChpbWcpIC0+IEFzc2V0TWFuYWdlci5hc3NldExvYWRlZCBhc3NldCwgZ3JvdXBOYW1lLCByZXNvbHZlLCBpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIGFzc2V0LnR5cGUgPT0gXCJqc29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkID0gVXRpbC5sb2FkSlNPTiBqc29uLnJvb3QgKyBhc3NldC5maWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZC50aGVuIChqc29uKSAtPiBBc3NldE1hbmFnZXIuYXNzZXRMb2FkZWQgYXNzZXQsIGdyb3VwTmFtZSwgcmVzb2x2ZSwganNvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkID0gVXRpbC5sb2FkIGpzb24ucm9vdCArIGFzc2V0LmZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkLnRoZW4gLT4gQXNzZXRNYW5hZ2VyLmFzc2V0TG9hZGVkIGFzc2V0LCBncm91cE5hbWUsIHJlc29sdmVcbiAjXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkLmNhdGNoIC0+IEFzc2V0TWFuYWdlci5vbkVycm9yIGFzc2V0LCBncm91cE5hbWVcblxuICAgICAgICByZXR1cm4gcHJvbWlzZVxuXG4gICAgQGFzc2V0TG9hZGVkOiAoYXNzZXQsIGdyb3VwTmFtZSwgcmVzb2x2ZSwgZGF0YSkgLT5cbiAgICAgICAgaWYgZGF0YSB0aGVuIEFzc2V0TWFuYWdlci5hc3NldHNbYXNzZXQuZmlsZV0gPSBkYXRhXG4gICAgICAgIEFzc2V0TWFuYWdlci5hc3NldHNMb2FkZWQrK1xuICAgICAgICBBc3NldE1hbmFnZXIub25Qcm9ncmVzcz8gYXNzZXQsXG4gICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICBBc3NldE1hbmFnZXIuYXNzZXRzTG9hZGVkLFxuICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLm51bUFzc2V0c1xuXG4gICAgICAgIGlmIEFzc2V0TWFuYWdlci5hc3NldHNMb2FkZWQgaXMgQXNzZXRNYW5hZ2VyLm51bUFzc2V0c1xuICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLm9uTG9hZGVkPygpXG4gICAgICAgICAgICByZXNvbHZlKClcblxuICAgIEBvbkJlZm9yZUxvYWQ6IChhc3NldCwgZ3JvdXAsIGxvYWRlZCwgdG90YWwpIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uUHJvZ3Jlc3M6IChhc3NldCwgZ3JvdXAsIGxvYWRlZCwgdG90YWwpIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uRXJyb3I6IChhc3NldCwgZ3JvdXApIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uTG9hZGVkOiAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuXG4gICAgQGdldDogKGFzc2V0KSAtPiBBc3NldE1hbmFnZXIuYXNzZXRzW2Fzc2V0XVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQXNzZXRNYW5hZ2VyIiwiY2xhc3MgQXVkaW9NYW5hZ2VyXG4gICAgQHNvdW5kczoge31cblxuICAgIEBsb2FkOiAoaWQsIGF1ZGlvRmlsZSkgLT5cbiAgICAgICAgc291bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiYXVkaW9cIlxuICAgICAgICBzb3VuZC5zcmMgPSBhdWRpb0ZpbGVcbiAgICAgICAgQXVkaW9NYW5hZ2VyLnNvdW5kc1tpZF0gPSBzb3VuZFxuXG4gICAgQHBsYXk6IChpZCkgLT5cbiAgICAgICAgc291bmQgPSBBdWRpb01hbmFnZXIuc291bmRzW2lkXVxuICAgICAgICBpZiBzb3VuZFxuICAgICAgICAgICAgc291bmQucGF1c2UoKVxuICAgICAgICAgICAgc291bmQuY3VycmVudFRpbWUgPSAwXG4gICAgICAgICAgICBzb3VuZC5wbGF5KClcblxubW9kdWxlLmV4cG9ydHMgPSBBdWRpb01hbmFnZXIiLCJ1dWlkID0gcmVxdWlyZSBcIi4uLy4uL3ZlbmRvci9ub2RlLXV1aWQvdXVpZC5qc1wiXG5FbnRpdHkgPSByZXF1aXJlIFwiLi4vRW50aXR5LmNvZmZlZVwiXG5cbmNsYXNzIEVudGl0eU1hbmFnZXJcbiAgICBAZW50aXRpZXMgPSBbXVxuXG4gICAgQGNyZWF0ZUVudGl0eTogKGlkLCBhZGRUb0xpc3QgPSB0cnVlKSAtPlxuICAgICAgICBpZCA/PSB1dWlkLnYxKClcbiAgICAgICAgZW50aXR5ID0gbmV3IEVudGl0eVxuICAgICAgICBlbnRpdHkuaWQgPSBpZFxuICAgICAgICBAYWRkRW50aXR5IGVudGl0eSBpZiBhZGRUb0xpc3RcbiAgICAgICAgcmV0dXJuIGVudGl0eVxuXG4gICAgQGFkZEVudGl0eTogKGVudGl0eSkgLT4gQGVudGl0aWVzLnB1c2ggZW50aXR5XG5cbiAgICBAcmVtb3ZlRW50aXR5OiAoZW50aXR5KSAtPlxuICAgICAgICAjIEZpbmQgdGhlIGluZGV4IG9mIHRoZSBlbnRpdHkgaW4gdGhlIGxpc3RcbiAgICAgICAgaW5kZXggPSAtMVxuICAgICAgICBmb3IgZSwgaSBpbiBAZW50aXRpZXNcbiAgICAgICAgICAgIGlmIGUgPT0gZW50aXR5IHRoZW4gaW5kZXggPSBpXG5cbiAgICAgICAgIyBSZW1vdmUgZnJvbSBlbnRpdHkgbGlzdFxuICAgICAgICBAZW50aXRpZXMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgICAgIHJldHVybiBlbnRpdHlcblxuICAgIEBkZWxldGVFbnRpdHk6IChlbnRpdHkpIC0+XG4gICAgICAgIEVudGl0eU1hbmFnZXIucmVtb3ZlQWxsQ29tcG9uZW50cyBlbnRpdHlcbiAgICAgICAgQHJlbW92ZUVudGl0eSBlbnRpdHlcblxuICAgIEBkZWxldGVBbGxFbnRpdGllczogLT5cbiAgICAgICAgZm9yIGVudGl0eSBpbiBAZW50aXRpZXNcbiAgICAgICAgICAgIEVudGl0eU1hbmFnZXIucmVtb3ZlQWxsQ29tcG9uZW50cyBlbnRpdHlcbiAgICAgICAgQGVudGl0aWVzLmxlbmd0aCA9IDBcblxuXG4gICAgQGdldEVudGl0eUJ5SWQ6IC0+XG4gICAgQGdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZTogLT5cblxuICAgIEBnZXRBbGxFbnRpdGllc1dpdGhDb21wb25lbnRPZlR5cGVzOiAoY29tcG9uZW50VHlwZXMpIC0+XG4gICAgICAgIGVudGl0aWVzID0gW11cbiAgICAgICAgZm9yIGVudGl0eSBpbiBAZW50aXRpZXNcbiAgICAgICAgICAgIGNvbXBvbmVudENvdW50ID0gMFxuICAgICAgICAgICAgZm9yIGNvbXBvbmVudCBpbiBlbnRpdHkuY29tcG9uZW50c1xuICAgICAgICAgICAgICAgIGlmIGNvbXBvbmVudFR5cGVzLmluZGV4T2YoY29tcG9uZW50LnR5cGUpID4gLTEgdGhlbiBjb21wb25lbnRDb3VudCsrXG4gICAgICAgICAgICBpZiBjb21wb25lbnRDb3VudCA9PSBjb21wb25lbnRUeXBlcy5sZW5ndGggdGhlbiBlbnRpdGllcy5wdXNoIGVudGl0eVxuICAgICAgICByZXR1cm4gZW50aXRpZXNcblxuICAgIEBhZGRDb21wb25lbnQ6IChlbnRpdHksIGNvbXBvbmVudCkgLT4gZW50aXR5LmNvbXBvbmVudHMucHVzaCBjb21wb25lbnRcblxuICAgIEBoYXNDb21wb25lbnQ6IC0+XG5cbiAgICBAZ2V0Q29tcG9uZW50T2ZUeXBlOiAoZW50aXR5LCBjb21wb25lbnRUeXBlKSAtPlxuICAgICAgICBmb3IgY29tcG9uZW50IGluIGVudGl0eS5jb21wb25lbnRzXG4gICAgICAgICAgICBpZiBjb21wb25lbnQudHlwZSA9PSBjb21wb25lbnRUeXBlIHRoZW4gcmV0dXJuIGNvbXBvbmVudFxuICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgQHJlbW92ZUFsbENvbXBvbmVudHM6IChlbnRpdHkpIC0+IGVudGl0eS5jb21wb25lbnRzLmxlbmd0aCA9IDBcblxuXG4jICAgIGdldENvbXBvbmVudE9mVHlwZTogKGVudGl0eSwgY29tcG9uZW50VHlwZSkgLT4gXy5maW5kIGVudGl0eS5jb21wb25lbnRzLCAoYykgLT4gYy50eXBlID09IGNvbXBvbmVudFR5cGVcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0eU1hbmFnZXIiLCJjbGFzcyBHcmFwaGljc01hbmFnZXJcblxuICAgIEBjcmVhdGVDYW52YXM6ICh3aWR0aCwgaGVpZ2h0LCBhcHBlbmRUbykgLT5cbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImNhbnZhc1wiXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHRcblxuICAgICAgICBpZiBhcHBlbmRUbyB0aGVuIGFwcGVuZFRvLmFwcGVuZENoaWxkIGNhbnZhc1xuXG4gICAgICAgIHJldHVybiBjYW52YXNcblxuXG4gICAgQGNyZWF0ZVJlbmRlcmVyOiAod2lkdGgsIGhlaWdodCwgYXBwZW5kVG8pIC0+XG4gICAgICAgIHJlbmRlcmVyID0ge31cbiAgICAgICAgcmVuZGVyZXIuY2FudmFzID0gR3JhcGhpY3NNYW5hZ2VyLmNyZWF0ZUNhbnZhcyB3aWR0aCwgaGVpZ2h0LCBhcHBlbmRUb1xuICAgICAgICByZW5kZXJlci5jdHggPSByZW5kZXJlci5jYW52YXMuZ2V0Q29udGV4dCBcIjJkXCJcbiAgICAgICAgcmVuZGVyZXIud2lkdGggPSB3aWR0aFxuICAgICAgICByZW5kZXJlci5oZWlnaHQgPSBoZWlnaHRcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyXG5cblxuICAgIEBjbG9uZVJlbmRlcmVyOiAob2xkUmVuZGVyZXIsIGFwcGVuZFRvKSAtPlxuICAgICAgICBHcmFwaGljc01hbmFnZXIuY3JlYXRlUmVuZGVyZXIgb2xkUmVuZGVyZXIuY2FudmFzLndpZHRoLCBvbGRSZW5kZXJlci5jYW52YXMuaGVpZ2h0LCBhcHBlbmRUb1xuXG5cbiAgICBAZmlsbEltYWdlOiAoY3R4LCBpbWFnZSwgaW1hZ2VXaWR0aCwgaW1hZ2VIZWlnaHQsIGRlc3RpbmF0aW9uV2lkdGgsIGRlc3RpbmF0aW9uSGVpZ2h0KSAtPlxuICAgICAgICByYXRpb0ltYWdlID0gaW1hZ2VXaWR0aCAvIGltYWdlSGVpZ2h0XG4gICAgICAgIHJhdGlvRGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbldpZHRoIC8gZGVzdGluYXRpb25IZWlnaHRcblxuICAgICAgICB3aWR0aCA9IGRlc3RpbmF0aW9uV2lkdGhcbiAgICAgICAgaGVpZ2h0ID0gZGVzdGluYXRpb25IZWlnaHRcblxuICAgICAgICBpZiByYXRpb0Rlc3RpbmF0aW9uID4gcmF0aW9JbWFnZVxuICAgICAgICAgICAgaGVpZ2h0ID0gZGVzdGluYXRpb25XaWR0aCAvIHJhdGlvSW1hZ2VcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgd2lkdGggPSBkZXN0aW5hdGlvbkhlaWdodCAqIHJhdGlvSW1hZ2VcblxuICAgICAgICBjdHguZHJhd0ltYWdlIGltYWdlLCAwLCAwLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgMCwgMCwgd2lkdGgsIGhlaWdodFxuXG5cbiAgICBAZml0SW1hZ2U6IChjdHgsIGltYWdlLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgZGVzdGluYXRpb25XaWR0aCwgZGVzdGluYXRpb25IZWlnaHQpIC0+XG4gICAgICAgIHJhdGlvSW1hZ2UgPSBpbWFnZVdpZHRoIC8gaW1hZ2VIZWlnaHRcbiAgICAgICAgcmF0aW9EZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uV2lkdGggLyBkZXN0aW5hdGlvbkhlaWdodFxuXG4gICAgICAgIHdpZHRoID0gZGVzdGluYXRpb25XaWR0aFxuICAgICAgICBoZWlnaHQgPSBkZXN0aW5hdGlvbkhlaWdodFxuXG4gICAgICAgIGlmIHJhdGlvRGVzdGluYXRpb24gPiByYXRpb0ltYWdlXG4gICAgICAgICAgICB3aWR0aCA9IGltYWdlV2lkdGggKiBkZXN0aW5hdGlvbkhlaWdodCAvIGltYWdlSGVpZ2h0XG4gICAgICAgICAgICBoZWlnaHQgPSBkZXN0aW5hdGlvbkhlaWdodFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3aWR0aCA9IGRlc3RpbmF0aW9uV2lkdGhcbiAgICAgICAgICAgIGhlaWdodCA9IGltYWdlSGVpZ2h0ICogZGVzdGluYXRpb25XaWR0aCAvIGltYWdlV2lkdGhcblxuICAgICAgICBjdHguZHJhd0ltYWdlIGltYWdlLCAwLCAwLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgMCwgMCwgd2lkdGgsIGhlaWdodFxuXG5cbiAgICBAcm91bmRlZFJlY3RTdHJva2U6IChjdHgsIHgsIHksIHcsIGgsIHJhZGl1cykgLT5cbiAgICAgICAgciA9IHggKyB3XG4gICAgICAgIGIgPSB5ICsgaFxuICAgICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAgICAgY3R4Lm1vdmVUbyB4ICsgcmFkaXVzLCB5XG4gICAgICAgIGN0eC5saW5lVG8gciAtIHJhZGl1cywgeVxuICAgICAgICBjdHgucXVhZHJhdGljQ3VydmVUbyByLCB5LCByLCB5ICsgcmFkaXVzXG4gICAgICAgIGN0eC5saW5lVG8gciwgeSArIGggLSByYWRpdXNcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8gciwgYiwgciAtIHJhZGl1cywgYlxuICAgICAgICBjdHgubGluZVRvIHggKyByYWRpdXMsIGJcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8geCwgYiwgeCwgYiAtIHJhZGl1c1xuICAgICAgICBjdHgubGluZVRvIHgsIHkgKyByYWRpdXNcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8geCwgeSwgeCArIHJhZGl1cywgeVxuICAgICAgICBjdHguc3Ryb2tlKClcblxuICAgIEByb3VuZGVkUmVjdEZpbGw6IChjdHgsIHgsIHksIHcsIGgsIHJhZGl1cykgLT5cbiAgICAgICAgciA9IHggKyB3XG4gICAgICAgIGIgPSB5ICsgaFxuICAgICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAgICAgY3R4Lm1vdmVUbyB4ICsgcmFkaXVzLCB5XG4gICAgICAgIGN0eC5saW5lVG8gciAtIHJhZGl1cywgeVxuICAgICAgICBjdHgucXVhZHJhdGljQ3VydmVUbyByLCB5LCByLCB5ICsgcmFkaXVzXG4gICAgICAgIGN0eC5saW5lVG8gciwgeSArIGggLSByYWRpdXNcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8gciwgYiwgciAtIHJhZGl1cywgYlxuICAgICAgICBjdHgubGluZVRvIHggKyByYWRpdXMsIGJcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8geCwgYiwgeCwgYiAtIHJhZGl1c1xuICAgICAgICBjdHgubGluZVRvIHgsIHkgKyByYWRpdXNcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8geCwgeSwgeCArIHJhZGl1cywgeVxuICAgICAgICBjdHguZmlsbCgpXG5cbm1vZHVsZS5leHBvcnRzID0gR3JhcGhpY3NNYW5hZ2VyIiwiY2xhc3MgSW5wdXRNYW5hZ2VyXG4gICAgQENMSUNLX01PVkVfVEhSRVNIT0xEOiAzXG5cbiAgICBATU9VU0VfVFJBTlNGT1JNX1JFQ1Q6IGZhbHNlXG4gICAgQE1PVVNFX1RSQU5TRk9STV9XSURUSDogZmFsc2VcbiAgICBATU9VU0VfVFJBTlNGT1JNX0hFSUdIVDogZmFsc2VcbiAgICBATU9VU0VfT0ZGU0VUX1g6IGZhbHNlXG4gICAgQE1PVVNFX09GRlNFVF9ZOiBmYWxzZVxuXG4gICAgQG1vdXNlOlxuICAgICAgICB4OiAwXG4gICAgICAgIHk6IDBcbiAgICAgICAgZG93bjogZmFsc2VcbiAgICAgICAgZG93blg6IDBcbiAgICAgICAgZG93blk6IDBcblxuICAgIEBrZXk6XG4gICAgICAgIHVwOiBmYWxzZVxuICAgICAgICBkb3duOiBmYWxzZVxuICAgICAgICBsZWZ0OiBmYWxzZVxuICAgICAgICByaWdodDogZmFsc2VcblxuICAgIEBpbml0OiAoZWxlbWVudCA9IGRvY3VtZW50KSAtPlxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCBJbnB1dE1hbmFnZXIubW91c2VDbGlja1xuXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcIm1vdXNlZG93blwiLCBJbnB1dE1hbmFnZXIubW91c2VEb3duXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcInRvdWNoc3RhcnRcIiwgSW5wdXRNYW5hZ2VyLm1vdXNlRG93blxuXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcIm1vdXNldXBcIiwgSW5wdXRNYW5hZ2VyLm1vdXNlVXBcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyIFwidG91Y2hlbmRcIiwgSW5wdXRNYW5hZ2VyLm1vdXNlVXBcblxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJtb3VzZW1vdmVcIiwgSW5wdXRNYW5hZ2VyLm1vdXNlTW92ZVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJ0b3VjaG1vdmVcIiwgSW5wdXRNYW5hZ2VyLm1vdXNlTW92ZVxuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJrZXl1cFwiLCBJbnB1dE1hbmFnZXIua2V5VXBcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleWRvd25cIiwgSW5wdXRNYW5hZ2VyLmtleURvd25cblxuICAgIEBtb3VzZUNsaWNrOiAoZSkgLT5cbiAgICAgICAgeCA9IElucHV0TWFuYWdlci50cmFuc2Zvcm1Nb3VzZVggZS54XG4gICAgICAgIHkgPSBJbnB1dE1hbmFnZXIudHJhbnNmb3JtTW91c2VZIGUueVxuICAgICAgICBtb3ZlWCA9IE1hdGguYWJzIElucHV0TWFuYWdlci5tb3VzZS5kb3duWCAtIHhcbiAgICAgICAgbW92ZVkgPSBNYXRoLmFicyBJbnB1dE1hbmFnZXIubW91c2UuZG93blkgLSB5XG4gICAgICAgIGlmIG1vdmVYIDwgSW5wdXRNYW5hZ2VyLkNMSUNLX01PVkVfVEhSRVNIT0xEICYmIG1vdmVZIDwgSW5wdXRNYW5hZ2VyLkNMSUNLX01PVkVfVEhSRVNIT0xEXG4gICAgICAgICAgICBJbnB1dE1hbmFnZXIub25Nb3VzZUNsaWNrPyB7eDp4LCB5Onl9XG5cbiAgICBAbW91c2VEb3duOiAoZSkgLT5cbiAgICAgICAgaWYgZS5jaGFuZ2VkVG91Y2hlc1xuICAgICAgICAgICAgeCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVhcbiAgICAgICAgICAgIHkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHggPSBlLnhcbiAgICAgICAgICAgIHkgPSBlLnlcbiAgICAgICAgSW5wdXRNYW5hZ2VyLm1vdXNlLnggPSBJbnB1dE1hbmFnZXIubW91c2UuZG93blggPSBJbnB1dE1hbmFnZXIudHJhbnNmb3JtTW91c2VYIHhcbiAgICAgICAgSW5wdXRNYW5hZ2VyLm1vdXNlLnkgPSBJbnB1dE1hbmFnZXIubW91c2UuZG93blkgPSBJbnB1dE1hbmFnZXIudHJhbnNmb3JtTW91c2VZIHlcbiAgICAgICAgSW5wdXRNYW5hZ2VyLm1vdXNlLmRvd24gPSB0cnVlXG5cbiAgICBAbW91c2VVcDogKGUpIC0+XG4gICAgICAgIGlmIGUuY2hhbmdlZFRvdWNoZXNcbiAgICAgICAgICAgIHggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYXG4gICAgICAgICAgICB5ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB4ID0gZS54XG4gICAgICAgICAgICB5ID0gZS55XG4gICAgICAgIElucHV0TWFuYWdlci5tb3VzZS54ID0gSW5wdXRNYW5hZ2VyLnRyYW5zZm9ybU1vdXNlWCB4XG4gICAgICAgIElucHV0TWFuYWdlci5tb3VzZS55ID0gSW5wdXRNYW5hZ2VyLnRyYW5zZm9ybU1vdXNlWSB5XG4gICAgICAgIElucHV0TWFuYWdlci5tb3VzZS5kb3duID0gZmFsc2VcblxuICAgIEBtb3VzZU1vdmU6IChlKSAtPlxuICAgICAgICBpZiBlLmNoYW5nZWRUb3VjaGVzXG4gICAgICAgICAgICB4ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWFxuICAgICAgICAgICAgeSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgeCA9IGUueFxuICAgICAgICAgICAgeSA9IGUueVxuICAgICAgICBJbnB1dE1hbmFnZXIubW91c2UueCA9IHggPSBJbnB1dE1hbmFnZXIudHJhbnNmb3JtTW91c2VYIHhcbiAgICAgICAgSW5wdXRNYW5hZ2VyLm1vdXNlLnkgPSB5ID0gSW5wdXRNYW5hZ2VyLnRyYW5zZm9ybU1vdXNlWSB5XG5cbiMgICAgICAgIElucHV0TWFuYWdlci5tb3VzZS5kb3duID0gZmFsc2VcbiAgICAgICAgSW5wdXRNYW5hZ2VyLm9uTW91c2VNb3ZlPyB7eDp4LCB5Onl9XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgQGtleVVwOiAoZSkgLT5cbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM4IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS51cCA9IGZhbHNlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSA0MCB0aGVuIElucHV0TWFuYWdlci5rZXkuZG93biA9IGZhbHNlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzNyB0aGVuIElucHV0TWFuYWdlci5rZXkubGVmdCA9IGZhbHNlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzOSB0aGVuIElucHV0TWFuYWdlci5rZXkucmlnaHQgPSBmYWxzZVxuXG4gICAgICAgIElucHV0TWFuYWdlci5vbktleVVwPyBlXG5cbiAgICBAa2V5RG93bjogKGUpIC0+XG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzOCB0aGVuIElucHV0TWFuYWdlci5rZXkudXAgPSB0cnVlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSA0MCB0aGVuIElucHV0TWFuYWdlci5rZXkuZG93biA9IHRydWVcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM3IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS5sZWZ0ID0gdHJ1ZVxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzkgdGhlbiBJbnB1dE1hbmFnZXIua2V5LnJpZ2h0ID0gdHJ1ZVxuXG4gICAgICAgIElucHV0TWFuYWdlci5vbktleURvd24/IGVcblxuICAgIEBvbk1vdXNlQ2xpY2s6IChlKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuICAgIEBvbk1vdXNlTW92ZTogKGUpIC0+ICMgVXNlciBsZXZlbCBob29rXG4gICAgQG9uS2V5VXA6IChlKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuICAgIEBvbktleURvd246IChlKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuXG4gICAgQHRyYW5zZm9ybU1vdXNlWDogKHgpIC0+XG4gICAgICAgIGlmIElucHV0TWFuYWdlci5NT1VTRV9UUkFOU0ZPUk1fUkVDVCAmJiBJbnB1dE1hbmFnZXIuTU9VU0VfVFJBTlNGT1JNX1dJRFRIXG4gICAgICAgICAgICB4ID0gKHggLyBJbnB1dE1hbmFnZXIuTU9VU0VfVFJBTlNGT1JNX1JFQ1QucmlnaHQpICogSW5wdXRNYW5hZ2VyLk1PVVNFX1RSQU5TRk9STV9XSURUSFxuICAgICAgICBpZiBJbnB1dE1hbmFnZXIuTU9VU0VfT0ZGU0VUX1ggdGhlbiB4IC09IElucHV0TWFuYWdlci5NT1VTRV9PRkZTRVRfWFxuICAgICAgICByZXR1cm4geFxuXG4gICAgQHRyYW5zZm9ybU1vdXNlWTogKHkpIC0+XG4gICAgICAgIGlmIEBNT1VTRV9UUkFOU0ZPUk1fUkVDVCAmJiBATU9VU0VfVFJBTlNGT1JNX0hFSUdIVFxuICAgICAgICAgICAgeSA9ICh5IC8gQE1PVVNFX1RSQU5TRk9STV9SRUNULmJvdHRvbSkgKiBATU9VU0VfVFJBTlNGT1JNX0hFSUdIVFxuICAgICAgICBpZiBJbnB1dE1hbmFnZXIuTU9VU0VfT0ZGU0VUX1kgdGhlbiB5IC09IElucHV0TWFuYWdlci5NT1VTRV9PRkZTRVRfWVxuICAgICAgICByZXR1cm4geVxuXG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRNYW5hZ2VyXG4iLCJjbGFzcyBTY2VuZU1hbmFnZXJcbiAgICBAY3VycmVudFNjZW5lOiBcImJvb3RcIlxuICAgIEBzY2VuZXM6IHt9XG5cbiAgICBAYWRkOiAobmFtZSwgc2NlbmUpIC0+XG4gICAgICAgIFNjZW5lTWFuYWdlci5zY2VuZXNbbmFtZV0gPSBzY2VuZVxuICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgQGN1cnJlbnQ6IC0+IFNjZW5lTWFuYWdlci5zY2VuZXNbU2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZV1cblxuICAgIEBhY3RpdmF0ZTogKG5hbWUsIGFyZ3MuLi4pIC0+XG4gICAgICAgIG9sZCA9IFNjZW5lTWFuYWdlci5jdXJyZW50KClcbiAgICAgICAgb2xkLmRlYWN0aXZhdGUoKSBpZiBvbGRcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmN1cnJlbnRTY2VuZSA9IG5hbWVcbiAgICAgICAgU2NlbmVNYW5hZ2VyLm9uQWN0aXZhdGUgbmFtZVxuICAgICAgICBTY2VuZU1hbmFnZXIuY3VycmVudCgpPy5hY3RpdmF0ZS5hcHBseSBTY2VuZU1hbmFnZXIuY3VycmVudCgpLCBhcmdzXG4gICAgICAgIHJldHVybiBudWxsXG5cbiAgICBAb25BY3RpdmF0ZTogKG5hbWUpIC0+ICMgVXNlciBsZXZlbCBob29rXG5cblxubW9kdWxlLmV4cG9ydHMgPSBTY2VuZU1hbmFnZXIiLCJVdGlsID0gcmVxdWlyZSBcIi4vVXRpbC5jb2ZmZWVcIlxuXG5jbGFzcyBNYXBcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQHdpZHRoID0gMFxuICAgICAgICBAaGVpZ2h0ID0gMFxuICAgICAgICBAdGlsZVdpZHRoID0gMFxuICAgICAgICBAdGlsZUhlaWdodCA9IDBcbiAgICAgICAgQGxheWVycyA9IFtdXG4gICAgICAgIEB0aWxlU2V0cyA9IFtdXG5cblxuICAgIGxvYWRNYXA6IChtYXBGaWxlKSAtPlxuICAgICAgICBtYXAgPSBVdGlsLmxvYWRKU09OIG1hcEZpbGVcbiAgICAgICAgbWFwLnRoZW4gQHBhcnNlTWFwLmJpbmQgQFxuXG5cbiAgICBwYXJzZU1hcDogKG1hcERhdGEpIC0+XG4gICAgICAgIEB3aWR0aCA9IG1hcERhdGEud2lkdGhcbiAgICAgICAgQGhlaWdodCA9IG1hcERhdGEuaGVpZ2h0XG4gICAgICAgIEB0aWxlV2lkdGggPSBtYXBEYXRhLnRpbGV3aWR0aFxuICAgICAgICBAdGlsZUhlaWdodCA9IG1hcERhdGEudGlsZWhlaWdodFxuXG4gICAgICAgIEBwYXJzZUxheWVyIGxheWVyIGZvciBsYXllciBpbiBtYXBEYXRhLmxheWVyc1xuICAgICAgICBAcGFyc2VUaWxlU2V0IHRpbGVTZXQgZm9yIHRpbGVTZXQgaW4gbWFwRGF0YS50aWxlc2V0c1xuXG4gICAgICAgICMgTG9hZCB0aGUgaW1hZ2UgYXNzZXRzXG4gICAgICAgIGxvYWRQcm9taXNlcyA9IFtdXG4gICAgICAgIGZvciB0aWxlU2V0IGluIEB0aWxlU2V0c1xuICAgICAgICAgICAgcHJvbWlzZSA9IG5ldyBQcm9taXNlIChyZXNvbHZlLCByZWplY3QpIC0+XG4gICAgICAgICAgICAgICAgdGlsZVNldC5pbWcgPSBuZXcgSW1hZ2UoKVxuICAgICAgICAgICAgICAgICMgVE9ETzogTm90ZSB0aGUgcGF0aCBpcyBoYXJkIGNvZGVkIGFuZCBzaG91bGQgcHJvYmFibHkgYmUgYmFzZWQgb24gdGhlIGxvY2F0aW9uIG9mIHRoZSBtYXBcbiAgICAgICAgICAgICAgICB0aWxlU2V0LmltZy5zcmMgPSBcImFzc2V0cy9tYXAvXCIgKyB0aWxlU2V0LnNyY1xuICAgICAgICAgICAgICAgIHRpbGVTZXQuaW1nLm9ubG9hZCA9IC0+IHJlc29sdmUoKVxuICAgICAgICAgICAgICAgIHRpbGVTZXQuaW1nLm9uZXJyb3IgPSAtPiByZWplY3QoKVxuICAgICAgICAgICAgbG9hZFByb21pc2VzLnB1c2ggcHJvbWlzZVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbCBsb2FkUHJvbWlzZXNcblxuXG4gICAgcGFyc2VMYXllcjogKGxheWVyRGF0YSkgLT5cbiAgICAgICAgIyBDdXJyZW50bHkgb25seSBkZWFsIHdpdGggdGlsZSBsYXllcnNcbiAgICAgICAgaWYgbGF5ZXJEYXRhLnR5cGUgIT0gXCJ0aWxlbGF5ZXJcIiB0aGVuIHJldHVyblxuXG4gICAgICAgIGxheWVyID1cbiAgICAgICAgICAgIG5hbWU6IGxheWVyRGF0YS5uYW1lXG4gICAgICAgICAgICBkYXRhOiBbXVxuXG4gICAgICAgICMgQ29weSB0aGUgdGlsZSBudW1iZXIgdG8gdGhlIGxheWVyXG4gICAgICAgIGZvciB5IGluIFswLi5AaGVpZ2h0IC0gMV1cbiAgICAgICAgICAgIGxheWVyLmRhdGFbeV0gPSBbXVxuICAgICAgICAgICAgZm9yIHggaW4gWzAuLkB3aWR0aCAtIDFdXG4gICAgICAgICAgICAgICAgbGF5ZXIuZGF0YVt5XVt4XSA9IGxheWVyRGF0YS5kYXRhWyh5ICogQHdpZHRoKSArIHhdXG5cbiAgICAgICAgQGxheWVycy5wdXNoIGxheWVyXG5cblxuICAgIHBhcnNlVGlsZVNldDogKHRpbGVTZXREYXRhKSAtPlxuICAgICAgICB0aWxlU2V0ID1cbiAgICAgICAgICAgIGltYWdlV2lkdGg6IHRpbGVTZXREYXRhLmltYWdld2lkdGhcbiAgICAgICAgICAgIGltYWdlSGVpZ2h0OiB0aWxlU2V0RGF0YS5pbWFnZWhlaWdodFxuICAgICAgICAgICAgdGlsZVdpZHRoOiB0aWxlU2V0RGF0YS50aWxld2lkdGhcbiAgICAgICAgICAgIHRpbGVIZWlnaHQ6IHRpbGVTZXREYXRhLnRpbGVoZWlnaHRcbiAgICAgICAgICAgIGZpcnN0R2lkOiB0aWxlU2V0RGF0YS5maXJzdGdpZFxuICAgICAgICAgICAgc3JjOiB0aWxlU2V0RGF0YS5pbWFnZVxuXG4gICAgICAgIHRpbGVTZXQubGFzdEdpZCA9IHRpbGVTZXQuZmlyc3RHaWQgK1xuICAgICAgICAgICAgKCh0aWxlU2V0LmltYWdlV2lkdGggKiB0aWxlU2V0LmltYWdlSGVpZ2h0KSAvICh0aWxlU2V0LnRpbGVXaWR0aCAqIHRpbGVTZXQudGlsZUhlaWdodCkpXG5cbiAgICAgICAgdGlsZVNldC5udW1YVGlsZXMgPSBNYXRoLmZsb29yIHRpbGVTZXQuaW1hZ2VXaWR0aCAvIHRpbGVTZXQudGlsZVdpZHRoXG4gICAgICAgIHRpbGVTZXQubnVtWVRpbGVzID0gTWF0aC5mbG9vciB0aWxlU2V0LmltYWdlSGVpZ2h0IC8gdGlsZVNldC50aWxlSGVpZ2h0XG5cbiAgICAgICAgQHRpbGVTZXRzLnB1c2ggdGlsZVNldFxuXG5cbiAgICBkcmF3VGlsZTogKGN0eCwgeCwgeSwgdHcsIHRoLCB0aWxlTnVtYmVyLCB0aWxlU2V0LCBvZmZzZXRYID0gMCwgb2Zmc2V0WSA9IDApIC0+XG4gICAgICAgICMgRmluZCB0aGUgc3JjWCAmIHNyY1kgaW4gdGhlIGltYWdlIC0gcmV2ZXJzZSAoeCAqIHkpICsgeCA9IG5cbiAgICAgICAgc3JjWCA9IE1hdGguZmxvb3IodGlsZU51bWJlciAlIHRpbGVTZXQubnVtWFRpbGVzKSAqIHRpbGVTZXQudGlsZVdpZHRoXG4gICAgICAgIHNyY1kgPSBNYXRoLmZsb29yKHRpbGVOdW1iZXIgLyB0aWxlU2V0Lm51bVhUaWxlcykgKiB0aWxlU2V0LnRpbGVIZWlnaHRcblxuICAgICAgICBjdHguZHJhd0ltYWdlIHRpbGVTZXQuaW1nLFxuICAgICAgICAgICAgc3JjWCwgc3JjWSxcbiAgICAgICAgICAgIHRpbGVTZXQudGlsZVdpZHRoLCB0aWxlU2V0LnRpbGVIZWlnaHQsXG4gICAgICAgICAgICAoeCAqIHRpbGVTZXQudGlsZVdpZHRoKSArIG9mZnNldFgsICh5ICogdGlsZVNldC50aWxlSGVpZ2h0KSArIG9mZnNldFksXG4gICAgICAgICAgICB0aWxlU2V0LnRpbGVXaWR0aCwgdGlsZVNldC50aWxlSGVpZ2h0XG5cblxuICAgIGRyYXdUaWxlRnJvbU51bWJlcjogKGN0eCwgeCwgeSwgdHcsIHRoLCB0aWxlTnVtYmVyLCBvZmZzZXRYID0gMCwgb2Zmc2V0WSA9IDApIC0+XG4gICAgICAgICMgRmluZCBvdXQgd2hhdCB0aWxlIHNldCB3ZSBhcmUgaW5cbiAgICAgICAgdGlsZVNldCA9IEBnZXRUaWxlU2V0T2ZUaWxlIHRpbGVOdW1iZXJcblxuICAgICAgICBpZiB0aWxlU2V0XG4gICAgICAgICAgICB0aWxlTnVtYmVyID0gdGlsZU51bWJlciAtIHRpbGVTZXQuZmlyc3RHaWRcbiAgICAgICAgICAgIEBkcmF3VGlsZSBjdHgsIHgsIHksIEB0aWxlV2lkdGgsIEB0aWxlSGVpZ2h0LCB0aWxlTnVtYmVyLCB0aWxlU2V0LCBvZmZzZXRYLCBvZmZzZXRZXG5cblxuICAgIGdldFRpbGVTZXRPZlRpbGU6ICh0aWxlTnVtYmVyKSAtPlxuICAgICAgICBmb3Igc2V0IGluIEB0aWxlU2V0c1xuICAgICAgICAgICAgaWYgKHRpbGVOdW1iZXIgPj0gc2V0LmZpcnN0R2lkKSAmJiAodGlsZU51bWJlciA8PSBzZXQubGFzdEdpZClcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0XG4gICAgICAgIHJldHVybiBmYWxzZVxuXG5cbiAgICBkcmF3TWFwOiAoY3R4KSAtPlxuICAgICAgICBmb3IgbGF5ZXIgaW4gWzAuLkBsYXllcnMubGVuZ3RoIC0gMV1cbiAgICAgICAgICAgIGZvciB5IGluIFswLi5AaGVpZ2h0IC0gMV1cbiAgICAgICAgICAgICAgICBmb3IgeCBpbiBbMC4uQHdpZHRoIC0gMV1cbiAgICAgICAgICAgICAgICAgICAgQGRyYXdUaWxlRnJvbU51bWJlciBjdHgsIHgsIHksIEB0aWxlV2lkdGgsIEB0aWxlSGVpZ2h0LCBAbGF5ZXJzW2xheWVyXS5kYXRhW3ldW3hdXG5cblxuICAgIGRyYXdNYXBSZWN0OiAoY3R4LCB4LCB5LCB3LCBoKSAtPlxuICAgICAgICAjIE9ubHkgZHJhd3MgYSByZWdpb24gb2YgdGhlIG1hcCwgZnJvbSBwaXhlbCB4LHkgb2YgcGl4ZWwgc2l6ZSB3LGhcbiAgICAgICAgbGVmdFRpbGUgPSBNYXRoLmZsb29yIHggLyBAdGlsZVdpZHRoXG4gICAgICAgIHJpZ2h0VGlsZSA9IE1hdGguY2VpbCAoeCArIHcpIC8gQHRpbGVXaWR0aFxuICAgICAgICB0b3BUaWxlID0gTWF0aC5mbG9vciB5IC8gQHRpbGVIZWlnaHRcbiAgICAgICAgYm90dG9tVGlsZSA9IE1hdGguY2VpbCAoeSArIGgpIC8gQHRpbGVIZWlnaHRcblxuICAgICAgICBpZiBsZWZ0VGlsZSA8IDAgdGhlbiBsZWZ0VGlsZSA9IDBcbiAgICAgICAgaWYgdG9wVGlsZSA8IDAgdGhlbiB0b3BUaWxlID0gMFxuICAgICAgICBpZiByaWdodFRpbGUgPj0gQHdpZHRoIHRoZW4gcmlnaHRUaWxlID0gQHdpZHRoIC0gMVxuICAgICAgICBpZiBib3R0b21UaWxlID49IEBoZWlnaHQgdGhlbiBib3R0b21UaWxlID0gQGhlaWdodCAtIDFcblxuICAgICAgICB4T2Zmc2V0ID0gMCAtIHhcbiAgICAgICAgeU9mZnNldCA9IDAgLSB5XG5cbiAgICAgICAgZm9yIGxheWVyIGluIFswLi5AbGF5ZXJzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICBmb3IgeSBpbiBbdG9wVGlsZS4uYm90dG9tVGlsZV1cbiAgICAgICAgICAgICAgICBmb3IgeCBpbiBbbGVmdFRpbGUuLnJpZ2h0VGlsZV1cbiAgICAgICAgICAgICAgICAgICAgQGRyYXdUaWxlRnJvbU51bWJlciBjdHgsIHgsIHksIEB0aWxlV2lkdGgsIEB0aWxlSGVpZ2h0LCBAbGF5ZXJzW2xheWVyXS5kYXRhW3ldW3hdLCB4T2Zmc2V0LCB5T2Zmc2V0XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYXAiLCJjbGFzcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAc3lzdGVtcyA9IFtdXG5cbiAgICBhZGRTeXN0ZW06IChzeXN0ZW0pIC0+XG4gICAgICAgIEBzeXN0ZW1zLnB1c2ggc3lzdGVtXG4gICAgICAgIHJldHVybiBzeXN0ZW1cblxuICAgIGluaXQ6IC0+XG4gICAgYWN0aXZhdGU6IC0+XG4gICAgZGVhY3RpdmF0ZTogLT5cblxubW9kdWxlLmV4cG9ydHMgPSBTY2VuZSIsImNsYXNzIFN5c3RlbVxuICAgIFRIUk9UVExFX1ZBTFVFOiAwXG5cbiAgICBjb25zdHJ1Y3RvcjogLT4gQHRpbWVTaW5jZVVwZGF0ZSA9IDBcblxuICAgIGluaXQ6IC0+XG5cbiAgICB1cGRhdGU6IChkdCkgLT5cbiAgICAgICAgQHRpbWVTaW5jZVVwZGF0ZSArPSBkdFxuXG4gICAgICAgIGlmIEB0aW1lU2luY2VVcGRhdGUgPj0gQFRIUk9UVExFX1ZBTFVFXG4gICAgICAgICAgICBAb25VcGRhdGUgQHRpbWVTaW5jZVVwZGF0ZVxuICAgICAgICAgICAgQHRpbWVTaW5jZVVwZGF0ZSA9IDBcblxuICAgICAgICByZXR1cm4gQHRpbWVTaW5jZVVwZGF0ZVxuXG4gICAgb25VcGRhdGU6IChkdCkgLT5cblxubW9kdWxlLmV4cG9ydHMgPSBTeXN0ZW0iLCJTeXN0ZW0gPSByZXF1aXJlIFwiLi4vU3lzdGVtLmNvZmZlZVwiXG5FbnRpdHlNYW5hZ2VyID0gcmVxdWlyZSBcIi4uL01hbmFnZXIvRW50aXR5TWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5cbmNsYXNzIEdyYXBoaWNzU3lzdGVtIGV4dGVuZHMgU3lzdGVtXG4gICAgVEhST1RUTEVfVkFMVUU6IDE2XG5cbiAgICBpbml0OiAoQHJlbmRlcmVyKSAtPlxuICAgICAgICBAdmlld3BvcnRYID0gMFxuICAgICAgICBAdmlld3BvcnRZID0gMFxuXG4jICAgICAgICBAYnVmZmVyID0gR3JhcGhpY3NNYW5hZ2VyLmNyZWF0ZVJlbmRlcmVyIEB3aWR0aCwgQGhlaWdodFxuXG4gICAgb25CZWZvcmVEcmF3OiAoY3R4LCBkdCkgLT5cbiAgICBvbkFmdGVyRHJhdzogKGN0eCwgZHQpIC0+XG5cbiAgICBvblVwZGF0ZTogKGR0KSAtPlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmNsZWFyUmVjdCAwLCAwLCBAcmVuZGVyZXIuY2FudmFzLndpZHRoLCBAcmVuZGVyZXIuY2FudmFzLmhlaWdodFxuICAgICAgICBAb25CZWZvcmVEcmF3IEByZW5kZXJlci5jdHgsIGR0XG5cbiAgICAgICAgQGRyYXdSZWN0cygpXG4gICAgICAgIEBkcmF3SW1hZ2VzKClcbiAgICAgICAgQGRyYXdUZXh0cygpXG5cbiAgICAgICAgQG9uQWZ0ZXJEcmF3IEByZW5kZXJlci5jdHgsIGR0XG4jICAgICAgICBAb25BZnRlckRyYXcgQGJ1ZmZlci5jdHgsIGR0XG5cbiAgICAgICAgIyBEcmF3IGNvcHkgdGhlIGJ1ZmZlciB0byBtYWluIHJlbmRlcmVyXG4jICAgICAgICBAcmVuZGVyZXIuY3R4LmNsZWFyUmVjdCAwLCAwLCBAd2lkdGgsIEBoZWlnaHRcbiMgICAgICAgIEByZW5kZXJlci5jdHguZHJhd0ltYWdlIEBidWZmZXIuY2FudmFzLCAwLCAwXG4jICAgICAgICBAYnVmZmVyLmN0eC5jbGVhclJlY3QgMCwgMCwgQHdpZHRoLCBAaGVpZ2h0XG5cbiAgICBkcmF3UmVjdHM6IC0+XG4gICAgICAgIHJlY3RFbnRpdGllcyA9IEVudGl0eU1hbmFnZXIuZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJSZW5kZXJhYmxlUmVjdFwiLCBcIlBvc2l0aW9uXCJdXG4gICAgICAgIGZvciBlbnRpdHkgaW4gcmVjdEVudGl0aWVzXG4gICAgICAgICAgICByZWN0ID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlJlbmRlcmFibGVSZWN0XCJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlBvc2l0aW9uXCJcbiAgICAgICAgICAgIEBidWZmZXIuY3R4LmZpbGxTdHlsZSA9IHJlY3QuY29sb3VyXG4gICAgICAgICAgICBAYnVmZmVyLmN0eC5maWxsUmVjdCBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCByZWN0LndpZHRoLCByZWN0LmhlaWdodFxuXG4gICAgZHJhd0ltYWdlczogLT5cbiAgICAgICAgaW1hZ2VFbnRpdGllcyA9IEVudGl0eU1hbmFnZXIuZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJSZW5kZXJhYmxlSW1hZ2VcIiwgXCJQb3NpdGlvblwiXVxuICAgICAgICBmb3IgZW50aXR5IGluIGltYWdlRW50aXRpZXNcbiAgICAgICAgICAgIGltYWdlID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlJlbmRlcmFibGVJbWFnZVwiXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJQb3NpdGlvblwiXG4gICAgICAgICAgICAjIFRPRE86IEdldCB0aGUgYWN0dWFsIGltYWdlP1xuICAgICAgICAgICAgQGJ1ZmZlci5jdHguZHJhd0ltYWdlIGltYWdlLCBwb3NpdGlvbi54LCBwb3NpdGlvbi55XG5cbiAgICBkcmF3VGV4dHM6IC0+XG4gICAgICAgIHRleHRFbnRpdGllcyA9IEVudGl0eU1hbmFnZXIuZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJSZW5kZXJhYmxlVGV4dFwiLCBcIlBvc2l0aW9uXCJdXG4gICAgICAgIGZvciBlbnRpdHkgaW4gdGV4dEVudGl0aWVzXG4gICAgICAgICAgICB0ZXh0ID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlJlbmRlcmFibGVUZXh0XCJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlBvc2l0aW9uXCJcbiAgICAgICAgICAgIEBidWZmZXIuY3R4LmZpbGxTdHlsZSA9IHRleHQuY29sb3VyXG4gICAgICAgICAgICBAYnVmZmVyLmN0eC5mb250ID0gdGV4dC5mb250XG4gICAgICAgICAgICBAYnVmZmVyLmN0eC5maWxsVGV4dCB0ZXh0LnRleHQsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnlcblxuICAgICMjI1xuICAgIGluaXQ6IC0+XG4gICAgICAgIEBtZXRlciA9IG5ldyBGUFNNZXRlcih7IGdyYXBoOiAxfSlcblxuICAgIG9uVXBkYXRlOiAoZHQpIC0+XG4gICAgICAgIEBtZXRlci50aWNrU3RhcnQoKVxuXG4gICAgICAgIGlmIEBlbnRpdHlTeXN0ZW1cbiAgICAgICAgICAgIGVudGl0aWVzID0gQGVudGl0eVN5c3RlbS5nZXRBbGxFbnRpdGllc1dpdGhDb21wb25lbnRPZlR5cGVzIFtcIlJlbmRlcmFibGVcIiwgXCJQb3NpdGlvblwiXVxuXG4gICAgICAgICAgICBfLmVhY2ggZW50aXRpZXMsIChlbnRpdHkpID0+XG4gICAgICAgICAgICAgICAgcmVuZGVyYWJsZSA9IEBlbnRpdHlTeXN0ZW0uZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJSZW5kZXJhYmxlXCJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IEBlbnRpdHlTeXN0ZW0uZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJQb3NpdGlvblwiXG5cbiAgICAgICAgICAgICAgICBAYnVmZmVyQ3R4LmZpbGxTdHlsZSA9IHJlbmRlcmFibGUuY29sb3VyXG4gICAgICAgICAgICAgICAgQGJ1ZmZlckN0eC5maWxsUmVjdCBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCAyMCwgMjBcblxuICAgICAgICBAY3R4LmNsZWFyUmVjdCAwLCAwLCBAV0lEVEgsIEBIRUlHSFRcbiAgICAgICAgQGN0eC5kcmF3SW1hZ2UgQGJ1ZmZlckNhbnZhcywgMCwgMFxuICAgICAgICBAYnVmZmVyQ3R4LmNsZWFyUmVjdCAwLCAwLCBAV0lEVEgsIEBIRUlHSFRcblxuICAgICAgICBAbWV0ZXIudGljaygpXG5cbiAgICAjIyNcblxubW9kdWxlLmV4cG9ydHMgPSBHcmFwaGljc1N5c3RlbSIsImNsYXNzIFV0aWxcbiAgICBAbG9hZEpTT046ICh1cmwpIC0+IFV0aWwubG9hZCh1cmwpLnRoZW4oSlNPTi5wYXJzZSlcblxuICAgIEBsb2FkOiAodXJsKSAtPlxuICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgLT5cbiAgICAgICAgICAgIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgICAgICAjeGhyLnJlc3BvbnNlVHlwZSA9IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB4aHIub3BlbiBcIkdFVFwiLCB1cmwsIHRydWVcbiAgICAgICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyIFwicmVhZHlzdGF0ZWNoYW5nZVwiLCAtPlxuICAgICAgICAgICAgICAgIGlmIHhoci5yZWFkeVN0YXRlIGlzIDRcbiAgICAgICAgICAgICAgICAgICAgaWYgeGhyLnN0YXR1cyBpbiBbMjAwLCAzMDRdXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlIHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0IFwiZXJyb3JcIlxuICAgICAgICAgICAgeGhyLnNlbmQoKVxuICAgICAgICByZXR1cm4gcHJvbWlzZVxuXG5cbiAgICBAbG9hZEltYWdlOiAoc3JjKSAtPlxuICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UgKHJlc29sdmUsIHJlamVjdCkgLT5cbiAgICAgICAgICAgIGltYWdlID0gbmV3IEltYWdlKClcbiAgICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIgXCJsb2FkXCIsIC0+IHJlc29sdmUgQFxuICAgICAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lciBcImVycm9yXCIsIC0+IHJlamVjdCBcImVycm9yXCJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHNyY1xuICAgICAgICAgICAgaWYgaW1hZ2UuY29tcGxldGUgdGhlbiByZXNvbHZlIGltYWdlXG4gICAgICAgIHJldHVybiBwcm9taXNlXG5cblxuICAgIEBwbHVyYWxpc2U6ICh3b3JkKSAtPlxuICAgICAgICBsZW4gPSB3b3JkLmxlbmd0aFxuXG4gICAgICAgIGwxID0gd29yZC5zdWJzdHIgLTFcbiAgICAgICAgbDIgPSB3b3JkLnN1YnN0ciAtMlxuXG4gICAgICAgIGlmIGwxID09IFwieVwiXG4gICAgICAgICAgICB3b3JkID0gd29yZC5zdWJzdHIoMCwgbGVuIC0gMSkgKyBcImllc1wiXG4gICAgICAgIGVsc2UgaWYgbDEgPT0gXCJzXCIgfHwgbDEgPT0gXCJ4XCIgfHwgbDIgPT0gXCJjaFwiIHx8IGwyID09IFwic2hcIiB8fCBsMiA9PSBcImVzXCJcbiAgICAgICAgICAgICMgSWYgd29yZCBlbmRzIGluIFwic1wiIFwieFwiIG9yIFwiY2hcIiBvciBcInNoXCIgYWRkIFwiZXNcIlxuICAgICAgICAgICAgd29yZCA9IHdvcmQgKyBcImVzXCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgd29yZCA9IHdvcmQgKyBcInNcIlxuXG4gICAgICAgIHJldHVybiB3b3JkXG5cblxuICAgIEBpc1BvaW50SW5SZWN0OiAoeCwgeSwgcngsIHJ5LCBydywgcmgpIC0+XG4gICAgICAgIHJldHVybiB4ID49IHJ4ICYmIHggPD0gcnggKyBydyAmJiB5ID49IHJ5ICYmIHkgPD0gcnkgKyByaFxuXG5tb2R1bGUuZXhwb3J0cyA9IFV0aWwiLCIoZnVuY3Rpb24gKEJ1ZmZlcil7XG4vLyAgICAgdXVpZC5qc1xuLy9cbi8vICAgICBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxMiBSb2JlcnQgS2llZmZlclxuLy8gICAgIE1JVCBMaWNlbnNlIC0gaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBfZ2xvYmFsID0gdGhpcztcblxuICAvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgV2UgZmVhdHVyZVxuICAvLyBkZXRlY3QgdG8gZGV0ZXJtaW5lIHRoZSBiZXN0IFJORyBzb3VyY2UsIG5vcm1hbGl6aW5nIHRvIGEgZnVuY3Rpb24gdGhhdFxuICAvLyByZXR1cm5zIDEyOC1iaXRzIG9mIHJhbmRvbW5lc3MsIHNpbmNlIHRoYXQncyB3aGF0J3MgdXN1YWxseSByZXF1aXJlZFxuICB2YXIgX3JuZztcblxuICAvLyBOb2RlLmpzIGNyeXB0by1iYXNlZCBSTkcgLSBodHRwOi8vbm9kZWpzLm9yZy9kb2NzL3YwLjYuMi9hcGkvY3J5cHRvLmh0bWxcbiAgLy9cbiAgLy8gTW9kZXJhdGVseSBmYXN0LCBoaWdoIHF1YWxpdHlcbiAgaWYgKHR5cGVvZihyZXF1aXJlKSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBfcmIgPSByZXF1aXJlKCdjcnlwdG8nKS5yYW5kb21CeXRlcztcbiAgICAgIF9ybmcgPSBfcmIgJiYgZnVuY3Rpb24oKSB7cmV0dXJuIF9yYigxNik7fTtcbiAgICB9IGNhdGNoKGUpIHt9XG4gIH1cblxuICBpZiAoIV9ybmcgJiYgX2dsb2JhbC5jcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIFdIQVRXRyBjcnlwdG8tYmFzZWQgUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICAgIC8vXG4gICAgLy8gTW9kZXJhdGVseSBmYXN0LCBoaWdoIHF1YWxpdHlcbiAgICB2YXIgX3JuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICAgIF9ybmcgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKF9ybmRzOCk7XG4gICAgICByZXR1cm4gX3JuZHM4O1xuICAgIH07XG4gIH1cblxuICBpZiAoIV9ybmcpIHtcbiAgICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gICAgLy9cbiAgICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAgIC8vIHF1YWxpdHkuXG4gICAgdmFyICBfcm5kcyA9IG5ldyBBcnJheSgxNik7XG4gICAgX3JuZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgICBfcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9ybmRzO1xuICAgIH07XG4gIH1cblxuICAvLyBCdWZmZXIgY2xhc3MgdG8gdXNlXG4gIHZhciBCdWZmZXJDbGFzcyA9IHR5cGVvZihCdWZmZXIpID09ICdmdW5jdGlvbicgPyBCdWZmZXIgOiBBcnJheTtcblxuICAvLyBNYXBzIGZvciBudW1iZXIgPC0+IGhleCBzdHJpbmcgY29udmVyc2lvblxuICB2YXIgX2J5dGVUb0hleCA9IFtdO1xuICB2YXIgX2hleFRvQnl0ZSA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgX2J5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG4gICAgX2hleFRvQnl0ZVtfYnl0ZVRvSGV4W2ldXSA9IGk7XG4gIH1cblxuICAvLyAqKmBwYXJzZSgpYCAtIFBhcnNlIGEgVVVJRCBpbnRvIGl0J3MgY29tcG9uZW50IGJ5dGVzKipcbiAgZnVuY3Rpb24gcGFyc2UocywgYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgaSA9IChidWYgJiYgb2Zmc2V0KSB8fCAwLCBpaSA9IDA7XG5cbiAgICBidWYgPSBidWYgfHwgW107XG4gICAgcy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1swLTlhLWZdezJ9L2csIGZ1bmN0aW9uKG9jdCkge1xuICAgICAgaWYgKGlpIDwgMTYpIHsgLy8gRG9uJ3Qgb3ZlcmZsb3chXG4gICAgICAgIGJ1ZltpICsgaWkrK10gPSBfaGV4VG9CeXRlW29jdF07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBaZXJvIG91dCByZW1haW5pbmcgYnl0ZXMgaWYgc3RyaW5nIHdhcyBzaG9ydFxuICAgIHdoaWxlIChpaSA8IDE2KSB7XG4gICAgICBidWZbaSArIGlpKytdID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgLy8gKipgdW5wYXJzZSgpYCAtIENvbnZlcnQgVVVJRCBieXRlIGFycmF5IChhbGEgcGFyc2UoKSkgaW50byBhIHN0cmluZyoqXG4gIGZ1bmN0aW9uIHVucGFyc2UoYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgaSA9IG9mZnNldCB8fCAwLCBidGggPSBfYnl0ZVRvSGV4O1xuICAgIHJldHVybiAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XG4gIH1cblxuICAvLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4gIC8vXG4gIC8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4gIC8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbiAgLy8gcmFuZG9tICMncyB3ZSBuZWVkIHRvIGluaXQgbm9kZSBhbmQgY2xvY2tzZXFcbiAgdmFyIF9zZWVkQnl0ZXMgPSBfcm5nKCk7XG5cbiAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gIHZhciBfbm9kZUlkID0gW1xuICAgIF9zZWVkQnl0ZXNbMF0gfCAweDAxLFxuICAgIF9zZWVkQnl0ZXNbMV0sIF9zZWVkQnl0ZXNbMl0sIF9zZWVkQnl0ZXNbM10sIF9zZWVkQnl0ZXNbNF0sIF9zZWVkQnl0ZXNbNV1cbiAgXTtcblxuICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICB2YXIgX2Nsb2Nrc2VxID0gKF9zZWVkQnl0ZXNbNl0gPDwgOCB8IF9zZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuXG4gIC8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxuICB2YXIgX2xhc3RNU2VjcyA9IDAsIF9sYXN0TlNlY3MgPSAwO1xuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbiAgZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPSBudWxsID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAgIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gICAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICAgIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT0gbnVsbCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICAgIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT0gbnVsbCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAgIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gICAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICAgIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgICB9XG5cbiAgICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAgIC8vIHRpbWUgaW50ZXJ2YWxcbiAgICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT0gbnVsbCkge1xuICAgICAgbnNlY3MgPSAwO1xuICAgIH1cblxuICAgIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICAgIH1cblxuICAgIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gICAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAgIC8vIGB0aW1lX2xvd2BcbiAgICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gICAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICAgIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgICAvLyBgdGltZV9taWRgXG4gICAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICAgIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gICAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAgIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gICAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICAgIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gICAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gICAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gICAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gICAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gICAgLy8gYG5vZGVgXG4gICAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgICBmb3IgKHZhciBuID0gMDsgbiA8IDY7IG4rKykge1xuICAgICAgYltpICsgbl0gPSBub2RlW25dO1xuICAgIH1cblxuICAgIHJldHVybiBidWYgPyBidWYgOiB1bnBhcnNlKGIpO1xuICB9XG5cbiAgLy8gKipgdjQoKWAgLSBHZW5lcmF0ZSByYW5kb20gVVVJRCoqXG5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuICBmdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAgIC8vIERlcHJlY2F0ZWQgLSAnZm9ybWF0JyBhcmd1bWVudCwgYXMgc3VwcG9ydGVkIGluIHYxLjJcbiAgICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICAgIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICAgIGJ1ZiA9IG9wdGlvbnMgPT0gJ2JpbmFyeScgPyBuZXcgQnVmZmVyQ2xhc3MoMTYpIDogbnVsbDtcbiAgICAgIG9wdGlvbnMgPSBudWxsO1xuICAgIH1cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IF9ybmcpKCk7XG5cbiAgICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gICAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICAgIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAgIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICAgIGlmIChidWYpIHtcbiAgICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgaWkrKykge1xuICAgICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBidWYgfHwgdW5wYXJzZShybmRzKTtcbiAgfVxuXG4gIC8vIEV4cG9ydCBwdWJsaWMgQVBJXG4gIHZhciB1dWlkID0gdjQ7XG4gIHV1aWQudjEgPSB2MTtcbiAgdXVpZC52NCA9IHY0O1xuICB1dWlkLnBhcnNlID0gcGFyc2U7XG4gIHV1aWQudW5wYXJzZSA9IHVucGFyc2U7XG4gIHV1aWQuQnVmZmVyQ2xhc3MgPSBCdWZmZXJDbGFzcztcblxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gUHVibGlzaCBhcyBBTUQgbW9kdWxlXG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge3JldHVybiB1dWlkO30pO1xuICB9IGVsc2UgaWYgKHR5cGVvZihtb2R1bGUpICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgLy8gUHVibGlzaCBhcyBub2RlLmpzIG1vZHVsZVxuICAgIG1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiAgfSBlbHNlIHtcbiAgICAvLyBQdWJsaXNoIGFzIGdsb2JhbCAoaW4gYnJvd3NlcnMpXG4gICAgdmFyIF9wcmV2aW91c1Jvb3QgPSBfZ2xvYmFsLnV1aWQ7XG5cbiAgICAvLyAqKmBub0NvbmZsaWN0KClgIC0gKGJyb3dzZXIgb25seSkgdG8gcmVzZXQgZ2xvYmFsICd1dWlkJyB2YXIqKlxuICAgIHV1aWQubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgX2dsb2JhbC51dWlkID0gX3ByZXZpb3VzUm9vdDtcbiAgICAgIHJldHVybiB1dWlkO1xuICAgIH07XG5cbiAgICBfZ2xvYmFsLnV1aWQgPSB1dWlkO1xuICB9XG59KS5jYWxsKHRoaXMpO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIpIiwiLyoqXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBBdXRob3I6ICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIExpY2Vuc2U6ICBNSVRcbiAqXG4gKiBgbnBtIGluc3RhbGwgYnVmZmVyYFxuICovXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5fdXNlVHlwZWRBcnJheXNgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAoY29tcGF0aWJsZSBkb3duIHRvIElFNilcbiAqL1xuQnVmZmVyLl91c2VUeXBlZEFycmF5cyA9IChmdW5jdGlvbiAoKSB7XG4gIC8vIERldGVjdCBpZiBicm93c2VyIHN1cHBvcnRzIFR5cGVkIEFycmF5cy4gU3VwcG9ydGVkIGJyb3dzZXJzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssXG4gIC8vIENocm9tZSA3KywgU2FmYXJpIDUuMSssIE9wZXJhIDExLjYrLCBpT1MgNC4yKy4gSWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmdcbiAgLy8gcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLCB0aGVuIHRoYXQncyB0aGUgc2FtZSBhcyBubyBgVWludDhBcnJheWAgc3VwcG9ydFxuICAvLyBiZWNhdXNlIHdlIG5lZWQgdG8gYmUgYWJsZSB0byBhZGQgYWxsIHRoZSBub2RlIEJ1ZmZlciBBUEkgbWV0aG9kcy4gVGhpcyBpcyBhbiBpc3N1ZVxuICAvLyBpbiBGaXJlZm94IDQtMjkuIE5vdyBmaXhlZDogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4XG4gIHRyeSB7XG4gICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigwKVxuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheShidWYpXG4gICAgYXJyLmZvbyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH1cbiAgICByZXR1cm4gNDIgPT09IGFyci5mb28oKSAmJlxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nIC8vIENocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn0pKClcblxuLyoqXG4gKiBDbGFzczogQnVmZmVyXG4gKiA9PT09PT09PT09PT09XG4gKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBhcmUgYXVnbWVudGVkXG4gKiB3aXRoIGZ1bmN0aW9uIHByb3BlcnRpZXMgZm9yIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBBUEkgZnVuY3Rpb25zLiBXZSB1c2VcbiAqIGBVaW50OEFycmF5YCBzbyB0aGF0IHNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0IHJldHVybnNcbiAqIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIEJ5IGF1Z21lbnRpbmcgdGhlIGluc3RhbmNlcywgd2UgY2FuIGF2b2lkIG1vZGlmeWluZyB0aGUgYFVpbnQ4QXJyYXlgXG4gKiBwcm90b3R5cGUuXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlciAoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSlcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKVxuXG4gIHZhciB0eXBlID0gdHlwZW9mIHN1YmplY3RcblxuICAvLyBXb3JrYXJvdW5kOiBub2RlJ3MgYmFzZTY0IGltcGxlbWVudGF0aW9uIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBzdHJpbmdzXG4gIC8vIHdoaWxlIGJhc2U2NC1qcyBkb2VzIG5vdC5cbiAgaWYgKGVuY29kaW5nID09PSAnYmFzZTY0JyAmJiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHN1YmplY3QgPSBzdHJpbmd0cmltKHN1YmplY3QpXG4gICAgd2hpbGUgKHN1YmplY3QubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgICAgc3ViamVjdCA9IHN1YmplY3QgKyAnPSdcbiAgICB9XG4gIH1cblxuICAvLyBGaW5kIHRoZSBsZW5ndGhcbiAgdmFyIGxlbmd0aFxuICBpZiAodHlwZSA9PT0gJ251bWJlcicpXG4gICAgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QpXG4gIGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKVxuICAgIGxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKHN1YmplY3QsIGVuY29kaW5nKVxuICBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0JylcbiAgICBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdC5sZW5ndGgpIC8vIGFzc3VtZSB0aGF0IG9iamVjdCBpcyBhcnJheS1saWtlXG4gIGVsc2VcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG5lZWRzIHRvIGJlIGEgbnVtYmVyLCBhcnJheSBvciBzdHJpbmcuJylcblxuICB2YXIgYnVmXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgLy8gUHJlZmVycmVkOiBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIGJ1ZiA9IEJ1ZmZlci5fYXVnbWVudChuZXcgVWludDhBcnJheShsZW5ndGgpKVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gVEhJUyBpbnN0YW5jZSBvZiBCdWZmZXIgKGNyZWF0ZWQgYnkgYG5ld2ApXG4gICAgYnVmID0gdGhpc1xuICAgIGJ1Zi5sZW5ndGggPSBsZW5ndGhcbiAgICBidWYuX2lzQnVmZmVyID0gdHJ1ZVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgdHlwZW9mIHN1YmplY3QuYnl0ZUxlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAvLyBTcGVlZCBvcHRpbWl6YXRpb24gLS0gdXNlIHNldCBpZiB3ZSdyZSBjb3B5aW5nIGZyb20gYSB0eXBlZCBhcnJheVxuICAgIGJ1Zi5fc2V0KHN1YmplY3QpXG4gIH0gZWxzZSBpZiAoaXNBcnJheWlzaChzdWJqZWN0KSkge1xuICAgIC8vIFRyZWF0IGFycmF5LWlzaCBvYmplY3RzIGFzIGEgYnl0ZSBhcnJheVxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSlcbiAgICAgICAgYnVmW2ldID0gc3ViamVjdC5yZWFkVUludDgoaSlcbiAgICAgIGVsc2VcbiAgICAgICAgYnVmW2ldID0gc3ViamVjdFtpXVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgIGJ1Zi53cml0ZShzdWJqZWN0LCAwLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiAhQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiAhbm9aZXJvKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBidWZbaV0gPSAwXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG4vLyBTVEFUSUMgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIChiKSB7XG4gIHJldHVybiAhIShiICE9PSBudWxsICYmIGIgIT09IHVuZGVmaW5lZCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmJ5dGVMZW5ndGggPSBmdW5jdGlvbiAoc3RyLCBlbmNvZGluZykge1xuICB2YXIgcmV0XG4gIHN0ciA9IHN0ciArICcnXG4gIHN3aXRjaCAoZW5jb2RpbmcgfHwgJ3V0ZjgnKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggLyAyXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IHV0ZjhUb0J5dGVzKHN0cikubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBiYXNlNjRUb0J5dGVzKHN0cikubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoICogMlxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiAobGlzdCwgdG90YWxMZW5ndGgpIHtcbiAgYXNzZXJ0KGlzQXJyYXkobGlzdCksICdVc2FnZTogQnVmZmVyLmNvbmNhdChsaXN0LCBbdG90YWxMZW5ndGhdKVxcbicgK1xuICAgICAgJ2xpc3Qgc2hvdWxkIGJlIGFuIEFycmF5LicpXG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoMClcbiAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBsaXN0WzBdXG4gIH1cblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHRvdGFsTGVuZ3RoICE9PSAnbnVtYmVyJykge1xuICAgIHRvdGFsTGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0b3RhbExlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWYgPSBuZXcgQnVmZmVyKHRvdGFsTGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIGl0ZW0uY29weShidWYsIHBvcylcbiAgICBwb3MgKz0gaXRlbS5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cbi8vIEJVRkZFUiBJTlNUQU5DRSBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBfaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBhc3NlcnQoc3RyTGVuICUgMiA9PT0gMCwgJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhciBieXRlID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGFzc2VydCghaXNOYU4oYnl0ZSksICdJbnZhbGlkIGhleCBzdHJpbmcnKVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IGJ5dGVcbiAgfVxuICBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGkgKiAyXG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIF91dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfYmluYXJ5V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gX2FzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBfYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIFN1cHBvcnQgYm90aCAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpXG4gIC8vIGFuZCB0aGUgbGVnYWN5IChzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBpZiAoIWlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIH0gZWxzZSB7ICAvLyBsZWdhY3lcbiAgICB2YXIgc3dhcCA9IGVuY29kaW5nXG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBvZmZzZXQgPSBsZW5ndGhcbiAgICBsZW5ndGggPSBzd2FwXG4gIH1cblxuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKVxuXG4gIHZhciByZXRcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuXG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKVxuICBzdGFydCA9IE51bWJlcihzdGFydCkgfHwgMFxuICBlbmQgPSAoZW5kICE9PSB1bmRlZmluZWQpXG4gICAgPyBOdW1iZXIoZW5kKVxuICAgIDogZW5kID0gc2VsZi5sZW5ndGhcblxuICAvLyBGYXN0cGF0aCBlbXB0eSBzdHJpbmdzXG4gIGlmIChlbmQgPT09IHN0YXJ0KVxuICAgIHJldHVybiAnJ1xuXG4gIHZhciByZXRcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRfc3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXNcblxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAoIXRhcmdldF9zdGFydCkgdGFyZ2V0X3N0YXJ0ID0gMFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHNvdXJjZS5sZW5ndGggPT09IDApIHJldHVyblxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ3NvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0JylcbiAgYXNzZXJ0KHRhcmdldF9zdGFydCA+PSAwICYmIHRhcmdldF9zdGFydCA8IHRhcmdldC5sZW5ndGgsXG4gICAgICAndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChzdGFydCA+PSAwICYmIHN0YXJ0IDwgc291cmNlLmxlbmd0aCwgJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKVxuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0IDwgZW5kIC0gc3RhcnQpXG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCArIHN0YXJ0XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG5cbiAgaWYgKGxlbiA8IDEwMCB8fCAhQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICB0YXJnZXRbaSArIHRhcmdldF9zdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuX3NldCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksIHRhcmdldF9zdGFydClcbiAgfVxufVxuXG5mdW5jdGlvbiBfYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIF91dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmVzID0gJydcbiAgdmFyIHRtcCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIGlmIChidWZbaV0gPD0gMHg3Rikge1xuICAgICAgcmVzICs9IGRlY29kZVV0ZjhDaGFyKHRtcCkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgICAgIHRtcCA9ICcnXG4gICAgfSBlbHNlIHtcbiAgICAgIHRtcCArPSAnJScgKyBidWZbaV0udG9TdHJpbmcoMTYpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcyArIGRlY29kZVV0ZjhDaGFyKHRtcClcbn1cblxuZnVuY3Rpb24gX2FzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKVxuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBfYmluYXJ5U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICByZXR1cm4gX2FzY2lpU2xpY2UoYnVmLCBzdGFydCwgZW5kKVxufVxuXG5mdW5jdGlvbiBfaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpKzFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IGNsYW1wKHN0YXJ0LCBsZW4sIDApXG4gIGVuZCA9IGNsYW1wKGVuZCwgbGVuLCBsZW4pXG5cbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICByZXR1cm4gQnVmZmVyLl9hdWdtZW50KHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCkpXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICB2YXIgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkLCB0cnVlKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47IGkrKykge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICAgIHJldHVybiBuZXdCdWZcbiAgfVxufVxuXG4vLyBgZ2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuZ2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKVxuICByZXR1cm4gdGhpcy5yZWFkVUludDgob2Zmc2V0KVxufVxuXG4vLyBgc2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodiwgb2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuc2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKVxuICByZXR1cm4gdGhpcy53cml0ZVVJbnQ4KHYsIG9mZnNldClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuZnVuY3Rpb24gX3JlYWRVSW50MTYgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsXG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XVxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4XG4gIH0gZWxzZSB7XG4gICAgdmFsID0gYnVmW29mZnNldF0gPDwgOFxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXVxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkVUludDMyIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbFxuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pXG4gICAgICB2YWwgPSBidWZbb2Zmc2V0ICsgMl0gPDwgMTZcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgOFxuICAgIHZhbCB8PSBidWZbb2Zmc2V0XVxuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKVxuICAgICAgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXQgKyAzXSA8PCAyNCA+Pj4gMClcbiAgfSBlbHNlIHtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCA9IGJ1ZltvZmZzZXQgKyAxXSA8PCAxNlxuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAyXSA8PCA4XG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDNdXG4gICAgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXRdIDw8IDI0ID4+PiAwKVxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCxcbiAgICAgICAgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIHZhciBuZWcgPSB0aGlzW29mZnNldF0gJiAweDgwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5mdW5jdGlvbiBfcmVhZEludDE2IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDE2KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpXG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmZmZiAtIHZhbCArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRJbnQzMiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWwgPSBfcmVhZFVJbnQzMihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCB0cnVlKVxuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwMDAwMFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZmZmZmZmZiAtIHZhbCArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRGbG9hdCAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZERvdWJsZSAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmYpXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm5cblxuICB0aGlzW29mZnNldF0gPSB2YWx1ZVxufVxuXG5mdW5jdGlvbiBfd3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDIpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID1cbiAgICAgICAgKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgICAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmZmZmZilcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCA0KTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9XG4gICAgICAgICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZiwgLTB4ODApXG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIHRoaXMud3JpdGVVSW50OCh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydClcbiAgZWxzZVxuICAgIHRoaXMud3JpdGVVSW50OCgweGZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmYsIC0weDgwMDApXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICBfd3JpdGVVSW50MTYoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgX3dyaXRlVUludDE2KGJ1ZiwgMHhmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgX3dyaXRlVUludDMyKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbiAgZWxzZVxuICAgIF93cml0ZVVJbnQzMihidWYsIDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLFxuICAgICAgICAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGZpbGwodmFsdWUsIHN0YXJ0PTAsIGVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gKHZhbHVlLCBzdGFydCwgZW5kKSB7XG4gIGlmICghdmFsdWUpIHZhbHVlID0gMFxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQpIGVuZCA9IHRoaXMubGVuZ3RoXG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLmNoYXJDb2RlQXQoMClcbiAgfVxuXG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmICFpc05hTih2YWx1ZSksICd2YWx1ZSBpcyBub3QgYSBudW1iZXInKVxuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnZW5kIDwgc3RhcnQnKVxuXG4gIC8vIEZpbGwgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuXG4gIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCB0aGlzLmxlbmd0aCwgJ3N0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHRoaXMubGVuZ3RoLCAnZW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgdGhpc1tpXSA9IHZhbHVlXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgb3V0ID0gW11cbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBvdXRbaV0gPSB0b0hleCh0aGlzW2ldKVxuICAgIGlmIChpID09PSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTKSB7XG4gICAgICBvdXRbaSArIDFdID0gJy4uLidcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgb3V0LmpvaW4oJyAnKSArICc+J1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYEFycmF5QnVmZmVyYCB3aXRoIHRoZSAqY29waWVkKiBtZW1vcnkgb2YgdGhlIGJ1ZmZlciBpbnN0YW5jZS5cbiAqIEFkZGVkIGluIE5vZGUgMC4xMi4gT25seSBhdmFpbGFibGUgaW4gYnJvd3NlcnMgdGhhdCBzdXBwb3J0IEFycmF5QnVmZmVyLlxuICovXG5CdWZmZXIucHJvdG90eXBlLnRvQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgICAgcmV0dXJuIChuZXcgQnVmZmVyKHRoaXMpKS5idWZmZXJcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGJ1Zi5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSlcbiAgICAgICAgYnVmW2ldID0gdGhpc1tpXVxuICAgICAgcmV0dXJuIGJ1Zi5idWZmZXJcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCdWZmZXIudG9BcnJheUJ1ZmZlciBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpXG4gIH1cbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG52YXIgQlAgPSBCdWZmZXIucHJvdG90eXBlXG5cbi8qKlxuICogQXVnbWVudCBhIFVpbnQ4QXJyYXkgKmluc3RhbmNlKiAobm90IHRoZSBVaW50OEFycmF5IGNsYXNzISkgd2l0aCBCdWZmZXIgbWV0aG9kc1xuICovXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5faXNCdWZmZXIgPSB0cnVlXG5cbiAgLy8gc2F2ZSByZWZlcmVuY2UgdG8gb3JpZ2luYWwgVWludDhBcnJheSBnZXQvc2V0IG1ldGhvZHMgYmVmb3JlIG92ZXJ3cml0aW5nXG4gIGFyci5fZ2V0ID0gYXJyLmdldFxuICBhcnIuX3NldCA9IGFyci5zZXRcblxuICAvLyBkZXByZWNhdGVkLCB3aWxsIGJlIHJlbW92ZWQgaW4gbm9kZSAwLjEzK1xuICBhcnIuZ2V0ID0gQlAuZ2V0XG4gIGFyci5zZXQgPSBCUC5zZXRcblxuICBhcnIud3JpdGUgPSBCUC53cml0ZVxuICBhcnIudG9TdHJpbmcgPSBCUC50b1N0cmluZ1xuICBhcnIudG9Mb2NhbGVTdHJpbmcgPSBCUC50b1N0cmluZ1xuICBhcnIudG9KU09OID0gQlAudG9KU09OXG4gIGFyci5jb3B5ID0gQlAuY29weVxuICBhcnIuc2xpY2UgPSBCUC5zbGljZVxuICBhcnIucmVhZFVJbnQ4ID0gQlAucmVhZFVJbnQ4XG4gIGFyci5yZWFkVUludDE2TEUgPSBCUC5yZWFkVUludDE2TEVcbiAgYXJyLnJlYWRVSW50MTZCRSA9IEJQLnJlYWRVSW50MTZCRVxuICBhcnIucmVhZFVJbnQzMkxFID0gQlAucmVhZFVJbnQzMkxFXG4gIGFyci5yZWFkVUludDMyQkUgPSBCUC5yZWFkVUludDMyQkVcbiAgYXJyLnJlYWRJbnQ4ID0gQlAucmVhZEludDhcbiAgYXJyLnJlYWRJbnQxNkxFID0gQlAucmVhZEludDE2TEVcbiAgYXJyLnJlYWRJbnQxNkJFID0gQlAucmVhZEludDE2QkVcbiAgYXJyLnJlYWRJbnQzMkxFID0gQlAucmVhZEludDMyTEVcbiAgYXJyLnJlYWRJbnQzMkJFID0gQlAucmVhZEludDMyQkVcbiAgYXJyLnJlYWRGbG9hdExFID0gQlAucmVhZEZsb2F0TEVcbiAgYXJyLnJlYWRGbG9hdEJFID0gQlAucmVhZEZsb2F0QkVcbiAgYXJyLnJlYWREb3VibGVMRSA9IEJQLnJlYWREb3VibGVMRVxuICBhcnIucmVhZERvdWJsZUJFID0gQlAucmVhZERvdWJsZUJFXG4gIGFyci53cml0ZVVJbnQ4ID0gQlAud3JpdGVVSW50OFxuICBhcnIud3JpdGVVSW50MTZMRSA9IEJQLndyaXRlVUludDE2TEVcbiAgYXJyLndyaXRlVUludDE2QkUgPSBCUC53cml0ZVVJbnQxNkJFXG4gIGFyci53cml0ZVVJbnQzMkxFID0gQlAud3JpdGVVSW50MzJMRVxuICBhcnIud3JpdGVVSW50MzJCRSA9IEJQLndyaXRlVUludDMyQkVcbiAgYXJyLndyaXRlSW50OCA9IEJQLndyaXRlSW50OFxuICBhcnIud3JpdGVJbnQxNkxFID0gQlAud3JpdGVJbnQxNkxFXG4gIGFyci53cml0ZUludDE2QkUgPSBCUC53cml0ZUludDE2QkVcbiAgYXJyLndyaXRlSW50MzJMRSA9IEJQLndyaXRlSW50MzJMRVxuICBhcnIud3JpdGVJbnQzMkJFID0gQlAud3JpdGVJbnQzMkJFXG4gIGFyci53cml0ZUZsb2F0TEUgPSBCUC53cml0ZUZsb2F0TEVcbiAgYXJyLndyaXRlRmxvYXRCRSA9IEJQLndyaXRlRmxvYXRCRVxuICBhcnIud3JpdGVEb3VibGVMRSA9IEJQLndyaXRlRG91YmxlTEVcbiAgYXJyLndyaXRlRG91YmxlQkUgPSBCUC53cml0ZURvdWJsZUJFXG4gIGFyci5maWxsID0gQlAuZmlsbFxuICBhcnIuaW5zcGVjdCA9IEJQLmluc3BlY3RcbiAgYXJyLnRvQXJyYXlCdWZmZXIgPSBCUC50b0FycmF5QnVmZmVyXG5cbiAgcmV0dXJuIGFyclxufVxuXG4vLyBzbGljZShzdGFydCwgZW5kKVxuZnVuY3Rpb24gY2xhbXAgKGluZGV4LCBsZW4sIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICBpbmRleCA9IH5+aW5kZXg7ICAvLyBDb2VyY2UgdG8gaW50ZWdlci5cbiAgaWYgKGluZGV4ID49IGxlbikgcmV0dXJuIGxlblxuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4XG4gIGluZGV4ICs9IGxlblxuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4XG4gIHJldHVybiAwXG59XG5cbmZ1bmN0aW9uIGNvZXJjZSAobGVuZ3RoKSB7XG4gIC8vIENvZXJjZSBsZW5ndGggdG8gYSBudW1iZXIgKHBvc3NpYmx5IE5hTiksIHJvdW5kIHVwXG4gIC8vIGluIGNhc2UgaXQncyBmcmFjdGlvbmFsIChlLmcuIDEyMy40NTYpIHRoZW4gZG8gYVxuICAvLyBkb3VibGUgbmVnYXRlIHRvIGNvZXJjZSBhIE5hTiB0byAwLiBFYXN5LCByaWdodD9cbiAgbGVuZ3RoID0gfn5NYXRoLmNlaWwoK2xlbmd0aClcbiAgcmV0dXJuIGxlbmd0aCA8IDAgPyAwIDogbGVuZ3RoXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkgKHN1YmplY3QpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChzdWJqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzdWJqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuICB9KShzdWJqZWN0KVxufVxuXG5mdW5jdGlvbiBpc0FycmF5aXNoIChzdWJqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5KHN1YmplY3QpIHx8IEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSB8fFxuICAgICAgc3ViamVjdCAmJiB0eXBlb2Ygc3ViamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIHR5cGVvZiBzdWJqZWN0Lmxlbmd0aCA9PT0gJ251bWJlcidcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIHZhciBiID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBpZiAoYiA8PSAweDdGKVxuICAgICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpXG4gICAgZWxzZSB7XG4gICAgICB2YXIgc3RhcnQgPSBpXG4gICAgICBpZiAoYiA+PSAweEQ4MDAgJiYgYiA8PSAweERGRkYpIGkrK1xuICAgICAgdmFyIGggPSBlbmNvZGVVUklDb21wb25lbnQoc3RyLnNsaWNlKHN0YXJ0LCBpKzEpKS5zdWJzdHIoMSkuc3BsaXQoJyUnKVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBoLmxlbmd0aDsgaisrKVxuICAgICAgICBieXRlQXJyYXkucHVzaChwYXJzZUludChoW2pdLCAxNikpXG4gICAgfVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KHN0cilcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBwb3NcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSlcbiAgICAgIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gZGVjb2RlVXRmOENoYXIgKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpIC8vIFVURiA4IGludmFsaWQgY2hhclxuICB9XG59XG5cbi8qXG4gKiBXZSBoYXZlIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGludGVnZXIuIFRoaXMgbWVhbnMgdGhhdCBpdFxuICogaXMgbm9uLW5lZ2F0aXZlLiBJdCBoYXMgbm8gZnJhY3Rpb25hbCBjb21wb25lbnQgYW5kIHRoYXQgaXQgZG9lcyBub3RcbiAqIGV4Y2VlZCB0aGUgbWF4aW11bSBhbGxvd2VkIHZhbHVlLlxuICovXG5mdW5jdGlvbiB2ZXJpZnVpbnQgKHZhbHVlLCBtYXgpIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJylcbiAgYXNzZXJ0KHZhbHVlID49IDAsICdzcGVjaWZpZWQgYSBuZWdhdGl2ZSB2YWx1ZSBmb3Igd3JpdGluZyBhbiB1bnNpZ25lZCB2YWx1ZScpXG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBpcyBsYXJnZXIgdGhhbiBtYXhpbXVtIHZhbHVlIGZvciB0eXBlJylcbiAgYXNzZXJ0KE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSwgJ3ZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50Jylcbn1cblxuZnVuY3Rpb24gdmVyaWZzaW50ICh2YWx1ZSwgbWF4LCBtaW4pIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZScpXG4gIGFzc2VydCh2YWx1ZSA+PSBtaW4sICd2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSwgJ3ZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50Jylcbn1cblxuZnVuY3Rpb24gdmVyaWZJRUVFNzU0ICh2YWx1ZSwgbWF4LCBtaW4pIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZScpXG4gIGFzc2VydCh2YWx1ZSA+PSBtaW4sICd2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlJylcbn1cblxuZnVuY3Rpb24gYXNzZXJ0ICh0ZXN0LCBtZXNzYWdlKSB7XG4gIGlmICghdGVzdCkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgJ0ZhaWxlZCBhc3NlcnRpb24nKVxufVxuIiwidmFyIGxvb2t1cCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblxuOyhmdW5jdGlvbiAoZXhwb3J0cykge1xuXHQndXNlIHN0cmljdCc7XG5cbiAgdmFyIEFyciA9ICh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgPyBVaW50OEFycmF5XG4gICAgOiBBcnJheVxuXG5cdHZhciBaRVJPICAgPSAnMCcuY2hhckNvZGVBdCgwKVxuXHR2YXIgUExVUyAgID0gJysnLmNoYXJDb2RlQXQoMClcblx0dmFyIFNMQVNIICA9ICcvJy5jaGFyQ29kZUF0KDApXG5cdHZhciBOVU1CRVIgPSAnMCcuY2hhckNvZGVBdCgwKVxuXHR2YXIgTE9XRVIgID0gJ2EnLmNoYXJDb2RlQXQoMClcblx0dmFyIFVQUEVSICA9ICdBJy5jaGFyQ29kZUF0KDApXG5cblx0ZnVuY3Rpb24gZGVjb2RlIChlbHQpIHtcblx0XHR2YXIgY29kZSA9IGVsdC5jaGFyQ29kZUF0KDApXG5cdFx0aWYgKGNvZGUgPT09IFBMVVMpXG5cdFx0XHRyZXR1cm4gNjIgLy8gJysnXG5cdFx0aWYgKGNvZGUgPT09IFNMQVNIKVxuXHRcdFx0cmV0dXJuIDYzIC8vICcvJ1xuXHRcdGlmIChjb2RlIDwgTlVNQkVSKVxuXHRcdFx0cmV0dXJuIC0xIC8vbm8gbWF0Y2hcblx0XHRpZiAoY29kZSA8IE5VTUJFUiArIDEwKVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBOVU1CRVIgKyAyNiArIDI2XG5cdFx0aWYgKGNvZGUgPCBVUFBFUiArIDI2KVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBVUFBFUlxuXHRcdGlmIChjb2RlIDwgTE9XRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gTE9XRVIgKyAyNlxuXHR9XG5cblx0ZnVuY3Rpb24gYjY0VG9CeXRlQXJyYXkgKGI2NCkge1xuXHRcdHZhciBpLCBqLCBsLCB0bXAsIHBsYWNlSG9sZGVycywgYXJyXG5cblx0XHRpZiAoYjY0Lmxlbmd0aCAlIDQgPiAwKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuXHRcdH1cblxuXHRcdC8vIHRoZSBudW1iZXIgb2YgZXF1YWwgc2lnbnMgKHBsYWNlIGhvbGRlcnMpXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuXHRcdC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuXHRcdC8vIGlmIHRoZXJlIGlzIG9ubHkgb25lLCB0aGVuIHRoZSB0aHJlZSBjaGFyYWN0ZXJzIGJlZm9yZSBpdCByZXByZXNlbnQgMiBieXRlc1xuXHRcdC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2Vcblx0XHR2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXHRcdHBsYWNlSG9sZGVycyA9ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAyKSA/IDIgOiAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMSkgPyAxIDogMFxuXG5cdFx0Ly8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5cdFx0YXJyID0gbmV3IEFycihiNjQubGVuZ3RoICogMyAvIDQgLSBwbGFjZUhvbGRlcnMpXG5cblx0XHQvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG5cdFx0bCA9IHBsYWNlSG9sZGVycyA+IDAgPyBiNjQubGVuZ3RoIC0gNCA6IGI2NC5sZW5ndGhcblxuXHRcdHZhciBMID0gMFxuXG5cdFx0ZnVuY3Rpb24gcHVzaCAodikge1xuXHRcdFx0YXJyW0wrK10gPSB2XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMCwgaiA9IDA7IGkgPCBsOyBpICs9IDQsIGogKz0gMykge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxOCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCAxMikgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA8PCA2KSB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAzKSlcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMDAwKSA+PiAxNilcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMCkgPj4gOClcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRpZiAocGxhY2VIb2xkZXJzID09PSAyKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPj4gNClcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxMCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCA0KSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpID4+IDIpXG5cdFx0XHRwdXNoKCh0bXAgPj4gOCkgJiAweEZGKVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH1cblxuXHRcdHJldHVybiBhcnJcblx0fVxuXG5cdGZ1bmN0aW9uIHVpbnQ4VG9CYXNlNjQgKHVpbnQ4KSB7XG5cdFx0dmFyIGksXG5cdFx0XHRleHRyYUJ5dGVzID0gdWludDgubGVuZ3RoICUgMywgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcblx0XHRcdG91dHB1dCA9IFwiXCIsXG5cdFx0XHR0ZW1wLCBsZW5ndGhcblxuXHRcdGZ1bmN0aW9uIGVuY29kZSAobnVtKSB7XG5cdFx0XHRyZXR1cm4gbG9va3VwLmNoYXJBdChudW0pXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcblx0XHRcdHJldHVybiBlbmNvZGUobnVtID4+IDE4ICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDEyICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDYgJiAweDNGKSArIGVuY29kZShudW0gJiAweDNGKVxuXHRcdH1cblxuXHRcdC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcblx0XHRmb3IgKGkgPSAwLCBsZW5ndGggPSB1aW50OC5sZW5ndGggLSBleHRyYUJ5dGVzOyBpIDwgbGVuZ3RoOyBpICs9IDMpIHtcblx0XHRcdHRlbXAgPSAodWludDhbaV0gPDwgMTYpICsgKHVpbnQ4W2kgKyAxXSA8PCA4KSArICh1aW50OFtpICsgMl0pXG5cdFx0XHRvdXRwdXQgKz0gdHJpcGxldFRvQmFzZTY0KHRlbXApXG5cdFx0fVxuXG5cdFx0Ly8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuXHRcdHN3aXRjaCAoZXh0cmFCeXRlcykge1xuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHR0ZW1wID0gdWludDhbdWludDgubGVuZ3RoIC0gMV1cblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDIpXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPDwgNCkgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gJz09J1xuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHR0ZW1wID0gKHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDJdIDw8IDgpICsgKHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMTApXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPj4gNCkgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDIpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9J1xuXHRcdFx0XHRicmVha1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXRcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzLnRvQnl0ZUFycmF5ID0gYjY0VG9CeXRlQXJyYXlcblx0bW9kdWxlLmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IHVpbnQ4VG9CYXNlNjRcbn0oKSlcbiIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sXG4gICAgICBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxLFxuICAgICAgZU1heCA9ICgxIDw8IGVMZW4pIC0gMSxcbiAgICAgIGVCaWFzID0gZU1heCA+PiAxLFxuICAgICAgbkJpdHMgPSAtNyxcbiAgICAgIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMCxcbiAgICAgIGQgPSBpc0xFID8gLTEgOiAxLFxuICAgICAgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXTtcblxuICBpICs9IGQ7XG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSk7XG4gIHMgPj49ICgtbkJpdHMpO1xuICBuQml0cyArPSBlTGVuO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KTtcblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKTtcbiAgZSA+Pj0gKC1uQml0cyk7XG4gIG5CaXRzICs9IG1MZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpO1xuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhcztcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpO1xuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbik7XG4gICAgZSA9IGUgLSBlQmlhcztcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKTtcbn07XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbihidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgYyxcbiAgICAgIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDEsXG4gICAgICBlTWF4ID0gKDEgPDwgZUxlbikgLSAxLFxuICAgICAgZUJpYXMgPSBlTWF4ID4+IDEsXG4gICAgICBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMCksXG4gICAgICBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSksXG4gICAgICBkID0gaXNMRSA/IDEgOiAtMSxcbiAgICAgIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDA7XG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSk7XG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDA7XG4gICAgZSA9IGVNYXg7XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpO1xuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLTtcbiAgICAgIGMgKj0gMjtcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKys7XG4gICAgICBjIC89IDI7XG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMDtcbiAgICAgIGUgPSBlTWF4O1xuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSBlICsgZUJpYXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpO1xuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG07XG4gIGVMZW4gKz0gbUxlbjtcbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KTtcblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjg7XG59O1xuIiwidmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlcjtcbnZhciBpbnRTaXplID0gNDtcbnZhciB6ZXJvQnVmZmVyID0gbmV3IEJ1ZmZlcihpbnRTaXplKTsgemVyb0J1ZmZlci5maWxsKDApO1xudmFyIGNocnN6ID0gODtcblxuZnVuY3Rpb24gdG9BcnJheShidWYsIGJpZ0VuZGlhbikge1xuICBpZiAoKGJ1Zi5sZW5ndGggJSBpbnRTaXplKSAhPT0gMCkge1xuICAgIHZhciBsZW4gPSBidWYubGVuZ3RoICsgKGludFNpemUgLSAoYnVmLmxlbmd0aCAlIGludFNpemUpKTtcbiAgICBidWYgPSBCdWZmZXIuY29uY2F0KFtidWYsIHplcm9CdWZmZXJdLCBsZW4pO1xuICB9XG5cbiAgdmFyIGFyciA9IFtdO1xuICB2YXIgZm4gPSBiaWdFbmRpYW4gPyBidWYucmVhZEludDMyQkUgOiBidWYucmVhZEludDMyTEU7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnVmLmxlbmd0aDsgaSArPSBpbnRTaXplKSB7XG4gICAgYXJyLnB1c2goZm4uY2FsbChidWYsIGkpKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiB0b0J1ZmZlcihhcnIsIHNpemUsIGJpZ0VuZGlhbikge1xuICB2YXIgYnVmID0gbmV3IEJ1ZmZlcihzaXplKTtcbiAgdmFyIGZuID0gYmlnRW5kaWFuID8gYnVmLndyaXRlSW50MzJCRSA6IGJ1Zi53cml0ZUludDMyTEU7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgZm4uY2FsbChidWYsIGFycltpXSwgaSAqIDQsIHRydWUpO1xuICB9XG4gIHJldHVybiBidWY7XG59XG5cbmZ1bmN0aW9uIGhhc2goYnVmLCBmbiwgaGFzaFNpemUsIGJpZ0VuZGlhbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSBidWYgPSBuZXcgQnVmZmVyKGJ1Zik7XG4gIHZhciBhcnIgPSBmbih0b0FycmF5KGJ1ZiwgYmlnRW5kaWFuKSwgYnVmLmxlbmd0aCAqIGNocnN6KTtcbiAgcmV0dXJuIHRvQnVmZmVyKGFyciwgaGFzaFNpemUsIGJpZ0VuZGlhbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBoYXNoOiBoYXNoIH07XG4iLCJ2YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyXG52YXIgc2hhID0gcmVxdWlyZSgnLi9zaGEnKVxudmFyIHNoYTI1NiA9IHJlcXVpcmUoJy4vc2hhMjU2JylcbnZhciBybmcgPSByZXF1aXJlKCcuL3JuZycpXG52YXIgbWQ1ID0gcmVxdWlyZSgnLi9tZDUnKVxuXG52YXIgYWxnb3JpdGhtcyA9IHtcbiAgc2hhMTogc2hhLFxuICBzaGEyNTY6IHNoYTI1NixcbiAgbWQ1OiBtZDVcbn1cblxudmFyIGJsb2Nrc2l6ZSA9IDY0XG52YXIgemVyb0J1ZmZlciA9IG5ldyBCdWZmZXIoYmxvY2tzaXplKTsgemVyb0J1ZmZlci5maWxsKDApXG5mdW5jdGlvbiBobWFjKGZuLCBrZXksIGRhdGEpIHtcbiAgaWYoIUJ1ZmZlci5pc0J1ZmZlcihrZXkpKSBrZXkgPSBuZXcgQnVmZmVyKGtleSlcbiAgaWYoIUJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkgZGF0YSA9IG5ldyBCdWZmZXIoZGF0YSlcblxuICBpZihrZXkubGVuZ3RoID4gYmxvY2tzaXplKSB7XG4gICAga2V5ID0gZm4oa2V5KVxuICB9IGVsc2UgaWYoa2V5Lmxlbmd0aCA8IGJsb2Nrc2l6ZSkge1xuICAgIGtleSA9IEJ1ZmZlci5jb25jYXQoW2tleSwgemVyb0J1ZmZlcl0sIGJsb2Nrc2l6ZSlcbiAgfVxuXG4gIHZhciBpcGFkID0gbmV3IEJ1ZmZlcihibG9ja3NpemUpLCBvcGFkID0gbmV3IEJ1ZmZlcihibG9ja3NpemUpXG4gIGZvcih2YXIgaSA9IDA7IGkgPCBibG9ja3NpemU7IGkrKykge1xuICAgIGlwYWRbaV0gPSBrZXlbaV0gXiAweDM2XG4gICAgb3BhZFtpXSA9IGtleVtpXSBeIDB4NUNcbiAgfVxuXG4gIHZhciBoYXNoID0gZm4oQnVmZmVyLmNvbmNhdChbaXBhZCwgZGF0YV0pKVxuICByZXR1cm4gZm4oQnVmZmVyLmNvbmNhdChbb3BhZCwgaGFzaF0pKVxufVxuXG5mdW5jdGlvbiBoYXNoKGFsZywga2V5KSB7XG4gIGFsZyA9IGFsZyB8fCAnc2hhMSdcbiAgdmFyIGZuID0gYWxnb3JpdGhtc1thbGddXG4gIHZhciBidWZzID0gW11cbiAgdmFyIGxlbmd0aCA9IDBcbiAgaWYoIWZuKSBlcnJvcignYWxnb3JpdGhtOicsIGFsZywgJ2lzIG5vdCB5ZXQgc3VwcG9ydGVkJylcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBpZighQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSBkYXRhID0gbmV3IEJ1ZmZlcihkYXRhKVxuICAgICAgICBcbiAgICAgIGJ1ZnMucHVzaChkYXRhKVxuICAgICAgbGVuZ3RoICs9IGRhdGEubGVuZ3RoXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG4gICAgZGlnZXN0OiBmdW5jdGlvbiAoZW5jKSB7XG4gICAgICB2YXIgYnVmID0gQnVmZmVyLmNvbmNhdChidWZzKVxuICAgICAgdmFyIHIgPSBrZXkgPyBobWFjKGZuLCBrZXksIGJ1ZikgOiBmbihidWYpXG4gICAgICBidWZzID0gbnVsbFxuICAgICAgcmV0dXJuIGVuYyA/IHIudG9TdHJpbmcoZW5jKSA6IHJcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZXJyb3IgKCkge1xuICB2YXIgbSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKCcgJylcbiAgdGhyb3cgbmV3IEVycm9yKFtcbiAgICBtLFxuICAgICd3ZSBhY2NlcHQgcHVsbCByZXF1ZXN0cycsXG4gICAgJ2h0dHA6Ly9naXRodWIuY29tL2RvbWluaWN0YXJyL2NyeXB0by1icm93c2VyaWZ5J1xuICAgIF0uam9pbignXFxuJykpXG59XG5cbmV4cG9ydHMuY3JlYXRlSGFzaCA9IGZ1bmN0aW9uIChhbGcpIHsgcmV0dXJuIGhhc2goYWxnKSB9XG5leHBvcnRzLmNyZWF0ZUhtYWMgPSBmdW5jdGlvbiAoYWxnLCBrZXkpIHsgcmV0dXJuIGhhc2goYWxnLCBrZXkpIH1cbmV4cG9ydHMucmFuZG9tQnl0ZXMgPSBmdW5jdGlvbihzaXplLCBjYWxsYmFjaykge1xuICBpZiAoY2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbCkge1xuICAgIHRyeSB7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIHVuZGVmaW5lZCwgbmV3IEJ1ZmZlcihybmcoc2l6ZSkpKVxuICAgIH0gY2F0Y2ggKGVycikgeyBjYWxsYmFjayhlcnIpIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihybmcoc2l6ZSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gZWFjaChhLCBmKSB7XG4gIGZvcih2YXIgaSBpbiBhKVxuICAgIGYoYVtpXSwgaSlcbn1cblxuLy8gdGhlIGxlYXN0IEkgY2FuIGRvIGlzIG1ha2UgZXJyb3IgbWVzc2FnZXMgZm9yIHRoZSByZXN0IG9mIHRoZSBub2RlLmpzL2NyeXB0byBhcGkuXG5lYWNoKFsnY3JlYXRlQ3JlZGVudGlhbHMnXG4sICdjcmVhdGVDaXBoZXInXG4sICdjcmVhdGVDaXBoZXJpdidcbiwgJ2NyZWF0ZURlY2lwaGVyJ1xuLCAnY3JlYXRlRGVjaXBoZXJpdidcbiwgJ2NyZWF0ZVNpZ24nXG4sICdjcmVhdGVWZXJpZnknXG4sICdjcmVhdGVEaWZmaWVIZWxsbWFuJ1xuLCAncGJrZGYyJ10sIGZ1bmN0aW9uIChuYW1lKSB7XG4gIGV4cG9ydHNbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgZXJyb3IoJ3NvcnJ5LCcsIG5hbWUsICdpcyBub3QgaW1wbGVtZW50ZWQgeWV0JylcbiAgfVxufSlcbiIsIi8qXHJcbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcclxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cclxuICogVmVyc2lvbiAyLjEgQ29weXJpZ2h0IChDKSBQYXVsIEpvaG5zdG9uIDE5OTkgLSAyMDAyLlxyXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XHJcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxyXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxyXG4gKi9cclxuXHJcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XHJcblxyXG4vKlxyXG4gKiBQZXJmb3JtIGEgc2ltcGxlIHNlbGYtdGVzdCB0byBzZWUgaWYgdGhlIFZNIGlzIHdvcmtpbmdcclxuICovXHJcbmZ1bmN0aW9uIG1kNV92bV90ZXN0KClcclxue1xyXG4gIHJldHVybiBoZXhfbWQ1KFwiYWJjXCIpID09IFwiOTAwMTUwOTgzY2QyNGZiMGQ2OTYzZjdkMjhlMTdmNzJcIjtcclxufVxyXG5cclxuLypcclxuICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aFxyXG4gKi9cclxuZnVuY3Rpb24gY29yZV9tZDUoeCwgbGVuKVxyXG57XHJcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cclxuICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8ICgobGVuKSAlIDMyKTtcclxuICB4WygoKGxlbiArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBsZW47XHJcblxyXG4gIHZhciBhID0gIDE3MzI1ODQxOTM7XHJcbiAgdmFyIGIgPSAtMjcxNzMzODc5O1xyXG4gIHZhciBjID0gLTE3MzI1ODQxOTQ7XHJcbiAgdmFyIGQgPSAgMjcxNzMzODc4O1xyXG5cclxuICBmb3IodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpXHJcbiAge1xyXG4gICAgdmFyIG9sZGEgPSBhO1xyXG4gICAgdmFyIG9sZGIgPSBiO1xyXG4gICAgdmFyIG9sZGMgPSBjO1xyXG4gICAgdmFyIG9sZGQgPSBkO1xyXG5cclxuICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpKyAwXSwgNyAsIC02ODA4NzY5MzYpO1xyXG4gICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2krIDFdLCAxMiwgLTM4OTU2NDU4Nik7XHJcbiAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSsgMl0sIDE3LCAgNjA2MTA1ODE5KTtcclxuICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcclxuICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpKyA0XSwgNyAsIC0xNzY0MTg4OTcpO1xyXG4gICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2krIDVdLCAxMiwgIDEyMDAwODA0MjYpO1xyXG4gICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2krIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xyXG4gICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2krIDddLCAyMiwgLTQ1NzA1OTgzKTtcclxuICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpKyA4XSwgNyAsICAxNzcwMDM1NDE2KTtcclxuICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcclxuICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpKzEwXSwgMTcsIC00MjA2Myk7XHJcbiAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSsxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XHJcbiAgICBhID0gbWQ1X2ZmKGEsIGIsIGMsIGQsIHhbaSsxMl0sIDcgLCAgMTgwNDYwMzY4Mik7XHJcbiAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSsxM10sIDEyLCAtNDAzNDExMDEpO1xyXG4gICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2krMTRdLCAxNywgLTE1MDIwMDIyOTApO1xyXG4gICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2krMTVdLCAyMiwgIDEyMzY1MzUzMjkpO1xyXG5cclxuICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpKyAxXSwgNSAsIC0xNjU3OTY1MTApO1xyXG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krIDZdLCA5ICwgLTEwNjk1MDE2MzIpO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krMTFdLCAxNCwgIDY0MzcxNzcxMyk7XHJcbiAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSsgMF0sIDIwLCAtMzczODk3MzAyKTtcclxuICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpKyA1XSwgNSAsIC03MDE1NTg2OTEpO1xyXG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krMTBdLCA5ICwgIDM4MDE2MDgzKTtcclxuICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpKzE1XSwgMTQsIC02NjA0NzgzMzUpO1xyXG4gICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2krIDRdLCAyMCwgLTQwNTUzNzg0OCk7XHJcbiAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSsgOV0sIDUgLCAgNTY4NDQ2NDM4KTtcclxuICAgIGQgPSBtZDVfZ2coZCwgYSwgYiwgYywgeFtpKzE0XSwgOSAsIC0xMDE5ODAzNjkwKTtcclxuICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpKyAzXSwgMTQsIC0xODczNjM5NjEpO1xyXG4gICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2krIDhdLCAyMCwgIDExNjM1MzE1MDEpO1xyXG4gICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2krMTNdLCA1ICwgLTE0NDQ2ODE0NjcpO1xyXG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krIDJdLCA5ICwgLTUxNDAzNzg0KTtcclxuICAgIGMgPSBtZDVfZ2coYywgZCwgYSwgYiwgeFtpKyA3XSwgMTQsICAxNzM1MzI4NDczKTtcclxuICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpKzEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcclxuXHJcbiAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSsgNV0sIDQgLCAtMzc4NTU4KTtcclxuICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcclxuICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpKzExXSwgMTYsICAxODM5MDMwNTYyKTtcclxuICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpKzE0XSwgMjMsIC0zNTMwOTU1Nik7XHJcbiAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSsgMV0sIDQgLCAtMTUzMDk5MjA2MCk7XHJcbiAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSsgNF0sIDExLCAgMTI3Mjg5MzM1Myk7XHJcbiAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSsgN10sIDE2LCAtMTU1NDk3NjMyKTtcclxuICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpKzEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKzEzXSwgNCAsICA2ODEyNzkxNzQpO1xyXG4gICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2krIDBdLCAxMSwgLTM1ODUzNzIyMik7XHJcbiAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSsgM10sIDE2LCAtNzIyNTIxOTc5KTtcclxuICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpKyA2XSwgMjMsICA3NjAyOTE4OSk7XHJcbiAgICBhID0gbWQ1X2hoKGEsIGIsIGMsIGQsIHhbaSsgOV0sIDQgLCAtNjQwMzY0NDg3KTtcclxuICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpKzEyXSwgMTEsIC00MjE4MTU4MzUpO1xyXG4gICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2krMTVdLCAxNiwgIDUzMDc0MjUyMCk7XHJcbiAgICBiID0gbWQ1X2hoKGIsIGMsIGQsIGEsIHhbaSsgMl0sIDIzLCAtOTk1MzM4NjUxKTtcclxuXHJcbiAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSsgMF0sIDYgLCAtMTk4NjMwODQ0KTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKyA3XSwgMTAsICAxMTI2ODkxNDE1KTtcclxuICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpKzE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcclxuICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpKyA1XSwgMjEsIC01NzQzNDA1NSk7XHJcbiAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSsxMl0sIDYgLCAgMTcwMDQ4NTU3MSk7XHJcbiAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSsgM10sIDEwLCAtMTg5NDk4NjYwNik7XHJcbiAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSsxMF0sIDE1LCAtMTA1MTUyMyk7XHJcbiAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XHJcbiAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSsgOF0sIDYgLCAgMTg3MzMxMzM1OSk7XHJcbiAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSsxNV0sIDEwLCAtMzA2MTE3NDQpO1xyXG4gICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2krIDZdLCAxNSwgLTE1NjAxOTgzODApO1xyXG4gICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2krMTNdLCAyMSwgIDEzMDkxNTE2NDkpO1xyXG4gICAgYSA9IG1kNV9paShhLCBiLCBjLCBkLCB4W2krIDRdLCA2ICwgLTE0NTUyMzA3MCk7XHJcbiAgICBkID0gbWQ1X2lpKGQsIGEsIGIsIGMsIHhbaSsxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XHJcbiAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSsgMl0sIDE1LCAgNzE4Nzg3MjU5KTtcclxuICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xyXG5cclxuICAgIGEgPSBzYWZlX2FkZChhLCBvbGRhKTtcclxuICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcclxuICAgIGMgPSBzYWZlX2FkZChjLCBvbGRjKTtcclxuICAgIGQgPSBzYWZlX2FkZChkLCBvbGRkKTtcclxuICB9XHJcbiAgcmV0dXJuIEFycmF5KGEsIGIsIGMsIGQpO1xyXG5cclxufVxyXG5cclxuLypcclxuICogVGhlc2UgZnVuY3Rpb25zIGltcGxlbWVudCB0aGUgZm91ciBiYXNpYyBvcGVyYXRpb25zIHRoZSBhbGdvcml0aG0gdXNlcy5cclxuICovXHJcbmZ1bmN0aW9uIG1kNV9jbW4ocSwgYSwgYiwgeCwgcywgdClcclxue1xyXG4gIHJldHVybiBzYWZlX2FkZChiaXRfcm9sKHNhZmVfYWRkKHNhZmVfYWRkKGEsIHEpLCBzYWZlX2FkZCh4LCB0KSksIHMpLGIpO1xyXG59XHJcbmZ1bmN0aW9uIG1kNV9mZihhLCBiLCBjLCBkLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIG1kNV9jbW4oKGIgJiBjKSB8ICgofmIpICYgZCksIGEsIGIsIHgsIHMsIHQpO1xyXG59XHJcbmZ1bmN0aW9uIG1kNV9nZyhhLCBiLCBjLCBkLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIG1kNV9jbW4oKGIgJiBkKSB8IChjICYgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xyXG59XHJcbmZ1bmN0aW9uIG1kNV9oaChhLCBiLCBjLCBkLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIG1kNV9jbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KTtcclxufVxyXG5mdW5jdGlvbiBtZDVfaWkoYSwgYiwgYywgZCwgeCwgcywgdClcclxue1xyXG4gIHJldHVybiBtZDVfY21uKGMgXiAoYiB8ICh+ZCkpLCBhLCBiLCB4LCBzLCB0KTtcclxufVxyXG5cclxuLypcclxuICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxyXG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxyXG4gKi9cclxuZnVuY3Rpb24gc2FmZV9hZGQoeCwgeSlcclxue1xyXG4gIHZhciBsc3cgPSAoeCAmIDB4RkZGRikgKyAoeSAmIDB4RkZGRik7XHJcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xyXG4gIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xyXG59XHJcblxyXG4vKlxyXG4gKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXHJcbiAqL1xyXG5mdW5jdGlvbiBiaXRfcm9sKG51bSwgY250KVxyXG57XHJcbiAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1kNShidWYpIHtcclxuICByZXR1cm4gaGVscGVycy5oYXNoKGJ1ZiwgY29yZV9tZDUsIDE2KTtcclxufTtcclxuIiwiLy8gT3JpZ2luYWwgY29kZSBhZGFwdGVkIGZyb20gUm9iZXJ0IEtpZWZmZXIuXG4vLyBkZXRhaWxzIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBfZ2xvYmFsID0gdGhpcztcblxuICB2YXIgbWF0aFJORywgd2hhdHdnUk5HO1xuXG4gIC8vIE5PVEU6IE1hdGgucmFuZG9tKCkgZG9lcyBub3QgZ3VhcmFudGVlIFwiY3J5cHRvZ3JhcGhpYyBxdWFsaXR5XCJcbiAgbWF0aFJORyA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICB2YXIgYnl0ZXMgPSBuZXcgQXJyYXkoc2l6ZSk7XG4gICAgdmFyIHI7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IHNpemU7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIGJ5dGVzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBieXRlcztcbiAgfVxuXG4gIGlmIChfZ2xvYmFsLmNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgd2hhdHdnUk5HID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG4gICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGJ5dGVzKTtcbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9XG4gIH1cblxuICBtb2R1bGUuZXhwb3J0cyA9IHdoYXR3Z1JORyB8fCBtYXRoUk5HO1xuXG59KCkpXG4iLCIvKlxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBTZWN1cmUgSGFzaCBBbGdvcml0aG0sIFNIQS0xLCBhcyBkZWZpbmVkXG4gKiBpbiBGSVBTIFBVQiAxODAtMVxuICogVmVyc2lvbiAyLjFhIENvcHlyaWdodCBQYXVsIEpvaG5zdG9uIDIwMDAgLSAyMDAyLlxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgZGV0YWlscy5cbiAqL1xuXG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG4vKlxuICogQ2FsY3VsYXRlIHRoZSBTSEEtMSBvZiBhbiBhcnJheSBvZiBiaWctZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoXG4gKi9cbmZ1bmN0aW9uIGNvcmVfc2hhMSh4LCBsZW4pXG57XG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbGVuICUgMzIpO1xuICB4WygobGVuICsgNjQgPj4gOSkgPDwgNCkgKyAxNV0gPSBsZW47XG5cbiAgdmFyIHcgPSBBcnJheSg4MCk7XG4gIHZhciBhID0gIDE3MzI1ODQxOTM7XG4gIHZhciBiID0gLTI3MTczMzg3OTtcbiAgdmFyIGMgPSAtMTczMjU4NDE5NDtcbiAgdmFyIGQgPSAgMjcxNzMzODc4O1xuICB2YXIgZSA9IC0xMDA5NTg5Nzc2O1xuXG4gIGZvcih2YXIgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNilcbiAge1xuICAgIHZhciBvbGRhID0gYTtcbiAgICB2YXIgb2xkYiA9IGI7XG4gICAgdmFyIG9sZGMgPSBjO1xuICAgIHZhciBvbGRkID0gZDtcbiAgICB2YXIgb2xkZSA9IGU7XG5cbiAgICBmb3IodmFyIGogPSAwOyBqIDwgODA7IGorKylcbiAgICB7XG4gICAgICBpZihqIDwgMTYpIHdbal0gPSB4W2kgKyBqXTtcbiAgICAgIGVsc2Ugd1tqXSA9IHJvbCh3W2otM10gXiB3W2otOF0gXiB3W2otMTRdIF4gd1tqLTE2XSwgMSk7XG4gICAgICB2YXIgdCA9IHNhZmVfYWRkKHNhZmVfYWRkKHJvbChhLCA1KSwgc2hhMV9mdChqLCBiLCBjLCBkKSksXG4gICAgICAgICAgICAgICAgICAgICAgIHNhZmVfYWRkKHNhZmVfYWRkKGUsIHdbal0pLCBzaGExX2t0KGopKSk7XG4gICAgICBlID0gZDtcbiAgICAgIGQgPSBjO1xuICAgICAgYyA9IHJvbChiLCAzMCk7XG4gICAgICBiID0gYTtcbiAgICAgIGEgPSB0O1xuICAgIH1cblxuICAgIGEgPSBzYWZlX2FkZChhLCBvbGRhKTtcbiAgICBiID0gc2FmZV9hZGQoYiwgb2xkYik7XG4gICAgYyA9IHNhZmVfYWRkKGMsIG9sZGMpO1xuICAgIGQgPSBzYWZlX2FkZChkLCBvbGRkKTtcbiAgICBlID0gc2FmZV9hZGQoZSwgb2xkZSk7XG4gIH1cbiAgcmV0dXJuIEFycmF5KGEsIGIsIGMsIGQsIGUpO1xuXG59XG5cbi8qXG4gKiBQZXJmb3JtIHRoZSBhcHByb3ByaWF0ZSB0cmlwbGV0IGNvbWJpbmF0aW9uIGZ1bmN0aW9uIGZvciB0aGUgY3VycmVudFxuICogaXRlcmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHNoYTFfZnQodCwgYiwgYywgZClcbntcbiAgaWYodCA8IDIwKSByZXR1cm4gKGIgJiBjKSB8ICgofmIpICYgZCk7XG4gIGlmKHQgPCA0MCkgcmV0dXJuIGIgXiBjIF4gZDtcbiAgaWYodCA8IDYwKSByZXR1cm4gKGIgJiBjKSB8IChiICYgZCkgfCAoYyAmIGQpO1xuICByZXR1cm4gYiBeIGMgXiBkO1xufVxuXG4vKlxuICogRGV0ZXJtaW5lIHRoZSBhcHByb3ByaWF0ZSBhZGRpdGl2ZSBjb25zdGFudCBmb3IgdGhlIGN1cnJlbnQgaXRlcmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHNoYTFfa3QodClcbntcbiAgcmV0dXJuICh0IDwgMjApID8gIDE1MTg1MDAyNDkgOiAodCA8IDQwKSA/ICAxODU5Nzc1MzkzIDpcbiAgICAgICAgICh0IDwgNjApID8gLTE4OTQwMDc1ODggOiAtODk5NDk3NTE0O1xufVxuXG4vKlxuICogQWRkIGludGVnZXJzLCB3cmFwcGluZyBhdCAyXjMyLiBUaGlzIHVzZXMgMTYtYml0IG9wZXJhdGlvbnMgaW50ZXJuYWxseVxuICogdG8gd29yayBhcm91bmQgYnVncyBpbiBzb21lIEpTIGludGVycHJldGVycy5cbiAqL1xuZnVuY3Rpb24gc2FmZV9hZGQoeCwgeSlcbntcbiAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKTtcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhGRkZGKTtcbn1cblxuLypcbiAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cbiAqL1xuZnVuY3Rpb24gcm9sKG51bSwgY250KVxue1xuICByZXR1cm4gKG51bSA8PCBjbnQpIHwgKG51bSA+Pj4gKDMyIC0gY250KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hhMShidWYpIHtcbiAgcmV0dXJuIGhlbHBlcnMuaGFzaChidWYsIGNvcmVfc2hhMSwgMjAsIHRydWUpO1xufTtcbiIsIlxuLyoqXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNlY3VyZSBIYXNoIEFsZ29yaXRobSwgU0hBLTI1NiwgYXMgZGVmaW5lZFxuICogaW4gRklQUyAxODAtMlxuICogVmVyc2lvbiAyLjItYmV0YSBDb3B5cmlnaHQgQW5nZWwgTWFyaW4sIFBhdWwgSm9obnN0b24gMjAwMCAtIDIwMDkuXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKlxuICovXG5cbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbnZhciBzYWZlX2FkZCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKTtcbiAgdmFyIG1zdyA9ICh4ID4+IDE2KSArICh5ID4+IDE2KSArIChsc3cgPj4gMTYpO1xuICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhGRkZGKTtcbn07XG5cbnZhciBTID0gZnVuY3Rpb24oWCwgbikge1xuICByZXR1cm4gKFggPj4+IG4pIHwgKFggPDwgKDMyIC0gbikpO1xufTtcblxudmFyIFIgPSBmdW5jdGlvbihYLCBuKSB7XG4gIHJldHVybiAoWCA+Pj4gbik7XG59O1xuXG52YXIgQ2ggPSBmdW5jdGlvbih4LCB5LCB6KSB7XG4gIHJldHVybiAoKHggJiB5KSBeICgofngpICYgeikpO1xufTtcblxudmFyIE1haiA9IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgcmV0dXJuICgoeCAmIHkpIF4gKHggJiB6KSBeICh5ICYgeikpO1xufTtcblxudmFyIFNpZ21hMDI1NiA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIChTKHgsIDIpIF4gUyh4LCAxMykgXiBTKHgsIDIyKSk7XG59O1xuXG52YXIgU2lnbWExMjU2ID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gKFMoeCwgNikgXiBTKHgsIDExKSBeIFMoeCwgMjUpKTtcbn07XG5cbnZhciBHYW1tYTAyNTYgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAoUyh4LCA3KSBeIFMoeCwgMTgpIF4gUih4LCAzKSk7XG59O1xuXG52YXIgR2FtbWExMjU2ID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gKFMoeCwgMTcpIF4gUyh4LCAxOSkgXiBSKHgsIDEwKSk7XG59O1xuXG52YXIgY29yZV9zaGEyNTYgPSBmdW5jdGlvbihtLCBsKSB7XG4gIHZhciBLID0gbmV3IEFycmF5KDB4NDI4QTJGOTgsMHg3MTM3NDQ5MSwweEI1QzBGQkNGLDB4RTlCNURCQTUsMHgzOTU2QzI1QiwweDU5RjExMUYxLDB4OTIzRjgyQTQsMHhBQjFDNUVENSwweEQ4MDdBQTk4LDB4MTI4MzVCMDEsMHgyNDMxODVCRSwweDU1MEM3REMzLDB4NzJCRTVENzQsMHg4MERFQjFGRSwweDlCREMwNkE3LDB4QzE5QkYxNzQsMHhFNDlCNjlDMSwweEVGQkU0Nzg2LDB4RkMxOURDNiwweDI0MENBMUNDLDB4MkRFOTJDNkYsMHg0QTc0ODRBQSwweDVDQjBBOURDLDB4NzZGOTg4REEsMHg5ODNFNTE1MiwweEE4MzFDNjZELDB4QjAwMzI3QzgsMHhCRjU5N0ZDNywweEM2RTAwQkYzLDB4RDVBNzkxNDcsMHg2Q0E2MzUxLDB4MTQyOTI5NjcsMHgyN0I3MEE4NSwweDJFMUIyMTM4LDB4NEQyQzZERkMsMHg1MzM4MEQxMywweDY1MEE3MzU0LDB4NzY2QTBBQkIsMHg4MUMyQzkyRSwweDkyNzIyQzg1LDB4QTJCRkU4QTEsMHhBODFBNjY0QiwweEMyNEI4QjcwLDB4Qzc2QzUxQTMsMHhEMTkyRTgxOSwweEQ2OTkwNjI0LDB4RjQwRTM1ODUsMHgxMDZBQTA3MCwweDE5QTRDMTE2LDB4MUUzNzZDMDgsMHgyNzQ4Nzc0QywweDM0QjBCQ0I1LDB4MzkxQzBDQjMsMHg0RUQ4QUE0QSwweDVCOUNDQTRGLDB4NjgyRTZGRjMsMHg3NDhGODJFRSwweDc4QTU2MzZGLDB4ODRDODc4MTQsMHg4Q0M3MDIwOCwweDkwQkVGRkZBLDB4QTQ1MDZDRUIsMHhCRUY5QTNGNywweEM2NzE3OEYyKTtcbiAgdmFyIEhBU0ggPSBuZXcgQXJyYXkoMHg2QTA5RTY2NywgMHhCQjY3QUU4NSwgMHgzQzZFRjM3MiwgMHhBNTRGRjUzQSwgMHg1MTBFNTI3RiwgMHg5QjA1Njg4QywgMHgxRjgzRDlBQiwgMHg1QkUwQ0QxOSk7XG4gICAgdmFyIFcgPSBuZXcgQXJyYXkoNjQpO1xuICAgIHZhciBhLCBiLCBjLCBkLCBlLCBmLCBnLCBoLCBpLCBqO1xuICAgIHZhciBUMSwgVDI7XG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gIG1bbCA+PiA1XSB8PSAweDgwIDw8ICgyNCAtIGwgJSAzMik7XG4gIG1bKChsICsgNjQgPj4gOSkgPDwgNCkgKyAxNV0gPSBsO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgYSA9IEhBU0hbMF07IGIgPSBIQVNIWzFdOyBjID0gSEFTSFsyXTsgZCA9IEhBU0hbM107IGUgPSBIQVNIWzRdOyBmID0gSEFTSFs1XTsgZyA9IEhBU0hbNl07IGggPSBIQVNIWzddO1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgNjQ7IGorKykge1xuICAgICAgaWYgKGogPCAxNikge1xuICAgICAgICBXW2pdID0gbVtqICsgaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBXW2pdID0gc2FmZV9hZGQoc2FmZV9hZGQoc2FmZV9hZGQoR2FtbWExMjU2KFdbaiAtIDJdKSwgV1tqIC0gN10pLCBHYW1tYTAyNTYoV1tqIC0gMTVdKSksIFdbaiAtIDE2XSk7XG4gICAgICB9XG4gICAgICBUMSA9IHNhZmVfYWRkKHNhZmVfYWRkKHNhZmVfYWRkKHNhZmVfYWRkKGgsIFNpZ21hMTI1NihlKSksIENoKGUsIGYsIGcpKSwgS1tqXSksIFdbal0pO1xuICAgICAgVDIgPSBzYWZlX2FkZChTaWdtYTAyNTYoYSksIE1haihhLCBiLCBjKSk7XG4gICAgICBoID0gZzsgZyA9IGY7IGYgPSBlOyBlID0gc2FmZV9hZGQoZCwgVDEpOyBkID0gYzsgYyA9IGI7IGIgPSBhOyBhID0gc2FmZV9hZGQoVDEsIFQyKTtcbiAgICB9XG4gICAgSEFTSFswXSA9IHNhZmVfYWRkKGEsIEhBU0hbMF0pOyBIQVNIWzFdID0gc2FmZV9hZGQoYiwgSEFTSFsxXSk7IEhBU0hbMl0gPSBzYWZlX2FkZChjLCBIQVNIWzJdKTsgSEFTSFszXSA9IHNhZmVfYWRkKGQsIEhBU0hbM10pO1xuICAgIEhBU0hbNF0gPSBzYWZlX2FkZChlLCBIQVNIWzRdKTsgSEFTSFs1XSA9IHNhZmVfYWRkKGYsIEhBU0hbNV0pOyBIQVNIWzZdID0gc2FmZV9hZGQoZywgSEFTSFs2XSk7IEhBU0hbN10gPSBzYWZlX2FkZChoLCBIQVNIWzddKTtcbiAgfVxuICByZXR1cm4gSEFTSDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hhMjU2KGJ1Zikge1xuICByZXR1cm4gaGVscGVycy5oYXNoKGJ1ZiwgY29yZV9zaGEyNTYsIDMyLCB0cnVlKTtcbn07XG4iXX0=
