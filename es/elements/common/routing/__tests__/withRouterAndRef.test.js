import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import withRouterAndRef from '../withRouterAndRef';
describe('elements/common/routing/withRouterAndRef', function () {
  var TestComponent = React.forwardRef(function (_ref, ref) {
    var value = _ref.value;
    return React.createElement("div", {
      ref: ref
    }, value);
  });
  var WithRouterComponent = withRouterAndRef(TestComponent);
  test('should pass ref down to wrapped component', function () {
    var ref = React.createRef();
    var wrapper = mount(React.createElement(MemoryRouter, null, React.createElement(WithRouterComponent, {
      ref: ref,
      value: "foo"
    })));
    var referenced = wrapper.find('div').getDOMNode();
    expect(ref.current).toEqual(referenced);
    expect(referenced.innerHTML).toEqual('foo');
  });
});