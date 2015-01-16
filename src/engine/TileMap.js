class Tile extends PIXI.Sprite {
    constructor(frameId) {
        // TODO: Get asset by name from AssetManager
        // AssetManager.getTexture(...);
        var texture = PIXI.TextureCache[frameId];
        super(texture);

        // Tile data such as walkable etc
        this.data = {};
    }
}

class TileMap extends PIXI.DisplayObjectContainer {
    constructor() {
        super();

        /**
         * The width of the map in tiles.
         *
         * @name TileMap#mapWidth
         * @type {number}
         */
        this.mapWidth = 10;

        /**
         * The height of the map in tiles.
         *
         * @name TileMap#mapHeight
         * @type {number}
         */
        this.mapHeight = 10;

        /**
         * The width and height of a tile.
         *
         * @name TileMap#tileSize
         * @type {number}
         */
        this.tileSize = 16;

        /**
         * @name TileMap#tiles
         * @type {PIXI.DisplayObjectContainer}
         */
        this.tiles = new PIXI.DisplayObjectContainer();

        /**
         * @name TileMap#tilesSprite
         * @type {PIXI.Sprite}
         */
        this.tilesSprite = new PIXI.Sprite();
        this.addChild(this.tilesSprite);
    }

    // The use of this should increase performance on large maps
    renderTilesToSprite() {
        // render the tilemap to a render texture
        var texture = new PIXI.RenderTexture();
        texture.render(this.tiles);

        this.tilesSprite.setTexture(texture);
    }

    /**
     * Convert local map x/y to an one dimensional array index.
     *
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    localToIndex(x, y) {
        return x * this.mapHeight + y;
    }

    generate() {
        for (let x = 0; x < this.mapWidth; x++) {
            for (let y = 0; y < this.mapHeight; y++) {
                this.addTile(x, y, 0);
            }
        }

        this.renderTilesToSprite()
    }

    /**
     * Add a tile to the map.
     *
     * @param x
     * @param y
     * @param frameId
     */
    addTile(x, y, frameId) {
        var tile = new Tile(frameId);
        tile.tileX = x;
        tile.tileY = y;
        tile.position.x = x * this.tileSize;
        tile.position.y = y * this.tileSize;
        this.tiles.addChildAt(tile, this.localToIndex(x, y));
    }

    // Note: This removes the tile instance, it might be better to just change its properties
    changeTile(x, y, frameId, update) {
        this.tiles.removeChild(this.getTile(x, y));
        this.addTile(x, y, frameId);
        if (update) {
            this.renderTilesToSprite()
        }
    }

    getTile(x, y) {
        return this.tiles.getChildAt(this.localToIndex(x, y));
    }
}

export default TileMap;
