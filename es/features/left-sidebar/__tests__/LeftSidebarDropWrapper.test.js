import React from 'react';
import LeftSidebarDropWrapper from '../LeftSidebarDropWrapper';
describe('feature/left-sidebar/LeftSidebarDropWrapper', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(LeftSidebarDropWrapper, props, React.createElement("div", null)));
  };

  describe('render', function () {
    test('should render a LeftSidebarDropWrapper component', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    test('should not render drop zone if it is not hovered and showDropZoneOnHover is true ', function () {
      var wrapper = getWrapper({
        showDropZoneOnHover: true,
        isDragging: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render drop zone if it is hovered and showDropZoneOnHover is true ', function () {
      var wrapper = getWrapper({
        showDropZoneOnHover: true,
        isDragging: true
      });
      wrapper.setState({
        dropZoneHover: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should set dropZoneHover on mouse enter', function () {
      var wrapper = getWrapper({
        showDropZoneOnHover: true,
        isDragging: true
      });
      var previousDropZoneHover = wrapper.state().dropZoneHover;
      var dropZone = wrapper.find('.left-sidebar-drop-wrapper');
      dropZone.simulate('mouseEnter');
      expect(previousDropZoneHover).toBe(false);
      expect(wrapper.state().dropZoneHover).toBe(true);
    });
    test('should set dropZoneHover to false on mouse leave', function () {
      var wrapper = getWrapper({
        showDropZoneOnHover: true,
        isDragging: true
      });
      var dropZone = wrapper.find('.left-sidebar-drop-wrapper');
      wrapper.setState({
        dropZoneHover: true
      });
      dropZone.simulate('mouseLeave');
      expect(wrapper.state().dropZoneHover).toBe(false);
    });
  });
  describe('componentDidUpdate', function () {
    test('should set dropZoneHover state to false when dragging stops without mouseleave', function () {
      var wrapper = getWrapper({
        showDropZoneOnHover: true,
        isDragging: true
      });
      wrapper.setState({
        dropZoneHover: true
      });
      wrapper.setProps({
        isDragging: false
      });
      expect(wrapper.state().dropZoneHover).toBe(false);
    });
  });
});