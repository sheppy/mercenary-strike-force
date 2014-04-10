_ = require "../../vendor/underscore/underscore.js"
uuid = require "../../vendor/node-uuid/uuid.js"

class Entity
    constructor: ->
        @id = null
        @components = []

module.exports = Entity