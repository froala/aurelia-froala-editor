"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.configure = configure;

require("font-awesome/./css/font-awesome.min.css!");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _froala_editor = require("froala-editor/./js/froala_editor.min");

var froala = _interopRequireWildcard(_froala_editor);

require("froala-editor/css/froala_editor.min.css!");

require("froala-editor/css/froala_style.min.css!");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configure(aurelia, config) {
	aurelia.globalResources('./aurelia-froala');
	var c = {
		setLicense: function setLicense(license) {
			_jquery2.default.FroalaEditor.DEFAULTS.key = license;
		},
		addPlugin: function addPlugin(name) {
			return Promise.all([System.import("froala-editor/js/plugins/" + name + ".min", __moduleName).then(function (m) {
				return m();
			}), System.import("froala-editor/css/plugins/" + name + ".css!", __moduleName).catch(function (e) {})]);
		},
		global: function global(callback) {
			callback(_jquery2.default.FroalaEditor);
		},
		addDefaltOptions: function addDefaltOptions(options) {
			_jquery2.default.FroalaEditor.DEFAULTS = _jquery2.default.extend(_jquery2.default.FroalaEditor.DEFAULTS, options);
		},
		addLanguage: function addLanguage(language, additionalTranslations) {
			return System.import("froala-editor/js/languages/" + language, __moduleName).then(function () {
				return additionalTranslations && Object.assign(_jquery2.default.FE.LANGUAGE[language].translation, additionalTranslations);
			});
		}
	};
	froala.default();
	config(c);
}