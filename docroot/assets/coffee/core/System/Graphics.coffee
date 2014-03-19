_ = require "../../../vendor/underscore/underscore.js"

System = require "../System.coffee"

class GraphicsSystem extends System
    init: ->
        @FPS = 1000 / 60
        @canvas = document.getElementById "game"
        @ctx = @canvas.getContext "2d"
        @timeToDraw = 0

    update: (dt) ->
        @timeToDraw -= dt

        if @timeToDraw <= 0
            @draw()
            @timeToDraw = @FPS

    draw: ->
        @ctx.clearRect 0, 0, 480, 320

        getEntityManager = @sendMessage "system.entity.manager"
        getEntityManager.then (entityManager) =>
            entities = entityManager.getAllEntitiesWithComponentOfTypes ["Renderable", "Position"]

            _.each entities, (entity) =>
                renderable = entityManager.getComponentOfType entity, "Renderable"
                position = entityManager.getComponentOfType entity, "Position"

                @ctx.fillStyle = renderable.colour
                @ctx.fillRect position.x, position.y, 20, 20


module.exports = GraphicsSystem