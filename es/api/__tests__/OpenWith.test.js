function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import OpenWith from '../OpenWith';
import mockOpenWithData from './MockOpenWithData.json';
var openWith;
describe('api/ContentOpenWith', function () {
  beforeEach(function () {
    openWith = new OpenWith({});
  });
  describe('getOpenWithIntegrations()', function () {
    test('should format data on success', function () {
      var data = mockOpenWithData.default;
      var successFn = jest.fn();
      var errorFn = jest.fn();

      openWith.get = function (_ref) {
        var successCallback = _ref.successCallback;
        successCallback(data);
      };

      openWith.formatOpenWithData = jest.fn();
      openWith.consolidateBoxEditIntegrations = jest.fn();
      openWith.getOpenWithIntegrations('123', successFn, errorFn);
      expect(openWith.formatOpenWithData).toBeCalledWith(data);
      expect(openWith.consolidateBoxEditIntegrations).toBeCalled();
    });
  });
  describe('consolidateBoxEditIntegrations()', function () {
    test('should do nothing if no Box Edit integrations are present', function () {
      var data = mockOpenWithData.default.items;
      var result = openWith.consolidateBoxEditIntegrations(data);
      expect(result).toEqual(data);
    });
    test('should do nothing if only Box Edit is present', function () {
      var data = mockOpenWithData.boxEdit;
      var result = openWith.consolidateBoxEditIntegrations(data);
      expect(result).toEqual(data);
    });
    test('should do nothing if only Box Edit SFC is present', function () {
      var data = mockOpenWithData.boxEditSFC;
      var result = openWith.consolidateBoxEditIntegrations(data);
      expect(result).toEqual(data);
    });
    test('should only return Box Edit if both Box Edit AND Box Edit SFC are present', function () {
      var data = mockOpenWithData.boxEditAndSFC;
      var result = openWith.consolidateBoxEditIntegrations(data);
      expect(result).toEqual(mockOpenWithData.boxEdit);
    });
  });
  describe('formatOpenWithData()', function () {
    var data = mockOpenWithData.default;
    test('should add a flattened and complete Integration', function () {
      var formatedOpenWithIntegrations = openWith.formatOpenWithData(data);
      formatedOpenWithIntegrations.forEach(function (integration) {
        expect(_typeof(integration.appIntegrationId)).toBe('string');
        expect(_typeof(integration.displayDescription)).toBe('string');
        expect(_typeof(integration.disabledReasons)).toBe('object');
        expect(_typeof(integration.displayOrder)).toBe('number');
        expect(_typeof(integration.isDisabled)).toBe('boolean');
        expect(_typeof(integration.displayName)).toBe('string');
        expect(_typeof(integration.requiresConsent)).toBe('boolean');
        expect(_typeof(integration.type)).toBe('string');
      });
    });
    test('should add isDefault to all items', function () {
      var formatedOpenWithIntegrations = openWith.formatOpenWithData(data);
      formatedOpenWithIntegrations.forEach(function (integration) {
        expect(_typeof(integration.isDefault)).toBe('boolean');
      });
    });
    test('should return items sorted by displayOrder', function () {
      var formatedOpenWithIntegrations = openWith.formatOpenWithData(data);
      formatedOpenWithIntegrations.forEach(function (integration, idx) {
        // displayOrder is 1 indexed
        var expectedOrder = idx + 1;
        expect(integration.displayOrder).toEqual(expectedOrder);
      });
    });
  });
});