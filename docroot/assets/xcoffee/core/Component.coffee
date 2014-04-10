uuid = require "../../vendor/node-uuid/uuid.js"

class Component
    constructor: ->
        @id = @generateId()
        @type = "Component"

    generateId: -> uuid.v1()


module.exports = Component