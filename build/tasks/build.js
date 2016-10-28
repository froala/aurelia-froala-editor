<<<<<<< HEAD
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
  plugins: ["transform-es2015-modules-commonjs", "transform-decorators-legacy", "transform-decorators", ]
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
=======
let gulp = require('gulp');
let runSequence = require('run-sequence');
let to5 = require('gulp-babel');
let paths = require('../paths');
let compilerOptions = require('../babel-options');
let assign = Object.assign || require('object.assign');
let replace = require('gulp-replace');

gulp.task('build-html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'es2015'))
    .pipe(gulp.dest(paths.output + 'commonjs'))
    .pipe(gulp.dest(paths.output + 'amd'))
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build-css', function() {
  return gulp.src(paths.css)
    .pipe(gulp.dest(paths.output + 'es2015'))
    .pipe(gulp.dest(paths.output + 'commonjs'))
    .pipe(gulp.dest(paths.output + 'amd'))
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build-es2015', function() {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions.es2015())))
    .pipe(gulp.dest(paths.output + 'es2015'));
});

gulp.task('build-commonjs', function() {
  return gulp.src(paths.source)
    .pipe(replace(/\.css\!/g, '.css'))
    .pipe(to5(assign({}, compilerOptions.commonjs())))
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-amd', function() {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions.amd())))
    .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-system', function() {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions.system())))
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-html', 'build-css', 'build-es2015', 'build-commonjs', 'build-amd', 'build-system'],
    callback
  );
});
>>>>>>> webpack_compatible
