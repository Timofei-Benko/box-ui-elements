import React from 'react';
import { render } from 'enzyme';
import InlineNotice from '..';
describe('components/inline-notice/InlineNotice', function () {
  test('should correctly render', function () {
    var children = 'this is a message to put in the notice';
    var wrapper = shallow(React.createElement(InlineNotice, null, children));
    expect(wrapper.hasClass('inline-alert')).toBe(true);
    expect(wrapper.hasClass('inline-alert-visible')).toBe(true);
    expect(wrapper.text()).toEqual(children);
  });
  test('should render with title prop if provided', function () {
    var children = 'this is a message to put in the notice';
    var title = 'this is the title';
    var wrapper = shallow(React.createElement(InlineNotice, {
      title: title
    }, children));
    expect(wrapper.find('strong').text()).toEqual(title);
    expect(wrapper.children().find('div').text()).toEqual(children);
  });
  test('should have a default type', function () {
    var children = 'this is a message to put in the notice';
    var wrapper = shallow(React.createElement(InlineNotice, null, children));
    expect(wrapper.hasClass('inline-alert-warning')).toBe(true);
  });
  test('should set the correct class based on type', function () {
    var children = 'this is a message to put in the notice';
    var wrapper = shallow(React.createElement(InlineNotice, {
      type: "error"
    }, children));
    expect(wrapper.hasClass('inline-alert-error')).toBe(true);
  });
  test('should have the given class', function () {
    var children = 'this is a message to put in the notice';
    var wrapper = shallow(React.createElement(InlineNotice, {
      className: "testClass"
    }, children));
    expect(wrapper.hasClass('testClass')).toBe(true);
  });
  test('should pass other props to div', function () {
    var label = 'an error occured';
    var role = 'alert';
    var wrapper = render(React.createElement(InlineNotice, {
      role: role,
      "aria-label": label
    }, "a message"));
    expect(wrapper.prop('role')).toBe(role);
    expect(wrapper.prop('aria-label')).toBe(label);
  });
});