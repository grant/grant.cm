browserify = require 'gulp-browserify'
coffee = require 'gulp-coffee'
coffeelint = require 'gulp-coffeelint'
gulp = require 'gulp'
gutil = require 'gulp-util'
imagemin = require 'gulp-imagemin'
minify = require 'gulp-minify-css'
plumber = require 'gulp-plumber'
pngquant = require 'imagemin-pngquant'
prefix = require 'gulp-autoprefixer'
stylus = require 'gulp-stylus'
uglify = require 'gulp-uglify'
watch = require 'gulp-watch'


src =
  coffee: ['gulpfile.coffee', 'client/coffee/**/*.coffee', 'server/**/*.coffee']
  coffee_index: 'client/coffee/index.coffee'
  image: 'client/images/**/*'
  stylus: 'client/stylus/**/*.styl'
  stylus_index: 'client/stylus/pages/*.styl'

dest =
  coffee: 'client_build/js/'
  image: 'client_build/images/'
  stylus: 'client_build/css/pages/'

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

gulp.task 'image', ->
  gulp.src src.image
    .pipe imagemin
      progressive: true
      svgoPlugins: [removeViewBox: false]
      use: [pngquant()]
    .pipe gulp.dest dest.image

gulp.task 'watch', ->
  gulp.watch src.coffee, ['coffee']
  gulp.watch src.image, ['image']
  gulp.watch src.stylus, ['stylus']

gulp.task 'default', ['coffee', 'image', 'stylus', 'watch']
