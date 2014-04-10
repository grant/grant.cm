gulp = require 'gulp'
concat = require 'gulp-concat'
declare = require 'gulp-declare'
browserify = require 'gulp-browserify'
uglify = require 'gulp-uglify'
watch = require 'gulp-watch'
coffeelint = require 'gulp-coffeelint'
prefix = require 'gulp-autoprefixer'

src =
  coffee: ['gulpfile.coffee', 'private/coffee/**.coffee']
  coffee_index: 'private/coffee/index.coffee'
  css: 'public/css/**.css'
  sass: 'private/sass/**.sass'
  jade: 'views/partials/cards/**/*.jade'

dest =
  css: 'public/css/'
  jade: 'private/coffee/'
  coffee: 'public/coffee/'

gulp.task 'coffee', ->
  # Lint
  console.log '\nLinting coffeescript...\n'
  gulp.src(src.coffee)
    .pipe coffeelint()
    .pipe coffeelint.reporter()

  # Browserify
  gulp.src(src.coffee_index)
    .pipe browserify(insertGlobals: true)
    .pipe uglify()
    .pipe gulp.dest dest.coffee

gulp.task 'jade', ->
  # Nothing for now

gulp.task 'css', ->
  gulp.src(src.css)
    .pipe prefix()
    .pipe gulp.dest dest.css

gulp.task 'watch', ->
  gulp.watch src.coffee, ['coffee']
  gulp.watch src.css, ['css']
  gulp.watch src.jade, ['jade']

gulp.task 'default', ['css', 'coffee', 'jade', 'watch']