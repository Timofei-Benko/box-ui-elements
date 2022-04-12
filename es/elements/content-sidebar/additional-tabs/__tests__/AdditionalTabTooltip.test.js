import React from 'react';
import { shallow } from 'enzyme';
import AdditionalTabTooltip from '../AdditionalTabTooltip';
import Tooltip from '../../../common/Tooltip';
import TargetedClickThroughGuideTooltip from '../../../../features/targeting/TargetedClickThroughGuideTooltip';
describe('elements/content-sidebar/additional-tabs/AdditionalTabTooltip', function () {
  var getWrapper = function getWrapper(props, children) {
    return shallow(React.createElement(AdditionalTabTooltip, props, children));
  };

  test('should render the FTUX tooltip when isFtuxVisible is true and the FTUX can be shown', function () {
    var children = React.createElement("div", {
      "data-testid": "additional-tab-tooltip-children"
    }, "Child content");

    var targetingApi = function targetingApi() {
      return {
        canShow: true
      };
    };

    var text = 'FTUX Text';
    var wrapper = getWrapper({
      isFtuxVisible: true,
      ftuxTooltipData: {
        targetingApi: targetingApi,
        text: text
      }
    }, children);
    var ftuxTooltip = wrapper.find(TargetedClickThroughGuideTooltip);
    expect(ftuxTooltip.exists()).toBeTruthy();
    expect(ftuxTooltip.prop('body')).toBe(text);
    expect(ftuxTooltip.prop('useTargetingApi')).toBe(targetingApi);
    expect(ftuxTooltip.children().find('[data-testid="additional-tab-tooltip-children"]').exists()).toBeTruthy();
    expect(wrapper.find(Tooltip).exists()).toBeFalsy();
  });
  test('should render the children with the default tooltip when isFtuxVisible is false', function () {
    var children = React.createElement("div", {
      "data-testid": "additional-tab-tooltip-children"
    }, "Child content");
    var wrapper = getWrapper({
      isFtuxVisible: false
    }, children);
    expect(wrapper.find(TargetedClickThroughGuideTooltip).exists()).toBeFalsy();
    expect(wrapper.find(Tooltip).exists()).toBeTruthy();
    expect(wrapper.find('[data-testid="additional-tab-tooltip-children"]').exists()).toBeTruthy();
  });
  test('should render the children with the default tooltip when canShow is false', function () {
    var children = React.createElement("div", {
      "data-testid": "additional-tab-tooltip-children"
    }, "Child content");

    var targetingApi = function targetingApi() {
      return {
        canShow: false
      };
    };

    var text = 'FTUX Text';
    var wrapper = getWrapper({
      isFtuxVisible: true,
      ftuxTooltipData: {
        targetingApi: targetingApi,
        text: text
      }
    }, children);
    expect(wrapper.find(TargetedClickThroughGuideTooltip).exists()).toBeFalsy();
    expect(wrapper.find(Tooltip).exists()).toBeTruthy();
    expect(wrapper.find('[data-testid="additional-tab-tooltip-children"]').exists()).toBeTruthy();
  });
});