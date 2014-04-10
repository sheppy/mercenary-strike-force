Entity = require "../../src/Entity.coffee"
EntityManager = null
uuid = null

beforeEach ->
    uuid = {v1: sinon.stub()}
    requireSubvert.subvert "../../vendor/node-uuid/uuid.js", uuid
    EntityManager = requireSubvert.require "../src/Manager/EntityManager.coffee"

afterEach -> requireSubvert.cleanUp()


describe "EntityManager", ->
    it "should have list of entities", -> EntityManager.entities.should.be.an "Array"
    it "should have a list of components", -> EntityManager.components.should.be.an "object"

    describe "#createEntity()", ->
        it "should be a function", -> EntityManager.createEntity.should.be.a.function
        it "should return an entity", ->
            entity = EntityManager.createEntity()
            entity.should.be.an.instanceof Entity
        it "should assign the entity a uuid", ->
            uuid.v1.returns 1
            entity = EntityManager.createEntity()
            entity.id.should.equal 1
        it "should add the entity to the list of entities", ->
            entity = EntityManager.createEntity()
            EntityManager.entities[0].should.equal entity

    describe "#getEntityById()", ->
        it "should be a function", -> EntityManager.getEntityById.should.be.a.function
        xit "should return null of the id was not found", ->
        xit "should return the entity if found", ->

    describe "#getAllEntitiesWithComponentOfType()", ->
        it "should be a function", -> EntityManager.getAllEntitiesWithComponentOfType.should.be.a.function
        xit "should return an empty array if there are no matching entities", ->
        xit "should return an array of matching entities", ->

    describe "#getAllEntitiesWithComponentOfTypes()", ->
        beforeEach ->
            EntityManager.entities = [
                {components: [{type: "201"}, {type: "202"}]}
                {components: [{type: "201"}]}
                {components: [{type: "202"}, {type: "203"}]}
                {components: [{type: "202"}, {type: "203"}]}
                {components: [{type: "204"}]}
            ]

        it "should be a function", -> EntityManager.getAllEntitiesWithComponentOfTypes.should.be.a.function

        it "should return an empty array if there are no matching entities", ->
            entities = EntityManager.getAllEntitiesWithComponentOfTypes ["404"]
            entities.should.be.an "Array"
            entities.length.should.equal 0

        it "should return an array of matching entities for a single component", ->
            entities = EntityManager.getAllEntitiesWithComponentOfTypes ["201"]
            entities.should.be.an "Array"
            entities.length.should.equal 2

        it "should return an empty array if there are only partial matching entities", ->
            entities = EntityManager.getAllEntitiesWithComponentOfTypes ["404", "201"]
            entities.should.be.an "Array"
            entities.length.should.equal 0

        it "should return an array of matching entities for multiple components", ->
            entities = EntityManager.getAllEntitiesWithComponentOfTypes ["202", "203"]
            entities.should.be.an "Array"
            entities.length.should.equal 2


    describe "#addComponent()", ->
        it "should be a function", -> EntityManager.addComponent.should.be.a.function
        xit "should create a new type and add the component to the list of components for that type", ->
        xit "should add the component to the list of components for that type", ->
        xit "should add the component to the entities list of components", ->

    describe "#hasComponent()", ->
        it "should be a function", -> EntityManager.hasComponent.should.be.a.function
        xit "should return false if the entity does not have the component", ->
        xit "should return true if the entity has the component", ->

    describe "#getComponentOfType()", ->
        it "should be a function", -> EntityManager.getComponentOfType.should.be.a.function
        xit "should return null if the entity does not have that component", ->
        xit "should the component if the entity has it", ->