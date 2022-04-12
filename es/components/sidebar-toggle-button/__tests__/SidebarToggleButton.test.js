import React from 'react';
import SidebarToggleButton from '..';
describe('components/sidebar-toggle-button/SidebarToggleButton', function () {
  test('should render correctly as open', function () {
    var wrapper = mount(React.createElement(SidebarToggleButton, {
      isOpen: true
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly as closed', function () {
    var wrapper = mount(React.createElement(SidebarToggleButton, {
      isOpen: false
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should have the proper class when it is collapsed', function () {
    var wrapper = mount(React.createElement(SidebarToggleButton, {
      isOpen: false
    }));
    expect(wrapper.find('PlainButton').hasClass('bdl-is-collapsed')).toBeTruthy();
  });
  test('should render correctly as left oriented toggle when open', function () {
    var wrapper = mount(React.createElement(SidebarToggleButton, {
      direction: "left",
      isOpen: true
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly as left oriented toggle when closed', function () {
    var wrapper = mount(React.createElement(SidebarToggleButton, {
      direction: "left",
      isOpen: false
    }));
    expect(wrapper).toMatchSnapshot();
  });
});