function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            extension                             | expectedResult\n            ", "          | ", "\n            ", "        | ", "\n            ", "        | ", "\n            ", " | ", "\n            ", "                             | ", "\n            ", "                              | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { FILE_EXTENSION_GOOGLE_DOC, FILE_EXTENSION_GOOGLE_SHEET, FILE_EXTENSION_GOOGLE_SLIDE, FILE_EXTENSION_GOOGLE_SLIDE_LEGACY } from '../../constants';
import { isBoxNote, getTypedFileId, getTypedFolderId, getFileExtension, isGSuiteExtension } from '../file';
describe('util/file', function () {
  describe('isBoxNote()', function () {
    test('should false when file is not a box note', function () {
      expect(isBoxNote({
        extension: 'foo'
      })).toBe(false);
    });
    test('should true when file is a box note', function () {
      expect(isBoxNote({
        extension: 'boxnote'
      })).toBe(true);
    });
  });
  describe('getTypedFileId()', function () {
    test('should return typed file id correctly', function () {
      expect(getTypedFileId('foo')).toBe('file_foo');
    });
  });
  describe('getTypedFolderId()', function () {
    test('should return typed folder id correctly', function () {
      expect(getTypedFolderId('foo')).toBe('folder_foo');
    });
  });
  describe('getFileExtension()', function () {
    test.each([['filename.txt', 'txt'], ['filename.backup.mp4', 'mp4'], ['filename..temp.pdf', 'pdf'], [{
      name: 'test.pdf'
    }, ''], ['invalidfilenamepdf', '']])('should return extension of file correctly', function (filename, extension) {
      expect(getFileExtension(filename)).toBe(extension);
    });
  });
  describe('isGSuiteExtension()', function () {
    test.each(_templateObject(), FILE_EXTENSION_GOOGLE_DOC, true, FILE_EXTENSION_GOOGLE_SHEET, true, FILE_EXTENSION_GOOGLE_SLIDE, true, FILE_EXTENSION_GOOGLE_SLIDE_LEGACY, true, 'docx', false, 'png', false)('should return the correct value for a $extension', function (_ref) {
      var extension = _ref.extension,
          expectedResult = _ref.expectedResult;
      expect(isGSuiteExtension(extension)).toBe(expectedResult);
    });
  });
});