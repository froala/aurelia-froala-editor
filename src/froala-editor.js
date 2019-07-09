import {inject, customElement, bindable} from 'aurelia-framework';
import {ObserverLocator} from "aurelia-binding";

import {Config} from './froala-editor-config';

// Import Froala Editor
import FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min.js'

@customElement('froala-editor')
@inject(Element, Config, ObserverLocator)
export class FroalaEditor1 {
	@bindable value;
	@bindable config = {}
	@bindable eventHandlers = {}

	element;
	instance;

	constructor (element, config, observerLocator) {
		// Store element.
		this.element = element;

		// Read config.
		this.config = config.options();

		this.observerLocator = observerLocator;
	}

	// Starting poing.
	tearUp () {
		// Get element.
		if (this.config.iframe) {
			this.instance = this.element.getElementsByTagName('textarea')[0];
		}
		else {
			this.instance = this.element.getElementsByTagName('div')[0];
		}

		// Check if editor isn't already initialized.
		if (this.instance['data-froala.editor']) {
		  return;
		}

		// Set the HTML for the inner element.
		this.instance.innerHTML = this.value;

		// Observe value.
		this.subscriptions = [
			this.observerLocator
					.getObserver(this, 'value')
					.subscribe((newValue, oldValue) => {
						if (this.instance && this.instance.html.get() != newValue) {
							this.instance.html.set(newValue);
						}
					})
			];

		// Set events.
		if (this.eventHandlers && this.eventHandlers.length != 0) {
			for(let eventHandlerName in this.eventHandlers) {
				let handler = this.eventHandlers[eventHandlerName];
				this.instance.addEventListener(`${eventHandlerName}`, function() {
					let p = arguments;
					return handler.apply(this, p)
				});
			}
		}
		this.instance.addEventListener('contentChanged', (e, editor) => this.value = editor.html.get());
		this.instance.addEventListener('blur', (e, editor) => this.value = editor.html.get())

		// Initialize editor.
		this.instance = new FroalaEditor(`#${this.element.id}`, Object.assign({}, this.config));
	}

	// Destroy.
	tearDown () {
		if (this.instance && this.instance['data-froala.editor']) {
			this.instance.destroy();
		}

		this.instance = null;
	}

	// Setup.
	attached () {
		this.tearUp();
	}

	// Destroy.
	detached () {
		this.tearDown();
	}
}
