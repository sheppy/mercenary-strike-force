State = require "../../vendor/iki-engine/src/State.coffee"
Util = require "../../vendor/iki-engine/src/Util.coffee"
StateManager = require "../../vendor/iki-engine/src/Manager/StateManager.coffee"
GraphicsManager = require "../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
InputManager = require "../../vendor/iki-engine/src/Manager/InputManager.coffee"

class MenuState extends State
    init: ->
        @menus = {}
        @ctx = GraphicsManager.renderer.ctx
        @clickListener = @onMouseClick.bind @

        # Set the current menu
        @currentMenu = "main"

        # Load the menus
        @loadMenu "/assets/menu/main.json"
        @loadMenu "/assets/menu/demos.json"


    loadMenu: (menuFile) ->
        map = Util.loadJSON menuFile
        map.then (menuData) =>
            @menus[menuData.id] = {
                id: menuData.id
                background: menuData.background
                elements: []
                buttons: []
            }

            for element in menuData.elements

                if element.type == "button"
                    @addButton menuData.id,
                        element.text,
                        element.x,
                        element.y,
                        element.width,
                        element.height,
                        element.actionType,
                        element.action


    addButton: (menu, text, x, y, width, height, actionType, action) ->
        if actionType == "switchMenu" then onClick = @switchMenu.bind @, action
        if actionType == "switchState" then onClick = @switchState.bind @, action

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
        @currentMenu = "main"
        @renderMenu()

    deactivate: -> InputManager.onMouseClick = null

    switchMenu: (newMenu) ->
        @currentMenu = newMenu
        @renderMenu()

    switchState: (state) -> StateManager.activate state

    onMouseClick: (e) ->
        button = @getButtonFromPoint e.x, e.y
        if button then button.click()

    getButtonFromPoint: (x, y) ->
        menu = @menus[@currentMenu]
        for button in menu.buttons
            if @isPointInRect x, y, button.x, button.y, button.width, button.height
                return button

    isPointInRect: (x, y, rx, ry, rw, rh) -> return x >= rx && x <= ry + rw && y >= ry && y <= ry + rh

    renderMenu: ->
        @renderBackground()
        menu = @menus[@currentMenu]
        for button in menu.buttons
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


module.exports = MenuState