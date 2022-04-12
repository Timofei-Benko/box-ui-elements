function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import tabbable from 'tabbable';
import classNames from 'classnames';

var FocusTrap =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FocusTrap, _React$Component);

  function FocusTrap() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FocusTrap);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FocusTrap)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "focusFirstElement", function () {
      if (!_this.el) {
        return;
      }

      var tabbableEls = tabbable(_this.el); // There are three trap-related elements, including first element.
      // If there are 3 or fewer tabbable elements, that means there are no
      // tabbable children, so focus on the trap element instead.

      if (tabbableEls.length > 3) {
        tabbableEls[1].focus();
      } else if (_this.trapEl) {
        _this.trapEl.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "focusLastElement", function () {
      if (!_this.el) {
        return;
      }

      var tabbableEls = tabbable(_this.el); // There are three trap-related elements, including the last two elements.
      // If there are 3 or fewer tabbable elements, that means there are no
      // tabbable children, so focus on the trap element instead.

      if (tabbableEls.length > 3) {
        tabbableEls[tabbableEls.length - 3].focus();
      } else if (_this.trapEl) {
        _this.trapEl.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleElKeyDown", function (event) {
      var handleOverlayKeyDown = _this.props.handleOverlayKeyDown;

      if (_this.el === document.activeElement && event.key === 'Tab') {
        _this.focusFirstElement();

        event.stopPropagation();
        event.preventDefault();
      }

      if (handleOverlayKeyDown) {
        handleOverlayKeyDown(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleTrapElKeyDown", function (event) {
      if (event.key !== 'Tab') {
        return;
      }

      event.stopPropagation();
      event.preventDefault();
    });

    return _this;
  }

  _createClass(FocusTrap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.shouldDefaultFocus) {
        setTimeout(function () {
          _this2.previousFocusEl = document.activeElement;

          _this2.focusFirstElement();
        }, 0);
      } else {
        setTimeout(function () {
          if (_this2.el) {
            _this2.el.focus();
          }
        }, 0);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      setTimeout(function () {
        if (_this3.previousFocusEl) {
          _this3.previousFocusEl.focus();
        }
      }, 0);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          getRef = _this$props.getRef,
          handleOverlayKeyDown = _this$props.handleOverlayKeyDown,
          shouldDefaultFocus = _this$props.shouldDefaultFocus,
          shouldOutlineFocus = _this$props.shouldOutlineFocus,
          rest = _objectWithoutProperties(_this$props, ["children", "className", "getRef", "handleOverlayKeyDown", "shouldDefaultFocus", "shouldOutlineFocus"]);

      return (// eslint-disable-next-line jsx-a11y/no-static-element-interactions
        React.createElement("div", _extends({
          ref: function ref(_ref2) {
            _this4.el = _ref2;

            if (getRef) {
              getRef(_ref2);
            }
          },
          className: classNames(className, {
            'should-outline-focus': shouldOutlineFocus
          }),
          onKeyDown: this.handleElKeyDown
        }, rest), React.createElement("i", {
          "aria-hidden": true,
          onFocus: this.focusLastElement,
          tabIndex: "0"
        }), children, React.createElement("i", {
          "aria-hidden": true,
          onFocus: this.focusFirstElement,
          tabIndex: "0"
        }), React.createElement("i", {
          ref: function ref(_ref) {
            _this4.trapEl = _ref;
          },
          "aria-hidden": true,
          onKeyDown: this.handleTrapElKeyDown // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          ,
          tabIndex: "0"
        }))
      );
    }
  }]);

  return FocusTrap;
}(React.Component);

export default FocusTrap;