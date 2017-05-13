var gulp       = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename     = require('gulp-rename');
var connect    = require('gulp-connect');

var Tasks = Object.freeze({
  DEFAULT: 'default',
  WATCH:   'watch',
  CONNECT: 'connect',
  BUILD: 'build'
});

var Paths = Object.freeze({
  PARTIALS: './partials',
  WATCH: './partials/*.hbs',
  MAIN_FILE: 'index.hbs',
  DIST_FILE: 'index.html',
  DIST_DIR: '.',
  CONNECT_ROOT: '.'
});

gulp.task(Tasks.BUILD, function () {
    var webslidesData = {
      title: 'Midi & Redux'
    },
    options = {
        batch : [ Paths.PARTIALS ],
        helpers : {
            capitals : function(str){
                return str.toUpperCase();
            }
        }
    };

    return gulp.src(Paths.MAIN_FILE)
        .pipe(handlebars(webslidesData, options))
        .pipe(rename(Paths.DIST_FILE))
        .pipe(gulp.dest(Paths.DIST_DIR));
});

gulp.task(Tasks.CONNECT, function() {
  connect.server({
    root: Paths.CONNECT_ROOT,
    port: 8881
  });
});

gulp.task(Tasks.WATCH, [Tasks.BUILD], function () {
  gulp.watch([Paths.WATCH, Paths.MAIN_FILE], [Tasks.BUILD]);
});

gulp.task(Tasks.DEFAULT, [Tasks.CONNECT, Tasks.WATCH]);
