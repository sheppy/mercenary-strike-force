import GFX from "./GFX";
import SceneManager from "./SceneManager";


/**
 * @class
 * @requires SceneManager
 */
class Game {
    /**
     * @constructor
     */
    constructor() {
        this.skipTicks = 1000 / 120;
        this.nextUpdateTick = Date.now();
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        // Get current scene & update
        var scene = SceneManager.currentScene;

        if (scene) {
            scene.update(dt);
        }
    }

    render() {
        GFX.renderScene(SceneManager.currentScene);
    }

    run() {
        window.requestAnimationFrame(this.run.bind(this));

        var loops = 0;

        while(Date.now() > this.nextUpdateTick) {
            // TODO: Pass dt
            this.update();
            this.nextUpdateTick += this.skipTicks;
            loops++;
        }

        // If we actually updated anything
        if (loops) {
            this.render();
        }
    }
}

export default Game;
