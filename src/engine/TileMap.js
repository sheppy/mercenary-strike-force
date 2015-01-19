import LightMap from "./LightMap";
import Color from "./Color";


class Tile extends PIXI.Sprite {
    constructor(frameId) {
        // TODO: Get asset by name from AssetManager
        // AssetManager.getTexture(...);
        var texture = PIXI.TextureCache[frameId];
        super(texture);

        // Tile data such as walkable etc
        this.data = {};
    }

    setLightData(light) {
        this.tint = Color.applyIntensity(light.color, light.intensity);
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
        this.mapWidth = 50;

        /**
         * The height of the map in tiles.
         *
         * @name TileMap#mapHeight
         * @type {number}
         */
        this.mapHeight = 36;

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

        // Create the light map
        this.lightMap = new LightMap(this.mapWidth, this.mapHeight, {
            color: 0xFFFFFF,
            //color: 0x000033,
            intensity: 0.15
        });

        this.interactive = true;

        this.mousemove = this.touchmove = function (data) {
            var position = data.getLocalPosition(this.parent);

            var x = Math.floor(position.x / 16);
            var y = Math.floor(position.y / 16);

            var light = this.lightMap.lights[0];
            if (x !== light.x || y !== light.y) {
                light.x = x;
                light.y = y;
                this.updateLighting();
                this.renderTilesToSprite();
            }

            //console.log(x, y);
        };
    }

    // The use of this should increase performance on large maps
    renderTilesToSprite() {
        // render the tilemap to a render texture
        var baseTexture = new PIXI.RenderTexture(this.mapWidth * this.tileSize, this.mapHeight * this.tileSize);
        baseTexture.render(this.baseTiles);
        this.baseTileSprite.setTexture(baseTexture);
    }

    updateLighting() {
        //this.lightMap.fillGenerate();
        this.lightMap.castGenerate();

        for (let x = 0; x < this.mapWidth; x++) {
            for (let y = 0; y < this.mapHeight; y++) {
                let tile = this.getTile(x, y);
                let light = this.lightMap.map[x][y];

                tile.setLightData(light);
            }
        }
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
                this.addTile(x, y, 2);
            }
        }

        // Add a light
        this.lightMap.addLight(5, 2, {
            color: 0xFF0000,
            intensity: 1
        });

        this.lightMap.addLight(2, 7, {
            color: 0x00FF00,
            intensity: 1
        });

        this.lightMap.addLight(7, 7, {
            color: 0x0000FF,
            intensity: 1
        });

        // Should this be here?
        this.updateLighting();

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
