module.exports = (grunt) ->
#    require("time-grunt")(grunt)
    require("load-grunt-tasks")(grunt)

    FILES =
        ENGINE:
            SRC: "docroot/assets/engine/src/**/*.coffee"
            TEST: "docroot/assets/engine/test/**/*.coffee"
            DIST: "docroot/assets/engine/dist/engine.js"
        GAME:
            LIGHT_TEST: "docroot/assets/coffee/lightTest.coffee"


    grunt.initConfig
        pkg: grunt.file.readJSON "package.json"

        coffeelint:
            options:
                configFile: "coffeelint.json"
            gruntfile:
                files: [{src: "Gruntfile.coffee"}]
            engine:
                files: [{src: FILES.ENGINE.SRC}, {src: FILES.ENGINE.TEST}]
            game:
                files: [{src: FILES.GAME.LIGHT_TEST}]

        mochacov:
            options:
                compilers: ["coffee:coffee-script/register"]
                require: ["./docroot/assets/engine/_specHelper.coffee"]
            engine:
                options:
                    files: [FILES.ENGINE.TEST]
                    reporter: "dot"
                    ui: "bdd"
                    "check-leaks": true
#            "engine-cov":
#                options:
#                    files: FILES.ENGINE.TEST
#                    reporter: "html-cov"
#                    output: "./coverage.html"
#            travis:
#                options:
#                    files: FILES.ENGINE.TEST
#                    reporter: "travis-cov"


        browserify:
            options:
                debug: true
                extension: [".coffee", ".js"]
                transform: ["coffeeify"]
#                alias: [
#                    "docroot/assets/vendor/underscore/underscore.js:underscore"
#                ]
            engine:
                files:
                    "docroot/assets/engine/dist/engine.js": [ FILES.ENGINE.SRC ]
            game:
                files:
                    "docroot/assets/js/lightTest.js": [ FILES.GAME.LIGHT_TEST ]

        watch:
            engine:
                files: [FILES.ENGINE.SRC, FILES.ENGINE.TEST]
                tasks: ["newer:coffeelint:engine", "mochacov"]
            game:
                files: [FILES.ENGINE.SRC, FILES.GAME.LIGHT_TEST]
                tasks: ["newer:coffeelint:game", "browserify"]


    grunt.registerTask "test", ["coffeelint", "mochacov"]
    grunt.registerTask "default", ["test", "browserify"]