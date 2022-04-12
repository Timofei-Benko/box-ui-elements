import React from 'react';
import { shallow } from 'enzyme';
import PreviewLoadingRing from '../PreviewLoadingRing';

var getWrapper = function getWrapper() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return shallow(React.createElement(PreviewLoadingRing, props));
};

describe('components/preview/PreviewLoadingRing', function () {
  describe('render()', function () {
    test('should use its default theme prop if one is not provided', function () {
      var wrapper = getWrapper();
      expect(wrapper.hasClass('bdl-PreviewLoadingRing--light')).toBe(true);
    });
    test.each(['dark', 'light'])('should pass its theme prop (%s) to a css class', function (theme) {
      var wrapper = getWrapper({
        theme: theme
      });
      expect(wrapper.hasClass("bdl-PreviewLoadingRing--".concat(theme))).toBe(true);
    });
    test('should pass its color prop to its border', function () {
      var wrapper = getWrapper({
        color: '#fff'
      });
      expect(wrapper.exists({
        style: {
          backgroundColor: '#fff'
        }
      })).toBe(true);
    });
    test('should not set a style if its color prop is empty', function () {
      var wrapper = getWrapper();
      expect(wrapper.exists({
        style: {
          backgroundColor: undefined
        }
      })).toBe(false);
    });
    test('should render its children', function () {
      var Child = function Child() {
        return React.createElement("div", {
          className: "test"
        }, "Test");
      };

      var wrapper = getWrapper({
        children: React.createElement(Child, null)
      });
      expect(wrapper.exists(Child)).toBe(true);
    });
  });
});