function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            key                | route\n            ", "    | ", "\n            ", "  | ", "\n            ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { createMemoryHistory } from 'history';
import SidebarNavTablist from '../SidebarNavTablist';
import { SIDEBAR_VIEW_SKILLS, SIDEBAR_VIEW_ACTIVITY, SIDEBAR_VIEW_DETAILS, SIDEBAR_VIEW_METADATA, KEYS } from '../../../constants';
jest.mock('react-router-dom', function () {
  return _objectSpread({}, jest.requireActual('react-router-dom'), {
    withRouter: function withRouter(Component) {
      return Component;
    }
  });
});
describe('elements/content-sidebar/SidebarNavTablist', function () {
  test('should correctly render children', function () {
    var MockChildren = function MockChildren() {
      return React.createElement("div", null);
    };

    var wrapper = shallow(React.createElement(SidebarNavTablist, null, React.createElement(MockChildren, null)));
    expect(wrapper.type()).toEqual('div');
    expect(wrapper.hasClass('bcs-SidebarNav-main')).toBe(true);
    expect(wrapper.exists(MockChildren)).toBe(true);
  });
  describe('handleKeyDown', function () {
    var viewList = [SIDEBAR_VIEW_ACTIVITY, SIDEBAR_VIEW_DETAILS, SIDEBAR_VIEW_SKILLS, SIDEBAR_VIEW_METADATA];
    test.each(_templateObject(), KEYS.arrowUp, SIDEBAR_VIEW_ACTIVITY, KEYS.arrowDown, SIDEBAR_VIEW_SKILLS, KEYS.arrowRight, SIDEBAR_VIEW_DETAILS)('should navigate to right sidebar panels when a user presses different arrow keys', function (_ref) {
      var key = _ref.key,
          route = _ref.route;
      var history = createMemoryHistory({
        initialEntries: ["/".concat(SIDEBAR_VIEW_DETAILS)]
      });
      var wrapper = shallow(React.createElement(SidebarNavTablist, {
        history: history
      }, viewList.map(function (view) {
        return React.createElement("div", {
          sidebarView: view,
          key: view
        });
      })));
      var event = {
        key: key,
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
      };
      wrapper.props().onKeyDown(event);

      if (key === KEYS.arrowUp || key === KEYS.arrowDown) {
        expect(event.preventDefault).toBeCalled();
        expect(event.stopPropagation).toBeCalled();
      }

      expect(history.location.pathname).toBe("/".concat(route));
    });
  });
});