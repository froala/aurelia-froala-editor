'use strict';

System.register(['./froala-editor-config'], function (_export, _context) {
  "use strict";

  var Config;
  function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(Config);

    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(instance);
    }

    aurelia.globalResources('./froala-editor');
  }

  _export('configure', configure);

  return {
    setters: [function (_froalaEditorConfig) {
      Config = _froalaEditorConfig.Config;
    }],
    execute: function () {}
  };
});