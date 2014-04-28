System = require "../../../../../vendor/iki-engine/src/System.coffee"
EntityManager = require "../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee"
GraphicsManager = require "../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
InputManager = require "../../../../../vendor/iki-engine/src/Manager/InputManager.coffee"

class Demo1System extends System
    THROTTLE_VALUE: 16  # 62.5 FPS

    onUpdate: ->
        GraphicsManager.renderer.ctx.fillStyle = "#fff"
        GraphicsManager.renderer.ctx.fillRect 0, 0,
            GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height

        # Follow mouse - normally would be in a different system from the renderables
        followEntities = EntityManager.getAllEntitiesWithComponentOfTypes ["PositionFollowsMouse", "Position"]
        for entity in followEntities
            position = EntityManager.getComponentOfType entity, "Position"
            position.x = InputManager.mouse.x
            position.y = InputManager.mouse.y

        # Draw renderables
        renderableEntities = EntityManager.getAllEntitiesWithComponentOfTypes ["RenderableImage", "Position"]
        for entity in renderableEntities
            renderable = EntityManager.getComponentOfType entity, "RenderableImage"
            position = EntityManager.getComponentOfType entity, "Position"
            GraphicsManager.renderer.ctx.drawImage renderable.img, position.x, position.y

        return null


module.exports = Demo1System