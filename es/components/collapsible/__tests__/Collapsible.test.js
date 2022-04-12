import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Button from '../../button/Button';
import PlainButton from '../../plain-button/PlainButton';
import Collapsible from '..';
describe('components/collapsible/Collapsible', function () {
  var wrapper;
  beforeEach(function () {
    wrapper = shallow(React.createElement(Collapsible, {
      isOpen: true,
      title: "foo"
    }, React.createElement("span", {
      className: "test-content"
    }, "foobar")));
  });
  test('should render component correctly', function () {
    expect(wrapper).toMatchSnapshot();
  });
  test('should toggle visibility on click', function () {
    wrapper.find('.collapsible-card-title').simulate('click');
    expect(wrapper.state('isOpen')).toBeFalsy();
    wrapper.find('.collapsible-card-title').simulate('click');
    expect(wrapper.state('isOpen')).toBeTruthy();
  });
  test('should render with headerActionItems', function () {
    wrapper = shallow(React.createElement(Collapsible, {
      headerActionItems: React.createElement(Button, null, "Click Here"),
      isOpen: false,
      title: "foo"
    }, React.createElement("span", {
      className: "test-content"
    }, "foobar")));
    expect(wrapper).toMatchSnapshot();
  });
  test('should apply correct border class', function () {
    wrapper = shallow(React.createElement(Collapsible, {
      isBordered: true,
      isOpen: true,
      title: "foo"
    }, React.createElement("span", null, "foobar")));
    expect(wrapper).toMatchSnapshot();
  });
  test('should apply correct isOpen state', function () {
    wrapper = shallow(React.createElement(Collapsible, {
      isOpen: false,
      title: "foo"
    }, React.createElement("span", null, "foobar")));
    expect(wrapper).toMatchSnapshot();
  });
  test('should apply buttonProps correctly', function () {
    wrapper = shallow(React.createElement(Collapsible, {
      buttonProps: {
        a: 1,
        b: 2
      },
      isOpen: true,
      title: "foo"
    }, React.createElement("span", null, "foobar")));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render a PlainButton if a button is passed in', function () {
    wrapper = shallow(React.createElement(Collapsible, {
      headerButton: React.createElement(PlainButton, null),
      title: "foo"
    }, React.createElement("span", null, "foobar")));
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render a PlainButton if a button is not passed in', function () {
    wrapper = shallow(React.createElement(Collapsible, {
      title: "foo"
    }, React.createElement("span", null, "foobar")));
    expect(wrapper).toMatchSnapshot();
  });
  test('should fire open and close handlers', function () {
    var closeSpy = sinon.spy();
    var openSpy = sinon.spy();
    wrapper = shallow(React.createElement(Collapsible, {
      buttonProps: {
        a: 1,
        b: 2
      },
      isOpen: true,
      onClose: closeSpy,
      onOpen: openSpy,
      title: "foo"
    }, React.createElement("span", null, "foobar")));
    expect(closeSpy.notCalled).toBe(true);
    expect(openSpy.notCalled).toBe(true);
    wrapper.find('.collapsible-card-title').simulate('click');
    expect(closeSpy.calledOnce).toBe(true);
    expect(openSpy.notCalled).toBe(true);
    wrapper.find('.collapsible-card-title').simulate('click');
    expect(closeSpy.calledOnce).toBe(true);
    expect(openSpy.calledOnce).toBe(true);
  });
});