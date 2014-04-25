State = require "../../vendor/iki-engine/src/State.coffee"
StateManager = require "../../vendor/iki-engine/src/Manager/StateManager.coffee"
GraphicsManager = require "../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
InputManager = require "../../vendor/iki-engine/src/Manager/InputManager.coffee"

PreLoadState = require "./PreLoadState.coffee"
MenuState = require "./MenuState.coffee"
Demo1State = require "./Demos/Demo1/Demo1State.coffee"
LoadMapDemoState = require "./Demos/LoadMapDemo/LoadMapDemoState.coffee"


class BootState extends State
    init: ->
        # Use GraphicsManager to create main canvas
        GraphicsManager.renderer = GraphicsManager.createRenderer 640, 480, document.body
        InputManager.init()

        preloadState = new PreLoadState()
        StateManager.add "preload", preloadState
        preloadState.init()

        menuState = new MenuState()
        StateManager.add "menu", menuState
        menuState.init()

        demo1State = new Demo1State()
        StateManager.add "demo1", demo1State
        demo1State.init()

        loadMapDemoState = new LoadMapDemoState()
        StateManager.add "LoadMapDemo", loadMapDemoState
        loadMapDemoState.init()

        @debugMenu()


    activate: ->
        StateManager.activate "preload"

    debugMenu: ->
        gui = new dat.GUI()

        statesFolder = gui.addFolder "States"
        statesFolder.open()
        stateControl = statesFolder.add StateManager, "currentState", ["menu", "demo1", "LoadMapDemo"]
        stateControl.onChange (state) -> StateManager.activate state
        StateManager.onActivate = -> stateControl.updateDisplay()


module.exports = BootState