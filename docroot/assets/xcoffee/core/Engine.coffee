_ = require "../../vendor/underscore/underscore.js"
postal = require("../../vendor/postal.js/lib/postal.js")(_)
Q = require "../../vendor/q/q.js"

class Engine
    constructor: ->
        @systems = []

    init: -> @channel = postal.channel()

    addSystem: (system) -> @systems.push system

    sendMessage: (topic, msg = {}) ->
        msg.deferred = Q.defer()
        @channel.publish topic, msg
        msg.deferred.promise

    update: (dt) -> _.each @systems, (system) -> system.update dt

    start: -> @mainLoop()

    mainLoop: ->
        requestAnimationFrame () => @mainLoop()
        if not @lastGameTick then return @lastGameTick = Date.now()

        @currentGameTick = Date.now()
        @delta = @currentGameTick - @lastGameTick
        @lastGameTick = @currentGameTick

        @update @delta




module.exports = Engine