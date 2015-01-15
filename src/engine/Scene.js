/**
 * @class
 * @extends PIXI.DisplayObjectContainer
 */
class Scene extends PIXI.DisplayObjectContainer {
    /**
     * @constructor
     */
    constructor() {
        super();

        /** @private */
        this.active = false;
        this.visible = false;

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

    activate() {
        this.active = true;
        this.visible = this.active;
    }

    deactivate() {
        this.active = false;
        this.visible = this.active;
    }

    /**
     * @returns {boolean}
     */
    isActive() {
        return this.active;
    }
}

export default Scene;
