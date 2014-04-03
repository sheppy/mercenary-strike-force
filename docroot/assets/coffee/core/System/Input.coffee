_ = require "../../../vendor/underscore/underscore.js"

System = require "../System.coffee"

class InputSystem extends System
    KEY:
        UP:
            PRESSED: false
            REPEAT: false
            CODE: 38
        DOWN:
            PRESSED: false
            REPEAT: false
            CODE: 40
        LEFT:
            PRESSED: false
            REPEAT: false
            CODE: 37
        RIGHT:
            PRESSED: false
            REPEAT: false
            CODE: 39

    init: ->
        document.addEventListener "keydown", @keyDown.bind(@)
        document.addEventListener "keyup", @keyUp.bind(@)

    setKey: (keyCode, pressed) ->
        key = _.find @KEY, (details) -> details.CODE == keyCode

        if key
            if key.PRESSED == pressed
                key.REPEAT = true
            else
                key.PRESSED = pressed
                key.REPEAT = false

        @updateEntites()

    keyDown: (e) ->
        @setKey e.keyCode, true
        e.preventDefault()

    keyUp: (e) ->
        @setKey e.keyCode, false
        e.preventDefault()

    updateEntites: ->
        getEntityManager = @sendMessage "system.entity.manager"
        getEntityManager.then (entityManager) =>
            entities = entityManager.getAllEntitiesWithComponentOfTypes ["PlayerInput", "Position"]
            _.each entities, (entity) =>
                position = entityManager.getComponentOfType entity, "Position"

                if @KEY.DOWN.PRESSED && not @KEY.DOWN.REPEAT then position.y += 20
                if @KEY.UP.PRESSED && not @KEY.UP.REPEAT then position.y -= 20
                if @KEY.LEFT.PRESSED && not @KEY.LEFT.REPEAT then position.x -= 20
                if @KEY.RIGHT.PRESSED && not @KEY.RIGHT.REPEAT then position.x += 20


module.exports = InputSystem