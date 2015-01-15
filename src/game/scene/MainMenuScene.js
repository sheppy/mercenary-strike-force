import Scene from "../../engine/Scene";
import UI from "../../engine/UI";


/**
 * @class
 * @extends Scene
 */
class MainMenuScene extends Scene {
    init() {
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
                console.log("CLICK!");
            }
        });

        this.addChild(button);
    }

    update(dt) {
    }
}

export default MainMenuScene;
