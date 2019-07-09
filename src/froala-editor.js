import {inject, customElement, bindable} from 'aurelia-framework';
import {ObserverLocator} from "aurelia-binding";

import {Config} from './froala-editor-config';

// Import Froala Editor
import FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min.js'

@customElement('froala-editor')
@inject(Element, Config, ObserverLocator)
export class FroalaEditor1 {
	@bindable value;
	@bindable config = {};
	@bindable eventHandlers = {};
  @bindable instance;

	parent;
	element;

	constructor (element, config, observerLocator) {
		// Store element.
		this.element = element;

		// Read config.
		this.config = config.options();

		this.observerLocator = observerLocator;
	}

  bind(bindingContext, overrideContext) {
		this.parent = bindingContext;
	}

	// Starting point.
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

		// Initialize editor.
		this.instance = new FroalaEditor(`#${this.element.id} div`, Object.assign({}, this.config), () => {
			// Set Events
			if (this.eventHandlers && this.eventHandlers.length != 0) {
				for(let eventHandlerName in this.eventHandlers) {
					let handler = this.eventHandlers[eventHandlerName];
					this.instance.events.on(`${eventHandlerName}`, (...args) => {
						return handler.apply(this.parent, args);
					});
				}
			}
			this.instance.events.on('blur', (e) => this.value = this.instance.html.get());
			this.instance.events.on('contentChanged', (e) => this.value = this.instance.html.get());
		});
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
