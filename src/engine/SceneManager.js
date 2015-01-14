import Scene from "./Scene";

class SceneManager {
    constructor() {
        this.scenes = {};
        this.currentScene = null;
    }

    addScene(id, scene) {
        if (this.scenes[id]) {
            return false;
        }

        this.scenes[id] = scene;

        return scene;
    }

    createScene(id, SceneClass = Scene) {
        var scene = new SceneClass();

        return this.addScene(id, scene);
    }

    goToScene(id) {
        if (!this.scenes[id]) {
            return false;
        }

        if (this.currentScene) {
            this.currentScene.pause();
        }

        this.currentScene = this.scenes[id];

        this.currentScene.resume();
        return true;
    }
}

export default new SceneManager();
