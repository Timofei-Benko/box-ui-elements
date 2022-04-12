import React from 'react';
import { shallow } from 'enzyme';
import Internationalize from '../Internationalize';
var messages = {};
describe('elements/Internationalize', function () {
  test('should contains IntlProvider with correct props', function () {
    var wrapper = shallow(React.createElement(Internationalize, {
      language: "fr-CA",
      messages: messages
    }, React.createElement("div", {
      className: "content"
    })));
    var intlProvider = wrapper.find('IntlProvider');
    expect(intlProvider.length).toBe(1);
    expect(intlProvider.prop('locale')).toBe('fr-CA');
    expect(intlProvider.prop('messages')).toBe(messages);
  });
  test('should render the children component when initialized', function () {
    var wrapper = shallow(React.createElement(Internationalize, null, React.createElement("div", {
      className: "content"
    })));
    var intlProvider = wrapper.find('IntlProvider');
    expect(intlProvider.length).toBe(0);
    expect(wrapper.contains(React.createElement("div", {
      className: "content"
    }))).toBeTruthy();
  });
});