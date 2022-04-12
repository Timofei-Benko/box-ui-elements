function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import ThumbnailCard from '../ThumbnailCard';

var getWrapper = function getWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return shallow(React.createElement(ThumbnailCard, _extends({
    thumbnail: React.createElement("div", null, "Foo Bar!"),
    title: React.createElement("div", null, "Hello World!")
  }, props)));
};

describe('components/thumbnail-card/ThumbnailCard', function () {
  test('should render', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should use additional className', function () {
    var className = 'fooBar';
    var wrapper = getWrapper({
      className: className
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should pass down actionItem, icon, and subtitle', function () {
    var icon = React.createElement("img", {
      alt: "icon"
    });
    var subtitle = React.createElement("div", null, "Subtitle!");
    var actionItem = React.createElement("button", {
      type: "button"
    }, "Click Me");
    var wrapper = getWrapper({
      actionItem: actionItem,
      icon: icon,
      subtitle: subtitle
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should apply is-highlight-applied selector if highlightOnHover is true', function () {
    var highlightOnHover = true;
    var wrapper = getWrapper({
      highlightOnHover: highlightOnHover
    });
    var container = wrapper.find('.is-highlight-applied');
    expect(container.length).toBe(1);
  });
});