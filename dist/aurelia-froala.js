'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AureliaFroala = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

var _aureliaFramework = require('aurelia-framework');

var _aureliaBinding = require('aurelia-binding');

var _aureliaI18n = require('aurelia-i18n');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _aureliaEventAggregator = require('aurelia-event-aggregator');

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

var AureliaFroala = exports.AureliaFroala = (_dec = (0, _aureliaFramework.customElement)('aurelia-froala'), _dec2 = (0, _aureliaFramework.inject)(Element, _aureliaBinding.ObserverLocator, _aureliaI18n.I18N, _aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = (_class2 = function () {
	function AureliaFroala(element, observerLocator, i18n, eventAggregator) {
		var _this = this;

		_classCallCheck(this, AureliaFroala);

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

	_createClass(AureliaFroala, [{
		key: 'processLanguageChanged',
		value: function processLanguageChanged() {
			this.tearDownFroala();
			this.setupFroala();
		}
	}, {
		key: 'setupFroala',
		value: function setupFroala() {
			var _this2 = this;

			this.instance = (0, _jquery2.default)(this.element.getElementsByTagName("div")[0]);

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
		}
	}, {
		key: 'updateEmptyStatus',
		value: function updateEmptyStatus() {}
	}, {
		key: 'tearDownFroala',
		value: function tearDownFroala() {
			if (this.instance && this.instance.data('froala.editor')) {
				this.instance.froalaEditor('destroy');
			}
			this.instance = null;
		}
	}, {
		key: 'attached',
		value: function attached() {
			this.setupFroala();
		}
	}, {
		key: 'detached',
		value: function detached() {
			this.tearDownFroala();
		}
	}]);

	return AureliaFroala;
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
})), _class2)) || _class) || _class);