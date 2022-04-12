function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            isHidden\n            ", "\n            ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { mountConnected } from '../../../test-utils/enzyme';
import CollapsibleSidebar from '../CollapsibleSidebar';
describe('components/core/collapsible-sidebar/CollapsibleSidebar', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(CollapsibleSidebar, props));
  };

  test('render', function () {
    var sidebar = getWrapper({
      children: [React.createElement("span", {
        key: "1"
      }, "abc"), React.createElement("span", {
        key: "2"
      }, "def")],
      expanded: true,
      className: 'foo'
    });
    expect(sidebar).toMatchSnapshot();
  });
  describe('handleKeyDown()', function () {
    var attachTo;
    var wrapper = null;

    var mountToBody = function mountToBody() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return mountConnected(React.createElement(CollapsibleSidebar, props), {
        attachTo: attachTo
      });
    };

    beforeEach(function () {
      attachTo = document.createElement('div');
      document.body.appendChild(attachTo);
      wrapper = mountToBody({
        children: [React.createElement("a", {
          href: "/abc",
          className: "first",
          key: "1"
        }, "abc"), React.createElement("a", {
          href: "/def",
          className: "second",
          key: "2"
        }, "def"), React.createElement("a", {
          href: "/ghi",
          className: "third",
          key: "3"
        }, "def")],
        expanded: true,
        className: 'foo'
      }); // make sure the focus is on the nav

      wrapper.find('.first').getDOMNode().focus();
    });
    afterEach(function () {
      if (wrapper) {
        wrapper.unmount();
        wrapper = null;
      }

      document.body.removeChild(attachTo);
    });
    test('focusEl down', function () {
      var instance = wrapper.instance();
      var firstLink = wrapper.find('.first').getDOMNode();
      var secondLink = wrapper.find('.second').getDOMNode();
      var thirdLink = wrapper.find('.third').getDOMNode();
      instance.focusEl('down');
      expect(secondLink).toEqual(document.activeElement);
      instance.focusEl('down');
      expect(thirdLink).toEqual(document.activeElement);
      instance.focusEl('down');
      expect(firstLink).toEqual(document.activeElement);
    });
    test('focusEl up', function () {
      var instance = wrapper.instance();
      var firstLink = wrapper.find('.first').getDOMNode();
      var secondLink = wrapper.find('.second').getDOMNode();
      var thirdLink = wrapper.find('.third').getDOMNode();
      instance.focusEl('up');
      expect(thirdLink).toEqual(document.activeElement);
      instance.focusEl('up');
      expect(secondLink).toEqual(document.activeElement);
      instance.focusEl('up');
      expect(firstLink).toEqual(document.activeElement);
    });
    describe.each([['ArrowDown', 'down', 1], ['ArrowUp', 'up', 1], ['Enter', '', 0]])('%o', function (keyInput, expectedArg, expectedCallTime) {
      test('test focusNextEl() when a key is pressed', function () {
        var instance = wrapper.instance();
        var focusElMock = jest.fn();
        var preventDefaultMock = jest.fn();
        var stopPropagationMock = jest.fn();
        instance.focusEl = focusElMock;
        var nav = wrapper.find('nav');
        nav.simulate('keydown', {
          key: keyInput,
          preventDefault: preventDefaultMock,
          stopPropagation: stopPropagationMock
        });

        if (expectedCallTime === 0) {
          expect(focusElMock).toHaveBeenCalledTimes(0);
        } else {
          expect(focusElMock).toHaveBeenCalledWith(expectedArg);
        }

        expect(preventDefaultMock).toHaveBeenCalledTimes(expectedCallTime);
        expect(stopPropagationMock).toHaveBeenCalledTimes(expectedCallTime);
      });
    });
  });
  var dummyTheme = {
    primary: {
      background: '',
      foreground: '',
      border: ''
    }
  };
  describe('responsiveness', function () {
    var wrapper = function wrapper(params) {
      return render(React.createElement(ThemeProvider, {
        theme: dummyTheme
      }, React.createElement(CollapsibleSidebar, {
        isHidden: params.isHidden
      })));
    };

    test.each(_templateObject(), false, undefined)('should NOT be hidden when isHidden is $isHidden', function (_ref) {
      var isHidden = _ref.isHidden;
      wrapper({
        isHidden: isHidden
      });
      var CollapsibleSidebarWrapper = screen.getByTestId('CollapsibleSidebar-wrapper');
      expect(CollapsibleSidebarWrapper).not.toHaveAttribute('aria-hidden', 'true');
    });
    test('should be hidden when isHidden is true', function () {
      wrapper({
        isHidden: true
      });
      var CollapsibleSidebarWrapper = screen.getByTestId('CollapsibleSidebar-wrapper');
      expect(CollapsibleSidebarWrapper).toHaveAttribute('aria-hidden', 'true');
    });
  });
});