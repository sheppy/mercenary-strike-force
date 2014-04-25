AssetManager = require "../../../../vendor/iki-engine/src/Manager/AssetManager.coffee"
GraphicsManager = require "../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
EntityManager = require "../../../../vendor/iki-engine/src/Manager/EntityManager.coffee"

State = require "../../../../vendor/iki-engine/src/State.coffee"
Map = require "../../../../vendor/iki-engine/src/Map.coffee"
GraphicsSystem = require "../../../../vendor/iki-engine/src/System/GraphicsSystem.coffee"
MapMoveInputSyste = require "./MapMoveInputSystem.coffee"

class MoveMapSmoothDemoState extends State
    init: ->
        @mapLoaded = false

        @addSystem new MapMoveInputSyste

        # Add graphics system to handle rendering
        gfx = @addSystem new GraphicsSystem
        gfx.init GraphicsManager.renderer
        gfx.onBeforeDraw = @drawMap.bind @

        @viewport = {
            type: "Position"
            x: 0
            y: 0
        }

        @viewportEntity = EntityManager.createEntity "viewport"
        EntityManager.addComponent @viewportEntity, @viewport


    activate: ->
        # Load the map
        @map = new Map()
        loading = @map.loadMap "/assets/map/test2.json"
        loading.then () => @mapLoaded = true


    deactivate: -> EntityManager.removeEntity @viewport


    drawMap: (ctx) ->
        if @mapLoaded
            @map.drawMapRect ctx,
                @viewport.x, @viewport.y,
                GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height


module.exports = MoveMapSmoothDemoState