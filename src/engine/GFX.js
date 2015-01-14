class GFX {
    constructor() {
        this.renderer = null;
    }

    createRenderer(width, height) {
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
}

export default new GFX();
