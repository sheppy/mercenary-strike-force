import Scene from "../../engine/Scene";
import TileMap from "../../engine/TileMap";


/**
 * @class
 * @extends Scene
 */
class PrototypeMapScene extends Scene {
    init() {
    }

    onActivate() {
        super.onActivate();

        var map = new TileMap();
        map.generate();
        this.addChild(map);

        //setTimeout(function () {
        //    map.changeTile(5, 5, 1, true);
        //}, 1000);
        //setTimeout(function () {
        //    map.changeTile(0, 0, 2, true);
        //}, 2000);
    }

    update(dt) {
    }
}

export default PrototypeMapScene;
