function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            assignToGroupFeature | numCheckboxes | checkboxTestId\n            ", "             | ", "          | ", "\n            ", "              | ", "          | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            numGroupAssignees | shouldShowCheckbox | checkBoxDisabled\n            ", "              | ", "           | ", "\n            ", "              | ", "            | ", "\n            ", "              | ", "            | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            numAssignees | shouldShowCheckbox | checkBoxDisabled\n            ", "         | ", "           | ", "\n            ", "         | ", "            | ", "\n            ", "         | ", "            | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { mount } from 'enzyme';
import DatePicker from '../../../../../components/date-picker/DatePicker'; // eslint-disable-line no-unused-vars

import { TASK_EDIT_MODE_EDIT } from '../../../../../constants';
import FeatureProvider from '../../../../common/feature-checking/FeatureProvider';
import { TaskFormUnwrapped as TaskForm } from '..';
import commonMessages from '../../../../../common/messages';
jest.mock('../../Avatar', function () {
  return function () {
    return 'Avatar';
  };
});
jest.mock('../../../../../components/date-picker/DatePicker', function () {
  return function (props) {
    // only spread `input` attritutes to the input field
    var name = props.name,
        _props$value = props.value,
        value = _props$value === void 0 ? '' : _props$value,
        className = props.className,
        onChange = props.onChange,
        placeholder = props.placeholder;
    var localInputProps = {
      name: name,
      value: value,
      className: className,
      onChange: onChange,
      placeholder: placeholder
    };
    return React.createElement("input", _extends({
      type: "date"
    }, localInputProps, props.inputProps)) // eslint-disable-line react/prop-types
    ;
  };
});
var mockIntl = {
  formatMessage: function formatMessage(message) {
    return message.defaultMessage;
  }
};

var render = function render(props) {
  return mount(React.createElement(TaskForm, _extends({
    getMentionWithQuery: function getMentionWithQuery() {},
    intl: mockIntl,
    user: {
      id: 123,
      name: 'foo bar'
    }
  }, props)));
};

var defaultFeatures = {
  activityFeed: {
    tasks: {
      assignToGroup: false
    }
  }
}; // TODO: Remove this when Any Task GA's

var renderWithFeatures = function renderWithFeatures(props, features) {
  return mount(React.createElement(FeatureProvider, {
    features: features || defaultFeatures
  }, React.createElement(TaskForm, _extends({
    getMentionWithQuery: function getMentionWithQuery() {},
    intl: mockIntl,
    user: {
      id: 123,
      name: 'foo bar'
    }
  }, props))));
};

