import React from 'react';
import { shallow } from 'enzyme';
import LeftSidebarLinkCallout from '../../left-sidebar/LeftSidebarLinkCallout';
import Tooltip from '../../../components/tooltip';
import CollapsibleSidebarItem from '../CollapsibleSidebarItem';
describe('components/core/collapsible-sidebar/CollapsibleSidebarItem', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(CollapsibleSidebarItem, props));
  };

  test('render first child if expanded', function () {
    var sidebar = getWrapper({
      collapsedElement: React.createElement("span", {
        key: "1",
        className: "collapsed"
      }, "abc"),
      expandedElement: React.createElement("span", {
        key: "1",
        className: "expanded"
      }, "abc"),
      expanded: true,
      className: 'foo'
    });
    expect(sidebar.find('.expanded').exists()).toBeTruthy();
  });
  test('render second child if not expanded', function () {
    var sidebar = getWrapper({
      collapsedElement: React.createElement("span", {
        key: "1",
        className: "collapsed"
      }, "abc"),
      expandedElement: React.createElement("span", {
        key: "1",
        className: "expanded"
      }, "abc"),
      expanded: false,
      className: 'foo'
    });
    expect(sidebar.find('.collapsed').exists()).toBeTruthy();
  });
  test('should include Tooltip if tooltipMessage is passed', function () {
    var sidebar = getWrapper({
      collapsedElement: React.createElement("span", {
        key: "1",
        className: "collapsed"
      }, "abc"),
      expandedElement: React.createElement("span", {
        key: "1",
        className: "expanded"
      }, "abc"),
      expanded: false,
      className: 'foo',
      tooltipMessage: 'foobar'
    });
    expect(sidebar.find(Tooltip).exists()).toBeTruthy();
  });
  test('should render a Callout if passed', function () {
    var sidebar = getWrapper({
      collapsedElement: React.createElement("span", {
        key: "1",
        className: "collapsed"
      }, "abc"),
      expandedElement: React.createElement("span", {
        key: "1",
        className: "expanded"
      }, "abc"),
      expanded: false,
      className: 'foo',
      tooltipMessage: 'foobar',
      callout: {
        content: React.createElement("div", {
          className: "foo-wrapper"
        }),
        onClose: jest.fn()
      }
    });
    expect(sidebar.find(LeftSidebarLinkCallout).exists()).toBeTruthy();
  });
});