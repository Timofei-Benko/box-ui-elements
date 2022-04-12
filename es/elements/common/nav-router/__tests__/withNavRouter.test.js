import React from 'react';
import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history';
import NavRouter from '../NavRouter';
import withNavRouter from '../withNavRouter';
describe('src/eleemnts/common/nav-router/withNavRouter', function () {
  var TestComponent = function TestComponent(_ref) {
    var value = _ref.value;
    return React.createElement("div", null, "Test ".concat(value));
  };

  var WrappedComponent = withNavRouter(TestComponent);

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(WrappedComponent, props));
  };

  test('should wrap component with NavRouter', function () {
    var wrapper = getWrapper();
    expect(wrapper.find(NavRouter)).toBeTruthy();
    expect(wrapper.find(TestComponent)).toBeTruthy();
  });
  test('should provide the appropriate props to NavRouter and the wrapped component', function () {
    var history = createMemoryHistory();
    var initialEntries = ['foo'];
    var value = 'foo';
    var wrapper = getWrapper({
      history: history,
      initialEntries: initialEntries,
      value: value
    });
    var navRouter = wrapper.find(NavRouter);
    expect(navRouter.prop('history')).toEqual(history);
    expect(navRouter.prop('initialEntries')).toEqual(initialEntries);
    expect(wrapper.find(TestComponent).prop('value')).toEqual(value);
  });
});