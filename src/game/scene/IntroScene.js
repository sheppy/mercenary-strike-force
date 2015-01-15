import Scene from "../../engine/Scene";
import GFX from "../../engine/GFX";
import SceneManager from "../../engine/SceneManager";


/**
 * @class
 * @extends Scene
 */
class IntroScene extends Scene {
    init() {
        this.createFadeTween();
        this.createLogo();
    }

    createFadeTween() {
        this.alpha = 0;

        // Fade the scene in and then change scene
        this.fadeTween = createjs.Tween.get(this, {paused: true})
            .to({alpha: 1}, 5000, createjs.Ease.quadOut)
            .wait(2000)
            .call(function () {
                SceneManager.goToScene("main-menu");
                // TODO: We want to destroy this scene afterwards
            });
    }

    createLogo() {
        this.logo = new PIXI.Graphics();

        this.logo.beginFill(0xFFFF00);
        this.logo.lineStyle(5, 0xFF0000);
        this.logo.drawRect(0, 0, 20, 20);

        // Position in the center of the screen
        //this.logo.position.x = GFX.width / 2;
        //this.logo.position.y = GFX.height / 2;

        //this.logo.scale.x = GFX.width / 20;
        //this.logo.scale.y = this.logo.scale.x;

        this.addChild(this.logo);
    }

    onActivate() {
        super.onActivate();
        this.fadeTween.setPaused(false);
    }

    update(dt) {
        this.fadeTween.tick(dt);
    }
}

export default IntroScene;
