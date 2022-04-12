function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        status\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import * as React from 'react';
import { mount } from 'enzyme';
import { TASK_NEW_APPROVED, TASK_NEW_REJECTED, TASK_NEW_COMPLETED, TASK_NEW_NOT_STARTED, TASK_NEW_IN_PROGRESS } from '../../../../../constants';
import TaskStatus from '../TaskStatus';

var getWrapper = function getWrapper(props) {
  return mount(React.createElement(TaskStatus, props));
};

describe('elements/content-sidebar/ActivityFeed/task-new/TaskStatus', function () {
  test.each(_templateObject(), TASK_NEW_APPROVED, TASK_NEW_REJECTED, TASK_NEW_COMPLETED, TASK_NEW_NOT_STARTED, TASK_NEW_IN_PROGRESS)('should render the correct task status $status', function (_ref) {
    var status = _ref.status;
    var wrapper = getWrapper({
      status: status
    });
    expect(wrapper).toMatchSnapshot();
  });
});