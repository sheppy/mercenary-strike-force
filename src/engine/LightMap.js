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
    }

    addLight(x, y, settings = {}) {
        var light = {
            x: x,
            y: y,
            radius: settings.radius || 16,
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

    clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    distance(point1, point2) {
        var xs = point2.x - point1.x;
        xs = xs * xs;

        var ys = point2.y - point1.y;
        ys = ys * ys;

        return Math.sqrt(xs + ys);
    }

    /**
     *
     * @param r - radius or length of the light.
     * @param f - The rate of falloff.
     * @param d - distance between the surface being lit and the center of the light.
     */
    attenuation(r, f, d) {
        // float atten = 1.0f / (ConstantAtt + LinearAtt * LightDistance);
        //return 0.4;
        //return 1 / (0 + 0.01 + d);
        //return Math.pow(1 - d, 0.5);
        return Math.pow(Math.max(0.0, 1.0 - (d / r)), f + 1.0);
        //return att * att;

        //var att = this.clamp(1.0 - d / r, 0.0, 1.0);
        //return att * att;

        //var att = this.clamp(1.0 - d * d / r * r, 0.0, 1.0);
        //return att;
        //return att * att;
        /*
         // var att=1.0/(1.0+0.1*dist+0.01*dist*dist);
         var att = this.clamp(1.0 - dist / radius, 0.0, 1.0);
         //var att = this.clamp(1.0 - dist*dist/(radius*radius), 0.0, 1.0);
         att *= att;
         */
    }

    setLight(tile, color, intensity) {
        // TODO: Use another colour space?
        // TODO: The weight factor of the adding?

        //tile.color = Color.addColors(tile.color, light.color);
        //var i = (intensity * 0.5) + (tile.intensity * 0.5);
        //if (i > tile.intensity) {
        //    tile.intensity = i;
        //}
        //if (tile.intensity > 1) {
        //    tile.intensity = 1;
        //}
        //tile.intensity += intensity;
        //if (tile.intensity > 1) {
        //    tile.intensity = 1;
        //}

        if (intensity > tile.intensity) {
            //tile.color = Color.addColorsByIntensity(tile.color, color, tile.intensity, intensity);
            //tile.color = Color.mixColorsByIntensity(tile.color, color, tile.intensity, intensity);
            //tile.color = Color.mixColors(tile.color, color);
            //tile.color = Color.addColors(tile.color, color);

            //tile.color = 0xFFFFFF;

            tile.intensity = intensity;
            return true;
        }

        return false;
    }

    //----------------------------------------------------------------------------------------------
    // Generate lighting based on ray casting
    castGenerate() {
        this.clear();

        for (let i = 0; i < this.lights.length; i++) {
            let light = this.lights[i];
            let tile = this.map[light.x][light.y];
            tile.color = light.color;
            tile.intensity = light.intensity;

            for (let x = 0; x < this.width; x++) {
                let northBorderPoint = {x: x, y: 0};
                let southBorderPoint = {x: x, y: this.height - 1};

                this.castLight(this.castGetRayLine(light, northBorderPoint), light);
                this.castLight(this.castGetRayLine(light, southBorderPoint), light);
            }

            for (let y = 0; y < this.height; y++) {
                let leftBorderPoint = {x: 0, y: y};
                let rightBorderPoint = {x: this.width - 1, y: y};

                this.castLight(this.castGetRayLine(light, leftBorderPoint), light);
                this.castLight(this.castGetRayLine(light, rightBorderPoint), light);
            }
        }
    }

    castGetRayLine(start, target) {
        var ret = [];
        var n = 100;    // max draw distance

        var x0 = start.x;
        var y0 = start.y;

        var x1 = target.x;
        var y1 = target.y;

        var x = x0;
        var y = y0;

        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);

        var sx = x0 < x1 ? 1 : -1;
        var sy = y0 < y1 ? 1 : -1;

        var error = dx - dy;

        dx = dx * 2;
        dy = dy * 2;

        while (n > 0) {
            // Check we are in map bounds
            if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
                break;
            }

            ret.push({x: x, y: y});

            if (error > 0) {
                x += sx;
                error -= dy;
            } else {
                y += sy;
                error += dx;
            }

            // TODO: Maybe break if we hit a wall?

            if (
                (x === 4 && y === 2)
            ) {
                break;
            }

            --n;
        }

        return ret;
    }

    castLight(line, light) {
        for (var n = 0; n < line.length; n++) {
            var dist = this.distance(line[0], line[n]);

            var intensity = light.intensity * this.attenuation(light.radius, 0.8, dist);

            var x = line[n].x;
            var y = line[n].y;

            let tile = this.map[x][y];

            this.setLight(tile, light.color, intensity);

            // Check if view blocked
            //if (!map.isViewBlocked(line[n])) {
            //    break;
            //}
        }
    }


    //----------------------------------------------------------------------------------------------
    // Generate lighting based on simple fill
    fillGenerate() {
        this.clear();

        for (let i = 0; i < this.lights.length; i++) {
            let light = this.lights[i];
            let tile = this.map[light.x][light.y];

            tile.color = light.color;
            tile.intensity = light.intensity;
        }

        this.fillPropagate();
    }

    fillPropagate() {
        var maxLights = this.width * this.height;

        var lighting = this.lights.slice().sort(function (a, b) {
            return a.intensity - b.intensity;
        });

        for (let i = 0; i < maxLights; i++) {
            var light = lighting[i];
            if (!light) { break; }
            let lightTile = this.map[light.x][light.y];
            this.fillCheckNeighbours(lightTile, lighting);
        }
    }

    fillCheckNeighbours(tile, lighting) {
        var x = tile.x;
        var y = tile.y;

        // TODO:
        tile.absorb = 0.2;

        var intensity = tile.intensity - tile.absorb;
        if (intensity < 0) {
            return;
        }

        var color = tile.color;

        if (x > 0) { this.fillSetIntensity(this.map[x-1][y], intensity, color, lighting); }
        if (x < this.width - 1) { this.fillSetIntensity(this.map[x+1][y], intensity, color, lighting); }
        if (y > 0) { this.fillSetIntensity(this.map[x][y-1], intensity, color, lighting); }
        if (y < this.height - 1) { this.fillSetIntensity(this.map[x][y+1], intensity, color, lighting); }

        // Diagonal-related tiles should gain lesser light
        intensity = intensity * 0.9;

        if (x > 0 && y < this.height - 1) { this.fillSetIntensity(this.map[x-1][y+1], intensity, color, lighting); }
        if (x < this.width - 1 && y > 1) { this.fillSetIntensity(this.map[x+1][y-1], intensity, color, lighting); }
        if (x > 0 && y > 0) { this.fillSetIntensity(this.map[x-1][y-1], intensity, color, lighting); }
        if (x < this.width - 1 && y < this.height - 1) { this.fillSetIntensity(this.map[x+1][y+1], intensity, color, lighting); }
    }

    fillSetIntensity(tile, intensity, color, lighting) {
        if (this.setLight(tile, color, intensity)) {
            lighting.push(tile);
        }
    }
}


export default LightMap;
