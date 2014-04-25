EntityManager = require "../../../../vendor/iki-engine/src/Manager/EntityManager.coffee"

State = require "../../../../vendor/iki-engine/src/State.coffee"
Demo1System = require "./Demo1System.coffee"

class Demo1State extends State
    init: -> @addSystem new Demo1System()

    activate: ->
        @cursor = EntityManager.createEntity "cursor"
        EntityManager.addComponent @cursor, {
            type: "RenderableRect"
            width: 6
            height: 6
            colour: "red"
        }
        EntityManager.addComponent @cursor, {
            type: "Position"
            x: 0
            y: 0
        }
        EntityManager.addComponent @cursor, {
            type: "PositionFollowsMouse"
        }

    deactivate: -> EntityManager.removeEntity @cursor


module.exports = Demo1State