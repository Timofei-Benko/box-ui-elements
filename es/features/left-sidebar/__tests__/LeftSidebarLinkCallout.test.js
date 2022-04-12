function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import LeftSidebarLinkCallout from '../LeftSidebarLinkCallout';
describe('components/tooltip/LeftSidebarLinkCallout', function () {
  var sandbox = sinon.sandbox.create();
  afterEach(function () {
    sandbox.verifyAndRestore();
  });

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(LeftSidebarLinkCallout, _extends({
      callout: {
        content: React.createElement("div", null, "Hi"),
        onClose: function onClose() {}
      }
    }, props), React.createElement("button", {
      type: "button"
    })));
  };

  describe('render()', function () {
    test('should render default component', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    test('should hide callout when isShown state is false', function () {
      var wrapper = getWrapper();
      wrapper.setState({
        isShown: false
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should call onClose when clicked', function () {
      var callout = {
        content: React.createElement("div", null, "Hi"),
        onClose: sandbox.mock()
      };
      var wrapper = getWrapper({
        callout: callout
      });
      var btn = wrapper.find('.nav-link-callout-close-button');
      btn.simulate('click');
    });
    test('should enable tethered component when isShown prop true', function () {
      var callout = {
        content: React.createElement("div", null, "Hi")
      };
      var wrapper = getWrapper({
        isShown: true,
        callout: callout
      });
      expect(wrapper.props().enabled).toBe(true);
    });
    test('should add class provided to nav-link-callout component', function () {
      var wrapper = getWrapper({
        isShown: true,
        navLinkClassName: 'testClass'
      });
      var callout = wrapper.find('.nav-link-callout');
      expect(callout.props().className).toContain('testClass');
    });
  });
});