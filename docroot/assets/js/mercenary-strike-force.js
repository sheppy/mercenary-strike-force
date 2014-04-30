(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AssetManager, BootScene, CreditsScene, GraphicsManager, InputManager, MainMenuScene, MissionCreateScene, PreLoadScene, Scene, SceneManager,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require("../../../vendor/iki-engine/src/Scene.coffee");

SceneManager = require("../../../vendor/iki-engine/src/Manager/SceneManager.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../../vendor/iki-engine/src/Manager/InputManager.coffee");

AssetManager = require("../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

PreLoadScene = require("./PreLoad.coffee");

MainMenuScene = require("./MainMenu.coffee");

CreditsScene = require("./Credits.coffee");

MissionCreateScene = require("./MissionCreate.coffee");

BootScene = (function(_super) {
  __extends(BootScene, _super);

  function BootScene() {
    return BootScene.__super__.constructor.apply(this, arguments);
  }

  BootScene.prototype.init = function() {
    var creditsScene, mainMenuScene, missionCreateScene, preLoadScene;
    this.width = 1280;
    this.height = 720;
    GraphicsManager.renderer = GraphicsManager.createRenderer(this.width, this.height, document.body);
    this.sizeCanvas();
    InputManager.init(GraphicsManager.renderer.canvas);
    window.addEventListener("resize", this.sizeCanvas.bind(this));
    preLoadScene = new PreLoadScene();
    SceneManager.add("preload", preLoadScene);
    preLoadScene.init();
    mainMenuScene = new MainMenuScene();
    SceneManager.add("main-menu", mainMenuScene);
    mainMenuScene.init();
    creditsScene = new CreditsScene();
    SceneManager.add("credits", creditsScene);
    creditsScene.init();
    missionCreateScene = new MissionCreateScene();
    SceneManager.add("mission-create", missionCreateScene);
    return missionCreateScene.init();
  };

  BootScene.prototype.activate = function() {
    var loadAsset;
    loadAsset = AssetManager.load("assets/assets-boot.json");
    return loadAsset.then(function() {
      return SceneManager.activate("preload");
    });
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


},{"../../../vendor/iki-engine/src/Manager/AssetManager.coffee":11,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":14,"../../../vendor/iki-engine/src/Manager/InputManager.coffee":15,"../../../vendor/iki-engine/src/Manager/SceneManager.coffee":16,"../../../vendor/iki-engine/src/Scene.coffee":17,"./Credits.coffee":2,"./MainMenu.coffee":3,"./MissionCreate.coffee":4,"./PreLoad.coffee":5}],2:[function(require,module,exports){
var CreditsScene, GraphicsManager, Scene,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require("../../../vendor/iki-engine/src/Scene.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

CreditsScene = (function(_super) {
  __extends(CreditsScene, _super);

  function CreditsScene() {
    return CreditsScene.__super__.constructor.apply(this, arguments);
  }

  CreditsScene.prototype.init = function() {
    return this.renderer = GraphicsManager.renderer;
  };

  CreditsScene.prototype.activate = function() {
    this.renderer.ctx.fillStyle = "#000";
    this.renderer.ctx.fillRect(0, 0, this.renderer.width, this.renderer.height);
    return this.renderText("TODO: Credits");
  };

  CreditsScene.prototype.renderText = function(text) {
    this.renderer.ctx.fillStyle = "#33B5E5";
    this.renderer.ctx.font = "14px Arial, sans-serif";
    this.renderer.ctx.textBaseline = "top";
    return this.renderer.ctx.fillText(text, 50, 50);
  };

  return CreditsScene;

})(Scene);

module.exports = CreditsScene;


},{"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":14,"../../../vendor/iki-engine/src/Scene.coffee":17}],3:[function(require,module,exports){
var AssetManager, AudioManager, EntityManager, GraphicsManager, InputManager, MainMenuInputSystem, MainMenuRendererSystem, MainMenuScene, Scene, SceneManager, Util,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require("../../../vendor/iki-engine/src/Scene.coffee");

Util = require("../../../vendor/iki-engine/src/Util.coffee");

SceneManager = require("../../../vendor/iki-engine/src/Manager/SceneManager.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

InputManager = require("../../../vendor/iki-engine/src/Manager/InputManager.coffee");

AudioManager = require("../../../vendor/iki-engine/src/Manager/AudioManager.coffee");

AssetManager = require("../../../vendor/iki-engine/src/Manager/AssetManager.coffee");

EntityManager = require("../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

MainMenuInputSystem = require("../System/MainMenuInput.coffee");

MainMenuRendererSystem = require("../System/MainMenuRenderer.coffee");

MainMenuScene = (function(_super) {
  __extends(MainMenuScene, _super);

  function MainMenuScene() {
    return MainMenuScene.__super__.constructor.apply(this, arguments);
  }

  MainMenuScene.prototype.init = function() {
    this.renderer = GraphicsManager.renderer;
    AudioManager.load("menu-select", "/assets/sound/UI pack 1/MENU B_Select.wav");
    return AudioManager.load("menu-back", "/assets/sound/UI pack 1/MENU B_Back.wav");
  };

  MainMenuScene.prototype.activate = function() {
    var gfx, input;
    input = this.addSystem(new MainMenuInputSystem);
    input.init();
    gfx = this.addSystem(new MainMenuRendererSystem);
    gfx.init(this.renderer);
    this.currentMenu = "main-menu";
    return this.loadMenu("/assets/menu/" + this.currentMenu + ".json");
  };

  MainMenuScene.prototype.deactivate = function() {
    InputManager.onMouseClick = null;
    return EntityManager.deleteAllEntities();
  };

  MainMenuScene.prototype.loadMenu = function(menuFile) {
    var map;
    map = Util.loadJSON(menuFile);
    return map.then(this.parseMenu.bind(this));
  };

  MainMenuScene.prototype.parseMenu = function(menuData) {
    var element, _i, _len, _ref, _results;
    _ref = menuData.elements;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      if (element.type === "background") {
        this.addBackground(menuData.id, element);
      }
      if (element.type === "button") {
        this.addButton(menuData.id, element);
      }
      if (element.type === "text") {
        _results.push(this.addText(menuData.id, element));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  MainMenuScene.prototype.addBackground = function(menu, bg) {
    var background;
    background = EntityManager.createEntity();
    return EntityManager.addComponent(background, {
      type: "UIBackground",
      img: AssetManager.get(bg.src)
    });
  };

  MainMenuScene.prototype.addText = function(menu, txt) {
    var text;
    text = EntityManager.createEntity();
    EntityManager.addComponent(text, {
      type: "UIText",
      text: txt.text,
      font: txt.font
    });
    return EntityManager.addComponent(text, {
      type: "ScreenPosition",
      x: this.renderer.width / 2,
      y: txt.y
    });
  };

  MainMenuScene.prototype.addButton = function(menu, btn) {
    var button, tween;
    button = EntityManager.createEntity();
    EntityManager.addComponent(button, {
      type: "UIButton",
      width: btn.width,
      height: btn.height,
      colour: "rgba(255,255,255,0.5)",
      colourHover: "#fb3",
      colourPressed: "#33b5e5",
      colourDisabled: "rgba(255,255,255,0.1)",
      text: btn.text
    });
    EntityManager.addComponent(button, {
      type: "ScreenPosition",
      x: -350,
      y: btn.y
    });
    EntityManager.addComponent(button, {
      type: "UIState",
      hover: false,
      disabled: btn.disabled,
      pressed: false
    });
    if (btn.actionType === "switchMenu") {
      EntityManager.addComponent(button, {
        type: "UIClickEvent",
        onClick: this.switchMenu.bind(this, btn.action, btn.isBack)
      });
    } else if (btn.actionType === "switchScene") {
      EntityManager.addComponent(button, {
        type: "UIClickEvent",
        onClick: this.switchScene.bind(this, btn.action, btn.isBack)
      });
    }
    tween = this.tweenForButtons("in");
    return tween.start();
  };

  MainMenuScene.prototype.switchMenu = function(newMenu, isBack) {
    var direction, sound, tween;
    if (isBack == null) {
      isBack = false;
    }
    sound = isBack ? "menu-back" : "menu-select";
    AudioManager.play(sound);
    this.currentMenu = newMenu;
    direction = isBack ? "out-left" : "out-right";
    tween = this.tweenForButtons(direction);
    tween.onComplete((function(_this) {
      return function() {
        EntityManager.deleteAllEntities();
        return _this.loadMenu("/assets/menu/" + _this.currentMenu + ".json");
      };
    })(this));
    return tween.start();
  };

  MainMenuScene.prototype.tweenForButtons = function(direction) {
    var button, buttons, center, from, positions, rightScreen, to, tween;
    center = (this.renderer.width / 2) - 150;
    rightScreen = this.renderer.width + 50;
    if (direction === "out-left") {
      from = {
        x: center
      };
      to = {
        x: -350
      };
    } else if (direction === "out-right") {
      from = {
        x: center
      };
      to = {
        x: rightScreen
      };
    } else {
      from = {
        x: -350
      };
      to = {
        x: center
      };
    }
    buttons = EntityManager.getAllEntitiesWithComponentOfTypes(["UIButton", "ScreenPosition"]);
    positions = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = buttons.length; _i < _len; _i++) {
        button = buttons[_i];
        _results.push(EntityManager.getComponentOfType(button, "ScreenPosition"));
      }
      return _results;
    })();
    tween = new TWEEN.Tween(from);
    tween.to(to, 500);
    tween.easing(TWEEN.Easing.Cubic.Out);
    tween.onUpdate(function() {
      var position, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = positions.length; _i < _len; _i++) {
        position = positions[_i];
        _results.push(position.x = this.x);
      }
      return _results;
    });
    return tween;
  };

  MainMenuScene.prototype.switchScene = function(scene) {
    AudioManager.play("menu-select");
    return SceneManager.activate(scene);
  };

  return MainMenuScene;

})(Scene);

module.exports = MainMenuScene;


},{"../../../vendor/iki-engine/src/Manager/AssetManager.coffee":11,"../../../vendor/iki-engine/src/Manager/AudioManager.coffee":12,"../../../vendor/iki-engine/src/Manager/EntityManager.coffee":13,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":14,"../../../vendor/iki-engine/src/Manager/InputManager.coffee":15,"../../../vendor/iki-engine/src/Manager/SceneManager.coffee":16,"../../../vendor/iki-engine/src/Scene.coffee":17,"../../../vendor/iki-engine/src/Util.coffee":19,"../System/MainMenuInput.coffee":6,"../System/MainMenuRenderer.coffee":7}],4:[function(require,module,exports){
var GraphicsManager, MissionCreateScene, Scene,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require("../../../vendor/iki-engine/src/Scene.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

MissionCreateScene = (function(_super) {
  __extends(MissionCreateScene, _super);

  function MissionCreateScene() {
    return MissionCreateScene.__super__.constructor.apply(this, arguments);
  }

  MissionCreateScene.prototype.init = function() {
    return this.renderer = GraphicsManager.renderer;
  };

  MissionCreateScene.prototype.activate = function() {
    this.renderer.ctx.fillStyle = "#000";
    this.renderer.ctx.fillRect(0, 0, this.renderer.width, this.renderer.height);
    return this.renderText("TODO: MissionCreateScene");
  };

  MissionCreateScene.prototype.renderText = function(text) {
    this.renderer.ctx.fillStyle = "#33B5E5";
    this.renderer.ctx.font = "14px Arial, sans-serif";
    this.renderer.ctx.textBaseline = "top";
    return this.renderer.ctx.fillText(text, 50, 50);
  };

  return MissionCreateScene;

})(Scene);

module.exports = MissionCreateScene;


},{"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":14,"../../../vendor/iki-engine/src/Scene.coffee":17}],5:[function(require,module,exports){
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
      x: (GraphicsManager.renderer.width / 2) - 94,
      y: (GraphicsManager.renderer.height / 2) - 22,
      width: 188,
      height: 22
    };
    this.bar.middle = this.bar.x + (this.bar.width / 2);
    this.renderer.ctx.fillStyle = "#000";
    this.renderer.ctx.fillRect(0, 0, this.renderer.width, this.renderer.height);
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
    this.renderer.ctx.fillRect(0, 0, this.renderer.width, this.renderer.height);
    this.renderer.ctx.fillStyle = "#ff4444";
    this.renderer.ctx.font = "14px Arial, sans-serif";
    this.renderer.ctx.textBaseline = "top";
    textSize = this.renderer.ctx.measureText(text);
    return this.renderer.ctx.fillText(text, this.bar.middle - (textSize.width / 2), this.bar.y + this.bar.height + 10);
  };

  PreLoadScene.prototype.onProgress = function(asset, group, loaded, total) {
    this.renderer.ctx.fillStyle = "#000";
    this.renderer.ctx.fillRect(0, 0, this.renderer.width, this.renderer.height);
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


},{"../../../vendor/iki-engine/src/Manager/AssetManager.coffee":11,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":14,"../../../vendor/iki-engine/src/Manager/SceneManager.coffee":16,"../../../vendor/iki-engine/src/Scene.coffee":17}],6:[function(require,module,exports){
var EntityManager, GraphicsManager, InputManager, MainMenuInputSystem, System, Util,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

System = require("../../../vendor/iki-engine/src/System.coffee");

Util = require("../../../vendor/iki-engine/src/Util.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

EntityManager = require("../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

InputManager = require("../../../vendor/iki-engine/src/Manager/InputManager.coffee");

MainMenuInputSystem = (function(_super) {
  __extends(MainMenuInputSystem, _super);

  function MainMenuInputSystem() {
    return MainMenuInputSystem.__super__.constructor.apply(this, arguments);
  }

  MainMenuInputSystem.prototype.init = function() {
    return InputManager.onMouseClick = this.onMouseClick.bind(this);
  };

  MainMenuInputSystem.prototype.onMouseClick = function(e) {
    var onClick;
    onClick = this.getButtonClickEventFromPoint(e.x, e.y);
    return typeof onClick === "function" ? onClick() : void 0;
  };

  MainMenuInputSystem.prototype.getButtonClickEventFromPoint = function(x, y) {
    var button, clickEvent, entities, entity, position, _i, _len;
    entities = EntityManager.getAllEntitiesWithComponentOfTypes(["UIClickEvent", "UIButton", "ScreenPosition"]);
    for (_i = 0, _len = entities.length; _i < _len; _i++) {
      entity = entities[_i];
      button = EntityManager.getComponentOfType(entity, "UIButton");
      position = EntityManager.getComponentOfType(entity, "ScreenPosition");
      clickEvent = EntityManager.getComponentOfType(entity, "UIClickEvent");
      if (this.mouseInButton(position, button, x, y)) {
        return clickEvent.onClick;
      }
    }
    return null;
  };

  MainMenuInputSystem.prototype.onUpdate = function(dt) {
    var button, entities, entity, position, state, _i, _len;
    entities = EntityManager.getAllEntitiesWithComponentOfTypes(["UIState", "UIButton", "ScreenPosition"]);
    for (_i = 0, _len = entities.length; _i < _len; _i++) {
      entity = entities[_i];
      button = EntityManager.getComponentOfType(entity, "UIButton");
      position = EntityManager.getComponentOfType(entity, "ScreenPosition");
      state = EntityManager.getComponentOfType(entity, "UIState");
      state.hover = this.mouseInButton(position, button);
      if (state.hover) {
        state.pressed = InputManager.mouse.down;
      } else {
        state.pressed = false;
      }
    }
    return null;
  };

  MainMenuInputSystem.prototype.mouseInButton = function(position, button, x, y) {
    if (x == null) {
      x = InputManager.mouse.x;
    }
    if (y == null) {
      y = InputManager.mouse.y;
    }
    return Util.isPointInRect(x, y, position.x, position.y, button.width, button.height);
  };

  return MainMenuInputSystem;

})(System);

module.exports = MainMenuInputSystem;


},{"../../../vendor/iki-engine/src/Manager/EntityManager.coffee":13,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":14,"../../../vendor/iki-engine/src/Manager/InputManager.coffee":15,"../../../vendor/iki-engine/src/System.coffee":18,"../../../vendor/iki-engine/src/Util.coffee":19}],7:[function(require,module,exports){
var EntityManager, GraphicsManager, MainMenuRendererSystem, System,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

System = require("../../../vendor/iki-engine/src/System.coffee");

GraphicsManager = require("../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee");

EntityManager = require("../../../vendor/iki-engine/src/Manager/EntityManager.coffee");

MainMenuRendererSystem = (function(_super) {
  __extends(MainMenuRendererSystem, _super);

  function MainMenuRendererSystem() {
    return MainMenuRendererSystem.__super__.constructor.apply(this, arguments);
  }

  MainMenuRendererSystem.prototype.THROTTLE_VALUE = 16;

  MainMenuRendererSystem.prototype.init = function(renderer) {
    this.renderer = renderer;
  };

  MainMenuRendererSystem.prototype.onUpdate = function() {
    TWEEN.update();
    this.drawBackground();
    return this.drawButtons();
  };

  MainMenuRendererSystem.prototype.drawBackground = function() {
    var background, entities, entity, _i, _len, _results;
    entities = EntityManager.getAllEntitiesWithComponentOfTypes(["UIBackground"]);
    _results = [];
    for (_i = 0, _len = entities.length; _i < _len; _i++) {
      entity = entities[_i];
      background = EntityManager.getComponentOfType(entity, "UIBackground");
      _results.push(GraphicsManager.fillImage(this.renderer.ctx, background.img, background.img.width, background.img.height, this.renderer.width, this.renderer.height));
    }
    return _results;
  };

  MainMenuRendererSystem.prototype.drawButtons = function() {
    var button, entities, entity, highlightColour, padding, position, primaryColour, shadowColour, state, text, textColour, textSize, _i, _j, _len, _len1, _results;
    entities = EntityManager.getAllEntitiesWithComponentOfTypes(["UIButton", "ScreenPosition"]);
    for (_i = 0, _len = entities.length; _i < _len; _i++) {
      entity = entities[_i];
      button = EntityManager.getComponentOfType(entity, "UIButton");
      position = EntityManager.getComponentOfType(entity, "ScreenPosition");
      state = EntityManager.getComponentOfType(entity, "UIState");
      primaryColour = button.colour;
      highlightColour = button.colour;
      textColour = "#fff";
      shadowColour = "rgba(0,0,0,0.7)";
      if (state.disabled) {
        primaryColour = button.colourDisabled;
        highlightColour = button.colourDisabled;
        textColour = "rgba(255,255,255,0.3)";
        shadowColour = "rgba(0,0,0,0.4)";
      } else if (state.pressed) {
        highlightColour = button.colourPressed;
        textColour = button.colourPressed;
      } else if (state.hover) {
        highlightColour = button.colourHover;
        textColour = button.colourHover;
      }
      this.renderer.ctx.fillStyle = primaryColour;
      padding = 3;
      GraphicsManager.roundedRectFill(this.renderer.ctx, position.x + padding, position.y + padding, button.width - padding - padding, button.height - padding - padding, 8);
      this.renderer.ctx.strokeStyle = highlightColour;
      this.renderer.ctx.lineWidth = 2;
      GraphicsManager.roundedRectStroke(this.renderer.ctx, position.x, position.y, button.width, button.height, 12);
      this.renderer.ctx.textBaseline = "top";
      this.renderer.ctx.font = "bold 14px Arial, sans-serif";
      textSize = this.renderer.ctx.measureText(button.text);
      this.renderer.ctx.lineWidth = 4;
      this.renderer.ctx.miterLimit = 1;
      this.renderer.ctx.strokeStyle = shadowColour;
      this.renderer.ctx.strokeText(button.text, position.x + (button.width / 2) - (textSize.width / 2), position.y + (button.height / 2) - 7);
      this.renderer.ctx.fillStyle = textColour;
      this.renderer.ctx.fillText(button.text, position.x + (button.width / 2) - (textSize.width / 2), position.y + (button.height / 2) - 7);
    }
    entities = EntityManager.getAllEntitiesWithComponentOfTypes(["UIText", "ScreenPosition"]);
    _results = [];
    for (_j = 0, _len1 = entities.length; _j < _len1; _j++) {
      entity = entities[_j];
      text = EntityManager.getComponentOfType(entity, "UIText");
      position = EntityManager.getComponentOfType(entity, "ScreenPosition");
      this.renderer.ctx.textBaseline = "top";
      this.renderer.ctx.font = text.font;
      textSize = this.renderer.ctx.measureText(text.text);
      this.renderer.ctx.fillStyle = "#fff";
      this.renderer.ctx.fillText(text.text, position.x - (textSize.width / 2), position.y);
      this.renderer.ctx.lineWidth = 3;
      this.renderer.ctx.miterLimit = 4;
      this.renderer.ctx.strokeStyle = "#000";
      _results.push(this.renderer.ctx.strokeText(text.text, position.x - (textSize.width / 2), position.y));
    }
    return _results;
  };

  return MainMenuRendererSystem;

})(System);

module.exports = MainMenuRendererSystem;


},{"../../../vendor/iki-engine/src/Manager/EntityManager.coffee":13,"../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee":14,"../../../vendor/iki-engine/src/System.coffee":18}],8:[function(require,module,exports){
var BootScene, Engine, game;

Engine = require("../../vendor/iki-engine/src/Engine.coffee");

BootScene = require("./Scene/Boot.coffee");

game = new Engine;

game.start(new BootScene);


},{"../../vendor/iki-engine/src/Engine.coffee":9,"./Scene/Boot.coffee":1}],9:[function(require,module,exports){
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


},{"./Manager/SceneManager.coffee":16}],10:[function(require,module,exports){
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


},{"../vendor/node-uuid/uuid.js":20}],11:[function(require,module,exports){
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


},{"../Util.coffee":19}],12:[function(require,module,exports){
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


},{}],13:[function(require,module,exports){
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


},{"../../vendor/node-uuid/uuid.js":20,"../Entity.coffee":10}],14:[function(require,module,exports){
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


},{}],15:[function(require,module,exports){
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
    element.addEventListener("keyup", InputManager.keyUp);
    return element.addEventListener("keydown", InputManager.keyDown);
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


},{}],16:[function(require,module,exports){
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


},{}],17:[function(require,module,exports){
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


},{}],18:[function(require,module,exports){
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


},{}],19:[function(require,module,exports){
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


},{}],20:[function(require,module,exports){
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
},{"buffer":21,"crypto":25}],21:[function(require,module,exports){
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

},{"base64-js":22,"ieee754":23}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{"buffer":21}],25:[function(require,module,exports){
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

},{"./md5":26,"./rng":27,"./sha":28,"./sha256":29,"buffer":21}],26:[function(require,module,exports){
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

},{"./helpers":24}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{"./helpers":24}],29:[function(require,module,exports){

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

},{"./helpers":24}]},{},[8])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxnYW1lXFxTY2VuZVxcQm9vdC5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZ2FtZVxcU2NlbmVcXENyZWRpdHMuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFxjb2ZmZWVcXGdhbWVcXFNjZW5lXFxNYWluTWVudS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZ2FtZVxcU2NlbmVcXE1pc3Npb25DcmVhdGUuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFxjb2ZmZWVcXGdhbWVcXFNjZW5lXFxQcmVMb2FkLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcY29mZmVlXFxnYW1lXFxTeXN0ZW1cXE1haW5NZW51SW5wdXQuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFxjb2ZmZWVcXGdhbWVcXFN5c3RlbVxcTWFpbk1lbnVSZW5kZXJlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXGNvZmZlZVxcZ2FtZVxcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxFbmdpbmUuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcRW50aXR5LmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXEFzc2V0TWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxNYW5hZ2VyXFxBdWRpb01hbmFnZXIuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcRW50aXR5TWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxNYW5hZ2VyXFxHcmFwaGljc01hbmFnZXIuY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcTWFuYWdlclxcSW5wdXRNYW5hZ2VyLmNvZmZlZSIsIkM6XFx3d3dcXG1lcmNlbmFyeS1zdHJpa2UtZm9yY2VcXGRvY3Jvb3RcXGFzc2V0c1xcdmVuZG9yXFxpa2ktZW5naW5lXFxzcmNcXE1hbmFnZXJcXFNjZW5lTWFuYWdlci5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxTY2VuZS5jb2ZmZWUiLCJDOlxcd3d3XFxtZXJjZW5hcnktc3RyaWtlLWZvcmNlXFxkb2Nyb290XFxhc3NldHNcXHZlbmRvclxcaWtpLWVuZ2luZVxcc3JjXFxTeXN0ZW0uY29mZmVlIiwiQzpcXHd3d1xcbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZVxcZG9jcm9vdFxcYXNzZXRzXFx2ZW5kb3JcXGlraS1lbmdpbmVcXHNyY1xcVXRpbC5jb2ZmZWUiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9kb2Nyb290L2Fzc2V0cy92ZW5kb3IvaWtpLWVuZ2luZS92ZW5kb3Ivbm9kZS11dWlkL3V1aWQuanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwiQzovd3d3L21lcmNlbmFyeS1zdHJpa2UtZm9yY2Uvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYi9iNjQuanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwiQzovd3d3L21lcmNlbmFyeS1zdHJpa2UtZm9yY2Uvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L2hlbHBlcnMuanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvaW5kZXguanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvbWQ1LmpzIiwiQzovd3d3L21lcmNlbmFyeS1zdHJpa2UtZm9yY2Uvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3JuZy5qcyIsIkM6L3d3dy9tZXJjZW5hcnktc3RyaWtlLWZvcmNlL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEuanMiLCJDOi93d3cvbWVyY2VuYXJ5LXN0cmlrZS1mb3JjZS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvc2hhMjU2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSwwSUFBQTtFQUFBO2lTQUFBOztBQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsNkNBQVIsQ0FBUixDQUFBOztBQUFBLFlBQ0EsR0FBZSxPQUFBLENBQVEsNERBQVIsQ0FEZixDQUFBOztBQUFBLGVBRUEsR0FBa0IsT0FBQSxDQUFRLCtEQUFSLENBRmxCLENBQUE7O0FBQUEsWUFHQSxHQUFlLE9BQUEsQ0FBUSw0REFBUixDQUhmLENBQUE7O0FBQUEsWUFJQSxHQUFlLE9BQUEsQ0FBUSw0REFBUixDQUpmLENBQUE7O0FBQUEsWUFRQSxHQUFlLE9BQUEsQ0FBUSxrQkFBUixDQVJmLENBQUE7O0FBQUEsYUFTQSxHQUFnQixPQUFBLENBQVEsbUJBQVIsQ0FUaEIsQ0FBQTs7QUFBQSxZQVVBLEdBQWUsT0FBQSxDQUFRLGtCQUFSLENBVmYsQ0FBQTs7QUFBQSxrQkFXQSxHQUFxQixPQUFBLENBQVEsd0JBQVIsQ0FYckIsQ0FBQTs7QUFBQTtBQWVJLDhCQUFBLENBQUE7Ozs7R0FBQTs7QUFBQSxzQkFBQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBRUYsUUFBQSw2REFBQTtBQUFBLElBQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFULENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsR0FEVixDQUFBO0FBQUEsSUFFQSxlQUFlLENBQUMsUUFBaEIsR0FBMkIsZUFBZSxDQUFDLGNBQWhCLENBQStCLElBQUMsQ0FBQSxL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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2bENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiU2NlbmUgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1NjZW5lLmNvZmZlZVwiXG5TY2VuZU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvU2NlbmVNYW5hZ2VyLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5JbnB1dE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvSW5wdXRNYW5hZ2VyLmNvZmZlZVwiXG5Bc3NldE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvQXNzZXRNYW5hZ2VyLmNvZmZlZVwiXG5cblxuIyBTY2VuZXNcblByZUxvYWRTY2VuZSA9IHJlcXVpcmUgXCIuL1ByZUxvYWQuY29mZmVlXCJcbk1haW5NZW51U2NlbmUgPSByZXF1aXJlIFwiLi9NYWluTWVudS5jb2ZmZWVcIlxuQ3JlZGl0c1NjZW5lID0gcmVxdWlyZSBcIi4vQ3JlZGl0cy5jb2ZmZWVcIlxuTWlzc2lvbkNyZWF0ZVNjZW5lID0gcmVxdWlyZSBcIi4vTWlzc2lvbkNyZWF0ZS5jb2ZmZWVcIlxuXG5cbmNsYXNzIEJvb3RTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgaW5pdDogLT5cbiAgICAgICAgIyBVc2UgR3JhcGhpY3NNYW5hZ2VyIHRvIGNyZWF0ZSBtYWluIGNhbnZhc1xuICAgICAgICBAd2lkdGggPSAxMjgwXG4gICAgICAgIEBoZWlnaHQgPSA3MjBcbiAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyID0gR3JhcGhpY3NNYW5hZ2VyLmNyZWF0ZVJlbmRlcmVyIEB3aWR0aCwgQGhlaWdodCwgZG9jdW1lbnQuYm9keVxuICAgICAgICBAc2l6ZUNhbnZhcygpXG5cbiAgICAgICAgSW5wdXRNYW5hZ2VyLmluaXQgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhc1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwicmVzaXplXCIsIEBzaXplQ2FudmFzLmJpbmQgQFxuXG4gICAgICAgICMgU2V0IHVwIHRoZSBzY2VuZXNcbiAgICAgICAgcHJlTG9hZFNjZW5lID0gbmV3IFByZUxvYWRTY2VuZSgpXG4gICAgICAgIFNjZW5lTWFuYWdlci5hZGQgXCJwcmVsb2FkXCIsIHByZUxvYWRTY2VuZVxuICAgICAgICBwcmVMb2FkU2NlbmUuaW5pdCgpXG5cbiAgICAgICAgbWFpbk1lbnVTY2VuZSA9IG5ldyBNYWluTWVudVNjZW5lKClcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFkZCBcIm1haW4tbWVudVwiLCBtYWluTWVudVNjZW5lXG4gICAgICAgIG1haW5NZW51U2NlbmUuaW5pdCgpXG5cbiAgICAgICAgY3JlZGl0c1NjZW5lID0gbmV3IENyZWRpdHNTY2VuZSgpXG4gICAgICAgIFNjZW5lTWFuYWdlci5hZGQgXCJjcmVkaXRzXCIsIGNyZWRpdHNTY2VuZVxuICAgICAgICBjcmVkaXRzU2NlbmUuaW5pdCgpXG5cbiAgICAgICAgbWlzc2lvbkNyZWF0ZVNjZW5lID0gbmV3IE1pc3Npb25DcmVhdGVTY2VuZSgpXG4gICAgICAgIFNjZW5lTWFuYWdlci5hZGQgXCJtaXNzaW9uLWNyZWF0ZVwiLCBtaXNzaW9uQ3JlYXRlU2NlbmVcbiAgICAgICAgbWlzc2lvbkNyZWF0ZVNjZW5lLmluaXQoKVxuXG5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICAgICAgbG9hZEFzc2V0ID0gQXNzZXRNYW5hZ2VyLmxvYWQgXCJhc3NldHMvYXNzZXRzLWJvb3QuanNvblwiXG4gICAgICAgIGxvYWRBc3NldC50aGVuIC0+IFNjZW5lTWFuYWdlci5hY3RpdmF0ZSBcInByZWxvYWRcIlxuXG5cbiAgICBzaXplQ2FudmFzOiAtPlxuICAgICAgICBnYW1lV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBnYW1lSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIHNjYWxlVG9GaXRYID0gZ2FtZVdpZHRoIC8gQHdpZHRoXG4gICAgICAgIHNjYWxlVG9GaXRZID0gZ2FtZUhlaWdodCAvIEBoZWlnaHRcblxuICAgICAgICBjdXJyZW50U2NyZWVuUmF0aW8gPSBnYW1lV2lkdGggLyBnYW1lSGVpZ2h0XG4gICAgICAgIG9wdGltYWxSYXRpbyA9IE1hdGgubWluIHNjYWxlVG9GaXRYLCBzY2FsZVRvRml0WVxuXG4gICAgICAgIGlmIGN1cnJlbnRTY3JlZW5SYXRpbyA+PSAxLjc3ICYmIGN1cnJlbnRTY3JlZW5SYXRpbyA8PSAxLjc5XG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLnN0eWxlLndpZHRoID0gZ2FtZVdpZHRoICsgXCJweFwiXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLnN0eWxlLmhlaWdodCA9IGdhbWVIZWlnaHQgKyBcInB4XCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5zdHlsZS53aWR0aCA9IEB3aWR0aCAqIG9wdGltYWxSYXRpbyArIFwicHhcIlxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSBAaGVpZ2h0ICogb3B0aW1hbFJhdGlvICsgXCJweFwiXG5cbiAgICAgICAgSW5wdXRNYW5hZ2VyLk1PVVNFX1RSQU5TRk9STV9SRUNUID0gR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBJbnB1dE1hbmFnZXIuTU9VU0VfVFJBTlNGT1JNX1dJRFRIID0gR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmNhbnZhcy53aWR0aFxuICAgICAgICBJbnB1dE1hbmFnZXIuTU9VU0VfVFJBTlNGT1JNX0hFSUdIVCA9IEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMuaGVpZ2h0XG4gICAgICAgIElucHV0TWFuYWdlci5NT1VTRV9PRkZTRVRfWCA9IEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlci5jYW52YXMub2Zmc2V0TGVmdFxuICAgICAgICBJbnB1dE1hbmFnZXIuTU9VU0VfT0ZGU0VUX1kgPSBHcmFwaGljc01hbmFnZXIucmVuZGVyZXIuY2FudmFzLm9mZnNldFRvcFxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvb3RTY2VuZSIsIlNjZW5lID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TY2VuZS5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuXG5cbmNsYXNzIENyZWRpdHNTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgaW5pdDogLT5cbiAgICAgICAgQHJlbmRlcmVyID0gR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyXG5cblxuICAgIGFjdGl2YXRlOiAtPlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiXG4gICAgICAgIEByZW5kZXJlci5jdHguZmlsbFJlY3QgMCwgMCwgQHJlbmRlcmVyLndpZHRoLCBAcmVuZGVyZXIuaGVpZ2h0XG5cbiAgICAgICAgQHJlbmRlclRleHQgXCJUT0RPOiBDcmVkaXRzXCJcblxuXG4gICAgcmVuZGVyVGV4dDogKHRleHQpIC0+XG4gICAgICAgIEByZW5kZXJlci5jdHguZmlsbFN0eWxlID0gXCIjMzNCNUU1XCJcbiAgICAgICAgQHJlbmRlcmVyLmN0eC5mb250ID0gXCIxNHB4IEFyaWFsLCBzYW5zLXNlcmlmXCJcbiAgICAgICAgQHJlbmRlcmVyLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiXG4gICAgICAgIEByZW5kZXJlci5jdHguZmlsbFRleHQgdGV4dCwgNTAsIDUwXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IENyZWRpdHNTY2VuZSIsIlNjZW5lID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TY2VuZS5jb2ZmZWVcIlxuVXRpbCA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvVXRpbC5jb2ZmZWVcIlxuU2NlbmVNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL1NjZW5lTWFuYWdlci5jb2ZmZWVcIlxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuSW5wdXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0lucHV0TWFuYWdlci5jb2ZmZWVcIlxuQXVkaW9NYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0F1ZGlvTWFuYWdlci5jb2ZmZWVcIlxuQXNzZXRNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0Fzc2V0TWFuYWdlci5jb2ZmZWVcIlxuRW50aXR5TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9FbnRpdHlNYW5hZ2VyLmNvZmZlZVwiXG5cbiMgU3lzdGVtc1xuTWFpbk1lbnVJbnB1dFN5c3RlbSA9IHJlcXVpcmUgXCIuLi9TeXN0ZW0vTWFpbk1lbnVJbnB1dC5jb2ZmZWVcIlxuTWFpbk1lbnVSZW5kZXJlclN5c3RlbSA9IHJlcXVpcmUgXCIuLi9TeXN0ZW0vTWFpbk1lbnVSZW5kZXJlci5jb2ZmZWVcIlxuXG5cbmNsYXNzIE1haW5NZW51U2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGluaXQ6IC0+XG4gICAgICAgIEByZW5kZXJlciA9IEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlclxuXG4gICAgICAgIEF1ZGlvTWFuYWdlci5sb2FkIFwibWVudS1zZWxlY3RcIiwgXCIvYXNzZXRzL3NvdW5kL1VJIHBhY2sgMS9NRU5VIEJfU2VsZWN0LndhdlwiXG4gICAgICAgIEF1ZGlvTWFuYWdlci5sb2FkIFwibWVudS1iYWNrXCIsIFwiL2Fzc2V0cy9zb3VuZC9VSSBwYWNrIDEvTUVOVSBCX0JhY2sud2F2XCJcblxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIGlucHV0ID0gQGFkZFN5c3RlbSBuZXcgTWFpbk1lbnVJbnB1dFN5c3RlbVxuICAgICAgICBpbnB1dC5pbml0KClcblxuICAgICAgICBnZnggPSBAYWRkU3lzdGVtIG5ldyBNYWluTWVudVJlbmRlcmVyU3lzdGVtXG4gICAgICAgIGdmeC5pbml0IEByZW5kZXJlclxuXG4gICAgICAgIEBjdXJyZW50TWVudSA9IFwibWFpbi1tZW51XCJcbiAgICAgICAgQGxvYWRNZW51IFwiL2Fzc2V0cy9tZW51LyN7QGN1cnJlbnRNZW51fS5qc29uXCJcblxuXG4gICAgZGVhY3RpdmF0ZTogLT5cbiAgICAgICAgSW5wdXRNYW5hZ2VyLm9uTW91c2VDbGljayA9IG51bGxcbiAgICAgICAgRW50aXR5TWFuYWdlci5kZWxldGVBbGxFbnRpdGllcygpXG5cblxuICAgIGxvYWRNZW51OiAobWVudUZpbGUpIC0+XG4gICAgICAgIG1hcCA9IFV0aWwubG9hZEpTT04gbWVudUZpbGVcbiAgICAgICAgbWFwLnRoZW4gQHBhcnNlTWVudS5iaW5kIEBcblxuXG4gICAgcGFyc2VNZW51OiAobWVudURhdGEpIC0+XG4gICAgICAgIGZvciBlbGVtZW50IGluIG1lbnVEYXRhLmVsZW1lbnRzXG4gICAgICAgICAgICBpZiBlbGVtZW50LnR5cGUgPT0gXCJiYWNrZ3JvdW5kXCIgdGhlbiBAYWRkQmFja2dyb3VuZCBtZW51RGF0YS5pZCwgZWxlbWVudFxuICAgICAgICAgICAgaWYgZWxlbWVudC50eXBlID09IFwiYnV0dG9uXCIgdGhlbiBAYWRkQnV0dG9uIG1lbnVEYXRhLmlkLCBlbGVtZW50XG4gICAgICAgICAgICBpZiBlbGVtZW50LnR5cGUgPT0gXCJ0ZXh0XCIgdGhlbiBAYWRkVGV4dCBtZW51RGF0YS5pZCwgZWxlbWVudFxuXG5cbiAgICBhZGRCYWNrZ3JvdW5kOiAobWVudSwgYmcpIC0+XG4gICAgICAgIGJhY2tncm91bmQgPSBFbnRpdHlNYW5hZ2VyLmNyZWF0ZUVudGl0eSgpXG5cbiAgICAgICAgRW50aXR5TWFuYWdlci5hZGRDb21wb25lbnQgYmFja2dyb3VuZCwge1xuICAgICAgICAgICAgdHlwZTogXCJVSUJhY2tncm91bmRcIlxuICAgICAgICAgICAgaW1nOiBBc3NldE1hbmFnZXIuZ2V0IGJnLnNyY1xuICAgICAgICB9XG5cblxuICAgIGFkZFRleHQ6IChtZW51LCB0eHQpIC0+XG4gICAgICAgIHRleHQgPSBFbnRpdHlNYW5hZ2VyLmNyZWF0ZUVudGl0eSgpXG5cbiAgICAgICAgRW50aXR5TWFuYWdlci5hZGRDb21wb25lbnQgdGV4dCwge1xuICAgICAgICAgICAgdHlwZTogXCJVSVRleHRcIlxuICAgICAgICAgICAgdGV4dDogdHh0LnRleHRcbiAgICAgICAgICAgIGZvbnQ6IHR4dC5mb250XG4gICAgICAgIH1cblxuICAgICAgICBFbnRpdHlNYW5hZ2VyLmFkZENvbXBvbmVudCB0ZXh0LCB7XG4gICAgICAgICAgICB0eXBlOiBcIlNjcmVlblBvc2l0aW9uXCJcbiAgICAgICAgICAgIHg6IChAcmVuZGVyZXIud2lkdGggLyAyKVxuICAgICAgICAgICAgeTogdHh0LnlcbiAgICAgICAgfVxuXG5cbiAgICBhZGRCdXR0b246IChtZW51LCBidG4pIC0+XG4gICAgICAgIGJ1dHRvbiA9IEVudGl0eU1hbmFnZXIuY3JlYXRlRW50aXR5KClcblxuICAgICAgICBFbnRpdHlNYW5hZ2VyLmFkZENvbXBvbmVudCBidXR0b24sIHtcbiAgICAgICAgICAgIHR5cGU6IFwiVUlCdXR0b25cIlxuICAgICAgICAgICAgd2lkdGg6IGJ0bi53aWR0aFxuICAgICAgICAgICAgaGVpZ2h0OiBidG4uaGVpZ2h0XG4gICAgICAgICAgICBjb2xvdXI6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjUpXCJcbiAgICAgICAgICAgIGNvbG91ckhvdmVyOiBcIiNmYjNcIlxuICAgICAgICAgICAgY29sb3VyUHJlc3NlZDogXCIjMzNiNWU1XCJcbiAgICAgICAgICAgIGNvbG91ckRpc2FibGVkOiBcInJnYmEoMjU1LDI1NSwyNTUsMC4xKVwiXG4gICAgICAgICAgICB0ZXh0OiBidG4udGV4dFxuICAgICAgICB9XG4gICAgICAgIEVudGl0eU1hbmFnZXIuYWRkQ29tcG9uZW50IGJ1dHRvbiwge1xuICAgICAgICAgICAgdHlwZTogXCJTY3JlZW5Qb3NpdGlvblwiXG4gICAgICAgICAgICB4OiAtMzUwXG4gICAgICAgICAgICB5OiBidG4ueVxuICAgICAgICB9XG4gICAgICAgIEVudGl0eU1hbmFnZXIuYWRkQ29tcG9uZW50IGJ1dHRvbiwge1xuICAgICAgICAgICAgdHlwZTogXCJVSVN0YXRlXCJcbiAgICAgICAgICAgIGhvdmVyOiBmYWxzZVxuICAgICAgICAgICAgZGlzYWJsZWQ6IGJ0bi5kaXNhYmxlZFxuICAgICAgICAgICAgcHJlc3NlZDogZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIGJ0bi5hY3Rpb25UeXBlID09IFwic3dpdGNoTWVudVwiXG4gICAgICAgICAgICBFbnRpdHlNYW5hZ2VyLmFkZENvbXBvbmVudCBidXR0b24sIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlVJQ2xpY2tFdmVudFwiXG4gICAgICAgICAgICAgICAgb25DbGljazogQHN3aXRjaE1lbnUuYmluZCBALCBidG4uYWN0aW9uLCBidG4uaXNCYWNrXG4gICAgICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgYnRuLmFjdGlvblR5cGUgPT0gXCJzd2l0Y2hTY2VuZVwiXG4gICAgICAgICAgICBFbnRpdHlNYW5hZ2VyLmFkZENvbXBvbmVudCBidXR0b24sIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlVJQ2xpY2tFdmVudFwiXG4gICAgICAgICAgICAgICAgb25DbGljazogQHN3aXRjaFNjZW5lLmJpbmQgQCwgYnRuLmFjdGlvbiwgYnRuLmlzQmFja1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIHR3ZWVuID0gQHR3ZWVuRm9yQnV0dG9ucyBcImluXCJcbiAgICAgICAgdHdlZW4uc3RhcnQoKVxuXG5cbiAgICBzd2l0Y2hNZW51OiAobmV3TWVudSwgaXNCYWNrID0gZmFsc2UpIC0+XG4gICAgICAgIHNvdW5kID0gaWYgaXNCYWNrIHRoZW4gXCJtZW51LWJhY2tcIiBlbHNlIFwibWVudS1zZWxlY3RcIlxuICAgICAgICBBdWRpb01hbmFnZXIucGxheSBzb3VuZFxuICAgICAgICBAY3VycmVudE1lbnUgPSBuZXdNZW51XG5cbiAgICAgICAgZGlyZWN0aW9uID0gaWYgaXNCYWNrIHRoZW4gXCJvdXQtbGVmdFwiIGVsc2UgXCJvdXQtcmlnaHRcIlxuICAgICAgICB0d2VlbiA9IEB0d2VlbkZvckJ1dHRvbnMgZGlyZWN0aW9uXG4gICAgICAgIHR3ZWVuLm9uQ29tcGxldGUgPT5cbiAgICAgICAgICAgIEVudGl0eU1hbmFnZXIuZGVsZXRlQWxsRW50aXRpZXMoKVxuICAgICAgICAgICAgQGxvYWRNZW51IFwiL2Fzc2V0cy9tZW51LyN7QGN1cnJlbnRNZW51fS5qc29uXCJcbiAgICAgICAgdHdlZW4uc3RhcnQoKVxuXG5cbiAgICB0d2VlbkZvckJ1dHRvbnM6IChkaXJlY3Rpb24pIC0+XG4gICAgICAgIGNlbnRlciA9IChAcmVuZGVyZXIud2lkdGggLyAyKSAtIDE1MFxuICAgICAgICByaWdodFNjcmVlbiA9IEByZW5kZXJlci53aWR0aCArIDUwXG5cbiAgICAgICAgaWYgZGlyZWN0aW9uID09IFwib3V0LWxlZnRcIlxuICAgICAgICAgICAgZnJvbSA9IHt4OiBjZW50ZXJ9XG4gICAgICAgICAgICB0byA9IHt4OiAtMzUwfVxuICAgICAgICBlbHNlIGlmIGRpcmVjdGlvbiA9PSBcIm91dC1yaWdodFwiXG4gICAgICAgICAgICBmcm9tID0ge3g6IGNlbnRlcn1cbiAgICAgICAgICAgIHRvID0ge3g6IHJpZ2h0U2NyZWVufVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBmcm9tID0ge3g6IC0zNTB9XG4gICAgICAgICAgICB0byA9IHt4OiBjZW50ZXJ9XG5cbiAgICAgICAgYnV0dG9ucyA9IEVudGl0eU1hbmFnZXIuZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlcyBbXCJVSUJ1dHRvblwiLCBcIlNjcmVlblBvc2l0aW9uXCJdXG5cbiAgICAgICAgcG9zaXRpb25zID0gZm9yIGJ1dHRvbiBpbiBidXR0b25zXG4gICAgICAgICAgICBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBidXR0b24sIFwiU2NyZWVuUG9zaXRpb25cIlxuXG4gICAgICAgIHR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuIGZyb21cbiAgICAgICAgdHdlZW4udG8gdG8sIDUwMFxuICAgICAgICB0d2Vlbi5lYXNpbmcgVFdFRU4uRWFzaW5nLkN1YmljLk91dFxuICAgICAgICB0d2Vlbi5vblVwZGF0ZSAtPiBwb3NpdGlvbi54ID0gQHggZm9yIHBvc2l0aW9uIGluIHBvc2l0aW9uc1xuXG4gICAgICAgIHJldHVybiB0d2VlblxuXG5cbiAgICBzd2l0Y2hTY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBBdWRpb01hbmFnZXIucGxheSBcIm1lbnUtc2VsZWN0XCJcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFjdGl2YXRlIHNjZW5lXG5cblxubW9kdWxlLmV4cG9ydHMgPSBNYWluTWVudVNjZW5lIiwiU2NlbmUgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1NjZW5lLmNvZmZlZVwiXG5HcmFwaGljc01hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvR3JhcGhpY3NNYW5hZ2VyLmNvZmZlZVwiXG5cblxuY2xhc3MgTWlzc2lvbkNyZWF0ZVNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBpbml0OiAtPlxuICAgICAgICBAcmVuZGVyZXIgPSBHcmFwaGljc01hbmFnZXIucmVuZGVyZXJcblxuXG4gICAgYWN0aXZhdGU6IC0+XG4gICAgICAgIEByZW5kZXJlci5jdHguZmlsbFN0eWxlID0gXCIjMDAwXCJcbiAgICAgICAgQHJlbmRlcmVyLmN0eC5maWxsUmVjdCAwLCAwLCBAcmVuZGVyZXIud2lkdGgsIEByZW5kZXJlci5oZWlnaHRcblxuICAgICAgICBAcmVuZGVyVGV4dCBcIlRPRE86IE1pc3Npb25DcmVhdGVTY2VuZVwiXG5cblxuICAgIHJlbmRlclRleHQ6ICh0ZXh0KSAtPlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiIzMzQjVFNVwiXG4gICAgICAgIEByZW5kZXJlci5jdHguZm9udCA9IFwiMTRweCBBcmlhbCwgc2Fucy1zZXJpZlwiXG4gICAgICAgIEByZW5kZXJlci5jdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxUZXh0IHRleHQsIDUwLCA1MFxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBNaXNzaW9uQ3JlYXRlU2NlbmUiLCJTY2VuZSA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU2NlbmUuY29mZmVlXCJcblNjZW5lTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9TY2VuZU1hbmFnZXIuY29mZmVlXCJcbkdyYXBoaWNzTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9HcmFwaGljc01hbmFnZXIuY29mZmVlXCJcbkFzc2V0TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9Bc3NldE1hbmFnZXIuY29mZmVlXCJcblxuXG5jbGFzcyBQcmVMb2FkU2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGluaXQ6IC0+XG4gICAgICAgIEByZW5kZXJlciA9IEdyYXBoaWNzTWFuYWdlci5yZW5kZXJlclxuXG5cbiAgICBhY3RpdmF0ZTogLT5cbiAgICAgICAgQGJhciA9XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBBc3NldE1hbmFnZXIuZ2V0IFwiaW1nL3VpL2xvYWRpbmctYmFyLWJnLnBuZ1wiXG4gICAgICAgICAgICBmaWxsOiBBc3NldE1hbmFnZXIuZ2V0IFwiaW1nL3VpL2xvYWRpbmctYmFyLWZpbGwucG5nXCJcbiAgICAgICAgICAgIHg6IChHcmFwaGljc01hbmFnZXIucmVuZGVyZXIud2lkdGggLyAyKSAtIDk0XG4gICAgICAgICAgICB5OiAoR3JhcGhpY3NNYW5hZ2VyLnJlbmRlcmVyLmhlaWdodCAvIDIpIC0gMjJcbiAgICAgICAgICAgIHdpZHRoOiAxODhcbiAgICAgICAgICAgIGhlaWdodDogMjJcblxuICAgICAgICBAYmFyLm1pZGRsZSA9IEBiYXIueCArIChAYmFyLndpZHRoIC8gMilcblxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiXG4gICAgICAgIEByZW5kZXJlci5jdHguZmlsbFJlY3QgMCwgMCwgQHJlbmRlcmVyLndpZHRoLCBAcmVuZGVyZXIuaGVpZ2h0XG5cbiAgICAgICAgQHJlbmRlckxvYWRpbmdCYXIgMFxuICAgICAgICBAcmVuZGVyTG9hZGluZ1RleHQgXCJMb2FkaW5nLi4uXCJcblxuICAgICAgICBBc3NldE1hbmFnZXIub25CZWZvcmVMb2FkID0gQG9uUHJvZ3Jlc3MuYmluZCBAXG4gICAgICAgIEFzc2V0TWFuYWdlci5vblByb2dyZXNzID0gQG9uUHJvZ3Jlc3MuYmluZCBAXG4gICAgICAgIEFzc2V0TWFuYWdlci5vbkVycm9yID0gQG9uRXJyb3IuYmluZCBAXG5cbiAgICAgICAgbG9hZEFzc2V0ID0gQXNzZXRNYW5hZ2VyLmxvYWQgXCJhc3NldHMvYXNzZXRzLWdhbWUuanNvblwiXG4gICAgICAgIGxvYWRBc3NldC50aGVuIC0+IFNjZW5lTWFuYWdlci5hY3RpdmF0ZSBcIm1haW4tbWVudVwiXG5cblxuICAgIG9uRXJyb3I6IChhc3NldCkgLT5cbiAgICAgICAgdGV4dCA9IFwiRXJyb3IgbG9hZGluZyAje2Fzc2V0LmZpbGV9XCJcbiAgICAgICAgQHJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiMwMDBcIlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxSZWN0IDAsIDAsIEByZW5kZXJlci53aWR0aCwgQHJlbmRlcmVyLmhlaWdodFxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiI2ZmNDQ0NFwiXG4gICAgICAgIEByZW5kZXJlci5jdHguZm9udCA9IFwiMTRweCBBcmlhbCwgc2Fucy1zZXJpZlwiXG4gICAgICAgIEByZW5kZXJlci5jdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIlxuICAgICAgICB0ZXh0U2l6ZSA9IEByZW5kZXJlci5jdHgubWVhc3VyZVRleHQgdGV4dFxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxUZXh0IHRleHQsIEBiYXIubWlkZGxlIC0gKHRleHRTaXplLndpZHRoIC8gMiksIEBiYXIueSArIEBiYXIuaGVpZ2h0ICsgMTBcblxuXG4gICAgb25Qcm9ncmVzczogKGFzc2V0LCBncm91cCwgbG9hZGVkLCB0b3RhbCkgLT5cbiAgICAgICAgQHJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBcIiMwMDBcIlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxSZWN0IDAsIDAsIEByZW5kZXJlci53aWR0aCwgQHJlbmRlcmVyLmhlaWdodFxuICAgICAgICBAcmVuZGVyTG9hZGluZ1RleHQgXCJMb2FkaW5nICN7Z3JvdXB9XCJcbiAgICAgICAgQHJlbmRlckxvYWRpbmdCYXIgbG9hZGVkIC8gdG90YWxcblxuXG4gICAgcmVuZGVyTG9hZGluZ1RleHQ6ICh0ZXh0KSAtPlxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IFwiIzMzQjVFNVwiXG4gICAgICAgIEByZW5kZXJlci5jdHguZm9udCA9IFwiMTRweCBBcmlhbCwgc2Fucy1zZXJpZlwiXG4gICAgICAgIEByZW5kZXJlci5jdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIlxuICAgICAgICB0ZXh0U2l6ZSA9IEByZW5kZXJlci5jdHgubWVhc3VyZVRleHQgdGV4dFxuICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxUZXh0IHRleHQsIEBiYXIubWlkZGxlIC0gKHRleHRTaXplLndpZHRoIC8gMiksIEBiYXIueSArIEBiYXIuaGVpZ2h0ICsgMTBcblxuXG4gICAgIyBUT0RPOiBHbG93IG9uIGJhciBhcHBlYXJzIHRvbyBicmlnaHRcbiAgICByZW5kZXJMb2FkaW5nQmFyOiAocGVyY2VudCkgLT5cbiAgICAgICAgIyBSZW5kZXIgYmFja2dyb3VuZFxuICAgICAgICBAcmVuZGVyZXIuY3R4LmRyYXdJbWFnZSBAYmFyLmJhY2tncm91bmQsIEBiYXIueCwgQGJhci55XG4gICAgICAgIEByZW5kZXJlci5jdHguZHJhd0ltYWdlIEBiYXIuZmlsbCxcbiAgICAgICAgICAgICAgICBAYmFyLnggKyA2LCBAYmFyLnksXG4gICAgICAgICAgICAgICAgKEBiYXIud2lkdGggLSAxMikgKiBwZXJjZW50LCBAYmFyLmhlaWdodFxuXG5cbm1vZHVsZS5leHBvcnRzID0gUHJlTG9hZFNjZW5lIiwiU3lzdGVtID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9TeXN0ZW0uY29mZmVlXCJcblV0aWwgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL1V0aWwuY29mZmVlXCJcblxuR3JhcGhpY3NNYW5hZ2VyID0gcmVxdWlyZSBcIi4uLy4uLy4uL3ZlbmRvci9pa2ktZW5naW5lL3NyYy9NYW5hZ2VyL0dyYXBoaWNzTWFuYWdlci5jb2ZmZWVcIlxuRW50aXR5TWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9FbnRpdHlNYW5hZ2VyLmNvZmZlZVwiXG5JbnB1dE1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvSW5wdXRNYW5hZ2VyLmNvZmZlZVwiXG5cbmNsYXNzIE1haW5NZW51SW5wdXRTeXN0ZW0gZXh0ZW5kcyBTeXN0ZW1cbiAgICBpbml0OiAtPlxuICAgICAgICBJbnB1dE1hbmFnZXIub25Nb3VzZUNsaWNrID0gQG9uTW91c2VDbGljay5iaW5kIEBcblxuICAgIG9uTW91c2VDbGljazogKGUpIC0+XG4gICAgICAgIG9uQ2xpY2sgPSBAZ2V0QnV0dG9uQ2xpY2tFdmVudEZyb21Qb2ludCBlLngsIGUueVxuICAgICAgICBvbkNsaWNrPygpXG5cbiAgICBnZXRCdXR0b25DbGlja0V2ZW50RnJvbVBvaW50OiAoeCwgeSkgLT5cbiAgICAgICAgZW50aXRpZXMgPSBFbnRpdHlNYW5hZ2VyLmdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZXMgW1wiVUlDbGlja0V2ZW50XCIsIFwiVUlCdXR0b25cIiwgXCJTY3JlZW5Qb3NpdGlvblwiXVxuXG4gICAgICAgIGZvciBlbnRpdHkgaW4gZW50aXRpZXNcbiAgICAgICAgICAgIGJ1dHRvbiA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJVSUJ1dHRvblwiXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJTY3JlZW5Qb3NpdGlvblwiXG4gICAgICAgICAgICBjbGlja0V2ZW50ID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlVJQ2xpY2tFdmVudFwiXG5cbiAgICAgICAgICAgIGlmIEBtb3VzZUluQnV0dG9uIHBvc2l0aW9uLCBidXR0b24sIHgsIHkgdGhlbiByZXR1cm4gY2xpY2tFdmVudC5vbkNsaWNrXG5cbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgIG9uVXBkYXRlOiAoZHQpIC0+XG4gICAgICAgICMgVXBkYXRlIGJ1dHRvbiBzdGF0ZXNcbiAgICAgICAgZW50aXRpZXMgPSBFbnRpdHlNYW5hZ2VyLmdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZXMgW1wiVUlTdGF0ZVwiLCBcIlVJQnV0dG9uXCIsIFwiU2NyZWVuUG9zaXRpb25cIl1cblxuICAgICAgICBmb3IgZW50aXR5IGluIGVudGl0aWVzXG4gICAgICAgICAgICBidXR0b24gPSBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiVUlCdXR0b25cIlxuICAgICAgICAgICAgcG9zaXRpb24gPSBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiU2NyZWVuUG9zaXRpb25cIlxuICAgICAgICAgICAgc3RhdGUgPSBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiVUlTdGF0ZVwiXG5cbiAgICAgICAgICAgIHN0YXRlLmhvdmVyID0gQG1vdXNlSW5CdXR0b24gcG9zaXRpb24sIGJ1dHRvblxuXG4gICAgICAgICAgICBpZiBzdGF0ZS5ob3ZlclxuICAgICAgICAgICAgICAgIHN0YXRlLnByZXNzZWQgPSBJbnB1dE1hbmFnZXIubW91c2UuZG93blxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHN0YXRlLnByZXNzZWQgPSBmYWxzZVxuXG4gICAgICAgIHJldHVybiBudWxsXG5cblxuICAgIG1vdXNlSW5CdXR0b246IChwb3NpdGlvbiwgYnV0dG9uLCB4LCB5KSAtPlxuICAgICAgICB4ID89IElucHV0TWFuYWdlci5tb3VzZS54XG4gICAgICAgIHkgPz0gSW5wdXRNYW5hZ2VyLm1vdXNlLnlcbiAgICAgICAgVXRpbC5pc1BvaW50SW5SZWN0IHgsIHksIHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIGJ1dHRvbi53aWR0aCwgYnV0dG9uLmhlaWdodFxuXG5cbm1vZHVsZS5leHBvcnRzID0gTWFpbk1lbnVJbnB1dFN5c3RlbSIsIlN5c3RlbSA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvU3lzdGVtLmNvZmZlZVwiXG5cbkdyYXBoaWNzTWFuYWdlciA9IHJlcXVpcmUgXCIuLi8uLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvTWFuYWdlci9HcmFwaGljc01hbmFnZXIuY29mZmVlXCJcbkVudGl0eU1hbmFnZXIgPSByZXF1aXJlIFwiLi4vLi4vLi4vdmVuZG9yL2lraS1lbmdpbmUvc3JjL01hbmFnZXIvRW50aXR5TWFuYWdlci5jb2ZmZWVcIlxuXG5jbGFzcyBNYWluTWVudVJlbmRlcmVyU3lzdGVtIGV4dGVuZHMgU3lzdGVtXG4gICAgVEhST1RUTEVfVkFMVUU6IDE2XG5cbiAgICBpbml0OiAoQHJlbmRlcmVyKSAtPlxuXG4gICAgb25VcGRhdGU6IC0+XG4gICAgICAgIFRXRUVOLnVwZGF0ZSgpXG4gICAgICAgIEBkcmF3QmFja2dyb3VuZCgpXG4gICAgICAgIEBkcmF3QnV0dG9ucygpXG5cbiAgICBkcmF3QmFja2dyb3VuZDogLT5cbiAgICAgICAgZW50aXRpZXMgPSBFbnRpdHlNYW5hZ2VyLmdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZXMgW1wiVUlCYWNrZ3JvdW5kXCJdXG4gICAgICAgIGZvciBlbnRpdHkgaW4gZW50aXRpZXNcbiAgICAgICAgICAgIGJhY2tncm91bmQgPSBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiVUlCYWNrZ3JvdW5kXCJcblxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLmZpbGxJbWFnZSBAcmVuZGVyZXIuY3R4LCBiYWNrZ3JvdW5kLmltZyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLmltZy53aWR0aCwgYmFja2dyb3VuZC5pbWcuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIEByZW5kZXJlci53aWR0aCwgQHJlbmRlcmVyLmhlaWdodFxuXG4gICAgZHJhd0J1dHRvbnM6IC0+XG4gICAgICAgIGVudGl0aWVzID0gRW50aXR5TWFuYWdlci5nZXRBbGxFbnRpdGllc1dpdGhDb21wb25lbnRPZlR5cGVzIFtcIlVJQnV0dG9uXCIsIFwiU2NyZWVuUG9zaXRpb25cIl1cblxuICAgICAgICBmb3IgZW50aXR5IGluIGVudGl0aWVzXG4gICAgICAgICAgICBidXR0b24gPSBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiVUlCdXR0b25cIlxuICAgICAgICAgICAgcG9zaXRpb24gPSBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiU2NyZWVuUG9zaXRpb25cIlxuICAgICAgICAgICAgc3RhdGUgPSBFbnRpdHlNYW5hZ2VyLmdldENvbXBvbmVudE9mVHlwZSBlbnRpdHksIFwiVUlTdGF0ZVwiXG5cbiAgICAgICAgICAgIHByaW1hcnlDb2xvdXIgPSBidXR0b24uY29sb3VyXG4gICAgICAgICAgICBoaWdobGlnaHRDb2xvdXIgPSBidXR0b24uY29sb3VyXG4gICAgICAgICAgICB0ZXh0Q29sb3VyID0gXCIjZmZmXCJcbiAgICAgICAgICAgIHNoYWRvd0NvbG91ciA9IFwicmdiYSgwLDAsMCwwLjcpXCJcblxuICAgICAgICAgICAgaWYgc3RhdGUuZGlzYWJsZWRcbiAgICAgICAgICAgICAgICBwcmltYXJ5Q29sb3VyID0gYnV0dG9uLmNvbG91ckRpc2FibGVkXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0Q29sb3VyID0gYnV0dG9uLmNvbG91ckRpc2FibGVkXG4gICAgICAgICAgICAgICAgdGV4dENvbG91ciA9IFwicmdiYSgyNTUsMjU1LDI1NSwwLjMpXCJcbiAgICAgICAgICAgICAgICBzaGFkb3dDb2xvdXIgPSBcInJnYmEoMCwwLDAsMC40KVwiXG4gICAgICAgICAgICBlbHNlIGlmIHN0YXRlLnByZXNzZWRcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRDb2xvdXIgPSBidXR0b24uY29sb3VyUHJlc3NlZFxuICAgICAgICAgICAgICAgIHRleHRDb2xvdXIgPSBidXR0b24uY29sb3VyUHJlc3NlZFxuICAgICAgICAgICAgZWxzZSBpZiBzdGF0ZS5ob3ZlclxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodENvbG91ciA9IGJ1dHRvbi5jb2xvdXJIb3ZlclxuICAgICAgICAgICAgICAgIHRleHRDb2xvdXIgPSBidXR0b24uY29sb3VySG92ZXJcblxuICAgICAgICAgICAgQHJlbmRlcmVyLmN0eC5maWxsU3R5bGUgPSBwcmltYXJ5Q29sb3VyXG4gICAgICAgICAgICBwYWRkaW5nID0gM1xuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJvdW5kZWRSZWN0RmlsbCBAcmVuZGVyZXIuY3R4LFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggKyBwYWRkaW5nLCBwb3NpdGlvbi55ICsgcGFkZGluZyxcbiAgICAgICAgICAgICAgICBidXR0b24ud2lkdGggLSBwYWRkaW5nIC0gcGFkZGluZywgYnV0dG9uLmhlaWdodCAtIHBhZGRpbmcgLSBwYWRkaW5nLCA4XG5cbiAgICAgICAgICAgIEByZW5kZXJlci5jdHguc3Ryb2tlU3R5bGUgPSBoaWdobGlnaHRDb2xvdXJcbiAgICAgICAgICAgIEByZW5kZXJlci5jdHgubGluZVdpZHRoID0gMlxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLnJvdW5kZWRSZWN0U3Ryb2tlIEByZW5kZXJlci5jdHgsXG4gICAgICAgICAgICAgICAgcG9zaXRpb24ueCwgcG9zaXRpb24ueSxcbiAgICAgICAgICAgICAgICBidXR0b24ud2lkdGgsIGJ1dHRvbi5oZWlnaHQsIDEyXG5cbiAgICAgICAgICAgIEByZW5kZXJlci5jdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIlxuICAgICAgICAgICAgQHJlbmRlcmVyLmN0eC5mb250ID0gXCJib2xkIDE0cHggQXJpYWwsIHNhbnMtc2VyaWZcIlxuICAgICAgICAgICAgdGV4dFNpemUgPSBAcmVuZGVyZXIuY3R4Lm1lYXN1cmVUZXh0IGJ1dHRvbi50ZXh0XG5cbiAgICAgICAgICAgIEByZW5kZXJlci5jdHgubGluZVdpZHRoID0gNFxuICAgICAgICAgICAgQHJlbmRlcmVyLmN0eC5taXRlckxpbWl0ID0gMVxuICAgICAgICAgICAgQHJlbmRlcmVyLmN0eC5zdHJva2VTdHlsZSA9IHNoYWRvd0NvbG91clxuICAgICAgICAgICAgQHJlbmRlcmVyLmN0eC5zdHJva2VUZXh0IGJ1dHRvbi50ZXh0LFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54ICsgKGJ1dHRvbi53aWR0aCAvIDIpIC0gKHRleHRTaXplLndpZHRoIC8gMiksXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgKyAoYnV0dG9uLmhlaWdodCAvIDIpIC0gN1xuXG4gICAgICAgICAgICBAcmVuZGVyZXIuY3R4LmZpbGxTdHlsZSA9IHRleHRDb2xvdXJcbiAgICAgICAgICAgIEByZW5kZXJlci5jdHguZmlsbFRleHQgYnV0dG9uLnRleHQsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggKyAoYnV0dG9uLndpZHRoIC8gMikgLSAodGV4dFNpemUud2lkdGggLyAyKSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueSArIChidXR0b24uaGVpZ2h0IC8gMikgLSA3XG5cbiAgICAgICAgZW50aXRpZXMgPSBFbnRpdHlNYW5hZ2VyLmdldEFsbEVudGl0aWVzV2l0aENvbXBvbmVudE9mVHlwZXMgW1wiVUlUZXh0XCIsIFwiU2NyZWVuUG9zaXRpb25cIl1cblxuICAgICAgICBmb3IgZW50aXR5IGluIGVudGl0aWVzXG4gICAgICAgICAgICB0ZXh0ID0gRW50aXR5TWFuYWdlci5nZXRDb21wb25lbnRPZlR5cGUgZW50aXR5LCBcIlVJVGV4dFwiXG4gICAgICAgICAgICBwb3NpdGlvbiA9IEVudGl0eU1hbmFnZXIuZ2V0Q29tcG9uZW50T2ZUeXBlIGVudGl0eSwgXCJTY3JlZW5Qb3NpdGlvblwiXG5cbiAgICAgICAgICAgIEByZW5kZXJlci5jdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIlxuICAgICAgICAgICAgQHJlbmRlcmVyLmN0eC5mb250ID0gdGV4dC5mb250XG4gICAgICAgICAgICB0ZXh0U2l6ZSA9IEByZW5kZXJlci5jdHgubWVhc3VyZVRleHQgdGV4dC50ZXh0XG5cbiAgICAgICAgICAgIEByZW5kZXJlci5jdHguZmlsbFN0eWxlID0gXCIjZmZmXCJcbiAgICAgICAgICAgIEByZW5kZXJlci5jdHguZmlsbFRleHQgdGV4dC50ZXh0LFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbi54IC0gKHRleHRTaXplLndpZHRoIC8gMiksXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnlcblxuICAgICAgICAgICAgQHJlbmRlcmVyLmN0eC5saW5lV2lkdGggPSAzXG4gICAgICAgICAgICBAcmVuZGVyZXIuY3R4Lm1pdGVyTGltaXQgPSA0XG4gICAgICAgICAgICBAcmVuZGVyZXIuY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCJcbiAgICAgICAgICAgIEByZW5kZXJlci5jdHguc3Ryb2tlVGV4dCB0ZXh0LnRleHQsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnggLSAodGV4dFNpemUud2lkdGggLyAyKSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueVxuXG5cbm1vZHVsZS5leHBvcnRzID0gTWFpbk1lbnVSZW5kZXJlclN5c3RlbSIsIkVuZ2luZSA9IHJlcXVpcmUgXCIuLi8uLi92ZW5kb3IvaWtpLWVuZ2luZS9zcmMvRW5naW5lLmNvZmZlZVwiXG5cbkJvb3RTY2VuZSA9IHJlcXVpcmUgXCIuL1NjZW5lL0Jvb3QuY29mZmVlXCJcblxuZ2FtZSA9IG5ldyBFbmdpbmVcbmdhbWUuc3RhcnQgbmV3IEJvb3RTY2VuZSIsIlNjZW5lTWFuYWdlciA9IHJlcXVpcmUgXCIuL01hbmFnZXIvU2NlbmVNYW5hZ2VyLmNvZmZlZVwiXG5cbmNsYXNzIEVuZ2luZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAbGFzdEdhbWVUaWNrID0gRGF0ZS5ub3coKVxuXG4gICAgc3RhcnQ6IChzY2VuZSkgLT5cbiAgICAgICAgU2NlbmVNYW5hZ2VyLmFkZCBcImJvb3RcIiwgc2NlbmVcbiAgICAgICAgc2NlbmUuaW5pdCgpXG4gICAgICAgIFNjZW5lTWFuYWdlci5hY3RpdmF0ZSBcImJvb3RcIlxuICAgICAgICBAbWFpbkxvb3AoKVxuXG4gICAgbWFpbkxvb3A6IC0+XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBAbWFpbkxvb3AuYmluZCBAXG5cbiAgICAgICAgQGN1cnJlbnRHYW1lVGljayA9IERhdGUubm93KClcbiAgICAgICAgQGRlbHRhID0gQGN1cnJlbnRHYW1lVGljayAtIEBsYXN0R2FtZVRpY2tcbiAgICAgICAgQGxhc3RHYW1lVGljayA9IEBjdXJyZW50R2FtZVRpY2tcblxuICAgICAgICBAdXBkYXRlIEBkZWx0YVxuICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgdXBkYXRlOiAoZHQpIC0+XG4gICAgICAgIHNjZW5lID0gU2NlbmVNYW5hZ2VyLmN1cnJlbnQoKVxuXG4gICAgICAgIGZvciBzeXN0ZW0gaW4gc2NlbmUuc3lzdGVtc1xuICAgICAgICAgICAgc3lzdGVtLnVwZGF0ZSBkdFxuICAgICAgICByZXR1cm4gbnVsbFxuXG5cbm1vZHVsZS5leHBvcnRzID0gRW5naW5lIiwidXVpZCA9IHJlcXVpcmUgXCIuLi92ZW5kb3Ivbm9kZS11dWlkL3V1aWQuanNcIlxuXG5jbGFzcyBFbnRpdHlcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQGlkID0gbnVsbFxuICAgICAgICBAY29tcG9uZW50cyA9IFtdXG5cbm1vZHVsZS5leHBvcnRzID0gRW50aXR5IiwiVXRpbCA9IHJlcXVpcmUgXCIuLi9VdGlsLmNvZmZlZVwiXG5cbmNsYXNzIEFzc2V0TWFuYWdlclxuICAgIEBhc3NldHMgPSB7fVxuICAgIEBudW1Bc3NldHMgPSAwXG4gICAgQGFzc2V0c0xvYWRlZCA9IDBcblxuICAgIEBsb2FkOiAobWFuaWZlc3QpIC0+XG4gICAgICAgIEBudW1Bc3NldHMgPSAwXG4gICAgICAgIEBhc3NldHNMb2FkZWQgPSAwXG5cbiAgICAgICAgcHJvbWlzZSA9IG5ldyBQcm9taXNlIChyZXNvbHZlKSAtPlxuICAgICAgICAgICAgbG9hZE1hbmlmZXN0ID0gVXRpbC5sb2FkSlNPTiBtYW5pZmVzdFxuICAgICAgICAgICAgbG9hZE1hbmlmZXN0LnRoZW4gKGpzb24pIC0+XG4gICAgICAgICAgICAgICAgZm9yIGksIGFzc2V0R3JvdXAgb2YganNvbi5hc3NldHNcbiAgICAgICAgICAgICAgICAgICAgZm9yIGEgaW4gYXNzZXRHcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLm51bUFzc2V0cysrXG5cbiAgICAgICAgICAgICAgICBmb3IgZ3JvdXBOYW1lLCBhc3NldEdyb3VwIG9mIGpzb24uYXNzZXRzXG4gICAgICAgICAgICAgICAgICAgIGZvciBhc3NldCBpbiBhc3NldEdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIub25CZWZvcmVMb2FkPyBhc3NldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLmFzc2V0c0xvYWRlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NldE1hbmFnZXIubnVtQXNzZXRzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRvIChhc3NldCkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIExvYWQgYmFzZWQgb24gZmlsZSB0eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgYXNzZXQudHlwZSA9PSBcImltYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRMb2FkID0gVXRpbC5sb2FkSW1hZ2UganNvbi5yb290ICsgYXNzZXQuZmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldExvYWQudGhlbiAoaW1nKSAtPiBBc3NldE1hbmFnZXIuYXNzZXRMb2FkZWQgYXNzZXQsIGdyb3VwTmFtZSwgcmVzb2x2ZSwgaW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBhc3NldC50eXBlID09IFwianNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZCA9IFV0aWwubG9hZEpTT04ganNvbi5yb290ICsgYXNzZXQuZmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldExvYWQudGhlbiAoanNvbikgLT4gQXNzZXRNYW5hZ2VyLmFzc2V0TG9hZGVkIGFzc2V0LCBncm91cE5hbWUsIHJlc29sdmUsIGpzb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZCA9IFV0aWwubG9hZCBqc29uLnJvb3QgKyBhc3NldC5maWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZC50aGVuIC0+IEFzc2V0TWFuYWdlci5hc3NldExvYWRlZCBhc3NldCwgZ3JvdXBOYW1lLCByZXNvbHZlXG4gI1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0TG9hZC5jYXRjaCAtPiBBc3NldE1hbmFnZXIub25FcnJvciBhc3NldCwgZ3JvdXBOYW1lXG5cbiAgICAgICAgcmV0dXJuIHByb21pc2VcblxuICAgIEBhc3NldExvYWRlZDogKGFzc2V0LCBncm91cE5hbWUsIHJlc29sdmUsIGRhdGEpIC0+XG4gICAgICAgIGlmIGRhdGEgdGhlbiBBc3NldE1hbmFnZXIuYXNzZXRzW2Fzc2V0LmZpbGVdID0gZGF0YVxuICAgICAgICBBc3NldE1hbmFnZXIuYXNzZXRzTG9hZGVkKytcbiAgICAgICAgQXNzZXRNYW5hZ2VyLm9uUHJvZ3Jlc3M/IGFzc2V0LFxuICAgICAgICAgICAgZ3JvdXBOYW1lLFxuICAgICAgICAgICAgQXNzZXRNYW5hZ2VyLmFzc2V0c0xvYWRlZCxcbiAgICAgICAgICAgIEFzc2V0TWFuYWdlci5udW1Bc3NldHNcblxuICAgICAgICBpZiBBc3NldE1hbmFnZXIuYXNzZXRzTG9hZGVkIGlzIEFzc2V0TWFuYWdlci5udW1Bc3NldHNcbiAgICAgICAgICAgIEFzc2V0TWFuYWdlci5vbkxvYWRlZD8oKVxuICAgICAgICAgICAgcmVzb2x2ZSgpXG5cbiAgICBAb25CZWZvcmVMb2FkOiAoYXNzZXQsIGdyb3VwLCBsb2FkZWQsIHRvdGFsKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuICAgIEBvblByb2dyZXNzOiAoYXNzZXQsIGdyb3VwLCBsb2FkZWQsIHRvdGFsKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuICAgIEBvbkVycm9yOiAoYXNzZXQsIGdyb3VwKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuICAgIEBvbkxvYWRlZDogLT4gIyBVc2VyIGxldmVsIGhvb2tcblxuICAgIEBnZXQ6IChhc3NldCkgLT4gQXNzZXRNYW5hZ2VyLmFzc2V0c1thc3NldF1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEFzc2V0TWFuYWdlciIsImNsYXNzIEF1ZGlvTWFuYWdlclxuICAgIEBzb3VuZHM6IHt9XG5cbiAgICBAbG9hZDogKGlkLCBhdWRpb0ZpbGUpIC0+XG4gICAgICAgIHNvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImF1ZGlvXCJcbiAgICAgICAgc291bmQuc3JjID0gYXVkaW9GaWxlXG4gICAgICAgIEF1ZGlvTWFuYWdlci5zb3VuZHNbaWRdID0gc291bmRcblxuICAgIEBwbGF5OiAoaWQpIC0+XG4gICAgICAgIHNvdW5kID0gQXVkaW9NYW5hZ2VyLnNvdW5kc1tpZF1cbiAgICAgICAgaWYgc291bmRcbiAgICAgICAgICAgIHNvdW5kLnBhdXNlKClcbiAgICAgICAgICAgIHNvdW5kLmN1cnJlbnRUaW1lID0gMFxuICAgICAgICAgICAgc291bmQucGxheSgpXG5cbm1vZHVsZS5leHBvcnRzID0gQXVkaW9NYW5hZ2VyIiwidXVpZCA9IHJlcXVpcmUgXCIuLi8uLi92ZW5kb3Ivbm9kZS11dWlkL3V1aWQuanNcIlxuRW50aXR5ID0gcmVxdWlyZSBcIi4uL0VudGl0eS5jb2ZmZWVcIlxuXG5jbGFzcyBFbnRpdHlNYW5hZ2VyXG4gICAgQGVudGl0aWVzID0gW11cblxuICAgIEBjcmVhdGVFbnRpdHk6IChpZCwgYWRkVG9MaXN0ID0gdHJ1ZSkgLT5cbiAgICAgICAgaWQgPz0gdXVpZC52MSgpXG4gICAgICAgIGVudGl0eSA9IG5ldyBFbnRpdHlcbiAgICAgICAgZW50aXR5LmlkID0gaWRcbiAgICAgICAgQGFkZEVudGl0eSBlbnRpdHkgaWYgYWRkVG9MaXN0XG4gICAgICAgIHJldHVybiBlbnRpdHlcblxuICAgIEBhZGRFbnRpdHk6IChlbnRpdHkpIC0+IEBlbnRpdGllcy5wdXNoIGVudGl0eVxuXG4gICAgQHJlbW92ZUVudGl0eTogKGVudGl0eSkgLT5cbiAgICAgICAgIyBGaW5kIHRoZSBpbmRleCBvZiB0aGUgZW50aXR5IGluIHRoZSBsaXN0XG4gICAgICAgIGluZGV4ID0gLTFcbiAgICAgICAgZm9yIGUsIGkgaW4gQGVudGl0aWVzXG4gICAgICAgICAgICBpZiBlID09IGVudGl0eSB0aGVuIGluZGV4ID0gaVxuXG4gICAgICAgICMgUmVtb3ZlIGZyb20gZW50aXR5IGxpc3RcbiAgICAgICAgQGVudGl0aWVzLnNwbGljZShpbmRleCwgMSlcblxuICAgICAgICByZXR1cm4gZW50aXR5XG5cbiAgICBAZGVsZXRlRW50aXR5OiAoZW50aXR5KSAtPlxuICAgICAgICBFbnRpdHlNYW5hZ2VyLnJlbW92ZUFsbENvbXBvbmVudHMgZW50aXR5XG4gICAgICAgIEByZW1vdmVFbnRpdHkgZW50aXR5XG5cbiAgICBAZGVsZXRlQWxsRW50aXRpZXM6IC0+XG4gICAgICAgIGZvciBlbnRpdHkgaW4gQGVudGl0aWVzXG4gICAgICAgICAgICBFbnRpdHlNYW5hZ2VyLnJlbW92ZUFsbENvbXBvbmVudHMgZW50aXR5XG4gICAgICAgIEBlbnRpdGllcy5sZW5ndGggPSAwXG5cblxuICAgIEBnZXRFbnRpdHlCeUlkOiAtPlxuICAgIEBnZXRBbGxFbnRpdGllc1dpdGhDb21wb25lbnRPZlR5cGU6IC0+XG5cbiAgICBAZ2V0QWxsRW50aXRpZXNXaXRoQ29tcG9uZW50T2ZUeXBlczogKGNvbXBvbmVudFR5cGVzKSAtPlxuICAgICAgICBlbnRpdGllcyA9IFtdXG4gICAgICAgIGZvciBlbnRpdHkgaW4gQGVudGl0aWVzXG4gICAgICAgICAgICBjb21wb25lbnRDb3VudCA9IDBcbiAgICAgICAgICAgIGZvciBjb21wb25lbnQgaW4gZW50aXR5LmNvbXBvbmVudHNcbiAgICAgICAgICAgICAgICBpZiBjb21wb25lbnRUeXBlcy5pbmRleE9mKGNvbXBvbmVudC50eXBlKSA+IC0xIHRoZW4gY29tcG9uZW50Q291bnQrK1xuICAgICAgICAgICAgaWYgY29tcG9uZW50Q291bnQgPT0gY29tcG9uZW50VHlwZXMubGVuZ3RoIHRoZW4gZW50aXRpZXMucHVzaCBlbnRpdHlcbiAgICAgICAgcmV0dXJuIGVudGl0aWVzXG5cbiAgICBAYWRkQ29tcG9uZW50OiAoZW50aXR5LCBjb21wb25lbnQpIC0+IGVudGl0eS5jb21wb25lbnRzLnB1c2ggY29tcG9uZW50XG5cbiAgICBAaGFzQ29tcG9uZW50OiAtPlxuXG4gICAgQGdldENvbXBvbmVudE9mVHlwZTogKGVudGl0eSwgY29tcG9uZW50VHlwZSkgLT5cbiAgICAgICAgZm9yIGNvbXBvbmVudCBpbiBlbnRpdHkuY29tcG9uZW50c1xuICAgICAgICAgICAgaWYgY29tcG9uZW50LnR5cGUgPT0gY29tcG9uZW50VHlwZSB0aGVuIHJldHVybiBjb21wb25lbnRcbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgIEByZW1vdmVBbGxDb21wb25lbnRzOiAoZW50aXR5KSAtPiBlbnRpdHkuY29tcG9uZW50cy5sZW5ndGggPSAwXG5cblxuIyAgICBnZXRDb21wb25lbnRPZlR5cGU6IChlbnRpdHksIGNvbXBvbmVudFR5cGUpIC0+IF8uZmluZCBlbnRpdHkuY29tcG9uZW50cywgKGMpIC0+IGMudHlwZSA9PSBjb21wb25lbnRUeXBlXG5cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRpdHlNYW5hZ2VyIiwiY2xhc3MgR3JhcGhpY3NNYW5hZ2VyXG5cbiAgICBAY3JlYXRlQ2FudmFzOiAod2lkdGgsIGhlaWdodCwgYXBwZW5kVG8pIC0+XG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJjYW52YXNcIlxuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aFxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0XG5cbiAgICAgICAgaWYgYXBwZW5kVG8gdGhlbiBhcHBlbmRUby5hcHBlbmRDaGlsZCBjYW52YXNcblxuICAgICAgICByZXR1cm4gY2FudmFzXG5cblxuICAgIEBjcmVhdGVSZW5kZXJlcjogKHdpZHRoLCBoZWlnaHQsIGFwcGVuZFRvKSAtPlxuICAgICAgICByZW5kZXJlciA9IHt9XG4gICAgICAgIHJlbmRlcmVyLmNhbnZhcyA9IEdyYXBoaWNzTWFuYWdlci5jcmVhdGVDYW52YXMgd2lkdGgsIGhlaWdodCwgYXBwZW5kVG9cbiAgICAgICAgcmVuZGVyZXIuY3R4ID0gcmVuZGVyZXIuY2FudmFzLmdldENvbnRleHQgXCIyZFwiXG4gICAgICAgIHJlbmRlcmVyLndpZHRoID0gd2lkdGhcbiAgICAgICAgcmVuZGVyZXIuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgIHJldHVybiByZW5kZXJlclxuXG5cbiAgICBAZmlsbEltYWdlOiAoY3R4LCBpbWFnZSwgaW1hZ2VXaWR0aCwgaW1hZ2VIZWlnaHQsIGRlc3RpbmF0aW9uV2lkdGgsIGRlc3RpbmF0aW9uSGVpZ2h0KSAtPlxuICAgICAgICByYXRpb0ltYWdlID0gaW1hZ2VXaWR0aCAvIGltYWdlSGVpZ2h0XG4gICAgICAgIHJhdGlvRGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbldpZHRoIC8gZGVzdGluYXRpb25IZWlnaHRcblxuICAgICAgICB3aWR0aCA9IGRlc3RpbmF0aW9uV2lkdGhcbiAgICAgICAgaGVpZ2h0ID0gZGVzdGluYXRpb25IZWlnaHRcblxuICAgICAgICBpZiByYXRpb0Rlc3RpbmF0aW9uID4gcmF0aW9JbWFnZVxuICAgICAgICAgICAgaGVpZ2h0ID0gZGVzdGluYXRpb25XaWR0aCAvIHJhdGlvSW1hZ2VcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgd2lkdGggPSBkZXN0aW5hdGlvbkhlaWdodCAqIHJhdGlvSW1hZ2VcblxuICAgICAgICBjdHguZHJhd0ltYWdlIGltYWdlLCAwLCAwLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgMCwgMCwgd2lkdGgsIGhlaWdodFxuXG5cbiAgICBAZml0SW1hZ2U6IChjdHgsIGltYWdlLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgZGVzdGluYXRpb25XaWR0aCwgZGVzdGluYXRpb25IZWlnaHQpIC0+XG4gICAgICAgIHJhdGlvSW1hZ2UgPSBpbWFnZVdpZHRoIC8gaW1hZ2VIZWlnaHRcbiAgICAgICAgcmF0aW9EZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uV2lkdGggLyBkZXN0aW5hdGlvbkhlaWdodFxuXG4gICAgICAgIHdpZHRoID0gZGVzdGluYXRpb25XaWR0aFxuICAgICAgICBoZWlnaHQgPSBkZXN0aW5hdGlvbkhlaWdodFxuXG4gICAgICAgIGlmIHJhdGlvRGVzdGluYXRpb24gPiByYXRpb0ltYWdlXG4gICAgICAgICAgICB3aWR0aCA9IGltYWdlV2lkdGggKiBkZXN0aW5hdGlvbkhlaWdodCAvIGltYWdlSGVpZ2h0XG4gICAgICAgICAgICBoZWlnaHQgPSBkZXN0aW5hdGlvbkhlaWdodFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3aWR0aCA9IGRlc3RpbmF0aW9uV2lkdGhcbiAgICAgICAgICAgIGhlaWdodCA9IGltYWdlSGVpZ2h0ICogZGVzdGluYXRpb25XaWR0aCAvIGltYWdlV2lkdGhcblxuICAgICAgICBjdHguZHJhd0ltYWdlIGltYWdlLCAwLCAwLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgMCwgMCwgd2lkdGgsIGhlaWdodFxuXG5cbiAgICBAcm91bmRlZFJlY3RTdHJva2U6IChjdHgsIHgsIHksIHcsIGgsIHJhZGl1cykgLT5cbiAgICAgICAgciA9IHggKyB3XG4gICAgICAgIGIgPSB5ICsgaFxuICAgICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAgICAgY3R4Lm1vdmVUbyB4ICsgcmFkaXVzLCB5XG4gICAgICAgIGN0eC5saW5lVG8gciAtIHJhZGl1cywgeVxuICAgICAgICBjdHgucXVhZHJhdGljQ3VydmVUbyByLCB5LCByLCB5ICsgcmFkaXVzXG4gICAgICAgIGN0eC5saW5lVG8gciwgeSArIGggLSByYWRpdXNcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8gciwgYiwgciAtIHJhZGl1cywgYlxuICAgICAgICBjdHgubGluZVRvIHggKyByYWRpdXMsIGJcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8geCwgYiwgeCwgYiAtIHJhZGl1c1xuICAgICAgICBjdHgubGluZVRvIHgsIHkgKyByYWRpdXNcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8geCwgeSwgeCArIHJhZGl1cywgeVxuICAgICAgICBjdHguc3Ryb2tlKClcblxuICAgIEByb3VuZGVkUmVjdEZpbGw6IChjdHgsIHgsIHksIHcsIGgsIHJhZGl1cykgLT5cbiAgICAgICAgciA9IHggKyB3XG4gICAgICAgIGIgPSB5ICsgaFxuICAgICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAgICAgY3R4Lm1vdmVUbyB4ICsgcmFkaXVzLCB5XG4gICAgICAgIGN0eC5saW5lVG8gciAtIHJhZGl1cywgeVxuICAgICAgICBjdHgucXVhZHJhdGljQ3VydmVUbyByLCB5LCByLCB5ICsgcmFkaXVzXG4gICAgICAgIGN0eC5saW5lVG8gciwgeSArIGggLSByYWRpdXNcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8gciwgYiwgciAtIHJhZGl1cywgYlxuICAgICAgICBjdHgubGluZVRvIHggKyByYWRpdXMsIGJcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8geCwgYiwgeCwgYiAtIHJhZGl1c1xuICAgICAgICBjdHgubGluZVRvIHgsIHkgKyByYWRpdXNcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8geCwgeSwgeCArIHJhZGl1cywgeVxuICAgICAgICBjdHguZmlsbCgpXG5cbm1vZHVsZS5leHBvcnRzID0gR3JhcGhpY3NNYW5hZ2VyIiwiY2xhc3MgSW5wdXRNYW5hZ2VyXG4gICAgQENMSUNLX01PVkVfVEhSRVNIT0xEOiAzXG5cbiAgICBATU9VU0VfVFJBTlNGT1JNX1JFQ1Q6IGZhbHNlXG4gICAgQE1PVVNFX1RSQU5TRk9STV9XSURUSDogZmFsc2VcbiAgICBATU9VU0VfVFJBTlNGT1JNX0hFSUdIVDogZmFsc2VcbiAgICBATU9VU0VfT0ZGU0VUX1g6IGZhbHNlXG4gICAgQE1PVVNFX09GRlNFVF9ZOiBmYWxzZVxuXG4gICAgQG1vdXNlOlxuICAgICAgICB4OiAwXG4gICAgICAgIHk6IDBcbiAgICAgICAgZG93bjogZmFsc2VcbiAgICAgICAgZG93blg6IDBcbiAgICAgICAgZG93blk6IDBcblxuICAgIEBrZXk6XG4gICAgICAgIHVwOiBmYWxzZVxuICAgICAgICBkb3duOiBmYWxzZVxuICAgICAgICBsZWZ0OiBmYWxzZVxuICAgICAgICByaWdodDogZmFsc2VcblxuICAgIEBpbml0OiAoZWxlbWVudCA9IGRvY3VtZW50KSAtPlxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCBJbnB1dE1hbmFnZXIubW91c2VDbGlja1xuXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcIm1vdXNlZG93blwiLCBJbnB1dE1hbmFnZXIubW91c2VEb3duXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcInRvdWNoc3RhcnRcIiwgSW5wdXRNYW5hZ2VyLm1vdXNlRG93blxuXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcIm1vdXNldXBcIiwgSW5wdXRNYW5hZ2VyLm1vdXNlVXBcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyIFwidG91Y2hlbmRcIiwgSW5wdXRNYW5hZ2VyLm1vdXNlVXBcblxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJtb3VzZW1vdmVcIiwgSW5wdXRNYW5hZ2VyLm1vdXNlTW92ZVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJ0b3VjaG1vdmVcIiwgSW5wdXRNYW5hZ2VyLm1vdXNlTW92ZVxuXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciBcImtleXVwXCIsIElucHV0TWFuYWdlci5rZXlVcFxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgXCJrZXlkb3duXCIsIElucHV0TWFuYWdlci5rZXlEb3duXG5cbiAgICBAbW91c2VDbGljazogKGUpIC0+XG4gICAgICAgIHggPSBJbnB1dE1hbmFnZXIudHJhbnNmb3JtTW91c2VYIGUueFxuICAgICAgICB5ID0gSW5wdXRNYW5hZ2VyLnRyYW5zZm9ybU1vdXNlWSBlLnlcbiAgICAgICAgbW92ZVggPSBNYXRoLmFicyBJbnB1dE1hbmFnZXIubW91c2UuZG93blggLSB4XG4gICAgICAgIG1vdmVZID0gTWF0aC5hYnMgSW5wdXRNYW5hZ2VyLm1vdXNlLmRvd25ZIC0geVxuICAgICAgICBpZiBtb3ZlWCA8IElucHV0TWFuYWdlci5DTElDS19NT1ZFX1RIUkVTSE9MRCAmJiBtb3ZlWSA8IElucHV0TWFuYWdlci5DTElDS19NT1ZFX1RIUkVTSE9MRFxuICAgICAgICAgICAgSW5wdXRNYW5hZ2VyLm9uTW91c2VDbGljaz8ge3g6eCwgeTp5fVxuXG4gICAgQG1vdXNlRG93bjogKGUpIC0+XG4gICAgICAgIGlmIGUuY2hhbmdlZFRvdWNoZXNcbiAgICAgICAgICAgIHggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYXG4gICAgICAgICAgICB5ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB4ID0gZS54XG4gICAgICAgICAgICB5ID0gZS55XG4gICAgICAgIElucHV0TWFuYWdlci5tb3VzZS54ID0gSW5wdXRNYW5hZ2VyLm1vdXNlLmRvd25YID0gSW5wdXRNYW5hZ2VyLnRyYW5zZm9ybU1vdXNlWCB4XG4gICAgICAgIElucHV0TWFuYWdlci5tb3VzZS55ID0gSW5wdXRNYW5hZ2VyLm1vdXNlLmRvd25ZID0gSW5wdXRNYW5hZ2VyLnRyYW5zZm9ybU1vdXNlWSB5XG4gICAgICAgIElucHV0TWFuYWdlci5tb3VzZS5kb3duID0gdHJ1ZVxuXG4gICAgQG1vdXNlVXA6IChlKSAtPlxuICAgICAgICBpZiBlLmNoYW5nZWRUb3VjaGVzXG4gICAgICAgICAgICB4ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWFxuICAgICAgICAgICAgeSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVlcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgeCA9IGUueFxuICAgICAgICAgICAgeSA9IGUueVxuICAgICAgICBJbnB1dE1hbmFnZXIubW91c2UueCA9IElucHV0TWFuYWdlci50cmFuc2Zvcm1Nb3VzZVggeFxuICAgICAgICBJbnB1dE1hbmFnZXIubW91c2UueSA9IElucHV0TWFuYWdlci50cmFuc2Zvcm1Nb3VzZVkgeVxuICAgICAgICBJbnB1dE1hbmFnZXIubW91c2UuZG93biA9IGZhbHNlXG5cbiAgICBAbW91c2VNb3ZlOiAoZSkgLT5cbiAgICAgICAgaWYgZS5jaGFuZ2VkVG91Y2hlc1xuICAgICAgICAgICAgeCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVhcbiAgICAgICAgICAgIHkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHggPSBlLnhcbiAgICAgICAgICAgIHkgPSBlLnlcbiAgICAgICAgSW5wdXRNYW5hZ2VyLm1vdXNlLnggPSB4ID0gSW5wdXRNYW5hZ2VyLnRyYW5zZm9ybU1vdXNlWCB4XG4gICAgICAgIElucHV0TWFuYWdlci5tb3VzZS55ID0geSA9IElucHV0TWFuYWdlci50cmFuc2Zvcm1Nb3VzZVkgeVxuXG4jICAgICAgICBJbnB1dE1hbmFnZXIubW91c2UuZG93biA9IGZhbHNlXG4gICAgICAgIElucHV0TWFuYWdlci5vbk1vdXNlTW92ZT8ge3g6eCwgeTp5fVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIEBrZXlVcDogKGUpIC0+XG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzOCB0aGVuIElucHV0TWFuYWdlci5rZXkudXAgPSBmYWxzZVxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gNDAgdGhlbiBJbnB1dE1hbmFnZXIua2V5LmRvd24gPSBmYWxzZVxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzcgdGhlbiBJbnB1dE1hbmFnZXIua2V5LmxlZnQgPSBmYWxzZVxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzkgdGhlbiBJbnB1dE1hbmFnZXIua2V5LnJpZ2h0ID0gZmFsc2VcblxuICAgICAgICBJbnB1dE1hbmFnZXIub25LZXlVcD8gZVxuXG4gICAgQGtleURvd246IChlKSAtPlxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gMzggdGhlbiBJbnB1dE1hbmFnZXIua2V5LnVwID0gdHJ1ZVxuICAgICAgICBpZiBlLmtleUNvZGUgPT0gNDAgdGhlbiBJbnB1dE1hbmFnZXIua2V5LmRvd24gPSB0cnVlXG4gICAgICAgIGlmIGUua2V5Q29kZSA9PSAzNyB0aGVuIElucHV0TWFuYWdlci5rZXkubGVmdCA9IHRydWVcbiAgICAgICAgaWYgZS5rZXlDb2RlID09IDM5IHRoZW4gSW5wdXRNYW5hZ2VyLmtleS5yaWdodCA9IHRydWVcblxuICAgICAgICBJbnB1dE1hbmFnZXIub25LZXlEb3duPyBlXG5cbiAgICBAb25Nb3VzZUNsaWNrOiAoZSkgLT4gIyBVc2VyIGxldmVsIGhvb2tcbiAgICBAb25Nb3VzZU1vdmU6IChlKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuICAgIEBvbktleVVwOiAoZSkgLT4gIyBVc2VyIGxldmVsIGhvb2tcbiAgICBAb25LZXlEb3duOiAoZSkgLT4gIyBVc2VyIGxldmVsIGhvb2tcblxuICAgIEB0cmFuc2Zvcm1Nb3VzZVg6ICh4KSAtPlxuICAgICAgICBpZiBJbnB1dE1hbmFnZXIuTU9VU0VfVFJBTlNGT1JNX1JFQ1QgJiYgSW5wdXRNYW5hZ2VyLk1PVVNFX1RSQU5TRk9STV9XSURUSFxuICAgICAgICAgICAgeCA9ICh4IC8gSW5wdXRNYW5hZ2VyLk1PVVNFX1RSQU5TRk9STV9SRUNULnJpZ2h0KSAqIElucHV0TWFuYWdlci5NT1VTRV9UUkFOU0ZPUk1fV0lEVEhcbiAgICAgICAgaWYgSW5wdXRNYW5hZ2VyLk1PVVNFX09GRlNFVF9YIHRoZW4geCAtPSBJbnB1dE1hbmFnZXIuTU9VU0VfT0ZGU0VUX1hcbiAgICAgICAgcmV0dXJuIHhcblxuICAgIEB0cmFuc2Zvcm1Nb3VzZVk6ICh5KSAtPlxuICAgICAgICBpZiBATU9VU0VfVFJBTlNGT1JNX1JFQ1QgJiYgQE1PVVNFX1RSQU5TRk9STV9IRUlHSFRcbiAgICAgICAgICAgIHkgPSAoeSAvIEBNT1VTRV9UUkFOU0ZPUk1fUkVDVC5ib3R0b20pICogQE1PVVNFX1RSQU5TRk9STV9IRUlHSFRcbiAgICAgICAgaWYgSW5wdXRNYW5hZ2VyLk1PVVNFX09GRlNFVF9ZIHRoZW4geSAtPSBJbnB1dE1hbmFnZXIuTU9VU0VfT0ZGU0VUX1lcbiAgICAgICAgcmV0dXJuIHlcblxuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0TWFuYWdlclxuIiwiY2xhc3MgU2NlbmVNYW5hZ2VyXG4gICAgQGN1cnJlbnRTY2VuZTogXCJib290XCJcbiAgICBAc2NlbmVzOiB7fVxuXG4gICAgQGFkZDogKG5hbWUsIHNjZW5lKSAtPlxuICAgICAgICBTY2VuZU1hbmFnZXIuc2NlbmVzW25hbWVdID0gc2NlbmVcbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgIEBjdXJyZW50OiAtPiBTY2VuZU1hbmFnZXIuc2NlbmVzW1NjZW5lTWFuYWdlci5jdXJyZW50U2NlbmVdXG5cbiAgICBAYWN0aXZhdGU6IChuYW1lKSAtPlxuICAgICAgICBvbGQgPSBTY2VuZU1hbmFnZXIuY3VycmVudCgpXG4gICAgICAgIG9sZC5kZWFjdGl2YXRlKCkgaWYgb2xkXG4gICAgICAgIFNjZW5lTWFuYWdlci5jdXJyZW50U2NlbmUgPSBuYW1lXG4gICAgICAgIFNjZW5lTWFuYWdlci5vbkFjdGl2YXRlIG5hbWVcbiAgICAgICAgU2NlbmVNYW5hZ2VyLmN1cnJlbnQoKT8uYWN0aXZhdGUoKVxuICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgQG9uQWN0aXZhdGU6IChuYW1lKSAtPiAjIFVzZXIgbGV2ZWwgaG9va1xuXG5cbm1vZHVsZS5leHBvcnRzID0gU2NlbmVNYW5hZ2VyIiwiY2xhc3MgU2NlbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQHN5c3RlbXMgPSBbXVxuXG4gICAgYWRkU3lzdGVtOiAoc3lzdGVtKSAtPlxuICAgICAgICBAc3lzdGVtcy5wdXNoIHN5c3RlbVxuICAgICAgICByZXR1cm4gc3lzdGVtXG5cbiAgICBpbml0OiAtPlxuICAgIGFjdGl2YXRlOiAtPlxuICAgIGRlYWN0aXZhdGU6IC0+XG5cbm1vZHVsZS5leHBvcnRzID0gU2NlbmUiLCJjbGFzcyBTeXN0ZW1cbiAgICBUSFJPVFRMRV9WQUxVRTogMFxuXG4gICAgY29uc3RydWN0b3I6IC0+IEB0aW1lU2luY2VVcGRhdGUgPSAwXG5cbiAgICBpbml0OiAtPlxuXG4gICAgdXBkYXRlOiAoZHQpIC0+XG4gICAgICAgIEB0aW1lU2luY2VVcGRhdGUgKz0gZHRcblxuICAgICAgICBpZiBAdGltZVNpbmNlVXBkYXRlID49IEBUSFJPVFRMRV9WQUxVRVxuICAgICAgICAgICAgQG9uVXBkYXRlIEB0aW1lU2luY2VVcGRhdGVcbiAgICAgICAgICAgIEB0aW1lU2luY2VVcGRhdGUgPSAwXG5cbiAgICAgICAgcmV0dXJuIEB0aW1lU2luY2VVcGRhdGVcblxuICAgIG9uVXBkYXRlOiAoZHQpIC0+XG5cbm1vZHVsZS5leHBvcnRzID0gU3lzdGVtIiwiY2xhc3MgVXRpbFxuICAgIEBsb2FkSlNPTjogKHVybCkgLT4gVXRpbC5sb2FkKHVybCkudGhlbihKU09OLnBhcnNlKVxuXG4gICAgQGxvYWQ6ICh1cmwpIC0+XG4gICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSAtPlxuICAgICAgICAgICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgICAgICN4aHIucmVzcG9uc2VUeXBlID0gXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIHhoci5vcGVuIFwiR0VUXCIsIHVybCwgdHJ1ZVxuICAgICAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIgXCJyZWFkeXN0YXRlY2hhbmdlXCIsIC0+XG4gICAgICAgICAgICAgICAgaWYgeGhyLnJlYWR5U3RhdGUgaXMgNFxuICAgICAgICAgICAgICAgICAgICBpZiB4aHIuc3RhdHVzIGluIFsyMDAsIDMwNF1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUgeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QgXCJlcnJvclwiXG4gICAgICAgICAgICB4aHIuc2VuZCgpXG4gICAgICAgIHJldHVybiBwcm9taXNlXG5cblxuICAgIEBsb2FkSW1hZ2U6IChzcmMpIC0+XG4gICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSAocmVzb2x2ZSwgcmVqZWN0KSAtPlxuICAgICAgICAgICAgaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuICAgICAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lciBcImxvYWRcIiwgLT4gcmVzb2x2ZSBAXG4gICAgICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyIFwiZXJyb3JcIiwgLT4gcmVqZWN0IFwiZXJyb3JcIlxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gc3JjXG4gICAgICAgICAgICBpZiBpbWFnZS5jb21wbGV0ZSB0aGVuIHJlc29sdmUgaW1hZ2VcbiAgICAgICAgcmV0dXJuIHByb21pc2VcblxuXG4gICAgQHBsdXJhbGlzZTogKHdvcmQpIC0+XG4gICAgICAgIGxlbiA9IHdvcmQubGVuZ3RoXG5cbiAgICAgICAgbDEgPSB3b3JkLnN1YnN0ciAtMVxuICAgICAgICBsMiA9IHdvcmQuc3Vic3RyIC0yXG5cbiAgICAgICAgaWYgbDEgPT0gXCJ5XCJcbiAgICAgICAgICAgIHdvcmQgPSB3b3JkLnN1YnN0cigwLCBsZW4gLSAxKSArIFwiaWVzXCJcbiAgICAgICAgZWxzZSBpZiBsMSA9PSBcInNcIiB8fCBsMSA9PSBcInhcIiB8fCBsMiA9PSBcImNoXCIgfHwgbDIgPT0gXCJzaFwiIHx8IGwyID09IFwiZXNcIlxuICAgICAgICAgICAgIyBJZiB3b3JkIGVuZHMgaW4gXCJzXCIgXCJ4XCIgb3IgXCJjaFwiIG9yIFwic2hcIiBhZGQgXCJlc1wiXG4gICAgICAgICAgICB3b3JkID0gd29yZCArIFwiZXNcIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3b3JkID0gd29yZCArIFwic1wiXG5cbiAgICAgICAgcmV0dXJuIHdvcmRcblxuXG4gICAgQGlzUG9pbnRJblJlY3Q6ICh4LCB5LCByeCwgcnksIHJ3LCByaCkgLT5cbiAgICAgICAgcmV0dXJuIHggPj0gcnggJiYgeCA8PSByeCArIHJ3ICYmIHkgPj0gcnkgJiYgeSA8PSByeSArIHJoXG5cbm1vZHVsZS5leHBvcnRzID0gVXRpbCIsIihmdW5jdGlvbiAoQnVmZmVyKXtcbi8vICAgICB1dWlkLmpzXG4vL1xuLy8gICAgIENvcHlyaWdodCAoYykgMjAxMC0yMDEyIFJvYmVydCBLaWVmZmVyXG4vLyAgICAgTUlUIExpY2Vuc2UgLSBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cbihmdW5jdGlvbigpIHtcbiAgdmFyIF9nbG9iYWwgPSB0aGlzO1xuXG4gIC8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBXZSBmZWF0dXJlXG4gIC8vIGRldGVjdCB0byBkZXRlcm1pbmUgdGhlIGJlc3QgUk5HIHNvdXJjZSwgbm9ybWFsaXppbmcgdG8gYSBmdW5jdGlvbiB0aGF0XG4gIC8vIHJldHVybnMgMTI4LWJpdHMgb2YgcmFuZG9tbmVzcywgc2luY2UgdGhhdCdzIHdoYXQncyB1c3VhbGx5IHJlcXVpcmVkXG4gIHZhciBfcm5nO1xuXG4gIC8vIE5vZGUuanMgY3J5cHRvLWJhc2VkIFJORyAtIGh0dHA6Ly9ub2RlanMub3JnL2RvY3MvdjAuNi4yL2FwaS9jcnlwdG8uaHRtbFxuICAvL1xuICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICBpZiAodHlwZW9mKHJlcXVpcmUpID09ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIF9yYiA9IHJlcXVpcmUoJ2NyeXB0bycpLnJhbmRvbUJ5dGVzO1xuICAgICAgX3JuZyA9IF9yYiAmJiBmdW5jdGlvbigpIHtyZXR1cm4gX3JiKDE2KTt9O1xuICAgIH0gY2F0Y2goZSkge31cbiAgfVxuXG4gIGlmICghX3JuZyAmJiBfZ2xvYmFsLmNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gV0hBVFdHIGNyeXB0by1iYXNlZCBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gICAgLy9cbiAgICAvLyBNb2RlcmF0ZWx5IGZhc3QsIGhpZ2ggcXVhbGl0eVxuICAgIHZhciBfcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG4gICAgX3JuZyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoX3JuZHM4KTtcbiAgICAgIHJldHVybiBfcm5kczg7XG4gICAgfTtcbiAgfVxuXG4gIGlmICghX3JuZykge1xuICAgIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgICAvL1xuICAgIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gICAgLy8gcXVhbGl0eS5cbiAgICB2YXIgIF9ybmRzID0gbmV3IEFycmF5KDE2KTtcbiAgICBfcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICAgIF9ybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3JuZHM7XG4gICAgfTtcbiAgfVxuXG4gIC8vIEJ1ZmZlciBjbGFzcyB0byB1c2VcbiAgdmFyIEJ1ZmZlckNsYXNzID0gdHlwZW9mKEJ1ZmZlcikgPT0gJ2Z1bmN0aW9uJyA/IEJ1ZmZlciA6IEFycmF5O1xuXG4gIC8vIE1hcHMgZm9yIG51bWJlciA8LT4gaGV4IHN0cmluZyBjb252ZXJzaW9uXG4gIHZhciBfYnl0ZVRvSGV4ID0gW107XG4gIHZhciBfaGV4VG9CeXRlID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICBfYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbiAgICBfaGV4VG9CeXRlW19ieXRlVG9IZXhbaV1dID0gaTtcbiAgfVxuXG4gIC8vICoqYHBhcnNlKClgIC0gUGFyc2UgYSBVVUlEIGludG8gaXQncyBjb21wb25lbnQgYnl0ZXMqKlxuICBmdW5jdGlvbiBwYXJzZShzLCBidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gKGJ1ZiAmJiBvZmZzZXQpIHx8IDAsIGlpID0gMDtcblxuICAgIGJ1ZiA9IGJ1ZiB8fCBbXTtcbiAgICBzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWzAtOWEtZl17Mn0vZywgZnVuY3Rpb24ob2N0KSB7XG4gICAgICBpZiAoaWkgPCAxNikgeyAvLyBEb24ndCBvdmVyZmxvdyFcbiAgICAgICAgYnVmW2kgKyBpaSsrXSA9IF9oZXhUb0J5dGVbb2N0XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFplcm8gb3V0IHJlbWFpbmluZyBieXRlcyBpZiBzdHJpbmcgd2FzIHNob3J0XG4gICAgd2hpbGUgKGlpIDwgMTYpIHtcbiAgICAgIGJ1ZltpICsgaWkrK10gPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICAvLyAqKmB1bnBhcnNlKClgIC0gQ29udmVydCBVVUlEIGJ5dGUgYXJyYXkgKGFsYSBwYXJzZSgpKSBpbnRvIGEgc3RyaW5nKipcbiAgZnVuY3Rpb24gdW5wYXJzZShidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gb2Zmc2V0IHx8IDAsIGJ0aCA9IF9ieXRlVG9IZXg7XG4gICAgcmV0dXJuICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcbiAgfVxuXG4gIC8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbiAgLy9cbiAgLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbiAgLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxuICAvLyByYW5kb20gIydzIHdlIG5lZWQgdG8gaW5pdCBub2RlIGFuZCBjbG9ja3NlcVxuICB2YXIgX3NlZWRCeXRlcyA9IF9ybmcoKTtcblxuICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgdmFyIF9ub2RlSWQgPSBbXG4gICAgX3NlZWRCeXRlc1swXSB8IDB4MDEsXG4gICAgX3NlZWRCeXRlc1sxXSwgX3NlZWRCeXRlc1syXSwgX3NlZWRCeXRlc1szXSwgX3NlZWRCeXRlc1s0XSwgX3NlZWRCeXRlc1s1XVxuICBdO1xuXG4gIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gIHZhciBfY2xvY2tzZXEgPSAoX3NlZWRCeXRlc1s2XSA8PCA4IHwgX3NlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG5cbiAgLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG4gIHZhciBfbGFzdE1TZWNzID0gMCwgX2xhc3ROU2VjcyA9IDA7XG5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuICBmdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAgIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICAgIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9IG51bGwgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gICAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAgIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAgIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gICAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPSBudWxsID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAgIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gICAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPSBudWxsID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gICAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICAgIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gICAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICAgIH1cblxuICAgIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gICAgLy8gdGltZSBpbnRlcnZhbFxuICAgIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PSBudWxsKSB7XG4gICAgICBuc2VjcyA9IDA7XG4gICAgfVxuXG4gICAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICAgIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gICAgfVxuXG4gICAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICAgIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAgIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICAgIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gICAgLy8gYHRpbWVfbG93YFxuICAgIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICAgIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gICAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICAgIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAgIC8vIGB0aW1lX21pZGBcbiAgICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gICAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gICAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gICAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgICAvLyBgbm9kZWBcbiAgICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICAgIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgbisrKSB7XG4gICAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IHVucGFyc2UoYik7XG4gIH1cblxuICAvLyAqKmB2NCgpYCAtIEdlbmVyYXRlIHJhbmRvbSBVVUlEKipcblxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG4gIGZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgLy8gRGVwcmVjYXRlZCAtICdmb3JtYXQnIGFyZ3VtZW50LCBhcyBzdXBwb3J0ZWQgaW4gdjEuMlxuICAgIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gICAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgICAgYnVmID0gb3B0aW9ucyA9PSAnYmluYXJ5JyA/IG5ldyBCdWZmZXJDbGFzcygxNikgOiBudWxsO1xuICAgICAgb3B0aW9ucyA9IG51bGw7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZykoKTtcblxuICAgIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gICAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gICAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gICAgaWYgKGJ1Zikge1xuICAgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyBpaSsrKSB7XG4gICAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZiB8fCB1bnBhcnNlKHJuZHMpO1xuICB9XG5cbiAgLy8gRXhwb3J0IHB1YmxpYyBBUElcbiAgdmFyIHV1aWQgPSB2NDtcbiAgdXVpZC52MSA9IHYxO1xuICB1dWlkLnY0ID0gdjQ7XG4gIHV1aWQucGFyc2UgPSBwYXJzZTtcbiAgdXVpZC51bnBhcnNlID0gdW5wYXJzZTtcbiAgdXVpZC5CdWZmZXJDbGFzcyA9IEJ1ZmZlckNsYXNzO1xuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBQdWJsaXNoIGFzIEFNRCBtb2R1bGVcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7cmV0dXJuIHV1aWQ7fSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mKG1vZHVsZSkgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAvLyBQdWJsaXNoIGFzIG5vZGUuanMgbW9kdWxlXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuICB9IGVsc2Uge1xuICAgIC8vIFB1Ymxpc2ggYXMgZ2xvYmFsIChpbiBicm93c2VycylcbiAgICB2YXIgX3ByZXZpb3VzUm9vdCA9IF9nbG9iYWwudXVpZDtcblxuICAgIC8vICoqYG5vQ29uZmxpY3QoKWAgLSAoYnJvd3NlciBvbmx5KSB0byByZXNldCBnbG9iYWwgJ3V1aWQnIHZhcioqXG4gICAgdXVpZC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBfZ2xvYmFsLnV1aWQgPSBfcHJldmlvdXNSb290O1xuICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgfTtcblxuICAgIF9nbG9iYWwudXVpZCA9IHV1aWQ7XG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcikiLCIvKipcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEF1dGhvcjogICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogTGljZW5zZTogIE1JVFxuICpcbiAqIGBucG0gaW5zdGFsbCBidWZmZXJgXG4gKi9cblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTJcblxuLyoqXG4gKiBJZiBgQnVmZmVyLl91c2VUeXBlZEFycmF5c2A6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChjb21wYXRpYmxlIGRvd24gdG8gSUU2KVxuICovXG5CdWZmZXIuX3VzZVR5cGVkQXJyYXlzID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gRGV0ZWN0IGlmIGJyb3dzZXIgc3VwcG9ydHMgVHlwZWQgQXJyYXlzLiBTdXBwb3J0ZWQgYnJvd3NlcnMgYXJlIElFIDEwKywgRmlyZWZveCA0KyxcbiAgLy8gQ2hyb21lIDcrLCBTYWZhcmkgNS4xKywgT3BlcmEgMTEuNissIGlPUyA0LjIrLiBJZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZ1xuICAvLyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsIHRoZW4gdGhhdCdzIHRoZSBzYW1lIGFzIG5vIGBVaW50OEFycmF5YCBzdXBwb3J0XG4gIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIGFkZCBhbGwgdGhlIG5vZGUgQnVmZmVyIEFQSSBtZXRob2RzLiBUaGlzIGlzIGFuIGlzc3VlXG4gIC8vIGluIEZpcmVmb3ggNC0yOS4gTm93IGZpeGVkOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzhcbiAgdHJ5IHtcbiAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKDApXG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICBhcnIuZm9vID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfVxuICAgIHJldHVybiA0MiA9PT0gYXJyLmZvbygpICYmXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgLy8gQ2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufSkoKVxuXG4vKipcbiAqIENsYXNzOiBCdWZmZXJcbiAqID09PT09PT09PT09PT1cbiAqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGFyZSBhdWdtZW50ZWRcbiAqIHdpdGggZnVuY3Rpb24gcHJvcGVydGllcyBmb3IgYWxsIHRoZSBub2RlIGBCdWZmZXJgIEFQSSBmdW5jdGlvbnMuIFdlIHVzZVxuICogYFVpbnQ4QXJyYXlgIHNvIHRoYXQgc3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXQgcmV0dXJuc1xuICogYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogQnkgYXVnbWVudGluZyB0aGUgaW5zdGFuY2VzLCB3ZSBjYW4gYXZvaWQgbW9kaWZ5aW5nIHRoZSBgVWludDhBcnJheWBcbiAqIHByb3RvdHlwZS5cbiAqL1xuZnVuY3Rpb24gQnVmZmVyIChzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKVxuICAgIHJldHVybiBuZXcgQnVmZmVyKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pXG5cbiAgdmFyIHR5cGUgPSB0eXBlb2Ygc3ViamVjdFxuXG4gIC8vIFdvcmthcm91bmQ6IG5vZGUncyBiYXNlNjQgaW1wbGVtZW50YXRpb24gYWxsb3dzIGZvciBub24tcGFkZGVkIHN0cmluZ3NcbiAgLy8gd2hpbGUgYmFzZTY0LWpzIGRvZXMgbm90LlxuICBpZiAoZW5jb2RpbmcgPT09ICdiYXNlNjQnICYmIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgc3ViamVjdCA9IHN0cmluZ3RyaW0oc3ViamVjdClcbiAgICB3aGlsZSAoc3ViamVjdC5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgICBzdWJqZWN0ID0gc3ViamVjdCArICc9J1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpbmQgdGhlIGxlbmd0aFxuICB2YXIgbGVuZ3RoXG4gIGlmICh0eXBlID09PSAnbnVtYmVyJylcbiAgICBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdClcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpXG4gICAgbGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoc3ViamVjdCwgZW5jb2RpbmcpXG4gIGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKVxuICAgIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0Lmxlbmd0aCkgLy8gYXNzdW1lIHRoYXQgb2JqZWN0IGlzIGFycmF5LWxpa2VcbiAgZWxzZVxuICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgbmVlZHMgdG8gYmUgYSBudW1iZXIsIGFycmF5IG9yIHN0cmluZy4nKVxuXG4gIHZhciBidWZcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAvLyBQcmVmZXJyZWQ6IFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgYnVmID0gQnVmZmVyLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KGxlbmd0aCkpXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBUSElTIGluc3RhbmNlIG9mIEJ1ZmZlciAoY3JlYXRlZCBieSBgbmV3YClcbiAgICBidWYgPSB0aGlzXG4gICAgYnVmLmxlbmd0aCA9IGxlbmd0aFxuICAgIGJ1Zi5faXNCdWZmZXIgPSB0cnVlXG4gIH1cblxuICB2YXIgaVxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiB0eXBlb2Ygc3ViamVjdC5ieXRlTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgIC8vIFNwZWVkIG9wdGltaXphdGlvbiAtLSB1c2Ugc2V0IGlmIHdlJ3JlIGNvcHlpbmcgZnJvbSBhIHR5cGVkIGFycmF5XG4gICAgYnVmLl9zZXQoc3ViamVjdClcbiAgfSBlbHNlIGlmIChpc0FycmF5aXNoKHN1YmplY3QpKSB7XG4gICAgLy8gVHJlYXQgYXJyYXktaXNoIG9iamVjdHMgYXMgYSBieXRlIGFycmF5XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpKVxuICAgICAgICBidWZbaV0gPSBzdWJqZWN0LnJlYWRVSW50OChpKVxuICAgICAgZWxzZVxuICAgICAgICBidWZbaV0gPSBzdWJqZWN0W2ldXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgYnVmLndyaXRlKHN1YmplY3QsIDAsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmICFub1plcm8pIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ1ZltpXSA9IDBcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmXG59XG5cbi8vIFNUQVRJQyBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAncmF3JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gKGIpIHtcbiAgcmV0dXJuICEhKGIgIT09IG51bGwgJiYgYiAhPT0gdW5kZWZpbmVkICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGZ1bmN0aW9uIChzdHIsIGVuY29kaW5nKSB7XG4gIHZhciByZXRcbiAgc3RyID0gc3RyICsgJydcbiAgc3dpdGNoIChlbmNvZGluZyB8fCAndXRmOCcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAvIDJcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gdXRmOFRvQnl0ZXMoc3RyKS5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAncmF3JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IGJhc2U2NFRvQnl0ZXMoc3RyKS5sZW5ndGhcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggKiAyXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIChsaXN0LCB0b3RhbExlbmd0aCkge1xuICBhc3NlcnQoaXNBcnJheShsaXN0KSwgJ1VzYWdlOiBCdWZmZXIuY29uY2F0KGxpc3QsIFt0b3RhbExlbmd0aF0pXFxuJyArXG4gICAgICAnbGlzdCBzaG91bGQgYmUgYW4gQXJyYXkuJylcblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcigwKVxuICB9IGVsc2UgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGxpc3RbMF1cbiAgfVxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdG90YWxMZW5ndGggIT09ICdudW1iZXInKSB7XG4gICAgdG90YWxMZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvdGFsTGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIodG90YWxMZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgaXRlbS5jb3B5KGJ1ZiwgcG9zKVxuICAgIHBvcyArPSBpdGVtLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZcbn1cblxuLy8gQlVGRkVSIElOU1RBTkNFIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIF9oZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGFzc2VydChzdHJMZW4gJSAyID09PSAwLCAnSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGJ5dGUgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgYXNzZXJ0KCFpc05hTihieXRlKSwgJ0ludmFsaWQgaGV4IHN0cmluZycpXG4gICAgYnVmW29mZnNldCArIGldID0gYnl0ZVxuICB9XG4gIEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gaSAqIDJcbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gX3V0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF9hc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBfYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIF9iYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gU3VwcG9ydCBib3RoIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZylcbiAgLy8gYW5kIHRoZSBsZWdhY3kgKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIGlmICghaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHsgIC8vIGxlZ2FjeVxuICAgIHZhciBzd2FwID0gZW5jb2RpbmdcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIG9mZnNldCA9IGxlbmd0aFxuICAgIGxlbmd0aCA9IHN3YXBcbiAgfVxuXG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpXG5cbiAgdmFyIHJldFxuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG5cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpXG4gIHN0YXJ0ID0gTnVtYmVyKHN0YXJ0KSB8fCAwXG4gIGVuZCA9IChlbmQgIT09IHVuZGVmaW5lZClcbiAgICA/IE51bWJlcihlbmQpXG4gICAgOiBlbmQgPSBzZWxmLmxlbmd0aFxuXG4gIC8vIEZhc3RwYXRoIGVtcHR5IHN0cmluZ3NcbiAgaWYgKGVuZCA9PT0gc3RhcnQpXG4gICAgcmV0dXJuICcnXG5cbiAgdmFyIHJldFxuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldF9zdGFydCwgc3RhcnQsIGVuZCkge1xuICB2YXIgc291cmNlID0gdGhpc1xuXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICghdGFyZ2V0X3N0YXJ0KSB0YXJnZXRfc3RhcnQgPSAwXG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgc291cmNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnc291cmNlRW5kIDwgc291cmNlU3RhcnQnKVxuICBhc3NlcnQodGFyZ2V0X3N0YXJ0ID49IDAgJiYgdGFyZ2V0X3N0YXJ0IDwgdGFyZ2V0Lmxlbmd0aCxcbiAgICAgICd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCBzb3VyY2UubGVuZ3RoLCAnc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gc291cmNlLmxlbmd0aCwgJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpXG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgPCBlbmQgLSBzdGFydClcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0ICsgc3RhcnRcblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAobGVuIDwgMTAwIHx8ICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0X3N0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICB9IGVsc2Uge1xuICAgIHRhcmdldC5fc2V0KHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSwgdGFyZ2V0X3N0YXJ0KVxuICB9XG59XG5cbmZ1bmN0aW9uIF9iYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gX3V0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXMgPSAnJ1xuICB2YXIgdG1wID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgaWYgKGJ1ZltpXSA8PSAweDdGKSB7XG4gICAgICByZXMgKz0gZGVjb2RlVXRmOENoYXIodG1wKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICAgICAgdG1wID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgdG1wICs9ICclJyArIGJ1ZltpXS50b1N0cmluZygxNilcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzICsgZGVjb2RlVXRmOENoYXIodG1wKVxufVxuXG5mdW5jdGlvbiBfYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspXG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiBfYXNjaWlTbGljZShidWYsIHN0YXJ0LCBlbmQpXG59XG5cbmZ1bmN0aW9uIF9oZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2krMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gY2xhbXAoc3RhcnQsIGxlbiwgMClcbiAgZW5kID0gY2xhbXAoZW5kLCBsZW4sIGxlbilcblxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIHJldHVybiBCdWZmZXIuX2F1Z21lbnQodGhpcy5zdWJhcnJheShzdGFydCwgZW5kKSlcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIHZhciBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQsIHRydWUpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgaSsrKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gICAgcmV0dXJuIG5ld0J1ZlxuICB9XG59XG5cbi8vIGBnZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5nZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLnJlYWRVSW50OChvZmZzZXQpXG59XG5cbi8vIGBzZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2LCBvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpXG4gIHJldHVybiB0aGlzLndyaXRlVUludDgodiwgb2Zmc2V0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5mdW5jdGlvbiBfcmVhZFVJbnQxNiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWxcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdXG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDhcbiAgfSBlbHNlIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XSA8PCA4XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWRVSW50MzIgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsXG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbilcbiAgICAgIHZhbCA9IGJ1ZltvZmZzZXQgKyAyXSA8PCAxNlxuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4XG4gICAgdmFsIHw9IGJ1ZltvZmZzZXRdXG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pXG4gICAgICB2YWwgPSB2YWwgKyAoYnVmW29mZnNldCArIDNdIDw8IDI0ID4+PiAwKVxuICB9IGVsc2Uge1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKVxuICAgICAgdmFsID0gYnVmW29mZnNldCArIDFdIDw8IDE2XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDJdIDw8IDhcbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgM11cbiAgICB2YWwgPSB2YWwgKyAoYnVmW29mZnNldF0gPDwgMjQgPj4+IDApXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLFxuICAgICAgICAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgdmFyIG5lZyA9IHRoaXNbb2Zmc2V0XSAmIDB4ODBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbmZ1bmN0aW9uIF9yZWFkSW50MTYgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsID0gX3JlYWRVSW50MTYoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSlcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZmZmIC0gdmFsICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZEludDMyIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpXG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDAwMDAwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmZmZmZmZmIC0gdmFsICsgMSkgKiAtMVxuICBlbHNlXG4gICAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZEZsb2F0IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkRG91YmxlIChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZilcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVyblxuXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlXG59XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmYpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgMik7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPVxuICAgICAgICAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmZmZmZmKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDQpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID1cbiAgICAgICAgKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmLCAtMHg4MClcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgdGhpcy53cml0ZVVJbnQ4KHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgdGhpcy53cml0ZVVJbnQ4KDB4ZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZiwgLTB4ODAwMClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIF93cml0ZVVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICBfd3JpdGVVSW50MTYoYnVmLCAweGZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICBfd3JpdGVVSW50MzIoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxuICBlbHNlXG4gICAgX3dyaXRlVUludDMyKGJ1ZiwgMHhmZmZmZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsXG4gICAgICAgICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gZmlsbCh2YWx1ZSwgc3RhcnQ9MCwgZW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAodmFsdWUsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCF2YWx1ZSkgdmFsdWUgPSAwXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCkgZW5kID0gdGhpcy5sZW5ndGhcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gdmFsdWUuY2hhckNvZGVBdCgwKVxuICB9XG5cbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbHVlKSwgJ3ZhbHVlIGlzIG5vdCBhIG51bWJlcicpXG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdlbmQgPCBzdGFydCcpXG5cbiAgLy8gRmlsbCAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm5cbiAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHRoaXMubGVuZ3RoLCAnc3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gdGhpcy5sZW5ndGgsICdlbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICB0aGlzW2ldID0gdmFsdWVcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvdXQgPSBbXVxuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIG91dFtpXSA9IHRvSGV4KHRoaXNbaV0pXG4gICAgaWYgKGkgPT09IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMpIHtcbiAgICAgIG91dFtpICsgMV0gPSAnLi4uJ1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBvdXQuam9pbignICcpICsgJz4nXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBgQXJyYXlCdWZmZXJgIHdpdGggdGhlICpjb3BpZWQqIG1lbW9yeSBvZiB0aGUgYnVmZmVyIGluc3RhbmNlLlxuICogQWRkZWQgaW4gTm9kZSAwLjEyLiBPbmx5IGF2YWlsYWJsZSBpbiBicm93c2VycyB0aGF0IHN1cHBvcnQgQXJyYXlCdWZmZXIuXG4gKi9cbkJ1ZmZlci5wcm90b3R5cGUudG9BcnJheUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgICByZXR1cm4gKG5ldyBCdWZmZXIodGhpcykpLmJ1ZmZlclxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5sZW5ndGgpXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYnVmLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKVxuICAgICAgICBidWZbaV0gPSB0aGlzW2ldXG4gICAgICByZXR1cm4gYnVmLmJ1ZmZlclxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0J1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJylcbiAgfVxufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbnZhciBCUCA9IEJ1ZmZlci5wcm90b3R5cGVcblxuLyoqXG4gKiBBdWdtZW50IGEgVWludDhBcnJheSAqaW5zdGFuY2UqIChub3QgdGhlIFVpbnQ4QXJyYXkgY2xhc3MhKSB3aXRoIEJ1ZmZlciBtZXRob2RzXG4gKi9cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9pc0J1ZmZlciA9IHRydWVcblxuICAvLyBzYXZlIHJlZmVyZW5jZSB0byBvcmlnaW5hbCBVaW50OEFycmF5IGdldC9zZXQgbWV0aG9kcyBiZWZvcmUgb3ZlcndyaXRpbmdcbiAgYXJyLl9nZXQgPSBhcnIuZ2V0XG4gIGFyci5fc2V0ID0gYXJyLnNldFxuXG4gIC8vIGRlcHJlY2F0ZWQsIHdpbGwgYmUgcmVtb3ZlZCBpbiBub2RlIDAuMTMrXG4gIGFyci5nZXQgPSBCUC5nZXRcbiAgYXJyLnNldCA9IEJQLnNldFxuXG4gIGFyci53cml0ZSA9IEJQLndyaXRlXG4gIGFyci50b1N0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0xvY2FsZVN0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0pTT04gPSBCUC50b0pTT05cbiAgYXJyLmNvcHkgPSBCUC5jb3B5XG4gIGFyci5zbGljZSA9IEJQLnNsaWNlXG4gIGFyci5yZWFkVUludDggPSBCUC5yZWFkVUludDhcbiAgYXJyLnJlYWRVSW50MTZMRSA9IEJQLnJlYWRVSW50MTZMRVxuICBhcnIucmVhZFVJbnQxNkJFID0gQlAucmVhZFVJbnQxNkJFXG4gIGFyci5yZWFkVUludDMyTEUgPSBCUC5yZWFkVUludDMyTEVcbiAgYXJyLnJlYWRVSW50MzJCRSA9IEJQLnJlYWRVSW50MzJCRVxuICBhcnIucmVhZEludDggPSBCUC5yZWFkSW50OFxuICBhcnIucmVhZEludDE2TEUgPSBCUC5yZWFkSW50MTZMRVxuICBhcnIucmVhZEludDE2QkUgPSBCUC5yZWFkSW50MTZCRVxuICBhcnIucmVhZEludDMyTEUgPSBCUC5yZWFkSW50MzJMRVxuICBhcnIucmVhZEludDMyQkUgPSBCUC5yZWFkSW50MzJCRVxuICBhcnIucmVhZEZsb2F0TEUgPSBCUC5yZWFkRmxvYXRMRVxuICBhcnIucmVhZEZsb2F0QkUgPSBCUC5yZWFkRmxvYXRCRVxuICBhcnIucmVhZERvdWJsZUxFID0gQlAucmVhZERvdWJsZUxFXG4gIGFyci5yZWFkRG91YmxlQkUgPSBCUC5yZWFkRG91YmxlQkVcbiAgYXJyLndyaXRlVUludDggPSBCUC53cml0ZVVJbnQ4XG4gIGFyci53cml0ZVVJbnQxNkxFID0gQlAud3JpdGVVSW50MTZMRVxuICBhcnIud3JpdGVVSW50MTZCRSA9IEJQLndyaXRlVUludDE2QkVcbiAgYXJyLndyaXRlVUludDMyTEUgPSBCUC53cml0ZVVJbnQzMkxFXG4gIGFyci53cml0ZVVJbnQzMkJFID0gQlAud3JpdGVVSW50MzJCRVxuICBhcnIud3JpdGVJbnQ4ID0gQlAud3JpdGVJbnQ4XG4gIGFyci53cml0ZUludDE2TEUgPSBCUC53cml0ZUludDE2TEVcbiAgYXJyLndyaXRlSW50MTZCRSA9IEJQLndyaXRlSW50MTZCRVxuICBhcnIud3JpdGVJbnQzMkxFID0gQlAud3JpdGVJbnQzMkxFXG4gIGFyci53cml0ZUludDMyQkUgPSBCUC53cml0ZUludDMyQkVcbiAgYXJyLndyaXRlRmxvYXRMRSA9IEJQLndyaXRlRmxvYXRMRVxuICBhcnIud3JpdGVGbG9hdEJFID0gQlAud3JpdGVGbG9hdEJFXG4gIGFyci53cml0ZURvdWJsZUxFID0gQlAud3JpdGVEb3VibGVMRVxuICBhcnIud3JpdGVEb3VibGVCRSA9IEJQLndyaXRlRG91YmxlQkVcbiAgYXJyLmZpbGwgPSBCUC5maWxsXG4gIGFyci5pbnNwZWN0ID0gQlAuaW5zcGVjdFxuICBhcnIudG9BcnJheUJ1ZmZlciA9IEJQLnRvQXJyYXlCdWZmZXJcblxuICByZXR1cm4gYXJyXG59XG5cbi8vIHNsaWNlKHN0YXJ0LCBlbmQpXG5mdW5jdGlvbiBjbGFtcCAoaW5kZXgsIGxlbiwgZGVmYXVsdFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSByZXR1cm4gZGVmYXVsdFZhbHVlXG4gIGluZGV4ID0gfn5pbmRleDsgIC8vIENvZXJjZSB0byBpbnRlZ2VyLlxuICBpZiAoaW5kZXggPj0gbGVuKSByZXR1cm4gbGVuXG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXhcbiAgaW5kZXggKz0gbGVuXG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXhcbiAgcmV0dXJuIDBcbn1cblxuZnVuY3Rpb24gY29lcmNlIChsZW5ndGgpIHtcbiAgLy8gQ29lcmNlIGxlbmd0aCB0byBhIG51bWJlciAocG9zc2libHkgTmFOKSwgcm91bmQgdXBcbiAgLy8gaW4gY2FzZSBpdCdzIGZyYWN0aW9uYWwgKGUuZy4gMTIzLjQ1NikgdGhlbiBkbyBhXG4gIC8vIGRvdWJsZSBuZWdhdGUgdG8gY29lcmNlIGEgTmFOIHRvIDAuIEVhc3ksIHJpZ2h0P1xuICBsZW5ndGggPSB+fk1hdGguY2VpbCgrbGVuZ3RoKVxuICByZXR1cm4gbGVuZ3RoIDwgMCA/IDAgOiBsZW5ndGhcbn1cblxuZnVuY3Rpb24gaXNBcnJheSAoc3ViamVjdCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHN1YmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN1YmplY3QpID09PSAnW29iamVjdCBBcnJheV0nXG4gIH0pKHN1YmplY3QpXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXlpc2ggKHN1YmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXkoc3ViamVjdCkgfHwgQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpIHx8XG4gICAgICBzdWJqZWN0ICYmIHR5cGVvZiBzdWJqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgdHlwZW9mIHN1YmplY3QubGVuZ3RoID09PSAnbnVtYmVyJ1xufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGIgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGlmIChiIDw9IDB4N0YpXG4gICAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSlcbiAgICBlbHNlIHtcbiAgICAgIHZhciBzdGFydCA9IGlcbiAgICAgIGlmIChiID49IDB4RDgwMCAmJiBiIDw9IDB4REZGRikgaSsrXG4gICAgICB2YXIgaCA9IGVuY29kZVVSSUNvbXBvbmVudChzdHIuc2xpY2Uoc3RhcnQsIGkrMSkpLnN1YnN0cigxKS5zcGxpdCgnJScpXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGgubGVuZ3RoOyBqKyspXG4gICAgICAgIGJ5dGVBcnJheS5wdXNoKHBhcnNlSW50KGhbal0sIDE2KSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoc3RyKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIHBvc1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKVxuICAgICAgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBkZWNvZGVVdGY4Q2hhciAoc3RyKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkZGRCkgLy8gVVRGIDggaW52YWxpZCBjaGFyXG4gIH1cbn1cblxuLypcbiAqIFdlIGhhdmUgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHZhbHVlIGlzIGEgdmFsaWQgaW50ZWdlci4gVGhpcyBtZWFucyB0aGF0IGl0XG4gKiBpcyBub24tbmVnYXRpdmUuIEl0IGhhcyBubyBmcmFjdGlvbmFsIGNvbXBvbmVudCBhbmQgdGhhdCBpdCBkb2VzIG5vdFxuICogZXhjZWVkIHRoZSBtYXhpbXVtIGFsbG93ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHZlcmlmdWludCAodmFsdWUsIG1heCkge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPj0gMCwgJ3NwZWNpZmllZCBhIG5lZ2F0aXZlIHZhbHVlIGZvciB3cml0aW5nIGFuIHVuc2lnbmVkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGlzIGxhcmdlciB0aGFuIG1heGltdW0gdmFsdWUgZm9yIHR5cGUnKVxuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKVxufVxuXG5mdW5jdGlvbiB2ZXJpZnNpbnQgKHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKVxufVxuXG5mdW5jdGlvbiB2ZXJpZklFRUU3NTQgKHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKVxufVxuXG5mdW5jdGlvbiBhc3NlcnQgKHRlc3QsIG1lc3NhZ2UpIHtcbiAgaWYgKCF0ZXN0KSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCAnRmFpbGVkIGFzc2VydGlvbicpXG59XG4iLCJ2YXIgbG9va3VwID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXG47KGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuICB2YXIgQXJyID0gKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJylcbiAgICA/IFVpbnQ4QXJyYXlcbiAgICA6IEFycmF5XG5cblx0dmFyIFpFUk8gICA9ICcwJy5jaGFyQ29kZUF0KDApXG5cdHZhciBQTFVTICAgPSAnKycuY2hhckNvZGVBdCgwKVxuXHR2YXIgU0xBU0ggID0gJy8nLmNoYXJDb2RlQXQoMClcblx0dmFyIE5VTUJFUiA9ICcwJy5jaGFyQ29kZUF0KDApXG5cdHZhciBMT1dFUiAgPSAnYScuY2hhckNvZGVBdCgwKVxuXHR2YXIgVVBQRVIgID0gJ0EnLmNoYXJDb2RlQXQoMClcblxuXHRmdW5jdGlvbiBkZWNvZGUgKGVsdCkge1xuXHRcdHZhciBjb2RlID0gZWx0LmNoYXJDb2RlQXQoMClcblx0XHRpZiAoY29kZSA9PT0gUExVUylcblx0XHRcdHJldHVybiA2MiAvLyAnKydcblx0XHRpZiAoY29kZSA9PT0gU0xBU0gpXG5cdFx0XHRyZXR1cm4gNjMgLy8gJy8nXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIpXG5cdFx0XHRyZXR1cm4gLTEgLy9ubyBtYXRjaFxuXHRcdGlmIChjb2RlIDwgTlVNQkVSICsgMTApXG5cdFx0XHRyZXR1cm4gY29kZSAtIE5VTUJFUiArIDI2ICsgMjZcblx0XHRpZiAoY29kZSA8IFVQUEVSICsgMjYpXG5cdFx0XHRyZXR1cm4gY29kZSAtIFVQUEVSXG5cdFx0aWYgKGNvZGUgPCBMT1dFUiArIDI2KVxuXHRcdFx0cmV0dXJuIGNvZGUgLSBMT1dFUiArIDI2XG5cdH1cblxuXHRmdW5jdGlvbiBiNjRUb0J5dGVBcnJheSAoYjY0KSB7XG5cdFx0dmFyIGksIGosIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcblxuXHRcdGlmIChiNjQubGVuZ3RoICUgNCA+IDApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG5cdFx0fVxuXG5cdFx0Ly8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcblx0XHQvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG5cdFx0Ly8gcmVwcmVzZW50IG9uZSBieXRlXG5cdFx0Ly8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG5cdFx0Ly8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuXHRcdHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cdFx0cGxhY2VIb2xkZXJzID0gJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDIpID8gMiA6ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAxKSA/IDEgOiAwXG5cblx0XHQvLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcblx0XHRhcnIgPSBuZXcgQXJyKGI2NC5sZW5ndGggKiAzIC8gNCAtIHBsYWNlSG9sZGVycylcblxuXHRcdC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcblx0XHRsID0gcGxhY2VIb2xkZXJzID4gMCA/IGI2NC5sZW5ndGggLSA0IDogYjY0Lmxlbmd0aFxuXG5cdFx0dmFyIEwgPSAwXG5cblx0XHRmdW5jdGlvbiBwdXNoICh2KSB7XG5cdFx0XHRhcnJbTCsrXSA9IHZcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwLCBqID0gMDsgaSA8IGw7IGkgKz0gNCwgaiArPSAzKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDE4KSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDEyKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpIDw8IDYpIHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDMpKVxuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwMDApID4+IDE2KVxuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwKSA+PiA4KVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH1cblxuXHRcdGlmIChwbGFjZUhvbGRlcnMgPT09IDIpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMikgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA+PiA0KVxuXHRcdFx0cHVzaCh0bXAgJiAweEZGKVxuXHRcdH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG5cdFx0XHR0bXAgPSAoZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDEwKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDQpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPj4gMilcblx0XHRcdHB1c2goKHRtcCA+PiA4KSAmIDB4RkYpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFyclxuXHR9XG5cblx0ZnVuY3Rpb24gdWludDhUb0Jhc2U2NCAodWludDgpIHtcblx0XHR2YXIgaSxcblx0XHRcdGV4dHJhQnl0ZXMgPSB1aW50OC5sZW5ndGggJSAzLCAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuXHRcdFx0b3V0cHV0ID0gXCJcIixcblx0XHRcdHRlbXAsIGxlbmd0aFxuXG5cdFx0ZnVuY3Rpb24gZW5jb2RlIChudW0pIHtcblx0XHRcdHJldHVybiBsb29rdXAuY2hhckF0KG51bSlcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuXHRcdFx0cmV0dXJuIGVuY29kZShudW0gPj4gMTggJiAweDNGKSArIGVuY29kZShudW0gPj4gMTIgJiAweDNGKSArIGVuY29kZShudW0gPj4gNiAmIDB4M0YpICsgZW5jb2RlKG51bSAmIDB4M0YpXG5cdFx0fVxuXG5cdFx0Ly8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuXHRcdGZvciAoaSA9IDAsIGxlbmd0aCA9IHVpbnQ4Lmxlbmd0aCAtIGV4dHJhQnl0ZXM7IGkgPCBsZW5ndGg7IGkgKz0gMykge1xuXHRcdFx0dGVtcCA9ICh1aW50OFtpXSA8PCAxNikgKyAodWludDhbaSArIDFdIDw8IDgpICsgKHVpbnQ4W2kgKyAyXSlcblx0XHRcdG91dHB1dCArPSB0cmlwbGV0VG9CYXNlNjQodGVtcClcblx0XHR9XG5cblx0XHQvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG5cdFx0c3dpdGNoIChleHRyYUJ5dGVzKSB7XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHRlbXAgPSB1aW50OFt1aW50OC5sZW5ndGggLSAxXVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMilcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA8PCA0KSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSAnPT0nXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHRlbXAgPSAodWludDhbdWludDgubGVuZ3RoIC0gMl0gPDwgOCkgKyAodWludDhbdWludDgubGVuZ3RoIC0gMV0pXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAxMClcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA+PiA0KSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUoKHRlbXAgPDwgMikgJiAweDNGKVxuXHRcdFx0XHRvdXRwdXQgKz0gJz0nXG5cdFx0XHRcdGJyZWFrXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dFxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMudG9CeXRlQXJyYXkgPSBiNjRUb0J5dGVBcnJheVxuXHRtb2R1bGUuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gdWludDhUb0Jhc2U2NFxufSgpKVxuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24oYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSxcbiAgICAgIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDEsXG4gICAgICBlTWF4ID0gKDEgPDwgZUxlbikgLSAxLFxuICAgICAgZUJpYXMgPSBlTWF4ID4+IDEsXG4gICAgICBuQml0cyA9IC03LFxuICAgICAgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwLFxuICAgICAgZCA9IGlzTEUgPyAtMSA6IDEsXG4gICAgICBzID0gYnVmZmVyW29mZnNldCArIGldO1xuXG4gIGkgKz0gZDtcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKTtcbiAgcyA+Pj0gKC1uQml0cyk7XG4gIG5CaXRzICs9IGVMZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpO1xuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpO1xuICBlID4+PSAoLW5CaXRzKTtcbiAgbkJpdHMgKz0gbUxlbjtcbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCk7XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzO1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSk7XG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICBlID0gZSAtIGVCaWFzO1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pO1xufTtcblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjLFxuICAgICAgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMSxcbiAgICAgIGVNYXggPSAoMSA8PCBlTGVuKSAtIDEsXG4gICAgICBlQmlhcyA9IGVNYXggPj4gMSxcbiAgICAgIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKSxcbiAgICAgIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKSxcbiAgICAgIGQgPSBpc0xFID8gMSA6IC0xLFxuICAgICAgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMDtcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKTtcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMDtcbiAgICBlID0gZU1heDtcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMik7XG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tO1xuICAgICAgYyAqPSAyO1xuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gYztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrKztcbiAgICAgIGMgLz0gMjtcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwO1xuICAgICAgZSA9IGVNYXg7XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xuICAgICAgZSA9IGUgKyBlQmlhcztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xuICAgICAgZSA9IDA7XG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCk7XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbTtcbiAgZUxlbiArPSBtTGVuO1xuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpO1xuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyODtcbn07XG4iLCJ2YXIgQnVmZmVyID0gcmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyO1xudmFyIGludFNpemUgPSA0O1xudmFyIHplcm9CdWZmZXIgPSBuZXcgQnVmZmVyKGludFNpemUpOyB6ZXJvQnVmZmVyLmZpbGwoMCk7XG52YXIgY2hyc3ogPSA4O1xuXG5mdW5jdGlvbiB0b0FycmF5KGJ1ZiwgYmlnRW5kaWFuKSB7XG4gIGlmICgoYnVmLmxlbmd0aCAlIGludFNpemUpICE9PSAwKSB7XG4gICAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGggKyAoaW50U2l6ZSAtIChidWYubGVuZ3RoICUgaW50U2l6ZSkpO1xuICAgIGJ1ZiA9IEJ1ZmZlci5jb25jYXQoW2J1ZiwgemVyb0J1ZmZlcl0sIGxlbik7XG4gIH1cblxuICB2YXIgYXJyID0gW107XG4gIHZhciBmbiA9IGJpZ0VuZGlhbiA/IGJ1Zi5yZWFkSW50MzJCRSA6IGJ1Zi5yZWFkSW50MzJMRTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWYubGVuZ3RoOyBpICs9IGludFNpemUpIHtcbiAgICBhcnIucHVzaChmbi5jYWxsKGJ1ZiwgaSkpO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIHRvQnVmZmVyKGFyciwgc2l6ZSwgYmlnRW5kaWFuKSB7XG4gIHZhciBidWYgPSBuZXcgQnVmZmVyKHNpemUpO1xuICB2YXIgZm4gPSBiaWdFbmRpYW4gPyBidWYud3JpdGVJbnQzMkJFIDogYnVmLndyaXRlSW50MzJMRTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBmbi5jYWxsKGJ1ZiwgYXJyW2ldLCBpICogNCwgdHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIGJ1Zjtcbn1cblxuZnVuY3Rpb24gaGFzaChidWYsIGZuLCBoYXNoU2l6ZSwgYmlnRW5kaWFuKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIGJ1ZiA9IG5ldyBCdWZmZXIoYnVmKTtcbiAgdmFyIGFyciA9IGZuKHRvQXJyYXkoYnVmLCBiaWdFbmRpYW4pLCBidWYubGVuZ3RoICogY2hyc3opO1xuICByZXR1cm4gdG9CdWZmZXIoYXJyLCBoYXNoU2l6ZSwgYmlnRW5kaWFuKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGhhc2g6IGhhc2ggfTtcbiIsInZhciBCdWZmZXIgPSByZXF1aXJlKCdidWZmZXInKS5CdWZmZXJcbnZhciBzaGEgPSByZXF1aXJlKCcuL3NoYScpXG52YXIgc2hhMjU2ID0gcmVxdWlyZSgnLi9zaGEyNTYnKVxudmFyIHJuZyA9IHJlcXVpcmUoJy4vcm5nJylcbnZhciBtZDUgPSByZXF1aXJlKCcuL21kNScpXG5cbnZhciBhbGdvcml0aG1zID0ge1xuICBzaGExOiBzaGEsXG4gIHNoYTI1Njogc2hhMjU2LFxuICBtZDU6IG1kNVxufVxuXG52YXIgYmxvY2tzaXplID0gNjRcbnZhciB6ZXJvQnVmZmVyID0gbmV3IEJ1ZmZlcihibG9ja3NpemUpOyB6ZXJvQnVmZmVyLmZpbGwoMClcbmZ1bmN0aW9uIGhtYWMoZm4sIGtleSwgZGF0YSkge1xuICBpZighQnVmZmVyLmlzQnVmZmVyKGtleSkpIGtleSA9IG5ldyBCdWZmZXIoa2V5KVxuICBpZighQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSBkYXRhID0gbmV3IEJ1ZmZlcihkYXRhKVxuXG4gIGlmKGtleS5sZW5ndGggPiBibG9ja3NpemUpIHtcbiAgICBrZXkgPSBmbihrZXkpXG4gIH0gZWxzZSBpZihrZXkubGVuZ3RoIDwgYmxvY2tzaXplKSB7XG4gICAga2V5ID0gQnVmZmVyLmNvbmNhdChba2V5LCB6ZXJvQnVmZmVyXSwgYmxvY2tzaXplKVxuICB9XG5cbiAgdmFyIGlwYWQgPSBuZXcgQnVmZmVyKGJsb2Nrc2l6ZSksIG9wYWQgPSBuZXcgQnVmZmVyKGJsb2Nrc2l6ZSlcbiAgZm9yKHZhciBpID0gMDsgaSA8IGJsb2Nrc2l6ZTsgaSsrKSB7XG4gICAgaXBhZFtpXSA9IGtleVtpXSBeIDB4MzZcbiAgICBvcGFkW2ldID0ga2V5W2ldIF4gMHg1Q1xuICB9XG5cbiAgdmFyIGhhc2ggPSBmbihCdWZmZXIuY29uY2F0KFtpcGFkLCBkYXRhXSkpXG4gIHJldHVybiBmbihCdWZmZXIuY29uY2F0KFtvcGFkLCBoYXNoXSkpXG59XG5cbmZ1bmN0aW9uIGhhc2goYWxnLCBrZXkpIHtcbiAgYWxnID0gYWxnIHx8ICdzaGExJ1xuICB2YXIgZm4gPSBhbGdvcml0aG1zW2FsZ11cbiAgdmFyIGJ1ZnMgPSBbXVxuICB2YXIgbGVuZ3RoID0gMFxuICBpZighZm4pIGVycm9yKCdhbGdvcml0aG06JywgYWxnLCAnaXMgbm90IHlldCBzdXBwb3J0ZWQnKVxuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIGlmKCFCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIGRhdGEgPSBuZXcgQnVmZmVyKGRhdGEpXG4gICAgICAgIFxuICAgICAgYnVmcy5wdXNoKGRhdGEpXG4gICAgICBsZW5ndGggKz0gZGF0YS5sZW5ndGhcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcbiAgICBkaWdlc3Q6IGZ1bmN0aW9uIChlbmMpIHtcbiAgICAgIHZhciBidWYgPSBCdWZmZXIuY29uY2F0KGJ1ZnMpXG4gICAgICB2YXIgciA9IGtleSA/IGhtYWMoZm4sIGtleSwgYnVmKSA6IGZuKGJ1ZilcbiAgICAgIGJ1ZnMgPSBudWxsXG4gICAgICByZXR1cm4gZW5jID8gci50b1N0cmluZyhlbmMpIDogclxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBlcnJvciAoKSB7XG4gIHZhciBtID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpLmpvaW4oJyAnKVxuICB0aHJvdyBuZXcgRXJyb3IoW1xuICAgIG0sXG4gICAgJ3dlIGFjY2VwdCBwdWxsIHJlcXVlc3RzJyxcbiAgICAnaHR0cDovL2dpdGh1Yi5jb20vZG9taW5pY3RhcnIvY3J5cHRvLWJyb3dzZXJpZnknXG4gICAgXS5qb2luKCdcXG4nKSlcbn1cblxuZXhwb3J0cy5jcmVhdGVIYXNoID0gZnVuY3Rpb24gKGFsZykgeyByZXR1cm4gaGFzaChhbGcpIH1cbmV4cG9ydHMuY3JlYXRlSG1hYyA9IGZ1bmN0aW9uIChhbGcsIGtleSkgeyByZXR1cm4gaGFzaChhbGcsIGtleSkgfVxuZXhwb3J0cy5yYW5kb21CeXRlcyA9IGZ1bmN0aW9uKHNpemUsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayAmJiBjYWxsYmFjay5jYWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgdW5kZWZpbmVkLCBuZXcgQnVmZmVyKHJuZyhzaXplKSkpXG4gICAgfSBjYXRjaCAoZXJyKSB7IGNhbGxiYWNrKGVycikgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKHJuZyhzaXplKSlcbiAgfVxufVxuXG5mdW5jdGlvbiBlYWNoKGEsIGYpIHtcbiAgZm9yKHZhciBpIGluIGEpXG4gICAgZihhW2ldLCBpKVxufVxuXG4vLyB0aGUgbGVhc3QgSSBjYW4gZG8gaXMgbWFrZSBlcnJvciBtZXNzYWdlcyBmb3IgdGhlIHJlc3Qgb2YgdGhlIG5vZGUuanMvY3J5cHRvIGFwaS5cbmVhY2goWydjcmVhdGVDcmVkZW50aWFscydcbiwgJ2NyZWF0ZUNpcGhlcidcbiwgJ2NyZWF0ZUNpcGhlcml2J1xuLCAnY3JlYXRlRGVjaXBoZXInXG4sICdjcmVhdGVEZWNpcGhlcml2J1xuLCAnY3JlYXRlU2lnbidcbiwgJ2NyZWF0ZVZlcmlmeSdcbiwgJ2NyZWF0ZURpZmZpZUhlbGxtYW4nXG4sICdwYmtkZjInXSwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgZXhwb3J0c1tuYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICBlcnJvcignc29ycnksJywgbmFtZSwgJ2lzIG5vdCBpbXBsZW1lbnRlZCB5ZXQnKVxuICB9XG59KVxuIiwiLypcclxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxyXG4gKiBEaWdlc3QgQWxnb3JpdGhtLCBhcyBkZWZpbmVkIGluIFJGQyAxMzIxLlxyXG4gKiBWZXJzaW9uIDIuMSBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDIuXHJcbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcclxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXHJcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBtb3JlIGluZm8uXHJcbiAqL1xyXG5cclxudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcclxuXHJcbi8qXHJcbiAqIFBlcmZvcm0gYSBzaW1wbGUgc2VsZi10ZXN0IHRvIHNlZSBpZiB0aGUgVk0gaXMgd29ya2luZ1xyXG4gKi9cclxuZnVuY3Rpb24gbWQ1X3ZtX3Rlc3QoKVxyXG57XHJcbiAgcmV0dXJuIGhleF9tZDUoXCJhYmNcIikgPT0gXCI5MDAxNTA5ODNjZDI0ZmIwZDY5NjNmN2QyOGUxN2Y3MlwiO1xyXG59XHJcblxyXG4vKlxyXG4gKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzLCBhbmQgYSBiaXQgbGVuZ3RoXHJcbiAqL1xyXG5mdW5jdGlvbiBjb3JlX21kNSh4LCBsZW4pXHJcbntcclxuICAvKiBhcHBlbmQgcGFkZGluZyAqL1xyXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgKChsZW4pICUgMzIpO1xyXG4gIHhbKCgobGVuICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IGxlbjtcclxuXHJcbiAgdmFyIGEgPSAgMTczMjU4NDE5MztcclxuICB2YXIgYiA9IC0yNzE3MzM4Nzk7XHJcbiAgdmFyIGMgPSAtMTczMjU4NDE5NDtcclxuICB2YXIgZCA9ICAyNzE3MzM4Nzg7XHJcblxyXG4gIGZvcih2YXIgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNilcclxuICB7XHJcbiAgICB2YXIgb2xkYSA9IGE7XHJcbiAgICB2YXIgb2xkYiA9IGI7XHJcbiAgICB2YXIgb2xkYyA9IGM7XHJcbiAgICB2YXIgb2xkZCA9IGQ7XHJcblxyXG4gICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2krIDBdLCA3ICwgLTY4MDg3NjkzNik7XHJcbiAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSsgMV0sIDEyLCAtMzg5NTY0NTg2KTtcclxuICAgIGMgPSBtZDVfZmYoYywgZCwgYSwgYiwgeFtpKyAyXSwgMTcsICA2MDYxMDU4MTkpO1xyXG4gICAgYiA9IG1kNV9mZihiLCBjLCBkLCBhLCB4W2krIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xyXG4gICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2krIDRdLCA3ICwgLTE3NjQxODg5Nyk7XHJcbiAgICBkID0gbWQ1X2ZmKGQsIGEsIGIsIGMsIHhbaSsgNV0sIDEyLCAgMTIwMDA4MDQyNik7XHJcbiAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XHJcbiAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSsgN10sIDIyLCAtNDU3MDU5ODMpO1xyXG4gICAgYSA9IG1kNV9mZihhLCBiLCBjLCBkLCB4W2krIDhdLCA3ICwgIDE3NzAwMzU0MTYpO1xyXG4gICAgZCA9IG1kNV9mZihkLCBhLCBiLCBjLCB4W2krIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xyXG4gICAgYyA9IG1kNV9mZihjLCBkLCBhLCBiLCB4W2krMTBdLCAxNywgLTQyMDYzKTtcclxuICAgIGIgPSBtZDVfZmYoYiwgYywgZCwgYSwgeFtpKzExXSwgMjIsIC0xOTkwNDA0MTYyKTtcclxuICAgIGEgPSBtZDVfZmYoYSwgYiwgYywgZCwgeFtpKzEyXSwgNyAsICAxODA0NjAzNjgyKTtcclxuICAgIGQgPSBtZDVfZmYoZCwgYSwgYiwgYywgeFtpKzEzXSwgMTIsIC00MDM0MTEwMSk7XHJcbiAgICBjID0gbWQ1X2ZmKGMsIGQsIGEsIGIsIHhbaSsxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XHJcbiAgICBiID0gbWQ1X2ZmKGIsIGMsIGQsIGEsIHhbaSsxNV0sIDIyLCAgMTIzNjUzNTMyOSk7XHJcblxyXG4gICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2krIDFdLCA1ICwgLTE2NTc5NjUxMCk7XHJcbiAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSsgNl0sIDkgLCAtMTA2OTUwMTYzMik7XHJcbiAgICBjID0gbWQ1X2dnKGMsIGQsIGEsIGIsIHhbaSsxMV0sIDE0LCAgNjQzNzE3NzEzKTtcclxuICAgIGIgPSBtZDVfZ2coYiwgYywgZCwgYSwgeFtpKyAwXSwgMjAsIC0zNzM4OTczMDIpO1xyXG4gICAgYSA9IG1kNV9nZyhhLCBiLCBjLCBkLCB4W2krIDVdLCA1ICwgLTcwMTU1ODY5MSk7XHJcbiAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSsxMF0sIDkgLCAgMzgwMTYwODMpO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XHJcbiAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcclxuICAgIGEgPSBtZDVfZ2coYSwgYiwgYywgZCwgeFtpKyA5XSwgNSAsICA1Njg0NDY0MzgpO1xyXG4gICAgZCA9IG1kNV9nZyhkLCBhLCBiLCBjLCB4W2krMTRdLCA5ICwgLTEwMTk4MDM2OTApO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XHJcbiAgICBiID0gbWQ1X2dnKGIsIGMsIGQsIGEsIHhbaSsgOF0sIDIwLCAgMTE2MzUzMTUwMSk7XHJcbiAgICBhID0gbWQ1X2dnKGEsIGIsIGMsIGQsIHhbaSsxM10sIDUgLCAtMTQ0NDY4MTQ2Nyk7XHJcbiAgICBkID0gbWQ1X2dnKGQsIGEsIGIsIGMsIHhbaSsgMl0sIDkgLCAtNTE0MDM3ODQpO1xyXG4gICAgYyA9IG1kNV9nZyhjLCBkLCBhLCBiLCB4W2krIDddLCAxNCwgIDE3MzUzMjg0NzMpO1xyXG4gICAgYiA9IG1kNV9nZyhiLCBjLCBkLCBhLCB4W2krMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xyXG5cclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKyA1XSwgNCAsIC0zNzg1NTgpO1xyXG4gICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2krIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xyXG4gICAgYyA9IG1kNV9oaChjLCBkLCBhLCBiLCB4W2krMTFdLCAxNiwgIDE4MzkwMzA1NjIpO1xyXG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krMTRdLCAyMywgLTM1MzA5NTU2KTtcclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKyAxXSwgNCAsIC0xNTMwOTkyMDYwKTtcclxuICAgIGQgPSBtZDVfaGgoZCwgYSwgYiwgYywgeFtpKyA0XSwgMTEsICAxMjcyODkzMzUzKTtcclxuICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xyXG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xyXG4gICAgYSA9IG1kNV9oaChhLCBiLCBjLCBkLCB4W2krMTNdLCA0ICwgIDY4MTI3OTE3NCk7XHJcbiAgICBkID0gbWQ1X2hoKGQsIGEsIGIsIGMsIHhbaSsgMF0sIDExLCAtMzU4NTM3MjIyKTtcclxuICAgIGMgPSBtZDVfaGgoYywgZCwgYSwgYiwgeFtpKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xyXG4gICAgYiA9IG1kNV9oaChiLCBjLCBkLCBhLCB4W2krIDZdLCAyMywgIDc2MDI5MTg5KTtcclxuICAgIGEgPSBtZDVfaGgoYSwgYiwgYywgZCwgeFtpKyA5XSwgNCAsIC02NDAzNjQ0ODcpO1xyXG4gICAgZCA9IG1kNV9oaChkLCBhLCBiLCBjLCB4W2krMTJdLCAxMSwgLTQyMTgxNTgzNSk7XHJcbiAgICBjID0gbWQ1X2hoKGMsIGQsIGEsIGIsIHhbaSsxNV0sIDE2LCAgNTMwNzQyNTIwKTtcclxuICAgIGIgPSBtZDVfaGgoYiwgYywgZCwgYSwgeFtpKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xyXG5cclxuICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpKyAwXSwgNiAsIC0xOTg2MzA4NDQpO1xyXG4gICAgZCA9IG1kNV9paShkLCBhLCBiLCBjLCB4W2krIDddLCAxMCwgIDExMjY4OTE0MTUpO1xyXG4gICAgYyA9IG1kNV9paShjLCBkLCBhLCBiLCB4W2krMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xyXG4gICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2krIDVdLCAyMSwgLTU3NDM0MDU1KTtcclxuICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpKzEyXSwgNiAsICAxNzAwNDg1NTcxKTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcclxuICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpKzEwXSwgMTUsIC0xMDUxNTIzKTtcclxuICAgIGIgPSBtZDVfaWkoYiwgYywgZCwgYSwgeFtpKyAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcclxuICAgIGEgPSBtZDVfaWkoYSwgYiwgYywgZCwgeFtpKyA4XSwgNiAsICAxODczMzEzMzU5KTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKzE1XSwgMTAsIC0zMDYxMTc0NCk7XHJcbiAgICBjID0gbWQ1X2lpKGMsIGQsIGEsIGIsIHhbaSsgNl0sIDE1LCAtMTU2MDE5ODM4MCk7XHJcbiAgICBiID0gbWQ1X2lpKGIsIGMsIGQsIGEsIHhbaSsxM10sIDIxLCAgMTMwOTE1MTY0OSk7XHJcbiAgICBhID0gbWQ1X2lpKGEsIGIsIGMsIGQsIHhbaSsgNF0sIDYgLCAtMTQ1NTIzMDcwKTtcclxuICAgIGQgPSBtZDVfaWkoZCwgYSwgYiwgYywgeFtpKzExXSwgMTAsIC0xMTIwMjEwMzc5KTtcclxuICAgIGMgPSBtZDVfaWkoYywgZCwgYSwgYiwgeFtpKyAyXSwgMTUsICA3MTg3ODcyNTkpO1xyXG4gICAgYiA9IG1kNV9paShiLCBjLCBkLCBhLCB4W2krIDldLCAyMSwgLTM0MzQ4NTU1MSk7XHJcblxyXG4gICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xyXG4gICAgYiA9IHNhZmVfYWRkKGIsIG9sZGIpO1xyXG4gICAgYyA9IHNhZmVfYWRkKGMsIG9sZGMpO1xyXG4gICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xyXG4gIH1cclxuICByZXR1cm4gQXJyYXkoYSwgYiwgYywgZCk7XHJcblxyXG59XHJcblxyXG4vKlxyXG4gKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxyXG4gKi9cclxuZnVuY3Rpb24gbWQ1X2NtbihxLCBhLCBiLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIHNhZmVfYWRkKGJpdF9yb2woc2FmZV9hZGQoc2FmZV9hZGQoYSwgcSksIHNhZmVfYWRkKHgsIHQpKSwgcyksYik7XHJcbn1cclxuZnVuY3Rpb24gbWQ1X2ZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpXHJcbntcclxuICByZXR1cm4gbWQ1X2NtbigoYiAmIGMpIHwgKCh+YikgJiBkKSwgYSwgYiwgeCwgcywgdCk7XHJcbn1cclxuZnVuY3Rpb24gbWQ1X2dnKGEsIGIsIGMsIGQsIHgsIHMsIHQpXHJcbntcclxuICByZXR1cm4gbWQ1X2NtbigoYiAmIGQpIHwgKGMgJiAofmQpKSwgYSwgYiwgeCwgcywgdCk7XHJcbn1cclxuZnVuY3Rpb24gbWQ1X2hoKGEsIGIsIGMsIGQsIHgsIHMsIHQpXHJcbntcclxuICByZXR1cm4gbWQ1X2NtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xyXG59XHJcbmZ1bmN0aW9uIG1kNV9paShhLCBiLCBjLCBkLCB4LCBzLCB0KVxyXG57XHJcbiAgcmV0dXJuIG1kNV9jbW4oYyBeIChiIHwgKH5kKSksIGEsIGIsIHgsIHMsIHQpO1xyXG59XHJcblxyXG4vKlxyXG4gKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XHJcbiAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXHJcbiAqL1xyXG5mdW5jdGlvbiBzYWZlX2FkZCh4LCB5KVxyXG57XHJcbiAgdmFyIGxzdyA9ICh4ICYgMHhGRkZGKSArICh5ICYgMHhGRkZGKTtcclxuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XHJcbiAgcmV0dXJuIChtc3cgPDwgMTYpIHwgKGxzdyAmIDB4RkZGRik7XHJcbn1cclxuXHJcbi8qXHJcbiAqIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cclxuICovXHJcbmZ1bmN0aW9uIGJpdF9yb2wobnVtLCBjbnQpXHJcbntcclxuICByZXR1cm4gKG51bSA8PCBjbnQpIHwgKG51bSA+Pj4gKDMyIC0gY250KSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWQ1KGJ1Zikge1xyXG4gIHJldHVybiBoZWxwZXJzLmhhc2goYnVmLCBjb3JlX21kNSwgMTYpO1xyXG59O1xyXG4iLCIvLyBPcmlnaW5hbCBjb2RlIGFkYXB0ZWQgZnJvbSBSb2JlcnQgS2llZmZlci5cbi8vIGRldGFpbHMgYXQgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWRcbihmdW5jdGlvbigpIHtcbiAgdmFyIF9nbG9iYWwgPSB0aGlzO1xuXG4gIHZhciBtYXRoUk5HLCB3aGF0d2dSTkc7XG5cbiAgLy8gTk9URTogTWF0aC5yYW5kb20oKSBkb2VzIG5vdCBndWFyYW50ZWUgXCJjcnlwdG9ncmFwaGljIHF1YWxpdHlcIlxuICBtYXRoUk5HID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgIHZhciBieXRlcyA9IG5ldyBBcnJheShzaXplKTtcbiAgICB2YXIgcjtcblxuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgYnl0ZXNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ5dGVzO1xuICB9XG5cbiAgaWYgKF9nbG9iYWwuY3J5cHRvICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgICB3aGF0d2dSTkcgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgICB2YXIgYnl0ZXMgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYnl0ZXMpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH1cbiAgfVxuXG4gIG1vZHVsZS5leHBvcnRzID0gd2hhdHdnUk5HIHx8IG1hdGhSTkc7XG5cbn0oKSlcbiIsIi8qXG4gKiBBIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIFNlY3VyZSBIYXNoIEFsZ29yaXRobSwgU0hBLTEsIGFzIGRlZmluZWRcbiAqIGluIEZJUFMgUFVCIDE4MC0xXG4gKiBWZXJzaW9uIDIuMWEgQ29weXJpZ2h0IFBhdWwgSm9obnN0b24gMjAwMCAtIDIwMDIuXG4gKiBPdGhlciBjb250cmlidXRvcnM6IEdyZWcgSG9sdCwgQW5kcmV3IEtlcGVydCwgWWRuYXIsIExvc3RpbmV0XG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcbiAqIFNlZSBodHRwOi8vcGFqaG9tZS5vcmcudWsvY3J5cHQvbWQ1IGZvciBkZXRhaWxzLlxuICovXG5cbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbi8qXG4gKiBDYWxjdWxhdGUgdGhlIFNIQS0xIG9mIGFuIGFycmF5IG9mIGJpZy1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGhcbiAqL1xuZnVuY3Rpb24gY29yZV9zaGExKHgsIGxlbilcbntcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgeFtsZW4gPj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBsZW4gJSAzMik7XG4gIHhbKChsZW4gKyA2NCA+PiA5KSA8PCA0KSArIDE1XSA9IGxlbjtcblxuICB2YXIgdyA9IEFycmF5KDgwKTtcbiAgdmFyIGEgPSAgMTczMjU4NDE5MztcbiAgdmFyIGIgPSAtMjcxNzMzODc5O1xuICB2YXIgYyA9IC0xNzMyNTg0MTk0O1xuICB2YXIgZCA9ICAyNzE3MzM4Nzg7XG4gIHZhciBlID0gLTEwMDk1ODk3NzY7XG5cbiAgZm9yKHZhciBpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KVxuICB7XG4gICAgdmFyIG9sZGEgPSBhO1xuICAgIHZhciBvbGRiID0gYjtcbiAgICB2YXIgb2xkYyA9IGM7XG4gICAgdmFyIG9sZGQgPSBkO1xuICAgIHZhciBvbGRlID0gZTtcblxuICAgIGZvcih2YXIgaiA9IDA7IGogPCA4MDsgaisrKVxuICAgIHtcbiAgICAgIGlmKGogPCAxNikgd1tqXSA9IHhbaSArIGpdO1xuICAgICAgZWxzZSB3W2pdID0gcm9sKHdbai0zXSBeIHdbai04XSBeIHdbai0xNF0gXiB3W2otMTZdLCAxKTtcbiAgICAgIHZhciB0ID0gc2FmZV9hZGQoc2FmZV9hZGQocm9sKGEsIDUpLCBzaGExX2Z0KGosIGIsIGMsIGQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgc2FmZV9hZGQoc2FmZV9hZGQoZSwgd1tqXSksIHNoYTFfa3QoaikpKTtcbiAgICAgIGUgPSBkO1xuICAgICAgZCA9IGM7XG4gICAgICBjID0gcm9sKGIsIDMwKTtcbiAgICAgIGIgPSBhO1xuICAgICAgYSA9IHQ7XG4gICAgfVxuXG4gICAgYSA9IHNhZmVfYWRkKGEsIG9sZGEpO1xuICAgIGIgPSBzYWZlX2FkZChiLCBvbGRiKTtcbiAgICBjID0gc2FmZV9hZGQoYywgb2xkYyk7XG4gICAgZCA9IHNhZmVfYWRkKGQsIG9sZGQpO1xuICAgIGUgPSBzYWZlX2FkZChlLCBvbGRlKTtcbiAgfVxuICByZXR1cm4gQXJyYXkoYSwgYiwgYywgZCwgZSk7XG5cbn1cblxuLypcbiAqIFBlcmZvcm0gdGhlIGFwcHJvcHJpYXRlIHRyaXBsZXQgY29tYmluYXRpb24gZnVuY3Rpb24gZm9yIHRoZSBjdXJyZW50XG4gKiBpdGVyYXRpb25cbiAqL1xuZnVuY3Rpb24gc2hhMV9mdCh0LCBiLCBjLCBkKVxue1xuICBpZih0IDwgMjApIHJldHVybiAoYiAmIGMpIHwgKCh+YikgJiBkKTtcbiAgaWYodCA8IDQwKSByZXR1cm4gYiBeIGMgXiBkO1xuICBpZih0IDwgNjApIHJldHVybiAoYiAmIGMpIHwgKGIgJiBkKSB8IChjICYgZCk7XG4gIHJldHVybiBiIF4gYyBeIGQ7XG59XG5cbi8qXG4gKiBEZXRlcm1pbmUgdGhlIGFwcHJvcHJpYXRlIGFkZGl0aXZlIGNvbnN0YW50IGZvciB0aGUgY3VycmVudCBpdGVyYXRpb25cbiAqL1xuZnVuY3Rpb24gc2hhMV9rdCh0KVxue1xuICByZXR1cm4gKHQgPCAyMCkgPyAgMTUxODUwMDI0OSA6ICh0IDwgNDApID8gIDE4NTk3NzUzOTMgOlxuICAgICAgICAgKHQgPCA2MCkgPyAtMTg5NDAwNzU4OCA6IC04OTk0OTc1MTQ7XG59XG5cbi8qXG4gKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICovXG5mdW5jdGlvbiBzYWZlX2FkZCh4LCB5KVxue1xuICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpO1xuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xufVxuXG4vKlxuICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICovXG5mdW5jdGlvbiByb2wobnVtLCBjbnQpXG57XG4gIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGExKGJ1Zikge1xuICByZXR1cm4gaGVscGVycy5oYXNoKGJ1ZiwgY29yZV9zaGExLCAyMCwgdHJ1ZSk7XG59O1xuIiwiXG4vKipcbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgU2VjdXJlIEhhc2ggQWxnb3JpdGhtLCBTSEEtMjU2LCBhcyBkZWZpbmVkXG4gKiBpbiBGSVBTIDE4MC0yXG4gKiBWZXJzaW9uIDIuMi1iZXRhIENvcHlyaWdodCBBbmdlbCBNYXJpbiwgUGF1bCBKb2huc3RvbiAyMDAwIC0gMjAwOS5cbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqXG4gKi9cblxudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxudmFyIHNhZmVfYWRkID0gZnVuY3Rpb24oeCwgeSkge1xuICB2YXIgbHN3ID0gKHggJiAweEZGRkYpICsgKHkgJiAweEZGRkYpO1xuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNik7XG4gIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweEZGRkYpO1xufTtcblxudmFyIFMgPSBmdW5jdGlvbihYLCBuKSB7XG4gIHJldHVybiAoWCA+Pj4gbikgfCAoWCA8PCAoMzIgLSBuKSk7XG59O1xuXG52YXIgUiA9IGZ1bmN0aW9uKFgsIG4pIHtcbiAgcmV0dXJuIChYID4+PiBuKTtcbn07XG5cbnZhciBDaCA9IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgcmV0dXJuICgoeCAmIHkpIF4gKCh+eCkgJiB6KSk7XG59O1xuXG52YXIgTWFqID0gZnVuY3Rpb24oeCwgeSwgeikge1xuICByZXR1cm4gKCh4ICYgeSkgXiAoeCAmIHopIF4gKHkgJiB6KSk7XG59O1xuXG52YXIgU2lnbWEwMjU2ID0gZnVuY3Rpb24oeCkge1xuICByZXR1cm4gKFMoeCwgMikgXiBTKHgsIDEzKSBeIFMoeCwgMjIpKTtcbn07XG5cbnZhciBTaWdtYTEyNTYgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAoUyh4LCA2KSBeIFMoeCwgMTEpIF4gUyh4LCAyNSkpO1xufTtcblxudmFyIEdhbW1hMDI1NiA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIChTKHgsIDcpIF4gUyh4LCAxOCkgXiBSKHgsIDMpKTtcbn07XG5cbnZhciBHYW1tYTEyNTYgPSBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAoUyh4LCAxNykgXiBTKHgsIDE5KSBeIFIoeCwgMTApKTtcbn07XG5cbnZhciBjb3JlX3NoYTI1NiA9IGZ1bmN0aW9uKG0sIGwpIHtcbiAgdmFyIEsgPSBuZXcgQXJyYXkoMHg0MjhBMkY5OCwweDcxMzc0NDkxLDB4QjVDMEZCQ0YsMHhFOUI1REJBNSwweDM5NTZDMjVCLDB4NTlGMTExRjEsMHg5MjNGODJBNCwweEFCMUM1RUQ1LDB4RDgwN0FBOTgsMHgxMjgzNUIwMSwweDI0MzE4NUJFLDB4NTUwQzdEQzMsMHg3MkJFNUQ3NCwweDgwREVCMUZFLDB4OUJEQzA2QTcsMHhDMTlCRjE3NCwweEU0OUI2OUMxLDB4RUZCRTQ3ODYsMHhGQzE5REM2LDB4MjQwQ0ExQ0MsMHgyREU5MkM2RiwweDRBNzQ4NEFBLDB4NUNCMEE5REMsMHg3NkY5ODhEQSwweDk4M0U1MTUyLDB4QTgzMUM2NkQsMHhCMDAzMjdDOCwweEJGNTk3RkM3LDB4QzZFMDBCRjMsMHhENUE3OTE0NywweDZDQTYzNTEsMHgxNDI5Mjk2NywweDI3QjcwQTg1LDB4MkUxQjIxMzgsMHg0RDJDNkRGQywweDUzMzgwRDEzLDB4NjUwQTczNTQsMHg3NjZBMEFCQiwweDgxQzJDOTJFLDB4OTI3MjJDODUsMHhBMkJGRThBMSwweEE4MUE2NjRCLDB4QzI0QjhCNzAsMHhDNzZDNTFBMywweEQxOTJFODE5LDB4RDY5OTA2MjQsMHhGNDBFMzU4NSwweDEwNkFBMDcwLDB4MTlBNEMxMTYsMHgxRTM3NkMwOCwweDI3NDg3NzRDLDB4MzRCMEJDQjUsMHgzOTFDMENCMywweDRFRDhBQTRBLDB4NUI5Q0NBNEYsMHg2ODJFNkZGMywweDc0OEY4MkVFLDB4NzhBNTYzNkYsMHg4NEM4NzgxNCwweDhDQzcwMjA4LDB4OTBCRUZGRkEsMHhBNDUwNkNFQiwweEJFRjlBM0Y3LDB4QzY3MTc4RjIpO1xuICB2YXIgSEFTSCA9IG5ldyBBcnJheSgweDZBMDlFNjY3LCAweEJCNjdBRTg1LCAweDNDNkVGMzcyLCAweEE1NEZGNTNBLCAweDUxMEU1MjdGLCAweDlCMDU2ODhDLCAweDFGODNEOUFCLCAweDVCRTBDRDE5KTtcbiAgICB2YXIgVyA9IG5ldyBBcnJheSg2NCk7XG4gICAgdmFyIGEsIGIsIGMsIGQsIGUsIGYsIGcsIGgsIGksIGo7XG4gICAgdmFyIFQxLCBUMjtcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cbiAgbVtsID4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbCAlIDMyKTtcbiAgbVsoKGwgKyA2NCA+PiA5KSA8PCA0KSArIDE1XSA9IGw7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICBhID0gSEFTSFswXTsgYiA9IEhBU0hbMV07IGMgPSBIQVNIWzJdOyBkID0gSEFTSFszXTsgZSA9IEhBU0hbNF07IGYgPSBIQVNIWzVdOyBnID0gSEFTSFs2XTsgaCA9IEhBU0hbN107XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCA2NDsgaisrKSB7XG4gICAgICBpZiAoaiA8IDE2KSB7XG4gICAgICAgIFdbal0gPSBtW2ogKyBpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFdbal0gPSBzYWZlX2FkZChzYWZlX2FkZChzYWZlX2FkZChHYW1tYTEyNTYoV1tqIC0gMl0pLCBXW2ogLSA3XSksIEdhbW1hMDI1NihXW2ogLSAxNV0pKSwgV1tqIC0gMTZdKTtcbiAgICAgIH1cbiAgICAgIFQxID0gc2FmZV9hZGQoc2FmZV9hZGQoc2FmZV9hZGQoc2FmZV9hZGQoaCwgU2lnbWExMjU2KGUpKSwgQ2goZSwgZiwgZykpLCBLW2pdKSwgV1tqXSk7XG4gICAgICBUMiA9IHNhZmVfYWRkKFNpZ21hMDI1NihhKSwgTWFqKGEsIGIsIGMpKTtcbiAgICAgIGggPSBnOyBnID0gZjsgZiA9IGU7IGUgPSBzYWZlX2FkZChkLCBUMSk7IGQgPSBjOyBjID0gYjsgYiA9IGE7IGEgPSBzYWZlX2FkZChUMSwgVDIpO1xuICAgIH1cbiAgICBIQVNIWzBdID0gc2FmZV9hZGQoYSwgSEFTSFswXSk7IEhBU0hbMV0gPSBzYWZlX2FkZChiLCBIQVNIWzFdKTsgSEFTSFsyXSA9IHNhZmVfYWRkKGMsIEhBU0hbMl0pOyBIQVNIWzNdID0gc2FmZV9hZGQoZCwgSEFTSFszXSk7XG4gICAgSEFTSFs0XSA9IHNhZmVfYWRkKGUsIEhBU0hbNF0pOyBIQVNIWzVdID0gc2FmZV9hZGQoZiwgSEFTSFs1XSk7IEhBU0hbNl0gPSBzYWZlX2FkZChnLCBIQVNIWzZdKTsgSEFTSFs3XSA9IHNhZmVfYWRkKGgsIEhBU0hbN10pO1xuICB9XG4gIHJldHVybiBIQVNIO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGEyNTYoYnVmKSB7XG4gIHJldHVybiBoZWxwZXJzLmhhc2goYnVmLCBjb3JlX3NoYTI1NiwgMzIsIHRydWUpO1xufTtcbiJdfQ==
