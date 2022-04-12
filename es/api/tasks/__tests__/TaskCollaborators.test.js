function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { API_PAGE_LIMIT } from '../../../constants';
import TaskCollaborators from '../TaskCollaborators';
var taskCollaborators;
var BASE_URL = 'https://www.foo.com';
var FILE_ID = 'foo';
var USER_ID = 'userone';
describe('api/TaskCollaborators', function () {
  beforeEach(function () {
    taskCollaborators = new TaskCollaborators({});
  });
  describe('CRUD operations', function () {
    var file = {
      id: 'foo',
      permissions: {}
    };
    var groupId = '456';
    var taskId = '123';
    var message = 'hello world';
    var dueAt = '2018-09-06';
    var group = {
      id: groupId
    };
    var task = {
      id: taskId,
      name: message,
      due_at: dueAt
    };
    var user = {
      id: USER_ID,
      type: 'user'
    };
    var taskCollaborator = {
      id: 'taskcollabid'
    };
    var successCallback = jest.fn();
    var errorCallback = jest.fn();
    beforeEach(function () {
      taskCollaborators.get = jest.fn();
      taskCollaborators.post = jest.fn();
      taskCollaborators.put = jest.fn();
      taskCollaborators.delete = jest.fn();
      taskCollaborators.checkApiCallValidity = jest.fn(function () {
        return true;
      });
      taskCollaborators.getBaseApiUrl = jest.fn(function () {
        return BASE_URL;
      });
    });
    describe('createTaskCollaborator()', function () {
      test('should post a well formed payload to the taskCollaborators endpoint', function () {
        var expectedRequestData = {
          data: {
            task: {
              id: taskId,
              type: 'task'
            },
            target: user
          }
        };
        taskCollaborators.createTaskCollaborator({
          file: file,
          task: task,
          user: user,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(taskCollaborators.post).toBeCalledWith({
          id: FILE_ID,
          url: "".concat(BASE_URL, "/undoc/task_collaborators"),
          data: expectedRequestData,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
    describe('createTaskCollaboratorsforGroup()', function () {
      test('should post a well formed payload to the taskCollaborators endpoint for groups', function () {
        var expectedRequestData = {
          data: {
            task: {
              id: taskId,
              type: 'task'
            },
            target: {
              id: groupId,
              type: 'group'
            }
          }
        };
        taskCollaborators.createTaskCollaboratorsforGroup({
          file: file,
          task: task,
          group: group,
          user: user,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(taskCollaborators.post).toBeCalledWith({
          id: FILE_ID,
          url: "".concat(BASE_URL, "/undoc/task_collaborators/expand_group"),
          data: expectedRequestData,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
    describe('updateTaskCollaborator()', function () {
      test('should put a well formed payload to the taskCollaborators endpoint', function () {
        var expectedRequestData = {
          data: {
            status: 'COMPLETED'
          }
        };
        taskCollaborators.updateTaskCollaborator({
          file: file,
          taskCollaborator: _objectSpread({}, taskCollaborator, {
            status: 'COMPLETED'
          }),
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(taskCollaborators.put).toBeCalledWith({
          id: FILE_ID,
          url: "".concat(BASE_URL, "/undoc/task_collaborators/").concat(taskCollaborator.id),
          data: expectedRequestData,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
    describe('deleteTask()', function () {
      test('should delete a taskCollaborator from the taskCollaborators endpoint', function () {
        taskCollaborators.deleteTaskCollaborator({
          file: file,
          taskCollaborator: taskCollaborator,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(taskCollaborators.delete).toBeCalledWith({
          id: FILE_ID,
          url: "".concat(BASE_URL, "/undoc/task_collaborators/").concat(taskCollaborator.id),
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
    describe('getTaskCollaborators()', function () {
      test('should get all taskCollaborators for a task', function () {
        taskCollaborators.getTaskCollaborators({
          file: file,
          task: task,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(taskCollaborators.get).toBeCalledWith({
          id: FILE_ID,
          url: "".concat(BASE_URL, "/undoc/tasks/").concat(taskId, "/task_collaborators?role=ASSIGNEE&limit=").concat(API_PAGE_LIMIT),
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
  });
});