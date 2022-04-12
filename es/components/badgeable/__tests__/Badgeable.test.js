import React from 'react';
import { shallow } from 'enzyme';
import Badgeable from '../Badgeable';
describe('components/badgeable/Badgeable', function () {
  test('should correctly render children in a badgeable wrapper without badges', function () {
    var children = 'some text to render';
    var wrapper = shallow(React.createElement(Badgeable, null, children));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render badges to any corner when given an element', function () {
    var wrapper = shallow(React.createElement(Badgeable, {
      bottomLeft: React.createElement("p", null, "bottom left"),
      bottomRight: React.createElement("p", null, "bottom right"),
      className: "custom-class",
      topLeft: React.createElement("p", null, "top left"),
      topRight: React.createElement("p", null, "top right")
    }, React.createElement("div", null, "Test")));
    expect(wrapper).toMatchSnapshot();
  });
});