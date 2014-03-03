var gulp = require('gulp');
var concat = require('gulp-concat');
var declare = require('gulp-declare');
var handlebars = require('gulp-handlebars');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var prefix = require('gulp-autoprefixer');

var src = {
  jslint: ['gulpfile.js', 'private/js/**.js'],
  js: ['private/js/**.js'],
  css: 'public/css/**.css',
  sass: 'private/sass/**.sass',
  hbs: 'views/partials/cards/data/**/*.hbs'
};

var dest = {
  css: 'public/css/',
  hbs: 'public/js/',
  js: 'public/js/'
};

gulp.task('js', function () {
  // Lint
  gulp.src(src.jslint)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
  // Browserify
  gulp.src(src.js)
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(uglify())
    .pipe(gulp.dest(dest.js));
});

gulp.task('hbs', function () {
  return gulp.src(src.hbs)
    .pipe(handlebars({
      outputType: 'node'
    }))
    .pipe(declare({
      namespace: 'MyApp.templates'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(dest.hbs));
});

gulp.task('css', function () {
  return gulp.src(src.css)
    .pipe(prefix())
    .pipe(gulp.dest(dest.css));
});

gulp.task('watch', function () {
  gulp.watch(src.js, ['js']);
  gulp.watch(src.css, ['css']);
  gulp.watch(src.hbs, ['hbs']);
});

gulp.task('default', ['css', 'js', 'hbs', 'watch']);