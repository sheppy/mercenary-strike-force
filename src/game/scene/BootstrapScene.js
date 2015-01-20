import Scene from "../../engine/Scene";
import AssetManager from "../../engine/AssetManager";
import SceneManager from "../../engine/SceneManager";


import IntroScene from "./IntroScene";
import MainMenuScene from "./MainMenuScene";
import PrototypeMapScene from "./PrototypeMapScene";

/**
 * @class
 * @extends Scene
 */
class BootstrapScene extends Scene {
    _init() {
        SceneManager.stage.setBackgroundColor("#000");

        // Add loading text...
        var text = new PIXI.Text("Loading", {font: "50px Arial", fill: "#fff"});
        this.addChild(text);
    }

    _onActivate() {
        console.clear();
        super._onActivate();

        this.loadAssets();
    }

    loadAssets() {
        AssetManager.addImage("null.png");
        AssetManager.addImage("tiles.json");
        AssetManager.load(this.onAssetsLoaded.bind(this), function (e) {
            var itemsRemaining = e.content.content.loadCount;
            var totalItems = e.content.content.assetURLs.length;
            var percent = (1 - (itemsRemaining / totalItems)) * 100;

            console.log("Loading assets:", percent, itemsRemaining, totalItems);
        });
    }

    onAssetsLoaded() {
        SceneManager.createScene("intro", IntroScene);
        SceneManager.createScene("main-menu", MainMenuScene);
        SceneManager.createScene("prototype-map", PrototypeMapScene);
        //SceneManager.goToScene("intro");
        SceneManager.goToScene("prototype-map");
    }
}

export default BootstrapScene;
