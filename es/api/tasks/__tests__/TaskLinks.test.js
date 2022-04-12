import TaskLinks from '../TaskLinks';
var taskLinks;
var BASE_URL = 'https://www.foo.com';
var FILE_ID = 'foo';
describe('api/TaskLinks', function () {
  beforeEach(function () {
    taskLinks = new TaskLinks({});
  });
  describe('CRUD operations', function () {
    var file = {
      id: FILE_ID,
      permissions: {}
    };
    var taskId = '123';
    var message = 'hello world';
    var dueAt = '2018-09-06';
    var task = {
      id: taskId,
      name: message,
      due_at: dueAt
    };
    var successCallback = jest.fn();
    var errorCallback = jest.fn();
    beforeEach(function () {
      taskLinks.get = jest.fn();
      taskLinks.post = jest.fn();
      taskLinks.put = jest.fn();
      taskLinks.delete = jest.fn();
      taskLinks.checkApiCallValidity = jest.fn(function () {
        return true;
      });
      var url = 'https://www.foo.com';
      taskLinks.getBaseApiUrl = jest.fn(function () {
        return url;
      });
    });
    describe('createTaskLink()', function () {
      test('should post a well formed taskLink to the taskLinks endpoint', function () {
        var expectedRequestData = {
          data: {
            task: {
              id: task.id,
              type: 'task'
            },
            target: {
              id: FILE_ID,
              type: 'file'
            }
          }
        };
        taskLinks.createTaskLink({
          file: file,
          task: task,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(taskLinks.post).toBeCalledWith({
          id: FILE_ID,
          url: "".concat(BASE_URL, "/undoc/task_links"),
          data: expectedRequestData,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
      });
    });
  });
});