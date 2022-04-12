import * as React from 'react';
import ScrollWrapper from '../ScrollWrapper';
describe('components/scroll-wrapper/ScrollWrapper', function () {
  test('should render with default properties intact', function () {
    var wrapper = shallow(React.createElement(ScrollWrapper, null));
    expect(wrapper).toMatchSnapshot();
  });
  test('should respect custom class names passed in', function () {
    var wrapper = shallow(React.createElement(ScrollWrapper, {
      className: "test-classname"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render children as specified', function () {
    var wrapper = mount(React.createElement(ScrollWrapper, null, React.createElement("p", null, "lorem ipsum dolor sit amet")));
    expect(wrapper).toMatchSnapshot();
  });
});