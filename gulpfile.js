'use strict';

var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    atImport = require("postcss-import"),
    cssnano = require('cssnano'),
    browserify = require('browserify'),
    watch = require('gulp-watch'),
    rigger = require('gulp-rigger'),
    args = require('yargs').argv,
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Local host"
};

var path = {
    build: {
        html: 'build/',
        js:   'build/js/',
        jsName: 'bundle.js',
        css:  'build/css/'
    },
    src: {
        html:  'src/html/index.html',
        js:    'src/js/app.js',
        css:   'src/css/main.css'
    },
    watch: {
        html:    'src/html/**/*.html',
        js:      'src/js/**/*.js',
        css:    'src/css/**/*.css'
    }
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    /*
     gulp --env dev
     gulp --env prod
     gulp // default dev
     */
    var env = args.env || 'dev',
        settings = {
            dev: {
                browserify: {debug: true}
            },
            prod: {
                browserify: {}
            }
        };


    return browserify(path.src.js, settings[env].browserify)
        .bundle()
        .pipe(source(path.build.jsName))
        .pipe(buffer())
        .pipe(gulpif(env != 'dev', uglify()))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('css:build', function () {
    gulp.src(path.src.css)
        .pipe( postcss([ atImport, autoprefixer, cssnano ]) )
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'css:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });

    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });

    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'webserver', 'watch']);
