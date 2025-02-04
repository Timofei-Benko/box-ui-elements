import * as React from 'react';
import { bdlBoxBlue, white } from '../../styles/variables';
import AccessibleSVG from '../accessible-svg';

var IconBoxSquare = function IconBoxSquare(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 72 : _ref$height,
      title = _ref.title,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 72 : _ref$width;
  return React.createElement(AccessibleSVG, {
    className: "box-square-icon ".concat(className),
    height: height,
    title: title,
    viewBox: "0 0 72 72",
    width: width
  }, React.createElement("rect", {
    width: "72",
    height: "72",
    rx: "8",
    ry: "8",
    fill: bdlBoxBlue
  }), React.createElement("path", {
    d: "M37.39 28.57A10.26 10.26 0 0 0 28.33 34a10.31 10.31 0 0 0-15.23-3.39V22A2.05 2.05 0 0 0 9 22v17a10.27 10.27 0 0 0 19.33 4.62 10.25 10.25 0 1 0 9.06-15zM19.26 44.91a6.13 6.13 0 1 1 6.15-6.13 6.14 6.14 0 0 1-6.15 6.13zm18.13 0a6.13 6.13 0 1 1 6.15-6.13 6.14 6.14 0 0 1-6.15 6.13z",
    fill: white
  }), React.createElement("path", {
    d: "M58 38.77l5.58-6.83a1.93 1.93 0 0 0-.47-2.82 2.37 2.37 0 0 0-3.1.37l-4.81 5.86-4.8-5.86a2.35 2.35 0 0 0-3.09-.37 1.92 1.92 0 0 0-.47 2.82l5.57 6.83-5.57 6.81a1.93 1.93 0 0 0 .47 2.83A2.36 2.36 0 0 0 50.4 48l4.8-5.85L60 48a2.37 2.37 0 0 0 3.1.38 1.93 1.93 0 0 0 .47-2.83z",
    fill: white
  }));
};

export default IconBoxSquare;
//# sourceMappingURL=IconBoxSquare.js.map