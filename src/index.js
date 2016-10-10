import "font-awesome/./css/font-awesome.min.css!";
import $ from "jquery";
import * as froala from "froala-editor/./js/froala_editor.min";
import "froala-editor/css/froala_editor.min.css!";
import "froala-editor/css/froala_style.min.css!";
import {Loader} from 'aurelia-loader'
import {Container} from 'aurelia-dependency-injection';

export class AureliaFroalaConfig {
	constructor(loader) {
		this.loader = loader;
	}

	setLicense(license) {
	  $.FroalaEditor.DEFAULTS.key  = license;
	};

	_loadResource(name, action) {
		var moduleName = typeof __moduleName != 'undefined' ? __moduleName : module.id; 
		return this.loader
				.loadModule(this.loader.normalizeSync(name, moduleName))
				.then(e => {
					if (action) {
						console.log("Finish loading plugin " + name)
						action(e);
					}
				});
	}

	addPlugin(name) { 
		return Promise.all([
			this._loadResource(`froala-editor/js/plugins/${name}.min`, e => {e()}),
			this._loadResource(`froala-editor/css/plugins/${name}.min.css!`).catch(e => {})]);
		
	}
	
	global(callback) {
			callback($.FroalaEditor);
		};
	
	addDefaultOptions(options) {
		$.FroalaEditor.DEFAULTS = $.extend($.FroalaEditor.DEFAULTS, options);
	};

	addLanguage(language, additionalTranslations) {
			return this._loadResource(`froala-editor/js/languages/${language}`, e => additionalTranslations && Object.assign($.FE.LANGUAGE[language].translation, additionalTranslations));
	}
}
export function configure(aurelia, config) {
	aurelia.globalResources('./aurelia-froala');
	let loader = Container.instance.get(Loader);
	let c = new AureliaFroalaConfig(loader);
	
	froala.default();
	config(c);
}