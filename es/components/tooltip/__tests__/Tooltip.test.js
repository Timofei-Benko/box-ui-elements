function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react/button-has-type */
import * as React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import noop from 'lodash/noop';
import Tooltip, { TooltipPosition, TooltipTheme } from '../Tooltip';
import TetherPosition from '../../../common/tether-positions';
var sandbox = sinon.sandbox.create();
describe('components/tooltip/Tooltip', function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(Tooltip, _extends({
      text: "hi"
    }, props), React.createElement("div", null, "Hello")));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('render()', function () {
    test('should render with close button if isShown and showCloseButton are true', function () {
      expect(getWrapper({
        isShown: true,
        showCloseButton: true
      })).toMatchSnapshot();
    });
    test('should not render the close button if wasClosedByUser state is true', function () {
      var wrapper = getWrapper({
        isShown: true,
        showCloseButton: true
      });
      wrapper.setState({
        wasClosedByUser: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should not render with close button if showCloseButton is false', function () {
      expect(getWrapper({
        isShown: true,
        showCloseButton: false
      })).toMatchSnapshot();
    });
    test('should not render with close button if isShown is false', function () {
      var wrapper = getWrapper({
        isShown: false,
        showCloseButton: true
      });
      wrapper.setState({
        isShown: true
      });
      expect(wrapper).toMatchSnapshot();
    });
    test('should render correctly with callout theme', function () {
      expect(getWrapper({
        isShown: true,
        theme: 'callout'
      })).toMatchSnapshot();
    });
    test('should render default component', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        text: "hi"
      }, React.createElement("button", null)));
      var component = wrapper.children();
      expect(wrapper.is('TetherComponent')).toBe(true);
      expect(wrapper.prop('attachment')).toEqual('bottom center');
      expect(wrapper.prop('constraints')).toEqual([{
        to: 'window',
        attachment: 'together'
      }]);
      expect(wrapper.prop('enabled')).toBe(false);
      expect(wrapper.prop('targetAttachment')).toEqual('top center');
      expect(component.is('button')).toBe(true);
      expect(component.prop('onBlur')).toBeTruthy();
      expect(component.prop('onFocus')).toBeTruthy();
      expect(component.prop('onMouseEnter')).toBeTruthy();
      expect(component.prop('onMouseLeave')).toBeTruthy();
      expect(component.prop('tabIndex')).toEqual('0');
    });
    test('should not add tabindex if isTabbable is false', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        isShown: true,
        isTabbable: false,
        text: "hi"
      }, React.createElement("button", null)));
      var component = wrapper.find('button');
      expect(component.prop('tabIndex')).toBeFalsy();
    });
    test('should show tooltip when isShown state is true', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        text: "hi"
      }, React.createElement("button", null)));
      wrapper.setState({
        isShown: true
      });
      var component = wrapper.childAt(0);
      var tooltip = wrapper.childAt(1);
      expect(wrapper.prop('enabled')).toBe(true);
      expect(tooltip.is('div')).toBe(true);
      expect(tooltip.hasClass('tooltip')).toBe(true);
      expect(component.prop('aria-describedby')).toEqual(tooltip.prop('id'));
      expect(tooltip.text()).toEqual('hi');
    });
    test('should render tooltip class when specified', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        className: "testing",
        isShown: true,
        text: "hi"
      }, React.createElement("button", null)));
      expect(wrapper.find('[role="tooltip"]').hasClass('testing')).toBe(true);
    });
    test('should constrain to scroll parent when specified', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        constrainToScrollParent: true,
        text: "hi"
      }, React.createElement("button", null)));
      expect(wrapper.prop('constraints')).toEqual([{
        to: 'scrollParent',
        attachment: 'together'
      }, {
        to: 'window',
        attachment: 'together'
      }]);
    });
    test('should render correct attachments when position is specified', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        position: TooltipPosition.MIDDLE_RIGHT,
        text: "hi"
      }, React.createElement("button", null)));
      expect(wrapper.prop('attachment')).toEqual('middle left');
      expect(wrapper.prop('targetAttachment')).toEqual('middle right');
    });
    test('should render correct attachments when custom position is specified', function () {
      var customPosition = {
        attachment: TetherPosition.TOP_LEFT,
        targetAttachment: TetherPosition.BOTTOM_RIGHT
      };
      var wrapper = shallow(React.createElement(Tooltip, {
        position: customPosition,
        text: "hi"
      }, React.createElement("button", null)));
      expect(wrapper.prop('attachment')).toEqual('top left');
      expect(wrapper.prop('targetAttachment')).toEqual('bottom right');
    });
    test('should render with a specific body element', function () {
      var bodyEl = document.createElement('div');
      var wrapper = shallow(React.createElement(Tooltip, {
        bodyElement: bodyEl,
        text: "hi"
      }, React.createElement("button", null)));
      expect(wrapper.prop('bodyElement')).toEqual(bodyEl);
    });
    test('should render TetherComponent in the body if invalid body element is specified', function () {
      var wrapper = shallow( // @ts-ignore testing a wrong value for the bodyElement prop
      React.createElement(Tooltip, {
        bodyElement: "foo",
        text: "hi"
      }, React.createElement("button", null)));
      expect(wrapper.prop('bodyElement')).toEqual(document.body);
    });
    test('should show tooltip when isShown prop is true', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        isShown: true,
        text: "hi"
      }, React.createElement("button", null)));
      var component = wrapper.childAt(0);
      var tooltip = wrapper.childAt(1);
      expect(wrapper.prop('enabled')).toBe(true);
      expect(component.prop('onBlur')).toBeFalsy();
      expect(component.prop('onFocus')).toBeFalsy();
      expect(component.prop('onKeyDown')).toBeFalsy();
      expect(component.prop('onMouseEnter')).toBeFalsy();
      expect(component.prop('onMouseLeave')).toBeFalsy();
      expect(component.prop('tabIndex')).toBeFalsy();
      expect(tooltip.is('div')).toBe(true);
      expect(tooltip.hasClass('tooltip')).toBe(true);
      expect(component.prop('aria-describedby')).toEqual(tooltip.prop('id'));
      expect(component.prop('aria-errormessage')).toBeFalsy();
      expect(tooltip.text()).toEqual('hi');
    });
    test('should set aria-describedBy when aria-label exists and tooltipText is different than it', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        isShown: true,
        text: "hi"
      }, React.createElement("button", {
        "aria-label": "test"
      })));
      var component = wrapper.childAt(0);
      var tooltip = wrapper.childAt(1);
      expect(component.prop('aria-describedby')).toEqual(tooltip.prop('id'));
    });
    test('should not set aria-describedBy when aria-label exists but tooltipText is equal to it', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        isShown: true,
        text: "hi"
      }, React.createElement("button", {
        "aria-label": "hi"
      })));
      var component = wrapper.childAt(0);
      expect(component.prop('aria-describedby')).toEqual(undefined);
    });
    test('should set aria-hidden as true if aria-label and tooltipText are equal', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        isShown: true,
        text: "test"
      }, React.createElement("button", {
        "aria-label": "test"
      })));
      var tooltip = wrapper.childAt(1);
      expect(tooltip.prop('aria-hidden')).toBe(true);
    });
    test('should set aria-hidden as false if aria-label does not exist', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        isShown: true,
        text: "hi"
      }, React.createElement("button", null)));
      var tooltip = wrapper.childAt(1);
      expect(tooltip.prop('aria-hidden')).toBe(false);
    });
    test('should set aria-hidden as false if aria-label is different than tooltipText', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        isShown: true,
        text: "Im a long tooltip description"
      }, React.createElement("button", {
        "aria-label": "launch"
      })));
      var tooltip = wrapper.childAt(1);
      expect(tooltip.prop('aria-hidden')).toBe(false);
    });
    test('should render error class when theme is error', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        isShown: true,
        text: "hi",
        theme: TooltipTheme.ERROR
      }, React.createElement("button", {
        "aria-label": "test"
      })));
      var component = wrapper.childAt(0);
      var tooltip = wrapper.childAt(1);
      expect(wrapper.find('[data-testid="bdl-Tooltip"]').hasClass('is-error')).toBe(true);
      expect(component.prop('aria-describedby')).toEqual(tooltip.prop('id'));
      expect(component.prop('aria-errormessage')).toEqual(tooltip.prop('id'));
    });
    test('should render children only when tooltip is disabled', function () {
      expect(getWrapper({
        isDisabled: true
      })).toMatchSnapshot();
    });
    test('should render children wrapped in tether when tooltip has text missing', function () {
      expect(getWrapper({
        text: null
      })).toMatchSnapshot();
    });
    test('should match snapshot when stopBubble is set', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        isShown: true,
        stopBubble: true,
        text: "hi"
      }, React.createElement("button", null)));
      expect(wrapper.find('div.tooltip')).toMatchSnapshot();
    });
    test('event capture div is not present when stopBubble is not set', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        isShown: true,
        text: "hi"
      }, React.createElement("button", null)));
      expect(wrapper.find('div[role="presentation"]').exists()).toBe(false);
    });
    test('should render with custom offset when provided', function () {
      var offset = '0 10px';
      var wrapper = shallow(React.createElement(Tooltip, {
        offset: offset,
        text: "hi"
      }, React.createElement("button", null)));
      expect(wrapper.prop('offset')).toEqual(offset);
    });
    test('should render correctly with tetherElementClassName', function () {
      expect(getWrapper({
        tetherElementClassName: 'tether-element-class-name'
      })).toMatchSnapshot();
    });
  });
  describe('should stop event propagation when stopBubble is set', function () {
    test.each([['onClick', 'onContextMenu', 'onKeyPress']])('when %o', function (onEvent) {
      var wrapper = shallow(React.createElement(Tooltip, {
        isShown: true,
        text: "hi",
        stopBubble: true
      }, React.createElement("button", null)));
      var stop = jest.fn();
      var nativeStop = jest.fn();
      expect(wrapper.find('div[role="presentation"]').length).toBe(1);
      var handler = wrapper.find('div[role="presentation"]').prop(onEvent);
      handler({
        stopPropagation: stop,
        nativeEvent: {
          stopImmediatePropagation: nativeStop
        }
      });
      expect(stop).toHaveBeenCalledTimes(1);
      expect(nativeStop).toHaveBeenCalledTimes(1);
    });
  });
  describe('componentDidUpdate', function () {
    test('should reset wasClosedByUser to false if isShown prop is transitioned from false to true', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        text: "hi",
        isShown: true
      }, React.createElement("button", null)));
      expect(wrapper.state('wasClosedByUser')).toBe(false);
      wrapper.instance().closeTooltip();
      expect(wrapper.state('wasClosedByUser')).toBe(true);
      wrapper.setProps({
        isShown: false
      });
      wrapper.setProps({
        isShown: true
      });
      expect(wrapper.state('wasClosedByUser')).toBe(false);
    });
  });
  describe('closeTooltip()', function () {
    test('should update the wasClosedByUser state', function () {
      var wrapper = shallow(React.createElement(Tooltip, {
        text: "hi"
      }, React.createElement("button", null)));
      expect(wrapper.state('wasClosedByUser')).toBe(false);
      wrapper.instance().closeTooltip();
      expect(wrapper.state('wasClosedByUser')).toBe(true);
    });
    test('should call onDismiss if provided', function () {
      var onDismissMock = jest.fn();
      var wrapper = shallow(React.createElement(Tooltip, {
        text: "hi",
        onDismiss: onDismissMock
      }, React.createElement("button", null)));
      wrapper.instance().closeTooltip();
      expect(onDismissMock).toHaveBeenCalled();
    });
  });
  describe('handleMouseEnter()', function () {
    test('should correctly handle mouseenter events', function () {
      var onMouseEnter = sinon.spy();
      var wrapper = shallow(React.createElement(Tooltip, {
        text: "hi"
      }, React.createElement("button", {
        onMouseEnter: onMouseEnter
      })));
      wrapper.find('button').simulate('mouseenter');
      expect(wrapper.state('isShown')).toBe(true);
      expect(onMouseEnter.calledOnce).toBe(true);
    });
  });
  describe('handleMouseLeave()', function () {
    test('should correctly handle mouseleave events', function () {
      var onMouseLeave = sinon.spy();
      var wrapper = shallow(React.createElement(Tooltip, {
        text: "hi"
      }, React.createElement("button", {
        onMouseLeave: onMouseLeave
      })));
      wrapper.setState({
        isShown: true
      });
      wrapper.find('button').simulate('mouseleave');
      expect(wrapper.state('isShown')).toBe(false);
      expect(onMouseLeave.calledOnce).toBe(true);
    });
  });
  describe('handleFocus()', function () {
    test('should correctly handle focus events', function () {
      var onFocus = sinon.spy();
      var wrapper = shallow(React.createElement(Tooltip, {
        text: "hi"
      }, React.createElement("button", {
        onFocus: onFocus
      })));
      wrapper.find('button').simulate('focus');
      expect(wrapper.state('isShown')).toBe(true);
      expect(onFocus.calledOnce).toBe(true);
    });
  });
  describe('handleBlur()', function () {
    test('should correctly handle blur events', function () {
      var onBlur = sinon.spy();
      var wrapper = shallow(React.createElement(Tooltip, {
        text: "hi"
      }, React.createElement("button", {
        onBlur: onBlur
      })));
      wrapper.setState({
        isShown: true
      });
      wrapper.find('button').simulate('blur');
      expect(wrapper.state('isShown')).toBe(false);
      expect(onBlur.calledOnce).toBe(true);
    });
  });
  describe('handleKeyDown()', function () {
    test('should update isShown state only when escape key is pressed', function () {
      var map = {};
      document.addEventListener = jest.fn().mockImplementationOnce(function (event, cb) {
        map[event] = cb;
      });
      var wrapper = shallow(React.createElement(Tooltip, {
        text: "hi"
      }, React.createElement("button", null)));
      wrapper.setState({
        isShown: true
      });
      map.keydown({
        key: 'Escape',
        stopPropagation: noop
      });
      expect(document.addEventListener).toHaveBeenCalledWith('keydown', expect.anything(), true);
      expect(wrapper.state('isShown')).toBe(false);
    });
    test('should not update isShown state only when some other key is pressed', function () {
      var map = {};
      document.addEventListener = jest.fn().mockImplementationOnce(function (event, cb) {
        map[event] = cb;
      });
      var wrapper = shallow(React.createElement(Tooltip, {
        text: "hi"
      }, React.createElement("button", null)));
      wrapper.setState({
        isShown: true
      });
      map.keydown({
        key: 'Space'
      });
      expect(document.addEventListener).toHaveBeenCalledWith('keydown', expect.anything(), true);
      expect(wrapper.state('isShown')).toBe(true);
    });
    test('should call keydown handler of component when specified', function () {
      var onKeyDown = sinon.spy();
      var wrapper = shallow(React.createElement(Tooltip, {
        text: "hi"
      }, React.createElement("button", {
        onKeyDown: onKeyDown
      })));
      wrapper.find('button').simulate('keydown', {
        key: 'Escape'
      });
      expect(onKeyDown.calledOnce).toBe(true);
    });
  });
  describe('position instance method', function () {
    test.each([true, false])("should only position the tether when shown", function (isShown) {
      var positionTetherMock = jest.fn();
      var wrapper = getWrapper({
        isShown: isShown
      }); // @ts-ignore: react-tether shenanigans

      wrapper.instance().tetherRef = {
        current: {
          position: positionTetherMock
        }
      };
      wrapper.instance().position();
      expect(positionTetherMock).toHaveBeenCalledTimes(isShown ? 1 : 0);
    });
  });
});