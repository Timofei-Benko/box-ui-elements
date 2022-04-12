function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import Color from 'color';
import randomSwatches from '../../../test/fixtures/theme/colors';
import defaultTheme from '../../styles/theme';
import * as vars from '../../styles/variables';
import { createTheme, MIN_CONTRAST } from '../createTheme';
describe('components/theme', function () {
  describe('Validate generated color accessibility', function () {
    var accessibleKeys = ['background', 'backgroundHover', 'backgroundActive'];
    var contrastKey = 'foreground'; // Potentially problematic colors merged with random 1000 swatches from fixture set.

    var colorCases = ['#ffffff', '#000000', '#232300', '#c50213'].concat(_toConsumableArray(randomSwatches));
    test.each(colorCases)('given %p as argument, returns accessible color contrast', function (colorKey) {
      var dynamicTheme = createTheme(colorKey);
      accessibleKeys.forEach(function (key) {
        expect(Color(dynamicTheme.primary[key]).contrast(Color(dynamicTheme.primary[contrastKey]))).toBeGreaterThanOrEqual(MIN_CONTRAST);
      });
    });
  });
  test('should generate box brand colors and merge into base theme', function () {
    var dynamicTheme = createTheme(vars.bdlBoxBlue);
    expect(dynamicTheme).toMatchObject(defaultTheme);
    expect(dynamicTheme).toMatchSnapshot();
  });
  test('should generate accessible palette for midtone grey', function () {
    var dynamicTheme = createTheme('#6A6C6E');
    expect(dynamicTheme).toMatchSnapshot();
  });
  test('should generate accessible palette for dark primary', function () {
    var dynamicTheme = createTheme('#000000');
    expect(dynamicTheme).toMatchSnapshot();
  });
  test('should generate accessible palette for light primary', function () {
    var dynamicTheme = createTheme('#ffffff');
    expect(dynamicTheme).toMatchSnapshot();
  });
  test('should generate accessible palette using color string', function () {
    var dynamicTheme = createTheme('pink');
    expect(dynamicTheme).toMatchSnapshot();
  }); // Expected errors

  test('should generate no colors, missing colorKeys', function () {
    expect(function () {
      createTheme({
        ratio: 1
      }); // no key colors
    }).toThrow();
  });
});