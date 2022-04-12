import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { BackButton } from '..';
describe('elements/common/nav-button/BackButton', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return mount(React.createElement(MemoryRouter, {
      initialEntries: ['/start', '/test']
    }, React.createElement(BackButton, props)));
  };

  var getHistory = function getHistory(wrapper) {
    return wrapper.find(Router).prop('history');
  };

  test('should match its snapshot', function () {
    var wrapper = getWrapper();
    var button = wrapper.find(BackButton).first();
    expect(button).toMatchSnapshot();
  });
  test('should call history back on click if no path is defined', function () {
    var wrapper = getWrapper();
    var history = getHistory(wrapper);
    history.goBack = jest.fn();
    wrapper.simulate('click');
    expect(history.goBack).toHaveBeenCalled();
  });
  test('should call history.push on click if a path is defined', function () {
    var wrapper = getWrapper({
      to: '/new'
    });
    var history = getHistory(wrapper);
    history.push = jest.fn();
    wrapper.simulate('click');
    expect(history.push).toHaveBeenCalledWith('/new');
  });
});