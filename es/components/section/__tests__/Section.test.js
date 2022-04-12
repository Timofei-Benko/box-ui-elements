import React from 'react';
import Section from '..';
describe('components/section/Section', function () {
  test('should correctly render children in Section', function () {
    var children = React.createElement("div", null, "yea");
    var wrapper = shallow(React.createElement(Section, {
      title: "ok"
    }, children));
    expect(wrapper.hasClass('section')).toBe(true);
    expect(wrapper.find('.section-content').contains(children)).toBe(true);
  });
  test('should correctly render title in Section', function () {
    var children = React.createElement("div", null, "yea");
    var wrapper = shallow(React.createElement(Section, {
      title: "yeah buddy"
    }, children));
    expect(wrapper.find('.section-title').contains('yeah buddy')).toBe(true);
  });
  test('should correctly render description in Section', function () {
    var children = React.createElement("div", null, "yea");
    var wrapper = shallow(React.createElement(Section, {
      description: "get it",
      title: "yeah buddy"
    }, children));
    expect(wrapper.find('.section-description').contains('get it')).toBe(true);
  });
});