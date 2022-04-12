function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        completionRule              | iconLength\n        ", " | ", "\n        ", " | ", "\n        ", "                     | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import * as React from 'react';
import { mount } from 'enzyme';
import { TASK_COMPLETION_RULE_ALL, TASK_COMPLETION_RULE_ANY, TASK_NEW_IN_PROGRESS } from '../../../../../constants';
import Avatar16 from '../../../../../icon/line/Avatar16';
import TaskCompletionRuleIcon from '../TaskCompletionRuleIcon';

var getWrapper = function getWrapper(props) {
  return mount(React.createElement(TaskCompletionRuleIcon, props));
};

describe('elements/content-sidebar/ActivityFeed/task-new/TaskCompletionRuleIcon', function () {
  test.each(_templateObject(), TASK_COMPLETION_RULE_ALL, 0, TASK_COMPLETION_RULE_ANY, 1, null, 0)('should render the completion icon correctly', function (_ref) {
    var completionRule = _ref.completionRule,
        iconLength = _ref.iconLength;
    var wrapper = getWrapper({
      status: TASK_NEW_IN_PROGRESS,
      completionRule: completionRule
    });
    expect(wrapper.find(Avatar16).length).toBe(iconLength);
  });
});