System = require "../../src/System.coffee"
GraphicsSystem = null
GraphicsManager = null



beforeEach ->
    GraphicsManager = {createRenderer: sinon.stub()}
    requireSubvert.subvert "./Manager/GraphicsManager.coffee", GraphicsManager
    GraphicsSystem = requireSubvert.require "../src/System/GraphicsSystem.coffee"

afterEach -> requireSubvert.cleanUp()


describe "GraphicsSystem", ->
    system = null

    describe "#constructor()", ->
        it "should extend the System class", ->
            system = new GraphicsSystem
            system.should.be.an.instanceof System

    describe "#init()", ->
        mockRenderer = {}
        beforeEach ->
            mockRenderer = {}
            GraphicsManager.createRenderer.returns mockRenderer
            system = new GraphicsSystem

        it "should be a function", -> system.init.should.be.a.function

        it "should set the width and height", ->
            system.init 640, 480
            system.width.should.equal 640
            system.height.should.equal 480

        it "should set the viewport x/y offset to 0", ->
            system.init()
            system.viewportX.should.equal 0
            system.viewportY.should.equal 0

        it "should create the main canvas", ->
            system.init 10, 20
            GraphicsManager.createRenderer.should.have.been.calledWith 10, 20
            system.renderer.should.equal mockRenderer

        it "should create the double buffer canvas", ->
            system.init 30, 50
            GraphicsManager.createRenderer.should.have.been.calledTwice
            GraphicsManager.createRenderer.should.always.have.been.calledWith 30, 50
            system.buffer.should.equal mockRenderer
