Scene = require "../../../vendor/iki-engine/src/Scene.coffee"
GraphicsManager = require "../../../vendor/iki-engine/src/Manager/GraphicsManager.coffee"
SceneManager = require "../../../vendor/iki-engine/src/Manager/SceneManager.coffee"


class MissionCreateScene extends Scene
    init: ->
        @renderer = GraphicsManager.renderer


    activate: (missionType) ->
        @renderer.ctx.fillStyle = "#000"
        @renderer.ctx.fillRect 0, 0, @renderer.width, @renderer.height

        @renderer.ctx.fillStyle = "#33B5E5"
        @renderer.ctx.font = "14px Arial, sans-serif"
        @renderer.ctx.textBaseline = "top"


        @renderer.ctx.fillText "> Mission Type: #{missionType}", 50, 30
        @renderer.ctx.fillText "> Define objectives", 50, 50
        setTimeout @defineObjectives.bind(@), 750

    defineObjectives: ->
        @renderer.ctx.fillText "> Define map", 50, 70
        setTimeout @defineMap.bind(@), 750

    defineMap: ->
        @renderer.ctx.fillText "> Move to [MissionBriefScene]", 50, 90
        setTimeout @viewMissionBriefing.bind(@), 750

    viewMissionBriefing: ->
        SceneManager.activate "mission-brief", "map-name"


module.exports = MissionCreateScene