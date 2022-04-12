function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n        blockedReason        | isDisabled | tooltipMessage\n        ", " | ", "    | ", "\n        ", "     | ", "    | ", "\n        ", "       | ", "    | ", "\n        ", "                | ", "   | ", "\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        targetingApi          | isFtuxVisible | isTooltipVisible\n        ", "  | ", "       | ", "\n        ", " | ", "      | ", "\n        ", "          | ", "      | ", "\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        status       | label\n        ", " | ", "\n        ", "  | ", "\n        ", "  | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { shallow } from 'enzyme';
import BoxSign28 from '../../../icon/logo/BoxSign28';
import PlainButton from '../../../components/plain-button';
import SidebarNavSign from '../SidebarNavSign'; // @ts-ignore Module is written in Flow

import TargetedClickThroughGuideTooltip from '../../../features/targeting/TargetedClickThroughGuideTooltip';
import Tooltip from '../../../components/tooltip';
describe('elements/content-sidebar/SidebarNavSign', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SidebarNavSign, props)).dive();
  };

  test.each(_templateObject(), undefined, 'Request Signature', 'random', 'Request Signature', 'active', 'Sign')('should render the correct label based on the current signature status', function (_ref) {
    var label = _ref.label,
        status = _ref.status;
    var wrapper = getWrapper({
      status: status
    });
    expect(wrapper.find(Tooltip).prop('text')).toBe(label);
    expect(wrapper.find(PlainButton).prop('aria-label')).toBe(label);
    expect(wrapper.exists(BoxSign28)).toBe(true);
  });
  test.each(_templateObject2(), {
    canShow: true
  }, true, false, {
    canShow: false
  }, false, true, undefined, false, true)('should render the ftux and main tooltip based on the targeting api', function (_ref2) {
    var isFtuxVisible = _ref2.isFtuxVisible,
        isTooltipVisible = _ref2.isTooltipVisible,
        targetingApi = _ref2.targetingApi;
    var wrapper = getWrapper({
      targetingApi: targetingApi
    });
    expect(wrapper.find(Tooltip).prop('isDisabled')).toBe(!isTooltipVisible);
    expect(wrapper.exists(TargetedClickThroughGuideTooltip)).toBe(isFtuxVisible);
    expect(wrapper.exists(BoxSign28)).toBe(true); // Child components should always be rendered
  });
  test.each(_templateObject3(), 'shield-download', true, 'This action is unavailable due to a security policy.', 'shared-link', true, 'This action is unavailable due to a security policy.', 'watermark', true, 'This action is unavailable, because the file is watermarked.', '', false, 'Request Signature')('should render the correct main tooltip and ftux tooltip based on the blockedReason', function (_ref3) {
    var blockedReason = _ref3.blockedReason,
        isDisabled = _ref3.isDisabled,
        tooltipMessage = _ref3.tooltipMessage;
    var wrapper = getWrapper({
      blockedReason: blockedReason,
      targetingApi: {
        canShow: true
      }
    });
    expect(wrapper.find(Tooltip).prop('text')).toBe(tooltipMessage);
    expect(wrapper.exists(BoxSign28)).toBe(true);
    expect(wrapper.find(PlainButton).prop('isDisabled')).toBe(isDisabled);
    expect(wrapper.exists(TargetedClickThroughGuideTooltip)).toBe(!isDisabled);
  });
});