_ = require "../../../vendor/underscore/underscore.js"

System = require "../System.coffee"

class GraphicsSystem extends System
    init: ->
        @FPS = 1000 / 60

        @WIDTH = 480
        @HEIGHT = 480

        @VIEWPORT_X = 3 * 32
        @VIEWPORT_Y = 0

        @canvas = document.getElementById "game"
        @ctx = @canvas.getContext "2d"
        @bufferCanvas = document.createElement "canvas"
        @bufferCanvas.width = @WIDTH
        @bufferCanvas.height = @HEIGHT
        @bufferCtx = @bufferCanvas.getContext "2d"

        @timeToDraw = 0

        @meter = new FPSMeter({ graph: 1})

    update: (dt) ->
        @timeToDraw -= dt

        if @timeToDraw <= 0
            @draw()
            @timeToDraw = @FPS

    draw: ->
        @meter.tickStart()

        if @entitySystem
            entities = @entitySystem.getAllEntitiesWithComponentOfTypes ["Renderable", "Position"]

            _.each entities, (entity) =>
                renderable = @entitySystem.getComponentOfType entity, "Renderable"
                position = @entitySystem.getComponentOfType entity, "Position"

                @bufferCtx.fillStyle = renderable.colour
                @bufferCtx.fillRect position.x, position.y, 20, 20

        @ctx.clearRect 0, 0, @WIDTH, @HEIGHT
        @ctx.drawImage @bufferCanvas, 0, 0
        @bufferCtx.clearRect 0, 0, @WIDTH, @HEIGHT

        @meter.tick()


module.exports = GraphicsSystem