function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Pikaday from 'pikaday';

// An extended version of Pikaday to work when `isAccessible` prop is `true`
var AccessiblePikaday =
/*#__PURE__*/
function (_Pikaday) {
  _inherits(AccessiblePikaday, _Pikaday);

  function AccessiblePikaday(options) {
    var _this;

    _classCallCheck(this, AccessiblePikaday);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AccessiblePikaday).call(this, options));

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function () {
      _this.hide();
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function (event) {
      if (_this.isVisible() && _this.datePickerButtonEl && _this.datePickerButtonEl.contains(event.target)) {
        return;
      }

      if (_this.isVisible() && !_this.el.contains(event.target)) {
        _this.hide();

        var currentFocusEl = document.activeElement;

        if (_this.accessibleFieldEl && currentFocusEl && currentFocusEl.tabIndex < 0) {
          _this.accessibleFieldEl.focus();
        }
      }
    });

    _this.accessibleFieldEl = options.accessibleFieldEl;
    _this.datePickerButtonEl = options.datePickerButtonEl; // Override behavior as if `options.field` and `options.bound` were set.
    // See https://github.com/Pikaday/Pikaday/blob/master/pikaday.js#L671
    //     https://github.com/Pikaday/Pikaday/blob/master/pikaday.js#L695-L703

    if (_this.accessibleFieldEl) {
      _this.el.classList.add('is-bound');

      document.body.appendChild(_this.el);

      _this.accessibleFieldEl.addEventListener('blur', _this.handleBlur);

      _this.hide();
    }

    return _this;
  }

  _createClass(AccessiblePikaday, [{
    key: "show",
    value: function show() {
      _get(_getPrototypeOf(AccessiblePikaday.prototype), "show", this).call(this);

      if (this.accessibleFieldEl) {
        document.addEventListener('click', this.handleClickOutside, true);
        this.adjustPosition();
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      _get(_getPrototypeOf(AccessiblePikaday.prototype), "hide", this).call(this);

      if (this.accessibleFieldEl) {
        document.removeEventListener('click', this.handleClickOutside);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(AccessiblePikaday.prototype), "destroy", this).call(this);

      if (this.accessibleFieldEl) {
        this.accessibleFieldEl.removeEventListener('blur', this.handleBlur);
        document.removeEventListener('click', this.handleClickOutside);
      }
    }
  }]);

  return AccessiblePikaday;
}(Pikaday);

export default AccessiblePikaday;
//# sourceMappingURL=AccessiblePikaday.js.map