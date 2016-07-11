var gulp = require('gulp')
var del = require('del')
var typings = require("gulp-typings")
var ts = require('gulp-typescript')
var sourcemaps = require('gulp-sourcemaps')
var systembuilder = require('systemjs-builder')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var autoprefixer = require('gulp-autoprefixer')
var clean = require('gulp-clean-css')
var browsersync = require('browser-sync').create()
var nodemon = require('gulp-nodemon')
var watch = require('gulp-watch')
var sequence = require('gulp-sequence')

//DEV
gulp.task('dev', function(cb) {
    sequence('clean', 'build', 'serve')(cb)
})

//PROD
gulp.task('prod', function(cb) {
    sequence('clean', 'build')(cb)
})

    //CLEAN
    gulp.task('clean', function(cb) {
        sequence(['clean:typings', 'clean:dist'])(cb)
    })

        gulp.task('clean:typings', function(cb) {
            sequence(['clean:typings-server', 'clean:typings-client'])(cb)
        })

            gulp.task('clean:typings-server', function () {
                return del('server/typings')
            })

            gulp.task('clean:typings-client', function () {
                return del('client/typings')
            })

        gulp.task('clean:dist', function () {
            return del('dist')
        })

    //BUILD
    gulp.task('build', function(cb) {
        sequence('build:typings', ['build:server', 'build:client', 'build:public'])(cb)
    })

        //TYPINGS
        gulp.task('build:typings', function(cb) {
            sequence(['build:typings-server', 'build:typings-client'])(cb)
        })

            gulp.task('build:typings-server', function () {
                return gulp.src('server/typings.json')
                    .pipe(typings())
            })

            gulp.task('build:typings-client', function () {
                return gulp.src('client/typings.json')
                    .pipe(typings())
            })

        //SERVER
        gulp.task('build:server', function (cb) {
            sequence(['build:server-www', 'build:server-ts'])(cb)
        })

            gulp.task('build:server-www', function () {
                return gulp.src('server/bin/www')
                    .pipe(gulp.dest('dist/bin'))
            })

            gulp.task('build:server-ts', function () {
                var tsProject = ts.createProject('server/tsconfig.json')
                var tsResult = gulp.src(['server/**/*.ts'])
                    .pipe(sourcemaps.init())
                    .pipe(ts(tsProject))
                return tsResult.js
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest('dist'))
            })

        //CLIENT
        gulp.task('build:client', function (cb) {
            sequence(['build:client-ts', 'build:client-html'])(cb)
        })

            gulp.task('build:client-ts', function (cb) {
                sequence('build:client-compile', 'build:client-bundle')(cb)
            })

                gulp.task('build:client-compile', function () {
                    var tsProject = ts.createProject('client/tsconfig.json')
                    var tsResult = gulp.src('client/**/*.ts')
                        .pipe(sourcemaps.init())
                        .pipe(ts(tsProject))
                    return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest('dist/client'))
                })

                gulp.task('build:client-bundle', function() {
                    var builder = new systembuilder('', 'client/systemjs.config.js')
                    return builder.buildStatic('dist/client/app/main.js', 'dist/public/assets/js/bundle.min.js', { minify: true, mangle: true, rollup: true })
                        .then(function() {
                            del('dist/client')
                            gulp.src('dist/public/assets/css/bundle.min.js')
                                .pipe(browsersync.stream())
                        })
                })

            gulp.task('build:client-html', function() {
                return gulp.src('client/**/*.html')
                    .pipe(gulp.dest('dist/public'))
                    .pipe(browsersync.stream())
            })

        //PUBLIC
        gulp.task('build:public', function(cb) {
            sequence(['build:public-move', 'build:public-vendor', 'build:public-styles'])(cb)
        })

            gulp.task('build:public-move', function() {
                return gulp.src(['public/**/*', '!public/assets/css/**/*'])
                    .pipe(gulp.dest('dist/public'))
                    .pipe(browsersync.stream())
            })

            gulp.task('build:public-vendor', function() {
                var vendors = [
                    'node_modules/core-js/client/shim.min.js',
                    'node_modules/core-js/client/shim.min.js.map',
                    'node_modules/zone.js/dist/zone.js',
                    'node_modules/reflect-metadata/Reflect.js',
                    'node_modules/reflect-metadata/Reflect.js.map'
                ]
                return gulp.src(vendors)
                    .pipe(gulp.dest('dist/public/assets/js/vendor'))
            })

            gulp.task('build:public-styles', function() {
                return gulp.src('public/assets/css/styles.scss')
                    .pipe(concat('styles.min.css'))
                    .pipe(sass().on('error', sass.logError))
                    .pipe(autoprefixer())
                    .pipe(clean())
                    .pipe(gulp.dest('dist/public/assets/css'))
                    .pipe(browsersync.stream())
            })

    // SERVE
    gulp.task('serve', function(cb) {
        sequence(['serve:browsersync', 'serve:nodemon', 'serve:watch'])(cb)
    })

        gulp.task('serve:browsersync', function() {
            return browsersync.init({
                proxy: "localhost:3000",
                port: "5000"
            })
        })

        gulp.task('serve:nodemon', function() {
            return nodemon({
                script: 'dist/bin/www',
                ext: 'ts',
                watch: ['server'],
                env: { 'NODE_ENV': 'development' },
                tasks: ['build:server']
            }).on('restart', function() {
                setTimeout(function() {
                    browsersync.reload()
                }, 1000)
            })
        })

        gulp.task('serve:watch', function() {
            watch('client/**/*.ts', function() {
                gulp.start('build:client-ts')
            })
            watch('client/**/*.html', function() {
                gulp.start('build:client-html')
            })
            watch('public/assets/css/**/*.scss', function() {
                gulp.start('build:public-styles')
            })
            watch(['client/assets/**/*', '!client/assets/css'], function() {
                gulp.start('build:public-move')
            })
        })