import React from 'react';
import ModalActions from '../ModalActions';
describe('components/modal/ModalActions', function () {
  test('should render a div with a class and props when rendered', function () {
    var wrapper = shallow(React.createElement(ModalActions, {
      className: "foo"
    }, "child"));
    expect(wrapper.hasClass('foo')).toBeTruthy();
    expect(wrapper.hasClass('modal-actions')).toBeTruthy();
    expect(wrapper.text()).toEqual('child');
  });
});