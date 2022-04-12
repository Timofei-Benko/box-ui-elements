function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
import uniqueId from 'lodash/uniqueId';
import AccessibleSVG from '../accessible-svg';
var ICON_CLASS = 'icon-google';

var IconGoogle =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IconGoogle, _React$Component);

  function IconGoogle() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, IconGoogle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(IconGoogle)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "idPrefix", "".concat(uniqueId(ICON_CLASS), "-"));

    return _this;
  }

  _createClass(IconGoogle, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          height = _this$props.height,
          title = _this$props.title,
          width = _this$props.width;
      return React.createElement(AccessibleSVG, {
        className: "".concat(ICON_CLASS, " ").concat(className),
        height: height,
        title: title,
        viewBox: "0 0 14 14",
        width: width
      }, React.createElement("path", {
        d: "M13.3684 7.12062C13.3684 6.59531 13.3258 6.21198 13.2336 5.81445H7.23511V8.18542H10.7561C10.6851 8.77463 10.3018 9.66198 9.44991 10.2582L9.43797 10.3376L11.3346 11.8069L11.466 11.82C12.6727 10.7055 13.3684 9.06567 13.3684 7.12062Z",
        fill: "#4285F4"
      }), React.createElement("path", {
        d: "M7.23502 13.3675C8.95999 13.3675 10.4081 12.7996 11.4659 11.82L9.44982 10.2582C8.91032 10.6344 8.18623 10.8971 7.23502 10.8971C5.54552 10.8971 4.11158 9.78262 3.60042 8.24219L3.52549 8.24855L1.55338 9.77479L1.52759 9.84648C2.5782 11.9335 4.73623 13.3675 7.23502 13.3675Z",
        fill: "#34A853"
      }), React.createElement("path", {
        d: "M3.60049 8.24224C3.46561 7.84472 3.38756 7.41876 3.38756 6.97866C3.38756 6.53851 3.46561 6.1126 3.59339 5.71507L3.58982 5.63041L1.59299 4.07965L1.52766 4.11073C1.09465 4.97679 0.846191 5.94934 0.846191 6.97866C0.846191 8.00798 1.09465 8.98048 1.52766 9.84654L3.60049 8.24224Z",
        fill: "#FBBC05"
      }), React.createElement("path", {
        d: "M7.23502 3.06008C8.43469 3.06008 9.24394 3.57829 9.70537 4.01134L11.5085 2.25083C10.4011 1.22152 8.96 0.589722 7.23502 0.589722C4.73623 0.589722 2.5782 2.02366 1.52759 4.11069L3.59332 5.71503C4.11158 4.1746 5.54552 3.06008 7.23502 3.06008Z",
        fill: "#EB4335"
      }));
    }
  }]);

  return IconGoogle;
}(React.Component);

_defineProperty(IconGoogle, "defaultProps", {
  className: '',
  height: 30,
  width: 30
});

export default IconGoogle;
//# sourceMappingURL=IconGoogle.js.map