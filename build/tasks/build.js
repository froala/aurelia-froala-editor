'use strict'

var gulp = require('gulp');
var bump = require('gulp-bump')
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var runSequence = require('run-sequence');
var paths = require("../paths")

var compilerOptions = {
  moduleIds: false,
  comments: false,
  compact: false,
  presets: ["es2015", "stage-0"],
  plugins: ["transform-es2015-modules-systemjs", "transform-decorators-legacy", "transform-decorators", ]
};

gulp.task('build-html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-js', function() {
  return gulp.src(paths.source)
	.pipe(changed(paths.output), {extension: '.js'})
//	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(babel(compilerOptions))
//	.pipe(sourcemaps.write({includeContent: true}))
	.pipe(gulp.dest(paths.output));
});

gulp.task('bump-version', function() {
  return gulp.src('./package.json')
  .pipe(bump({type: 'patch'}))
  .pipe(gulp.dest('./'));

})
 gulp.task('build', function(callback) {
  return runSequence(
	['build-html', 'build-js'],
	callback
  )});
