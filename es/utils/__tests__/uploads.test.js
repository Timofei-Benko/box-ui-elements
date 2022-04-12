function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            str           | expectedResult\n            ", "         | ", "\n            ", "        | ", "\n            ", "        | ", "\n            ", "        | ", "\n            ", "      | ", "\n            ", "       | ", "\n            ", "  | ", "\n            ", " | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            file                                                          | expectedResult\n            ", "                            | ", "\n            ", "                           | ", "\n            ", "     | ", "\n            ", "                    | ", "\n            ", "                                                         | ", "\n            ", "                        | ", "\n            ", "                       | ", "\n            ", " | ", "\n            ", "                | ", "\n            ", "                                                         | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import browser from '../Browser';
import { toISOStringNoMS, getFileLastModifiedAsISONoMSIfPossible, tryParseJson, isDataTransferItemAFolder, isDataTransferItemAPackage, isMultiputSupported, getFileFromDataTransferItem, getPackageFileFromDataTransferItem, doesFileContainAPIOptions, doesDataTransferItemContainAPIOptions, getFile, getDataTransferItem, getFileAPIOptions, getDataTransferItemAPIOptions, DEFAULT_API_OPTIONS, getFileId, getDataTransferItemId } from '../uploads';
var mockFile = {
  name: 'hi'
};
var entry = {
  name: 'hi',
  file: function file(fn) {
    fn(mockFile);
  }
};
var mockItem = {
  kind: 'file',
  webkitGetAsEntry: function webkitGetAsEntry() {
    return entry;
  }
};
var options = {
  options: true
};
describe('util/uploads', function () {
  describe('toISOStringNoMS()', function () {
    test('should format the time string properly', function () {
      var d = new Date(1273912371111);
      expect(toISOStringNoMS(d)).toBe('2010-05-15T08:32:51Z');
    });
  });
  describe('getFileLastModifiedAsISONoMSIfPossible()', function () {
    // Test cases in order
    // file with valid last modified
    // file with non-numeric last modified (string)
    // I don't know of a browser that has lastModified as a Date object, but I just added
    // these two test cases to confirm that our code does something reasonable (i.e. return
    // a string or null, but not crash).
    // file with non-numeric lastModified (valid date)
    // file with non-numeric lastModified (invalid Date)
    // file no lastModified
    test.each(_templateObject(), {
      lastModified: 1483326245678
    }, '2017-01-02T03:04:05Z', {
      lastModified: 'not a number'
    }, null, {
      lastModified: new Date('2017-01-02T03:04:05.678Z')
    }, '2017-01-02T03:04:05Z', {
      lastModified: new Date('not valid')
    }, null, {}, null, {
      lastModifiedDate: 1483326245678
    }, '2017-01-02T03:04:05Z', {
      lastModifiedDate: 'not a number'
    }, null, {
      lastModifiedDate: new Date('2017-01-02T03:04:05.678Z')
    }, '2017-01-02T03:04:05Z', {
      lastModifiedDate: new Date('not valid')
    }, null, {}, null)('should return the properly formatted date when possible and return null otherwise', function (_ref) {
      var file = _ref.file,
          expectedResult = _ref.expectedResult;
      expect(getFileLastModifiedAsISONoMSIfPossible(file)).toBe(expectedResult);
    });
  });
  describe('tryParseJson()', function () {
    test.each(_templateObject2(), '', null, 'a', null, '{', null, '1', 1, '"a"', 'a', '{}', {}, '[1,2,3]', [1, 2, 3], '{"a": 1}', {
      a: 1
    })('should return correct results', function (_ref2) {
      var str = _ref2.str,
          expectedResult = _ref2.expectedResult;
      expect(tryParseJson(str)).toEqual(expectedResult);
    });
  });
  describe('doesFileContainAPIOptions()', function () {
    test('should return true when argument is UploadFileWithAPIOptions type', function () {
      expect(doesFileContainAPIOptions({
        file: mockFile,
        options: options
      })).toBeTruthy();
    });
    test('should return false when argument is UploadFile type', function () {
      expect(doesFileContainAPIOptions(mockFile)).toBeFalsy();
    });
  });
  describe('doesDataTransferItemContainAPIOptions()', function () {
    test('should return true when argument is UploadDataTransferItemWithAPIOptions type', function () {
      expect(doesDataTransferItemContainAPIOptions({
        item: mockItem,
        options: options
      })).toBeTruthy();
    });
    test('should return false when argument is DataTransferItem type', function () {
      expect(doesDataTransferItemContainAPIOptions(mockItem)).toBeFalsy();
    });
  });
  describe('getFile()', function () {
    test('should return file when argument is UploadFileWithAPIOptions type', function () {
      expect(getFile({
        file: mockFile,
        options: options
      })).toEqual(mockFile);
    });
    test('should return file when argument is UploadFile type', function () {
      expect(getFile(mockFile)).toEqual(mockFile);
    });
  });
  describe('getDataTransferItem()', function () {
    test('should return item when argument is UploadDataTransferItemWithAPIOptions type', function () {
      expect(getDataTransferItem({
        item: mockItem,
        options: options
      })).toEqual(mockItem);
    });
    test('should return item when argument is DataTransferItem type', function () {
      expect(getDataTransferItem(mockItem)).toEqual(mockItem);
    });
  });
  describe('getFileAPIOptions()', function () {
    test('should return options when argument is UploadFileWithAPIOptions type', function () {
      expect(getFileAPIOptions({
        file: mockFile,
        options: options
      })).toEqual(options);
    });
    test('should return DEFAULT_API_OPTIONS when argument is UploadFile type', function () {
      expect(getFileAPIOptions(mockFile)).toEqual(DEFAULT_API_OPTIONS);
    });
  });
  describe('getDataTransferItemAPIOptions()', function () {
    test('should return options when argument is UploadDataTransferItemWithAPIOptions type', function () {
      expect(getDataTransferItemAPIOptions({
        item: mockItem,
        options: options
      })).toEqual(options);
    });
    test('should return DEFAULT_API_OPTIONS when argument is DataTransferItem type', function () {
      expect(getDataTransferItemAPIOptions(mockItem)).toEqual(DEFAULT_API_OPTIONS);
    });
  });
  describe('getFileFromDataTransferItem()', function () {
    test('should return file of UploadFileWithAPIOptions type when itemData is UploadDataTransferItemWithAPIOptions type',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var itemData;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              itemData = {
                item: mockItem,
                options: options
              };
              _context.t0 = expect;
              _context.next = 4;
              return getFileFromDataTransferItem(itemData);

            case 4:
              _context.t1 = _context.sent;
              _context.t2 = {
                file: mockFile,
                options: options
              };
              (0, _context.t0)(_context.t1).toEqual(_context.t2);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('getPackageFileFromDataTransferItem()', function () {
    test('should return file of UploadFileWithAPIOptions type when itemData is UploadDataTransferItemWithAPIOptions type',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var mockPackageItem, itemData;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              mockPackageItem = {
                getAsFile: jest.fn(function () {
                  return mockFile;
                }),
                webkitGetAsEntry: function webkitGetAsEntry() {
                  return entry;
                }
              };
              itemData = {
                item: mockPackageItem,
                options: options
              };
              _context2.t0 = expect;
              _context2.next = 5;
              return getPackageFileFromDataTransferItem(itemData);

            case 5:
              _context2.t1 = _context2.sent;
              _context2.t2 = {
                file: mockFile,
                options: options
              };
              (0, _context2.t0)(_context2.t1).toEqual(_context2.t2);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('isDataTransferItemAPackage()', function () {
    test('should be false if data transfer item thinks it is a folder', function () {
      var folderEntry = {
        isDirectory: true
      };
      var folderItem = {
        kind: '',
        webkitGetAsEntry: function webkitGetAsEntry() {
          return folderEntry;
        }
      };
      var itemData = {
        item: folderItem,
        options: options
      };
      expect(isDataTransferItemAPackage(itemData)).toBeFalsy();
    });
    test('should be false if data transfer item thinks it is a file', function () {
      var fileEntry = {
        isDirectory: false,
        isFile: true
      };
      var folderItem = {
        kind: 'file',
        webkitGetAsEntry: function webkitGetAsEntry() {
          return fileEntry;
        }
      };
      var itemData = {
        item: folderItem,
        options: options
      };
      expect(isDataTransferItemAPackage(itemData)).toBeFalsy();
    });
    test('should be true if data transfer item has both identifies a directory but has kind = file and type = application/zip', function () {
      var packageEntry = {
        isDirectory: true,
        isFile: false
      };
      var folderItem = {
        kind: 'file',
        type: 'application/zip',
        webkitGetAsEntry: function webkitGetAsEntry() {
          return packageEntry;
        }
      };
      var itemData = {
        item: folderItem,
        options: options
      };
      expect(isDataTransferItemAPackage(itemData)).toBeTruthy();
    });
    test('should be false if data transfer item has both identifies a directory but only has kind = file', function () {
      var packageEntry = {
        isDirectory: true,
        isFile: false
      };
      var folderItem = {
        kind: 'file',
        webkitGetAsEntry: function webkitGetAsEntry() {
          return packageEntry;
        }
      };
      var itemData = {
        item: folderItem,
        options: options
      };
      expect(isDataTransferItemAPackage(itemData)).toBeFalsy();
    });
  });
  describe('isDataTransferItemAFolder()', function () {
    test('should return true if item is a folder', function () {
      var folderEntry = {
        isDirectory: true
      };
      var folderItem = {
        kind: '',
        webkitGetAsEntry: function webkitGetAsEntry() {
          return folderEntry;
        }
      };
      var itemData = {
        item: folderItem,
        options: options
      };
      expect(isDataTransferItemAFolder(itemData)).toBeTruthy();
    });
    test('should return false if item is not a folder', function () {
      var fileEntry = {
        isDirectory: false
      };
      var fileItem = {
        kind: '',
        webkitGetAsEntry: function webkitGetAsEntry() {
          return fileEntry;
        }
      };
      var itemData = {
        item: fileItem,
        options: options
      };
      expect(isDataTransferItemAFolder(itemData)).toBeFalsy();
    });
    test('should return false if item does not have an entry', function () {
      var fileItem = {
        kind: '',
        webkitGetAsEntry: function webkitGetAsEntry() {
          return undefined;
        }
      };
      expect(isDataTransferItemAFolder(fileItem)).toBeFalsy();
    });
  });
  describe('getFileId()', function () {
    test('should return file id correctly when file does not contain API options', function () {
      var file = {
        name: 'hi'
      };
      expect(getFileId(file)).toBe('hi');
    });
    test('should return file id correctly when file does contain API options', function () {
      var file = {
        file: {
          name: 'hi'
        },
        options: {
          folderId: '0',
          uploadInitTimestamp: 123123
        }
      };
      expect(getFileId(file)).toBe('hi_0_123123');
    });
  });
  describe('getFileId()', function () {
    test('should return file id correctly when file does not contain API options', function () {
      var file = {
        name: 'hi'
      };
      expect(getFileId(file)).toBe('hi');
    });
    test('should return file id correctly when file does contain API options', function () {
      var file = {
        file: {
          name: 'hi'
        },
        options: {
          folderId: '0',
          uploadInitTimestamp: 123123
        }
      };
      expect(getFileId(file)).toBe('hi_0_123123');
    });
  });
  describe('getDataTransferItemId()', function () {
    var rootFolderId = 0;
    var now = Date.now();
    Date.now = jest.fn(function () {
      return now;
    });
    test('should return item id correctly when item does not contain API options', function () {
      expect(getDataTransferItemId(mockItem, rootFolderId)).toBe('hi');
    });
    test('should return item id correctly when item does contain API options', function () {
      var item = {
        item: mockItem,
        options: {
          folderId: '0',
          uploadInitTimestamp: 123123
        }
      };
      expect(getDataTransferItemId(item, rootFolderId)).toBe('hi_0_123123');
    });
  });
  describe('isMultiputSupported()', function () {
    var windowSpy;
    beforeEach(function () {
      windowSpy = jest.spyOn(window, 'window', 'get');
    });
    afterEach(function () {
      windowSpy.mockRestore();
    });
    test.each([['mobile safari', true, false], ['mobile other browsers', false, true]])('should return whether multiput is supported on device: %o', function (test, mobileSafari, expected) {
      windowSpy.mockImplementation(function () {
        return {
          crypto: {
            subtle: true
          },
          location: {
            protocol: 'https:'
          }
        };
      });
      browser.isMobileSafari = jest.fn().mockReturnValueOnce(mobileSafari);
      expect(isMultiputSupported()).toEqual(expected);
    });
  });
});