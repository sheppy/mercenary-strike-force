import Scene from "../../engine/Scene";
import TileMap from "../../engine/TileMap";


/**
 * @class
 * @extends Scene
 */
class PrototypeMapScene extends Scene {
    init() {
        var map = new TileMap();
        map.generate();
        this.addChild(map);
    }

    update(dt) {
    }
}

export default PrototypeMapScene;
