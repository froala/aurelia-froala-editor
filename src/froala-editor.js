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

	// Get parent context to use in eventhandlers
	bind(bindingContext, overrideContext) {
		this.parent = bindingContext;
	}

	// Starting point.
	tearUp () {
		// Get element.
		const editorSelector = this.config.iframe ? 'textarea' : 'div';

		// Check if editor isn't already initialized.
		if (this.instance != null) { return; }

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
		this.instance = new FroalaEditor(`#${this.element.id} ${editorSelector}`, Object.assign({}, this.config), () => {
			// Set initial HTML value.
			this.instance.html.set(this.value);

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
		if (this.instance != null) {
			this.instance.destroy();
			this.instance = null;
		}
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
