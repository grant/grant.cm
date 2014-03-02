var gulp = require('gulp');
var watch = require('gulp-watch');
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var prefix = require('gulp-autoprefixer');

var paths = {
  js: ['public/js/**.js', 'gulpfile.js', '!public/js/jquery.min.js', '!public/js/jquery.timeago.js'],
  css: 'public/css/',
};

gulp.task('js', function () {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('css', function () {
  return gulp.src('public/css/**.css')
    .pipe(prefix())
    .pipe(gulp.dest(paths.css));
});

gulp.task('watch', function () {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
});

gulp.task('default', ['css', 'js', 'watch']);