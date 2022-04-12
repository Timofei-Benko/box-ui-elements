function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n            destroyed | isPaused | expected\n            ", "   | ", " | ", "\n            ", "  | ", "  | ", "\n            ", "  | ", " | ", "\n        "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n            parts\n            ", "\n            ", "\n            ", "\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n            destroyed | isPaused\n            ", "  | ", "\n            ", "   | ", "\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n            destroyed | isPaused\n            ", "  | ", "\n            ", "   | ", "\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            destroyed | isPaused\n            ", "  | ", "\n            ", "   | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            destroyed | isPaused | data\n            ", "  | ", "  | ", "\n            ", "   | ", " | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            destroyed | isPaused\n            ", "  | ", "\n            ", "   | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import MultiputPart, { PART_STATE_DIGEST_READY, PART_STATE_UPLOADING, PART_STATE_UPLOADED } from '../MultiputPart';
describe('api/uploads/MultiputPart', function () {
  var options = {};
  var index = 0;
  var offset = 0;
  var partSize = 1;
  var fileSize = 10;
  var sessionId = 1;
  var sessionEndpoints = {};
  var config = {};
  var getNumPartsUploading = jest.fn();
  var MultiputPartTest;
  beforeEach(function () {
    MultiputPartTest = new MultiputPart(options, index, offset, partSize, fileSize, sessionId, sessionEndpoints, config, getNumPartsUploading);
  });
  describe('upload()', function () {
    test.each(_templateObject(), false, true, true, false)('should noop if destroyed or paused', function (_ref) {
      var destroyed = _ref.destroyed,
          isPaused = _ref.isPaused;
      MultiputPartTest.destroyed = destroyed;
      MultiputPartTest.isPaused = isPaused;
      MultiputPartTest.xhr.uploadFile = jest.fn();
      MultiputPartTest.upload();
      expect(MultiputPartTest.xhr.uploadFile).not.toHaveBeenCalled();
    });
    test('should throw error if sha256 is not available', function () {
      MultiputPartTest.destroyed = false;
      MultiputPartTest.isPaused = false;
      MultiputPartTest.blob = {};
      MultiputPartTest.xhr.uploadFile = jest.fn();
      expect(MultiputPartTest.upload.bind(MultiputPartTest)).toThrowError(/Part SHA-256 unavailable/);
      expect(MultiputPartTest.xhr.uploadFile).not.toHaveBeenCalled();
    });
    test('should throw error if blob is not available', function () {
      MultiputPartTest.destroyed = false;
      MultiputPartTest.isPaused = false;
      MultiputPartTest.sha256 = '123';
      MultiputPartTest.xhr.uploadFile = jest.fn();
      expect(MultiputPartTest.upload.bind(MultiputPartTest)).toThrowError(/Part blob unavailable/);
      expect(MultiputPartTest.xhr.uploadFile).not.toHaveBeenCalled();
    });
    test('should upload file properly', function () {
      MultiputPartTest.destroyed = false;
      MultiputPartTest.isPaused = false;
      MultiputPartTest.sha256 = '123';
      MultiputPartTest.blob = {};
      MultiputPartTest.xhr.uploadFile = jest.fn();
      MultiputPartTest.upload();
    });
  });
  describe('uploadSuccessHandler()', function () {
    test.each(_templateObject2(), false, true, {}, true, false, {})('should noop if destroyed or paused', function (_ref2) {
      var destroyed = _ref2.destroyed,
          isPaused = _ref2.isPaused,
          data = _ref2.data;
      MultiputPartTest.destroyed = destroyed;
      MultiputPartTest.isPaused = isPaused;
      MultiputPartTest.onSuccess = jest.fn();
      MultiputPartTest.uploadSuccessHandler(data);
      expect(MultiputPartTest.onSuccess).not.toHaveBeenCalled();
    });
    test('should call onSuccess and update attributes properly', function () {
      var data = {
        hi: 1
      };
      MultiputPartTest.destroyed = false;
      MultiputPartTest.isPaused = false;
      MultiputPartTest.onSuccess = jest.fn();
      MultiputPartTest.uploadSuccessHandler({
        data: data
      });
      expect(MultiputPartTest.data).toBe(data);
      expect(MultiputPartTest.blob).toBeNull();
      expect(MultiputPartTest.onSuccess).toHaveBeenCalledWith(MultiputPartTest);
      expect(MultiputPartTest.state).toBe(PART_STATE_UPLOADED);
    });
  });
  describe('uploadProgressHandler()', function () {
    test.each(_templateObject3(), false, true, true, false)('should noop if destroyed or paused', function (_ref3) {
      var destroyed = _ref3.destroyed,
          isPaused = _ref3.isPaused;
      MultiputPartTest.destroyed = destroyed;
      MultiputPartTest.isPaused = isPaused;
      MultiputPartTest.onProgress = jest.fn();
      MultiputPartTest.uploadProgressHandler();
      expect(MultiputPartTest.onProgress).not.toHaveBeenCalled();
    });
    test('should call onProgress and update attributes properly', function () {
      var event = {
        loaded: 1
      };
      MultiputPartTest.destroyed = false;
      MultiputPartTest.isPaused = false;
      MultiputPartTest.onProgress = jest.fn();
      MultiputPartTest.uploadProgressHandler(event);
      expect(MultiputPartTest.uploadedBytes).toBe(1);
      expect(MultiputPartTest.onProgress).toHaveBeenCalled();
    });
  });
  describe('uploadErrorHandler()', function () {
    beforeEach(function () {
      MultiputPartTest.xhr = {
        xhr: {
          readyState: 'readyState',
          statusText: 'statusText'
        }
      };
    });
    test.each(_templateObject4(), false, true, true, false)('should noop if destroyed or paused', function (_ref4) {
      var destroyed = _ref4.destroyed,
          isPaused = _ref4.isPaused;
      MultiputPartTest.destroyed = destroyed;
      MultiputPartTest.isPaused = isPaused;
      MultiputPartTest.onError = jest.fn();
      MultiputPartTest.uploadErrorHandler();
      expect(MultiputPartTest.onError).not.toHaveBeenCalled();
    });
    test('should log error, and call onError when retry is exhausted', function () {
      var error = {
        message: 'no'
      };
      MultiputPartTest.destroyed = false;
      MultiputPartTest.isPaused = false;
      MultiputPartTest.numUploadRetriesPerformed = 100;
      MultiputPartTest.config.retries = 1;
      MultiputPartTest.logEvent = jest.fn().mockResolvedValue();
      MultiputPartTest.onError = jest.fn();
      MultiputPartTest.uploadErrorHandler(error);
      expect(MultiputPartTest.onError).toHaveBeenCalled();
    });
    test('should retry upload after delay when retry is not exhausted', function () {
      var error = {
        message: 'no'
      };
      jest.useFakeTimers();
      MultiputPart.getBoundedExpBackoffRetryDelay = jest.fn().mockReturnValueOnce(10);
      MultiputPartTest.destroyed = false;
      MultiputPartTest.isPaused = false;
      MultiputPartTest.numUploadRetriesPerformed = 100;
      MultiputPartTest.config.retries = 1000;
      MultiputPartTest.logEvent = jest.fn().mockResolvedValue();
      MultiputPartTest.onError = jest.fn();
      MultiputPartTest.retryUpload = jest.fn();
      MultiputPartTest.uploadErrorHandler(error);
      jest.runOnlyPendingTimers();
      expect(MultiputPartTest.numUploadRetriesPerformed).toBe(101);
      expect(MultiputPartTest.onError).not.toHaveBeenCalled();
      jest.clearAllTimers();
    });
  });
  describe('retryUpload()', function () {
    test.each(_templateObject5(), false, true, true, false)('should noop if destroyed or paused', function (_ref5) {
      var destroyed = _ref5.destroyed,
          isPaused = _ref5.isPaused;
      MultiputPartTest.destroyed = destroyed;
      MultiputPartTest.isPaused = isPaused;
      MultiputPartTest.upload = jest.fn();
      MultiputPartTest.retryUpload();
      expect(MultiputPartTest.upload).not.toHaveBeenCalled();
    });
    test('should call upload when upload is incomplete',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              MultiputPartTest.destroyed = false;
              MultiputPartTest.isPaused = false;
              MultiputPartTest.uploadedBytes = 1;
              MultiputPartTest.size = 100;
              MultiputPartTest.numUploadRetriesPerformed = 0;
              MultiputPartTest.upload = jest.fn();
              _context.next = 8;
              return MultiputPartTest.retryUpload();

            case 8:
              expect(MultiputPartTest.numUploadRetriesPerformed).toBe(1);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should call uploadSuccessHandler when upload is already available on the server',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var part, parts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              part = {
                offset: 1,
                part_id: 1
              };
              parts = [part];
              MultiputPartTest.destroyed = false;
              MultiputPartTest.isPaused = false;
              MultiputPartTest.uploadedBytes = 100;
              MultiputPartTest.size = 100;
              MultiputPartTest.offset = 1;
              MultiputPartTest.numUploadRetriesPerformed = 0;
              MultiputPartTest.upload = jest.fn();
              MultiputPartTest.uploadSuccessHandler = jest.fn();
              MultiputPartTest.listParts = jest.fn().mockReturnValueOnce(Promise.resolve(parts));
              _context2.next = 13;
              return MultiputPartTest.retryUpload();

            case 13:
              expect(MultiputPartTest.upload).not.toHaveBeenCalled();
              expect(MultiputPartTest.uploadSuccessHandler).toHaveBeenCalledWith({
                data: {
                  part: part
                }
              });

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    test.each(_templateObject6(), [{
      offset: 1,
      part_id: 1
    }, {
      offset: 1,
      part_id: 1
    }], {
      offset: 1
    }, {
      offset: 2,
      part_id: 1
    })('should call upload when upload is not available on the server',
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref9) {
        var parts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                parts = _ref9.parts;
                MultiputPartTest.destroyed = false;
                MultiputPartTest.isPaused = false;
                MultiputPartTest.uploadedBytes = 100;
                MultiputPartTest.size = 100;
                MultiputPartTest.numUploadRetriesPerformed = 0;
                MultiputPartTest.upload = jest.fn();
                MultiputPartTest.uploadSuccessHandler = jest.fn();
                MultiputPartTest.listParts = jest.fn().mockReturnValueOnce(Promise.resolve(parts));
                _context3.next = 11;
                return MultiputPartTest.retryUpload();

              case 11:
                expect(MultiputPartTest.numUploadRetriesPerformed).toBe(1);
                expect(MultiputPartTest.uploadSuccessHandler).not.toHaveBeenCalled();

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref8.apply(this, arguments);
      };
    }());
  });
  describe('cancel()', function () {
    test('should tear down properly', function () {
      MultiputPartTest.blob = new Blob();
      MultiputPartTest.data = {
        hi: 1
      };
      MultiputPartTest.destroy = jest.fn();
      MultiputPartTest.cancel();
      expect(MultiputPartTest.blob).toBeNull();
      expect(MultiputPartTest.data).toEqual({});
    });
  });
  describe('pause()', function () {
    test('should pause properly', function () {
      MultiputPartTest.isPaused = false;
      MultiputPartTest.state = PART_STATE_UPLOADING;
      MultiputPartTest.xhr.abort = jest.fn();
      MultiputPartTest.pause();
      expect(MultiputPartTest.isPaused).toBe(true);
      expect(MultiputPartTest.state).toBe(PART_STATE_DIGEST_READY);
      expect(MultiputPartTest.xhr.abort).toBeCalled();
    });
  });
  describe('unpause()', function () {
    test('should unpause properly', function () {
      MultiputPartTest.isPaused = true;
      MultiputPartTest.state = PART_STATE_DIGEST_READY;
      MultiputPartTest.retryUpload = jest.fn();
      MultiputPartTest.unpause();
      expect(MultiputPartTest.isPaused).toBe(false);
      expect(MultiputPartTest.state).toBe(PART_STATE_UPLOADING);
      expect(MultiputPartTest.retryUpload).toBeCalled();
    });
  });
  describe('reset()', function () {
    test('should reset properly', function () {
      MultiputPartTest.numUploadRetriesPerformed = 1;
      MultiputPartTest.timing = {
        partDigestTime: 122
      };
      MultiputPartTest.uploadedBytes = 1024;
      MultiputPartTest.reset();
      expect(MultiputPartTest.numUploadRetriesPerformed).toBe(0);
      expect(MultiputPartTest.timing).toStrictEqual({});
      expect(MultiputPartTest.uploadedBytes).toBe(0);
    });
  });
  describe('isDestroyedOrPaused()', function () {
    test.each(_templateObject7(), true, false, true, false, true, true, false, false, false)('should return expected', function (_ref10) {
      var destroyed = _ref10.destroyed,
          isPaused = _ref10.isPaused,
          expected = _ref10.expected;
      MultiputPartTest.destroyed = destroyed;
      MultiputPartTest.isPaused = isPaused;
      expect(MultiputPartTest.isDestroyedOrPaused()).toBe(expected);
    });
  });
  describe('listParts()', function () {
    test('should GET from correct endpoint and return entries',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var endpoint, entries, res;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              endpoint = 'www.box.com';
              entries = [1];
              MultiputPart.updateQueryParameters = jest.fn().mockReturnValueOnce(endpoint);
              MultiputPartTest.xhr = {
                get: jest.fn().mockReturnValueOnce(Promise.resolve({
                  data: {
                    entries: entries
                  }
                }))
              };
              _context4.next = 6;
              return MultiputPartTest.listParts(1, 1);

            case 6:
              res = _context4.sent;
              expect(res).toBe(entries);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
});