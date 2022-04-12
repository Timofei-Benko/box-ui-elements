function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n            expected | ended    | numPartsDigestComputing | numPartsNotStarted | numPartsDigestReady\n            ", " | ", "  | ", "            | ", "       | ", "\n            ", " | ", " | ", "                    | ", "       | ", "\n            ", " | ", " | ", "                    | ", "               | ", "\n            ", " | ", " | ", "                    | ", "               | ", "\n            ", "  | ", " | ", "                    | ", "               | ", "\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n            data\n            ", "\n            ", "\n            ", "\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n            data\n            ", "\n            ", "\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            firstUnuploadedPart\n            ", "\n            ", "\n            ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            firstUnuploadedPart\n            ", "\n            ", "\n            ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            expected | ended    | numPartsUploading | numPartsDigestReady\n            ", " | ", "  | ", "              | ", "\n            ", " | ", " | ", "              | ", "\n            ", "  | ", " | ", "              | ", "\n            ", " | ", " | ", "              | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import * as func from '../../../utils/function';
import * as webcrypto from '../../../utils/webcrypto';
import * as uploadUtil from '../../../utils/uploads';
import MultiputUpload from '../MultiputUpload';
import MultiputPart, { PART_STATE_UPLOADED, PART_STATE_UPLOADING, PART_STATE_DIGEST_READY, PART_STATE_NOT_STARTED } from '../MultiputPart';
import { ERROR_CODE_UPLOAD_STORAGE_LIMIT_EXCEEDED } from '../../../constants';
var config = {
  a: 1
};
var file;
var createSessionUrl = 'https://test.box.com/createSession';
var partSize = 9;
describe('api/uploads/MultiputUpload', function () {
  var multiputUploadTest;
  beforeEach(function () {
    file = {
      size: 1000000,
      name: 'test.txt',
      slice: function slice() {}
    };
    multiputUploadTest = new MultiputUpload(config);
    multiputUploadTest.file = file;
    multiputUploadTest.partSize = partSize;
    multiputUploadTest.sessionEndpoints = {};
  });
  describe('getBaseUploadUrlFromPreflightResponse()', function () {
    test('should not change upload host when preflight response is empty', function () {
      // Setup
      multiputUploadTest.getBaseUploadUrl = jest.fn();
      multiputUploadTest.uploadHost = 'random'; // Execute

      multiputUploadTest.getBaseUploadUrlFromPreflightResponse({
        data: {}
      }); // Verify

      expect(multiputUploadTest.getBaseUploadUrl).toHaveBeenCalled();
      expect(multiputUploadTest.uploadHost).toEqual('random');
    });
    test('should set upload host when preflight response is not empty', function () {
      var upload_url = 'https://upload.box.com/api/2.0/files/content?upload_session_id=123';
      var expected = 'https://upload.box.com'; // Setup

      multiputUploadTest.getBaseUploadUrl = jest.fn();
      multiputUploadTest.uploadHost = 'random'; // Execute

      multiputUploadTest.getBaseUploadUrlFromPreflightResponse({
        data: {
          upload_url: upload_url
        }
      }); // Verify

      expect(multiputUploadTest.getBaseUploadUrl).toHaveBeenCalled();
      expect(multiputUploadTest.uploadHost).toEqual(expected);
    });
  });
  describe('uploadNextPart()', function () {
    beforeEach(function () {
      multiputUploadTest.firstUnuploadedPartIndex = 0;
      multiputUploadTest.numPartsUploading = 0;
      multiputUploadTest.parts = [new MultiputPart(config, 0, 0, 1024, 1, {
        upload_part: 'www.box.com'
      }), new MultiputPart(config, 1, 1024, 1024, 1, {
        upload_part: 'www.box.com'
      }), new MultiputPart(config, 2, 2048, 1024, 1, {
        upload_part: 'www.box.com'
      })];
    });
    test('should process first not started part by uploading it if sha-1 ready', function () {
      // Setup
      multiputUploadTest.parts[0].state = PART_STATE_UPLOADED;
      multiputUploadTest.parts[1].state = PART_STATE_DIGEST_READY;
      multiputUploadTest.numPartsDigestReady = 1; // Expectations

      multiputUploadTest.parts[1].upload = jest.fn(); // Execute

      multiputUploadTest.uploadNextPart(); // Verify

      expect(multiputUploadTest.numPartsDigestReady).toBe(0);
      expect(multiputUploadTest.numPartsUploading).toBe(1);
      expect(multiputUploadTest.parts[1].upload).toHaveBeenCalled();
    });
    test('should upload only one part', function () {
      // Setup
      multiputUploadTest.parts[0].state = PART_STATE_DIGEST_READY;
      multiputUploadTest.parts[1].state = PART_STATE_DIGEST_READY;
      multiputUploadTest.parts[2].state = PART_STATE_DIGEST_READY;
      multiputUploadTest.numPartsDigestReady = 3; // Expectations

      multiputUploadTest.parts[0].upload = jest.fn(); // Execute

      multiputUploadTest.uploadNextPart(); // Verify

      expect(multiputUploadTest.numPartsDigestReady).toBe(2);
      expect(multiputUploadTest.numPartsUploading).toBe(1);
      expect(multiputUploadTest.parts[0].upload).toHaveBeenCalled();
    });
    test('should call unpause when part is paused and in digest ready state', function () {
      // Setup
      multiputUploadTest.parts[0].isPaused = true;
      multiputUploadTest.parts[1].isPaused = true;
      multiputUploadTest.parts[0].state = PART_STATE_UPLOADING;
      multiputUploadTest.parts[1].state = PART_STATE_DIGEST_READY;
      multiputUploadTest.numPartsDigestReady = 1; // Expectations

      multiputUploadTest.parts[0].unpause = jest.fn();
      multiputUploadTest.parts[1].unpause = jest.fn(); // Execute

      multiputUploadTest.uploadNextPart(); // Verify

      expect(multiputUploadTest.parts[0].unpause).not.toBeCalled();
      expect(multiputUploadTest.parts[1].unpause).toBeCalled();
    });
    test('should call upload when part is not paused and in digest ready state', function () {
      // Setup
      multiputUploadTest.parts[0].isPaused = false;
      multiputUploadTest.parts[1].isPaused = false;
      multiputUploadTest.parts[0].state = PART_STATE_UPLOADING;
      multiputUploadTest.parts[1].state = PART_STATE_DIGEST_READY;
      multiputUploadTest.numPartsDigestReady = 1; // Expectations

      multiputUploadTest.parts[0].upload = jest.fn();
      multiputUploadTest.parts[1].upload = jest.fn(); // Execute

      multiputUploadTest.uploadNextPart(); // Verify

      expect(multiputUploadTest.parts[0].upload).not.toBeCalled();
      expect(multiputUploadTest.parts[1].upload).toBeCalled();
    });
  });
  describe('canStartMorePartUploads()', function () {
    beforeEach(function () {
      multiputUploadTest.config.parallelism = 2;
    }); // Test Cases In order:
    // Ended is true
    // upload pipeline full
    // upload pipeline not full and not ended
    // upload pipeline not full and not ended but no digest is ready

    test.each(_templateObject(), false, true, 1, undefined, false, false, 2, 1, true, false, 1, 1, false, false, 1, 0)('should return correct value:', function (_ref) {
      var expected = _ref.expected,
          ended = _ref.ended,
          numPartsUploading = _ref.numPartsUploading,
          numPartsDigestReady = _ref.numPartsDigestReady;
      // Setup
      multiputUploadTest.destroyed = ended;
      multiputUploadTest.numPartsUploading = numPartsUploading;
      multiputUploadTest.numPartsDigestReady = numPartsDigestReady; // Execute

      var result = multiputUploadTest.canStartMorePartUploads(); // Verify

      expect(result).toBe(expected);
    });
  });
  describe('updateFirstUnuploadedPartIndex()', function () {
    beforeEach(function () {
      multiputUploadTest.firstUnuploadedPartIndex = 0;
      multiputUploadTest.parts = [new MultiputPart(config, 0, 0, 1024, 1, {
        upload_part: 'www.box.com'
      }), new MultiputPart(config, 1, 1024, 1024, 1, {
        upload_part: 'www.box.com'
      }), new MultiputPart(config, 2, 2048, 1024, 1, {
        upload_part: 'www.box.com'
      })];
    });
    test('should update firstUnuploadedPartIndex correctly when first part not done', function () {
      // Setup
      multiputUploadTest.parts[0].state = PART_STATE_DIGEST_READY;
      multiputUploadTest.parts[1].state = PART_STATE_UPLOADED; // Execute

      multiputUploadTest.updateFirstUnuploadedPartIndex(); // Verify

      expect(multiputUploadTest.firstUnuploadedPartIndex).toBe(0);
    }); // Test cases in order
    // firstUnuploadedPartIndex is 0
    // firstUnuploadedPartIndex is 1
    // firstUnuploadedPartIndex is 2

    test.each(_templateObject2(), 0, 1, 2)('should update firstUnuploadedPartIndex correctly when some parts done', function (_ref2) {
      var firstUnuploadedPart = _ref2.firstUnuploadedPart;
      // Setup
      multiputUploadTest.parts[0].state = PART_STATE_UPLOADED;
      multiputUploadTest.parts[1].state = PART_STATE_UPLOADED;
      multiputUploadTest.parts[2].state = PART_STATE_DIGEST_READY;
      multiputUploadTest.firstUnuploadedPartIndex = firstUnuploadedPart; // Execute

      multiputUploadTest.updateFirstUnuploadedPartIndex(); // Verify

      expect(multiputUploadTest.firstUnuploadedPartIndex).toBe(2);
    }); // Test cases in order
    // firstUnuploadedPartIndex is 0
    // firstUnuploadedPartIndex is 1
    // firstUnuploadedPartIndex is 2

    test.each(_templateObject3(), 0, 1, 2)('should update firstUnuploadedPartIndex correctly when some parts done', function (_ref3) {
      var firstUnuploadedPart = _ref3.firstUnuploadedPart;
      // Setup
      multiputUploadTest.parts[0].state = PART_STATE_UPLOADED;
      multiputUploadTest.parts[1].state = PART_STATE_UPLOADED;
      multiputUploadTest.parts[2].state = PART_STATE_UPLOADED;
      multiputUploadTest.firstUnuploadedPartIndex = firstUnuploadedPart; // Execute

      multiputUploadTest.updateFirstUnuploadedPartIndex(); // Verify

      expect(multiputUploadTest.firstUnuploadedPartIndex).toBe(3);
    });
  });
  describe('populateParts()', function () {
    test('should create correct parts array', function () {
      // Setup
      multiputUploadTest.partSize = 400000; // Expectations

      var expectedParts = [new MultiputPart(config, 0, 0, 400000, 1, {
        upload_part: 'www.box.com'
      }), new MultiputPart(config, 1, 400000, 400000, 1, {
        upload_part: 'www.box.com'
      }), new MultiputPart(config, 2, 800000, 200000, 1, {
        upload_part: 'www.box.com'
      })]; // Execute

      multiputUploadTest.populateParts(); // Verify

      expect(multiputUploadTest.numPartsNotStarted).toBe(3);

      for (var i = 0; i < 3; i += 1) {
        expect(multiputUploadTest.parts[i].offset).toBe(expectedParts[i].offset);
        expect(multiputUploadTest.parts[i].size).toBe(expectedParts[i].size);
        expect(multiputUploadTest.parts[i].index).toBe(expectedParts[i].index);
      }
    });
  });
  describe('createSessionSuccessHandler()', function () {
    var data = {
      id: 1,
      part_size: 1,
      session_endpoints: {
        upload_part: 'upload_part',
        list_parts: 'list_parts',
        commit: 'commit',
        abort: 'abort',
        log_event: 'log_event'
      }
    };
    test('should noop when destroyed', function () {
      // Setup
      multiputUploadTest.destroyed = true;
      multiputUploadTest.populateParts = jest.fn();
      multiputUploadTest.processNextParts = jest.fn(); // Execute

      multiputUploadTest.createSessionSuccessHandler(data); // Expectations

      expect(multiputUploadTest.populateParts).not.toHaveBeenCalled();
      expect(multiputUploadTest.processNextParts).not.toHaveBeenCalled();
    });
    test('should update attributes properly, populate parts and process parts when not destroyed', function () {
      // Setup
      multiputUploadTest.sessionId = 0;
      multiputUploadTest.partSize = 0;
      multiputUploadTest.sessionEndpoints.createSession = createSessionUrl;
      multiputUploadTest.populateParts = jest.fn();
      multiputUploadTest.processNextParts = jest.fn(); // Execute

      multiputUploadTest.createSessionSuccessHandler(data); // Verify

      expect(multiputUploadTest.sessionId).toBe(data.id);
      expect(multiputUploadTest.partSize).toBe(data.part_size);
      expect(multiputUploadTest.sessionEndpoints).toEqual({
        createSession: createSessionUrl,
        uploadPart: 'upload_part',
        listParts: 'list_parts',
        commit: 'commit',
        abort: 'abort',
        logEvent: 'log_event'
      });
      expect(multiputUploadTest.populateParts).toHaveBeenCalled();
      expect(multiputUploadTest.processNextParts).toHaveBeenCalled();
    });
  });
  describe('preflightSuccessHandler()', function () {
    var preflightResponse = {
      data: 1
    };
    var uploadHost = 'upload.xyz.box.com';
    test('should noop when is destroyed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              multiputUploadTest.xhr.post = jest.fn();
              multiputUploadTest.destroyed = true;
              _context.next = 4;
              return multiputUploadTest.preflightSuccessHandler();

            case 4:
              expect(multiputUploadTest.xhr.post).not.toHaveBeenCalled();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should set parallelism to 1 for Zones',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              multiputUploadTest.getBaseUploadUrlFromPreflightResponse = jest.fn().mockReturnValueOnce('fupload-ec2usw1.app.box.com');
              multiputUploadTest.xhr.post = jest.fn().mockReturnValueOnce({
                data: {}
              });
              multiputUploadTest.createSessionSuccessHandler = jest.fn();
              _context2.next = 5;
              return multiputUploadTest.preflightSuccessHandler();

            case 5:
              expect(multiputUploadTest.config.parallelism).toBe(1);
              expect(multiputUploadTest.createSessionSuccessHandler).toBeCalledTimes(1);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    test('should call createSessionSuccessHandler when the session is created successfully',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var data;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              data = {
                a: 2
              };
              multiputUploadTest.destroyed = false;
              multiputUploadTest.xhr.post = jest.fn().mockReturnValueOnce({
                data: data
              });
              multiputUploadTest.createSessionSuccessHandler = jest.fn();
              multiputUploadTest.getBaseUploadUrlFromPreflightResponse = jest.fn().mockReturnValueOnce(uploadHost);
              _context3.next = 7;
              return multiputUploadTest.preflightSuccessHandler(preflightResponse);

            case 7:
              expect(multiputUploadTest.createSessionSuccessHandler).toHaveBeenCalledWith(data);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    test('should call createSessionErrorHandler when the session creation failed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var error;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              error = {
                response: {
                  data: {
                    status: 500
                  }
                }
              };
              multiputUploadTest.destroyed = false;
              multiputUploadTest.getErrorResponse = jest.fn().mockReturnValueOnce(error.response.data);
              multiputUploadTest.xhr.post = jest.fn().mockReturnValueOnce(Promise.reject(error));
              multiputUploadTest.createSessionErrorHandler = jest.fn();
              multiputUploadTest.getBaseUploadUrlFromPreflightResponse = jest.fn().mockReturnValueOnce(uploadHost);
              _context4.next = 8;
              return multiputUploadTest.preflightSuccessHandler(preflightResponse);

            case 8:
              expect(multiputUploadTest.createSessionErrorHandler).toHaveBeenCalledWith(error);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))); // Test cases in order
    // storage limit exceeded
    // insuffficient permissions

    test.each(_templateObject4(), {
      code: ERROR_CODE_UPLOAD_STORAGE_LIMIT_EXCEEDED,
      status: 403
    }, {
      code: 'access_denied_insufficient_permissions',
      status: 403
    })('should invoke errorCallback but not sessionErrorHandler on expected failure',
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref9) {
        var data, error;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                data = _ref9.data;
                // Setup
                error = {
                  response: {
                    data: data
                  }
                };
                multiputUploadTest.errorCallback = jest.fn();
                multiputUploadTest.getErrorResponse = jest.fn().mockReturnValueOnce(data);
                multiputUploadTest.createSessionErrorHandler = jest.fn();
                multiputUploadTest.xhr.post = jest.fn().mockReturnValueOnce(Promise.reject(error));
                multiputUploadTest.getBaseUploadUrlFromPreflightResponse = jest.fn().mockReturnValueOnce(uploadHost);
                _context5.next = 9;
                return multiputUploadTest.preflightSuccessHandler(preflightResponse);

              case 9:
                expect(multiputUploadTest.createSessionErrorHandler).not.toHaveBeenCalledWith();
                expect(multiputUploadTest.errorCallback).toHaveBeenCalledWith(data);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x) {
        return _ref8.apply(this, arguments);
      };
    }()); // Test cases in order
    // maybe response null
    // no code
    // 403 with code that is not storage limit exceeded

    test.each(_templateObject5(), {
      status: 403
    }, {
      status: 403,
      a: 1
    }, {
      status: '403',
      code: 'foo'
    })('should invoke sessionErrorHandler on other non-201 status code',
    /*#__PURE__*/
    function () {
      var _ref10 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_ref11) {
        var data, error;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                data = _ref11.data;
                error = {
                  response: {
                    data: data
                  }
                };
                multiputUploadTest.getErrorResponse = jest.fn().mockReturnValueOnce(data);
                multiputUploadTest.sessionErrorHandler = jest.fn();
                multiputUploadTest.xhr.post = jest.fn().mockReturnValueOnce(Promise.reject(error));
                multiputUploadTest.getBaseUploadUrlFromPreflightResponse = jest.fn().mockReturnValueOnce(uploadHost);
                _context6.next = 8;
                return multiputUploadTest.preflightSuccessHandler(preflightResponse);

              case 8:
                expect(multiputUploadTest.sessionErrorHandler).toHaveBeenCalledWith(error, 'create_session_misc_error', JSON.stringify(error));

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x2) {
        return _ref10.apply(this, arguments);
      };
    }());
    describe('resolveConflict', function () {
      test('should overwrite if overwrite is set to true and has context_info',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var data, error;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                data = {
                  status: 409,
                  context_info: {
                    conflicts: {
                      id: '30'
                    }
                  }
                };
                error = {
                  response: {
                    data: data
                  }
                };
                multiputUploadTest.getErrorResponse = jest.fn().mockReturnValueOnce(data);
                multiputUploadTest.sessionErrorHandler = jest.fn();
                multiputUploadTest.xhr.post = jest.fn().mockReturnValueOnce(Promise.reject(error));
                multiputUploadTest.getBaseUploadUrlFromPreflightResponse = jest.fn().mockReturnValueOnce(uploadHost);
                multiputUploadTest.overwrite = true;
                multiputUploadTest.conflictCallback = jest.fn();
                multiputUploadTest.createSessionRetry = jest.fn();
                _context7.next = 11;
                return multiputUploadTest.preflightSuccessHandler(preflightResponse);

              case 11:
                expect(multiputUploadTest.sessionErrorHandler).not.toHaveBeenCalled();
                expect(multiputUploadTest.conflictCallback).not.toHaveBeenCalled();
                expect(multiputUploadTest.createSessionRetry).toHaveBeenCalled();

              case 14:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      })));
      test('should invoke conflictCallback if exists',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        var data, error;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                data = {
                  status: 409
                };
                error = {
                  response: {
                    data: data
                  }
                };
                multiputUploadTest.getErrorResponse = jest.fn().mockReturnValueOnce(data);
                multiputUploadTest.sessionErrorHandler = jest.fn();
                multiputUploadTest.xhr.post = jest.fn().mockReturnValueOnce(Promise.reject(error));
                multiputUploadTest.getBaseUploadUrlFromPreflightResponse = jest.fn().mockReturnValueOnce(uploadHost);
                multiputUploadTest.conflictCallback = jest.fn();
                multiputUploadTest.createSessionRetry = jest.fn();
                _context8.next = 10;
                return multiputUploadTest.preflightSuccessHandler(preflightResponse);

              case 10:
                expect(multiputUploadTest.sessionErrorHandler).not.toHaveBeenCalled();
                expect(multiputUploadTest.conflictCallback).toHaveBeenCalled();
                expect(multiputUploadTest.createSessionRetry).toHaveBeenCalled();

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      })));
    });
  });
  describe('getSessionSuccessHandler()', function () {
    var response;
    beforeEach(function () {
      response = {
        data: {
          total_parts: 25,
          part_size: multiputUploadTest.partSize,
          session_endpoints: {
            uploadPart: 'https://upload.box.com/api/2.0/files/content?upload_session_id=123',
            listParts: 'https://upload.box.com/api/2.0/files/content?upload_session_id=123/parts',
            commit: 'https://upload.box.com/api/2.0/files/content?upload_session_id=123/commit',
            abort: 'https://upload.box.com/api/2.0/files/content?upload_session_id=123',
            logEvent: 'https://upload.box.com/api/2.0/files/content?upload_session_id=123/log'
          }
        }
      };
    });
    test('should call processNextParts if some parts are not uploaded', function () {
      // Setup
      multiputUploadTest.numPartsUploaded = 20;
      multiputUploadTest.processNextParts = jest.fn(); // Execute

      multiputUploadTest.getSessionSuccessHandler(response.data);
      expect(multiputUploadTest.processNextParts).toHaveBeenCalled();
    });
  });
  describe('getSessionErrorHandler()', function () {
    test('should noop when isDestroyed', function () {
      multiputUploadTest.destroyed = true;
      multiputUploadTest.getErrorResponse = jest.fn();
      multiputUploadTest.abortSession = jest.fn();
      multiputUploadTest.upload = jest.fn();
      multiputUploadTest.getSessionErrorHandler();
      expect(multiputUploadTest.getErrorResponse).not.toHaveBeenCalled();
      expect(multiputUploadTest.abortSession).not.toHaveBeenCalled();
      expect(multiputUploadTest.upload).not.toHaveBeenCalled();
    });
    test('should retry on network error', function () {
      multiputUploadTest.numResumeRetries = 1;
      multiputUploadTest.getErrorResponse = jest.fn(function (error) {
        return error.response;
      });
      multiputUploadTest.abortSession = jest.fn();
      multiputUploadTest.upload = jest.fn();
      multiputUploadTest.getSessionInfo = jest.fn();
      var error = {
        response: {
          status: 500
        }
      };
      multiputUploadTest.getSessionErrorHandler(error);
      expect(multiputUploadTest.getErrorResponse).toHaveBeenCalledWith(error);
      expect(multiputUploadTest.abortSession).not.toHaveBeenCalled();
      expect(multiputUploadTest.upload).not.toHaveBeenCalled();
      expect(multiputUploadTest.numResumeRetries).toBe(2);
    });
    test('should restart upload process on error due to invalid session ID', function () {
      multiputUploadTest.numResumeRetries = 0;
      multiputUploadTest.getErrorResponse = jest.fn(function (error) {
        return error.response;
      });
      multiputUploadTest.abortSession = jest.fn();
      multiputUploadTest.upload = jest.fn();
      var goneError = {
        response: {
          status: 410
        }
      };
      multiputUploadTest.getSessionErrorHandler(goneError);
      expect(multiputUploadTest.getErrorResponse).toHaveBeenCalledWith(goneError);
      expect(multiputUploadTest.abortSession).toHaveBeenCalled();
      expect(multiputUploadTest.upload).toHaveBeenCalled();
      expect(multiputUploadTest.numResumeRetries).toBe(0);
    });
    test('should retry on network disconnect', function () {
      multiputUploadTest.numResumeRetries = 1;
      multiputUploadTest.getErrorResponse = jest.fn(function (error) {
        return error.response;
      });
      multiputUploadTest.abortSession = jest.fn();
      multiputUploadTest.upload = jest.fn();
      var networkDisconnectError = {
        request: {}
      }; // No response

      multiputUploadTest.getSessionErrorHandler(networkDisconnectError);
      expect(multiputUploadTest.getErrorResponse).toHaveBeenCalledWith(networkDisconnectError);
      expect(multiputUploadTest.abortSession).not.toHaveBeenCalled();
      expect(multiputUploadTest.upload).not.toHaveBeenCalled();
      expect(multiputUploadTest.numResumeRetries).toBe(2);
      networkDisconnectError = {}; // No request or response

      multiputUploadTest.numResumeRetries = 1;
      multiputUploadTest.getSessionErrorHandler(networkDisconnectError);
      expect(multiputUploadTest.getErrorResponse).toHaveBeenCalledWith(networkDisconnectError);
      expect(multiputUploadTest.abortSession).not.toHaveBeenCalled();
      expect(multiputUploadTest.upload).not.toHaveBeenCalled();
      expect(multiputUploadTest.numResumeRetries).toBe(2);
    });
  });
  describe('createSessionErrorHandler()', function () {
    test('should should noop when isDestroyed', function () {
      multiputUploadTest.destroyed = true;
      multiputUploadTest.createSessionRetry = jest.fn();
      multiputUploadTest.sessionErrorHandler = jest.fn();
      multiputUploadTest.createSessionErrorHandler();
      expect(multiputUploadTest.createSessionRetry).not.toHaveBeenCalled();
      expect(multiputUploadTest.sessionErrorHandler).not.toHaveBeenCalled();
    });
    test('should retry if retries not exhausted', function () {
      // Expectations
      multiputUploadTest.createSessionRetry = jest.fn(); // Execute

      multiputUploadTest.createSessionErrorHandler();
      expect(multiputUploadTest.createSessionRetry).toHaveBeenCalled();
    });
    test('should fail if retries exhausted', function () {
      // Setup
      var response = {
        data: {
          test: 1
        }
      };
      multiputUploadTest.config.retries = 3;
      multiputUploadTest.createSessionNumRetriesPerformed = 100;
      multiputUploadTest.createSessionRetry = jest.fn();
      multiputUploadTest.sessionErrorHandler = jest.fn(); // Execute

      multiputUploadTest.createSessionErrorHandler(response);
      expect(multiputUploadTest.sessionErrorHandler).toHaveBeenCalledWith(response, 'create_session_retries_exceeded', JSON.stringify(response));
    });
  });
  describe('createSessionRetry()', function () {
    test('should call createSession again after exponential backoff based on retry count', function () {
      // Setup
      var clock = jest.useFakeTimers();
      uploadUtil.getBoundedExpBackoffRetryDelay = jest.fn().mockReturnValueOnce(10);
      multiputUploadTest.createSessionNumRetriesPerformed = 5;
      multiputUploadTest.makePreflightRequest = jest.fn(); // Execute

      multiputUploadTest.createSessionRetry();
      clock.runTimersToTime(11);
      expect(uploadUtil.getBoundedExpBackoffRetryDelay).toHaveBeenCalledWith(5000, 60000, 5);
      expect(multiputUploadTest.makePreflightRequest).toHaveBeenCalled();
      expect(multiputUploadTest.createSessionNumRetriesPerformed).toBe(6);
      jest.clearAllTimers();
    });
  });
  describe('sessionErrorHandler()', function () {
    test('should destroy, log and call error handler properly',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              func.retryNumOfTimes = jest.fn().mockReturnValueOnce(Promise.resolve());
              multiputUploadTest.destroy = jest.fn();
              multiputUploadTest.sessionEndpoints.logEvent = 'logEvent';
              multiputUploadTest.errorCallback = jest.fn();
              multiputUploadTest.abortSession = jest.fn();
              _context9.next = 7;
              return multiputUploadTest.sessionErrorHandler(null, '123', '123');

            case 7:
              expect(multiputUploadTest.errorCallback).toHaveBeenCalled();
              expect(multiputUploadTest.abortSession).toHaveBeenCalled();
              expect(multiputUploadTest.destroy).toHaveBeenCalled();

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
  });
  describe('abortSession()', function () {
    test('should terminate the worker and abort session', function () {
      multiputUploadTest.sha1Worker = {
        terminate: jest.fn()
      };
      multiputUploadTest.xhr.delete = jest.fn().mockResolvedValue();
      multiputUploadTest.sessionEndpoints.abort = 'foo';
      multiputUploadTest.sessionId = '123';
      multiputUploadTest.abortSession(null, '123', '123');
      expect(multiputUploadTest.xhr.delete).toHaveBeenCalled();
      expect(multiputUploadTest.sha1Worker.terminate).toHaveBeenCalled();
    });
  });
  describe('partUploadSuccessHandler()', function () {
    test('should update the part uploading progress and upload next parts', function () {
      var part = {
        uploadedBytes: 1,
        size: 1
      };
      multiputUploadTest.numPartsUploading = 10;
      multiputUploadTest.numPartsUploaded = 10;
      multiputUploadTest.updateProgress = jest.fn();
      multiputUploadTest.processNextParts = jest.fn();
      multiputUploadTest.partUploadSuccessHandler(part);
      expect(multiputUploadTest.updateProgress).toHaveBeenCalledWith(part.uploadedBytes, partSize);
      expect(multiputUploadTest.processNextParts).toHaveBeenCalled();
    });
  });
  describe('partUploadErrorHandler', function () {
    var error = {
      response: {
        data: {
          status: 500
        }
      }
    };
    beforeEach(function () {
      // Setup
      multiputUploadTest.isResumableUploadsEnabled = true;
      multiputUploadTest.numPartsUploaded = 20;
      multiputUploadTest.numPartsUploading = 2;
      multiputUploadTest.numPartsDigestReady = 0;
      multiputUploadTest.firstUnuploadedPartIndex = 0;
      multiputUploadTest.parts = [{
        state: PART_STATE_UPLOADING,
        numUploadRetriesPerformed: 2,
        uploadedBytes: 5,
        reset: jest.fn(),
        pause: jest.fn()
      }, {
        state: PART_STATE_UPLOADED,
        numUploadRetriesPerformed: 2,
        uploadedBytes: 5,
        reset: jest.fn(),
        pause: jest.fn()
      }, {
        state: PART_STATE_UPLOADING,
        numUploadRetriesPerformed: 2,
        uploadedBytes: 5,
        reset: jest.fn(),
        pause: jest.fn()
      }];
      multiputUploadTest.sessionErrorHandler = jest.fn();
    });
    test('should update numPartsUploading and numPartsDigestReady properly', function () {
      // Execute
      multiputUploadTest.partUploadErrorHandler(error); // Verify

      expect(multiputUploadTest.numPartsUploading).toBe(0);
      expect(multiputUploadTest.numPartsDigestReady).toBe(2);
    });
    test('should reset all parts in uploading state when part errors', function () {
      // Execute
      multiputUploadTest.partUploadErrorHandler(error); // Verify

      expect(multiputUploadTest.parts[0].reset).toBeCalled();
      expect(multiputUploadTest.parts[1].reset).not.toBeCalled();
      expect(multiputUploadTest.parts[2].reset).toBeCalled();
    });
    test('should pause all parts in uploading state when part errors', function () {
      // Execute
      multiputUploadTest.partUploadErrorHandler(error); // Verify

      expect(multiputUploadTest.parts[0].pause).toBeCalled();
      expect(multiputUploadTest.parts[1].pause).not.toBeCalled();
      expect(multiputUploadTest.parts[2].pause).toBeCalled();
    });
  });
  describe('updateProgress()', function () {
    test('should call progressCallback() properly', function () {
      var prevUploadedBytes = 10;
      var newUploadedBytes = 20;
      multiputUploadTest.totalUploadedBytes = 100;
      multiputUploadTest.progressCallback = jest.fn();
      multiputUploadTest.updateProgress(prevUploadedBytes, newUploadedBytes);
      expect(multiputUploadTest.progressCallback).toHaveBeenCalledWith({
        loaded: 110,
        total: file.size
      });
    });
  });
  describe('shouldComputeDigestForNextPart()', function () {
    beforeEach(function () {
      multiputUploadTest.config.digestReadahead = 2;
    }); // Test cases in order
    // ended is true
    // a part is already computing
    // all parts started
    // readahead is full
    // no part computing, there is a part not started and readahead not full

    test.each(_templateObject6(), false, true, undefined, undefined, undefined, false, false, 1, undefined, undefined, false, false, 0, 0, undefined, false, false, 0, 1, 2, true, false, 0, 1, 1)('should return correct value', function (_ref15) {
      var expected = _ref15.expected,
          ended = _ref15.ended,
          numPartsDigestComputing = _ref15.numPartsDigestComputing,
          numPartsNotStarted = _ref15.numPartsNotStarted,
          numPartsDigestReady = _ref15.numPartsDigestReady;
      // Setup
      multiputUploadTest.ended = ended;
      multiputUploadTest.numPartsDigestComputing = numPartsDigestComputing;
      multiputUploadTest.numPartsNotStarted = numPartsNotStarted;
      multiputUploadTest.numPartsDigestReady = numPartsDigestReady; // Execute

      var result = multiputUploadTest.shouldComputeDigestForNextPart(); // Verify

      expect(result).toBe(expected);
    });
  });
  describe('computeDigestForNextPart()', function () {
    beforeEach(function () {
      multiputUploadTest.firstUnuploadedPartIndex = 0;
      multiputUploadTest.numPartsDigestComputing = 0;
      multiputUploadTest.parts = [new MultiputPart({}, 0, 0, 1024, 1, {
        upload_part: 'www.box.com'
      }), new MultiputPart({}, 1, 1024, 1024, 1, {
        upload_part: 'www.box.com'
      }), new MultiputPart({}, 2, 2048, 1024, 1, {
        upload_part: 'www.box.com'
      })];
    });
    test('should process first not started part by calling computeDigestForPart', function () {
      multiputUploadTest.parts[0].state = PART_STATE_UPLOADED;
      multiputUploadTest.parts[1].state = PART_STATE_NOT_STARTED;
      multiputUploadTest.numPartsNotStarted = 1;
      multiputUploadTest.computeDigestForPart = jest.fn(); // Execute

      multiputUploadTest.computeDigestForNextPart(); // Verify

      expect(multiputUploadTest.numPartsNotStarted).toBe(0);
      expect(multiputUploadTest.numPartsDigestComputing).toBe(1);
      expect(multiputUploadTest.computeDigestForPart).toHaveBeenCalledWith(multiputUploadTest.parts[1]);
    });
    test('should process only one part', function () {
      // Setup
      multiputUploadTest.parts[0].state = PART_STATE_NOT_STARTED;
      multiputUploadTest.parts[1].state = PART_STATE_NOT_STARTED;
      multiputUploadTest.parts[2].state = PART_STATE_NOT_STARTED;
      multiputUploadTest.numPartsNotStarted = 3;
      multiputUploadTest.computeDigestForPart = jest.fn(); // Execute

      multiputUploadTest.computeDigestForNextPart(); // Verify

      expect(multiputUploadTest.numPartsNotStarted).toBe(2);
      expect(multiputUploadTest.numPartsDigestComputing).toBe(1);
      expect(multiputUploadTest.computeDigestForPart).toHaveBeenCalledWith(multiputUploadTest.parts[0]);
    });
  });
  describe('computeDigestForPart()', function () {
    test('should read, compute digest, then send part to worker',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              webcrypto.digest = jest.fn().mockReturnValueOnce(Promise.resolve());
              multiputUploadTest.sendPartToWorker = jest.fn();
              multiputUploadTest.readFile = jest.fn().mockReturnValueOnce({
                buffer: new ArrayBuffer(),
                readCompleteTimestamp: 123
              });
              multiputUploadTest.processNextParts = jest.fn();
              _context10.next = 6;
              return multiputUploadTest.computeDigestForPart({
                offset: 1,
                size: 2
              });

            case 6:
              expect(multiputUploadTest.sendPartToWorker).toHaveBeenCalled();
              expect(multiputUploadTest.processNextParts).toHaveBeenCalled();
              expect(multiputUploadTest.readFile).toHaveBeenCalled();

            case 9:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
  });
  describe('processNextParts()', function () {
    beforeEach(function () {
      multiputUploadTest.parts = ['part1'];
      multiputUploadTest.commitSession = jest.fn();
    });
    test('should call failSessionIfFileChangeDetected and return when it returns true', function () {
      multiputUploadTest.failSessionIfFileChangeDetected = jest.fn().mockReturnValueOnce(true);
      multiputUploadTest.commitSession = jest.fn();
      multiputUploadTest.updateFirstUnuploadedPartIndex = jest.fn();
      multiputUploadTest.uploadNextPart = jest.fn(); // Execute

      multiputUploadTest.processNextParts();
      expect(multiputUploadTest.failSessionIfFileChangeDetected).toHaveBeenCalled();
      expect(multiputUploadTest.commitSession).not.toHaveBeenCalled();
      expect(multiputUploadTest.updateFirstUnuploadedPartIndex).not.toHaveBeenCalled();
      expect(multiputUploadTest.uploadNextPart).not.toHaveBeenCalled();
    });
    test('should call failSessionIfFileChangeDetected and return when it returns true, even when everything is ready for commit otherwise', function () {
      // Setup
      multiputUploadTest.numPartsUploaded = 1;
      multiputUploadTest.failSessionIfFileChangeDetected = jest.fn().mockReturnValueOnce(true);
      multiputUploadTest.commitSession = jest.fn();
      multiputUploadTest.updateFirstUnuploadedPartIndex = jest.fn();
      multiputUploadTest.uploadNextPart = jest.fn(); // Execute

      multiputUploadTest.processNextParts();
      expect(multiputUploadTest.failSessionIfFileChangeDetected).toHaveBeenCalled();
      expect(multiputUploadTest.commitSession).not.toHaveBeenCalled();
      expect(multiputUploadTest.updateFirstUnuploadedPartIndex).not.toHaveBeenCalled();
      expect(multiputUploadTest.uploadNextPart).not.toHaveBeenCalled();
    });
    test('should try to upload parts and send them to worker otherwise', function () {
      // Setup - couldn't figure out how to do multiple return values in Sinon, so this is my hack
      var ctr = 0;
      var returnValues = [true, true, false];

      multiputUploadTest.canStartMorePartUploads = function () {
        var val = returnValues[ctr];
        ctr += 1;
        return val;
      };

      multiputUploadTest.failSessionIfFileChangeDetected = jest.fn().mockReturnValueOnce(false);
      multiputUploadTest.updateFirstUnuploadedPartIndex = jest.fn();
      multiputUploadTest.uploadNextPart = jest.fn(); // Execute

      multiputUploadTest.processNextParts();
      expect(multiputUploadTest.updateFirstUnuploadedPartIndex).toHaveBeenCalled();
      expect(multiputUploadTest.uploadNextPart).toHaveBeenCalledTimes(2);
    });
    test('should commit the session if all parts have been uploaded', function () {
      multiputUploadTest.failSessionIfFileChangeDetected = jest.fn().mockReturnValueOnce(false);
      multiputUploadTest.commitSession = jest.fn();
      multiputUploadTest.updateFirstUnuploadedPartIndex = jest.fn();
      multiputUploadTest.uploadNextPart = jest.fn();
      multiputUploadTest.numPartsUploaded = 1;
      multiputUploadTest.fileSha1 = 'abc'; // Execute

      multiputUploadTest.processNextParts();
      expect(multiputUploadTest.failSessionIfFileChangeDetected).toHaveBeenCalled();
      expect(multiputUploadTest.commitSession).toHaveBeenCalled();
      expect(multiputUploadTest.updateFirstUnuploadedPartIndex).not.toHaveBeenCalled();
      expect(multiputUploadTest.uploadNextPart).not.toHaveBeenCalled();
    });
  });
  describe('commitSession()', function () {
    beforeEach(function () {
      multiputUploadTest.xhr.post = jest.fn().mockResolvedValue();
      multiputUploadTest.sessionEndpoints.commit = 'https://upload.box.com/api/2.0/files/content?upload_session_id=123/commit';
    });
    test('should noop when isDestroyed', function () {
      multiputUploadTest.destroyed = true;
      multiputUploadTest.commitSession();
      expect(multiputUploadTest.xhr.post).not.toHaveBeenCalled();
    });
    test('should commit session with file sha1 included in header', function () {
      multiputUploadTest.parts = [];
      multiputUploadTest.fileSha1 = '123456789';
      var postData = {
        url: multiputUploadTest.sessionEndpoints.commit,
        data: {
          parts: [],
          attributes: {}
        },
        headers: {
          Digest: "sha=".concat(multiputUploadTest.fileSha1),
          'X-Box-Client-Event-Info': '{"avg_part_read_time":null,"avg_part_digest_time":null,"avg_file_digest_time":null,"avg_part_upload_time":null}'
        }
      };
      multiputUploadTest.commitSession();
      expect(multiputUploadTest.xhr.post).toHaveBeenCalledWith(postData);
    });
  });
  describe('onWorkerMessage()', function () {
    beforeEach(function () {
      multiputUploadTest.isDestroyed = jest.fn();
      multiputUploadTest.processNextParts = jest.fn();
      multiputUploadTest.sha1Worker = {
        terminate: jest.fn()
      };
      multiputUploadTest.sessionErrorHandler = jest.fn();
    });
    test('should return if destroyed', function () {
      multiputUploadTest.isDestroyed.mockReturnValueOnce(true);
      multiputUploadTest.onWorkerMessage();
      expect(multiputUploadTest.processNextParts).not.toHaveBeenCalled();
      expect(multiputUploadTest.sha1Worker.terminate).not.toHaveBeenCalled();
      expect(multiputUploadTest.sessionErrorHandler).not.toHaveBeenCalled();
    });
    test('should call sessionErrorHandler if event type is error', function () {
      multiputUploadTest.isDestroyed.mockReturnValueOnce(false);
      multiputUploadTest.onWorkerMessage({
        data: {
          type: 'error'
        }
      });
      expect(multiputUploadTest.processNextParts).not.toHaveBeenCalled();
      expect(multiputUploadTest.sha1Worker.terminate).not.toHaveBeenCalled();
      expect(multiputUploadTest.sessionErrorHandler).toHaveBeenCalled();
    });
    test('should update the related variables after a part is done computing', function () {
      multiputUploadTest.isDestroyed.mockReturnValueOnce(false);
      multiputUploadTest.numPartsDigestComputing = 1;
      multiputUploadTest.parts = [{
        timing: {
          fileDigestTime: 0
        }
      }];
      multiputUploadTest.onWorkerMessage({
        data: {
          type: 'partDone',
          duration: 10,
          part: {
            index: 0
          }
        }
      });
      expect(multiputUploadTest.processNextParts).toHaveBeenCalled();
      expect(multiputUploadTest.sha1Worker.terminate).not.toHaveBeenCalled();
      expect(multiputUploadTest.sessionErrorHandler).not.toHaveBeenCalled();
      expect(multiputUploadTest.numPartsDigestComputing).toEqual(0);
      expect(multiputUploadTest.parts[0]).toEqual({
        timing: {
          fileDigestTime: 10
        }
      });
    });
    test('should terminate the sha1Worker if the event type is done', function () {
      multiputUploadTest.isDestroyed.mockReturnValueOnce(false);
      multiputUploadTest.onWorkerMessage({
        data: {
          type: 'done',
          sha1: 'abc'
        }
      });
      expect(multiputUploadTest.processNextParts).toHaveBeenCalled();
      expect(multiputUploadTest.sha1Worker.terminate).toHaveBeenCalled();
      expect(multiputUploadTest.sessionErrorHandler).not.toHaveBeenCalled();
    });
  });
});