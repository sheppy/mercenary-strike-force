import Scene from "../../engine/Scene";
import SceneManager from "../../engine/SceneManager";


/**
 * @class
 * @extends Scene
 */
class IntroScene extends Scene {
    /**
     * @constructor
     */
    constructor() {
        super(0xffffff);
    }

    init() {
        // TODO: Use AssetManager
        this.logo = PIXI.Sprite.fromImage("logo_small.png");
        this.addChild(this.logo);

        //this.logo.scale.x = ScenesManager.defaultWidth / 250;
        //this.logo.scale.y = this.logo.scale.x;

        this.logo.anchor.x = 0.5;
        this.logo.anchor.y = 0.5;
        this.logo.alpha = 0;

        // move the sprite to the center of the screen
        this.logo.position.x = SceneManager.width / 2;
        this.logo.position.y = SceneManager.height / 2;
    }

    update(dt) {
        if (this.logo.alpha < 1) {
            this.logo.alpha += dt * 0.01;
        } else {
            SceneManager.goToScene("main-menu");
        }
    }
}

export default IntroScene;
