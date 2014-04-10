class InputManager
    @mouse:
        x: 0
        y: 0

    @init: ->
        document.addEventListener "click", InputManager.onMouseClick
        document.addEventListener "mousemove", InputManager.onMouseMove
#        document.addEventListener "keyup", InputManager.onKeyUp
#        document.addEventListener "keydown", InputManager.onKeyDown

    @onMouseClick: (e) ->

    @onMouseMove: (e) ->
        InputManager.mouse.x = e.x
        InputManager.mouse.y = e.y

#    @onKeyDown: (e) ->
#    @onKeyUp: (e) ->



module.exports = InputManager