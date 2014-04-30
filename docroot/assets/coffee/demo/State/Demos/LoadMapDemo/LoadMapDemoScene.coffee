AssetManager = require "../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee"
GraphicsManager = require "../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"

Scene = require "../../../../../vendor/iki-engine/src/Scene.coffee"
Map = require "../../../../../vendor/iki-engine/src/Map.coffee"

class LoadMapDemoScene extends Scene
    activate: ->
        map = new Map()
        loading = map.loadMap "assets/map/ice.json"
        loading.then () ->
            GraphicsManager.renderer.ctx.fillStyle = "#000"
            GraphicsManager.renderer.ctx.fillRect 0, 0,
                GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height

            map.drawMap GraphicsManager.renderer.ctx


module.exports = LoadMapDemoScene