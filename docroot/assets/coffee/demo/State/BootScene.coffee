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
MapLightingDemoScene = require "./Demos/MapLightingDemo/MapLightingDemoScene.coffee"


class BootScene extends Scene
    init: ->
        # Use GraphicsManager to create main canvas
        @width = 1280
        @height = 720
        GraphicsManager.renderer = GraphicsManager.createRenderer @width, @height, document.body
        @sizeCanvas()

        InputManager.init GraphicsManager.renderer.canvas

        window.addEventListener "resize", @sizeCanvas.bind @

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

        mapLightingDemoScene = new MapLightingDemoScene()
        SceneManager.add "MapLightingDemo", mapLightingDemoScene
        mapLightingDemoScene.init()

        @debugMenu()

        window.addEventListener "resize", ->
            GraphicsManager.renderer.canvas.width = window.innerWidth
            GraphicsManager.renderer.canvas.height = window.innerHeight


    activate: ->
        defaultScene = "menu"
        sceneShortcut = window.location.search.match /\?scene=(.+)/
        if sceneShortcut && sceneShortcut[1] then defaultScene = sceneShortcut[1]
        SceneManager.activate "preload", defaultScene

    debugMenu: ->
        gui = new dat.GUI()

        SceneManager.debugScene = SceneManager.currentScene

        scenesFolder = gui.addFolder "Scenes"
        scenesFolder.open()
        sceneSelector = scenesFolder.add SceneManager, "debugScene", [
            "menu", "demo1", "LoadMapDemo", "MoveMapDemo", "MoveMapSmoothDemo", "MapLightingDemo"
        ]
        sceneSelector.onFinishChange (scene) -> SceneManager.activate scene
        SceneManager.onActivate = ->
            SceneManager.debugScene = SceneManager.currentScene
            sceneSelector.updateDisplay()

    sizeCanvas: ->
        gameWidth = window.innerWidth
        gameHeight = window.innerHeight
        scaleToFitX = gameWidth / @width
        scaleToFitY = gameHeight / @height

        currentScreenRatio = gameWidth / gameHeight
        optimalRatio = Math.min scaleToFitX, scaleToFitY

        if currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79
            GraphicsManager.renderer.canvas.style.width = gameWidth + "px"
            GraphicsManager.renderer.canvas.style.height = gameHeight + "px"
        else
            GraphicsManager.renderer.canvas.style.width = @width * optimalRatio + "px"
            GraphicsManager.renderer.canvas.style.height = @height * optimalRatio + "px"

        InputManager.MOUSE_TRANSFORM_RECT = GraphicsManager.renderer.canvas.getBoundingClientRect()
        InputManager.MOUSE_TRANSFORM_WIDTH = GraphicsManager.renderer.canvas.width
        InputManager.MOUSE_TRANSFORM_HEIGHT = GraphicsManager.renderer.canvas.height
        InputManager.MOUSE_OFFSET_X = GraphicsManager.renderer.canvas.offsetLeft
        InputManager.MOUSE_OFFSET_Y = GraphicsManager.renderer.canvas.offsetTop

module.exports = BootScene