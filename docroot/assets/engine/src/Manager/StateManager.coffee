class StateManager
    @states: {}

    @add: (name, state) ->
        console.log "StateManager > add > #{name}"
        StateManager.states[name] = state
        return null

    @current: -> StateManager.states[StateManager.currentState]

    @activate: (name) ->
        console.log "StateManager > activate > #{name}"
        StateManager.currentState = name
        StateManager.current().activate()
        return null


module.exports = StateManager