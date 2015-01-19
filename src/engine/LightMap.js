import Color from "./Color";

class LightMap {
    constructor(width, height, ambient = {}) {
        this.width = width;
        this.height = height;
        this.lights = [];
        this.map = [];

        this.ambient = {
            color: ambient.color || 0x000000,
            intensity: ambient.intensity || 0
        };

        for (let x = 0; x < this.width; x++) {
            this.map[x] = [];
            for (let y = 0; y < this.height; y++) {
                this.map[x][y] = {
                    x: x,
                    y: y
                };
            }
        }

        console.log(this.map);
    }

    addLight(x, y, settings = {}) {
        var light = {
            x: x,
            y: y,
            intensity: settings.intensity || 1,
            color: settings.color || 0xFFFFFF
        };

        this.lights.push(light);
    }

    clear() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let tile = this.map[x][y];

                tile.color = this.ambient.color;
                tile.intensity = this.ambient.intensity;
            }
        }
    }

    generate() {
        this.clear();

        for (let i = 0; i < this.lights.length; i++) {
            let light = this.lights[i];
            let tile = this.map[light.x][light.y];

            tile.color = light.color;
            tile.intensity = light.intensity;
        }

        this.propagate();
    }

    propagate() {
        var maxLights = this.width * this.height;

        var lighting = this.lights.slice().sort(function (a, b) {
            return a.intensity - b.intensity;
        });

        for (let i = 0; i < maxLights; i++) {
            var light = lighting[i];
            if (!light) { break; }
            let lightTile = this.map[light.x][light.y];
            this.checkNeighbours(lightTile, lighting);
        }
    }

    checkNeighbours(tile, lighting) {
        var x = tile.x;
        var y = tile.y;

        // TODO:
        tile.absorb = 0.2;

        var intensity = tile.intensity - tile.absorb;
        if (intensity < 0) {
            return;
        }

        var color = tile.color;

        if (x > 0) { this.setIntensity(this.map[x-1][y], intensity, color, lighting); }
        if (x < this.width - 1) { this.setIntensity(this.map[x+1][y], intensity, color, lighting); }
        if (y > 0) { this.setIntensity(this.map[x][y-1], intensity, color, lighting); }
        if (y < this.height - 1) { this.setIntensity(this.map[x][y+1], intensity, color, lighting); }

        // Diagonal-related tiles should gain lesser light
        intensity = intensity * 0.9;

        if (x > 0 && y < this.height - 1) { this.setIntensity(this.map[x-1][y+1], intensity, color, lighting); }
        if (x < this.width - 1 && y > 1) { this.setIntensity(this.map[x+1][y-1], intensity, color, lighting); }
        if (x > 0 && y > 0) { this.setIntensity(this.map[x-1][y-1], intensity, color, lighting); }
        if (x < this.width - 1 && y < this.height - 1) { this.setIntensity(this.map[x+1][y+1], intensity, color, lighting); }
    }

    setIntensity(tile, intensity, color, lighting) {
        if (intensity > tile.intensity) {
            tile.color = Color.mixColors(tile.color, color);
            tile.intensity = intensity;

            lighting.push(tile);
        }
    }
}


export default LightMap;
