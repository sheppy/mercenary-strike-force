Engine = require "../../vendor/iki-engine/src/Engine.coffee"

BootScene = require "./State/BootScene.coffee"


game = new Engine
game.start new BootScene