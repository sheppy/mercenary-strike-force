AssetManager = require "../../../../../vendor/iki-engine/src/Manager/AssetManager.coffee"
GraphicsManager = require "../../../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
EntityManager = require "../../../../../vendor/iki-engine/src/Manager/EntityManager.coffee"

Scene = require "../../../../../vendor/iki-engine/src/Scene.coffee"
Map = require "../../../../../vendor/iki-engine/src/Map.coffee"
GraphicsSystem = require "../../../../../vendor/iki-engine/src/System/GraphicsSystem.coffee"
MapMoveInputSyste = require "./MapMoveInputSystem.coffee"

class MoveMapSmoothDemoScene extends Scene
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

        @viewportEntity = EntityManager.createEntity "viewport", false
        EntityManager.addComponent @viewportEntity, @viewport


    activate: ->
        EntityManager.addEntity @viewportEntity

        # Load the map
        @map = new Map()
        loading = @map.loadMap "assets/map/test3.json"
        loading.then () => @mapLoaded = true


    deactivate: -> EntityManager.removeEntity @viewportEntity


    drawMap: (ctx) ->
        if @mapLoaded
            @map.drawMapRect ctx,
                @viewport.x, @viewport.y,
                GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height


module.exports = MoveMapSmoothDemoScene