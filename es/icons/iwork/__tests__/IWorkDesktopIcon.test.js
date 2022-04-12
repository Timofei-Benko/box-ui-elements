function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import IWorkDesktopIcon from '../IWorkDesktopIcon';
describe('icons/iwork/IWorkDesktopIcon', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(IWorkDesktopIcon, _extends({
      extension: ""
    }, props)));
  };

  [{
    extension: 'pages',
    component: 'PagesForMac32'
  }, {
    extension: 'numbers',
    component: 'NumbersForMac32'
  }, {
    extension: 'key',
    component: 'KeynoteForMac32'
  }].forEach(function (_ref) {
    var extension = _ref.extension,
        component = _ref.component;
    test('should correctly render default icon', function () {
      var wrapper = getWrapper({
        extension: extension
      });
      expect(wrapper.is(component)).toBe(true);
      expect(wrapper.prop('height')).toEqual(32);
      expect(wrapper.prop('width')).toEqual(32);
    });
    test('should set class when specified', function () {
      var wrapper = getWrapper({
        className: 'test',
        extension: extension
      });
      expect(wrapper.hasClass('test')).toBe(true);
    });
    test('should set dimensions when specified', function () {
      var wrapper = getWrapper({
        dimension: 10,
        extension: extension
      });
      expect(wrapper.prop('height')).toEqual(10);
      expect(wrapper.prop('width')).toEqual(10);
    });
    test('should set title when specified', function () {
      var wrapper = getWrapper({
        extension: extension,
        title: 'title'
      });
      expect(wrapper.prop('title')).toEqual('title');
    });
  });
  test('should return null when extension does not match', function () {
    var wrapper = getWrapper();
    expect(wrapper.getElement()).toBeNull();
  });
});