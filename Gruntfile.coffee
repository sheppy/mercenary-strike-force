module.exports = (grunt) ->
#    require("time-grunt")(grunt)
    require("load-grunt-tasks")(grunt)

    FILES =
        DOCROOT: "docroot"
        ENGINE:
            SRC: "docroot/assets/vendor/iki-engine/src/**/*.coffee"
        GAME:
            SRC: "docroot/assets/coffee/game/mercenary-strike-force.coffee"
            ALL: "docroot/assets/coffee/game/**/*.coffee"
        DEMO:
            SRC: "docroot/assets/coffee/demo/demo.coffee"
            ALL: "docroot/assets/coffee/demo/**/*.coffee"


    LIVERELOAD_PORT = 35729

    liveReloadMiddleware = (connect) ->
        [
            require("connect-livereload")({ port: LIVERELOAD_PORT })
            connect.static FILES.DOCROOT
            connect.directory FILES.DOCROOT
        ]


    grunt.initConfig
        pkg: grunt.file.readJSON "package.json"


        coffeelint:
            options:
                configFile: "coffeelint.json"
            gruntfile:
                files: [{src: "Gruntfile.coffee"}]
            game:
                files: [
                    {src: FILES.GAME.SRC}
                ]
            demo:
                files: [
                    {src: FILES.DEMO.SRC}
                ]


        browserify:
            options:
                debug: true
                extension: [".coffee", ".js"]
                transform: ["coffeeify"]
            game:
                files:
                    "docroot/assets/js/mercenary-strike-force.js": [ FILES.GAME.SRC ]
            demo:
                files:
                    "docroot/assets/js/demo.js": [ FILES.DEMO.SRC ]


        connect:
            options:
                port: 3000,
                hostname: "*"
            dev:
                options:
                    middleware: liveReloadMiddleware


        watch:
            game:
                files: [FILES.ENGINE.SRC, FILES.GAME.ALL]
                tasks: ["newer:coffeelint:game", "browserify:game"]
            demo:
                files: [FILES.ENGINE.SRC, FILES.DEMO.ALL]
                tasks: ["newer:coffeelint:demo", "browserify:demo"]

            html:
                files: [FILES.DOCROOT + "/index.html", FILES.DOCROOT + "/demo.html"]
                tasks: []
                options:
                    livereload: LIVERELOAD_PORT
            css:
                files: [FILES.DOCROOT + "/assets/css/**/*.css"]
                tasks: []
                options:
                    livereload: LIVERELOAD_PORT
            js:
                files: [FILES.DOCROOT + "/assets/js/**/*.js"]
                tasks: []
                options:
                    livereload: LIVERELOAD_PORT


    grunt.registerTask "test", ["newer:coffeelint"]
    grunt.registerTask "server", ["connect", "watch"]
    grunt.registerTask "default", ["test", "browserify"]