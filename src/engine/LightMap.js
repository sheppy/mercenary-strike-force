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

        this._init();
    }

    _init() {
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
            color: settings.color || 0xFFFFFF,
            dynamic: settings.dynamic || false
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

    _clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    _distance(point1, point2) {
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
    _attenuation(r, f, d) {
        // float atten = 1.0f / (ConstantAtt + LinearAtt * LightDistance);
        //return 0.4;
        //return 1 / (0 + 0.01 + d);
        //return Math.pow(1 - d, 0.5);
        return Math.pow(Math.max(0.0, 1.0 - (d / r)), f + 1.0);
        //return att * att;

        //var att = this._clamp(1.0 - d / r, 0.0, 1.0);
        //return att * att;

        //var att = this._clamp(1.0 - d * d / r * r, 0.0, 1.0);
        //return att;
        //return att * att;
        /*
         // var att=1.0/(1.0+0.1*dist+0.01*dist*dist);
         var att = this._clamp(1.0 - dist / radius, 0.0, 1.0);
         //var att = this._clamp(1.0 - dist*dist/(radius*radius), 0.0, 1.0);
         att *= att;
         */
    }

    setTileLighting(tile, color, intensity) {
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

        //tile.color = Color.addColorsByIntensity(tile.color, color, tile.intensity, intensity);
        //tile.color = Color.mixColorsByIntensity(tile.color, color, tile.intensity, intensity);
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
    generate() {
        for (let i = 0; i < this.lights.length; i++) {
            let light = this.lights[i];

            // Light source tile
            let tile = this.map[light.x][light.y];
            tile.color = light.color;
            tile.intensity = light.intensity;

            for (let x = 0; x < this.width; x++) {
                let northBorderPoint = {x: x, y: 0};
                let southBorderPoint = {x: x, y: this.height - 1};

                this._lightLine(this._rayTraceLine(light, northBorderPoint), light);
                this._lightLine(this._rayTraceLine(light, southBorderPoint), light);
            }

            for (let y = 0; y < this.height; y++) {
                let leftBorderPoint = {x: 0, y: y};
                let rightBorderPoint = {x: this.width - 1, y: y};

                this._lightLine(this._rayTraceLine(light, leftBorderPoint), light);
                this._lightLine(this._rayTraceLine(light, rightBorderPoint), light);
            }
        }
    }

    _rayTraceLine(start, target) {
        var ret = [];
        var n = 100;    // max draw distance

        var x0 = start.x;
        var y0 = start.y;

        var x1 = target.x;
        var y1 = target.y;

        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);

        var sx = x0 < x1 ? 1 : -1;
        var sy = y0 < y1 ? 1 : -1;

        var error = dx - dy;

        dx = dx * 2;
        dy = dy * 2;

        while (n > 0) {
            // Check we are in map bounds
            if (x0 < 0 || y0 < 0 || x0 >= this.width || y0 >= this.height) {
                break;
            }

            ret.push({x: x0, y: y0});

            if (error > 0) {
                x0 += sx;
                error -= dy;
            } else {
                y0 += sy;
                error += dx;
            }

            // TODO: Maybe break if we hit a wall?
            if (
                (x0 === 4 && y0 === 2)
            ) {
                break;
            }

            --n;
        }

        return ret;
    }

    /**
     * @param line
     * @param light
     * @private
     */
    _lightLine(line, light) {
        for (var n = 0; n < line.length; n++) {
            var dist = this._distance(line[0], line[n]);

            var intensity = light.intensity * this._attenuation(light.radius, 0.8, dist);

            var x = line[n].x;
            var y = line[n].y;

            let tile = this.map[x][y];

            this.setTileLighting(tile, light.color, intensity);

            // Check if view blocked
            //if (!map.isViewBlocked(line[n])) {
            //    break;
            //}
        }
    }

}


export default LightMap;
