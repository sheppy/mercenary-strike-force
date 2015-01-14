class Game {
    constructor() {
        this.skipTicks = 1000 / 120;
        this.nextUpdateTick = Date.now();
    }

    update(dt) {
        // TODO: Get current scene & update
    }

    render() {
        // TODO: Get current scene & render
    }

    run() {
        window.requestAnimationFrame(this.run.bind(this));

        var loops = 0;

        while(Date.now() > this.nextUpdateTick) {
            // TODO: Pass dt
            this.update();
            this.nextUpdateTick += this.skipTicks;
            loops++;
        }

        // If we actually updated anything
        if (loops) {
            this.render();
        }
    }
}

export default Game;
