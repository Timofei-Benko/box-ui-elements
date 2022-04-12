import * as React from 'react';
import noop from 'lodash/noop';
import LeftSidebar from '../LeftSidebar';
describe('feature/left-sidebar/LeftSidebar', function () {
  test('should render with default properties intact', function () {
    var wrapper = shallow(React.createElement(LeftSidebar, null));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render one menu item with appropriate properties passed', function () {
    var oneMenuItem = [{
      id: 'all-files',
      message: 'All Files',
      htmlAttributes: {
        href: '/folder/0'
      },
      routerLink: undefined,
      routerProps: undefined,
      showTooltip: true
    }];
    var wrapper = shallow(React.createElement(LeftSidebar, {
      menuItems: oneMenuItem
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render nested menu items with missing properties passed', function () {
    var nestedMenuItems = [{
      id: 'all-files',
      message: 'All Files',
      htmlAttributes: {
        href: '/folder/0'
      },
      routerLink: undefined,
      routerProps: undefined,
      showTooltip: true,
      menuItems: [{
        id: 'recents',
        message: 'Recents',
        htmlAttributes: {
          href: '/recents'
        },
        showTooltip: true
      }]
    }];
    var wrapper = shallow(React.createElement(LeftSidebar, {
      menuItems: nestedMenuItems
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render collapsible nested menu items with appropriate properties passed', function () {
    var nestedMenuItems = [{
      id: 'all-files',
      message: 'All Files',
      htmlAttributes: {
        href: '/folder/0'
      },
      routerLink: undefined,
      routerProps: undefined,
      showTooltip: true,
      onToggleCollapse: noop,
      menuItems: [{
        id: 'recents',
        message: 'Recents',
        htmlAttributes: {
          href: '/recents'
        },
        showTooltip: true
      }]
    }];
    var wrapper = shallow(React.createElement(LeftSidebar, {
      menuItems: nestedMenuItems
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render placeholder inside nested menu items with appropriate properties passed', function () {
    var nestedMenuItems = [{
      id: 'all-files',
      message: 'All Files',
      htmlAttributes: {
        href: '/folder/0'
      },
      routerLink: undefined,
      routerProps: undefined,
      showTooltip: true,
      onToggleCollapse: noop,
      placeholder: 'This is a simple placeholder text',
      menuItems: []
    }];
    var wrapper = shallow(React.createElement(LeftSidebar, {
      menuItems: nestedMenuItems
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render non-collapsible nested menu items with appropriate properties passed', function () {
    var nestedMenuItems = [{
      id: 'all-files',
      message: 'All Files',
      htmlAttributes: {
        href: '/folder/0'
      },
      routerLink: undefined,
      routerProps: undefined,
      showTooltip: true,
      menuItems: [{
        id: 'recents',
        message: 'Recents',
        htmlAttributes: {
          href: '/recents'
        },
        showTooltip: true
      }]
    }];
    var wrapper = shallow(React.createElement(LeftSidebar, {
      menuItems: nestedMenuItems
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should pass in custom sidebar properties as needed', function () {
    var oneMenuItem = [{
      id: 'all-files',
      message: 'All Files',
      htmlAttributes: {
        href: '/folder/0'
      },
      routerLink: undefined,
      routerProps: undefined,
      selected: true,
      showTooltip: true
    }];
    var leftSidebarProps = {
      customTheme: {
        isLight: 'yes',
        primaryColorLight: '#f0f0f0',
        // selected menu item background color
        primaryColorLighter: '#123',
        primaryColorDark: '#123',
        primaryColorDarker: '#123',
        contrastColor: '#123',
        secondaryColor: '#123' // icons, selected menu item border, selected menu item icon

      },
      htmlAttributes: {
        'data-resin-component': 'leftnav'
      },
      copyrightFooterProps: {
        htmlAttributes: {
          href: '/test-url'
        }
      }
    };
    var wrapper = shallow(React.createElement(LeftSidebar, {
      leftSidebarProps: leftSidebarProps,
      menuItems: oneMenuItem
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should pass icon components appropriately based on properties', function () {
    var iconExampleComponent = function iconExampleComponent() {
      return React.createElement("div", {
        id: "this-is-icon"
      });
    };

    var oneMenuItem = [{
      iconComponent: iconExampleComponent,
      id: 'all-files',
      message: 'All Files',
      htmlAttributes: {
        href: '/folder/0'
      },
      routerLink: undefined,
      routerProps: undefined,
      showTooltip: true,
      newItemBadge: true,
      newItemCountBadge: 3
    }];
    var wrapper = shallow(React.createElement(LeftSidebar, {
      menuItems: oneMenuItem
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should pass icon elements appropriately based on properties', function () {
    var iconElement = React.createElement("div", {
      id: "this-is-icon"
    });
    var oneMenuItem = [{
      iconElement: iconElement,
      id: 'all-files',
      message: 'All Files',
      htmlAttributes: {
        href: '/folder/0'
      },
      routerLink: undefined,
      routerProps: undefined,
      showTooltip: true,
      newItemBadge: true,
      newItemCountBadge: 3
    }];
    var wrapper = shallow(React.createElement(LeftSidebar, {
      menuItems: oneMenuItem
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should pass badge elements appropriately based on properties', function () {
    var oneMenuItem = [{
      id: 'all-files',
      message: 'All Files',
      htmlAttributes: {
        href: '/folder/0'
      },
      routerLink: undefined,
      routerProps: undefined,
      showTooltip: true,
      newItemBadge: true
    }];
    var wrapper = shallow(React.createElement(LeftSidebar, {
      menuItems: oneMenuItem
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render instant login component', function () {
    var leftSidebarProps = {
      instantLoginProps: {
        hrefAttributes: {
          href: '/master'
        },
        message: 'message',
        showTooltip: false
      },
      isInstantLoggedIn: true
    };
    var oneMenuItem = [{
      id: 'all-files',
      message: 'All Files',
      htmlAttributes: {
        href: '/folder/0'
      },
      routerLink: undefined,
      routerProps: undefined,
      showChildIcons: false,
      showTooltip: true
    }];
    var wrapper = shallow(React.createElement(LeftSidebar, {
      leftSidebarProps: leftSidebarProps,
      menuItems: oneMenuItem
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render FooterIndicator if indicatorText is set', function () {
    var leftSidebarProps = {
      indicatorText: 'abcde'
    };
    var wrapper = shallow(React.createElement(LeftSidebar, {
      leftSidebarProps: leftSidebarProps
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should use custom render for menu item if provided', function () {
    var oneMenuItem = [{
      navLinkRenderer: function navLinkRenderer() {
        return React.createElement("h1", null, "Custom Link");
      },
      id: 'all-files',
      message: 'All Files',
      htmlAttributes: {
        href: '/folder/0'
      },
      routerLink: undefined,
      routerProps: undefined,
      showTooltip: true
    }];
    var wrapper = shallow(React.createElement(LeftSidebar, {
      menuItems: oneMenuItem
    }));
    expect(wrapper.exists('h1')).toBeTruthy();
  });
  describe('checkAndChangeScrollShadows()', function () {
    [// isn't scrollable
    {
      isScrollableAbove: false,
      isScrollableBelow: false
    }, // only scrollable above
    {
      isScrollableAbove: true,
      isScrollableBelow: false
    }, // only scrollable below
    {
      isScrollableAbove: false,
      isScrollableBelow: true
    }, // scrollable above and below
    {
      isScrollableAbove: true,
      isScrollableBelow: true
    }].forEach(function (_ref) {
      var isScrollableAbove = _ref.isScrollableAbove,
          isScrollableBelow = _ref.isScrollableBelow;
      test('should calculate and set overflow state', function () {
        var leftSidebarProps = {
          instantLoginProps: {
            hrefAttributes: {
              href: '/master'
            },
            message: 'message',
            showTooltip: false
          },
          isInstantLoggedIn: true
        };
        var oneMenuItem = [{
          id: 'all-files',
          message: 'All Files',
          htmlAttributes: {
            href: '/folder/0'
          },
          routerLink: undefined,
          routerProps: undefined,
          showChildIcons: false,
          showTooltip: true
        }];
        var wrapper = shallow(React.createElement(LeftSidebar, {
          leftSidebarProps: leftSidebarProps,
          menuItems: oneMenuItem
        }), {
          disableLifecycleMethods: true
        });
        var instance = wrapper.instance();
        var calculateOverflowSpy = jest.fn().mockReturnValue({
          isScrollableBelow: isScrollableBelow,
          isScrollableAbove: isScrollableAbove
        });
        instance.calculateOverflow = calculateOverflowSpy;
        instance.elScrollableList = true;
        instance.checkAndChangeScrollShadows();
        expect(wrapper.state().isScrollableAbove).toBe(isScrollableAbove);
        expect(wrapper.state().isScrollableBelow).toBe(isScrollableBelow);
      });
    });
  });
  describe('turnOffScrollingState()', function () {
    test('should calculate and set overflow state', function () {
      var leftSidebarProps = {
        instantLoginProps: {
          hrefAttributes: {
            href: '/master'
          },
          message: 'message',
          showTooltip: false
        },
        isInstantLoggedIn: true
      };
      var oneMenuItem = [{
        id: 'all-files',
        message: 'All Files',
        htmlAttributes: {
          href: '/folder/0'
        },
        routerLink: undefined,
        routerProps: undefined,
        showChildIcons: false,
        showTooltip: true
      }];
      var wrapper = shallow(React.createElement(LeftSidebar, {
        leftSidebarProps: leftSidebarProps,
        menuItems: oneMenuItem
      }), {
        disableLifecycleMethods: true
      });
      wrapper.setState({
        isScrolling: true
      });
      var instance = wrapper.instance();
      instance.turnOffScrollingState();
      expect(wrapper.state('isScrolling')).toEqual(false);
    });
  });
});