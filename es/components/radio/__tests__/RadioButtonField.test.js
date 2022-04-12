/* eslint-disable no-console */
import React from 'react';
import { shallow } from 'enzyme';
import RadioButtonField from '../RadioButtonField';
describe('components/radio/RadioButtonField', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(RadioButtonField, props));
  };

  test.each([[true, 'redVelvet'], [false, 'chocolate'], [false, 'pumpkin'], [false, null], [false, undefined]])('should render isSelected=%s with value=%s', function (expected, value) {
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
    expect(wrapper.prop('isSelected')).toBe(expected);
  });
  test('should render a basic RadioButton when no field property is provided', function () {
    var wrapper = getWrapper({
      label: 'Pistachio',
      value: 'pistachio'
    });
    expect(wrapper).toMatchSnapshot();
  });
});