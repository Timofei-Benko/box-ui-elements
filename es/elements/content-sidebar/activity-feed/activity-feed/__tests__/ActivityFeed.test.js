function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            prevCurrentUser | prevFeedItems | expected | description\n            ", "    | ", "  | ", "  | ", "\n            ", "    | ", "  | ", "  | ", "\n            ", "  | ", "  | ", "  | ", "\n            ", "  | ", "  | ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import * as React from 'react';
import { shallow } from 'enzyme';
import ActivityFeed from '../ActivityFeed';
import { scrollIntoView } from '../../../../../utils/dom';
jest.mock('lodash/uniqueId', function () {
  return function () {
    return 'uniqueId';
  };
});
jest.mock('../../../../../utils/dom');
jest.mock('../../Avatar', function () {
  return 'Avatar';
});
jest.mock('../ActiveState', function () {
  return 'ActiveState';
});
var otherUser = {
  name: 'Akon',
  id: 11
};
var annotations = {
  entries: [{
    created_at: '2020-01-01T00:00:00Z',
    created_by: otherUser,
    id: '123',
    modified_at: '2020-01-02T00:00:00Z',
    modified_by: otherUser,
    permissions: {
      can_delete: true,
      can_edit: true
    },
    type: 'annotation'
  }]
};
var comments = {
  total_count: 1,
  entries: [{
    type: 'comment',
    id: '123',
    created_at: 'Thu Sep 26 33658 19:46:39 GMT-0600 (CST)',
    tagged_message: 'test @[123:Jeezy] @[10:Kanye West]',
    created_by: {
      name: 'Akon',
      id: 11
    }
  }]
};
var first_version = {
  action: 'upload',
  type: 'file_version',
  id: 123,
  created_at: 'Thu Sep 20 33658 19:45:39 GMT-0600 (CST)',
  trashed_at: 1234567891,
  modified_at: 1234567891,
  modified_by: {
    name: 'Akon',
    id: 11
  },
  version_number: '1'
};
var file = {
  id: '12345',
  permissions: {
    can_comment: true
  },
  modified_at: 2234567891,
  file_version: {
    id: 987,
    type: 'file_version'
  },
  restored_from: {
    id: first_version.id,
    type: first_version.type
  },
  version_number: '3'
};
var taskWithAssignment = {
  type: 'task',
  id: 't_345',
  created_at: '2018-07-03T14:43:52-07:00',
  created_by: otherUser,
  modified_at: '2018-07-03T14:43:52-07:00',
  description: 'test',
  due_at: '2018-07-03T14:43:52-07:00',
  assigned_to: {
    entries: [{
      id: 'ta_123',
      permissions: {
        can_delete: true,
        can_update: true
      },
      role: 'ASSIGNEE',
      status: 'NOT_STARTED',
      target: otherUser,
      type: 'task_collaborator'
    }],
    limit: 20,
    next_marker: null
  },
  status: 'NOT_STARTED',
  permissions: {
    can_create_task_collaborator: true,
    can_create_task_link: true,
    can_delete: true,
    can_update: true
  },
  task_type: 'GENERAL',
  task_links: {
    entries: [{
      target: {
        id: 'f_123',
        type: 'file'
      }
    }]
  }
};

var feedItems = _toConsumableArray(comments.entries);

var currentUser = {
  name: 'Kanye West',
  id: 10
};

var getWrapper = function getWrapper(props) {
  return shallow(React.createElement(ActivityFeed, _extends({
    currentUser: currentUser,
    file: file
  }, props)));
};

