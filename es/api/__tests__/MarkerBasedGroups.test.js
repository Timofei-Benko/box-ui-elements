function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            providedLimit | providedRequestData  | limit                   | requestData            | description\n            ", "  | ", "         | ", " | ", " | ", "\n            ", "        | ", " | ", "                  | ", "   | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import MarkerBasedGroups from '../MarkerBasedGroups';
import { DEFAULT_MAX_CONTACTS, ERROR_CODE_FETCH_ENTERPRISE_GROUPS } from '../../constants';
var markerBasedGroups;
var markerGetSpy;
var successCallback;
var errorCallback;
var BASE_URL = 'https://api.box.com/2.0';
var ITEM_ID = '14237093';
var MOCK_REQUEST_DATA = {
  fields: ['name', 'permissions'],
  filter_term: 'foo',
  usemarker: true
};
describe('api/MarkerBasedGroups', function () {
  beforeEach(function () {
    markerBasedGroups = new MarkerBasedGroups({});
    markerGetSpy = jest.spyOn(markerBasedGroups, 'markerGet');
    successCallback = jest.fn();
    errorCallback = jest.fn();
  });
  describe('getUrl()', function () {
    test('should return the default API URL', function () {
      expect(markerBasedGroups.getUrl()).toBe("".concat(BASE_URL, "/groups"));
    });
  });
  describe('getGroupsInEnterprise()', function () {
    test.each(_templateObject(), undefined, undefined, DEFAULT_MAX_CONTACTS, {
      usemarker: true
    }, 'default arguments', 100, MOCK_REQUEST_DATA, 100, MOCK_REQUEST_DATA, 'provided arguments')('should call this.markerGet() with the $description', function (_ref) {
      var requestData = _ref.requestData,
          limit = _ref.limit;
      jest.spyOn(markerBasedGroups, 'getUrl').mockReturnValue(BASE_URL);
      markerBasedGroups.getGroupsInEnterprise(ITEM_ID, successCallback, errorCallback, requestData, limit);
      expect(markerBasedGroups.errorCode).toBe(ERROR_CODE_FETCH_ENTERPRISE_GROUPS);
      expect(markerGetSpy).toHaveBeenCalledWith({
        id: ITEM_ID,
        limit: limit,
        successCallback: successCallback,
        errorCallback: errorCallback,
        requestData: requestData,
        shouldFetchAll: false
      });
    });
  });
});