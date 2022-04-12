function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import makeLoadable from '../makeLoadable';
describe('components/loading-indicator/makeLoadable', function () {
  var TestComponent;
  beforeEach(function () {
    TestComponent = function TestComponent() {
      return React.createElement("div", {
        className: "test-component"
      }, "blah");
    };
  });
  test('should render BaseComponent when isLoading is false', function () {
    var LoadableComponent = makeLoadable(TestComponent);
    var wrapper = shallow(React.createElement(LoadableComponent, {
      isLoading: false
    }));
    expect(wrapper.find('TestComponent').length).toEqual(1);
    expect(wrapper.find('LoadingIndicator').length).toEqual(0);
  });
  test('should pass props down to BaseComponent', function () {
    var LoadableComponent = makeLoadable(TestComponent);
    var props = {
      className: 'foo',
      hello: '123'
    };
    var wrapper = shallow(React.createElement(LoadableComponent, _extends({
      isLoading: false
    }, props)));
    expect(wrapper.find('TestComponent').prop('hello')).toEqual('123');
    expect(wrapper.find('TestComponent').prop('className')).toEqual('foo');
  });
  test('should render LoadingIndicator when isLoading is true', function () {
    var LoadableComponent = makeLoadable(TestComponent);
    var wrapper = shallow(React.createElement(LoadableComponent, {
      isLoading: true
    }));
    expect(wrapper.find('TestComponent').length).toEqual(0);
    expect(wrapper.find('LoadingIndicator').length).toEqual(1);
  });
  test('should pass loadingIndicatorPorps to LoadingIndicator', function () {
    var LoadableComponent = makeLoadable(TestComponent);
    var wrapper = shallow(React.createElement(LoadableComponent, {
      isLoading: true,
      loadingIndicatorProps: {
        className: 'foobar'
      }
    }));
    expect(wrapper.find('LoadingIndicator').prop('className')).toEqual('foobar');
  });
});