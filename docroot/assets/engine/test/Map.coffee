Map = require "../src/Map.coffee"

describe "Map", ->
    map  = null

    beforeEach -> map = new Map()

    describe "#constructor()", ->
        it "should instantiate an Entity class", -> map.should.be.an.instanceof Map
        it "should set a width of 0", -> map.width.should.equal 0
        it "should set a height of 0", -> map.height.should.equal 0
        it "should set a tile width of 0", -> map.tileWidth.should.equal 0
        it "should set a tile height of 0", -> map.tileHeight.should.equal 0
        it "should have an array of layers", -> map.layers.should.be.an "Array"
        it "should have no layers", -> map.layers.length.should.equal 0
        it "should have an array of tile maps", -> map.tileMaps.should.be.an "Array"
        it "should have no tile maps", -> map.tileMaps.length.should.equal 0


    describe "#loadMap()", ->
        it "should be a function", -> map.loadMap.should.be.a "function"


    describe "#parse()", ->
        beforeEach ->
            sinon.stub map, "parseLayer"
            sinon.stub map, "parseTileSet"
            map.parseMap
                width: 3
                height: 4
                tileWidth: 32
                tileHeight: 32
                layers: [0, 1, 2]
                tilesets: [0, 1]

        afterEach ->
            map.parseLayer.restore()
            map.parseTileSet.restore()

        it "should be a function", -> map.parseMap.should.be.a "function"
        it "should set the map width", -> map.width.should.equal 3
        it "should set the map height", -> map.height.should.equal 4
        it "should set the tile width", -> map.tileWidth.should.equal 32
        it "should set the tile height", -> map.tileHeight.should.equal 32
        it "should parse each layer", -> map.parseLayer.should.have.been.calledThrice
        it "should parse each tile set", -> map.parseTileSet.should.have.been.calledTwice