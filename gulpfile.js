var gulp = require('gulp');
var watch = require('gulp-watch');
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var prefix = require('gulp-autoprefixer');

var src = {
  js: ['public/js/**.js', 'gulpfile.js', '!public/js/jquery.min.js', '!public/js/jquery.timeago.js'],
  css: 'public/css/**.css',
  sass: 'private/sass/**.sass'
};

var dest = {
  css: 'public/css/'
};

gulp.task('js', function () {
  return gulp.src(src.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('css', function () {
  return gulp.src(src.css)
    .pipe(prefix())
    .pipe(gulp.dest(dest.css));
});

gulp.task('watch', function () {
  gulp.watch(src.js, ['js']);
  gulp.watch(src.css, ['css']);
});

gulp.task('default', ['css', 'js', 'watch']);