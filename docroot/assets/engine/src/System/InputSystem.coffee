System = require "../System.coffee"
EntityManager = require "../Manager/EntityManager.coffee"
InputManager = require "../Manager/InputManager.coffee"

class InputSystem extends System

    init: ->
        InputManager.init()

    onUpdate: (dt) ->

        entities = EntityManager.getAllEntitiesWithComponentOfTypes ["PositionFollowsMouse", "Position"]
        for entity in entities
            position = EntityManager.getComponentOfType entity, "Position"
            position.x = InputManager.mouse.x
            position.y = InputManager.mouse.y

        return null


module.exports = InputSystem