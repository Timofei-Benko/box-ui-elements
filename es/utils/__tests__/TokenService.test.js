function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import Tokenservice from '../TokenService';

var readWriteTokenGenerator = function readWriteTokenGenerator() {
  return Promise.resolve({
    read: 'read_token',
    write: 'write_token'
  });
};

var readTokenGenerator = function readTokenGenerator() {
  return Promise.resolve({
    read: 'read_token'
  });
};

var writeTokenGenerator = function writeTokenGenerator() {
  return Promise.resolve({
    write: 'write_token'
  });
};

var tokenGenerator = function tokenGenerator() {
  return Promise.resolve('token');
};

var junkTokenGenerator = function junkTokenGenerator() {
  return Promise.resolve(123);
};

var nullTokenGenerator = function nullTokenGenerator() {
  return Promise.resolve(null);
};

var undefinedTokenGenerator = function undefinedTokenGenerator() {
  return Promise.resolve();
};

describe('util/Tokenservice', function () {
  describe('getToken()', function () {
    test('should return null for a null token', function () {
      expect(Tokenservice.getToken('file_123', null)).resolves.toBeNull();
    });
    test('should return undefined for a undefined token', function () {
      expect(Tokenservice.getToken('file_123')).resolves.toBeUndefined();
    });
    test('should return null for a null token generator', function () {
      return expect(Tokenservice.getToken('file_123', nullTokenGenerator)).resolves.toBeNull();
    });
    test('should return undefined for a undefined token generator', function () {
      return expect(Tokenservice.getToken('file_123', undefinedTokenGenerator)).resolves.toBeUndefined();
    });
    test('should return proper token with generator function that returns a string token', function () {
      return expect(Tokenservice.getToken('file_123', tokenGenerator)).resolves.toBe('token');
    });
    test('should return proper token with generator function that returns a token map', function () {
      return expect(Tokenservice.getToken('file_123', readWriteTokenGenerator)).resolves.toEqual({
        read: 'read_token',
        write: 'write_token'
      });
    });
    test('should reject when not given a typed id', function () {
      return expect(Tokenservice.getToken('123')).rejects.toThrow(/Bad id or auth token/);
    });
    test('should reject when not given proper token function', function () {
      return expect(Tokenservice.getToken('file_123', {})).rejects.toThrow(/Bad id or auth token/);
    });
    test('should reject when token generator returns junk', function () {
      return expect(Tokenservice.getToken('file_123', junkTokenGenerator)).rejects.toThrow(/Bad id or auth token/);
    });
  });
  describe('getWriteToken()', function () {
    test('should return null for a null token', function () {
      expect(Tokenservice.getWriteToken('file_123', null)).resolves.toBeNull();
    });
    test('should return undefined for a undefined token', function () {
      expect(Tokenservice.getWriteToken('file_123')).resolves.toBeUndefined();
    });
    test('should return a string token', function () {
      expect(Tokenservice.getWriteToken('file_123', 'string_token')).resolves.toBe('string_token');
    });
    test('should return null for a null token generator', function () {
      return expect(Tokenservice.getWriteToken('file_123', nullTokenGenerator)).resolves.toBeNull();
    });
    test('should return undefined for a undefined token generator', function () {
      return expect(Tokenservice.getWriteToken('file_123', undefinedTokenGenerator)).resolves.toBeUndefined();
    });
    test('should return proper token with generator function that returns a string token', function () {
      return expect(Tokenservice.getWriteToken('file_123', tokenGenerator)).resolves.toBe('token');
    });
    test('should return read token with generator function that returns a token map without write token', function () {
      return expect(Tokenservice.getWriteToken('file_123', readTokenGenerator)).resolves.toBe('read_token');
    });
    test('should return write token with generator function that returns a token map', function () {
      return expect(Tokenservice.getWriteToken('file_123', writeTokenGenerator)).resolves.toBe('write_token');
    });
    test('should return write token with generator function that returns a both read and write tokens', function () {
      return expect(Tokenservice.getWriteToken('file_123', readWriteTokenGenerator)).resolves.toBe('write_token');
    });
    test('should reject when not given a typed id', function () {
      return expect(Tokenservice.getWriteToken('123')).rejects.toThrow(/Bad id or auth token/);
    });
    test('should reject when not given proper token function', function () {
      return expect(Tokenservice.getWriteToken('file_123', {})).rejects.toThrow(/Bad id or auth token/);
    });
    test('should reject when token generator returns junk', function () {
      return expect(Tokenservice.getWriteToken('file_123', junkTokenGenerator)).rejects.toThrow(/Bad id or auth token/);
    });
  });
  describe('getReadToken()', function () {
    test('should return null for a null token', function () {
      expect(Tokenservice.getReadToken('file_123', null)).resolves.toBeNull();
    });
    test('should return undefined for a undefined token', function () {
      expect(Tokenservice.getReadToken('file_123')).resolves.toBeUndefined();
    });
    test('should return null for a null token generator', function () {
      return expect(Tokenservice.getReadToken('file_123', nullTokenGenerator)).resolves.toBeNull();
    });
    test('should return a string token', function () {
      expect(Tokenservice.getReadToken('file_123', 'string_token')).resolves.toBe('string_token');
    });
    test('should return undefined for a undefined token generator', function () {
      return expect(Tokenservice.getReadToken('file_123', undefinedTokenGenerator)).resolves.toBeUndefined();
    });
    test('should return proper token with generator function that returns a string token', function () {
      return expect(Tokenservice.getReadToken('file_123', tokenGenerator)).resolves.toBe('token');
    });
    test('should return read token with generator function that returns a token map without write token', function () {
      return expect(Tokenservice.getReadToken('file_123', readTokenGenerator)).resolves.toBe('read_token');
    });
    test('should return undefined with generator function that returns a token map without read token', function () {
      return expect(Tokenservice.getReadToken('file_123', writeTokenGenerator)).resolves.toBeUndefined();
    });
    test('should return read token with generator function that returns a both read and write tokens', function () {
      return expect(Tokenservice.getReadToken('file_123', readWriteTokenGenerator)).resolves.toBe('read_token');
    });
    test('should reject when not given a typed id', function () {
      return expect(Tokenservice.getReadToken('123')).rejects.toThrow(/Bad id or auth token/);
    });
    test('should reject when not given proper token function', function () {
      return expect(Tokenservice.getReadToken('file_123', {})).rejects.toThrow(/Bad id or auth token/);
    });
    test('should reject when token generator returns junk', function () {
      return expect(Tokenservice.getReadToken('file_123', junkTokenGenerator)).rejects.toThrow(/Bad id or auth token/);
    });
  });
  describe('getReadTokens()', function () {
    test('should call Tokenservice.getReadToken', function () {
      var origGetReadToken = Tokenservice.getReadToken;
      Tokenservice.getReadToken = jest.fn();
      return Tokenservice.getReadTokens('file_123', readTokenGenerator).then(function () {
        expect(Tokenservice.getReadToken).toHaveBeenCalledWith('file_123', readTokenGenerator);
        Tokenservice.getReadToken = origGetReadToken;
      });
    });
    test('should return a token map', function () {
      expect(Tokenservice.getReadTokens(['file_123', 'file_456'], readTokenGenerator)).resolves.toEqual({
        file_123: 'read_token',
        file_456: 'read_token'
      });
    });
  });
  describe('cacheTokens()', function () {
    test('should call the token generator function',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var generator;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              generator = jest.fn();
              _context.next = 3;
              return Tokenservice.cacheTokens(['file_123', 'folder_123'], generator);

            case 3:
              expect(generator).toHaveBeenCalledWith(['file_123', 'folder_123']);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should reject when not given a typed id', function () {
      return expect(Tokenservice.cacheTokens(['123', 'folder_123'])).rejects.toThrow(/Bad id or auth token/);
    });
    test('should reject when not given proper token function', function () {
      return expect(Tokenservice.cacheTokens(['file_123', 'folder_123'], {})).rejects.toThrow(/Bad id or auth token/);
    });
  });
});