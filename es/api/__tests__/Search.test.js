import Cache from '../../utils/Cache';
import { FOLDER_FIELDS_TO_FETCH } from '../../utils/fields';
import Search from '../Search';
import { FIELD_RELEVANCE, SORT_DESC, X_REP_HINT_HEADER_DIMENSIONS_DEFAULT } from '../../constants';
var search;
var cache;
var item1;
var item2;
var item3;
var response;
var searchResults;
var errorCode = 'foo';
describe('api/Search', function () {
  beforeEach(function () {
    search = new Search({});
    search.errorCode = errorCode;
    cache = new Cache();
  });
  describe('getEncodedQuery()', function () {
    test('should return url encoded string', function () {
      expect(search.getEncodedQuery('foo bar')).toBe('foo%20bar');
    });
  });
  describe('getCacheKey()', function () {
    test('should return correct key', function () {
      expect(search.getCacheKey('foo', 'bar')).toBe('search_foo|bar');
    });
  });
  describe('getUrl()', function () {
    test('should return correct search api url', function () {
      expect(search.getUrl()).toBe('https://api.box.com/2.0/search');
    });
  });
  describe('isLoaded()', function () {
    test('should return false when no cache', function () {
      search.key = 'key';
      expect(search.isLoaded()).toBe(false);
    });
    test('should return false when no value', function () {
      search.key = 'key';
      search.getCache = jest.fn().mockReturnValueOnce(cache);
      expect(search.isLoaded()).toBe(false);
    });
    test('should return true when loaded', function () {
      search.key = 'key';
      cache.set('key', {
        item_collection: {}
      });
      search.getCache = jest.fn().mockReturnValueOnce(cache);
      expect(search.isLoaded()).toBe(true);
    });
  });
  describe('search()', function () {
    test('should not do anything if destroyed', function () {
      search.isDestroyed = jest.fn().mockReturnValueOnce(true);
      search.searchRequest = jest.fn();
      search.getCache = jest.fn();
      search.getCacheKey = jest.fn();
      search.search('id', 'query', 20, 0, 'success', 'fail');
      expect(search.searchRequest).not.toHaveBeenCalled();
      expect(search.getCache).not.toHaveBeenCalled();
      expect(search.getCacheKey).not.toHaveBeenCalled();
    });
    test('should save args and make search request when not cached', function () {
      search.searchRequest = jest.fn();
      search.getCacheKey = jest.fn().mockReturnValueOnce('key');
      search.isLoaded = jest.fn().mockReturnValueOnce(false);
      search.search('id', 'foo query', 20, 0, 'success', 'fail');
      expect(search.getCacheKey).toHaveBeenCalledWith('id', 'foo%20query');
      expect(search.id).toBe('id');
      expect(search.successCallback).toBe('success');
      expect(search.errorCallback).toBe('fail');
      expect(search.key).toBe('key');
      expect(search.limit).toBe(20);
      expect(search.offset).toBe(0);
      expect(search.query).toBe('foo query');
    });
    test('should save args and not make search request when cached', function () {
      search.searchRequest = jest.fn();
      search.finish = jest.fn();
      search.getCacheKey = jest.fn().mockReturnValueOnce('key');
      search.isLoaded = jest.fn().mockReturnValueOnce(true);
      search.search('id', 'foo query', 20, 0, 'success', 'fail');
      expect(search.searchRequest).not.toHaveBeenCalled();
      expect(search.getCacheKey).toHaveBeenCalledWith('id', 'foo%20query');
      expect(search.id).toBe('id');
      expect(search.successCallback).toBe('success');
      expect(search.errorCallback).toBe('fail');
      expect(search.key).toBe('key');
      expect(search.limit).toBe(20);
      expect(search.offset).toBe(0);
      expect(search.query).toBe('foo query');
    });
    test('should save args and make search request when cached but forced to fetch', function () {
      var unsetMock = jest.fn();
      search.searchRequest = jest.fn();
      search.getCache = jest.fn().mockReturnValueOnce({
        unset: unsetMock
      });
      search.getCacheKey = jest.fn().mockReturnValueOnce('key');
      search.isLoaded = jest.fn().mockReturnValueOnce(false);
      search.search('id', 'foo query', 20, 0, 'success', 'fail', {
        forceFetch: true
      });
      expect(unsetMock).toHaveBeenCalledWith('key');
      expect(search.getCacheKey).toHaveBeenCalledWith('id', 'foo%20query');
      expect(search.id).toBe('id');
      expect(search.successCallback).toBe('success');
      expect(search.errorCallback).toBe('fail');
      expect(search.key).toBe('key');
      expect(search.limit).toBe(20);
      expect(search.offset).toBe(0);
      expect(search.query).toBe('foo query');
    });
  });
  describe('searchRequest()', function () {
    beforeEach(function () {
      search.id = 'id';
      search.successCallback = 'success';
      search.errorCallback = 'fail';
      search.key = 'key';
      search.limit = 20;
      search.offset = 0;
      search.query = 'query';
    });
    test('should not do anything if destroyed', function () {
      search.isDestroyed = jest.fn().mockReturnValueOnce(true);
      search.xhr = null;
      return expect(search.searchRequest()).rejects.toBeUndefined();
    });
    test('should make xhr to search and call success callback', function () {
      search.searchSuccessHandler = jest.fn();
      search.searchErrorHandler = jest.fn();
      search.includePreviewFields = true;
      search.xhr = {
        get: jest.fn().mockReturnValueOnce(Promise.resolve('success'))
      };
      return search.searchRequest().then(function () {
        expect(search.searchSuccessHandler).toHaveBeenCalledWith('success');
        expect(search.searchErrorHandler).not.toHaveBeenCalled();
        expect(search.xhr.get).toHaveBeenCalledWith({
          url: 'https://api.box.com/2.0/search',
          params: {
            offset: 0,
            query: 'query',
            ancestor_folder_ids: 'id',
            limit: 20,
            fields: FOLDER_FIELDS_TO_FETCH.toString()
          },
          headers: {
            'X-Rep-Hints': X_REP_HINT_HEADER_DIMENSIONS_DEFAULT
          }
        });
      });
    });
    test('should make xhr to search and call error callback', function () {
      var error = new Error('error');
      search.searchSuccessHandler = jest.fn();
      search.searchErrorHandler = jest.fn();
      search.includePreviewFields = true;
      search.includePreviewSidebarFields = true;
      search.xhr = {
        get: jest.fn().mockReturnValueOnce(Promise.reject(error))
      };
      return search.searchRequest().then(function () {
        expect(search.searchErrorHandler).toHaveBeenCalledWith(error);
        expect(search.searchSuccessHandler).not.toHaveBeenCalled();
        expect(search.xhr.get).toHaveBeenCalledWith({
          url: 'https://api.box.com/2.0/search',
          params: {
            offset: 0,
            query: 'query',
            ancestor_folder_ids: 'id',
            limit: 20,
            fields: FOLDER_FIELDS_TO_FETCH.toString()
          },
          headers: {
            'X-Rep-Hints': X_REP_HINT_HEADER_DIMENSIONS_DEFAULT
          }
        });
      });
    });
  });
  describe('searchErrorHandler()', function () {
    test('should not do anything if destroyed', function () {
      search.isDestroyed = jest.fn().mockReturnValueOnce(true);
      search.errorCallback = jest.fn();
      search.searchErrorHandler('foo');
      expect(search.errorCallback).not.toHaveBeenCalled();
    });
    test('should call error callback', function () {
      search.errorCallback = jest.fn();
      search.searchErrorHandler('foo');
      expect(search.errorCallback).toHaveBeenCalledWith('foo', errorCode);
    });
  });
  describe('searchSuccessHandler()', function () {
    beforeEach(function () {
      item1 = {
        id: 'item1',
        name: 'item1',
        type: 'file',
        path_collection: {
          entries: [{
            id: 'id0'
          }, {
            id: 'id1'
          }, {
            id: 'id2'
          }]
        }
      };
      item2 = {
        id: 'item2',
        name: 'item2',
        type: 'file',
        path_collection: {
          entries: [{
            id: 'id4'
          }, {
            id: 'id5'
          }, {
            id: 'id6'
          }]
        }
      };
      item3 = {
        id: 'item3',
        name: 'item3',
        type: 'file',
        path_collection: {
          entries: [{
            id: 'id0'
          }, {
            id: 'id2'
          }, {
            id: 'id3'
          }]
        }
      };
      response = {
        data: {
          limit: 20,
          offset: 0,
          total_count: 3,
          entries: [item1, item2, item3]
        }
      };
    });
    test('should not do anything if destroyed', function () {
      search.isDestroyed = jest.fn().mockReturnValueOnce(true);
      search.finish = jest.fn();
      search.searchSuccessHandler('foo');
      expect(search.finish).not.toHaveBeenCalled();
    });
    test('should parse the response, flatten the collection and call finish', function () {
      search.options = {
        cache: cache
      };
      search.id = 'id';
      search.key = 'key';
      search.finish = jest.fn();
      search.getCache = jest.fn().mockReturnValueOnce(cache);
      search.searchSuccessHandler(response);
      expect(cache.get('key')).toEqual({
        item_collection: {
          limit: 20,
          offset: 0,
          total_count: 3,
          entries: ['file_item1', 'file_item2', 'file_item3']
        }
      });
      expect(cache.get('file_item1')).toBe(item1);
      expect(cache.get('file_item2')).toBe(item2);
      expect(cache.get('file_item3')).toBe(item3);
    });
    test('should parse the response, append the collection and call finish', function () {
      search.options = {
        cache: cache
      };
      search.id = 'id';
      search.key = 'key';
      search.finish = jest.fn();
      search.getCache = jest.fn().mockReturnValueOnce(cache);
      search.itemCache = ['foo', 'bar'];
      response.data.total_count = 5;
      search.searchSuccessHandler(response);
      expect(cache.get('key')).toEqual({
        item_collection: {
          limit: 20,
          offset: 0,
          total_count: 5,
          entries: ['foo', 'bar', 'file_item1', 'file_item2', 'file_item3']
        }
      });
      expect(cache.get('file_item1')).toBe(item1);
      expect(cache.get('file_item2')).toBe(item2);
      expect(cache.get('file_item3')).toBe(item3);
    });
    test('should throw bad item error when entries is missing', function () {
      search.finish = jest.fn();
      expect(search.searchSuccessHandler.bind(search, {
        total_count: 1,
        offset: 0,
        limit: 100
      })).toThrow(Error, /Bad box item/);
      expect(search.finish).not.toHaveBeenCalled();
    });
    test('should throw bad item error when total count is missing', function () {
      search.finish = jest.fn();
      expect(search.searchSuccessHandler.bind(search, {
        entries: [],
        offset: 0,
        limit: 100
      })).toThrow(Error, /Bad box item/);
      expect(search.finish).not.toHaveBeenCalled();
    });
    test('should throw bad item error when offset is missing', function () {
      search.finish = jest.fn();
      expect(search.searchSuccessHandler.bind(search, {
        entries: [],
        total_count: 0,
        limit: 100
      })).toThrow(Error, /Bad box item/);
      expect(search.finish).not.toHaveBeenCalled();
    });
    test('should throw bad item error when limit is missing', function () {
      search.finish = jest.fn();
      expect(search.searchSuccessHandler.bind(search, {
        entries: [],
        total_count: 0,
        offset: 100
      })).toThrow(Error, /Bad box item/);
      expect(search.finish).not.toHaveBeenCalled();
    });
  });
  describe('finish()', function () {
    beforeEach(function () {
      item1 = {
        id: 'item1',
        name: 'item1',
        type: 'file',
        path_collection: {
          entries: [{
            id: 'id0'
          }, {
            id: 'id1'
          }, {
            id: 'id2'
          }]
        }
      };
      item2 = {
        id: 'item2',
        name: 'item2',
        type: 'file',
        path_collection: {
          entries: [{
            id: 'id4'
          }, {
            id: 'id5'
          }, {
            id: 'id6'
          }]
        }
      };
      item3 = {
        id: 'item3',
        name: 'item3',
        type: 'file',
        path_collection: {
          entries: [{
            id: 'id0'
          }, {
            id: 'id2'
          }, {
            id: 'id3'
          }]
        }
      };
      searchResults = {
        item_collection: {
          limit: 20,
          offset: 0,
          total_count: 3,
          entries: ['file_item1', 'file_item2', 'file_item3']
        }
      };
      cache.set('file_item1', item1);
      cache.set('file_item2', item2);
      cache.set('file_item3', item3);
      cache.set('key', searchResults);
    });
    test('should not do anything if destroyed', function () {
      search.successCallback = jest.fn();
      search.isDestroyed = jest.fn().mockReturnValueOnce(true);
      search.finish();
      expect(search.successCallback).not.toHaveBeenCalled();
    });
    test('should call success callback with proper collection', function () {
      search.id = 'id';
      search.key = 'key';
      search.offset = 0;
      search.getCache = jest.fn().mockReturnValueOnce(cache);
      search.successCallback = jest.fn();
      search.finish();
      expect(search.successCallback).toHaveBeenCalledWith({
        id: 'id',
        items: [item1, item2, item3],
        offset: 0,
        percentLoaded: 100,
        sortBy: FIELD_RELEVANCE,
        sortDirection: SORT_DESC,
        totalCount: 3
      });
    });
    test('should throw bad item error when item collection is missing', function () {
      cache.set('key', {});
      search.id = 'id';
      search.key = 'key';
      search.getCache = jest.fn().mockReturnValueOnce(cache);
      search.successCallback = jest.fn();
      expect(search.finish.bind(search)).toThrow(Error, /Bad box item/);
      expect(search.successCallback).not.toHaveBeenCalled();
    });
    test('should throw bad item error when item collection is missing entries', function () {
      cache.set('key', {
        item_collection: {}
      });
      search.id = 'id';
      search.key = 'key';
      search.getCache = jest.fn().mockReturnValueOnce(cache);
      search.successCallback = jest.fn();
      expect(search.finish.bind(search)).toThrow(Error, /Bad box item/);
      expect(search.successCallback).not.toHaveBeenCalled();
    });
    test('should throw bad item error when item collection is missing total count', function () {
      cache.set('key', {
        item_collection: {
          entries: []
        }
      });
      search.id = 'id';
      search.key = 'key';
      search.getCache = jest.fn().mockReturnValueOnce(cache);
      search.successCallback = jest.fn();
      expect(search.finish.bind(search)).toThrow(Error, /Bad box item/);
      expect(search.successCallback).not.toHaveBeenCalled();
    });
  });
});