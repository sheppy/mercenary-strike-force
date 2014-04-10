Entity = require "../src/Entity.coffee"

describe "Entity", ->
    entity = null

    beforeEach ->
        entity = new Entity

    describe "#constructor()", ->
        it "should instantiate an Entity class", -> entity.should.be.an.instanceof Entity

#        it "should default the id to null", -> entity.id.should.be null

        it "should have an empty list of components", ->
            entity.components.should.be.an "Array"
            entity.components.length.should.equal 0