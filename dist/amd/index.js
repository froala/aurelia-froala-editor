define(['exports', './froala-editor-config'], function (exports, _froalaEditorConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(_froalaEditorConfig.Config);

    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(instance);
    }

    aurelia.globalResources('./froala-editor');
  }
});