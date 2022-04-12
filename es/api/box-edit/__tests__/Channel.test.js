import Channel from '../Channel';
import CONSTANTS from '../constants';
var APP_NAME = 'dummy';
describe('lib/box-edit/Channel', function () {
  describe('buildNextRequestID()', function () {
    test('should return a string that contains performance.now', function () {
      var expected = "".concat(CONSTANTS.REQUEST_ID_PRE, "foo");
      var channel = new Channel(APP_NAME); // Replace global instance of window with mock to avoid side effects

      channel.window = {
        performance: {
          now: jest.fn().mockReturnValue('foo')
        }
      };
      var result = channel.buildNextRequestID();
      expect(result).toEqual(expected);
    });
  });
  describe('buildDetailsObj()', function () {
    var channel;
    beforeEach(function () {
      channel = new Channel(APP_NAME);
      channel.buildNextRequestID = jest.fn().mockReturnValue('foo');
    });
    test('should return details object with data not set if operation type is OPERATION_STATUS', function () {
      var result = channel.buildDetailsObj(CONSTANTS.OPERATION_STATUS, 'foo', 111);
      expect(result.operation).toEqual(CONSTANTS.OPERATION_STATUS);
      expect(result.properties.application).toEqual(APP_NAME);
      expect(result.properties.timeout).toEqual('111');
      expect(result.req_id).toEqual('foo');
      expect(result.data).toEqual(undefined);
    });
    test('should return details object with data set if operation type is not OPERATION_STATUS', function () {
      var result = channel.buildDetailsObj(CONSTANTS.OPERATION_COMMAND, 'bar', 111);
      expect(result.operation).toEqual(CONSTANTS.OPERATION_COMMAND);
      expect(result.properties.application).toEqual(APP_NAME);
      expect(result.properties.timeout).toEqual('111');
      expect(result.req_id).toEqual('foo');
      expect(result.data).toEqual('bar');
    });
    test('should throw when operation type is not OPERATION_STATUS and data is not set', function () {
      try {
        channel.buildDetailsObj(CONSTANTS.OPERATION_COMMAND, undefined, 111);
      } catch (err) {
        expect(err).toBeInstanceOf(TypeError);
      }
    });
  });
});