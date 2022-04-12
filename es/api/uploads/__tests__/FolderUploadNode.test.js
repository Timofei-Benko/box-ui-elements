function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import noop from 'lodash/noop';
import FolderUploadNode from '../FolderUploadNode';
import FolderAPI from '../../Folder';
import { ERROR_CODE_ITEM_NAME_IN_USE, STATUS_COMPLETE, ERROR_CODE_UPLOAD_CHILD_FOLDER_FAILED } from '../../../constants';
jest.mock('../../Folder');
jest.mock('../../../utils/uploads', function () {
  return _objectSpread({}, require.requireActual('../../../utils/uploads'), {
    getFileFromEntry: jest.fn(function (entry) {
      return entry;
    })
  });
});
var folderUploadNodeInstance;
var folderCreateMock;
describe('api/uploads/FolderUploadNode', function () {
  var name = 'hi';
  beforeEach(function () {
    folderUploadNodeInstance = new FolderUploadNode(name, noop, noop, {}, {});
    folderCreateMock = jest.fn(function (a, b, resolve) {
      resolve();
    });
    FolderAPI.mockClear();
    FolderAPI.mockImplementation(function () {
      return {
        create: folderCreateMock
      };
    });
  });
  describe('upload()', function () {
    test('should call createAndUploadFolder(), addFilesToUploadQueue() and uploadChildFolders()',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var errorCallback, parentFolderId, isRoot, files;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              errorCallback = function errorCallback() {
                return 'errorCallback';
              };

              parentFolderId = '0';
              isRoot = true;
              files = [{
                file: 1
              }];
              folderUploadNodeInstance.createAndUploadFolder = jest.fn(function () {
                return Promise.resolve();
              });
              folderUploadNodeInstance.addFilesToUploadQueue = jest.fn();
              folderUploadNodeInstance.uploadChildFolders = jest.fn();
              folderUploadNodeInstance.getFormattedFiles = jest.fn(function () {
                return files;
              });
              folderUploadNodeInstance.getFolderId = jest.fn(function () {
                return 123;
              });
              _context.next = 11;
              return folderUploadNodeInstance.upload(parentFolderId, errorCallback, isRoot);

            case 11:
              expect(folderUploadNodeInstance.createAndUploadFolder).toHaveBeenCalledWith(errorCallback, isRoot);
              expect(folderUploadNodeInstance.addFilesToUploadQueue).toHaveBeenCalledWith(files, expect.any(Function), true);
              expect(folderUploadNodeInstance.uploadChildFolders).toHaveBeenCalledWith(errorCallback);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('uploadChildFolders()', function () {
    test('should upload all child folders',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var errorCallback, upload1, upload2;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              errorCallback = function errorCallback() {
                return 'errorCallback';
              };

              upload1 = jest.fn();
              upload2 = jest.fn();
              folderUploadNodeInstance.folders = {
                a: {
                  upload: upload1
                },
                b: {
                  upload: upload2
                }
              };
              folderUploadNodeInstance.folderId = '123';
              _context2.next = 7;
              return folderUploadNodeInstance.uploadChildFolders(errorCallback);

            case 7:
              expect(upload1).toHaveBeenCalledWith(folderUploadNodeInstance.folderId, errorCallback);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('createAndUploadFolder()', function () {
    test('should create folder',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var folderId, errorCallback, isRoot;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              folderId = '1';

              errorCallback = function errorCallback() {
                return 'errorCallback';
              };

              isRoot = true;
              folderUploadNodeInstance.createFolder = jest.fn(function () {
                return {
                  id: folderId
                };
              });
              folderUploadNodeInstance.addFolderToUploadQueue = jest.fn();
              _context3.next = 7;
              return folderUploadNodeInstance.createAndUploadFolder(errorCallback, isRoot);

            case 7:
              expect(folderUploadNodeInstance.createFolder).toHaveBeenCalledWith();
              expect(folderUploadNodeInstance.folderId).toBe(folderId);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    test('should call errorCallback when create folder fails and error code is not ITEM_NAME_IN_USE',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var errorCallback, isRoot, error;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              errorCallback = jest.fn();
              isRoot = true;
              error = {
                code: 'random'
              };
              folderUploadNodeInstance.createFolder = jest.fn(function () {
                return Promise.reject(error);
              });
              folderUploadNodeInstance.addFolderToUploadQueue = jest.fn();
              _context4.next = 7;
              return folderUploadNodeInstance.createAndUploadFolder(errorCallback, isRoot);

            case 7:
              expect(errorCallback).toHaveBeenCalledWith(error);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    test('should recovery correctly from ITEM_NAME_IN_USE',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var errorCallback, folderId, isRoot, error;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              errorCallback = jest.fn();
              folderId = '1';
              isRoot = true;
              error = {
                code: ERROR_CODE_ITEM_NAME_IN_USE,
                context_info: {
                  conflicts: [{
                    id: folderId
                  }]
                }
              };
              folderUploadNodeInstance.createFolder = jest.fn(function () {
                return Promise.reject(error);
              });
              folderUploadNodeInstance.addFolderToUploadQueue = jest.fn();
              _context5.next = 8;
              return folderUploadNodeInstance.createAndUploadFolder(errorCallback, isRoot);

            case 8:
              expect(errorCallback).not.toHaveBeenCalledWith(error);
              expect(folderUploadNodeInstance.folderId).toBe(folderId);

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    test('should call addFolderToUploadQueue if the sub-folder(s) already exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var folderId, errorCallback, isRoot, error;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              folderId = '1';
              errorCallback = jest.fn();
              isRoot = false;
              error = {
                code: ERROR_CODE_ITEM_NAME_IN_USE,
                context_info: {
                  conflicts: [{
                    id: folderId
                  }]
                }
              };
              folderUploadNodeInstance.name = name;
              folderUploadNodeInstance.createFolder = jest.fn(function () {
                return Promise.reject(error);
              });
              folderUploadNodeInstance.addFolderToUploadQueue = jest.fn();
              _context6.next = 9;
              return folderUploadNodeInstance.createAndUploadFolder(errorCallback, isRoot);

            case 9:
              expect(errorCallback).not.toHaveBeenCalledWith(error);
              expect(errorCallback).not.toHaveBeenCalledWith({
                code: ERROR_CODE_UPLOAD_CHILD_FOLDER_FAILED
              });
              expect(folderUploadNodeInstance.addFolderToUploadQueue).toHaveBeenCalledWith({
                extension: '',
                name: name,
                status: STATUS_COMPLETE,
                isFolder: true,
                size: 1,
                progress: 100
              });

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    test('should call addFolderToUploadQueue when folder is created successfully for non-root folder',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var folderId, errorCallback, isRoot;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              folderId = '1';

              errorCallback = function errorCallback() {
                return 'errorCallback';
              };

              isRoot = false;
              folderUploadNodeInstance.name = name;
              folderUploadNodeInstance.createFolder = jest.fn(function () {
                return {
                  id: folderId
                };
              });
              folderUploadNodeInstance.addFolderToUploadQueue = jest.fn();
              _context7.next = 8;
              return folderUploadNodeInstance.createAndUploadFolder(errorCallback, isRoot);

            case 8:
              expect(folderUploadNodeInstance.addFolderToUploadQueue).toHaveBeenCalledWith({
                extension: '',
                name: name,
                status: STATUS_COMPLETE,
                isFolder: true,
                size: 1,
                progress: 100
              });

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
    test('should not addFolderToUploadQueue() when folder is created successfully for root folder',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var folderId, errorCallback, isRoot;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              folderId = '1';

              errorCallback = function errorCallback() {
                return 'errorCallback';
              };

              isRoot = true;
              folderUploadNodeInstance.name = name;
              folderUploadNodeInstance.createFolder = jest.fn(function () {
                return {
                  id: folderId
                };
              });
              folderUploadNodeInstance.addFolderToUploadQueue = jest.fn();
              _context8.next = 8;
              return folderUploadNodeInstance.createAndUploadFolder(errorCallback, isRoot);

            case 8:
              expect(folderUploadNodeInstance.addFolderToUploadQueue).not.toHaveBeenCalled();

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
  });
  describe('getFormattedFiles()', function () {
    test('should return correctly formatted file', function () {
      var now = Date.now();
      Date.now = jest.fn(function () {
        return now;
      });
      var file1 = {
        name: 1
      };
      var file2 = {
        name: 2
      };
      folderUploadNodeInstance.files = [file1, file2];
      folderUploadNodeInstance.folderId = '1';
      folderUploadNodeInstance.fileAPIOptions = {
        a: 1,
        b: 2
      };
      var data = folderUploadNodeInstance.getFormattedFiles();
      expect(data).toEqual([{
        file: file1,
        options: _objectSpread({}, folderUploadNodeInstance.fileAPIOptions, {
          folderId: folderUploadNodeInstance.folderId,
          uploadInitTimestamp: now
        })
      }, {
        file: file2,
        options: _objectSpread({}, folderUploadNodeInstance.fileAPIOptions, {
          folderId: folderUploadNodeInstance.folderId,
          uploadInitTimestamp: now
        })
      }]);
    });
  });
  describe('createFolder()', function () {
    test('create folder with folderAPI',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var parentFolderId;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              parentFolderId = '0';
              folderUploadNodeInstance.folderId = '123';
              folderUploadNodeInstance.folderId = '123';
              folderUploadNodeInstance.parentFolderId = parentFolderId;
              _context9.next = 6;
              return folderUploadNodeInstance.createFolder();

            case 6:
              expect(FolderAPI).toHaveBeenCalled();
              expect(folderCreateMock).toHaveBeenCalled();

            case 8:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
  });
  describe('buildCurrentFolderFromEntry()', function () {
    test('should resolve when entry is empty',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              folderUploadNodeInstance.entry = undefined;
              _context10.prev = 1;
              _context10.next = 4;
              return folderUploadNodeInstance.buildCurrentFolderFromEntry();

            case 4:
              _context10.next = 9;
              break;

            case 6:
              _context10.prev = 6;
              _context10.t0 = _context10["catch"](1);
              throw Error('buildCurrentFolderFromEntry throws an error');

            case 9:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[1, 6]]);
    })));
    test('should readEntry() when entry is not empty',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var reader;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              reader = {
                reader: true
              };

              folderUploadNodeInstance.readEntry = function (readerParam, resolve) {
                expect(readerParam).toEqual(reader);
                resolve();
              };

              folderUploadNodeInstance.entry = {
                createReader: function createReader() {
                  return reader;
                }
              };
              _context11.next = 5;
              return folderUploadNodeInstance.buildCurrentFolderFromEntry();

            case 5:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
  });
  describe('readEntry()', function () {
    test('should call readEntries() on the reader instance',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      var readEntriesMock, reader;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              readEntriesMock = jest.fn();
              reader = {
                readEntries: readEntriesMock
              };
              _context12.next = 4;
              return folderUploadNodeInstance.readEntry(reader, noop);

            case 4:
              expect(readEntriesMock).toHaveBeenCalledTimes(1);

            case 5:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
  });
  describe('createFolderUploadNodesFromEntries()', function () {
    test('should create folders and files from entries',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13() {
      var entries;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              entries = [{
                name: '1',
                isFile: true
              }, {
                name: '2',
                isFile: false
              }, {
                name: '3',
                isFile: true
              }];
              _context13.next = 3;
              return folderUploadNodeInstance.createFolderUploadNodesFromEntries(entries);

            case 3:
              expect(folderUploadNodeInstance.files).toEqual([{
                name: '1',
                isFile: true
              }, {
                name: '3',
                isFile: true
              }]);
              expect(Object.keys(folderUploadNodeInstance.folders)).toHaveLength(1);
              expect(folderUploadNodeInstance.folders['2'].name).toEqual('2');
              expect(folderUploadNodeInstance.folders['2'].entry).toEqual(entries[1]);

            case 7:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
  });
});