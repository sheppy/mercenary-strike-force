module.exports = (grunt) ->
    require("time-grunt")(grunt)
    require("load-grunt-tasks")(grunt)

    DIR =
        DOCROOT: "docroot"
        COFFEE: "docroot/assets/coffee/**/*.coffee"

    LIVERELOAD_PORT = 35729

    liveReloadMiddleware = (connect, options) ->
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

        coffeeify:
            options: {
                debug: true
            }
            all:
                src: DIR.COFFEE
                dest: "docroot/assets/js/dungeon.js"

                
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
                tasks: ["newer:coffeelint", "coffeeify"]
                options:
                    livereload: LIVERELOAD_PORT
            html:
                files: [DIR.DOCROOT + "/**/*.html"]
                tasks: []
                options:
                    livereload: LIVERELOAD_PORT


    grunt.registerTask "test", ["coffeelint"]
    grunt.registerTask "server", ["test", "connect", "watch"]
    grunt.registerTask "default", ["server"]