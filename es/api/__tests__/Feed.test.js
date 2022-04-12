function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import commonMessages from '../../elements/common/messages';
import messages from '../messages';
import * as sorter from '../../utils/sorter';
import * as error from '../../utils/error';
import { IS_ERROR_DISPLAYED, TASK_NEW_NOT_STARTED, TASK_MAX_GROUP_ASSIGNEES } from '../../constants';
import Feed from '../Feed';
import { annotation as mockAnnotation } from '../../__mocks__/annotations';
var mockTask = {
  created_by: {
    type: 'task_collaborator',
    target: {
      name: 'Jay-Z',
      id: '100'
    },
    id: '000',
    role: 'CREATOR',
    status: TASK_NEW_NOT_STARTED
  },
  created_at: '2019-01-01',
  due_at: '2019-02-02',
  id: '0',
  name: 'task message',
  type: 'task',
  assigned_to: {
    entries: [{
      id: '1',
      target: {
        name: 'Beyonce',
        id: '2',
        avatar_url: '',
        type: 'user'
      },
      status: TASK_NEW_NOT_STARTED,
      permissions: {
        can_delete: false,
        can_update: false
      },
      role: 'ASSIGNEE',
      type: 'task_collaborator'
    }],
    limit: 10,
    next_marker: null
  },
  permissions: {
    can_update: false,
    can_delete: false,
    can_create_task_collaborator: false,
    can_create_task_link: false
  },
  task_links: {
    entries: [{
      id: '03',
      type: 'task_link',
      target: {
        type: 'file',
        id: '4'
      },
      permissions: {
        can_delete: false,
        can_update: false
      }
    }],
    limit: 1,
    next_marker: null
  },
  status: TASK_NEW_NOT_STARTED
};
var mockErrors = [{
  code: 'error_code_0'
}, {
  code: 'error_code_1'
}];
var mockFirstVersion = {
  action: 'upload',
  type: 'file_version',
  id: 123,
  created_at: 'Thu Sep 20 33658 19:45:39 GMT-0600 (CST)',
  trashed_at: 1234567891,
  modified_at: 1234567891,
  modified_by: {
    name: 'Akon',
    id: 11
  }
};
var mockCurrentVersion = {
  action: 'restore',
  type: 'file_version',
  id: '123'
};
var deleted_version = {
  action: 'delete',
  type: 'file_version',
  id: 234,
  created_at: 'Thu Sep 20 33658 19:45:39 GMT-0600 (CST)',
  trashed_at: 1234567891,
  modified_at: 1234567891,
  modified_by: {
    name: 'Akon',
    id: 11
  }
};
var versions = {
  total_count: 1,
  entries: [mockFirstVersion, deleted_version]
};
var versionsWithCurrent = {
  total_count: 3,
  entries: [mockCurrentVersion, mockFirstVersion, deleted_version]
};
var annotations = {
  entries: [mockAnnotation],
  limit: 1000,
  next_marker: null
};
jest.mock('lodash/uniqueId', function () {
  return function () {
    return 'uniqueId';
  };
});
var mockCreateTaskWithDeps = jest.fn().mockImplementation(function (_ref) {
  var successCallback = _ref.successCallback;
  successCallback();
});
jest.mock('../tasks/TasksNew', function () {
  var task = mockTask;
  return jest.fn().mockImplementation(function () {
    return {
      createTaskWithDeps: mockCreateTaskWithDeps,
      updateTaskWithDeps: jest.fn().mockImplementation(function (_ref2) {
        var successCallback = _ref2.successCallback;
        successCallback();
      }),
      deleteTask: jest.fn().mockImplementation(function (_ref3) {
        var successCallback = _ref3.successCallback;
        successCallback();
      }),
      getTasksForFile: jest.fn().mockReturnValue({
        entries: [task],
        next_marker: null,
        limit: 1000
      }),
      getTask: jest.fn(function (_ref4) {
        var successCallback = _ref4.successCallback;
        successCallback(task);
      })
    };
  });
});
jest.mock('../tasks/TaskCollaborators', function () {
  return jest.fn().mockImplementation(function () {
    return {
      createTaskCollaborator: jest.fn().mockImplementation(function (_ref5) {
        var successCallback = _ref5.successCallback;
        successCallback([{
          type: 'task_collaborator',
          id: '1',
          status: 'NOT_STARTED',
          role: 'ASSIGNEE',
          target: {
            type: 'user',
            id: '00000001',
            name: 'Box One',
            login: 'boxOne@box.com'
          },
          permissions: {
            can_update: true,
            can_delete: true
          }
        }]);
      }),
      createTaskCollaboratorsforGroup: jest.fn().mockImplementation(function (_ref6) {
        var successCallback = _ref6.successCallback;
        successCallback({
          type: 'task_collaborator',
          id: '2',
          status: 'NOT_STARTED',
          role: 'ASSIGNEE',
          target: {
            type: 'user',
            id: '00000002',
            name: 'Box two',
            login: 'boxTwo@box.com'
          },
          permissions: {
            can_update: true,
            can_delete: true
          }
        });
      }),
      updateTaskCollaborator: jest.fn().mockImplementation(function (_ref7) {
        var successCallback = _ref7.successCallback;
        successCallback();
      }),
      deleteTaskCollaborator: jest.fn().mockImplementation(function (_ref8) {
        var successCallback = _ref8.successCallback;
        successCallback();
      }),
      getTaskCollaborators: jest.fn().mockReturnValue({
        entries: [{
          id: '1',
          target: {
            name: 'Beyonce',
            id: '2',
            avatar_url: '',
            type: 'user'
          },
          status: 'NOT_STARTED',
          permissions: {
            can_delete: false,
            can_update: false
          },
          role: 'ASSIGNEE',
          type: 'task_collaborator'
        }],
        next_marker: null,
        limit: 1000
      })
    };
  });
});
jest.mock('../tasks/TaskLinks', function () {
  return jest.fn().mockImplementation(function () {
    return {
      createTaskLink: jest.fn().mockImplementation(function (_ref9) {
        var successCallback = _ref9.successCallback;
        successCallback();
      })
    };
  });
});
var mockGetGroupCount = jest.fn();
jest.mock('../Groups', function () {
  var GroupAPI = jest.fn().mockImplementation(function () {
    return {
      getGroupCount: mockGetGroupCount
    };
  });
  return GroupAPI;
});
jest.mock('../Comments', function () {
  return jest.fn().mockImplementation(function () {
    return {
      getComments: jest.fn().mockReturnValue({
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
      }),
      deleteComment: jest.fn().mockImplementation(function (_ref10) {
        var successCallback = _ref10.successCallback;
        successCallback();
      }),
      updateComment: jest.fn().mockImplementation(function (_ref11) {
        var successCallback = _ref11.successCallback;
        successCallback();
      }),
      createComment: jest.fn().mockImplementation(function (_ref12) {
        var successCallback = _ref12.successCallback;
        successCallback();
      })
    };
  });
});
jest.mock('../Versions', function () {
  return jest.fn().mockImplementation(function () {
    return {
      getVersions: jest.fn(function () {
        return mockFirstVersion;
      }),
      getVersion: jest.fn(function () {
        return mockCurrentVersion;
      })
    };
  });
});
jest.mock('../Annotations', function () {
  return jest.fn().mockImplementation(function () {
    return {
      deleteAnnotation: jest.fn().mockImplementation(function (file, id, permissions, successCallback) {
        successCallback();
      }),
      updateAnnotation: jest.fn().mockImplementation(function (file, id, text, permissions, successCallback) {
        successCallback();
      }),
      getAnnotations: jest.fn()
    };
  });
});
var MOCK_APP_ACTIVITY_ITEM = {
  activity_template: {
    id: '1',
    type: 'activity_template'
  },
  app: {
    icon_url: 'https://some.cdn.com/12345.png',
    id: '123456',
    name: 'App activities test',
    type: 'app'
  },
  created_by: {
    id: '1234556789876',
    login: 'some-account@box.com',
    name: 'John Doe',
    type: 'user'
  },
  id: '3782',
  occurred_at: '2019-02-21T04:00:00Z',
  rendered_text: 'You shared this file in <a href="https://some-app.com" rel="noreferrer noopener">Some App</a>',
  type: 'app_activity'
};
jest.mock('../AppActivity', function () {
  return jest.fn().mockImplementation(function () {
    return {
      getAppActivity: jest.fn().mockReturnValue({
        total_count: 1,
        entries: [MOCK_APP_ACTIVITY_ITEM]
      }),
      deleteAppActivity: jest.fn().mockImplementation(function (_ref13) {
        var successCallback = _ref13.successCallback;
        successCallback();
      })
    };
  });
});
describe('api/Feed', function () {
  var feed;
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
  var tasks = {
    entries: [mockTask],
    limit: 1000,
    next_marker: null
  };
  var appActivities = {
    total_count: 1,
    entries: [MOCK_APP_ACTIVITY_ITEM]
  };
  var feedItems = [].concat(_toConsumableArray(comments.entries), _toConsumableArray(tasks.entries), _toConsumableArray(versions.entries), _toConsumableArray(appActivities.entries));
  var file = {
    id: '12345',
    permissions: {
      can_comment: true,
      can_create_annotations: true,
      can_view_annotations: true
    },
    modified_at: 1234567891,
    file_version: {
      id: 987
    },
    restored_from: {
      id: mockFirstVersion.id,
      type: mockFirstVersion.type
    }
  };
  var user = {
    id: 'user1'
  };
  var fileError = 'Bad box item!';
  var errorCode = 'foo';
  beforeEach(function () {
    feed = new Feed({});
    jest.spyOn(global.console, 'error').mockImplementation();
  });
  afterEach(function () {
    feed.errors = [];
    jest.restoreAllMocks();
  });
  describe('getCacheKey()', function () {
    test('should return the cache key', function () {
      expect(feed.getCacheKey('1')).toBe('feedItems_1');
    });
  });
  describe('getCachedItems()', function () {
    beforeEach(function () {
      feed.getCache = jest.fn().mockReturnValue({
        set: jest.fn(),
        get: jest.fn().mockReturnValue(feedItems)
      });
      feed.getCacheKey = jest.fn().mockReturnValue('baz');
    });
    test('should get the cached items', function () {
      var id = '1';
      var result = feed.getCachedItems(id);
      expect(feed.getCacheKey).toHaveBeenCalledWith(id);
      expect(result).toEqual(feedItems);
    });
  });
  describe('setCachedItems()', function () {
    var cache;
    var cacheKey = 'baz';
    beforeEach(function () {
      cache = {
        get: jest.fn().mockRejectedValue(feedItems),
        set: jest.fn()
      };
      feed.getCache = jest.fn().mockReturnValue(cache);
      feed.getCacheKey = jest.fn().mockReturnValue(cacheKey);
    });
    test('should set the cached items', function () {
      var id = '1';
      feed.setCachedItems(id, feedItems);
      expect(feed.getCacheKey).toHaveBeenCalledWith(id);
      expect(cache.set).toHaveBeenCalledWith(cacheKey, {
        errors: [],
        items: feedItems
      });
    });
  });
  describe('feedItems()', function () {
    var sortedItems = [].concat(_toConsumableArray(versionsWithCurrent.entries), _toConsumableArray(tasks.entries), _toConsumableArray(comments.entries), _toConsumableArray(appActivities.entries), _toConsumableArray(annotations.entries));
    var successCb;
    var errorCb;
    beforeEach(function () {
      feed.fetchVersions = jest.fn().mockResolvedValue(versions);
      feed.fetchCurrentVersion = jest.fn().mockResolvedValue(mockCurrentVersion);
      feed.fetchTasksNew = jest.fn().mockResolvedValue(tasks);
      feed.fetchComments = jest.fn().mockResolvedValue(comments);
      feed.fetchAppActivity = jest.fn().mockReturnValue(appActivities);
      feed.fetchAnnotations = jest.fn().mockReturnValue(annotations);
      feed.setCachedItems = jest.fn();
      feed.versionsAPI = {
        getVersion: jest.fn().mockReturnValue(versions),
        addCurrentVersion: jest.fn().mockReturnValue(versionsWithCurrent)
      };
      successCb = jest.fn();
      errorCb = jest.fn();
      feed.isDestroyed = jest.fn().mockReturnValue(false);
      jest.spyOn(sorter, 'sortFeedItems').mockReturnValue(sortedItems);
    });
    afterEach(function () {
      jest.restoreAllMocks();
    });
    test('should get feed items, sort, save to cache, and call the success callback', function (done) {
      feed.feedItems(file, false, successCb, errorCb, jest.fn(), {
        shouldShowAnnotations: true,
        shouldShowAppActivity: true
      });
      setImmediate(function () {
        expect(feed.versionsAPI.addCurrentVersion).toHaveBeenCalledWith(mockCurrentVersion, versions, file);
        expect(sorter.sortFeedItems).toHaveBeenCalledWith(versionsWithCurrent, comments, tasks, appActivities, annotations);
        expect(feed.setCachedItems).toHaveBeenCalledWith(file.id, sortedItems);
        expect(successCb).toHaveBeenCalledWith(sortedItems);
        done();
      });
    });
    test('should get feed items, sort, save to cache, and call the error callback', function (done) {
      feed.fetchVersions = function fetchVersionsWithError() {
        this.errors = mockErrors;
        return [];
      };

      feed.feedItems(file, false, successCb, errorCb);
      setImmediate(function () {
        expect(errorCb).toHaveBeenCalledWith(sortedItems, mockErrors);
        done();
      });
    });
    test('should use the app activity api if the { shouldShowAppActivity } option in the last argument is true', function (done) {
      feed.feedItems(file, false, successCb, errorCb, errorCb, {
        shouldShowAppActivity: true
      });
      setImmediate(function () {
        expect(feed.fetchAppActivity).toHaveBeenCalled();
        done();
      });
    });
    test('should not use the app activity api if the { shouldShowAppActivity } option in the last argument is false', function (done) {
      feed.feedItems(file, false, successCb, errorCb, errorCb, {
        shouldShowAppActivity: false
      });
      setImmediate(function () {
        expect(feed.fetchAppActivity).not.toHaveBeenCalled();
        done();
      });
    });
    test('should use the annotations api if shouldShowannotations is true', function (done) {
      feed.feedItems(file, false, successCb, errorCb, errorCb, {
        shouldShowAnnotations: true
      });
      setImmediate(function () {
        expect(feed.fetchAnnotations).toHaveBeenCalled();
        done();
      });
    });
    test('should not use the annotations api if shouldShowannotations is false', function (done) {
      feed.feedItems(file, false, successCb, errorCb, errorCb, {
        shouldShowAnnotations: false
      });
      setImmediate(function () {
        expect(feed.fetchAnnotations).not.toHaveBeenCalled();
        done();
      });
    });
    test('should not call success or error callback if it is destroyed', function (done) {
      feed.isDestroyed = jest.fn().mockReturnValue(true);
      feed.feedItems(file, false, successCb, errorCb);
      setImmediate(function () {
        expect(successCb).not.toHaveBeenCalled();
        expect(errorCb).not.toHaveBeenCalled();
        done();
      });
    });
    test('should return the cached items', function () {
      feed.getCachedItems = jest.fn().mockReturnValue({
        errors: [],
        items: feedItems
      });
      feed.feedItems(file, false, successCb, errorCb);
      expect(feed.getCachedItems).toHaveBeenCalledWith(file.id);
      expect(successCb).toHaveBeenCalledWith(feedItems);
    });
    test('should refresh the cache after returning the cached items', function (done) {
      feed.getCachedItems = jest.fn().mockReturnValue({
        errors: [],
        items: feedItems
      });
      feed.feedItems(file, true, successCb, errorCb);
      expect(feed.getCachedItems).toHaveBeenCalledWith(file.id);
      expect(successCb).toHaveBeenCalledTimes(1);
      expect(successCb).toHaveBeenCalledWith(feedItems); // refresh cache

      setImmediate(function () {
        expect(successCb).toHaveBeenCalledTimes(2);
        done();
      });
    });
  });
  describe('fetchAnnotations()', function () {
    beforeEach(function () {
      feed.file = file;
      feed.fetchFeedItemErrorCallback = jest.fn();
    });
    test('should return a promise and call the annotations api', function () {
      var annotationItems = feed.fetchAnnotations();
      expect(annotationItems instanceof Promise).toBeTruthy();
      expect(feed.annotationsAPI.getAnnotations).toBeCalled();
    });
  });
  describe('fetchComments()', function () {
    beforeEach(function () {
      feed.file = file;
      feed.fetchFeedItemErrorCallback = jest.fn();
    });
    test('should return a promise and call the comments api', function () {
      var commentItems = feed.fetchComments();
      expect(commentItems instanceof Promise).toBeTruthy();
      expect(feed.commentsAPI.getComments).toBeCalled();
    });
  });
  describe('Fetching Base Items', function () {
    beforeEach(function () {
      feed.file = file;
      feed.fetchFeedItemErrorCallback = jest.fn();
    });
    describe('fetchVersions()', function () {
      test('should return a promise and call the versions api', function () {
        var versionItems = feed.fetchVersions();
        expect(versionItems instanceof Promise).toBeTruthy();
        expect(feed.versionsAPI.getVersions).toBeCalled();
      });
    });
    describe('fetchCurrentVersion()', function () {
      test('should return a promise and call the versions api', function () {
        var currentVersion = feed.fetchCurrentVersion();
        expect(currentVersion instanceof Promise).toBeTruthy();
        expect(feed.versionsAPI.getVersion).toBeCalled();
      });
    });
    describe('fetchAppActivity()', function () {
      test('should return a promise and call the app activity api', function () {
        var activityItems = feed.fetchAppActivity();
        expect(activityItems instanceof Promise).toBeTruthy();
        expect(feed.appActivityAPI.getAppActivity).toBeCalled();
      });
    });
    describe('fetchTasksNew()', function () {
      test('should return a promise and call the tasks api', function () {
        var taskItems = feed.fetchTasksNew();
        expect(taskItems instanceof Promise).toBeTruthy();
        expect(feed.tasksNewAPI.getTasksForFile).toBeCalled();
      });
    });
  });
  describe('updateTaskCollaborator()', function () {
    beforeEach(function () {
      feed.updateFeedItem = jest.fn();
      feed.updateTaskCollaboratorSuccessCallback = jest.fn();
    });
    test('should throw if no file id', function () {
      expect(function () {
        return feed.updateTaskCollaborator({});
      }).toThrow(fileError);
    });
    test('should call the tasks collaborators api and if successful, the success callback', function () {
      feed.updateTaskCollaborator(file);
      expect(feed.taskCollaboratorsAPI.length).toBe(1);
      expect(feed.taskCollaboratorsAPI.pop().updateTaskCollaborator).toBeCalled();
      expect(feed.updateTaskCollaboratorSuccessCallback).toBeCalled();
    });
  });
  describe('updateTaskCollaboratorSuccessCallback()', function () {
    beforeEach(function () {
      feed.getCachedItems = jest.fn().mockReturnValue({
        errors: [],
        items: feedItems
      });
      feed.updateFeedItem = jest.fn();
    });
    test('should refresh the task from the server and call the success callback', function () {
      var updatedStatus = 'COMPLETED';
      var successCb = jest.fn();
      var taskId = mockTask.id;
      feed.updateTaskCollaboratorSuccessCallback(taskId, file, _objectSpread({}, tasks.entries[0].assigned_to.entries[0], {
        status: updatedStatus
      }), successCb);
      expect(feed.tasksNewAPI.getTask).toBeCalled();
      expect(feed.updateFeedItem).toBeCalledWith({
        isPending: false
      }, taskId);
      expect(successCb).toBeCalled();
    });
  });
  describe('createTaskNew()', function () {
    var currentUser = {
      id: 'bar'
    };
    var message = 'hi';
    var assignees = [{
      id: '3086276240',
      type: 'group',
      name: 'Test Group',
      item: {
        id: '3086276240',
        name: 'Test User',
        type: 'group'
      }
    }];
    var taskType = 'GENERAL';
    var taskCompletionRule = 'ALL_ASSIGNEES';
    var dueAt = null;
    var code = 'group_exceeds_limit';
    var hasError = false;
    beforeEach(function () {
      feed.feedErrorCallback = jest.fn();
    });
    test('should check group size by calling groups endpoint',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var mockSuccessCallback, mockErrorCallback;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mockSuccessCallback = jest.fn();
              mockErrorCallback = jest.fn();
              mockGetGroupCount.mockResolvedValueOnce({
                total_count: TASK_MAX_GROUP_ASSIGNEES - 1
              });
              feed.createTaskNew(file, currentUser, message, assignees, taskType, dueAt, taskCompletionRule, mockSuccessCallback, mockErrorCallback);
              expect(feed.file.id).toBe(file.id);
              _context.next = 7;
              return new Promise(function (r) {
                return setTimeout(r, 0);
              });

            case 7:
              expect(mockGetGroupCount).toBeCalled();
              expect(mockCreateTaskWithDeps).toBeCalled();

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should call error handling when group size exceeds limit',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var mockSuccessCallback, mockErrorCallback;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              mockSuccessCallback = jest.fn();
              mockErrorCallback = jest.fn();
              mockGetGroupCount.mockResolvedValueOnce({
                total_count: TASK_MAX_GROUP_ASSIGNEES + 1
              });
              _context2.next = 5;
              return feed.createTaskNew(file, currentUser, message, assignees, taskType, dueAt, taskCompletionRule, mockSuccessCallback, mockErrorCallback);

            case 5:
              _context2.next = 7;
              return new Promise(function (r) {
                return setTimeout(r, 0);
              });

            case 7:
              expect(feed.file.id).toBe(file.id);
              expect(mockGetGroupCount).toBeCalled();
              expect(mockCreateTaskWithDeps).not.toBeCalled();
              expect(feed.feedErrorCallback).toBeCalledWith(hasError, {
                code: 'group_exceeds_limit',
                type: 'warning'
              }, code);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('updateTaskNew()', function () {
    var code = 'group_exceeds_limit';
    var hasError = false;
    beforeEach(function () {
      feed.updateFeedItem = jest.fn();
    });
    test('should throw if no file id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var updatedTask;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              expect.assertions(1);
              updatedTask = feed.updateTaskNew({});
              _context3.next = 4;
              return expect(updatedTask).rejects.toEqual(Error(fileError));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    test('should check group size by calling groups endpoint',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var mockSuccessCallback, mockErrorCallback, task;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              mockSuccessCallback = jest.fn();
              mockErrorCallback = jest.fn();
              mockGetGroupCount.mockResolvedValueOnce({
                total_count: TASK_MAX_GROUP_ASSIGNEES - 1
              });
              task = {
                id: '1',
                description: 'updated description',
                addedAssignees: [{
                  type: 'task_collaborator',
                  id: '19283765',
                  item: {
                    type: 'group',
                    id: '19283765',
                    name: 'adding a group',
                    login: ''
                  },
                  role: 'ASSIGNEE',
                  permissions: {
                    can_delete: true,
                    can_update: true
                  },
                  status: 'incomplete'
                }]
              };
              feed.updateTaskNew(file, task, mockSuccessCallback, mockErrorCallback);
              expect(feed.file.id).toBe(file.id);
              _context4.next = 8;
              return new Promise(function (r) {
                return setTimeout(r, 0);
              });

            case 8:
              expect(mockGetGroupCount).toBeCalled();

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    test('should call the feed error handling when group size exceeds limit on update',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var mockSuccessCallback, mockErrorCallback, task;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              mockSuccessCallback = jest.fn();
              mockErrorCallback = jest.fn();
              feed.feedErrorCallback = jest.fn();
              feed.createTaskCollaborator = jest.fn();
              feed.createTaskCollaboratorsforGroup = jest.fn();
              mockGetGroupCount.mockResolvedValueOnce({
                total_count: TASK_MAX_GROUP_ASSIGNEES + 1
              });
              task = {
                id: '1',
                description: 'updated description',
                addedAssignees: [{
                  type: 'task_collaborator',
                  id: '19283765',
                  item: {
                    type: 'group',
                    id: '19283765',
                    name: 'adding a group',
                    login: ''
                  },
                  role: 'ASSIGNEE',
                  permissions: {
                    can_delete: true,
                    can_update: true
                  },
                  status: 'incomplete'
                }]
              };
              feed.updateTaskNew(file, task, mockSuccessCallback, mockErrorCallback);
              expect(feed.file.id).toBe(file.id);
              _context5.next = 11;
              return new Promise(function (r) {
                return setTimeout(r, 0);
              });

            case 11:
              expect(mockGetGroupCount).toBeCalled();
              expect(feed.feedErrorCallback).toBeCalledWith(hasError, {
                code: 'group_exceeds_limit',
                type: 'warning'
              }, code);
              expect(feed.tasksNewAPI.updateTaskWithDeps).not.toBeCalled();

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    test('should call the new task api and if successful, the success callback',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var successCallback, task;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              successCallback = jest.fn();
              task = {
                id: '1',
                description: 'updated description',
                addedAssignees: [],
                removedAssignees: []
              };
              feed.updateTaskNew(file, task, successCallback, jest.fn());
              expect(feed.file.id).toBe(file.id); // push a new promise to trigger the promises in updateTaskNew

              _context6.next = 6;
              return new Promise(function (r) {
                return setTimeout(r, 0);
              });

            case 6:
              expect(feed.tasksNewAPI.updateTaskWithDeps).toBeCalled();
              expect(feed.tasksNewAPI.getTask).toBeCalled();
              expect(feed.updateFeedItem).toBeCalledTimes(2);
              expect(successCallback).toBeCalled();

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    test('should call the appropriate new task APIs when adding new assignees',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var successCallback, task;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              successCallback = jest.fn();
              task = {
                id: '1',
                description: 'updated description',
                addedAssignees: [{
                  type: 'user',
                  id: '3086276240',
                  name: 'Test User',
                  login: 'testuser@foo.com'
                }, {
                  type: 'group',
                  id: '3086276240',
                  name: 'Test User',
                  login: 'testuser@foo.com'
                }],
                removedAssignees: [{
                  type: 'task_collaborator',
                  id: '19283765',
                  target: {
                    type: 'user',
                    id: '19283765',
                    name: 'remove Test User',
                    login: 'testuser@foo.com'
                  },
                  role: 'ASSIGNEE',
                  permissions: {
                    can_delete: true,
                    can_update: true
                  },
                  status: 'incomplete'
                }]
              };
              feed.updateTaskNew(file, task, successCallback, jest.fn());
              _context7.next = 5;
              return new Promise(function (r) {
                return setTimeout(r, 0);
              });

            case 5:
              expect(feed.tasksNewAPI.updateTaskWithDeps).toBeCalled();
              expect(feed.updateFeedItem).toBeCalled();
              expect(successCallback).toBeCalled();

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
  });
  describe('updateComment()', function () {
    beforeEach(function () {
      feed.updateFeedItem = jest.fn();
    });
    test('should throw if no file id', function () {
      expect(function () {
        return feed.updateComment({});
      }).toThrow(fileError);
    });
    test('should call the comments api and update the feed items', function () {
      var successCallback = jest.fn();
      var comment = {
        id: '1',
        tagged_message: 'updated message',
        message: 'update message',
        permissions: {
          can_edit: true
        }
      };
      feed.updateComment(file, comment.id, comment.text, true, comment.permmissions, successCallback, jest.fn());
      expect(feed.updateFeedItem).toBeCalled();
      expect(successCallback).toBeCalled();
    });
  });
  describe('deleteComment()', function () {
    beforeEach(function () {
      feed.updateFeedItem = jest.fn();
      feed.deleteFeedItem = jest.fn();
    });
    test('should throw if no file id', function () {
      expect(function () {
        return feed.deleteComment({});
      }).toThrow(fileError);
    });
    test('should call the comments api and if successful, the success callback', function () {
      feed.deleteComment(file);
      expect(feed.commentsAPI.deleteComment).toBeCalled();
      expect(feed.deleteFeedItem).toBeCalled();
    });
  });
  describe('deleteCommentErrorCallback()', function () {
    var e = new Error('foo');
    beforeEach(function () {
      feed.updateFeedItem = jest.fn();
      feed.createFeedError = jest.fn().mockReturnValue(error);
      feed.feedErrorCallback = jest.fn();
    });
    test('should update the feed item and call the error callback', function () {
      var commentId = '1';
      feed.deleteCommentErrorCallback(e, errorCode, commentId);
      expect(feed.updateFeedItem).toBeCalledWith(error, commentId);
      expect(feed.feedErrorCallback).toBeCalledWith(true, e, errorCode);
    });
  });
  describe('deleteAppActivity()', function () {
    beforeEach(function () {
      feed.updateFeedItem = jest.fn();
      feed.deleteFeedItem = jest.fn();
    });
    test('should throw if no file id', function () {
      expect(function () {
        return feed.deleteAppActivity({});
      }).toThrow(fileError);
    });
    test('should call the app activity api and if successful, the success callback', function () {
      var activityItemId = '12345';
      feed.deleteAppActivity(file, activityItemId);
      expect(feed.appActivityAPI.deleteAppActivity).toBeCalled();
      expect(feed.deleteFeedItem).toBeCalled();
    });
  });
  describe('deleteTaskNew()', function () {
    beforeEach(function () {
      feed.updateFeedItem = jest.fn();
      feed.deleteFeedItem = jest.fn();
    });
    test('should throw if no file id', function () {
      expect(function () {
        return feed.deleteTaskNew({});
      }).toThrow(fileError);
    });
    test('should call the new task api and if successful, the success callback', function () {
      feed.deleteTaskNew(file, {
        id: '1'
      });
      expect(feed.file.id).toBe(file.id);
      expect(feed.tasksNewAPI.deleteTask).toBeCalled();
      expect(feed.deleteFeedItem).toBeCalled();
    });
  });
  describe('deleteFeedItem()', function () {
    var successCb;
    var feedItemId = feedItems[0].id;
    beforeEach(function () {
      feed.setCachedItems = jest.fn();
      feed.file = file;
      successCb = jest.fn();
    });
    test('should delete the feed item and call success callback', function () {
      feed.getCachedItems = jest.fn().mockReturnValue({
        errors: [],
        items: feedItems
      });
      feed.deleteFeedItem(feedItemId, successCb);
      expect(feed.setCachedItems.mock.calls[0][1].length).toBe(feedItems.length - 1);
      expect(successCb).toBeCalled();
    });
    test('not call the success callback', function () {
      feed.isDestroyed = jest.fn().mockReturnValue(true);
      feed.deleteFeedItem(feedItemId, successCb);
      expect(successCb).not.toBeCalled();
    });
  });
  describe('feedErrorCallback()', function () {
    var code = 'foo';
    var e = new Error('bar');
    beforeEach(function () {
      jest.spyOn(global.console, 'error').mockImplementation();
      feed.errorCallback = jest.fn();
    });
    afterEach(function () {
      jest.restoreAllMocks();
    });
    test('should log the error and set the errors property if its not destroyed and hasError is set to true', function () {
      var hasError = true;
      feed.feedErrorCallback(hasError, e, code);
      expect(global.console.error).toBeCalledWith(e);
      expect(feed.errors).toEqual([_objectSpread({}, e, {
        code: code
      })]);
      expect(feed.errorCallback).toHaveBeenCalledWith(e, code, _defineProperty({
        error: e
      }, IS_ERROR_DISPLAYED, hasError));
    });
    test('should call the error callback with the value of hasError', function () {
      var hasError = false;
      feed.feedErrorCallback(hasError, e, code);
      expect(feed.errorCallback).toHaveBeenCalledWith(e, code, _defineProperty({
        error: e
      }, IS_ERROR_DISPLAYED, hasError));
    });
    test('should set errors only if hasError is true', function () {
      feed.errors = [];
      feed.feedErrorCallback(false, e, code);
      expect(feed.errors).toEqual([]);
      feed.feedErrorCallback(true, e, code);
      expect(feed.errors).toEqual([_objectSpread({}, e, {
        code: code
      })]);
    });
  });
  describe('addPendingItem()', function () {
    var itemBase = {
      my_prop: 'yay'
    };
    beforeEach(function () {
      feed.file = file;
      feed.setCachedItems = jest.fn();
    });
    test('should create an item and add it to the feed with empty cache', function () {
      feed.getCachedItems = jest.fn();
      var item = feed.addPendingItem(file.id, user, itemBase);
      expect(_typeof(item.created_at)).toBe('string');
      expect(item.created_by).toBe(user);
      expect(_typeof(item.modified_at)).toBe('string');
      expect(item.isPending).toBe(true);
      expect(feed.setCachedItems).toBeCalledWith(file.id, [item]);
    });
    test('should create an item and add it to the feed with populated cache', function () {
      feed.getCachedItems = jest.fn().mockReturnValue({
        errors: [],
        items: feedItems
      });
      var item = feed.addPendingItem(file.id, user, itemBase);
      expect(feed.setCachedItems).toBeCalledWith(file.id, [].concat(_toConsumableArray(feedItems), [item]));
    });
  });
  describe('createCommentSuccessCallback()', function () {
    var successCb;
    beforeEach(function () {
      feed.updateFeedItem = jest.fn();
      successCb = jest.fn();
    });
    test('should assign tagged_message of the comment with tagged_message value if it exists', function () {
      var id = '0987654321';
      var commentData = {
        tagged_message: 'yay'
      };
      feed.createCommentSuccessCallback(commentData, id, successCb);
      expect(feed.updateFeedItem).toBeCalledWith(_objectSpread({}, commentData, {
        isPending: false
      }), id);
      expect(successCb).toBeCalled();
    });
    test('should assign tagged_message of the comment with message value if it exists', function () {
      var id = '0987654321';
      var commentData = {
        message: 'yay'
      };
      feed.createCommentSuccessCallback(commentData, id, successCb);
      expect(feed.updateFeedItem).toBeCalledWith(_objectSpread({}, commentData, {
        isPending: false
      }), id);
    });
    test('should not invoke success callback if destroyed', function () {
      var id = '0987654321';
      var commentData = {
        message: 'yay'
      };
      feed.isDestroyed = jest.fn().mockReturnValue(true);
      feed.createCommentSuccessCallback(commentData, id, successCb);
      expect(successCb).not.toBeCalled();
    });
  });
  describe('createFeedError()', function () {
    test('should create a feed error with the message and title', function () {
      var feedError = feed.createFeedError('foo', 'bar');
      expect(feedError).toEqual({
        error: {
          message: 'foo',
          title: 'bar'
        }
      });
    });
    test('should create a feed error with the message and default title', function () {
      var feedError = feed.createFeedError('foo');
      expect(feedError).toEqual({
        error: {
          message: 'foo',
          title: commonMessages.errorOccured
        }
      });
    });
  });
  describe('updateFeedItem()', function () {
    var id = comments.entries[0].id;
    var updates = {
      foo: 'bar',
      id: 'foo'
    };
    beforeEach(function () {
      feed.setCachedItems = jest.fn();
      feed.getCachedItems = jest.fn().mockReturnValue({
        errors: [],
        items: feedItems
      });
    });
    test('should throw if no file id', function () {
      feed.file = {};
      expect(function () {
        return feed.updateFeedItem({}, id);
      }).toThrow(fileError);
    });
    test('should update the cache with the updated item', function () {
      feed.file = file;
      var updatedFeedItems = feed.updateFeedItem(updates, id);
      expect(updatedFeedItems).not.toBeNull();
      expect(feed.setCachedItems).toBeCalledWith(file.id, updatedFeedItems);
    });
  });
  describe('createComment()', function () {
    var successCb;
    var errorCb;
    var currentUser = {
      id: 'bar'
    };
    var text = 'textfoo';
    var hasMention = true;
    beforeEach(function () {
      successCb = jest.fn();
      errorCb = jest.fn();
      feed.addPendingItem = jest.fn();
      feed.createCommentSuccessCallback = jest.fn();
      feed.createCommentErrorCallback = jest.fn();
      feed.createFeedError = jest.fn().mockReturnValue('foo');
    });
    test('should throw if no file id', function () {
      expect(function () {
        return feed.createComment({}, currentUser, text, true, successCb, errorCb);
      }).toThrow(fileError);
    });
    test('should create a pending item', function () {
      feed.createComment(file, currentUser, text, true, successCb, errorCb);
      expect(feed.addPendingItem).toBeCalledWith(file.id, currentUser, {
        id: 'uniqueId',
        tagged_message: text,
        type: 'comment'
      });
    });
    test('should create the comment and invoke the success callback', function (done) {
      feed.createComment(file, currentUser, text, hasMention, successCb, errorCb);
      setImmediate(function () {
        expect(feed.commentsAPI.createComment).toBeCalled();
        expect(feed.createCommentSuccessCallback).toBeCalled();
        expect(feed.createCommentErrorCallback).not.toBeCalled();
        done();
      });
    });
  });
  describe('createCommentErrorCallback()', function () {
    var message = 'foo';
    var id = 'uniqueId';
    beforeEach(function () {
      feed.updateFeedItem = jest.fn();
      feed.createFeedError = jest.fn().mockReturnValue(message);
      feed.feedErrorCallback = jest.fn();
    });
    test('should invoke update the feed item with an AF error and call the success callback', function () {
      var e = {
        status: 409
      };
      feed.createCommentErrorCallback(e, errorCode, id);
      expect(feed.createFeedError).toBeCalledWith(messages.commentCreateConflictMessage);
      expect(feed.updateFeedItem).toBeCalledWith(message, id);
      expect(feed.feedErrorCallback).toHaveBeenCalledWith(false, e, errorCode);
    });
    test('should invoke update the feed item with an AF error', function () {
      var e = {
        status: 500
      };
      feed.isDestroyed = jest.fn().mockReturnValue(true);
      feed.createCommentErrorCallback(e, errorCode, id);
      expect(feed.createFeedError).toBeCalledWith(messages.commentCreateErrorMessage);
      expect(feed.updateFeedItem).toBeCalledWith(message, id);
    });
  });
  describe('destroy()', function () {
    var annotationFn;
    var commentFn;
    var versionFn;
    var taskFn;
    beforeEach(function () {
      annotationFn = jest.fn();
      commentFn = jest.fn();
      versionFn = jest.fn();
      taskFn = jest.fn();
      feed.annotationsAPI = {
        destroy: annotationFn
      };
      feed.tasksNewAPI = {
        destroy: taskFn
      };
      feed.versionsAPI = {
        destroy: versionFn
      };
      feed.commentsAPI = {
        destroy: commentFn
      };
    });
    test('should destroy the APIs', function () {
      feed.destroy();
      expect(versionFn).toBeCalled();
      expect(commentFn).toBeCalled();
      expect(taskFn).toBeCalled();
      expect(annotationFn).toBeCalled();
    });
  });
  describe('fetchFeedItemErrorCallback()', function () {
    var errorCb;
    var code = 'foo';
    var e = new Error('bar');
    beforeEach(function () {
      feed.feedErrorCallback = jest.fn();
      errorCb = jest.fn();
    });
    afterEach(function () {
      jest.restoreAllMocks();
    });
    test('should call the error callback if error is internal server error', function () {
      var shouldDisplayError = true;
      jest.spyOn(error, 'isUserCorrectableError').mockReturnValue(shouldDisplayError);
      feed.fetchFeedItemErrorCallback(errorCb, e, code);
      expect(feed.feedErrorCallback).toHaveBeenCalledWith(shouldDisplayError, e, code);
    });
    test('should not call the error callback if error is forbidden or another error', function () {
      var shouldDisplayError = false;
      jest.spyOn(error, 'isUserCorrectableError').mockReturnValue(shouldDisplayError);
      feed.fetchFeedItemErrorCallback(errorCb, e, code);
      expect(feed.feedErrorCallback).toHaveBeenCalledWith(shouldDisplayError, e, code);
    });
  });
  describe('addAnnotation()', function () {
    beforeEach(function () {
      feed.addPendingItem = jest.fn();
      feed.updateFeedItem = jest.fn();
    });
    afterEach(function () {
      jest.restoreAllMocks();
    });
    test('should throw if no file id', function () {
      expect(function () {
        return feed.addAnnotation({});
      }).toThrow('Bad box item!');
    });
    test('should add pending feedItem item if annotation event isPending', function () {
      var expectedAnnotation = {
        created_by: user,
        id: '123',
        type: 'annotation'
      };
      feed.addAnnotation(file, user, {}, '123', true);
      expect(feed.addPendingItem).toBeCalledWith(file.id, user, expectedAnnotation);
      expect(feed.updateFeedItem).not.toBeCalled();
    });
    test('should update feedItem if annotation event is not pending', function () {
      var expectedAnnotation = {
        isPending: false
      };
      feed.addAnnotation(file, user, {}, '123', false);
      expect(feed.updateFeedItem).toBeCalledWith(expectedAnnotation, '123');
      expect(feed.addPendingItem).not.toBeCalled();
    });
  });
  describe('updateAnnotation()', function () {
    var annotationId = '123';
    var text = 'hello';
    var permissions = {
      can_edit: true
    };
    var successCallback;
    var errorCallback;
    beforeEach(function () {
      successCallback = jest.fn();
      errorCallback = jest.fn();
    });
    test('should throw if file does not have an id', function () {
      expect(function () {
        return feed.updateAnnotation({}, annotationId, text, permissions, successCallback, errorCallback);
      }).toThrow(fileError);
    });
    test('should set error callback and file', function () {
      feed.updateAnnotation(file, annotationId, text, permissions, successCallback, errorCallback);
      expect(feed.errorCallback).toEqual(errorCallback);
      expect(feed.file).toEqual(file);
    });
    test('should updateFeedItem with isPending set to true', function () {
      feed.updateFeedItem = jest.fn();
      feed.updateAnnotation(file, annotationId, text, permissions, successCallback, errorCallback);
      expect(feed.updateFeedItem).toBeCalledWith({
        message: text,
        isPending: true
      }, annotationId);
    });
    test('should call the updateAnnotation API and call updateFeedItem on success', function () {
      feed.updateFeedItem = jest.fn();
      feed.updateAnnotation(file, annotationId, permissions, text, successCallback, errorCallback);
      expect(feed.annotationsAPI.updateAnnotation).toHaveBeenCalled();
      expect(feed.updateFeedItem).toHaveBeenCalled();
      expect(successCallback).toHaveBeenCalled();
    });
  });
  describe('updateCommentErrorCallback()', function () {
    var e = new Error('foo');
    beforeEach(function () {
      feed.updateFeedItem = jest.fn();
      feed.createFeedError = jest.fn().mockReturnValue(error);
      feed.feedErrorCallback = jest.fn();
    });
    test('should update the feed item and call the error callback', function () {
      var id = '1';
      feed.updateCommentErrorCallback(e, errorCode, id);
      expect(feed.createFeedError).toBeCalledWith(messages.commentUpdateErrorMessage);
      expect(feed.updateFeedItem).toBeCalledWith(error, id);
      expect(feed.feedErrorCallback).toBeCalledWith(true, e, errorCode);
    });
  });
  describe('deleteAnnotation()', function () {
    var annotationId = '123';
    var successCallback;
    var errorCallback;
    beforeEach(function () {
      successCallback = jest.fn();
      errorCallback = jest.fn();
    });
    test('should throw if file does not have an id', function () {
      expect(function () {
        return feed.deleteAnnotation({}, annotationId, successCallback, errorCallback);
      }).toThrow(fileError);
    });
    test('should set error callback and file', function () {
      feed.deleteAnnotation(file, annotationId, {
        can_delete: true
      }, jest.fn(), errorCallback);
      expect(feed.errorCallback).toEqual(errorCallback);
      expect(feed.file).toEqual(file);
    });
    test('should updateFeedItem with to pending state', function () {
      feed.updateFeedItem = jest.fn();
      feed.deleteAnnotation(file, '123', successCallback, errorCallback);
      expect(feed.updateFeedItem).toBeCalledWith({
        isPending: true
      }, annotationId);
    });
    test('should call the deleteAnnotation API and call deleteFeedItem on success', function () {
      feed.deleteFeedItem = jest.fn().mockImplementation(function (id, cb) {
        return cb();
      });
      feed.deleteAnnotation(file, '123', {
        can_delete: true
      }, successCallback, errorCallback);
      expect(feed.annotationsAPI.deleteAnnotation).toBeCalled();
      expect(feed.deleteFeedItem).toBeCalled();
      expect(successCallback).toBeCalled();
    });
  });
});