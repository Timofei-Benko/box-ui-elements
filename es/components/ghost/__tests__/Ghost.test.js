function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        label                                | borderRadius | height | width  | style\n        ", "                   | ", "     | ", " | ", " | ", "\n        ", "          | ", "     | ", " | ", " | ", "\n        ", " | ", "     | ", " | ", " | ", "\n        ", "      | ", " | ", " | ", " | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import * as React from 'react';
import { render } from 'enzyme';
import Ghost from '../Ghost';
describe('components/Ghost', function () {
  test('renders element with default options', function () {
    var html = render(React.createElement(Ghost, null));
    expect(html).toMatchInlineSnapshot("\n            <span\n              class=\"bdl-Ghost bdl-Ghost--isAnimated\"\n            />\n        ");
  });
  test('isAnimated prop controls modifier class that applies animation effect', function () {
    var html = render(React.createElement(Ghost, {
      isAnimated: false
    }));
    expect(html).toMatchInlineSnapshot("\n            <span\n              class=\"bdl-Ghost\"\n            />\n        ");
  });
  test.each(_templateObject(), 'no style prop', '2px', 100, 100, undefined, 'a partial style object', '2px', 100, 100, {
    height: 20
  }, 'a style object with all options', '2px', 100, 100, {
    borderRadius: '100%',
    height: 20,
    width: 10
  }, 'partial options and styles', undefined, 100, 100, {
    height: 20,
    width: 10
  })('merges style prop on top of inline styling options when there is $label', function (_ref) {
    var borderRadius = _ref.borderRadius,
        height = _ref.height,
        width = _ref.width,
        style = _ref.style;
    expect(render(React.createElement(Ghost, {
      borderRadius: borderRadius,
      height: height,
      width: width,
      style: style
    }))).toMatchSnapshot();
  });
});