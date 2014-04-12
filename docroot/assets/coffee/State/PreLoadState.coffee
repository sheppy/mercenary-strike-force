State = require "../../vendor/iki-engine/src/State.coffee"
StateManager = require "../../vendor/iki-engine/src/Manager/StateManager.coffee"
AssetManager = require "../../vendor/iki-engine/src/Manager/AssetManager.coffee"

class PreLoadState extends State
    activate: ->
        loadAsset = AssetManager.load "assets/assets.json"
        loadAsset.then -> StateManager.activate "menu"

module.exports = PreLoadState