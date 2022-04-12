function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import BoxEdit from '../BoxEdit';
import Browser from '../BrowserUtils';
describe('api/box-edit/BoxEdit', function () {
  beforeEach(function () {
    jest.useFakeTimers();
  });
  afterEach(function () {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });
  test('should create a singleton', function () {
    var boxEdit1 = new BoxEdit();
    var boxEdit2 = new BoxEdit();
    expect(boxEdit1).toEqual(boxEdit2);
  }); // TODO: constructor and getBoxEditAvailability tests

  describe('processExtensionRequestQueue()', function () {
    var unoDosResolution = {
      default_application_name: [{
        uno: 'One'
      }, {
        dos: 'Two'
      }]
    };
    test('should flush the extension request queue when called', function () {
      var boxEdit = new BoxEdit();
      boxEdit.client = {
        sendRequest: jest.fn().mockResolvedValue(unoDosResolution)
      };
      boxEdit.queueGetNativeAppNameFromLocal('uno');
      boxEdit.queueGetNativeAppNameFromLocal('dos');
      boxEdit.processExtensionRequestQueue();
      expect(boxEdit.extensionRequestQueue.has('uno')).toBe(false);
      expect(boxEdit.extensionRequestQueue.has('dos')).toBe(false);
    });
    test('should send a bulk request corresponding to the items in the extension request queue when called', function () {
      var boxEdit = new BoxEdit();
      boxEdit.client = {
        sendRequest: jest.fn().mockResolvedValue(unoDosResolution)
      };
      boxEdit.queueGetNativeAppNameFromLocal('uno');
      boxEdit.queueGetNativeAppNameFromLocal('dos');
      boxEdit.processExtensionRequestQueue();
      var parsedRequestData = JSON.parse(boxEdit.client.sendRequest.mock.calls[0]);
      expect(parsedRequestData).toEqual({
        request_type: 'get_default_application',
        extension: ['uno', 'dos']
      });
    });
    test('should resolve enqueued requests when the app for one filetype is requested', function (done) {
      var resolution = {
        default_application_name: [{
          pdf: 'Acrobat'
        }]
      };
      var boxEdit = new BoxEdit();
      boxEdit.client = {
        sendRequest: jest.fn().mockResolvedValue(resolution)
      };
      boxEdit.queueGetNativeAppNameFromLocal('pdf').then(function (result) {
        expect(result).toEqual('Acrobat');
        done();
      });
      boxEdit.processExtensionRequestQueue();
    });
    test('should resolve enqueued request when the apps for multiple filetypes are requested', function (done) {
      var resolution = {
        default_application_name: [{
          pdf: 'Acrobat'
        }, {
          docx: 'Word'
        }]
      };
      var boxEdit = new BoxEdit();
      boxEdit.client = {
        sendRequest: jest.fn().mockResolvedValue(resolution)
      };
      Promise.all([boxEdit.queueGetNativeAppNameFromLocal('pdf'), boxEdit.queueGetNativeAppNameFromLocal('docx')]).then(function (result) {
        expect(result).toEqual(['Acrobat', 'Word']);
        done();
      });
      boxEdit.processExtensionRequestQueue();
    });
  });
  describe('queueGetNativeAppNameFromLocal()', function () {
    test('should return the app name when called for an extension whose app is known',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var boxEdit, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              boxEdit = new BoxEdit();
              boxEdit.extensionRequestQueue.set('docx', {
                promise: Promise.resolve('Word'),
                resolve: function resolve() {},
                reject: function reject() {}
              });
              _context.next = 4;
              return boxEdit.queueGetNativeAppNameFromLocal('docx');

            case 4:
              result = _context.sent;
              expect(result).toEqual('Word');

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should create a new item in the extensionRequestQueue when called for an extension whose app is not yet known', function () {
      var boxEdit = new BoxEdit();
      expect(boxEdit.extensionRequestQueue.has('abc')).toBe(false);
      boxEdit.queueGetNativeAppNameFromLocal('abc');
      var queueItem = boxEdit.extensionRequestQueue.get('abc');
      expect(queueItem.promise).toBeInstanceOf(Promise);
      expect(queueItem.resolve).toBeInstanceOf(Function);
      expect(queueItem.reject).toBeInstanceOf(Function);
    });
  });
  describe('getAppForExtension()', function () {
    test('should set a timeout to process the queue and return the app extension when called', function (done) {
      var boxEdit = new BoxEdit();
      boxEdit.processExtensionRequestQueue = jest.fn();
      boxEdit.queueGetNativeAppNameFromLocal = jest.fn().mockResolvedValue('Word');
      boxEdit.getAppForExtension('docx').then(function (result) {
        expect(result).toEqual('Word');
        expect(boxEdit.processExtensionRequestQueue).toBeCalled();
        done();
      });
      jest.advanceTimersByTime(101);
    });
  });
  describe('canOpenWithBoxEdit()', function () {
    describe.each([[{
      pdf: 'Acrobat'
    }], [{
      pdf: 'Acrobat',
      docx: 'Word'
    }]])('%o', function (extToAppArray) {
      test('should aggregate the results of calls to getAppForExtension',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var boxEdit, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // const extensions = extToAppArray.map(pair => pair[0]);
                boxEdit = new BoxEdit();
                boxEdit.getAppForExtension = jest.fn(function (extension) {
                  return Promise.resolve(extToAppArray[extension]);
                });
                _context2.next = 4;
                return boxEdit.canOpenWithBoxEdit(Object.keys(extToAppArray));

              case 4:
                result = _context2.sent;
                Object.keys(extToAppArray).forEach(function (extension) {
                  expect(result.get(extension)).toEqual(extToAppArray[extension]);
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
    });
    test('should gracefully handle when no app is available to open a file',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var boxEdit, resultMap, result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              boxEdit = new BoxEdit();
              resultMap = {
                pdf: 'Acrobat',
                xlsx: ''
              };
              boxEdit.getAppForExtension = jest.fn(function (extension) {
                return resultMap[extension];
              });
              _context3.next = 5;
              return boxEdit.canOpenWithBoxEdit(['pdf', 'xlsx']);

            case 5:
              result = _context3.sent;
              [['pdf', 'Acrobat'], ['xlsx', '']].forEach(function (pair) {
                var _pair = _slicedToArray(pair, 2),
                    extension = _pair[0],
                    appName = _pair[1];

                expect(result.get(extension)).toEqual(appName);
              });

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('openFile()', function () {
    test('should call #sendCommand on the appropriate channel with the correct data when called',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var expectedBrowser, itemID, expected, token, boxEdit, result, commandData;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              expectedBrowser = 'Opera';
              Browser.getName = jest.fn().mockReturnValue(expectedBrowser);
              itemID = '1234';
              expected = 'success';
              token = {
                data: {
                  auth_code: 'foo'
                }
              };
              boxEdit = new BoxEdit();
              boxEdit.client = {
                sendCommand: jest.fn().mockResolvedValue(expected)
              };
              _context4.next = 9;
              return boxEdit.openFile(itemID, token);

            case 9:
              result = _context4.sent;
              // TODO. more assertions as appropriate.
              commandData = JSON.parse(boxEdit.client.sendCommand.mock.calls[0][0]);
              expect(result).toEqual(expected);
              expect(commandData.command_type).toEqual('launch_application');
              expect(commandData.file_id).toEqual(itemID);
              expect(commandData.auth_code).toEqual(token.data.auth_code);
              expect(commandData.browser_type).toEqual(expectedBrowser);

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
});