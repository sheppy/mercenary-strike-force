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
        this.lastTime = Date.now();
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
        if (SceneManager.stage) {
            GFX.render(SceneManager.stage);
        }
    }

    run() {
        window.requestAnimationFrame(this.run.bind(this));

        var currentTime, dt, loops = 0;

        while((currentTime = Date.now()) > this.nextUpdateTick) {
            dt = currentTime - this.lastTime;
            this.lastTime = currentTime;
            this.update(dt);
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
