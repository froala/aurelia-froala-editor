
import "font-awesome/./css/font-awesome.min.css!";
import $ from "jquery";
import * as froala from "froala-editor/./js/froala_editor.min";
import "froala-editor/css/froala_editor.min.css!";
import "froala-editor/css/froala_style.min.css!";

export function configure(aurelia, config) {
	aurelia.globalResources('./aurelia-froala');
	let c = {
		addPlugin: name => Promise.all(
			[System.import(`froala-editor/js/plugins/${name}.min`, __moduleName).then(m=> m()), 
			System.import(`froala-editor/css/plugins/${name}.css!`, __moduleName).catch(e => {})]),
		global: callback => {
			callback($.FroalaEditor);
		},
		addDefaltOptions: options => {
			 $.FroalaEditor.DEFAULTS = $.extend($.FroalaEditor.DEFAULTS, options);
		},
		addLanguage: (language, additionalTranslations) => {
			return System
				.import(`froala-editor/js/languages/${language}`, __moduleName)
				.then(() => additionalTranslations && Object.assign($.FE.LANGUAGE[language].translation, additionalTranslations))
		}
	};
	froala.default();
	config(c);
}