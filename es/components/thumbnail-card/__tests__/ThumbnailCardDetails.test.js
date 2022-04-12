function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import * as libDom from '../../../utils/dom';
import ThumbnailCardDetails from '../ThumbnailCardDetails';

var getWrapper = function getWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return shallow(React.createElement(ThumbnailCardDetails, _extends({
    title: React.createElement("div", null, "Foo Bar!")
  }, props)));
};

jest.mock('../../../utils/dom', function () {
  return {
    useIsContentOverflowed: jest.fn()
  };
});
describe('components/thumbnail-card/ThumbnailCardDetails', function () {
  beforeEach(function () {
    libDom.useIsContentOverflowed.mockReturnValue(false);
  });
  test('should render', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should render icon', function () {
    var icon = React.createElement("img", {
      alt: "icon"
    });
    var wrapper = getWrapper({
      icon: icon
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render subtitle', function () {
    var subtitle = React.createElement("div", null, "Subtitle!");
    var wrapper = getWrapper({
      subtitle: subtitle
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render actionItem', function () {
    var actionItem = React.createElement("button", {
      type: "button"
    }, "Click Me");
    var wrapper = getWrapper({
      actionItem: actionItem
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render a Tooltip if text is overflowed', function () {
    libDom.useIsContentOverflowed.mockReturnValue(true);
    var wrapper = mount(React.createElement(ThumbnailCardDetails, {
      title: React.createElement("div", null, "Foo Bar!")
    }));
    expect(wrapper.find('Tooltip').length).toBe(1);
  });
});