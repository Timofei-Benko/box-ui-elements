import * as React from 'react';
import AccessibleSVG from '../accessible-svg';
import { bdlBoxBlue } from '../../styles/variables';

var IconLogo = function IconLogo(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? bdlBoxBlue : _ref$color,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 25 : _ref$height,
      title = _ref.title,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 45 : _ref$width;
  return React.createElement(AccessibleSVG, {
    className: "icon-logo ".concat(className),
    height: height,
    title: title,
    viewBox: "0 0 98 52",
    width: width
  }, React.createElement("path", {
    className: "fill-color",
    d: "M95.34 44.7c1.1 1.53.8 3.66-.75 4.8-1.56 1.13-3.74.84-4.93-.64l-7.8-10.23-7.82 10.23c-1.2 1.48-3.36 1.77-4.9.63-1.55-1.15-1.87-3.28-.75-4.8l9.06-11.86L68.4 21c-1.1-1.54-.8-3.67.75-4.8 1.55-1.14 3.72-.85 4.9.63l7.82 10.23 7.8-10.23c1.2-1.48 3.38-1.77 4.92-.63 1.52 1.13 1.84 3.26.73 4.8L86.3 32.84l9.04 11.85zM53.9 43.22c-5.86 0-10.6-4.65-10.6-10.4 0-5.72 4.74-10.37 10.6-10.37 5.85 0 10.6 4.65 10.6 10.38 0 5.74-4.75 10.4-10.6 10.4zm-31.23 0c-5.85 0-10.6-4.65-10.6-10.4 0-5.72 4.75-10.37 10.6-10.37 5.86 0 10.6 4.65 10.6 10.38 0 5.74-4.74 10.4-10.6 10.4zm31.22-27.7c-6.78 0-12.66 3.73-15.63 9.2-2.97-5.47-8.84-9.2-15.6-9.2-4 0-7.66 1.3-10.6 3.46V4.38C12.02 2.52 10.45 1 8.53 1 6.6 1 5.03 2.5 5 4.4v28.7c.16 9.43 8 17.03 17.67 17.03 6.77 0 12.64-3.73 15.6-9.2 2.98 5.47 8.86 9.2 15.62 9.2 9.74 0 17.66-7.75 17.66-17.32 0-9.55-7.92-17.3-17.68-17.3z",
    fill: color,
    fillRule: "evenodd"
  }));
};

export default IconLogo;
//# sourceMappingURL=IconLogo.js.map