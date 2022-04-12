import * as React from 'react';
import { shallow } from 'enzyme';
import SandboxesEmptyState from '../SandboxesEmptyState';
describe('icons/states/SandboxesEmptyState', function () {
  test('should correctly render default icon with default colors', function () {
    var wrapper = shallow(React.createElement(SandboxesEmptyState, null));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified color', function () {
    var wrapper = shallow(React.createElement(SandboxesEmptyState, {
      primaryColor: "#fcfcfc",
      secondaryColor: "#eee"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified width and height and default viewBox value', function () {
    var wrapper = shallow(React.createElement(SandboxesEmptyState, {
      height: 131,
      width: 200
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with title', function () {
    var wrapper = shallow(React.createElement(SandboxesEmptyState, {
      title: "abcde"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with custom class name', function () {
    var wrapper = shallow(React.createElement(SandboxesEmptyState, {
      className: "empty"
    }));
    expect(wrapper).toMatchSnapshot();
  });
});