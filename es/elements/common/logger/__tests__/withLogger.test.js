import React from 'react';
import { shallow } from 'enzyme';
import withLogger from '../withLogger';
describe('elements/common/logger/withLogger', function () {
  var ORIGIN = 'foo';

  var WrappedComponent = function WrappedComponent() {
    return React.createElement("div", null);
  };

  var WithLoggerComponent = withLogger(ORIGIN)(WrappedComponent);

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(WithLoggerComponent, props));
  };

  test('should wrap the provided component with an ErrorBoundary and pass the origin as a prop', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Logger').exists()).toBeTruthy();
  });
});