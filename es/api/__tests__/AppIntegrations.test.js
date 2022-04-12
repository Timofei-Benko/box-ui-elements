import AppIntegrations from '../AppIntegrations';
var appIntegrations;
describe('api/AppIntegrations', function () {
  beforeEach(function () {
    appIntegrations = new AppIntegrations({});
  });
  describe('getUrl()', function () {
    test('should throw when version api url without id', function () {
      expect(function () {
        appIntegrations.getUrl();
      }).toThrow();
    });
    test('should return correct app integrations api url with id', function () {
      expect(appIntegrations.getUrl('foo')).toBe('https://api.box.com/2.0/app_integrations/foo');
    });
  });
  describe('execute()', function () {
    test('should throw an error if the integration ID or file ID is missing', function () {
      expect(function () {
        appIntegrations.execute(null, '1234', function () {});
      }).toThrow();
      expect(function () {
        appIntegrations.execute('1234', null, function () {});
      }).toThrow();
    });
    test('should make a POST request with the correct data', function () {
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      var fileID = '1234';
      var url = "".concat(appIntegrations.getUrl('5678'), "/execute");
      var body = {
        data: {
          item: {
            type: 'file',
            id: fileID
          }
        }
      };
      appIntegrations.post = jest.fn();
      appIntegrations.execute('5678', '1234', successCallback, errorCallback);
      expect(appIntegrations.post).toBeCalledWith({
        id: fileID,
        url: url,
        data: body,
        successCallback: successCallback,
        errorCallback: errorCallback
      });
    });
  });
});