{"changed":true,"filter":false,"title":"gulpfile.coffee","tooltip":"/gulpfile.coffee","value":"browserify = require 'gulp-browserify'\ncoffee = require 'gulp-coffee'\ncoffeelint = require 'gulp-coffeelint'\nconcat = require 'gulp-concat'\ndeclare = require 'gulp-declare'\ngulp = require 'gulp'\ngutil = require 'gulp-util'\nplumber = require 'gulp-plumber'\nprefix = require 'gulp-autoprefixer'\nstylus = require 'gulp-stylus'\nuglify = require 'gulp-uglify'\nwatch = require 'gulp-watch'\nminify = require 'gulp-minify-css'\n\n\nsrc =\n  coffee: ['gulpfile.coffee', 'client/coffee/**/*.coffee', 'server/**/*.coffee']\n  coffee_index: 'client/coffee/index.coffee'\n  stylus: 'client/stylus/pages/*.styl'\n  css: 'client_build/css/**/*.css'\n\ndest =\n  css: 'client_build/css/'\n  coffee: 'client_build/js/'\n  stylus: 'client_build/css/pages'\n\ngulp.task 'coffee', ->\n  # Lint\n  console.log '\\nLinting coffeescript...\\n'\n  gulp.src src.coffee\n    .pipe coffeelint()\n    .pipe coffeelint.reporter()\n\n  # Browserify\n  gulp.src src.coffee_index\n    .pipe plumber()\n    .pipe coffee().on 'error', gutil.log\n    .pipe browserify\n      transform: ['coffeeify']\n      extensions: ['.coffee']\n      insertGlobals: true\n    .pipe uglify()\n    .pipe gulp.dest dest.coffee\n\ngulp.task 'stylus', ->\n  gulp.src src.stylus\n    .pipe stylus()\n    .pipe gulp.dest dest.stylus\n\ngulp.task 'css', ->\n  gulp.src src.css\n    .pipe prefix()\n    .pipe minify()\n    .pipe gulp.dest dest.css\n\ngulp.task 'watch', ->\n  gulp.watch src.coffee, ['coffee']\n  gulp.watch src.css, ['css']\n  gulp.watch src.stylus, ['stylus']\n\ngulp.task 'default', ['stylus', 'css', 'coffee', 'watch']","undoManager":{"mark":0,"position":6,"stack":[[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":0,"column":0},"end":{"row":2,"column":0}},"nl":"\n","lines":["# Note: Don't try to use gulp-sass. It doesn't work.",""]}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":12,"column":0},"end":{"row":12,"column":2}},"text":"  "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":12,"column":0},"end":{"row":12,"column":2}},"text":"  "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":12,"column":0},"end":{"row":12,"column":2}},"text":"  "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":12,"column":0},"end":{"row":12,"column":2}},"text":"  "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":12,"column":0},"end":{"row":12,"column":2}},"text":"  "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":12,"column":0},"end":{"row":12,"column":2}},"text":"  "}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":28,"column":43},"end":{"row":28,"column":43},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1415185009970}