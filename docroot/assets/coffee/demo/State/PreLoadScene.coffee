Scene = require "../../../vendor/iki-engine/src/Scene.coffee"
SceneManager = require "../../../vendor/iki-engine/src/Manager/SceneManager.coffee"
GraphicsManager = require "../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
AssetManager = require "../../../vendor/iki-engine/src/Manager/AssetManager.coffee"

class PreLoadScene extends Scene
    init: ->
        @bar =
            x: (GraphicsManager.renderer.canvas.width / 2) - 100
            y: (GraphicsManager.renderer.canvas.height / 2) - 20
            width: 200
            height: 20

        @bar.middle = @bar.x + (@bar.width / 2)

        @ctx = GraphicsManager.renderer.ctx


    activate: (scene = "menu") ->
        @ctx.fillStyle = "#000"
        @ctx.fillRect 0, 0, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height

        @renderLoadingBar 0
        @renderLoadingText "Loading..."

        AssetManager.onProgress = @onProgress.bind @

        loadAsset = AssetManager.load "assets/demo-assets.json"
        loadAsset.then -> SceneManager.activate scene


    onProgress: (asset, group, loaded, total) ->
        @ctx.fillStyle = "#000"
        @ctx.fillRect 0, 0, GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height
        @renderLoadingText "Loading #{group}..."
        @renderLoadingBar loaded / total


    renderLoadingText: (text) ->
        @ctx.fillStyle = "#fff"
        @ctx.font = "12px Arial, sans-serif"
        @ctx.textBaseline = "top"
        textSize = @ctx.measureText text
        @ctx.fillText text, @bar.middle - (textSize.width / 2), @bar.y + @bar.height + 10


    renderLoadingBar: (percent) ->
        @ctx.fillStyle = "#fff"
        @ctx.strokeStyle = "#fff"
        @ctx.strokeRect @bar.x, @bar.y, @bar.width, @bar.height
        @ctx.fillRect @bar.x + 3, @bar.y + 3, (@bar.width - 6) * percent, @bar.height - 6


module.exports = PreLoadScene