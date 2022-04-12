function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { shallow } from 'enzyme';
import TitleBodyTagsButton from '../TitleBodyTagsButton';
var templateParams = {
  body: 'foo',
  tags: 'a,b,c',
  title: 'bar'
};
var button = {
  button1: {
    label: 'learn more',
    actions: [{
      type: 'openURL',
      target: '_blank',
      url: 'https://support.box.com/hc/en-us'
    }, {
      type: 'close'
    }]
  }
};

var defaultProps = _objectSpread({
  date: new Date(1600304584205)
}, templateParams, {}, button);

var getWrapper = function getWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return shallow(React.createElement(TitleBodyTagsButton, _extends({}, defaultProps, props)));
};

describe('components/message-center/components/templates/preview-title-body-tags/TitleBodyTagsButton', function () {
  test('should render TitleBodyTagsButton template', function () {
    expect(getWrapper()).toMatchSnapshot();
  });
});