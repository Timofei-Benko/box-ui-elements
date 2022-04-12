function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        isOpen   | location\n        ", "  | ", "\n        ", " | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme/build';
import { SidebarToggleComponent as SidebarToggle } from '../SidebarToggle';
describe('elements/content-sidebar/SidebarToggle', function () {
  var historyMock = {
    replace: jest.fn()
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SidebarToggle, _extends({
      history: historyMock
    }, props)));
  };

  test.each(_templateObject(), true, {
    state: {
      open: false
    }
  }, false, {
    state: {
      open: true
    }
  })('should render and handle clicks correctly when isOpen is $isOpen', function (_ref) {
    var isOpen = _ref.isOpen,
        location = _ref.location;
    var event = {
      preventDefault: jest.fn()
    };
    var wrapper = getWrapper({
      isOpen: isOpen
    });
    wrapper.simulate('click', event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(historyMock.replace).toHaveBeenCalledWith(location);
    expect(wrapper).toMatchSnapshot();
  });
});