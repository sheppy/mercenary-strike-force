import Scene from "../../engine/Scene";
import TileMap from "../../engine/TileMap";
import LightMap from "../../engine/LightMap";
import DatGui from "../../engine/DatGui";


/**
 * @class
 * @extends Scene
 */
class PrototypeMapScene extends Scene {
    init() {
    }

    initMap() {
        this.map = new TileMap();
        this.addChild(this.map);

        //setTimeout(function () {
        //    map.changeTile(5, 5, 1, true);
        //}, 1000);
        //setTimeout(function () {
        //    map.changeTile(0, 0, 2, true);
        //}, 2000);

        this.map.interactive = true;

        var scene = this;
        this.map.mousemove = this.map.touchmove = function (data) {
            var position = data.getLocalPosition(this.parent);

            var x = Math.floor(position.x / 16);
            var y = Math.floor(position.y / 16);

            var light = this.lightMap.lights[0];
            if (x !== light.x || y !== light.y) {
                light.x = x;
                light.y = y;
                scene.renderMap();
            }
        };
    }

    initLightMap() {
        this.lightMap = new LightMap(this.map.mapWidth, this.map.mapHeight, {
            color: 0xFFFFFF,
            //color: 0x000033,
            intensity: 0.15
        });

        // Add lights
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
    }

    updateLighting() {
        //this.lightMap.fillGenerate();
        this.lightMap.castGenerate();

        // Apply the generated light data to the tile map
        for (let x = 0; x < this.mapWidth; x++) {
            for (let y = 0; y < this.mapHeight; y++) {
                let tile = this.getTile(x, y);
                let light = this.lightMap.map[x][y];

                tile.setLightData(light);
            }
        }
    }

    renderMap() {
        this.updateLighting();
        this.map.renderTilesToSprite();
    }

    onActivate() {
        super.onActivate();

        this.initMap();
        this.map.generate();
        this.initLightMap();
        this.renderMap();


        var ambientLightFolder = DatGui.addFolder("Ambient Lighting");
        ambientLightFolder.open();

        ambientLightFolder.add(this.lightMap.ambient, "intensity");
        ambientLightFolder.add(this.lightMap.ambient, "color");


        var light0Folder = DatGui.addFolder("Light 0");
        light0Folder.open();

        light0Folder.add(this.lightMap.lights[0], "radius");
        light0Folder.add(this.lightMap.lights[0], "intensity", 0, 1);
        light0Folder.add(this.lightMap.lights[0], "color");

        // TODO: May need to do per control rather than the folder :(
        light0Folder.onChange(function (value) {
            // Fires on every change, drag, keypress, etc.
            console.log("The light0Folder.onChange value is " + value);
        });

        light0Folder.onFinishChange(function (value) {
            // Fires when a controller loses focus.
            console.log("The light0Folder.onFinishChange value is " + value);
            this.renderMap();
        });

    }

    onDeactivate() {
        DatGui.removeFolder("Ambient Lighting");
        DatGui.removeFolder("Light 0");
    }
}

export default PrototypeMapScene;
