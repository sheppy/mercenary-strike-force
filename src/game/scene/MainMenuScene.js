import Scene from "../../engine/Scene";


/**
 * @class
 * @extends Scene
 */
class MainMenuScene extends Scene {
    init() {
        this.square = new PIXI.Graphics();

        this.square.beginFill(0xFF0000);

        this.square.lineStyle(5, 0x00FFFF);

        this.square.drawRect(30, 30, 20, 20);

        this.addChild(this.square);
    }

    update(dt) {
    }
}

export default MainMenuScene;
