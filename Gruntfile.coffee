module.exports = (grunt) ->
#    require("time-grunt")(grunt)
    require("load-grunt-tasks")(grunt)

    FILES =
        DOCROOT: "docroot"
        GAME:
            SRC: "docroot/assets/coffee/game.coffee"
            ALL: "docroot/assets/coffee/**/*.coffee"


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
                files: [{src: FILES.GAME.SRC}]


        browserify:
            options:
                debug: true
                extension: [".coffee", ".js"]
                transform: ["coffeeify"]
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
            game:
                files: [FILES.GAME.ALL]
                tasks: ["newer:coffeelint", "browserify"]

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


    grunt.registerTask "test", ["newer:coffeelint"]
    grunt.registerTask "server", ["connect", "watch"]
    grunt.registerTask "default", ["test", "browserify"]