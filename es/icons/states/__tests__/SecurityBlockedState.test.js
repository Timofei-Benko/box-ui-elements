import * as React from 'react';
import { shallow } from 'enzyme';
import SecurityBlockedState from '../SecurityBlockedState';
describe('icons/states/SecurityBlockedState', function () {
  test('should correctly render default icon with default colors', function () {
    var wrapper = shallow(React.createElement(SecurityBlockedState, null));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified color', function () {
    var wrapper = shallow(React.createElement(SecurityBlockedState, {
      primaryColor: "#fcfcfc",
      secondaryColor: "#eee"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified width and height and default viewBox value', function () {
    var wrapper = shallow(React.createElement(SecurityBlockedState, {
      height: 131,
      width: 200
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with title', function () {
    var wrapper = shallow(React.createElement(SecurityBlockedState, {
      title: "abcde"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with custom class name', function () {
    var wrapper = shallow(React.createElement(SecurityBlockedState, {
      className: "empty"
    }));
    expect(wrapper).toMatchSnapshot();
  });
});