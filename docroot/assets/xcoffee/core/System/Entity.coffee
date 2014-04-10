_ = require "../../../vendor/underscore/underscore.js"
uuid = require "../../../vendor/node-uuid/uuid.js"
Q = require "../../../vendor/q/q.js"

System = require "../System.coffee"
Entity = require "../Entity.coffee"
Component = require "../Component.coffee"
Util = require "../Util.coffee"


class EntitySystem extends System
#    addComponent: (entity, component) ->
#    hasComponentType: (entity, componentType) ->

#    getComponent: (entity, componentName) ->
#    getEntitiesPossessing: (componentName) ->
#    createEntity: (tag) ->
    init: ->
        @components = {}
        @entities = []
        @channel.subscribe "system.entity.manager", (msg) => msg.deferred.resolve @
        @channel.subscribe "system.entity.create", (msg) => msg.deferred.resolve @createEntity()

    createEntity: ->
        entity = new Entity
        entity.id = uuid.v1()
        @entities.push entity
        return entity


    loadEntity: (entityFile) ->
        res = Util.AJAX entityFile

        res.then (definition) =>
            entity = @createEntity()
            _.each definition.components, (values, name) =>
                component = new Component
                component.type = name
                _.extend component, values
                @addComponent entity, component
            console.log entity

        res.fail (err) -> console.error err


    getEntity: (id) -> _.find @entities, (e) -> e.id == id

    getAllEntitiesWithComponentOfType: (componentType) ->
        _.filter @entities, (e) ->
            !!_.find e.components, (c) -> c.type == componentType

    getAllEntitiesWithComponentOfTypes: (componentTypes) ->
        _.filter @entities, (e) ->
            res = _.filter e.components, (component) -> componentTypes.indexOf(component.type) > -1
            res.length == componentTypes.length

    addComponent: (entity, component) ->
        entity.components.push component

        @components[component.type] = [] if not @components[component.type]
        @components[component.type].push component

    hasComponent: (entity, component) -> !!_.find entity.components, (c) -> c == component

    getComponentOfType: (entity, componentType) -> _.find entity.components, (c) -> c.type == componentType


module.exports = EntitySystem