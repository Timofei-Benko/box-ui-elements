function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import Cache from '../../utils/Cache';
import MetadataQuery from '../MetadataQuery';
import { CACHE_PREFIX_METADATA_QUERY, ERROR_CODE_METADATA_QUERY } from '../../constants';
var metadataQuery;
var cache;
var marker = 'marker_123456789';
var metadataInstanceId1 = 'c614dcaa-ebdc-4c88-b242-15cad4f7b787';
var metadataInstanceId2 = 'ee348ed1-9460-44f3-9c34-aa580a93efda';
var mockMetadataQuerySuccessResponse = {
  entries: [{
    item: {
      type: 'file',
      id: '1234',
      name: 'filename1.pdf',
      size: 10000
    },
    metadata: {
      enterprise_2222: {
        awesomeTemplateKey: {
          $id: metadataInstanceId1,
          $parent: 'file_998877',
          $type: 'awesomeTemplateKey-asdlk-1234-asd1',
          $typeScope: 'enterprise_2222',
          $typeVersion: 0,
          $version: 0,
          type: 'bill',
          // metadata template field
          amount: 500,
          // metadata template field
          approved: 'yes' // metadata template field

        }
      }
    }
  }, {
    item: {
      type: 'file',
      id: '9876',
      name: 'filename2.mp4',
      size: 389027
    },
    metadata: {
      enterprise_2222: {
        awesomeTemplateKey: {
          $id: metadataInstanceId2,
          $parent: 'file_998877',
          $type: 'awesomeTemplateKey-asdlk-1234-asd1',
          $typeScope: 'enterprise_2222',
          $typeVersion: 0,
          $version: 0,
          type: 'receipt',
          // metadata template field
          amount: 2735,
          // metadata template field
          approved: 'no' // metadata template field

        }
      }
    }
  }],
  next_marker: marker
};
var url = 'https://api.box.com/2.0/metadata_queries/execute_read';
var mockQuery = {
  from: 'enterprise_1234.templateKey',
  query: 'type = :arg1',
  query_params: {
    arg1: 'bill'
  },
  ancestor_folder_id: '12345'
};
var mockAPIRequestParams = {
  url: url,
  data: mockQuery
};
describe('api/MetadataQuery', function () {
  beforeEach(function () {
    metadataQuery = new MetadataQuery({});
    cache = new Cache();
    metadataQuery.getCache = jest.fn().mockReturnValueOnce(cache);
  });
  describe('getCacheKey()', function () {
    test('should return correct key', function () {
      expect(metadataQuery.getCacheKey('foo')).toBe("".concat(CACHE_PREFIX_METADATA_QUERY, "foo"));
    });
  });
  describe('getUrl()', function () {
    test('should return correct metadata query API endpoint url', function () {
      expect(metadataQuery.getUrl()).toBe(url);
    });
  });
  describe('isLoaded()', function () {
    test('should return false when no cache', function () {
      metadataQuery.key = 'key';
      expect(metadataQuery.isLoaded()).toBe(false);
    });
    test('should return false when no value', function () {
      metadataQuery.key = 'key';
      expect(metadataQuery.isLoaded()).toBe(false);
    });
    test('should return true when loaded', function () {
      metadataQuery.key = 'key';
      cache.set('key', mockMetadataQuerySuccessResponse);
      expect(metadataQuery.isLoaded()).toBe(true);
    });
  });
  describe('finish()', function () {
    beforeEach(function () {
      metadataQuery.key = "".concat(CACHE_PREFIX_METADATA_QUERY, "_foo");
      cache.set(metadataQuery.key, mockMetadataQuerySuccessResponse);
    });
    test('should not do anything if destroyed', function () {
      metadataQuery.successCallback = jest.fn();
      cache.get = jest.fn();
      metadataQuery.isDestroyed = jest.fn().mockReturnValueOnce(true);
      metadataQuery.finish();
      expect(cache.get).not.toHaveBeenCalled();
      expect(metadataQuery.successCallback).not.toHaveBeenCalled();
    });
    test('should call success callback with proper collection', function () {
      metadataQuery.successCallback = jest.fn();
      metadataQuery.finish();
      expect(metadataQuery.successCallback).toHaveBeenCalledWith(mockMetadataQuerySuccessResponse);
    });
  });
  describe('queryMetadataSuccessHandler()', function () {
    test('should set up the chache with success response and finish the processing', function () {
      cache.set = jest.fn();
      metadataQuery.finish = jest.fn();
      metadataQuery.queryMetadataSuccessHandler({
        data: mockMetadataQuerySuccessResponse
      });
      expect(cache.set).toHaveBeenCalledWith(metadataQuery.key, mockMetadataQuerySuccessResponse);
      expect(metadataQuery.finish).toHaveBeenCalled();
    });
  });
  describe('queryMetadataRequest()', function () {
    beforeEach(function () {
      metadataQuery.queryMetadataSuccessHandler = jest.fn();
      metadataQuery.errorHandler = jest.fn();
    });
    test('should not do anything if destroyed', function () {
      metadataQuery.isDestroyed = jest.fn().mockReturnValueOnce(true);
      return expect(metadataQuery.queryMetadataRequest()).toBeUndefined();
    });
    test('should make xhr call to metadata_queries/execute endpoint and call success callback',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var mockAPIResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mockAPIResponse = {
                data: mockMetadataQuerySuccessResponse
              };
              metadataQuery.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadataQuery.xhr = {
                post: jest.fn().mockReturnValueOnce(Promise.resolve(mockAPIResponse))
              };
              _context.next = 5;
              return metadataQuery.queryMetadataRequest(mockQuery);

            case 5:
              expect(metadataQuery.xhr.post).toHaveBeenCalledWith(mockAPIRequestParams);
              expect(metadataQuery.queryMetadataSuccessHandler).toHaveBeenCalledWith(mockAPIResponse);
              expect(metadataQuery.errorHandler).not.toHaveBeenCalled();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should make xhr call to metadata_queries/execute endpoint and call error callback',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var error;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              error = new Error('error');
              metadataQuery.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadataQuery.xhr = {
                post: jest.fn().mockReturnValueOnce(Promise.reject(error))
              };
              _context2.prev = 3;
              _context2.next = 6;
              return metadataQuery.queryMetadataRequest(mockQuery);

            case 6:
              _context2.next = 14;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](3);
              expect(metadataQuery.xhr.post).toHaveBeenCalledWith(mockAPIRequestParams);
              expect(metadataQuery.errorCode).toBe(ERROR_CODE_METADATA_QUERY);
              expect(metadataQuery.errorHandler).toHaveBeenCalledWith(error);
              expect(metadataQuery.queryMetadataSuccessHandler).not.toHaveBeenCalled();

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 8]]);
    })));
  });
  describe('queryMetadata()', function () {
    var successCallback = jest.fn();
    var errorCallback = jest.fn();
    var context = {
      id: 'abc'
    };
    var mockCacheKey = "".concat(CACHE_PREFIX_METADATA_QUERY).concat(context.id);
    test('should not do anything if destroyed', function () {
      metadataQuery.getCacheKey = jest.fn();
      metadataQuery.isLoaded = jest.fn();
      metadataQuery.queryMetadataRequest = jest.fn();
      metadataQuery.isDestroyed = jest.fn().mockReturnValueOnce(true);
      metadataQuery.queryMetadata(mockQuery, successCallback, errorCallback, {});
      expect(metadataQuery.getCacheKey).not.toHaveBeenCalled();
      expect(metadataQuery.isLoaded).not.toHaveBeenCalled();
      expect(metadataQuery.queryMetadataRequest).not.toHaveBeenCalled();
    });
    test('should return data from cache in case of cache-hit and not make xhr call', function () {
      var options = {
        context: context
      };
      metadataQuery.queryMetadataRequest = jest.fn();
      metadataQuery.finish = jest.fn();
      metadataQuery.isLoaded = jest.fn().mockReturnValueOnce(true);
      metadataQuery.queryMetadata(mockQuery, successCallback, errorCallback, options);
      expect(metadataQuery.finish).toHaveBeenCalled();
      expect(metadataQuery.queryMetadataRequest).not.toHaveBeenCalled();
    });
    test('should make the xhr call if forceFetch option is set', function () {
      var options = {
        forceFetch: true,
        context: context
      };
      cache.unset = jest.fn();
      metadataQuery.queryMetadataRequest = jest.fn();
      metadataQuery.isLoaded = jest.fn();
      metadataQuery.queryMetadata(mockQuery, successCallback, errorCallback, options);
      expect(cache.unset).toHaveBeenCalledWith(mockCacheKey);
      expect(metadataQuery.queryMetadataRequest).toHaveBeenCalledWith(mockQuery);
    });
  });
});