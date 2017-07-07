'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var Config;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('Config', Config = function () {
        function Config() {
          _classCallCheck(this, Config);

          this._config = {};
        }

        Config.prototype.get = function get(key) {
          return this._config[key];
        };

        Config.prototype.options = function options(obj) {
          if (typeof obj != 'undefined') {
            Object.assign(this._config, obj);
          } else {
            return this._config;
          }
        };

        Config.prototype.set = function set(key, value) {
          this._config[key] = value;
          return this._config[key];
        };

        return Config;
      }());

      _export('Config', Config);
    }
  };
});