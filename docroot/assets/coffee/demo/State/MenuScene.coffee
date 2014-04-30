Scene = require "../../../vendor/iki-engine/src/Scene.coffee"
Util = require "../../../vendor/iki-engine/src/Util.coffee"
SceneManager = require "../../../vendor/iki-engine/src/Manager/SceneManager.coffee"
GraphicsManager = require "../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
InputManager = require "../../../vendor/iki-engine/src/Manager/InputManager.coffee"
AudioManager = require "../../../vendor/iki-engine/src/Manager/AudioManager.coffee"
AssetManager = require "../../../vendor/iki-engine/src/Manager/AssetManager.coffee"

class MenuScene extends Scene
    init: ->
        @menus = {}
        @ctx = GraphicsManager.renderer.ctx
        @clickListener = @onMouseClick.bind @

        # Set the current menu
        @currentMenu = "main"

        AudioManager.load "menu-select", "assets/sound/UI pack 1/MENU B_Select.wav"
        AudioManager.load "menu-back", "assets/sound/UI pack 1/MENU B_Back.wav"

        # Load the menus
        @loadMenu "assets/menu/main.json"
        @loadMenu "assets/menu/demos.json"


    loadMenu: (menuFile) ->
        map = Util.loadJSON menuFile
        map.then @parseMenu.bind @


    parseMenu: (menuData) ->
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
        if actionType == "switchScene" then onClick = @switchScene.bind @, action

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
        @background = AssetManager.get "img/background/image6_0.jpg"
        InputManager.onMouseClick = @onMouseClick.bind @
        @currentMenu = "main"
        @renderMenu()

    deactivate: -> InputManager.onMouseClick = null

    switchMenu: (newMenu) ->
        if newMenu == "main"
            AudioManager.play "menu-back"
        else
            AudioManager.play "menu-select"

        @currentMenu = newMenu
        @renderMenu()

    switchScene: (scene) ->
        AudioManager.play "menu-select"
        SceneManager.activate scene

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
        GraphicsManager.fillImage @ctx, @background,
            @background.width, @background.height,
            GraphicsManager.renderer.canvas.width, GraphicsManager.renderer.canvas.height

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


module.exports = MenuScene