State = require "../../engine/src/State.coffee"
StateManager = require "../../engine/src/Manager/StateManager.coffee"

PreLoadState = require "./PreLoadState.coffee"
MenuState = require "./MenuState.coffee"


class BootState extends State
    init: ->

        # Use GraphicsManager to create main canvas
        # Each State can then have its own graphics system?
#        @gfx = @addSystem new GraphicsSystem()
#        @gfx.init 640, 480, document.body

        preloadState = new PreLoadState()
        StateManager.add "preload", preloadState
        preloadState.init()

        menuState = new MenuState()
        StateManager.add "menu", menuState
        menuState.init()

    activate: ->
        StateManager.activate "preload"


module.exports = BootState