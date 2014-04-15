AssetManager = require "../../../vendor/iki-engine/src/Manager/AssetManager.coffee"
GraphicsManager = require "../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"

State = require "../../../vendor/iki-engine/src/State.coffee"
Map = require "../../../vendor/iki-engine/src/Map.coffee"

class Demo2State extends State
    activate: ->

        GraphicsManager.renderer.ctx.fillStyle = "#666"
        GraphicsManager.renderer.ctx.fillRect 0, 0,
            GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height

        map = new Map()
        loading = map.loadMap "/assets/map/test1.json"
        loading.then () ->
            GraphicsManager.renderer.ctx.fillStyle = "#696"
            GraphicsManager.renderer.ctx.fillRect 0, 0,
                GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height

            map.drawMap GraphicsManager.renderer.ctx



module.exports = Demo2State