import React from 'react';
import { shallow } from 'enzyme';
import Header from '..';
describe('components/header/Header', function () {
  var MockChildren = function MockChildren() {
    return React.createElement("div", null);
  };

  test('should correctly render children in Header', function () {
    var wrapper = shallow(React.createElement(Header, null, React.createElement(MockChildren, null)));
    expect(wrapper.type()).toEqual('header');
    expect(wrapper.hasClass('header')).toBe(true);
    expect(wrapper.hasClass('is-fixed')).toBe(false);
    expect(wrapper.find(MockChildren).length).toEqual(1);
  });
  test('should correctly set backgroundColor style in Header when color is passed down', function () {
    var wrapper = shallow(React.createElement(Header, {
      color: "#DDD"
    }, React.createElement(MockChildren, null)));
    expect(wrapper.prop('style')).toEqual({
      backgroundColor: '#DDD'
    });
  });
  test('should correctly render fixed Header when fixed is true', function () {
    var wrapper = shallow(React.createElement(Header, {
      fixed: true
    }, React.createElement(MockChildren, null)));
    expect(wrapper.hasClass('is-fixed')).toBe(true);
  });
  test('should correctly render classNames Header when passed down', function () {
    var wrapper = shallow(React.createElement(Header, {
      className: "some-class"
    }, React.createElement(MockChildren, null)));
    expect(wrapper.hasClass('some-class')).toBe(true);
  });
  test('should correctly render header custom attributes when specified', function () {
    var wrapper = shallow(React.createElement(Header, {
      "data-resin-component": "header"
    }, React.createElement(MockChildren, null)));
    expect(wrapper.find('header').prop('data-resin-component')).toEqual('header');
  });
});