describe('elements/content-sidebar/ActivityFeed/activity-feed/ActivityFeed', function () {
  test('should correctly render loading state', function () {
    var wrapper = getWrapper({
      currentUser: undefined,
      feedItems: undefined
    });
    expect(wrapper.find('EmptyState').exists()).toBe(false);
    expect(wrapper.find('LoadingIndicator').exists()).toBe(true);
  });
  test('should correctly render empty state', function () {
    var wrapper = getWrapper({
      feedItems: []
    });
    expect(wrapper.find('EmptyState').exists()).toBe(true);
  });
  test('should render empty state when there is 1 version (current version from file)', function () {
    var wrapper = getWrapper({
      currentUser: currentUser,
      feedItems: [first_version]
    });
    expect(wrapper.find('EmptyState').exists()).toBe(true);
  });
  test('should render approval comment form if comment submit handler is passed in and comment permissions', function () {
    var wrapper = getWrapper({
      onCommentCreate: jest.fn()
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render approval comment form if only comment submit handler is not passed in', function () {
    file.permissions.can_comment = true;
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render approval comment form if comment permissions are not present', function () {
    file.permissions.can_comment = false;
    var wrapper = getWrapper({
      onCommentCreate: jest.fn()
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render active state', function () {
    var wrapper = getWrapper({
      feedItems: feedItems
    });
    expect(wrapper.find('ActiveState')).toHaveLength(1);
    expect(wrapper.find('ActiveState').prop('currentFileVersionId')).toBe(987);
  });
  test('should not expose add approval ui if task submit handler is not passed', function () {
    file.permissions.can_comment = true;
    var wrapper = getWrapper({
      onCommentCreate: jest.fn()
    });
    expect(wrapper.find('[name="addApproval"]').length).toEqual(0);
  });
  test('should set scrollTop to be the scrollHeight if feedContainer ref is set', function () {
    var wrapper = getWrapper();
    var instance = wrapper.instance();
    instance.feedContainer = {
      scrollTop: 0,
      scrollHeight: 100
    };
    instance.componentDidMount();
    expect(instance.feedContainer.scrollTop).toEqual(100);
  });
  describe('componentDidUpdate()', function () {
    test('should set scrollTop to be the scrollHeight if feedContainer exists and prevProps feedItems is undefined and this.props.feedItems is defined', function () {
      var wrapper = getWrapper({
        feedItems: [{
          type: 'comment'
        }]
      });
      var instance = wrapper.instance();
      instance.feedContainer = {
        scrollTop: 0,
        scrollHeight: 100
      };
      instance.componentDidUpdate({
        feedItems: undefined,
        currentUser: currentUser
      }, {
        isInputOpen: false
      });
      expect(instance.feedContainer.scrollTop).toEqual(100);
    });
    test('should set scrollTop to be the scrollHeight if more feedItems are added', function () {
      var wrapper = getWrapper({
        feedItems: [{
          type: 'comment'
        }, {
          type: 'comment'
        }]
      });
      var instance = wrapper.instance();
      instance.feedContainer = {
        scrollTop: 0,
        scrollHeight: 100
      };
      instance.componentDidUpdate({
        feedItems: [{
          type: 'comment'
        }],
        currentUser: currentUser
      }, {
        isInputOpen: false
      });
      expect(instance.feedContainer.scrollTop).toEqual(100);
    });
    test('should set scrollTop to be the scrollHeight if the user becomes defined', function () {
      var wrapper = getWrapper({
        feedItems: [{
          type: 'comment'
        }]
      });
      var instance = wrapper.instance();
      instance.feedContainer = {
        scrollTop: 0,
        scrollHeight: 100
      };
      instance.componentDidUpdate({
        feedItems: [{
          type: 'comment'
        }],
        currentUser: undefined
      }, {
        isInputOpen: false
      });
      expect(instance.feedContainer.scrollTop).toEqual(100);
    });
    test('should set scrollTop to be the scrollHeight if input opens', function () {
      var wrapper = getWrapper({
        feedItems: [{
          type: 'comment'
        }]
      });
      wrapper.setState({
        isInputOpen: true
      });
      var instance = wrapper.instance();
      instance.feedContainer = {
        scrollTop: 0,
        scrollHeight: 100
      };
      instance.componentDidUpdate({
        feedItems: [{
          type: 'comment'
        }],
        currentUser: currentUser
      }, {
        isInputOpen: false
      });
      expect(instance.feedContainer.scrollTop).toEqual(100);
    });
    test('should call scrollToActiveFeedItemOrErrorMessage if feed items loaded', function () {
      var wrapper = getWrapper({
        feedItems: [{
          type: 'comment'
        }]
      });
      var instance = wrapper.instance();
      instance.scrollToActiveFeedItemOrErrorMessage = jest.fn();
      instance.componentDidUpdate({
        feedItems: undefined
      }, {
        isInputOpen: false
      });
      expect(instance.scrollToActiveFeedItemOrErrorMessage).toHaveBeenCalled();
    });
    test('should call scrollToActiveFeedItemOrErrorMessage if activeFeedEntryId changed', function () {
      var wrapper = getWrapper({
        activeFeedEntryId: '123'
      });
      var instance = wrapper.instance();
      instance.scrollToActiveFeedItemOrErrorMessage = jest.fn();
      instance.componentDidUpdate({
        activeFeedEntryId: '456'
      }, {
        isInputOpen: false
      });
      expect(instance.scrollToActiveFeedItemOrErrorMessage).toHaveBeenCalled();
    });
    test('should not call scrollToActiveFeedItemOrErrorMessage if activeFeedEntryId changed', function () {
      var wrapper = getWrapper({
        activeFeedEntryId: '456'
      });
      var instance = wrapper.instance();
      instance.scrollToActiveFeedItemOrErrorMessage = jest.fn();
      instance.componentDidUpdate({
        activeFeedEntryId: '456'
      }, {
        isInputOpen: false
      });
      expect(instance.scrollToActiveFeedItemOrErrorMessage).not.toHaveBeenCalled();
    });
  });
  test('should pass activeFeedItemRef to the ActiveState', function () {
    var wrapper = getWrapper({
      activeFeedEntryId: comments.entries[0].id
    });
    var instance = wrapper.instance();
    wrapper.setProps({
      feedItems: [{
        type: 'comment'
      }]
    });
    expect(wrapper.find('ActiveState').prop('activeFeedItemRef')).toEqual(instance.activeFeedItemRef);
  });
  test('should scroll to active feed item when activeFeedItemRef has a value', function () {
    var wrapper = getWrapper({
      activeFeedEntryId: comments.entries[0].id
    });
    var instance = wrapper.instance();
    var li = document.createElement('li');
    instance.activeFeedItemRef.current = li;
    wrapper.setProps({
      feedItems: [{
        type: 'comment'
      }]
    });
    expect(scrollIntoView).toHaveBeenCalledWith(li);
  });
  test('should not scroll to active feed item when activeFeedItemRef is null', function () {
    var wrapper = getWrapper({
      activeFeedEntryId: comments.entries[0].id
    });
    var instance = wrapper.instance();
    instance.activeFeedItemRef.current = null;
    wrapper.setProps({
      feedItems: [{
        type: 'comment'
      }]
    });
    expect(scrollIntoView).not.toHaveBeenCalled();
  });
  test('should show input when commentFormFocusHandler is called', function () {
    var wrapper = getWrapper();
    var instance = wrapper.instance();
    instance.commentFormFocusHandler();
    expect(wrapper.state('isInputOpen')).toBe(true);
  });
  test('should hide input when commentFormCancelHandler is called', function () {
    var wrapper = getWrapper({
      onCommentCreate: jest.fn()
    });
    var instance = wrapper.instance();
    instance.commentFormFocusHandler();
    expect(wrapper.state('isInputOpen')).toBe(true);
    instance.commentFormCancelHandler();
    expect(wrapper.state('isInputOpen')).toBe(false);
  });
  test('should call create comment handler and close input on valid comment submit', function () {
    var createCommentSpy = jest.fn().mockReturnValue(Promise.resolve({}));
    var wrapper = getWrapper({
      feedItems: feedItems,
      onCommentCreate: createCommentSpy
    });
    var instance = wrapper.instance();
    var commentForm = wrapper.find('CommentForm').first();
    instance.commentFormFocusHandler();
    expect(wrapper.state('isInputOpen')).toBe(true);
    commentForm.prop('createComment')({
      text: 'foo'
    });
    expect(wrapper.state('isInputOpen')).toBe(false);
    expect(createCommentSpy).toHaveBeenCalledTimes(1);
  });
  test('should stop event propagation onKeyDown', function () {
    var wrapper = getWrapper({
      onCommentCreate: jest.fn()
    });
    var stopPropagationSpy = jest.fn();
    wrapper.find('.bcs-activity-feed').simulate('keydown', {
      nativeEvent: {
        stopImmediatePropagation: stopPropagationSpy
      }
    });
    expect(stopPropagationSpy).toHaveBeenCalled();
  });
  test('should correctly handle an inline error for a comment id being invalid', function () {
    var wrapper = getWrapper({
      feedItems: feedItems,
      activeFeedEntryId: 'invalid id',
      activeFeedEntryType: comments.entries[0].type
    });
    expect(wrapper.exists('InlineError')).toBe(true);
  });
  test('should correctly handle an inline error for a task id being invalid', function () {
    var wrapper = getWrapper({
      feedItems: feedItems,
      activeFeedEntryId: 'invalid id',
      activeFeedEntryType: taskWithAssignment.type
    });
    expect(wrapper.exists('InlineError')).toBe(true);
  });
  test('should correctly handle an inline error for an annotation id being invalid', function () {
    var wrapper = getWrapper({
      feedItems: feedItems,
      activeFeedEntryId: 'invalid id',
      activeFeedEntryType: annotations.entries[0].type
    });
    expect(wrapper.exists('InlineError')).toBe(true);
  });
  test('should not render inline error if the type is invalid', function () {
    var wrapper = getWrapper({
      feedItems: feedItems,
      activeFeedEntryId: 0,
      activeFeedEntryType: 'tasksss'
    });
    expect(wrapper.exists('InlineError')).toBe(false);
  });
  describe('hasLoaded()', function () {
    test.each(_templateObject(), undefined, undefined, true, 'both currentUser and feedItems become defined', undefined, feedItems, true, 'currentUser becomes defined', currentUser, undefined, true, 'feedItems becomes defined', currentUser, feedItems, false, 'currentUser and feedItems are already defined')('should return $expected when $description', function (_ref) {
      var prevCurrentUser = _ref.prevCurrentUser,
          prevFeedItems = _ref.prevFeedItems,
          expected = _ref.expected;
      var wrapper = getWrapper({
        currentUser: currentUser,
        feedItems: feedItems
      });
      var instance = wrapper.instance();
      expect(instance.hasLoaded(prevCurrentUser, prevFeedItems)).toBe(expected);
    });
  });
});