_ = require "../../vendor/underscore/underscore"
Util = require "./Util.coffee"


class Map
    constructor: ->
        @width = 0
        @height = 0
        @tileWidth = 0
        @tileHeight = 0
        @layers = []
        @tileSets = []
        @canvas = document.createElement "canvas"
        @ctx = @canvas.getContext "2d"

    loadMap: (mapFile) ->
        res = Util.AJAX mapFile

        res.then (mapData) =>
            @width = mapData.width
            @height = mapData.height
            @tileWidth = mapData.tilewidth
            @tileHeight = mapData.tileheight
            @layers = mapData.layers
            @tileSets = mapData.tilesets

            @canvas.width = @width * @tileWidth
            @canvas.height = @height * @tileHeight

            _.each @tileSets, (tileSet) ->
                tileSet.lastgid = tileSet.firstgid +
                    ((tileSet.imagewidth * tileSet.imageheight) / (tileSet.tilewidth * tileSet.tileheight))

                tileSet.numXTiles = Math.floor tileSet.imagewidth / tileSet.tilewidth
                tileSet.numYTiles = Math.floor tileSet.imageheight / tileSet.tileheight

                console.log "create tileset", tileSet.image
                tileSet.img = new Image()
                tileSet.img.src = "/assets/map/" + tileSet.image


            @lightMap = document.createElement "canvas"
            @lightMap.width = @canvas.width
            @lightMap.height = @canvas.height
            @lightMap.ctx = @lightMap.getContext "2d"

            @lightMap.ctx.fillRect 0, 0, @lightMap.width, @lightMap.height
            @lightMap.ctx.fillStyle = "white"
            @lightMap.ctx.beginPath()
            @lightMap.ctx.arc 320, 320, 80, 0, 2 * Math.PI, false
            @lightMap.ctx.fill()


            # Doesn't work as image has not loaded :-(
            @drawMap()

        res.fail (err) -> console.error err

        return res

    drawMap: ->
        @ctx.clearRect 0, 0, @canvas.width, @canvas.height

        for layer in [0..@layers.length - 1]
            for y in [0..@height - 1]
                for x in [0..@width - 1]
                    tileNumber = @layers[layer].data[(y * @width) + x]

                    # Find out what tile set we are in
                    tileSet = _.find @tileSets, (tileSet) ->
                        (tileNumber >= tileSet.firstgid) && (tileNumber <= tileSet.lastgid)

                    if tileSet
                        tileNumber = tileNumber - tileSet.firstgid
                        @drawTile x, y, @tileWidth, @tileHeight, tileNumber, tileSet


#        @ctx.globalCompositeOperation = "destination-in"
#        @ctx.drawImage @lightMap, 0, 0

    drawTile: (x, y, tw, th, tileNumber, tileSet) ->
        # Find the srcX & srcY in the image - reverse (x * y) + x = n
        srcX = Math.floor(tileNumber % tileSet.numXTiles) * tileSet.tilewidth
        srcY = Math.floor(tileNumber / tileSet.numXTiles) * tileSet.tileheight

        @ctx.drawImage tileSet.img,
            srcX, srcY,
            tileSet.tilewidth, tileSet.tileheight,
            x * tileSet.tilewidth, y * tileSet.tileheight,
            tileSet.tilewidth, tileSet.tileheight


module.exports = Map