System = require "../src/System.coffee"


describe "System", ->
    system = null

    beforeEach -> system = new System

    describe "#constructor()", ->
        it "should instantiate a System class", -> system.should.be.an.instanceof System

    describe "#init()", ->
        it "should be a function", -> system.init.should.be.a.function

    describe "#update()", ->
        it "should be a function", -> system.update.should.be.a.function

        it "should call onUpdate when there is no throttle", ->
            sinon.spy system, "onUpdate"
            system.update 0
            system.onUpdate.should.have.been.calledWith 0

        it "should not call onUpdate if the dt is less than the throttle", ->
            sinon.spy system, "onUpdate"
            system.THROTTLE_VALUE = 10
            system.update 1
            system.onUpdate.should.not.have.been.called

        it "should call onUpdate if the dt is greater than the throttle", ->
            sinon.spy system, "onUpdate"
            system.THROTTLE_VALUE = 10
            system.update 100
            system.onUpdate.should.have.been.calledWith 100

        it "should call onUpdate if the dt eventually passes the throttle", ->
            sinon.spy system, "onUpdate"
            system.THROTTLE_VALUE = 10
            system.update 8
            system.update 8
            system.onUpdate.should.have.been.calledWith 16

        it "should not call onUpdate if the dt needs to pass the throttle again", ->
            sinon.spy system, "onUpdate"
            system.THROTTLE_VALUE = 10
            system.update 12
            system.update 2
            system.onUpdate.should.have.been.calledOnce

    describe "#onUpdate()", ->
        it "should be a function", -> system.onUpdate.should.be.a.function