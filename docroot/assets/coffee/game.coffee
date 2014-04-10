Engine = require "../engine/src/Engine.coffee"

BootState = require "./State/BootState.coffee"


game = new Engine
game.start new BootState