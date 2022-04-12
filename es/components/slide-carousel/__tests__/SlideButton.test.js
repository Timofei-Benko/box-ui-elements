function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import SlideButton from '../SlideButton';
var sandbox = sinon.sandbox.create();
describe('components/slide-carousel/SlideButton', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  var defaultProps = {
    isSelected: true
  };

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(SlideButton, _extends({}, defaultProps, props)));
  };

  test('should have the is-selected class when selected', function () {
    var wrapper = getWrapper({
      isSelected: true
    });
    expect(wrapper.hasClass('is-selected')).toBe(true);
  });
  test('should not have the is-selected class when not selected', function () {
    var wrapper = getWrapper({
      isSelected: false
    });
    expect(wrapper.hasClass('is-selected')).not.toBe(true);
  });
  test('should call onClick prop when clicked', function () {
    var onClickSpy = sandbox.spy();
    var wrapper = getWrapper({
      onClick: onClickSpy
    });
    wrapper.simulate('click');
    sinon.assert.calledOnce(onClickSpy);
  });
});