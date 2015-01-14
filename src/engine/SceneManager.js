import Scene from "./Scene";


/**
 * @class
 * @requires Scene
 */
class SceneManager {
    /**
     * @constructor
     */
    constructor() {
        /**
         * List of available scenes.
         *
         * @name SceneManager#scenes
         * @type {{Scene}}
         */
        this.scenes = {};

        /**
         * Current scene.
         *
         * @name SceneManager#currentScene
         * @type {Scene}
         */
        this.currentScene = null;
    }

    /**
     * Add existing scene.
     *
     * @param {string} id - Scene id.
     * @param {Scene} scene - Scene to add.
     * @returns {Scene} The scene that was added.
     */
    addScene(id, scene) {
        if (this.scenes[id]) {
            return null;
        }

        this.scenes[id] = scene;

        return scene;
    }

    /**
     * Create a new scene and add it.
     *
     * @param {string} id - Scene id.
     * @param {function(new:Scene)=} [SceneClass=Scene] - The type of scene to create.
     * @returns {Scene} The newly created scene.
     */
    createScene(id, SceneClass = Scene) {
        /**
         * @type {Scene}
         */
        var scene = new SceneClass();

        return this.addScene(id, scene);
    }

    /**
     * Go to a scene.
     *
     * @param {string} id - Scene id.
     * @returns {boolean} If the scene was found.
     */
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
