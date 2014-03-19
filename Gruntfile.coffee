module.exports = (grunt) ->
    require("time-grunt")(grunt)
    require("load-grunt-tasks")(grunt)

    DIR =
        DOCROOT: "docroot"
#        COFFEE: "docroot/assets/coffee/**/*.coffee"
        COFFEE: "docroot/assets/coffee/core/**/*.coffee"

    LIVERELOAD_PORT = 35729

    liveReloadMiddleware = (connect) ->
        [
            # Inject a livereloading script into static files.
            require("connect-livereload")({ port: LIVERELOAD_PORT }),
            # Serve static files.
            connect.static(DIR.DOCROOT),
            # Make empty directories browsable
            connect.directory(DIR.DOCROOT)
        ]


    grunt.initConfig
        pkg: grunt.file.readJSON "package.json"

        coffeelint:
            options:
                configFile: "coffeelint.json"
            all:
                files: [
                    {src: "Gruntfile.coffee"}
                    {src: DIR.COFFEE}
                ]

        browserify:
            options:
                debug: true
                extension: [".coffee", ".js"]
                transform: ["coffeeify"]
                alias: [
                    "docroot/assets/vendor/underscore/underscore.js:underscore"
                ]
            all:
                files:
                    "docroot/assets/js/dungeon.js": [
                        "docroot/assets/coffee/Dungeon.coffee"
                        DIR.COFFEE
                    ]

        connect:
            options:
                port: 3000,
                hostname: "localhost"
            dev:
                options:
                    middleware: liveReloadMiddleware
        watch:
            coffee:
                files: [DIR.COFFEE]
                tasks: ["newer:coffeelint", "browserify"]
                options:
                    livereload: LIVERELOAD_PORT
            html:
                files: [DIR.DOCROOT + "/**/*.html"]
                tasks: []
                options:
                    livereload: LIVERELOAD_PORT
            css:
                files: [DIR.DOCROOT + "/**/*.css"]
                tasks: []
                options:
                    livereload: LIVERELOAD_PORT


    grunt.registerTask "test", ["coffeelint"]
    grunt.registerTask "server", ["test", "connect", "watch"]
    grunt.registerTask "default", ["server"]