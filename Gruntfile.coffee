module.exports = (grunt) ->
#    require("time-grunt")(grunt)
    require("load-grunt-tasks")(grunt)

    FILES =
        DOCROOT: "docroot"
        ENGINE:
            SRC: "docroot/assets/engine/src/**/*.coffee"
            TEST: "docroot/assets/engine/test/**/*.coffee"
            DIST: "docroot/assets/engine/dist/engine.js"
        GAME:
            SRC: "docroot/assets/coffee/game.coffee"
            ALL: "docroot/assets/coffee/**/*.coffee"


    LIVERELOAD_PORT = 35729

    liveReloadMiddleware = (connect) ->
        [
            # Inject a livereloading script into static files.
            require("connect-livereload")({ port: LIVERELOAD_PORT })
            # Serve static files.
            connect.static FILES.DOCROOT
            # Make empty directories browsable
            connect.directory FILES.DOCROOT
        ]


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
                files: [{src: FILES.GAME.SRC}]

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
                    "docroot/assets/js/game.js": [ FILES.GAME.SRC ]


        connect:
            options:
                port: 3000,
                hostname: "localhost"
            dev:
                options:
                    middleware: liveReloadMiddleware


        watch:
            engine:
                files: [FILES.ENGINE.SRC, FILES.ENGINE.TEST]
                tasks: ["newer:coffeelint:engine", "mochacov"]
            game:
                files: [FILES.ENGINE.SRC, FILES.GAME.ALL]
                tasks: ["newer:coffeelint:game", "browserify:game"]

            html:
                files: [FILES.DOCROOT + "/**/*.html"]
                tasks: []
                options:
                    livereload: LIVERELOAD_PORT
            css:
                files: [FILES.DOCROOT + "/**/*.css"]
                tasks: []
                options:
                    livereload: LIVERELOAD_PORT
            js:
                files: [FILES.DOCROOT + "/**/*.js"]
                tasks: []
                options:
                    livereload: LIVERELOAD_PORT


    grunt.registerTask "test", ["coffeelint", "mochacov"]
    grunt.registerTask "server", ["connect", "watch"]
    grunt.registerTask "default", ["test", "browserify"]