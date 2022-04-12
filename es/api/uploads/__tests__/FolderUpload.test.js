function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import noop from 'lodash/noop';
import FolderUpload from '../FolderUpload';
var folderUploadInstance;
var destinationFolderID = '123';
jest.mock('../../../utils/uploads', function () {
  return _objectSpread({}, require.requireActual('../../../utils/uploads'), {
    getDataTransferItem: jest.fn(function (item) {
      return item.item || item;
    }),
    getEntryFromDataTransferItem: jest.fn(function (item) {
      return item;
    }),
    getDataTransferItemAPIOptions: jest.fn(function (item) {
      return item.options || {};
    })
  });
});
describe('api/uploads/FolderUpload', function () {
  beforeEach(function () {
    folderUploadInstance = new FolderUpload(noop, destinationFolderID, noop, true, {});
  });
  describe('upload()', function () {
    test('should upload folder node',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var upload1, successCallbackMock, errorCallback;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              upload1 = jest.fn();
              successCallbackMock = jest.fn();

              errorCallback = function errorCallback() {
                return 'errorCallback';
              };

              folderUploadInstance.folder = {
                upload: upload1,
                getFolderId: jest.fn(function () {
                  return 'f_123';
                })
              };
              _context.next = 6;
              return folderUploadInstance.upload({
                errorCallback: errorCallback,
                successCallback: successCallbackMock
              });

            case 6:
              expect(upload1).toHaveBeenCalledWith(destinationFolderID, errorCallback, true);
              expect(successCallbackMock).toHaveBeenCalledWith([{
                id: 'f_123'
              }]);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('buildFolderTreeFromWebkitRelativePath()', function () {
    test('should construct folders correctly when API options exist', function () {
      folderUploadInstance.buildFolderTreeFromWebkitRelativePath([{
        file: {
          webkitRelativePath: 'a'
        },
        options: {}
      }, {
        file: {
          name: 'f1',
          webkitRelativePath: 'a/f1'
        },
        options: {}
      }, {
        file: {
          name: 'f2',
          webkitRelativePath: 'a/f2'
        },
        options: {}
      }, {
        file: {
          name: 'f3',
          webkitRelativePath: 'a/b/f3'
        },
        options: {}
      }, {
        file: {
          name: 'f4',
          webkitRelativePath: 'a/c/f4'
        },
        options: {}
      }]); // /
      // - a/

      expect(folderUploadInstance.folder.name).toEqual('a'); // /a/
      // - f1
      // - f2
      // - b/
      // - c/

      var folderA = folderUploadInstance.folder;
      expect(Object.keys(folderA.folders)).toHaveLength(2);
      expect(Object.keys(folderA.folders)).toEqual(['b', 'c']);
      expect(folderA.files).toHaveLength(2);
      expect(folderA.files.map(function (item) {
        return item.name;
      })).toEqual(['f1', 'f2']); // /a/b
      // - f3

      var folderB = folderA.folders.b;
      expect(Object.keys(folderB.folders)).toHaveLength(0);
      expect(folderB.files).toHaveLength(1);
      expect(folderB.files.map(function (item) {
        return item.name;
      })).toEqual(['f3']); // /a/c
      // - f4

      var folderC = folderA.folders.c;
      expect(Object.keys(folderC.folders)).toHaveLength(0);
      expect(folderC.files).toHaveLength(1);
      expect(folderC.files.map(function (item) {
        return item.name;
      })).toEqual(['f4']);
    });
    test('should construct folders correctly when API options are missing', function () {
      folderUploadInstance = new FolderUpload(noop, destinationFolderID, noop, false, {});
      folderUploadInstance.buildFolderTreeFromWebkitRelativePath([{
        webkitRelativePath: 'a'
      }, {
        name: 'f1',
        webkitRelativePath: 'a/f1'
      }, {
        name: 'f2',
        webkitRelativePath: 'a/f2'
      }, {
        name: 'f3',
        webkitRelativePath: 'a/b/f3'
      }, {
        name: 'f4',
        webkitRelativePath: 'a/c/f4'
      }]); // /
      // - a/

      expect(folderUploadInstance.folder.name).toEqual('a'); // /a/
      // - f1
      // - f2
      // - b/
      // - c/

      var folderA = folderUploadInstance.folder;
      expect(Object.keys(folderA.folders)).toHaveLength(2);
      expect(Object.keys(folderA.folders)).toEqual(['b', 'c']);
      expect(folderA.files).toHaveLength(2);
      expect(folderA.files.map(function (item) {
        return item.name;
      })).toEqual(['f1', 'f2']); // /a/b
      // - f3

      var folderB = folderA.folders.b;
      expect(Object.keys(folderB.folders)).toHaveLength(0);
      expect(folderB.files).toHaveLength(1);
      expect(folderB.files.map(function (item) {
        return item.name;
      })).toEqual(['f3']); // /a/c
      // - f4

      var folderC = folderA.folders.c;
      expect(Object.keys(folderC.folders)).toHaveLength(0);
      expect(folderC.files).toHaveLength(1);
      expect(folderC.files.map(function (item) {
        return item.name;
      })).toEqual(['f4']);
    });
  });
  describe('buildFolderTreeFromDataTransferItem()', function () {
    test('should construct folders correctly',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var createFolderUploadNodeMock;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              createFolderUploadNodeMock = jest.fn();
              folderUploadInstance.createFolderUploadNode = createFolderUploadNodeMock;
              _context2.next = 4;
              return folderUploadInstance.buildFolderTreeFromDataTransferItem([{
                item: {
                  name: 'f1',
                  webkitRelativePath: 'a/f1'
                },
                options: {}
              }]);

            case 4:
              expect(createFolderUploadNodeMock).toHaveBeenCalledTimes(1);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('createFolderUploadNode()', function () {
    test('should create FolderUploadNode correctly', function () {
      var name = 'hi';
      var apiOptions = {
        apiOptions: true
      };
      var entry = {
        entry: true
      };
      var nodeInstance = folderUploadInstance.createFolderUploadNode(name, apiOptions, entry);
      expect(nodeInstance.name).toEqual(name);
      expect(nodeInstance.fileAPIOptions).toEqual(apiOptions);
      expect(nodeInstance.entry).toEqual(entry);
    });
  });
});