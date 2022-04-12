import Collaborations from '../Collaborations';
var MOCK_URL = 'https://api.box.com/2.0/collaborations';
var collaborations;
describe('api/Collaborations', function () {
  beforeEach(function () {
    collaborations = new Collaborations({});
  });
  describe('getUrl()', function () {
    test('should return the correct collaborations API URL', function () {
      expect(collaborations.getUrl()).toBe(MOCK_URL);
    });
  });
  describe('addCollaboration()', function () {
    test('should call post() with the provided item and collaboration', function () {
      var MOCK_ITEM_ID = '542809';
      var MOCK_ITEM = {
        id: MOCK_ITEM_ID,
        type: 'folder'
      };
      var MOCK_COLLABORATION = {
        accessible_by: {
          login: 'turtle@box.com',
          type: 'user'
        },
        role: 'editor'
      };
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      var postSpy = jest.spyOn(collaborations, 'post');
      jest.spyOn(collaborations, 'getUrl').mockReturnValue(MOCK_URL);
      collaborations.addCollaboration(MOCK_ITEM, MOCK_COLLABORATION, successCallback, errorCallback);
      expect(postSpy).toHaveBeenCalledWith({
        id: MOCK_ITEM_ID,
        data: {
          data: {
            item: MOCK_ITEM,
            accessible_by: {
              login: 'turtle@box.com',
              type: 'user'
            },
            role: 'editor'
          }
        },
        errorCallback: errorCallback,
        successCallback: successCallback,
        url: MOCK_URL
      });
    });
  });
});