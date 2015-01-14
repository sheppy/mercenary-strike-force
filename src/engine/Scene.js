class Scene extends PIXI.Stage {
    constructor(background) {
        super(background);

        this.updateCB = null;
        this.paused = false;
    }

    onUpdate(updateCB = null) {
        this.updateCB = updateCB;
    }

    update() {
        if (typeof this.updateCB === "function") {
            this.updateCB();
        }
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }

    isPaused() {
        return this.paused;
    }
}

export default Scene;
