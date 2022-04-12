import React from 'react';
import { shallow } from 'enzyme';
import PlainButton from '../PlainButton';
describe('components/plain-button/PlainButton', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(PlainButton, props));
  };

  test('should correctly render children in Plainbutton', function () {
    var children = 'yooo';
    var wrapper = shallow(React.createElement(PlainButton, null, children));
    expect(wrapper.hasClass('btn-plain')).toBe(true);
    expect(wrapper.text()).toEqual(children);
  });
  test('should render component correctly and trigger onClick when isDisabled is false', function () {
    var onClick = jest.fn();
    var wrapper = getWrapper({
      onClick: onClick
    });
    wrapper.simulate('click');
    expect(wrapper).toMatchSnapshot();
    expect(onClick).toHaveBeenCalled();
  });
  test('should render component correctly and prevent onClick when isDisabled is true', function () {
    var preventDefault = jest.fn();
    var stopPropagation = jest.fn();
    var onClick = jest.fn();
    var wrapper = getWrapper({
      isDisabled: true,
      onClick: onClick
    });
    wrapper.simulate('click', {
      preventDefault: preventDefault,
      stopPropagation: stopPropagation
    });
    expect(wrapper).toMatchSnapshot();
    expect(preventDefault).toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
});