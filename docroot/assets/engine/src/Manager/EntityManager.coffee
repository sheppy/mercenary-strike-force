uuid = require "../../../vendor/node-uuid/uuid.js"
Entity = require "../Entity.coffee"

class EntityManager
    @components = {}
    @entities = []

    @createEntity: (id) ->
        id ?= uuid.v1()
        entity = new Entity
        entity.id = id
        @entities.push entity
        return entity

    @removeEntity: (entity) ->
        # TODO: Remove components
        # TODO Remove from entity list?

    @getEntityById: ->
    @getAllEntitiesWithComponentOfType: ->

    @getAllEntitiesWithComponentOfTypes: (componentTypes) ->
        entities = []
        for entity in @entities
            componentCount = 0
            for component in entity.components
                if componentTypes.indexOf(component.type) > -1 then componentCount++
            if componentCount == componentTypes.length then entities.push entity
        return entities

    @addComponent: (entity, component) ->
        entity.components.push component
        @components[component.type] = [] if not @components[component.type]
        @components[component.type].push component

    @hasComponent: ->

    @getComponentOfType: (entity, componentType) ->
        for component in entity.components
            if component.type == componentType then return component
        return null


#    getComponentOfType: (entity, componentType) -> _.find entity.components, (c) -> c.type == componentType


module.exports = EntityManager