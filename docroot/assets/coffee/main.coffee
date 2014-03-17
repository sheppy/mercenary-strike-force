###
ObjectPool = require "./ObjectPool.coffee"
Entity = require "./Entity.coffee"

entityPool = new ObjectPool(Entity)

console.log entityPool.pool
myEntity = entityPool.allocate()


console.log myEntity

entityPool.free myEntity

console.log entityPool.pool
###

Game = require "./Game.coffee"
Map = require "./Map.coffee"


class Dungeon extends Game
    init: ->
        super
        @map = new Map(10, 10, 32, 32)
    draw: ->
        super
        @map.draw()

dungeon = new Dungeon
dungeon.init()
dungeon.start()

