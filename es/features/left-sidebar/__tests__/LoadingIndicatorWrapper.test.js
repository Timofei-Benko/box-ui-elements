import * as React from 'react';
import LeftSidebarDropWrapper from '../LeftSidebarDropWrapper';
describe('features/left-sidebar/LeftSidebarDropWrapper', function () {
  test('should render with default properties intact', function () {
    var child = React.createElement("div", null, "child");
    var wrapper = shallow(React.createElement(LeftSidebarDropWrapper, {
      isDragging: "false"
    }, child));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render dragging veil properly when specificed', function () {
    var child = React.createElement("div", null, "child");
    var wrapper = shallow(React.createElement(LeftSidebarDropWrapper, {
      isDragging: "true"
    }, child));
    expect(wrapper).toMatchSnapshot();
  });
  test('should allow custom classnames on wrapper', function () {
    var child = React.createElement("div", null, "child");
    var wrapper = shallow(React.createElement(LeftSidebarDropWrapper, {
      className: "test-name",
      isDragging: "true"
    }, child));
    expect(wrapper).toMatchSnapshot();
  });
  test('should pass thru any rest properties', function () {
    var child = React.createElement("div", null, "child");
    var wrapper = shallow(React.createElement(LeftSidebarDropWrapper, {
      className: "test-name",
      "data-resin-target": "test",
      isDragging: "true"
    }, child));
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render drag target when specificed', function () {
    var child = React.createElement("div", null, "child");
    var wrapper = shallow(React.createElement(LeftSidebarDropWrapper, {
      isDragging: "false"
    }, child));
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render drag target or drag text when specificed', function () {
    var child = React.createElement("div", null, "child");
    var wrapper = shallow(React.createElement(LeftSidebarDropWrapper, {
      isDragging: "false",
      message: "dragging to me"
    }, child));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render drag target and message when specificed', function () {
    var child = React.createElement("div", null, "child");
    var wrapper = shallow(React.createElement(LeftSidebarDropWrapper, {
      isDragging: "true",
      message: "dragging to me"
    }, child));
    expect(wrapper).toMatchSnapshot();
  });
});