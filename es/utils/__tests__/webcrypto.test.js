function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import sha1 from 'js-sha1';
import { digest, getRandomValues } from '../webcrypto';
jest.mock('js-sha1');
describe('util/webcrypto', function () {
  describe('getRandomValues()', function () {
    test('should call getRandomValues() to get an array of random values', function () {
      var getRandomValuesMock = jest.fn();
      window.crypto = {
        getRandomValues: getRandomValuesMock
      };
      getRandomValues();
      expect(getRandomValuesMock).toHaveBeenCalled();
    });
  });
  describe('digest()', function () {
    var algorithm = 'a';
    var buffer = new Uint8Array([1, 2]);
    var digestVal = 'd';
    test('should return the return value of digest() when the crypto lib is not msCrypto', function () {
      var digestMock = jest.fn().mockReturnValueOnce(digestVal);
      window.crypto = {
        subtle: {
          digest: digestMock
        }
      };
      expect(digest(algorithm, buffer)).toBe(digestVal);
      expect(digestMock).toHaveBeenCalledWith(algorithm, buffer);
    });
    describe('msCrypto', function () {
      test('should return a promise which resolves properly when the crypto lib is msCrypto', function () {
        sha1.arrayBuffer = jest.fn().mockImplementation(function () {
          return new ArrayBuffer();
        });
        var cryptoOperation = {};
        var digestMock = jest.fn().mockReturnValueOnce(cryptoOperation);
        window.crypto = undefined;
        window.msCrypto = {
          subtle: {
            digest: digestMock
          }
        };
        digest(algorithm, buffer);
        cryptoOperation.oncomplete({
          target: {
            result: 'digest'
          }
        });
        expect(digestMock).toHaveBeenCalledWith({
          name: algorithm
        }, buffer);
        expect(sha1.arrayBuffer).not.toHaveBeenCalled();
      });
      test('should return a promise which rejects properly when the crypto lib is msCrypto', function () {
        var cryptoOperation = {};
        var digestMock = jest.fn().mockReturnValueOnce(cryptoOperation);
        window.crypto = undefined;
        window.msCrypto = {
          subtle: {
            digest: digestMock
          }
        };
        var expectedError = new Error('ERROR');
        digest(algorithm, buffer).catch(function (error) {
          expect(error).toBe(expectedError);
        });
        cryptoOperation.onerror(expectedError);
        expect.assertions(1);
      });
    });
    describe('js-sha1', function () {
      test('should use js-sha1 for calculating hash in IE-11 SHA-1 digest scenarios',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var digestMock, hash;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // ie11 does not support sha-1, so we use a library
                sha1.arrayBuffer = jest.fn().mockImplementation(function () {
                  return new ArrayBuffer();
                });
                digestMock = jest.fn().mockReturnValueOnce({});
                window.crypto = undefined;
                window.msCrypto = {
                  subtle: {
                    digest: digestMock
                  }
                };
                _context.next = 6;
                return digest('SHA-1', buffer);

              case 6:
                hash = _context.sent;
                expect(hash).toBeDefined();
                expect(digestMock).not.toHaveBeenCalled();
                expect(sha1.arrayBuffer).toHaveBeenCalledWith(buffer);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
      test('should return a promise which rejects properly when js-sha1 fails', function () {
        var expectedError = new Error('ERROR'); // ie11 does not support sha-1, so we use a library

        sha1.arrayBuffer = jest.fn().mockRejectedValue(expectedError);
        var digestMock = jest.fn().mockReturnValueOnce({});
        window.crypto = undefined;
        window.msCrypto = {
          subtle: {
            digest: digestMock
          }
        };
        digest('SHA-1', buffer).catch(function (error) {
          expect(error).toBe(expectedError);
        });
        expect.assertions(1);
      });
    });
  });
});