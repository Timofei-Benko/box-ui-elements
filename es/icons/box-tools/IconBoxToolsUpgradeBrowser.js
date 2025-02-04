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
var ICON_CLASS = 'icon-box-tools-upgrade-browser';

var IconBoxToolsUpgradeBrowser =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IconBoxToolsUpgradeBrowser, _React$Component);

  function IconBoxToolsUpgradeBrowser() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, IconBoxToolsUpgradeBrowser);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(IconBoxToolsUpgradeBrowser)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "idPrefix", "".concat(uniqueId(ICON_CLASS), "-"));

    return _this;
  }

  _createClass(IconBoxToolsUpgradeBrowser, [{
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
        viewBox: "0 0 152 113",
        width: width
      }, React.createElement("g", {
        fill: "none",
        transform: "translate(1 1)"
      }, React.createElement("path", {
        d: "M0 9h136v14H0z",
        fill: "#0061D5",
        fillOpacity: ".137"
      }), React.createElement("path", {
        d: "M4 8h128c2.2091 0 4 1.7909 4 4v95c0 2.2091-1.7909 4-4 4H4c-2.2091 0-4-1.7909-4-4V12c0-2.2091 1.7909-4 4-4z",
        stroke: "#0061D5",
        strokeWidth: "2"
      }), React.createElement("path", {
        d: "M0 21.7333h135",
        stroke: "#0061D5",
        strokeLinecap: "round",
        strokeWidth: "2"
      }), React.createElement("path", {
        d: "M92.94 65.3333c-.82-12.48-10.7933-22.4566-23.2733-23.2766V42h-3.3334v.0567c-12.48.82-22.4566 10.7966-23.2766 23.2766H43v3.3334h.0567c.82 12.48 10.7966 22.4533 23.2766 23.2733V92h3.3334v-.06c12.48-.82 22.4533-10.7933 23.2733-23.2733H93v-3.3334h-.06zM58.65 47.45c-1.61 2.14-2.9467 4.8233-3.92 7.8833h-4.9933c2.1733-3.39 5.26-6.1333 8.9133-7.8833zM47.9933 58.6667h5.86c-.4466 2.1066-.73 4.3433-.82 6.6666h-6.6366a21.479 21.479 0 0 1 1.5966-6.6666zm-1.5966 10h6.6366c.09 2.3233.3734 4.56.82 6.6666h-5.86a21.479 21.479 0 0 1-1.5966-6.6666zm3.34 10h4.99c.9733 3.06 2.31 5.7433 3.9233 7.8833-3.6533-1.75-6.74-4.49-8.9133-7.8833zm16.5966 9.7866c-3.4266-.9166-6.3766-4.5966-8.1666-9.7866h8.1666v9.7866zm0-13.12H57.23c-.47-2.0766-.7667-4.32-.8633-6.6666h9.9666v6.6666zm0-10h-9.9666c.0966-2.3466.3933-4.59.8633-6.6666h9.1033v6.6666zm0-10h-8.1666c1.79-5.19 4.74-8.87 8.1666-9.7833v9.7833zm19.93 0h-4.9866c-.9767-3.06-2.31-5.7433-3.9267-7.8833 3.65 1.75 6.74 4.4933 8.9133 7.8833zM69.6667 45.55c3.4233.9133 6.3766 4.5933 8.1666 9.7833h-8.1666V45.55zm0 13.1167h9.1c.4733 2.0766.7633 4.32.8666 6.6666h-9.9666v-6.6666zm0 10h9.9666c-.0966 2.3466-.3933 4.59-.8666 6.6666h-9.1v-6.6666zm0 19.7866v-9.7866h8.1666c-1.79 5.19-4.7433 8.87-8.1666 9.7866zM77.35 86.55c1.61-2.1433 2.95-4.8233 3.9267-7.8833h4.9866C84.09 82.06 81 84.8 77.35 86.55zm10.6567-11.2167h-5.86c.4466-2.1066.73-4.3433.82-6.6666H89.6a21.3824 21.3824 0 0 1-1.5933 6.6666zm-5.04-10c-.09-2.3233-.3734-4.56-.82-6.6666h5.86a21.479 21.479 0 0 1 1.5966 6.6666h-6.6366z",
        fill: "#0061D5"
      }), React.createElement("circle", {
        cx: "8",
        cy: "15",
        fill: "#0061D5",
        r: "2"
      }), React.createElement("circle", {
        cx: "14",
        cy: "15",
        fill: "#0061D5",
        r: "2"
      }), React.createElement("circle", {
        cx: "21",
        cy: "15",
        fill: "#0061D5",
        r: "2"
      }), React.createElement("rect", {
        fill: "#FFF",
        height: "4",
        rx: "2",
        width: "102",
        x: "29",
        y: "13"
      }), React.createElement("path", {
        d: "M149.4003 20.307L138.89 2.2387c-1.7167-2.9848-6.0579-2.9848-7.7684 0L120.605 20.3071c-1.7167 2.9848.42 6.6929 3.8843 6.6929h20.9896c3.4643 0 5.638-3.7448 3.9213-6.693z",
        fill: "#ED3757",
        stroke: "#FFF",
        strokeWidth: "2"
      }), React.createElement("path", {
        d: "M134.9996 22.9916c-.914 0-1.6735-.7539-1.6735-1.661 0-.907.7596-1.661 1.6735-1.661.914 0 1.6735.754 1.6365 1.704.0432.8641-.7596 1.618-1.6365 1.618zM136.5249 12.2535c-.0741 1.2871-.1544 2.568-.2285 3.8552-.037.4168-.037.7968-.037 1.2074-.037.6803-.5743 1.2074-1.2598 1.2074-.6854 0-1.2165-.4903-1.2597-1.1706-.1112-2.0042-.2285-3.9717-.3397-5.9758-.037-.5271-.074-1.0604-.1173-1.5875 0-.8703.494-1.5874 1.2968-1.8142.8028-.19 1.5994.19 1.9452.9439.1173.2636.1544.5271.1544.8336-.037.8396-.1173 1.6732-.1544 2.5006z",
        fill: "#FFF"
      })));
    }
  }]);

  return IconBoxToolsUpgradeBrowser;
}(React.Component);

_defineProperty(IconBoxToolsUpgradeBrowser, "defaultProps", {
  className: '',
  height: 113,
  width: 152
});

export default IconBoxToolsUpgradeBrowser;
//# sourceMappingURL=IconBoxToolsUpgradeBrowser.js.map