import * as React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from '../ErrorBoundary';
import withErrorBoundary from '../withErrorBoundary';
describe('elements/withErrorBoundary', function () {
  var WrappedComponent = function WrappedComponent() {
    return React.createElement("div", null, "Test");
  };

  var origin = 'foo';
  var WithErrorBoundaryComponent = withErrorBoundary(origin)(WrappedComponent);

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(WithErrorBoundaryComponent, props));
  };

  test('should wrap the provided component with an ErrorBoundary and pass the origin as a prop', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(ErrorBoundary).exists()).toBeTruthy();
  });
});