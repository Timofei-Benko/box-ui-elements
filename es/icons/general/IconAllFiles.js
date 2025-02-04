import * as React from 'react';
import AccessibleSVG from '../accessible-svg';

var IconAllFiles = function IconAllFiles(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? '#979797' : _ref$color,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 12 : _ref$height,
      title = _ref.title,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 14 : _ref$width;
  return React.createElement(AccessibleSVG, {
    className: "icon-all-files ".concat(className),
    height: height,
    title: title,
    viewBox: "0 0 14 12",
    width: width
  }, React.createElement("g", {
    className: "fill-color",
    fill: color
  }, React.createElement("path", {
    d: "M13 1H7.1l-1-1H1C.4 0 0 .5 0 1v10c0 .6.5 1 1 1h12c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1zm0 10H1V4h12v7zm0-8H1V1h4.7l1 1H13v1z"
  }), React.createElement("path", {
    d: "M11.5 9h-9c-.3 0-.5.2-.5.5s.2.5.5.5h9c.3 0 .5-.2.5-.5s-.2-.5-.5-.5z"
  })));
};

export default IconAllFiles;
//# sourceMappingURL=IconAllFiles.js.map