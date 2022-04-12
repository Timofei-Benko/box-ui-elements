import classificationColorsMap from '../classificationColorsMap';
import { DEFAULT_CLASSIFICATION_COLOR_ID } from '../constants';
import { getClassificationLabelColor, getClassificationTinyconColor } from '../utils';
describe('features/classification/utils', function () {
  describe('getClassificationLabelColor()', function () {
    test('should return the fill color that match the given color id', function () {
      var colorID = 6;
      var color = classificationColorsMap[colorID].color;
      var expectedColor = color;
      expect(getClassificationLabelColor({
        colorID: colorID
      })).toEqual(expectedColor);
    });
    test('should return default fill color when color id can not be matched', function () {
      var colorID = classificationColorsMap.length;
      var color = classificationColorsMap[DEFAULT_CLASSIFICATION_COLOR_ID].color;
      var expectedColor = color;
      expect(getClassificationLabelColor({
        colorID: colorID
      })).toEqual(expectedColor);
    });
    test('should return default fill color for empty params', function () {
      var color = classificationColorsMap[DEFAULT_CLASSIFICATION_COLOR_ID].color;
      var expectedColor = color;
      expect(getClassificationLabelColor()).toEqual(expectedColor);
    });
    test('should return default fill color when colorID property is missing', function () {
      var color = classificationColorsMap[DEFAULT_CLASSIFICATION_COLOR_ID].color;
      var expectedColor = color;
      expect(getClassificationLabelColor({})).toEqual(expectedColor);
    });
  });
  describe('getClassificationTinyconColor()', function () {
    test('should return the tinycon color that match the given color id', function () {
      var colorID = 6;
      var tinycon = classificationColorsMap[colorID].tinycon;
      var expectedColor = tinycon;
      expect(getClassificationTinyconColor({
        colorID: colorID
      })).toEqual(expectedColor);
    });
    test('should return default tinycon color when color id can not be matched', function () {
      var colorID = classificationColorsMap.length;
      var tinycon = classificationColorsMap[DEFAULT_CLASSIFICATION_COLOR_ID].tinycon;
      var expectedColor = tinycon;
      expect(getClassificationTinyconColor({
        colorID: colorID
      })).toEqual(expectedColor);
    });
    test('should return default tinycon color for empty params', function () {
      var tinycon = classificationColorsMap[DEFAULT_CLASSIFICATION_COLOR_ID].tinycon;
      var expectedColor = tinycon;
      expect(getClassificationTinyconColor()).toEqual(expectedColor);
    });
    test('should return default tinycon color when colorID property is missing', function () {
      var tinycon = classificationColorsMap[DEFAULT_CLASSIFICATION_COLOR_ID].tinycon;
      var expectedColor = tinycon;
      expect(getClassificationTinyconColor({})).toEqual(expectedColor);
    });
  });
});