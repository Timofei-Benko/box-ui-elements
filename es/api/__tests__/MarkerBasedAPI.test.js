function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import MarkerBasedAPI from '../MarkerBasedAPI';
var LIMIT = 1000;
describe('api/MarkerBasedAPI', function () {
  var markerBasedAPI;
  var markerBasedAPIResponse = {
    next_marker: '',
    limit: LIMIT,
    entries: []
  };
  var url = 'https://foo.bar';
  var errorCode = 'foo';
  beforeEach(function () {
    markerBasedAPI = new MarkerBasedAPI({});
    markerBasedAPI.errorCode = errorCode;
  });
  describe('hasMoreItems()', function () {
    test('should not be more items', function () {
      expect(markerBasedAPI.hasMoreItems(null)).toBe(false);
      expect(markerBasedAPI.hasMoreItems('')).toBe(false);
    });
    test('should be more items', function () {
      expect(markerBasedAPI.hasMoreItems('next_marker')).toBe(true);
    });
  });
  describe('markerGetRequest()', function () {
    beforeEach(function () {
      markerBasedAPI.getUrl = jest.fn(function () {
        return url;
      });
      markerBasedAPI.successHandler = jest.fn();
      markerBasedAPI.errorHandler = jest.fn();
    });
    test('should do two xhr calls and call successHandler once', function () {
      markerBasedAPI.xhr = {
        get: jest.fn().mockReturnValueOnce(Promise.resolve({
          data: {
            next_marker: 'next_marker',
            limit: LIMIT,
            entries: []
          }
        })).mockReturnValueOnce(Promise.resolve({
          data: markerBasedAPIResponse
        }))
      };
      return markerBasedAPI.markerGetRequest('id', 'next_marker', LIMIT, true).then(function () {
        expect(markerBasedAPI.xhr.get).toHaveBeenCalledTimes(2);
        expect(markerBasedAPI.successHandler).toHaveBeenCalledTimes(1);
        expect(markerBasedAPI.errorHandler).not.toHaveBeenCalled();
      });
    });
    test('should do one xhr call and call successHandler once', function () {
      markerBasedAPI.xhr = {
        get: jest.fn().mockReturnValue(Promise.resolve({
          data: markerBasedAPIResponse
        }))
      };
      return markerBasedAPI.markerGetRequest('id', 'next_marker', LIMIT, true).then(function () {
        expect(markerBasedAPI.xhr.get).toHaveBeenCalledTimes(1);
        expect(markerBasedAPI.successHandler).toHaveBeenCalledTimes(1);
        expect(markerBasedAPI.errorHandler).not.toHaveBeenCalled();
      });
    });
  });
  describe('markerGet()', function () {
    var successCallback = jest.fn();
    var errorCallback = jest.fn();
    beforeEach(function () {
      markerBasedAPI.getUrl = jest.fn(function () {
        return url;
      });
    });
    test('should not do anything if destroyed', function () {
      markerBasedAPI.isDestroyed = jest.fn().mockReturnValue(true);
      markerBasedAPI.xhr = null;
      return markerBasedAPI.markerGet({
        id: 'id',
        successCallback: successCallback,
        errorCallback: errorCallback
      }).catch(function () {
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
      });
    });
    test('should make xhr to get markerBasedAPI and call success callback', function () {
      var requestData = {
        foo: 'bar'
      };
      markerBasedAPI.xhr = {
        get: jest.fn().mockReturnValueOnce(Promise.resolve({
          data: markerBasedAPIResponse
        }))
      };
      markerBasedAPI.marker = '';
      return markerBasedAPI.markerGet({
        id: 'id',
        successCallback: successCallback,
        errorCallback: errorCallback,
        marker: 'next_marker',
        limit: LIMIT,
        shouldFetchAll: true,
        requestData: requestData
      }).then(function () {
        expect(successCallback).toHaveBeenCalledWith(markerBasedAPIResponse);
        expect(successCallback).toHaveBeenCalledTimes(1);
        expect(errorCallback).not.toHaveBeenCalled();
        expect(markerBasedAPI.xhr.get).toHaveBeenCalledWith({
          id: 'file_id',
          url: url,
          params: _objectSpread({
            marker: 'next_marker',
            limit: LIMIT
          }, requestData)
        });
      });
    });
    test('should call error callback when xhr fails', function () {
      var error = new Error('error');
      markerBasedAPI.xhr = {
        get: jest.fn().mockReturnValueOnce(Promise.reject(error))
      };
      return markerBasedAPI.markerGet({
        id: 'id',
        successCallback: successCallback,
        errorCallback: errorCallback,
        marker: '',
        limit: LIMIT,
        shouldFetchAll: true,
        errorCode: errorCode
      }).then(function () {
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalledWith(error, errorCode);
        expect(markerBasedAPI.xhr.get).toHaveBeenCalledWith({
          id: 'file_id',
          url: url,
          params: {
            marker: '',
            limit: LIMIT
          }
        });
      });
    });
  });
});