function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * 
 * @file Base class for the Content Sharing ES6 wrapper
 * @author Box
 */
import * as React from 'react';
import uniqueId from 'lodash/uniqueId';
import { render as _render } from 'react-dom';
import ES6Wrapper from './ES6Wrapper';
import ContentSharingReactComponent from '../content-sharing';
import { ITEM_TYPE_FILE } from '../../common/constants';

var ContentSharing =
/*#__PURE__*/
function (_ES6Wrapper) {
  _inherits(ContentSharing, _ES6Wrapper);

  function ContentSharing() {
    _classCallCheck(this, ContentSharing);

    return _possibleConstructorReturn(this, _getPrototypeOf(ContentSharing).apply(this, arguments));
  }

  _createClass(ContentSharing, [{
    key: "render",

    /** @inheritdoc */
    value: function render() {
      var itemType = this.options.itemType;

      _render(React.createElement(ContentSharingReactComponent, _extends({
        itemID: this.id,
        itemType: itemType || ITEM_TYPE_FILE,
        language: this.language,
        messages: this.messages,
        token: this.token,
        uuid: uniqueId('contentSharing_')
      }, this.options)), this.container);
    }
  }]);

  return ContentSharing;
}(ES6Wrapper);

global.Box = global.Box || {};
global.Box.ContentSharing = ContentSharing;
export default ContentSharing;
//# sourceMappingURL=ContentSharing.js.map