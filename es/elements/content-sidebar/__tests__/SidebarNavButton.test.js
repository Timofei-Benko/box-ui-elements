function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        path                | expected\n        ", "              | ", "\n        ", "      | ", "\n        ", "     | ", "\n        ", " | ", "\n        ", "        | ", "\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        isOpen       | expected\n        ", "      | ", "\n        ", "     | ", "\n        ", " | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import PlainButton from '../../../components/plain-button';
import SidebarNavButton from '../SidebarNavButton';
import Tooltip from '../../../components/tooltip/Tooltip';
describe('elements/content-sidebar/SidebarNavButton', function () {
  var getWrapper = function getWrapper(_ref) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';

    var children = _ref.children,
        props = _objectWithoutProperties(_ref, ["children"]);

    return mount(React.createElement(MemoryRouter, {
      initialEntries: [path]
    }, React.createElement(SidebarNavButton, props, children)));
  };

  var getButton = function getButton(wrapper) {
    return wrapper.find(PlainButton).first();
  };

  test('should render nav button properly', function () {
    var wrapper = getWrapper({
      tooltip: 'foo'
    });
    var button = getButton(wrapper);
    expect(wrapper.find(Tooltip).prop('text')).toBe('foo');
    expect(button.hasClass('bcs-is-selected')).toBe(false);
  });
  test.each(_templateObject(), true, true, false, false, undefined, false)('should render nav button properly when selected with the sidebar open or closed', function (_ref2) {
    var expected = _ref2.expected,
        isOpen = _ref2.isOpen;
    var props = {
      isOpen: isOpen,
      sidebarView: 'activity',
      tooltip: 'foo'
    };
    var wrapper = getWrapper(props, '/activity');
    var button = getButton(wrapper);
    expect(button.hasClass('bcs-is-selected')).toBe(expected);
  });
  test.each(_templateObject2(), '/', false, '/activity', true, '/activity/', true, '/activity/test', true, '/skills', false)('should reflect active state ($expected) correctly based on active path', function (_ref3) {
    var expected = _ref3.expected,
        path = _ref3.path;
    var wrapper = getWrapper({
      isOpen: true,
      sidebarView: 'activity'
    }, path);
    var button = getButton(wrapper);
    expect(button.hasClass('bcs-is-selected')).toBe(expected);
  });
});