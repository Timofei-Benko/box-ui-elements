function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import Toggle from '..';
describe('components/toggle/Toggle', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(Toggle, _extends({
      label: "Enter things",
      name: "toggle",
      onChange: function onChange() {}
    }, props)));
  };

  test('should correctly render default component', function () {
    var wrapper = getWrapper();
    expect(wrapper.hasClass('toggle-container')).toBeTruthy();
    expect(wrapper.hasClass('is-toggle-right-aligned')).toBeFalsy();
    expect(wrapper.find('input').prop('checked')).toBeFalsy();
    expect(wrapper.find('.toggle-simple-description').length).toBeFalsy();
  });
  test('should put className on the container when className is passed in', function () {
    var className = 'foobar';
    var wrapper = getWrapper();
    wrapper.setProps({
      className: className
    });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });
  test('should correctly render default component with on state', function () {
    var wrapper = getWrapper();
    wrapper.setProps({
      isOn: true
    });
    expect(wrapper.find('input').prop('checked')).toBeTruthy();
  });
  test('should call onChange when input changes', function () {
    var onChange = sinon.spy();
    var wrapper = getWrapper({
      onChange: onChange
    });
    var event = {
      target: {
        checked: true
      }
    };
    wrapper.find('input').simulate('change', event);
    sinon.assert.calledOnce(onChange);
    sinon.assert.calledWithMatch(onChange, event);
  });
  test('should render a description div when description passed in', function () {
    var wrapper = getWrapper();
    var description = 'foobar';
    wrapper.setProps({
      description: description
    });
    expect(wrapper.find('.toggle-simple-description').text()).toEqual(description);
  });
  test('should render properly when isToggleRightAligned prop is true', function () {
    var wrapper = getWrapper({
      isToggleRightAligned: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render properly when random props are passed in', function () {
    var wrapper = getWrapper({
      'data-resin-target': 'toggle'
    });
    expect(wrapper).toMatchSnapshot();
  });
});