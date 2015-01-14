/**
 * @class
 * @extends PIXI.Stage
 */
class Scene extends PIXI.Stage {
    /**
     * @constructor
     * @param {number} background - The background color to use for the scene.
     */
    constructor(background) {
        super(background);

        /**
         * @name Scene#updateCB
         * @type {function}
         */
        this.updateCB = null;

        /**
         * @name Scene#paused
         * @type {boolean}
         */
        this.paused = true;
    }

    /**
     * @param {function} updateCB
     */
    onUpdate(updateCB) {
        this.updateCB = updateCB;
    }

    /**
     * @param {number} dt
     */
    update(dt) {
        if (typeof this.updateCB === "function") {
            this.updateCB(dt);
        }
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }

    /**
     * @returns {boolean}
     */
    isPaused() {
        return this.paused;
    }
}

export default Scene;
