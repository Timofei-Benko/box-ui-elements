function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            providedLimit | providedRequestData                   | limit                        | requestData                           | description\n            ", "  | ", "                          | ", " | ", "                                 | ", "\n            ", "        | ", " | ", "                       | ", " | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import ItemCollaborations from '../ItemCollaborations';
import { DEFAULT_MAX_COLLABORATORS } from '../../constants';
var MOCK_ITEM_ID = '14237093';
var itemCollaborations;
var markerGetSpy;
describe('api/ItemCollaborations', function () {
  beforeEach(function () {
    itemCollaborations = new ItemCollaborations({});
    markerGetSpy = jest.spyOn(itemCollaborations, 'markerGet');
  });
  describe('getUrl()', function () {
    test('should return the default API URL', function () {
      expect(itemCollaborations.getUrl(MOCK_ITEM_ID)).toBe("getUrl(".concat(MOCK_ITEM_ID, ") should be overridden"));
    });
  });
  describe('getCollaborations()', function () {
    var successCallback;
    var errorCallback;
    beforeEach(function () {
      successCallback = jest.fn();
      errorCallback = jest.fn();
    });
    test.each(_templateObject(), undefined, undefined, DEFAULT_MAX_COLLABORATORS, {}, 'default arguments', 100, {
      fields: ['id', 'type', 'name']
    }, 100, {
      fields: ['id', 'type', 'name']
    }, 'provided arguments')('should call markerGet() with the $description', function (_ref) {
      var providedLimit = _ref.providedLimit,
          providedRequestData = _ref.providedRequestData,
          limit = _ref.limit,
          requestData = _ref.requestData;
      itemCollaborations.getCollaborations(MOCK_ITEM_ID, successCallback, errorCallback, providedRequestData, providedLimit);
      expect(markerGetSpy).toHaveBeenCalledWith({
        id: MOCK_ITEM_ID,
        limit: limit,
        successCallback: successCallback,
        errorCallback: errorCallback,
        requestData: requestData
      });
    });
  });
  describe('successHandler()', function () {
    var MOCK_DATA = {
      entries: []
    };
    test('should do nothing if isDestroyed() returns true', function () {
      jest.spyOn(itemCollaborations, 'isDestroyed').mockReturnValue(true);
      itemCollaborations.successCallback = jest.fn();
      itemCollaborations.successHandler(MOCK_DATA);
      expect(itemCollaborations.successCallback).not.toHaveBeenCalled();
    });
    test('should call successCallback with data', function () {
      jest.spyOn(itemCollaborations, 'isDestroyed').mockReturnValue(false);
      itemCollaborations.successCallback = jest.fn();
      itemCollaborations.successHandler(MOCK_DATA);
      expect(itemCollaborations.successCallback).toHaveBeenCalledWith(MOCK_DATA);
    });
  });
});