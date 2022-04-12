function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import OffsetBasedAPI from '../OffsetBasedAPI';
var LIMIT = 1000;
describe('api/OffsetBasedAPI', function () {
  var offsetBasedAPI;
  var offsetBasedAPIResponse = {
    total_count: 0,
    entries: []
  };
  var url = 'https://foo.bar';
  var errorCode = 'foo';
  beforeEach(function () {
    offsetBasedAPI = new OffsetBasedAPI({});
    offsetBasedAPI.errorCode = errorCode;
  });
  describe('getQueryParameters()', function () {
    test('should return query parameters with no fields', function () {
      expect(offsetBasedAPI.getQueryParameters(0, LIMIT)).toEqual({
        offset: 0,
        limit: LIMIT
      });
    });
    test('should return query parameters with fields', function () {
      expect(offsetBasedAPI.getQueryParameters(0, LIMIT, ['foo', 'bar'])).toEqual({
        offset: 0,
        limit: LIMIT,
        fields: 'foo,bar'
      });
    });
  });
  describe('hasMoreItems()', function () {
    test('should be more items', function () {
      expect(offsetBasedAPI.hasMoreItems(LIMIT, LIMIT + 1)).toBe(true);
    });
    test('should be more items with no totalCount', function () {
      expect(offsetBasedAPI.hasMoreItems(LIMIT)).toBe(true);
    });
    test('should not be more items', function () {
      expect(offsetBasedAPI.hasMoreItems(LIMIT, LIMIT)).toBe(false);
    });
  });
  describe('offsetGetRequest()', function () {
    beforeEach(function () {
      offsetBasedAPI.getUrl = jest.fn(function () {
        return url;
      });
      offsetBasedAPI.successHandler = jest.fn();
      offsetBasedAPI.errorHandler = jest.fn();
    });
    test('should do two xhr calls and call successHandler once', function () {
      offsetBasedAPI.xhr = {
        get: jest.fn().mockReturnValue(Promise.resolve({
          data: _objectSpread({}, offsetBasedAPIResponse, {
            total_count: 1500
          })
        }))
      };
      return offsetBasedAPI.offsetGetRequest('id', 0, 1000, true).then(function () {
        expect(offsetBasedAPI.xhr.get).toHaveBeenCalledTimes(2);
        expect(offsetBasedAPI.successHandler).toHaveBeenCalledTimes(1);
        expect(offsetBasedAPI.errorHandler).not.toHaveBeenCalled();
      });
    });
    test('should do one xhr call and call successHandler once', function () {
      offsetBasedAPI.xhr = {
        get: jest.fn().mockReturnValue(Promise.resolve({
          data: offsetBasedAPIResponse
        }))
      };
      return offsetBasedAPI.offsetGetRequest('id', 0, 1000, true).then(function () {
        expect(offsetBasedAPI.xhr.get).toHaveBeenCalledTimes(1);
        expect(offsetBasedAPI.successHandler).toHaveBeenCalledTimes(1);
        expect(offsetBasedAPI.errorHandler).not.toHaveBeenCalled();
      });
    });
  });
  describe('offsetGet()', function () {
    var successCb = jest.fn();
    var errorCb = jest.fn();
    beforeEach(function () {
      offsetBasedAPI.getUrl = jest.fn(function () {
        return url;
      });
    });
    test('should not do anything if destroyed', function () {
      offsetBasedAPI.isDestroyed = jest.fn().mockReturnValueOnce(true);
      offsetBasedAPI.xhr = null;
      return offsetBasedAPI.offsetGet('id', successCb, errorCb).catch(function () {
        expect(successCb).not.toHaveBeenCalled();
        expect(errorCb).not.toHaveBeenCalled();
      });
    });
    test('should make xhr to get offsetBasedAPI and call success callback', function () {
      offsetBasedAPI.xhr = {
        get: jest.fn().mockReturnValueOnce(Promise.resolve({
          data: offsetBasedAPIResponse
        }))
      };
      return offsetBasedAPI.offsetGet('id', successCb, errorCb).then(function () {
        expect(successCb).toHaveBeenCalledWith(offsetBasedAPIResponse);
        expect(successCb).toHaveBeenCalledTimes(1);
        expect(offsetBasedAPI.xhr.get).toHaveBeenCalledWith({
          id: 'file_id',
          url: url,
          params: {
            offset: 0,
            limit: LIMIT
          }
        });
      });
    });
    test('should immediately reject if offset >= total_count', function () {
      var pagedCommentsResponse = {
        total_count: 50,
        entries: []
      };
      offsetBasedAPI.xhr = {
        get: jest.fn().mockReturnValue(Promise.resolve({
          data: pagedCommentsResponse
        }))
      };
      return offsetBasedAPI.offsetGet('id', successCb, errorCb, 50).catch(function () {
        expect(successCb).not.toHaveBeenCalled();
        expect(errorCb).not.toHaveBeenCalled();
        expect(offsetBasedAPI.xhr.get).not.toHaveBeenCalled();
      });
    });
    test('should call error callback when xhr fails', function () {
      var error = new Error('error');
      offsetBasedAPI.xhr = {
        get: jest.fn().mockReturnValueOnce(Promise.reject(error))
      };
      return offsetBasedAPI.offsetGet('id', successCb, errorCb).then(function () {
        expect(successCb).not.toHaveBeenCalled();
        expect(errorCb).toHaveBeenCalledWith(error, errorCode);
        expect(offsetBasedAPI.xhr.get).toHaveBeenCalledWith({
          id: 'file_id',
          url: url,
          params: {
            offset: 0,
            limit: LIMIT
          }
        });
      });
    });
  });
});