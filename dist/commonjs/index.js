'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _froalaEditorConfig = require('./froala-editor-config');

function configure(aurelia, configCallback) {
  var instance = aurelia.container.get(_froalaEditorConfig.Config);

  if (configCallback !== undefined && typeof configCallback === 'function') {
    configCallback(instance);
  }

  aurelia.globalResources('./froala-editor');
}