import {inject, customElement, bindable} from 'aurelia-framework';
import {ObserverLocator} from "aurelia-binding";
import {Config} from './froala-editor-config';

// Import Froala Editor
import FroalaEditor from 'froala-editor'
import "froala-editor/js/plugins.pkgd.min'

@customElement('froala-editor')
@inject(Element, Config, ObserverLocator)
export class FroalaEditor1 {
	@bindable value;
	@bindable config = {};
	@bindable eventHandlers = {};
	@bindable editor;

	parent;
	element;

	constructor (element, config, observerLocator) {
		this.element = element;
		this.config = config.options();
		this.observerLocator = observerLocator;
	}

	// Get parent context to use in eventhandlers
	bind(bindingContext, overrideContext) {
		this.parent = bindingContext;
	}

	// Setup
	attached() {
		// Get element.
		const editorSelector = this.config.iframe ? 'textarea' : 'div';
		let editor = this
		
		// Check if editor isn't already initialized.
		if (this.editor != null) { return; }

		// Observe value.
		this.subscriptions = [
			this.observerLocator
					.getObserver(this, 'value')
					.subscribe((newValue, oldValue) => {
						if (this.editor && this.editor.html.get() != newValue) {
							this.editor.html.set(newValue);
						}
					})
			];
		
		// Will be registered when editor is initialized.
		this.config.events = {
			contentChanged: function contentChanged(e) {
			        return editor.value = this.html.get();
			},
			blur: function blur(e) {
			        return editor.value = this.html.get();
			}
		};

		// Initialize editor.
		this.editor = new FroalaEditor(this.element, Object.assign({}, this.config), () => {
			// Set initial HTML value.
			this.editor.html.set(this.value);

			// Set Events
			if (this.eventHandlers && this.eventHandlers.length != 0) {
				for(let eventHandlerName in this.eventHandlers) {
					let handler = this.eventHandlers[eventHandlerName];
					if (eventHandlerName === 'initialized') {
						handler.apply(this.parent);
					} else {
						this.editor.events.on(`${eventHandlerName}`, (...args) => {
							return handler.apply(this.parent, args);
						});
					}
				}
			}
		});
	}

	// Destroy
	detached () {
		if (this.editor != null) {
			this.editor.destroy();
			this.editor = null;
		}
	}
}
