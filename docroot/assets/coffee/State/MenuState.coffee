State = require "../../vendor/iki-engine/src/State.coffee"
StateManager = require "../../vendor/iki-engine/src/Manager/StateManager.coffee"
GraphicsManager = require "../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
InputManager = require "../../vendor/iki-engine/src/Manager/InputManager.coffee"

class MenuState extends State
    init: ->
        @currentMenu = "main"
        @menus = {}

        @addButton "main", "Tests", 20, 20, 200, 30, @clickMainTest.bind @
        @addButton "test", "Load map", 20, 20, 200, 30, @clickTestLoadMap.bind @
        @addButton "test", "Back", 20, 60, 200, 30, @clickTestBack.bind @

        @ctx = GraphicsManager.renderer.ctx
        @clickListener = @onMouseClick.bind @

    clickMainTest: -> @switchMenu "test"

    clickTestBack: -> @switchMenu "main"
    clickTestLoadMap: -> StateManager.activate "test"


    addButton: (menu, text, x, y, width, height, onClick) ->
        button =
            text: text
            x: x
            y: y
            width: width
            height: height
            click: onClick
        if not @menus[menu] then @menus[menu] = {}
        if not @menus[menu].buttons then @menus[menu].buttons = []
        @menus[menu].buttons.push button

    activate: ->
        InputManager.onMouseClick = @onMouseClick.bind @
        @renderMenu()

    deactivate: -> InputManager.onMouseClick = null

    switchMenu: (newMenu) ->
        @currentMenu = newMenu
        @renderMenu()

    onMouseClick: (e) ->
        button = @getButtonFromPoint e.x, e.y
        if button
            button.click()

    getButtonFromPoint: (x, y) ->
        menu = @menus[@currentMenu]
        for name, button of menu.buttons
            if x >= button.x && x <= button.y + button.width && y >= button.y && y <= button.y + button.height
                return button

    renderMenu: ->
        @renderBackground()
        menu = @menus[@currentMenu]
        for name, button of menu.buttons
            @renderButton button

    renderBackground: ->
        @ctx.fillStyle = "#003"
        @ctx.fillRect 0, 0, 640, 480

    renderButton: (button, hover = false) ->
        @ctx.fillStyle = "#fff"
        @ctx.strokeStyle = "#000"

        if hover
            @ctx.shadowBlur = 20
            @ctx.shadowColor = "yellow"

        @ctx.fillRect button.x, button.y, button.width, button.height

        @ctx.shadowBlur = 0 if hover

        @ctx.strokeRect button.x, button.y, button.width, button.height

        @ctx.fillStyle = "#000"
        @ctx.font = "12px Arial, sans-serif"
        @ctx.textBaseline = "top"
        textSize = @ctx.measureText button.text
        @ctx.fillText button.text, button.x + 100 - (textSize.width / 2), button.y + 7



###
    add click events for menu
    add hover events for menu?
###

module.exports = MenuState