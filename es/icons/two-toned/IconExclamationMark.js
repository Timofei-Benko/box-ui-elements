import * as React from 'react';
import { bdlBoxBlue } from '../../styles/variables';
import AccessibleSVG from '../accessible-svg';

var IconExclamationMark = function IconExclamationMark(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 24 : _ref$height,
      title = _ref.title,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 24 : _ref$width;
  return React.createElement(AccessibleSVG, {
    className: "icon-exclamation-mark-2 ".concat(className),
    title: title,
    width: width,
    height: height,
    viewBox: "0 0 32 32"
  }, React.createElement("circle", {
    className: "background-color",
    fill: bdlBoxBlue,
    fillRule: "nonzero",
    cx: "16",
    cy: "16",
    r: "12"
  }), React.createElement("path", {
    className: "foreground-color",
    d: "M16,8 C16.8284271,8 17.5,8.67157288 17.5,9.5 L17.5,17.5 C17.5,18.3284271 16.8284271,19 16,19 C15.1715729,19 14.5,18.3284271 14.5,17.5 L14.5,9.5 C14.5,8.67157288 15.1715729,8 16,8 Z M16,24 C15.1715729,24 14.5,23.3284271 14.5,22.5 C14.5,21.6715729 15.1715729,21 16,21 C16.8284271,21 17.5,21.6715729 17.5,22.5 C17.5,23.3284271 16.8284271,24 16,24 Z",
    fill: "#FFFFFF",
    fillRule: "nonzero"
  }));
};

export default IconExclamationMark;
//# sourceMappingURL=IconExclamationMark.js.map