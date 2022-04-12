/* eslint-disable no-console */
import React from 'react';
import { shallow } from 'enzyme';
import CheckboxField from '../CheckboxField';
describe('components/checkbox/CheckboxField', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(CheckboxField, props));
  };

  test.each([[true, 'value'], [false, null], [false, undefined]])('should render isChecked=%s with value=%s', function (expected, value) {
    var wrapper = getWrapper({
      field: {
        value: value,
        name: 'redVelvet',
        onBlur: function onBlur() {
          return console.log('blur');
        },
        onChange: function onChange() {
          return console.log('change');
        }
      },
      label: 'Red Velvet',
      name: 'redVelvet',
      value: 'redVelvet'
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('isChecked')).toBe(expected);
  });
  test('should render a basic Checkbox when no field property is provided', function () {
    var wrapper = getWrapper({
      label: 'Pistachio',
      name: 'pistachio'
    });
    expect(wrapper).toMatchSnapshot();
  });
});