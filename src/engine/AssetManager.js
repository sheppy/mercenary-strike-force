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

    load() {
        //var loader = new PIXI.JsonLoader(url);
        // Load images
        var loader = new PIXI.AssetLoader(this.assets, true);
        loader.addEventListener("onProgress", this.onProgress);
        loader.addEventListener("onComplete", this.onComplete);
        loader.load();
    }

    onComplete(e) {
    }

    onProgress(e) {
        var itemsRemaining = e.content.content.loadCount;
        var totalItems = e.content.content.loadCount;
        var percent = (1 - (itemsRemaining / totalItems)) * 100;
    }
}

export default new AssetManager();
