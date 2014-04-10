AssetManager = require "../../src/Manager/AssetManager.coffee"


describe "AssetManager", ->
    assetManager = null

    beforeEach -> assetManager = new AssetManager

    describe "#constructor()", ->
        it "should instantiate a AssetManager class", -> assetManager.should.be.an.instanceof AssetManager