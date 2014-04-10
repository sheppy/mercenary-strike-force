class Engine
    constructor: ->
        @systems = []
        @lastGameTick = Date.now()

    init: ->

    update: (dt) ->
        for system in @systems
            system.update dt
        return dt

    addSystem: (system) ->
        @systems.push system
        return system

    start: -> @mainLoop()

    mainLoop: ->
        requestAnimationFrame @mainLoop.bind(@)

        @currentGameTick = Date.now()
        @delta = @currentGameTick - @lastGameTick
        @lastGameTick = @currentGameTick

        @update @delta


module.exports = Engine