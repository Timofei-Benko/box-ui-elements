function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import noop from 'lodash/noop';
import WebLink from '../WebLink';
import * as fields from '../../utils/fields';
import Cache from '../../utils/Cache';
import { ERROR_CODE_FETCH_WEBLINK } from '../../constants';
var webLink;
var cache;
describe('api/WebLink', function () {
  beforeEach(function () {
    webLink = new WebLink({});
    cache = new Cache();
  });
  describe('getCacheKey()', function () {
    test('should return correct key', function () {
      expect(webLink.getCacheKey('foo')).toBe('web_link_foo');
    });
  });
  describe('getUrl()', function () {
    test('should return correct web link api url without id', function () {
      expect(webLink.getUrl()).toBe('https://api.box.com/2.0/web_links');
    });
    test('should return correct web link api url with id', function () {
      expect(webLink.getUrl('foo')).toBe('https://api.box.com/2.0/web_links/foo');
    });
  });
  describe('getWeblink()', function () {
    test('should not do anything if destroyed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var success, error;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              webLink.isDestroyed = jest.fn().mockReturnValueOnce(true);
              webLink.getCache = jest.fn();
              webLink.getCacheKey = jest.fn();
              webLink.xhr = null;
              success = jest.fn();
              error = jest.fn();
              _context.next = 8;
              return webLink.getWeblink('id', success, error);

            case 8:
              expect(webLink.getCache).not.toHaveBeenCalled();
              expect(webLink.getCacheKey).not.toHaveBeenCalled();
              expect(success).not.toHaveBeenCalled();
              expect(error).not.toHaveBeenCalled();

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should return cached webLink',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var success;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              cache.set('key', 'webLink');
              webLink.xhr = null;
              webLink.getCache = jest.fn().mockReturnValueOnce(cache);
              webLink.getCacheKey = jest.fn().mockReturnValueOnce('key');
              fields.findMissingProperties = jest.fn().mockReturnValueOnce([]);
              success = jest.fn();
              _context2.next = 8;
              return webLink.getWeblink('id', success);

            case 8:
              expect(webLink.getCacheKey).toHaveBeenCalledWith('id');
              expect(success).toHaveBeenCalledWith('webLink');
              expect(fields.findMissingProperties).toHaveBeenCalledWith('webLink', undefined);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    test('should make xhr to get webLink when cached if missing fields',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var optionFields, success;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              cache.set('key', {
                id: '123'
              });
              webLink.getCache = jest.fn().mockReturnValueOnce(cache);
              webLink.getCacheKey = jest.fn().mockReturnValueOnce('key');
              optionFields = ['missing1', 'missing2'];
              fields.findMissingProperties = jest.fn().mockReturnValueOnce(optionFields);
              webLink.xhr = {
                get: jest.fn().mockReturnValueOnce(Promise.resolve({
                  data: {
                    foo: 'bar'
                  }
                }))
              };
              success = jest.fn();
              _context3.next = 9;
              return webLink.getWeblink('id', success, noop, {
                fields: optionFields
              });

            case 9:
              expect(success).toHaveBeenCalledWith({
                id: '123',
                foo: 'bar'
              });
              expect(fields.findMissingProperties).toHaveBeenCalledWith({
                id: '123'
              }, optionFields);
              expect(webLink.xhr.get).toHaveBeenCalledWith({
                url: 'https://api.box.com/2.0/web_links/id',
                params: {
                  fields: 'missing1,missing2'
                }
              });

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    test('should make xhr to get webLink and not call success callback when destroyed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var success;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              fields.findMissingProperties = jest.fn().mockReturnValueOnce([]);
              webLink.isDestroyed = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true);
              webLink.xhr = {
                get: jest.fn().mockReturnValueOnce(Promise.resolve({
                  data: {
                    webLink: 'new webLink'
                  }
                }))
              };
              success = jest.fn();
              _context4.next = 6;
              return webLink.getWeblink('id', success);

            case 6:
              expect(success).not.toHaveBeenCalled();
              expect(webLink.xhr.get).toHaveBeenCalledWith({
                url: 'https://api.box.com/2.0/web_links/id'
              });

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    test('should call error callback when xhr fails',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var error, successCb, errorCb;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              error = new Error('error');
              fields.findMissingProperties = jest.fn().mockReturnValueOnce([]);
              webLink.xhr = {
                get: jest.fn().mockReturnValueOnce(Promise.reject(error))
              };
              successCb = jest.fn();
              errorCb = jest.fn();
              _context5.next = 7;
              return webLink.getWeblink('id', successCb, errorCb);

            case 7:
              expect(successCb).not.toHaveBeenCalled();
              expect(errorCb).toHaveBeenCalledWith(error, ERROR_CODE_FETCH_WEBLINK);
              expect(webLink.xhr.get).toHaveBeenCalledWith({
                url: 'https://api.box.com/2.0/web_links/id'
              });

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
});