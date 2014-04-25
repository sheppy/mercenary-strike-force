System = require "../../../../vendor/iki-engine/src/System.coffee"
InputManager = require "../../../../vendor/iki-engine/src/Manager/InputManager.coffee"
EntityManager = require "../../../../vendor/iki-engine/src/Manager/EntityManager.coffee"

class MapMoveInputSystem extends System

    onUpdate: (dt) ->
        moveDistance = 3 * dt

        entities = EntityManager.getAllEntitiesWithComponentOfTypes ["Position"]

        for entity in entities
            position = EntityManager.getComponentOfType entity, "Position"

            if InputManager.key.up then position.y -= moveDistance
            if InputManager.key.down then position.y += moveDistance
            if InputManager.key.left then position.x -= moveDistance
            if InputManager.key.right then position.x += moveDistance



module.exports = MapMoveInputSystem