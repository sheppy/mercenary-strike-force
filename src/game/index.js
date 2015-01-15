// Prevent fuzzy scaling on pixels
PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;

import GFX from "../engine/GFX";
import Game from "../engine/Game";
import SceneManager from "../engine/SceneManager";

import BootstrapScene from "./scene/BootstrapScene";

// Initialise the graphics
GFX.init(800, 600);

// Create and run the game
var game = new Game();
game.run();

// Create scenes
SceneManager.init();
SceneManager.createScene("bootstrap", BootstrapScene);
SceneManager.goToScene("bootstrap");
