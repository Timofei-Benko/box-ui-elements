function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 
 * @file Base class for the Content Explorer ES6 wrapper
 * @author Box
 */
import React from 'react';
import { render as _render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
import ContentExplorerReactComponent from '../content-explorer';

var ContentExplorer =
/*#__PURE__*/
function (_ES6Wrapper) {
  _inherits(ContentExplorer, _ES6Wrapper);

  function ContentExplorer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ContentExplorer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ContentExplorer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (data) {
      _this.emit('select', data);
    });

    _defineProperty(_assertThisInitialized(_this), "onNavigate", function (data) {
      _this.emit('navigate', data);
    });

    _defineProperty(_assertThisInitialized(_this), "onRename", function (data) {
      _this.emit('rename', data);
    });

    _defineProperty(_assertThisInitialized(_this), "onPreview", function (data) {
      _this.emit('preview', data);
    });

    _defineProperty(_assertThisInitialized(_this), "onDownload", function (data) {
      _this.emit('download', data);
    });

    _defineProperty(_assertThisInitialized(_this), "onDelete", function (data) {
      _this.emit('delete', data);
    });

    _defineProperty(_assertThisInitialized(_this), "onUpload", function (data) {
      _this.emit('upload', data);
    });

    _defineProperty(_assertThisInitialized(_this), "onCreate", function (data) {
      _this.emit('create', data);
    });

    return _this;
  }

  _createClass(ContentExplorer, [{
    key: "navigateTo",

    /**
     * Helper to programatically navigate
     *
     * @param {string} id - string folder id
     * @return {void}
     */
    value: function navigateTo(id) {
      var component = this.getComponent();

      if (component && typeof component.clearCache === 'function') {
        component.fetchFolder(id);
      }
    }
    /** @inheritdoc */

  }, {
    key: "render",
    value: function render() {
      _render(React.createElement(ContentExplorerReactComponent, _extends({
        language: this.language,
        messages: this.messages,
        rootFolderId: this.id,
        token: this.token,
        componentRef: this.setComponent,
        onDelete: this.onDelete,
        onDownload: this.onDownload,
        onPreview: this.onPreview,
        onRename: this.onRename,
        onSelect: this.onSelect,
        onUpload: this.onUpload,
        onCreate: this.onCreate,
        onNavigate: this.onNavigate,
        onInteraction: this.onInteraction
      }, this.options)), this.container);
    }
  }]);

  return ContentExplorer;
}(ES6Wrapper);

global.Box = global.Box || {};
global.Box.ContentExplorer = ContentExplorer;
export default ContentExplorer;
//# sourceMappingURL=ContentExplorer.js.map