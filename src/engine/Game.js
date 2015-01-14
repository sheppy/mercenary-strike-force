import SceneManager from "../engine/SceneManager";


class Game {
    constructor() {
        this.skipTicks = 1000 / 120;
        this.nextUpdateTick = Date.now();
    }

    update(dt) {
        // Get current scene & update
        var scene = SceneManager.currentScene;

        if (scene) {
            scene.update(dt);
        }
    }

    render() {
        // Get current scene & render
        var scene = SceneManager.currentScene;

        if (scene) {
            scene.render();
        }
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
