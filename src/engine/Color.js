/**
 * @class
 */
class Color {
    static intToRgb(color) {
        return {
            r: color >> 16 & 0xFF,
            g: color >> 8 & 0xFF,
            b: color & 0xFF
        };
    }

    static rgbToInt(color) {
        return (color.r << 16) + (color.g << 8) + color.b;
    }

    static mixColors(c1, c2) {
        c1 = Color.intToRgb(c1);
        c2 = Color.intToRgb(c2);
        var res = {
            r: (c1.r > c2.r) ? c1.r : c2.r,
            g: (c1.g > c2.g) ? c1.g : c2.g,
            b: (c1.b > c2.b) ? c1.b : c2.b
        };

        return Color.rgbToInt(res);
    }

    static addColors(c1, c2) {
        c1 = Color.intToRgb(c1);
        c2 = Color.intToRgb(c2);
        var res = {
            r: (0.5 * c1.r) + (0.5 * c2.r),
            g: (0.5 * c1.g) + (0.5 * c2.g),
            b: (0.5 * c1.b) + (0.5 * c2.b)
        };

        return Color.rgbToInt(res);
    }

    static addColorsByIntensity(c1, c2, i1, i2) {
        c1 = Color.intToRgb(c1);
        c2 = Color.intToRgb(c2);
        var res = {
            r: (0.5 * c1.r * i1) + (0.5 * c2.r * i2),
            g: (0.5 * c1.g * i1) + (0.5 * c2.g * i2),
            b: (0.5 * c1.b * i1) + (0.5 * c2.b * i2)
        };

        return Color.rgbToInt(res);
    }

    static mixColorsByIntensity(c1, c2, i1, i2) {
        c1 = Color.intToRgb(c1);
        c2 = Color.intToRgb(c2);
        var res = {
            r: (c1.r * i1 > c2.r * i2) ? c1.r : c2.r,
            g: (c1.g * i1 > c2.g * i2) ? c1.g : c2.g,
            b: (c1.b * i1 > c2.b * i2) ? c1.b : c2.b
        };

        return Color.rgbToInt(res);
    }

    static applyIntensity(color, intensity) {
        color = Color.intToRgb(color);

        color.r = color.r * intensity;
        color.g = color.g * intensity;
        color.b = color.b * intensity;

        return Color.rgbToInt(color);
    }
}

export default Color;
