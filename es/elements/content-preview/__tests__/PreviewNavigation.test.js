function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            currentIndex\n            ", "\n            ", "\n            ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { Router } from 'react-router-dom';
import noop from 'lodash/noop';
import { mount } from 'enzyme';
import { PreviewNavigationComponent as PreviewNavigation } from '../PreviewNavigation';
var historyMock = {
  location: {
    pathname: '/activity/tasks/1234',
    hash: ''
  },
  listen: jest.fn(),
  push: jest.fn(),
  entries: [{}]
};

var getWrapper = function getWrapper(_ref) {
  var _ref$collection = _ref.collection,
      collection = _ref$collection === void 0 ? ['a', 'b', 'c'] : _ref$collection,
      _ref$onNavigateLeft = _ref.onNavigateLeft,
      onNavigateLeft = _ref$onNavigateLeft === void 0 ? noop : _ref$onNavigateLeft,
      _ref$onNavigateRight = _ref.onNavigateRight,
      onNavigateRight = _ref$onNavigateRight === void 0 ? noop : _ref$onNavigateRight,
      rest = _objectWithoutProperties(_ref, ["collection", "onNavigateLeft", "onNavigateRight"]);

  return mount(React.createElement(Router, {
    history: historyMock
  }, React.createElement(PreviewNavigation, _extends({
    collection: collection,
    intl: {
      formatMessage: jest.fn()
    },
    onNavigateLeft: onNavigateLeft,
    onNavigateRight: onNavigateRight,
    history: historyMock
  }, rest))));
};

afterEach(function () {
  jest.resetAllMocks();
});
describe('elements/content-preview/PreviewNavigation', function () {
  describe('render()', function () {
    test('should render correctly with an empty collection', function () {
      var wrapper = getWrapper({
        collection: [],
        currentIndex: 0
      });
      expect(wrapper).toMatchSnapshot();
    });
    test.each(_templateObject(), 0, 1, 9)('should render correctly with a filled collection', function (_ref2) {
      var currentIndex = _ref2.currentIndex;
      var collection = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      var wrapper = getWrapper({
        collection: collection,
        currentIndex: currentIndex
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render left navigation correctly from tasks deeplinked URL', function () {
      var onNavigateLeftMock = jest.fn();
      var wrapper = getWrapper({
        currentIndex: 2,
        onNavigateLeft: onNavigateLeftMock
      });
      expect(wrapper.find('PlainButton')).toHaveLength(1);
      wrapper.find('PlainButton').simulate('click');
      expect(historyMock.push).toBeCalledTimes(1);
      expect(historyMock.push).toBeCalledWith('/activity');
      expect(onNavigateLeftMock).toHaveBeenCalled();
    });
    test('should render right navigation correctly from tasks deeplinked URL ', function () {
      var onNavigateRightMock = jest.fn();
      var wrapper = getWrapper({
        currentIndex: 0,
        onNavigateRight: onNavigateRightMock
      });
      expect(wrapper.find('PlainButton')).toHaveLength(1);
      wrapper.find('PlainButton').simulate('click');
      expect(historyMock.push).toBeCalledTimes(1);
      expect(historyMock.push).toBeCalledWith('/activity');
      expect(onNavigateRightMock).toHaveBeenCalled();
    });
    test('should render navigation correctly from comments deeplinked URL ', function () {
      var onNavigateRightMock = jest.fn();
      var wrapper = getWrapper({
        currentIndex: 0,
        onNavigateRight: onNavigateRightMock
      });
      expect(wrapper.find('PlainButton')).toHaveLength(1);
      wrapper.find('PlainButton').simulate('click');
      expect(historyMock.push).toBeCalledTimes(1);
      expect(historyMock.push).toBeCalledWith('/activity');
      expect(onNavigateRightMock).toHaveBeenCalled();
    });
  });
});