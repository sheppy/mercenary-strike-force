System = require "../../../vendor/iki-engine/src/System.coffee"
Util = require "../../../vendor/iki-engine/src/Util.coffee"

GraphicsManager = require "../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
EntityManager = require "../../../vendor/iki-engine/src/Manager/EntityManager.coffee"
InputManager = require "../../../vendor/iki-engine/src/Manager/InputManager.coffee"

class MainMenuInputSystem extends System
    init: ->
        InputManager.onMouseClick = @onMouseClick.bind @

    onMouseClick: (e) ->
        onClick = @getButtonClickEventFromPoint e.x, e.y
        onClick?()

    getButtonClickEventFromPoint: (x, y) ->
        entities = EntityManager.getAllEntitiesWithComponentOfTypes ["UIClickEvent", "UIButton", "ScreenPosition"]

        for entity in entities
            button = EntityManager.getComponentOfType entity, "UIButton"
            position = EntityManager.getComponentOfType entity, "ScreenPosition"
            clickEvent = EntityManager.getComponentOfType entity, "UIClickEvent"

            if @mouseInButton position, button, x, y then return clickEvent.onClick

        return null

    onUpdate: (dt) ->
        # Update button states
        entities = EntityManager.getAllEntitiesWithComponentOfTypes ["UIState", "UIButton", "ScreenPosition"]

        for entity in entities
            button = EntityManager.getComponentOfType entity, "UIButton"
            position = EntityManager.getComponentOfType entity, "ScreenPosition"
            state = EntityManager.getComponentOfType entity, "UIState"

            state.hover = @mouseInButton position, button

            if state.hover
                state.pressed = InputManager.mouse.down
            else
                state.pressed = false

        return null


    mouseInButton: (position, button, x, y) ->
        x ?= InputManager.mouse.x
        y ?= InputManager.mouse.y
        Util.isPointInRect x, y, position.x, position.y, button.width, button.height


module.exports = MainMenuInputSystem