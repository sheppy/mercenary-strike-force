requireSubvert = require("require-subvert")(__dirname + "/src/")
chai = require "chai"
sinon = require "sinon"
sinonChai = require "sinon-chai"
chai.should()
chai.use sinonChai

global.requireSubvert = requireSubvert
global.sinon = sinon

global.document = {
    createElement: ->
}