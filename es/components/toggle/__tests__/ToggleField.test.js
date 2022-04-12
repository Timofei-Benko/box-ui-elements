import React from 'react';
import ToggleField from '../ToggleField';
describe('components/toggle/ToggleField', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ToggleField, props));
  };

  test.each([[true, 'value'], [false, null], [false, undefined]])('should render isOn=%s with value=%s', function (expected, value) {
    var wrapper = getWrapper({
      field: {
        value: value,
        name: 'toggle',
        onBlur: 'onblur',
        onChange: 'onchange'
      },
      label: 'Enter things'
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('isOn')).toBe(expected);
  });
});