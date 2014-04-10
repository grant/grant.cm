var gulp = require('gulp');
require('gulp-grunt')(gulp);
var concat = require('gulp-concat');
var declare = require('gulp-declare');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var prefix = require('gulp-autoprefixer');

var src = {
  js: ['gulpfile.js', 'gruntfile.js', 'private/js/**.js', '!private/js/templates.js'],
  jshome: 'private/js/home.js',
  css: 'public/css/**.css',
  sass: 'private/sass/**.sass',
  jade: 'views/partials/cards/**/*.jade'
};

var dest = {
  css: 'public/css/',
  jade: 'private/js/',
  js: 'public/js/'
};

gulp.task('js', function () {
  // Lint
  gulp.src(src.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
  // Browserify
  gulp.src(src.jshome)
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(uglify())
    .pipe(gulp.dest(dest.js));
});

gulp.task('jade', function () {
  // Nothing for now
});

gulp.task('css', function () {
  gulp.src(src.css)
    .pipe(prefix())
    .pipe(gulp.dest(dest.css));
});

gulp.task('watch', function () {
  gulp.watch(src.js, ['js']);
  gulp.watch(src.css, ['css']);
  gulp.watch(src.jade, ['jade']);
});

gulp.task('default', ['css', 'js', 'jade', 'watch']);