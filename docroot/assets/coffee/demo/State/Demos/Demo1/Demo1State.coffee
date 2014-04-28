EntityManager = require "../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee"
GraphicsManager = require "../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"

State = require "../../../../../vendor/iki-engine/src/State.coffee"
Demo1System = require "./Demo1System.coffee"

class Demo1State extends State
    init: -> @addSystem new Demo1System()

    activate: ->
        GraphicsManager.renderer.canvas.style.cursor = "none"

        @cursor = EntityManager.createEntity "cursor"
        cursorImage = new Image()
        cursorImage.src = "/assets/img/cursor/slick_arrow-delta.png";
        EntityManager.addComponent @cursor, {
            type: "RenderableImage"
            img: cursorImage
        }
        EntityManager.addComponent @cursor, {
            type: "Position"
            x: 0
            y: 0
        }
        EntityManager.addComponent @cursor, {
            type: "PositionFollowsMouse"
        }

    deactivate: ->
        EntityManager.removeEntity @cursor
        GraphicsManager.renderer.canvas.style.cursor = "default"


module.exports = Demo1State