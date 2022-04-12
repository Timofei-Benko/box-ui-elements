function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import withTargetedClickThrough from '../withTargetedClickThrough';
var onClose = jest.fn();
var onComplete = jest.fn();
var onShow = jest.fn();
describe('features/targeting/hocs/withTargetedClickThrough', function () {
  var WrappedComponent = function WrappedComponent() {
    return React.createElement("div", null);
  };

  var WrapperComponent = withTargetedClickThrough(WrappedComponent);

  var useDefaultTargetingApi = function useDefaultTargetingApi() {
    return {
      canShow: true,
      onClose: onClose,
      onComplete: onComplete,
      onShow: onShow
    };
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(WrapperComponent, _extends({
      closeOnClickOutside: true,
      shouldTarget: true,
      useTargetingApi: useDefaultTargetingApi
    }, props)));
  };

  describe('render()', function () {
    test('should render wrapped component with pass through props', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
  });
});