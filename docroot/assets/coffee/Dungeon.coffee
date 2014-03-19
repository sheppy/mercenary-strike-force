Engine = require "./core/Engine.coffee"
LogSystem = require "./core/System/Log.coffee"
EntitySystem = require "./core/System/Entity.coffee"
GraphicsSystem = require "./core/System/Graphics.coffee"
Component = require "./core/Component.coffee"


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

    start: ->
        getEntityManager = @sendMessage "system.entity.manager"
        getEntityManager.then (entityManager) =>
            # Create entity
            entity = entityManager.createEntity()
            console.log "Entity created: ", entity

            # Add component to entity
            c = new Component()
            entityManager.addComponent entity, c
            console.log entityManager.hasComponent(entity, c)

            entityManager.loadEntity "/assets/entities/Player.json"

            super()



module.exports = Dungeon