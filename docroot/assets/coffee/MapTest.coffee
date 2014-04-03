_ = require "../vendor/underscore/underscore"
Engine = require "./core/Engine.coffee"
Map = require "./core/Map.coffee"

GraphicsSystem = require "./core/System/Graphics.coffee"


class MapTest extends Engine
    init: ->
        super()

        @gfx = new GraphicsSystem null, @channel
        @addSystem @gfx
        @gfx.init()

    start: ->
        @map = new Map
        @map.loadMap "/assets/map/test2.json"
        super()

    update: (dt) ->
        super dt

        @map.drawMap()

        @gfx.ctx.drawImage @map.canvas,
            @gfx.VIEWPORT_X, @gfx.VIEWPORT_Y,
            @gfx.WIDTH, @gfx.HEIGHT,
            0, 0,
            @gfx.WIDTH, @gfx.HEIGHT


dungeon = new MapTest
dungeon.init()
dungeon.start()