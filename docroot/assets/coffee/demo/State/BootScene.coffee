Scene = require "../../../vendor/iki-engine/src/Scene.coffee"
SceneManager = require "../../../vendor/iki-engine/src/Manager/SceneManager.coffee"
GraphicsManager = require "../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
InputManager = require "../../../vendor/iki-engine/src/Manager/InputManager.coffee"

PreLoadScene = require "./PreLoadScene.coffee"
MenuScene = require "./MenuScene.coffee"

# Demos
Demo1Scene = require "./Demos/Demo1/Demo1Scene.coffee"
LoadMapDemoScene = require "./Demos/LoadMapDemo/LoadMapDemoScene.coffee"
MoveMapDemoScene = require "./Demos/MoveMapDemo/MoveMapDemoScene.coffee"
MoveMapSmoothDemoScene = require "./Demos/MoveMapSmoothDemo/MoveMapSmoothDemoScene.coffee"


class BootScene extends Scene
    init: ->
        # Use GraphicsManager to create main canvas
        GraphicsManager.renderer = GraphicsManager.createRenderer 640, 480, document.body
        GraphicsManager.renderer.canvas.width = window.innerWidth
        GraphicsManager.renderer.canvas.height = window.innerHeight

        InputManager.init()

        preloadScene = new PreLoadScene()
        SceneManager.add "preload", preloadScene
        preloadScene.init()

        menuScene = new MenuScene()
        SceneManager.add "menu", menuScene
        menuScene.init()

        demo1Scene = new Demo1Scene()
        SceneManager.add "demo1", demo1Scene
        demo1Scene.init()

        loadMapDemoScene = new LoadMapDemoScene()
        SceneManager.add "LoadMapDemo", loadMapDemoScene
        loadMapDemoScene.init()

        moveMapDemoScene = new MoveMapDemoScene()
        SceneManager.add "MoveMapDemo", moveMapDemoScene
        moveMapDemoScene.init()

        moveMapSmoothDemoScene = new MoveMapSmoothDemoScene()
        SceneManager.add "MoveMapSmoothDemo", moveMapSmoothDemoScene
        moveMapSmoothDemoScene.init()

        @debugMenu()

        window.addEventListener "resize", ->
            GraphicsManager.renderer.canvas.width = window.innerWidth
            GraphicsManager.renderer.canvas.height = window.innerHeight


    activate: ->
        SceneManager.activate "preload"

    debugMenu: ->
        gui = new dat.GUI()

        SceneManager.debugScene = SceneManager.currentScene

        scenesFolder = gui.addFolder "Scenes"
        scenesFolder.open()
        sceneSelector = scenesFolder.add SceneManager, "debugScene", [
            "menu", "demo1", "LoadMapDemo", "MoveMapDemo", "MoveMapSmoothDemo"
        ]
        sceneSelector.onFinishChange (scene) -> SceneManager.activate scene
        SceneManager.onActivate = ->
            SceneManager.debugScene = SceneManager.currentScene
            sceneSelector.updateDisplay()


module.exports = BootScene