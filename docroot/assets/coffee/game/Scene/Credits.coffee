Scene = require "../../../vendor/iki-engine/src/Scene.coffee"
GraphicsManager = require "../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"


class CreditsScene extends Scene
    init: ->
        @renderer = GraphicsManager.renderer


    activate: ->
        @renderer.ctx.fillStyle = "#000"
        @renderer.ctx.fillRect 0, 0, @renderer.width, @renderer.height

        @renderText "TODO: Credits"


    renderText: (text) ->
        @renderer.ctx.fillStyle = "#33B5E5"
        @renderer.ctx.font = "14px Arial, sans-serif"
        @renderer.ctx.textBaseline = "top"
        @renderer.ctx.fillText text, 50, 50



module.exports = CreditsScene