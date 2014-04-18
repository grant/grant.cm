# Note: Don't try to use gulp-sass. It doesn't work.

gulp = require 'gulp'
gutil = require 'gulp-util'
concat = require 'gulp-concat'
declare = require 'gulp-declare'
browserify = require 'gulp-browserify'
uglify = require 'gulp-uglify'
watch = require 'gulp-watch'
coffee = require 'gulp-coffee'
coffeelint = require 'gulp-coffeelint'
plumber = require 'gulp-plumber'
prefix = require 'gulp-autoprefixer'

src =
  coffee: ['gulpfile.coffee', 'client/coffee/**/*.coffee', 'server/**/*.coffee']
  coffee_index: 'client/coffee/index.coffee'
  css: 'client_build/css/**/*.css'
  jade: 'views/partials/cards/**/*.jade'

dest =
  css: 'client_build/css/'
  jade: 'client/coffee/'
  coffee: 'client_build/js/'

gulp.task 'coffee', ->
  # Lint
  console.log '\nLinting coffeescript...\n'
  gulp.src src.coffee
    .pipe coffeelint()
    .pipe coffeelint.reporter()

  # Browserify
  gulp.src src.coffee_index
    .pipe plumber()
    .pipe coffee().on 'error', gutil.log
    .pipe browserify
      transform: ['coffeeify']
      extensions: ['.coffee']
      insertGlobals: true
    .pipe uglify()
    .pipe gulp.dest dest.coffee

gulp.task 'jade', ->
  # Nothing for now

gulp.task 'css', ->
  gulp.src src.css
    .pipe prefix()
    .pipe gulp.dest dest.css

gulp.task 'watch', ->
  gulp.watch src.coffee, ['coffee']
  gulp.watch src.css, ['css']
  gulp.watch src.jade, ['jade']

gulp.task 'default', ['css', 'coffee', 'jade', 'watch']