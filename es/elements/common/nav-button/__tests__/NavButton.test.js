import React from 'react';
import { mount, render } from 'enzyme';
import { MemoryRouter, Router } from 'react-router-dom';
import NavButton from '..';
describe('elements/common/nav-button/NavButton', function () {
  describe('when active', function () {
    test('applies its default activeClassName', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity']
      }, React.createElement(NavButton, {
        to: "/activity"
      }, "Activity")));
      expect(button.hasClass('bdl-is-active')).toBe(true);
    });
    test('applies a custom activeClassName instead of the default', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity']
      }, React.createElement(NavButton, {
        to: "/activity",
        activeClassName: "bdl-is-selected"
      }, "Activity")));
      expect(button.hasClass('bdl-is-active')).toBe(false);
      expect(button.hasClass('bdl-is-selected')).toBe(true);
    });
  });
  describe('when inactive', function () {
    test('does not apply its default activeClassName', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity']
      }, React.createElement(NavButton, {
        to: "/details"
      }, "Details")));
      expect(button.hasClass('bdl-is-active')).toBe(false);
    });
    test('does not apply its activeClassName', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity']
      }, React.createElement(NavButton, {
        to: "/details",
        activeClassName: "bdl-is-selected"
      }, "Details")));
      expect(button.hasClass('bdl-is-active')).toBe(false);
      expect(button.hasClass('bdl-is-selected')).toBe(false);
    });
  });
  describe('exact', function () {
    test('does not do exact matching by default', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity/versions']
      }, React.createElement(NavButton, {
        to: "/activity"
      }, "Activity")));
      expect(button.hasClass('bdl-is-active')).toBe(true);
    });
    test('applies default activeClassName for exact matches', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity']
      }, React.createElement(NavButton, {
        exact: true,
        to: "/activity"
      }, "Activity")));
      expect(button.hasClass('bdl-is-active')).toBe(true);
    });
    test('does not apply default activeClassName for partial matches', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity/versions']
      }, React.createElement(NavButton, {
        exact: true,
        to: "/activity"
      }, "Activity")));
      expect(button.hasClass('bdl-is-active')).toBe(false);
    });
    test('applies custom activeClassName for exact matches', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity']
      }, React.createElement(NavButton, {
        exact: true,
        to: "/activity",
        activeClassName: "bdl-is-selected"
      }, "Activity")));
      expect(button.hasClass('bdl-is-selected')).toBe(true);
    });
    test('applies custom activeClassName for partial matches', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity/versions']
      }, React.createElement(NavButton, {
        exact: true,
        to: "/activity",
        activeClassName: "bdl-is-selected"
      }, "Activity")));
      expect(button.hasClass('bdl-is-selected')).toBe(false);
    });
  });
  describe('isActive', function () {
    test('overrides the default matching behavior and sets the active class name', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity']
      }, React.createElement(NavButton, {
        isActive: function isActive() {
          return true;
        },
        to: "/skills"
      }, "Skills")));
      expect(button.hasClass('bdl-is-active')).toBe(true);
    });
  });
  describe('strict', function () {
    test('does not do strict matching by default', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity']
      }, React.createElement(NavButton, {
        to: "/activity/"
      }, "Activity")));
      expect(button.hasClass('bdl-is-active')).toBe(true);
    });
    test('applies default activeClassName for strict matches', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity/']
      }, React.createElement(NavButton, {
        strict: true,
        to: "/activity/"
      }, "Activity")));
      expect(button.hasClass('bdl-is-active')).toBe(true);
    });
    test('does not apply default activeClassName for non-strict matches', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity']
      }, React.createElement(NavButton, {
        strict: true,
        to: "/activity/"
      }, "Activity")));
      expect(button.hasClass('bdl-is-active')).toBe(false);
    });
    test('applies custom activeClassName for strict matches', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity/']
      }, React.createElement(NavButton, {
        strict: true,
        to: "/activity/",
        activeClassName: "bdl-is-selected"
      }, "Activity")));
      expect(button.hasClass('bdl-is-selected')).toBe(true);
    });
    test('does not apply custom activeClassName for non-strict matches', function () {
      var button = render(React.createElement(MemoryRouter, {
        initialEntries: ['/activity']
      }, React.createElement(NavButton, {
        strict: true,
        to: "/activity/",
        activeClassName: "bdl-is-selected"
      }, "Activity")));
      expect(button.hasClass('bdl-is-selected')).toBe(false);
    });
  });
  describe('onClick', function () {
    var mockHistory = {
      listen: jest.fn(),
      location: {},
      push: jest.fn()
    };
    test('calls onClick eventhandler and history.push', function () {
      var clickHandler = jest.fn();
      var button = mount(React.createElement(Router, {
        history: mockHistory
      }, React.createElement(NavButton, {
        to: "/activity/test",
        onClick: clickHandler
      }, "Activity Test")));
      button.simulate('click', {
        button: 0
      });
      expect(clickHandler).toBeCalledTimes(1);
      expect(mockHistory.push).toBeCalledTimes(1);
      expect(mockHistory.push).toBeCalledWith('/activity/test');
    });
    test('does not call history.push on right click', function () {
      var button = mount(React.createElement(Router, {
        history: mockHistory
      }, React.createElement(NavButton, {
        to: "/activity/test"
      }, "Activity Test")));
      button.simulate('click', {
        button: 1
      });
      expect(mockHistory.push).toBeCalledTimes(0);
    });
    test('does not call history.push on prevented event', function () {
      var button = mount(React.createElement(Router, {
        history: mockHistory
      }, React.createElement(NavButton, {
        to: "/activity/test"
      }, "Activity Test")));
      button.simulate('click', {
        defaultPrevented: true,
        button: 0
      });
      expect(mockHistory.push).toBeCalledTimes(0);
    });
  });
});