var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var shell = require('gulp-shell')


gulp.task('build', function ()
{
  gutil.log('running build task!');
  return browserify('./examples/didatabot.js')
  .transform(babelify.configure(
      {
        presets: ["es2015"]
      })).bundle()
.pipe(source('didata.js'))
.pipe(gulp.dest('./build/'));
});

