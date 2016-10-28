'use strict';

System.register(['aurelia-framework', 'aurelia-binding', 'aurelia-i18n', 'aurelia-event-aggregator'], function (_export, _context) {
	"use strict";

	var customElement, bindable, inject, ObserverLocator, I18N, EventAggregator, _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, FroalaEditor;

	function _initDefineProp(target, property, descriptor, context) {
		if (!descriptor) return;
		Object.defineProperty(target, property, {
			enumerable: descriptor.enumerable,
			configurable: descriptor.configurable,
			writable: descriptor.writable,
			value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
		});
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;

		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}

		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);

		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}

		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}

		return desc;
	}

	function _initializerWarningHelper(descriptor, context) {
		throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
	}

	return {
		setters: [function (_aureliaFramework) {
			customElement = _aureliaFramework.customElement;
			bindable = _aureliaFramework.bindable;
			inject = _aureliaFramework.inject;
		}, function (_aureliaBinding) {
			ObserverLocator = _aureliaBinding.ObserverLocator;
		}, function (_aureliaI18n) {
			I18N = _aureliaI18n.I18N;
		}, function (_aureliaEventAggregator) {
			EventAggregator = _aureliaEventAggregator.EventAggregator;
		}],
		execute: function () {

			customElement('froala-editor');

			_export('FroalaEditor', FroalaEditor = (_dec = inject(Element, ObserverLocator, I18N, EventAggregator), _dec(_class = (_class2 = function () {
				function FroalaEditor(element, observerLocator, i18n, eventAggregator) {
					var _this = this;

					_classCallCheck(this, FroalaEditor);

					_initDefineProp(this, 'value', _descriptor, this);

					_initDefineProp(this, 'config', _descriptor2, this);

					_initDefineProp(this, 'eventHandlers', _descriptor3, this);

					this.i18nInitialized = false;

					this.element = element;
					this.subscriptions = [observerLocator.getObserver(this, 'value').subscribe(function (newValue, oldValue) {
						if (_this.instance && _this.instance.froalaEditor('html.get') != newValue) {
							_this.instance.froalaEditor('html.set', newValue);
							_this.updateEmptyStatus();
						}
					})];
					this.i18n = i18n;
					eventAggregator.subscribe('i18n:locale:changed', function (payload) {
						_this.processLanguageChanged();
					});
				}

				FroalaEditor.prototype.processLanguageChanged = function processLanguageChanged() {
					this.tearDownFroala();
					this.setupFroala();
				};

				FroalaEditor.prototype.setupFroala = function setupFroala() {
					var _this2 = this;

					this.instance = $(this.element.getElementsByTagName("div")[0]);

					if (this.instance.data('froala.editor')) {
						return;
					}
					var c = {};
					c.language = this.i18n.getLocale();
					Object.assign(c, this.config);
					this.instance.froalaEditor(c);
					this.instance.froalaEditor('html.set', this.value);
					if (this.eventHandlers && this.eventHandlers.length != 0) {
						var _loop = function _loop(eventHandlerName) {
							var handler = _this2.eventHandlers[eventHandlerName];
							_this2.instance.on('froalaEditor.' + eventHandlerName, function () {
								var p = arguments;
								return handler.apply(this, p);
							});
						};

						for (var eventHandlerName in this.eventHandlers) {
							_loop(eventHandlerName);
						}
					}
					this.instance.on('froalaEditor.contentChanged', function (e, editor) {
						return _this2.value = editor.html.get();
					});
				};

				FroalaEditor.prototype.updateEmptyStatus = function updateEmptyStatus() {};

				FroalaEditor.prototype.tearDownFroala = function tearDownFroala() {
					if (this.instance && this.instance.data('froala.editor')) {
						this.instance.froalaEditor('destroy');
					}
					this.instance = null;
				};

				FroalaEditor.prototype.attached = function attached() {
					this.setupFroala();
				};

				FroalaEditor.prototype.detached = function detached() {
					this.tearDownFroala();
				};

				return FroalaEditor;
			}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [bindable], {
				enumerable: true,
				initializer: null
			}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'config', [bindable], {
				enumerable: true,
				initializer: function initializer() {
					return {};
				}
			}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'eventHandlers', [bindable], {
				enumerable: true,
				initializer: function initializer() {
					return {};
				}
			})), _class2)) || _class));

			_export('FroalaEditor', FroalaEditor);
		}
	};
});