class System
    THROTTLE_VALUE: 0

    constructor: -> @timeSinceUpdate = 0

    init: ->

    update: (dt) ->
        @timeSinceUpdate += dt

        if @timeSinceUpdate >= @THROTTLE_VALUE
            @onUpdate @timeSinceUpdate
            @timeSinceUpdate = 0

        return @timeSinceUpdate

    onUpdate: (dt) ->

module.exports = System