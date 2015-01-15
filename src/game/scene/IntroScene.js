import Scene from "../../engine/Scene";
import GFX from "../../engine/GFX";
import SceneManager from "../../engine/SceneManager";


/**
 * @class
 * @extends Scene
 */
class IntroScene extends Scene {
    init() {
        this.logo = new PIXI.Graphics();

        this.logo.beginFill(0xFFFF00);
        this.logo.lineStyle(5, 0xFF0000);
        this.logo.drawRect(0, 0, 20, 20);

        this.logo.alpha = 0;

        // Position in the center of the screen
        //this.logo.position.x = GFX.width / 2;
        //this.logo.position.y = GFX.height / 2;

        this.addChild(this.logo);

        //this.logo.scale.x = GFX.width / 20;
        //this.logo.scale.y = this.logo.scale.x;
    }

    update(dt) {
        if (this.logo.alpha < 1) {
            this.logo.alpha += dt * 0.001;
            if (this.logo.alpha > 1) {
                this.logo.alpha = 1;
            }
        } else {
            SceneManager.goToScene("main-menu");
        }
    }
}

export default IntroScene;
