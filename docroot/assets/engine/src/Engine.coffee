StateManager = require "./Manager/StateManager.coffee"

class Engine
    constructor: ->
        @lastGameTick = Date.now()

    start: (state) ->
        StateManager.add "boot", state
        state.init()
        StateManager.activate "boot"
        @mainLoop()

    mainLoop: ->
        requestAnimationFrame @mainLoop.bind @

        @currentGameTick = Date.now()
        @delta = @currentGameTick - @lastGameTick
        @lastGameTick = @currentGameTick

        @update @delta
        return null

    update: (dt) ->
        state = StateManager.current()

        for system in state.systems
            system.update dt
        return null


module.exports = Engine