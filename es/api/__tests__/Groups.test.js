import Groups from '../Groups';
var groups;
var BASE_URL = 'https://www.foo.com';
var FILE_ID = 'foo';
var id = 123;
describe('api/Groups', function () {
  beforeEach(function () {
    groups = new Groups({});
  });
  describe('CRUD operations', function () {
    var file = {
      id: 'foo',
      permissions: {}
    };
    var groupId = '123';
    var group = {
      id: groupId
    };
    var successCallback = jest.fn();
    var errorCallback = jest.fn();
    beforeEach(function () {
      groups.get = jest.fn();
      groups.checkApiCallValidity = jest.fn(function () {
        return true;
      });
      groups.getBaseApiUrl = jest.fn(function () {
        return BASE_URL;
      });
    });
    describe('getGroupCount()', function () {
      test('should get group data from the groups endpoint', function () {
        var expectedRequestData = {
          params: {
            limit: 1
          }
        };
        groups.getGroupCount({
          file: file,
          group: group,
          successCallback: successCallback,
          errorCallback: errorCallback
        });
        expect(groups.get).toBeCalledWith({
          id: FILE_ID,
          url: "".concat(BASE_URL, "/groups/").concat(id, "/memberships"),
          requestData: expectedRequestData,
          successCallback: expect.any(Function),
          errorCallback: expect.any(Function)
        });
      });
    });
  });
});