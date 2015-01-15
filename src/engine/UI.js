/**
 * @class
 */
class UI {
    static buttonify(sprite, events = {}) {
        if (typeof sprite.setInteractive === "function") {
            sprite.setInteractive(true);
        } else {
            sprite.interactive = true;
        }

        if (events.over) {
            sprite.mouseover = events.over;
        }
        if (events.out) {
            sprite.mouseout = events.out;
        }
        if (events.down) {
            sprite.mousedown = events.down;
            sprite.touchstart = events.down;
        }
        if (events.up) {
            sprite.mouseup = events.up;
            sprite.touchend = events.up;
        }
        if (events.click) {
            sprite.click = events.click;
            sprite.tap = events.click;
        }
    }
}

export default UI;
