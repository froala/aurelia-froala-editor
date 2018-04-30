import {inject, customElement, bindable} from 'aurelia-framework';
import {ObserverLocator} from "aurelia-binding";

import {Config} from './froala-editor-config';

@customElement('froala-editor')
@inject(Element, Config, ObserverLocator)
export class FroalaEditor {
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

    // Observe value.
		this.subscriptions = [
			observerLocator
					.getObserver(this, 'value')
					.subscribe((newValue, oldValue) => {
						if (this.instance && this.instance.froalaEditor('html.get') != newValue) {
							this.instance.froalaEditor('html.set', newValue);
						}
					})
				];
	}

  // Starting poing.
	tearUp () {
    // Get element.
        if (this.config.iframe) {
            this.instance = $(this.element.getElementsByTagName('textarea')[0]);
        }
        else {
            this.instance = $(this.element.getElementsByTagName('div')[0]);
        }

    // Check if editor isn't already initialized.
		if (this.instance.data('froala.editor')) {
		  return;
		}

    // Set the HTML for the inner element.
    this.instance.html(this.value);

    // Set events.
		if (this.eventHandlers && this.eventHandlers.length != 0) {
			for(let eventHandlerName in this.eventHandlers) {
				let handler = this.eventHandlers[eventHandlerName];
				this.instance.on(`froalaEditor.${eventHandlerName}`, function() {
					let p = arguments;
					return handler.apply(this, p)
				});

			}
		}
		this.instance.on('froalaEditor.contentChanged froalaEditor.blur', (e, editor) => this.value = editor.html.get());

    // Initialize editor.
		this.instance.froalaEditor(Object.assign({}, this.config));
	}

  // Destroy.
	tearDown () {
		if (this.instance && this.instance.data('froala.editor')) {
    	this.instance.froalaEditor('destroy');
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