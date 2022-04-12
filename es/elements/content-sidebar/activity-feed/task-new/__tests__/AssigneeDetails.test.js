function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        status                  | completedAt\n        ", "    | ", "\n        ", "    | ", "\n        ", " | ", "\n        ", "     | ", "\n        ", "    | ", "\n        ", "                 | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import * as React from 'react';
import { render, mount } from 'enzyme';
import { TASK_NEW_APPROVED, TASK_NEW_REJECTED, TASK_NEW_NOT_STARTED } from '../../../../../constants';
import AssigneeDetails from '../AssigneeDetails';
var MOCK_USER = {
  id: '123',
  name: 'user one'
};
var MOCK_DATE = new Date('2019-01-01');
var MOCK_DATE_STRING = '2019-01-01T00:00:000Z';
describe('elements/content-sidebar/ActivityFeed/task-new/AssigneeDetails', function () {
  test.each(_templateObject(), TASK_NEW_APPROVED, MOCK_DATE_STRING, TASK_NEW_REJECTED, MOCK_DATE_STRING, TASK_NEW_NOT_STARTED, MOCK_DATE_STRING, 'invalid_string', MOCK_DATE_STRING, TASK_NEW_APPROVED, MOCK_DATE, null, MOCK_DATE)('should render details for status $status', function (_ref) {
    var status = _ref.status,
        completedAt = _ref.completedAt;
    var wrapper = mount(React.createElement(AssigneeDetails, {
      status: status,
      user: MOCK_USER,
      completedAt: completedAt
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should add className prop to wrapper div', function () {
    var mockClassName = 'some-class';
    var wrapper = render(React.createElement(AssigneeDetails, {
      status: TASK_NEW_APPROVED,
      user: MOCK_USER,
      completedAt: MOCK_DATE,
      className: mockClassName
    }));
    expect(wrapper.hasClass(mockClassName)).toBe(true);
  });
});