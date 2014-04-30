System = require "../../../vendor/iki-engine/src/System.coffee"

GraphicsManager = require "../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
EntityManager = require "../../../vendor/iki-engine/src/Manager/EntityManager.coffee"

class MainMenuRendererSystem extends System
    THROTTLE_VALUE: 16

    init: (@renderer) ->

    onUpdate: ->
        TWEEN.update()
        @drawBackground()
        @drawButtons()

    drawBackground: ->
        entities = EntityManager.getAllEntitiesWithComponentOfTypes ["UIBackground"]
        for entity in entities
            background = EntityManager.getComponentOfType entity, "UIBackground"

            GraphicsManager.fillImage @renderer.ctx, background.img,
                background.img.width, background.img.height,
                @renderer.width, @renderer.height

    drawButtons: ->
        entities = EntityManager.getAllEntitiesWithComponentOfTypes ["UIButton", "ScreenPosition"]

        for entity in entities
            button = EntityManager.getComponentOfType entity, "UIButton"
            position = EntityManager.getComponentOfType entity, "ScreenPosition"
            state = EntityManager.getComponentOfType entity, "UIState"

            primaryColour = button.colour
            highlightColour = button.colour
            textColour = "#fff"
            shadowColour = "rgba(0,0,0,0.7)"

            if state.disabled
                primaryColour = button.colourDisabled
                highlightColour = button.colourDisabled
                textColour = "rgba(255,255,255,0.3)"
                shadowColour = "rgba(0,0,0,0.4)"
            else if state.pressed
                highlightColour = button.colourPressed
                textColour = button.colourPressed
            else if state.hover
                highlightColour = button.colourHover
                textColour = button.colourHover

            @renderer.ctx.fillStyle = primaryColour
            padding = 3
            GraphicsManager.roundedRectFill @renderer.ctx,
                position.x + padding, position.y + padding,
                button.width - padding - padding, button.height - padding - padding, 8

            @renderer.ctx.strokeStyle = highlightColour
            @renderer.ctx.lineWidth = 2
            GraphicsManager.roundedRectStroke @renderer.ctx,
                position.x, position.y,
                button.width, button.height, 12

            @renderer.ctx.textBaseline = "top"
            @renderer.ctx.font = "bold 14px Arial, sans-serif"
            textSize = @renderer.ctx.measureText button.text

            @renderer.ctx.lineWidth = 4
            @renderer.ctx.miterLimit = 1
            @renderer.ctx.strokeStyle = shadowColour
            @renderer.ctx.strokeText button.text,
                    position.x + (button.width / 2) - (textSize.width / 2),
                    position.y + (button.height / 2) - 7

            @renderer.ctx.fillStyle = textColour
            @renderer.ctx.fillText button.text,
                    position.x + (button.width / 2) - (textSize.width / 2),
                    position.y + (button.height / 2) - 7

        entities = EntityManager.getAllEntitiesWithComponentOfTypes ["UIText", "ScreenPosition"]

        for entity in entities
            text = EntityManager.getComponentOfType entity, "UIText"
            position = EntityManager.getComponentOfType entity, "ScreenPosition"

            @renderer.ctx.textBaseline = "top"
            @renderer.ctx.font = text.font
            textSize = @renderer.ctx.measureText text.text

            @renderer.ctx.fillStyle = "#fff"
            @renderer.ctx.fillText text.text,
                    position.x - (textSize.width / 2),
                    position.y

            @renderer.ctx.lineWidth = 3
            @renderer.ctx.miterLimit = 4
            @renderer.ctx.strokeStyle = "#000"
            @renderer.ctx.strokeText text.text,
                    position.x - (textSize.width / 2),
                    position.y


module.exports = MainMenuRendererSystem