describe('components/ContentSidebar/ActivityFeed/task-form/TaskForm', function () {
  test('should render form fields', function () {
    var wrapper = render({
      createTask: jest.fn()
    });
    var container = wrapper.render();
    expect(container.find('[data-testid="task-form-assignee-input"]').length).toEqual(1);
    expect(container.find('[data-testid="task-form-name-input"]').length).toEqual(1);
    expect(container.find('[data-testid="task-form-date-input"]').length).toEqual(1);
    expect(container.find('[data-testid="task-form-submit-button"]').length).toEqual(1);
    expect(container.find('[data-testid="task-form-cancel-button"]').length).toEqual(1);
  });
  test('should call createTask prop on submit when form is valid', function () {
    var createTaskSpy = jest.fn();
    var wrapper = render({
      createTask: createTaskSpy
    });
    var approvers = [{
      id: '',
      target: {
        id: 123,
        name: 'abc',
        type: 'user'
      },
      role: 'ASSIGNEE',
      type: 'task_collaborator',
      status: 'NOT_STARTED',
      permissions: {
        can_delete: false,
        can_update: false
      }
    }];
    var message = 'hey';
    var dueDate = new Date('2019-04-12'); // Warning: bypass user interactions to populate form

    wrapper.setState({
      approvers: approvers,
      message: message,
      dueDate: dueDate,
      isValid: true
    }); // Clicks should cause form submit but Enzyme doesn't do it

    var submitButton = wrapper.find('[data-testid="task-form-submit-button"]').hostNodes();
    submitButton.simulate('submit', {
      target: {
        checkValidity: function checkValidity() {
          return true;
        } // not implemented in JSDOM

      }
    });
    expect(createTaskSpy).toHaveBeenCalled();
  });
  test('should call editTask prop on submit when form is in edit mode', function () {
    var editTaskMock = jest.fn();
    var id = '1';
    var wrapper = render({
      id: id,
      editTask: editTaskMock,
      editMode: TASK_EDIT_MODE_EDIT
    });
    var instance = wrapper.instance();
    var description = 'hey'; // Set form state to reflect updated data

    wrapper.setState({
      message: description,
      isValid: true
    });
    var submitButton = wrapper.find('[data-testid="task-form-submit-button"]').hostNodes();
    submitButton.simulate('submit', {
      target: {
        checkValidity: function checkValidity() {
          return true;
        } // not implemented in JSDOM

      }
    });
    expect(editTaskMock).toHaveBeenCalledWith({
      addedAssignees: [],
      removedAssignees: [],
      id: id,
      description: description,
      due_at: null,
      completion_rule: 'ALL_ASSIGNEES'
    }, instance.handleSubmitSuccess, instance.handleSubmitError);
  });
  test('should call onCancel handler when cancel button is clicked',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var onCancelSpy, wrapper, cancelButton;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onCancelSpy = jest.fn();
            wrapper = render({
              onCancel: onCancelSpy
            }); // This should be linked to an element but Enzyme won't simulate the event below

            cancelButton = wrapper.find('[data-testid="task-form-cancel-button"]').hostNodes();
            cancelButton.simulate('click');
            expect(onCancelSpy).toHaveBeenCalledTimes(1);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('should not call createTask() when inputs are empty', function () {
    var createTaskSpy = jest.fn();
    var wrapper = render({
      createTask: createTaskSpy
    });
    var submitButton = wrapper.find('[data-testid="task-form-submit-button"]').hostNodes();
    submitButton.simulate('click');
    expect(createTaskSpy).not.toHaveBeenCalled();
  });
  test('should filter out already-assigned users from assignment dropdown options', function () {
    var wrapper = render({
      approverSelectorContacts: [{
        id: 123,
        item: {
          id: 123,
          name: 'name'
        },
        name: 'name'
      }, {
        id: 234,
        item: {
          id: 234,
          name: 'test'
        },
        name: 'test'
      }],
      createTask: jest.fn()
    });
    wrapper.setState({
      approvers: [{
        id: '',
        target: {
          id: 123,
          name: 'abc',
          type: 'user'
        },
        role: 'ASSIGNEE',
        type: 'task_collaborator',
        status: 'NOT_STARTED',
        permissions: {
          can_delete: false,
          can_update: false
        }
      }]
    });
    expect(wrapper.find('PillSelectorDropdown').prop('selectorOptions').length).toBe(1);
  });
  test('should add scrollable class when there are enough contacts in assignment dropdown', function () {
    var wrapper = render({
      approverSelectorContacts: [{
        id: 123,
        item: {
          id: 123,
          name: 'name'
        },
        name: 'name'
      }],
      createTask: jest.fn()
    });
    expect(wrapper.find('PillSelectorDropdown').hasClass('scrollable')).toBe(false);
    wrapper.setProps({
      approverSelectorContacts: [{
        id: 123,
        item: {
          id: 123,
          name: 'name'
        },
        name: 'name'
      }, {
        id: 234,
        item: {
          id: 234,
          name: 'test'
        },
        name: 'test'
      }, {
        id: 567,
        item: {
          id: 567,
          name: 'hello'
        },
        name: 'hello'
      }, {
        id: 890,
        item: {
          id: 890,
          name: 'bob'
        },
        name: 'bob'
      }, {
        id: 555,
        item: {
          id: 555,
          name: 'ann'
        },
        name: 'ann'
      }]
    });
    expect(wrapper.find('PillSelectorDropdown').hasClass('scrollable'));
  });
  describe('approver input', function () {
    test('should show error when approver input is incomplete (no pill selected)', function () {
      var value = 'not-a-user';
      var getApproverWithQuery = jest.fn();
      var wrapper = render({
        getApproverWithQuery: getApproverWithQuery
      });
      var input = wrapper.find('PillSelector[data-testid="task-form-assignee-input"]');
      input.prop('onInput')({
        target: {
          value: value
        }
      });
      input.prop('onBlur')();
      wrapper.update();
      input = wrapper.find('PillSelector[data-testid="task-form-assignee-input"]');
      expect(input.prop('error')).toBe(commonMessages.invalidUserError.defaultMessage); // 'Invalid User'
    });
  });
  describe('handleDueDateChange()', function () {
    test('should set the approval date to be one millisecond before midnight of the next day',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var date, validateFormMock, lastMillisecondOfDate, wrapper;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // Midnight on December 3rd GMT
              date = new Date('2018-12-03T00:00:00');
              validateFormMock = jest.fn(); // 11:59:59:999 on December 3rd GMT

              lastMillisecondOfDate = new Date('2018-12-03T23:59:59.999');
              wrapper = render({});
              wrapper.instance().validateForm = validateFormMock;
              wrapper.instance().handleDueDateChange(date);
              expect(wrapper.state('dueDate')).toEqual(lastMillisecondOfDate);
              expect(validateFormMock).toHaveBeenCalled();

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    test('should change a previously set approval date to null if there is no approval date', function () {
      // Midnight on December 3rd GMT
      var date = new Date('2018-12-03T00:00:00'); // 11:59:59:999 on December 3rd GMT

      var lastMillisecondOfDate = new Date('2018-12-03T23:59:59.999');
      var wrapper = render({});
      wrapper.instance().handleDueDateChange(date);
      expect(wrapper.state('dueDate')).toEqual(lastMillisecondOfDate);
      wrapper.instance().handleDueDateChange(null);
      expect(wrapper.state('dueDate')).toEqual(null);
    });
  });
  describe('handleApproverSelectorInput()', function () {
    test('should call getApproverWithQuery() when called', function () {
      var value = 'test';
      var getApproverWithQuery = jest.fn();
      var wrapper = render({
        getApproverWithQuery: getApproverWithQuery
      });
      wrapper.instance().handleApproverSelectorInput(value);
      expect(getApproverWithQuery).toHaveBeenCalledWith(value);
    });
  });
  describe('handleApproverSelectorSelect()', function () {
    test('should update approvers when called', function () {
      var approver = {
        id: '',
        target: {
          id: 123,
          name: 'abc',
          type: 'user'
        },
        role: 'ASSIGNEE',
        type: 'task_collaborator',
        status: 'NOT_STARTED',
        permissions: {
          can_delete: false,
          can_update: false
        }
      };
      var newApprover = {
        id: 234,
        text: 'bcd',
        item: {
          id: 234,
          name: 'bcd',
          type: 'user'
        }
      };
      var expectedNewApprover = {
        id: '',
        target: {
          id: 234,
          name: 'bcd',
          type: 'user'
        },
        role: 'ASSIGNEE',
        type: 'task_collaborator',
        status: 'NOT_STARTED',
        permissions: {
          can_delete: false,
          can_update: false
        }
      };
      var wrapper = render();
      wrapper.setState({
        approvers: [approver]
      });
      wrapper.instance().handleApproverSelectorSelect([newApprover]);
      expect(wrapper.state('approvers')).toEqual([approver, expectedNewApprover]);
    });
  });
  describe('handleApproverSelectorRemove()', function () {
    test('should update approvers when called', function () {
      var approvers = [{
        id: '',
        target: {
          id: 123,
          name: 'abc',
          type: 'user'
        },
        role: 'ASSIGNEE',
        type: 'task_collaborator',
        status: 'NOT_STARTED',
        permissions: {
          can_delete: false,
          can_update: false
        }
      }, {
        id: '',
        target: {
          id: 234,
          name: 'abc',
          type: 'user'
        },
        role: 'ASSIGNEE',
        type: 'task_collaborator',
        status: 'NOT_STARTED',
        permissions: {
          can_delete: false,
          can_update: false
        }
      }];
      var wrapper = render();
      wrapper.setState({
        approvers: approvers
      });
      wrapper.instance().handleApproverSelectorRemove(approvers[0], 0);
      expect(wrapper.state('approvers')).toEqual([approvers[1]]);
    });
  });
  describe('handleSubmitError()', function () {
    test('should call onSubmitError prop and unset isLoading state', function () {
      var errorMock = {
        foo: 'bar'
      };
      var onSubmitErrorMock = jest.fn();
      var wrapper = render({
        onSubmitError: onSubmitErrorMock
      });
      wrapper.setState({
        isLoading: true
      });
      wrapper.instance().handleSubmitError(errorMock);
      expect(wrapper.state('isLoading')).toEqual(false);
      expect(onSubmitErrorMock).toHaveBeenCalledWith(errorMock);
    });
  });
  describe('handleSubmitSuccess()', function () {
    test('should call onSubmitSuccess prop, clearForm and unset isLoading state', function () {
      var onSubmitSuccessMock = jest.fn();
      var clearFormMock = jest.fn();
      var wrapper = render({
        onSubmitSuccess: onSubmitSuccessMock
      });
      wrapper.setState({
        isLoading: true
      });
      wrapper.instance().clearForm = clearFormMock;
      wrapper.instance().handleSubmitSuccess();
      expect(wrapper.state('isLoading')).toEqual(false);
      expect(onSubmitSuccessMock).toHaveBeenCalled();
      expect(clearFormMock).toHaveBeenCalled();
    });
  });
  describe('completionRule()', function () {
    test.each(_templateObject(), 0, false, undefined, 1, true, true, 2, true, false)('checkbox should be shown correctly when number of assignees is $numAssignees', function (_ref3) {
      var numAssignees = _ref3.numAssignees,
          shouldShowCheckbox = _ref3.shouldShowCheckbox,
          checkBoxDisabled = _ref3.checkBoxDisabled;
      var approvers = new Array(numAssignees).fill().map(function () {
        return {
          id: '',
          target: {
            id: 123 * Math.random(),
            name: 'abc',
            type: 'user'
          },
          role: 'ASSIGNEE',
          type: 'task_collaborator',
          status: 'NOT_STARTED',
          permissions: {
            can_delete: false,
            can_update: false
          }
        };
      });
      var wrapper = renderWithFeatures({
        approvers: approvers
      });
      var container = wrapper.render();
      var checkbox = container.find('[data-testid="task-form-completion-rule-checkbox"]');
      expect(checkbox.length === 1).toBe(shouldShowCheckbox);
      expect(checkbox.prop('disabled')).toBe(checkBoxDisabled);
    });
    test.each(_templateObject2(), 0, false, undefined, 1, true, false, 2, true, false)('checkbox should be shown correctly when number of group assignees is $numGroupAssignees', function (_ref4) {
      var numGroupAssignees = _ref4.numGroupAssignees,
          shouldShowCheckbox = _ref4.shouldShowCheckbox,
          checkBoxDisabled = _ref4.checkBoxDisabled;
      var approvers = new Array(numGroupAssignees).fill().map(function () {
        return {
          id: '',
          target: {
            id: 123 * Math.random(),
            name: 'abc',
            type: 'group'
          },
          role: 'ASSIGNEE',
          type: 'task_collaborator',
          status: 'NOT_STARTED',
          permissions: {
            can_delete: false,
            can_update: false
          }
        };
      });
      var wrapper = renderWithFeatures({
        approvers: approvers
      });
      var container = wrapper.render();
      var checkbox = container.find('[data-testid="task-form-completion-rule-checkbox"]');
      expect(checkbox.length === 1).toBe(shouldShowCheckbox);
      expect(checkbox.prop('disabled')).toBe(checkBoxDisabled);
    });
    test('should enable checkbox when there is one type of each assignee', function () {
      var approvers = [{
        id: '',
        target: {
          id: 123 * Math.random(),
          name: 'abc',
          type: 'group'
        },
        role: 'ASSIGNEE',
        type: 'task_collaborator',
        status: 'NOT_STARTED',
        permissions: {
          can_delete: false,
          can_update: false
        }
      }, {
        id: '',
        target: {
          id: 123 * Math.random(),
          name: 'abc',
          type: 'user'
        },
        role: 'ASSIGNEE',
        type: 'task_collaborator',
        status: 'NOT_STARTED',
        permissions: {
          can_delete: false,
          can_update: false
        }
      }];
      var wrapper = renderWithFeatures({
        approvers: approvers
      });
      var container = wrapper.render();
      var checkbox = container.find('[data-testid="task-form-completion-rule-checkbox"]');
      expect(checkbox.length === 1).toBe(true);
      expect(checkbox.prop('disabled')).toBe(false);
    });
    test('should call createTask with any assignee param when checkbox is checked', function () {
      var createTaskSpy = jest.fn();
      var message = 'hey';
      var taskType = 'GENERAL';
      var dueDate = new Date('2019-04-12');
      var wrapper = renderWithFeatures({
        taskType: taskType,
        createTask: createTaskSpy
      });
      var approvers = new Array(3).fill().map(function () {
        return {
          id: '',
          target: {
            id: 123 * Math.random(),
            name: 'abc',
            type: 'user'
          },
          role: 'ASSIGNEE',
          type: 'task_collaborator',
          status: 'NOT_STARTED',
          permissions: {
            can_delete: false,
            can_update: false
          }
        };
      });
      wrapper.find(TaskForm).setState({
        approvers: approvers,
        message: message,
        dueDate: dueDate,
        completionRule: 'ANY_ASSIGNEE',
        isValid: true
      });
      var container = wrapper.render();
      var checkbox = container.find('[data-testid="task-form-completion-rule-checkbox"]');
      var submitButton = wrapper.find('[data-testid="task-form-submit-button"]').hostNodes();
      submitButton.simulate('submit', {
        target: {
          checkValidity: function checkValidity() {
            return true;
          }
        }
      });
      expect(checkbox.length).toBe(1);
      expect(checkbox.prop('checked')).toBe(true);
      expect(createTaskSpy).toHaveBeenCalledWith(message, expect.any(Object), taskType, dueDate.toISOString(), 'ANY_ASSIGNEE', expect.any(Function), expect.any(Function));
    });
    test.each(_templateObject3(), false, 1, 'task-form-completion-rule-checkbox', true, 1, 'task-form-completion-rule-checkbox-group')('Given 3 approvers, $numCheckboxes checkboxes are shown when any task is $anyTaskFeature and assign to group is $assignToGroupFeature (using test id $checkboxTestId)', function (_ref5) {
      var assignToGroupFeature = _ref5.assignToGroupFeature,
          numCheckboxes = _ref5.numCheckboxes,
          checkboxTestId = _ref5.checkboxTestId;
      var approvers = new Array(3).fill().map(function () {
        return {
          id: '',
          target: {
            id: 123 * Math.random(),
            name: 'abc',
            type: 'user'
          },
          role: 'ASSIGNEE',
          type: 'task_collaborator',
          status: 'NOT_STARTED',
          permissions: {
            can_delete: false,
            can_update: false
          }
        };
      });
      var wrapper = renderWithFeatures({
        approvers: approvers
      }, {
        activityFeed: {
          tasks: {
            assignToGroup: assignToGroupFeature
          }
        }
      });
      var container = wrapper.render();
      var checkbox = container.find("[data-testid=\"".concat(checkboxTestId, "\"]"));
      expect(checkbox.length).toBe(numCheckboxes);
    });
  });
  describe('addResinInfo()', function () {
    test('should set assignee added and removed information correctly', function () {
      var approvers = [{
        id: '123',
        target: {
          id: 123,
          name: 'abc',
          type: 'user'
        },
        role: 'ASSIGNEE',
        type: 'task_collaborator',
        status: 'NOT_STARTED',
        permissions: {
          can_delete: false,
          can_update: false
        }
      }, {
        id: '234',
        target: {
          id: 234,
          name: 'abc',
          type: 'user'
        },
        role: 'ASSIGNEE',
        type: 'task_collaborator',
        status: 'NOT_STARTED',
        permissions: {
          can_delete: false,
          can_update: false
        }
      }];
      var newApprover = {
        id: 456,
        text: 'bcd',
        item: {
          id: 456,
          name: 'bcd',
          type: 'user'
        }
      };
      var dueDate = new Date('2019-04-12');
      var wrapper = render({
        id: 12345678,
        editMode: TASK_EDIT_MODE_EDIT,
        approvers: approvers
      });
      wrapper.setState({
        dueDate: dueDate
      }); // add approver

      wrapper.instance().handleApproverSelectorSelect([newApprover]); // remove approver

      wrapper.instance().handleApproverSelectorRemove(approvers[0], 0);
      wrapper.mount();
      expect(wrapper.find('.bcs-task-input-controls')).toMatchSnapshot();
    });
  });
});