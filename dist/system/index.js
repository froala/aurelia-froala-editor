'use strict';

System.register([], function (_export, _context) {
  "use strict";

  function configure(aurelia, config) {
    aurelia.globalResources('./froala-editor');
  }

  _export('configure', configure);

  return {
    setters: [],
    execute: function () {}
  };
});