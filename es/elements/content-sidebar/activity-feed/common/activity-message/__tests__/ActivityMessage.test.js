function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import ActivityMessage from '../ActivityMessage';
describe('elements/content-sidebar/ActivityFeed/common/activity-message', function () {
  test('should properly format tagged comment', function () {
    var commentText = {
      tagged_message: 'How u doing @[2030326577:Young Jeezy]?'
    };
    var wrapper = shallow(React.createElement(ActivityMessage, _extends({
      id: "123"
    }, commentText)));
    expect(wrapper).toMatchSnapshot();
  });
  test('should properly handle unicode variants of @ in tagged comments', function () {
    var commentText = {
      tagged_message: 'Hi ﹫[123:Half] ＠[222:Full] @[432:Latin]'
    };
    var wrapper = shallow(React.createElement(ActivityMessage, _extends({
      id: "123"
    }, commentText)));
    expect(wrapper).toMatchSnapshot();
  });
  test('should not show translate button by default, translation should be disabled', function () {
    var commentText = {
      tagged_message: 'test'
    };
    var wrapper = mount(React.createElement(ActivityMessage, _extends({
      id: "123"
    }, commentText)));
    expect(wrapper.find('.bcs-ActivityMessage').text()).toEqual(commentText.tagged_message);
    expect(wrapper.find('PlainButton.bcs-ActivityMessage-translate').length).toEqual(0);
    expect(wrapper.prop('translationEnabled')).toBe(false);
    expect(wrapper.state('isLoading')).toBe(false);
  });
  test('should show translate button when translation is enabled', function () {
    var translations = {
      translationEnabled: true
    };
    var commentText = {
      tagged_message: 'test'
    };
    var wrapper = mount(React.createElement(ActivityMessage, _extends({
      id: "123"
    }, commentText, translations)));
    expect(wrapper.find('PlainButton.bcs-ActivityMessage-translate').length).toEqual(1);
    expect(wrapper.state('isTranslation')).toBe(false);
    expect(wrapper.state('isLoading')).toBe(false);
  });
  test('should show original button when translation is enabled and already showing translated comment', function () {
    var translations = {
      translationEnabled: true
    };
    var commentText = {
      tagged_message: 'test',
      translatedTaggedMessage: 'translated'
    };
    var wrapper = mount(React.createElement(ActivityMessage, _extends({
      id: "123"
    }, commentText, translations)));
    wrapper.setState({
      isTranslation: true
    });
    expect(wrapper.find('PlainButton.bcs-ActivityMessage-translate').length).toEqual(1);
    expect(wrapper.state('isLoading')).toBe(false);
  });
  test('should show loading indicator when state is isLoading', function () {
    var translations = {
      translationEnabled: true
    };
    var commentText = {
      tagged_message: 'test',
      translatedTaggedMessage: 'translated'
    };
    var wrapper = shallow(React.createElement(ActivityMessage, _extends({
      id: "123"
    }, commentText, translations)));
    wrapper.setState({
      isTranslation: false,
      isLoading: true
    });
    expect(wrapper.find('LoadingIndicator').length).toEqual(1);
  });
  test('should call onTranslate when translate button is clicked', function () {
    var onTranslateSpy = jest.fn();
    var translations = {
      translationEnabled: true,
      onTranslate: onTranslateSpy
    };
    var commentText = {
      tagged_message: 'test'
    };
    var wrapper = mount(React.createElement(ActivityMessage, _extends({
      id: "123"
    }, commentText, translations)));
    var translateBtn = wrapper.find('PlainButton.bcs-ActivityMessage-translate');
    translateBtn.simulate('click');
    expect(onTranslateSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.find('.bcs-ActivityMessageLoading').length).toEqual(1);
    expect(wrapper.state('isTranslation')).toBe(true);
    expect(wrapper.state('isLoading')).toBe(true);
  });
  test('should not call onTranslate when translate button is clicked and translated comment exists', function () {
    var onTranslateSpy = jest.fn();
    var translations = {
      translationEnabled: true,
      onTranslate: onTranslateSpy
    };
    var commentText = {
      tagged_message: 'test',
      translatedTaggedMessage: 'translated'
    };
    var wrapper = mount(React.createElement(ActivityMessage, _extends({
      id: "123"
    }, commentText, translations)));
    wrapper.setState({
      isTranslation: false
    });
    var translateBtn = wrapper.find('PlainButton.bcs-ActivityMessage-translate');
    translateBtn.simulate('click');
    expect(onTranslateSpy).not.toHaveBeenCalled();
    expect(wrapper.find('PlainButton.bcs-ActivityMessage-translate').length).toEqual(1);
    expect(wrapper.state('isTranslation')).toBe(true);
    expect(wrapper.state('isLoading')).toBe(false);
  });
  test('should show comment when show original button is clicked', function () {
    var onTranslateSpy = jest.fn();
    var translations = {
      translationEnabled: true,
      onTranslate: onTranslateSpy
    };
    var commentText = {
      tagged_message: 'test',
      translatedTaggedMessage: 'translated'
    };
    var wrapper = mount(React.createElement(ActivityMessage, _extends({
      id: "123"
    }, commentText, translations)));
    wrapper.setState({
      isTranslation: true
    });
    var showOriginalBtn = wrapper.find('PlainButton.bcs-ActivityMessage-translate');
    showOriginalBtn.simulate('click');
    expect(onTranslateSpy).not.toHaveBeenCalled();
    expect(wrapper.find('PlainButton.bcs-ActivityMessage-translate').length).toEqual(1);
    expect(wrapper.state('isTranslation')).toBe(false);
    expect(wrapper.state('isLoading')).toBe(false);
  });
});