System = require "../System.coffee"
EntityManager = require "../Manager/EntityManager.coffee"
GraphicsManager = require "../Manager/GraphicsManager.coffee"

class GraphicsSystem extends System
    THROTTLE_VALUE: 16

    init: (@width, @height, appendTo = false) =>
        @viewportX = 0
        @viewportY = 0

        @renderer = GraphicsManager.createRenderer @width, @height, appendTo
        @buffer = GraphicsManager.createRenderer @width, @height

    onBeforeDraw: (ctx, dt) ->
    onAfterDraw: (ctx, dt) ->

    onUpdate: (dt) =>
        @onBeforeDraw @buffer.ctx, dt
        @onAfterDraw @buffer.ctx, dt

        renderableEntities = EntityManager.getAllEntitiesWithComponentOfTypes ["Renderable", "Position"]
        for entity in renderableEntities
            renderable = EntityManager.getComponentOfType entity, "Renderable"
            position = EntityManager.getComponentOfType entity, "Position"
            @buffer.ctx.fillStyle = renderable.colour
            @buffer.ctx.fillRect position.x, position.y, renderable.width, renderable.height


        renderableTextEntities = EntityManager.getAllEntitiesWithComponentOfTypes ["RenderableText", "Position"]
        for entity in renderableTextEntities
            text = EntityManager.getComponentOfType entity, "RenderableText"
            position = EntityManager.getComponentOfType entity, "Position"
            @buffer.ctx.fillStyle = text.colour
            @buffer.ctx.font = text.font
            @buffer.ctx.fillText text.text, position.x, position.y

        # Draw copy the buffer to main renderer
        @renderer.ctx.clearRect 0, 0, @width, @height
        @renderer.ctx.drawImage @buffer.canvas, 0, 0
        @buffer.ctx.clearRect 0, 0, @width, @height

    ###
    init: ->
        @meter = new FPSMeter({ graph: 1})

    onUpdate: (dt) ->
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

    ###

module.exports = GraphicsSystem