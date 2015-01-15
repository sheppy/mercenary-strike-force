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
        this.onActivate();
    }

    onActivate() {
        this.visible = true;
    }

    deactivate() {
        this.active = false;
        this.onDeactivate();
    }

    onDeactivate() {
        this.visible = false;
    }

    /**
     * @returns {boolean}
     */
    isActive() {
        return this.active;
    }
}

export default Scene;
