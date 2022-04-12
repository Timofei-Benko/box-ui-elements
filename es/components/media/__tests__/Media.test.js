import React from 'react';
import { mount, shallow } from 'enzyme';
import Media from '../Media';
jest.mock('../../../icons/general/IconEllipsis', function () {
  return function () {
    return React.createElement("div", {
      "data-test-id": "icon-ellipsis"
    });
  };
});
describe('components/Media', function () {
  test('compound component', function () {
    var title = React.createElement("div", null, React.createElement("b", null, "Yo Yo Ma"), " commented on this file");
    var content = React.createElement("div", null, "Please review the notes");
    var compoundComponent = React.createElement(Media, null, React.createElement(Media.Figure, null, React.createElement("img", {
      src: "",
      alt: "some img"
    })), React.createElement(Media.Body, null, React.createElement(Media.Menu, null, React.createElement("div", null, "foo")), title, content));
    var wrapper = mount(compoundComponent);
    expect(wrapper.render()).toMatchSnapshot();
  });
  test('"as" prop changes Media root element', function () {
    var wrapper = shallow(React.createElement(Media, null, React.createElement(Media.Figure, null, "foo"), React.createElement(Media.Body, null, "bar")));
    var wrapperAs = shallow(React.createElement(Media, {
      as: "li"
    }, React.createElement(Media.Figure, null, "foo"), React.createElement(Media.Body, null, "bar")));
    expect(wrapper.is('div')).toBe(true);
    expect(wrapperAs.is('li')).toBe(true);
  });
});