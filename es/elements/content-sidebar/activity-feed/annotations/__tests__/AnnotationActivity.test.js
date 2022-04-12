function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        canDelete | canEdit\n        ", "  | ", "\n        ", "   | ", "\n        ", "   | ", "\n    "]);

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
import { shallow } from 'enzyme';
import AnnotationActivity from '../AnnotationActivity';
import AnnotationActivityMenu from '../AnnotationActivityMenu';
import CommentForm from '../../comment-form/CommentForm';
import DeleteConfirmation from '../../common/delete-confirmation';
import Media from '../../../../../components/media';
import messages from '../messages';
import SelectableActivityCard from '../../SelectableActivityCard';
jest.mock('../../Avatar', function () {
  return function () {
    return 'Avatar';
  };
});
var currentUser = {
  name: 'testuser',
  id: 11
};
var mentionSelectorContacts = [];
var TIME_STRING_SEPT_27_2017 = '2017-09-27T10:40:41-07:00';
var allHandlers = {
  contacts: {
    getMentionWithQuery: jest.fn()
  }
};
describe('elements/content-sidebar/ActivityFeed/annotations/AnnotationActivity', function () {
  var mockAnnotation = {
    created_at: TIME_STRING_SEPT_27_2017,
    created_by: {
      name: 'Jane Doe',
      id: 10
    },
    description: {
      message: 'test'
    },
    file_version: {
      id: '456',
      version_number: '2'
    },
    id: '123',
    target: {
      location: {
        value: 1
      }
    }
  };
  var mockActivity = {
    currentUser: currentUser,
    handlers: allHandlers,
    isCurrentVersion: true,
    item: mockAnnotation,
    mentionSelectorContacts: mentionSelectorContacts
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(AnnotationActivity, _extends({}, mockActivity, props)));
  };

  beforeEach(function () {
    CommentForm.default = jest.fn().mockReturnValue(React.createElement("div", null));
  });
  test('should not render annotation activity menu when both can_delete is false and can_edit is false', function () {
    var item = _objectSpread({}, mockAnnotation, {
      permissions: {
        can_delete: false,
        can_edit: false
      }
    });

    var wrapper = getWrapper({
      item: item
    });
    expect(wrapper.exists(AnnotationActivityMenu)).toBe(false);
  });
  test.each(_templateObject(), false, true, true, false, true, true)('should correctly render annotation activity when canDelete: $canDelete and canEdit: $canEdit', function (_ref) {
    var canDelete = _ref.canDelete,
        canEdit = _ref.canEdit;
    var unixTime = new Date(TIME_STRING_SEPT_27_2017).getTime();

    var item = _objectSpread({}, mockAnnotation, {
      permissions: {
        can_delete: canDelete,
        can_edit: canEdit
      }
    });

    var wrapper = getWrapper({
      item: item
    });
    expect(wrapper.find('ActivityTimestamp').prop('date')).toEqual(unixTime);
    expect(wrapper.find('AnnotationActivityLink').props()).toMatchObject({
      'data-resin-target': 'annotationLink',
      message: _objectSpread({}, messages.annotationActivityPageItem, {
        values: {
          number: 1
        }
      })
    });
    expect(wrapper.exists(AnnotationActivityMenu)).toBe(true);
    expect(wrapper.find('ActivityMessage').prop('tagged_message')).toEqual(mockActivity.item.description.message);
  });
  test('should render CommentForm if user clicks on the Modify menu item', function () {
    var activity = {
      item: _objectSpread({}, mockAnnotation, {
        isPending: false,
        permissions: {
          can_edit: true
        }
      })
    };
    var wrapper = getWrapper(_objectSpread({}, mockActivity, {}, activity));
    wrapper.find(AnnotationActivityMenu).dive().simulate('click');
    wrapper.find(AnnotationActivityMenu).dive().find('MenuItem').simulate('click');
    expect(wrapper.exists('CommentForm')).toBe(true); // Firing the onCancel prop will remove the CommentForm

    wrapper.find('CommentForm').dive().props().onCancel();
    expect(wrapper.exists('CommentForm')).toBe(false);
  });
  test('should correctly render annotation activity of another file version', function () {
    var wrapper = getWrapper({
      isCurrentVersion: false
    });
    expect(wrapper.find('AnnotationActivityLink').prop('message')).toEqual(_objectSpread({}, messages.annotationActivityVersionLink, {
      values: {
        number: '2'
      }
    }));
  });
  test('should render version unavailable if file version is null', function () {
    var wrapper = getWrapper({
      item: _objectSpread({}, mockAnnotation, {
        file_version: null
      })
    });
    var activityLink = wrapper.find('AnnotationActivityLink');
    expect(activityLink.prop('message')).toEqual(_objectSpread({}, messages.annotationActivityVersionUnavailable));
    expect(activityLink.prop('isDisabled')).toBe(true);
  });
  test('should render commenter as a link', function () {
    var wrapper = getWrapper();
    expect(wrapper.find('UserLink').prop('name')).toEqual(mockActivity.item.created_by.name);
  });
  test('should not show actions menu when annotation activity is pending', function () {
    var item = _objectSpread({}, mockAnnotation, {
      permissions: {
        can_delete: true
      },
      isPending: true
    });

    var wrapper = getWrapper({
      item: item
    });
    expect(wrapper.exists(AnnotationActivityMenu)).toBe(false);
    expect(wrapper.find(Media).hasClass('bcs-is-pending')).toBe(true);
  });
  test('should render an error when one is defined', function () {
    var activity = {
      item: _objectSpread({}, mockAnnotation, {
        error: {
          title: 'error',
          message: 'This is an error message'
        }
      }),
      onDelete: jest.fn()
    };
    var wrapper = getWrapper(activity);
    expect(wrapper.find('ActivityError').length).toEqual(1);
  });
  test('should render an error cta when an action is defined', function () {
    var onActionSpy = jest.fn();
    var activity = {
      item: _objectSpread({}, mockAnnotation, {
        error: {
          title: 'error',
          message: 'This is an error message',
          action: {
            text: 'click',
            onAction: onActionSpy
          }
        }
      }),
      onDelete: jest.fn()
    };
    var wrapper = mount(React.createElement(AnnotationActivity, _extends({}, mockActivity, activity)));
    var inlineErrorActionLink = wrapper.find('InlineError').find('button.bcs-ActivityError-action');
    expect(inlineErrorActionLink.length).toEqual(1);
    var inlineErrorActionOnClick = inlineErrorActionLink.prop('onClick');
    inlineErrorActionOnClick();
    expect(onActionSpy).toHaveBeenCalledTimes(1);
  });
  describe('delete confirmation behavior', function () {
    test('should render the DeleteConfirmation when delete menu item is selected', function () {
      var item = _objectSpread({}, mockAnnotation, {
        permissions: {
          can_delete: true
        }
      });

      var wrapper = getWrapper({
        item: item
      });
      wrapper.find(AnnotationActivityMenu).prop('onDelete')();
      expect(wrapper.exists(DeleteConfirmation));
    });
    test('should close the DeleteConfirmation when cancel is selected', function () {
      var item = _objectSpread({}, mockAnnotation, {
        permissions: {
          can_delete: true
        }
      });

      var wrapper = getWrapper({
        item: item
      });
      wrapper.find(AnnotationActivityMenu).prop('onDelete')();
      wrapper.find(DeleteConfirmation).prop('onDeleteCancel')();
      expect(wrapper.exists(DeleteConfirmation)).toBe(false);
    });
    test('should call onDelete when confirm delete is selected', function () {
      var onDelete = jest.fn();
      var permissions = {
        can_delete: true
      };

      var item = _objectSpread({}, mockAnnotation, {
        permissions: permissions
      });

      var wrapper = getWrapper({
        item: item,
        onDelete: onDelete
      });
      wrapper.find(AnnotationActivityMenu).prop('onDelete')();
      wrapper.find(DeleteConfirmation).prop('onDeleteConfirm')();
      expect(onDelete).toHaveBeenCalledWith({
        id: mockAnnotation.id,
        permissions: permissions
      });
      expect(wrapper.exists(DeleteConfirmation)).toBe(false);
    });
  });
  describe('SelectableActivityCard', function () {
    var getActivityItem = function getActivityItem(overrides) {
      return _objectSpread({}, mockAnnotation, {
        permissions: {
          can_delete: true,
          can_edit: true
        }
      }, overrides);
    };

    test('should render as SelectableActivityCard', function () {
      var wrapper = getWrapper();
      expect(wrapper.exists(SelectableActivityCard)).toBe(true);
      expect(wrapper.find(SelectableActivityCard).props()).toMatchObject({
        className: 'bcs-AnnotationActivity',
        'data-resin-iscurrent': true,
        'data-resin-itemid': mockAnnotation.id,
        'data-resin-feature': 'annotations',
        'data-resin-target': 'annotationButton',
        isDisabled: false,
        onMouseDown: expect.any(Function),
        onSelect: expect.any(Function)
      });
    });
    test('should disable card if there is an error', function () {
      var activity = {
        item: _objectSpread({}, mockAnnotation, {
          error: {
            title: 'error',
            message: 'This is an error message',
            action: {
              text: 'click'
            }
          }
        })
      };
      var wrapper = getWrapper(activity);
      expect(wrapper.find(SelectableActivityCard).prop('isDisabled')).toBe(true);
    });
    test('should disable card if the overflow menu is open', function () {
      var wrapper = getWrapper({
        item: getActivityItem()
      });
      expect(wrapper.find(SelectableActivityCard).prop('isDisabled')).toBe(false);
      wrapper.find(AnnotationActivityMenu).prop('onMenuOpen')();
      expect(wrapper.find(SelectableActivityCard).prop('isDisabled')).toBe(true);
    });
    test('should disable card if editing the comment', function () {
      var wrapper = getWrapper({
        item: getActivityItem()
      });
      expect(wrapper.find(SelectableActivityCard).prop('isDisabled')).toBe(false);
      wrapper.find(AnnotationActivityMenu).prop('onEdit')();
      expect(wrapper.find(SelectableActivityCard).prop('isDisabled')).toBe(true);
    });
    test('should disable card if file version is unavailable', function () {
      var wrapper = getWrapper({
        item: getActivityItem({
          file_version: null
        })
      });
      expect(wrapper.find(SelectableActivityCard).prop('isDisabled')).toBe(true);
    });
    test('should disable card if the delete confirmation is open', function () {
      var wrapper = getWrapper({
        item: getActivityItem()
      });
      expect(wrapper.find(SelectableActivityCard).prop('isDisabled')).toBe(false);
      wrapper.find(AnnotationActivityMenu).prop('onDelete')();
      expect(wrapper.find(SelectableActivityCard).prop('isDisabled')).toBe(true);
    });
    test('should stop propagation of mousedown event from SelectableActivityCard', function () {
      var event = {
        stopPropagation: jest.fn()
      };
      var wrapper = getWrapper({
        item: getActivityItem()
      });
      wrapper.find(SelectableActivityCard).simulate('mousedown', event);
      expect(event.stopPropagation).toHaveBeenCalled();
    });
    test('should not stop propagation of mousedown event from SelectableActivityCard when disabled', function () {
      var event = {
        stopPropagation: jest.fn()
      };
      var wrapper = getWrapper({
        item: getActivityItem({
          file_version: null
        })
      });
      expect(wrapper.find(SelectableActivityCard).prop('isDisabled')).toBe(true);
      wrapper.find(SelectableActivityCard).simulate('mousedown', event);
      expect(event.stopPropagation).not.toHaveBeenCalled();
    });
  });
});