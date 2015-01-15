/**
 * @class
 */
class GFX {
    /**
     * @constructor
     */
    constructor() {
        /**
         * @name GFX#renderer
         * @type {PIXI.WebGLRenderer}
         */
        this.renderer = null;
    }

    /**
     * @param {number} width
     * @param {number} height
     * @returns {boolean}
     */
    init(width, height) {
        this.width = width;
        this.height = height;

        // We can only have one renderer
        if (this.renderer) {
            return false;
        }

        // Create the renderer
        this.renderer = new PIXI.WebGLRenderer(width, height);
        document.body.appendChild(this.renderer.view);
    }

    render(stage) {
        this.renderer.render(stage);
    }
}

export default new GFX();
