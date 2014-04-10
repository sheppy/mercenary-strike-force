Graphics = require "./Graphics.coffee"

class Game
    fps: 30
    entities: []

    init: ->
        Graphics.canvas = document.getElementById "game"
        Graphics.ctx = Graphics.canvas.getContext "2d"

    draw: ->
        Graphics.ctx.clearRect 0, 0, 480, 320

    update: ->

    start: ->
        run = @run()

        run()
        # TODO: Change to requestAnimationFrame
#        setInterval run, 30

    run: ->
        loops = 0
        skipTicks = 1000 / @fps
        maxFrameSkip = 10
        nextGameTick = Date.now()

        return =>
            loops = 0
            while Date.now() > nextGameTick && loops < maxFrameSkip
                @update()
                nextGameTick += skipTicks
                loops++
            @draw()



module.exports = Game