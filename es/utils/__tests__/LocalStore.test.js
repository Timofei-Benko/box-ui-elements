function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            rawValue | expected\n            ", " | ", "\n            ", "  | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import LocalStore from '../LocalStore';
describe('util/LocalStore', function () {
  var localStore;
  var originalLocalStorage;
  var key = 'randomKey';
  var value = '{"hi": 1}';
  beforeAll(function () {
    originalLocalStorage = window.localStorage;
    delete window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {
        getItem: jest.fn().mockName('getItem'),
        removeItem: jest.fn().mockName('removeItem'),
        setItem: jest.fn().mockName('setItem')
      }
    });
  });
  beforeEach(function () {
    localStorage.getItem.mockClear();
    localStorage.removeItem.mockClear();
    localStorage.setItem.mockClear();
    localStore = new LocalStore();
  });
  afterAll(function () {
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: originalLocalStorage
    });
  });
  describe('setItem()', function () {
    test('should call setItem on localStorage properly when localStorage is available', function () {
      localStore.isLocalStorageAvailable = true;
      localStore.buildKey = jest.fn().mockReturnValueOnce(key);
      localStore.localStorage.setItem = jest.fn();
      localStore.setItem(key, value);
      expect(localStore.localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
    });
    test('should set value in memory when localStorage is not available', function () {
      localStore.isLocalStorageAvailable = false;
      localStore.memoryStore.set = jest.fn();
      localStore.setItem(key, value);
      expect(localStore.memoryStore.set).toHaveBeenCalledWith(key, value);
    });
  });
  describe('getItem()', function () {
    test.each(_templateObject(), value, JSON.parse(value), null, null)('should call getItem on localStorage properly when localStorage is available', function (_ref) {
      var rawValue = _ref.rawValue,
          expected = _ref.expected;
      localStore.isLocalStorageAvailable = true;
      localStore.buildKey = jest.fn().mockReturnValueOnce(key);
      localStore.localStorage.getItem = jest.fn().mockReturnValueOnce(rawValue);
      expect(localStore.getItem(key, value)).toEqual(expected);
      expect(localStore.localStorage.getItem).toHaveBeenCalledWith(key);
    });
    test('should set value from memory when localStorage is not available', function () {
      localStore.isLocalStorageAvailable = false;
      localStore.memoryStore.get = jest.fn().mockReturnValueOnce(value);
      expect(localStore.getItem(key, value)).toBe(value);
      expect(localStore.memoryStore.get).toHaveBeenCalledWith(key);
    });
  });
  describe('removeItem()', function () {
    test('should call removeItem on localStorage properly when localStorage is available', function () {
      localStore.isLocalStorageAvailable = true;
      localStore.buildKey = jest.fn().mockReturnValueOnce(key);
      localStore.localStorage.removeItem = jest.fn();
      localStore.removeItem(key);
      expect(localStore.localStorage.removeItem).toHaveBeenCalledWith(key);
    });
    test('should delete value from memory when localStorage is not available and key exists in memory', function () {
      localStore.isLocalStorageAvailable = false;
      localStore.memoryStore.set(key, value);
      localStore.localStorage.removeItem = jest.fn();
      localStore.removeItem(key);
      expect(localStore.memoryStore.has(key)).toBeFalsy();
      expect(localStore.localStorage.removeItem).not.toHaveBeenCalled();
    });
    test('should noop when localStorage is not available and key does not exists in memory', function () {
      localStore.isLocalStorageAvailable = false;
      localStore.memoryStore.set(key, value);
      localStore.localStorage.removeItem = jest.fn();
      localStore.removeItem(key);
      expect(localStore.localStorage.removeItem).not.toHaveBeenCalled();
    });
  });
});