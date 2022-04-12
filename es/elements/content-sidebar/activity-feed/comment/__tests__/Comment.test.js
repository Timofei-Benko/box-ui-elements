function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        permissions                               | onEdit       | showMenu | showDelete | showEdit\n        ", "  | ", " | ", "  | ", "    | ", "\n        ", "  | ", " | ", "  | ", "   | ", "\n        ", "  | ", " | ", " | ", "   | ", "\n        ", " | ", " | ", " | ", "   | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import Comment from '../Comment';
import CommentForm from '../../comment-form/CommentForm';
jest.mock('../../Avatar', function () {
  return function () {
    return 'Avatar';
  };
});
var currentUser = {
  name: 'testuser',
  id: 11
};
var approverSelectorContacts = [];
var mentionSelectorContacts = [];
var TIME_STRING_SEPT_27_2017 = '2017-09-27T10:40:41-07:00';
var allHandlers = {
  tasks: {
    edit: jest.fn()
  },
  contacts: {
    getApproverWithQuery: jest.fn(),
    getMentionWithQuery: jest.fn()
  }
};
describe('elements/content-sidebar/ActivityFeed/comment/Comment', function () {
  beforeEach(function () {
    CommentForm.default = jest.fn().mockReturnValue(React.createElement("div", null));
  });
  test('should correctly render comment', function () {
    var unixTime = new Date(TIME_STRING_SEPT_27_2017).getTime();
    var comment = {
      created_at: TIME_STRING_SEPT_27_2017,
      tagged_message: 'test',
      created_by: {
        name: '50 Cent',
        id: 10
      },
      permissions: {
        can_delete: true,
        can_edit: true
      }
    };
    var wrapper = shallow(React.createElement(Comment, _extends({
      id: "123"
    }, comment, {
      approverSelectorContacts: approverSelectorContacts,
      currentUser: currentUser,
      handlers: allHandlers,
      mentionSelectorContacts: mentionSelectorContacts
    }))); // validating that the Tooltip and the comment posted time are properly set

    expect(wrapper.find('ActivityTimestamp').prop('date')).toEqual(unixTime);
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render comment when translation is enabled', function () {
    var translations = {
      translationEnabled: true,
      onTranslate: jest.fn()
    };
    var comment = {
      created_at: TIME_STRING_SEPT_27_2017,
      tagged_message: 'test',
      created_by: {
        name: '50 Cent',
        id: 10
      }
    };
    var wrapper = shallow(React.createElement(Comment, _extends({
      id: "123"
    }, comment, {
      approverSelectorContacts: approverSelectorContacts,
      currentUser: currentUser,
      handlers: allHandlers,
      mentionSelectorContacts: mentionSelectorContacts,
      translations: translations
    })));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render commenter as a link', function () {
    var comment = {
      created_at: TIME_STRING_SEPT_27_2017,
      tagged_message: 'test',
      created_by: {
        name: '50 Cent',
        id: 10
      }
    };
    var wrapper = shallow(React.createElement(Comment, _extends({
      id: "123"
    }, comment, {
      approverSelectorContacts: approverSelectorContacts,
      currentUser: currentUser,
      handlers: allHandlers,
      mentionSelectorContacts: mentionSelectorContacts
    })));
    expect(wrapper).toMatchSnapshot();
  });
  test.each(_templateObject(), {
    can_delete: true,
    can_edit: false
  }, jest.fn(), true, true, false, {
    can_delete: false,
    can_edit: true
  }, jest.fn(), true, false, true, {
    can_delete: false,
    can_edit: true
  }, undefined, false, false, false, {
    can_delete: false,
    can_edit: false
  }, jest.fn(), false, false, false)("for a comment with permissions $permissions and onEdit ($onEdit), should showMenu: $showMenu, showDelete: $showDelete, showEdit: $showEdit", function (_ref) {
    var permissions = _ref.permissions,
        onEdit = _ref.onEdit,
        showMenu = _ref.showMenu,
        showDelete = _ref.showDelete,
        showEdit = _ref.showEdit;
    var comment = {
      created_at: TIME_STRING_SEPT_27_2017,
      tagged_message: 'test',
      created_by: {
        name: '50 Cent',
        id: 10
      }
    };
    var wrapper = shallow(React.createElement(Comment, _extends({
      id: "123"
    }, comment, {
      approverSelectorContacts: approverSelectorContacts,
      currentUser: currentUser,
      handlers: allHandlers,
      mentionSelectorContacts: mentionSelectorContacts,
      onDelete: jest.fn(),
      onEdit: onEdit,
      permissions: permissions
    })));
    expect(wrapper.find('[data-testid="delete-comment"]').length).toEqual(showDelete ? 1 : 0);
    expect(wrapper.find('[data-testid="edit-comment"]').length).toEqual(showEdit ? 1 : 0);
    expect(wrapper.find('[data-testid="comment-actions-menu"]').length).toEqual(showMenu ? 1 : 0);
  });
  test('should not show actions menu when comment is pending', function () {
    var comment = {
      created_at: TIME_STRING_SEPT_27_2017,
      tagged_message: 'test',
      created_by: {
        name: '50 Cent',
        id: 10
      },
      permissions: {
        can_delete: true
      },
      isPending: true
    };
    var wrapper = shallow(React.createElement(Comment, _extends({
      id: "123"
    }, comment, {
      approverSelectorContacts: approverSelectorContacts,
      currentUser: currentUser,
      handlers: allHandlers,
      mentionSelectorContacts: mentionSelectorContacts,
      onDelete: jest.fn()
    })));
    expect(wrapper.find('[data-testid="comment-actions-menu"]').length).toEqual(0);
  });
  test('should allow user to edit if they have edit permissions on the task and edit handler is defined', function () {
    var comment = {
      created_at: TIME_STRING_SEPT_27_2017,
      tagged_message: 'test',
      created_by: {
        name: '50 Cent',
        id: 10
      },
      type: 'task',
      permissions: {
        can_edit: true,
        can_delete: true
      }
    };
    var mockOnEdit = jest.fn();
    var wrapper = mount(React.createElement(Comment, _extends({
      id: "123"
    }, comment, {
      approverSelectorContacts: approverSelectorContacts,
      currentUser: currentUser,
      handlers: allHandlers,
      mentionSelectorContacts: mentionSelectorContacts,
      onEdit: mockOnEdit
    })));
    var instance = wrapper.instance();
    expect(wrapper.find('CommentForm').length).toEqual(0);
    expect(wrapper.find('ActivityMessage').length).toEqual(1);
    expect(wrapper.state('isEditing')).toBe(false);
    expect(wrapper.state('isEditing')).toBe(false);
    wrapper.find('button[data-testid="comment-actions-menu"]').simulate('click');
    wrapper.find('MenuItem[data-testid="edit-comment"]').simulate('click');
    wrapper.update();
    expect(wrapper.find('ActivityMessage').length).toEqual(0);
    expect(wrapper.state('isEditing')).toBe(true);
    instance.commentFormFocusHandler();
    expect(wrapper.state('isInputOpen')).toBe(true);
    var updatePayload = {
      id: '000',
      hasMention: true,
      text: 'updated message'
    };
    instance.handleUpdate(updatePayload);
    expect(wrapper.state('isEditing')).toBe(false);
    expect(wrapper.state('isInputOpen')).toBe(false);
    expect(mockOnEdit).toHaveBeenCalledWith(updatePayload.id, updatePayload.text, updatePayload.hasMention, comment.permissions);
  });
  test('should render an error when one is defined', function () {
    var comment = {
      created_at: TIME_STRING_SEPT_27_2017,
      tagged_message: 'test',
      created_by: {
        name: '50 Cent',
        id: 10
      }
    };
    var wrapper = shallow(React.createElement(Comment, _extends({
      id: "123"
    }, comment, {
      approverSelectorContacts: approverSelectorContacts,
      currentUser: currentUser,
      error: {
        title: 'error',
        message: 'errorrrrr'
      },
      handlers: allHandlers,
      mentionSelectorContacts: mentionSelectorContacts,
      onDelete: jest.fn()
    })));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render an error cta when an action is defined', function () {
    var comment = {
      created_at: TIME_STRING_SEPT_27_2017,
      tagged_message: 'test',
      created_by: {
        name: '50 Cent',
        id: 10
      }
    };
    var onActionSpy = jest.fn();
    var wrapper = mount(React.createElement(Comment, _extends({
      id: "123"
    }, comment, {
      approverSelectorContacts: approverSelectorContacts,
      currentUser: currentUser,
      error: {
        title: 'error',
        message: 'errorrrrr',
        action: {
          text: 'click',
          onAction: onActionSpy
        }
      },
      handlers: allHandlers,
      mentionSelectorContacts: mentionSelectorContacts,
      onDelete: jest.fn()
    })));
    var inlineErrorActionLink = wrapper.find('InlineError').find('button.bcs-ActivityError-action');
    expect(inlineErrorActionLink.length).toEqual(1);
    inlineErrorActionLink.simulate('click');
    expect(onActionSpy).toHaveBeenCalledTimes(1);
  });
});