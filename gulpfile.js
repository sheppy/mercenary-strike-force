/* jshint node: true */
var gulp = require("gulp"),
    plugin = require("gulp-load-plugins")(),
    es6ify = require("es6ify"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    browserSync = require("browser-sync");

//es6ify.traceurOverrides = {experimental: true};


var CONFIG = {
    ENTRY: {
        FILE: "index.js",
        FULL_PATH: "./src/game/index.js"
    },
    DEST: {
        PATH: "./lib"
    }
};


var onError = function (err) {
    plugin.notify.onError({
        title: "Gulp",
        subtitle: "Failure!",
        message: "Error: <%= error.message %>",
        sound: "Beep"
    })(err);

    this.emit("end");
};


gulp.task("lint", function () {
    return gulp.src("./src/**/*.js")
        .pipe(plugin.plumber({errorHandler: onError}))
        .pipe(plugin.jshint())
        .pipe(plugin.jshint.reporter("jshint-stylish"));
});


gulp.task("js", ["lint"], function () {
    return browserify({debug: true})
        .add(es6ify.runtime)
        .transform(es6ify.configure(/^(?!.*node_modules)+.+\.js$/))
        .require(require.resolve(CONFIG.ENTRY.FULL_PATH), {entry: true})
        .bundle()
        .on("error", onError)
        .pipe(plugin.plumber({errorHandler: onError}))
        .pipe(source(CONFIG.ENTRY.FILE))
        .pipe(gulp.dest(CONFIG.DEST.PATH))
        .pipe(plugin.streamify(plugin.uglify()))
        .pipe(plugin.rename({suffix: ".min"}))
        .pipe(gulp.dest(CONFIG.DEST.PATH));
});


// Start server
gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "./public",
            routes: {
                "/lib": "./lib",
                "/bower_components": "./bower_components"
            },
            directory: false,
            index: "index.html"
        },
        startPath: "/index.html",
        notify: false
    });
});


// Reload all Browsers
gulp.task("bs-reload", function () {
    browserSync.reload();
});


gulp.task("watch", ["browser-sync"], function () {
    // Watch js files
    gulp.watch("./src/**/*.js", ["js"]);

    // Reloading
    gulp.watch("./lib/**/*.js", ["bs-reload"]);
});


gulp.task("build", ["js"]);

gulp.task("default", ["build"]);
