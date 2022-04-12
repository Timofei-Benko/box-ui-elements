import React from 'react';
import { mount, shallow } from 'enzyme';
import withMediaQuery from '../withMediaQuery';
describe('elements/common/media-query/withMediaQuery', function () {
  var WrappedComponent = function WrappedComponent() {
    return React.createElement("div", null);
  };

  var WithMediaComponent = withMediaQuery(WrappedComponent);

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(WithMediaComponent, props));
  };

  test('wraps component with media query props', function () {
    var container = mount(React.createElement(WithMediaComponent, null));
    var containerProps = container.find('WrappedComponent').props();
    expect(containerProps.size).not.toBeNull();
    expect(containerProps.pointer).not.toBeNull();
    expect(containerProps.anyPointer).not.toBeNull();
    expect(containerProps.hover).not.toBeNull();
    expect(containerProps.anyHover).not.toBeNull();
  });
  test('should render inner component', function () {
    var props = {};
    var wrapper = getWrapper(props);
    expect(wrapper.find(WrappedComponent)).toHaveLength(1);
  });
});