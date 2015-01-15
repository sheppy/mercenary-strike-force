// Prevent fuzzy scaling on pixels
PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;

import GFX from "../engine/GFX";
import Game from "../engine/Game";
import AssetManager from "../engine/AssetManager";
import SceneManager from "../engine/SceneManager";

import IntroScene from "./scene/IntroScene";
import MainMenuScene from "./scene/MainMenuScene";

// Initialise the graphics
GFX.init(800, 600);

// Create scenes
SceneManager.init();
SceneManager.createScene("intro", IntroScene);
SceneManager.createScene("main-menu", MainMenuScene);
SceneManager.goToScene("intro");

// Load assets
AssetManager.addImage("logo_small.png");
AssetManager.load();

// Create and run the game
var game = new Game();
game.run();
