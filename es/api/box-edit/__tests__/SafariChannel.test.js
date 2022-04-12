import SafariChannel from '../SafariChannel';
import CONSTANTS from '../constants';
var APP_NAME = 'AppName';
describe('lib/box-edit/SafariChannel', function () {
  beforeEach(function () {
    document.addEventListener = jest.fn();
    document.removeEventListener = jest.fn();
    document.dispatchEvent = jest.fn();
    window.CustomEvent = jest.fn();
  });
  afterEach(function () {
    jest.restoreAllMocks();
  }); // TODO. implement

  describe('constructor()', function () {}); // TODO. implement.

  describe('executeOperation()', function () {});
  describe('setupSafariExtensionCommunication()', function () {
    var channel;
    beforeEach(function () {
      channel = new SafariChannel(APP_NAME);
      channel.appExtensionEventResponseHandler = jest.fn(); // Reset mock because it gets called in the constructor;

      document.addEventListener.mockClear();
    });
    test('should not set an event listener on the document when called with one already set', function () {
      channel.setupSafariExtensionCommunication();
      expect(document.addEventListener).not.toBeCalledWith(CONSTANTS.OUTPUT_EVENT, channel.appExtensionEventResponseHandler);
    });
    test('should set an event listener on the document when called and none is already set', function () {
      channel.isAppExtensionListenerAttached = false;
      channel.setupSafariExtensionCommunication();
      expect(document.addEventListener).toBeCalledWith(CONSTANTS.OUTPUT_EVENT, channel.appExtensionEventResponseHandler);
    });
  });
  describe('tearDownSafariExtensionCommunication()', function () {
    var channel;
    beforeEach(function () {
      channel = new SafariChannel(APP_NAME, false);
      channel.appExtensionEventResponseHandler = jest.fn();
    });
    test('should remove event listener on the document when called and one is already set', function () {
      channel.isAppExtensionListenerAttached = true;
      channel.tearDownSafariExtensionCommunication();
      expect(document.removeEventListener).toBeCalledWith(CONSTANTS.OUTPUT_EVENT, channel.appExtensionEventResponseHandler);
    });
    test('should not remove event listener on the document when called and none is set', function () {
      channel.isAppExtensionListenerAttached = false;
      channel.tearDownSafariExtensionCommunication();
      expect(document.removeEventListener).not.toBeCalledWith(CONSTANTS.OUTPUT_EVENT, channel.appExtensionEventResponseHandler);
    });
  });
  describe('appExtensionEventResponseHandler()', function () {
    var responseVal;
    var reqIdToPromiseMap;
    var resolveStub;
    var channel;
    beforeEach(function () {
      responseVal = {
        detail: {
          req_id: 'id',
          com_server_response: {
            data: {
              foo: 'bar'
            }
          }
        }
      };
      reqIdToPromiseMap = new Map();
      resolveStub = jest.fn();
      reqIdToPromiseMap.set('id', {
        rejectTimeout: 123,
        resolve: resolveStub
      });
    });
    test('should call resolve with response if reqIdToPromiseMap has req_id', function () {
      channel = new SafariChannel(APP_NAME, false);
      channel.reqIdToPromiseMap = reqIdToPromiseMap;
      channel.appExtensionEventResponseHandler(responseVal);
      expect(resolveStub).toBeCalledWith({
        foo: 'bar'
      });
    });
  });
  describe('createAndDispatchAppExtensionEvent()', function () {
    test('should dispatch an event to the document when called', function () {
      var payload = {
        foo: 'bar'
      };
      var stubCustomEventInstance = {};
      window.CustomEvent.mockReturnValue(stubCustomEventInstance);
      var channel = new SafariChannel(APP_NAME);
      channel.createAndDispatchAppExtensionEvent(payload);
      expect(document.dispatchEvent).toBeCalledWith(stubCustomEventInstance);
    });
  });
  describe('getComServerStatus()', function () {
    test('should call executeOperation with OPERATION_STATUS and timeout params', function () {
      var channel = new SafariChannel(APP_NAME, false);
      channel.executeOperation = jest.fn();
      channel.getComServerStatus(0, 0);
      expect(channel.executeOperation).toBeCalledWith(CONSTANTS.OPERATION_STATUS, null, 0, 0);
    });
  });
  describe('sendRequest()', function () {
    test('should call executeOperation with OPERATION_REQUEST and timeout params', function () {
      var channel = new SafariChannel(APP_NAME, false);
      channel.executeOperation = jest.fn();
      channel.sendRequest({
        foo: 'bar'
      }, 0, 0);
      expect(channel.executeOperation).toBeCalledWith(CONSTANTS.OPERATION_REQUEST, {
        foo: 'bar'
      }, 0, 0);
    });
  });
  describe('sendCommand()', function () {
    test('should call executeOperation with OPERATION_COMMAND and timeout params', function () {
      var channel = new SafariChannel(APP_NAME, false);
      channel.executeOperation = jest.fn();
      channel.sendCommand({
        foo: 'bar'
      }, 0, 0);
      expect(channel.executeOperation).toBeCalledWith(CONSTANTS.OPERATION_COMMAND, {
        foo: 'bar'
      }, 0, 0);
    });
  });
  describe('destroy()', function () {
    test('should call teardown function when called', function () {
      var channel = new SafariChannel(APP_NAME);
      channel.tearDownSafariExtensionCommunication = jest.fn();
      channel.destroy();
      expect(channel.tearDownSafariExtensionCommunication).toBeCalled();
    });
  });
});