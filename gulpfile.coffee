browserify = require 'gulp-browserify'
coffee = require 'gulp-coffee'
coffeelint = require 'gulp-coffeelint'
gulp = require 'gulp'
gutil = require 'gulp-util'
plumber = require 'gulp-plumber'
prefix = require 'gulp-autoprefixer'
stylus = require 'gulp-stylus'
uglify = require 'gulp-uglify'
watch = require 'gulp-watch'
minify = require 'gulp-minify-css'


src =
  coffee: ['gulpfile.coffee', 'client/coffee/**/*.coffee', 'server/**/*.coffee']
  coffee_index: 'client/coffee/index.coffee'
  stylus: 'client/stylus/**/*.styl'
  stylus_index: 'client/stylus/pages/*.styl'

dest =
  stylus: 'client_build/css/pages/'
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

gulp.task 'stylus', ->
  gulp.src src.stylus_index
    .pipe stylus()
    .pipe prefix()
    .pipe minify()
    .pipe gulp.dest dest.stylus

gulp.task 'watch', ->
  gulp.watch src.coffee, ['coffee']
  gulp.watch src.stylus, ['stylus']

gulp.task 'default', ['stylus', 'coffee', 'watch']
