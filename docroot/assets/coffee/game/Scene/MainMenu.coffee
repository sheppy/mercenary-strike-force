Scene = require "../../../vendor/iki-engine/src/Scene.coffee"
Util = require "../../../vendor/iki-engine/src/Util.coffee"
SceneManager = require "../../../vendor/iki-engine/src/Manager/SceneManager.coffee"
GraphicsManager = require "../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
InputManager = require "../../../vendor/iki-engine/src/Manager/InputManager.coffee"
AudioManager = require "../../../vendor/iki-engine/src/Manager/AudioManager.coffee"
AssetManager = require "../../../vendor/iki-engine/src/Manager/AssetManager.coffee"

class MainMenuScene extends Scene
    init: ->
        @menus = {}
        @renderer = GraphicsManager.renderer
        @clickListener = @onMouseClick.bind @

        # Set the current menu
        @currentMenu = "main-menu"

        AudioManager.load "menu-select", "/assets/sound/UI pack 1/MENU B_Select.wav"
        AudioManager.load "menu-back", "/assets/sound/UI pack 1/MENU B_Back.wav"

        # Load the menus
        @loadMenu "/assets/menu/main-menu.json"
        @loadMenu "/assets/menu/new-game-menu.json"


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
                @addButton menuData.id, element


    addButton: (menu, btn) ->
        onClick = null

        if btn.actionType == "switchMenu" then onClick = @switchMenu.bind @, btn.action, btn.isBack
        if btn.actionType == "switchScene" then onClick = @switchScene.bind @, btn.action, btn.isBack

        button =
            text: btn.text
            x: btn.x
            y: btn.y
            width: btn.width
            height: btn.height
            disabled: btn.disabled
            click: onClick

        if not @menus[menu] then @menus[menu] = {}
        if not @menus[menu].buttons then @menus[menu].buttons = []
        @menus[menu].buttons.push button


    activate: ->
        @background = AssetManager.get "img/background/image6_0.jpg"
        InputManager.onMouseClick = @onMouseClick.bind @
        @currentMenu = "main-menu"
        @renderMenu()

    deactivate: -> InputManager.onMouseClick = null

    switchMenu: (newMenu, isBack = false) ->
        if isBack
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
        if button then button.click?()

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
        GraphicsManager.fillImage @renderer.ctx, @background,
            @background.width, @background.height,
            @renderer.canvas.width, @renderer.canvas.height

    renderButton: (button, hover = false) ->
        @renderer.ctx.fillStyle = unless button.disabled then "rgba(255,255,255,0.9)" else "rgba(255,255,255,0.4)"
        @renderer.ctx.strokeStyle = "#000"

        if hover
            @renderer.ctx.shadowBlur = 20
            @renderer.ctx.shadowColor = "yellow"

        @renderer.ctx.fillRect button.x, button.y, button.width, button.height

        @renderer.ctx.shadowBlur = 0 if hover

        @renderer.ctx.strokeRect button.x, button.y, button.width, button.height

        @renderer.ctx.fillStyle = "#000"
        @renderer.ctx.font = "12px Arial, sans-serif"
        @renderer.ctx.textBaseline = "top"
        textSize = @renderer.ctx.measureText button.text
        @renderer.ctx.fillText button.text, button.x + 100 - (textSize.width / 2), button.y + 7


module.exports = MainMenuScene