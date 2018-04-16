"use strict"

var fs = require('fs');

var config = require('./gulp.config');

var gulp = require('gulp');

var browserSync = require('browser-sync').create();

var runSequnece = require('run-sequence');

var clean = require('gulp-clean');

var sass = require('gulp-sass');

var rename = require('gulp-rename');

var concat = require('gulp-concat');

var image = require('gulp-image');

var postcss = require('gulp-postcss');

var sourceMaps = require('gulp-sourcemaps');

var autoprefixer = require('autoprefixer');

var cleanCss = require('gulp-clean-css');

var uglify = require('gulp-uglify-es').default;


// Gulp Tasks

gulp.task('html', function() {
    gulp.src(config.source.path + '*.html')
        .pipe(gulp.dest(config.dist.path));
})

gulp.task('image', function() {
    gulp.src(config.dist.path + config.dist.imagesPath + '**/*')
        .pipe(clean({ read: false, force: true }))
    gulp.src(config.source.imagesPath + '**/*')
        .pipe(gulp.dest(config.dist.path + config.dist.imagesPath));
})

gulp.task('sass', function() {
    return gulp.src(config.source.sassFile)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(cleanCss({ compatibility: 'ie10' }))
        .pipe(postcss([autoprefixer({ browsers: ['last 3 versions'] })]))
        .pipe(rename(config.dist.bundleCssName))
        .pipe(gulp.dest(config.dist.path + config.dist.cssPath))
        .pipe(browserSync.stream({ match: '**/*.css' }));
})

gulp.task('vendor-js', function() {
    return gulp.src(config.source.vendorScripts)
        .pipe(concat(config.dist.vendorJsName))
        .pipe(uglify())
        .pipe(gulp.dest(config.dist.path + config.dist.jsPath))
        .pipe(browserSync.stream({ match: '**/*.js' }));
})

gulp.task('bundle-js', function() {
    return gulp.src(config.source.bundleScripts)
        .pipe(concat(config.dist.bundleJsName))
        .pipe(gulp.dest(config.dist.path + config.dist.jsPath))
        .pipe(browserSync.stream({ match: '**/*.js' }));

})

gulp.task('serve', function() {
    browserSync.init(config.browserSyncOpts);
    gulp.watch([config.source.path + '*.html', config.source.vendorCssPath + '**/*.css', config.source.sassPath + '**/*.scss', config.source.jsPath + '**/*.js'], ['html', 'css', 'js']).on('change', function() {
        browserSync.reload({ stream: true });
    });
})

gulp.task('clean', function() {
    return gulp.src(config.dist.path)
        .pipe(clean({ read: false, force: true }));
})

gulp.task('css', ['sass']);

gulp.task('js', ['vendor-js', 'bundle-js']);

gulp.task('build', function(callback) {
    runSequnece('clean', ['image', 'js', 'css'], 'html', callback);
})