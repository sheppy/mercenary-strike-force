AssetManager = require "../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee"
GraphicsManager = require "../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
InputManager = require "../../../../../vendor/iki-engine/src/Manager/InputManager.coffee"

Scene = require "../../../../../vendor/iki-engine/src/Scene.coffee"
Map = require "../../../../../vendor/iki-engine/src/Map.coffee"

class MoveMapDemoScene extends Scene
    init: ->
        @viewPortX = 0
        @viewPortY = 0

    activate: ->
        InputManager.onKeyUp = @onKeyUp.bind @

        GraphicsManager.renderer.ctx.fillStyle = "#666"
        GraphicsManager.renderer.ctx.fillRect 0, 0,
            GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height

        @map = new Map()
        loading = @map.loadMap "assets/map/test2.json"
        loading.then () =>
            GraphicsManager.renderer.ctx.fillStyle = "#696"
            GraphicsManager.renderer.ctx.fillRect 0, 0,
                GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height

            @map.drawMap GraphicsManager.renderer.ctx

    deactivate: -> InputManager.onKeyUp = null

    onKeyUp: (e) ->
        moveDistance = 16

        if e.keyCode == 38 then @viewPortY -= moveDistance # up
        if e.keyCode == 40 then @viewPortY += moveDistance # down
        if e.keyCode == 37 then @viewPortX -= moveDistance # left
        if e.keyCode == 39 then @viewPortX += moveDistance # right

        if @map
            GraphicsManager.renderer.ctx.fillStyle = "#696"
            GraphicsManager.renderer.ctx.fillRect 0, 0,
                GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height

            @map.drawMapRect GraphicsManager.renderer.ctx,
                @viewPortX, @viewPortY,
                GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height

module.exports = MoveMapDemoScene