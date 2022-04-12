function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import AccessibleSVG from '../accessible-svg';
import * as vars from '../../styles/variables';
var ICON_CLASS = 'unknown-user-avatar';

var UnknownUserAvatar =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(UnknownUserAvatar, _React$PureComponent);

  function UnknownUserAvatar() {
    _classCallCheck(this, UnknownUserAvatar);

    return _possibleConstructorReturn(this, _getPrototypeOf(UnknownUserAvatar).apply(this, arguments));
  }

  _createClass(UnknownUserAvatar, [{
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
        viewBox: "0 0 16 16",
        width: width
      }, React.createElement("path", {
        fill: vars.bdlGray50,
        fillRule: "evenodd",
        d: "M8 0a8 8 0 110 16A8 8 0 018 0zm0 9.5c-1.21 0-2.293.413-3.232 1.096-.56.407-.953.817-1.168 1.104a.5.5 0 00.8.6c.035-.047.114-.141.234-.267.205-.214.447-.428.722-.629.78-.567 1.665-.904 2.644-.904.979 0 1.865.337 2.644.904.275.2.517.415.722.63.12.125.199.219.234.266a.5.5 0 00.8-.6c-.215-.287-.607-.697-1.168-1.104C10.293 9.913 9.21 9.5 8 9.5zm0-6a2.5 2.5 0 000 5 2.5 2.5 0 000-5zm0 1a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 018 4.5z"
      }));
    }
  }]);

  return UnknownUserAvatar;
}(React.PureComponent);

_defineProperty(UnknownUserAvatar, "defaultProps", {
  className: '',
  height: 28,
  width: 28
});

export default UnknownUserAvatar;
//# sourceMappingURL=UnknownUserAvatar.js.map