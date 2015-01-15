import Scene from "../../engine/Scene";
import AssetManager from "../../engine/AssetManager";
import SceneManager from "../../engine/SceneManager";


import IntroScene from "./IntroScene";
import MainMenuScene from "./MainMenuScene";

/**
 * @class
 * @extends Scene
 */
class BootstrapScene extends Scene {
    init() {
        SceneManager.stage.setBackgroundColor("#000");

        // Add loading text...
        var text = new PIXI.Text("Loading", {font: "50px Arial", fill: "#fff"});
        this.addChild(text);
    }

    onActivate() {
        super.onActivate();

        this.loadAssets();
    }

    loadAssets() {
        AssetManager.addImage("logo_small.png");
        AssetManager.load(this.onAssetsLoaded.bind(this));
    }

    onAssetsLoaded() {
        SceneManager.createScene("intro", IntroScene);
        SceneManager.createScene("main-menu", MainMenuScene);
        SceneManager.goToScene("intro");
    }

    update(dt) {
    }
}

export default BootstrapScene;
