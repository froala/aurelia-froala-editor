'use strict'
import {customElement, bindable, inject} from 'aurelia-framework';
import {ObserverLocator} from "aurelia-binding";
import {I18N} from "aurelia-i18n";
import $ from "jquery";
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('aurelia-froala')
@inject(Element, ObserverLocator, I18N, EventAggregator)
export class AureliaFroala { 
	@bindable value;
	@bindable config = {}
	@bindable eventHandlers = {}
	 
	element;
	instance;
	i18n;
	i18nInitialized = false;
		 
	constructor(element, observerLocator, i18n, eventAggregator) {
		this.element = element;
		this.subscriptions = [
			observerLocator
					.getObserver(this, 'value')
					.subscribe((newValue, oldValue) => {
						if (this.instance && this.instance.froalaEditor('html.get') != newValue) {
							this.instance.froalaEditor('html.set', newValue);
							this.updateEmptyStatus();
						}
					})
				];
		this.i18n = i18n;
		eventAggregator.subscribe('i18n:locale:changed', payload => {
        	this.processLanguageChanged();
      	});
	}
	
	processLanguageChanged() {
		this.tearDownFroala();
		this.setupFroala();
	}
	
	
	setupFroala() {
		this.instance =	$(this.element.getElementsByTagName("div")[0]);

		if (this.instance.data('froala.editor')) {
		  return;
		}
		let c = {}
		c.language = this.i18n.getLocale();
		Object.assign(c, this.config);
		this.instance.froalaEditor(c);
		this.instance.froalaEditor('html.set', this.value);
		if (this.eventHandlers && this.eventHandlers.length != 0) {
			for(let eventHandlerName in this.eventHandlers) {
				let handler = this.eventHandlers[eventHandlerName];
				this.instance.on(`froalaEditor.${eventHandlerName}`, function() {
					let p = arguments;
					return handler.apply(this, p) 
				});
			
			}
		}
		this.instance.on('froalaEditor.contentChanged', (e, editor) => this.value = editor.html.get());
	}
	
	updateEmptyStatus() {

	}
	
	tearDownFroala() {
		if (this.instance && this.instance.data('froala.editor')) {
      		this.instance.froalaEditor('destroy');
    	}
		this.instance = null;
	}
	
	attached() {
		this.setupFroala();		
	}

	
		
	detached() {
		this.tearDownFroala();
	} 
} 