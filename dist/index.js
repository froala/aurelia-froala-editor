"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AureliaFroalaConfig = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.configure = configure;

require("font-awesome/./css/font-awesome.min.css!");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _froala_editor = require("froala-editor/./js/froala_editor.min");

var froala = _interopRequireWildcard(_froala_editor);

require("froala-editor/css/froala_editor.min.css!");

require("froala-editor/css/froala_style.min.css!");

var _aureliaLoader = require("aurelia-loader");

var _aureliaDependencyInjection = require("aurelia-dependency-injection");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AureliaFroalaConfig = exports.AureliaFroalaConfig = function () {
	function AureliaFroalaConfig(loader) {
		_classCallCheck(this, AureliaFroalaConfig);

		this.loader = loader;
	}

	_createClass(AureliaFroalaConfig, [{
		key: "setLicense",
		value: function setLicense(license) {
			_jquery2.default.FroalaEditor.DEFAULTS.key = license;
		}
	}, {
		key: "_loadResource",
		value: function _loadResource(name, action) {
			var moduleName = typeof __moduleName != 'undefined' ? __moduleName : module.id;
			return this.loader.loadModule(this.loader.normalizeSync(name, moduleName)).then(function (e) {
				if (action) {
					console.log("Finish loading plugin " + name);
					action(e);
				}
			});
		}
	}, {
		key: "addPlugin",
		value: function addPlugin(name) {
			return Promise.all([this._loadResource("froala-editor/js/plugins/" + name + ".min", function (e) {
				e();
			}), this._loadResource("froala-editor/css/plugins/" + name + ".min.css!").catch(function (e) {})]);
		}
	}, {
		key: "global",
		value: function global(callback) {
			callback(_jquery2.default.FroalaEditor);
		}
	}, {
		key: "addDefaultOptions",
		value: function addDefaultOptions(options) {
			_jquery2.default.FroalaEditor.DEFAULTS = _jquery2.default.extend(_jquery2.default.FroalaEditor.DEFAULTS, options);
		}
	}, {
		key: "addLanguage",
		value: function addLanguage(language, additionalTranslations) {
			return this._loadResource("froala-editor/js/languages/" + language, function (e) {
				return additionalTranslations && Object.assign(_jquery2.default.FE.LANGUAGE[language].translation, additionalTranslations);
			});
		}
	}]);

	return AureliaFroalaConfig;
}();

function configure(aurelia, config) {
	aurelia.globalResources('./aurelia-froala');
	var loader = _aureliaDependencyInjection.Container.instance.get(_aureliaLoader.Loader);
	var c = new AureliaFroalaConfig(loader);

	froala.default();
	config(c);
}