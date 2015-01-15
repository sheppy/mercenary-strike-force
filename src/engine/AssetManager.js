/**
 * @class
 */
class AssetManager {
    /**
     * @constructor
     */
    constructor() {
        /**
         * @name AssetManager#assets
         * @type {Array}
         */
        this.assets = [];
    }

    addImage(image) {
        this.assets.push(image);
    }

    load(onComplete, onProgress) {
        //var loader = new PIXI.JsonLoader(url);
        // Load images
        var loader = new PIXI.AssetLoader(this.assets, true);

        if (onProgress) {
            loader.addEventListener("onProgress", onProgress);
        }

        if (onComplete) {
            loader.addEventListener("onComplete", onComplete);
        }

        loader.load();

        // Clear current queue
        this.assets = [];
    }
}

export default new AssetManager();
