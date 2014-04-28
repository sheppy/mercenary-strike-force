Scene = require "../../../vendor/iki-engine/src/Scene.coffee"
SceneManager = require "../../../vendor/iki-engine/src/Manager/SceneManager.coffee"
GraphicsManager = require "../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
InputManager = require "../../../vendor/iki-engine/src/Manager/InputManager.coffee"
AssetManager = require "../../../vendor/iki-engine/src/Manager/AssetManager.coffee"


# Scenes
PreLoadScene = require "./PreLoad.coffee"


class BootScene extends Scene
    init: ->
        # Use GraphicsManager to create main canvas
        GraphicsManager.renderer = GraphicsManager.createRenderer 640, 480, document.body
        GraphicsManager.renderer.canvas.width = window.innerWidth
        GraphicsManager.renderer.canvas.height = window.innerHeight

        InputManager.init()

        window.addEventListener "resize", ->
            GraphicsManager.renderer.canvas.width = window.innerWidth
            GraphicsManager.renderer.canvas.height = window.innerHeight

        preLoadScene = new PreLoadScene()
        SceneManager.add "preload", preLoadScene
        preLoadScene.init()


    activate: ->
        loadAsset = AssetManager.load "assets/assets-boot.json"
        loadAsset.then -> SceneManager.activate "preload"


module.exports = BootScene