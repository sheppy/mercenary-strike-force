GraphicsManager = require "../../src/Manager/GraphicsManager.coffee"


describe "GraphicsManager", ->
    describe "#createCanvas()", ->
        canvasMock = null

        beforeEach ->
            canvasMock = {}
            sinon.stub document, "createElement", -> canvasMock

        afterEach -> document.createElement.restore()

        it "should be a function", -> GraphicsManager.createCanvas.should.be.a.function

        it "should create a canvas element", ->
            canvas = GraphicsManager.createCanvas()
            canvas.should.equal canvasMock


    describe "#createRenderer()", ->
        canvasMock = { getContext: -> ctxMock }
        ctxMock = "2d"

        beforeEach -> sinon.stub GraphicsManager, "createCanvas", -> canvasMock
        afterEach -> GraphicsManager.createCanvas.restore()

        it "should be a function", -> GraphicsManager.createRenderer.should.be.a.function

        it "should create a canvas element", ->
            renderer = GraphicsManager.createRenderer 640, 480, false
            GraphicsManager.createCanvas.should.have.been.calledWith 640, 480, false
            renderer.canvas.should.equal canvasMock

        it "should get the context", ->
            renderer = GraphicsManager.createRenderer 10, 10
            renderer.ctx.should.be.equal ctxMock