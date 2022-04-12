function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
import { shallow } from 'enzyme';
import AsyncError from '../AsyncError';
describe('elements/common/async-load/AsyncError', function () {
  var Component = function Component() {
    return React.createElement("div", null, "ERROR!");
  };

  var getWrapper = function getWrapper(_ref) {
    var _ref$children = _ref.children,
        children = _ref$children === void 0 ? 'Test!' : _ref$children,
        _ref$component = _ref.component,
        component = _ref$component === void 0 ? Component : _ref$component,
        rest = _objectWithoutProperties(_ref, ["children", "component"]);

    return shallow(React.createElement(AsyncError, _extends({
      component: component
    }, rest), children));
  };

  test('should render the children components if there is no error', function () {
    var wrapper = getWrapper({
      component: Component
    });
    expect(wrapper.exists(Component)).toBe(false);
    expect(wrapper.text()).toBe('Test!');
    expect(wrapper).toMatchSnapshot();
  });
  test('should render the error component if there is an error', function () {
    var wrapper = getWrapper({
      component: Component
    });
    wrapper.setState({
      error: new Error('foo')
    });
    expect(wrapper.exists(Component)).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});