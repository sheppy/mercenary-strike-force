Scene = require "../../../vendor/iki-engine/src/Scene.coffee"
SceneManager = require "../../../vendor/iki-engine/src/Manager/SceneManager.coffee"
GraphicsManager = require "../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
AssetManager = require "../../../vendor/iki-engine/src/Manager/AssetManager.coffee"


class PreLoadScene extends Scene
    init: ->
        @renderer = GraphicsManager.renderer


    activate: ->
        @bar =
            background: AssetManager.get "img/ui/loading-bar-bg.png"
            fill: AssetManager.get "img/ui/loading-bar-fill.png"
            x: (GraphicsManager.renderer.canvas.width / 2) - 94
            y: (GraphicsManager.renderer.canvas.height / 2) - 22
            width: 188
            height: 22

        @bar.middle = @bar.x + (@bar.width / 2)

        @renderer.ctx.fillStyle = "#000"
        @renderer.ctx.fillRect 0, 0, @renderer.canvas.width, @renderer.canvas.height

        @renderLoadingBar 0
        @renderLoadingText "Loading..."

        AssetManager.onBeforeLoad = @onProgress.bind @
        AssetManager.onProgress = @onProgress.bind @
        AssetManager.onError = @onError.bind @

        loadAsset = AssetManager.load "assets/assets-game.json"
        loadAsset.then -> SceneManager.activate "main-menu"


    onError: (asset) ->
        text = "Error loading #{asset.file}"
        @renderer.ctx.fillStyle = "#000"
        @renderer.ctx.fillRect 0, 0, @renderer.canvas.width, @renderer.canvas.height
        @renderer.ctx.fillStyle = "#ff4444"
        @renderer.ctx.font = "14px Arial, sans-serif"
        @renderer.ctx.textBaseline = "top"
        textSize = @renderer.ctx.measureText text
        @renderer.ctx.fillText text, @bar.middle - (textSize.width / 2), @bar.y + @bar.height + 10


    onProgress: (asset, group, loaded, total) ->
        @renderer.ctx.fillStyle = "#000"
        @renderer.ctx.fillRect 0, 0, @renderer.canvas.width, @renderer.canvas.height
        @renderLoadingText "Loading #{group}"
        @renderLoadingBar loaded / total


    renderLoadingText: (text) ->
        @renderer.ctx.fillStyle = "#33B5E5"
        @renderer.ctx.font = "14px Arial, sans-serif"
        @renderer.ctx.textBaseline = "top"
        textSize = @renderer.ctx.measureText text
        @renderer.ctx.fillText text, @bar.middle - (textSize.width / 2), @bar.y + @bar.height + 10


    # TODO: Glow on bar appears too bright
    renderLoadingBar: (percent) ->
        # Render background
        @renderer.ctx.drawImage @bar.background, @bar.x, @bar.y
        @renderer.ctx.drawImage @bar.fill,
                @bar.x + 6, @bar.y,
                (@bar.width - 12) * percent, @bar.height


module.exports = PreLoadScene