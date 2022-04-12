import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from '..';
describe('components/checkbox/Checkbox', function () {
  var wrapper;
  var onChange;
  beforeEach(function () {
    onChange = jest.fn();
    wrapper = shallow(React.createElement(Checkbox, {
      id: "1",
      label: "Check things",
      name: "name",
      onChange: onChange
    }));
  });
  test('should correctly render default component', function () {
    expect(wrapper.find('.checkbox-container').length).toBeTruthy();
    expect(wrapper.find('input').prop('id')).toEqual('1');
    expect(wrapper.find('input').prop('name')).toEqual('name');
    expect(wrapper.find('input').prop('type')).toEqual('checkbox');
    expect(wrapper.find('.checkbox-pointer-target').length).toBe(1);
    expect(wrapper.find('label').text()).toEqual('Check things');
    expect(wrapper.find('input').prop('checked')).toBeFalsy();
    expect(wrapper.find('.label').length).toBe(0);
  });
  test('should generate an ID if one is not passed in', function () {
    wrapper.setProps({
      id: undefined
    });
    expect(wrapper.find('input').prop('id')).toBeDefined();
  });
  test('should pass rest of props to input', function () {
    wrapper.setProps({
      'data-resin-target': 'checkthis'
    });
    expect(wrapper.find('input').prop('data-resin-target')).toEqual('checkthis');
  });
  test('should render tooltip when specified', function () {
    var tooltip = 'Help me';
    wrapper.setProps({
      tooltip: tooltip
    });
    var tooltipIcon = wrapper.find('CheckboxTooltip');
    expect(tooltipIcon.length).toBeTruthy();
    expect(tooltipIcon.prop('tooltip')).toEqual(tooltip);
  });
  test('should render subsection when passed through props', function () {
    var subsection = React.createElement("div", {
      className: "123"
    });
    wrapper.setProps({
      subsection: subsection
    });
    expect(wrapper.find('.checkbox-subsection').length).toBe(1);
  });
  test('should be checked on when isChecked is true', function () {
    wrapper.setProps({
      isChecked: true
    });
    expect(wrapper.find('input').prop('checked')).toBeTruthy();
  });
  test('should call onChange callback when onchange triggers', function () {
    var event = {
      target: {
        checked: true
      }
    };
    wrapper.find('input').simulate('change', event);
    expect(onChange).toBeCalledWith(event);
  });
  test('should render a hidden label when hideLabel is specified', function () {
    wrapper.setProps({
      hideLabel: true
    });
    var label = wrapper.find('.accessibility-hidden');
    expect(label.length).toBeTruthy();
    expect(label.text()).toEqual('Check things');
  });
  test('should render field label when specified', function () {
    var fieldLabel = 'Label';
    wrapper.setProps({
      fieldLabel: fieldLabel
    });
    var label = wrapper.find('.label');
    expect(label.length).toBe(1);
    expect(label.contains(fieldLabel)).toBe(true);
  });
});