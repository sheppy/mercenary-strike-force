Q = require "../../vendor/q/q.js"

class System
    constructor: (@entitySystem, @channel) ->
    init: ->
    update: (dt) ->

    sendMessage: (topic, msg = {}) ->
        msg.deferred = Q.defer()
        @channel.publish topic, msg
        msg.deferred.promise

module.exports = System