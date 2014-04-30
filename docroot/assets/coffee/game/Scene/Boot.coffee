Scene = require "../../../vendor/iki-engine/src/Scene.coffee"
SceneManager = require "../../../vendor/iki-engine/src/Manager/SceneManager.coffee"
GraphicsManager = require "../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
InputManager = require "../../../vendor/iki-engine/src/Manager/InputManager.coffee"
AssetManager = require "../../../vendor/iki-engine/src/Manager/AssetManager.coffee"


# Scenes
PreLoadScene = require "./PreLoad.coffee"
MainMenuScene = require "./MainMenu.coffee"
CreditsScene = require "./Credits.coffee"
MissionCreateScene = require "./MissionCreate.coffee"


class BootScene extends Scene
    init: ->
        # Use GraphicsManager to create main canvas
        @width = 1280
        @height = 720
        GraphicsManager.renderer = GraphicsManager.createRenderer @width, @height, document.body
        @sizeCanvas()

        InputManager.init GraphicsManager.renderer.canvas

        window.addEventListener "resize", @sizeCanvas.bind @

        # Set up the scenes
        preLoadScene = new PreLoadScene()
        SceneManager.add "preload", preLoadScene
        preLoadScene.init()

        mainMenuScene = new MainMenuScene()
        SceneManager.add "main-menu", mainMenuScene
        mainMenuScene.init()

        creditsScene = new CreditsScene()
        SceneManager.add "credits", creditsScene
        creditsScene.init()

        missionCreateScene = new MissionCreateScene()
        SceneManager.add "mission-create", missionCreateScene
        missionCreateScene.init()


    activate: ->
        loadAsset = AssetManager.load "assets/assets-boot.json"
        loadAsset.then -> SceneManager.activate "preload"


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