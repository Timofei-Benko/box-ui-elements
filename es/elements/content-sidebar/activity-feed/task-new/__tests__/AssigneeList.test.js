function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            numAssignees | next_marker | count | messageId\n            ", "        | ", "     | ", " | ", "\n            ", "        | ", "    | ", " | ", "\n            ", "        | ", "     | ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { TASK_NEW_APPROVED, TASK_NEW_REJECTED, TASK_NEW_NOT_STARTED } from '../../../../../constants';
import messages from '../messages';
import AssigneeList from '../AssigneeList';
var entries = [{
  id: '0001',
  target: {
    type: 'user',
    id: '111',
    name: 'AL'
  },
  status: TASK_NEW_REJECTED
}, {
  id: '0002',
  target: {
    type: 'user',
    id: '222',
    name: 'AK'
  },
  status: TASK_NEW_APPROVED
}, {
  id: '0003',
  target: {
    type: 'user',
    id: '333',
    name: 'AJ'
  },
  status: TASK_NEW_NOT_STARTED
}];
var assignees = {
  entries: entries,
  limit: null,
  next_marker: null
};

var mockGetAvatarUrl = function mockGetAvatarUrl() {
  return Promise.resolve('url.jpg');
};

var onExpand = jest.fn(function () {});
var onCollapse = jest.fn(function () {});
describe('elements/content-sidebar/ActivityFeed/task-new/AssigneeList', function () {
  describe('render()', function () {
    test('should render avatars for each assignee up to initialAssigneeCount', function () {
      var initialCount = 2;
      var wrapper = shallow(React.createElement(AssigneeList, {
        onExpand: onExpand,
        onCollapse: onCollapse,
        isOpen: false,
        users: assignees,
        initialAssigneeCount: initialCount,
        getAvatarUrl: mockGetAvatarUrl
      }));
      var assigneeList = global.queryAllByTestId(wrapper, 'assignee-list-item');
      expect(assigneeList).toHaveLength(2);
    });
    test('should show expand button with N additional assignees when there are more assignees than initialAssigneeCount', function () {
      var initialCount = 2;
      var wrapper = shallow(React.createElement(AssigneeList, {
        onExpand: onExpand,
        users: assignees,
        initialAssigneeCount: initialCount,
        getAvatarUrl: mockGetAvatarUrl
      }));
      var expandBtn = global.queryAllByTestId(wrapper, 'show-more-assignees');
      var hideBtn = global.queryAllByTestId(wrapper, 'show-less-assignees');
      expect(expandBtn).toHaveLength(1);
      expect(hideBtn).toHaveLength(0);
      expect(expandBtn.find('FormattedMessage').prop('values')).toEqual({
        additionalAssigneeCount: 1
      });
    });
    test.each(_templateObject(), 20, null, 17, messages.taskShowMoreAssignees.id, 20, 'abc', 17, messages.taskShowMoreAssigneesOverflow.id, 25, null, 17, messages.taskShowMoreAssigneesOverflow.id)('should show overflow message (N+) when there are more assignees and/or another page of results', function (_ref) {
      var numAssignees = _ref.numAssignees,
          next_marker = _ref.next_marker,
          count = _ref.count,
          messageId = _ref.messageId;
      var initialCount = 3;
      var pageSize = 20;
      var paginatedAssignees = {
        entries: Array(numAssignees).fill({
          id: '0001',
          target: {
            type: 'user',
            id: '111',
            name: 'AL'
          },
          status: TASK_NEW_REJECTED
        }),
        next_marker: next_marker,
        limit: pageSize
      };
      var wrapper = shallow(React.createElement(AssigneeList, {
        onExpand: onExpand,
        onCollapse: onCollapse,
        users: paginatedAssignees,
        initialAssigneeCount: initialCount,
        getAvatarUrl: mockGetAvatarUrl,
        isOpen: false
      }));
      var expandBtn = global.queryAllByTestId(wrapper, 'show-more-assignees');
      var hideBtn = global.queryAllByTestId(wrapper, 'show-less-assignees');
      expect(expandBtn).toHaveLength(1);
      expect(hideBtn).toHaveLength(0);
      expect(expandBtn.find('FormattedMessage').prop('id')).toEqual(messageId);
      expect(expandBtn.find('FormattedMessage').prop('values')).toEqual({
        additionalAssigneeCount: count
      });
    });
    test('should show not show overflow icon when there are fewer assignees than initialAssigneeCount', function () {
      var initialCount = 3;
      var wrapper = shallow(React.createElement(AssigneeList, {
        onExpand: onExpand,
        onCollapse: onCollapse,
        users: assignees,
        isOpen: false,
        initialAssigneeCount: initialCount,
        getAvatarUrl: mockGetAvatarUrl
      }));
      expect(global.queryAllByTestId(wrapper, 'show-more-assignees')).toHaveLength(0);
      expect(global.queryAllByTestId(wrapper, 'show-less-assignees')).toHaveLength(0);
    });
    test('should call onExpand when expand button is clicked', function () {
      var initialCount = 2;
      var wrapper = mount(React.createElement(AssigneeList, {
        isOpen: false,
        onExpand: onExpand,
        onCollapse: onCollapse,
        users: assignees,
        initialAssigneeCount: initialCount,
        getAvatarUrl: mockGetAvatarUrl
      }));
      var expandBtn = global.queryAllByTestId(wrapper, 'show-more-assignees').first();
      expandBtn.simulate('click');
      expect(onExpand).toHaveBeenCalled();
    });
    test('should call onCollapse when hide button is clicked', function () {
      var initialCount = 2;
      var wrapper = mount(React.createElement(AssigneeList, {
        isOpen: true,
        onExpand: onExpand,
        onCollapse: onCollapse,
        users: assignees,
        initialAssigneeCount: initialCount,
        getAvatarUrl: mockGetAvatarUrl
      }));
      var hideBtn = global.queryAllByTestId(wrapper, 'show-less-assignees').first();
      hideBtn.simulate('click');
      expect(onCollapse).toHaveBeenCalled();
    });
  });
});