function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        eachTask         | expected\n        ", "          | ", "\n        ", " | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import cloneDeep from 'lodash/cloneDeep';
import { TaskComponent as Task } from '..';
var allHandlers = {
  tasks: {
    edit: jest.fn()
  },
  contacts: {
    getApproverWithQuery: jest.fn(),
    getMentionWithQuery: jest.fn()
  }
};
var approverSelectorContacts = [];
describe('elements/content-sidebar/ActivityFeed/task-new/Task', function () {
  var currentUser = {
    name: 'Jake Thomas',
    id: '1',
    type: 'user'
  };
  var otherUser = {
    name: 'Patrick Paul',
    id: '3',
    type: 'user'
  };
  var creatorUser = {
    name: 'Steven Yang',
    id: '5',
    type: 'user'
  };
  var taskId = '123125';
  var task = {
    assigned_to: {
      entries: [{
        id: 'current-user-assignment-id',
        target: currentUser,
        status: 'NOT_STARTED',
        role: 'ASSIGNEE',
        permissions: {
          can_update: true,
          can_delete: true
        },
        type: 'task_collaborator'
      }, {
        id: 'other-user-assignment-id',
        target: otherUser,
        status: 'COMPLETED',
        role: 'ASSIGNEE',
        permissions: {
          can_update: true,
          can_delete: true
        },
        type: 'task_collaborator'
      }],
      limit: 10,
      next_marker: null
    },
    completion_rule: 'ALL_ASSIGNEES',
    created_at: '2010-01-01',
    created_by: {
      id: '0',
      target: creatorUser,
      role: 'CREATOR',
      status: 'NOT_STARTED',
      type: 'task_collaborator'
    },
    due_at: null,
    id: taskId,
    description: 'This is where we tell each other what we need to do',
    status: 'NOT_STARTED',
    permissions: {
      can_update: true,
      can_delete: true,
      can_create_task_collaborator: true,
      can_create_task_link: true
    },
    task_links: {
      entries: [{
        type: 'task_link',
        id: '6231775',
        task: {
          id: taskId,
          type: 'task',
          due_at: null
        },
        target: {
          type: 'file',
          id: '7895970959',
          sequence_id: '1',
          etag: '1',
          sha1: '6cdf9453724469d11469d4f7c2f21dcb828073d5',
          name: 'file1.csv'
        },
        description: '',
        permissions: {
          can_update: true,
          can_delete: true
        }
      }],
      limit: 1000,
      next_marker: null
    },
    task_type: 'GENERAL',
    type: 'task'
  };
  var taskMultifile = cloneDeep(task);
  taskMultifile.task_links.entries.push({
    type: 'task_link',
    id: taskId,
    task: {
      id: '16431755',
      type: 'task',
      due_at: null
    },
    target: {
      type: 'file',
      id: '7895975164',
      sequence_id: '1',
      etag: '1',
      sha1: 'b02ef8e024b1e654d050733c5bb12e6c83a5586c',
      name: 'skynet-file2.csv'
    },
    description: '',
    permissions: {
      can_update: true,
      can_delete: true
    }
  });
  test('should correctly render task', function () {
    var wrapper = shallow(React.createElement(Task, _extends({
      currentUser: currentUser,
      onEdit: jest.fn(),
      onDelete: jest.fn()
    }, task)));
    expect(wrapper).toMatchSnapshot();
  });
  test('should show assignment status badges for each assignee', function () {
    var wrapper = mount(React.createElement(Task, _extends({
      currentUser: currentUser,
      onEdit: jest.fn(),
      onDelete: jest.fn()
    }, task)));
    expect(wrapper.find('[data-testid="avatar-group-avatar-container"]')).toHaveLength(2);
  });
  test('should show multifile badge if task has multiple files', function () {
    var wrapper = mount(React.createElement(Task, _extends({
      currentUser: currentUser
    }, taskMultifile)));
    expect(wrapper.find('[data-testid="multifile-badge"]').hostNodes()).toHaveLength(1);
  });
  test('should not show multifile badge if task does not have multiple files', function () {
    var wrapper = mount(React.createElement(Task, _extends({
      currentUser: currentUser
    }, task)));
    expect(wrapper.find('[data-testid="multifile-badge"]').hostNodes()).toHaveLength(0);
  });
  test('should not show due date container if not set', function () {
    var wrapper = shallow(React.createElement(Task, _extends({
      currentUser: currentUser,
      onEdit: jest.fn(),
      onDelete: jest.fn()
    }, task)));
    expect(wrapper.find('[data-testid="task-due-date"]')).toHaveLength(0);
  });
  test('should show due date if set', function () {
    var wrapper = mount(React.createElement(Task, _extends({
      currentUser: currentUser,
      onEdit: jest.fn(),
      onDelete: jest.fn()
    }, task, {
      due_at: new Date() + 1000
    })));
    expect(wrapper.find('[data-testid="task-due-date"]')).toHaveLength(1);
  });
  test('due date should have overdue class if task is incomplete and due date is in past', function () {
    var incompleteWrapper = mount(React.createElement(Task, _extends({}, task, {
      currentUser: currentUser,
      onEdit: jest.fn(),
      onDelete: jest.fn(),
      due_at: new Date() - 1000,
      status: "NOT_STARTED"
    })));
    expect(incompleteWrapper.render().find('[data-testid="task-overdue-date"]')).toHaveLength(1);
  });
  test('due date should not have overdue class if task is complete and due date is in past', function () {
    var completeWrapper = mount(React.createElement(Task, _extends({}, task, {
      currentUser: currentUser,
      onEdit: jest.fn(),
      onDelete: jest.fn(),
      due_at: new Date() - 1000,
      status: "COMPLETED"
    })));
    expect(completeWrapper.find('[data-testid="task-overdue-date"]')).toHaveLength(0);
  });
  test('should add pending class for isPending prop', function () {
    // this is for optimistic UI updates in the activity feed card list
    var myTask = _objectSpread({}, task, {
      isPending: true
    });

    var wrapper = shallow(React.createElement(Task, _extends({
      currentUser: currentUser,
      onEdit: jest.fn(),
      onDelete: jest.fn()
    }, myTask)));
    expect(wrapper.find('[data-testid="task-card"]').hasClass('bcs-is-pending')).toBe(true);
  });
  test('should show actions when current user is assigned and task is incomplete', function () {
    [task, taskMultifile].forEach(function (eachTask) {
      var wrapper = shallow(React.createElement(Task, _extends({
        currentUser: currentUser
      }, eachTask, {
        isPending: false,
        onAssignmentUpdate: jest.fn()
      })));
      expect(wrapper.find('TaskActions')).toHaveLength(1);
    });
  });
  test('should not show actions when current user is assigned and task is complete', function () {
    [task, taskMultifile].forEach(function (eachTask) {
      var wrapper = shallow(React.createElement(Task, _extends({
        currentUser: currentUser
      }, eachTask, {
        isPending: false,
        onAssignmentUpdate: jest.fn(),
        status: "COMPLETED"
      })));
      expect(wrapper.find('TaskActions')).toHaveLength(0);
    });
  });
  test('should not show actions when current user is not assigned', function () {
    [task, taskMultifile].forEach(function (eachTask) {
      var wrapper = shallow(React.createElement(Task, _extends({
        currentUser: _objectSpread({}, currentUser, {
          id: 'something-else-1'
        })
      }, eachTask, {
        isPending: false,
        onAssignmentUpdate: jest.fn()
      })));
      expect(wrapper.find('TaskActions')).toHaveLength(0);
    });
  });
  test.each(_templateObject(), task, 0, taskMultifile, 1)('should show action for creator of task when task is multifile', function (_ref) {
    var eachTask = _ref.eachTask,
        expected = _ref.expected;
    var wrapper = shallow(React.createElement(Task, _extends({}, eachTask, {
      currentUser: creatorUser
    })));
    expect(wrapper.find('[data-testid="action-container"]')).toHaveLength(expected);
  });
  test('should show actions for task type', function () {
    var approvalTask = mount(React.createElement(Task, _extends({}, task, {
      task_type: "APPROVAL",
      currentUser: currentUser
    }))).render();
    var approvalBtns = global.queryAllByTestId(approvalTask, 'approve-task');
    var rejectBtns = global.queryAllByTestId(approvalTask, 'reject-task');
    expect(approvalBtns).toHaveLength(1);
    expect(rejectBtns).toHaveLength(1);
    var generalTask = mount(React.createElement(Task, _extends({}, task, {
      task_type: "GENERAL",
      currentUser: currentUser
    }))).render();
    var completeBtns = global.queryAllByTestId(generalTask, 'complete-task');
    expect(completeBtns).toHaveLength(1);
  });
  test('should show proper icons for task avatar based on task type', function () {
    var approvalTask = mount(React.createElement(Task, _extends({}, task, {
      task_type: "APPROVAL",
      currentUser: currentUser
    })));
    expect(approvalTask.find('IconTaskApproval')).toHaveLength(1);
    var generalTask = mount(React.createElement(Task, _extends({}, task, {
      task_type: "GENERAL",
      currentUser: currentUser
    })));
    expect(generalTask.find('IconTaskGeneral')).toHaveLength(1);
  });
  test('should call onAssignmentUpdate with completed status when task action complete is clicked', function () {
    var onAssignmentUpdateSpy = jest.fn();
    var wrapper = mount(React.createElement(Task, _extends({}, task, {
      currentUser: currentUser,
      onAssignmentUpdate: onAssignmentUpdateSpy,
      approverSelectorContacts: approverSelectorContacts
    })));
    var checkButton = wrapper.find('[data-testid="complete-task"]').hostNodes();
    checkButton.simulate('click');
    expect(onAssignmentUpdateSpy).toHaveBeenCalledWith(taskId, 'current-user-assignment-id', 'COMPLETED');
  });
  test('should call onView when view-task-details button is clicked for multifile task', function () {
    var onViewSpy = jest.fn();
    var wrapper = mount(React.createElement(Task, _extends({}, taskMultifile, {
      currentUser: currentUser,
      onView: onViewSpy
    })));
    wrapper.find('[data-testid="view-task"]').hostNodes().simulate('click');
    expect(onViewSpy).toHaveBeenCalledWith(taskId, false);
  });
  test('should not show view-task-details button for multifile task when onView callback is undefined', function () {
    var wrapper = mount(React.createElement(Task, _extends({}, taskMultifile, {
      currentUser: currentUser
    })));
    expect(wrapper.find('[data-testid="view-task"]').hostNodes()).toHaveLength(0);
  });
  test('should not allow user to delete if the task permissions do not allow it', function () {
    var wrapper = shallow(React.createElement(Task, _extends({}, task, {
      permissions: {
        can_delete: false,
        can_update: true
      },
      currentUser: otherUser,
      approverSelectorContacts: approverSelectorContacts,
      handlers: allHandlers,
      onDelete: jest.fn()
    })));
    wrapper.find('MediaMenu[data-testid="task-actions-menu"]').simulate('click');
    wrapper.update();
    expect(wrapper.find('MenuItem[data-testid="delete-task"]')).toHaveLength(0);
    expect(wrapper.find('MenuItem[data-testid="edit-task"]')).toHaveLength(1);
  });
  test('should not allow user to edit if the permissions do not allow it', function () {
    var wrapper = shallow(React.createElement(Task, _extends({}, task, {
      permissions: {
        can_delete: true,
        can_update: false
      },
      currentUser: otherUser,
      approverSelectorContacts: approverSelectorContacts,
      handlers: allHandlers,
      onEdit: jest.fn()
    })));
    wrapper.find('MediaMenu[data-testid="task-actions-menu"]').simulate('click');
    wrapper.update();
    expect(wrapper.find('MenuItem[data-testid="edit-task"]')).toHaveLength(0);
    expect(wrapper.find('MenuItem[data-testid="delete-task"]')).toHaveLength(1);
  });
  test('should show inline error for error prop', function () {
    var wrapper = mount(React.createElement(Task, _extends({}, task, {
      currentUser: currentUser,
      error: {
        title: 'blah',
        message: 'blah'
      },
      onEdit: jest.fn(),
      onDelete: jest.fn()
    })));
    expect(wrapper.find('ActivityError')).toHaveLength(1);
  });
  test('should call getAllTaskCollaborators on modal open if there is a next_marker',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var taskWithMarker, wrapper, instance;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            taskWithMarker = _objectSpread({}, task, {
              assigned_to: {
                next_marker: 'foo',
                entries: []
              }
            });
            wrapper = mount(React.createElement(Task, _extends({}, taskWithMarker, {
              currentUser: currentUser,
              error: {
                title: 'blah',
                message: 'blah'
              },
              onEdit: jest.fn(),
              onDelete: jest.fn()
            })));
            instance = wrapper.instance();
            instance.getAllTaskCollaborators = jest.fn();
            _context.next = 6;
            return instance.handleEditClick();

          case 6:
            expect(instance.getAllTaskCollaborators).toBeCalled();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('should be able to toggle expanded state', function () {
    var COUNT = 30;
    var INITIAL_DISPLAY_COUNT = 3;
    var assigneeList;

    var taskWithThirtyAssignees = _objectSpread({}, task, {
      assigned_to: {
        next_marker: null,
        entries: Array.from({
          length: COUNT
        }, function (_, idx) {
          return {
            id: "current-user-assignment-id-".concat(idx),
            target: currentUser,
            status: 'NOT_STARTED',
            role: 'ASSIGNEE',
            permissions: {
              can_update: true,
              can_delete: true
            },
            type: 'task_collaborator'
          };
        })
      }
    });

    var wrapper = mount(React.createElement(Task, _extends({
      currentUser: currentUser,
      onEdit: jest.fn(),
      onDelete: jest.fn()
    }, taskWithThirtyAssignees, {
      due_at: new Date() + 1000
    })));
    assigneeList = global.queryAllByTestId(wrapper, 'assignee-list-item');
    expect(assigneeList).toHaveLength(INITIAL_DISPLAY_COUNT);
    var expandBtn = global.queryAllByTestId(wrapper, 'show-more-assignees').first();
    expandBtn.simulate('click');
    assigneeList = global.queryAllByTestId(wrapper, 'assignee-list-item');
    expect(assigneeList).toHaveLength(COUNT);
    var collapseBtn = global.queryAllByTestId(wrapper, 'show-less-assignees').first();
    collapseBtn.simulate('click');
    assigneeList = global.queryAllByTestId(wrapper, 'assignee-list-item');
    expect(assigneeList).toHaveLength(INITIAL_DISPLAY_COUNT);
  });
  test('should call onModalClose prop when modal is closed', function () {
    var onModalClose = jest.fn();
    var wrapper = mount(React.createElement(Task, _extends({}, task, {
      currentUser: currentUser,
      onModalClose: onModalClose
    })));
    var instance = wrapper.instance();
    instance.handleEditModalClose();
    expect(onModalClose).toBeCalled();
  });
});