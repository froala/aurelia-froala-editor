var appRoot = 'src/';
var outputRoot = 'dist/';
<<<<<<< HEAD
var exporSrvtRoot = 'export/';
var jspmPackages = 'jspm_packages/';
var typings = 'typings/';

module.exports = {
	root: appRoot,
	source: appRoot + '**/*.js',
	sourceMaps: "../maps",
	html: appRoot + '**/*.html',
	css: appRoot + '**/*.css',
	sass: 'styles/**/*.scss',
	cssOutput: outputRoot,
	style: 'styles/**/*.css',
	output: outputRoot,
	exportSrv: exporSrvtRoot,
	doc: './doc',
	e2eSpecsSrc: 'test/e2e/src/*.js',
	e2eSpecsDist: 'test/e2e/dist/',
=======

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  style: 'styles/**/*.css',
  output: outputRoot,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
>>>>>>> webpack_compatible
};
