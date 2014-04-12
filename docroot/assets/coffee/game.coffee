Engine = require "../vendor/iki-engine/src/Engine.coffee"

BootState = require "./State/BootState.coffee"


game = new Engine
game.start new BootState