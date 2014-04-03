Engine = require "./core/Engine.coffee"

LogSystem = require "./core/System/Log.coffee"
EntitySystem = require "./core/System/Entity.coffee"
GraphicsSystem = require "./core/System/Graphics.coffee"
InputSystem = require "./core/System/Input.coffee"


class Dungeon extends Engine
    init: ->
        super()

        logSystem = new LogSystem @channel
        @addSystem logSystem
        logSystem.init()

        entitySystem = new EntitySystem @channel
        @addSystem entitySystem
        entitySystem.init()

        graphicsSystem = new GraphicsSystem @channel
        @addSystem graphicsSystem
        graphicsSystem.init()

        inputSystem = new InputSystem @channel
        @addSystem inputSystem
        inputSystem.init()

    start: ->
        getEntityManager = @sendMessage "system.entity.manager"
        getEntityManager.then (entityManager) =>
            entityManager.loadEntity "/assets/entities/Player.json"
            entityManager.loadEntity "/assets/entities/Map.json"

            super()


module.exports = Dungeon