'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FroalaEditor1 = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

var _aureliaFramework = require('aurelia-framework');

var _aureliaBinding = require('aurelia-binding');

var _froalaEditorConfig = require('./froala-editor-config');

var _froala_editorPkgdMin = require('froala-editor/js/froala_editor.pkgd.min.js');

var _froala_editorPkgdMin2 = _interopRequireDefault(_froala_editorPkgdMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
	if (!descriptor) return;
	Object.defineProperty(target, property, {
		enumerable: descriptor.enumerable,
		configurable: descriptor.configurable,
		writable: descriptor.writable,
		value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	});
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var FroalaEditor1 = exports.FroalaEditor1 = (_dec = (0, _aureliaFramework.customElement)('froala-editor'), _dec2 = (0, _aureliaFramework.inject)(Element, _froalaEditorConfig.Config, _aureliaBinding.ObserverLocator), _dec(_class = _dec2(_class = (_class2 = function () {
	function FroalaEditor1(element, config, observerLocator) {
		_classCallCheck(this, FroalaEditor1);

		_initDefineProp(this, 'value', _descriptor, this);

		_initDefineProp(this, 'config', _descriptor2, this);

		_initDefineProp(this, 'eventHandlers', _descriptor3, this);

		_initDefineProp(this, 'editor', _descriptor4, this);

		this.element = element;
		this.config = config.options();
		this.observerLocator = observerLocator;
	}

	FroalaEditor1.prototype.bind = function bind(bindingContext, overrideContext) {
		this.parent = bindingContext;
	};

	FroalaEditor1.prototype.attached = function attached() {
		var _this = this;

		var editorSelector = this.config.iframe ? 'textarea' : 'div';

		if (this.editor != null) {
			return;
		}

		this.subscriptions = [this.observerLocator.getObserver(this, 'value').subscribe(function (newValue, oldValue) {
			if (_this.editor && _this.editor.html.get() != newValue) {
				_this.editor.html.set(newValue);
			}
		})];

		this.editor = new _froala_editorPkgdMin2.default('#' + this.element.id + ' ' + editorSelector, Object.assign({}, this.config), function () {
			_this.editor.html.set(_this.value);

			if (_this.eventHandlers && _this.eventHandlers.length != 0) {
				var _loop = function _loop(eventHandlerName) {
					var handler = _this.eventHandlers[eventHandlerName];
					_this.editor.events.on('' + eventHandlerName, function () {
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
							args[_key] = arguments[_key];
						}

						return handler.apply(_this.parent, args);
					});
				};

				for (var eventHandlerName in _this.eventHandlers) {
					_loop(eventHandlerName);
				}
			}
			_this.editor.events.on('blur', function (e) {
				return _this.value = _this.editor.html.get();
			});
			_this.editor.events.on('contentChanged', function (e) {
				return _this.value = _this.editor.html.get();
			});
		});
	};

	FroalaEditor1.prototype.detached = function detached() {
		if (this.editor != null) {
			this.editor.destroy();
			this.editor = null;
		}
	};

	return FroalaEditor1;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaFramework.bindable], {
	enumerable: true,
	initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'config', [_aureliaFramework.bindable], {
	enumerable: true,
	initializer: function initializer() {
		return {};
	}
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'eventHandlers', [_aureliaFramework.bindable], {
	enumerable: true,
	initializer: function initializer() {
		return {};
	}
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'editor', [_aureliaFramework.bindable], {
	enumerable: true,
	initializer: null
})), _class2)) || _class) || _class);