function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import AccessStatsItem from '../AccessStatsItem';
describe('features/access-stats/AccessStatsItem', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(AccessStatsItem, _extends({
      count: 100,
      statButtonProps: {},
      type: "preview"
    }, props)));
  };

  [{
    type: 'preview'
  }, {
    type: 'view'
  }, {
    type: 'download'
  }, {
    type: 'comment'
  }, {
    type: 'edit'
  }].forEach(function (_ref) {
    var type = _ref.type;
    test('should render access stats of type properly', function () {
      var wrapper = getWrapper({
        type: type
      });
      expect(wrapper.contains('+')).toBe(false);
      expect(wrapper).toMatchSnapshot();
    });
  });
  test('should render access stats of preview type properly with modal', function () {
    var wrapper = getWrapper({
      type: 'preview',
      openAccessStatsModal: function openAccessStatsModal() {},
      statButtonProps: {
        value: 1
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render access stats with a plus when count overflowed', function () {
    var wrapper = getWrapper({
      type: 'preview',
      openAccessStatsModal: function openAccessStatsModal() {},
      statButtonProps: {
        value: 1
      },
      hasCountOverflowed: true
    });
    expect(wrapper.contains('+')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render access stats with a zero count', function () {
    var wrapper = getWrapper({
      type: 'preview',
      count: 0
    });
    expect(wrapper).toMatchSnapshot();
  });
});