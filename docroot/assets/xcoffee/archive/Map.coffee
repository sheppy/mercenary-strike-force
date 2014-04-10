Graphics = require "./Graphics.coffee"

class Map
    width: 0
    height: 0
    tileWidth: 0
    tileHeight: 0
    pixelWidth: 0
    pixelHeight: 0
    data: []

    constructor: (@width, @height, @tileWidth, @tileHeight) ->
        @setPixelSize()

        for y in [0..@height-1]
            @data[y] = []
            for x in [0..@width-1]
                @data[y][x] = Math.floor(Math.random() * 3)

    setPixelSize: ->
        @pixelWidth = @width * @tileWidth
        @pixelHeight = @height * @tileHeight

    draw: ->
        for y in [0..@height-1]
            for x in [0..@width-1]
                colour = switch @data[y][x]
                    when 0 then "red"
                    when 1 then "green"
                    when 2 then "blue"
                    else "black"
                @drawTile x, y, colour

    drawTile: (x,y, colour) ->
        Graphics.ctx.fillStyle = colour
        Graphics.ctx.fillRect x * @tileWidth, y * @tileHeight, @tileWidth, @tileHeight

module.exports = Map