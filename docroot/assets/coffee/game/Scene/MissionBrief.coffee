Scene = require "../../../vendor/iki-engine/src/Scene.coffee"
GraphicsManager = require "../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"


class MissionBriefScene extends Scene
    init: ->
        @renderer = GraphicsManager.renderer


    activate: (mapName) ->
        console.log mapName

        @renderer.ctx.fillStyle = "#000"
        @renderer.ctx.fillRect 0, 0, @renderer.width, @renderer.height

        @renderer.ctx.fillStyle = "#33B5E5"
        @renderer.ctx.font = "14px Arial, sans-serif"
        @renderer.ctx.textBaseline = "top"

        @renderer.ctx.fillText "TODO: MissionBriefScene", 50, 50
        @renderer.ctx.fillText "> Details of the mission are displayed to player", 50, 70
        @renderer.ctx.fillText "> Player clicks Back > Move to [MainMenuScene]", 50, 90
        @renderer.ctx.fillText "> Player clicks Next > Move to [SquadCreateScene]", 50, 110


module.exports = MissionBriefScene