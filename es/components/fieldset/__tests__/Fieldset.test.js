import React from 'react';
import { shallow } from 'enzyme';
import Fieldset from '../Fieldset';
describe('components/fieldset/Fieldset', function () {
  test('should render a fieldset with a legend', function () {
    var wrapper = shallow(React.createElement(Fieldset, {
      title: "hello"
    }, React.createElement("div", {
      className: "child"
    })));
    expect(wrapper.is('fieldset')).toBe(true);
    expect(wrapper.find('legend').text()).toEqual('hello');
    expect(wrapper.find('.child').length).toBe(1);
  });
  test('should render fieldset with specified class', function () {
    var wrapper = shallow(React.createElement(Fieldset, {
      className: "test",
      title: "hello"
    }, React.createElement("div", {
      className: "child"
    })));
    expect(wrapper.hasClass('fieldset')).toBe(true);
    expect(wrapper.hasClass('test')).toBe(true);
  });
});