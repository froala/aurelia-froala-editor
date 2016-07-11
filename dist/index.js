"use strict";

System.register(["font-awesome/./css/font-awesome.min.css!", "jquery", "froala-editor/./js/froala_editor.min", "froala-editor/css/froala_editor.min.css!", "froala-editor/css/froala_style.min.css!"], function (_export, _context) {
	"use strict";

	var $, froala;
	return {
		setters: [function (_fontAwesomeCssFontAwesomeMinCss) {}, function (_jquery) {
			$ = _jquery.default;
		}, function (_froalaEditorJsFroala_editorMin) {
			froala = _froalaEditorJsFroala_editorMin;
		}, function (_froalaEditorCssFroala_editorMinCss) {}, function (_froalaEditorCssFroala_styleMinCss) {}],
		execute: function () {
			function configure(aurelia, config) {
				aurelia.globalResources('./aurelia-froala');
				var c = {
					setLicense: function setLicense(license) {
						$.FroalaEditor.DEFAULTS.key = license;
					},
					addPlugin: function addPlugin(name) {
						return Promise.all([System.import("froala-editor/js/plugins/" + name + ".min", _context.id).then(function (m) {
							return m();
						}), System.import("froala-editor/css/plugins/" + name + ".css!", _context.id).catch(function (e) {})]);
					},
					global: function global(callback) {
						callback($.FroalaEditor);
					},
					addDefaltOptions: function addDefaltOptions(options) {
						$.FroalaEditor.DEFAULTS = $.extend($.FroalaEditor.DEFAULTS, options);
					},
					addLanguage: function addLanguage(language, additionalTranslations) {
						return System.import("froala-editor/js/languages/" + language, _context.id).then(function () {
							return additionalTranslations && Object.assign($.FE.LANGUAGE[language].translation, additionalTranslations);
						});
					}
				};
				froala.default();
				config(c);
			}

			_export("configure", configure);
		}
	};
});