import React from 'react';
import SelectButton from '..';
describe('components/select-button/SelectButton', function () {
  test('should correctly render children in select button', function () {
    var children = 'yooo';
    var wrapper = shallow(React.createElement(SelectButton, null, children)).find('button');
    expect(wrapper.hasClass('select-button')).toBe(true);
    expect(wrapper.contains(children)).toBe(true);
    expect(wrapper.prop('disabled')).toBe(false);
  });
  test('should not show error tooltip on button by default', function () {
    var wrapper = shallow(React.createElement(SelectButton, null, "Button Text"));
    expect(wrapper).toMatchSnapshot();
  });
  test('should show error tooltip on button when error is has some value', function () {
    var wrapper = shallow(React.createElement(SelectButton, {
      error: "error"
    }, "Button Text"));
    expect(wrapper).toMatchSnapshot();
  });
});