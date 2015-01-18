class Tile extends PIXI.Sprite {
    constructor(frameId) {
        // TODO: Get asset by name from AssetManager
        // AssetManager.getTexture(...);
        var texture = PIXI.TextureCache[frameId];
        super(texture);

        // Tile data such as walkable etc
        this.data = {};
    }

    setLightData(data) {
        this.lightData = data;

        var r = data.color >> 16;
        var g = data.color >> 8 & 0xFF;
        var b = data.color >> 16;

        r = r * data.intensity;
        g = g * data.intensity;
        b = b * data.intensity;

        this.tint = (r << 16) + (g << 8) + b;
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
         * @name TileMap#baseTiles
         * @type {PIXI.DisplayObjectContainer}
         */
        this.baseTiles = new PIXI.DisplayObjectContainer();

        /**
         * @name TileMap#baseTileSprite
         * @type {PIXI.Sprite}
         */
        this.baseTileSprite = PIXI.Sprite.fromImage("null.png");
        this.addChild(this.baseTileSprite);
    }

    // The use of this should increase performance on large maps
    renderTilesToSprite() {
        // render the tilemap to a render texture
        var baseTexture = new PIXI.RenderTexture(this.mapWidth * this.tileSize, this.mapHeight * this.tileSize);
        baseTexture.render(this.baseTiles);
        this.baseTileSprite.setTexture(baseTexture);
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
                this.addTile(x, y, 5);
            }
        }

        this.renderTilesToSprite();
    }

    /**
     * Add a tile to the map.
     *
     * @param x
     * @param y
     * @param frameId
     */
    addTile(x, y, frameId) {
        var index = this.localToIndex(x, y);

        var tile = new Tile(frameId);
        tile.tileX = x;
        tile.tileY = y;
        tile.position.x = x * this.tileSize;
        tile.position.y = y * this.tileSize;
        this.baseTiles.addChildAt(tile, index);

        var data = {
            color: 0x000000,
            intensity: 0.4
        };

        if (x === 5 && y === 5) {
            data.intensity = 1;
            data.color = 0xFFFFFF;
        } else if ((x === 5 && (y === 4 || y === 6)) || (y === 5 && (x === 4 || x === 6))) {
            data.intensity = 0.7;
            data.color = 0xFFFFFF;
        } else if ((x === 4 && y === 4) || (x === 4 && y === 6) || (x === 6 && y === 4) || (x === 6 && y === 6)) {
            data.intensity = 0.7 * 0.9;
            data.color = 0xFFFFFF;
        }

        tile.setLightData(data);
    }

    // Note: This removes the tile instance, it might be better to just change its properties
    changeTile(x, y, frameId, update) {
        this.baseTiles.removeChild(this.getTile(x, y));
        this.addTile(x, y, frameId);
        if (update) {
            this.renderTilesToSprite();
        }
    }

    getTile(x, y) {
        return this.baseTiles.getChildAt(this.localToIndex(x, y));
    }
}

export default TileMap;
