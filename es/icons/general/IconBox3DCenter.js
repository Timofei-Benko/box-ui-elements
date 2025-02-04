import * as React from 'react';
import AccessibleSVG from '../accessible-svg';

var IconBox3DCenter = function IconBox3DCenter(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 18 : _ref$height,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? '#444' : _ref$color,
      title = _ref.title,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 18 : _ref$width;
  return React.createElement(AccessibleSVG, {
    className: "box3d-center-icon ".concat(className),
    height: height,
    title: title,
    viewBox: "9 9 16 16",
    width: width
  }, React.createElement("path", {
    className: "fill-color",
    d: "M20.5 13.9L16.9 12c-.5-.3-1.3-.3-1.8 0l-3.6 1.9c-.6.3-1 1-1 1.6v4.9c0 .7.4 1.3 1 1.6l3.6 1.9c.3.1.6.2.9.2.3 0 .6-.1.9-.2l3.6-1.9c.6-.3 1-1 1-1.6v-4.9c0-.6-.4-1.3-1-1.6zm-8.6 7.3c-.2-.1-.4-.5-.4-.7v-4.9c0-.3.2-.6.4-.7l3.6-1.9c.2-.1.6-.1.9 0l3.6 1.9c.1 0 .1.1.2.2L16 17v6.2c-.2 0-.3 0-.4-.1l-3.7-1.9z",
    fill: color
  }));
};

export default IconBox3DCenter;
//# sourceMappingURL=IconBox3DCenter.js.map