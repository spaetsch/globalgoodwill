'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

//Front End requires
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');


gulp.task('default', ['test', 'lint', 'watch'], function() {});

gulp.task('test', function(){
	return gulp.src('test/*test.js')
						 .pipe(mocha());
});

gulp.task('lint', function(){
	return gulp.src('*.js')
				     .pipe(jshint())
				     .pipe(jshint.reporter('default'));
});

//watch breaks server requests
gulp.task('watch', function() {
  gulp.watch('*.js', ['test', 'lint']);
});



// Front End gulp task commands

gulp.task('sass', function () {
  gulp.src('./dev/Sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dev/CSS/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./dev/Sass/**/*.scss', ['sass']);
});

gulp.task('webpackdev', function() {
  return gulp.src('./dev/js/**.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});

gulp.task('minify-css', function() {
  return gulp.src('./dev/CSS/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build/CSS/'));
});

gulp.task('compress', function() {
  return gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('copy', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
    return gulp.src('dev/**/*.html')
    .pipe(gulp.dest('build/'))
    //.pipe(minifyHTML(opts))
    .pipe(gulp.dest('./build/'));
});

gulp.task('build', ['copy', 'webpackdev', 'minify-css']);
