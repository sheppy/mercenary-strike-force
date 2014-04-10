Engine = require "../engine/src/Engine.coffee"
EntityManager = require "../engine/src/Manager/EntityManager.coffee"
InputManager = require "../engine/src/Manager/InputManager.coffee"
GraphicsSystem = require "../engine/src/System/GraphicsSystem.coffee"
InputSystem = require "../engine/src/System/InputSystem.coffee"
FloatingTextSystem = require "../engine/src/System/FloatingTextSystem.coffee"




class LightTest extends Engine
    init: ->
        @input = @addSystem new InputSystem()
        InputManager.onMouseClick = @onMouseClick
        @input.init()

        @gfx = @addSystem new GraphicsSystem()
        @gfx.init 640, 480, document.body

        @addSystem new FloatingTextSystem()

#        @gfx.onAfterDraw = @onAfterDraw.bind @

        e = EntityManager.createEntity "cursor"
        EntityManager.addComponent e, {
            type: "Renderable"
            width: 6
            height: 6
            colour: "red"
        }
        EntityManager.addComponent e, {
            type: "Position"
            x: 0
            y: 0
        }
        EntityManager.addComponent e, {
            type: "PositionFollowsMouse"
        }


    onAfterDraw: (ctx, dt) ->

    onMouseClick: (e) ->
        console.log "click te"
        entity = EntityManager.createEntity()

        EntityManager.addComponent entity, {
            type: "Position"
            x: e.x
            y: e.y
        }

        EntityManager.addComponent entity, {
            type: "RenderableText"
            font: "14px Futura, Helvetica, sans-serif"
            colour: "rgba(0,0,0,0)"
            text: "Test Text"
        }

        EntityManager.addComponent entity, {
            type: "ShowFloatingText"
            showTime: 500
            displayTime: 750
            hideTime: 500
            rgb: "0,0,0"
            alpha: "0"
        }


engine = new LightTest
engine.init()
engine.start()