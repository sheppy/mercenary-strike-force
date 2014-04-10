System = require "../System.coffee"

class LogSystem extends System
    init: ->  @channel.subscribe "system.log", @log

    log: (msg) -> console.log msg


module.exports = LogSystem