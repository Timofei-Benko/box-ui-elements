function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n            index | metadataQuery\n            ", "  | ", "\n            ", "  | ", "\n            ", "  | ", "\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            oldValue     | newValue     | ops\n            ", " | ", "       | ", "\n            ", "       | ", "       | ", "\n            ", "       | ", " | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            entryIndex | metadataResponseEntry | flattenedResponseEntry\n            ", "       | ", "         | ", "\n            ", "       | ", "         | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            entryIndex | metadataResponseEntry  | flattenedMetadataEntry\n            ", "       | ", " | ", "\n            ", "       | ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import MetadataQueryAPIHelper from '../MetadataQueryAPIHelper';
import { ITEM_TYPE_FILE, JSON_PATCH_OP_ADD, JSON_PATCH_OP_REMOVE, JSON_PATCH_OP_REPLACE, JSON_PATCH_OP_TEST } from '../../../common/constants';
import { FIELD_METADATA, FIELD_NAME } from '../../../constants';
describe('features/metadata-based-view/MetadataQueryAPIHelper', function () {
  var metadataQueryAPIHelper;
  var templateScope = 'enterprise_12345';
  var templateKey = 'awesomeTemplate';
  var metadataInstance = {
    instance: 'instance'
  };
  var metadataInstanceId1 = 'metadataInstanceId1';
  var metadataInstanceId2 = 'metadataInstanceId2';
  var options = [{
    id: '3887b73d-0087-43bb-947e-0dff1543bdfb',
    key: 'yes'
  }, {
    id: '3393eed2-f254-4fd0-a7ff-cd9a5f75e222',
    key: 'no'
  }];
  var template = {
    id: 'cdb8c36d-4470-41df-90ba',
    type: 'metadata_template',
    templateKey: templateKey,
    scope: templateScope,
    displayName: 'Test Template',
    hidden: false,
    fields: [{
      id: '854045ee-a219-47ef-93ec-6e3b3417b68f',
      type: 'string',
      key: 'type',
      displayName: 'type',
      hidden: false,
      description: 'type'
    }, {
      id: '04af7602-7cad-4d60-b843-acc14b0ef587',
      type: 'float',
      key: 'year',
      displayName: 'year',
      hidden: false,
      description: 'year'
    }, {
      id: '9e5849a1-02f4-4a9a-b626-91fe46a89f2a',
      type: 'enum',
      key: 'approved',
      displayName: 'approved',
      hidden: false,
      description: 'approved yes/no',
      options: options
    }]
  };
  var templateSchemaResponse = {
    data: template
  };
  var nextMarker = 'marker1234567890';
  var metadataQueryResponse = {
    entries: [{
      type: 'file',
      id: '1234',
      name: 'filename1.pdf',
      size: 10000,
      metadata: _defineProperty({}, templateScope, _defineProperty({}, templateKey, {
        $id: metadataInstanceId1,
        $parent: 'file_998877',
        $type: 'awesomeTemplateKey-asdlk-1234-asd1',
        $typeScope: 'enterprise_2222',
        $typeVersion: 0,
        $version: 0,
        type: 'bill',
        // metadata template field
        year: 2017,
        // metadata template field
        approved: 'yes' // metadata template field

      }))
    }, {
      type: 'file',
      id: '9876',
      name: 'filename2.mp4',
      size: 50000,
      metadata: _defineProperty({}, templateScope, _defineProperty({}, templateKey, {
        $id: metadataInstanceId2,
        $parent: 'file_998877',
        $type: 'awesomeTemplateKey-asdlk-1234-asd1',
        $typeScope: 'enterprise_2222',
        $typeVersion: 0,
        $version: 0,
        type: 'receipt',
        // metadata template field
        year: 2018,
        // metadata template field
        approved: 'no' // metadata template field

      }))
    }],
    next_marker: nextMarker
  };
  var flattenedMetadataEntries = [{
    enterprise: {
      fields: [{
        displayName: 'type',
        key: "".concat(FIELD_METADATA, ".").concat(templateScope, ".").concat(templateKey, ".type"),
        value: 'bill',
        type: 'string'
      }, {
        displayName: 'year',
        key: "".concat(FIELD_METADATA, ".").concat(templateScope, ".").concat(templateKey, ".year"),
        value: 2017,
        type: 'float'
      }, {
        displayName: 'approved',
        key: "".concat(FIELD_METADATA, ".").concat(templateScope, ".").concat(templateKey, ".approved"),
        value: 'yes',
        type: 'enum',
        options: options
      }],
      id: metadataInstanceId1
    }
  }, {
    enterprise: {
      fields: [{
        displayName: 'type',
        key: "".concat(FIELD_METADATA, ".").concat(templateScope, ".").concat(templateKey, ".type"),
        value: 'receipt',
        type: 'string'
      }, {
        displayName: 'year',
        key: "".concat(FIELD_METADATA, ".").concat(templateScope, ".").concat(templateKey, ".year"),
        value: 2018,
        type: 'float'
      }, {
        displayName: 'approved',
        key: "".concat(FIELD_METADATA, ".").concat(templateScope, ".").concat(templateKey, ".approved"),
        value: 'no',
        type: 'enum',
        options: options
      }],
      id: metadataInstanceId2
    }
  }];
  var flattenedResponse = [{
    id: '1234',
    metadata: flattenedMetadataEntries[0],
    name: 'filename1.pdf',
    size: 10000,
    type: 'file'
  }, {
    id: '9876',
    metadata: flattenedMetadataEntries[1],
    name: 'filename2.mp4',
    size: 50000,
    type: 'file'
  }];
  var flattenedDataWithTypes = {
    items: flattenedResponse,
    nextMarker: metadataQueryResponse.next_marker
  };
  var getSchemaByTemplateKeyFunc = jest.fn().mockReturnValueOnce(Promise.resolve(templateSchemaResponse));
  var queryMetadataFunc = jest.fn().mockReturnValueOnce(Promise.resolve(metadataQueryResponse));
  var updateMetadataFunc = jest.fn().mockReturnValueOnce(Promise.resolve(metadataInstance));
  var api = {
    getMetadataAPI: function getMetadataAPI() {
      return {
        getSchemaByTemplateKey: getSchemaByTemplateKeyFunc,
        updateMetadata: updateMetadataFunc
      };
    },
    getMetadataQueryAPI: function getMetadataQueryAPI() {
      return {
        queryMetadata: queryMetadataFunc
      };
    }
  };
  var mdQuery = {
    ancestor_folder_id: '672838458',
    from: 'enterprise_1234.templateKey',
    query: 'query',
    query_params: {},
    fields: [FIELD_NAME, 'metadata.enterprise_1234.templateKey.type', 'metadata.enterprise_1234.templateKey.year', 'metadata.enterprise_1234.templateKey.approved']
  };
  beforeEach(function () {
    metadataQueryAPIHelper = new MetadataQueryAPIHelper(api);
    metadataQueryAPIHelper.templateKey = templateKey;
    metadataQueryAPIHelper.templateScope = templateScope;
    metadataQueryAPIHelper.metadataTemplate = template;
    metadataQueryAPIHelper.metadataQuery = mdQuery;
  });
  describe('flattenMetadata()', function () {
    var entries = metadataQueryResponse.entries;
    test.each(_templateObject(), 0, entries[0].metadata, flattenedMetadataEntries[0], 1, entries[1].metadata, flattenedMetadataEntries[1])('should return correct flattened metadata for entry $entryIndex', function (_ref) {
      var metadataResponseEntry = _ref.metadataResponseEntry,
          flattenedMetadataEntry = _ref.flattenedMetadataEntry;
      var result = metadataQueryAPIHelper.flattenMetadata(metadataResponseEntry);
      expect(result).toEqual(flattenedMetadataEntry);
    });
    test('should return empty object when instance is not found', function () {
      expect(metadataQueryAPIHelper.flattenMetadata(undefined)).toEqual({});
    });
  });
  describe('flattenResponseEntry()', function () {
    var entries = metadataQueryResponse.entries;
    test.each(_templateObject2(), 0, entries[0], flattenedResponse[0], 1, entries[1], flattenedResponse[1])('should return correct flattened response for entry $entryIndex', function (_ref2) {
      var metadataResponseEntry = _ref2.metadataResponseEntry,
          flattenedResponseEntry = _ref2.flattenedResponseEntry;
      var result = metadataQueryAPIHelper.flattenResponseEntry(metadataResponseEntry);
      expect(result).toEqual(flattenedResponseEntry);
    });
  });
  describe('getFlattenedDataWithTypes()', function () {
    test('should return flattened data with types and set template object on the instance', function () {
      metadataQueryAPIHelper.metadataQueryResponseData = metadataQueryResponse;
      var result = metadataQueryAPIHelper.getFlattenedDataWithTypes(templateSchemaResponse);
      expect(result).toEqual(flattenedDataWithTypes);
      expect(metadataQueryAPIHelper.metadataTemplate).toEqual(template);
    });
  });
  describe('filterMetdataQueryResponse()', function () {
    test('should return query response with entries of type file only', function () {
      var entries = [{
        type: 'file',
        metadata: {}
      }, {
        type: 'folder',
        metadata: {}
      }, {
        type: 'file',
        metadata: {}
      }, {
        type: 'folder',
        metadata: {}
      }, {
        type: 'file',
        metadata: {}
      }];
      var next_marker = 'marker_123456789';
      var mdQueryResponse = {
        entries: entries,
        next_marker: next_marker
      };
      var filteredResponse = metadataQueryAPIHelper.filterMetdataQueryResponse(mdQueryResponse);
      var isEveryEntryOfTypeFile = filteredResponse.entries.every(function (entry) {
        return entry.type === ITEM_TYPE_FILE;
      });
      expect(isEveryEntryOfTypeFile).toBe(true);
    });
  });
  describe('getTemplateSchemaInfo()', function () {
    test('should set instance properties and make xhr call to get template info when response has valid entries',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return metadataQueryAPIHelper.getTemplateSchemaInfo(metadataQueryResponse);

            case 2:
              result = _context.sent;
              expect(getSchemaByTemplateKeyFunc).toHaveBeenCalledWith(templateKey);
              expect(result).toEqual(templateSchemaResponse);
              expect(metadataQueryAPIHelper.metadataQueryResponseData).toEqual(metadataQueryResponse);
              expect(metadataQueryAPIHelper.templateScope).toEqual(templateScope);
              expect(metadataQueryAPIHelper.templateKey).toEqual(templateKey);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should not make xhr call to get metadata template info when response has zero/invalid entries',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var emptyEntriesResponse, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              emptyEntriesResponse = {
                entries: [],
                next_marker: nextMarker
              };
              _context2.next = 3;
              return metadataQueryAPIHelper.getTemplateSchemaInfo(emptyEntriesResponse);

            case 3:
              result = _context2.sent;
              expect(getSchemaByTemplateKeyFunc).not.toHaveBeenCalled();
              expect(result).toBe(undefined);
              expect(metadataQueryAPIHelper.metadataQueryResponseData).toEqual(emptyEntriesResponse);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('queryMetadata()', function () {
    test('should return a promise that resolves with metadata query result',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              result = metadataQueryAPIHelper.queryMetadata(mdQuery);
              expect(result).toBeInstanceOf(Promise);
              expect(queryMetadataFunc).toBeCalledWith(mdQuery, expect.any(Function), // resolve
              expect.any(Function), // reject
              {
                forceFetch: true
              });

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('fetchMetadataQueryResults()', function () {
    test('should fetch metadata query results, template info, and call successCallback with flattened data with data types',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var successCallback, errorCallback;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              successCallback = jest.fn();
              errorCallback = jest.fn();
              metadataQueryAPIHelper.queryMetadata = jest.fn().mockReturnValueOnce(Promise.resolve(metadataQueryResponse));
              metadataQueryAPIHelper.getTemplateSchemaInfo = jest.fn().mockReturnValueOnce(Promise.resolve(template));
              metadataQueryAPIHelper.getFlattenedDataWithTypes = jest.fn().mockReturnValueOnce(flattenedDataWithTypes);
              _context4.next = 7;
              return metadataQueryAPIHelper.fetchMetadataQueryResults(mdQuery, successCallback, errorCallback);

            case 7:
              expect(metadataQueryAPIHelper.queryMetadata).toBeCalled();
              expect(metadataQueryAPIHelper.getTemplateSchemaInfo).toBeCalledWith(metadataQueryResponse);
              expect(metadataQueryAPIHelper.getFlattenedDataWithTypes).toBeCalledWith(template);
              expect(successCallback).toBeCalledWith(flattenedDataWithTypes);
              expect(errorCallback).not.toHaveBeenCalled();

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    test('should call error callback when the promise chain throws exception during API data fetch',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var err, successCallback, errorCallback;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              err = new Error();
              successCallback = jest.fn();
              errorCallback = jest.fn();
              metadataQueryAPIHelper.queryMetadata = jest.fn().mockReturnValueOnce(Promise.resolve(metadataQueryResponse));
              metadataQueryAPIHelper.getTemplateSchemaInfo = jest.fn().mockReturnValueOnce(Promise.reject(err));
              metadataQueryAPIHelper.getFlattenedDataWithTypes = jest.fn().mockReturnValueOnce(flattenedDataWithTypes);
              _context5.next = 8;
              return metadataQueryAPIHelper.fetchMetadataQueryResults(mdQuery, successCallback, errorCallback);

            case 8:
              expect(metadataQueryAPIHelper.queryMetadata).toBeCalled();
              expect(metadataQueryAPIHelper.getTemplateSchemaInfo).toBeCalledWith(metadataQueryResponse);
              expect(metadataQueryAPIHelper.getFlattenedDataWithTypes).not.toHaveBeenCalled();
              expect(successCallback).not.toHaveBeenCalled();
              expect(errorCallback).toBeCalledWith(err);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  describe('createJSONPatchOperations()', function () {
    var field = 'amount';
    var testOp = {
      op: JSON_PATCH_OP_TEST,
      path: "/".concat(field),
      value: 100
    };
    var addOp = {
      op: JSON_PATCH_OP_ADD,
      path: "/".concat(field),
      value: 200
    };
    var replaceOp = {
      op: JSON_PATCH_OP_REPLACE,
      path: "/".concat(field),
      value: 200
    };
    var removeOp = {
      op: JSON_PATCH_OP_REMOVE,
      path: "/".concat(field)
    };
    test.each(_templateObject3(), undefined, 200, [addOp], 100, 200, [testOp, replaceOp], 100, undefined, [testOp, removeOp])('should return valid JSON patch object', function (_ref8) {
      var oldValue = _ref8.oldValue,
          newValue = _ref8.newValue,
          ops = _ref8.ops;
      expect(metadataQueryAPIHelper.createJSONPatchOperations(field, oldValue, newValue)).toEqual(ops);
    });
  });
  describe('getMetadataQueryFields()', function () {
    test('should get metadata instance fields array from the query', function () {
      var expectedResponse = ['type', 'year', 'approved'];
      expect(metadataQueryAPIHelper.getMetadataQueryFields()).toEqual(expectedResponse);
    });
  });
  describe('updateMetadata()', function () {
    test('should update the metadata by calling Metadata api function',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var file, field, oldValue, newValue, successCallback, errorCallback, JSONPatchOps;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              file = 'file';
              field = 'amount';
              oldValue = 100;
              newValue = 200;
              successCallback = jest.fn();
              errorCallback = jest.fn();
              JSONPatchOps = {
                jsonPatch: 'jsonPatch'
              };
              metadataQueryAPIHelper.createJSONPatchOperations = jest.fn().mockReturnValueOnce(JSONPatchOps);
              _context6.next = 10;
              return metadataQueryAPIHelper.updateMetadata(file, field, oldValue, newValue, successCallback, errorCallback);

            case 10:
              expect(metadataQueryAPIHelper.createJSONPatchOperations).toHaveBeenCalledWith(field, oldValue, newValue);
              expect(metadataQueryAPIHelper.api.getMetadataAPI().updateMetadata).toHaveBeenCalledWith(file, template, JSONPatchOps, successCallback, errorCallback);

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  describe('verifyQueryFields()', function () {
    var mdQueryWithEmptyFields = {
      ancestor_folder_id: '672838458',
      from: 'enterprise_1234.templateKey',
      query: 'query',
      query_params: {}
    };
    var mdQueryWithoutNameField = {
      ancestor_folder_id: '672838458',
      from: 'enterprise_1234.templateKey',
      query: 'query',
      query_params: {},
      fields: ['created_at', 'metadata.enterprise_1234.templateKey.type']
    };
    var mdQueryWithNameField = {
      ancestor_folder_id: '672838458',
      from: 'enterprise_1234.templateKey',
      query: 'query',
      query_params: {},
      fields: [FIELD_NAME, 'metadata.enterprise_1234.templateKey.type']
    };
    test.each(_templateObject4(), 1, mdQueryWithEmptyFields, 2, mdQueryWithoutNameField, 3, mdQueryWithNameField)('should verify the metadata query object and add the "name" field if necessary', function (_ref10) {
      var index = _ref10.index,
          metadataQuery = _ref10.metadataQuery;
      var updatedMetadataQuery = metadataQueryAPIHelper.verifyQueryFields(metadataQuery);
      expect(isArray(updatedMetadataQuery.fields)).toBe(true);
      expect(includes(updatedMetadataQuery.fields, FIELD_NAME)).toBe(true);

      if (index === 2) {
        // Verify "name" is added to pre-existing fields
        expect(updatedMetadataQuery.fields).toEqual([].concat(_toConsumableArray(mdQueryWithoutNameField.fields), [FIELD_NAME]));
      }

      if (index === 3) {
        // No change, original query has all necessary fields
        expect(updatedMetadataQuery.fields).toEqual(mdQueryWithNameField.fields);
      }
    });
  });
});