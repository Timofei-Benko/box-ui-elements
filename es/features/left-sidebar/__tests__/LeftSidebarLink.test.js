function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import LeftSidebarLink from '../LeftSidebarLink';
describe('feature/left-sidebar/LeftSidebarLink', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(LeftSidebarLink, _extends({
      message: "Feed"
    }, props)));
  };

  test('should render a LinkComponent component', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should render without a tooltip wrapper', function () {
    var showTooltip = false;
    var wrapper = getWrapper({
      showTooltip: showTooltip
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should use a custom className', function () {
    var className = 'custom-className';
    var wrapper = getWrapper({
      className: className
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render the IconComponent', function () {
    var icon = React.createElement("div", {
      id: "its-an-icon"
    });
    var wrapper = getWrapper({
      icon: icon
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render BadgeElement', function () {
    var newItemBadge = React.createElement("div", {
      id: "newItemBadge"
    });
    var wrapper = getWrapper({
      newItemBadge: newItemBadge
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render BadgeCountElement', function () {
    var newItemCountBadge = React.createElement("div", {
      id: "newItemCountBadge"
    });
    var wrapper = getWrapper({
      newItemCountBadge: newItemCountBadge
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render the router link', function () {
    var routerLink = function routerLink() {
      return React.createElement("div", {
        id: "router-link-mock"
      });
    };

    var routerProps = {
      isNavLink: true
    };
    var wrapper = getWrapper({
      routerLink: routerLink,
      routerProps: routerProps
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render RemoveButton', function () {
    var onClickRemove = function onClickRemove() {};

    var wrapper = getWrapper({
      onClickRemove: onClickRemove
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('tooltip should take class from state', function () {
    var isTextOverflowed = true;
    var isScrolling = false;
    var wrapper = getWrapper({
      isScrolling: isScrolling
    });
    wrapper.setState({
      isTextOverflowed: isTextOverflowed
    });
    expect(wrapper).toMatchSnapshot();
  });
  [// selected and theme
  {
    selected: true,
    customTheme: {
      primaryColorLight: '#987654',
      secondaryColor: '#345678'
    }
  }, // not selected and theme
  {
    selected: false,
    customTheme: {
      primaryColorLight: '#987654',
      secondaryColor: '#345678'
    }
  }, // selected and no theme
  {
    selected: true,
    customTheme: {}
  }, // not selected and no theme
  {
    selected: false,
    customTheme: {}
  }].forEach(function (_ref) {
    var selected = _ref.selected,
        customTheme = _ref.customTheme;
    test('should use custom theme based on selected link and theme', function () {
      var wrapper = getWrapper({
        selected: selected,
        customTheme: customTheme
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});