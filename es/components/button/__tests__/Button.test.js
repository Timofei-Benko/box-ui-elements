import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Button from '..';
var sandbox = sinon.sandbox.create();
describe('components/button/Button', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should correctly render children in button', function () {
    var children = 'yooo';
    var wrapper = shallow(React.createElement(Button, null, children));
    expect(wrapper.hasClass('btn')).toBe(true);
    expect(wrapper.find('.btn-content').length).toEqual(1);
    expect(wrapper.text()).toEqual(children);
  });
  test('should correctly render loading indicator, disable button and hide button content if button is in loading state', function () {
    var wrapper = shallow(React.createElement(Button, {
      isLoading: true
    }, "Test"));
    expect(wrapper.find('.btn-loading-indicator').length).toEqual(1);
    expect(wrapper.hasClass('is-loading')).toBe(true);
  });
  test('simulates click events', function () {
    var onClickHandler = sinon.spy();
    var wrapper = shallow(React.createElement(Button, {
      onClick: onClickHandler
    }));
    wrapper.find('button').simulate('click');
    expect(onClickHandler.calledOnce).toBe(true);
  });
  test('should not call onClick when isDisabled is set', function () {
    var onClickHandler = sinon.spy();
    var preventDefault = sinon.spy();
    var stopPropagation = sinon.spy();
    var wrapper = shallow(React.createElement(Button, {
      isDisabled: true,
      onClick: onClickHandler
    }));
    wrapper.find('button').simulate('click', {
      preventDefault: preventDefault,
      stopPropagation: stopPropagation
    });
    sinon.assert.notCalled(onClickHandler);
    sinon.assert.calledOnce(preventDefault);
    sinon.assert.calledOnce(stopPropagation);
  });
  test('should not call onClick when className has is-disabled', function () {
    var onClickHandler = sinon.spy();
    var preventDefault = sinon.spy();
    var stopPropagation = sinon.spy();
    var wrapper = shallow(React.createElement(Button, {
      className: "is-disabled",
      onClick: onClickHandler
    }));
    var contains = sinon.stub();
    contains.withArgs('is-disabled').returns(true);
    wrapper.instance().btnElement = {
      classList: {
        contains: contains
      }
    }; // eslint-disable-line

    wrapper.find('button').simulate('click', {
      preventDefault: preventDefault,
      stopPropagation: stopPropagation
    });
    sinon.assert.notCalled(onClickHandler);
    sinon.assert.calledOnce(preventDefault);
    sinon.assert.calledOnce(stopPropagation);
  });
  test('should have a default type', function () {
    var wrapper = shallow(React.createElement(Button, null));
    expect(wrapper.prop('type')).toEqual('submit');
  });
  test('should add modifier class when size is "large"', function () {
    var wrapper = shallow(React.createElement(Button, {
      size: "large"
    }, "Click Here"));
    expect(wrapper.prop('className')).toEqual('btn bdl-btn--large');
  });
  test('should render icon in icon container if icon prop is set', function () {
    var FakeIcon = function FakeIcon(props) {
      return React.createElement("svg", props);
    };

    var wrapper = shallow(React.createElement(Button, {
      icon: React.createElement(FakeIcon, null)
    }));
    var iconContainer = wrapper.find('.bdl-btn-icon');

    var _iconContainer$find$p = iconContainer.find('FakeIcon').props(),
        width = _iconContainer$find$p.width,
        height = _iconContainer$find$p.height;

    expect(wrapper.props().className).toEqual('btn bdl-has-icon');
    expect(iconContainer.length).toBe(1);
    expect(width).toEqual(height);
    expect(width).toEqual(20);
  });
  test('should render icon next to text if icon and children props are both set', function () {
    var FakeIcon = function FakeIcon(props) {
      return React.createElement("svg", props);
    };

    var wrapper = shallow(React.createElement(Button, {
      icon: React.createElement(FakeIcon, null)
    }, "Click Here"));
    var iconContainer = wrapper.find('.bdl-btn-icon');
    var textContainer = wrapper.find('.btn-content');

    var _iconContainer$find$p2 = iconContainer.find('FakeIcon').props(),
        width = _iconContainer$find$p2.width,
        height = _iconContainer$find$p2.height;

    expect(iconContainer.length).toBe(1);
    expect(textContainer.length).toBe(1);
    expect(width).toEqual(height);
    expect(width).toEqual(16);
    expect(wrapper).toMatchSnapshot();
  });
  test('should set aria-disabled to true when isDisabled is true', function () {
    var wrapper = shallow(React.createElement(Button, {
      isDisabled: true
    }));
    expect(wrapper.prop('aria-disabled')).toBe(true);
  });
  test('should not render a RadarAnimation if showRadar is false', function () {
    var wrapper = shallow(React.createElement(Button, {
      showRadar: false
    }, "Test"));
    expect(wrapper.find('RadarAnimation')).toMatchSnapshot();
  });
  test('should render a RadarAnimation if showRadar is true', function () {
    var wrapper = shallow(React.createElement(Button, {
      showRadar: true
    }, "Test"));
    expect(wrapper.find('RadarAnimation')).toMatchSnapshot();
  });
});