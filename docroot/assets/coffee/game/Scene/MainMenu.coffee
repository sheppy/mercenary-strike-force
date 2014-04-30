Scene = require "../../../vendor/iki-engine/src/Scene.coffee"
Util = require "../../../vendor/iki-engine/src/Util.coffee"
SceneManager = require "../../../vendor/iki-engine/src/Manager/SceneManager.coffee"
GraphicsManager = require "../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
InputManager = require "../../../vendor/iki-engine/src/Manager/InputManager.coffee"
AudioManager = require "../../../vendor/iki-engine/src/Manager/AudioManager.coffee"
AssetManager = require "../../../vendor/iki-engine/src/Manager/AssetManager.coffee"
EntityManager = require "../../../vendor/iki-engine/src/Manager/EntityManager.coffee"

# Systems
MainMenuInputSystem = require "../System/MainMenuInput.coffee"
MainMenuRendererSystem = require "../System/MainMenuRenderer.coffee"


class MainMenuScene extends Scene
    init: ->
        @renderer = GraphicsManager.renderer

        AudioManager.load "menu-select", "/assets/sound/UI pack 1/MENU B_Select.wav"
        AudioManager.load "menu-back", "/assets/sound/UI pack 1/MENU B_Back.wav"


    activate: ->
        input = @addSystem new MainMenuInputSystem
        input.init()

        gfx = @addSystem new MainMenuRendererSystem
        gfx.init @renderer

        @currentMenu = "main-menu"
        @loadMenu "/assets/menu/#{@currentMenu}.json"


    deactivate: ->
        InputManager.onMouseClick = null
        EntityManager.deleteAllEntities()


    loadMenu: (menuFile) ->
        map = Util.loadJSON menuFile
        map.then @parseMenu.bind @


    parseMenu: (menuData) ->
        for element in menuData.elements
            if element.type == "background" then @addBackground menuData.id, element
            if element.type == "button" then @addButton menuData.id, element
            if element.type == "text" then @addText menuData.id, element


    addBackground: (menu, bg) ->
        background = EntityManager.createEntity()

        EntityManager.addComponent background, {
            type: "UIBackground"
            img: AssetManager.get bg.src
        }


    addText: (menu, txt) ->
        text = EntityManager.createEntity()

        EntityManager.addComponent text, {
            type: "UIText"
            text: txt.text
            font: txt.font
        }

        EntityManager.addComponent text, {
            type: "ScreenPosition"
            x: (@renderer.width / 2)
            y: txt.y
        }


    addButton: (menu, btn) ->
        button = EntityManager.createEntity()

        EntityManager.addComponent button, {
            type: "UIButton"
            width: btn.width
            height: btn.height
            colour: "rgba(255,255,255,0.5)"
            colourHover: "#fb3"
            colourPressed: "#33b5e5"
            colourDisabled: "rgba(255,255,255,0.1)"
            text: btn.text
        }
        EntityManager.addComponent button, {
            type: "ScreenPosition"
            x: -350
            y: btn.y
        }
        EntityManager.addComponent button, {
            type: "UIState"
            hover: false
            disabled: btn.disabled
            pressed: false
        }

        if btn.actionType == "switchMenu"
            EntityManager.addComponent button, {
                type: "UIClickEvent"
                onClick: @switchMenu.bind @, btn.action, btn.isBack
            }
        else if btn.actionType == "switchScene"
            EntityManager.addComponent button, {
                type: "UIClickEvent"
                onClick: @switchScene.bind @, btn.action, btn.isBack
            }

        tween = @tweenForButtons "in"
        tween.start()


    switchMenu: (newMenu, isBack = false) ->
        sound = if isBack then "menu-back" else "menu-select"
        AudioManager.play sound
        @currentMenu = newMenu

        direction = if isBack then "out-left" else "out-right"
        tween = @tweenForButtons direction
        tween.onComplete =>
            EntityManager.deleteAllEntities()
            @loadMenu "/assets/menu/#{@currentMenu}.json"
        tween.start()


    tweenForButtons: (direction) ->
        center = (@renderer.width / 2) - 150
        rightScreen = @renderer.width + 50

        if direction == "out-left"
            from = {x: center}
            to = {x: -350}
        else if direction == "out-right"
            from = {x: center}
            to = {x: rightScreen}
        else
            from = {x: -350}
            to = {x: center}

        buttons = EntityManager.getAllEntitiesWithComponentOfTypes ["UIButton", "ScreenPosition"]

        positions = for button in buttons
            EntityManager.getComponentOfType button, "ScreenPosition"

        tween = new TWEEN.Tween from
        tween.to to, 500
        tween.easing TWEEN.Easing.Cubic.Out
        tween.onUpdate -> position.x = @x for position in positions

        return tween


    switchScene: (scene) ->
        AudioManager.play "menu-select"
        SceneManager.activate scene


module.exports = MainMenuScene