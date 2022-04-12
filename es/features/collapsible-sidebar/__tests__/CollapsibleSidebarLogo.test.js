import React from 'react';
import { mountConnected } from '../../../test-utils/enzyme';
import CollapsibleSidebarLogo from '../CollapsibleSidebarLogo';
describe('components/core/collapsible-sidebar/CollapsibleSidebar', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return mountConnected(React.createElement(CollapsibleSidebarLogo, props));
  };

  test('render', function () {
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
    expect(sidebar).toMatchSnapshot();
  });
  test('render', function () {
    var sidebar = getWrapper({
      canEndTrial: true
    });
    expect(sidebar).toMatchSnapshot();
  });
  test('render toggle button with buttonProps thats passed', function () {
    var someValue = 'someValue';
    var sidebar = getWrapper({
      buttonProps: {
        'data-resin-target': someValue
      },
      expanded: true
    });
    var componentProp = sidebar.find('CollapsibleSidebarItem');
    expect(componentProp.find('PlainButton').prop('data-resin-target')).toBe(someValue);
  });
  test('render LinkBase element with linkUrl thats passed', function () {
    var someUrl = '/some/url';
    var sidebar = getWrapper({
      expanded: true,
      linkProps: {
        href: someUrl
      }
    });
    var componentProp = sidebar.find('CollapsibleSidebarItem');
    expect(componentProp.find('LinkBase').prop('href')).toBe(someUrl);
  });
  test('render LinkBase element with linkHtmlAttributes thats passed', function () {
    var someValue = 'someValue';
    var sidebar = getWrapper({
      expanded: true,
      linkProps: {
        someprop: someValue
      }
    });
    var componentProp = sidebar.find('CollapsibleSidebarItem');
    expect(componentProp.find('LinkBase').prop('someprop')).toBe(someValue);
  });
});