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

        /** @private */
        this.paused = true;

        this.init();
    }

    /**
     * @abstract
     */
    init() {}

    /**
     * @abstract
     * @param {number} dt
     */
    update(dt) {}

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
