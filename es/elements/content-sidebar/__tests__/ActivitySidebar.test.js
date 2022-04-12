function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            annotationsEnabled | appActivityEnabled | expectedAnnotations | expectedAppActivity\n            ", "           | ", "           | ", "            | ", "\n            ", "           | ", "            | ", "            | ", "\n            ", "            | ", "           | ", "             | ", "\n            ", "            | ", "            | ", "             | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import messages from '../../common/messages';
import { ActivitySidebarComponent, activityFeedInlineError } from '../ActivitySidebar';
var defaultErrorMaskSubHeaderMessage = messages.defaultErrorMaskSubHeaderMessage,
    currentUserErrorHeaderMessage = messages.currentUserErrorHeaderMessage;
jest.mock('lodash/debounce', function () {
  return jest.fn(function (i) {
    return i;
  });
});
describe('elements/content-sidebar/ActivitySidebar', function () {
  var feedAPI = {
    createComment: jest.fn(),
    createTaskNew: jest.fn(),
    deleteAnnotation: jest.fn(),
    deleteComment: jest.fn(),
    deleteTaskNew: jest.fn(),
    feedItems: jest.fn(),
    updateAnnotation: jest.fn(),
    updateTaskCollaborator: jest.fn(),
    updateTaskNew: jest.fn()
  };
  var usersAPI = {
    get: jest.fn(),
    getAvatarUrlWithAccessToken: jest.fn().mockResolvedValue('foo'),
    getUser: jest.fn()
  };
  var fileCollaboratorsAPI = {
    getFileCollaborators: jest.fn()
  };
  var api = {
    getUsersAPI: function getUsersAPI() {
      return usersAPI;
    },
    getFeedAPI: function getFeedAPI() {
      return feedAPI;
    },
    getFileCollaboratorsAPI: function getFileCollaboratorsAPI() {
      return fileCollaboratorsAPI;
    }
  };
  var file = {
    id: 'I_AM_A_FILE',
    file_version: {
      id: '123'
    }
  };
  var currentUser = {
    id: 'foo'
  };
  var collaborators = {
    entries: [{
      id: '1',
      name: 'foo',
      item: {}
    }]
  };
  var onError = jest.fn();

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ActivitySidebarComponent, _extends({
      api: api,
      file: file,
      logger: {
        onReadyMetric: jest.fn()
      },
      onError: onError
    }, props)));
  };

  describe('constructor()', function () {
    var onReadyMetric;
    beforeEach(function () {
      var wrapper = getWrapper();
      onReadyMetric = wrapper.instance().props.logger.onReadyMetric;
    });
    test('should emit when js loaded', function () {
      expect(onReadyMetric).toHaveBeenCalledWith({
        endMarkName: expect.any(String)
      });
    });
  });
  describe('componentDidMount()', function () {
    var wrapper;
    var instance;
    currentUser = {
      id: '123'
    };
    beforeEach(function () {
      jest.spyOn(ActivitySidebarComponent.prototype, 'fetchFeedItems');
      jest.spyOn(ActivitySidebarComponent.prototype, 'fetchCurrentUser');
      wrapper = getWrapper({
        currentUser: currentUser
      });
      instance = wrapper.instance();
    });
    afterEach(function () {
      jest.restoreAllMocks();
    });
    test('should fetch the file and refresh the cache and fetch the current user', function () {
      expect(instance.fetchFeedItems).toHaveBeenCalledWith(true);
      expect(instance.fetchCurrentUser).toHaveBeenCalledWith(currentUser);
    });
  });
  describe('render()', function () {
    test('should render the activity feed sidebar', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('createTask()', function () {
    var instance;
    var wrapper;
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
    });
    test('should throw an error if there is not the current user in the state', function () {
      expect(function () {
        return instance.createTask();
      }).toThrow('Bad box user!');
    });
    test('should create the task and fetch the feed items', function () {
      wrapper.setState({
        currentUser: currentUser
      });
      var message = 'message';
      var assignees = ['1', '2'];
      var dueAt = 'test';
      var taskType = 'GENERAL';
      var completionRule = 'ALL_ASSIGNEES';
      instance.fetchFeedItems = jest.fn();
      instance.createTask(message, assignees, taskType, dueAt, completionRule);
      expect(feedAPI.createTaskNew).toHaveBeenCalledWith(file, currentUser, message, assignees, taskType, dueAt, completionRule, expect.any(Function), expect.any(Function));
      expect(instance.fetchFeedItems).toHaveBeenCalled();
    });
  });
  describe('deleteTask()', function () {
    test('should call the deleteTask prop if it exists', function () {
      var id = '1;';
      var onTaskDelete = jest.fn();
      var wrapper = getWrapper({
        onTaskDelete: onTaskDelete
      });
      var instance = wrapper.instance();
      instance.fetchFeedItems = jest.fn();
      instance.deleteTask({
        id: id
      });
      expect(feedAPI.deleteTaskNew).toHaveBeenCalled();
      expect(instance.fetchFeedItems).toHaveBeenCalled();
    });
  });
  describe('deleteComment()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      var onCommentDelete = jest.fn();
      wrapper = getWrapper({
        onCommentDelete: onCommentDelete
      });
      instance = wrapper.instance();
      instance.fetchFeedItems = jest.fn();
    });
    test('should call the deleteComment prop if it exists', function () {
      var id = '1';
      var permissions = {
        can_edit: false,
        can_delete: true
      };
      instance.deleteComment({
        id: id,
        permissions: permissions
      });
      expect(feedAPI.deleteComment).toHaveBeenCalled();
      expect(instance.fetchFeedItems).toHaveBeenCalled();
    });
  });
  describe('fetchCurrentUser()', function () {
    var instance;
    var wrapper;
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
      instance.errorCallback = jest.fn();
    });
    test('should invoke setState() directly if user parameter is not missing', function () {
      instance.setState = jest.fn();
      instance.fetchCurrentUser(currentUser);
      expect(instance.setState).toBeCalledWith({
        currentUser: currentUser,
        currentUserError: undefined
      });
    });
    test('should get the user', function () {
      instance.fetchCurrentUser();
      expect(usersAPI.getUser).toBeCalled();
    });
  });
  describe('fetchCurrentUserErrorCallback()', function () {
    var instance;
    var wrapper;
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
      instance.errorCallback = jest.fn();
      instance.fetchFeedItems = jest.fn();
      instance.fetchCurrentUser = jest.fn();
    });
    test('should set a maskError if there is an error in fetching the current user', function () {
      instance.fetchCurrentUserErrorCallback();
      var inlineErrorState = wrapper.state().currentUserError.maskError;
      expect(_typeof(currentUserErrorHeaderMessage)).toBe('object');
      expect(_typeof(defaultErrorMaskSubHeaderMessage)).toBe('object');
      expect(inlineErrorState.errorHeader).toEqual(currentUserErrorHeaderMessage);
      expect(inlineErrorState.errorSubHeader).toEqual(defaultErrorMaskSubHeaderMessage);
    });
  });
  describe('feedSuccessCallback()', function () {
    var instance;
    var wrapper;
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
      instance.fetchFeedItems = jest.fn();
    });
    test('should fetch the feed items', function () {
      instance.feedSuccessCallback();
      expect(instance.fetchFeedItems).toBeCalled();
    });
  });
  describe('feedErrorCallback()', function () {
    var instance;
    var wrapper;
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
      instance.fetchFeedItems = jest.fn();
      instance.errorCallback = jest.fn();
    });
    test('should invoke the generic error callback and fetch the items', function () {
      instance.feedErrorCallback();
      expect(instance.errorCallback).toBeCalled();
      expect(instance.fetchFeedItems).toBeCalled();
    });
  });
  describe('updateTask()', function () {
    var instance;
    var wrapper;
    var taskObj = {
      text: 'foo',
      id: 'bar'
    };
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
      instance.fetchFeedItems = jest.fn();
    });
    test('should call the update task API and fetch the items', function () {
      instance.updateTask(taskObj);
      expect(feedAPI.updateTaskNew).toBeCalled();
      expect(instance.fetchFeedItems).toBeCalled();
    });
  });
  describe('updateTaskAssignment()', function () {
    var instance;
    var wrapper;
    var onTaskAssignmentUpdate;
    beforeEach(function () {
      onTaskAssignmentUpdate = jest.fn();
      wrapper = getWrapper({
        onTaskAssignmentUpdate: onTaskAssignmentUpdate,
        file: file
      });
      instance = wrapper.instance();
      instance.fetchFeedItems = jest.fn();
      instance.feedSuccessCallback = jest.fn();
      instance.feedErrorCallback = jest.fn();
      instance.setState({
        currentUser: currentUser
      });
    });
    test('should call the update task assignment API and fetch the items', function () {
      instance.updateTaskAssignment('1', '2', 'foo', 'bar');
      expect(feedAPI.updateTaskCollaborator).toHaveBeenCalledWith(file, '1', '2', 'foo', expect.any(Function), instance.feedErrorCallback);
      expect(instance.fetchFeedItems).toBeCalled();
      var successCallback = feedAPI.updateTaskCollaborator.mock.calls[0][4];
      successCallback();
      expect(onTaskAssignmentUpdate).toHaveBeenCalledWith('1', '2', 'foo', '123');
    });
  });
  describe('createComment()', function () {
    var instance;
    var wrapper;
    var message = 'foo';
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
      instance.fetchFeedItems = jest.fn();
    });
    test('should throw an error if missing current user', function () {
      expect(function () {
        return instance.createComment(message, true);
      }).toThrow('Bad box user!');
    });
    test('should call the create comment API and fetch the items', function () {
      instance.setState({
        currentUser: currentUser
      });
      instance.createComment(message, true);
      expect(feedAPI.createComment).toBeCalled();
      expect(instance.fetchFeedItems).toBeCalled();
    });
  });
  describe('fetchFeedItems()', function () {
    var instance;
    var wrapper;
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
      instance.fetchFeedItems = jest.fn();
    });
    test('should fetch the feed items', function () {
      instance.fetchFeedItems();
      expect(feedAPI.feedItems).toBeCalled();
    });
    test.each(_templateObject(), false, false, false, false, false, true, false, true, true, false, true, false, true, true, true, true)('should fetch the feed items based on features: annotationsEnabled=$annotationsEnabled and appActivityEnabled=$appActivityEnabled', function (_ref) {
      var annotationsEnabled = _ref.annotationsEnabled,
          appActivityEnabled = _ref.appActivityEnabled,
          expectedAnnotations = _ref.expectedAnnotations,
          expectedAppActivity = _ref.expectedAppActivity;
      wrapper = getWrapper({
        features: {
          activityFeed: {
            annotations: {
              enabled: annotationsEnabled
            },
            appActivity: {
              enabled: appActivityEnabled
            }
          }
        }
      });
      instance = wrapper.instance();
      instance.errorCallback = jest.fn();
      instance.fetchFeedItemsErrorCallback = jest.fn();
      instance.fetchFeedItemsSuccessCallback = jest.fn();
      instance.fetchFeedItems();
      expect(feedAPI.feedItems).toHaveBeenCalledWith(file, false, instance.fetchFeedItemsSuccessCallback, instance.fetchFeedItemsErrorCallback, instance.errorCallback, {
        shouldShowAnnotations: expectedAnnotations,
        shouldShowAppActivity: expectedAppActivity
      });
    });
  });
  describe('fetchFeedItemsSuccessCallback()', function () {
    var feedItems = ['foo'];
    var instance;
    var logger;
    var wrapper;
    beforeEach(function () {
      logger = {
        onDataReadyMetric: jest.fn(),
        onReadyMetric: jest.fn()
      };
      wrapper = getWrapper({
        logger: logger
      });
      instance = wrapper.instance();
      instance.setState = jest.fn();
    });
    test('should set the feedItems in the state', function () {
      instance.fetchFeedItemsSuccessCallback(feedItems);
      expect(instance.setState).toBeCalledWith({
        feedItems: feedItems,
        activityFeedError: undefined
      });
    });
    test('should not call onDataReadyMetric if feedItems is <= 1', function () {
      instance.fetchFeedItemsSuccessCallback(feedItems);
      expect(logger.onDataReadyMetric).not.toHaveBeenCalled();
    });
    test('should call onDataReadyMetric if feedItems is > 1', function () {
      instance.fetchFeedItemsSuccessCallback(['foo', 'bar']);
      expect(logger.onDataReadyMetric).toHaveBeenCalledWith({
        endMarkName: 'activity_sidebar_data_ready',
        startMarkName: 'activity_sidebar_data_loading'
      }, file.id);
    });
  });
  describe('fetchFeedItemsErrorCallback()', function () {
    var instance;
    var wrapper;
    var feedItems = 'foo';
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
      instance.setState = jest.fn();
    });
    test('should set the feedItems in the state', function () {
      instance.fetchFeedItemsErrorCallback(feedItems);
      expect(instance.setState).toBeCalledWith({
        feedItems: feedItems,
        activityFeedError: activityFeedInlineError
      });
      expect(onError).not.toHaveBeenCalled();
    });
    test('should call onError if errors is not empty', function () {
      instance.fetchFeedItemsErrorCallback(feedItems, []);
      expect(onError).not.toHaveBeenCalled();
      instance.fetchFeedItemsErrorCallback(feedItems, [{
        code: '0'
      }, {
        code: '1'
      }]);
      expect(onError).toHaveBeenCalledWith(expect.any(Error), 'fetch_activity_error', {
        showNotification: true,
        errors: ['0', '1']
      });
    });
  });
  describe('errorCallback()', function () {
    var instance;
    var wrapper;
    var error;
    var code = 'some_code';
    var contextInfo = {
      foo: 'bar'
    };
    beforeEach(function () {
      error = new Error('foo');
      onError = jest.fn();
      wrapper = getWrapper({
        onError: onError
      });
      instance = wrapper.instance();
      jest.spyOn(global.console, 'error').mockImplementation();
    });
    afterEach(function () {
      jest.restoreAllMocks();
    });
    test('should log the error', function () {
      instance.errorCallback(error, code, contextInfo);
      expect(onError).toHaveBeenCalledWith(error, code, contextInfo);
    });
  });
  describe('fetchCurrentUserSuccessCallback()', function () {
    var instance;
    var wrapper;
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
      instance.setState = jest.fn();
    });
    test('should set the feedItems in the state', function () {
      instance.fetchCurrentUserSuccessCallback(currentUser);
      expect(instance.setState).toBeCalledWith({
        currentUser: currentUser,
        currentUserError: undefined
      });
    });
  });
  describe('fetchCurrentUserSuccessCallback()', function () {
    var instance;
    var wrapper;
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
      instance.setState = jest.fn();
    });
    test('should set the feedItems in the state', function () {
      instance.fetchCurrentUserSuccessCallback(currentUser);
      expect(instance.setState).toBeCalledWith({
        currentUser: currentUser,
        currentUserError: undefined
      });
    });
  });
  describe('getApproverWithQuery()', function () {
    var instance;
    var wrapper;
    var getCollaboratorsSpy;
    test('should get collaborators with groups', function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
      getCollaboratorsSpy = jest.spyOn(instance, 'getCollaborators');
      var search = 'Santa Claus';
      instance.getApproverWithQuery(search);
      expect(getCollaboratorsSpy).toBeCalledWith(instance.getApproverContactsSuccessCallback, instance.errorCallback, search, {
        includeGroups: true
      });
      expect(fileCollaboratorsAPI.getFileCollaborators).toHaveBeenCalledWith(file.id, instance.getApproverContactsSuccessCallback, instance.errorCallback, {
        filter_term: search,
        include_groups: true,
        include_uploader_collabs: false
      });
    });
  });
  describe('getApproverContactsSuccessCallback()', function () {
    var instance;
    var wrapper;
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
      instance.setState = jest.fn();
    });
    test('should set the feedItems in the state', function () {
      instance.getApproverContactsSuccessCallback(collaborators);
      expect(instance.setState).toBeCalledWith({
        approverSelectorContacts: collaborators.entries
      });
    });
  });
  describe('getMentionWithQuery()', function () {
    var instance;
    var wrapper;
    var getCollaboratorsSpy;
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
      getCollaboratorsSpy = jest.spyOn(instance, 'getCollaborators');
    });
    test('should get collaborators without groups', function () {
      var search = 'Santa Claus';
      instance.getMentionWithQuery(search);
      expect(getCollaboratorsSpy).toBeCalledWith(instance.getMentionContactsSuccessCallback, instance.errorCallback, search);
      expect(fileCollaboratorsAPI.getFileCollaborators).toHaveBeenCalledWith(file.id, instance.getMentionContactsSuccessCallback, instance.errorCallback, {
        filter_term: search,
        include_groups: false,
        include_uploader_collabs: false
      });
    });
  });
  describe('getMentionContactsSuccessCallback()', function () {
    var instance;
    var wrapper;
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
    });
    test('should dinamycally set as false contacts loading state', function () {
      instance.setState = jest.fn();
      instance.getMentionContactsSuccessCallback(collaborators);
      expect(instance.setState).toBeCalledWith({
        contactsLoaded: false
      }, expect.any(Function));
    });
    test('should set the feedItems in the state', function () {
      instance.getMentionContactsSuccessCallback(collaborators);
      expect(wrapper.state('contactsLoaded')).toBeTruthy();
      expect(wrapper.state('mentionSelectorContacts')).toEqual(collaborators.entries);
    });
  });
  describe('fetchCurrentUserErrorCallback()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper({
        file: file
      });
      instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.errorCallback = jest.fn();
    });
    test('should set the current user error and call the error callback', function () {
      instance.fetchCurrentUserErrorCallback({
        status: 500
      });
      expect(instance.setState).toBeCalledWith({
        currentUser: undefined,
        currentUserError: expect.any(Object)
      });
      expect(instance.errorCallback).toBeCalled();
    });
  });
  describe('getAvatarUrl()', function () {
    var wrapper;
    var instance;
    beforeEach(function () {
      wrapper = getWrapper({
        file: file
      });
      instance = wrapper.instance();
    });
    test('should set the current user error and call the error callback', function () {
      var avatarUrl = instance.getAvatarUrl(currentUser.id);
      expect(avatarUrl instanceof Promise).toBe(true);
      expect(usersAPI.getAvatarUrlWithAccessToken).toBeCalledWith(currentUser.id, file.id);
    });
  });
  describe('getCollaborators()', function () {
    var wrapper;
    var instance;
    var successCb;
    var errorCb;
    beforeEach(function () {
      successCb = jest.fn();
      errorCb = jest.fn();
      wrapper = getWrapper({
        file: file
      });
      instance = wrapper.instance();
    });
    test('should short circuit if there is no search string', function () {
      instance.getCollaborators(successCb, errorCb);
      instance.getCollaborators(successCb, errorCb, '');
      instance.getCollaborators(successCb, errorCb, '  ');
      expect(fileCollaboratorsAPI.getFileCollaborators).not.toHaveBeenCalled();
    });
    test('should call the file collaborators api', function () {
      var searchStr = 'foo';
      instance.getCollaborators(successCb, errorCb, searchStr);
      expect(fileCollaboratorsAPI.getFileCollaborators).toHaveBeenCalledWith(file.id, successCb, errorCb, {
        filter_term: searchStr,
        include_groups: false,
        include_uploader_collabs: false
      });
    });
  });
  describe('refresh()', function () {
    var instance;
    var wrapper;
    beforeEach(function () {
      wrapper = getWrapper();
      instance = wrapper.instance();
    });
    test('should fetch the feed items when refresh is called', function () {
      var fetchFeedItems = jest.fn();
      instance.fetchFeedItems = fetchFeedItems;
      instance.refresh();
      expect(fetchFeedItems).toHaveBeenCalled();
      expect(fetchFeedItems).toHaveBeenCalledWith(true);
    });
  });
  describe('handleAnnotationSelect()', function () {
    var annotatorState = {
      activeAnnotationId: '123'
    };
    var emitAnnotatorActiveChangeEvent = jest.fn();
    var getAnnotationsMatchPath = jest.fn().mockReturnValue({
      params: {
        fileVersionId: '456'
      }
    });
    var getAnnotationsPath = jest.fn().mockReturnValue('/activity/annotations/235/124');
    var history = {
      push: jest.fn(),
      replace: jest.fn()
    };
    var onAnnotationSelect = jest.fn();

    var getAnnotationWrapper = function getAnnotationWrapper() {
      return getWrapper({
        annotatorState: annotatorState,
        emitAnnotatorActiveChangeEvent: emitAnnotatorActiveChangeEvent,
        file: file,
        getAnnotationsMatchPath: getAnnotationsMatchPath,
        getAnnotationsPath: getAnnotationsPath,
        history: history,
        onAnnotationSelect: onAnnotationSelect
      });
    };

    test('should call emitAnnotatorActiveChangeEvent and onAnnotatorSelect appropriately', function () {
      var wrapper = getAnnotationWrapper();
      var instance = wrapper.instance();
      var annotation = {
        file_version: {
          id: '235'
        },
        id: '124'
      };
      instance.handleAnnotationSelect(annotation);
      expect(emitAnnotatorActiveChangeEvent).toHaveBeenCalledWith('124');
      expect(history.push).toHaveBeenCalledWith('/activity/annotations/235/124');
      expect(onAnnotationSelect).toHaveBeenCalledWith(annotation);
    });
    test('should not call history.push if file versions are the same', function () {
      var wrapper = getAnnotationWrapper();
      var instance = wrapper.instance();
      var annotation = {
        file_version: {
          id: '456'
        },
        id: '124'
      };
      instance.handleAnnotationSelect(annotation);
      expect(emitAnnotatorActiveChangeEvent).toHaveBeenCalledWith('124');
      expect(history.push).not.toHaveBeenCalled();
      expect(onAnnotationSelect).toHaveBeenCalledWith(annotation);
    });
    test('should use current file version if match params returns null', function () {
      var wrapper = getAnnotationWrapper();
      var instance = wrapper.instance();
      var annotation = {
        file_version: {
          id: '235'
        },
        id: '124'
      };
      getAnnotationsMatchPath.mockReturnValue({
        params: {
          fileVersionId: undefined
        }
      });
      instance.handleAnnotationSelect(annotation);
      expect(emitAnnotatorActiveChangeEvent).toHaveBeenCalledWith('124');
      expect(history.push).toHaveBeenCalledWith('/activity/annotations/235/124');
      expect(onAnnotationSelect).toHaveBeenCalledWith(annotation);
    });
    test('should not call history.push if no file version id on the annotation', function () {
      var wrapper = getAnnotationWrapper();
      var instance = wrapper.instance();
      var annotation = {
        file_version: null,
        id: '124'
      };
      getAnnotationsMatchPath.mockReturnValue({
        params: {
          fileVersionId: undefined
        }
      });
      instance.handleAnnotationSelect(annotation);
      expect(emitAnnotatorActiveChangeEvent).toHaveBeenCalledWith('124');
      expect(history.push).not.toHaveBeenCalled();
      expect(onAnnotationSelect).toHaveBeenCalledWith(annotation);
    });
  });
  describe('handleAnnotationEdit()', function () {
    test('should call updateAnnotation API', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.fetchFeedItems = jest.fn();
      wrapper.instance().handleAnnotationEdit({
        id: '123',
        text: 'hello',
        permissions: {
          can_edit: true,
          can_delete: true
        }
      });
      expect(api.getFeedAPI().updateAnnotation).toHaveBeenCalled();
      expect(instance.fetchFeedItems).toHaveBeenCalled();
    });
  });
  describe('handleAnnotationDelete()', function () {
    test('should call deleteAnnotation API', function () {
      var wrapper = getWrapper();
      var instance = wrapper.instance();
      instance.fetchFeedItems = jest.fn();
      wrapper.instance().handleAnnotationDelete({
        id: '123'
      });
      expect(api.getFeedAPI().deleteAnnotation).toBeCalled();
      expect(instance.fetchFeedItems).toHaveBeenCalled();
    });
  });
  describe('deleteAnnotationSuccess()', function () {
    test('should handle successful annotation deletion', function () {
      var mockEmitRemoveEvent = jest.fn();
      var mockFeedSuccess = jest.fn();
      var wrapper = getWrapper({
        emitRemoveEvent: mockEmitRemoveEvent
      });
      var instance = wrapper.instance();
      instance.feedSuccessCallback = mockFeedSuccess;
      instance.deleteAnnotationSuccess('123');
      expect(mockEmitRemoveEvent).toBeCalledWith('123');
      expect(mockFeedSuccess).toBeCalled();
    });
  });
});