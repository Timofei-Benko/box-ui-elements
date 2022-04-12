function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { API_PAGE_LIMIT } from '../../../constants';
import TasksNew from '../TasksNew';
var tasks;
var BASE_URL = 'https://www.foo.com';
var FILE_ID = 'foo';
describe('api/TasksNew', function () {
  beforeEach(function () {
    tasks = new TasksNew({});
    tasks.get = jest.fn();
    tasks.post = jest.fn();
    tasks.put = jest.fn();
    tasks.delete = jest.fn();
    tasks.checkApiCallValidity = jest.fn(function () {
      return true;
    });
    tasks.getBaseApiUrl = jest.fn(function () {
      return BASE_URL;
    });
  });
  describe('CRUD operations', function () {
    var file = {
      id: 'foo',
      permissions: {}
    };
    var taskId = '123';
    var taskCollabId = '456';
    var message = 'hello world';
    var dueAt = '2018-09-06';
    var task = {
      id: taskId,
      name: message,
      due_at: dueAt
    };
    var user = {
      id: '1111',
      name: 'user-name',
      email: 'user-email'
    };
    var group = {
      id: '22222',
      name: 'group-name'
    };
    var assignees = [{
      id: user.id,
      item: {
        type: 'user',
        id: user.id,
        name: user.name,
        login: user.email,
        email: user.email
      },
      name: user.name,
      text: user.name,
      value: user.id
    }, {
      id: group.id,
      item: {
        id: group.id,
        name: group.name,
        type: 'group'
      },
      name: group.name,
      text: group.name,
      value: group.id
    }];
    var successCallback = jest.fn();
    var errorCallback = jest.fn();
    describe('createTaskWithDeps()', function () {
      test('should post a well formed task, task link, and task collaborators to the tasks/with_dependencies endpoint', function () {
        var expectedRequestData = {
          data: {
            task: _objectSpread({}, task),
            assigned_to: [{
              target: {
                id: user.id,
                type: 'user'
              }
            }, {
              target: {
                id: group.id,
                type: 'group'
              }
            }],
            task_links: [{
              target: {
                id: file.id,
                type: 'file'
              }
            }]
          }
        };
        tasks.createTaskWithDeps({
          file: file,
          task: task,
          successCallback: successCallback,
          errorCallback: errorCallback,
          assignees: assignees
        });
        expect(tasks.post).toBeCalledWith({
          id: FILE_ID,
          url: "".concat(BASE_URL, "/undoc/tasks/with_dependencies"),
          data: expectedRequestData,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
    describe('updateTaskWithDeps()', function () {
      test('should put a well formed task update to the tasks with dependencies endpoint', function () {
        var expectedRequestData = {
          data: [{
            op: 'update_task',
            payload: {
              description: message
            }
          }, {
            op: 'add_task_collaborator',
            payload: {
              target: {
                type: 'user',
                id: user.id
              }
            }
          }, {
            op: 'add_task_collaborators_expand_group',
            payload: {
              target: {
                type: 'group',
                id: group.id
              }
            }
          }, {
            op: 'delete_task_collaborator',
            id: taskCollabId
          }]
        };
        tasks.updateTaskWithDeps({
          file: file,
          task: {
            id: task.id,
            description: message,
            addedAssignees: assignees,
            removedAssignees: [{
              id: taskCollabId
            }]
          },
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(tasks.put).toBeCalledWith({
          id: FILE_ID,
          url: "".concat(BASE_URL, "/undoc/tasks/").concat(task.id, "/with_dependencies"),
          data: expectedRequestData,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
    describe('deleteTask()', function () {
      test('should delete a task from the tasks endpoint', function () {
        tasks.deleteTask({
          file: file,
          task: task,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(tasks.delete).toBeCalledWith({
          id: FILE_ID,
          url: "".concat(BASE_URL, "/undoc/tasks/").concat(task.id),
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
    describe('getTasksForFile()', function () {
      test('should get all tasks for a file', function () {
        tasks.getTasksForFile({
          file: file,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(tasks.get).toBeCalledWith({
          id: FILE_ID,
          url: "".concat(BASE_URL, "/undoc/files/").concat(FILE_ID, "/linked_tasks?limit=").concat(API_PAGE_LIMIT),
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
    describe('getTask()', function () {
      test('should get task by id', function () {
        var taskIdToGet = '12345';
        tasks.getTask({
          file: file,
          id: taskIdToGet,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(tasks.get).toBeCalledWith({
          id: FILE_ID,
          url: "".concat(BASE_URL, "/undoc/tasks/").concat(taskIdToGet),
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
  });
});