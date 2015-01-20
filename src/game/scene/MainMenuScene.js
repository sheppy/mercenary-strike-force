import Scene from "../../engine/Scene";
import SceneManager from "../../engine/SceneManager";
import UI from "../../engine/UI";


/**
 * @class
 * @extends Scene
 */
class MainMenuScene extends Scene {
    _init() {
        var button = new PIXI.Graphics();
        button.beginFill(0xFF0000);
        button.lineStyle(5, 0x00FFFF);
        button.drawRect(30, 30, 20, 20);

        UI.buttonify(button, {
            over: function () {
                this.clear();
                this.beginFill(0xFF0000);
                this.lineStyle(5, 0xFFFFFF);
                this.drawRect(30, 30, 20, 20);
            },
            out: function () {
                this.clear();
                this.beginFill(0xFF0000);
                this.lineStyle(5, 0x00FFFF);
                this.drawRect(30, 30, 20, 20);
            },
            click: function () {
                SceneManager.goToScene("prototype-map");
            }
        });

        this.addChild(button);
    }
}

export default MainMenuScene;
